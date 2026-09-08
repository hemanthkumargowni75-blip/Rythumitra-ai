import { NextRequest, NextResponse } from 'next/server';
import { verifySessionToken, updateUser, logAuditEvent } from '@/lib/db/database';
import { verifySecureOTP } from '@/lib/auth/otpService';

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization') || '';
    const token = authHeader.replace(/^Bearer\s+/i, '').trim();

    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Authentication session required.' },
        { status: 401 }
      );
    }

    const user = verifySessionToken(token);
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Session expired or invalid. Please sign in again.' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { challengeId, otp } = body || {};

    if (!challengeId || typeof challengeId !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Verification challenge ID is required.' },
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

    // Verify OTP with strict CHANGE_PASSWORD purpose
    const result = await verifySecureOTP(challengeId, user.mobile_number, cleanOtp, 'CHANGE_PASSWORD');

    if (!result.success) {
      logAuditEvent('PASSWORD_CHANGED', 'FAILED', {
        userId: user.user_id,
        mobileNumber: user.mobile_number,
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

    const newPasswordHash = result.metadata?.newPasswordHash;
    if (!newPasswordHash) {
      return NextResponse.json(
        { success: false, error: 'Password change security token invalid. Please request a new OTP.' },
        { status: 400 }
      );
    }

    // Update password in database
    updateUser(user.user_id, { password_hash: newPasswordHash });

    logAuditEvent('PASSWORD_CHANGED', 'SUCCESS', {
      userId: user.user_id,
      mobileNumber: user.mobile_number,
      metadata: { method: 'SETTINGS_CHANGE_PASSWORD' },
    });

    return NextResponse.json({
      success: true,
      message: 'Password changed successfully.',
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error changing password.' },
      { status: 500 }
    );
  }
}
