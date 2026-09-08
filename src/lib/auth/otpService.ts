import crypto from 'crypto';
import { getSMSProvider, SMSDeliveryResult } from '@/lib/sms/smsProvider';
import {
  saveOTPChallenge,
  getOTPChallenge,
  createSession,
  logAuditEvent,
  OTPPurpose,
  ChallengeStatus,
} from '@/lib/db/database';

export interface OTPChallenge {
  challengeId: string;
  phone: string;
  otpHash: string;
  salt: string;
  expiresAt: number;
  attempts: number;
  maxAttempts: number;
  resendAvailableAt: number;
  purpose: OTPPurpose;
  userId?: string;
  metadata?: Record<string, any>;
  verified: boolean;
  createdAt: number;
}

export interface OTPRateLimit {
  count: number;
  windowStart: number;
}

// In-memory fast cache & Rate Limit Map
const challengeStore = new Map<string, OTPChallenge>();
const phoneRateLimits = new Map<string, OTPRateLimit>();

const OTP_EXPIRY_MS = 5 * 60 * 1000; // 5 minutes
const RESEND_COOLDOWN_MS = 60 * 1000; // 60 seconds
const MAX_VERIFICATION_ATTEMPTS = 3;
const MAX_REQUESTS_PER_HOUR = process.env.MAX_OTP_REQUESTS_PER_HOUR ? parseInt(process.env.MAX_OTP_REQUESTS_PER_HOUR, 10) : 10;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

/**
 * Hash an OTP using SHA-256 with a cryptographic salt
 */
function hashOtp(otp: string, salt: string): string {
  return crypto.createHash('sha256').update(`${otp}:${salt}`).digest('hex');
}

/**
 * Constant-time comparison to prevent timing attacks
 */
function safeCompareHash(a: string, b: string): boolean {
  try {
    const bufA = Buffer.from(a, 'hex');
    const bufB = Buffer.from(b, 'hex');
    if (bufA.length !== bufB.length) return false;
    return crypto.timingSafeEqual(bufA, bufB);
  } catch {
    return false;
  }
}

/**
 * Clean up expired challenges
 */
function cleanupExpiredChallenges(): void {
  const now = Date.now();
  challengeStore.forEach((challenge, id) => {
    if (now > challenge.expiresAt + 60000) {
      challengeStore.delete(id);
    }
  });
}

/**
 * Check and enforce rate limiting per mobile number
 */
function checkRateLimit(phone: string): { allowed: boolean; retryAfterSeconds?: number } {
  const now = Date.now();
  const record = phoneRateLimits.get(phone);

  if (!record || now - record.windowStart > RATE_LIMIT_WINDOW_MS) {
    phoneRateLimits.set(phone, { count: 1, windowStart: now });
    return { allowed: true };
  }

  if (record.count >= MAX_REQUESTS_PER_HOUR) {
    const retryAfter = Math.ceil((record.windowStart + RATE_LIMIT_WINDOW_MS - now) / 1000);
    return { allowed: false, retryAfterSeconds: Math.max(1, retryAfter) };
  }

  record.count += 1;
  return { allowed: true };
}

/**
 * Issue and send a cryptographically secure OTP challenge
 */
