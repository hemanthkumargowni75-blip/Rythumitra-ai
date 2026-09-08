'use client';

import React, { useState, useEffect } from 'react';
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
  KeyRound,
  Eye,
  EyeOff,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { OtpInput } from '@/components/OtpInput';
import { AUTH_TRANSLATIONS } from '@/data/authTranslations';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const t = AUTH_TRANSLATIONS[language] || AUTH_TRANSLATIONS.en;

  // Step state: 'mobile' | 'otp' | 'reset' | 'success'
  const [step, setStep] = useState<'mobile' | 'otp' | 'reset' | 'success'>('mobile');

  // Field values
  const [phone, setPhone] = useState('');
  const [otpValue, setOtpValue] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Challenge tracking
  const [challengeId, setChallengeId] = useState<string | null>(null);
  const [resetToken, setResetToken] = useState<string | null>(null);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [phoneMasked, setPhoneMasked] = useState('');

  // Status & loading
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendCooldown > 0) {
      timer = setTimeout(() => setResendCooldown((prev) => Math.max(0, prev - 1)), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  // Step 1: Request Forgot Password OTP
  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    const cleanPhone = phone.replace(/\D/g, '').slice(-10);
    if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      setStatusMessage({ type: 'error', text: t.invalidMobile });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/v1/auth/forgot-password/request-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobileNumber: cleanPhone }),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok && data.success) {
        setChallengeId(data.challengeId);
        setPhoneMasked(data.phoneMasked || `+91 ${cleanPhone.slice(0, 2)}******${cleanPhone.slice(-2)}`);
        setResendCooldown(data.resendCooldownSeconds || 60);
        setStep('otp');
        setStatusMessage({
          type: 'success',
          text: data.message || 'OTP verification code dispatched to your registered phone.',
        });
      } else {
        setStatusMessage({
          type: 'error',
          text: data.error || 'Failed to dispatch verification code.',
        });
      }
    } catch {
      setLoading(false);
      setStatusMessage({
        type: 'error',
        text: 'Network error connecting to reset service. Please try again.',
      });
    }
  };

  // Step 2: Verify OTP -> Receive Single-Use Reset Token
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otpValue.length !== 6 || !challengeId) return;

    setLoading(true);
    setStatusMessage(null);

    try {
      const cleanPhone = phone.replace(/\D/g, '').slice(-10);
      const res = await fetch('/api/v1/auth/forgot-password/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          challengeId,
          mobileNumber: cleanPhone,
          otp: otpValue,
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok && data.success && data.resetToken) {
        setResetToken(data.resetToken);
        setStep('reset');
        setStatusMessage({
          type: 'success',
          text: 'OTP verified. Please create your new password.',
        });
      } else {
        setStatusMessage({
          type: 'error',
          text: data.error || 'Invalid OTP code. Please try again.',
        });
      }
    } catch {
      setLoading(false);
      setStatusMessage({
        type: 'error',
        text: 'Network error verifying OTP.',
      });
    }
  };

  // Step 3: Set New Password using Server-Verified Reset Token
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetToken) return;

    if (!newPassword || newPassword.length < 8) {
      setStatusMessage({ type: 'error', text: t.passwordTooShort });
      return;
    }

    if (newPassword !== confirmPassword) {
      setStatusMessage({ type: 'error', text: t.passwordsDoNotMatch });
      return;
    }

    setLoading(true);
    setStatusMessage(null);

    try {
      const res = await fetch('/api/v1/auth/forgot-password/reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resetToken,
          newPassword,
          confirmPassword,
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok && data.success) {
        setStep('success');
        setStatusMessage({
          type: 'success',
          text: t.passwordResetSuccess,
        });
        setTimeout(() => router.push('/login'), 2200);
      } else {
        setStatusMessage({
          type: 'error',
          text: data.error || 'Failed to reset password. Please try again.',
        });
      }
    } catch {
      setLoading(false);
      setStatusMessage({
        type: 'error',
        text: 'Network error resetting password.',
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
          {step === 'reset' ? t.resetPasswordTitle : t.forgotPassword}
        </h2>
        <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
          {step === 'reset' ? t.resetPasswordSubtitle : t.forgotPasswordSubtitle}
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
          {/* STEP 1: MOBILE NUMBER INPUT */}
          {/* =============================================================== */}
          {step === 'mobile' && (
            <form onSubmit={handleRequestOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t.mobileNumber} *
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-xs font-bold text-slate-500 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    placeholder="9848022338"
                    className="w-full pl-16 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-bold tracking-wider text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="p-3 bg-emerald-50/70 border border-emerald-200/80 rounded-2xl text-[11px] text-emerald-800 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>We will dispatch a secure 2Factor SMS OTP to verify ownership before password reset.</span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending Code...</span>
                  </>
                ) : (
                  <>
                    <span>{t.sendOtp}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* =============================================================== */}
          {/* STEP 2: OTP VERIFICATION */}
          {/* =============================================================== */}
          {step === 'otp' && (
            <form onSubmit={handleVerifyOtp} className="space-y-5">
              <div className="text-center">
                <div className="w-10 h-10 mx-auto rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-2">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-black text-slate-900">{t.enterOtpTitle}</h3>
                <p className="text-xs text-slate-500 mt-1">
                  {t.enterOtpSubtitle}{' '}
                  <span className="font-bold text-slate-800">{phoneMasked}</span>
                </p>
              </div>

              <div className="py-2">
                <OtpInput
                  length={6}
                  value={otpValue}
                  onChange={setOtpValue}
                  disabled={loading}
                />
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <button
                  type="button"
                  onClick={() => setStep('mobile')}
                  className="text-slate-500 hover:text-slate-800 font-semibold flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Change Number</span>
                </button>

                <button
                  type="button"
                  onClick={handleRequestOtp}
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

              <button
                type="submit"
                disabled={otpValue.length !== 6 || loading}
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verifying Code...</span>
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

          {/* =============================================================== */}
          {/* STEP 3: ENTER NEW PASSWORD */}
          {/* =============================================================== */}
          {step === 'reset' && (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t.newPassword} *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder={t.newPasswordPlaceholder}
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

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t.confirmPassword} *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder={t.confirmPasswordPlaceholder}
                    className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="p-3 bg-emerald-50/70 border border-emerald-200/80 rounded-2xl text-[11px] text-emerald-800 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Resetting password will invalidate all previous active sessions on all devices.</span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Updating Password...</span>
                  </>
                ) : (
                  <>
                    <KeyRound className="w-4 h-4" />
                    <span>{t.resetPasswordButton}</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* =============================================================== */}
          {/* STEP 4: SUCCESS CONFIRMATION */}
          {/* =============================================================== */}
          {step === 'success' && (
            <div className="text-center py-4 space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-black text-slate-900">
                Password Reset Complete
              </h3>
              <p className="text-xs text-slate-500">
                {t.passwordResetSuccess}
              </p>
              <Link
                href="/login"
                className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 pt-2"
              >
                <span>{t.backToLogin}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}

          {/* Footer Back Link */}
          {step !== 'success' && (
            <div className="mt-6 pt-5 border-t border-slate-100 text-center text-xs text-slate-500">
              <Link
                href="/login"
                className="font-bold text-slate-600 hover:text-slate-900 inline-flex items-center gap-1"
              >
                <ArrowLeft className="w-3 h-3" />
                <span>{t.backToLogin}</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
