export type GovServiceCategory =
  | 'ALL'
  | 'LAND_RECORDS'
  | 'MARKET'
  | 'WELFARE_SUBSIDY'
  | 'IRRIGATION'
  | 'SOIL_INSURANCE';

export interface GovernmentServiceItem {
  id: string;
  nameEn: string;
  nameTe: string;
  shortDescEn: string;
  shortDescTe: string;
  category: GovServiceCategory;
  officialUrl: string;
  departmentEn: string;
  departmentTe: string;
  safetyBadgeEn: string;
  safetyBadgeTe: string;
  iconEmoji: string;
  featuresEn: string[];
  featuresTe: string[];
  lastVerifiedDate: string;
  isStateSpecific: boolean;
  state?: string;
}

export const initialGovernmentServices: GovernmentServiceItem[] = [
  // 1. AP MeeBhoomi
  {
    id: 'gov-meebhoomi',
    nameEn: 'AP MeeBhoomi Portal',
    nameTe: 'ఆంధ్రప్రదేశ్ మీభూమి పోర్టల్',
    shortDescEn: 'Official land records, 1-B Record of Rights, village adangal, FMB sketches and digital passbooks.',
    shortDescTe: 'అధికారిక భూ రికార్డులు, 1-B (ROR), గ్రామ అడంగల్, ఎఫ్.ఎం.బి గ్రామ పటం మరియు డిజిటల్ పట్టాదారు పాస్‌బుక్.',
    category: 'LAND_RECORDS',
    officialUrl: 'https://meebhoomi.ap.gov.in/',
    departmentEn: 'Revenue Department, Govt of Andhra Pradesh',
    departmentTe: 'రెవెన్యూ శాఖ, ఆంధ్రప్రదేశ్ ప్రభుత్వం',
    safetyBadgeEn: 'AP Govt • Official Land Portal',
    safetyBadgeTe: 'ఆంధ్రప్రదేశ్ ప్రభుత్వం • అధికారిక భూ పోర్టల్',
    iconEmoji: '🏡',
    featuresEn: [
      'Your Adangal & Village Adangal',
      '1-B Record of Rights (ROR)',
      'Village Map & FMB Field Sketches',
      'Electronic Pattadar Passbook download',
    ],
    featuresTe: [
      'మీ అడంగల్ & గ్రామ అడంగల్ తనిఖీ',
      '1-B రికార్డ్ ఆఫ్ రైట్స్ (ROR)',
      'గ్రామ పటం & పొలం ఎఫ్.ఎం.బి నక్షా',
      'ఈ-పట్టాదారు పాస్‌బుక్ డౌన్‌లోడ్',
    ],
    lastVerifiedDate: '2026-09-01',
    isStateSpecific: true,
    state: 'Andhra Pradesh',
  },

  // 2. e-NAM
  {
    id: 'gov-enam',
    nameEn: 'e-NAM (National Agriculture Market)',
    nameTe: 'ఈ-నామ్ (జాతీయ వ్యవసాయ మార్కెట్)',
    shortDescEn: 'Pan-India electronic trading portal connecting APMC mandis for online bidding and direct buyer payments.',
    shortDescTe: 'భారతదేశ వ్యాప్తంగా వ్యవసాయ ఉత్పత్తులకు ఆన్‌లైన్ వేలం మరియు మార్కెట్ ధరల పారదర్శక వేదిక.',
    category: 'MARKET',
    officialUrl: 'https://enam.gov.in/',
    departmentEn: 'Ministry of Agriculture & Farmers Welfare, Govt of India',
    departmentTe: 'వ్యవసాయ మరియు రైతు సంక్షేమ మంత్రిత్వ శాఖ, భారత ప్రభుత్వం',
    safetyBadgeEn: 'Govt of India • Pan-India Mandi Network',
    safetyBadgeTe: 'భారత ప్రభుత్వం • జాతీయ మండి నెట్‌వర్క్',
    iconEmoji: '🌾',
    featuresEn: [
      'Live online mandi bidding prices',
      'Single trade license across mandis',
      'Quality assaying & certification',
      'Direct online bank settlement (DBT)',
    ],
    featuresTe: [
      'ప్రత్యక్ష ఆన్‌లైన్ మండి వేలం ధరలు',
      'మండీల మధ్య నేరుగా వర్తకం',
      'నాణ్యత పరీక్ష మరియు సర్టిఫికేషన్',
      'నేరుగా బ్యాంక్ ఖాతాలో జమ',
    ],
    lastVerifiedDate: '2026-09-01',
    isStateSpecific: false,
  },

  // 3. AP Agriculture / Rythu Bharosa
  {
    id: 'gov-ap-agrisnet',
    nameEn: 'AP Agrisnet & Rythu Bharosa',
    nameTe: 'ఏపీ అగ్రిస్‌నెట్ & రైతు భరోసా',
    shortDescEn: 'Official state portal for Rythu Bharosa financial assistance, certified seed distribution, and fertilizer subsidies.',
    shortDescTe: 'రైతు భరోసా పెట్టుబడి సాయం, రాయితీ విత్తనాలు మరియు ఎరువుల పంపిణీ అధికారిక పోర్టల్.',
    category: 'WELFARE_SUBSIDY',
    officialUrl: 'https://apagrisnet.gov.in/',
    departmentEn: 'Department of Agriculture, Govt of Andhra Pradesh',
    departmentTe: 'వ్యవసాయ శాఖ, ఆంధ్రప్రదేశ్ ప్రభుత్వం',
    safetyBadgeEn: 'AP Govt • Agriculture Dept',
    safetyBadgeTe: 'ఆంధ్రప్రదేశ్ ప్రభుత్వం • వ్యవసాయ శాఖ',
    iconEmoji: '🌱',
    featuresEn: [
      'Rythu Bharosa payment status tracker',
      'Subsidized seed & farm machinery booking',
      'Dr. YSR Polam Badi training schedules',
      'Free crop registration (e-Crop) details',
    ],
    featuresTe: [
      'రైతు భరోసా జమ స్థితి పరిశీలన',
      'రాయితీ విత్తనాలు & యంత్రాల బుకింగ్',
      'పొలం బడి వ్యవసాయ శిక్షణ షెడ్యూల్',
      'ఈ-క్రాప్ (e-Crop) పంట నమోదు వివరాలు',
    ],
    lastVerifiedDate: '2026-09-01',
    isStateSpecific: true,
    state: 'Andhra Pradesh',
  },

  // 4. PM Fasal Bima Yojana (PMFBY)
  {
    id: 'gov-pmfby',
    nameEn: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
    nameTe: 'ప్రధానమంత్రి ఫసల్ బీమా యోజన (PMFBY)',
    shortDescEn: 'National crop insurance portal providing comprehensive financial coverage against natural crop loss, floods, and droughts.',
    shortDescTe: 'వరదలు, కరువు మరియు తెగుళ్ల వల్ల పంట నష్టపోయిన రైతులకు పూర్తి బీమా రక్షణ పోర్టల్.',
    category: 'SOIL_INSURANCE',
    officialUrl: 'https://pmfby.gov.in/',
    departmentEn: 'Ministry of Agriculture & Farmers Welfare, Govt of India',
    departmentTe: 'వ్యవసాయ మరియు రైతు సంక్షేమ మంత్రిత్వ శాఖ, భారత ప్రభుత్వం',
    safetyBadgeEn: 'Govt of India • Crop Insurance',
    safetyBadgeTe: 'భారత ప్రభుత్వం • పంట బీమా పథకం',
    iconEmoji: '🛡️',
    featuresEn: [
      'Crop insurance premium calculation',
      'Application submission and policy status',
      'Intimate localized crop loss within 72 hrs',
      'Direct claim settlement to KCC accounts',
    ],
    featuresTe: [
      'పంట బీమా ప్రీమియం లెక్కింపు',
      'బీమా పాలసీ దరఖాస్తు స్థితి పరిశీలన',
      '72 గంటల్లో పంట నష్టం సమాచారం నివేదన',
      'నేరుగా బ్యాంక్ ఖాతాలో బీమా పరిహారం',
    ],
    lastVerifiedDate: '2026-09-01',
    isStateSpecific: false,
  },

  // 5. PM-KISAN Samman Nidhi
  {
    id: 'gov-pmkisan',
    nameEn: 'PM-KISAN Samman Nidhi',
    nameTe: 'పీఎం కిసాన్ సమ్మాన్ నిధి',
    shortDescEn: 'Central government income support scheme transferring ₹6,000 per year in three equal instalments directly into bank accounts.',
    shortDescTe: 'రైతులకు ఏటా ₹6,000 ఆర్థిక సాయం అందించే కేంద్ర ప్రభుత్వ అధికారిక పోర్టల్.',
    category: 'WELFARE_SUBSIDY',
    officialUrl: 'https://pmkisan.gov.in/',
    departmentEn: 'Department of Agriculture & Cooperation, Govt of India',
    departmentTe: 'వ్యవసాయ మరియు సహకార శాఖ, భారత ప్రభుత్వం',
    safetyBadgeEn: 'Govt of India • Direct Benefit Transfer',
    safetyBadgeTe: 'భారత ప్రభుత్వం • డీబీటీ పోర్టల్',
    iconEmoji: '💰',
    featuresEn: [
      'Beneficiary status & installment check',
      'e-KYC biometric and OTP completion',
      'New farmer online registration',
      'Name correction as per Aadhaar',
    ],
    featuresTe: [
      'విడతల వారీగా జమ వివరాల పరిశీలన',
      'ఈ-కేవైసీ (e-KYC) ఆధార్ ధ్రువీకరణ',
      'కొత్త రైతు ఆన్‌లైన్ నమోదు',
      'ఆధార్ ప్రకారం పేరు మార్పు సదుపాయం',
    ],
    lastVerifiedDate: '2026-09-01',
    isStateSpecific: false,
  },

  // 6. PMKSY (Micro-Irrigation / Drip)
  {
    id: 'gov-pmksy',
    nameEn: 'Pradhan Mantri Krishi Sinchayee Yojana (PMKSY)',
    nameTe: 'పీఎం కృషి సించాయి యోజన (PMKSY)',
    shortDescEn: 'National mission for Per Drop More Crop supporting up to 90% subsidy for drip and sprinkler irrigation systems.',
    shortDescTe: 'డ్రిప్ మరియు స్ప్రింక్లర్ సూక్ష్మ సేద్య పరికరాలపై 90% వరకు రాయితీ అందించే జాతీయ పథకం.',
    category: 'IRRIGATION',
    officialUrl: 'https://pmksy.gov.in/',
    departmentEn: 'Ministry of Jal Shakti & Ministry of Agriculture',
    departmentTe: 'జలశక్తి మరియు వ్యవసాయ మంత్రిత్వ శాఖ',
    safetyBadgeEn: 'Govt of India • Irrigation Mission',
    safetyBadgeTe: 'భారత ప్రభుత్వం • సాగునీటి మిషన్',
    iconEmoji: '💧',
    featuresEn: [
      'Drip & sprinkler subsidy application',
      'State-wise approved micro-irrigation vendors',
      'Farm pond & water harvesting guidelines',
      'Subsidy sanction tracker',
    ],
    featuresTe: [
      'డ్రిప్ మరియు స్ప్రింక్లర్ రాయితీ దరఖాస్తు',
      'రాష్ట్రాల వారీగా అనుమతించబడిన కంపెనీల జాబితా',
      'పంట కుంటలు (Farm Ponds) పథకం వివరాలు',
      'రాయితీ మంజూరు స్థితి పరిశీలన',
    ],
    lastVerifiedDate: '2026-09-01',
    isStateSpecific: false,
  },

  // 7. Soil Health Card Portal
  {
    id: 'gov-soil-health',
    nameEn: 'National Soil Health Card Portal',
    nameTe: 'జాతీయ భూసార పరీక్ష కార్డు పోర్టల్',
    shortDescEn: 'Comprehensive portal containing nationwide soil sample test reports, nutrient status (N, P, K, Zn, Fe), and fertilizer dosage.',
    shortDescTe: 'దేశవ్యాప్త నేల పరీక్ష నివేదికలు, పోషక లోపాలు మరియు సిఫార్సు చేసిన ఎరువుల మోతాదు వివరాలు.',
    category: 'SOIL_INSURANCE',
    officialUrl: 'https://soilhealth.dac.gov.in/',
    departmentEn: 'Department of Agriculture & Farmers Welfare, Govt of India',
    departmentTe: 'వ్యవసాయ శాఖ, భారత ప్రభుత్వం',
    safetyBadgeEn: 'Govt of India • Soil Health',
    safetyBadgeTe: 'భారత ప్రభుత్వం • భూసార కార్డు',
    iconEmoji: '🧪',
    featuresEn: [
      'Download Soil Health Card by survey number',
      '12-parameter soil fertility analysis',
      'Crop-specific chemical & organic dosage',
      'Locate nearest government soil testing lab',
    ],
    featuresTe: [
      'సర్వే నంబర్ ఆధారంగా భూసార కార్డు డౌన్‌లోడ్',
      '12 రకాల నేల పోషకాల నివేదిక',
      'పంటల వారీగా సేంద్రీయ & రసాయన ఎరువుల సిఫార్సులు',
      'సమీప ప్రభుత్వ భూసార పరీక్ష కేంద్రం చిరునామా',
    ],
    lastVerifiedDate: '2026-09-01',
    isStateSpecific: false,
  },

  // 8. Kisan Call Center / Farmer Portal
  {
    id: 'gov-kisan-portal',
    nameEn: 'Kisan Call Center & AgriPortal (1551)',
    nameTe: 'కిసాన్ కాల్ సెంటర్ & రైతు పోర్టల్ (1551)',
    shortDescEn: '24/7 toll-free agricultural advisory service (1800-180-1551) in 22 local Indian languages connecting farmers with scientists.',
    shortDescTe: '22 భారతీయ భాషలలో వ్యవసాయ నిపుణులతో ఉచిత ఫోన్ సంప్రదింపుల జాతీయ వేదిక (1800-180-1551).',
    category: 'WELFARE_SUBSIDY',
    officialUrl: 'https://farmer.gov.in/',
    departmentEn: 'Ministry of Agriculture & Farmers Welfare',
    departmentTe: 'వ్యవసాయ మంత్రిత్వ శాఖ, భారత ప్రభుత్వం',
    safetyBadgeEn: 'Govt of India • Toll-Free 1551',
    safetyBadgeTe: 'భారత ప్రభుత్వం • ఉచిత టోల్ ఫ్రీ 1551',
    iconEmoji: '🚜',
    featuresEn: [
      'Toll-Free Phone Advisory: 1800-180-1551',
      'SMS advisory registration for weather & pests',
      'Directory of Krishi Vigyan Kendras (KVKs)',
      'MSP minimum support price notification list',
    ],
    featuresTe: [
      'ఉచిత టోల్ ఫ్రీ ఫోన్ సేవ: 1800-180-1551',
      'వాతావరణం & తెగుళ్ల SMS హెచ్చరికల నమోదు',
      'కృషి విజ్ఞాన కేంద్రాల (KVK) డైరెక్టరీ',
      'కనీస మద్దతు ధరల (MSP) అధికారిక జాబితా',
    ],
    lastVerifiedDate: '2026-09-01',
    isStateSpecific: false,
  },

  // 9. AGMARKNET
  {
    id: 'gov-agmarknet',
    nameEn: 'AGMARKNET Mandi Price Information',
    nameTe: 'అగ్‌మార్క్‌నెట్ జాతీయ మార్కెట్ ధరల సమాచారం',
    shortDescEn: 'Official national database tracking daily commodity arrivals, maximum, minimum, and modal market prices across 3,000+ mandis.',
    shortDescTe: 'భారతదేశంలోని 3000 పైగా మండల మార్కెట్లలో రోజువారీ సరుకుల రాక మరియు హోల్‌సేల్ ధరల రికార్డులు.',
    category: 'MARKET',
    officialUrl: 'https://agmarknet.gov.in/',
    departmentEn: 'Directorate of Marketing & Inspection (DMI), Govt of India',
    departmentTe: 'మార్కెటింగ్ & ఇన్‌స్పెక్షన్ డైరెక్టరేట్, భారత ప్రభుత్వం',
    safetyBadgeEn: 'Govt of India • Daily Mandi Stats',
    safetyBadgeTe: 'భారత ప్రభుత్వం • రోజువారీ మార్కెట్ ధరలు',
    iconEmoji: '📈',
    featuresEn: [
      'Daily mandi arrivals & trend charts',
      'State-wise commodity price bulletin',
      'Historical monthly price comparison',
      'Future market arrival predictions',
    ],
    featuresTe: [
      'రోజువారీ మార్కెట్ సరుకుల రాకల నివేదిక',
      'రాష్ట్రాల వారీగా ధరల బులెటిన్',
      'గత నెలల ధరల హెచ్చుతగ్గుల సరిపోలిక',
      'వ్యవసాయ మార్కెట్ల వార్షిక సమీక్ష',
    ],
    lastVerifiedDate: '2026-09-01',
    isStateSpecific: false,
  },
];

let inMemoryGovServices = [...initialGovernmentServices];

export function getAllGovernmentServices(): GovernmentServiceItem[] {
  return inMemoryGovServices;
}

export function getGovernmentServicesByCategory(category: GovServiceCategory): GovernmentServiceItem[] {
  if (category === 'ALL') return inMemoryGovServices;
  return inMemoryGovServices.filter((s) => s.category === category);
}

export function addGovernmentService(service: GovernmentServiceItem): void {
  inMemoryGovServices.unshift(service);
}
