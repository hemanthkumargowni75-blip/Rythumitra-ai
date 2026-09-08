import { NextRequest, NextResponse } from 'next/server';
import { searchCropDatabase, addFarmerRecentSearch } from '@/data/cropDatabase';
import { initialActiveCrop, initialFarm } from '@/data/mockDb';
import { Language, CropSearchResponse } from '@/types';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = (searchParams.get('q') || '').trim();
  const language = (searchParams.get('language') as Language) || 'te';
  const farmerId = searchParams.get('farmerId') || 'usr-101';

  if (!query) {
    return NextResponse.json({
      query: '',
      language,
      total: 0,
      isQuestion: false,
      intent: 'SEARCH',
      results: [],
      crops: [],
    });
  }

  // Save to recent searches
  addFarmerRecentSearch(query, farmerId);

  // Search in database with alias normalization
  const { matches, isQuestion } = searchCropDatabase(query, language);

  // Check if search matches the farmer's active cultivating crop
  const normQuery = query.toLowerCase();
  const activeCropMatch =
    normQuery.includes('chilli') ||
    normQuery.includes('mirchi') ||
    normQuery.includes('తేజా') ||
    normQuery.includes('మిరప') ||
    normQuery.includes('మిర్చి') ||
    normQuery.includes('teja') ||
    initialActiveCrop.cropNameEn.toLowerCase().includes(normQuery) ||
    initialActiveCrop.cropNameTe.toLowerCase().includes(normQuery);

  let activeFarmMatchData: CropSearchResponse['activeFarmMatch'] = undefined;
  if (activeCropMatch) {
    activeFarmMatchData = {
      cropId: initialActiveCrop.cropId,
      cropName: language === 'te' ? initialActiveCrop.cropNameTe : initialActiveCrop.cropNameEn,
      fieldArea: initialFarm.boundary.areaAcres,
      stage: language === 'te' ? 'పూత దశ (62వ రోజు)' : 'Flowering Stage (Day 62)',
      healthScore: 88,
      weatherRisk:
        language === 'te'
          ? 'బుధవారం 80% భారీ వర్షం (38 మి.మీ) సూచన'
          : 'Heavy Rain Warning for Wednesday (38 mm, 80% chance)',
      sprayAlert:
        language === 'te'
          ? 'ఈరోజు ఉదయం స్ప్రే అనుకూలం; వర్షానికి ముందే తామర పురుగు మందు పిచికారీ పూర్తి చేయండి'
          : 'Favorable spray window this morning; complete thrips spray before rain',
    };
  }

  // Map to SearchResult for autocomplete dropdown
  const searchResults = matches.slice(0, 10).map((crop) => {
    const trans = crop.translations[language] || crop.translations.en;
    return {
      id: `crop-${crop.id}`,
      title: `${crop.iconEmoji} ${trans.name}`,
      subtitle: `${crop.category} • ${crop.durationDays} Days • Yield: ${crop.expectedYieldPerAcre}`,
      type: 'crop' as const,
      route: `/crops/${crop.id}`,
      badge: crop.category,
    };
  });

  const responsePayload: CropSearchResponse = {
    query,
    language,
    total: matches.length,
    isQuestion,
    intent: isQuestion ? 'AI_QUESTION' : 'SEARCH',
    results: searchResults,
    crops: matches.slice(0, 12).map((crop) => {
      const trans = crop.translations[language] || crop.translations.en;
      return {
        id: crop.id,
        name: trans.name,
        category: crop.category,
        iconEmoji: crop.iconEmoji,
        durationDays: crop.durationDays,
        expectedYieldPerAcre: crop.expectedYieldPerAcre,
        riskLevel: crop.riskLevel,
        summary: trans.whatIsThis,
        matchedAlias: crop.matchedAlias,
      };
    }),
    activeFarmMatch: activeFarmMatchData,
  };

  return NextResponse.json(responsePayload);
}
