'use client';

import React, { useState, useEffect } from 'react';
import { WifiOff } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { getCropTranslations } from '@/data/cropTranslations';

export function OfflineIndicator() {
  const [isOffline, setIsOffline] = useState(false);
  const { language } = useLanguage();
  const tCrop = getCropTranslations(language);

  useEffect(() => {
    // Initial check
    if (typeof window !== 'undefined' && !navigator.onLine) {
      setIsOffline(true);
    }

    const handleOffline = () => setIsOffline(true);
    const handleOnline = () => setIsOffline(false);

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div className="bg-amber-600 text-white text-xs py-2 px-4 rounded-xl mb-4 flex items-center justify-between shadow-md animate-pulse">
      <div className="flex items-center gap-2">
        <WifiOff className="w-4 h-4 shrink-0" />
        <span className="font-semibold">{tCrop.offlineBanner}</span>
      </div>
      <button
        type="button"
        onClick={() => setIsOffline(false)}
        className="text-[11px] underline font-bold hover:text-amber-100 ml-3"
      >
        Dismiss
      </button>
    </div>
  );
}
