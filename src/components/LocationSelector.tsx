'use client';

import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Navigation,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Search,
  ChevronDown,
  Globe2,
  Shield,
  X,
} from 'lucide-react';
import { StateUT, District, SubDistrict, Village, AdministrativeLocation } from '@/types/location';
import { useLanguage } from '@/context/LanguageContext';

export interface LocationSelection {
  stateCode: string;
  stateName: string;
  districtId: string;
  districtName: string;
  subDistrictId: string;
  subDistrictName: string;
  subDistrictTerminology: string;
  villageId: string;
  villageName: string;
  pinCode?: string;
  latitude?: number;
  longitude?: number;
  source: 'MANUAL' | 'GPS';
}

interface LocationSelectorProps {
  initialSelection?: Partial<LocationSelection>;
  onChange: (selection: LocationSelection) => void;
  enableGps?: boolean;
  className?: string;
}

export function LocationSelector({
  initialSelection,
  onChange,
  enableGps = true,
  className = '',
}: LocationSelectorProps) {
  const { language } = useLanguage();
  const isTe = language === 'te';

  // Master lists
  const [states, setStates] = useState<StateUT[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [subDistricts, setSubDistricts] = useState<SubDistrict[]>([]);
  const [villages, setVillages] = useState<Village[]>([]);

  // Selection states
  const [selectedStateCode, setSelectedStateCode] = useState<string>(initialSelection?.stateCode || 'IN-AP');
  const [selectedDistrictId, setSelectedDistrictId] = useState<string>(initialSelection?.districtId || '');
  const [selectedSubDistrictId, setSelectedSubDistrictId] = useState<string>(initialSelection?.subDistrictId || '');
  const [selectedVillageId, setSelectedVillageId] = useState<string>(initialSelection?.villageId || '');
  const [customVillageText, setCustomVillageText] = useState<string>(initialSelection?.villageName || '');

  // Dynamic terminology label
  const [subDistrictTerminology, setSubDistrictTerminology] = useState<string>('MANDAL');
  const [terminologyLabel, setTerminologyLabel] = useState<string>(isTe ? 'మండలం' : 'Mandal');

  // Loading & GPS states
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const [loadingSubDistricts, setLoadingSubDistricts] = useState(false);
  const [loadingVillages, setLoadingVillages] = useState(false);
  const [gpsLoading, setGpsLoading] = useState(false);
  const [gpsMessage, setGpsMessage] = useState<{ type: 'success' | 'warning' | 'error'; text: string } | null>(null);

  // Load States on mount
  useEffect(() => {
    async function loadStates() {
      setLoadingStates(true);
      try {
        const res = await fetch(`/api/v1/locations/states?lang=${language}`);
        if (res.ok) {
          const data = await res.json();
          setStates(data.states || []);
        }
      } catch (err) {
        console.error('Failed to load states:', err);
      } finally {
        setLoadingStates(false);
      }
    }
    loadStates();
  }, [language]);

  // Update terminology whenever state changes
  useEffect(() => {
    const stateObj = states.find((s) => s.code === selectedStateCode);
    if (stateObj) {
      setSubDistrictTerminology(stateObj.subDistrictTerminology);
      const label = stateObj.terminologyLabel[language] || stateObj.terminologyLabel.en || 'Mandal';
      setTerminologyLabel(label);
    }
  }, [selectedStateCode, states, language]);

  // Load Districts when state changes
  useEffect(() => {
    if (!selectedStateCode) {
      setDistricts([]);
      return;
    }
    async function loadDistricts() {
      setLoadingDistricts(true);
      try {
        const res = await fetch(`/api/v1/locations/districts?state=${selectedStateCode}&lang=${language}`);
        if (res.ok) {
          const data = await res.json();
          setDistricts(data.districts || []);
        }
      } catch (err) {
        console.error('Failed to load districts:', err);
      } finally {
        setLoadingDistricts(false);
      }
    }
    loadDistricts();
  }, [selectedStateCode, language]);

  // Load Sub-Districts when district changes
  useEffect(() => {
    if (!selectedDistrictId) {
      setSubDistricts([]);
      return;
    }
    async function loadSubDistricts() {
      setLoadingSubDistricts(true);
      try {
        const res = await fetch(`/api/v1/locations/sub-districts?district=${selectedDistrictId}&lang=${language}`);
        if (res.ok) {
          const data = await res.json();
          setSubDistricts(data.subDistricts || []);
          if (data.terminologyLabel) {
            setTerminologyLabel(data.terminologyLabel);
          }
        }
      } catch (err) {
        console.error('Failed to load sub-districts:', err);
      } finally {
        setLoadingSubDistricts(false);
      }
    }
    loadSubDistricts();
  }, [selectedDistrictId, language]);

  // Load Villages when sub-district changes
  useEffect(() => {
    if (!selectedSubDistrictId) {
      setVillages([]);
      return;
    }
    async function loadVillages() {
      setLoadingVillages(true);
      try {
        const res = await fetch(`/api/v1/locations/villages?subDistrict=${selectedSubDistrictId}&lang=${language}`);
        if (res.ok) {
          const data = await res.json();
          setVillages(data.villages || []);
        }
      } catch (err) {
        console.error('Failed to load villages:', err);
      } finally {
        setLoadingVillages(false);
      }
    }
    loadVillages();
  }, [selectedSubDistrictId, language]);

  // Notify parent on change
  const notifyChange = (
    stateCode: string,
    distId: string,
    subDistId: string,
    vilId: string,
    customVilName: string,
    source: 'MANUAL' | 'GPS' = 'MANUAL',
    coords?: { lat: number; lng: number }
  ) => {
    const sObj = states.find((s) => s.code === stateCode);
    const dObj = districts.find((d) => d.id === distId);
    const sdObj = subDistricts.find((sd) => sd.id === subDistId);
    const vObj = villages.find((v) => v.id === vilId);

    const selection: LocationSelection = {
      stateCode,
      stateName: sObj?.name || stateCode,
      districtId: distId,
      districtName: dObj?.name || distId,
      subDistrictId: subDistDistName(subDistId, sdObj?.name),
      subDistrictName: sdObj?.name || '',
      subDistrictTerminology,
      villageId: vilId,
      villageName: vObj?.name || customVilName || '',
      pinCode: vObj?.pinCode,
      latitude: coords?.lat,
      longitude: coords?.lng,
      source,
    };

    onChange(selection);
  };

  const subDistDistName = (id: string, name?: string) => {
    return id || name || '';
  };

  // Handle GPS location with reverse geocoding
  const handleUseMyLocation = () => {
    setGpsMessage(null);
    if (!navigator.geolocation) {
      setGpsMessage({
        type: 'error',
        text: isTe
          ? 'మీ బ్రౌజర్‌లో GPS సదుపాయం అందుబాటులో లేదు. దయచేసి మాన్యువల్‌గా ఎంచుకోండి.'
          : 'Geolocation is not supported by your browser. Please select manually.',
      });
      return;
    }

    setGpsLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const res = await fetch('/api/v1/locations/reverse-geocode', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ lat: latitude, lng: longitude }),
          });

          if (res.ok) {
            const data = await res.json();
            if (data.detected && data.location) {
              const loc: AdministrativeLocation = data.location;
              setSelectedStateCode(loc.state.code);
              setSelectedDistrictId(loc.district.id);
              setSelectedSubDistrictId(loc.subDistrict.id);
              if (loc.village) {
                setSelectedVillageId(loc.village.id);
                setCustomVillageText(loc.village.name);
              }

              notifyChange(
                loc.state.code,
                loc.district.id,
                loc.subDistrict.id,
                loc.village?.id || '',
                loc.village?.name || '',
                'GPS',
                { lat: latitude, lng: longitude }
              );

              setGpsMessage({
                type: 'success',
                text: isTe
                  ? `GPS ద్వారా గుర్తించబడింది: ${loc.formattedAddress}`
                  : `GPS Identified: ${loc.formattedAddress}`,
              });
            } else {
              setGpsMessage({
                type: 'warning',
                text: isTe
                  ? `స్థాన నిరూపకాలు గుర్తించబడ్డాయి (${latitude.toFixed(4)}, ${longitude.toFixed(4)}). నిర్దిష్ట చిరునామా కోసం దయచేసి క్రింది జాబితా నుండి ఎంచుకోండి.`
                  : `GPS coordinates captured (${latitude.toFixed(4)}, ${longitude.toFixed(4)}). Exact administrative boundaries unavailable; please select manually.`,
              });
            }
          }
        } catch (err: any) {
          setGpsMessage({
            type: 'error',
            text: isTe ? 'GPS చిరునామా పొందడంలో లోపం ఏర్పడింది.' : 'Failed to reverse geocode GPS location.',
          });
        } finally {
          setGpsLoading(false);
        }
      },
      (err) => {
        setGpsLoading(false);
        if (err.code === err.PERMISSION_DENIED) {
          setGpsMessage({
            type: 'warning',
            text: isTe
              ? 'GPS అనుమతి నిరాకరించబడింది. మీరు క్రింది డ్రాప్‌డౌన్ల నుండి స్థానాన్ని మాన్యువల్‌గా ఎంచుకోవచ్చు.'
              : 'Location permission was denied. You can select your administrative location below.',
          });
        } else {
          setGpsMessage({
            type: 'error',
            text: isTe ? 'GPS సిగ్నల్ పొందడంలో విఫలమైంది.' : 'Could not acquire GPS position.',
          });
        }
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* GPS Header Button with Privacy Note */}
      {enableGps && (
        <div className="bg-emerald-50/70 p-3 rounded-2xl border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-xl bg-emerald-600 text-white shadow-xs">
              <Navigation className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-emerald-950 block">
                {isTe ? 'GPS ద్వారా స్వయంచాలక గుర్తింపు' : 'Auto-Detect via GPS'}
              </span>
              <span className="text-[10px] text-emerald-800 flex items-center gap-1">
                <Shield className="w-3 h-3 text-emerald-600" />
                {isTe ? 'గోప్యత హామీ: మీ అనుమతితో మాత్రమే' : 'Privacy protected: coordinates kept private'}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleUseMyLocation}
            disabled={gpsLoading}
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-bold shadow-xs transition-all active:scale-95"
          >
            {gpsLoading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>{isTe ? 'గుర్తిస్తోంది...' : 'Locating...'}</span>
              </>
            ) : (
              <>
                <MapPin className="w-3.5 h-3.5" />
                <span>{isTe ? 'నా స్థానాన్ని గుర్తించు (GPS)' : 'Use My Location'}</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* GPS Status / Feedback Message */}
      {gpsMessage && (
        <div
          className={`p-3 rounded-xl text-xs font-semibold flex items-start justify-between gap-2 ${
            gpsMessage.type === 'success'
              ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
              : gpsMessage.type === 'warning'
              ? 'bg-amber-100 text-amber-900 border border-amber-300'
              : 'bg-rose-100 text-rose-900 border border-rose-300'
          }`}
        >
          <div className="flex items-start gap-1.5">
            {gpsMessage.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            )}
            <span>{gpsMessage.text}</span>
          </div>
          <button
            type="button"
            onClick={() => setGpsMessage(null)}
            className="text-slate-500 hover:text-slate-800"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Cascading Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* 1. STATE / UNION TERRITORY */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            {isTe ? 'రాష్ట్రం / కేంద్రపాలిత ప్రాంతం' : 'State / Union Territory'}
          </label>
          <div className="relative">
            <select
              value={selectedStateCode}
              onChange={(e) => {
                const code = e.target.value;
                setSelectedStateCode(code);
                setSelectedDistrictId('');
                setSelectedSubDistrictId('');
                setSelectedVillageId('');
                setCustomVillageText('');
                notifyChange(code, '', '', '', '', 'MANUAL');
              }}
              disabled={loadingStates}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:bg-white"
            >
              <option value="">-- {isTe ? 'రాష్ట్రాన్ని ఎంచుకోండి' : 'Select State / UT'} --</option>
              {states.map((s) => (
                <option key={s.code} value={s.code}>
                  {s.translations[language] || s.name} ({s.code.replace('IN-', '')})
                </option>
              ))}
            </select>
            {loadingStates && (
              <Loader2 className="w-3.5 h-3.5 animate-spin absolute right-3 top-3 text-slate-400" />
            )}
          </div>
        </div>

        {/* 2. DISTRICT */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            {isTe ? 'జిల్లా (District)' : 'District'}
          </label>
          <div className="relative">
            <select
              value={selectedDistrictId}
              onChange={(e) => {
                const distId = e.target.value;
                setSelectedDistrictId(distId);
                setSelectedSubDistrictId('');
                setSelectedVillageId('');
                setCustomVillageText('');
                notifyChange(selectedStateCode, distId, '', '', '', 'MANUAL');
              }}
              disabled={!selectedStateCode || loadingDistricts}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:bg-white disabled:opacity-50"
            >
              <option value="">-- {isTe ? 'జిల్లాను ఎంచుకోండి' : 'Select District'} --</option>
              {districts.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.translations?.[language] || d.localName || d.name}
                </option>
              ))}
            </select>
            {loadingDistricts && (
              <Loader2 className="w-3.5 h-3.5 animate-spin absolute right-3 top-3 text-slate-400" />
            )}
          </div>
        </div>

        {/* 3. SUB-DISTRICT (DYNAMIC TERMINOLOGY: Mandal / Taluk / Tehsil / Block) */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-bold text-slate-700">
              {terminologyLabel} ({subDistrictTerminology})
            </label>
            <span className="text-[10px] font-bold text-emerald-700 uppercase">
              {subDistrictTerminology}
            </span>
          </div>
          <div className="relative">
            <select
              value={selectedSubDistrictId}
              onChange={(e) => {
                const subDistId = e.target.value;
                setSelectedSubDistrictId(subDistId);
                setSelectedVillageId('');
                setCustomVillageText('');
                notifyChange(selectedStateCode, selectedDistrictId, subDistId, '', '', 'MANUAL');
              }}
              disabled={!selectedDistrictId || loadingSubDistricts}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:bg-white disabled:opacity-50"
            >
              <option value="">-- {isTe ? `${terminologyLabel}ను ఎంచుకోండి` : `Select ${terminologyLabel}`} --</option>
              {subDistricts.map((sd) => (
                <option key={sd.id} value={sd.id}>
                  {sd.translations?.[language] || sd.localName || sd.name}
                </option>
              ))}
            </select>
            {loadingSubDistricts && (
              <Loader2 className="w-3.5 h-3.5 animate-spin absolute right-3 top-3 text-slate-400" />
            )}
          </div>
        </div>

        {/* 4. VILLAGE (SELECT OR TYPE) */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            {isTe ? 'గ్రామం (Village / Locality)' : 'Village / Locality'}
          </label>
          <div className="space-y-1.5">
            {villages.length > 0 ? (
              <select
                value={selectedVillageId}
                onChange={(e) => {
                  const vId = e.target.value;
                  setSelectedVillageId(vId);
                  const vObj = villages.find((v) => v.id === vId);
                  setCustomVillageText(vObj?.name || '');
                  notifyChange(
                    selectedStateCode,
                    selectedDistrictId,
                    selectedSubDistrictId,
                    vId,
                    vObj?.name || '',
                    'MANUAL'
                  );
                }}
                disabled={!selectedSubDistrictId || loadingVillages}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:bg-white disabled:opacity-50"
              >
                <option value="">-- {isTe ? 'గ్రామాన్ని ఎంచుకోండి' : 'Select Village'} --</option>
                {villages.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.translations?.[language] || v.name} {v.pinCode ? `(${v.pinCode})` : ''}
                  </option>
                ))}
              </select>
            ) : null}

            {/* Custom Village Name Input */}
            <input
              type="text"
              value={customVillageText}
              onChange={(e) => {
                const txt = e.target.value;
                setCustomVillageText(txt);
                notifyChange(
                  selectedStateCode,
                  selectedDistrictId,
                  selectedSubDistrictId,
                  selectedVillageId,
                  txt,
                  'MANUAL'
                );
              }}
              placeholder={
                villages.length > 0
                  ? (isTe ? 'లేదా మీ గ్రామ పేరును టైప్ చేయండి...' : 'Or enter custom village name...')
                  : (isTe ? 'గ్రామ పేరును టైప్ చేయండి (ఉదా: Tadikonda)' : 'Enter village name (e.g. Tadikonda)')
              }
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
