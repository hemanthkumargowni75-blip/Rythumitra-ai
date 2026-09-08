'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ExternalLink,
  Volume2,
  VolumeX,
  CheckCircle2,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useFarm } from '@/context/FarmContext';
import { useAuth } from '@/context/AuthContext';
import { ADVISORY_TRANSLATIONS } from '@/data/advisorySlidesTranslations';
import { generateAdvisorySlides, AdvisorySlideItem } from '@/lib/advisory/slideGenerator';

export function FarmerAdvisoryCarousel() {
  const { language } = useLanguage();
  const { farm, farmer, activeCrop, soilTest, weatherForecast } = useFarm();
  const { user } = useAuth();

  const t = ADVISORY_TRANSLATIONS[language] || ADVISORY_TRANSLATIONS.en;

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Acknowledged government notification IDs stored locally
  const [acknowledgedNoticeIds, setAcknowledgedNoticeIds] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('rythumitra_ack_notices');
        if (saved) {
          setAcknowledgedNoticeIds(JSON.parse(saved));
        }
      } catch {
        // ignore parse error
      }
    }
  }, []);

  const handleAcknowledgeNotice = (noticeId: string) => {
    setAcknowledgedNoticeIds((prev) => {
      if (prev.includes(noticeId)) return prev;
      const updated = [...prev, noticeId];
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('rythumitra_ack_notices', JSON.stringify(updated));
        } catch {
          // ignore storage error
        }
      }
      return updated;
    });
  };

  // Dynamically generate slides based on authenticated farmer, crop, stage, location, weather & govt notices
  const slides: AdvisorySlideItem[] = useMemo(() => {
    return generateAdvisorySlides({
      user,
      farmer,
      farm,
      activeCrop,
      soilTest,
      weatherForecast,
      language,
      acknowledgedNoticeIds,
    });
  }, [user, farmer, farm, activeCrop, soilTest, weatherForecast, language, acknowledgedNoticeIds]);

  const totalSlides = slides.length || 1;
  const safeCurrentIndex = Math.min(currentSlide, totalSlides - 1);
  const current = slides[safeCurrentIndex] || slides[0];

  // Touch swipe refs
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Autoplay effect (every 6 seconds, paused on hover/focus)
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 6000);

    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  // Handle SpeechSynthesis audio
  const handleToggleSpeech = (text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();

    const localeMap: Record<string, string> = {
      te: 'te-IN',
      hi: 'hi-IN',
      en: 'en-IN',
      ta: 'ta-IN',
      kn: 'kn-IN',
      ml: 'ml-IN',
      mr: 'mr-IN',
    };
    const targetLocale = localeMap[language] || 'en-IN';

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = targetLocale;
    utterance.rate = 0.9;
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const matchedVoice = voices.find(
      (v) =>
        v.lang.toLowerCase().replace('_', '-') === targetLocale.toLowerCase() ||
        v.lang.toLowerCase().startsWith(language.toLowerCase())
    );
    if (matchedVoice) utterance.voice = matchedVoice;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
    }
  };

  // Touch Swipe Handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  if (!current) return null;
  const IconComponent = current.icon;

  return (
    <section
      aria-roledescription="carousel"
      aria-label={t.sectionTitle}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      className="outline-hidden"
    >
      {/* Header bar with title and navigation controls */}
      <div className="flex items-center justify-between gap-3 mb-3 px-1">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
              {t.sectionTitle}
            </h2>
            <span className="text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
              {t.slideOf.replace('{current}', String(safeCurrentIndex + 1)).replace('{total}', String(totalSlides))}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {t.sectionSubtitle}
          </p>
        </div>

        {/* Carousel Arrow Controls */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={prevSlide}
            aria-label={t.prevSlide}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white hover:bg-slate-100 active:scale-95 border border-slate-200 shadow-xs flex items-center justify-center text-slate-700 transition-all focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            aria-label={t.nextSlide}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white hover:bg-slate-100 active:scale-95 border border-slate-200 shadow-xs flex items-center justify-center text-slate-700 transition-all focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Carousel Card Container */}
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="relative rounded-3xl overflow-hidden shadow-lg border border-emerald-900/40 bg-slate-950 text-white min-h-[300px] sm:min-h-[280px]"
      >
        {/* Background Image with Deep Gradient Scrim for high sunlight readability */}
        <div className="absolute inset-0 z-0">
          <Image
            src={current.imageUrl}
            alt={current.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 1200px"
            priority
            className="object-cover object-center opacity-35 scale-105 transition-transform duration-700 ease-out"
          />
          {/* Multi-stop agricultural dark gradient for crisp text contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-emerald-950/75" />
          <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/60" />
        </div>

        {/* Foreground Content */}
        <div className="relative z-10 p-5 sm:p-7 flex flex-col justify-between h-full min-h-[300px] sm:min-h-[280px]">
          <div>
            {/* Top Badge & Voice Speaker Button */}
            <div className="flex items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <span className={`text-[11px] font-bold px-3 py-1 rounded-full border backdrop-blur-md inline-flex items-center gap-1.5 ${current.badgeColor}`}>
                  <IconComponent className="w-3.5 h-3.5" />
                  <span>{current.badge}</span>
                </span>
                <span className="text-[11px] text-slate-400 hidden sm:inline">
                  • {user?.name || farm?.name || farmer?.name || 'Rythu Farm'}
                </span>
              </div>

              {/* TTS Listen Button */}
              <button
                type="button"
                onClick={() => handleToggleSpeech(current.speechText)}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all shadow-xs border backdrop-blur-md ${
                  isSpeaking
                    ? 'bg-amber-500 text-slate-950 border-amber-400 animate-pulse'
                    : 'bg-white/10 hover:bg-white/20 text-white border-white/20'
                }`}
                title={isSpeaking ? t.stopAudio : t.listen}
                aria-label={isSpeaking ? t.stopAudio : t.listen}
              >
                {isSpeaking ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5" />
                    <span>{t.stopAudio}</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-amber-300" />
                    <span>{t.listen}</span>
                  </>
                )}
              </button>
            </div>

            {/* Title & Subtitle */}
            <div className="max-w-2xl">
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight">
                {current.title}
              </h3>
              <p className="text-xs sm:text-sm text-emerald-300/90 font-medium mt-0.5">
                {current.subtitle}
              </p>
            </div>

            {/* Dynamic Metric Pills Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mt-3.5">
              {current.metrics.map((m, idx) => (
                <div
                  key={idx}
                  className="bg-white/10 backdrop-blur-md rounded-xl p-2.5 sm:p-3 border border-white/10"
                >
                  <span className="text-[10px] text-slate-300 block uppercase font-medium tracking-wider">
                    {m.label}
                  </span>
                  <span
                    className={`text-xs sm:text-sm font-black block mt-0.5 truncate ${
                      m.highlight ? 'text-amber-300' : 'text-white'
                    }`}
                  >
                    {m.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Advisory Description Paragraph */}
            <div className="mt-3.5 p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                {current.description}
              </p>
            </div>
          </div>

          {/* Bottom Row: CTA Buttons & Indicators */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mt-4 pt-3 border-t border-white/10">
            <div className="flex items-center gap-2">
              {/* Main CTA: External or Internal Link */}
              {current.isExternalCta ? (
                <a
                  href={current.ctaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:scale-[0.98] text-slate-950 text-xs sm:text-sm font-black shadow-md hover:shadow-lg transition-all"
                >
                  <span>{current.ctaText}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              ) : (
                <Link
                  href={current.ctaHref}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:scale-[0.98] text-slate-950 text-xs sm:text-sm font-black shadow-md hover:shadow-lg transition-all"
                >
                  <span>{current.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}

              {/* Optional Acknowledge Button for Government Notices */}
              {current.noticeId && !current.isAcknowledged && (
                <button
                  type="button"
                  onClick={() => current.noticeId && handleAcknowledgeNotice(current.noticeId)}
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 text-xs font-bold text-slate-200 border border-white/20 transition-all"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{t.markAcknowledged}</span>
                </button>
              )}
            </div>

            {/* Dots / Pills Indicators */}
            <div className="flex items-center justify-center gap-1.5">
              {slides.map((s, idx) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setCurrentSlide(idx)}
                  aria-label={t.slideOf.replace('{current}', String(idx + 1)).replace('{total}', String(totalSlides))}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    safeCurrentIndex === idx
                      ? 'w-7 bg-amber-400'
                      : 'w-2 bg-white/30 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
