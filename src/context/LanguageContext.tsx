'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, LanguageMeta, SupportedLocale } from '@/types';
import { translations, TranslationSchema } from '@/data/translations';
import { supportedLanguages, getLanguageMeta } from '@/data/languages';

interface LanguageContextType {
  language: Language;
  locale: SupportedLocale;
  languageMeta: LanguageMeta;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: TranslationSchema;
  availableLanguages: LanguageMeta[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('te'); // Telugu by default for rural farmers

  useEffect(() => {
    try {
      const saved = localStorage.getItem('rythumitra_lang') as Language;
      const validCodes = supportedLanguages.map((l) => l.code);
      if (saved && validCodes.includes(saved)) {
        setLanguageState(saved);
      }
    } catch {
      // LocalStorage access fallback
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('rythumitra_lang', lang);
    } catch {
      // ignore
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'te' ? 'en' : 'te');
  };

  const languageMeta = getLanguageMeta(language);
  const t = translations[language] || translations.en;

  return (
    <LanguageContext.Provider
      value={{
        language,
        locale: languageMeta.locale,
        languageMeta,
        setLanguage,
        toggleLanguage,
        t,
        availableLanguages: supportedLanguages,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
