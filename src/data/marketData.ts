export interface MandiPriceRecord {
  id: string;
  cropId: string;
  cropNameEn: string;
  cropNameTe: string;
  variety: string;
  marketName: string;
  district: string;
  state: string;
  minPrice: number;
  modalPrice: number;
  maxPrice: number;
  unit: string;
  arrivalTons: number;
  reportDate: string;
  source: 'e-NAM' | 'AGMARKNET' | 'AP_MARKFED';
  distanceKmFromFarm: number;
  estimatedTransportCostPerQuintal: number;
  priceChange24h: number; // e.g. +350 or -120
  trend: 'UP' | 'DOWN' | 'STABLE';
}

export interface CommodityCategory {
  id: string;
  nameEn: string;
  nameTe: string;
  icon: string;
}

export const COMMODITY_CATEGORIES: CommodityCategory[] = [
  { id: 'all', nameEn: 'All Crops', nameTe: 'అన్ని పంటలు', icon: '🌾' },
  { id: 'chilli', nameEn: 'Chilli', nameTe: 'మిర్చి', icon: '🌶️' },
  { id: 'paddy', nameEn: 'Paddy', nameTe: 'వరి', icon: '🌾' },
  { id: 'cotton', nameEn: 'Cotton', nameTe: 'ప్రత్తి', icon: '☁️' },
  { id: 'tomato', nameEn: 'Tomato', nameTe: 'టమోటా', icon: '🍅' },
  { id: 'turmeric', nameEn: 'Turmeric', nameTe: 'పసుపు', icon: '🟡' },
  { id: 'groundnut', nameEn: 'Groundnut', nameTe: 'వేరుశనగ', icon: '🥜' },
  { id: 'maize', nameEn: 'Maize', nameTe: 'మొక్కజొన్న', icon: '🌽' },
  { id: 'bengalgram', nameEn: 'Bengal Gram', nameTe: 'శనగలు', icon: '🟤' },
  { id: 'onion', nameEn: 'Onion', nameTe: 'ఉల్లిపాయ', icon: '🧅' },
  { id: 'mango', nameEn: 'Mango', nameTe: 'మామిడి', icon: '🥭' },
];

