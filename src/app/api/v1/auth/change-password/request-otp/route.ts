import { NextRequest, NextResponse } from 'next/server';
import { verifySessionToken } from '@/lib/db/database';
import { verifyPassword, validatePassword, hashPassword } from '@/lib/auth/passwordUtils';
import { sendSecureOTP } from '@/lib/auth/otpService';

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
    const { currentPassword, newPassword, confirmPassword } = body || {};

    if (!currentPassword || typeof currentPassword !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Current password is required.' },
        { status: 400 }
      );
    }

    // Verify current password against stored hash
    if (!user.password_hash || !verifyPassword(currentPassword, user.password_hash)) {
      return NextResponse.json(
        { success: false, error: 'Current password is incorrect.' },
        { status: 400 }
      );
    }

    // Validate new password
    const validation = validatePassword(newPassword);
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: 400 }
      );
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        { success: false, error: 'New passwords do not match.' },
        { status: 400 }
      );
    }

    if (currentPassword === newPassword) {
      return NextResponse.json(
        { success: false, error: 'New password must be different from current password.' },
        { status: 400 }
      );
    }

    // Pre-hash new password
    const newPasswordHash = hashPassword(newPassword);

    // Issue OTP with purpose CHANGE_PASSWORD
    // CRITICAL: A password change requires BOTH valid credentials AND OTP verification.
    const result = await sendSecureOTP(user.mobile_number, 'CHANGE_PASSWORD', user.user_id, {
      userId: user.user_id,
      newPasswordHash,
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

    return NextResponse.json({
      success: true,
      message: 'Verification code dispatched to your registered mobile number.',
      challengeId: result.challengeId,
      expiresInSeconds: result.expiresInSeconds,
      resendCooldownSeconds: result.resendCooldownSeconds,
      phoneMasked: result.phoneMasked,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error requesting password change OTP.' },
      { status: 500 }
    );
  }
}
