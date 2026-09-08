import { NextRequest, NextResponse } from 'next/server';
import { getCropById } from '@/data/cropDatabase';
import { Language } from '@/types';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { searchParams } = new URL(request.url);
  const language = (searchParams.get('language') as Language) || 'te';

  const crop = getCropById(id);
  if (!crop) {
    return NextResponse.json(
      { error: `Crop with id '${id}' not found in database.` },
      { status: 404 }
    );
  }

  const localizedContent = crop.translations[language] || crop.translations.en;

  return NextResponse.json({
    id: crop.id,
    category: crop.category,
    scientificName: crop.scientificName,
    iconEmoji: crop.iconEmoji,
    durationDays: crop.durationDays,
    waterRequirementMm: crop.waterRequirementMm,
    expectedYieldPerAcre: crop.expectedYieldPerAcre,
    riskLevel: crop.riskLevel,
    suitableSeasons: crop.suitableSeasons,
    suitableSoils: crop.suitableSoils,
    stages: crop.stages,
    language,
    content: localizedContent,
    aliases: crop.aliases,
  });
}
