import { SearchResult, SearchResponse, Language } from '@/types';
import { cropsList } from '@/data/cropsData';
import { diseasesCatalog } from '@/data/diseasesData';
import { initialFarm, initialSoilTest, initialActiveCrop } from '@/data/mockDb';

// Common question indicators across English, Telugu, Hindi, Tamil, etc.
const QUESTION_INDICATORS = [
  '?', 'why', 'how', 'when', 'what', 'where', 'should', 'can i',
  'ఎందుకు', 'ఎప్పుడు', 'ఎలా', 'ఏమి', 'ఏమిటి', 'ఎక్కడ', 'చేయాలి',
  'क्यों', 'कैसे', 'कब', 'क्या', 'कहाँ', 'करना चाहिए',
  'ஏன்', 'எப்போது', 'எப்படி', 'என்ன',
  'എന്തുകൊണ്ട്', 'എപ്പോൾ', 'എങ്ങനെ', 'എന്ത്',
  'ಏಕೆ', 'ಯಾವಾಗ', 'ಹೇಗೆ', 'ಏನು',
  'का', 'कधी', 'कसे', 'काय',
];

export function detectIntent(query: string): 'SEARCH' | 'AI_QUESTION' {
  const normalized = query.trim().toLowerCase();
  if (normalized.length === 0) return 'SEARCH';

  // Check question marks or interrogative prefixes/words
  const isQuestion =
    normalized.includes('?') ||
    QUESTION_INDICATORS.some((word) => normalized.includes(word));

  // Word count > 4 usually indicates a descriptive question
  const words = normalized.split(/\s+/).filter(Boolean);
  if (words.length >= 5 || isQuestion) {
    return 'AI_QUESTION';
  }

  return 'SEARCH';
}

