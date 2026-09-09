'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Sprout,
  Phone,
  User as UserIcon,
  Languages,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  RotateCcw,
  Loader2,
  ArrowLeft,
  Lock,
  Eye,
  EyeOff,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { OtpInput } from '@/components/OtpInput';
import { Language } from '@/types';
import { AUTH_TRANSLATIONS } from '@/data/authTranslations';
import { normalizeIndianMobile, cleanInputMobile } from '@/lib/auth/phoneUtils';

interface FieldErrors {
  firstName?: string;
  lastName?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
}

export default function RegisterPage() {
  const router = useRouter();
  const { language, setLanguage, availableLanguages } = useLanguage();
  const { refreshProfile } = useAuth();

  const t = AUTH_TRANSLATIONS[language] || AUTH_TRANSLATIONS.en;

  // Form fields (Strictly 6 fields: First Name, Last Name, Mobile Number, Password, Confirm Password, Preferred Language)
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [preferredLang, setPreferredLang] = useState<Language>(language);

  // Field-level error messages
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  // OTP Verification state (inline fallback if not redirected)
  const [step, setStep] = useState<'form' | 'otp'>('form');
  const [otpValue, setOtpValue] = useState('');
  const [challengeId, setChallengeId] = useState<string | null>(null);
  const [phoneMasked, setPhoneMasked] = useState<string>('');
  const [resendCooldown, setResendCooldown] = useState(0);
  const [attemptsRemaining, setAttemptsRemaining] = useState<number | null>(null);

  // Status & loading
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

  // Cooldown countdown timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendCooldown > 0) {
      timer = setTimeout(() => setResendCooldown((prev) => Math.max(0, prev - 1)), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  // Client-side field-level validation
  const validateForm = (): boolean => {
    const errors: FieldErrors = {};
    const cleanFirst = firstName.trim();
    const cleanLast = lastName.trim();
    const cleanPhone = phone.replace(/\D/g, '').slice(-10);

    // 1. First Name: required, minimum 1 character, trim whitespace
    if (!cleanFirst) {
      errors.firstName = 'First Name is required.';
    } else if (cleanFirst.length > 50) {
      errors.firstName = 'First Name must be 50 characters or less.';
    } else if (/[0-9<>%$#@!&*()+=_{}[\]:;"?/\\]/.test(cleanFirst)) {
      errors.firstName = 'First Name must contain letters only.';
    }

    // 2. Last Name: required, minimum 1 character, trim whitespace
    if (!cleanLast) {
      errors.lastName = 'Last Name is required.';
    } else if (cleanLast.length > 50) {
      errors.lastName = 'Last Name must be 50 characters or less.';
    } else if (/[0-9<>%$#@!&*()+=_{}[\]:;"?/\\]/.test(cleanLast)) {
      errors.lastName = 'Last Name must contain letters only.';
    }

    // 3. Mobile Number: required, valid Indian mobile number, 10 digits starting with 6, 7, 8, or 9
    const norm = normalizeIndianMobile(phone);
    if (!phone.trim()) {
      errors.phone = 'Mobile Number is required.';
    } else if (!norm.valid) {
      errors.phone = norm.error || 'Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.';
    }

    // 4. Password: required, minimum 8 characters, letters and numbers
    if (!password) {
      errors.password = 'Password is required.';
    } else if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters long.';
    } else if (!/(?=.*[a-zA-Z])(?=.*[0-9])/.test(password)) {
      errors.password = 'Password must contain both letters and numbers.';
    }

    // 5. Confirm Password: required, must match password
    if (!confirmPassword) {
      errors.confirmPassword = 'Confirm Password is required.';
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Step 1: Submit Registration Form -> Send 2Factor OTP
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    // Run field-level client validation
    if (!validateForm()) {
      return;
    }

    const cleanFirst = firstName.trim();
    const cleanLast = lastName.trim();
    const normPhone = normalizeIndianMobile(phone);
    const cleanPhone = normPhone.valid ? normPhone.normalized : phone.replace(/\D/g, '').slice(-10);

    setLoading(true);

    try {
      // 100% consistent payload matching backend schema
      const payload = {
        first_name: cleanFirst,
        last_name: cleanLast,
        mobile_number: cleanPhone,
        password,
        confirm_password: confirmPassword,
        language: preferredLang,
        // camelCase aliases for backward compatibility
        firstName: cleanFirst,
        lastName: cleanLast,
        phone: cleanPhone,
        mobileNumber: cleanPhone,
        confirmPassword,
        preferredLanguage: preferredLang,
      };

      const res = await fetch('/api/v1/auth/register/request-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok && data.success) {
        const masked = data.phoneMasked || `+91 ${cleanPhone.slice(0, 2)}******${cleanPhone.slice(-2)}`;
        setChallengeId(data.challengeId);
        setPhoneMasked(masked);
        setResendCooldown(data.resendCooldownSeconds || 60);

        // Persist form state so user's registration details are NOT lost
        if (typeof window !== 'undefined') {
          sessionStorage.setItem(
            'pending_registration',
            JSON.stringify({
              first_name: cleanFirst,
              last_name: cleanLast,
              mobile_number: cleanPhone,
              password,
              language: preferredLang,
              challengeId: data.challengeId,
              phoneMasked: masked,
              resendCooldownSeconds: data.resendCooldownSeconds || 60,
            })
          );
        }

        // Navigate to dedicated /verify-otp screen
        router.push(`/verify-otp?phone=${cleanPhone}&challengeId=${encodeURIComponent(data.challengeId)}`);

        // Also prepare inline OTP fallback
        setStep('otp');
        setStatusMessage({
          type: 'success',
          text: data.message || `OTP sent to ${masked}`,
        });
      } else {
        setStatusMessage({
          type: 'error',
          text: data.error || 'Failed to dispatch OTP. Please check your details.',
        });
      }
    } catch {
      setLoading(false);
      setStatusMessage({
        type: 'error',
        text: 'Network error connecting to registration server. Please try again.',
      });
    }
  };

  // Step 2: Inline OTP Verification Fallback
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otpValue.length !== 6 || !challengeId) return;

    setLoading(true);
    setStatusMessage(null);

    try {
      const normPhone = normalizeIndianMobile(phone);
      const cleanPhone = normPhone.valid ? normPhone.normalized : phone.replace(/\D/g, '').slice(-10);
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
          text: 'Account verified and created successfully! Redirecting...',
        });

        if (data.sessionToken) {
          localStorage.setItem('rythumitra_token', data.sessionToken);
          localStorage.setItem('rythumitra_user', JSON.stringify(data.user));
          localStorage.setItem('rythumitra_auth', 'true');
          document.cookie = `rythumitra_token=${data.sessionToken}; path=/; max-age=2592000; SameSite=Lax`;
        }

        if (typeof window !== 'undefined') {
          sessionStorage.removeItem('pending_registration');
        }

        await refreshProfile();
        setTimeout(() => router.push('/'), 500);
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
        text: 'Server error verifying OTP. Please try again.',
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
          {t.registerTitle}
        </h2>
        <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
          {t.registerSubtitle}
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
          {/* STEP 1: REGISTRATION FORM */}
          {/* =============================================================== */}
          {step === 'form' && (
            <form onSubmit={handleRegister} className="space-y-4" noValidate>
              {/* 1. First Name & 2. Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    First Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={firstName}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                        if (fieldErrors.firstName) {
                          setFieldErrors((prev) => ({ ...prev, firstName: undefined }));
                        }
                      }}
                      placeholder={t.firstNamePlaceholder || "First name"}
                      className={`w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border rounded-xl text-xs sm:text-sm font-medium focus:ring-2 focus:bg-white focus:outline-none transition-colors ${
                        fieldErrors.firstName
                          ? 'border-rose-300 ring-1 ring-rose-300 focus:ring-rose-500'
                          : 'border-slate-200 focus:ring-emerald-500'
                      }`}
                    />
                  </div>
                  {fieldErrors.firstName && (
                    <p className="mt-1 text-[11px] text-rose-600 font-semibold flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{fieldErrors.firstName}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Last Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                      if (fieldErrors.lastName) {
                        setFieldErrors((prev) => ({ ...prev, lastName: undefined }));
                      }
                    }}
                    placeholder={t.lastNamePlaceholder || "Last name"}
                    className={`w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-xs sm:text-sm font-medium focus:ring-2 focus:bg-white focus:outline-none transition-colors ${
                      fieldErrors.lastName
                        ? 'border-rose-300 ring-1 ring-rose-300 focus:ring-rose-500'
                        : 'border-slate-200 focus:ring-emerald-500'
                    }`}
                  />
                  {fieldErrors.lastName && (
                    <p className="mt-1 text-[11px] text-rose-600 font-semibold flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{fieldErrors.lastName}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* 3. Mobile Number */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Mobile Number <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-xs font-bold text-slate-500 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    +91
                  </span>
                  <input
                    type="tel"
                    id="mobileNumber"
                    name="mobileNumber"
                    maxLength={16}
                    value={phone}
                    onChange={(e) => {
                      setPhone(cleanInputMobile(e.target.value));
                      if (fieldErrors.phone) {
                        setFieldErrors((prev) => ({ ...prev, phone: undefined }));
                      }
                    }}
                    placeholder={t.mobilePlaceholder || "Enter mobile number"}
                    className={`w-full pl-16 pr-3.5 py-2.5 bg-slate-50 border rounded-xl text-xs sm:text-sm font-bold tracking-wider text-slate-900 focus:ring-2 focus:bg-white focus:outline-none transition-colors ${
                      fieldErrors.phone
                        ? 'border-rose-300 ring-1 ring-rose-300 focus:ring-rose-500'
                        : 'border-slate-200 focus:ring-emerald-500'
                    }`}
                  />
                </div>
                {fieldErrors.phone && (
                  <p className="mt-1 text-[11px] text-rose-600 font-semibold flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{fieldErrors.phone}</span>
                  </p>
                )}
              </div>

              {/* 4. Password */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Password <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (fieldErrors.password) {
                        setFieldErrors((prev) => ({ ...prev, password: undefined }));
                      }
                    }}
                    placeholder="Min 8 chars with letters & numbers"
                    className={`w-full pl-10 pr-10 py-2.5 bg-slate-50 border rounded-xl text-xs sm:text-sm font-medium focus:ring-2 focus:bg-white focus:outline-none transition-colors ${
                      fieldErrors.password
                        ? 'border-rose-300 ring-1 ring-rose-300 focus:ring-rose-500'
                        : 'border-slate-200 focus:ring-emerald-500'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 cursor-pointer"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {fieldErrors.password && (
                  <p className="mt-1 text-[11px] text-rose-600 font-semibold flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{fieldErrors.password}</span>
                  </p>
                )}
              </div>

              {/* 5. Confirm Password */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Confirm Password <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (fieldErrors.confirmPassword) {
                        setFieldErrors((prev) => ({ ...prev, confirmPassword: undefined }));
                      }
                    }}
                    placeholder="Re-enter your password"
                    className={`w-full pl-10 pr-10 py-2.5 bg-slate-50 border rounded-xl text-xs sm:text-sm font-medium focus:ring-2 focus:bg-white focus:outline-none transition-colors ${
                      fieldErrors.confirmPassword
                        ? 'border-rose-300 ring-1 ring-rose-300 focus:ring-rose-500'
                        : 'border-slate-200 focus:ring-emerald-500'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 cursor-pointer"
                    aria-label="Toggle confirm password visibility"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {fieldErrors.confirmPassword && (
                  <p className="mt-1 text-[11px] text-rose-600 font-semibold flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{fieldErrors.confirmPassword}</span>
                  </p>
                )}
              </div>

              {/* 6. Preferred Language */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Preferred Language
                </label>
                <div className="relative">
                  <Languages className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <select
                    id="preferredLanguage"
                    name="preferredLanguage"
                    value={preferredLang}
                    onChange={(e) => {
                      const newLang = e.target.value as Language;
                      setPreferredLang(newLang);
                      setLanguage(newLang);
                    }}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-bold text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-none cursor-pointer"
                  >
                    {availableLanguages.map((l) => (
                      <option key={l.code} value={l.code}>
                        {l.nativeLabel} ({l.label})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Security Notice */}
              <div className="p-3 bg-emerald-50/70 border border-emerald-200/80 rounded-2xl text-[11px] text-emerald-800 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{t.twoFactorNotice}</span>
              </div>

              {/* Register Button: strictly 'Register' in idle, 'Sending OTP...' in submitting */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white text-sm font-bold shadow-md hover:shadow-lg transition-all disabled:opacity-60 flex items-center justify-center gap-2 mt-2 cursor-pointer disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending OTP...</span>
                  </>
                ) : (
                  <>
                    <span>Register</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* =============================================================== */}
          {/* STEP 2: OTP VERIFICATION (INLINE FALLBACK) */}
          {/* =============================================================== */}
          {step === 'otp' && (
            <form onSubmit={handleVerifyOtp} className="space-y-5">
              <div className="text-center">
                <span className="text-xs text-slate-500 block">
                  OTP sent to
                </span>
                <span className="text-sm font-black text-slate-900 mt-0.5 block tracking-wide">
                  {phoneMasked}
                </span>
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

              {/* Resend & Edit Details */}
              <div className="flex items-center justify-between text-xs pt-1">
                <button
                  type="button"
                  onClick={() => setStep('form')}
                  className="text-slate-500 hover:text-slate-800 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Edit Details</span>
                </button>

                <button
                  type="button"
                  onClick={handleRegister}
                  disabled={resendCooldown > 0 || loading}
                  className="font-bold text-emerald-700 hover:text-emerald-800 disabled:text-slate-400 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>
                    {resendCooldown > 0 ? `Wait ${resendCooldown}s` : 'Resend OTP'}
                  </span>
                </button>
              </div>

              {attemptsRemaining !== null && (
                <p className="text-[11px] text-center font-bold text-amber-700">
                  {attemptsRemaining} attempts remaining
                </p>
              )}

              {/* Verify Button */}
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
          )}

          {/* Footer Navigation */}
          <div className="mt-6 pt-5 border-t border-slate-100 text-center text-xs text-slate-500">
            <span>{t.alreadyHaveAccount} </span>
            <Link
              href="/login"
              className="font-bold text-emerald-700 hover:text-emerald-800 ml-1 inline-flex items-center gap-0.5"
            >
              <span>{t.signIn}</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
