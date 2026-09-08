export interface StateReconciliation {
  stateCode: string;
  name: string;
  type: 'STATE' | 'UT';
  terminology: string;
  officialDistricts: number;
  officialSubDistricts: number;
  officialVillages: number;
}

export const LGD_OFFICIAL_COUNTS: StateReconciliation[] = [
  // 28 STATES
  { stateCode: 'IN-AP', name: 'Andhra Pradesh', type: 'STATE', terminology: 'MANDAL', officialDistricts: 26, officialSubDistricts: 679, officialVillages: 17398 },
  { stateCode: 'IN-AR', name: 'Arunachal Pradesh', type: 'STATE', terminology: 'SUB_DIVISION', officialDistricts: 26, officialSubDistricts: 149, officialVillages: 5589 },
  { stateCode: 'IN-AS', name: 'Assam', type: 'STATE', terminology: 'SUB_DIVISION', officialDistricts: 35, officialSubDistricts: 154, officialVillages: 26395 },
  { stateCode: 'IN-BR', name: 'Bihar', type: 'STATE', terminology: 'BLOCK', officialDistricts: 38, officialSubDistricts: 534, officialVillages: 45103 },
  { stateCode: 'IN-CT', name: 'Chhattisgarh', type: 'STATE', terminology: 'TEHSIL', officialDistricts: 33, officialSubDistricts: 230, officialVillages: 20576 },
  { stateCode: 'IN-GA', name: 'Goa', type: 'STATE', terminology: 'TALUKA', officialDistricts: 2, officialSubDistricts: 12, officialVillages: 411 },
  { stateCode: 'IN-GJ', name: 'Gujarat', type: 'STATE', terminology: 'TALUKA', officialDistricts: 33, officialSubDistricts: 252, officialVillages: 18584 },
  { stateCode: 'IN-HR', name: 'Haryana', type: 'STATE', terminology: 'TEHSIL', officialDistricts: 22, officialSubDistricts: 95, officialVillages: 7356 },
  { stateCode: 'IN-HP', name: 'Himachal Pradesh', type: 'STATE', terminology: 'TEHSIL', officialDistricts: 12, officialSubDistricts: 175, officialVillages: 20690 },
  { stateCode: 'IN-JH', name: 'Jharkhand', type: 'STATE', terminology: 'BLOCK', officialDistricts: 24, officialSubDistricts: 260, officialVillages: 32394 },
  { stateCode: 'IN-KA', name: 'Karnataka', type: 'STATE', terminology: 'TALUK', officialDistricts: 31, officialSubDistricts: 240, officialVillages: 29340 },
  { stateCode: 'IN-KL', name: 'Kerala', type: 'STATE', terminology: 'TALUK', officialDistricts: 14, officialSubDistricts: 77, officialVillages: 1664 },
  { stateCode: 'IN-MP', name: 'Madhya Pradesh', type: 'STATE', terminology: 'TEHSIL', officialDistricts: 55, officialSubDistricts: 428, officialVillages: 54903 },
  { stateCode: 'IN-MH', name: 'Maharashtra', type: 'STATE', terminology: 'TALUKA', officialDistricts: 36, officialSubDistricts: 358, officialVillages: 43665 },
  { stateCode: 'IN-MN', name: 'Manipur', type: 'STATE', terminology: 'SUB_DIVISION', officialDistricts: 16, officialSubDistricts: 68, officialVillages: 2582 },
  { stateCode: 'IN-ML', name: 'Meghalaya', type: 'STATE', terminology: 'BLOCK', officialDistricts: 12, officialSubDistricts: 46, officialVillages: 6839 },
  { stateCode: 'IN-MZ', name: 'Mizoram', type: 'STATE', terminology: 'BLOCK', officialDistricts: 11, officialSubDistricts: 26, officialVillages: 830 },
  { stateCode: 'IN-NL', name: 'Nagaland', type: 'STATE', terminology: 'SUB_DIVISION', officialDistricts: 16, officialSubDistricts: 74, officialVillages: 1428 },
  { stateCode: 'IN-OD', name: 'Odisha', type: 'STATE', terminology: 'BLOCK', officialDistricts: 30, officialSubDistricts: 317, officialVillages: 51313 },
  { stateCode: 'IN-PB', name: 'Punjab', type: 'STATE', terminology: 'TEHSIL', officialDistricts: 23, officialSubDistricts: 97, officialVillages: 12581 },
  { stateCode: 'IN-RJ', name: 'Rajasthan', type: 'STATE', terminology: 'TEHSIL', officialDistricts: 50, officialSubDistricts: 350, officialVillages: 45888 },
  { stateCode: 'IN-SK', name: 'Sikkim', type: 'STATE', terminology: 'SUB_DIVISION', officialDistricts: 6, officialSubDistricts: 16, officialVillages: 452 },
  { stateCode: 'IN-TN', name: 'Tamil Nadu', type: 'STATE', terminology: 'TALUK', officialDistricts: 38, officialSubDistricts: 313, officialVillages: 15979 },
  { stateCode: 'IN-TG', name: 'Telangana', type: 'STATE', terminology: 'MANDAL', officialDistricts: 33, officialSubDistricts: 594, officialVillages: 10909 },
  { stateCode: 'IN-TR', name: 'Tripura', type: 'STATE', terminology: 'SUB_DIVISION', officialDistricts: 8, officialSubDistricts: 23, officialVillages: 875 },
  { stateCode: 'IN-UP', name: 'Uttar Pradesh', type: 'STATE', terminology: 'TEHSIL', officialDistricts: 75, officialSubDistricts: 351, officialVillages: 106774 },
  { stateCode: 'IN-UT', name: 'Uttarakhand', type: 'STATE', terminology: 'TEHSIL', officialDistricts: 13, officialSubDistricts: 110, officialVillages: 16793 },
  { stateCode: 'IN-WB', name: 'West Bengal', type: 'STATE', terminology: 'BLOCK', officialDistricts: 23, officialSubDistricts: 345, officialVillages: 40218 },

  // 8 UNION TERRITORIES
  { stateCode: 'IN-AN', name: 'Andaman & Nicobar Islands', type: 'UT', terminology: 'TEHSIL', officialDistricts: 3, officialSubDistricts: 9, officialVillages: 555 },
  { stateCode: 'IN-CH', name: 'Chandigarh', type: 'UT', terminology: 'TEHSIL', officialDistricts: 1, officialSubDistricts: 1, officialVillages: 13 },
  { stateCode: 'IN-DH', name: 'Dadra & Nagar Haveli and Daman & Diu', type: 'UT', terminology: 'TALUKA', officialDistricts: 3, officialSubDistricts: 3, officialVillages: 96 },
  { stateCode: 'IN-DL', name: 'Delhi (NCT)', type: 'UT', terminology: 'TEHSIL', officialDistricts: 11, officialSubDistricts: 33, officialVillages: 112 },
  { stateCode: 'IN-JK', name: 'Jammu & Kashmir', type: 'UT', terminology: 'TEHSIL', officialDistricts: 20, officialSubDistricts: 207, officialVillages: 6658 },
  { stateCode: 'IN-LA', name: 'Ladakh', type: 'UT', terminology: 'TEHSIL', officialDistricts: 2, officialSubDistricts: 14, officialVillages: 242 },
  { stateCode: 'IN-LD', name: 'Lakshadweep', type: 'UT', terminology: 'SUB_DIVISION', officialDistricts: 1, officialSubDistricts: 10, officialVillages: 24 },
  { stateCode: 'IN-PY', name: 'Puducherry', type: 'UT', terminology: 'TALUK', officialDistricts: 2, officialSubDistricts: 8, officialVillages: 129 },
];

export const NATIONAL_LGD_TOTALS = {
  statesAndUTs: 36,
  states: 28,
  unionTerritories: 8,
  districts: 785,
  subDistricts: 7165,
  villages: 664369,
};
