import { Language } from '@/types';

export type SubDistrictTerminology =
  | 'MANDAL'
  | 'TALUK'
  | 'TALUKA'
  | 'TEHSIL'
  | 'BLOCK'
  | 'SUB_DIVISION';

export interface StateUT {
  code: string; // e.g. "IN-AP", "IN-KA", "IN-UP" (ISO 3166-2:IN)
  lgdCode: number; // Local Government Directory Code (Ministry of Panchayati Raj)
  name: string; // Standard English name
  type: 'STATE' | 'UNION_TERRITORY';
  subDistrictTerminology: SubDistrictTerminology;
  terminologyLabel: Record<string, string>; // e.g. { en: 'Mandal', te: 'మండలం', hi: 'मंडल' }
  translations: Record<string, string>; // { te: 'ఆంధ్ర ప్రదేశ్', hi: 'आंध्र प्रदेश', ta: 'ஆந்திரப் பிரதேசம்', ... }
  capital: string;
  totalDistricts: number;
}

export interface District {
  id: string; // e.g. "dist-in-ap-guntur"
  lgdCode?: number;
  stateCode: string;
  stateId?: string;
  name: string;
  localName?: string;
  lgdName?: string;
  headquarters?: string;
  translations?: Record<string, string>;
  agroClimaticZone?: string;
}

export interface Mandal {
  id: string;
  lgdCode?: number;
  districtId: string;
  stateId: string;
  stateCode?: string;
  name: string;
  localName?: string;
  terminology: 'MANDAL';
  translations?: Record<string, string>;
}

export interface SubDistrict {
  id: string; // e.g. "sub-in-ap-tadikonda"
  lgdCode?: number;
  districtId: string;
  stateCode: string;
  stateId?: string;
  name: string;
  localName?: string;
  terminology: SubDistrictTerminology;
  translations?: Record<string, string>;
  totalVillages?: number;
}

export interface Village {
  id: string; // e.g. "vil-in-ap-tadikonda-01"
  lgdCode?: number;
  mandalId?: string;
  subDistrictId: string;
  districtId: string;
  stateCode: string;
  stateId?: string;
  name: string;
  localName?: string;
  pinCode?: string;
  postOfficeName?: string;
  translations?: Record<string, string>;
  isPanchayatHeadquarter?: boolean;
}

export interface PostalMapping {
  id: string;
  villageId?: string;
  mandalId?: string;
  districtId: string;
  stateId: string;
  pinCode: string;
  postOfficeName: string;
  deliveryStatus?: string;
}

export interface AdministrativeLocation {
  country: string;
  state: StateUT;
  district: District;
  subDistrict: SubDistrict;
  village?: Village;
  formattedAddress: string;
  postalCode?: string;
  confidence: number;
  source: 'GPS_REVERSE_GEOCODE' | 'MANUAL_SELECTION' | 'LGD_OFFICIAL';
}

export interface LocationSearchResult {
  id: string;
  name: string;
  localizedName: string;
  type: 'STATE' | 'DISTRICT' | 'SUB_DISTRICT' | 'MANDAL' | 'VILLAGE' | 'POSTAL';
  hierarchyString: string; // e.g. "Village Name, Mandal Name, District Name, State Name, PIN: XXXXXX, Post Office: XXXXX"
  stateCode: string;
  districtId?: string;
  subDistrictId?: string;
  villageId?: string;
  subDistrictTerminology?: SubDistrictTerminology;
  postalCode?: string;
  postOfficeName?: string;
}

export interface LocationSyncLog {
  id: string;
  provider: 'LocalDatabaseProvider' | 'GovernmentLocationProvider' | 'AuthorizedExternalProvider';
  timestamp: string;
  recordsSynced: number;
  status: 'SUCCESS' | 'PARTIAL' | 'FAILED';
  details: string;
  error?: string;
}

export interface LocationProvider {
  getStates(query?: string, lang?: string): Promise<StateUT[]>;
  getDistricts(stateCode: string, query?: string, lang?: string): Promise<District[]>;
  getSubDistricts(districtId: string, query?: string, lang?: string): Promise<SubDistrict[]>;
  getMandals?(districtId: string, query?: string, lang?: string): Promise<Mandal[]>;
  getVillages(
    subDistrictId: string,
    query?: string,
    page?: number,
    limit?: number,
    lang?: string
  ): Promise<{ villages: Village[]; total: number; page: number; limit: number }>;
  getPostalMappings?(villageId?: string, mandalId?: string, query?: string): Promise<PostalMapping[]>;
  searchLocations(query: string, lang?: string, limit?: number): Promise<LocationSearchResult[]>;
  reverseGeocode(lat: number, lng: number): Promise<AdministrativeLocation | null>;
  syncDataset(): Promise<LocationSyncLog>;
}
