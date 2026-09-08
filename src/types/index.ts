export type Language = 'en' | 'te' | 'hi' | 'ta' | 'ml' | 'kn' | 'mr';
export type SupportedLocale = 'en-IN' | 'te-IN' | 'hi-IN' | 'ta-IN' | 'ml-IN' | 'kn-IN' | 'mr-IN';

export type LandOwnership = 'OWNER' | 'TENANT' | 'LEASED';
export type SoilType = 'BLACK_COTTON' | 'RED_LOAMY' | 'ALLUVIAL' | 'SANDY_LOAM' | 'CLAYEY';
export type IrrigationType = 'BOREWELL' | 'CANAL' | 'DRIP' | 'SPRINKLER' | 'RAINFED';
export type Season = 'KHARIF' | 'RABI' | 'ZAID';

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface FarmBoundary {
  type: 'Polygon';
  coordinates: [number, number][]; // [lat, lng] array for drawing
  areaAcres: number;
  areaGuntas: number;
  areaHectares: number;
  perimeterMeters: number;
}

export interface FarmerProfile {
  id: string;
  name: string;
  nameTelugu: string;
  phone: string;
  village: string;
  mandal: string; // Mandal / Taluk / Tehsil / Block based on state
  district: string;
  state: string; // Any of the 28 States and 8 UTs
  subDistrictTerminology?: string;
  preferredLanguage: Language;
  ownership: LandOwnership;
  pmKisanId?: string;
  rythuBandhuId?: string;
  registeredDate: string;
}

export interface Farm {
  id: string;
  farmerId: string;
  name: string;
  surveyNumber: string;
  soilType: SoilType;
  irrigationType: IrrigationType;
  boundary: FarmBoundary;
  centerLocation: Coordinates;
  elevationMeters: number;
  agroZone: string;
}

export interface SoilTestRecord {
  id: string;
  farmId: string;
  testDate: string;
  pH: number;
  ec: number; // dS/m
  organicCarbon: number; // %
  nitrogen: number; // kg/ha
  phosphorus: number; // kg/ha
  potassium: number; // kg/ha
  zinc: number; // ppm
  iron: number; // ppm
  boron: number; // ppm
  overallScore: number; // 0 - 100
  status: 'OPTIMAL' | 'MODERATE' | 'DEFICIENT';
  recommendationsEn: string[];
  recommendationsTe: string[];
}

export interface CropInfo {
  id: string;
  nameEn: string;
  nameTe: string;
  category: 'CEREAL' | 'PULSE' | 'FIBER' | 'COMMERCIAL' | 'OILSEED' | 'VEGETABLE' | 'SPICE';
  suitableSeasons: Season[];
  suitableSoils: SoilType[];
  durationDays: number;
  waterRequirementMm: number;
  expectedYieldPerAcre: string;
  avgMarketPricePerQuintal: number;
  cultivationCostPerAcre: number;
  expectedNetReturnPerAcre: number;
  riskScore: 'LOW' | 'MEDIUM' | 'HIGH';
  rationaleEn: string;
  rationaleTe: string;
}

export interface ActiveCrop {
  id: string;
  farmId: string;
  cropId: string;
  cropNameEn: string;
  cropNameTe: string;
  sowingDate: string;
  currentStage: 'GERMINATION' | 'VEGETATIVE' | 'FLOWERING' | 'GRAIN_POD_FILLING' | 'MATURITY';
  stageDays: number;
  expectedHarvestDate: string;
  status: 'ACTIVE' | 'HARVESTED';
}

export interface WeatherDay {
  date: string;
  dayNameEn: string;
  dayNameTe: string;
  tempMax: number;
  tempMin: number;
  humidity: number; // %
  rainfallMm: number;
  rainProbability: number; // %
  windSpeedKmh: number;
  condition: 'SUNNY' | 'PARTLY_CLOUDY' | 'RAINY' | 'HEAVY_RAIN' | 'STORMY';
  conditionTe: string;
  sprayAdvisory: {
    canSpray: boolean;
    reasonEn: string;
    reasonTe: string;
  };
  fertilizerAdvisory: {
    canApply: boolean;
    reasonEn: string;
    reasonTe: string;
  };
}

