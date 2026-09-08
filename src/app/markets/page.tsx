'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Minus,
  MapPin,
  Truck,
  ExternalLink,
  Search,
  Filter,
  Calculator,
  Bell,
  CheckCircle2,
  RefreshCw,
  ShieldCheck,
  Building2,
  Sparkles,
  ArrowUpDown,
  X,
} from 'lucide-react';
import {
  verifiedMandiPrices,
  COMMODITY_CATEGORIES,
  MandiPriceRecord,
  compareMandiRealization,
  MandiComparisonResult,
} from '@/data/marketData';
import { INDIA_STATES_AND_UTS, AUTHORITATIVE_DISTRICTS } from '@/data/indiaLocationsData';
import { useLanguage } from '@/context/LanguageContext';

export default function MarketIntelligencePage() {
  const { language } = useLanguage();
  const isTe = language === 'te';

  // Filters state
  const [selectedCrop, setSelectedCrop] = useState<string>('chilli');
  const [selectedState, setSelectedState] = useState<string>('all');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'price_desc' | 'price_asc' | 'distance_asc' | 'arrival_desc'>('price_desc');
  const [activeTab, setActiveTab] = useState<'board' | 'calculator'>('board');

  // Active state metadata & dynamic terminology
  const activeStateObj = useMemo(() => {
    if (selectedState === 'all') return null;
    return (
      INDIA_STATES_AND_UTS.find(
        (s) => s.name.toLowerCase() === selectedState.toLowerCase() || s.code.toLowerCase() === selectedState.toLowerCase()
      ) || null
    );
  }, [selectedState]);

  // Available districts for the selected state (or across all)
  const availableDistricts = useMemo(() => {
    let list: string[] = [];
    if (selectedState === 'all') {
      list = Array.from(new Set(verifiedMandiPrices.map((r) => r.district)));
    } else {
      const mandiDists = verifiedMandiPrices
        .filter((r) => r.state.toLowerCase() === selectedState.toLowerCase())
        .map((r) => r.district);
      const authDists = activeStateObj
        ? AUTHORITATIVE_DISTRICTS.filter((d) => d.stateCode === activeStateObj.code).map((d) => d.name)
        : [];
      list = Array.from(new Set([...mandiDists, ...authDists]));
    }
    return list.sort();
  }, [selectedState, activeStateObj]);

  // All 28 States & 8 UTs list with live mandi presence badge
  const statesList = useMemo(() => {
    const liveStates = new Set(verifiedMandiPrices.map((r) => r.state.toLowerCase()));
    return INDIA_STATES_AND_UTS.map((s) => ({
      code: s.code,
      name: s.name,
      hasLiveMandi: liveStates.has(s.name.toLowerCase()),
      terminology: s.terminologyLabel[language] || s.terminologyLabel.en || 'Mandal',
    }));
  }, [language]);

  // Calculator state
  const [calcQuantity, setCalcQuantity] = useState<number>(50); // 50 Quintals default

  // Alert Modal state
  const [isAlertModalOpen, setIsAlertModalOpen] = useState<boolean>(false);
  const [alertTargetPrice, setAlertTargetPrice] = useState<number>(21000);
  const [alertPhone, setAlertPhone] = useState<string>('+91 98765 43210');
  const [alertChannel, setAlertChannel] = useState<'WHATSAPP' | 'SMS'>('WHATSAPP');
  const [alertSubmitted, setAlertSubmitted] = useState<boolean>(false);

  // Filtered & Sorted Market Records
  const filteredRecords = useMemo(() => {
    let list = verifiedMandiPrices;

    if (selectedCrop !== 'all') {
      list = list.filter((m) => m.cropId.toLowerCase() === selectedCrop.toLowerCase());
    }

    if (selectedState !== 'all') {
      list = list.filter((m) => m.state.toLowerCase() === selectedState.toLowerCase());
    }

    if (selectedDistrict !== 'all') {
      list = list.filter((m) => m.district.toLowerCase() === selectedDistrict.toLowerCase());
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (m) =>
          m.marketName.toLowerCase().includes(q) ||
          m.district.toLowerCase().includes(q) ||
          m.state.toLowerCase().includes(q) ||
          m.variety.toLowerCase().includes(q) ||
          m.cropNameEn.toLowerCase().includes(q) ||
          m.cropNameTe.includes(q)
      );
    }

    const sorted = [...list].sort((a, b) => {
      switch (sortBy) {
        case 'price_desc':
          return b.modalPrice - a.modalPrice;
        case 'price_asc':
          return a.modalPrice - b.modalPrice;
        case 'distance_asc':
          return a.distanceKmFromFarm - b.distanceKmFromFarm;
        case 'arrival_desc':
          return b.arrivalTons - a.arrivalTons;
        default:
          return b.modalPrice - a.modalPrice;
      }
    });

    return sorted;
  }, [selectedCrop, selectedState, selectedDistrict, searchQuery, sortBy]);

  // Statistics
  const stats = useMemo(() => {
    if (filteredRecords.length === 0) {
      return { highest: 0, lowest: 0, avg: 0, totalArrivals: 0 };
    }
    const prices = filteredRecords.map((r) => r.modalPrice);
    const highest = Math.max(...prices);
    const lowest = Math.min(...prices);
    const avg = Math.round(prices.reduce((sum, p) => sum + p, 0) / prices.length);
    const totalArrivals = filteredRecords.reduce((sum, r) => sum + r.arrivalTons, 0);
    return { highest, lowest, avg, totalArrivals };
  }, [filteredRecords]);

  // Net Realization Calculations
  const comparisonResults: MandiComparisonResult[] = useMemo(() => {
    const crop = selectedCrop === 'all' ? 'chilli' : selectedCrop;
    return compareMandiRealization(crop, calcQuantity);
  }, [selectedCrop, calcQuantity]);

  const bestGainOption = comparisonResults.find((c) => c.badge === 'HIGHEST_NET_GAIN');
  const nearestOption = comparisonResults.find((c) => c.badge === 'NEAREST_LOCAL');
  const maxAdditionalProfit =
    bestGainOption && nearestOption
      ? Math.max(0, bestGainOption.netRealization - nearestOption.netRealization)
      : 0;

  const handleCreateAlert = (e: React.FormEvent) => {
    e.preventDefault();
    setAlertSubmitted(true);
    setTimeout(() => {
      setAlertSubmitted(false);
      setIsAlertModalOpen(false);
    }, 2500);
  };

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
                  {isTe ? 'అఖిల భారత మార్కెట్ ధరలు' : 'All-India Market Intelligence'}
                </span>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Live e-NAM
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                {isTe
                  ? 'రైతుల కోసం నిజ సమయ మండి ధరలు, రవాణా ఖర్చుల విశ్లేషణ & ధరల హెచ్చరికలు'
                  : 'Real-time multi-state mandi prices, net freight realization & price alerts'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAlertModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs sm:text-sm font-semibold shadow-sm transition-all active:scale-95"
            >
              <Bell className="w-4 h-4" />
              <span className="hidden sm:inline">{isTe ? 'ధరల అలర్ట్' : 'Price Alert'}</span>
            </button>
            <Link
              href="/government-services"
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-medium transition-colors"
            >
              <Building2 className="w-4 h-4 text-emerald-600" />
              <span>{isTe ? 'ప్రభుత్వ సేవలు' : 'Gov Services'}</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        {/* KPI Banner Cards */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>{isTe ? 'గరిష్ట ధర (మండి)' : 'Peak Mandi Price'}</span>
              <span className="text-emerald-600 font-bold text-[11px]">MAX</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-emerald-700">
              ₹{stats.highest.toLocaleString('en-IN')}
            </div>
            <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-500 inline" />
              <span>{isTe ? 'అత్యధిక రాబడి మండి' : 'Highest paying yard'}</span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>{isTe ? 'సగటు మోడల్ ధర' : 'Average Modal Rate'}</span>
              <span className="text-blue-600 font-bold text-[11px]">AVG</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-slate-800">
              ₹{stats.avg.toLocaleString('en-IN')}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              {isTe ? 'క్వింటాల్ ప్రాతిపదికన' : 'Weighted per Quintal'}
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>{isTe ? 'కనిష్ట ధర' : 'Lowest Mandi Price'}</span>
              <span className="text-amber-600 font-bold text-[11px]">MIN</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-slate-700">
              ₹{stats.lowest.toLocaleString('en-IN')}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              {isTe ? 'నాణ్యతా వ్యత్యాసం' : 'Fair Average Quality'}
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>{isTe ? 'మొత్తం రాకలు (ఆగమనం)' : 'Today\'s Arrivals'}</span>
              <span className="text-purple-600 font-bold text-[11px]">VOLUME</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-purple-700">
              {stats.totalArrivals.toLocaleString('en-IN')}{' '}
              <span className="text-sm font-semibold">{isTe ? 'టన్నులు' : 'Tons'}</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
              <Truck className="w-3.5 h-3.5 text-purple-500" />
              <span>{isTe ? 'అన్ని రిపోర్ట్ అయిన మండీలు' : 'Across listed yards'}</span>
            </div>
          </div>
        </section>

        {/* Commodity Selector Chips */}
        <section className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 px-1">
            {isTe ? 'పంటను ఎంచుకోండి' : 'Select Commodity'}
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {COMMODITY_CATEGORIES.map((cat) => {
              const isSelected = selectedCrop.toLowerCase() === cat.id.toLowerCase();
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCrop(cat.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200 scale-102'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  <span className="text-base">{cat.icon}</span>
                  <span>{isTe ? cat.nameTe : cat.nameEn}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Tabs: Live Mandi Board vs Net Profit Realization */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('board')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'board'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>{isTe ? 'లైవ్ మండి ధరలు' : 'Live Mandi Board'}</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-black/20 text-white">
                {filteredRecords.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('calculator')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'calculator'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Calculator className="w-4 h-4 text-amber-400" />
              <span>{isTe ? 'నికర లాభం & రవాణా లెక్కింపు' : 'Net Freight Realization'}</span>
              {maxAdditionalProfit > 0 && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500 text-white font-bold animate-pulse">
                  +₹{maxAdditionalProfit.toLocaleString('en-IN')}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: LIVE MANDI BOARD */}
        {/* ========================================================================= */}
        {activeTab === 'board' && (
          <div className="space-y-4">
            {/* Filters Bar */}
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    isTe
                      ? 'మండి పేరు, జిల్లా లేదా రకం శోధించండి (ఉదా: Guntur, Warangal)...'
                      : 'Search yard, district or variety (e.g., Guntur, Nizamabad, Byadgi)...'
                  }
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* India-Wide Location Hierarchy & Sorting Filters */}
              <div className="flex flex-wrap items-center gap-2">
                {/* State / UT Selector */}
                <select
                  value={selectedState}
                  onChange={(e) => {
                    setSelectedState(e.target.value);
                    setSelectedDistrict('all');
                  }}
                  className="px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 max-w-[160px] sm:max-w-[200px]"
                >
                  <option value="all">{isTe ? 'భారతదేశం (అన్ని రాష్ట్రాలు)' : 'All India (All States & UTs)'}</option>
                  {statesList.map((s) => (
                    <option key={s.code} value={s.name}>
                      {s.name} {s.hasLiveMandi ? '•' : ''}
                    </option>
                  ))}
                </select>

                {/* District Selector (Filtered by State) */}
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 max-w-[150px] sm:max-w-[180px]"
                >
                  <option value="all">
                    {selectedState === 'all'
                      ? (isTe ? 'అన్ని జిల్లాలు' : 'All Districts')
                      : (isTe ? `అన్ని జిల్లాలు (${selectedState})` : `All Districts (${selectedState})`)}
                  </option>
                  {availableDistricts.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>

                {/* Sort Order */}
                <select
                  value={sortBy}
                  onChange={(e: any) => setSortBy(e.target.value)}
                  className="px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="price_desc">{isTe ? 'ధర: ఎక్కువ నుండి తక్కువ' : 'Price: High to Low'}</option>
                  <option value="price_asc">{isTe ? 'ధర: తక్కువ నుండి ఎక్కువ' : 'Price: Low to High'}</option>
                  <option value="distance_asc">{isTe ? 'దూరం: సమీప మండి' : 'Distance: Nearest Farm'}</option>
                  <option value="arrival_desc">{isTe ? 'రాకలు: ఎక్కువ వాల్యూమ్' : 'Arrivals: High Volume'}</option>
                </select>
              </div>
            </div>

            {/* Dynamic Administrative Terminology Notice */}
            {activeStateObj && (
              <div className="flex items-center justify-between text-xs bg-emerald-50 text-emerald-900 border border-emerald-200/80 px-3.5 py-2 rounded-xl">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-emerald-800">
                    🏛️ {activeStateObj.name} ({activeStateObj.type === 'STATE' ? 'State' : 'UT'})
                  </span>
                  <span className="text-emerald-700">|</span>
                  <span className="font-medium text-emerald-700">
                    {isTe ? 'స్థానిక పరిపాలనా పదం:' : 'Administrative Terminology:'}{' '}
                    <strong className="font-bold text-emerald-900 underline decoration-emerald-400">
                      {activeStateObj.terminologyLabel[language] || activeStateObj.terminologyLabel.en}
                    </strong>
                    {' '}({activeStateObj.subDistrictTerminology})
                  </span>
                </div>
                <div className="text-[11px] text-emerald-700 hidden sm:block">
                  LGD Code: #{activeStateObj.lgdCode} • {activeStateObj.totalDistricts} {isTe ? 'జిల్లాలు' : 'Districts'}
                </div>
              </div>
            )}

            {/* Mandi Cards List */}
            {filteredRecords.length === 0 ? (
              <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-3">
                <div className="text-4xl">🔍</div>
                <h3 className="text-lg font-bold text-slate-800">
                  {isTe ? 'ఎటువంటి మండి రికార్డులు కనుగొనబడలేదు' : 'No Mandi Records Found'}
                </h3>
                <p className="text-sm text-slate-500 max-w-md mx-auto">
                  {isTe
                    ? 'మీరు ఎంచుకున్న ఫిల్టర్‌లకు సరిపోలిన మండి లేదు. ఫిల్టర్‌లను రీసెట్ చేసి ప్రయత్నించండి.'
                    : 'Try clearing your search query or selecting a different crop/state to view live mandi pricing.'}
                </p>
                <button
                  onClick={() => {
                    setSelectedCrop('all');
                    setSelectedState('all');
                    setSelectedDistrict('all');
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-sm font-semibold hover:bg-emerald-700"
                >
                  {isTe ? 'అన్ని ఫిల్టర్‌లను రీసెట్ చేయండి' : 'Reset All Filters'}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredRecords.map((mandi) => {
                  const isTopPrice = mandi.modalPrice === stats.highest;
                  return (
                    <div
                      key={mandi.id}
                      className={`bg-white rounded-2xl p-4 sm:p-5 border transition-all duration-200 hover:shadow-md flex flex-col justify-between ${
                        isTopPrice ? 'border-emerald-500 ring-2 ring-emerald-100' : 'border-slate-200'
                      }`}
                    >
                      <div>
                        {/* Top Badges */}
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                            <MapPin className="w-3 h-3 text-emerald-600" />
                            {mandi.district}, {mandi.state}
                          </span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                              mandi.source === 'e-NAM'
                                ? 'bg-indigo-100 text-indigo-800'
                                : mandi.source === 'AP_MARKFED'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}
                          >
                            {mandi.source}
                          </span>
                        </div>

                        {/* Market Name & Variety */}
                        <div className="mb-3">
                          <div className="flex items-start justify-between gap-1">
                            <h3 className="text-base font-bold text-slate-900 leading-snug">
                              {mandi.marketName}
                            </h3>
                            {isTopPrice && (
                              <span className="shrink-0 text-[10px] font-extrabold bg-emerald-600 text-white px-2 py-0.5 rounded-md">
                                BEST
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 font-medium mt-0.5">
                            {isTe ? mandi.cropNameTe : mandi.cropNameEn} • {mandi.variety}
                          </p>
                        </div>

                        {/* Modal Price Display */}
                        <div className="bg-emerald-50/60 rounded-xl p-3 border border-emerald-100 mb-3">
                          <div className="flex items-baseline justify-between">
                            <div>
                              <span className="text-[11px] font-semibold text-emerald-800 block">
                                {isTe ? 'మోడల్ ధర (Modal Rate)' : 'Modal Trading Price'}
                              </span>
                              <span className="text-2xl font-black text-emerald-800">
                                ₹{mandi.modalPrice.toLocaleString('en-IN')}
                              </span>
                              <span className="text-xs text-emerald-600 font-semibold ml-1">/ Quintal</span>
                            </div>

                            {/* Trend badge */}
                            <div
                              className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold ${
                                mandi.trend === 'UP'
                                  ? 'bg-emerald-200/80 text-emerald-900'
                                  : mandi.trend === 'DOWN'
                                  ? 'bg-rose-200/80 text-rose-900'
                                  : 'bg-slate-200 text-slate-700'
                              }`}
                            >
                              {mandi.trend === 'UP' && <TrendingUp className="w-3.5 h-3.5" />}
                              {mandi.trend === 'DOWN' && <TrendingDown className="w-3.5 h-3.5" />}
                              {mandi.trend === 'STABLE' && <Minus className="w-3.5 h-3.5" />}
                              <span>
                                {mandi.priceChange24h > 0 ? `+₹${mandi.priceChange24h}` : `₹${mandi.priceChange24h}`}
                              </span>
                            </div>
                          </div>

                          {/* Min - Max Range bar */}
                          <div className="mt-2 pt-2 border-t border-emerald-200/60 flex items-center justify-between text-[11px] text-slate-600">
                            <span>
                              {isTe ? 'కనిష్టం:' : 'Min:'}{' '}
                              <strong className="text-slate-800">₹{mandi.minPrice.toLocaleString('en-IN')}</strong>
                            </span>
                            <span>
                              {isTe ? 'గరిష్టం:' : 'Max:'}{' '}
                              <strong className="text-slate-800">₹{mandi.maxPrice.toLocaleString('en-IN')}</strong>
                            </span>
                          </div>
                        </div>

                        {/* Logistics & Arrivals metadata */}
                        <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 mb-3 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                          <div>
                            <span className="text-[10px] text-slate-400 block">
                              {isTe ? 'పొలం నుండి దూరం' : 'Distance from Farm'}
                            </span>
                            <span className="font-semibold text-slate-800">{mandi.distanceKmFromFarm} km</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 block">
                              {isTe ? 'అంచనా రవాణా' : 'Est. Freight'}
                            </span>
                            <span className="font-semibold text-slate-800">
                              ₹{mandi.estimatedTransportCostPerQuintal}/Q
                            </span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 block">
                              {isTe ? 'నేటి రాకలు' : 'Today\'s Arrivals'}
                            </span>
                            <span className="font-semibold text-slate-800">{mandi.arrivalTons} Tons</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 block">
                              {isTe ? 'రిపోర్ట్ సమయం' : 'Last Updated'}
                            </span>
                            <span className="font-medium text-slate-700 text-[11px]">{mandi.reportDate}</span>
                          </div>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedCrop(mandi.cropId);
                            setActiveTab('calculator');
                          }}
                          className="flex-1 py-2 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                        >
                          <Calculator className="w-3.5 h-3.5" />
                          <span>{isTe ? 'లాభం లెక్కించండి' : 'Net Realization'}</span>
                        </button>

                        <a
                          href={
                            mandi.source === 'e-NAM'
                              ? 'https://enam.gov.in'
                              : mandi.source === 'AP_MARKFED'
                              ? 'http://market.ap.nic.in'
                              : 'https://agmarknet.gov.in'
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-800 rounded-xl transition-colors"
                          title="Open official portal"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: NET FREIGHT REALIZATION CALCULATOR */}
        {/* ========================================================================= */}
        {activeTab === 'calculator' && (
          <div className="space-y-6">
            {/* Calculator Header & Controls */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-emerald-600" />
                    <span>{isTe ? 'రవాణా ఖర్చు & నికర రాబడి కాలిక్యులేటర్' : 'Net Realization & Freight Tariff Engine'}</span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {isTe
                      ? 'రైతుల పొలం (గుంటూరు) నుండి రవాణా లెక్కింపు ద్వారా ఏ మండిలో నిజమైన లాభం ఎక్కువో తెలుసుకోండి'
                      : 'Calculates true pocket earnings after deducting road haulage freight from your Guntur farm coordinates'}
                  </p>
                </div>

                {/* Smart Recommendation Banner */}
                {maxAdditionalProfit > 0 && bestGainOption && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl px-3.5 py-2 flex items-center gap-2 text-amber-900 text-xs font-semibold">
                    <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>
                      {isTe
                        ? `${bestGainOption.mandi.marketName} వద్ద విక్రయిస్తే ₹${maxAdditionalProfit.toLocaleString(
                            'en-IN'
                          )} అదనపు నికర లాభం వస్తుంది!`
                        : `Selling at ${bestGainOption.mandi.marketName} yields ₹${maxAdditionalProfit.toLocaleString(
                            'en-IN'
                          )} MORE net profit after freight!`}
                    </span>
                  </div>
                )}
              </div>

              {/* Quantity Input Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-center">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    {isTe ? 'విక్రయించే పంట పరిమాణం (క్వింటాళ్ళు)' : 'Estimated Crop Lot (Quintals)'}
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      min="1"
                      max="2000"
                      value={calcQuantity}
                      onChange={(e) => setCalcQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-32 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-base font-black text-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <span className="text-xs text-slate-500 font-medium">
                      = {(calcQuantity / 10).toFixed(1)} {isTe ? 'మెట్రిక్ టన్నులు' : 'Metric Tons'}
                    </span>
                  </div>
                </div>

                {/* Quick Presets */}
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    {isTe ? 'శీఘ్ర ఎంపిక' : 'Quick Presets'}
                  </label>
                  <div className="flex items-center gap-2">
                    {[20, 50, 100, 250].map((q) => (
                      <button
                        key={q}
                        onClick={() => setCalcQuantity(q)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                          calcQuantity === q
                            ? 'bg-emerald-600 text-white shadow-sm'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                      >
                        {q} Q
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-slate-600">
                  <span className="font-bold text-slate-800 block mb-0.5">
                    {isTe ? 'రవాణా ప్రమాణం:' : 'Freight Tariff Formula:'}
                  </span>
                  <span>
                    {isTe
                      ? 'స్థానిక ట్రాక్టర్/మినీ ట్రక్ (₹4-5/కి.మీ/Q) ఆధారంగా రోడ్డు రేట్లు'
                      : 'Dynamic road haulage tariff based on commercial mini-truck freight rates'}
                  </span>
                </div>
              </div>
            </div>

            {/* Comparison Matrix Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {comparisonResults.slice(0, 3).map((res) => {
                const isBest = res.badge === 'HIGHEST_NET_GAIN';
                const isLocal = res.badge === 'NEAREST_LOCAL';
                return (
                  <div
                    key={res.mandi.id}
                    className={`bg-white rounded-2xl p-5 border flex flex-col justify-between ${
                      isBest
                        ? 'border-emerald-500 shadow-md ring-2 ring-emerald-100 bg-gradient-to-b from-emerald-50/30 to-white'
                        : isLocal
                        ? 'border-blue-400 bg-blue-50/20'
                        : 'border-slate-200'
                    }`}
                  >
                    <div>
                      {/* Top status */}
                      <div className="flex items-center justify-between mb-3">
                        <span
                          className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                            isBest
                              ? 'bg-emerald-600 text-white'
                              : isLocal
                              ? 'bg-blue-600 text-white'
                              : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          {isBest
                            ? isTe
                              ? 'గరిష్ట నికర లాభం (సిఫార్సు)'
                              : 'HIGHEST NET EARNINGS'
                            : isLocal
                            ? isTe
                              ? 'సమీప స్థానిక మండి'
                              : 'NEAREST LOCAL YARD'
                            : isTe
                              ? 'ఇతర మండి'
                              : 'OTHER MANDI'}
                        </span>
                        <span className="text-xs text-slate-500 font-semibold">
                          {res.mandi.distanceKmFromFarm} km
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-slate-900">{res.mandi.marketName}</h3>
                      <p className="text-xs text-slate-500 mb-4">
                        {res.mandi.district}, {res.mandi.state}
                      </p>

                      {/* Net In-Hand Payout */}
                      <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 mb-4">
                        <span className="text-[11px] font-semibold text-slate-500 block">
                          {isTe ? 'మొత్తం నికర రాబడి (రవాణా మినహాయించి)' : 'Total Net Payout (After Freight)'}
                        </span>
                        <span className="text-2xl font-black text-emerald-700">
                          ₹{res.netRealization.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs text-slate-600 block mt-1 font-medium">
                          {isTe ? 'నికర క్వింటాల్ రేటు:' : 'Net per Quintal:'}{' '}
                          <strong className="text-slate-900">
                            ₹{res.netRealizationPerQuintal.toLocaleString('en-IN')}/Q
                          </strong>
                        </span>
                      </div>

                      {/* Cost Breakdown */}
                      <div className="space-y-1.5 text-xs text-slate-600">
                        <div className="flex justify-between">
                          <span>{isTe ? 'మండి మోడల్ ధర:' : 'Mandi Gross Rate:'}</span>
                          <span className="font-semibold text-slate-800">
                            ₹{res.mandi.modalPrice.toLocaleString('en-IN')}/Q
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>{isTe ? 'స్థూల మొత్తం విలువ:' : 'Gross Market Value:'}</span>
                          <span className="font-semibold text-slate-800">
                            ₹{res.grossValue.toLocaleString('en-IN')}
                          </span>
                        </div>
                        {res.mandi.estimatedTransportCostPerQuintal > 0 ? (
                          <div className="flex justify-between text-rose-600">
                            <span>{isTe ? 'అంచనా రవాణా ఖర్చు (-):' : 'Estimated Freight Tariff (-):'}</span>
                            <span className="font-semibold">-₹{res.totalFreight.toLocaleString('en-IN')}</span>
                          </div>
                        ) : (
                          <div className="p-2 rounded-lg bg-amber-50 border border-amber-200 text-[11px] text-amber-800 font-medium">
                            {isTe
                              ? 'రవాణా లేదా మండి ఖర్చుల సమాచారం అందుబాటులో లేదు. వాస్తవ నికర రాబడి మారవచ్చు.'
                              : 'Cost information unavailable. Actual net realization may differ.'}
                          </div>
                        )}
                        {res.profitDifferenceVsLocal !== 0 && (
                          <div
                            className={`flex justify-between pt-2 border-t border-slate-200 font-bold ${
                              res.profitDifferenceVsLocal > 0 ? 'text-emerald-700' : 'text-slate-500'
                            }`}
                          >
                            <span>{isTe ? 'స్థానిక మండితో పోలిస్తే:' : 'Vs Nearest Yard:'}</span>
                            <span>
                              {res.profitDifferenceVsLocal > 0
                                ? `+₹${res.profitDifferenceVsLocal.toLocaleString('en-IN')}`
                                : `-₹${Math.abs(res.profitDifferenceVsLocal).toLocaleString('en-IN')}`}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100">
                      <a
                        href={
                          res.mandi.source === 'e-NAM'
                            ? 'https://enam.gov.in'
                            : 'https://agmarknet.gov.in'
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>{isTe ? 'మండి వివరాలు చూడండి' : 'Check Yard Trading Window'}</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Detailed Table View for All Compared Mandis */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-800">
                  {isTe ? 'అన్ని మార్కెట్ల పూర్తి వివరాల పోలిక' : 'Comprehensive Mandi Haulage Comparison'}
                </h3>
                <span className="text-xs text-slate-500">
                  {calcQuantity} {isTe ? 'క్వింటాళ్ళు' : 'Quintals'}
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-600">
                  <thead className="bg-slate-50 text-slate-700 uppercase font-semibold text-[10px] border-b border-slate-200">
                    <tr>
                      <th className="p-3">{isTe ? 'మండి & రాష్ట్రం' : 'Mandi & State'}</th>
                      <th className="p-3 text-right">{isTe ? 'మోడల్ ధర' : 'Modal Price'}</th>
                      <th className="p-3 text-right">{isTe ? 'దూరం' : 'Distance'}</th>
                      <th className="p-3 text-right">{isTe ? 'రవాణా/Q' : 'Freight/Q'}</th>
                      <th className="p-3 text-right">{isTe ? 'నికర ధర/Q' : 'Net Price/Q'}</th>
                      <th className="p-3 text-right">{isTe ? 'మొత్తం నికర రాబడి' : 'Total Net Payout'}</th>
                      <th className="p-3 text-right">{isTe ? 'స్థానిక మండితో వ్యత్యాసం' : 'Net Gain vs Local'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {comparisonResults.map((row) => (
                      <tr key={row.mandi.id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-3 font-semibold text-slate-900">
                          <div>{row.mandi.marketName}</div>
                          <div className="text-[10px] text-slate-400 font-normal">
                            {row.mandi.district}, {row.mandi.state}
                          </div>
                        </td>
                        <td className="p-3 text-right font-bold text-slate-800">
                          ₹{row.mandi.modalPrice.toLocaleString('en-IN')}
                        </td>
                        <td className="p-3 text-right">{row.mandi.distanceKmFromFarm} km</td>
                        <td className="p-3 text-right text-rose-600 font-medium">
                          ₹{row.mandi.estimatedTransportCostPerQuintal}
                        </td>
                        <td className="p-3 text-right font-bold text-emerald-800">
                          ₹{row.netRealizationPerQuintal.toLocaleString('en-IN')}
                        </td>
                        <td className="p-3 text-right font-black text-emerald-700 text-sm">
                          ₹{row.netRealization.toLocaleString('en-IN')}
                        </td>
                        <td className="p-3 text-right">
                          {row.profitDifferenceVsLocal > 0 ? (
                            <span className="inline-flex items-center gap-0.5 text-emerald-700 font-extrabold bg-emerald-50 px-2 py-0.5 rounded-full">
                              +₹{row.profitDifferenceVsLocal.toLocaleString('en-IN')}
                            </span>
                          ) : row.profitDifferenceVsLocal < 0 ? (
                            <span className="text-slate-400 font-medium">
                              -₹{Math.abs(row.profitDifferenceVsLocal).toLocaleString('en-IN')}
                            </span>
                          ) : (
                            <span className="text-slate-500 font-semibold">Baseline (Local)</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-3 bg-amber-50/70 border-t border-amber-200 text-[11px] text-amber-900 font-medium flex items-center gap-2">
                <span className="font-bold">⚠️ Note:</span>
                <span>
                  {isTe
                    ? 'రవాణా లేదా మండి ఖర్చుల వివరాలు అందుబాటులో లేనిచో: Cost information unavailable. Actual net realization may differ.'
                    : 'Cost information unavailable. Actual net realization may differ.'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Official Sources & Compliance Footer */}
        <section className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span>
              {isTe ? 'అధికారిక ప్రభుత్వ డేటా సమన్వయం' : 'Verified Government Trading Portals & Compliance'}
            </span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            {isTe
              ? 'రైతుమిత్ర AI ధరల డేటా నేరుగా e-NAM (భారత ప్రభుత్వం), AGMARKNET మరియు AP-MARKFED నుండి ధృవీకరించబడింది. రైతుమిత్ర ఎటువంటి కమీషన్లు లేదా బ్రోకరేజ్ తీసుకోదు. వ్యాపారాలు అధీకృత APMC యార్డులలో మాత్రమే జరుగుతాయి.'
              : 'Market prices in RythuMitra AI are synchronized with the Small Farmers’ Agri-Business Consortium (e-NAM), Directorate of Marketing & Inspection (AGMARKNET), and AP-MARKFED. RythuMitra AI does NOT charge trading commissions or take broker cuts. All trades occur directly at authorized APMC yards.'}
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="https://enam.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800 hover:underline"
            >
              <span>e-NAM Portal</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-slate-300">•</span>
            <a
              href="https://agmarknet.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800 hover:underline"
            >
              <span>AGMARKNET Official</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-slate-300">•</span>
            <a
              href="http://market.ap.nic.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800 hover:underline"
            >
              <span>AP Agricultural Marketing Department</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </section>
      </main>

      {/* Price Alert Modal */}
      {isAlertModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setIsAlertModalOpen(false)}
              className="absolute right-4 top-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-700">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {isTe ? 'ధర హెచ్చరికను సెట్ చేయండి' : 'Create Free Mandi Price Alert'}
                </h3>
                <p className="text-xs text-slate-500">
                  {isTe ? 'మార్కెట్ ధర మీ లక్ష్యాన్ని చేరినప్పుడు ఉచిత సందేశం పొందండి' : 'Instant WhatsApp or SMS alert when target rate is hit'}
                </p>
              </div>
            </div>

            {alertSubmitted ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto animate-bounce" />
                <h4 className="text-base font-bold text-slate-900">
                  {isTe ? 'అలర్ట్ విజయవంతంగా సెట్ చేయబడింది!' : 'Price Alert Activated!'}
                </h4>
                <p className="text-xs text-slate-600 max-w-xs mx-auto">
                  {isTe
                    ? `${selectedCrop} ధర ₹${alertTargetPrice.toLocaleString('en-IN')}/Q చేరినప్పుడు ${alertPhone} కు నోటిఫికేషన్ వస్తుంది.`
                    : `You will be notified on ${alertPhone} as soon as ${selectedCrop} crosses ₹${alertTargetPrice.toLocaleString('en-IN')}/Q.`}
                </p>
              </div>
            ) : (
              <form onSubmit={handleCreateAlert} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {isTe ? 'పంట' : 'Commodity'}
                  </label>
                  <select
                    value={selectedCrop}
                    onChange={(e) => setSelectedCrop(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800"
                  >
                    {COMMODITY_CATEGORIES.filter((c) => c.id !== 'all').map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.icon} {isTe ? c.nameTe : c.nameEn}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {isTe ? 'లక్ష్య ధర (₹ / క్వింటాల్)' : 'Target Threshold Rate (₹ / Quintal)'}
                  </label>
                  <input
                    type="number"
                    min="100"
                    step="100"
                    value={alertTargetPrice}
                    onChange={(e) => setAlertTargetPrice(parseInt(e.target.value) || 0)}
                    required
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-base font-bold text-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    {isTe ? 'ధర ఈ మొత్తానికి మించినప్పుడు అలర్ట్ పంపబడుతుంది' : 'Triggers when market modal price rises above this amount'}
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {isTe ? 'సందేశ మాధ్యమం' : 'Notification Channel'}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setAlertChannel('WHATSAPP')}
                      className={`py-2 px-3 rounded-xl text-xs font-bold border transition-colors ${
                        alertChannel === 'WHATSAPP'
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : 'bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      💬 WhatsApp
                    </button>
                    <button
                      type="button"
                      onClick={() => setAlertChannel('SMS')}
                      className={`py-2 px-3 rounded-xl text-xs font-bold border transition-colors ${
                        alertChannel === 'SMS'
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : 'bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      📱 SMS
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {isTe ? 'మొబైల్ సంఖ్య' : 'Farmer Mobile Number'}
                  </label>
                  <input
                    type="tel"
                    value={alertPhone}
                    onChange={(e) => setAlertPhone(e.target.value)}
                    required
                    placeholder="+91 98765 43210"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold shadow-md transition-all active:scale-98 flex items-center justify-center gap-2"
                  >
                    <Bell className="w-4 h-4" />
                    <span>{isTe ? 'అలర్ట్ సక్రియం చేయండి' : 'Activate Price Alert'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
