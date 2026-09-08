import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { normalizeIndianMobile } from '@/lib/auth/phoneUtils';

export type UserRole = 'FARMER' | 'EXPERT' | 'ADMIN' | 'SUPER_ADMIN';
export type AccountStatus = 'ACTIVE' | 'SUSPENDED' | 'PENDING';
export type OTPPurpose = 'REGISTER' | 'LOGIN' | 'FORGOT_PASSWORD' | 'CHANGE_PASSWORD' | 'SENSITIVE_ACTION';
export type ChallengeStatus = 'PENDING' | 'VERIFIED' | 'EXPIRED' | 'LOCKED';

export interface DbUser {
  user_id: string;
  first_name: string;
  last_name: string;
  name: string;
  mobile_number: string;
  mobile_verified: boolean;
  password_hash: string;
  preferred_language: string;
  role: UserRole;
  account_status: AccountStatus;
  created_at: string;
  updated_at: string;
  last_login_at?: string;
}

export interface DbFarmProfile {
  id: string;
  user_id: string;
  farm_name: string;
  state: string;
  district: string;
  sub_district: string;
  village: string;
  latitude?: number | null;
  longitude?: number | null;
  farm_area?: number | null;
  farm_boundary?: any | null;
  soil_information?: any | null;
  irrigation_method?: string | null;
  crop?: string | null;
  variety?: string | null;
  sowing_date?: string | null;
  created_at: string;
  updated_at: string;
}

export interface DbOTPChallenge {
  id: string;
  user_id?: string | null;
  mobile_number: string;
  purpose: OTPPurpose;
  hashed_otp: string;
  salt: string;
  expires_at: number;
  attempts: number;
  max_attempts: number;
  resend_available_at: number;
  status: ChallengeStatus;
  provider: string;
  provider_request_id?: string | null;
  metadata?: any;
  created_at: number;
  verified_at?: number | null;
}

export interface DbPasswordResetChallenge {
  id: string;
  user_id: string;
  mobile_number: string;
  token_hash: string;
  expires_at: number;
  used: boolean;
  created_at: number;
}

export interface DbSession {
  id: string;
  session_token: string;
  user_id: string;
  expires_at: number;
  created_at: number;
  last_active_at: number;
}

export type SecurityAuditEventType =
  | 'REGISTRATION_REQUESTED'
  | 'REGISTRATION_OTP_SENT'
  | 'REGISTRATION_OTP_VERIFIED'
  | 'LOGIN_PASSWORD_ACCEPTED'
  | 'LOGIN_OTP_SENT'
  | 'LOGIN_OTP_VERIFIED'
  | 'LOGIN_FAILED'
  | 'PASSWORD_RESET_REQUESTED'
  | 'PASSWORD_RESET_OTP_VERIFIED'
  | 'PASSWORD_CHANGED'
  | 'LOGOUT'
  | 'SUSPICIOUS_OTP_ATTEMPTS';

export interface DbAuditEvent {
  id: string;
  user_id?: string | null;
  mobile_number?: string | null;
  event_type: SecurityAuditEventType;
  ip_address?: string;
  status: 'SUCCESS' | 'FAILED';
  metadata?: Record<string, any>;
  created_at: string;
}

export interface DatabaseSchema {
  users: DbUser[];
  farm_profiles: DbFarmProfile[];
  otp_challenges: DbOTPChallenge[];
  password_reset_challenges: DbPasswordResetChallenge[];
  sessions: DbSession[];
  audit_events: DbAuditEvent[];
}

const DB_DIR = path.resolve(process.cwd(), 'data');
const DB_FILE = path.join(DB_DIR, 'rythumitra.db.json');

// In-memory cache synced with disk
let cachedDb: DatabaseSchema | null = null;
let lastDbMtime = 0;
let writeQueue: Promise<void> = Promise.resolve();

function getInitialSchema(): DatabaseSchema {
  return {
    users: [],
    farm_profiles: [],
    otp_challenges: [],
    password_reset_challenges: [],
    sessions: [],
    audit_events: [],
  };
}

