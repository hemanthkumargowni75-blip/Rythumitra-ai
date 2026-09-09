'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Sprout,
  Phone,
  Lock,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  RotateCcw,
  Loader2,
  ArrowLeft,
  Languages,
  Eye,
  EyeOff,
  KeyRound,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { OtpInput } from '@/components/OtpInput';
import { AUTH_TRANSLATIONS } from '@/data/authTranslations';
import { Language } from '@/types';
import { normalizeIndianMobile, cleanInputMobile } from '@/lib/auth/phoneUtils';

export default function LoginPage() {
  const router = useRouter();
  const { language, setLanguage, availableLanguages } = useLanguage();
  const { login, verify2FA, is2FAPending, pending2FAPhone, resendCooldown, cancel2FA } = useAuth();

  const t = AUTH_TRANSLATIONS[language] || AUTH_TRANSLATIONS.en;

  // Form states
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [otpValue, setOtpValue] = useState('');

  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

  // Concurrency locks to prevent duplicate submissions / race conditions
  const isSubmittingRef = useRef(false);
  const isVerifyingRef = useRef(false);

  // Clean stale error banner whenever transitioning to 2FA verification screen
  useEffect(() => {
    if (is2FAPending) {
      if (statusMessage?.type === 'error') {
        setStatusMessage(null);
      }
    }
  }, [is2FAPending]);

  // Step 1: Submit Mobile & Password -> Validate Credentials & Send OTP
  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmittingRef.current || loading) return;

    setStatusMessage(null);

    const norm = normalizeIndianMobile(phone);
    if (!norm.valid) {
      setStatusMessage({ type: 'error', text: norm.error || t.invalidMobile });
      return;
    }
    const cleanPhone = norm.normalized;
    if (!password) {
      setStatusMessage({ type: 'error', text: 'Please enter your password.' });
      return;
    }

    isSubmittingRef.current = true;
    setLoading(true);

    try {
      // Call 2-step login: Password alone NEVER logs in
      const res = await login(cleanPhone, password, language);

      if (res.success && res.requires2FA) {
        setOtpValue('');
        setStatusMessage({
          type: 'success',
          text: 'Password verified. Please enter the 6-digit 2Factor OTP sent to your phone.',
        });
      } else {
        setStatusMessage({
          type: 'error',
          text: res.error || 'Unable to sign in. Please check your credentials.',
        });
      }
    } finally {
      isSubmittingRef.current = false;
      setLoading(false);
    }
  };

  // Step 2: Submit 2Factor OTP -> Final Authentication
  const handleOtpVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otpValue.length !== 6 || isVerifyingRef.current || loading) return;

    isVerifyingRef.current = true;
    setStatusMessage(null);
    setLoading(true);

    try {
      const res = await verify2FA(otpValue);

      if (res.success) {
        setStatusMessage({
          type: 'success',
          text: 'OTP verified successfully! Redirecting to your dashboard...',
        });
        setTimeout(() => router.push('/'), 600);
      } else {
        setStatusMessage({
          type: 'error',
          text: res.error || 'Invalid OTP code. Please try again.',
        });
      }
    } finally {
      isVerifyingRef.current = false;
      setLoading(false);
    }
  };

  // Resend OTP handler for Step 2
  const handleResendOtp = async () => {
    if (resendCooldown > 0 || loading || isSubmittingRef.current) return;

    isSubmittingRef.current = true;
    setLoading(true);
    setStatusMessage(null);

    try {
      const targetPhone = phone || pending2FAPhone || '';
      const norm = normalizeIndianMobile(targetPhone);
      const cleanPhone = norm.valid ? norm.normalized : targetPhone.replace(/\D/g, '').slice(-10);
      const res = await login(cleanPhone, password, language);

      if (res.success) {
        setOtpValue('');
        setStatusMessage({
          type: 'success',
          text: 'A new 6-digit 2Factor OTP has been sent to your phone.',
        });
      } else {
        setStatusMessage({
          type: 'error',
          text: res.error || 'Failed to resend OTP. Please try again.',
        });
      }
    } finally {
      isSubmittingRef.current = false;
      setLoading(false);
    }
  };

  // Cancel 2FA and return to Step 1
  const handleCancel2FA = () => {
    cancel2FA();
    setStatusMessage(null);
    setOtpValue('');
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
          {t.loginTitle}
        </h2>
        <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
          {t.loginSubtitle}
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

          {/* =============================================================== */}
          {/* STEP 1: MOBILE & PASSWORD (CREDENTIAL VALIDATION) */}
          {/* =============================================================== */}
          {!is2FAPending && (
            <form onSubmit={handlePasswordLogin} className="space-y-4">
              {/* Mobile Number */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t.mobileNumber}
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-xs font-bold text-slate-500 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    maxLength={16}
                    value={phone}
                    onChange={(e) => setPhone(cleanInputMobile(e.target.value))}
                    placeholder={t.mobilePlaceholder || "Enter mobile number"}
                    className="w-full pl-16 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-bold tracking-wider text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-700">
                    {t.password} *
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-[11px] font-bold text-emerald-700 hover:text-emerald-800"
                  >
                    {t.forgotPassword}
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Security Policy Reminder */}
              <div className="p-3 bg-emerald-50/70 border border-emerald-200/80 rounded-2xl text-[11px] text-emerald-800 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{t.twoFactorNotice}</span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verifying Credentials...</span>
                  </>
                ) : (
                  <>
                    <span>{t.signIn}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* =============================================================== */}
          {/* STEP 2: MANDATORY 2FACTOR OTP VERIFICATION */}
          {/* =============================================================== */}
          {is2FAPending && (
            <form onSubmit={handleOtpVerify} className="space-y-5">
              <div className="text-center">
                <div className="w-10 h-10 mx-auto rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-2">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-black text-slate-900">
                  {t.enterOtpTitle}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {t.enterOtpSubtitle}{' '}
                  <span className="font-bold text-slate-800">
                    +91 {pending2FAPhone?.slice(0, 2)}******{pending2FAPhone?.slice(-2)}
                  </span>
                </p>
              </div>

              {/* 6-box OTP Input */}
              <div className="py-2">
                <OtpInput
                  length={6}
                  value={otpValue}
                  onChange={setOtpValue}
                  disabled={loading}
                />
              </div>

              {/* Back & Resend */}
              <div className="flex items-center justify-between text-xs pt-1">
                <button
                  type="button"
                  onClick={handleCancel2FA}
                  className="text-slate-500 hover:text-slate-800 font-semibold flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Change Details</span>
                </button>

                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={resendCooldown > 0 || loading}
                  className="font-bold text-emerald-700 hover:text-emerald-800 disabled:text-slate-400 disabled:cursor-not-allowed flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>
                    {resendCooldown > 0
                      ? t.waitSeconds.replace('{sec}', String(resendCooldown))
                      : t.resendOtp}
                  </span>
                </button>
              </div>

              {/* Verify OTP Button */}
              <button
                type="submit"
                disabled={otpValue.length !== 6 || loading}
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verifying OTP...</span>
                  </>
                ) : (
                  <>
                    <KeyRound className="w-4 h-4" />
                    <span>{t.verifyOtp}</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* Footer Navigation */}
          <div className="mt-6 pt-5 border-t border-slate-100 text-center text-xs text-slate-500">
            <span>{t.dontHaveAccount} </span>
            <Link
              href="/register"
              className="font-bold text-emerald-700 hover:text-emerald-800 ml-1 inline-flex items-center gap-0.5"
            >
              <span>{t.registerNow}</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
