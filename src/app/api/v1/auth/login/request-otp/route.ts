import { NextRequest, NextResponse } from 'next/server';
import { sendSecureOTP } from '@/lib/auth/otpService';
import { normalizeIndianMobile } from '@/lib/auth/phoneUtils';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { phone } = body || {};

    const rawPhone = typeof phone === 'string' ? phone : '';
    const norm = normalizeIndianMobile(rawPhone);

    if (!norm.valid) {
      return NextResponse.json(
        { success: false, error: norm.error || 'Invalid Indian mobile number. Must be a 10-digit number starting with 6, 7, 8, or 9.' },
        { status: 400 }
      );
    }

    const cleanPhone = norm.normalized;

    const result = await sendSecureOTP(cleanPhone, 'LOGIN');

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
      message: 'Login OTP dispatched to your registered mobile number.',
      challengeId: result.challengeId,
      expiresInSeconds: result.expiresInSeconds,
      resendCooldownSeconds: result.resendCooldownSeconds,
      phoneMasked: result.phoneMasked,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error requesting login OTP.' },
      { status: 500 }
    );
  }
}