/**
 * Load database from disk into memory with mtime freshness check
 */
export function loadDatabase(): DatabaseSchema {
  try {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }

    if (fs.existsSync(DB_FILE)) {
      const stats = fs.statSync(DB_FILE);
      if (!cachedDb || stats.mtimeMs > lastDbMtime) {
        const content = fs.readFileSync(DB_FILE, 'utf8');
        cachedDb = JSON.parse(content);
        lastDbMtime = stats.mtimeMs;
      }
    } else {
      cachedDb = getInitialSchema();
      saveDatabaseSync(cachedDb);
      if (fs.existsSync(DB_FILE)) {
        lastDbMtime = fs.statSync(DB_FILE).mtimeMs;
      }
    }
  } catch (err) {
    console.error('Failed to load database from disk, initializing fresh:', err);
    if (!cachedDb) cachedDb = getInitialSchema();
  }

  return cachedDb!;
}

/**
 * Synchronous save to disk (Windows and OneDrive safe)
 */
function saveDatabaseSync(db: DatabaseSchema): void {
  try {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf8');
    if (fs.existsSync(DB_FILE)) {
      lastDbMtime = fs.statSync(DB_FILE).mtimeMs;
    }
  } catch (err) {
    console.error('Database write error:', err);
  }
}

/**
 * Persist database asynchronously with sequential queuing
 */
export function persistDatabase(): Promise<void> {
  const currentDb = cachedDb || loadDatabase();
  writeQueue = writeQueue.then(() => {
    saveDatabaseSync(currentDb);
  });
  return writeQueue;
}

// -----------------------------------------------------------------------------
// USER OPERATIONS
// -----------------------------------------------------------------------------

export function getUserByMobile(mobile: string): DbUser | null {
  const db = loadDatabase();
  const norm = normalizeIndianMobile(mobile);
  const cleanMobile = norm.valid ? norm.normalized : mobile.replace(/\D/g, '').slice(-10);
  return db.users.find((u) => u.mobile_number === cleanMobile) || null;
}

export function getUserById(userId: string): DbUser | null {
  const db = loadDatabase();
  return db.users.find((u) => u.user_id === userId) || null;
}

export function createUser(userData: Omit<DbUser, 'user_id' | 'created_at' | 'updated_at'> & { user_id?: string }): DbUser {
  const db = loadDatabase();
  const now = new Date().toISOString();
  const norm = normalizeIndianMobile(userData.mobile_number);
  const cleanMobile = norm.valid ? norm.normalized : userData.mobile_number.replace(/\D/g, '').slice(-10);

  // Check uniqueness
  const existing = db.users.find((u) => u.mobile_number === cleanMobile);
  if (existing) {
    throw new Error('An account with this mobile number already exists.');
  }

  const newUser: DbUser = {
    user_id: userData.user_id || `usr-${Date.now()}-${crypto.randomBytes(4).toString('hex')}`,
    first_name: userData.first_name.trim(),
    last_name: userData.last_name.trim(),
    name: `${userData.first_name.trim()} ${userData.last_name.trim()}`.trim(),
    mobile_number: cleanMobile,
    mobile_verified: userData.mobile_verified ?? true,
    password_hash: userData.password_hash,
    preferred_language: userData.preferred_language || 'te',
    role: userData.role || 'FARMER',
    account_status: userData.account_status || 'ACTIVE',
    created_at: now,
    updated_at: now,
    last_login_at: now,
  };

  db.users.push(newUser);
  saveDatabaseSync(db);
  return newUser;
}

export function updateUser(userId: string, updates: Partial<DbUser>): DbUser | null {
  const db = loadDatabase();
  const idx = db.users.findIndex((u) => u.user_id === userId);
  if (idx === -1) return null;

  const current = db.users[idx];
  const updatedUser: DbUser = {
    ...current,
    ...updates,
    updated_at: new Date().toISOString(),
  };

  if (updates.first_name || updates.last_name) {
    const f = (updates.first_name || current.first_name).trim();
    const l = (updates.last_name || current.last_name).trim();
    updatedUser.name = `${f} ${l}`.trim();
  }

  db.users[idx] = updatedUser;
  saveDatabaseSync(db);
  return updatedUser;
}

