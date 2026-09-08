'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole, AuthState, Language } from '@/types';
import { useRouter } from 'next/navigation';
import { normalizeIndianMobile } from '@/lib/auth/phoneUtils';

interface AuthContextType extends AuthState {
  login: (identifier: string, password: string, language?: Language) => Promise<{ success: boolean; requires2FA?: boolean; error?: string }>;
  verify2FA: (otp: string) => Promise<{ success: boolean; error?: string }>;
  cancel2FA: () => void;
  is2FAPending: boolean;
  pending2FAPhone: string | null;
  resendCooldown: number;
  activeChallengeId: string | null;
  loginWithOtp: (phone: string, otp: string, language?: Language) => Promise<{ success: boolean; error?: string }>;
  sendOtp: (phone: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [is2FAPending, setIs2FAPending] = useState(false);
  const [pending2FAPhone, setPending2FAPhone] = useState<string | null>(null);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [activeChallengeId, setActiveChallengeId] = useState<string | null>(null);

  const router = useRouter();

  // Handle resend countdown timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendCooldown > 0) {
      timer = setTimeout(() => setResendCooldown((prev) => Math.max(0, prev - 1)), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  // Load authenticated session on mount from persistent backend
  const refreshProfile = async () => {
    try {
      const token = localStorage.getItem('rythumitra_token');
      if (!token) {
        // Check if there is a saved user in local storage
        const savedUserStr = localStorage.getItem('rythumitra_user');
        if (savedUserStr) {
          try {
            setUser(JSON.parse(savedUserStr));
          } catch {
            setUser(null);
          }
        } else {
          setUser(null);
        }
        return;
      }

      const res = await fetch('/api/v1/farmer/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        const data = await res.json();
        if (data.user) {
          setUser(data.user);
          localStorage.setItem('rythumitra_user', JSON.stringify(data.user));
          localStorage.setItem('rythumitra_auth', 'true');
        }
      } else {
        // Invalid or expired token
        localStorage.removeItem('rythumitra_token');
        localStorage.removeItem('rythumitra_user');
        localStorage.removeItem('rythumitra_auth');
        setUser(null);
      }
    } catch (err) {
      console.error('Failed to load profile:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshProfile();
  }, []);

  // Step 1: Password Login -> Dispatches 2Factor OTP (DOES NOT issue session)
  const login = async (
    identifier: string,
    password: string,
    language?: Language
  ): Promise<{ success: boolean; requires2FA?: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      const norm = normalizeIndianMobile(identifier);
      const cleanPhone = norm.valid ? norm.normalized : identifier.replace(/\D/g, '').slice(-10);

      const res = await fetch('/api/v1/auth/login/password/request-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mobileNumber: cleanPhone,
          password,
        }),
      });

      let data: any = {};
      try {
        data = await res.json();
      } catch {
        data = {};
      }
      setIsLoading(false);

      if (!res.ok || !data.success) {
        let errorMsg = data.error;
        if (!errorMsg) {
          if (res.status === 401) {
            errorMsg = 'Invalid mobile number or password.';
          } else if (res.status === 429) {
            errorMsg = 'Too many OTP requests. Please wait a few minutes before trying again.';
          } else if (res.status === 503) {
            errorMsg = 'SMS OTP service is temporarily unavailable. Please try again later.';
          } else if (res.status === 400) {
            errorMsg = 'Unable to request verification code. Please check your details.';
          } else {
            errorMsg = 'An unexpected error occurred while processing login. Please try again.';
          }
        }
        return {
          success: false,
          error: errorMsg,
        };
      }

      // Password verified, initiate mandatory 2FA OTP step
      setPending2FAPhone(cleanPhone);
      setActiveChallengeId(data.challengeId);
      setResendCooldown(data.resendCooldownSeconds || 60);
      setIs2FAPending(true);

      return { success: true, requires2FA: true };
    } catch {
      setIsLoading(false);
      return { success: false, error: 'Network error communicating with authentication service.' };
    }
  };

  // Step 2: Verify 2FA OTP -> Issues authenticated session
  const verify2FA = async (otp: string): Promise<{ success: boolean; error?: string }> => {
    if (!activeChallengeId || !pending2FAPhone) {
      return { success: false, error: 'Authentication challenge expired. Please enter password again.' };
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/v1/auth/login/password/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          challengeId: activeChallengeId,
          mobileNumber: pending2FAPhone,
          otp,
        }),
      });

      const data = await res.json();
      setIsLoading(false);

      if (!res.ok || !data.success) {
        return {
          success: false,
          error: data.error || 'Invalid OTP.',
        };
      }

      // Store persistent session
      const verifiedUser = data.user;
      setUser(verifiedUser);
      localStorage.setItem('rythumitra_token', data.sessionToken);
      localStorage.setItem('rythumitra_user', JSON.stringify(verifiedUser));
      localStorage.setItem('rythumitra_auth', 'true');
      localStorage.setItem('rythumitra_2fa_verified_at', new Date().toISOString());

      // Reset pending state
      setIs2FAPending(false);
      setPending2FAPhone(null);
      setActiveChallengeId(null);
      setResendCooldown(0);

      return { success: true };
    } catch {
      setIsLoading(false);
      return { success: false, error: 'Server communication error during 2FA verification.' };
    }
  };

  const cancel2FA = () => {
    setIs2FAPending(false);
    setPending2FAPhone(null);
    setActiveChallengeId(null);
    setResendCooldown(0);
  };

  const sendOtp = async (phone: string): Promise<{ success: boolean; message?: string }> => {
    try {
      const norm = normalizeIndianMobile(phone);
      const cleanPhone = norm.valid ? norm.normalized : phone.replace(/\D/g, '').slice(-10);
      const res = await fetch('/api/v1/auth/login/password/request-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobileNumber: cleanPhone, password: 'dummy' }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setActiveChallengeId(data.challengeId);
        setResendCooldown(data.resendCooldownSeconds || 60);
        return { success: true, message: 'OTP challenge sent successfully.' };
      }
      return { success: false, message: data.error || 'Failed to dispatch OTP.' };
    } catch {
      return { success: false, message: 'Network error.' };
    }
  };

  const loginWithOtp = async (
    phone: string,
    otp: string
  ): Promise<{ success: boolean; error?: string }> => {
    return verify2FA(otp);
  };

  const logout = () => {
    localStorage.removeItem('rythumitra_token');
    localStorage.removeItem('rythumitra_user');
    localStorage.removeItem('rythumitra_auth');
    localStorage.removeItem('rythumitra_2fa_verified_at');
    setUser(null);
    setIs2FAPending(false);
    router.push('/login');
  };

  const switchRole = (newRole: UserRole) => {
    if (!user) return;
    const updated: User = { ...user, role: newRole };
    setUser(updated);
    localStorage.setItem('rythumitra_user', JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || 'FARMER',
        isAuthenticated: !!user,
        isLoading,
        is2FAPending,
        pending2FAPhone,
        resendCooldown,
        activeChallengeId,
        login,
        verify2FA,
        cancel2FA,
        loginWithOtp,
        sendOtp,
        logout,
        switchRole,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
