'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Sprout,
  ShieldCheck,
  RotateCcw,
  Loader2,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { OtpInput } from '@/components/OtpInput';
import { normalizeIndianMobile } from '@/lib/auth/phoneUtils';

function VerifyOtpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { refreshProfile } = useAuth();

  const queryPhone = searchParams.get('phone') || '';
  const queryChallengeId = searchParams.get('challengeId') || '';

  const [phone, setPhone] = useState<string>(queryPhone);
  const [challengeId, setChallengeId] = useState<string>(queryChallengeId);
  const [phoneMasked, setPhoneMasked] = useState<string>('');
  const [otpValue, setOtpValue] = useState<string>('');
  const [resendCooldown, setResendCooldown] = useState<number>(60);
  const [attemptsRemaining, setAttemptsRemaining] = useState<number | null>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [resending, setResending] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

  // Initialize from sessionStorage or query parameters
  useEffect(() => {
    let rawPhone = queryPhone;
    let rawChallenge = queryChallengeId;

    try {
      const stored = sessionStorage.getItem('pending_registration');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (!rawPhone && parsed.mobile_number) rawPhone = parsed.mobile_number;
        if (!rawChallenge && parsed.challengeId) rawChallenge = parsed.challengeId;
        if (parsed.phoneMasked) {
          setPhoneMasked(parsed.phoneMasked);
        }
        if (parsed.resendCooldownSeconds) {
          setResendCooldown(parsed.resendCooldownSeconds);
        }
      }
    } catch {
      // ignore storage parse errors
    }

    if (rawPhone) {
      const norm = normalizeIndianMobile(rawPhone);
      const clean = norm.valid ? norm.normalized : rawPhone.replace(/\D/g, '').slice(-10);
      setPhone(clean);
      if (!phoneMasked) {
        setPhoneMasked(norm.valid ? norm.masked : `+91 ${clean.slice(0, 2)}******${clean.slice(-2)}`);
      }
    }
    if (rawChallenge) {
      setChallengeId(rawChallenge);
    }
  }, [queryPhone, queryChallengeId]);

  // Countdown timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendCooldown > 0) {
      timer = setTimeout(() => setResendCooldown((prev) => Math.max(0, prev - 1)), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  // Verify OTP submission
  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otpValue.length !== 6) {
      setStatusMessage({ type: 'error', text: 'Please enter the complete 6-digit OTP code.' });
      return;
    }
    if (!challengeId) {
      setStatusMessage({ type: 'error', text: 'Verification session expired. Please register again.' });
      return;
    }

    setLoading(true);
    setStatusMessage(null);

    try {
      const norm = normalizeIndianMobile(phone);
      const cleanPhone = norm.valid ? norm.normalized : phone.replace(/\D/g, '').slice(-10);
      const res = await fetch('/api/v1/auth/register/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          challengeId,
          phone: cleanPhone,
          otp: otpValue,
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok && data.success) {
        setStatusMessage({
          type: 'success',
          text: 'Account verified and created successfully! Redirecting to your farm dashboard...',
        });

        if (data.sessionToken) {
          localStorage.setItem('rythumitra_token', data.sessionToken);
          localStorage.setItem('rythumitra_user', JSON.stringify(data.user));
          localStorage.setItem('rythumitra_auth', 'true');
          document.cookie = `rythumitra_token=${data.sessionToken}; path=/; max-age=2592000; SameSite=Lax`;
        }

        try {
          sessionStorage.removeItem('pending_registration');
        } catch {
          // ignore
        }

        await refreshProfile();
        setTimeout(() => {
          router.push('/');
        }, 500);
      } else {
        setAttemptsRemaining(data.attemptsRemaining ?? null);
        setStatusMessage({
          type: 'error',
          text: data.error || 'Invalid OTP code. Please try again.',
        });
      }
    } catch {
      setLoading(false);
      setStatusMessage({
        type: 'error',
        text: 'Network error connecting to verification server. Please try again.',
      });
    }
  };

  // Resend OTP handler
  const handleResend = async () => {
    if (resendCooldown > 0 || resending || loading) return;

    setResending(true);
    setStatusMessage(null);

    try {
      let payload: any = { phone };
      try {
        const stored = sessionStorage.getItem('pending_registration');
        if (stored) {
          payload = JSON.parse(stored);
        }
      } catch {
        // fallback
      }

      const res = await fetch('/api/v1/auth/register/request-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: payload.first_name || 'Farmer',
          last_name: payload.last_name || 'User',
          mobile_number: phone,
          password: payload.password || 'Rythu#2026Secure',
          confirm_password: payload.password || 'Rythu#2026Secure',
          language: payload.language || 'te',
          // aliases
          firstName: payload.first_name || 'Farmer',
          lastName: payload.last_name || 'User',
          phone,
          confirmPassword: payload.password || 'Rythu#2026Secure',
          preferredLanguage: payload.language || 'te',
        }),
      });

      const data = await res.json();
      setResending(false);

      if (res.ok && data.success) {
        setChallengeId(data.challengeId);
        const masked = data.phoneMasked || `+91 ${phone.slice(0, 2)}******${phone.slice(-2)}`;
        setPhoneMasked(masked);
        setResendCooldown(data.resendCooldownSeconds || 60);
        setStatusMessage({
          type: 'success',
          text: data.message || `New OTP code sent to ${masked}`,
        });
      } else {
        setStatusMessage({
          type: 'error',
          text: data.error || 'Unable to resend OTP. Please try again later.',
        });
      }
    } catch {
      setResending(false);
      setStatusMessage({
        type: 'error',
        text: 'Network error while requesting new OTP.',
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      {/* Brand Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center gap-2.5 group">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-green-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 text-white group-hover:scale-105 transition-transform">
            <Sprout className="w-6 h-6" />
          </div>
          <div className="text-left">
            <span className="text-xl font-black tracking-tight text-slate-900 block leading-tight">
              RythuMitra AI
            </span>
            <span className="text-[11px] font-semibold text-emerald-700 block tracking-wide uppercase">
              రైతుమిత్ర • Smart Farmer Assistant
            </span>
          </div>
        </Link>

        <h2 className="mt-6 text-2xl font-black tracking-tight text-slate-900">
          Verify Mobile Number
        </h2>
        <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
          Enter the 6-digit verification code to complete your registration
        </p>
      </div>

      {/* Main Card */}
      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 sm:px-8 shadow-xl shadow-slate-200/50 rounded-3xl border border-slate-100">
          {/* Status Message */}
          {statusMessage && (
            <div
              className={`mb-5 p-3.5 rounded-2xl text-xs font-semibold flex items-start gap-2.5 ${
                statusMessage.type === 'success'
                  ? 'bg-emerald-50 border border-emerald-200 text-emerald-900'
                  : 'bg-rose-50 border border-rose-200 text-rose-900'
              }`}
            >
              {statusMessage.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              )}
              <span className="leading-relaxed">{statusMessage.text}</span>
            </div>
          )}

          {/* OTP Sent Prompt */}
          <div className="text-center mb-6">
            <span className="text-xs text-slate-500 block">
              OTP sent to
            </span>
            <span className="text-base font-black text-slate-900 mt-0.5 block tracking-wide">
              {phoneMasked || (phone ? `+91 ${phone.slice(0, 2)}******${phone.slice(-2)}` : '+91 XXXXX XXXXX')}
            </span>
          </div>

          <form onSubmit={handleVerify} className="space-y-5">
            {/* 6-digit OTP Box Input */}
            <div className="py-2">
              <OtpInput
                length={6}
                value={otpValue}
                onChange={setOtpValue}
                disabled={loading}
              />
            </div>

            {/* Resend & Edit Details */}
            <div className="flex items-center justify-between text-xs pt-1">
              <Link
                href="/register"
                className="text-slate-500 hover:text-slate-800 font-semibold flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Edit Details</span>
              </Link>

              <button
                type="button"
                onClick={handleResend}
                disabled={resendCooldown > 0 || resending || loading}
                className="font-bold text-emerald-700 hover:text-emerald-800 disabled:text-slate-400 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer"
              >
                {resending ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>
                      {resendCooldown > 0 ? `Wait ${resendCooldown}s` : 'Resend OTP'}
                    </span>
                  </>
                )}
              </button>
            </div>

            {attemptsRemaining !== null && (
              <p className="text-[11px] text-center font-bold text-amber-700">
                {attemptsRemaining} attempts remaining
              </p>
            )}

            {/* Verify OTP Button */}
            <button
              type="submit"
              disabled={otpValue.length !== 6 || loading}
              className="w-full h-12 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white text-sm font-bold shadow-md hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Code...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verify OTP</span>
                </>
              )}
            </button>
          </form>

          {/* Footer Navigation */}
          <div className="mt-6 pt-5 border-t border-slate-100 text-center text-xs text-slate-500">
            <span>Already verified? </span>
            <Link
              href="/login"
              className="font-bold text-emerald-700 hover:text-emerald-800 ml-1 inline-flex items-center gap-0.5"
            >
              <span>Sign In</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VerifyOtpPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
            <p className="text-xs font-semibold text-slate-600">Loading verification screen...</p>
          </div>
        </div>
      }
    >
      <VerifyOtpContent />
    </Suspense>
  );
}