export async function sendSecureOTP(
  phone: string,
  purpose: OTPPurpose = 'LOGIN',
  userId?: string,
  metadata?: Record<string, any>
): Promise<{
  success: boolean;
  challengeId?: string;
  expiresInSeconds?: number;
  resendCooldownSeconds?: number;
  phoneMasked?: string;
  providerConfigured: boolean;
  providerName: string;
  error?: string;
  unconfigured?: boolean;
}> {
  cleanupExpiredChallenges();

  // Validate phone format (Indian 10-digit mobile)
  const cleanPhone = phone.replace(/\D/g, '').slice(-10);
  if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
    return {
      success: false,
      providerConfigured: false,
      providerName: 'Validation',
      error: 'Invalid Indian mobile number. Must be a 10-digit number starting with 6, 7, 8, or 9.',
    };
  }

  // Enforce hourly rate limit
  const rateLimit = checkRateLimit(cleanPhone);
  if (!rateLimit.allowed) {
    return {
      success: false,
      providerConfigured: true,
      providerName: 'RateLimiter',
      error: `Too many OTP requests for this mobile number. Please try again after ${Math.ceil(
        (rateLimit.retryAfterSeconds || 60) / 60
      )} minutes.`,
    };
  }

  // Check resend cooldown for active challenge of the SAME purpose on this phone
  const now = Date.now();
  let cooldownError: string | null = null;
  let cooldownChallengeId: string | undefined;

  challengeStore.forEach((challenge) => {
    if (
      challenge.phone === cleanPhone &&
      challenge.purpose === purpose &&
      !challenge.verified &&
      now < challenge.resendAvailableAt
    ) {
      const waitSec = Math.ceil((challenge.resendAvailableAt - now) / 1000);
      cooldownError = `Please wait ${waitSec} seconds before requesting a new OTP.`;
      cooldownChallengeId = challenge.challengeId;
    }
  });

  if (cooldownError) {
    return {
      success: false,
      challengeId: cooldownChallengeId,
      providerConfigured: true,
      providerName: 'RateLimiter',
      error: cooldownError,
    };
  }

  // Generate 6-digit cryptographically secure OTP
  const rawOtp = crypto.randomInt(100000, 1000000).toString();
  const salt = crypto.randomBytes(16).toString('hex');
  const otpHash = hashOtp(rawOtp, salt);

  const challengeId = `chl_${crypto.randomUUID().replace(/-/g, '')}`;

  // Store in memory
  const challenge: OTPChallenge = {
    challengeId,
    phone: cleanPhone,
    otpHash,
    salt,
    expiresAt: now + OTP_EXPIRY_MS,
    attempts: 0,
    maxAttempts: MAX_VERIFICATION_ATTEMPTS,
    resendAvailableAt: now + RESEND_COOLDOWN_MS,
    purpose,
    userId,
    metadata,
    verified: false,
    createdAt: now,
  };
  challengeStore.set(challengeId, challenge);

  // Dispatch through configured SMS Provider
  const smsProvider = getSMSProvider();
  const deliveryResult: SMSDeliveryResult = await smsProvider.sendOtp(cleanPhone, rawOtp);

  if (!smsProvider.isConfigured() || deliveryResult.unconfigured) {
    const isMockAllowed =
      process.env.ALLOW_OTP_MOCK_TESTING === 'true' || process.env.NODE_ENV === 'test';

    if (!isMockAllowed) {
      challengeStore.delete(challengeId);
      return {
        success: false,
        providerConfigured: false,
        providerName: smsProvider.name,
        unconfigured: true,
        error: 'OTP service is temporarily unavailable. Please try again later.',
      };
    }
  }

  if (!deliveryResult.success && !deliveryResult.unconfigured) {
    challengeStore.delete(challengeId);
    return {
      success: false,
      providerConfigured: true,
      providerName: smsProvider.name,
      error: deliveryResult.error || 'Failed to dispatch SMS through telecom provider.',
    };
  }

  // Persist to database
  saveOTPChallenge({
    id: challengeId,
    user_id: userId || null,
    mobile_number: cleanPhone,
    purpose,
    hashed_otp: otpHash,
    salt,
    expires_at: challenge.expiresAt,
    attempts: 0,
    max_attempts: MAX_VERIFICATION_ATTEMPTS,
    resend_available_at: challenge.resendAvailableAt,
    status: 'PENDING',
    provider: smsProvider.name,
    provider_request_id: deliveryResult.messageId || null,
    metadata,
    created_at: now,
    verified_at: null,
  });

  const phoneMasked = `+91 ${cleanPhone.slice(0, 2)}******${cleanPhone.slice(-2)}`;

  return {
    success: true,
    challengeId,
    expiresInSeconds: Math.floor(OTP_EXPIRY_MS / 1000),
    resendCooldownSeconds: Math.floor(RESEND_COOLDOWN_MS / 1000),
    phoneMasked,
    providerConfigured: smsProvider.isConfigured(),
    providerName: smsProvider.name,
  };
}

