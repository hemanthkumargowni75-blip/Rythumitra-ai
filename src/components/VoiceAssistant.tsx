'use client';

import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface VoiceAssistantProps {
  textToSpeak: string;
  label?: string;
  className?: string;
}

export function VoiceAssistant({ textToSpeak, label, className = '' }: VoiceAssistantProps) {
  const { language } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSupported, setIsSupported] = useState(true);

  const [unsupportedNotice, setUnsupportedNotice] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && !('speechSynthesis' in window)) {
      setIsSupported(false);
    }
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleSpeak = () => {
    setUnsupportedNotice(null);
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setUnsupportedNotice(
        language === 'te'
          ? 'మీ పరికరంలో ఆడియో వాయిస్ సపోర్ట్ లేదు.'
          : 'Speech synthesis is not supported on this browser.'
      );
      return;
    }

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    window.speechSynthesis.cancel(); // cancel any ongoing speech

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

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = targetLocale;
    utterance.rate = 0.9;
    utterance.pitch = 1.0;

    // Search available voices for exact language or Indian English fallback
    const voices = window.speechSynthesis.getVoices();
    const matchedVoice = voices.find(
      (v) =>
        v.lang.toLowerCase().replace('_', '-') === targetLocale.toLowerCase() ||
        v.lang.toLowerCase().startsWith(language.toLowerCase())
    );
    const indianEnglishVoice = voices.find((v) => v.lang.includes('en-IN') || v.lang.includes('en_IN'));

    if (matchedVoice) {
      utterance.voice = matchedVoice;
    } else if (indianEnglishVoice) {
      utterance.voice = indianEnglishVoice;
    }

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = (e) => {
      setIsPlaying(false);
      if (e.error !== 'canceled') {
        setUnsupportedNotice(
          language === 'te'
            ? 'ఈ భాషకు వాయిస్ మీ పరికరంలో అందుబాటులో లేదు. దయచేసి పాఠాన్ని చదవండి.'
            : 'Voice output for this language is unavailable on this device. Please read the advice text.'
        );
        setTimeout(() => setUnsupportedNotice(null), 4000);
      }
    };

    window.speechSynthesis.speak(utterance);
  };

  if (!isSupported) return null;

  return (
    <div className="relative inline-flex items-center">
      <button
        type="button"
        onClick={handleSpeak}
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all shadow-sm ${
          isPlaying
            ? 'bg-amber-500 text-white animate-pulse'
            : 'bg-farm-100 hover:bg-farm-200 text-farm-900 border border-farm-300'
        } ${className}`}
        title={isPlaying ? 'Stop Voice' : 'Listen with Voice Assistant'}
      >
        {isPlaying ? (
          <>
            <VolumeX className="w-4 h-4 text-white" />
            <span>{language === 'te' ? 'ఆపండి' : 'Stop Audio'}</span>
          </>
        ) : (
          <>
            <Volume2 className="w-4 h-4 text-farm-700" />
            <span>{label || (language === 'te' ? 'సలహా వినండి' : 'Listen')}</span>
            <Sparkles className="w-3 h-3 text-amber-500" />
          </>
        )}
      </button>

      {unsupportedNotice && (
        <div className="absolute top-full right-0 z-50 mt-1.5 px-3 py-2 bg-slate-900 text-white text-[11px] rounded-xl shadow-xl border border-slate-700 whitespace-nowrap animate-in fade-in duration-150">
          {unsupportedNotice}
        </div>
      )}
    </div>
  );
}
