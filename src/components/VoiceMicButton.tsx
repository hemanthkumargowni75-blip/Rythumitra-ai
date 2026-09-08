'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Loader2, Square, AlertCircle, Info, X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { getVoiceService, VoiceState, VoiceProviderResult } from '@/lib/speech/voiceService';

interface VoiceMicButtonProps {
  onTranscript: (text: string) => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function VoiceMicButton({ onTranscript, className = '', size = 'md' }: VoiceMicButtonProps) {
  const { language, t } = useLanguage();
  const isTe = language === 'te';

  const [voiceState, setVoiceState] = useState<VoiceState>('idle');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const voiceServiceRef = useRef(getVoiceService());

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      voiceServiceRef.current.stopListening();
    };
  }, []);

  const handleToggleRecord = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // If already listening or requesting, stop
    if (voiceState === 'listening' || voiceState === 'requesting_permission') {
      voiceServiceRef.current.stopListening();
      setVoiceState('idle');
      setStatusMessage(null);
      return;
    }

    setStatusMessage(null);

    await voiceServiceRef.current.startListening(
      language,
      (result: VoiceProviderResult) => {
        if (result.transcript) {
          onTranscript(result.transcript);
        }
      },
      (state: VoiceState, message?: string) => {
        setVoiceState(state);
        if (message) {
          setStatusMessage(message);
        }
      }
    );
  };

  const isListening = voiceState === 'listening';
  const isRequesting = voiceState === 'requesting_permission';
  const isProcessing = voiceState === 'processing';
  const isPermissionDenied = voiceState === 'permission_denied';
  const isUnsupported = voiceState === 'unsupported';
  const isError = voiceState === 'error';

  return (
    <div className="relative inline-flex items-center">
      <button
        type="button"
        onClick={handleToggleRecord}
        aria-label={
          isListening
            ? isTe ? 'రికార్డింగ్ ఆపండి (Stop)' : 'Stop listening'
            : isTe ? 'మైక్రోఫోన్ ద్వారా మాట్లాడండి' : 'Click to speak query'
        }
        title={
          isListening
            ? isTe ? 'వినడం ఆపడానికి నొక్కండి' : 'Listening... Click to stop'
            : isProcessing
            ? isTe ? 'ప్రాసెస్ చేస్తోంది...' : 'Processing speech...'
            : isTe ? 'మైక్ ద్వారా మాట్లాడండి' : 'Search by voice'
        }
        className={`relative flex items-center justify-center rounded-xl transition-all select-none ${
          size === 'sm' ? 'w-9 h-9' : size === 'lg' ? 'w-12 h-12' : 'w-10 h-10'
        } ${
          isListening
            ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-lg ring-4 ring-rose-200 animate-pulse'
            : isRequesting || isProcessing
            ? 'bg-amber-500 text-white'
            : isPermissionDenied
            ? 'bg-rose-100 text-rose-700 border border-rose-300'
            : isUnsupported
            ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
            : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 active:scale-95'
        } ${className}`}
      >
        {isListening ? (
          <Square className="w-3.5 h-3.5 fill-white text-white" />
        ) : isRequesting || isProcessing ? (
          <Loader2 className="w-4 h-4 animate-spin text-white" />
        ) : isPermissionDenied ? (
          <MicOff className="w-4 h-4 text-rose-600" />
        ) : (
          <Mic className="w-4 h-4 text-emerald-700" />
        )}
      </button>

      {/* Live Floating Status Badge When Listening */}
      {isListening && (
        <div className="absolute top-11 right-0 z-50 whitespace-nowrap px-3 py-1.5 rounded-xl bg-rose-600 text-white text-[11px] font-bold shadow-xl flex items-center gap-1.5 border border-rose-700">
          <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
          <span>{isTe ? '🔴 వింటోంది... మాట్లాడండి' : '🔴 Listening... Speak now'}</span>
          <button
            type="button"
            onClick={handleToggleRecord}
            className="ml-1 px-1.5 py-0.5 bg-black/20 hover:bg-black/40 rounded text-[10px] uppercase font-bold"
          >
            {isTe ? 'ఆపు' : 'Stop'}
          </button>
        </div>
      )}

      {/* Floating Informative Message for Status / Errors */}
      {(statusMessage || isPermissionDenied || isUnsupported || isError) && !isListening && (
        <div className="absolute top-11 right-0 z-50 max-w-xs p-3 rounded-2xl bg-slate-900 text-white text-xs shadow-2xl border border-slate-700 animate-in fade-in zoom-in duration-150">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-start gap-1.5">
              {isPermissionDenied ? (
                <MicOff className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              ) : isUnsupported ? (
                <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              )}
              <span className="leading-snug">
                {statusMessage ||
                  (isPermissionDenied
                    ? isTe
                      ? 'మైక్రోఫోన్ అనుమతి నిరాకరించబడింది. మీరు ప్రశ్నను టైప్ చేయవచ్చు.'
                      : 'Microphone access was denied. You can continue by typing your question.'
                    : isUnsupported
                    ? isTe
                      ? 'వాయిస్ ఇన్‌పుట్ ప్రస్తుతం అందుబాటులో లేదు. దయచేసి మీ ప్రశ్నను టైప్ చేయండి.'
                      : 'Voice input is currently unavailable. Please type your question instead.'
                    : 'Voice input ready')}
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                setStatusMessage(null);
                setVoiceState('idle');
              }}
              className="text-slate-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
