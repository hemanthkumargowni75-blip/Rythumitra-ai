'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Camera,
  Upload,
  Calendar,
  MapPin,
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  ArrowRight,
  Filter,
  Share2,
  FileText,
  UserCheck,
  X,
  Eye,
  RefreshCw,
  SlidersHorizontal,
} from 'lucide-react';
import {
  verifiedCropImages,
  CropImageRecord,
  getComparisonPair,
} from '@/data/cropImagesData';
import { useLanguage } from '@/context/LanguageContext';

export default function CropImagesGalleryPage() {
  const { language } = useLanguage();
  const isTe = language === 'te';

  // Filters
  const [selectedCrop, setSelectedCrop] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'gallery' | 'progression'>('gallery');

  // Modal inspection state
  const [activeImage, setActiveImage] = useState<CropImageRecord | null>(null);

  // Side-by-side progression group
  const progressionPair = useMemo(() => {
    return getComparisonPair('chilli-plot1-timeline');
  }, []);

  // Filtered images
  const filteredImages = useMemo(() => {
    return verifiedCropImages.filter((img) => {
      const matchCrop = selectedCrop === 'all' || img.cropId.toLowerCase() === selectedCrop.toLowerCase();
      const matchStatus = selectedStatus === 'all' || img.healthStatus === selectedStatus;
      return matchCrop && matchStatus;
    });
  }, [selectedCrop, selectedStatus]);

  // Status counts
  const stats = useMemo(() => {
    const total = verifiedCropImages.length;
    const infected = verifiedCropImages.filter((i) => i.healthStatus === 'INFECTED').length;
    const warning = verifiedCropImages.filter((i) => i.healthStatus === 'WARNING').length;
    const recovering = verifiedCropImages.filter((i) => i.healthStatus === 'RECOVERING').length;
    const healthy = verifiedCropImages.filter((i) => i.healthStatus === 'HEALTHY').length;
    return { total, infected, warning, recovering, healthy };
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-emerald-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2 rounded-xl text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
              title="Return to Dashboard"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-tight text-emerald-800">
                  {isTe ? 'నా పంట ఫోటోలు & తెగుళ్ల చరిత్ర' : 'My Crop Images Gallery'}
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                  <Sparkles className="w-3 h-3 text-emerald-600" />
                  AI Vision
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                {isTe
                  ? 'మీ పొలంలో తీసిన ఫోటోలు, AI రోగ నిర్ధారణలు & చికిత్సా పురోగతి చరిత్ర'
                  : 'Historical field scans, AI pathogen diagnoses & before/after recovery timelines'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/diagnostics?source=camera"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-sm transition-all active:scale-95"
            >
              <Camera className="w-4 h-4" />
              <span>{isTe ? 'కొత్త ఫోటో స్కాన్ 📷' : 'Scan New Crop 📷'}</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        {/* KPI Stats Strip */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-xs font-medium text-slate-500 block">
              {isTe ? 'మొత్తం స్కాన్‌లు' : 'Total Field Scans'}
            </span>
            <span className="text-2xl font-black text-slate-900">{stats.total}</span>
            <span className="text-[11px] text-slate-400 block mt-0.5">
              {isTe ? 'ధృవీకరించబడిన చిత్రాలు' : 'Verified scans saved'}
            </span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-rose-200 shadow-sm">
            <div className="flex items-center justify-between text-xs text-rose-600 font-semibold">
              <span>{isTe ? 'తెగుళ్లు గుర్తించినవి' : 'Active Infections'}</span>
              <AlertTriangle className="w-3.5 h-3.5" />
            </div>
            <span className="text-2xl font-black text-rose-600">{stats.infected}</span>
            <span className="text-[11px] text-rose-500 block mt-0.5">
              {isTe ? 'తక్షణ చర్య అవసరం' : 'Immediate spray needed'}
            </span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-blue-200 shadow-sm">
            <div className="flex items-center justify-between text-xs text-blue-600 font-semibold">
              <span>{isTe ? 'కోలుకుంటున్న పైరు' : 'In Recovery'}</span>
              <Clock className="w-3.5 h-3.5" />
            </div>
            <span className="text-2xl font-black text-blue-600">{stats.recovering}</span>
            <span className="text-[11px] text-blue-500 block mt-0.5">
              {isTe ? 'మందు పిచికారీ తర్వాత' : 'Post-treatment progress'}
            </span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-emerald-200 shadow-sm">
            <div className="flex items-center justify-between text-xs text-emerald-600 font-semibold">
              <span>{isTe ? 'ఆరోగ్యకరమైన పైరు' : '100% Healthy'}</span>
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
            <span className="text-2xl font-black text-emerald-600">{stats.healthy}</span>
            <span className="text-[11px] text-emerald-500 block mt-0.5">
              {isTe ? 'సరైన పెరుగుదల' : 'Optimal vigor & bloom'}
            </span>
          </div>
        </section>

        {/* View Mode Toggle: Gallery vs Progression Timeline */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('gallery')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'gallery'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Camera className="w-4 h-4" />
              <span>{isTe ? 'అన్ని పంట చిత్రాలు' : 'All Crop Scans'}</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-black/20 text-white">
                {filteredImages.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('progression')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'progression'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{isTe ? 'చికిత్సా పురోగతి (పోలిక)' : 'Before / After Recovery Progression'}</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-600 text-white font-bold">
                2 Scans
              </span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: ALL CROP SCANS GALLERY */}
        {/* ========================================================================= */}
        {activeTab === 'gallery' && (
          <div className="space-y-4">
            {/* Filter Bar */}
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap gap-2 items-center justify-between">
              {/* Crop Filter */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                <span className="text-xs font-bold text-slate-500 mr-1">
                  {isTe ? 'పంట:' : 'Crop:'}
                </span>
                {['all', 'chilli', 'paddy', 'cotton', 'tomato', 'turmeric'].map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedCrop(c)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase transition-colors ${
                      selectedCrop === c
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>

              {/* Health Status Filter */}
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-slate-500 mr-1">
                  {isTe ? 'స్థితి:' : 'Status:'}
                </span>
                {['all', 'INFECTED', 'WARNING', 'RECOVERING', 'HEALTHY'].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedStatus(s)}
                    className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                      selectedStatus === s
                        ? 'bg-slate-900 text-white shadow-sm'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {s === 'all' ? (isTe ? 'అన్నీ' : 'All') : s}
                  </button>
                ))}
              </div>
            </div>

            {/* Gallery Grid */}
            {filteredImages.length === 0 ? (
              <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-3">
                <div className="text-4xl">📷</div>
                <h3 className="text-lg font-bold text-slate-800">
                  {isTe ? 'చిత్రాలు ఏవీ లేవు' : 'No Images Match Your Filter'}
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  {isTe
                    ? 'ఎంచుకున్న ఫిల్టర్‌కు అనుగుణంగా పంట చిత్రాలు లేవు. దయచేసి ఫిల్టర్‌ను మార్చండి.'
                    : 'Try selecting a different crop or health status filter to view recorded field photos.'}
                </p>
                <button
                  onClick={() => {
                    setSelectedCrop('all');
                    setSelectedStatus('all');
                  }}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700"
                >
                  {isTe ? 'అన్ని ఫిల్టర్‌లను తీసివేయండి' : 'Clear Filters'}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredImages.map((scan) => {
                  const isInfected = scan.healthStatus === 'INFECTED';
                  const isRecovering = scan.healthStatus === 'RECOVERING';
                  const isHealthy = scan.healthStatus === 'HEALTHY';
                  const isWarning = scan.healthStatus === 'WARNING';

                  return (
                    <div
                      key={scan.id}
                      className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow"
                    >
                      <div>
                        {/* Image Preview Container */}
                        <div className="relative aspect-[4/3] bg-slate-900 overflow-hidden group">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={scan.imageUrl}
                            alt={scan.diagnosis.diseaseNameEn}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />

                          {/* Top floating badges */}
                          <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                            <span className="bg-black/60 backdrop-blur-md text-white px-2.5 py-1 rounded-lg text-[11px] font-semibold flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-emerald-400" />
                              {scan.displayDate}
                            </span>

                            <span
                              className={`px-2.5 py-1 rounded-lg text-[11px] font-black tracking-wide shadow-md ${
                                isInfected
                                  ? 'bg-rose-600 text-white'
                                  : isRecovering
                                  ? 'bg-blue-600 text-white'
                                  : isHealthy
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-amber-500 text-white'
                              }`}
                            >
                              {scan.healthStatus}
                            </span>
                          </div>

                          {/* Quick Inspect Button on Hover */}
                          <button
                            onClick={() => setActiveImage(scan)}
                            className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-bold text-sm"
                          >
                            <Eye className="w-5 h-5" />
                            <span>{isTe ? 'పూర్తి వివరాలు చూడండి' : 'Inspect Scan'}</span>
                          </button>
                        </div>

                        {/* Card Body */}
                        <div className="p-4 space-y-3">
                          {/* Plot & Crop header */}
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h3 className="text-base font-bold text-slate-900 leading-tight">
                                {isTe ? scan.cropNameTe : scan.cropNameEn}
                              </h3>
                              <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                                <MapPin className="w-3 h-3 text-emerald-600" />
                                <span>{scan.fieldPlot}</span>
                              </div>
                            </div>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                              {scan.source}
                            </span>
                          </div>

                          {/* Diagnosis Banner */}
                          <div
                            className={`p-3 rounded-xl border text-xs ${
                              isInfected
                                ? 'bg-rose-50 border-rose-200 text-rose-900'
                                : isRecovering
                                ? 'bg-blue-50 border-blue-200 text-blue-900'
                                : isHealthy
                                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                                : 'bg-amber-50 border-amber-200 text-amber-900'
                            }`}
                          >
                            <div className="flex items-center justify-between font-bold mb-1">
                              <span>{isTe ? scan.diagnosis.diseaseNameTe : scan.diagnosis.diseaseNameEn}</span>
                              <span className="text-[11px] font-extrabold bg-white/70 px-1.5 py-0.5 rounded">
                                {scan.diagnosis.confidence}% {isTe ? 'నిర్ధారణ' : 'Match'}
                              </span>
                            </div>
                            <p className="text-[11px] opacity-90 line-clamp-2">
                              {isTe ? scan.diagnosis.treatmentSummaryTe : scan.diagnosis.treatmentSummaryEn}
                            </p>
                          </div>

                          {/* Spray Recommendation Preview if any */}
                          {scan.diagnosis.sprayRecommendation && (
                            <div className="text-xs bg-slate-50 p-2 rounded-lg border border-slate-100 text-slate-700">
                              <span className="font-bold text-slate-900 mr-1">
                                {isTe ? 'సిఫార్సు చేసిన మందు:' : 'Rx Spray:'}
                              </span>
                              <span>{scan.diagnosis.sprayRecommendation}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Card Actions */}
                      <div className="p-4 pt-0 border-t border-slate-100 mt-2 flex items-center gap-2">
                        <button
                          onClick={() => setActiveImage(scan)}
                          className="flex-1 py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>{isTe ? 'చికిత్సా నివేదిక' : 'View Report'}</span>
                        </button>

                        <Link
                          href={`/consultation?crop=${scan.cropId}&issue=${encodeURIComponent(
                            scan.diagnosis.diseaseNameEn
                          )}`}
                          className="py-2 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-xl text-xs font-bold transition-colors flex items-center gap-1"
                          title="Consult agronomist regarding this scan"
                        >
                          <UserCheck className="w-3.5 h-3.5" />
                          <span>{isTe ? 'నిపుణులు' : 'Doctor'}</span>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: BEFORE / AFTER PROGRESSION COMPARISON */}
        {/* ========================================================================= */}
        {activeTab === 'progression' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-emerald-600" />
                    <span>{isTe ? 'చికిత్సా పురోగతి & రికవరీ పోలిక' : 'Field Recovery Progression (Day 1 vs Day 14)'}</span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {isTe
                      ? 'మందు పిచికారీకి ముందు మరియు తర్వాత ఆకుల పెరుగుదలను పక్కపక్కన పోల్చి చూడండి'
                      : 'Compare crop scans before and after chemical/organic control to track leaf renewal & pest eradication'}
                  </p>
                </div>

                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{isTe ? '85% తామర పురుగు తగ్గుదల' : '85% Thrips Reduction'}</span>
                </span>
              </div>

              {/* Side-by-Side Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                {/* Before Card */}
                {progressionPair[0] && (
                  <div className="bg-slate-50 rounded-2xl p-4 border border-rose-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold px-3 py-1 rounded-lg bg-rose-600 text-white uppercase tracking-wider">
                        {isTe ? 'మందు కొట్టక ముందు (DAY 1)' : 'BEFORE TREATMENT (DAY 1)'}
                      </span>
                      <span className="text-xs text-slate-500 font-semibold">
                        {progressionPair[0].displayDate}
                      </span>
                    </div>

                    <div className="aspect-[4/3] rounded-xl overflow-hidden bg-slate-900 relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={progressionPair[0].imageUrl}
                        alt="Before treatment"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-2 left-2 bg-rose-900/80 backdrop-blur text-white px-2.5 py-1 rounded-md text-xs font-bold">
                        {progressionPair[0].diagnosis.diseaseNameEn}
                      </div>
                    </div>

                    <div className="bg-white p-3 rounded-xl border border-rose-100 text-xs space-y-1.5">
                      <div className="font-bold text-rose-900">
                        {isTe ? 'గుర్తించిన సమస్యలు:' : 'Initial Diagnosis:'}
                      </div>
                      <ul className="list-disc list-inside text-slate-600 space-y-1">
                        {(isTe ? progressionPair[0].diagnosis.symptomsTe : progressionPair[0].diagnosis.symptomsEn).map(
                          (s, idx) => (
                            <li key={idx}>{s}</li>
                          )
                        )}
                      </ul>
                      <div className="pt-2 text-[11px] text-slate-500 font-medium">
                        <strong>{isTe ? 'చేపట్టిన చర్య:' : 'Applied Action:'}</strong>{' '}
                        {progressionPair[0].diagnosis.sprayRecommendation}
                      </div>
                    </div>
                  </div>
                )}

                {/* After Card */}
                {progressionPair[1] && (
                  <div className="bg-slate-50 rounded-2xl p-4 border border-emerald-300 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold px-3 py-1 rounded-lg bg-emerald-600 text-white uppercase tracking-wider">
                        {isTe ? 'మందు కొట్టిన 14 రోజుల తర్వాత' : '14 DAYS POST-TREATMENT'}
                      </span>
                      <span className="text-xs text-slate-500 font-semibold">
                        {progressionPair[1].displayDate}
                      </span>
                    </div>

                    <div className="aspect-[4/3] rounded-xl overflow-hidden bg-slate-900 relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={progressionPair[1].imageUrl}
                        alt="After treatment recovery"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-2 left-2 bg-emerald-900/80 backdrop-blur text-white px-2.5 py-1 rounded-md text-xs font-bold">
                        {progressionPair[1].diagnosis.diseaseNameEn}
                      </div>
                    </div>

                    <div className="bg-white p-3 rounded-xl border border-emerald-100 text-xs space-y-1.5">
                      <div className="font-bold text-emerald-900">
                        {isTe ? 'రికవరీ ఫలితం:' : 'Recovery Validation:'}
                      </div>
                      <ul className="list-disc list-inside text-slate-600 space-y-1">
                        {(isTe ? progressionPair[1].diagnosis.symptomsTe : progressionPair[1].diagnosis.symptomsEn).map(
                          (s, idx) => (
                            <li key={idx}>{s}</li>
                          )
                        )}
                      </ul>
                      <div className="pt-2 text-[11px] text-emerald-700 font-bold">
                        ✓ {isTe ? 'పూత మరియు కొత్త ఆకులు సాధారణ స్థితికి వచ్చాయి' : 'Floral canopy restored to 96% vigor'}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Full Inspection Modal */}
      {activeImage && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in duration-200 space-y-4">
            <button
              onClick={() => setActiveImage(null)}
              className="absolute right-4 top-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                {activeImage.fieldPlot}
              </span>
              <h3 className="text-xl font-black text-slate-900">
                {isTe ? activeImage.cropNameTe : activeImage.cropNameEn} ({activeImage.variety})
              </h3>
              <p className="text-xs text-slate-500">
                {isTe ? 'స్కాన్ తేదీ:' : 'Captured on:'} {activeImage.displayDate}
              </p>
            </div>

            {/* Image Preview */}
            <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-slate-900 relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activeImage.imageUrl}
                alt={activeImage.diagnosis.diseaseNameEn}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Diagnosis Details */}
            <div className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-900">
                  {isTe ? activeImage.diagnosis.diseaseNameTe : activeImage.diagnosis.diseaseNameEn}
                </span>
                <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-600 text-white">
                  {activeImage.diagnosis.confidence}% {isTe ? 'ఖచ్చితత్వం' : 'Confidence'}
                </span>
              </div>

              {/* Symptoms */}
              <div>
                <span className="text-xs font-bold text-slate-700 block mb-1">
                  {isTe ? 'లక్షణాలు:' : 'Observed Field Symptoms:'}
                </span>
                <ul className="list-disc list-inside text-xs text-slate-600 space-y-1">
                  {(isTe ? activeImage.diagnosis.symptomsTe : activeImage.diagnosis.symptomsEn).map((sym, i) => (
                    <li key={i}>{sym}</li>
                  ))}
                </ul>
              </div>

              {/* Treatment Recommendation */}
              <div className="pt-2 border-t border-emerald-200/60">
                <span className="text-xs font-bold text-emerald-900 block mb-1">
                  {isTe ? 'సిఫార్సు చేసిన చికిత్స:' : 'Prescribed Treatment Protocol:'}
                </span>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  {isTe ? activeImage.diagnosis.treatmentSummaryTe : activeImage.diagnosis.treatmentSummaryEn}
                </p>
              </div>

              {activeImage.diagnosis.sprayRecommendation && (
                <div className="bg-white p-3 rounded-xl border border-emerald-200 text-xs">
                  <span className="font-bold text-slate-900 block mb-0.5">
                    {isTe ? 'స్ప్రే మోతాదు & వాణిజ్య బ్రాండ్లు:' : 'Dosage & Recommended Formulation:'}
                  </span>
                  <span className="text-slate-700">{activeImage.diagnosis.sprayRecommendation}</span>
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <Link
                href={`/consultation?crop=${activeImage.cropId}`}
                className="w-full sm:flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md flex items-center justify-center gap-2 transition-all"
              >
                <UserCheck className="w-4 h-4" />
                <span>{isTe ? 'వ్యవసాయ శాస్త్రవేత్తతో మాట్లాడండి' : 'Consult Field Agronomist'}</span>
              </Link>

              <button
                onClick={() => {
                  alert(isTe ? 'నివేదిక PDF గా డౌన్‌లోడ్ చేయబడుతోంది...' : 'Downloading inspection report as PDF...');
                }}
                className="w-full sm:w-auto py-3 px-5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-colors"
              >
                <FileText className="w-4 h-4" />
                <span>{isTe ? 'రిపోర్ట్ డౌన్‌లోడ్' : 'Download PDF'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
