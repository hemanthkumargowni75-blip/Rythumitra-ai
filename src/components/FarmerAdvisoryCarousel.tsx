'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Sprout,
  CloudSun,
  Droplet,
  FileText,
  ShieldAlert,
  TrendingUp,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Volume2,
  VolumeX,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Wind,
  Thermometer,
  CloudRain,
  Activity,
  Layers,
  MapPin,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useFarm } from '@/context/FarmContext';
import { useAuth } from '@/context/AuthContext';
import { ADVISORY_TRANSLATIONS } from '@/data/advisorySlidesTranslations';
import { verifiedMandiPrices } from '@/data/marketData';
import { formatINR } from '@/lib/utils';

export function FarmerAdvisoryCarousel() {
  const { language } = useLanguage();
  const { farm, farmer, activeCrop, soilTest, weatherForecast } = useFarm();
  const { user } = useAuth();

  const t = ADVISORY_TRANSLATIONS[language] || ADVISORY_TRANSLATIONS.en;

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Touch swipe refs
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Weather data
  const todayWeather = weatherForecast?.[0] || {
    tempMax: 34,
    tempMin: 23,
    rainProbability: 25,
    humidity: 65,
    windSpeedKmh: 14,
    conditionTe: 'పాక్షిక మేఘావృతం',
    condition: 'PARTLY_CLOUDY',
    sprayAdvisory: { canSpray: true },
  };

  const upcomingRainyDay = weatherForecast?.find((d) => d.rainProbability >= 60);

  // Market price lookup for active crop
  const cropKeyword = (activeCrop?.cropId || activeCrop?.cropNameEn || 'chilli').toLowerCase();
  const matchedMandi =
    verifiedMandiPrices.find((m) => m.cropId.toLowerCase() === cropKeyword) ||
    verifiedMandiPrices.find((m) => cropKeyword.includes(m.cropId.toLowerCase())) ||
    verifiedMandiPrices[0];

  const activeCropDisplay =
    language === 'te'
      ? activeCrop?.cropNameTe || 'తేజా మిర్చి'
      : activeCrop?.cropNameEn || 'Chilli (Teja)';

  // Build 7 Slides Data
  const slides = [
    // -------------------------------------------------------------
    // SLIDE 1: CROP ADVISORY
    // -------------------------------------------------------------
    {
      id: 'crop',
      badge: language === 'te' ? 'నా పంట సలహా' : 'Active Crop',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      icon: Sprout,
      iconColor: 'text-emerald-400',
      title: t.cropTitle,
      subtitle: t.cropSubtitle,
      imageUrl: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Farmer inspecting healthy green crop in field',
      metrics: [
        { label: t.cropActive, value: activeCropDisplay, highlight: true },
        { label: t.cropStage, value: activeCrop?.currentStage?.replace(/_/g, ' ') || 'FLOWERING' },
        { label: t.cropDays, value: `${activeCrop?.stageDays || 58} ${language === 'te' ? 'రోజులు' : 'Days'}` },
        { label: language === 'te' ? 'విస్తీర్ణం' : 'Acreage', value: `${farm?.boundary?.areaAcres || 4.5} ${language === 'te' ? 'ఎకరాలు' : 'Acres'}` },
      ],
      description: t.cropAction,
      speechText: `${t.cropTitle}. ${activeCropDisplay}, ${t.cropStage}: ${activeCrop?.currentStage}. ${t.cropAction}`,
      ctaText: t.cropCta,
      ctaHref: '/crops',
    },

    // -------------------------------------------------------------
    // SLIDE 2: WEATHER ADVISORY
    // -------------------------------------------------------------
    {
      id: 'weather',
      badge: language === 'te' ? 'వాతావరణ నివేదిక' : 'Live Agro-Weather',
      badgeColor: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
      icon: CloudSun,
      iconColor: 'text-sky-400',
      title: t.weatherTitle,
      subtitle: t.weatherSubtitle,
      imageUrl: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Agricultural crop fields under monsoon sky',
      metrics: [
        { label: t.weatherTemp, value: `${todayWeather.tempMax}°C / ${todayWeather.tempMin}°C`, highlight: true },
        { label: t.weatherRain, value: `${todayWeather.rainProbability}%` },
        { label: t.weatherHumidity, value: `${todayWeather.humidity}%` },
        { label: t.weatherWind, value: `${todayWeather.windSpeedKmh} km/h` },
      ],
      description: todayWeather.sprayAdvisory?.canSpray
        ? `${t.weatherSprayFavorable}. ${language === 'te' ? 'గాలి వేగం సాధారణంగా ఉంది, ఉదయం మందులు పిచికారీ చేయవచ్చు.' : 'Wind velocity is optimal for morning foliar spray.'}`
        : `${t.weatherSprayUnfavorable}. ${language === 'te' ? 'గాలి వేగం లేదా వర్ష సూచన వల్ల మందుల పిచికారీ వాయిదా వేయండి.' : 'High wind speed or rain expected. Defer spray operations.'}`,
      speechText: `${t.weatherTitle}. ${t.weatherTemp}: ${todayWeather.tempMax} డిగ్రీలు. ${t.weatherRain}: ${todayWeather.rainProbability} శాతం. ${todayWeather.sprayAdvisory?.canSpray ? t.weatherSprayFavorable : t.weatherSprayUnfavorable}`,
      ctaText: t.weatherCta,
      ctaHref: '/weather',
    },

    // -------------------------------------------------------------
    // SLIDE 3: SMART IRRIGATION
    // -------------------------------------------------------------
    {
      id: 'irrigation',
      badge: language === 'te' ? 'నీటి పారుదల' : 'Smart Irrigation',
      badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
      icon: Droplet,
      iconColor: 'text-blue-400',
      title: t.irrigationTitle,
      subtitle: t.irrigationSubtitle,
      imageUrl: 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Fresh irrigation water canal flowing into green farmland',
      metrics: [
        { label: t.irrigationMoisture, value: '45% (Optimal)', highlight: true },
        { label: t.irrigationRuntime, value: upcomingRainyDay ? '0 Hours' : '2 Hours' },
        { label: t.irrigationMethod, value: farm?.irrigationType?.replace(/_/g, ' ') || 'DRIP' },
        { label: language === 'te' ? 'భూమి రకం' : 'Soil Type', value: farm?.soilType?.replace(/_/g, ' ') || 'BLACK SOIL' },
      ],
      description: upcomingRainyDay ? t.irrigationRainNotice : t.irrigationNormalNotice,
      speechText: `${t.irrigationTitle}. ${upcomingRainyDay ? t.irrigationRainNotice : t.irrigationNormalNotice}`,
      ctaText: t.irrigationCta,
      ctaHref: '/irrigation',
    },

    // -------------------------------------------------------------
    // SLIDE 4: SOIL HEALTH
    // -------------------------------------------------------------
    {
      id: 'soil',
      badge: language === 'te' ? 'నేల స్వభావం' : 'Soil Health Card',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      icon: FileText,
      iconColor: 'text-amber-400',
      title: t.soilTitle,
      subtitle: t.soilSubtitle,
      imageUrl: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Indian farmer hands holding rich fertile agricultural soil',
      metrics: [
        { label: t.soilScore, value: `${soilTest?.overallScore || 72}/100`, highlight: true },
        { label: t.soilPh, value: `${soilTest?.pH || 6.8} (Neutral)` },
        { label: 'N-P-K', value: `${soilTest?.nitrogen || 210}-${soilTest?.phosphorus || 18}-${soilTest?.potassium || 280}` },
        { label: 'Zinc (Zn)', value: `${soilTest?.zinc || 0.45} ppm (Low)` },
      ],
      description: soilTest?.recommendationsTe?.[0] || t.soilAdvice,
      speechText: `${t.soilTitle}. ${t.soilScore}: ${soilTest?.overallScore || 72} బై 100. ${soilTest?.recommendationsTe?.[0] || t.soilAdvice}`,
      ctaText: t.soilCta,
      ctaHref: '/soil',
    },

    // -------------------------------------------------------------
    // SLIDE 5: PEST & DISEASE ALERT
    // -------------------------------------------------------------
    {
      id: 'pest',
      badge: language === 'te' ? 'తెగుళ్ల హెచ్చరిక' : 'Pest & Disease Watch',
      badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
      icon: ShieldAlert,
      iconColor: 'text-rose-400',
      title: t.pestTitle,
      subtitle: t.pestSubtitle,
      imageUrl: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Agronomist closely inspecting crop plant leaf for early pests',
      metrics: [
        { label: t.cropActive, value: activeCropDisplay, highlight: true },
        { label: t.pestRisk, value: t.pestRiskModerate },
        { label: language === 'te' ? 'ముప్పు కారకం' : 'Trigger', value: language === 'te' ? 'అధిక తేమ' : 'High Humidity' },
        { label: language === 'te' ? 'రక్షణ చర్య' : 'Action', value: language === 'te' ? 'జిగురు అట్టలు' : 'Sticky Traps' },
      ],
      description: `${t.pestCondition} ${t.pestAction}`,
      speechText: `${t.pestTitle}. ${activeCropDisplay}. ${t.pestCondition} ${t.pestAction}`,
      ctaText: t.pestCta,
      ctaHref: '/diagnostics',
    },

    // -------------------------------------------------------------
    // SLIDE 6: MARKET RATES
    // -------------------------------------------------------------
    {
      id: 'market',
      badge: 'e-NAM / AGMARKNET',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      icon: TrendingUp,
      iconColor: 'text-emerald-400',
      title: t.marketTitle,
      subtitle: t.marketSubtitle,
      imageUrl: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Fresh harvested agricultural produce in crates at market yard',
      metrics: [
        { label: t.cropActive, value: matchedMandi.cropNameTe || activeCropDisplay, highlight: true },
        { label: t.marketModalPrice, value: `${formatINR(matchedMandi.modalPrice)} / Qtl` },
        { label: t.marketMandi, value: `${matchedMandi.marketName}` },
        { label: t.marketTrend, value: `${matchedMandi.priceChange24h >= 0 ? `+${matchedMandi.priceChange24h}` : matchedMandi.priceChange24h} (24h)` },
      ],
      description: `${language === 'te' ? 'సమీప మండి' : 'Nearest Mandi'}: ${matchedMandi.marketName}, ${matchedMandi.district}. ${t.marketRange}: ${formatINR(matchedMandi.minPrice)} - ${formatINR(matchedMandi.maxPrice)}.`,
      speechText: `${t.marketTitle}. ${matchedMandi.cropNameTe || activeCropDisplay} మోడల్ ధర ${formatINR(matchedMandi.modalPrice)} రూపాయలు. మార్కెట్: ${matchedMandi.marketName}.`,
      ctaText: t.marketCta,
      ctaHref: '/markets',
    },

    // -------------------------------------------------------------
    // SLIDE 7: DAILY FARMER TIP
    // -------------------------------------------------------------
    {
      id: 'tip',
      badge: language === 'te' ? 'రైతు మిత్ర AI సూచన' : 'Agronomist Pro-Tip',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      icon: Sparkles,
      iconColor: 'text-amber-400',
      title: t.tipTitle,
      subtitle: t.tipSubtitle,
      imageUrl: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Smiling Indian farmer standing in lush crop farm under clear sunshine',
      metrics: [
        { label: t.tipTag, value: language === 'te' ? 'పూత & కాత పెంపు' : 'Flowering & Fruit Setting', highlight: true },
        { label: language === 'te' ? 'సీజన్' : 'Season', value: language === 'te' ? 'రబీ సీజన్' : 'Rabi Season' },
        { label: language === 'te' ? 'సిಫార్సు' : 'Method', value: language === 'te' ? 'ఆకులపై పిచికారీ' : 'Foliar Spray' },
        { label: language === 'te' ? 'ఆశించిన ఫలితం' : 'Gain', value: '+15-20% Yield' },
      ],
      description: t.tipContent,
      speechText: `${t.tipTitle}. ${t.tipContent}`,
      ctaText: t.tipCta,
      ctaHref: '/consult',
    },
  ];

  const totalSlides = slides.length;

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

  const current = slides[currentSlide];
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
              {t.slideOf.replace('{current}', String(currentSlide + 1)).replace('{total}', String(totalSlides))}
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
                  • {farm?.name || 'Rythu Farm'}
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

          {/* Bottom Row: CTA Button & Indicators */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mt-4 pt-3 border-t border-white/10">
            {/* CTA Navigation Button */}
            <Link
              href={current.ctaHref}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:scale-[0.98] text-slate-950 text-xs sm:text-sm font-black shadow-md hover:shadow-lg transition-all"
            >
              <span>{current.ctaText}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            {/* Dots / Pills Indicators */}
            <div className="flex items-center justify-center gap-1.5">
              {slides.map((s, idx) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setCurrentSlide(idx)}
                  aria-label={t.slideOf.replace('{current}', String(idx + 1)).replace('{total}', String(totalSlides))}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentSlide === idx
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