export interface DiseaseRecord {
  id: string;
  cropName: string;
  diseaseNameEn: string;
  diseaseNameTe: string;
  pathogenType: 'FUNGAL' | 'BACTERIAL' | 'VIRAL' | 'PEST_INSECT';
  severity: 'LOW' | 'MODERATE' | 'SEVERE';
  symptomsEn: string[];
  symptomsTe: string[];
  chemicalControlEn: {
    chemicalName: string;
    commercialBrands: string;
    dosagePerLiter: string;
    dosagePer16LPump: string;
    dosagePerAcre: string;
    phiDays: number;
  };
  chemicalControlTe: {
    chemicalName: string;
    commercialBrands: string;
    dosagePerLiter: string;
    dosagePer16LPump: string;
    dosagePerAcre: string;
    phiDays: number;
  };
  organicControlEn: string;
  organicControlTe: string;
  culturalPracticesEn: string[];
  culturalPracticesTe: string[];
  confidence: number;
}

export interface FertilizerStagePlan {
  stageNameEn: string;
  stageNameTe: string;
  daysAfterSowing: string;
  ureaKg: number;
  dapKg: number;
  mopKg: number;
  sspKg: number;
  zincSulphateKg: number;
  nanoUreaBottles: number;
  applicationMethodEn: string;
  applicationMethodTe: string;
  status: 'PENDING' | 'APPLIED' | 'OVERDUE';
}

export interface ExpertProfile {
  id: string;
  name: string;
  titleEn: string;
  titleTe: string;
  specializationEn: string;
  specializationTe: string;
  institution: string;
  rating: number;
  reviewsCount: number;
  avatarUrl: string;
  available: boolean;
  languages: string[];
}

export interface ConsultationTicket {
  id: string;
  farmerId: string;
  expertId?: string;
  title: string;
  queryType: 'PEST_DISEASE' | 'SOIL_FERTILIZER' | 'WATER_IRRIGATION' | 'GOVT_SCHEME';
  description: string;
  photoUrl?: string;
  status: 'OPEN' | 'ASSIGNED' | 'RESOLVED';
  createdAt: string;
  messages: {
    id: string;
    sender: 'FARMER' | 'EXPERT';
    senderName: string;
    text: string;
    sentAt: string;
    isAudio?: boolean;
    audioUrl?: string;
  }[];
}

export interface FieldVisitBooking {
  id: string;
  farmId: string;
  expertId: string;
  farmerName: string;
  scheduledDate: string;
  visitReason: string;
  status: 'BOOKED' | 'COMPLETED' | 'CANCELLED';
  scoutReport?: {
    visitTimestamp: string;
    gpsVerified: boolean;
    pestIncidencePercentage: number;
    weedInfestationLevel: 'LOW' | 'MEDIUM' | 'HIGH';
    soilMoistureStatus: 'OPTIMAL' | 'STRESSED' | 'EXCESSIVE';
    expertObservationsEn: string;
    expertObservationsTe: string;
    actionRecommendationsEn: string[];
    actionRecommendationsTe: string[];
    expertSignature: string;
  };
}

export interface TreatmentTask {
  id: string;
  cropName: string;
  targetIssue: string;
  actionEn: string;
  actionTe: string;
  dosage: string;
  scheduledDate: string;
  completed: boolean;
  statusRating?: 'RESOLVED' | 'IMPROVED' | 'NO_CHANGE';
}

export interface FinancialEntry {
  id: string;
  farmId: string;
  season: Season;
  year: number;
  type: 'EXPENSE' | 'INCOME';
  category: 'SEEDS' | 'FERTILIZER' | 'PESTICIDE' | 'LABOR' | 'TRACTOR_MACHINERY' | 'IRRIGATION' | 'HARVEST_SALE';
  categoryTe: string;
  title: string;
  amount: number;
  date: string;
  notes?: string;
}

