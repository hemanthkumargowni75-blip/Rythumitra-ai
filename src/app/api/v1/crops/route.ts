import { NextRequest, NextResponse } from 'next/server';
import { getAllCrops, getCropsByCategory } from '@/data/cropDatabase';
import { CropCategory, Language } from '@/types';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') as CropCategory | null;
  const language = (searchParams.get('language') as Language) || 'te';
  const query = (searchParams.get('q') || '').trim().toLowerCase();

  let crops = category && category !== ('ALL' as any)
    ? getCropsByCategory(category)
    : getAllCrops();

  if (query) {
    crops = crops.filter((crop) => {
      const trans = crop.translations[language] || crop.translations.en;
      return (
        crop.id.toLowerCase().includes(query) ||
        crop.scientificName.toLowerCase().includes(query) ||
        crop.category.toLowerCase().includes(query) ||
        trans.name.toLowerCase().includes(query) ||
        crop.aliases.some((a) => a.toLowerCase().includes(query))
      );
    });
  }

  // Format localized lightweight response
  const localizedList = crops.map((crop) => {
    const trans = crop.translations[language] || crop.translations.en;
    return {
      id: crop.id,
      category: crop.category,
      scientificName: crop.scientificName,
      iconEmoji: crop.iconEmoji,
      name: trans.name,
      localNames: trans.localNames,
      durationDays: crop.durationDays,
      waterRequirementMm: crop.waterRequirementMm,
      expectedYieldPerAcre: crop.expectedYieldPerAcre,
      riskLevel: crop.riskLevel,
      suitableSeasons: crop.suitableSeasons,
      summary: trans.whatIsThis,
      growingSeason: trans.growingSeason,
    };
  });

  return NextResponse.json({
    total: localizedList.length,
    language,
    category: category || 'ALL',
    crops: localizedList,
  });
}
