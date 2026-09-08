import { NextRequest, NextResponse } from 'next/server';
import { verifySecureOTP } from '@/lib/auth/otpService';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { challengeId, phone, otp } = body;

    if (!challengeId || !phone || !otp) {
      return NextResponse.json(
        { success: false, error: 'Challenge ID, mobile number, and OTP are required' },
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

    // Set secure session cookie if production HTTPS
    const response = NextResponse.json({
      success: true,
      message: 'OTP verified successfully.',
      sessionToken: verification.sessionToken,
      userId: verification.userId || 'usr-farmer',
    });

    response.cookies.set({
      name: 'rm_session',
      value: verification.sessionToken!,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: '/',
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'OTP verification failed' },
      { status: 500 }
    );
  }
}