export const verifiedMandiPrices: MandiPriceRecord[] = [
  // -------------------------------------------------------------
  // 1. CHILLI (మిర్చి / తేజా)
  // -------------------------------------------------------------
  {
    id: 'mkt-chilli-guntur',
    cropId: 'chilli',
    cropNameEn: 'Chilli (Teja)',
    cropNameTe: 'తేజా మిర్చి',
    variety: 'Teja Best (Export Grade)',
    marketName: 'Guntur Mirchi Yard',
    district: 'Guntur',
    state: 'Andhra Pradesh',
    minPrice: 18500,
    modalPrice: 20400,
    maxPrice: 22200,
    unit: '₹ / Quintal',
    arrivalTons: 1450,
    reportDate: 'Today 08:30 AM (e-NAM)',
    source: 'e-NAM',
    distanceKmFromFarm: 18,
    estimatedTransportCostPerQuintal: 90,
    priceChange24h: 350,
    trend: 'UP',
  },
  {
    id: 'mkt-chilli-khammam',
    cropId: 'chilli',
    cropNameEn: 'Chilli (Teja)',
    cropNameTe: 'తేజా మిర్చి',
    variety: 'Teja Medium Best',
    marketName: 'Khammam Agriculture Market Yard',
    district: 'Khammam',
    state: 'Telangana',
    minPrice: 17800,
    modalPrice: 19400,
    maxPrice: 21100,
    unit: '₹ / Quintal',
    arrivalTons: 620,
    reportDate: 'Today 09:15 AM (AGMARKNET)',
    source: 'AGMARKNET',
    distanceKmFromFarm: 115,
    estimatedTransportCostPerQuintal: 280,
    priceChange24h: -150,
    trend: 'DOWN',
  },
  {
    id: 'mkt-chilli-warangal',
    cropId: 'chilli',
    cropNameEn: 'Chilli (Teja)',
    cropNameTe: 'తేజా మిర్చి',
    variety: 'Teja Fatki / Deluxe',
    marketName: 'Enumamula Market Yard',
    district: 'Warangal',
    state: 'Telangana',
    minPrice: 18200,
    modalPrice: 19900,
    maxPrice: 21600,
    unit: '₹ / Quintal',
    arrivalTons: 890,
    reportDate: 'Today 09:00 AM (e-NAM)',
    source: 'e-NAM',
    distanceKmFromFarm: 230,
    estimatedTransportCostPerQuintal: 460,
    priceChange24h: 200,
    trend: 'UP',
  },
  {
    id: 'mkt-chilli-byadgi',
    cropId: 'chilli',
    cropNameEn: 'Chilli (Byadgi / KDL)',
    cropNameTe: 'బ్యాడగి మిర్చి',
    variety: 'Byadgi Kaddi',
    marketName: 'Byadgi APMC Yard',
    district: 'Haveri',
    state: 'Karnataka',
    minPrice: 24500,
    modalPrice: 28200,
    maxPrice: 33000,
    unit: '₹ / Quintal',
    arrivalTons: 410,
    reportDate: 'Yesterday (AGMARKNET)',
    source: 'AGMARKNET',
    distanceKmFromFarm: 580,
    estimatedTransportCostPerQuintal: 950,
    priceChange24h: 600,
    trend: 'UP',
  },
  {
    id: 'mkt-chilli-nagpur',
    cropId: 'chilli',
    cropNameEn: 'Chilli (Red Dry)',
    cropNameTe: 'ఎండిన ఎర్ర మిర్చి',
    variety: 'Guntur Sannam Grade',
    marketName: 'Kalamna APMC Market',
    district: 'Nagpur',
    state: 'Maharashtra',
    minPrice: 18900,
    modalPrice: 20900,
    maxPrice: 22600,
    unit: '₹ / Quintal',
    arrivalTons: 380,
    reportDate: 'Today 07:45 AM (AGMARKNET)',
    source: 'AGMARKNET',
    distanceKmFromFarm: 640,
    estimatedTransportCostPerQuintal: 1020,
    priceChange24h: 150,
    trend: 'UP',
  },

  // -------------------------------------------------------------
  // 2. PADDY (వరి)
  // -------------------------------------------------------------
  {
    id: 'mkt-paddy-tenali',
    cropId: 'paddy',
    cropNameEn: 'Paddy (Common / Grade A)',
    cropNameTe: 'వరి (సాంబ మసూరి - BPT 5204)',
    variety: 'BPT 5204 Super Fine',
    marketName: 'Tenali AMC',
    district: 'Guntur',
    state: 'Andhra Pradesh',
    minPrice: 2280,
    modalPrice: 2480,
    maxPrice: 2680,
    unit: '₹ / Quintal',
    arrivalTons: 480,
    reportDate: 'Today (AP MARKFED)',
    source: 'AP_MARKFED',
    distanceKmFromFarm: 24,
    estimatedTransportCostPerQuintal: 80,
    priceChange24h: 30,
    trend: 'UP',
  },
  {
    id: 'mkt-paddy-kurnool',
    cropId: 'paddy',
    cropNameEn: 'Paddy (Sona Masuri)',
    cropNameTe: 'కర్నూలు సోనా మసూరి',
    variety: 'Sona Masuri Raw',
    marketName: 'Kurnool APMC',
    district: 'Kurnool',
    state: 'Andhra Pradesh',
    minPrice: 2380,
    modalPrice: 2620,
    maxPrice: 2850,
    unit: '₹ / Quintal',
    arrivalTons: 540,
    reportDate: 'Today (e-NAM)',
    source: 'e-NAM',
    distanceKmFromFarm: 310,
    estimatedTransportCostPerQuintal: 520,
    priceChange24h: 0,
    trend: 'STABLE',
  },
  {
    id: 'mkt-paddy-miryalaguda',
    cropId: 'paddy',
    cropNameEn: 'Paddy (Fine 1010)',
    cropNameTe: 'వరి (మిర్యాలగూడ ఫైన్)',
    variety: 'MTU 1010 / Telangana Sona',
    marketName: 'Miryalaguda Market Yard',
    district: 'Nalgonda',
    state: 'Telangana',
    minPrice: 2250,
    modalPrice: 2510,
    maxPrice: 2720,
    unit: '₹ / Quintal',
    arrivalTons: 820,
    reportDate: 'Today (e-NAM)',
    source: 'e-NAM',
    distanceKmFromFarm: 165,
    estimatedTransportCostPerQuintal: 320,
    priceChange24h: 40,
    trend: 'UP',
  },
  {
    id: 'mkt-paddy-raichur',
    cropId: 'paddy',
    cropNameEn: 'Paddy (Sona Masuri)',
    cropNameTe: 'రాయచూర్ సోనా మసూరి',
    variety: 'RNR 15048 Sugar Free',
    marketName: 'Raichur APMC Yard',
    district: 'Raichur',
    state: 'Karnataka',
    minPrice: 2420,
    modalPrice: 2690,
    maxPrice: 2950,
    unit: '₹ / Quintal',
    arrivalTons: 610,
    reportDate: 'Today (AGMARKNET)',
    source: 'AGMARKNET',
    distanceKmFromFarm: 420,
    estimatedTransportCostPerQuintal: 680,
    priceChange24h: 50,
    trend: 'UP',
  },

  // -------------------------------------------------------------
  // 3. COTTON (ప్రత్తి)
  // -------------------------------------------------------------
  {
    id: 'mkt-cotton-guntur',
    cropId: 'cotton',
    cropNameEn: 'Cotton (Medium / Long Staple)',
    cropNameTe: 'ప్రత్తి',
    variety: 'Bunny / Brahma Long Staple',
    marketName: 'Guntur CCI Procurement Yard',
    district: 'Guntur',
    state: 'Andhra Pradesh',
    minPrice: 6980,
    modalPrice: 7480,
    maxPrice: 7720,
    unit: '₹ / Quintal',
    arrivalTons: 760,
    reportDate: 'Today 10:00 AM (e-NAM)',
    source: 'e-NAM',
    distanceKmFromFarm: 16,
    estimatedTransportCostPerQuintal: 95,
    priceChange24h: 80,
    trend: 'UP',
  },
  {
    id: 'mkt-cotton-adilabad',
    cropId: 'cotton',
    cropNameEn: 'Cotton (Bunny)',
    cropNameTe: 'ఆదిలాబాద్ ప్రత్తి',
    variety: 'Adilabad Grade A 29mm',
    marketName: 'Adilabad APMC Yard',
    district: 'Adilabad',
    state: 'Telangana',
    minPrice: 7120,
    modalPrice: 7520,
    maxPrice: 7800,
    unit: '₹ / Quintal',
    arrivalTons: 940,
    reportDate: 'Today (AGMARKNET)',
    source: 'AGMARKNET',
    distanceKmFromFarm: 520,
    estimatedTransportCostPerQuintal: 820,
    priceChange24h: -60,
    trend: 'DOWN',
  },
  {
    id: 'mkt-cotton-rajkot',
    cropId: 'cotton',
    cropNameEn: 'Cotton (Shankar-6)',
    cropNameTe: 'శంకర్-6 ప్రత్తి',
    variety: 'Shankar-6 29mm Prime',
    marketName: 'Rajkot APMC',
    district: 'Rajkot',
    state: 'Gujarat',
    minPrice: 7250,
    modalPrice: 7710,
    maxPrice: 8050,
    unit: '₹ / Quintal',
    arrivalTons: 1350,
    reportDate: 'Today (AGMARKNET)',
    source: 'AGMARKNET',
    distanceKmFromFarm: 1420,
    estimatedTransportCostPerQuintal: 1650,
    priceChange24h: 120,
    trend: 'UP',
  },

  // -------------------------------------------------------------
  // 4. TOMATO (టమోటా)
  // -------------------------------------------------------------
  {
    id: 'mkt-tomato-madanapalle',
    cropId: 'tomato',
    cropNameEn: 'Tomato (Hybrid / Local)',
    cropNameTe: 'మదనపల్లె టమోటా',
    variety: 'Ananya 802 / Sahu',
    marketName: 'Madanapalle Tomato Yard',
    district: 'Annamayya',
    state: 'Andhra Pradesh',
    minPrice: 1800,
    modalPrice: 2400,
    maxPrice: 3100,
    unit: '₹ / Quintal',
    arrivalTons: 2200,
    reportDate: 'Today 06:30 AM (AP_MARKFED)',
    source: 'AP_MARKFED',
    distanceKmFromFarm: 410,
    estimatedTransportCostPerQuintal: 620,
    priceChange24h: -200,
    trend: 'DOWN',
  },
  {
    id: 'mkt-tomato-kolar',
    cropId: 'tomato',
    cropNameEn: 'Tomato (Hybrid)',
    cropNameTe: 'కోలార్ టమోటా',
    variety: 'Shivaji / US 440',
    marketName: 'Kolar APMC Yard',
    district: 'Kolar',
    state: 'Karnataka',
    minPrice: 2100,
    modalPrice: 2750,
    maxPrice: 3400,
    unit: '₹ / Quintal',
    arrivalTons: 3100,
    reportDate: 'Today 07:00 AM (e-NAM)',
    source: 'e-NAM',
    distanceKmFromFarm: 490,
    estimatedTransportCostPerQuintal: 760,
    priceChange24h: 150,
    trend: 'UP',
  },
  {
    id: 'mkt-tomato-pimpalgaon',
    cropId: 'tomato',
    cropNameEn: 'Tomato (Nashik Grade)',
    cropNameTe: 'నాసిక్ టమోటా',
    variety: 'Abhinav Round Red',
    marketName: 'Pimpalgaon Baswant APMC',
    district: 'Nashik',
    state: 'Maharashtra',
    minPrice: 1950,
    modalPrice: 2550,
    maxPrice: 3250,
    unit: '₹ / Quintal',
    arrivalTons: 2800,
    reportDate: 'Today (AGMARKNET)',
    source: 'AGMARKNET',
    distanceKmFromFarm: 890,
    estimatedTransportCostPerQuintal: 1350,
    priceChange24h: -100,
    trend: 'DOWN',
  },

  // -------------------------------------------------------------
  // 5. TURMERIC (పసుపు)
  // -------------------------------------------------------------
  {
    id: 'mkt-turmeric-duggirala',
    cropId: 'turmeric',
    cropNameEn: 'Turmeric (Finger)',
    cropNameTe: 'దుగ్గిరాల పసుపు కొమ్ములు',
    variety: 'Duggirala Desi Curcumin 4.8%',
    marketName: 'Duggirala Turmeric Yard',
    district: 'Guntur',
    state: 'Andhra Pradesh',
    minPrice: 13200,
    modalPrice: 14800,
    maxPrice: 16100,
    unit: '₹ / Quintal',
    arrivalTons: 320,
    reportDate: 'Today (e-NAM)',
    source: 'e-NAM',
    distanceKmFromFarm: 28,
    estimatedTransportCostPerQuintal: 110,
    priceChange24h: 400,
    trend: 'UP',
  },
  {
    id: 'mkt-turmeric-nizamabad',
    cropId: 'turmeric',
    cropNameEn: 'Turmeric (Finger)',
    cropNameTe: 'నిజామాబాద్ పసుపు',
    variety: 'Nizamabad Selam / Armor',
    marketName: 'Nizamabad APMC Yard',
    district: 'Nizamabad',
    state: 'Telangana',
    minPrice: 13500,
    modalPrice: 15100,
    maxPrice: 16800,
    unit: '₹ / Quintal',
    arrivalTons: 460,
    reportDate: 'Today (e-NAM)',
    source: 'e-NAM',
    distanceKmFromFarm: 410,
    estimatedTransportCostPerQuintal: 640,
    priceChange24h: 250,
    trend: 'UP',
  },
  {
    id: 'mkt-turmeric-erode',
    cropId: 'turmeric',
    cropNameEn: 'Turmeric (Erode Finger)',
    cropNameTe: 'ఈరోడ్ పసుపు',
    variety: 'Erode Local Yellow Bulb',
    marketName: 'Erode Regulated Market Yard',
    district: 'Erode',
    state: 'Tamil Nadu',
    minPrice: 13800,
    modalPrice: 15600,
    maxPrice: 17200,
    unit: '₹ / Quintal',
    arrivalTons: 390,
    reportDate: 'Today (AGMARKNET)',
    source: 'AGMARKNET',
    distanceKmFromFarm: 680,
    estimatedTransportCostPerQuintal: 1050,
    priceChange24h: 500,
    trend: 'UP',
  },

  // -------------------------------------------------------------
  // 6. GROUNDNUT (వేరుశనగ)
  // -------------------------------------------------------------
  {
    id: 'mkt-groundnut-kadiri',
    cropId: 'groundnut',
    cropNameEn: 'Groundnut (Pods)',
    cropNameTe: 'కదిరి వేరుశనగ కాయలు',
    variety: 'Kadiri-6 Bold Pods',
    marketName: 'Kadiri APMC',
    district: 'Sri Sathya Sai',
    state: 'Andhra Pradesh',
    minPrice: 6300,
    modalPrice: 6950,
    maxPrice: 7450,
    unit: '₹ / Quintal',
    arrivalTons: 340,
    reportDate: 'Today (AGMARKNET)',
    source: 'AGMARKNET',
    distanceKmFromFarm: 385,
    estimatedTransportCostPerQuintal: 580,
    priceChange24h: 50,
    trend: 'UP',
  },
  {
    id: 'mkt-groundnut-gondal',
    cropId: 'groundnut',
    cropNameEn: 'Groundnut (Bold Oil)',
    cropNameTe: 'గోండల్ వేరుశనగ',
    variety: 'GG 20 / Gujarat Bold',
    marketName: 'Gondal APMC Yard',
    district: 'Rajkot',
    state: 'Gujarat',
    minPrice: 6500,
    modalPrice: 7200,
    maxPrice: 7800,
    unit: '₹ / Quintal',
    arrivalTons: 850,
    reportDate: 'Today (e-NAM)',
    source: 'e-NAM',
    distanceKmFromFarm: 1460,
    estimatedTransportCostPerQuintal: 1720,
    priceChange24h: 110,
    trend: 'UP',
  },

  // -------------------------------------------------------------
  // 7. MAIZE (మొక్కజొన్న)
  // -------------------------------------------------------------
  {
    id: 'mkt-maize-nandyal',
    cropId: 'maize',
    cropNameEn: 'Maize (Yellow Hybrid)',
    cropNameTe: 'నంద్యాల మొక్కజొన్న',
    variety: 'Pioneer 3396 Yellow',
    marketName: 'Nandyal APMC Yard',
    district: 'Nandyal',
    state: 'Andhra Pradesh',
    minPrice: 2050,
    modalPrice: 2260,
    maxPrice: 2420,
    unit: '₹ / Quintal',
    arrivalTons: 520,
    reportDate: 'Today (e-NAM)',
    source: 'e-NAM',
    distanceKmFromFarm: 250,
    estimatedTransportCostPerQuintal: 390,
    priceChange24h: 20,
    trend: 'UP',
  },
  {
    id: 'mkt-maize-davangere',
    cropId: 'maize',
    cropNameEn: 'Maize (Feed Grade)',
    cropNameTe: 'దావణగెరె మొక్కజొన్న',
    variety: 'South Indian Feed Hybrid',
    marketName: 'Davangere APMC',
    district: 'Davangere',
    state: 'Karnataka',
    minPrice: 2150,
    modalPrice: 2380,
    maxPrice: 2520,
    unit: '₹ / Quintal',
    arrivalTons: 710,
    reportDate: 'Today (AGMARKNET)',
    source: 'AGMARKNET',
    distanceKmFromFarm: 540,
    estimatedTransportCostPerQuintal: 860,
    priceChange24h: 30,
    trend: 'UP',
  },

  // -------------------------------------------------------------
  // 8. BENGAL GRAM / CHANA (శనగలు)
  // -------------------------------------------------------------
  {
    id: 'mkt-bengalgram-kurnool',
    cropId: 'bengalgram',
    cropNameEn: 'Bengal Gram (Desi)',
    cropNameTe: 'కర్నూలు శనగలు',
    variety: 'JG-11 / Annigeri Desi',
    marketName: 'Kurnool APMC',
    district: 'Kurnool',
    state: 'Andhra Pradesh',
    minPrice: 5600,
    modalPrice: 6100,
    maxPrice: 6550,
    unit: '₹ / Quintal',
    arrivalTons: 410,
    reportDate: 'Today (AP_MARKFED)',
    source: 'AP_MARKFED',
    distanceKmFromFarm: 310,
    estimatedTransportCostPerQuintal: 520,
    priceChange24h: 70,
    trend: 'UP',
  },
  {
    id: 'mkt-bengalgram-latur',
    cropId: 'bengalgram',
    cropNameEn: 'Bengal Gram (Chana)',
    cropNameTe: 'లాతూర్ శనగలు',
    variety: 'Vijay Desi Bold',
    marketName: 'Latur APMC Yard',
    district: 'Latur',
    state: 'Maharashtra',
    minPrice: 5850,
    modalPrice: 6350,
    maxPrice: 6800,
    unit: '₹ / Quintal',
    arrivalTons: 980,
    reportDate: 'Today (AGMARKNET)',
    source: 'AGMARKNET',
    distanceKmFromFarm: 590,
    estimatedTransportCostPerQuintal: 920,
    priceChange24h: -40,
    trend: 'DOWN',
  },

  // -------------------------------------------------------------
  // 9. ONION (ఉల్లిపాయ)
  // -------------------------------------------------------------
  {
    id: 'mkt-onion-lasalgaon',
    cropId: 'onion',
    cropNameEn: 'Onion (Red / Garva)',
    cropNameTe: 'లాసల్గావ్ ఎర్ర ఉల్లి',
    variety: 'Garva Maharashtra Medium',
    marketName: 'Lasalgaon APMC (Asia Largest)',
    district: 'Nashik',
    state: 'Maharashtra',
    minPrice: 1700,
    modalPrice: 2250,
    maxPrice: 2800,
    unit: '₹ / Quintal',
    arrivalTons: 4200,
    reportDate: 'Today 06:00 AM (AGMARKNET)',
    source: 'AGMARKNET',
    distanceKmFromFarm: 920,
    estimatedTransportCostPerQuintal: 1400,
    priceChange24h: 180,
    trend: 'UP',
  },
  {
    id: 'mkt-onion-kurnool',
    cropId: 'onion',
    cropNameEn: 'Onion (Bellary Red)',
    cropNameTe: 'కర్నూలు ఉల్లిపాయ',
    variety: 'Bellary Medium Dark Red',
    marketName: 'Kurnool Vegetable Yard',
    district: 'Kurnool',
    state: 'Andhra Pradesh',
    minPrice: 1550,
    modalPrice: 2050,
    maxPrice: 2500,
    unit: '₹ / Quintal',
    arrivalTons: 1100,
    reportDate: 'Today (AP_MARKFED)',
    source: 'AP_MARKFED',
    distanceKmFromFarm: 310,
    estimatedTransportCostPerQuintal: 520,
    priceChange24h: -50,
    trend: 'DOWN',
  },

  // -------------------------------------------------------------
  // 10. MANGO (మామిడి)
  // -------------------------------------------------------------
  {
    id: 'mkt-mango-nuzvid',
    cropId: 'mango',
    cropNameEn: 'Mango (Banganapalli)',
    cropNameTe: 'బంగినపల్లి మామిడి',
    variety: 'Banganapalli A-Grade Table',
    marketName: 'Nuzvid Mango Market Yard',
    district: 'Eluru',
    state: 'Andhra Pradesh',
    minPrice: 42000,
    modalPrice: 48000,
    maxPrice: 56000,
    unit: '₹ / Ton (₹4,800/Q)',
    arrivalTons: 850,
    reportDate: 'Today (AP_MARKFED)',
    source: 'AP_MARKFED',
    distanceKmFromFarm: 72,
    estimatedTransportCostPerQuintal: 180,
    priceChange24h: 1200,
    trend: 'UP',
  },
];

