'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Calculator,
  CheckCircle2,
  PackageCheck,
  Calendar,
  Layers,
  Sparkles,
  ArrowRight,
  Info,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useFarm } from '@/context/FarmContext';
import { calculateFertilizerSchedule } from '@/lib/agronomyRules';

export default function FertilizerPage() {
  const { language, t } = useLanguage();
  const { farm, activeCrop } = useFarm();

  const [selectedCrop, setSelectedCrop] = useState(activeCrop.cropId || 'chilli');
  const [acres, setAcres] = useState<number>(farm.boundary.areaAcres || 3.75);

  const { stages, totalBags } = calculateFertilizerSchedule(selectedCrop, acres);
  const [stageStatuses, setStageStatuses] = useState<{ [key: number]: boolean }>({
    0: true, // Basal applied
    1: true, // Vegetative applied
    2: false, // Flowering pending
    3: false, // Foliar pending
  });

  const toggleStage = (idx: number) => {
    setStageStatuses({ ...stageStatuses, [idx]: !stageStatuses[idx] });
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 border border-farm-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-2">
            <Calculator className="w-4 h-4 text-amber-700" />
            <span>{language === 'te' ? 'ఎరువుల ఖచ్చితమైన లెక్కింపు యంత్రం' : 'Precision Nutrient Calculator'}</span>
          </div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            {t.fertilizer.title}
          </h1>
          <p className="text-xs text-gray-600 mt-1 max-w-2xl">
            {t.fertilizer.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/map"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-farm-50 hover:bg-farm-100 border border-farm-300 text-farm-800 text-xs font-bold transition-colors shadow-xs"
          >
            <span>
              {language === 'te'
                ? `పొలం విస్తీర్ణం మార్చండి (${farm.boundary.areaAcres} ఎకరాలు) →`
                : `Edit Boundary (${farm.boundary.areaAcres} Acres) →`}
            </span>
          </Link>
        </div>
      </div>

      {/* Dynamic Controls Bar */}
      <div className="bg-white rounded-2xl p-5 border border-farm-200 shadow-sm grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">
            {t.fertilizer.cropSelected}
          </label>
          <select
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm font-semibold focus:ring-2 focus:ring-farm-500"
          >
            <option value="chilli">{language === 'te' ? 'తేజా మిర్చి (Teja Chilli)' : 'Teja Chilli'}</option>
            <option value="cotton">{language === 'te' ? 'పత్తి (Bt Cotton)' : 'Bt Cotton'}</option>
            <option value="paddy">{language === 'te' ? 'వరి (Paddy / Rice)' : 'Paddy / Rice'}</option>
            <option value="maize">{language === 'te' ? 'మొక్కజొన్న (Maize)' : 'Maize'}</option>
          </select>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-xs font-bold text-gray-700">
              {t.fertilizer.farmAcreage}
            </label>
            <span className="text-sm font-black text-farm-800">
              {acres} {t.dashboard.acres}
            </span>
          </div>
          <input
            type="range"
            min="0.5"
            max="15"
            step="0.25"
            value={acres}
            onChange={(e) => setAcres(parseFloat(e.target.value))}
            className="w-full accent-farm-600"
          />
          <div className="flex justify-between text-[10px] text-gray-500 font-medium">
            <span>0.5 Acre</span>
            <span>Current: {acres} Acres</span>
            <span>15 Acres</span>
          </div>
        </div>
      </div>

      {/* Total Commercial Bags Summary Cards */}
      <div>
        <h2 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
          <PackageCheck className="w-5 h-5 text-farm-600" />
          <span>{t.fertilizer.commercialBagsNeeded}</span>
          <span className="text-xs font-normal text-gray-500">
            ({acres} {t.dashboard.acres} {language === 'te' ? 'తోటకు' : 'total'})
          </span>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {/* Urea */}
          <div className="p-4 rounded-2xl bg-white border border-farm-200 shadow-xs text-center">
            <span className="text-xs text-gray-500 font-bold block">{t.fertilizer.urea}</span>
            <div className="mt-1">
              <span className="text-3xl font-black text-farm-800">
                {totalBags.urea45kgBags}
              </span>
              <span className="text-xs font-bold text-gray-500 ml-1">
                {language === 'te' ? 'బస్తాలు' : 'Bags'}
              </span>
            </div>
          </div>

          {/* DAP */}
          <div className="p-4 rounded-2xl bg-white border border-farm-200 shadow-xs text-center">
            <span className="text-xs text-gray-500 font-bold block">{t.fertilizer.dap}</span>
            <div className="mt-1">
              <span className="text-3xl font-black text-amber-800">
                {totalBags.dap50kgBags}
              </span>
              <span className="text-xs font-bold text-gray-500 ml-1">
                {language === 'te' ? 'బస్తాలు' : 'Bags'}
              </span>
            </div>
          </div>

          {/* MOP Potash */}
          <div className="p-4 rounded-2xl bg-white border border-farm-200 shadow-xs text-center">
            <span className="text-xs text-gray-500 font-bold block">{t.fertilizer.mop}</span>
            <div className="mt-1">
              <span className="text-3xl font-black text-rose-800">
                {totalBags.mop50kgBags}
              </span>
              <span className="text-xs font-bold text-gray-500 ml-1">
                {language === 'te' ? 'బస్తాలు' : 'Bags'}
              </span>
            </div>
          </div>

          {/* Zinc Sulphate */}
          <div className="p-4 rounded-2xl bg-white border border-farm-200 shadow-xs text-center">
            <span className="text-xs text-gray-500 font-bold block">{t.fertilizer.zinc}</span>
            <div className="mt-1">
              <span className="text-3xl font-black text-sky-800">
                {totalBags.zincSulphateKg}
              </span>
              <span className="text-xs font-bold text-gray-500 ml-1">kg</span>
            </div>
          </div>

          {/* Nano Urea */}
          <div className="p-4 rounded-2xl bg-white border border-farm-200 shadow-xs text-center col-span-2 sm:col-span-1">
            <span className="text-xs text-gray-500 font-bold block">{t.fertilizer.nanoUrea}</span>
            <div className="mt-1">
              <span className="text-3xl font-black text-emerald-800">
                {totalBags.nanoUreaBottles}
              </span>
              <span className="text-xs font-bold text-gray-500 ml-1">
                {language === 'te' ? 'సీసాలు' : 'Bottles'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stage-Wise Nutrient Application Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-farm-200 shadow-sm">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
          <div>
            <h3 className="text-base font-bold text-gray-900">
              {t.fertilizer.stageWiseSchedule}
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              {language === 'te'
                ? 'ఎరువులను ఎప్పుడు, ఎలా మరియు ఎంత మోతాదులో అందించాలో స్పష్టమైన మార్గదర్శిని.'
                : 'Follow application timing to maximize nutrient use efficiency and root absorption.'}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {stages.map((stage, idx) => {
            const isApplied = stageStatuses[idx];

            return (
              <div
                key={idx}
                className={`p-5 rounded-2xl border transition-all ${
                  isApplied
                    ? 'bg-emerald-50/50 border-emerald-200'
                    : 'bg-white border-gray-200 shadow-xs'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black ${
                        isApplied
                          ? 'bg-emerald-600 text-white'
                          : 'bg-amber-500 text-white'
                      }`}
                    >
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900">
                        {language === 'te' ? stage.stageNameTe : stage.stageNameEn}
                      </h4>
                      <span className="text-[11px] font-semibold text-gray-500">
                        {stage.daysAfterSowing}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleStage(idx)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs ${
                      isApplied
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>
                      {isApplied ? t.fertilizer.applied : t.fertilizer.markApplied}
                    </span>
                  </button>
                </div>

                {/* Specific Nutrient Amounts for this stage */}
                <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  {stage.ureaKg > 0 && (
                    <div className="p-2 rounded-lg bg-white border border-gray-200">
                      <span className="text-gray-500 block">Urea:</span>
                      <span className="font-black text-gray-900">{stage.ureaKg} kg</span>
                    </div>
                  )}
                  {stage.dapKg > 0 && (
                    <div className="p-2 rounded-lg bg-white border border-gray-200">
                      <span className="text-gray-500 block">DAP:</span>
                      <span className="font-black text-gray-900">{stage.dapKg} kg</span>
                    </div>
                  )}
                  {stage.mopKg > 0 && (
                    <div className="p-2 rounded-lg bg-white border border-gray-200">
                      <span className="text-gray-500 block">MOP (Potash):</span>
                      <span className="font-black text-gray-900">{stage.mopKg} kg</span>
                    </div>
                  )}
                  {stage.zincSulphateKg > 0 && (
                    <div className="p-2 rounded-lg bg-white border border-gray-200">
                      <span className="text-gray-500 block">Zinc Sulphate:</span>
                      <span className="font-black text-gray-900">{stage.zincSulphateKg} kg</span>
                    </div>
                  )}
                  {stage.nanoUreaBottles > 0 && (
                    <div className="p-2 rounded-lg bg-white border border-gray-200">
                      <span className="text-gray-500 block">Nano Urea:</span>
                      <span className="font-black text-emerald-700">{stage.nanoUreaBottles} Bottles</span>
                    </div>
                  )}
                </div>

                <p className="mt-3 text-xs text-gray-600 bg-gray-50 p-2.5 rounded-xl border border-gray-100 flex items-center gap-2">
                  <Info className="w-4 h-4 text-farm-600 shrink-0" />
                  <span>
                    {language === 'te'
                      ? stage.applicationMethodTe
                      : stage.applicationMethodEn}
                  </span>
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
