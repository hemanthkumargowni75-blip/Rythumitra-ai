'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  Sprout,
  ArrowLeft,
  Volume2,
  VolumeX,
  Star,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Calendar,
  Layers,
  Droplets,
  Activity,
  PhoneCall,
  ShieldAlert,
  Calculator,
  Share2,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useFarm } from '@/context/FarmContext';
import { getCropById, toggleFarmerFavorite, getFarmerFavoriteCropIds } from '@/data/cropDatabase';
import { getCropTranslations } from '@/data/cropTranslations';
import { CropEntity } from '@/types';

export default function CropDetailPage() {
  const params = useParams();
  const router = useRouter();
  const cropId = (params.id as string) || '';

  const { language } = useLanguage();
  const { farm, activeCrop, setActiveCrop } = useFarm();
  const tCrop = getCropTranslations(language);

  const [crop, setCrop] = useState<CropEntity | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [selectionMessage, setSelectionMessage] = useState('');

  useEffect(() => {
    const found = getCropById(cropId);
    if (found) {
      setCrop(found);
      const favIds = getFarmerFavoriteCropIds('usr-101');
      setIsFavorite(favIds.includes(found.id));
    }
  }, [cropId]);

  // Clean up speech synthesis when leaving page
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  if (!crop) {
    return (
      <div className="py-16 text-center space-y-4">
        <div className="w-16 h-16 bg-farm-100 rounded-full flex items-center justify-center mx-auto text-farm-600">
          <Sprout className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-gray-800">Crop Not Found</h2>
        <p className="text-xs text-gray-500 max-w-sm mx-auto">
          We could not find information for &ldquo;{cropId}&rdquo;. Please search another crop.
        </p>
        <Link
          href="/crops"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-farm-600 text-white rounded-xl text-xs font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Crop Explorer</span>
        </Link>
      </div>
    );
  }

  const content = crop.translations[language] || crop.translations.en;
  const isCurrentActive = activeCrop.cropId === crop.id;

  const handleToggleFavorite = () => {
    const newStatus = toggleFarmerFavorite(crop.id, 'usr-101');
    setIsFavorite(newStatus);
  };

  const handleVoiceReadout = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('Text-to-speech is not supported on this device.');
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    window.speechSynthesis.cancel();

    // Prepare clean spoken script
    const textToSpeak = `${content.name}. ${content.whatIsThis}. ${content.growingSeason}. ${content.soilRequirements}. ${content.waterRequirements}. ${content.generalCare}`;

    const utterance = new SpeechSynthesisUtterance(textToSpeak);

    // Set voice language code
    const langVoiceMap: Record<string, string> = {
      te: 'te-IN',
      en: 'en-IN',
      hi: 'hi-IN',
      ta: 'ta-IN',
      kn: 'kn-IN',
      ml: 'ml-IN',
      mr: 'mr-IN',
    };
    utterance.lang = langVoiceMap[language] || 'te-IN';
    utterance.rate = 0.95;

    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    setIsPlayingAudio(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleSelectAsActive = () => {
    setActiveCrop({
      id: `crop-${Date.now()}`,
      farmId: farm.id,
      cropId: crop.id,
      cropNameEn: crop.translations.en.name,
      cropNameTe: crop.translations.te.name,
      sowingDate: new Date().toISOString().split('T')[0],
      currentStage: 'GERMINATION',
      stageDays: 1,
      expectedHarvestDate: new Date(Date.now() + crop.durationDays * 86400000)
        .toISOString()
        .split('T')[0],
      status: 'ACTIVE',
    });

    setSelectionMessage(
      language === 'te'
        ? `${content.name} ప్రస్తుత సాగు పంటగా ఎంచుకోబడింది!`
        : `${content.name} set as currently cultivating field crop!`
    );
    setTimeout(() => setSelectionMessage(''), 4000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Navigation Top Bar */}
      <div className="flex items-center justify-between">
        <Link
          href="/crops"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-farm-800 hover:text-farm-900 bg-white px-3 py-1.5 rounded-xl border border-farm-200 shadow-2xs transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{language === 'te' ? 'పంటల వేదికకు తిరిగి వెళ్ళండి' : 'Back to Crop Explorer'}</span>
        </Link>

        <div className="flex items-center gap-2">
          {/* Favorite Button */}
          <button
            type="button"
            onClick={handleToggleFavorite}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
              isFavorite
                ? 'bg-amber-50 text-amber-800 border-amber-300'
                : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
            }`}
          >
            <Star className={`w-4 h-4 ${isFavorite ? 'fill-amber-400 text-amber-500' : 'text-gray-400'}`} />
            <span>{isFavorite ? (language === 'te' ? 'సేవ్ చేయబడింది' : 'Saved in My Crops') : (language === 'te' ? 'సేవ్ చేయండి' : 'Save Crop')}</span>
          </button>

          {/* Voice Audio Readout Button */}
          <button
            type="button"
            onClick={handleVoiceReadout}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold text-white shadow-xs transition-all ${
              isPlayingAudio ? 'bg-rose-600 hover:bg-rose-700 animate-pulse' : 'bg-amber-500 hover:bg-amber-600'
            }`}
          >
            {isPlayingAudio ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            <span>{isPlayingAudio ? tCrop.cropDetail.stopAudioGuide : tCrop.cropDetail.listenAudioGuide}</span>
          </button>
        </div>
      </div>

      {/* Success Alert Banner */}
      {selectionMessage && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-xs font-bold text-emerald-900 flex items-center gap-2 shadow-xs">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{selectionMessage}</span>
        </div>
      )}

      {/* Header Profile Card */}
      <div className="bg-gradient-to-r from-farm-900 via-farm-800 to-farm-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="flex flex-wrap items-start justify-between gap-4 relative z-10">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-4xl shadow-inner border border-white/20">
              {crop.iconEmoji}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold uppercase tracking-wider border border-emerald-400/30">
                  {crop.category}
                </span>
                {isCurrentActive && (
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-farm-950 text-[10px] font-extrabold">
                    ✓ {tCrop.currentlyActive}
                  </span>
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight">{content.name}</h1>
              <p className="text-xs text-farm-200 mt-1 italic">{crop.scientificName}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {!isCurrentActive && (
              <button
                type="button"
                onClick={handleSelectAsActive}
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-farm-950 text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{tCrop.selectAsActive}</span>
              </button>
            )}
          </div>
        </div>

        {/* Quick Agronomic Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-farm-700/60 text-xs">
          <div className="bg-farm-800/80 p-3 rounded-xl border border-farm-700">
            <span className="text-farm-300 block text-[10px] uppercase font-bold">{tCrop.cropDetail.durationDays}</span>
            <span className="text-base font-black text-white">{crop.durationDays} Days</span>
          </div>

          <div className="bg-farm-800/80 p-3 rounded-xl border border-farm-700">
            <span className="text-farm-300 block text-[10px] uppercase font-bold">{tCrop.cropDetail.waterNeed}</span>
            <span className="text-base font-black text-white">{crop.waterRequirementMm} mm</span>
          </div>

          <div className="bg-farm-800/80 p-3 rounded-xl border border-farm-700">
            <span className="text-farm-300 block text-[10px] uppercase font-bold">{tCrop.cropDetail.expectedYield}</span>
            <span className="text-base font-black text-emerald-300">{crop.expectedYieldPerAcre}</span>
          </div>

          <div className="bg-farm-800/80 p-3 rounded-xl border border-farm-700">
            <span className="text-farm-300 block text-[10px] uppercase font-bold">{tCrop.cropDetail.riskLevel}</span>
            <span
              className={`text-base font-black ${
                crop.riskLevel === 'LOW' ? 'text-emerald-300' : crop.riskLevel === 'MEDIUM' ? 'text-amber-300' : 'text-rose-300'
              }`}
            >
              {crop.riskLevel} Risk
            </span>
          </div>
        </div>
      </div>

      {/* 8 FARMER-FRIENDLY SECTIONS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: What is this crop? */}
        <div className="bg-white rounded-3xl p-6 border border-farm-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
                <HelpCircle className="w-5 h-5" />
              </div>
              <h2 className="text-sm font-extrabold text-gray-900">{tCrop.cropDetail.whatIsThis}</h2>
            </div>
            <p className="text-xs text-gray-700 leading-relaxed font-medium">{content.whatIsThis}</p>
          </div>
        </div>

        {/* Card 2: When can I grow it? */}
        <div className="bg-white rounded-3xl p-6 border border-farm-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 rounded-xl bg-sky-50 text-sky-700">
                <Calendar className="w-5 h-5" />
              </div>
              <h2 className="text-sm font-extrabold text-gray-900">{tCrop.cropDetail.whenCanIGrowIt}</h2>
            </div>
            <p className="text-xs text-gray-700 leading-relaxed font-medium">{content.growingSeason}</p>
          </div>
        </div>

        {/* Card 3: What soil does it need? */}
        <div className="bg-white rounded-3xl p-6 border border-farm-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 rounded-xl bg-amber-50 text-amber-700">
                <Layers className="w-5 h-5" />
              </div>
              <h2 className="text-sm font-extrabold text-gray-900">{tCrop.cropDetail.soilRequirements}</h2>
            </div>
            <p className="text-xs text-gray-700 leading-relaxed font-medium">{content.soilRequirements}</p>
          </div>
        </div>

        {/* Card 4: How much water does it generally need? */}
        <div className="bg-white rounded-3xl p-6 border border-farm-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 rounded-xl bg-blue-50 text-blue-700">
                <Droplets className="w-5 h-5" />
              </div>
              <h2 className="text-sm font-extrabold text-gray-900">{tCrop.cropDetail.waterRequirements}</h2>
            </div>
            <p className="text-xs text-gray-700 leading-relaxed font-medium">{content.waterRequirements}</p>
          </div>
        </div>
      </div>

      {/* Card 5: Main Crop Stages (Detailed Timeline) */}
      <div className="bg-white rounded-3xl p-6 border border-farm-200 shadow-xs">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-xl bg-purple-50 text-purple-700">
            <Activity className="w-5 h-5" />
          </div>
          <h2 className="text-sm font-extrabold text-gray-900">{tCrop.cropDetail.mainStages}</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {crop.stages.map((stage, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-gray-50 border border-gray-200/70 text-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="w-6 h-6 rounded-full bg-farm-600 text-white flex items-center justify-center font-bold text-[10px]">
                  {idx + 1}
                </span>
                <span className="text-[10px] font-bold text-gray-500 bg-white px-2 py-0.5 rounded-md border border-gray-200">
                  {stage.daysRange}
                </span>
              </div>
              <h4 className="font-extrabold text-gray-900 text-xs mb-1">
                {language === 'te' && stage.stageNameTe ? stage.stageNameTe : stage.stageName}
              </h4>
              <p className="text-gray-600 text-[11px] leading-relaxed mb-2">{stage.description}</p>
              <div className="pt-2 border-t border-gray-200 text-[10px]">
                <span className="font-bold text-emerald-800 block">Action:</span>
                <span className="text-gray-700">{stage.keyAction}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 6: What should I monitor daily? */}
        <div className="bg-white rounded-3xl p-6 border border-farm-200 shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 rounded-xl bg-teal-50 text-teal-700">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h2 className="text-sm font-extrabold text-gray-900">{tCrop.cropDetail.whatToMonitor}</h2>
          </div>
          <ul className="space-y-2 text-xs text-gray-700">
            {content.whatToMonitor.map((item, i) => (
              <li key={i} className="flex items-start gap-2 bg-teal-50/50 p-2.5 rounded-xl border border-teal-100">
                <span className="text-teal-600 font-bold">✓</span>
                <span className="font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Card 7: Common Pests & Diseases */}
        <div className="bg-white rounded-3xl p-6 border border-farm-200 shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 rounded-xl bg-rose-50 text-rose-700">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h2 className="text-sm font-extrabold text-gray-900">{tCrop.cropDetail.commonProblems}</h2>
          </div>
          <ul className="space-y-2 text-xs text-gray-700">
            {content.commonPestsAndDiseases.map((item, i) => (
              <li key={i} className="flex items-start gap-2 bg-rose-50/50 p-2.5 rounded-xl border border-rose-100">
                <span className="text-rose-600 font-bold">⚠️</span>
                <span className="font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Card 8: When should I contact an expert? */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-3xl p-6 border border-amber-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-3 bg-amber-500 rounded-2xl text-white shadow-xs shrink-0">
            <PhoneCall className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-black text-amber-950">{tCrop.cropDetail.whenToContactExpert}</h3>
            <p className="text-xs text-amber-900 mt-1 max-w-2xl font-medium leading-relaxed">
              {content.whenToContactExpert}
            </p>
          </div>
        </div>

        <Link
          href="/consult"
          className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors shrink-0"
        >
          {language === 'te' ? 'శాస్త్రవేత్తతో మాట్లాడండి →' : 'Consult Agronomist →'}
        </Link>
      </div>

      {/* Shortcut Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="/diagnostics"
          className="p-4 rounded-2xl bg-white border border-farm-200 hover:border-farm-400 shadow-xs hover:shadow-md transition-all flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-rose-100 rounded-xl text-rose-700">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900">{tCrop.cropDetail.diagnoseAction}</h4>
              <p className="text-[11px] text-gray-500">Scan leaf photo or describe symptoms</p>
            </div>
          </div>
          <span className="text-xs font-bold text-farm-600">→</span>
        </Link>

        <Link
          href="/fertilizer"
          className="p-4 rounded-2xl bg-white border border-farm-200 hover:border-farm-400 shadow-xs hover:shadow-md transition-all flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-100 rounded-xl text-amber-700">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900">{tCrop.cropDetail.fertilizerAction}</h4>
              <p className="text-[11px] text-gray-500">Calculate exact Urea, DAP & MOP bags</p>
            </div>
          </div>
          <span className="text-xs font-bold text-farm-600">→</span>
        </Link>
      </div>
    </div>
  );
}
