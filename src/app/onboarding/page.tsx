'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  UserCheck,
  MapPin,
  Save,
  CheckCircle2,
  Crosshair,
  Sparkles,
  Phone,
  Droplets,
  Layers,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useFarm } from '@/context/FarmContext';
import { districtsList } from '@/data/districtsData';
import { LandOwnership, SoilType, IrrigationType } from '@/types';
import { LocationSelector, LocationSelection } from '@/components/LocationSelector';

export default function OnboardingPage() {
  const router = useRouter();
  const { language, t } = useLanguage();
  const { farmer, setFarmer, farm, updateFarmDetails } = useFarm();

  const [formData, setFormData] = useState({
    name: farmer.name,
    nameTelugu: farmer.nameTelugu,
    phone: farmer.phone,
    village: farmer.village,
    mandal: farmer.mandal,
    district: farmer.district,
    state: farmer.state,
    ownership: farmer.ownership as LandOwnership,
    pmKisanId: farmer.pmKisanId || '',
    rythuBandhuId: farmer.rythuBandhuId || '',
    farmName: farm.name,
    surveyNumber: farm.surveyNumber,
    soilType: farm.soilType as SoilType,
    irrigationType: farm.irrigationType as IrrigationType,
  });

  const [gpsStatus, setGpsStatus] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Selected district info to populate mandals
  const selectedDistrictObj =
    districtsList.find(
      (d) => d.nameEn.toLowerCase() === formData.district.toLowerCase()
    ) || districtsList[0];

  const handleGpsDetect = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    setGpsStatus(language === 'te' ? 'GPS లొకేషన్ గుర్తిస్తోంది...' : 'Detecting GPS location...');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGpsStatus(
          language === 'te'
            ? `GPS లొకేషన్ గుర్తించబడింది: Lat ${pos.coords.latitude.toFixed(4)}, Lng ${pos.coords.longitude.toFixed(4)}`
            : `GPS Pinpointed: Lat ${pos.coords.latitude.toFixed(4)}, Lng ${pos.coords.longitude.toFixed(4)}`
        );
        updateFarmDetails({
          centerLocation: {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          },
        });
      },
      () => {
        setGpsStatus(language === 'te' ? 'లొకేషన్ అనుమతి తిరస్కరించబడింది.' : 'Location permission denied.');
      },
      { enableHighAccuracy: true }
    );
  };

  const handleLocationChange = (selection: LocationSelection) => {
    setFormData((prev) => ({
      ...prev,
      state: selection.stateName || prev.state,
      district: selection.districtName || prev.district,
      mandal: selection.subDistrictName || prev.mandal,
      village: selection.villageName || prev.village,
    }));

    if (selection.latitude && selection.longitude) {
      updateFarmDetails({
        centerLocation: {
          lat: selection.latitude,
          lng: selection.longitude,
        },
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setFarmer({
      ...farmer,
      name: formData.name,
      nameTelugu: formData.nameTelugu,
      phone: formData.phone,
      village: formData.village,
      mandal: formData.mandal,
      district: formData.district,
      state: formData.state,
      ownership: formData.ownership,
      pmKisanId: formData.pmKisanId,
      rythuBandhuId: formData.rythuBandhuId,
    });

    updateFarmDetails({
      name: formData.farmName,
      surveyNumber: formData.surveyNumber,
      soilType: formData.soilType,
      irrigationType: formData.irrigationType,
    });

    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      router.push('/');
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-farm-900 to-farm-800 text-white p-6 sm:p-8 rounded-3xl shadow-xl">
        <div>
          <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block mb-1">
            {language === 'te' ? 'రైతు ప్రొఫైల్ & పొలం అమరిక' : 'Farmer Registration & Farm Setup'}
          </span>
          <h1 className="text-2xl font-black">
            {language === 'te' ? 'రైతుమిత్ర ఖాతా వివరాలు' : 'RythuMitra Account Settings'}
          </h1>
          <p className="text-xs text-farm-200 mt-1 max-w-xl">
            {language === 'te'
              ? 'భారతదేశంలోని అన్ని రాష్ట్రాల నుండి సరైన గ్రామ/మండల/తాలూకా వివరాలు నమోదు చేయండి.'
              : 'Configure your all-India administrative location, land tenure, soil type, and drip setup.'}
          </p>
        </div>

        <button
          type="button"
          onClick={handleGpsDetect}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold transition-colors shadow-xs"
        >
          <Crosshair className="w-4 h-4" />
          <span>{language === 'te' ? 'GPS ద్వారా స్థలాన్ని గుర్తించండి' : 'Auto-Detect via GPS'}</span>
        </button>
      </div>

      {gpsStatus && (
        <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 font-semibold flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>{gpsStatus}</span>
        </div>
      )}

      {/* Profile Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 border border-farm-200 shadow-md space-y-8">
        {/* Section 1: Farmer Personal Details */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-farm-700 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
            <UserCheck className="w-4 h-4" />
            {language === 'te' ? '1. రైతు వ్యక్తిగత వివరాలు' : '1. Farmer Personal Information'}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                {language === 'te' ? 'రైతు పేరు (తెలుగు)' : 'Farmer Name (Telugu)'}
              </label>
              <input
                type="text"
                required
                value={formData.nameTelugu}
                onChange={(e) => setFormData({ ...formData, nameTelugu: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-farm-500 focus:border-farm-500 text-sm font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                {language === 'te' ? 'రైతు పేరు (English)' : 'Farmer Name (English)'}
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-farm-500 focus:border-farm-500 text-sm font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                {language === 'te' ? 'మొబైల్ నంబర్' : 'Phone Number'}
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-farm-500 focus:border-farm-500 text-sm font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                {language === 'te' ? 'భూమి యాజమాన్య హక్కు' : 'Land Ownership Status'}
              </label>
              <select
                value={formData.ownership}
                onChange={(e) => setFormData({ ...formData, ownership: e.target.value as LandOwnership })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-farm-500 focus:border-farm-500 text-sm font-medium"
              >
                <option value="OWNER">{language === 'te' ? 'పట్టాదారు రైతు (Owner)' : 'Land Owner'}</option>
                <option value="TENANT">{language === 'te' ? 'కౌలు రైతు (Tenant / Kaulu Rythu)' : 'Tenant Farmer'}</option>
                <option value="LEASED">{language === 'te' ? 'లీజుకు తీసుకున్న భూమి (Leased)' : 'Leased Land'}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 2: All-India Administrative Location Hierarchy */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-farm-700 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            {language === 'te' ? '2. అఖిల భారత రెవెన్యూ & పరిపాలనా వివరాలు' : '2. All-India Administrative Location'}
          </h3>

          <LocationSelector
            onChange={handleLocationChange}
            initialSelection={{
              stateName: formData.state,
              districtName: formData.district,
              subDistrictName: formData.mandal,
              villageName: formData.village,
            }}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                PM-Kisan ID / Rythu Bharosa
              </label>
              <input
                type="text"
                value={formData.pmKisanId}
                placeholder="AP-PMK-XXXXXXX"
                onChange={(e) => setFormData({ ...formData, pmKisanId: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-farm-500 text-sm font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Rythu Bandhu / Passbook Ref
              </label>
              <input
                type="text"
                value={formData.rythuBandhuId}
                placeholder="RB-XXXXXXX"
                onChange={(e) => setFormData({ ...formData, rythuBandhuId: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-farm-500 text-sm font-medium"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Farm Plot Properties */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-farm-700 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
            <Layers className="w-4 h-4" />
            {language === 'te' ? '3. పొలం ప్రాథమిక సమాచారం' : '3. Farm Plot Information'}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                {language === 'te' ? 'పొలం పేరు' : 'Farm Name'}
              </label>
              <input
                type="text"
                required
                value={formData.farmName}
                onChange={(e) => setFormData({ ...formData, farmName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-farm-500 text-sm font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                {language === 'te' ? 'సర్వే నెంబర్' : 'Survey Number'}
              </label>
              <input
                type="text"
                required
                value={formData.surveyNumber}
                onChange={(e) => setFormData({ ...formData, surveyNumber: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-farm-500 text-sm font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                {language === 'te' ? 'నేల రకం (వర్గీకరణ)' : 'Soil Classification'}
              </label>
              <select
                value={formData.soilType}
                onChange={(e) => setFormData({ ...formData, soilType: e.target.value as SoilType })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-farm-500 text-sm font-medium"
              >
                <option value="BLACK_COTTON">{language === 'te' ? 'నల్లరేగడి నేల (Black Cotton)' : 'Black Cotton Soil'}</option>
                <option value="RED_LOAMY">{language === 'te' ? 'ఎర్ర నేల / చెల్క (Red Loamy)' : 'Red Loamy Soil'}</option>
                <option value="ALLUVIAL">{language === 'te' ? 'ఒండ్రు నేల (Alluvial Delta)' : 'Alluvial Soil'}</option>
                <option value="SANDY_LOAM">{language === 'te' ? 'ఇసుక రేగడి (Sandy Loam)' : 'Sandy Loam Soil'}</option>
                <option value="CLAYEY">{language === 'te' ? 'బంకమట్టి నేల (Clayey)' : 'Clayey Soil'}</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                {language === 'te' ? 'ప్రధాన నీటి వనరు' : 'Primary Irrigation Source'}
              </label>
              <select
                value={formData.irrigationType}
                onChange={(e) => setFormData({ ...formData, irrigationType: e.target.value as IrrigationType })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-farm-500 text-sm font-medium"
              >
                <option value="DRIP">{language === 'te' ? 'బిందు సేద్యం (Drip Irrigation)' : 'Drip Irrigation'}</option>
                <option value="BOREWELL">{language === 'te' ? 'బోరు బావి (Borewell Flooding)' : 'Borewell Pumping'}</option>
                <option value="CANAL">{language === 'te' ? 'కాలువ నీరు (Canal Irrigation)' : 'Canal Water'}</option>
                <option value="SPRINKLER">{language === 'te' ? 'తుంపర సేద్యం (Sprinkler)' : 'Sprinkler Irrigation'}</option>
                <option value="RAINFED">{language === 'te' ? 'వర్షాధార పంట (Rainfed / Metta)' : 'Rainfed Only'}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Submit Bar */}
        <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-xs text-gray-500">
            {language === 'te'
              ? 'వివరాలు భద్రపరిచిన తర్వాత పొలం శాటిలైట్ మ్యాప్‌కు తీసుకెళ్లబడుతుంది.'
              : 'Saving will proceed to satellite boundary mapping.'}
          </div>

          <div className="flex items-center gap-3">
            {saveSuccess && (
              <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                {language === 'te' ? 'భద్రపరచబడింది!' : 'Saved successfully!'}
              </span>
            )}

            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-farm-600 hover:bg-farm-700 text-white font-bold text-xs shadow-md transition-all"
            >
              <Save className="w-4 h-4" />
              <span>{language === 'te' ? 'వివరాలు భద్రపరచండి →' : 'Save & Proceed →'}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
