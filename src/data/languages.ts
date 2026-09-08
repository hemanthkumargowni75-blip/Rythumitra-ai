import { Language, LanguageMeta } from '@/types';

export const supportedLanguages: LanguageMeta[] = [
  {
    code: 'en',
    locale: 'en-IN',
    label: 'English',
    nativeLabel: 'English',
    speechCode: 'en-IN',
    flagEmoji: '🇮🇳',
  },
  {
    code: 'te',
    locale: 'te-IN',
    label: 'Telugu',
    nativeLabel: 'తెలుగు',
    speechCode: 'te-IN',
    flagEmoji: '🌾',
  },
  {
    code: 'hi',
    locale: 'hi-IN',
    label: 'Hindi',
    nativeLabel: 'हिन्दी',
    speechCode: 'hi-IN',
    flagEmoji: '🇮🇳',
  },
  {
    code: 'ta',
    locale: 'ta-IN',
    label: 'Tamil',
    nativeLabel: 'தமிழ்',
    speechCode: 'ta-IN',
    flagEmoji: '🌱',
  },
  {
    code: 'ml',
    locale: 'ml-IN',
    label: 'Malayalam',
    nativeLabel: 'മലയാളം',
    speechCode: 'ml-IN',
    flagEmoji: '🌴',
  },
  {
    code: 'kn',
    locale: 'kn-IN',
    label: 'Kannada',
    nativeLabel: 'ಕನ್ನಡ',
    speechCode: 'kn-IN',
    flagEmoji: '🌿',
  },
  {
    code: 'mr',
    locale: 'mr-IN',
    label: 'Marathi',
    nativeLabel: 'मराठी',
    speechCode: 'mr-IN',
    flagEmoji: '🌻',
  },
];

export const upcomingLanguages = [
  { code: 'bn', locale: 'bn-IN', label: 'Bengali', nativeLabel: 'বাংলা', speechCode: 'bn-IN' },
  { code: 'gu', locale: 'gu-IN', label: 'Gujarati', nativeLabel: 'ગુજરાતી', speechCode: 'gu-IN' },
  { code: 'pa', locale: 'pa-IN', label: 'Punjabi', nativeLabel: 'ਪੰਜਾਬੀ', speechCode: 'pa-IN' },
  { code: 'or', locale: 'or-IN', label: 'Odia', nativeLabel: 'ଓଡ଼ିଆ', speechCode: 'or-IN' },
  { code: 'as', locale: 'as-IN', label: 'Assamese', nativeLabel: 'অসমীয়া', speechCode: 'as-IN' },
  { code: 'ur', locale: 'ur-IN', label: 'Urdu', nativeLabel: 'اردو', speechCode: 'ur-IN' },
];

export function getLanguageMeta(code: string): LanguageMeta {
  return (
    supportedLanguages.find((lang) => lang.code === code) ||
    supportedLanguages[1] // Default to Telugu
  );
}
