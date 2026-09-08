'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Droplets,
  Clock,
  CheckCircle2,
  Calendar,
  AlertCircle,
  Activity,
  Gauge,
  Info,
  Waves,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useFarm } from '@/context/FarmContext';
import { calculateIrrigationRequirement } from '@/lib/agronomyRules';

export default function IrrigationPage() {
  const { language, t } = useLanguage();
  const { farm, activeCrop, weatherForecast } = useFarm();

  const [loggedSuccess, setLoggedSuccess] = useState(false);
  const [waterLoggedLiters, setWaterLoggedLiters] = useState('18000');

  const todayRain = weatherForecast[0].rainfallMm;
  const metrics = calculateIrrigationRequirement(
    activeCrop.currentStage,
    farm.boundary.areaAcres,
    farm.soilType,
    todayRain
  );

  const handleLogIrrigation = (e: React.FormEvent) => {
    e.preventDefault();
    setLoggedSuccess(true);
    setTimeout(() => setLoggedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 border border-farm-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold mb-2">
            <Droplets className="w-4 h-4 text-blue-600" />
            <span>{language === 'te' ? 'శాస్త్రీయ నీటి యాజమాన్యం' : 'Smart Water Balance'}</span>
          </div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            {t.irrigation.title}
          </h1>
          <p className="text-xs text-gray-600 mt-1 max-w-2xl">
            {t.irrigation.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/weather"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-900 text-xs font-bold transition-colors shadow-xs"
          >
            <span>{language === 'te' ? 'వర్ష సూచన చూడండి →' : 'View Rain Forecast →'}</span>
          </Link>
        </div>
      </div>

      {/* Main KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Soil Moisture */}
        <div className="bg-white rounded-3xl p-5 border border-farm-200 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-bold uppercase">{t.irrigation.soilMoisture}</span>
            <Gauge className="w-5 h-5 text-blue-500" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-black text-gray-900">
              {metrics.moisturePercent}%
            </span>
          </div>
          <span className="text-xs font-bold text-emerald-700 block mt-1">
            {language === 'te' ? 'తగినంత తేమ ఉంది (Optimal)' : 'Optimal Root Moisture'}
          </span>
        </div>

        {/* Daily Need */}
        <div className="bg-white rounded-3xl p-5 border border-farm-200 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-bold uppercase">{t.irrigation.cropWaterNeed}</span>
            <Waves className="w-5 h-5 text-sky-500" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-black text-sky-800">
              {metrics.dailyNeedMm}
            </span>
            <span className="text-xs text-gray-500 font-bold">mm/day</span>
          </div>
          <span className="text-xs text-gray-500 block mt-1">
            {activeCrop.cropNameTe} ({activeCrop.currentStage})
          </span>
        </div>

        {/* Recommended Drip Run Time */}
        <div className="bg-white rounded-3xl p-5 border border-farm-200 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-bold uppercase">{t.irrigation.dripSystem}</span>
            <Clock className="w-5 h-5 text-amber-500" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-black text-amber-800">
              {metrics.dripRunHours}
            </span>
            <span className="text-xs text-gray-500 font-bold">Hours</span>
          </div>
          <span className="text-xs text-amber-700 font-bold block mt-1">
            {language === 'te' ? 'ప్రతి 2 రోజులకు ఒకసారి' : 'Every 2 Days'}
          </span>
        </div>

        {/* Water Saved Estimate */}
        <div className="bg-gradient-to-br from-blue-900 to-indigo-950 text-white rounded-3xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-blue-200 uppercase tracking-wider block">
              {t.irrigation.waterSavedEstimate}
            </span>
            <span className="text-3xl font-black text-emerald-300 mt-1 block">
              35 - 40%
            </span>
            <p className="text-[11px] text-blue-200 mt-1">
              {language === 'te'
                ? 'కాలువ పారకం కంటే డ్రిప్ ద్వారా ఆదా అయిన నీరు'
                : 'Water conserved vs conventional flood irrigation'}
            </p>
          </div>
        </div>
      </div>

      {/* Log Today's Irrigation & Next Schedule Alert */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Next Scheduled Watering Card */}
        <div className="bg-white rounded-3xl p-6 border border-farm-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
            <Calendar className="w-5 h-5 text-blue-600" />
            <h3 className="text-sm font-bold text-gray-900">
              {t.irrigation.nextIrrigation}
            </h3>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 flex items-start gap-3">
            <Clock className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-blue-950">
                {language === 'te' ? 'తదుపరి తడి: రేపు సాయంత్రం 04:00 గంటలకు' : 'Next Irrigation: Tomorrow 04:00 PM'}
              </h4>
              <p className="text-xs text-blue-800 mt-1 leading-relaxed">
                {language === 'te'
                  ? `మీ ${farm.boundary.areaAcres} ఎకరాల తోటలోని డ్రిప్ మోటారును ${metrics.dripRunHours} గంటల పాటు నడపండి. బుధవారం వర్షం వచ్చే అవకాశం ఉన్నందున నేల సంతృప్త స్థాయిని మించకుండా చూసుకోండి.`
                  : `Run drip irrigation for ${metrics.dripRunHours} hours across your ${farm.boundary.areaAcres} acres. Rain is expected Wednesday, so avoid over-saturating root zones.`}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              {language === 'te'
                ? 'పూత దశలో మిర్చి పైరుకు నీరు ఎక్కువైనా లేదా విపరీతమైన బెట్ట తగిలినా పూత రాలిపోతుంది. తేమను నిలకడగా ఉంచండి.'
                : 'During flowering, both water stress and excess water cause flower drop. Maintain steady root moisture.'}
            </span>
          </div>
        </div>

        {/* Log Irrigation Volume Form */}
        <div className="bg-white rounded-3xl p-6 border border-farm-200 shadow-sm">
          <div className="flex items-center gap-2 pb-3 border-b border-gray-100 mb-4">
            <Droplets className="w-5 h-5 text-farm-600" />
            <h3 className="text-sm font-bold text-gray-900">
              {t.irrigation.logIrrigation}
            </h3>
          </div>

          <form onSubmit={handleLogIrrigation} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                {language === 'te' ? 'అందించిన నీటి పరిమాణం (లీటర్లు)' : 'Volume of Water Applied (Liters)'}
              </label>
              <input
                type="number"
                required
                value={waterLoggedLiters}
                onChange={(e) => setWaterLoggedLiters(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm font-semibold focus:ring-2 focus:ring-farm-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  {language === 'te' ? 'నీటి పద్ధతి' : 'Irrigation Method'}
                </label>
                <select className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs font-semibold">
                  <option>Drip System (బిందు సేద్యం)</option>
                  <option>Borewell Flood (బోరు బావి)</option>
                  <option>Canal (కాలువ నీరు)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  {language === 'te' ? 'నడిపిన సమయం' : 'Duration (Hours)'}
                </label>
                <input
                  type="text"
                  defaultValue="2.5 Hours"
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs font-semibold"
                />
              </div>
            </div>

            {loggedSuccess && (
              <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>
                  {language === 'te' ? 'నీటి తడి విజయవంతంగా నమోదయింది!' : 'Irrigation logged successfully!'}
                </span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{t.irrigation.logIrrigation}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
