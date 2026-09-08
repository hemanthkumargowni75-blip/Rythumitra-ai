import { NextRequest, NextResponse } from 'next/server';
import { verifySecureOTP } from '@/lib/auth/otpService';
import { getUserById, updateUser, createSession, logAuditEvent } from '@/lib/db/database';
import { normalizeIndianMobile } from '@/lib/auth/phoneUtils';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { challengeId, mobileNumber, phone, otp } = body || {};

    if (!challengeId || typeof challengeId !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Verification challenge ID is required.' },
        { status: 400 }
      );
    }

    const rawPhone = mobileNumber || phone || '';
    const norm = normalizeIndianMobile(rawPhone);
    const cleanPhone = norm.valid ? norm.normalized : (typeof rawPhone === 'string' ? rawPhone.replace(/\D/g, '').slice(-10) : '');
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

    // Strictly enforce LOGIN purpose
    const result = await verifySecureOTP(challengeId, cleanPhone, cleanOtp, 'LOGIN');

    if (!result.success) {
      logAuditEvent('LOGIN_FAILED', 'FAILED', {
        userId: result.userId,
        mobileNumber: cleanPhone,
        metadata: { error: result.error, attemptsRemaining: result.attemptsRemaining },
      });

      return NextResponse.json(
        {
          success: false,
          error: result.error || 'Invalid OTP.',
          attemptsRemaining: result.attemptsRemaining,
          challengeInvalidated: result.challengeInvalidated,
        },
        { status: 400 }
      );
    }

    const userId = result.userId;
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Authentication state invalid. Please log in again.' },
        { status: 400 }
      );
    }

    const user = getUserById(userId);
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Account not found.' },
        { status: 404 }
      );
    }

    // Update last login timestamp
    const now = new Date().toISOString();
    updateUser(userId, { last_login_at: now });

    // Issue authenticated session
    const { sessionToken, expiresAt } = createSession(user.user_id);

    logAuditEvent('LOGIN_OTP_VERIFIED', 'SUCCESS', {
      userId: user.user_id,
      mobileNumber: cleanPhone,
    });

    const clientUser = {
      id: user.user_id,
      user_id: user.user_id,
      name: user.name,
      first_name: user.first_name,
      last_name: user.last_name,
      firstName: user.first_name,
      lastName: user.last_name,
      mobile_number: user.mobile_number,
      phone: user.mobile_number,
      mobile_verified: true,
      role: user.role,
      preferred_language: user.preferred_language,
      preferredLanguage: user.preferred_language,
      created_at: user.created_at,
      updated_at: user.updated_at,
      last_login_at: now,
    };

    return NextResponse.json({
      success: true,
      message: 'Login successful.',
      sessionToken,
      expiresAt,
      user: clientUser,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error verifying login OTP.' },
      { status: 500 }
    );
  }
}