export function executeSearch(query: string, language: Language = 'te'): SearchResponse {
  const normalized = query.trim().toLowerCase();
  const intent = detectIntent(normalized);
  const isQuestion = intent === 'AI_QUESTION';

  if (!normalized) {
    return {
      query,
      language,
      total: 0,
      isQuestion: false,
      intent: 'SEARCH',
      results: [],
    };
  }

  const results: SearchResult[] = [];

  // 1. Search Farm & Field
  if (
    'farm field acres guntas survey lakshmi chenu పొలం ఎకరాలు గుంటలు సర్వే'.includes(normalized) ||
    initialFarm.name.toLowerCase().includes(normalized) ||
    initialFarm.surveyNumber.toLowerCase().includes(normalized)
  ) {
    results.push({
      id: 'res-farm',
      title: initialFarm.name,
      subtitle: `Survey #${initialFarm.surveyNumber} • ${initialFarm.boundary.areaAcres} Acres (${initialFarm.soilType.replace('_', ' ')})`,
      type: 'farm',
      route: '/map',
      badge: 'Farm Boundary',
    });
  }

  // 2. Search Active Crop & Crop Recommendation Database
  cropsList.forEach((crop) => {
    const matchEn = crop.nameEn.toLowerCase().includes(normalized);
    const matchTe = crop.nameTe.toLowerCase().includes(normalized);
    const matchCategory = crop.category.toLowerCase().includes(normalized);

    if (matchEn || matchTe || matchCategory) {
      results.push({
        id: `res-crop-${crop.id}`,
        title: language === 'te' ? crop.nameTe : crop.nameEn,
        subtitle: `${crop.durationDays} Days • Expected Yield: ${crop.expectedYieldPerAcre}`,
        type: 'crop',
        route: '/crops',
        badge: crop.category,
      });
    }
  });

  // 3. Search Pest & Disease Diagnostics Catalog
  diseasesCatalog.forEach((dis) => {
    const matchEn = dis.diseaseNameEn.toLowerCase().includes(normalized);
    const matchTe = dis.diseaseNameTe.toLowerCase().includes(normalized);
    const matchCrop = dis.cropName.toLowerCase().includes(normalized);
    const matchChemical = dis.chemicalControlEn.commercialBrands.toLowerCase().includes(normalized);

    if (matchEn || matchTe || matchCrop || matchChemical || 'pest disease doctor తెగులు పురుగు మందు డాక్టర్'.includes(normalized)) {
      results.push({
        id: `res-dis-${dis.id}`,
        title: language === 'te' ? dis.diseaseNameTe : dis.diseaseNameEn,
        subtitle: `Recommended: ${dis.chemicalControlEn.commercialBrands} (${dis.chemicalControlEn.dosagePer16LPump})`,
        type: 'pest',
        route: '/diagnostics',
        badge: 'Crop Doctor',
      });
    }
  });

  // 4. Search Fertilizer / Ferti-Calc
  if (
    'fertilizer urea dap mop potash zinc nano calc ఎరువులు యూరియా డిఏపి పొటాష్ खाद உரம் ಗೊಬ್ಬರ खत'.includes(normalized)
  ) {
    results.push({
      id: 'res-fert',
      title: language === 'te' ? 'ఎరువుల లెక్కింపు (Ferti-Calc)' : 'Fertilizer Calculator (Ferti-Calc)',
      subtitle: `Stage-wise bags for ${initialFarm.boundary.areaAcres} Acres: Urea, DAP, MOP, Zinc`,
      type: 'fertilizer',
      route: '/fertilizer',
      badge: 'Nutrients',
    });
  }

  // 5. Search Soil Health Card
  if (
    'soil npk carbon health card ph నేల భూసార పరీక్ష నత్రజని మట్టి मिट्टी மண் ಮಣ್ಣು माती'.includes(normalized)
  ) {
    results.push({
      id: 'res-soil',
      title: language === 'te' ? 'డిజిటల్ సాయిల్ హెల్త్ కార్డ్' : 'Digital Soil Health Card',
      subtitle: `Score: ${initialSoilTest.overallScore}/100 • Low Nitrogen & Zinc deficiency alerts`,
      type: 'soil',
      route: '/soil',
      badge: 'Soil Health',
    });
  }

  // 6. Search Weather & Advisory
  if (
    'weather rain forecast spray temperature climate వాతావరణం వర్షం పిచికారీ'.includes(normalized)
  ) {
    results.push({
      id: 'res-weather',
      title: language === 'te' ? 'వ్యవసాయ వాతావరణ సలహా' : 'Agro-Weather Advisory',
      subtitle: '7-day forecast • Heavy rain alert for Wednesday (38mm)',
      type: 'weather',
      route: '/weather',
      badge: 'Weather',
    });
  }

  // 7. Search Irrigation & Water
  if (
    'water drip irrigation borewell moisture నీరు తడి డ్రిప్ బోరు'.includes(normalized)
  ) {
    results.push({
      id: 'res-irrigation',
      title: language === 'te' ? 'స్మార్ట్ నీటి యాజమాన్యం' : 'Smart Irrigation Manager',
      subtitle: 'Daily ETc Need: 6.2 mm/day • Drip Run: 2.5 Hours every 2 days',
      type: 'irrigation',
      route: '/irrigation',
      badge: 'Irrigation',
    });
  }

  // 8. Search Passbook & Ledger
  if (
    'passbook expense revenue profit cost ledger kcc పాస్‌బుక్ ఖర్చు లాభం ఆదాయం'.includes(normalized)
  ) {
    results.push({
      id: 'res-passbook',
      title: language === 'te' ? 'రైతు డిజిటల్ పాస్‌బుక్' : 'Rythu Digital Passbook',
      subtitle: 'Verified financial ledger for Kisan Credit Card (KCC) loans and subsidies',
      type: 'ledger',
      route: '/passbook',
      badge: 'Ledger',
    });
  }

  // Deduplicate results by ID
  const uniqueResults = Array.from(new Map(results.map((r) => [r.id, r])).values());

  return {
    query,
    language,
    total: uniqueResults.length,
    isQuestion,
    intent,
    results: uniqueResults.slice(0, 8),
  };
}
