'use client';

import React from 'react';
import { ExternalLink, ShieldCheck, FileText, Map, Compass, CheckCircle2, AlertCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { getMeeBhoomiTranslation } from '@/data/meebhoomiTranslations';

interface MeeBhoomiCardProps {
  variant?: 'default' | 'compact' | 'embedded';
  className?: string;
  showFeatures?: boolean;
}

export const OFFICIAL_MEEBHOOMI_URL = 'https://meebhoomi.ap.gov.in/';

export function MeeBhoomiCard({
  variant = 'default',
  className = '',
  showFeatures = true,
}: MeeBhoomiCardProps) {
  const { language } = useLanguage();
  const t = getMeeBhoomiTranslation(language);

  // Safe external navigation handler ensuring target="_blank" and rel="noopener noreferrer"
  const handleOpenMeeBhoomi = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Analytics/Audit logging could hook here
    // Safe standard target="_blank" behaviour executes naturally
  };

  if (variant === 'compact') {
    return (
      <div
        className={`bg-gradient-to-br from-emerald-50 via-white to-farm-50 border border-emerald-200/80 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all ${className}`}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-xl shadow-xs shrink-0">
              🏡
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h4 className="text-sm font-black text-gray-900">{t.title}</h4>
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800">
                  <ShieldCheck className="w-3 h-3 text-blue-600" />
                  AP Govt
                </span>
              </div>
              <p className="text-xs text-gray-600 mt-0.5">{t.subtitle}</p>
            </div>
          </div>

          <a
            href={OFFICIAL_MEEBHOOMI_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleOpenMeeBhoomi}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-xs hover:shadow transition-all shrink-0 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 min-h-[44px]"
            aria-label={`${t.buttonText} - ${t.externalNotice}`}
          >
            <span>{t.buttonText}</span>
            <ExternalLink className="w-3.5 h-3.5 stroke-[2.5]" />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden bg-white rounded-3xl border-2 border-emerald-200/90 shadow-md hover:shadow-lg transition-all p-5 sm:p-6 ${className}`}
    >
      {/* Decorative Government-Themed Top Header Accent */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-600 via-teal-500 to-amber-500" />

      <div className="flex flex-col md:flex-row md:items-start justify-between gap-5">
        {/* Left Side: Header, Badge, and Info */}
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold tracking-wide">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t.badge}</span>
            </span>

            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-[10px] font-semibold">
              <ExternalLink className="w-3 h-3 text-blue-600" />
              <span>{t.externalNotice}</span>
            </span>
          </div>

          <div className="flex items-start gap-3.5 mt-2">
            <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center text-2xl shadow-md shrink-0 border border-emerald-400/30">
              🏡
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black text-gray-900 tracking-tight flex items-center gap-2">
                <span>{t.title}</span>
              </h3>
              <p className="text-xs sm:text-sm font-medium text-gray-600 mt-1">
                {t.subtitle}
              </p>
            </div>
          </div>

          {/* Core Government Records Features Checklist */}
          {showFeatures && (
            <div className="mt-4 pt-3 border-t border-gray-100">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {t.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-1.5 p-2 rounded-xl bg-gray-50/80 border border-gray-100 text-[11px] font-semibold text-gray-700"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="truncate">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Privacy & Security Non-Collection Guarantee */}
          <div className="mt-4 flex items-start gap-2 p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/80 text-[11px] text-amber-900 leading-relaxed">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p>{t.disclaimer}</p>
          </div>
        </div>

        {/* Right Side: Large Touch-Friendly Redirect Button */}
        <div className="md:self-center flex flex-col items-stretch md:items-end gap-2 shrink-0">
          <a
            href={OFFICIAL_MEEBHOOMI_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleOpenMeeBhoomi}
            className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-black text-sm shadow-md hover:shadow-lg active:scale-98 transition-all focus:outline-hidden focus:ring-4 focus:ring-emerald-400 focus:ring-offset-2 min-h-[48px]"
            aria-label={`${t.buttonText} - ${t.externalNotice} (https://meebhoomi.ap.gov.in/)`}
          >
            <span className="text-base">🏡</span>
            <span>{t.buttonText}</span>
            <ExternalLink className="w-4 h-4 text-emerald-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform stroke-[2.5]" />
          </a>

          <span className="text-[10px] text-gray-500 font-medium text-center md:text-right flex items-center justify-center md:justify-end gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-600" />
            <span>meebhoomi.ap.gov.in</span>
          </span>
        </div>
      </div>
    </div>
  );
}
