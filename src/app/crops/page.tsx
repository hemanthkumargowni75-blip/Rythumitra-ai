'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Sprout,
  Search,
  Star,
  CheckCircle2,
  Filter,
  ArrowRight,
  PlusCircle,
  Calendar,
  Layers,
  Droplets,
  DollarSign,
  ShieldCheck,
  Tag,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useFarm } from '@/context/FarmContext';
import { useAuth } from '@/context/AuthContext';
import {
  getAllCrops,
  getCropsByCategory,
  getFarmerFavoriteCropIds,
  toggleFarmerFavorite,
  searchCropDatabase,
} from '@/data/cropDatabase';
import { getCropTranslations } from '@/data/cropTranslations';
import { VoiceMicButton } from '@/components/VoiceMicButton';
import { AdminCropModal } from '@/components/AdminCropModal';
import { OfflineIndicator } from '@/components/OfflineIndicator';
import { CropEntity, CropCategory, Season, SoilType } from '@/types';
import { formatINR } from '@/lib/utils';

export default function CropsPage() {
  const { language, t } = useLanguage();
  const { farm, activeCrop, setActiveCrop } = useFarm();
  const { role } = useAuth();
  const tCrop = getCropTranslations(language);

  const [selectedTab, setSelectedTab] = useState<
    'ALL' | CropCategory | 'FAVORITES' | 'RECOMMENDED'
  >('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [crops, setCrops] = useState<CropEntity[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [selectionMessage, setSelectionMessage] = useState('');

  // Legacy seasonal recommender states (preserved for zero regression!)
  const [selectedSeason, setSelectedSeason] = useState<Season>('KHARIF');
  const [selectedSoil, setSelectedSoil] = useState<SoilType>(farm.soilType);

  const refreshCrops = () => {
    const all = getAllCrops();
    setCrops(all);
    const favs = getFarmerFavoriteCropIds('usr-101');
    setFavoriteIds(favs);
  };

  useEffect(() => {
    refreshCrops();
  }, []);

  const handleToggleFavorite = (cropId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    toggleFarmerFavorite(cropId, 'usr-101');
    setFavoriteIds(getFarmerFavoriteCropIds('usr-101'));
  };

  const handleSelectActiveCrop = (crop: CropEntity, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    const trans = crop.translations[language] || crop.translations.en;
    setActiveCrop({
      id: `crop-${Date.now()}`,
      farmId: farm.id,
      cropId: crop.id,
      cropNameEn: crop.translations.en.name,
      cropNameTe: crop.translations.te.name,
      sowingDate: new Date().toISOString().split('T')[0],
      currentStage: 'GERMINATION',
      stageDays: 1,
      expectedHarvestDate: new Date(Date.now() + crop.durationDays * 86400000)
        .toISOString()
        .split('T')[0],
      status: 'ACTIVE',
    });

    setSelectionMessage(
      language === 'te'
        ? `${trans.name} ప్రస్తుత సాగు పంటగా ఎంచుకోబడింది!`
        : `${trans.name} set as active cultivating crop!`
    );
    setTimeout(() => setSelectionMessage(''), 3500);
  };

  // Filter crops based on search query and selected category tab
  let displayedCrops = crops;

  if (searchQuery.trim()) {
    const { matches } = searchCropDatabase(searchQuery, language);
    displayedCrops = matches;
  } else if (selectedTab === 'FAVORITES') {
    displayedCrops = crops.filter((c) => favoriteIds.includes(c.id));
  } else if (selectedTab === 'RECOMMENDED') {
    displayedCrops = crops.filter(
      (c) =>
        c.suitableSeasons.includes(selectedSeason) &&
        c.suitableSoils.includes(selectedSoil)
    );
    if (displayedCrops.length === 0) {
      displayedCrops = crops.filter((c) =>
        c.suitableSeasons.includes(selectedSeason)
      );
    }
  } else if (selectedTab !== 'ALL') {
    displayedCrops = crops.filter((c) => c.category === selectedTab);
  }

  const categoryTabs: Array<{ id: 'ALL' | CropCategory | 'FAVORITES' | 'RECOMMENDED'; label: string }> = [
    { id: 'ALL', label: tCrop.categories.all },
    { id: 'CEREAL', label: tCrop.categories.cereal },
    { id: 'PULSE', label: tCrop.categories.pulse },
    { id: 'VEGETABLE', label: tCrop.categories.vegetable },
    { id: 'OILSEED', label: tCrop.categories.oilseed },
    { id: 'SPICE', label: tCrop.categories.spice },
    { id: 'FRUIT', label: tCrop.categories.fruit },
    { id: 'COMMERCIAL', label: tCrop.categories.commercial },
    { id: 'FAVORITES', label: tCrop.categories.favorites },
    { id: 'RECOMMENDED', label: tCrop.categories.recommended },
  ];

  const canAddCrop = role === 'ADMIN' || role === 'EXPERT' || role === 'SUPER_ADMIN';

  return (
    <div className="space-y-6">
      <OfflineIndicator />

      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-farm-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-2">
            <Sprout className="w-4 h-4 text-emerald-600" />
            <span>{language === 'te' ? 'సమగ్ర పంటలు & పండ్ల సమాచార కేంద్రం' : 'Multilingual Crop Intelligence Hub'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            {tCrop.cropExplorer}
          </h1>
          <p className="text-xs text-gray-600 mt-1 max-w-2xl font-medium">
            {tCrop.cropExplorerSubtitle}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {canAddCrop && (
            <button
              type="button"
              onClick={() => setAdminModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{tCrop.adminAddCrop}</span>
            </button>
          )}

          <Link
            href="/fertilizer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-farm-600 hover:bg-farm-700 text-white text-xs font-bold shadow-xs transition-colors"
          >
            <span>{language === 'te' ? 'ఎరువుల లెక్కింపు →' : 'Fertilizer Calculator →'}</span>
          </Link>
        </div>
      </div>

      {/* Success Notification */}
      {selectionMessage && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-xs font-bold text-emerald-900 flex items-center gap-2 shadow-xs animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{selectionMessage}</span>
        </div>
      )}

      {/* Search and Voice Input Bar */}
      <div className="bg-white rounded-2xl p-4 border border-farm-200 shadow-sm">
        <div className="relative flex items-center">
          <Search className="w-5 h-5 text-gray-400 absolute left-4 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={tCrop.searchPlaceholder}
            className="w-full pl-11 pr-24 py-3 rounded-xl border border-gray-200 text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-farm-500 focus:border-transparent bg-gray-50/50"
          />
          <div className="absolute right-2.5 flex items-center gap-1.5">
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-xs text-gray-400 hover:text-gray-600 px-2 py-1"
              >
                ✕
              </button>
            )}
            <VoiceMicButton onTranscript={(text) => setSearchQuery(text)} />
          </div>
        </div>
      </div>

      {/* Category Navigation Tabs Carousel */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categoryTabs.map((tab) => {
          const isActive = selectedTab === tab.id && !searchQuery;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                setSelectedTab(tab.id);
                setSearchQuery('');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all shadow-2xs ${
                isActive
                  ? 'bg-farm-700 text-white shadow-xs scale-102'
                  : 'bg-white hover:bg-farm-50 text-gray-700 border border-farm-200'
              }`}
            >
              {tab.label}
              {tab.id === 'FAVORITES' && favoriteIds.length > 0 && (
                <span className="ml-1.5 px-1.5 py-0.2 rounded-full bg-amber-400 text-farm-950 text-[10px]">
                  {favoriteIds.length}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Seasonal Recommendation Filter Sub-bar (Active when RECOMMENDED is chosen) */}
      {selectedTab === 'RECOMMENDED' && (
        <div className="bg-emerald-50/70 border border-emerald-200 p-4 rounded-2xl flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 font-bold text-emerald-900">
            <Filter className="w-4 h-4 text-emerald-700" />
            <span>{language === 'te' ? 'సీజన్ మరియు నేల రకం ప్రకారం సిఫార్సులు:' : 'Filter by Season & Soil:'}</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex rounded-xl bg-white p-1 border border-emerald-200">
              <button
                type="button"
                onClick={() => setSelectedSeason('KHARIF')}
                className={`px-3 py-1 rounded-lg font-bold transition-all ${
                  selectedSeason === 'KHARIF' ? 'bg-farm-700 text-white' : 'text-gray-600'
                }`}
              >
                {t.crops.kharif}
              </button>
              <button
                type="button"
                onClick={() => setSelectedSeason('RABI')}
                className={`px-3 py-1 rounded-lg font-bold transition-all ${
                  selectedSeason === 'RABI' ? 'bg-farm-700 text-white' : 'text-gray-600'
                }`}
              >
                {t.crops.rabi}
              </button>
              <button
                type="button"
                onClick={() => setSelectedSeason('ZAID')}
                className={`px-3 py-1 rounded-lg font-bold transition-all ${
                  selectedSeason === 'ZAID' ? 'bg-farm-700 text-white' : 'text-gray-600'
                }`}
              >
                {t.crops.zaid}
              </button>
            </div>

            <select
              value={selectedSoil}
              onChange={(e) => setSelectedSoil(e.target.value as SoilType)}
              className="px-3 py-1.5 rounded-xl border border-emerald-200 text-xs font-semibold bg-white"
            >
              <option value="BLACK_COTTON">{language === 'te' ? 'నల్లరేగడి నేల' : 'Black Cotton'}</option>
              <option value="RED_LOAMY">{language === 'te' ? 'ఎర్ర నేల' : 'Red Loamy'}</option>
              <option value="ALLUVIAL">{language === 'te' ? 'ఒండ్రు నేల' : 'Alluvial Delta'}</option>
              <option value="SANDY_LOAM">{language === 'te' ? 'ఇసుక రేగడి' : 'Sandy Loam'}</option>
            </select>
          </div>
        </div>
      )}

      {/* Crops Cards Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-extrabold text-farm-950 flex items-center gap-2">
            <span>
              {searchQuery
                ? `${language === 'te' ? 'శోధన ఫలితాలు' : 'Search Results for'} "${searchQuery}"`
                : selectedTab === 'FAVORITES'
                ? tCrop.myCrops
                : tCrop.categories[selectedTab === 'ALL' ? 'all' : (selectedTab.toLowerCase() as keyof typeof tCrop.categories)] || tCrop.cropExplorer}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-farm-100 text-farm-800 text-[11px] font-bold">
              {displayedCrops.length} {language === 'te' ? 'పంటలు' : 'crops'}
            </span>
          </h2>
        </div>

        {displayedCrops.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-200 shadow-xs space-y-3">
            <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mx-auto text-gray-400">
              <Sprout className="w-7 h-7" />
            </div>
            <h3 className="text-base font-bold text-gray-800">
              {selectedTab === 'FAVORITES'
                ? tCrop.noFavoritesYet
                : language === 'te'
                ? 'ఏ పంట సమాచారం కనుగొనబడలేదు'
                : 'No crops matched your search'}
            </h3>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">
              {selectedTab === 'FAVORITES'
                ? 'Click the star icon on any crop card to save it for quick access.'
                : 'Try searching with another spelling, common local name, or select "All Crops".'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedCrops.map((crop) => {
              const trans = crop.translations[language] || crop.translations.en;
              const isFav = favoriteIds.includes(crop.id);
              const isCurrentActive = activeCrop.cropId === crop.id;

              return (
                <div
                  key={crop.id}
                  className={`bg-white rounded-3xl p-6 border transition-all flex flex-col justify-between hover:shadow-md ${
                    isCurrentActive
                      ? 'border-2 border-emerald-500 shadow-md ring-2 ring-emerald-100'
                      : 'border-farm-200 shadow-xs'
                  }`}
                >
                  <div>
                    {/* Card Top Pill & Favorite Star */}
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div className="flex items-center gap-1.5">
                        <span className="text-2xl">{crop.iconEmoji}</span>
                        <span className="px-2.5 py-0.5 rounded-full bg-farm-100 text-farm-800 text-[10px] font-extrabold uppercase tracking-wider">
                          {crop.category}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => handleToggleFavorite(crop.id, e)}
                        className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                        title={isFav ? 'Remove from favorites' : 'Add to favorites'}
                      >
                        <Star
                          className={`w-4 h-4 ${
                            isFav ? 'fill-amber-400 text-amber-500' : 'text-gray-300 hover:text-amber-400'
                          }`}
                        />
                      </button>
                    </div>

                    {/* Crop Name */}
                    <h3 className="text-lg font-black text-gray-900 tracking-tight">
                      {trans.name}
                    </h3>
                    <p className="text-xs text-gray-500 italic mt-0.5">
                      {crop.scientificName}
                    </p>

                    {/* What is this crop summary */}
                    <p className="mt-3 text-xs text-gray-600 line-clamp-3 leading-relaxed bg-farm-50/60 p-3 rounded-xl border border-farm-100">
                      {trans.whatIsThis}
                    </p>

                    {/* Key Agronomic Metrics */}
                    <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100">
                        <span className="text-gray-500 block text-[10px] uppercase font-bold">
                          {tCrop.cropDetail.durationDays}
                        </span>
                        <span className="font-bold text-gray-900 mt-0.5 block">
                          {crop.durationDays} Days
                        </span>
                      </div>

                      <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100">
                        <span className="text-gray-500 block text-[10px] uppercase font-bold">
                          {tCrop.cropDetail.waterNeed}
                        </span>
                        <span className="font-bold text-gray-900 mt-0.5 block">
                          {crop.waterRequirementMm} mm
                        </span>
                      </div>

                      <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100">
                        <span className="text-gray-500 block text-[10px] uppercase font-bold">
                          {tCrop.cropDetail.expectedYield}
                        </span>
                        <span className="font-bold text-emerald-800 mt-0.5 block">
                          {crop.expectedYieldPerAcre}
                        </span>
                      </div>

                      <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100">
                        <span className="text-gray-500 block text-[10px] uppercase font-bold">
                          {tCrop.cropDetail.riskLevel}
                        </span>
                        <span
                          className={`font-bold mt-0.5 block ${
                            crop.riskLevel === 'LOW'
                              ? 'text-emerald-700'
                              : crop.riskLevel === 'MEDIUM'
                              ? 'text-amber-700'
                              : 'text-rose-700'
                          }`}
                        >
                          {crop.riskLevel}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="mt-5 pt-3 border-t border-gray-100 space-y-2">
                    <Link
                      href={`/crops/${crop.id}`}
                      className="w-full py-2 rounded-xl text-xs font-bold transition-all bg-earth-50 hover:bg-earth-100 text-earth-900 border border-earth-200 flex items-center justify-center gap-1.5"
                    >
                      <span>{tCrop.viewDetails}</span>
                    </Link>

                    <button
                      type="button"
                      onClick={(e) => handleSelectActiveCrop(crop, e)}
                      className={`w-full py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                        isCurrentActive
                          ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                          : 'bg-farm-600 hover:bg-farm-700 text-white shadow-2xs'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>
                        {isCurrentActive
                          ? language === 'te'
                            ? 'ప్రస్తుతం సాగులో ఉంది'
                            : 'Currently Cultivating'
                          : tCrop.selectAsActive}
                      </span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Admin Modal */}
      <AdminCropModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
        onCropAdded={refreshCrops}
      />
    </div>
  );
}
