'use client';

import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Bug,
  Leaf,
  AlertOctagon,
  Clock,
  Sparkles,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useFarm } from '@/context/FarmContext';

export default function ProtectionPage() {
  const { language, t } = useLanguage();
  const { farm, activeCrop } = useFarm();

  const acres = farm.boundary.areaAcres;

  // IPM Trap Density calculations scaled to farm acreage
  const blueTraps = Math.round(40 * acres);
  const yellowTraps = Math.round(20 * acres);
  const pheromoneTraps = Math.round(8 * acres);
  const birdPerches = Math.round(15 * acres);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 border border-farm-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>{language === 'te' ? 'సమగ్ర సస్యరక్షణ (IPM)' : 'Integrated Pest Management'}</span>
          </div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            {t.protection.title}
          </h1>
          <p className="text-xs text-gray-600 mt-1 max-w-2xl">
            {t.protection.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/diagnostics"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-farm-600 hover:bg-farm-700 text-white text-xs font-bold shadow-xs transition-colors"
          >
            <span>{language === 'te' ? 'పంట డాక్టర్ దగ్గరకు వెళ్లండి →' : 'Go to Crop Doctor →'}</span>
          </Link>
        </div>
      </div>

      {/* Traps Density Calculator Banner */}
      <div>
        <h2 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
          <Bug className="w-5 h-5 text-farm-600" />
          <span>{t.protection.trapTitle}</span>
          <span className="text-xs font-normal text-gray-500">
            ({acres} {t.dashboard.acres} {language === 'te' ? 'తోటకు' : 'total acreage'})
          </span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Blue Sticky Traps */}
          <div className="bg-white rounded-3xl p-5 border-2 border-blue-400 shadow-sm">
            <div className="flex justify-between items-center text-xs font-black text-blue-700 uppercase">
              <span>Blue Sticky Traps</span>
              <span className="px-2 py-0.5 rounded bg-blue-100">40 / acre</span>
            </div>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-3xl font-black text-blue-900">{blueTraps}</span>
              <span className="text-xs font-bold text-gray-500">{language === 'te' ? 'అట్టలు' : 'Traps'}</span>
            </div>
            <p className="text-xs text-gray-600 mt-2">
              {language === 'te'
                ? 'నల్ల తామర పురుగులను (Black Thrips) ఆకర్షించి చంపుతాయి.'
                : 'Pivotal defense against Black Thrips in Chilli.'}
            </p>
          </div>

          {/* Yellow Sticky Traps */}
          <div className="bg-white rounded-3xl p-5 border-2 border-amber-400 shadow-sm">
            <div className="flex justify-between items-center text-xs font-black text-amber-700 uppercase">
              <span>Yellow Sticky Traps</span>
              <span className="px-2 py-0.5 rounded bg-amber-100">20 / acre</span>
            </div>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-3xl font-black text-amber-900">{yellowTraps}</span>
              <span className="text-xs font-bold text-gray-500">{language === 'te' ? 'అట్టలు' : 'Traps'}</span>
            </div>
            <p className="text-xs text-gray-600 mt-2">
              {language === 'te'
                ? 'తెల్లదోమలు, పచ్చదోమలు మరియు పేనుబంకలను నియంత్రిస్తాయి.'
                : 'Catches Whiteflies, Aphids & Jassids preventing virus transmission.'}
            </p>
          </div>

          {/* Pheromone Traps */}
          <div className="bg-white rounded-3xl p-5 border-2 border-rose-400 shadow-sm">
            <div className="flex justify-between items-center text-xs font-black text-rose-700 uppercase">
              <span>Pheromone Traps</span>
              <span className="px-2 py-0.5 rounded bg-rose-100">8 / acre</span>
            </div>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-3xl font-black text-rose-900">{pheromoneTraps}</span>
              <span className="text-xs font-bold text-gray-500">{language === 'te' ? 'బుట్టలు' : 'Traps'}</span>
            </div>
            <p className="text-xs text-gray-600 mt-2">
              {language === 'te'
                ? 'గులాబీ రంగు కాయ తొలుచు పురుగు మరియు శనగ పచ్చ పురుగు నియంత్రణ.'
                : 'Monitors & traps male moths of Pink Bollworm & Spodoptera.'}
            </p>
          </div>

          {/* Bird Perches */}
          <div className="bg-white rounded-3xl p-5 border-2 border-emerald-400 shadow-sm">
            <div className="flex justify-between items-center text-xs font-black text-emerald-700 uppercase">
              <span>Bird Perches (T-Poles)</span>
              <span className="px-2 py-0.5 rounded bg-emerald-100">15 / acre</span>
            </div>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-3xl font-black text-emerald-900">{birdPerches}</span>
              <span className="text-xs font-bold text-gray-500">{language === 'te' ? 'కర్రలు' : 'Poles'}</span>
            </div>
            <p className="text-xs text-gray-600 mt-2">
              {language === 'te'
                ? 'పక్షులు వాలడానికి వీలుగా టి-ఆకారపు కర్రలు నాటడం ద్వారా లద్దెపురుగులను తింటాయి.'
                : 'Invites predatory birds to naturally feast on caterpillars.'}
            </p>
          </div>
        </div>
      </div>

      {/* Biological & Bio-Pesticide Prescriptions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-farm-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
            <Leaf className="w-5 h-5 text-emerald-600" />
            <h3 className="text-sm font-bold text-gray-900">
              {t.protection.bioControls}
            </h3>
          </div>

          <div className="space-y-3 text-xs text-gray-700">
            <div className="p-3 rounded-xl bg-farm-50/70 border border-farm-200">
              <span className="font-bold text-farm-900 block mb-0.5">
                Trichoderma viride & Pseudomonas fluorescens
              </span>
              <p className="text-gray-600">
                {language === 'te'
                  ? 'ఎకరానికి 2.5 కిలోలు 200 కిలోల పశువుల ఎరువులో కలిపి మాగబెట్టి వేయడం ద్వారా వేరుకుళ్ళు మరియు ఎండు తెగుళ్లను అరికట్టవచ్చు.'
                  : 'Mix 2.5 kg/acre with 200 kg FYM for biological suppression of soil-borne wilt and root rot.'}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-farm-50/70 border border-farm-200">
              <span className="font-bold text-farm-900 block mb-0.5">
                Neem Oil 10,000 ppm (వేపనూనె)
              </span>
              <p className="text-gray-600">
                {language === 'te'
                  ? 'రసం పీల్చే పురుగుల గుడ్లను నాశనం చేయడానికి లీటరు నీటికి 2 మి.లీ వేపనూనెను ప్రతి 15 రోజులకు ఒకసారి పిచికారీ చేయండి.'
                  : 'Spray @ 2 ml/L every 15 days as an oviposition deterrent and insect growth regulator.'}
              </p>
            </div>
          </div>
        </div>

        {/* Safety Guidelines & Spraying Precautions */}
        <div className="bg-white rounded-3xl p-6 border border-farm-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
            <AlertOctagon className="w-5 h-5 text-rose-600" />
            <h3 className="text-sm font-bold text-gray-900">
              {t.protection.sprayingRules}
            </h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-950 font-medium flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{t.protection.wearMask}</span>
            </div>

            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 font-medium flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>{t.protection.sprayTiming}</span>
            </div>

            <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-800 font-medium flex items-start gap-2.5">
              <AlertOctagon className="w-4 h-4 text-gray-600 shrink-0 mt-0.5" />
              <span>
                {language === 'te'
                  ? 'మందుల డబ్బాలను ఉపయోగించిన తర్వాత నేలలో లోతుగా పాతిపెట్టాలి. చెరువులు, బావుల దగ్గర స్ప్రే పంపులను కడగరాదు.'
                  : 'Rinse empty pesticide containers thrice and puncture before deep burial. Never wash sprayers near water bodies.'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
