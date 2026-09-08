'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  X,
  HelpCircle,
  AlertCircle,
  CheckCircle2,
  PhoneCall,
  Loader2,
  ArrowRight,
  Send,
  MessageSquare,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useFarm } from '@/context/FarmContext';
import { VoiceAssistant } from '@/components/VoiceAssistant';
import { AiAdviceResponse } from '@/types';

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuestion?: string;
}

export function AiAssistantModal({ isOpen, onClose, initialQuestion = '' }: AiAssistantModalProps) {
  const { language, t } = useLanguage();
  const { farm, activeCrop } = useFarm();

  const [question, setQuestion] = useState(initialQuestion);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<AiAdviceResponse | null>(null);

  React.useEffect(() => {
    if (initialQuestion) {
      setQuestion(initialQuestion);
      handleAskQuestion(initialQuestion);
    }
  }, [initialQuestion]);

  const handleAskQuestion = async (queryText?: string) => {
    const q = queryText || question;
    if (!q.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/v1/ai/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q, language }),
      });

      if (res.ok) {
        const data = await res.json();
        setResponse(data);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const spokenAdviceText = response
    ? `${response.whatIsHappening}. ${response.why}. ${response.whatShouldIDoNow.join('. ')}`
    : '';

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] shadow-2xl border border-farm-200 flex flex-col overflow-hidden">
        {/* Modal Top Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-farm-900 via-farm-800 to-farm-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black tracking-tight flex items-center gap-2">
                <span>{t.aiAssistant.title}</span>
                <span className="text-[10px] bg-amber-500 text-farm-950 font-black px-1.5 py-0.5 rounded">
                  AI
                </span>
              </h3>
              <p className="text-xs text-farm-200 mt-0.5">
                {farm.name} • {activeCrop.cropNameTe} ({activeCrop.currentStage})
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-farm-200 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Scroll Area */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-5">
          {/* Question Input Box */}
          <div className="flex gap-2">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder={t.aiAssistant.questionPlaceholder}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleAskQuestion();
              }}
              className="flex-1 px-4 py-3 rounded-2xl border border-gray-300 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-farm-500 shadow-xs"
            />
            <button
              type="button"
              disabled={loading}
              onClick={() => handleAskQuestion()}
              className="px-5 py-3 rounded-2xl bg-farm-600 hover:bg-farm-700 text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5 shrink-0"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <span>{t.aiAssistant.askButton}</span>
                  <Send className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>

          {/* Sample Prompts */}
          {!response && !loading && (
            <div>
              <span className="text-xs font-bold text-gray-500 block mb-2">
                {t.search.tryAsking}
              </span>
              <div className="flex flex-wrap gap-2">
                {t.aiAssistant.sampleQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setQuestion(q);
                      handleAskQuestion(q);
                    }}
                    className="p-2.5 rounded-xl bg-farm-50 hover:bg-farm-100 text-farm-900 border border-farm-200 text-xs text-left font-medium transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Loading Indicator */}
          {loading && (
            <div className="p-8 text-center space-y-3">
              <Loader2 className="w-8 h-8 text-farm-600 animate-spin mx-auto" />
              <p className="text-xs font-semibold text-gray-600">
                {t.aiAssistant.analyzing}
              </p>
            </div>
          )}

          {/* Formatted 4-Part Farmer Advice Card */}
          {response && !loading && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <span className="text-xs font-bold text-farm-800 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Advice for: &ldquo;{response.question}&rdquo;</span>
                </span>
                <VoiceAssistant
                  textToSpeak={spokenAdviceText}
                  label={language === 'te' ? 'సలహా వినండి' : 'Listen Advice'}
                  className="bg-amber-100 hover:bg-amber-200 text-amber-900 border-amber-300"
                />
              </div>

              {/* 1. What is happening? */}
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200">
                <h4 className="text-xs font-black uppercase tracking-wider text-amber-900 mb-1 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-amber-700" />
                  <span>{t.aiAssistant.whatIsHappening}</span>
                </h4>
                <p className="text-xs text-amber-950 font-medium leading-relaxed">
                  {response.whatIsHappening}
                </p>
              </div>

              {/* 2. Why? */}
              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200">
                <h4 className="text-xs font-black uppercase tracking-wider text-blue-900 mb-1 flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-blue-700" />
                  <span>{t.aiAssistant.why}</span>
                </h4>
                <p className="text-xs text-blue-950 font-medium leading-relaxed">
                  {response.why}
                </p>
              </div>

              {/* 3. What should I do now? */}
              <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200">
                <h4 className="text-xs font-black uppercase tracking-wider text-emerald-900 mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>{t.aiAssistant.whatShouldIDoNow}</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-emerald-950 font-medium">
                  {response.whatShouldIDoNow.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 4. When should I contact an expert? */}
              <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200">
                <h4 className="text-xs font-black uppercase tracking-wider text-purple-900 mb-1 flex items-center gap-1.5">
                  <PhoneCall className="w-4 h-4 text-purple-700" />
                  <span>{t.aiAssistant.whenToContactExpert}</span>
                </h4>
                <p className="text-xs text-purple-950 font-medium leading-relaxed">
                  {response.whenToContactExpert}
                </p>
              </div>

              <p className="text-[10px] text-gray-400 italic">
                {t.aiAssistant.disclaimer}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
