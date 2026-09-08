'use client';

import React, { useRef, useEffect } from 'react';

interface OtpInputProps {
  value: string;
  onChange: (otp: string) => void;
  onComplete?: (otp: string) => void;
  disabled?: boolean;
  hasError?: boolean;
  length?: number;
  autoFocus?: boolean;
  className?: string;
}

export function OtpInput({
  value,
  onChange,
  onComplete,
  disabled = false,
  hasError = false,
  length = 6,
  autoFocus = true,
  className = '',
}: OtpInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Split value into array of individual digits
  const digits = Array.from({ length }, (_, i) => value[i] || '');

  useEffect(() => {
    if (autoFocus && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [autoFocus]);

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value;
    const char = rawVal.replace(/\D/g, '').slice(-1);

    const newDigits = [...digits];
    newDigits[index] = char;
    const newOtp = newDigits.join('');
    onChange(newOtp);

    // Auto-advance to next input if digit was entered
    if (char && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (newOtp.length === length && onComplete) {
      onComplete(newOtp);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (!digits[index] && index > 0) {
        // Current box is already empty; move back to previous box and clear it
        const newDigits = [...digits];
        newDigits[index - 1] = '';
        const newOtp = newDigits.join('');
        onChange(newOtp);
        inputRefs.current[index - 1]?.focus();
      } else {
        // Clear current box
        const newDigits = [...digits];
        newDigits[index] = '';
        onChange(newDigits.join(''));
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault();
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      e.preventDefault();
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    if (!pasted) return;

    onChange(pasted);

    // Focus last filled box or next empty box
    const nextIdx = Math.min(pasted.length, length - 1);
    inputRefs.current[nextIdx]?.focus();

    if (pasted.length === length && onComplete) {
      onComplete(pasted);
    }
  };

  return (
    <div className={`flex items-center justify-center gap-2 sm:gap-3 ${className}`}>
      {Array.from({ length }).map((_, i) => {
        const isFilled = !!digits[i];
        return (
          <input
            key={i}
            ref={(el) => {
              inputRefs.current[i] = el;
            }}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            autoComplete={i === 0 ? 'one-time-code' : 'off'}
            value={digits[i]}
            disabled={disabled}
            onChange={(e) => handleChange(i, e)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={handlePaste}
            onFocus={(e) => e.target.select()}
            className={`w-11 h-13 sm:w-13 sm:h-15 text-center text-xl sm:text-2xl font-black rounded-xl sm:rounded-2xl transition-all shadow-xs border ${
              hasError
                ? 'border-rose-400 bg-rose-50/50 text-rose-900 focus:ring-2 focus:ring-rose-500'
                : isFilled
                ? 'border-emerald-500 bg-emerald-50/40 text-emerald-950 focus:ring-2 focus:ring-emerald-500'
                : 'border-slate-200 bg-white text-slate-900 hover:border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20'
            } disabled:opacity-50 disabled:bg-slate-100 disabled:cursor-not-allowed outline-hidden`}
            aria-label={`Digit ${i + 1} of verification code`}
          />
        );
      })}
    </div>
  );
}
