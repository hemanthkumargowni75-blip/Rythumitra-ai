import { NextRequest, NextResponse } from 'next/server';
import { verifySecureOTP } from '@/lib/auth/otpService';
import { createUser, createSession, logAuditEvent } from '@/lib/db/database';
import { sanitizeUser } from '@/lib/auth/passwordUtils';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { challengeId, phone, otp } = body || {};

    if (!challengeId || typeof challengeId !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Verification challenge ID is required.' },
        { status: 400 }
      );
    }

    const rawPhone = typeof phone === 'string' ? phone : '';
    const cleanPhone = rawPhone.replace(/\D/g, '').slice(-10);
    if (!cleanPhone || cleanPhone.length !== 10) {
      return NextResponse.json(
        { success: false, error: 'Valid 10-digit mobile number is required.' },
        { status: 400 }
      );
    }

    const cleanOtp = typeof otp === 'string' ? otp.trim() : '';
    if (!/^\d{6}$/.test(cleanOtp)) {
      return NextResponse.json(
        { success: false, error: 'Verification code must be exactly 6 digits.' },
        { status: 400 }
      );
    }

    // Verify OTP challenge strictly enforcing REGISTER purpose
    const result = await verifySecureOTP(challengeId, cleanPhone, cleanOtp, 'REGISTER');

    if (!result.success) {
      logAuditEvent('REGISTRATION_OTP_VERIFIED', 'FAILED', {
        mobileNumber: cleanPhone,
        metadata: { error: result.error, attemptsRemaining: result.attemptsRemaining },
      });

      return NextResponse.json(
        {
          success: false,
          error: result.error || 'Verification failed.',
          attemptsRemaining: result.attemptsRemaining,
          challengeInvalidated: result.challengeInvalidated,
        },
        { status: 400 }
      );
    }

    // Extract pre-hashed password and profile metadata
    const metadata = result.metadata || {};
    const firstName = (metadata.first_name || metadata.firstName || '').trim();
    const lastName = (metadata.last_name || metadata.lastName || '').trim();
    const passwordHash = metadata.passwordHash;
    const preferredLang = metadata.preferred_language || metadata.preferredLanguage || 'te';

    if (!firstName || !lastName) {
      return NextResponse.json(
        { success: false, error: 'Registration metadata missing valid first name or last name. Please register again.' },
        { status: 400 }
      );
    }

    if (!passwordHash) {
      return NextResponse.json(
        { success: false, error: 'Registration security metadata corrupted. Please register again.' },
        { status: 400 }
      );
    }

    // Persist verified user in backend database
    const createdUser = createUser({
      first_name: firstName,
      last_name: lastName,
      name: `${firstName} ${lastName}`.trim(),
      mobile_number: cleanPhone,
      mobile_verified: true,
      password_hash: passwordHash,
      preferred_language: preferredLang,
      role: 'FARMER',
      account_status: 'ACTIVE',
    });

    // Issue authenticated session
    const { sessionToken, expiresAt } = createSession(createdUser.user_id);

    logAuditEvent('REGISTRATION_OTP_VERIFIED', 'SUCCESS', {
      userId: createdUser.user_id,
      mobileNumber: cleanPhone,
      metadata: { preferredLanguage: preferredLang },
    });

    const clientUser = {
      id: createdUser.user_id,
      user_id: createdUser.user_id,
      name: createdUser.name,
      first_name: createdUser.first_name,
      last_name: createdUser.last_name,
      firstName: createdUser.first_name,
      lastName: createdUser.last_name,
      mobile_number: createdUser.mobile_number,
      phone: createdUser.mobile_number,
      mobile_verified: true,
      role: createdUser.role,
      preferred_language: createdUser.preferred_language,
      preferredLanguage: createdUser.preferred_language,
      created_at: createdUser.created_at,
      updated_at: createdUser.updated_at,
    };

    return NextResponse.json({
      success: true,
      message: 'Farmer registered and verified successfully.',
      sessionToken,
      expiresAt,
      user: clientUser,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error verifying registration OTP.' },
      { status: 500 }
    );
  }
}
