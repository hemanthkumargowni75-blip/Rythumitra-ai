import { NextRequest, NextResponse } from 'next/server';
import {
  verifySessionToken,
  getFarmProfileByUserId,
  saveFarmProfileForUser,
  updateUser,
} from '@/lib/db/database';

export async function GET(request: NextRequest) {
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

    // Retrieve farmer's farm profile from persistent database (Strict IDOR isolation)
    const farmProfile = getFarmProfileByUserId(user.user_id);

    const clientUser = {
      id: user.user_id,
      user_id: user.user_id,
      name: user.name,
      first_name: user.first_name,
      last_name: user.last_name,
      firstName: user.first_name,
      lastName: user.last_name,
      mobile_number: user.mobile_number,
      phone: user.mobile_number,
      mobile_verified: user.mobile_verified,
      preferred_language: user.preferred_language,
      preferredLanguage: user.preferred_language,
      role: user.role,
      account_status: user.account_status,
      created_at: user.created_at,
      updated_at: user.updated_at,
      last_login_at: user.last_login_at,
    };

    return NextResponse.json({
      success: true,
      user: clientUser,
      farm: farmProfile,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error fetching profile.' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
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
    const { firstName, lastName, preferredLanguage, farmData } = body || {};

    // Update basic user profile if provided
    const userUpdates: Record<string, any> = {};
    if (firstName && typeof firstName === 'string') userUpdates.first_name = firstName.trim();
    if (lastName && typeof lastName === 'string') userUpdates.last_name = lastName.trim();
    if (preferredLanguage && typeof preferredLanguage === 'string') userUpdates.preferred_language = preferredLanguage;

    if (Object.keys(userUpdates).length > 0) {
      updateUser(user.user_id, userUpdates);
    }

    // Update or create farm profile strictly isolated to this user ID
    let updatedFarm = null;
    if (farmData && typeof farmData === 'object') {
      updatedFarm = saveFarmProfileForUser(user.user_id, farmData);
    }

    return NextResponse.json({
      success: true,
      message: 'Profile updated successfully.',
      farm: updatedFarm,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error updating profile.' },
      { status: 500 }
    );
  }
}
