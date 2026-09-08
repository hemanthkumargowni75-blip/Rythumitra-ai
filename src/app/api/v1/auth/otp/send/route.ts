import { NextRequest, NextResponse } from 'next/server';
import { sendSecureOTP } from '@/lib/auth/otpService';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { phone, purpose = 'LOGIN', userId } = body;

    if (!phone || typeof phone !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Mobile number is required' },
        { status: 400 }
      );
    }

    const result = await sendSecureOTP(phone, purpose, userId);

    if (!result.success) {
      const status = result.unconfigured ? 503 : 400;
      return NextResponse.json(
        {
          success: false,
          error: result.error,
          providerConfigured: result.providerConfigured,
          providerName: result.providerName,
        },
        { status }
      );
    }

    return NextResponse.json({
      success: true,
      challengeId: result.challengeId,
      expiresInSeconds: result.expiresInSeconds,
      resendCooldownSeconds: result.resendCooldownSeconds,
      providerConfigured: result.providerConfigured,
      providerName: result.providerName,
      message: 'OTP challenge issued successfully.',
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error processing OTP request' },
      { status: 500 }
    );
  }
}