export interface LanguageMeta {
  code: Language;
  locale: SupportedLocale;
  label: string;
  nativeLabel: string;
  speechCode: string;
  flagEmoji?: string;
}

export type UserRole = 'FARMER' | 'EXPERT' | 'ADMIN' | 'SUPER_ADMIN';

export interface User {
  id: string;
  name: string;
  firstName?: string;
  lastName?: string;
  first_name?: string;
  last_name?: string;
  phone: string;
  mobile_number?: string;
  mobile_verified?: boolean;
  email?: string;
  role: UserRole;
  preferredLanguage: Language;
  preferred_language?: string;
  village?: string;
  mandal?: string;
  district?: string;
  state?: string;
  avatarUrl?: string;
  createdAt: string;
  created_at?: string;
  updated_at?: string;
}

export interface AuthState {
  user: User | null;
  role: UserRole;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export type SearchResultType =
  | 'farm'
  | 'crop'
  | 'soil'
  | 'weather'
  | 'pest'
  | 'irrigation'
  | 'fertilizer'
  | 'consultation'
  | 'scout'
  | 'ledger'
  | 'help';

export interface SearchResult {
  id: string;
  title: string;
  subtitle: string;
  type: SearchResultType;
  route: string;
  badge?: string;
  relevanceScore?: number;
}

export interface SearchResponse {
  query: string;
  language: string;
  total: number;
  isQuestion: boolean;
  intent: 'SEARCH' | 'AI_QUESTION';
  results: SearchResult[];
}

export interface AiAdviceResponse {
  question: string;
  language: Language;
  detectedIntent: string;
  cropContext?: string;
  whatIsHappening: string;
  why: string;
  whatShouldIDoNow: string[];
  whenToContactExpert: string;
  timestamp: string;
}

export type SpeechServiceState = 'idle' | 'listening' | 'processing' | 'success' | 'error' | 'permission_denied';

// ==========================================
// SCALABLE MULTILINGUAL CROP DATABASE TYPES
// ==========================================

export type CropCategory =
  | 'CEREAL'
  | 'PULSE'
  | 'VEGETABLE'
  | 'OILSEED'
  | 'SPICE'
  | 'FRUIT'
  | 'COMMERCIAL'
  | 'OTHER';

export interface CropStageItem {
  stageName: string;
  stageNameTe?: string;
  daysRange: string;
  description: string;
  waterNeed: 'Low' | 'Moderate' | 'High' | 'Critical';
  keyAction: string;
}

export interface LocalizedCropContent {
  name: string;
  localNames: string[];
  whatIsThis: string;
  growingSeason: string;
  soilRequirements: string;
  waterRequirements: string;
  mainStages: string[];
  whatToMonitor: string[];
  commonPestsAndDiseases: string[];
  generalCare: string;
  whenToContactExpert: string;
}

export interface CropEntity {
  id: string;
  category: CropCategory;
  scientificName: string;
  iconEmoji: string;
  durationDays: number;
  waterRequirementMm: number;
  expectedYieldPerAcre: string;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  suitableSeasons: Season[];
  suitableSoils: SoilType[];
  aliases: string[];
  stages: CropStageItem[];
  translations: Record<Language, LocalizedCropContent>;
  isCustomAdded?: boolean;
  createdAt?: string;
}

export interface FarmerFavoriteCrop {
  id: string;
  farmerId: string;
  cropId: string;
  addedAt: string;
}

export interface FarmerRecentSearch {
  id: string;
  farmerId: string;
  query: string;
  timestamp: string;
}

export interface CropSearchResponse extends SearchResponse {
  crops: Array<{
    id: string;
    name: string;
    category: CropCategory;
    iconEmoji: string;
    durationDays: number;
    expectedYieldPerAcre: string;
    riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
    summary: string;
    matchedAlias?: string;
  }>;
  activeFarmMatch?: {
    cropId: string;
    cropName: string;
    fieldArea: number;
    stage: string;
    healthScore: number;
    weatherRisk: string;
    sprayAlert: string;
  };
}