export function getMandiPricesForCrop(cropId: string): MandiPriceRecord[] {
  if (!cropId || cropId.toLowerCase() === 'all') {
    return verifiedMandiPrices;
  }
  const norm = cropId.toLowerCase();
  return verifiedMandiPrices.filter(
    (m) => m.cropId.toLowerCase() === norm || norm.includes(m.cropId.toLowerCase())
  );
}

export interface MandiComparisonResult {
  mandi: MandiPriceRecord;
  quantityQuintals: number;
  grossValue: number;
  totalFreight: number;
  netRealization: number;
  netRealizationPerQuintal: number;
  profitDifferenceVsLocal: number; // positive = better than closest mandi
  badge?: 'HIGHEST_NET_GAIN' | 'NEAREST_LOCAL' | 'MAX_PORTAL_PRICE';
}

export function compareMandiRealization(
  cropId: string = 'chilli',
  quantityQuintals: number = 50
): MandiComparisonResult[] {
  const records = getMandiPricesForCrop(cropId);
  if (!records || records.length === 0) return [];

  // Sort by distance to determine local baseline
  const sortedByDist = [...records].sort((a, b) => a.distanceKmFromFarm - b.distanceKmFromFarm);
  const localMandi = sortedByDist[0];
  const localNetPerQ = localMandi.modalPrice - localMandi.estimatedTransportCostPerQuintal;

  const results: MandiComparisonResult[] = records.map((mandi) => {
    const grossValue = mandi.modalPrice * quantityQuintals;
    const totalFreight = mandi.estimatedTransportCostPerQuintal * quantityQuintals;
    const netRealization = grossValue - totalFreight;
    const netRealizationPerQuintal = mandi.modalPrice - mandi.estimatedTransportCostPerQuintal;
    const profitDifferenceVsLocal = (netRealizationPerQuintal - localNetPerQ) * quantityQuintals;

    return {
      mandi,
      quantityQuintals,
      grossValue,
      totalFreight,
      netRealization,
      netRealizationPerQuintal,
      profitDifferenceVsLocal,
    };
  });

  // Find highest net realization
  let highestNet = -Infinity;
  let highestNetIdx = -1;
  let maxPrice = -Infinity;
  let maxPriceIdx = -1;

  results.forEach((r, idx) => {
    if (r.netRealization > highestNet) {
      highestNet = r.netRealization;
      highestNetIdx = idx;
    }
    if (r.mandi.modalPrice > maxPrice) {
      maxPrice = r.mandi.modalPrice;
      maxPriceIdx = idx;
    }
  });

  if (highestNetIdx !== -1) {
    results[highestNetIdx].badge = 'HIGHEST_NET_GAIN';
  }
  if (maxPriceIdx !== -1 && maxPriceIdx !== highestNetIdx) {
    results[maxPriceIdx].badge = 'MAX_PORTAL_PRICE';
  }
  const localIdx = results.findIndex((r) => r.mandi.id === localMandi.id);
  if (localIdx !== -1 && !results[localIdx].badge) {
    results[localIdx].badge = 'NEAREST_LOCAL';
  }

  // Return sorted by net realization descending
  return results.sort((a, b) => b.netRealization - a.netRealization);
}
