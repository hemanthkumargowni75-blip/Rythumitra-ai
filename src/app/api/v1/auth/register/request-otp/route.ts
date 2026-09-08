import { NextRequest, NextResponse } from 'next/server';
import { sendSecureOTP } from '@/lib/auth/otpService';
import { validatePassword, hashPassword } from '@/lib/auth/passwordUtils';
import { getUserByMobile, logAuditEvent } from '@/lib/db/database';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const firstName = body?.first_name || body?.firstName;
    const lastName = body?.last_name || body?.lastName;
    const rawPhone = body?.mobile_number || body?.phone || body?.mobileNumber;
    const password = body?.password;
    const confirmPassword = body?.confirm_password || body?.confirmPassword;
    const preferredLanguage = body?.language || body?.preferred_language || body?.preferredLanguage || 'te';

    // 1. Validate First Name
    const cleanFirstName = typeof firstName === 'string' ? firstName.trim() : '';
    if (!cleanFirstName || cleanFirstName.length < 1 || cleanFirstName.length > 50) {
      return NextResponse.json(
        { success: false, error: 'First name is required (1 to 50 characters).' },
        { status: 400 }
      );
    }
    // Reject invalid characters: numbers and dangerous symbols
    if (/[0-9<>%$#@!&*()+=_{}[\]:;"?/\\]/.test(cleanFirstName)) {
      return NextResponse.json(
        { success: false, error: 'First name contains invalid characters. Use letters only.' },
        { status: 400 }
      );
    }

    // 2. Validate Last Name
    const cleanLastName = typeof lastName === 'string' ? lastName.trim() : '';
    if (!cleanLastName || cleanLastName.length < 1 || cleanLastName.length > 50) {
      return NextResponse.json(
        { success: false, error: 'Last name is required (1 to 50 characters).' },
        { status: 400 }
      );
    }
    if (/[0-9<>%$#@!&*()+=_{}[\]:;"?/\\]/.test(cleanLastName)) {
      return NextResponse.json(
        { success: false, error: 'Last name contains invalid characters. Use letters only.' },
        { status: 400 }
      );
    }

    // 3. Validate Mobile Number (Indian mobile format)
    const rawPhoneStr = typeof rawPhone === 'string' ? rawPhone : '';
    const cleanPhone = rawPhoneStr.replace(/\D/g, '').slice(-10);
    if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      return NextResponse.json(
        { success: false, error: 'Invalid Indian mobile number. Must be a 10-digit number starting with 6, 7, 8, or 9.' },
        { status: 400 }
      );
    }

    // Check if account already exists
    const existingUser = getUserByMobile(cleanPhone);
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'An account with this mobile number already exists. Please log in.' },
        { status: 409 }
      );
    }

    // 4. Validate Password & Confirm Password
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      return NextResponse.json(
        { success: false, error: passwordValidation.error },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { success: false, error: 'Passwords do not match.' },
        { status: 400 }
      );
    }

    // Hash password immediately using memory-hard scrypt KDF
    const passwordHash = hashPassword(password);

    // 5. Validate Language
    const validLanguages = ['en', 'te', 'hi', 'ta', 'kn', 'ml', 'mr'];
    const chosenLang = validLanguages.includes(preferredLanguage) ? preferredLanguage : 'te';

    // 6. Send Secure OTP Challenge (Purpose: REGISTER)
    const result = await sendSecureOTP(
      cleanPhone,
      'REGISTER',
      undefined,
      {
        firstName: cleanFirstName,
        lastName: cleanLastName,
        first_name: cleanFirstName,
        last_name: cleanLastName,
        mobile_number: cleanPhone,
        phone: cleanPhone,
        passwordHash,
        preferredLanguage: chosenLang,
        preferred_language: chosenLang,
      }
    );

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

    logAuditEvent('REGISTRATION_OTP_SENT', 'SUCCESS', {
      mobileNumber: cleanPhone,
      metadata: { preferredLanguage: chosenLang },
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
      { success: false, error: error.message || 'Internal server error processing registration OTP request.' },
      { status: 500 }
    );
  }
}
