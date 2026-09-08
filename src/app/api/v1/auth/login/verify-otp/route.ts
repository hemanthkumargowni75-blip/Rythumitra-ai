import { NextRequest, NextResponse } from 'next/server';
import { verifySecureOTP } from '@/lib/auth/otpService';
import { normalizeIndianMobile } from '@/lib/auth/phoneUtils';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { challengeId, phone, otp } = body || {};

    if (!challengeId || typeof challengeId !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Verification challenge ID is required.' },
        { status: 400 }
      );
    }

    const rawPhone = typeof phone === 'string' ? phone : '';
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

    const result = await verifySecureOTP(challengeId, cleanPhone, cleanOtp);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: result.error || 'Verification failed.',
          attemptsRemaining: result.attemptsRemaining,
          challengeInvalidated: result.challengeInvalidated,
        },
        { status: 400 }
      );
    }

    const user = {
      id: result.userId || `usr-${cleanPhone}`,
      name: 'Farmer',
      first_name: 'Farmer',
      last_name: '',
      firstName: 'Farmer',
      lastName: '',
      mobile_number: result.phone || cleanPhone,
      phone: result.phone || cleanPhone,
      mobile_verified: true,
      role: 'FARMER',
      preferred_language: 'te',
      preferredLanguage: 'te',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      message: 'Login OTP verified successfully.',
      sessionToken: result.sessionToken,
      user,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error verifying login OTP.' },
      { status: 500 }
    );
  }
}
