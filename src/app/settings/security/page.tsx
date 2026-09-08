'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  ShieldCheck,
  Lock,
  KeyRound,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Loader2,
  Phone,
  Eye,
  EyeOff,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { OtpInput } from '@/components/OtpInput';
import { AUTH_TRANSLATIONS } from '@/data/authTranslations';

export default function SettingsSecurityPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const { user, isAuthenticated } = useAuth();
  const t = AUTH_TRANSLATIONS[language] || AUTH_TRANSLATIONS.en;

  // Form states
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // OTP step
  const [step, setStep] = useState<'form' | 'otp' | 'success'>('form');
  const [otpValue, setOtpValue] = useState('');
  const [challengeId, setChallengeId] = useState<string | null>(null);
  const [resendCooldown, setResendCooldown] = useState(0);

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

  const token = typeof window !== 'undefined' ? localStorage.getItem('rythumitra_token') : null;

  // Step 1: Request Password Change OTP
  const handleRequestChangeOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    if (!currentPassword) {
      setStatusMessage({ type: 'error', text: 'Current password is required.' });
      return;
    }
    if (!newPassword || newPassword.length < 8) {
      setStatusMessage({ type: 'error', text: t.passwordTooShort });
      return;
    }
    if (newPassword !== confirmPassword) {
      setStatusMessage({ type: 'error', text: t.passwordsDoNotMatch });
      return;
    }
    if (currentPassword === newPassword) {
      setStatusMessage({ type: 'error', text: 'New password must be different from current password.' });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/v1/auth/change-password/request-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token || ''}`,
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
          confirmPassword,
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok && data.success) {
        setChallengeId(data.challengeId);
        setResendCooldown(data.resendCooldownSeconds || 60);
        setStep('otp');
        setStatusMessage({
          type: 'success',
          text: 'Current credentials verified. 2Factor OTP dispatched to your registered phone.',
        });
      } else {
        setStatusMessage({
          type: 'error',
          text: data.error || 'Failed to authorize password change.',
        });
      }
    } catch {
      setLoading(false);
      setStatusMessage({
        type: 'error',
        text: 'Network error connecting to security service.',
      });
    }
  };

  // Step 2: Verify OTP & Change Password
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otpValue.length !== 6 || !challengeId) return;

    setLoading(true);
    setStatusMessage(null);

    try {
      const res = await fetch('/api/v1/auth/change-password/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token || ''}`,
        },
        body: JSON.stringify({
          challengeId,
          otp: otpValue,
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok && data.success) {
        setStep('success');
        setStatusMessage({
          type: 'success',
          text: t.passwordChangedSuccess,
        });
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
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

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-emerald-100 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2 rounded-xl text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-xl font-black text-slate-900 tracking-tight">
                {t.securityOverview}
              </h1>
              <p className="text-xs text-slate-500 font-medium">
                Manage your credentials and 2Factor SMS protection
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        {/* Security Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block">
                {t.twoFactorActive}
              </span>
              <span className="text-[11px] text-emerald-600 font-semibold">
                Mandatory on all logins
              </span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block">
                {t.mobileVerified}
              </span>
              <span className="text-[11px] text-slate-500 font-medium">
                +91 {user?.phone ? `${user.phone.slice(0, 2)}******${user.phone.slice(-2)}` : '••••••••••'}
              </span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block">
                Password Protection
              </span>
              <span className="text-[11px] text-purple-700 font-semibold">
                OWASP scrypt KDF
              </span>
            </div>
          </div>
        </div>

        {/* Change Password Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm max-w-2xl mx-auto">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
            <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900">
                {t.changePasswordTitle}
              </h2>
              <p className="text-xs text-slate-500">
                {t.changePasswordSubtitle}
              </p>
            </div>
          </div>

          {/* Status Message */}
          {statusMessage && (
            <div
              className={`mt-4 p-3.5 rounded-2xl text-xs font-semibold flex items-start gap-2.5 ${
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
              <span>{statusMessage.text}</span>
            </div>
          )}

          {/* STEP 1: Current Password & New Password */}
          {step === 'form' && (
            <form onSubmit={handleRequestChangeOtp} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t.currentPassword} *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type={showCurrentPassword ? 'text' : 'password'}
                    required
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder={t.currentPasswordPlaceholder}
                    className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                  >
                    {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t.newPassword} *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder={t.newPasswordPlaceholder}
                    className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                  >
                    {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
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
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder={t.confirmPasswordPlaceholder}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-2xl text-[11px] text-amber-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Password changes require both valid current credentials and a 2Factor SMS OTP.</span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verifying Current Password...</span>
                  </>
                ) : (
                  <>
                    <span>{t.sendOtp}</span>
                    <KeyRound className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* STEP 2: OTP Verification */}
          {step === 'otp' && (
            <form onSubmit={handleVerifyOtp} className="mt-5 space-y-5">
              <div className="text-center">
                <span className="text-xs text-slate-500 block">{t.enterOtpSubtitle}</span>
                <span className="text-sm font-black text-slate-900 mt-0.5 block">
                  +91 {user?.phone ? `${user.phone.slice(0, 2)}******${user.phone.slice(-2)}` : 'Your Phone'}
                </span>
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
                  onClick={() => setStep('form')}
                  className="text-slate-500 hover:text-slate-800 font-semibold flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  onClick={handleRequestChangeOtp}
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
                    <span>Confirming Password Change...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>{t.changePasswordButton}</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* STEP 3: Success */}
          {step === 'success' && (
            <div className="mt-5 text-center py-4 space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-black text-slate-900">
                Password Successfully Updated
              </h3>
              <p className="text-xs text-slate-500">
                {t.passwordChangedSuccess}
              </p>
              <button
                type="button"
                onClick={() => setStep('form')}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors mt-2"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
