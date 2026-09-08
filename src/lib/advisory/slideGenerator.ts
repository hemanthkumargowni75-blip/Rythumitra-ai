import {
  User,
  FarmerProfile,
  Farm,
  SoilTestRecord,
  ActiveCrop,
  WeatherDay,
  Language,
} from '@/types';
import {
  Sprout,
  CloudSun,
  Droplet,
  FileText,
  ShieldAlert,
  TrendingUp,
  Sparkles,
  AlertTriangle,
  Landmark,
  LucideIcon,
} from 'lucide-react';
import { ADVISORY_TRANSLATIONS } from '@/data/advisorySlidesTranslations';
import { verifiedMandiPrices } from '@/data/marketData';
import { getCropById } from '@/data/cropDatabase';
import {
  getFilteredGovernmentNotifications,
  GovernmentNotification,
} from '@/data/governmentNotificationsData';
import { formatINR } from '@/lib/utils';

export type SlidePriority =
  | 'P0_EMERGENCY'
  | 'P1_WEATHER_ALERT'
  | 'P2_CROP_ACTION'
  | 'P3_IRRIGATION'
  | 'P4_PEST_RISK'
  | 'P5_SOIL_ACTION'
  | 'P6_GOVERNMENT'
  | 'P7_MARKET'
  | 'P8_TIP';

export interface AdvisorySlideMetric {
  label: string;
  value: string;
  highlight?: boolean;
}

export interface AdvisorySlideItem {
  id: string;
  type:
    | 'EMERGENCY'
    | 'CROP_ACTION'
    | 'WEATHER'
    | 'IRRIGATION'
    | 'PEST'
    | 'SOIL'
    | 'GOVERNMENT'
    | 'MARKET'
    | 'TIP';
  priorityLevel: number; // 0 (P0) to 8 (P8) for strict sorting
  badge: string;
  badgeColor: string;
  icon: LucideIcon;
  iconColor: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  imageAlt: string;
  metrics: AdvisorySlideMetric[];
  description: string;
  speechText: string;
  ctaText: string;
  ctaHref: string;
  isExternalCta?: boolean;
  officialSource?: string;
  officialSourceUrl?: string;
  publishedAt?: string;
  expiresAt?: string;
  noticeId?: string;
  isAcknowledged?: boolean;
}

export interface SlideGeneratorInput {
  user: User | null;
  farmer: FarmerProfile | null;
  farm: Farm | null;
  activeCrop: ActiveCrop | null;
  soilTest: SoilTestRecord | null;
  weatherForecast: WeatherDay[] | null;
  language: Language;
  acknowledgedNoticeIds?: string[];
}

/**
 * Calculates crop age in days based on sowing date or fallback stageDays
 */
function calculateCropAge(activeCrop: ActiveCrop | null): number {
  if (!activeCrop) return 45;
  if (activeCrop.sowingDate) {
    const sowingTime = new Date(activeCrop.sowingDate).getTime();
    if (!isNaN(sowingTime)) {
      const diffDays = Math.floor((Date.now() - sowingTime) / (1000 * 60 * 60 * 24));
      if (diffDays > 0 && diffDays < 365) return diffDays;
    }
  }
  return activeCrop.stageDays || 45;
}

/**
 * Fallback crop resolution based on farmer district and state
 */
function resolveEffectiveCrop(
  activeCrop: ActiveCrop | null,
  farmerState?: string,
  farmerDistrict?: string
): { cropId: string; nameEn: string; nameTe: string; isFallback: boolean } {
  if (activeCrop && activeCrop.cropId) {
    return {
      cropId: activeCrop.cropId.toLowerCase(),
      nameEn: activeCrop.cropNameEn || 'Active Crop',
      nameTe: activeCrop.cropNameTe || activeCrop.cropNameEn || 'ప్రస్తుత పంట',
      isFallback: false,
    };
  }

  const dist = (farmerDistrict || '').toLowerCase();
  if (dist.includes('guntur') || dist.includes('prakasam') || dist.includes('khammam')) {
    return { cropId: 'chilli', nameEn: 'Chilli (Teja)', nameTe: 'తేజా మిర్చి', isFallback: true };
  }
  if (dist.includes('adilabad') || dist.includes('kurnool') || dist.includes('warangal')) {
    return { cropId: 'cotton', nameEn: 'Cotton', nameTe: 'పత్తి', isFallback: true };
  }
  return { cropId: 'paddy', nameEn: 'Paddy (Samba Masuri)', nameTe: 'వరి (సాంబ మసూరి)', isFallback: true };
}

