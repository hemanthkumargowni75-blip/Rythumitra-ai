import { NextRequest, NextResponse } from 'next/server';
import { getUserByMobile, logAuditEvent } from '@/lib/db/database';
import { sendSecureOTP } from '@/lib/auth/otpService';
import { normalizeIndianMobile } from '@/lib/auth/phoneUtils';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { mobileNumber, phone } = body || {};

    const rawPhone = mobileNumber || phone || '';
    const norm = normalizeIndianMobile(rawPhone);

    if (!norm.valid) {
      return NextResponse.json(
        { success: false, error: norm.error || 'Invalid Indian mobile number. Must be a 10-digit number starting with 6, 7, 8, or 9.' },
        { status: 400 }
      );
    }

    const cleanPhone = norm.normalized;

    const user = getUserByMobile(cleanPhone);

    // Verify account exists
    if (!user) {
      logAuditEvent('PASSWORD_RESET_REQUESTED', 'FAILED', {
        mobileNumber: cleanPhone,
        metadata: { reason: 'Account not found' },
      });

      return NextResponse.json(
        {
          success: false,
          error: 'No account registered with this mobile number. Please check your mobile number or register.',
        },
        { status: 404 }
      );
    }

    // Issue OTP with purpose PASSWORD_RESET
    const result = await sendSecureOTP(cleanPhone, 'PASSWORD_RESET', user.user_id, {
      userId: user.user_id,
      preferredLanguage: user.preferred_language,
    });

    if (!result.success) {
      const statusCode = result.unconfigured ? 503 : 400;
      return NextResponse.json(
        {
          success: false,
          error: result.error || 'Unable to send OTP right now. Please try again.',
        },
        { status: statusCode }
      );
    }

    logAuditEvent('PASSWORD_RESET_REQUESTED', 'SUCCESS', {
      userId: user.user_id,
      mobileNumber: cleanPhone,
    });

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
      { success: false, error: error.message || 'Internal server error processing forgot password request.' },
      { status: 500 }
    );
  }
}