/**
 * Verify a submitted OTP against its challenge with strict purpose checking
 */
export async function verifySecureOTP(
  challengeId: string,
  phone: string,
  otp: string,
  expectedPurpose?: OTPPurpose
): Promise<{
  success: boolean;
  error?: string;
  challengeInvalidated?: boolean;
  attemptsRemaining?: number;
  sessionToken?: string;
  userId?: string;
  phone?: string;
  purpose?: OTPPurpose;
  metadata?: Record<string, any>;
}> {
  cleanupExpiredChallenges();

  let challenge = challengeStore.get(challengeId);

  // Fallback to persistent DB if memory cache lost
  if (!challenge) {
    const dbRecord = getOTPChallenge(challengeId);
    if (dbRecord && dbRecord.status === 'PENDING') {
      challenge = {
        challengeId: dbRecord.id,
        phone: dbRecord.mobile_number,
        otpHash: dbRecord.hashed_otp,
        salt: dbRecord.salt,
        expiresAt: dbRecord.expires_at,
        attempts: dbRecord.attempts,
        maxAttempts: dbRecord.max_attempts,
        resendAvailableAt: dbRecord.resend_available_at,
        purpose: dbRecord.purpose,
        userId: dbRecord.user_id || undefined,
        metadata: dbRecord.metadata,
        verified: false,
        createdAt: dbRecord.created_at,
      };
      challengeStore.set(challengeId, challenge);
    }
  }

  if (!challenge) {
    return {
      success: false,
      challengeInvalidated: true,
      error: 'Invalid or expired OTP challenge. Please request a new code.',
    };
  }

  const cleanPhone = phone.replace(/\D/g, '').slice(-10);
  if (challenge.phone !== cleanPhone) {
    return {
      success: false,
      error: 'Mobile number does not match the active verification challenge.',
    };
  }

  // Strict Purpose Verification
  if (expectedPurpose && challenge.purpose !== expectedPurpose) {
    challengeStore.delete(challengeId);
    saveOTPChallenge({
      id: challengeId,
      user_id: challenge.userId || null,
      mobile_number: challenge.phone,
      purpose: challenge.purpose,
      hashed_otp: challenge.otpHash,
      salt: challenge.salt,
      expires_at: challenge.expiresAt,
      attempts: challenge.attempts,
      max_attempts: challenge.maxAttempts,
      resend_available_at: challenge.resendAvailableAt,
      status: 'EXPIRED',
      provider: 'Security',
      created_at: challenge.createdAt,
      verified_at: null,
    });

    logAuditEvent('SUSPICIOUS_OTP_ATTEMPTS', 'FAILED', {
      userId: challenge.userId,
      mobileNumber: cleanPhone,
      metadata: { reason: 'Purpose mismatch', expected: expectedPurpose, actual: challenge.purpose },
    });

    return {
      success: false,
      challengeInvalidated: true,
      error: 'Invalid challenge purpose. Verification code cannot be used for this action.',
    };
  }

  const now = Date.now();

  // 1. Expiration Check
  if (now > challenge.expiresAt) {
    challengeStore.delete(challengeId);
    return {
      success: false,
      challengeInvalidated: true,
      error: 'OTP has expired. Verification codes are valid for 5 minutes only.',
    };
  }

  // 2. Replay Attack Prevention
  if (challenge.verified) {
    challengeStore.delete(challengeId);
    return {
      success: false,
      challengeInvalidated: true,
      error: 'This OTP has already been verified and cannot be reused.',
    };
  }

  // 3. Brute-Force Rate Limiting (Max 3 attempts)
  if (challenge.attempts >= challenge.maxAttempts) {
    challengeStore.delete(challengeId);
    return {
      success: false,
      challengeInvalidated: true,
      error: 'Maximum verification attempts exceeded. Challenge locked for security.',
    };
  }

  // Hash submitted OTP with challenge salt
  const cleanOtp = otp.trim();
  const inputHash = hashOtp(cleanOtp, challenge.salt);

  // Constant-time hash verification
  const isMatch = safeCompareHash(inputHash, challenge.otpHash);

  if (isMatch) {
    // Invalidate challenge immediately upon success to prevent replay
    challenge.verified = true;
    const challengeMetadata = challenge.metadata;
    const resolvedPhone = challenge.phone;
    const resolvedUserId = challenge.userId;
    const challengePurpose = challenge.purpose;

    challengeStore.delete(challengeId);

    saveOTPChallenge({
      id: challengeId,
      user_id: resolvedUserId || null,
      mobile_number: resolvedPhone,
      purpose: challengePurpose,
      hashed_otp: challenge.otpHash,
      salt: challenge.salt,
      expires_at: challenge.expiresAt,
      attempts: challenge.attempts,
      max_attempts: challenge.maxAttempts,
      resend_available_at: challenge.resendAvailableAt,
      status: 'VERIFIED',
      provider: '2Factor',
      created_at: challenge.createdAt,
      verified_at: now,
    });

    const sessionResult = createSession(resolvedUserId || `usr-${resolvedPhone}`);

    return {
      success: true,
      sessionToken: sessionResult.sessionToken,
      userId: resolvedUserId,
      phone: resolvedPhone,
      purpose: challengePurpose,
      metadata: challengeMetadata,
    };
  }

  // Increment failed attempts
  challenge.attempts += 1;
  const attemptsRemaining = challenge.maxAttempts - challenge.attempts;

  saveOTPChallenge({
    id: challengeId,
    user_id: challenge.userId || null,
    mobile_number: challenge.phone,
    purpose: challenge.purpose,
    hashed_otp: challenge.otpHash,
    salt: challenge.salt,
    expires_at: challenge.expiresAt,
    attempts: challenge.attempts,
    max_attempts: challenge.maxAttempts,
    resend_available_at: challenge.resendAvailableAt,
    status: attemptsRemaining <= 0 ? 'LOCKED' : 'PENDING',
    provider: '2Factor',
    created_at: challenge.createdAt,
    verified_at: null,
  });

  if (attemptsRemaining <= 0) {
    challengeStore.delete(challengeId);
    logAuditEvent('SUSPICIOUS_OTP_ATTEMPTS', 'FAILED', {
      userId: challenge.userId,
      mobileNumber: cleanPhone,
      metadata: { reason: 'Max 3 attempts exceeded' },
    });

    return {
      success: false,
      challengeInvalidated: true,
      error: 'Incorrect OTP. You have reached the maximum attempt limit (3). Challenge cancelled.',
      attemptsRemaining: 0,
    };
  }

  return {
    success: false,
    challengeInvalidated: false,
    error: `Incorrect OTP. ${attemptsRemaining} ${attemptsRemaining === 1 ? 'attempt' : 'attempts'} remaining.`,
    attemptsRemaining,
  };
}

/**
 * Inspect active challenge metadata without leaking secret hash
 */
export function getChallengeMetadata(challengeId: string) {
  const c = challengeStore.get(challengeId) || getOTPChallenge(challengeId);
  if (!c) return null;
  const phone = 'phone' in c ? c.phone : c.mobile_number;
  const attempts = 'attempts' in c ? c.attempts : 0;
  const maxAttempts = 'maxAttempts' in c ? c.maxAttempts : 3;
  const expiresAt = 'expiresAt' in c ? c.expiresAt : c.expires_at;
  const resendAvailableAt = 'resendAvailableAt' in c ? c.resendAvailableAt : c.resend_available_at;

  return {
    challengeId: 'challengeId' in c ? c.challengeId : c.id,
    phoneMasked: `+91 ${phone.slice(0, 2)}******${phone.slice(-2)}`,
    expiresAt,
    attemptsRemaining: maxAttempts - attempts,
    resendAvailableAt,
    purpose: c.purpose,
  };
}
