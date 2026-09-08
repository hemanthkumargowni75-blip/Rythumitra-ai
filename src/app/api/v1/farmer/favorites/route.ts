import { NextRequest, NextResponse } from 'next/server';
import {
  getFarmerFavoriteCropIds,
  toggleFarmerFavorite,
  getCropById,
} from '@/data/cropDatabase';
import { Language } from '@/types';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const farmerId = searchParams.get('farmerId') || 'usr-101';
  const language = (searchParams.get('language') as Language) || 'te';

  const favoriteIds = getFarmerFavoriteCropIds(farmerId);
  const favoriteCrops = favoriteIds
    .map((id) => getCropById(id))
    .filter(Boolean)
    .map((crop) => {
      const trans = crop!.translations[language] || crop!.translations.en;
      return {
        id: crop!.id,
        category: crop!.category,
        iconEmoji: crop!.iconEmoji,
        name: trans.name,
        durationDays: crop!.durationDays,
        expectedYieldPerAcre: crop!.expectedYieldPerAcre,
        riskLevel: crop!.riskLevel,
        summary: trans.whatIsThis,
      };
    });

  return NextResponse.json({
    farmerId,
    favoriteIds,
    favorites: favoriteCrops,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { cropId, farmerId = 'usr-101' } = body;

    if (!cropId) {
      return NextResponse.json({ error: 'cropId is required.' }, { status: 400 });
    }

    const isFavorited = toggleFarmerFavorite(cropId, farmerId);
    const updatedIds = getFarmerFavoriteCropIds(farmerId);

    return NextResponse.json({
      success: true,
      cropId,
      isFavorited,
      favoriteIds: updatedIds,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Error updating favorites.' }, { status: 500 });
  }
}
