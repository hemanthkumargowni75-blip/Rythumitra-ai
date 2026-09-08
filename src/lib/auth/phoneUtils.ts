/**
 * Phone Number Normalization and Validation Utilities for RythuMitra AI
 * Authoritative Indian Mobile Standard:
 * - 10 digits
 * - Starting with 6, 7, 8, or 9
 * - Supports +91, 91, 0, spaces, dashes, parentheses
 */

export interface PhoneNormalizationResult {
  valid: boolean;
  normalized: string;
  formatted: string;
  masked: string;
  error?: string;
}

/**
 * Normalizes any Indian mobile representation into the canonical 10-digit format
 * Examples:
 *   "+91 98480 22338" -> "9848022338"
 *   "+919848022338"   -> "9848022338"
 *   "919848022338"    -> "9848022338"
 *   "09848022338"     -> "9848022338"
 *   "98480-22338"     -> "9848022338"
 *   "9848022338"      -> "9848022338"
 */
export function normalizeIndianMobile(input: unknown): PhoneNormalizationResult {
  if (input === null || input === undefined) {
    return {
      valid: false,
      normalized: '',
      formatted: '',
      masked: '',
      error: 'Mobile number is required.',
    };
  }

  const raw = String(input).trim();
  if (!raw) {
    return {
      valid: false,
      normalized: '',
      formatted: '',
      masked: '',
      error: 'Mobile number is required.',
    };
  }

  // 1. Extract only numeric digits
  let digits = raw.replace(/\D/g, '');

  // 2. Handle country code variations:
  // If 12 digits and starts with 91 (e.g. 919848022338 or +919848022338)
  if (digits.length === 12 && digits.startsWith('91')) {
    digits = digits.slice(2);
  }
  // If 11 digits and starts with 0 (e.g. 09848022338)
  else if (digits.length === 11 && digits.startsWith('0')) {
    digits = digits.slice(1);
  }
  // If longer than 12 digits, strip leading 91 or 0091 if present
  else if (digits.length > 12 && digits.startsWith('0091')) {
    digits = digits.slice(4);
  }

  // 3. Validate length
  if (digits.length !== 10) {
    return {
      valid: false,
      normalized: digits,
      formatted: digits,
      masked: digits,
      error: 'Please enter a valid 10-digit Indian mobile number.',
    };
  }

  // 4. Validate Indian mobile leading digit (must be 6, 7, 8, or 9)
  if (!/^[6-9]\d{9}$/.test(digits)) {
    return {
      valid: false,
      normalized: digits,
      formatted: digits,
      masked: digits,
      error: 'Indian mobile numbers must start with 6, 7, 8, or 9.',
    };
  }

  const formatted = `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`;
  const masked = `+91 ${digits.slice(0, 2)}******${digits.slice(-2)}`;

  return {
    valid: true,
    normalized: digits,
    formatted,
    masked,
  };
}

/**
 * Clean user typing/pasting input on the fly for phone input fields.
 * Prevents premature truncation when user pastes +91... or 91... into an input.
 */
export function cleanInputMobile(input: string): string {
  if (!input) return '';
  let str = input.trim();

  // If user pasted +91...
  if (str.startsWith('+91')) {
    str = str.slice(3);
  } else if (str.startsWith('+')) {
    str = str.slice(1);
  }

  // Remove non-digits
  const digits = str.replace(/\D/g, '');

  // If user entered 12 digits starting with 91
  if (digits.length === 12 && digits.startsWith('91')) {
    return digits.slice(2);
  }

  // If user entered 11 digits starting with 0
  if (digits.length === 11 && digits.startsWith('0')) {
    return digits.slice(1);
  }

  // If user typed 91 followed by digits but less than 12 total, check if first two are 91
  // Only strip 91 if total digits exceeds 10
  if (digits.length > 10 && digits.startsWith('91')) {
    return digits.slice(2).slice(0, 10);
  }

  return digits.slice(0, 10);
}

/**
 * Format a 10-digit mobile string for display (e.g. +91 98480 22338)
 */
export function formatIndianMobile(mobile: string): string {
  const norm = normalizeIndianMobile(mobile);
  return norm.valid ? norm.formatted : mobile;
}

/**
 * Mask a mobile number for safe privacy display (e.g. +91 98******38)
 */
export function maskIndianMobile(mobile: string): string {
  const norm = normalizeIndianMobile(mobile);
  return norm.valid ? norm.masked : mobile;
}
