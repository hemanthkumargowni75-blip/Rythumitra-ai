import { NextRequest, NextResponse } from 'next/server';
import { getUserByMobile, logAuditEvent } from '@/lib/db/database';
import { verifyPassword } from '@/lib/auth/passwordUtils';
import { sendSecureOTP } from '@/lib/auth/otpService';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { mobileNumber, phone, password } = body || {};

    const rawPhone = mobileNumber || phone || '';
    const cleanPhone = typeof rawPhone === 'string' ? rawPhone.replace(/\D/g, '').slice(-10) : '';

    if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      return NextResponse.json(
        { success: false, error: 'Invalid Indian mobile number. Must be a 10-digit number starting with 6, 7, 8, or 9.' },
        { status: 400 }
      );
    }

    if (!password || typeof password !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Password is required.' },
        { status: 400 }
      );
    }

    // Lookup user in database
    const user = getUserByMobile(cleanPhone);

    // Constant-time check / safe credentials validation
    if (!user || !user.password_hash || !verifyPassword(password, user.password_hash)) {
      logAuditEvent('LOGIN_FAILED', 'FAILED', {
        mobileNumber: cleanPhone,
        metadata: { reason: 'Invalid mobile or password' },
      });

      return NextResponse.json(
        { success: false, error: 'Invalid mobile number or password.' },
        { status: 401 }
      );
    }

    if (user.account_status !== 'ACTIVE') {
      return NextResponse.json(
        { success: false, error: 'Account is suspended or inactive. Please contact support.' },
        { status: 403 }
      );
    }

    logAuditEvent('LOGIN_PASSWORD_ACCEPTED', 'SUCCESS', {
      userId: user.user_id,
      mobileNumber: cleanPhone,
    });

    // Generate and dispatch OTP challenge for purpose LOGIN
    // CRITICAL: Entering password alone NEVER grants a session.
    const result = await sendSecureOTP(cleanPhone, 'LOGIN', user.user_id, {
      userId: user.user_id,
      preferredLanguage: user.preferred_language,
    });

    if (!result.success) {
      const statusCode = result.unconfigured ? 503 : 400;
      return NextResponse.json(
        {
          success: false,
          error: result.error || 'OTP service is temporarily unavailable. Please try again later.',
        },
        { status: statusCode }
      );
    }

    logAuditEvent('LOGIN_OTP_SENT', 'SUCCESS', {
      userId: user.user_id,
      mobileNumber: cleanPhone,
    });

    return NextResponse.json({
      success: true,
      message: 'Credentials verified. Verification code dispatched to your registered mobile number.',
      challengeId: result.challengeId,
      expiresInSeconds: result.expiresInSeconds,
      resendCooldownSeconds: result.resendCooldownSeconds,
      phoneMasked: result.phoneMasked,
      requiresOtp: true,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error processing password login.' },
      { status: 500 }
    );
  }
}
