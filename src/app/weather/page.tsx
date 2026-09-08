'use client';

import React from 'react';
import {
  CloudSun,
  CloudRain,
  Sun,
  Wind,
  Droplets,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Volume2,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useFarm } from '@/context/FarmContext';
import { VoiceAssistant } from '@/components/VoiceAssistant';

export default function WeatherPage() {
  const { language, t } = useLanguage();
  const { weatherForecast, farm, farmer } = useFarm();

  const speechSummary =
    language === 'te'
      ? `వ్యవసాయ వాతావరణ సమాచారం: ఈరోజు, రేపు వాతావరణం పొడిగా ఉంది, మందుల పిచికారీకి అనుకూలం. బుధవారం 38 మిల్లీమీటర్ల భారీ వర్షం పడే అవకాశం ఉంది కాబట్టి ఎరువులు మరియు మందులు చల్లడం నిలిపివేయండి.`
      : `Agro-weather advisory for ${farm.name}: Today and tomorrow provide excellent spraying windows. Heavy rain of 38 millimeters is expected on Wednesday. Postpone broadcasting fertilizers and chemical sprays on Wednesday.`;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 border border-farm-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold mb-2">
            <CloudSun className="w-4 h-4 text-sky-600" />
            <span>{language === 'te' ? 'గ్రామీణ సూక్ష్మ వాతావరణ నివేదిక' : 'Micro-Climate Advisory'}</span>
          </div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            {t.weather.title}
          </h1>
          <p className="text-xs text-gray-600 mt-1 max-w-2xl">
            {farm.name} ({farmer.village}, {farmer.mandal} {language === 'te' ? 'మండలం' : 'Mandal'}) — {t.weather.subtitle}
          </p>
        </div>

        <VoiceAssistant
          textToSpeak={speechSummary}
          label={language === 'te' ? 'వాతావరణ సలహా వినండి' : 'Listen to Forecast'}
          className="bg-sky-600 hover:bg-sky-700 text-white font-bold px-4 py-2 text-xs shadow-md border-0"
        />
      </div>

      {/* Critical Weather Alert Card */}
      <div className="bg-rose-50 border-l-4 border-rose-600 rounded-2xl p-5 shadow-sm flex items-start gap-4">
        <div className="p-2.5 bg-rose-100 rounded-xl text-rose-700 shrink-0 mt-0.5">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-rose-900 bg-rose-200 px-2 py-0.5 rounded">
            {t.weather.extremeWeatherWarning}
          </span>
          <h3 className="text-sm font-bold text-rose-950 mt-1.5">
            {language === 'te'
              ? 'బుధవారం (Sep 09) భారీ వర్ష సూచన (38 mm) — తీవ్ర సలహా'
              : 'Heavy Rainfall Warning on Wednesday (Sep 09, 38 mm) — Operational Directive'}
          </h3>
          <p className="text-xs text-rose-800 mt-1 leading-relaxed">
            {language === 'te'
              ? 'బంగాళాఖాతంలో అల్పపీడనం కారణంగా బుధవారం భారీ వర్షాలు కురిసే అవకాశం ఉంది. పంట చేలలో మురుగు నీరు నిల్వ ఉండకుండా నీటి పారుదల కాలువలను శుభ్రం చేయండి. యూరియా ఎరువులు చల్లడం మరియు క్రిమిసంహారక మందుల పిచికారీని బుధవారం పూర్తిగా నిలిపివేయండి.'
              : 'Due to low-pressure development in the Bay of Bengal, heavy showers are expected Wednesday. Ensure excess drainage ditches are unclogged. Withhold all broadcast fertilizer applications and foliar pesticide sprays.'}
          </p>
        </div>
      </div>

      {/* 7-Day Forecast Grid */}
      <div>
        <h2 className="text-base font-bold text-gray-900 mb-3">
          {t.weather.forecast7Days}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {weatherForecast.map((day, idx) => {
            const isToday = idx === 0;
            const isHeavyRain = day.rainfallMm > 20;

            return (
              <div
                key={day.date}
                className={`rounded-3xl p-5 border transition-all flex flex-col justify-between ${
                  isHeavyRain
                    ? 'bg-rose-50/70 border-rose-300 shadow-md ring-2 ring-rose-100'
                    : isToday
                    ? 'bg-white border-farm-400 shadow-md ring-2 ring-farm-100'
                    : 'bg-white border-farm-200 shadow-xs hover:shadow-md'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-black text-gray-900">
                        {language === 'te' ? day.dayNameTe : day.dayNameEn}
                      </h4>
                      <p className="text-[11px] text-gray-500">{day.date}</p>
                    </div>

                    <div className="p-2 rounded-xl bg-sky-50 text-sky-600">
                      {day.rainfallMm > 10 ? (
                        <CloudRain className="w-6 h-6 text-blue-600" />
                      ) : day.condition === 'SUNNY' ? (
                        <Sun className="w-6 h-6 text-amber-500" />
                      ) : (
                        <CloudSun className="w-6 h-6 text-sky-600" />
                      )}
                    </div>
                  </div>

                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-2xl font-black text-gray-900">
                      {day.tempMax}°C
                    </span>
                    <span className="text-xs font-semibold text-gray-500">
                      / {day.tempMin}°C
                    </span>
                    <span className="text-xs font-bold text-sky-700 ml-auto">
                      {language === 'te' ? day.conditionTe : day.condition}
                    </span>
                  </div>

                  {/* Micro-metrics */}
                  <div className="mt-3 grid grid-cols-3 gap-1.5 p-2.5 rounded-xl bg-gray-50 text-[10px] text-gray-600">
                    <div>
                      <span className="block text-gray-400">Rain:</span>
                      <span className="font-bold text-gray-900">{day.rainfallMm} mm</span>
                    </div>
                    <div>
                      <span className="block text-gray-400">Humidity:</span>
                      <span className="font-bold text-gray-900">{day.humidity}%</span>
                    </div>
                    <div>
                      <span className="block text-gray-400">Wind:</span>
                      <span className="font-bold text-gray-900">{day.windSpeedKmh} km/h</span>
                    </div>
                  </div>

                  {/* Spray Advisory Badge */}
                  <div className="mt-3 pt-3 border-t border-gray-100 space-y-2">
                    <div
                      className={`p-2.5 rounded-xl text-xs font-bold flex items-center gap-2 ${
                        day.sprayAdvisory.canSpray
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-rose-100 text-rose-900 border border-rose-200'
                      }`}
                    >
                      {day.sprayAdvisory.canSpray ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                      )}
                      <span>
                        {day.sprayAdvisory.canSpray
                          ? language === 'te'
                            ? 'మందుల పిచికారీకి అనుకూలం'
                            : 'Safe to Spray'
                          : language === 'te'
                          ? 'పిచికారీ చేయరాదు'
                          : 'Do Not Spray'}
                      </span>
                    </div>

                    <p className="text-[11px] text-gray-600 leading-snug">
                      {language === 'te'
                        ? day.sprayAdvisory.reasonTe
                        : day.sprayAdvisory.reasonEn}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
