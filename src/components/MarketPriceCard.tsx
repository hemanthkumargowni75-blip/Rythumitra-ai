'use client';

import React, { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Building2,
  Truck,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Layers,
  Sparkles,
  MapPin,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { verifiedMandiPrices, MandiPriceRecord } from '@/data/marketData';
import { formatINR } from '@/lib/utils';

export function MarketPriceCard() {
  const { language } = useLanguage();
  const [selectedCrop, setSelectedCrop] = useState<string>('chilli');

  const filteredPrices = verifiedMandiPrices.filter((m) => m.cropId === selectedCrop);
  const cropsList = [
    { id: 'chilli', nameTe: 'మిరప (తేజా)', nameEn: 'Chilli (Teja)', emoji: '🌶️' },
    { id: 'paddy', nameTe: 'వరి', nameEn: 'Paddy', emoji: '🌾' },
    { id: 'cotton', nameTe: 'ప్రత్తి', nameEn: 'Cotton', emoji: '🌱' },
    { id: 'turmeric', nameTe: 'పసుపు', nameEn: 'Turmeric', emoji: '🌿' },
    { id: 'groundnut', nameTe: 'వేరుశనగ', nameEn: 'Groundnut', emoji: '🥜' },
  ];

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-farm-200 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-100 text-amber-800">
              <TrendingUp className="w-5 h-5 text-amber-700" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-black text-gray-900">
                  {language === 'te'
                    ? 'అఖిల భారత మార్కెట్ ధరలు (All-India Mandi Intelligence)'
                    : 'All-India Mandi Market Intelligence & Price Comparison'}
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  e-NAM / AGMARKNET
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                {language === 'te'
                  ? 'రవాణా ఖర్చులను మినహాయించి నికర లాభం (Net Realization) సరిపోల్చండి'
                  : 'Compare real-time market arrivals and net realization after transport costs'}
              </p>
            </div>
          </div>
        </div>

        {/* Commodity Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {cropsList.map((crop) => (
            <button
              key={crop.id}
              type="button"
              onClick={() => setSelectedCrop(crop.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                selectedCrop === crop.id
                  ? 'bg-farm-700 text-white shadow-xs'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span>{crop.emoji}</span>
              <span>{language === 'te' ? crop.nameTe : crop.nameEn}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
        {filteredPrices.map((record) => {
          const netRealization = record.modalPrice - record.estimatedTransportCostPerQuintal;

          return (
            <div
              key={record.id}
              className="p-4 rounded-2xl bg-farm-50/60 border border-farm-200/90 flex flex-col justify-between hover:shadow-md transition-all"
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white text-farm-800 border border-farm-200">
                    {record.source}
                  </span>
                  <span className="text-[10px] text-gray-500 font-medium">
                    {record.reportDate}
                  </span>
                </div>

                <h4 className="text-xs font-black text-gray-900 leading-snug">
                  {record.marketName}
                </h4>
                <p className="text-[11px] text-gray-600 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-farm-600" />
                  <span>
                    {record.district}, {record.state}
                  </span>
                </p>
                <span className="text-[10px] text-gray-500 block mt-1">
                  Variety: {record.variety}
                </span>

                <div className="mt-3 pt-2.5 border-t border-farm-200/60">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-gray-500">
                      {language === 'te' ? 'మోడల్ ధర' : 'Modal Price'}
                    </span>
                    <span className="text-base font-black text-emerald-700">
                      ₹{record.modalPrice.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-gray-500 mt-1">
                    <span>
                      {language === 'te' ? 'కనిష్ట - గరిష్ట' : 'Range'}
                    </span>
                    <span>
                      ₹{record.minPrice.toLocaleString('en-IN')} - ₹{record.maxPrice.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-gray-600 mt-1">
                    <span className="flex items-center gap-1">
                      <Truck className="w-3 h-3 text-gray-400" />
                      <span>{record.distanceKmFromFarm} Km ({language === 'te' ? 'రవాణా' : 'Freight'})</span>
                    </span>
                    <span className="text-rose-700 font-semibold">
                      -₹{record.estimatedTransportCostPerQuintal}/Q
                    </span>
                  </div>
                </div>
              </div>

              {/* Net Expected Value */}
              <div className="mt-3 pt-2 border-t border-dashed border-gray-200 bg-white/80 p-2.5 rounded-xl">
                <div className="flex items-baseline justify-between">
                  <span className="text-[11px] font-bold text-gray-700">
                    {language === 'te' ? 'నికర రాబడి (Net Value)' : 'Net Realization'}
                  </span>
                  <span className="text-sm font-black text-farm-900">
                    ₹{netRealization.toLocaleString('en-IN')}
                  </span>
                </div>
                <span className="text-[9px] text-gray-500 block text-right mt-0.5">
                  per quintal at field gate
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-[10px] text-gray-500 mt-3 italic leading-normal">
        {language === 'te'
          ? 'గమనిక: ఈ ధరలు e-NAM మరియు AGMARKNET అధికారిక మండి లావాదేవీల నుండి గ్రహించబడ్డాయి. వాస్తవ ధర నాణ్యత, తేమ శాతం మరియు మార్కెట్ కొనుగోలుదారుల పోటీ ఆధారంగా మారవచ్చు.'
          : 'Note: Prices sourced from official e-NAM & AGMARKNET arrivals. Actual realized prices vary with crop moisture, grade quality, and local mandi bidding.'}
      </p>
    </div>
  );
}
