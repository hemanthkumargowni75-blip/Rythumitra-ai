'use client';

import React, { useState } from 'react';
import {
  FileText,
  Save,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Info,
  RefreshCw,
  Droplets,
  Sprout,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useFarm } from '@/context/FarmContext';
import { evaluateSoilHealth } from '@/lib/agronomyRules';

export default function SoilPage() {
  const { language, t } = useLanguage();
  const { soilTest, updateSoilTest, farm } = useFarm();

  const [values, setValues] = useState({
    pH: soilTest.pH,
    ec: soilTest.ec,
    organicCarbon: soilTest.organicCarbon,
    nitrogen: soilTest.nitrogen,
    phosphorus: soilTest.phosphorus,
    potassium: soilTest.potassium,
    zinc: soilTest.zinc,
  });

  const [saveSuccess, setSaveSuccess] = useState(false);

  // Dynamic real-time calculation
  const evaluation = evaluateSoilHealth(values);

  const handleSave = () => {
    updateSoilTest({
      ...soilTest,
      ...values,
      overallScore: evaluation.score,
      status: evaluation.status,
      recommendationsEn: evaluation.remediesEn,
      recommendationsTe: evaluation.remediesTe,
      testDate: new Date().toISOString().split('T')[0],
    });

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 border border-farm-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-2">
            <FileText className="w-4 h-4 text-amber-700" />
            <span>{language === 'te' ? 'డిజిటల్ సాయిల్ హెల్త్ కార్డు' : 'Digital Soil Health Card'}</span>
          </div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            {t.soil.title}
          </h1>
          <p className="text-xs text-gray-600 mt-1 max-w-2xl">
            {t.soil.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {saveSuccess && (
            <span className="text-xs font-bold text-emerald-700 flex items-center gap-1 animate-bounce">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              {language === 'te' ? 'విలువలు భద్రపరచబడ్డాయి!' : 'Saved successfully!'}
            </span>
          )}

          <button
            type="button"
            onClick={handleSave}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-farm-600 hover:bg-farm-700 text-white text-xs font-bold shadow-md transition-all"
          >
            <Save className="w-4 h-4" />
            <span>{t.soil.updateCard}</span>
          </button>
        </div>
      </div>

      {/* Soil Health Score Gauge & Overview Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Score Gauge */}
        <div className="bg-gradient-to-br from-farm-900 to-farm-950 text-white rounded-3xl p-6 shadow-md flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-farm-300 uppercase tracking-wider block mb-1">
              {t.soil.overallHealth}
            </span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-5xl font-black text-amber-300">
                {evaluation.score}
              </span>
              <span className="text-lg text-farm-300 font-bold">/ 100</span>
            </div>

            <div className="mt-3">
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                  evaluation.status === 'OPTIMAL'
                    ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-500'
                    : evaluation.status === 'MODERATE'
                    ? 'bg-amber-500/30 text-amber-300 border border-amber-500'
                    : 'bg-rose-500/30 text-rose-300 border border-rose-500'
                }`}
              >
                {evaluation.status} HEALTH INDEX
              </span>
            </div>

            <p className="text-xs text-farm-200 mt-4 leading-relaxed">
              {language === 'te'
                ? 'మీ నేలలో జింక్ మరియు నత్రజని మోతాదు తక్కువగా ఉంది. ఆఖరి దుక్కిలో జింక్ సల్ఫేట్ మరియు సేంద్రియ పశువుల ఎరువు వేయడం ద్వారా దిగుబడి 20% పెరుగుతుంది.'
                : 'Deficiencies detected in Zinc and Nitrogen. Applying Zinc Sulphate and organic FYM will enhance nutrient uptake and yield by ~20%.'}
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-farm-800 text-xs text-farm-300 flex justify-between">
            <span>{t.soil.testDate}:</span>
            <span className="font-bold text-white">{soilTest.testDate}</span>
          </div>
        </div>

        {/* Deficiencies & Corrective Amendments */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-farm-200 shadow-sm space-y-4">
          <div>
            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>{t.soil.deficiencyAlerts}</span>
            </h3>

            {evaluation.deficienciesEn.length === 0 ? (
              <p className="text-xs text-emerald-700 bg-emerald-50 p-3 rounded-xl border border-emerald-200">
                {language === 'te' ? 'అన్ని ప్రధాన పోషకాలు సరైన మోతాదులో ఉన్నాయి.' : 'All primary nutrients are within optimal range.'}
              </p>
            ) : (
              <div className="space-y-2">
                {(language === 'te' ? evaluation.deficienciesTe : evaluation.deficienciesEn).map((def, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-900 font-semibold flex items-center gap-2.5"
                  >
                    <span className="w-2 h-2 rounded-full bg-rose-600 shrink-0"></span>
                    <span>{def}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pt-2">
            <h3 className="text-sm font-bold text-farm-900 flex items-center gap-2 mb-2">
              <Sprout className="w-4 h-4 text-farm-600" />
              <span>{t.soil.correctiveActions}</span>
            </h3>

            <div className="space-y-2">
              {(language === 'te' ? evaluation.remediesTe : evaluation.remediesEn).map((rem, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-farm-50 border border-farm-200 text-xs text-farm-900 font-medium flex items-start gap-2.5"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{rem}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Soil Test Parameter Inputs & Sliders */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-farm-200 shadow-sm">
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-gray-100">
          <div>
            <h3 className="text-base font-bold text-gray-900">
              {t.soil.parameters}
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              {language === 'te'
                ? 'మీ సాయిల్ హెల్త్ కార్డ్ నివేదికలోని విలువలను సర్దుబాటు చేయండి. తక్షణమే దిద్దుబాటు సిఫార్సులు మారతాయి.'
                : 'Adjust nutrient values from your lab test report. Remedial actions adapt immediately.'}
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              setValues({
                pH: 7.6,
                ec: 0.42,
                organicCarbon: 0.48,
                nitrogen: 185,
                phosphorus: 24,
                potassium: 340,
                zinc: 0.52,
              })
            }
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-300 hover:bg-gray-50 text-xs text-gray-700 font-semibold"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>{language === 'te' ? 'రీసెట్' : 'Reset Values'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* pH */}
          <div className="p-4 rounded-2xl bg-gray-50/70 border border-gray-200">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold text-gray-800">{t.soil.phLevel}</label>
              <span className="text-sm font-black text-farm-800">{values.pH}</span>
            </div>
            <input
              type="range"
              min="4.5"
              max="9.5"
              step="0.1"
              value={values.pH}
              onChange={(e) => setValues({ ...values, pH: parseFloat(e.target.value) })}
              className="w-full accent-farm-600"
            />
            <div className="flex justify-between text-[10px] text-gray-500 mt-1 font-medium">
              <span>Acidic (&lt;6.5)</span>
              <span>Ideal (6.5 - 7.5)</span>
              <span>Alkaline (&gt;7.8)</span>
            </div>
          </div>

          {/* Organic Carbon */}
          <div className="p-4 rounded-2xl bg-gray-50/70 border border-gray-200">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold text-gray-800">{t.soil.organicCarbon}</label>
              <span className="text-sm font-black text-farm-800">{values.organicCarbon}%</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="1.5"
              step="0.05"
              value={values.organicCarbon}
              onChange={(e) => setValues({ ...values, organicCarbon: parseFloat(e.target.value) })}
              className="w-full accent-farm-600"
            />
            <div className="flex justify-between text-[10px] text-gray-500 mt-1 font-medium">
              <span>Low (&lt;0.5%)</span>
              <span>Medium (0.5-0.75%)</span>
              <span>High (&gt;0.75%)</span>
            </div>
          </div>

          {/* Nitrogen */}
          <div className="p-4 rounded-2xl bg-gray-50/70 border border-gray-200">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold text-gray-800">{t.soil.nitrogen}</label>
              <span className="text-sm font-black text-farm-800">{values.nitrogen} kg/ha</span>
            </div>
            <input
              type="range"
              min="100"
              max="600"
              step="10"
              value={values.nitrogen}
              onChange={(e) => setValues({ ...values, nitrogen: parseInt(e.target.value) })}
              className="w-full accent-farm-600"
            />
            <div className="flex justify-between text-[10px] text-gray-500 mt-1 font-medium">
              <span>Low (&lt;280)</span>
              <span>Medium (280-560)</span>
              <span>High (&gt;560)</span>
            </div>
          </div>

          {/* Phosphorus */}
          <div className="p-4 rounded-2xl bg-gray-50/70 border border-gray-200">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold text-gray-800">{t.soil.phosphorus}</label>
              <span className="text-sm font-black text-farm-800">{values.phosphorus} kg/ha</span>
            </div>
            <input
              type="range"
              min="5"
              max="80"
              step="1"
              value={values.phosphorus}
              onChange={(e) => setValues({ ...values, phosphorus: parseInt(e.target.value) })}
              className="w-full accent-farm-600"
            />
            <div className="flex justify-between text-[10px] text-gray-500 mt-1 font-medium">
              <span>Low (&lt;25)</span>
              <span>Medium (25-55)</span>
              <span>High (&gt;55)</span>
            </div>
          </div>

          {/* Potassium */}
          <div className="p-4 rounded-2xl bg-gray-50/70 border border-gray-200">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold text-gray-800">{t.soil.potassium}</label>
              <span className="text-sm font-black text-farm-800">{values.potassium} kg/ha</span>
            </div>
            <input
              type="range"
              min="100"
              max="600"
              step="10"
              value={values.potassium}
              onChange={(e) => setValues({ ...values, potassium: parseInt(e.target.value) })}
              className="w-full accent-farm-600"
            />
            <div className="flex justify-between text-[10px] text-gray-500 mt-1 font-medium">
              <span>Low (&lt;140)</span>
              <span>Medium (140-280)</span>
              <span>High (&gt;280)</span>
            </div>
          </div>

          {/* Zinc */}
          <div className="p-4 rounded-2xl bg-gray-50/70 border border-gray-200">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold text-gray-800">{t.soil.zinc}</label>
              <span className="text-sm font-black text-farm-800">{values.zinc} ppm</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="2.0"
              step="0.05"
              value={values.zinc}
              onChange={(e) => setValues({ ...values, zinc: parseFloat(e.target.value) })}
              className="w-full accent-farm-600"
            />
            <div className="flex justify-between text-[10px] text-gray-500 mt-1 font-medium">
              <span>Deficient (&lt;0.6)</span>
              <span>Adequate (&gt;0.6)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