// -----------------------------------------------------------------------------
// FARM PROFILE OPERATIONS (IDOR PROTECTED)
// -----------------------------------------------------------------------------

export function getFarmProfileByUserId(userId: string): DbFarmProfile | null {
  const db = loadDatabase();
  return db.farm_profiles.find((f) => f.user_id === userId) || null;
}

export function saveFarmProfileForUser(
  userId: string,
  data: Partial<Omit<DbFarmProfile, 'id' | 'user_id' | 'created_at' | 'updated_at'>>
): DbFarmProfile {
  const db = loadDatabase();
  const now = new Date().toISOString();
  const existingIdx = db.farm_profiles.findIndex((f) => f.user_id === userId);

  if (existingIdx !== -1) {
    const existing = db.farm_profiles[existingIdx];
    const updated: DbFarmProfile = {
      ...existing,
      ...data,
      updated_at: now,
    };
    db.farm_profiles[existingIdx] = updated;
    persistDatabase();
    return updated;
  }

  const newProfile: DbFarmProfile = {
    id: `farm-${Date.now()}-${crypto.randomBytes(3).toString('hex')}`,
    user_id: userId,
    farm_name: data.farm_name || 'My Farm',
    state: data.state || '',
    district: data.district || '',
    sub_district: data.sub_district || '',
    village: data.village || '',
    latitude: data.latitude ?? null,
    longitude: data.longitude ?? null,
    farm_area: data.farm_area ?? null,
    farm_boundary: data.farm_boundary ?? null,
    soil_information: data.soil_information ?? null,
    irrigation_method: data.irrigation_method ?? null,
    crop: data.crop ?? null,
    variety: data.variety ?? null,
    sowing_date: data.sowing_date ?? null,
    created_at: now,
    updated_at: now,
  };

  db.farm_profiles.push(newProfile);
  persistDatabase();
  return newProfile;
}

// -----------------------------------------------------------------------------
// SESSION OPERATIONS
// -----------------------------------------------------------------------------

const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

export function createSession(userId: string): { sessionToken: string; expiresAt: number } {
  const db = loadDatabase();
  const secret = process.env.JWT_SECRET || 'rythumitra_prod_session_secret_2026';
  const now = Date.now();
  const expiresAt = now + SESSION_TTL_MS;

  const rawToken = `${userId}:${now}:${crypto.randomBytes(24).toString('base64url')}`;
  const sig = crypto.createHmac('sha256', secret).update(rawToken).digest('hex');
  const sessionToken = `rm_sess_${Buffer.from(rawToken).toString('base64url')}.${sig}`;

  const sessionRecord: DbSession = {
    id: `sess-${crypto.randomBytes(8).toString('hex')}`,
    session_token: sessionToken,
    user_id: userId,
    expires_at: expiresAt,
    created_at: now,
    last_active_at: now,
  };

  db.sessions.push(sessionRecord);
  saveDatabaseSync(db);

  return { sessionToken, expiresAt };
}

export function verifySessionToken(token: string): DbUser | null {
  if (!token || !token.startsWith('rm_sess_')) return null;
  const db = loadDatabase();
  const now = Date.now();

  const session = db.sessions.find((s) => s.session_token === token && s.expires_at > now);
  if (!session) return null;

  session.last_active_at = now;
  saveDatabaseSync(db);

  return getUserById(session.user_id);
}

export function invalidateSessionsForUser(userId: string): void {
  const db = loadDatabase();
  db.sessions = db.sessions.filter((s) => s.user_id !== userId);
  saveDatabaseSync(db);
}

// -----------------------------------------------------------------------------
// OTP CHALLENGE PERSISTENCE
// -----------------------------------------------------------------------------

