'use client';

import React, { useState } from 'react';
import {
  MapPin,
  RefreshCw,
  Navigation,
  Compass,
  CheckCircle2,
  AlertTriangle,
  Layers,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { useFarm } from '@/context/FarmContext';

interface GpsLocationState {
  latitude: number;
  longitude: number;
  accuracyMeters: number;
  timestamp: string;
  distanceToFarmMeters: number;
  farmRelativeStatus: 'INSIDE' | 'NEAR' | 'OUTSIDE';
}

function calculateHaversineDistanceMeters(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371e3; // Earth radius in meters
  const radLat1 = (lat1 * Math.PI) / 180;
  const radLat2 = (lat2 * Math.PI) / 180;
  const deltaLat = ((lat2 - lat1) * Math.PI) / 180;
  const deltaLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(radLat1) * Math.cos(radLat2) * Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Math.round(R * c);
}

export function GpsLocationCard() {
  const { language } = useLanguage();
  const { farm, farmer } = useFarm();

  const [loading, setLoading] = useState(false);
  const [gpsData, setGpsData] = useState<GpsLocationState | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const farmCenterLat = farm.centerLocation.lat || 16.4245;
  const farmCenterLng = farm.centerLocation.lng || 80.4548;

  const handleRequestGps = () => {
    if (!navigator.geolocation) {
      setErrorMsg(
        language === 'te'
          ? 'మీ బ్రౌజర్ లేదా పరికరం GPS సపోర్ట్ చేయడం లేదు.'
          : 'Geolocation is not supported by your browser or device.'
      );
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude, accuracy } = pos.coords;
        const dist = calculateHaversineDistanceMeters(
          latitude,
          longitude,
          farmCenterLat,
          farmCenterLng
        );

        let status: 'INSIDE' | 'NEAR' | 'OUTSIDE' = 'OUTSIDE';
        if (dist <= 120) {
          status = 'INSIDE';
        } else if (dist <= 1000) {
          status = 'NEAR';
        } else {
          status = 'OUTSIDE';
        }

        setGpsData({
          latitude: Number(latitude.toFixed(6)),
          longitude: Number(longitude.toFixed(6)),
          accuracyMeters: Math.round(accuracy),
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          distanceToFarmMeters: dist,
          farmRelativeStatus: status,
        });
        setLoading(false);
      },
      (err) => {
        setLoading(false);
        if (err.code === err.PERMISSION_DENIED) {
          setErrorMsg(
            language === 'te'
              ? 'లొకేషన్ అనుమతి తిరస్కరించబడింది. దయచేసి బ్రౌజర్‌లో లొకేషన్ అనుమతించండి.'
              : 'Location permission denied. Please allow location access in your browser settings.'
          );
        } else if (err.code === err.POSITION_UNAVAILABLE) {
          setErrorMsg(
            language === 'te'
              ? 'లొకేషన్ సిగ్నల్ అందుబాటులో లేదు. ఆరుబయట ప్రయత్నించండి.'
              : 'Location signal unavailable. Try moving outdoors.'
          );
        } else {
          setErrorMsg(
            language === 'te'
              ? 'లొకేషన్ పొందడంలో సమయం ముగిసింది. దయచేసి మళ్ళీ ప్రయత్నించండి.'
              : 'GPS acquisition timed out. Please try again.'
          );
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-farm-200 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-emerald-100 text-emerald-700">
            <Navigation className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-black text-gray-900">
                {language === 'te' ? 'ప్రత్యక్ష GPS లొకేషన్ & పొలం దూరం' : 'Live GPS Location & Farm Distance'}
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                Geofence Active
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              {farmer.village}, {farmer.mandal} {language === 'te' ? 'మండలం' : 'Mandal'}, {farmer.district}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={handleRequestGps}
            disabled={loading}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-farm-600 hover:bg-farm-700 active:scale-95 text-white text-xs font-bold shadow-xs hover:shadow transition-all disabled:opacity-50 min-h-[40px]"
            aria-label="Use My Location GPS"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>
              {gpsData
                ? language === 'te'
                  ? 'లొకేషన్ రిఫ్రెష్'
                  : 'Refresh Location'
                : language === 'te'
                ? 'నా లొకేషన్ గుర్తించండి'
                : 'Use My Location'}
            </span>
          </button>

          <Link
            href="/map"
            className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold transition-colors min-h-[40px]"
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{language === 'te' ? 'శాటిలైట్ మ్యాప్' : 'Satellite Map'}</span>
          </Link>
        </div>
      </div>

      {/* Dynamic GPS Data View */}
      {errorMsg ? (
        <div className="mt-4 p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2.5">
          <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      ) : gpsData ? (
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-2xl bg-farm-50/70 border border-farm-200/80">
            <span className="text-gray-500 block text-[11px]">
              {language === 'te' ? 'అక్షాంశం / రేఖాంశం' : 'Coordinates (Lat / Lng)'}
            </span>
            <span className="font-bold text-gray-900 mt-1 block truncate">
              {gpsData.latitude}, {gpsData.longitude}
            </span>
            <span className="text-[10px] text-gray-500 block mt-0.5">
              Accuracy: &plusmn;{gpsData.accuracyMeters}m ({gpsData.timestamp})
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-farm-50/70 border border-farm-200/80">
            <span className="text-gray-500 block text-[11px]">
              {language === 'te' ? 'నమోదిత పొలం దూరం' : 'Distance to Farm'}
            </span>
            <span className="font-bold text-farm-900 mt-1 block">
              {gpsData.distanceToFarmMeters < 1000
                ? `${gpsData.distanceToFarmMeters} Meters`
                : `${(gpsData.distanceToFarmMeters / 1000).toFixed(2)} Km`}
            </span>
            <span className="text-[10px] text-gray-500 block mt-0.5">
              Center: {farmCenterLat}, {farmCenterLng}
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-farm-50/70 border border-farm-200/80">
            <span className="text-gray-500 block text-[11px]">
              {language === 'te' ? 'క్షేత్ర స్థితి (Geofence)' : 'Field Relative Status'}
            </span>
            <div className="mt-1">
              {gpsData.farmRelativeStatus === 'INSIDE' && (
                <span className="inline-flex items-center gap-1 font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                  <CheckCircle2 className="w-3 h-3" />
                  {language === 'te' ? 'పొలంలో ఉన్నారు (Inside)' : 'Inside Farm'}
                </span>
              )}
              {gpsData.farmRelativeStatus === 'NEAR' && (
                <span className="inline-flex items-center gap-1 font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md">
                  <Compass className="w-3 h-3" />
                  {language === 'te' ? 'పొలం సమీపంలో (Near)' : 'Near Farm'}
                </span>
              )}
              {gpsData.farmRelativeStatus === 'OUTSIDE' && (
                <span className="inline-flex items-center gap-1 font-bold text-gray-700 bg-gray-200 px-2 py-0.5 rounded-md">
                  <MapPin className="w-3 h-3" />
                  {language === 'te' ? 'పొలం వెలుపల (Outside)' : 'Outside Farm'}
                </span>
              )}
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-farm-50/70 border border-farm-200/80 flex flex-col justify-between">
            <span className="text-gray-500 block text-[11px]">
              {language === 'te' ? 'నమోదిత సరిహద్దు' : 'Registered Field'}
            </span>
            <Link
              href="/map"
              className="text-xs font-bold text-farm-700 hover:text-farm-900 flex items-center gap-1 mt-1"
            >
              <span>{farm.name}</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
            <span className="text-[10px] text-gray-500 block mt-0.5">
              {farm.boundary.areaAcres} {language === 'te' ? 'ఎకరాలు' : 'Acres'} • Sy No. {farm.surveyNumber}
            </span>
          </div>
        </div>
      ) : (
        <div className="mt-3 py-2 px-3 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-between text-xs text-gray-600">
          <span>
            {language === 'te'
              ? 'మీ ప్రస్తుత స్థానాన్ని మరియు పొలం దూరాన్ని తెలుసుకోవడానికి "నా లొకేషన్ గుర్తించండి" పై క్లిక్ చేయండి.'
              : 'Click "Use My Location" to detect your real device position and compute distance to your registered farm.'}
          </span>
        </div>
      )}

      {/* Non-Ownership Legal Disclaimer */}
      <p className="text-[10px] text-gray-500 mt-3 italic leading-normal">
        {language === 'te'
          ? 'గమనిక: GPS కొలతలు కేవలం శాటిలైట్ వ్యవసాయ నిర్వహణ మరియు సలహాల కొరకు మాత్రమే. ఇవి చట్టపరమైన భూ యాజమాన్య ధృవీకరణ పత్రాలు కావు.'
          : 'Note: GPS coordinates provide estimated geographic positioning for agronomic decision support and do not constitute legal evidence of land ownership.'}
      </p>
    </div>
  );
}
