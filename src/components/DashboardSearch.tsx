'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search,
  Sparkles,
  ArrowRight,
  Loader2,
  X,
  History,
  Sprout,
  ShieldAlert,
  FileText,
  CloudSun,
  Droplet,
  Calculator,
  BookOpenCheck,
  MapPin,
  Trash2,
  Camera,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { getCropTranslations } from '@/data/cropTranslations';
import { VoiceMicButton } from '@/components/VoiceMicButton';
import { CameraScanner } from '@/components/CameraScanner';
import { AiAssistantModal } from '@/components/AiAssistantModal';
import { SearchResult, CropSearchResponse } from '@/types';

export function DashboardSearch() {
  const router = useRouter();
  const { language, t } = useLanguage();
  const tCrop = getCropTranslations(language);

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [cropMatches, setCropMatches] = useState<CropSearchResponse['crops']>([]);
  const [activeFarmMatch, setActiveFarmMatch] = useState<CropSearchResponse['activeFarmMatch'] | undefined>(undefined);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [aiQuestion, setAiQuestion] = useState('');
  const [cameraScannerOpen, setCameraScannerOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handlePhotoCaptured = (dataUrl: string) => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('rythu_scan_image', dataUrl);
    }
    router.push('/diagnostics?source=camera');
  };

  // Fetch recent searches on mount
  useEffect(() => {
    async function loadRecent() {
      try {
        const res = await fetch('/api/v1/farmer/recent-searches?farmerId=usr-101');
        if (res.ok) {
          const data = await res.json();
          setRecentSearches(data.recentSearches || []);
        }
      } catch {
        // fallback
      }
    }
    loadRecent();
  }, []);

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced search query
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setCropMatches([]);
      setActiveFarmMatch(undefined);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/v1/crops/search?q=${encodeURIComponent(query.trim())}&language=${language}&farmerId=usr-101`
        );
        if (res.ok) {
          const data: CropSearchResponse = await res.json();
          setResults(data.results || []);
          setCropMatches(data.crops || []);
          setActiveFarmMatch(data.activeFarmMatch);
          setIsOpen(true);
          setSelectedIndex(-1);

          if (data.isQuestion) {
            setAiQuestion(query);
          }
        }
      } catch {
        // fallback search error
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query, language]);

  const handleClearRecent = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await fetch('/api/v1/farmer/recent-searches?farmerId=usr-101', { method: 'DELETE' });
      setRecentSearches([]);
    } catch {
      // ignore
    }
  };

  const handleVoiceTranscript = (text: string) => {
    setQuery(text);
    inputRef.current?.focus();

    // Check if spoken text is a question
    const qLower = text.toLowerCase();
    const isQuestion =
      text.includes('?') ||
      ['why', 'how', 'when', 'what', 'should', 'tell me', 'ఎందుకు', 'ఎప్పుడు', 'ఎలా', 'ఏమి', 'గురించి', 'చెప్పండి', 'क्यों', 'कब', 'कैसे', 'बताओ', 'என்ன', 'எப்படி', 'ಯಾವಾಗ', 'ಹೇಗೆ'].some(
        (w) => qLower.includes(w)
      );

    if (isQuestion) {
      setAiQuestion(text);
      setAiModalOpen(true);
      setIsOpen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || results.length === 0) {
      if (e.key === 'Enter' && query.trim()) {
        if (query.includes('?') || query.split(' ').length >= 4) {
          setAiQuestion(query);
          setAiModalOpen(true);
          setIsOpen(false);
        }
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && results[selectedIndex]) {
        handleSelectResult(results[selectedIndex]);
      } else if (query.trim()) {
        setAiQuestion(query);
        setAiModalOpen(true);
        setIsOpen(false);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const handleSelectResult = (result: SearchResult) => {
    setIsOpen(false);
    setQuery('');
    router.push(result.route);
  };

  const getResultIcon = (type: string) => {
    switch (type) {
      case 'farm':
        return <MapPin className="w-4 h-4 text-emerald-600" />;
      case 'crop':
        return <Sprout className="w-4 h-4 text-green-600" />;
      case 'pest':
        return <ShieldAlert className="w-4 h-4 text-rose-600" />;
      case 'soil':
        return <FileText className="w-4 h-4 text-amber-600" />;
      case 'weather':
        return <CloudSun className="w-4 h-4 text-sky-600" />;
      case 'fertilizer':
        return <Calculator className="w-4 h-4 text-amber-600" />;
      case 'irrigation':
        return <Droplet className="w-4 h-4 text-blue-600" />;
      case 'ledger':
        return <BookOpenCheck className="w-4 h-4 text-earth-700" />;
      default:
        return <Search className="w-4 h-4 text-gray-500" />;
    }
  };

  const popularChips = [
    { label: language === 'te' ? 'వరి' : 'Rice', query: 'paddy', icon: '🌾' },
    { label: language === 'te' ? 'మిర్చి' : 'Chilli', query: 'chilli', icon: '🌶️' },
    { label: language === 'te' ? 'వంకాయ' : 'Brinjal', query: 'brinjal', icon: '🍆' },
    { label: language === 'te' ? 'వేరుశనగ' : 'Groundnut', query: 'groundnut', icon: '🥜' },
    { label: language === 'te' ? 'అరటి' : 'Banana', query: 'banana', icon: '🍌' },
    { label: language === 'te' ? 'మామిడి' : 'Mango', query: 'mango', icon: '🥭' },
    { label: language === 'te' ? 'టమాటా' : 'Tomato', query: 'tomato', icon: '🍅' },
  ];

  return (
    <>
      <div ref={containerRef} className="relative w-full max-w-3xl mx-auto">
        {/* Search Bar Container */}
        <div className="relative flex items-center bg-white rounded-2xl shadow-lg border-2 border-farm-300 focus-within:border-farm-600 focus-within:ring-4 focus-within:ring-farm-100 transition-all overflow-hidden p-1.5 sm:p-2">
          <div className="pl-2 sm:pl-3 text-farm-600 shrink-0">
            <Search className="w-5 h-5 text-farm-600" />
          </div>

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsOpen(true)}
            placeholder={tCrop.searchPlaceholder}
            className="w-full px-3 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-gray-900 placeholder:text-gray-400 bg-transparent focus:outline-none"
          />

          {/* Loading Spinner / Clear Query Button */}
          {loading ? (
            <Loader2 className="w-4 h-4 text-farm-600 animate-spin mr-2 shrink-0" />
          ) : query ? (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setIsOpen(false);
                inputRef.current?.focus();
              }}
              className="p-1 rounded-lg text-gray-400 hover:text-gray-600 mr-1 shrink-0"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          ) : null}

          {/* Dual Action Controls: User-Controlled Microphone & Live Camera Scanner */}
          <div className="shrink-0 flex items-center gap-2 pl-2 border-l border-gray-200">
            <VoiceMicButton onTranscript={handleVoiceTranscript} size="md" />
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setCameraScannerOpen(true);
              }}
              className="w-10 h-10 rounded-xl text-gray-700 hover:text-emerald-700 hover:bg-emerald-50 active:scale-95 transition-all flex items-center justify-center border border-emerald-200 bg-white"
              title={language === 'te' ? 'ఆకు ఫోటో స్కాన్ చేయండి (Camera)' : 'Scan crop leaf with camera'}
              aria-label={language === 'te' ? 'ఆకు ఫోటో స్కాన్ చేయండి (Camera)' : 'Scan crop leaf with camera'}
            >
              <Camera className="w-5 h-5 text-emerald-600" />
            </button>
          </div>
        </div>

        {/* Dropdown Suggestions & Results */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 z-50 mt-2 bg-white rounded-2xl shadow-2xl border border-farm-200 overflow-hidden divide-y divide-gray-100 max-h-96 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-150 text-xs">
            {/* 1. PERSONALIZED ACTIVE FARM MATCH ALERT */}
            {activeFarmMatch && (
              <div
                onClick={() => {
                  setIsOpen(false);
                  router.push(`/crops/${activeFarmMatch.cropId}`);
                }}
                className="p-3.5 bg-gradient-to-r from-amber-500/10 via-amber-400/20 to-emerald-500/10 border-b border-amber-200 cursor-pointer hover:bg-amber-100/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 bg-amber-500 text-white rounded-lg text-xs font-bold">
                      🌟 {tCrop.activeCropBadge}
                    </span>
                    <span className="text-xs font-extrabold text-amber-950">
                      {activeFarmMatch.cropName} ({activeFarmMatch.fieldArea} {t.dashboard.acres})
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-amber-800 underline">
                    {tCrop.viewActiveField}
                  </span>
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] text-amber-900 font-medium">
                  <span className="bg-amber-200/80 px-2 py-0.5 rounded">{activeFarmMatch.stage}</span>
                  <span className="bg-emerald-200/80 px-2 py-0.5 rounded">Health: {activeFarmMatch.healthScore}/100</span>
                  <span>{activeFarmMatch.weatherRisk}</span>
                </div>
              </div>
            )}

            {/* 2. ASK AI OPTION */}
            {query.trim() && (
              <button
                type="button"
                onClick={() => {
                  setAiQuestion(query);
                  setAiModalOpen(true);
                  setIsOpen(false);
                }}
                className="w-full p-3 bg-gradient-to-r from-amber-50 to-emerald-50 hover:from-amber-100 hover:to-emerald-100 text-left flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-amber-500 text-white shadow-xs">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-farm-950 block">
                      {t.aiAssistant.askQuestion}: &ldquo;{query}&rdquo;
                    </span>
                    <span className="text-[11px] text-farm-700">
                      Get 4-part farmer guidance & voice response in {language.toUpperCase()}
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-farm-600" />
              </button>
            )}

            {/* 3. RECENT SEARCHES (Displayed when query is empty) */}
            {!query.trim() && recentSearches.length > 0 && (
              <div className="p-3 bg-gray-50/70">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                    <History className="w-3.5 h-3.5" />
                    <span>{tCrop.recentSearches}</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleClearRecent}
                    className="text-[10px] text-rose-600 font-bold hover:underline flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>{tCrop.clearHistory}</span>
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {recentSearches.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setQuery(item)}
                      className="px-2.5 py-1 rounded-lg bg-white border border-gray-200 text-gray-700 text-xs font-medium hover:bg-farm-50 hover:border-farm-300 transition-colors"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 4. POPULAR CROPS TAGS (Displayed when query is empty) */}
            {!query.trim() && (
              <div className="p-3">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">
                  {tCrop.popularCrops}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {popularChips.map((chip, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setIsOpen(false);
                        router.push(`/crops/${chip.query}`);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-farm-50 hover:bg-farm-100 text-farm-800 text-xs font-bold border border-farm-200 transition-colors flex items-center gap-1"
                    >
                      <span>{chip.icon}</span>
                      <span>{chip.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 5. SEARCH RESULTS LIST */}
            {query.trim() && results.length > 0 && (
              <div className="py-1">
                <div className="px-3 py-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  {t.search.suggestions} ({results.length})
                </div>
                {results.map((item, idx) => {
                  const isSelected = selectedIndex === idx;

                  return (
                    <div
                      key={item.id}
                      onClick={() => handleSelectResult(item)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`px-4 py-2.5 flex items-center justify-between cursor-pointer transition-colors ${
                        isSelected ? 'bg-farm-100/70 text-farm-950' : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-gray-100">
                          {getResultIcon(item.type)}
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-gray-900 leading-snug">
                            {item.title}
                          </h4>
                          <p className="text-[11px] text-gray-500 leading-snug">
                            {item.subtitle}
                          </p>
                        </div>
                      </div>

                      {item.badge && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 shrink-0">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* 6. NO RESULTS STATE */}
            {query.trim() && results.length === 0 && !loading && (
              <div className="p-6 text-center text-gray-500 space-y-2">
                <p className="text-xs font-bold text-gray-700">{t.search.noResults}</p>
                <p className="text-[11px] text-gray-500">
                  Try another name, spelling variation (e.g. &ldquo;bringel&rdquo;), or explore categories in Crop Explorer.
                </p>
                <Link
                  href="/crops"
                  className="inline-block mt-2 px-3 py-1.5 bg-farm-600 text-white rounded-lg text-xs font-bold"
                >
                  Browse All 35+ Crops
                </Link>
              </div>
            )}
          </div>
        )}
      </div>

      {/* AI Assistant Modal */}
      <AiAssistantModal
        isOpen={aiModalOpen}
        onClose={() => setAiModalOpen(false)}
        initialQuestion={aiQuestion}
      />

      {/* Live HTML5 WebRTC Camera Scanner Triggered From Search Bar */}
      <CameraScanner
        isOpen={cameraScannerOpen}
        onClose={() => setCameraScannerOpen(false)}
        onPhotoCaptured={handlePhotoCaptured}
      />
    </>
  );
}
