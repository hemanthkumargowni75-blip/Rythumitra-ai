'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Building2,
  ExternalLink,
  ShieldCheck,
  Search,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Sparkles,
  ArrowRight,
  Filter,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import {
  getAllGovernmentServices,
  GovServiceCategory,
  GovernmentServiceItem,
} from '@/data/governmentServicesData';

export default function GovernmentServicesPage() {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<GovServiceCategory>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const allServices = getAllGovernmentServices();

  const categories: Array<{ id: GovServiceCategory; labelEn: string; labelTe: string; icon: string }> = [
    { id: 'ALL', labelEn: 'All Services (9)', labelTe: 'అన్ని సేవలు (9)', icon: '🏛️' },
    { id: 'LAND_RECORDS', labelEn: 'Land Records', labelTe: 'భూమి రికార్డులు', icon: '🏡' },
    { id: 'MARKET', labelEn: 'Markets & e-NAM', labelTe: 'మార్కెట్లు & ఈ-నామ్', icon: '🌾' },
    { id: 'WELFARE_SUBSIDY', labelEn: 'Subsidies & Welfare', labelTe: 'రాయితీలు & సంక్షేమం', icon: '💰' },
    { id: 'IRRIGATION', labelEn: 'Irrigation (PMKSY)', labelTe: 'సాగునీరు (డ్రిప్)', icon: '💧' },
    { id: 'SOIL_INSURANCE', labelEn: 'Soil & Insurance', labelTe: 'భూసార & పంట బీమా', icon: '🛡️' },
  ];

  const filteredServices = allServices.filter((s) => {
    const matchesCategory = selectedCategory === 'ALL' || s.category === selectedCategory;
    const query = searchQuery.trim().toLowerCase();
    const matchesQuery =
      !query ||
      s.nameEn.toLowerCase().includes(query) ||
      s.nameTe.toLowerCase().includes(query) ||
      s.shortDescEn.toLowerCase().includes(query) ||
      s.shortDescTe.toLowerCase().includes(query) ||
      s.departmentEn.toLowerCase().includes(query) ||
      s.departmentTe.toLowerCase().includes(query);

    return matchesCategory && matchesQuery;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-farm-900 via-farm-800 to-teal-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-farm-700">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-farm-700/80 text-emerald-300 text-xs font-semibold mb-2 border border-farm-600">
            <Building2 className="w-3.5 h-3.5 text-amber-400" />
            <span>
              {language === 'te'
                ? 'ధ్రువీకరించబడిన ప్రభుత్వ వ్యవసాయ సేవల వేదిక'
                : 'Verified Government Agricultural Portals Hub'}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            {language === 'te'
              ? 'ప్రభుత్వ సేవలు & రైతు పథకాలు'
              : 'Official Government Agricultural Services'}
          </h1>

          <p className="text-farm-200 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
            {language === 'te'
              ? 'భూమి రికార్డులు (మీభూమి), ఈ-నామ్ జాతీయ మార్కెట్, రైతు భరోసా, పీఎం-కిసాన్ మరియు పంట బీమా అధికారిక ప్రభుత్వ వెబ్‌సైట్లకు సురక్షిత ప్రవేశం.'
              : 'Direct, verified access to official portals for land records (MeeBhoomi), e-NAM electronic trading, Rythu Bharosa, PM-KISAN, and PMFBY crop insurance.'}
          </p>

          {/* Quick Search Input */}
          <div className="mt-5 max-w-xl relative flex items-center bg-white rounded-2xl shadow-md p-1.5 border border-farm-300">
            <div className="pl-3 text-farm-600">
              <Search className="w-4 h-4 text-farm-600" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                language === 'te'
                  ? 'మీభూమి, ఈ-నామ్, రైతు భరోసా, పీఎం కిసాన్ శోధించండి...'
                  : 'Search MeeBhoomi, e-NAM, PM-KISAN, Fasal Bima...'
              }
              className="w-full px-3 py-2 text-xs font-medium text-gray-900 placeholder:text-gray-400 bg-transparent focus:outline-hidden"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="px-2.5 py-1 text-xs text-gray-500 hover:text-gray-800"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Security & Non-Collection Privacy Notice */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3 text-xs text-amber-950">
        <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold block">
            {language === 'te' ? 'భద్రతా హామీ & ప్రభుత్వ అధికారిక పోర్టల్ నిబంధన:' : 'Official Security & Privacy Guarantee:'}
          </span>
          <p className="mt-0.5 text-amber-900 text-[11px] leading-relaxed">
            {language === 'te'
              ? 'రైతుమిత్ర కేవలం అధికారిక ప్రభుత్వ పోర్టల్స్‌కు నేరుగా మార్గనిర్దేశం చేస్తుంది. మేము మీ ఆధార్ నంబర్, పాస్‌వర్డ్‌లు లేదా బ్యాంక్ వివరాలను ఎన్నడూ సేకరించము. అన్ని ధ్రువీకరణలు ప్రభుత్వ అధికారిక సైట్లలోనే సురక్షితంగా జరుగుతాయి.'
              : 'RythuMitra functions strictly as a verified navigation gateway. We never collect or store your Aadhaar numbers, government passwords, or OTPs. All official authentications occur securely on authorized government portals.'}
          </p>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setSelectedCategory(cat.id)}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all shadow-xs ${
              selectedCategory === cat.id
                ? 'bg-farm-700 text-white shadow-md scale-102'
                : 'bg-white text-gray-700 hover:bg-farm-50 border border-gray-200'
            }`}
          >
            <span>{cat.icon}</span>
            <span>{language === 'te' ? cat.labelTe : cat.labelEn}</span>
          </button>
        ))}
      </div>

      {/* Government Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredServices.map((service) => {
          const title = language === 'te' ? service.nameTe : service.nameEn;
          const desc = language === 'te' ? service.shortDescTe : service.shortDescEn;
          const dept = language === 'te' ? service.departmentTe : service.departmentEn;
          const badge = language === 'te' ? service.safetyBadgeTe : service.safetyBadgeEn;
          const features = language === 'te' ? service.featuresTe : service.featuresEn;

          return (
            <div
              key={service.id}
              className="bg-white rounded-3xl p-5 border border-farm-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Badges row */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 border border-blue-200 text-blue-800">
                    <ShieldCheck className="w-3 h-3 text-blue-600" />
                    {badge}
                  </span>
                  <span className="text-[10px] text-gray-400 font-medium">
                    Verified {service.lastVerifiedDate}
                  </span>
                </div>

                {/* Header with Icon & Title */}
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white flex items-center justify-center text-2xl shadow-sm shrink-0">
                    {service.iconEmoji}
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-gray-900 leading-snug">
                      {title}
                    </h3>
                    <span className="text-[11px] text-gray-500 block mt-0.5 font-medium">
                      {dept}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-gray-600 mt-3 leading-relaxed">
                  {desc}
                </p>

                {/* Key Features Checklist */}
                <div className="mt-4 pt-3 border-t border-gray-100 space-y-1.5">
                  {features.slice(0, 3).map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-[11px] text-gray-700 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="truncate">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button: Safe External Redirect */}
              <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between gap-3">
                <a
                  href={service.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-farm-700 hover:bg-farm-800 text-white text-xs font-bold shadow-xs hover:shadow transition-all focus:outline-hidden focus:ring-2 focus:ring-farm-500 min-h-[44px]"
                  aria-label={`Open ${title} official website in a new browser tab`}
                >
                  <span>{language === 'te' ? 'పోర్టల్ ఓపెన్ చేయండి' : 'Open Official Portal'}</span>
                  <ExternalLink className="w-3.5 h-3.5 stroke-[2.5]" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {filteredServices.length === 0 && (
        <div className="p-8 text-center bg-white rounded-3xl border border-gray-200">
          <HelpCircle className="w-10 h-10 text-gray-400 mx-auto mb-2" />
          <p className="text-sm font-bold text-gray-700">No government portals matched your query</p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('ALL');
            }}
            className="mt-3 px-4 py-2 bg-farm-600 text-white rounded-xl text-xs font-bold"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
