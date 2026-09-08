import { NextRequest, NextResponse } from 'next/server';
import {
  verifyPasswordResetToken,
  markPasswordResetTokenUsed,
  updateUser,
  invalidateSessionsForUser,
  logAuditEvent,
} from '@/lib/db/database';
import { validatePassword, hashPassword } from '@/lib/auth/passwordUtils';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { resetToken, newPassword, confirmPassword } = body || {};

    if (!resetToken || typeof resetToken !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Password reset authorization token is required.' },
        { status: 400 }
      );
    }

    // Verify token validity server-side
    const user = verifyPasswordResetToken(resetToken);
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Invalid or expired password reset link/token. Please request a new OTP.' },
        { status: 400 }
      );
    }

    // Validate password complexity
    const validation = validatePassword(newPassword);
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: 400 }
      );
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        { success: false, error: 'Passwords do not match.' },
        { status: 400 }
      );
    }

    // Hash new password using scrypt KDF
    const newHash = hashPassword(newPassword);

    // Update database
    updateUser(user.user_id, { password_hash: newHash });

    // Mark reset token as used immediately to prevent replay
    markPasswordResetTokenUsed(resetToken);

    // Invalidate all active user sessions upon password reset
    invalidateSessionsForUser(user.user_id);

    logAuditEvent('PASSWORD_CHANGED', 'SUCCESS', {
      userId: user.user_id,
      mobileNumber: user.mobile_number,
      metadata: { method: 'FORGOT_PASSWORD_RESET' },
    });

    return NextResponse.json({
      success: true,
      message: 'Password reset successfully. Please sign in with your new password.',
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error resetting password.' },
      { status: 500 }
    );
  }
}
