import { NextRequest, NextResponse } from 'next/server';
import { verifySecureOTP } from '@/lib/auth/otpService';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { challengeId, phone, otp, userId } = body;

    if (!challengeId || !phone || !otp) {
      return NextResponse.json(
        { success: false, error: 'Challenge ID, mobile number, and 2FA OTP are required' },
        { status: 400 }
      );
    }

    const verification = await verifySecureOTP(challengeId, phone, otp);

    if (!verification.success) {
      return NextResponse.json(
        {
          success: false,
          error: verification.error,
          attemptsRemaining: verification.attemptsRemaining,
          challengeInvalidated: verification.challengeInvalidated,
        },
        { status: 401 }
      );
    }

    const response = NextResponse.json({
      success: true,
      twoFactorPassed: true,
      message: '2FA authentication completed successfully.',
      sessionToken: verification.sessionToken,
      userId: userId || verification.userId || 'usr-farmer',
    });

    response.cookies.set({
      name: 'rm_2fa_verified',
      value: 'true',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || '2FA verification failed' },
      { status: 500 }
    );
  }
}
