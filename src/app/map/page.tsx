'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import {
  MapPin,
  Layers,
  ArrowRight,
  ShieldCheck,
  Calculator,
  Compass,
  FileCheck2,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useFarm } from '@/context/FarmContext';

// Dynamic import of Leaflet component with SSR disabled
const FarmBoundaryMap = dynamic(
  () => import('@/components/FarmBoundaryMap').then((mod) => mod.FarmBoundaryMap),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[450px] bg-slate-900 rounded-2xl flex flex-col items-center justify-center text-farm-300">
        <div className="w-10 h-10 border-4 border-farm-500 border-t-transparent rounded-full animate-spin mb-3"></div>
        <p className="text-xs font-semibold tracking-wide">
          Loading High-Resolution Satellite Tiles...
        </p>
      </div>
    ),
  }
);

export default function MapPage() {
  const { language, t } = useLanguage();
  const { farm, farmer } = useFarm();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-3xl p-6 border border-farm-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-2">
            <MapPin className="w-4 h-4 text-emerald-600" />
            <span>{language === 'te' ? 'భౌగోళిక సరిహద్దు & శాటిలైట్ మ్యాపింగ్' : 'GPS Satellite Geofencing'}</span>
          </div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            {t.map.title}
          </h1>
          <p className="text-xs text-gray-600 mt-1 max-w-2xl">
            {t.map.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/fertilizer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-farm-600 hover:bg-farm-700 text-white text-xs font-bold shadow-xs transition-colors"
          >
            <Calculator className="w-4 h-4" />
            <span>
              {language === 'te'
                ? `ఈ ${farm.boundary.areaAcres} ఎకరాలకు ఎరువులు లెక్కించండి →`
                : `Calculate Fertilizer for ${farm.boundary.areaAcres} Acres →`}
            </span>
          </Link>
        </div>
      </div>

      {/* Main Interactive Leaflet Map Component */}
      <FarmBoundaryMap />

      {/* Boundary Details & Vertices Information Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Corner Coordinates Table */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-farm-200 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <Compass className="w-4 h-4 text-farm-600" />
              {language === 'te' ? 'పొలం మూల బిందువుల వివరాలు (GPS Coordinates)' : 'Boundary Polygon Coordinates (GeoJSON)'}
            </h3>
            <span className="text-xs text-gray-500 font-medium">
              {farm.boundary.coordinates.length} {language === 'te' ? 'బిందువులు' : 'points'}
            </span>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="bg-farm-50 text-farm-900 border-b border-farm-200">
                  <th className="p-2.5 rounded-l-lg">Point</th>
                  <th className="p-2.5">Latitude (అక్షాంశం)</th>
                  <th className="p-2.5">Longitude (రేఖాంశం)</th>
                  <th className="p-2.5 rounded-r-lg">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {farm.boundary.coordinates.map((coord, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="p-2.5 font-bold text-farm-700">P{idx + 1}</td>
                    <td className="p-2.5 font-mono text-gray-700">{coord[0].toFixed(6)}° N</td>
                    <td className="p-2.5 font-mono text-gray-700">{coord[1].toFixed(6)}° E</td>
                    <td className="p-2.5">
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                        <FileCheck2 className="w-3.5 h-3.5" />
                        Verified
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Col: Agronomic Spatial Validation Card */}
        <div className="bg-gradient-to-br from-farm-50 to-emerald-50 rounded-3xl p-6 border border-farm-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-farm-800 text-xs font-bold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>{language === 'te' ? 'భూసార & భౌగోళిక నిర్ధారణ' : 'Spatial Validation'}</span>
            </div>
            <h4 className="text-base font-bold text-farm-950">
              {farm.name}
            </h4>
            <p className="text-xs text-farm-700 mt-1">
              {t.dashboard.surveyNo}: {farm.surveyNumber} • {farm.agroZone}
            </p>

            <div className="mt-4 space-y-2.5 text-xs text-farm-900">
              <div className="p-2.5 rounded-xl bg-white border border-farm-200 flex justify-between">
                <span className="text-gray-500">{t.map.calculatedArea}:</span>
                <span className="font-bold text-farm-950">
                  {farm.boundary.areaAcres} {t.dashboard.acres} ({farm.boundary.areaGuntas} {t.dashboard.guntas})
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-farm-200 flex justify-between">
                <span className="text-gray-500">{t.map.perimeter}:</span>
                <span className="font-bold text-farm-950">{farm.boundary.perimeterMeters} {t.map.meters}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-farm-200 flex justify-between">
                <span className="text-gray-500">{t.dashboard.soilType}:</span>
                <span className="font-bold text-farm-950">{farm.soilType.replace('_', ' ')}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-farm-200 flex justify-between">
                <span className="text-gray-500">{t.map.waterSource}:</span>
                <span className="font-bold text-farm-950">{farm.irrigationType}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-farm-200/60">
            <Link
              href="/crops"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-farm-700 hover:bg-farm-800 text-white text-xs font-bold shadow-xs transition-colors"
            >
              <span>{language === 'te' ? 'పంటల సిఫార్సు చూడండి' : 'View Recommended Crops'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