export function saveOTPChallenge(challenge: DbOTPChallenge): void {
  const db = loadDatabase();
  const idx = db.otp_challenges.findIndex((c) => c.id === challenge.id);
  if (idx !== -1) {
    db.otp_challenges[idx] = challenge;
  } else {
    db.otp_challenges.push(challenge);
  }
  saveDatabaseSync(db);
}

export function getOTPChallenge(challengeId: string): DbOTPChallenge | null {
  const db = loadDatabase();
  return db.otp_challenges.find((c) => c.id === challengeId) || null;
}

export function invalidateOTPChallenge(challengeId: string): void {
  const db = loadDatabase();
  const c = db.otp_challenges.find((item) => item.id === challengeId);
  if (c) {
    c.status = 'EXPIRED';
    saveDatabaseSync(db);
  }
}

// -----------------------------------------------------------------------------
// PASSWORD RESET CHALLENGE OPERATIONS
// -----------------------------------------------------------------------------

const RESET_TOKEN_TTL_MS = 10 * 60 * 1000; // 10 minutes

export function createPasswordResetToken(userId: string, mobile: string): string {
  const db = loadDatabase();
  const now = Date.now();
  const rawToken = crypto.randomBytes(32).toString('hex');
  const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex');
  const norm = normalizeIndianMobile(mobile);
  const cleanMobile = norm.valid ? norm.normalized : mobile.replace(/\D/g, '').slice(-10);

  const challenge: DbPasswordResetChallenge = {
    id: `rst-${crypto.randomBytes(8).toString('hex')}`,
    user_id: userId,
    mobile_number: cleanMobile,
    token_hash: tokenHash,
    expires_at: now + RESET_TOKEN_TTL_MS,
    used: false,
    created_at: now,
  };

  db.password_reset_challenges.push(challenge);
  saveDatabaseSync(db);

  return rawToken;
}

export function verifyPasswordResetToken(rawToken: string): DbUser | null {
  if (!rawToken || typeof rawToken !== 'string') return null;
  const db = loadDatabase();
  const now = Date.now();
  const tokenHash = crypto.createHash('sha256').update(rawToken.trim()).digest('hex');

  const challenge = db.password_reset_challenges.find(
    (c) => c.token_hash === tokenHash && !c.used && c.expires_at > now
  );

  if (!challenge) return null;
  return getUserById(challenge.user_id);
}

export function markPasswordResetTokenUsed(rawToken: string): void {
  const db = loadDatabase();
  const tokenHash = crypto.createHash('sha256').update(rawToken.trim()).digest('hex');
  const challenge = db.password_reset_challenges.find((c) => c.token_hash === tokenHash);
  if (challenge) {
    challenge.used = true;
    saveDatabaseSync(db);
  }
}

// -----------------------------------------------------------------------------
// SECURITY AUDIT LOGGING
// -----------------------------------------------------------------------------

export function logAuditEvent(
  eventType: SecurityAuditEventType,
  status: 'SUCCESS' | 'FAILED',
  details: {
    userId?: string | null;
    mobileNumber?: string | null;
    ipAddress?: string;
    metadata?: Record<string, any>;
  }
): void {
  const db = loadDatabase();
  // Sanitize metadata to never include password or plaintext OTP
  const safeMeta = { ...(details.metadata || {}) };
  delete safeMeta.password;
  delete safeMeta.currentPassword;
  delete safeMeta.newPassword;
  delete safeMeta.confirmPassword;
  delete safeMeta.otp;
  delete safeMeta.apiKey;

  const event: DbAuditEvent = {
    id: `audit-${Date.now()}-${crypto.randomBytes(4).toString('hex')}`,
    user_id: details.userId || null,
    mobile_number: details.mobileNumber ? details.mobileNumber.replace(/\D/g, '').slice(-10) : null,
    event_type: eventType,
    ip_address: details.ipAddress || '127.0.0.1',
    status,
    metadata: safeMeta,
    created_at: new Date().toISOString(),
  };

  db.audit_events.push(event);
  persistDatabase();
}