/**
 * Main Smart Advisory Slide Generator:
 * Generates personalized, prioritized slides for the authenticated farmer.
 */
export function generateAdvisorySlides(input: SlideGeneratorInput): AdvisorySlideItem[] {
  const {
    user,
    farmer,
    farm,
    activeCrop,
    soilTest,
    weatherForecast,
    language,
    acknowledgedNoticeIds = [],
  } = input;

  const t = ADVISORY_TRANSLATIONS[language] || ADVISORY_TRANSLATIONS.en;

  // 1. Resolve farmer location (User profile takes precedence, then FarmerProfile, then fallback)
  const farmerState = user?.state || farmer?.state || 'Andhra Pradesh';
  const farmerDistrict = user?.district || farmer?.district || 'Guntur';
  const farmerMandal = user?.mandal || farmer?.mandal || '';

  // 2. Resolve crop
  const effectiveCrop = resolveEffectiveCrop(activeCrop, farmerState, farmerDistrict);
  const cropEntity = getCropById(effectiveCrop.cropId);
  const cropAgeDays = calculateCropAge(activeCrop);
  const rawStage = (activeCrop?.currentStage || 'FLOWERING').toUpperCase();

  // 3. Resolve weather
  const todayWeather = weatherForecast?.[0] || {
    tempMax: 34,
    tempMin: 23,
    rainProbability: 25,
    humidity: 65,
    windSpeedKmh: 14,
    conditionTe: 'పాక్షిక మేఘావృతం',
    condition: 'PARTLY_CLOUDY' as const,
    sprayAdvisory: { canSpray: true, reasonEn: 'Optimal', reasonTe: 'అనుకూలం' },
  };

  const isSevereWeather =
    todayWeather.rainProbability >= 60 ||
    todayWeather.windSpeedKmh >= 25 ||
    todayWeather.tempMax >= 40 ||
    todayWeather.condition === 'HEAVY_RAIN' ||
    todayWeather.condition === 'STORMY';

  const upcomingRainyDay = weatherForecast?.find((d) => d.rainProbability >= 60);

  // 4. Candidate Slide Accumulator
  const candidateSlides: AdvisorySlideItem[] = [];

  // =============================================================
  // SLIDE: TODAY'S ACTION FOR YOUR CROP (Cultivation-First)
  // Priority: P2 (Normal) or P1 (If severe weather alters action)
  // =============================================================
  let cropActionText = '';
  let cropActionSpeech = '';
  const cropDisplayName = language === 'te' ? effectiveCrop.nameTe : effectiveCrop.nameEn;
  const stageDisplay = rawStage.replace(/_/g, ' ');

  if (isSevereWeather) {
    if (language === 'te') {
      cropActionText = `వర్షం (${todayWeather.rainProbability}%) లేదా అధిక గాలుల వల్ల నేడు ఎరువులు, మందుల పిచికారీని వాయిదా వేయండి. మురుగు నీరు పోయే కాల్వలను శుభ్రం చేయండి.`;
      cropActionSpeech = `${cropDisplayName}. నేడు వర్ష సూచన ఉంది. మందుల పిచికారీ వాయిదా వేసి, నీరు నిల్వకుండా చూడండి.`;
    } else {
      cropActionText = `Heavy rain (${todayWeather.rainProbability}%) or wind expected. Postpone all spray operations and fertilizer top-dressing. Keep field drainage channels clear.`;
      cropActionSpeech = `${cropDisplayName}. Heavy rain forecast today. Postpone sprays and keep drainage channels clear.`;
    }
  } else {
    // Stage-specific verified cultivation action
    if (rawStage.includes('FLOWER')) {
      if (effectiveCrop.cropId === 'chilli') {
        cropActionText =
          language === 'te'
            ? 'పూత & పిందె దశ: తామర పురుగుల ఉధృతిని గమనించండి. ఎకరానికి 40 నీలి రంగు జిగురు అట్టలు అమర్చండి. ఉదయం 7-10 గంటల మధ్య సూక్ష్మ పోషకాలను పిచికారీ చేయండి.'
            : 'Peak Flowering: Inspect 40 blue sticky traps/acre for black thrips. Spray chelated micronutrients & boron (1g/L) in the morning for optimal fruit set.';
      } else if (effectiveCrop.cropId === 'cotton') {
        cropActionText =
          language === 'te'
            ? 'పూత దశ: గులాబీ రంగు పురుగు నివారణకు ఎకరానికి 5 లింగాకర్షక బుట్టలు అమర్చండి. ముడుచుకున్న పూలను ఏరి కాల్చివేయండి.'
            : 'Flowering: Install 5 pheromone traps/acre for pink bollworm surveillance. Pick and destroy rosette flowers to arrest larval spread.';
      } else {
        cropActionText =
          language === 'te'
            ? 'పూత దశ: పొలంలో 2-3 సెం.మీ తేమను నిలకడగా ఉంచండి. అగ్గితెగులు లేదా పొట్టకుళ్ళు లక్షణాలను గమనించండి.'
            : 'Flowering: Maintain 2-3 cm shallow standing moisture. Monitor for panicle blast or sheath rot.';
      }
    } else if (rawStage.includes('VEGETAT') || rawStage.includes('TILLER')) {
      cropActionText =
        language === 'te'
          ? 'శాఖీయ దశ: కలుపు నివారణ చేపట్టి, మొదటి విడత యూరియా మరియు పొటాష్ సమతుల్యంగా వేయండి. రసం పీల్చే పురుగుల కోసం ఆకుల అడుగున పరిశీలించండి.'
          : 'Vegetative stage: Complete inter-cultivation weeding and apply first split of balanced Urea + Potash. Inspect leaf undersides for sucking pests.';
    } else if (rawStage.includes('GERMIN') || rawStage.includes('SEED')) {
      cropActionText =
        language === 'te'
          ? 'మొలక దశ: మొలకల సాంద్రతను పరిశీలించి ఖాళీలను పూడ్చండి. వేరుకుళ్ళు రాకుండా మురుగు నీరు నిలవకుండా జాగ్రత్తపడండి.'
          : 'Seedling stage: Check germination percentage and complete gap-filling. Ensure excess water drains freely to avoid damping-off root rot.';
    } else {
      cropActionText =
        language === 'te'
          ? 'కోత దశ: పంట కోతకు 10 రోజుల ముందే నీటి పారుదల ఆపండి. 85% పైరు పక్వానికి వచ్చాక ఎండ సమయంలో కోయండి.'
          : 'Maturity stage: Stop irrigation 10 days before harvest. Harvest during dry sunshine when 85% grains or pods mature.';
    }
    cropActionSpeech = `${t.cropTitle}. ${cropDisplayName}, ${stageDisplay}, ${cropAgeDays} ${language === 'te' ? 'రోజులు' : 'days'}. ${cropActionText}`;
  }

  candidateSlides.push({
    id: 'crop-action',
    type: 'CROP_ACTION',
    priorityLevel: 2, // P2: Today's Action for Your Crop
    badge: language === 'te' ? 'మీ పంట నేటి పని' : "Today's Crop Action",
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    icon: Sprout,
    iconColor: 'text-emerald-400',
    title: language === 'te' ? `${cropDisplayName} — నేటి సూచన` : `${cropDisplayName} — Field Action`,
    subtitle: `${farmerDistrict}, ${farmerState} • ${stageDisplay}`,
    imageUrl:
      effectiveCrop.cropId === 'chilli'
        ? 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=1200&q=80'
        : effectiveCrop.cropId === 'cotton'
        ? 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=1200&q=80'
        : 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=1200&q=80',
    imageAlt: `${cropDisplayName} agricultural crop in field`,
    metrics: [
      { label: t.cropActive, value: cropDisplayName, highlight: true },
      { label: t.cropStage, value: stageDisplay },
      { label: t.cropDays, value: `${cropAgeDays} ${language === 'te' ? 'రోజులు' : 'Days'}` },
      { label: language === 'te' ? 'విస్తీర్ణం' : 'Area', value: `${farm?.boundary?.areaAcres || 4.5} ${language === 'te' ? 'ఎకరాలు' : 'Acres'}` },
    ],
    description: cropActionText,
    speechText: cropActionSpeech,
    ctaText: t.cropCta,
    ctaHref: '/crops',
  });

  // =============================================================
  // SLIDE: LIVE AGRO-WEATHER
  // Priority: P1 (If severe weather alert) or P3 (If normal weather)
  // =============================================================
  candidateSlides.push({
    id: 'weather',
    type: 'WEATHER',
    priorityLevel: isSevereWeather ? 1 : 3, // P1 if severe weather alert, P3 if calm
    badge: isSevereWeather
      ? language === 'te'
        ? 'వాతావరణ హెచ్చరిక'
        : 'Weather Alert'
      : language === 'te'
      ? 'లైవ్ వాతావరణం'
      : 'Live Agro-Weather',
    badgeColor: isSevereWeather
      ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse'
      : 'bg-sky-500/20 text-sky-300 border-sky-500/40',
    icon: isSevereWeather ? AlertTriangle : CloudSun,
    iconColor: isSevereWeather ? 'text-rose-400' : 'text-sky-400',
    title: isSevereWeather
      ? language === 'te'
        ? 'అప్రమత్తత: భారీ వర్షం / గాలి హెచ్చరిక'
        : 'Weather Alert: Storm & Heavy Rain Expected'
      : t.weatherTitle,
    subtitle: `${farmerDistrict}, ${farmerState} • ${todayWeather.tempMax}°C`,
    imageUrl: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Agrometeorological weather over open fields',
    metrics: [
      { label: t.weatherTemp, value: `${todayWeather.tempMax}°C / ${todayWeather.tempMin}°C`, highlight: true },
      { label: t.weatherRain, value: `${todayWeather.rainProbability}%` },
      { label: t.weatherHumidity, value: `${todayWeather.humidity}%` },
      { label: t.weatherWind, value: `${todayWeather.windSpeedKmh} km/h` },
    ],
    description: todayWeather.sprayAdvisory?.canSpray
      ? `${t.weatherSprayFavorable}. ${language === 'te' ? 'గాలి వేగం సాధారణంగా ఉంది, ఉదయం 10 గంటలలోపు మందులు పిచికారీ చేయవచ్చు.' : 'Wind velocity is optimal for morning foliar spray.'}`
      : `${t.weatherSprayUnfavorable}. ${language === 'te' ? 'వర్ష సూచన లేదా గాలుల వల్ల పిచికారీ చేస్తే మందు కొట్టుకుపోతుంది.' : 'Rain forecast or high wind speed. Defer spray operations.'}`,
    speechText: `${t.weatherTitle}. ${todayWeather.tempMax} డిగ్రీలు, వర్ష సంభావ్యత ${todayWeather.rainProbability} శాతం. ${todayWeather.sprayAdvisory?.canSpray ? t.weatherSprayFavorable : t.weatherSprayUnfavorable}`,
    ctaText: t.weatherCta,
    ctaHref: '/weather',
  });

  // =============================================================
  // SLIDE: SMART IRRIGATION
  // Priority: P3
  // =============================================================
  const isDrip = (farm?.irrigationType || 'DRIP').toUpperCase().includes('DRIP');
  const soilTypeDisplay = farm?.soilType?.replace(/_/g, ' ') || 'BLACK COTTON';

  candidateSlides.push({
    id: 'irrigation',
    type: 'IRRIGATION',
    priorityLevel: 3,
    badge: language === 'te' ? 'నీటి పారుదల' : 'Smart Irrigation',
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
    icon: Droplet,
    iconColor: 'text-blue-400',
    title: t.irrigationTitle,
    subtitle: t.irrigationSubtitle,
    imageUrl: 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Modern agricultural micro-irrigation system',
    metrics: [
      { label: t.irrigationMoisture, value: upcomingRainyDay ? '70% (Wet)' : '45% (Optimal)', highlight: true },
      { label: t.irrigationRuntime, value: upcomingRainyDay ? '0 Hours' : isDrip ? '2.0 Hours' : '3.5 Hours' },
      { label: t.irrigationMethod, value: farm?.irrigationType?.replace(/_/g, ' ') || 'DRIP' },
      { label: language === 'te' ? 'భూమి రకం' : 'Soil', value: soilTypeDisplay },
    ],
    description: upcomingRainyDay
      ? t.irrigationRainNotice
      : language === 'te'
      ? `${cropDisplayName} కు పూత దశలో తేమ నిలకడగా ఉండాలి. డ్రిప్ విధానంలో ఉదయం లేదా సాయంత్రం 2 గంటల పాటు నీరు పారించండి.`
      : `Maintain steady root-zone moisture for ${cropDisplayName}. Run drip for 2 hours during cool hours.`,
    speechText: `${t.irrigationTitle}. ${upcomingRainyDay ? t.irrigationRainNotice : t.irrigationNormalNotice}`,
    ctaText: t.irrigationCta,
    ctaHref: '/irrigation',
  });

  // =============================================================
  // SLIDE: PEST & DISEASE RISK WATCH
  // Priority: P4 (Stage & Crop specific with safe wording)
  // =============================================================
  let pestName = '';
  let pestCondition = '';
  let pestAction = '';

  if (effectiveCrop.cropId === 'chilli') {
    pestName = language === 'te' ? 'నల్ల తామర పురుగు (Black Thrips)' : 'Black Thrips (Thrips parvispinus)';
    pestCondition =
      language === 'te'
        ? 'ఉదయం తేమ & పొడి వాతావరణం వల్ల తామర పురుగులు వేగంగా వ్యాపించే ముప్పు ఉంది.'
        : 'Warm daytime with morning humidity favors rapid multiplication of Black Thrips in flower buds.';
    pestAction =
      language === 'te'
        ? 'ఆకులు పైకి ముడుచుకున్నాయా గమనించండి. అనుమానం ఉంటే వెంటనే AI డయాగ్నస్టిక్ తో స్కాన్ చేయండి.'
        : 'Monitor flower buds for upward curling. Scan suspected leaves using the AI diagnostic tool.';
  } else if (effectiveCrop.cropId === 'cotton') {
    pestName = language === 'te' ? 'గులాబీ రంగు పురుగు (Pink Bollworm)' : 'Pink Bollworm (Pectinophora gossypiella)';
    pestCondition =
      language === 'te'
        ? 'పూత మరియు పిందె దశలలో చిమ్మటలు గుడ్లు పెట్టే అవకాశం ఉంది.'
        : 'Square formation and flowering attract adult PBW moths for egg-laying inside bolls.';
    pestAction =
      language === 'te'
        ? 'లింగాకర్షక బుట్టల్లో రోజుకి 8 కంటే ఎక్కువ పురుగులు పడితే వెంటనే నివారణ చర్యలు చేపట్టండి.'
        : 'Check pheromone trap catches. If catches exceed 8 moths/trap for 3 consecutive days, spray recommended ovicide.';
  } else {
    pestName = language === 'te' ? 'మొవ్వు పురుగు & అగ్గితెగులు (Stem Borer / Blast)' : 'Stem Borer & Leaf Blast';
    pestCondition =
      language === 'te'
        ? 'మేఘావృత వాతావరణం మరియు అధిక నత్రజని వల్ల అగ్గితెగులు సోకే అవకాశం ఉంది.'
        : 'Cloudy weather and excess nitrogen induce susceptibility to blast diamond lesions.';
    pestAction =
      language === 'te'
        ? 'దుబ్బు మొదళ్ళలో మొవ్వు పురుగు లేదా ఎండిన పిలకలు ఉన్నాయేమో పరిశీలించండి.'
        : 'Inspect tillers for dead hearts or leaf blast spindle-shaped spots.';
  }

  candidateSlides.push({
    id: 'pest',
    type: 'PEST',
    priorityLevel: 4,
    badge: language === 'te' ? 'తెగుళ్ల జాగ్రత్త' : 'Pest & Disease Watch',
    badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
    icon: ShieldAlert,
    iconColor: 'text-rose-400',
    title: `${t.pestTitle}: ${pestName}`,
    subtitle: `${cropDisplayName} • ${language === 'te' ? 'ముందస్తు రక్షణ చర్య' : 'Preventive Surveillance'}`,
    imageUrl: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Close-up examination of crop foliage for early disease detection',
    metrics: [
      { label: t.cropActive, value: cropDisplayName, highlight: true },
      { label: t.pestRisk, value: t.pestRiskModerate },
      { label: language === 'te' ? 'తెగులు పేరు' : 'Target Pest', value: pestName.split('(')[0].trim() },
      { label: language === 'te' ? 'రక్షణ చర్య' : 'Guidance', value: language === 'te' ? 'జిగురు / బుట్టలు' : 'Sticky / Pheromone' },
    ],
    description: `${pestCondition} ${pestAction}`,
    speechText: `${t.pestTitle}. ${cropDisplayName}. ${pestName}. ${pestCondition} ${pestAction}`,
    ctaText: t.pestCta,
    ctaHref: '/diagnostics',
  });

  // =============================================================
  // SLIDE: SOIL HEALTH CARD
  // Priority: P5
  // =============================================================
  candidateSlides.push({
    id: 'soil',
    type: 'SOIL',
    priorityLevel: 5,
    badge: language === 'te' ? 'నేల స్వభావం' : 'Soil Health Card',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    icon: FileText,
    iconColor: 'text-amber-400',
    title: t.soilTitle,
    subtitle: `${farmerDistrict} • ${soilTest?.overallScore || 72}/100`,
    imageUrl: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Rich fertile agricultural soil in farmer hands',
    metrics: [
      { label: t.soilScore, value: `${soilTest?.overallScore || 72}/100`, highlight: true },
      { label: t.soilPh, value: `${soilTest?.pH || 6.8} (Neutral)` },
      { label: 'N-P-K', value: `${soilTest?.nitrogen || 210}-${soilTest?.phosphorus || 18}-${soilTest?.potassium || 280}` },
      { label: 'Zinc (Zn)', value: `${soilTest?.zinc || 0.45} ppm (Low)` },
    ],
    description:
      language === 'te'
        ? soilTest?.recommendationsTe?.[0] || t.soilAdvice
        : soilTest?.recommendationsEn?.[0] || t.soilAdvice,
    speechText: `${t.soilTitle}. ${t.soilScore}: ${soilTest?.overallScore || 72}/100. ${soilTest?.recommendationsTe?.[0] || t.soilAdvice}`,
    ctaText: t.soilCta,
    ctaHref: '/soil',
  });

  // =============================================================
  // SLIDE: OFFICIAL GOVERNMENT NOTIFICATION (Strictly Filtered)
  // Priority: P0 (Emergency loss claim), P1 (Urgent pest alert), or P6 (Standard)
  // =============================================================
  const filteredGovNotices = getFilteredGovernmentNotifications({
    state: farmerState,
    district: farmerDistrict,
    cropId: effectiveCrop.cropId,
    acknowledgedIds: acknowledgedNoticeIds,
  });

  if (filteredGovNotices.length > 0) {
    // Pick the most relevant active notification
    const primaryNotice = filteredGovNotices[0];
    const isAck = acknowledgedNoticeIds.includes(primaryNotice.id);

    // Map notification priority to slider rank
    let govPriorityRank = 6; // default P6
    if (!isAck) {
      if (primaryNotice.priority === 'P0') govPriorityRank = 0; // Emergency jumps to front!
      else if (primaryNotice.priority === 'P1') govPriorityRank = 1;
    } else {
      govPriorityRank = 7; // Demoted once acknowledged
    }

    const noticeTitle = language === 'te' ? primaryNotice.titleTe : primaryNotice.titleEn;
    const noticeSummary = language === 'te' ? primaryNotice.summaryTe : primaryNotice.summaryEn;
    const noticeAuthority = language === 'te' ? primaryNotice.authorityTe : primaryNotice.authorityEn;
    const noticeBadge = language === 'te' ? primaryNotice.verificationBadgeTe : primaryNotice.verificationBadgeEn;
    const noticeCta = language === 'te' ? primaryNotice.ctaTextTe : primaryNotice.ctaTextEn;

    candidateSlides.push({
      id: `gov-${primaryNotice.id}`,
      type: 'GOVERNMENT',
      priorityLevel: govPriorityRank,
      badge: noticeBadge,
      badgeColor:
        primaryNotice.priority === 'P0'
          ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse'
          : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      icon: Landmark,
      iconColor: primaryNotice.priority === 'P0' ? 'text-rose-400' : 'text-emerald-400',
      title: noticeTitle,
      subtitle: `${t.issuedBy}: ${noticeAuthority}`,
      imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Official government agricultural welfare notification banner',
      metrics: [
        { label: t.applicableTo, value: primaryNotice.state || 'All India', highlight: true },
        { label: language === 'te' ? 'జిల్లా' : 'District', value: primaryNotice.district || 'All Districts' },
        { label: t.validUntil, value: primaryNotice.expiresAt },
        { label: language === 'te' ? 'వర్గం' : 'Category', value: primaryNotice.category.replace(/_/g, ' ') },
      ],
      description: noticeSummary,
      speechText: `${noticeTitle}. ${noticeAuthority}. ${noticeSummary}`,
      ctaText: noticeCta,
      ctaHref: primaryNotice.sourceUrl,
      isExternalCta: true,
      officialSource: noticeAuthority,
      officialSourceUrl: primaryNotice.sourceUrl,
      publishedAt: primaryNotice.publishedAt,
      expiresAt: primaryNotice.expiresAt,
      noticeId: primaryNotice.id,
      isAcknowledged: isAck,
    });
  }

  // =============================================================
  // SLIDE: MANDI MARKET RATES
  // Priority: P7
  // =============================================================
  const cropKeyword = effectiveCrop.cropId;
  const matchedMandi =
    verifiedMandiPrices.find((m) => {
      const cropMatch = m.cropId.toLowerCase() === cropKeyword;
      const distMatch = farmerDistrict
        ? m.district.toLowerCase().includes(farmerDistrict.toLowerCase()) ||
          farmerDistrict.toLowerCase().includes(m.district.toLowerCase())
        : false;
      return cropMatch && distMatch;
    }) ||
    verifiedMandiPrices.find((m) => m.cropId.toLowerCase() === cropKeyword) ||
    verifiedMandiPrices[0];

  candidateSlides.push({
    id: 'market',
    type: 'MARKET',
    priorityLevel: 7,
    badge: 'e-NAM / AGMARKNET',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    icon: TrendingUp,
    iconColor: 'text-emerald-400',
    title: t.marketTitle,
    subtitle: `${matchedMandi.marketName}, ${matchedMandi.district}`,
    imageUrl: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Harvested crops weighed and traded at agricultural mandi',
    metrics: [
      { label: t.cropActive, value: language === 'te' ? matchedMandi.cropNameTe : matchedMandi.cropNameEn, highlight: true },
      { label: t.marketModalPrice, value: `${formatINR(matchedMandi.modalPrice)} / Qtl` },
      { label: t.marketMandi, value: matchedMandi.marketName },
      { label: t.marketTrend, value: `${matchedMandi.priceChange24h >= 0 ? `+${matchedMandi.priceChange24h}` : matchedMandi.priceChange24h} (24h)` },
    ],
    description: `${language === 'te' ? 'సమీప మండి' : 'Nearest Mandi'}: ${matchedMandi.marketName}, ${matchedMandi.district}. ${t.marketRange}: ${formatINR(matchedMandi.minPrice)} - ${formatINR(matchedMandi.maxPrice)}.`,
    speechText: `${t.marketTitle}. ${matchedMandi.cropNameTe || cropDisplayName} మోడల్ ధర ${formatINR(matchedMandi.modalPrice)} రూపాయలు. మార్కెట్: ${matchedMandi.marketName}.`,
    ctaText: t.marketCta,
    ctaHref: '/markets',
  });

  // =============================================================
  // SLIDE: DAILY FARMER PRO-TIP
  // Priority: P8
  // =============================================================
  candidateSlides.push({
    id: 'tip',
    type: 'TIP',
    priorityLevel: 8,
    badge: language === 'te' ? 'రైతు మిత్ర AI సూచన' : 'Agronomist Pro-Tip',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    icon: Sparkles,
    iconColor: 'text-amber-400',
    title: t.tipTitle,
    subtitle: `${cropDisplayName} • ${rawStage.replace(/_/g, ' ')}`,
    imageUrl: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Smiling farmer in green field showing healthy agricultural produce',
    metrics: [
      { label: t.tipTag, value: language === 'te' ? 'పూత & కాత పెంపు' : 'Flowering & Setting', highlight: true },
      { label: language === 'te' ? 'సీజన్' : 'Season', value: language === 'te' ? 'రబీ సీజన్' : 'Rabi Season' },
      { label: language === 'te' ? 'సిఫార్సు' : 'Method', value: language === 'te' ? 'ఆకులపై పిచికారీ' : 'Foliar Spray' },
      { label: language === 'te' ? 'ఆశించిన ఫలితం' : 'Gain', value: '+15-20% Yield' },
    ],
    description: t.tipContent,
    speechText: `${t.tipTitle}. ${t.tipContent}`,
    ctaText: t.tipCta,
    ctaHref: '/consult',
  });

  // 5. Strict Priority Sorting (Lower priorityLevel comes first)
  // P0 (Emergency) -> P1 (Urgent Weather/Risk) -> P2 (Crop Action) -> P3 (Irrigation) -> ... -> P8 (Tip)
  candidateSlides.sort((a, b) => a.priorityLevel - b.priorityLevel);

  // Return between 5 and 7 slides
  return candidateSlides.slice(0, 7);
}
