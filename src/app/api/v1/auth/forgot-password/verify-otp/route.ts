import { NextRequest, NextResponse } from 'next/server';
import { verifySecureOTP } from '@/lib/auth/otpService';
import { createPasswordResetToken, logAuditEvent } from '@/lib/db/database';

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
    const cleanPhone = typeof rawPhone === 'string' ? rawPhone.replace(/\D/g, '').slice(-10) : '';
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

    // Strictly enforce FORGOT_PASSWORD purpose
    const result = await verifySecureOTP(challengeId, cleanPhone, cleanOtp, 'FORGOT_PASSWORD');

    if (!result.success) {
      logAuditEvent('PASSWORD_RESET_OTP_VERIFIED', 'FAILED', {
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
        { success: false, error: 'Unable to authorize password reset. Please try again.' },
        { status: 400 }
      );
    }

    // Issue short-lived, single-use password reset authorization token
    const resetToken = createPasswordResetToken(userId, cleanPhone);

    logAuditEvent('PASSWORD_RESET_OTP_VERIFIED', 'SUCCESS', {
      userId,
      mobileNumber: cleanPhone,
    });

    return NextResponse.json({
      success: true,
      message: 'OTP verified. You may now create a new password.',
      resetToken,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error verifying forgot password OTP.' },
      { status: 500 }
    );
  }
}
