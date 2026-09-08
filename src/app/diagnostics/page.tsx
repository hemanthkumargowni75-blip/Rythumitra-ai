'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldAlert,
  Camera,
  Upload,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  HelpCircle,
  FlaskConical,
  Leaf,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useFarm } from '@/context/FarmContext';
import { CameraScanner } from '@/components/CameraScanner';
import { diseasesCatalog } from '@/data/diseasesData';
import { DiseaseRecord } from '@/types';

export default function DiagnosticsPage() {
  const { language, t } = useLanguage();
  const { farm, activeCrop, addTreatmentTask } = useFarm();

  const [selectedDiseaseId, setSelectedDiseaseId] = useState<string>('chilli_thrips_murda');
  const [analyzing, setAnalyzing] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [cameraScannerOpen, setCameraScannerOpen] = useState(false);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([
    'Upward and downward curling of tender apical leaves (Boat shaped cupping)',
    'Excessive dropping of flowers and small deformed scarred pods',
  ]);
  const [taskAddedSuccess, setTaskAddedSuccess] = useState(false);

  const handlePhotoCapturedFromCamera = (dataUrl: string) => {
    setPhotoPreview(dataUrl);
    handleSimulateScan(selectedDiseaseId);
  };

  const currentDisease: DiseaseRecord =
    diseasesCatalog.find((d) => d.id === selectedDiseaseId) || diseasesCatalog[0];

  const handleSimulateScan = (diseaseId: string) => {
    setAnalyzing(true);
    setTimeout(() => {
      setSelectedDiseaseId(diseaseId);
      setAnalyzing(false);
    }, 900);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPhotoPreview(reader.result as string);
        handleSimulateScan(selectedDiseaseId);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddToSchedule = () => {
    addTreatmentTask({
      id: `task-${Date.now()}`,
      cropName: activeCrop.cropNameTe,
      targetIssue: currentDisease.diseaseNameTe,
      actionEn: `${currentDisease.chemicalControlEn.chemicalName} (${currentDisease.chemicalControlEn.commercialBrands}) @ ${currentDisease.chemicalControlEn.dosagePer16LPump}`,
      actionTe: `${currentDisease.chemicalControlTe.chemicalName} (${currentDisease.chemicalControlTe.commercialBrands}) - ${currentDisease.chemicalControlTe.dosagePer16LPump}`,
      dosage: currentDisease.chemicalControlEn.dosagePer16LPump,
      scheduledDate: new Date().toISOString().split('T')[0],
      completed: false,
    });

    setTaskAddedSuccess(true);
    setTimeout(() => setTaskAddedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 border border-farm-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold mb-2">
            <ShieldAlert className="w-4 h-4 text-rose-600" />
            <span>{language === 'te' ? 'కృత్రిమ మేధస్సు (AI) పంట డాక్టర్' : 'AI Crop Doctor & Plant Clinic'}</span>
          </div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            {t.diagnostics.title}
          </h1>
          <p className="text-xs text-gray-600 mt-1 max-w-2xl">
            {t.diagnostics.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/fertilizer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-farm-600 hover:bg-farm-700 text-white text-xs font-bold shadow-xs transition-colors"
          >
            <span>{language === 'te' ? 'ఎరువుల లెక్కింపు →' : 'Fertilizer Calculator →'}</span>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Photo Upload & Symptom Questionnaire */}
        <div className="space-y-6">
          {/* Upload & Live Camera Card */}
          <div className="bg-white rounded-3xl p-6 border border-farm-200 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <Camera className="w-4 h-4 text-farm-600" />
                <span>{language === 'te' ? 'ఆకు ఫోటో స్కాన్' : 'Crop Leaf Scan'}</span>
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                AI Vision
              </span>
            </div>

            {photoPreview ? (
              <div className="space-y-3">
                <div className="relative rounded-2xl overflow-hidden border-2 border-emerald-500 shadow-xs">
                  <img
                    src={photoPreview}
                    alt="Uploaded or captured leaf"
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-bold text-emerald-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{language === 'te' ? 'స్కాన్ ఫోటో సిద్ధం' : 'Scan Image Ready'}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setCameraScannerOpen(true)}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-farm-600 hover:bg-farm-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>{language === 'te' ? 'మళ్ళీ ఫోటో తీయండి' : 'Retake with Camera'}</span>
                  </button>

                  <label className="py-2.5 px-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-colors">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{language === 'te' ? 'గ్యాలరీ' : 'Upload'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {/* Large Live Camera Button */}
                <button
                  type="button"
                  onClick={() => setCameraScannerOpen(true)}
                  className="w-full py-4 px-4 rounded-2xl bg-gradient-to-r from-farm-700 via-farm-600 to-emerald-600 hover:from-farm-800 hover:to-emerald-700 text-white text-xs font-black shadow-md hover:shadow-lg active:scale-98 transition-all flex flex-col items-center justify-center gap-2"
                >
                  <div className="p-3 rounded-full bg-white/20">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm">{language === 'te' ? '📷 కెమెరా తెరవండి (Live Camera)' : '📷 Open Camera & Scan Leaf'}</span>
                  <span className="text-[10px] font-normal text-farm-100">
                    {language === 'te' ? 'నేరుగా పొలం నుండి లైవ్ ఫోటో తీయండి' : 'Point device camera directly at damaged leaf'}
                  </span>
                </button>

                {/* File Dropzone alternative */}
                <label className="border-2 border-dashed border-farm-200 hover:border-farm-400 rounded-2xl p-4 text-center hover:bg-farm-50/50 transition-colors flex flex-col items-center cursor-pointer">
                  <Upload className="w-5 h-5 text-gray-500 mb-1" />
                  <span className="text-xs font-bold text-gray-800">
                    {language === 'te' ? 'లేదా గ్యాలరీ నుండి ఫోటో ఎంచుకోండి' : 'Or upload leaf photo from files'}
                  </span>
                  <span className="text-[10px] text-gray-500 mt-0.5">JPG, PNG supported</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
            )}

            {/* Quick Demo Sample Selector */}
            <div className="mt-4 pt-3 border-t border-gray-100">
              <span className="text-[11px] font-bold text-gray-500 block mb-2">
                {language === 'te' ? 'లక్ష్య తెగులు నమూనాలు (Quick Switch):' : 'Pre-loaded Clinical Diagnostic Cases:'}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {diseasesCatalog.map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => handleSimulateScan(d.id)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                      selectedDiseaseId === d.id
                        ? 'bg-rose-600 text-white shadow-xs font-bold'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {language === 'te' ? d.cropName : d.cropName.split(' ')[0]}: {d.diseaseNameEn.split('(')[0]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Observed Symptoms */}
          <div className="bg-white rounded-3xl p-6 border border-farm-200 shadow-sm">
            <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-amber-600" />
              <span>{t.diagnostics.selectSymptoms}</span>
            </h3>

            <div className="space-y-2">
              {(language === 'te' ? currentDisease.symptomsTe : currentDisease.symptomsEn).map((sym, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-amber-50/60 border border-amber-200/80 text-xs text-amber-950 font-medium flex items-start gap-2.5"
                >
                  <span className="w-2 h-2 rounded-full bg-amber-600 shrink-0 mt-1.5"></span>
                  <span>{sym}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 2 Columns: Clinical AI Diagnostic Prescription */}
        <div className="lg:col-span-2 space-y-6">
          {analyzing ? (
            <div className="bg-white rounded-3xl p-12 border border-farm-200 shadow-sm flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 border-4 border-rose-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <h3 className="text-base font-bold text-gray-900">
                {t.diagnostics.diagnosing}
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Deep neural vision model comparing visual symptoms with ICAR and ANGRAU disease registries...
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-farm-200 shadow-md space-y-6">
              {/* Assessment Top Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-gray-100">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 text-xs font-black uppercase">
                      {currentDisease.severity} SEVERITY
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-farm-100 text-farm-800 text-xs font-bold">
                      {currentDisease.pathogenType}
                    </span>
                  </div>
                  <h2 className="text-xl font-black text-gray-900">
                    {language === 'te' ? currentDisease.diseaseNameTe : currentDisease.diseaseNameEn}
                  </h2>
                  <p className="text-xs text-gray-500">
                    {language === 'te' ? currentDisease.diseaseNameEn : currentDisease.diseaseNameTe}
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-gray-400 block">
                    {t.diagnostics.confidence}
                  </span>
                  <span className="text-2xl font-black text-emerald-600">
                    {currentDisease.confidence}%
                  </span>
                </div>
              </div>

              {/* Chemical Prescription Box with Pump Dosage */}
              <div className="p-5 rounded-2xl bg-rose-50/80 border border-rose-200 space-y-3">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-rose-900">
                  <FlaskConical className="w-4 h-4 text-rose-600" />
                  <span>{t.diagnostics.chemicalTreatment}</span>
                </div>

                <div className="text-sm font-bold text-gray-900">
                  {language === 'te'
                    ? currentDisease.chemicalControlTe.chemicalName
                    : currentDisease.chemicalControlEn.chemicalName}
                </div>

                <div className="text-xs text-rose-900">
                  <span className="font-semibold">{language === 'te' ? 'మార్కెట్ బ్రాండ్లు:' : 'Popular Brands:'}</span>{' '}
                  <span className="font-black">
                    {language === 'te'
                      ? currentDisease.chemicalControlTe.commercialBrands
                      : currentDisease.chemicalControlEn.commercialBrands}
                  </span>
                </div>

                {/* Dosage Highlight Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-white border border-rose-200">
                    <span className="text-[10px] text-gray-500 font-bold uppercase block">
                      {t.diagnostics.dosagePump}
                    </span>
                    <span className="text-sm font-black text-rose-700 mt-0.5 block">
                      {language === 'te'
                        ? currentDisease.chemicalControlTe.dosagePer16LPump
                        : currentDisease.chemicalControlEn.dosagePer16LPump}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-rose-200">
                    <span className="text-[10px] text-gray-500 font-bold uppercase block">
                      {t.diagnostics.dosageAcre}
                    </span>
                    <span className="text-sm font-black text-gray-900 mt-0.5 block">
                      {language === 'te'
                        ? currentDisease.chemicalControlTe.dosagePerAcre
                        : currentDisease.chemicalControlEn.dosagePerAcre}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-rose-200">
                    <span className="text-[10px] text-gray-500 font-bold uppercase block">
                      {t.diagnostics.phiDays}
                    </span>
                    <span className="text-sm font-black text-amber-700 mt-0.5 block">
                      {currentDisease.chemicalControlEn.phiDays} Days Waiting
                    </span>
                  </div>
                </div>
              </div>

              {/* Organic & Bio-Control Solution */}
              <div className="p-5 rounded-2xl bg-emerald-50/80 border border-emerald-200 space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-emerald-900">
                  <Leaf className="w-4 h-4 text-emerald-600" />
                  <span>{t.diagnostics.organicTreatment}</span>
                </div>
                <p className="text-xs text-emerald-950 leading-relaxed font-medium">
                  {language === 'te'
                    ? currentDisease.organicControlTe
                    : currentDisease.organicControlEn}
                </p>
              </div>

              {/* Cultural Agronomic Measures */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                  {t.diagnostics.culturalPractices}
                </h4>
                <div className="space-y-1.5">
                  {(language === 'te'
                    ? currentDisease.culturalPracticesTe
                    : currentDisease.culturalPracticesEn
                  ).map((prac, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-gray-50 border border-gray-100 text-xs text-gray-800 flex items-start gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4 text-farm-600 shrink-0 mt-0.5" />
                      <span>{prac}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions Footer */}
              <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  {taskAddedSuccess && (
                    <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      {language === 'te'
                        ? 'నివారణ షెడ్యూల్‌లో చేర్చబడింది!'
                        : 'Added to treatment reminders!'}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleAddToSchedule}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md transition-all"
                  >
                    <Clock className="w-4 h-4" />
                    <span>{t.diagnostics.addToTreatmentPlan}</span>
                  </button>

                  <Link
                    href="/consult"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold shadow-md transition-all"
                  >
                    <span>{language === 'te' ? 'శాస్త్రవేత్త సలహా కోరండి' : 'Ask Agronomist'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Live HTML5 WebRTC Camera Scanner Modal */}
      <CameraScanner
        isOpen={cameraScannerOpen}
        onClose={() => setCameraScannerOpen(false)}
        onPhotoCaptured={handlePhotoCapturedFromCamera}
      />
    </div>
  );
}
