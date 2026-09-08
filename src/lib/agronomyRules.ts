import { FertilizerStagePlan, SoilTestRecord } from '@/types';

// Calculate exact fertilizer bags required for given acreage and crop type
export function calculateFertilizerSchedule(
  cropId: string,
  acres: number
): {
  stages: FertilizerStagePlan[];
  totalBags: {
    urea45kgBags: number;
    dap50kgBags: number;
    mop50kgBags: number;
    zincSulphateKg: number;
    nanoUreaBottles: number;
  };
} {
  // Safe default acreage minimum
  const effectiveAcres = Math.max(0.5, acres);

  // Crop-specific nutrient parameters (Kg pure N-P-K per acre)
  let basalDAP = 25 * effectiveAcres;
  let basalMOP = 15 * effectiveAcres;
  let basalZinc = 10 * effectiveAcres;
  let vegUrea = 30 * effectiveAcres;
  let flowerUrea = 25 * effectiveAcres;
  let flowerMOP = 20 * effectiveAcres;
  let nanoUrea = Math.ceil(effectiveAcres * 2);

  if (cropId === 'chilli') {
    // Chilli requires high potash and multiple splits
    basalDAP = 35 * effectiveAcres;
    basalMOP = 25 * effectiveAcres;
    basalZinc = 12 * effectiveAcres;
    vegUrea = 35 * effectiveAcres;
    flowerUrea = 30 * effectiveAcres;
    flowerMOP = 25 * effectiveAcres;
    nanoUrea = Math.ceil(effectiveAcres * 3);
  } else if (cropId === 'paddy') {
    // Paddy requires 45 kg N, 25 kg P2O5, 20 kg K2O
    basalDAP = 30 * effectiveAcres;
    basalMOP = 15 * effectiveAcres;
    basalZinc = 10 * effectiveAcres;
    vegUrea = 35 * effectiveAcres;
    flowerUrea = 20 * effectiveAcres;
    flowerMOP = 15 * effectiveAcres;
    nanoUrea = Math.ceil(effectiveAcres * 2);
  } else if (cropId === 'cotton') {
    // Bt Cotton heavy feeder in flowering
    basalDAP = 30 * effectiveAcres;
    basalMOP = 20 * effectiveAcres;
    basalZinc = 10 * effectiveAcres;
    vegUrea = 30 * effectiveAcres;
    flowerUrea = 35 * effectiveAcres;
    flowerMOP = 25 * effectiveAcres;
    nanoUrea = Math.ceil(effectiveAcres * 2);
  }

  const stages: FertilizerStagePlan[] = [
    {
      stageNameEn: 'Basal Application (At Sowing / Transplanting)',
      stageNameTe: 'విత్తే సమయంలో / నాటు వేసేటప్పుడు (మొదటి దఫా)',
      daysAfterSowing: 'Day 0 - 5',
      ureaKg: 0,
      dapKg: Math.round(basalDAP),
      mopKg: Math.round(basalMOP),
      sspKg: 0,
      zincSulphateKg: Math.round(basalZinc),
      nanoUreaBottles: 0,
      applicationMethodEn: 'Soil incorporation during last ploughing or ridge placement.',
      applicationMethodTe: 'ఆఖరి దుక్కిలో లేదా సాలులో వేసి కలియబెట్టాలి.',
      status: 'APPLIED',
    },
    {
      stageNameEn: 'Vegetative Stage (First Top-Dressing)',
      stageNameTe: 'శాఖీయ దశ / పైపాటు ఎరువులు (రెండవ దఫా)',
      daysAfterSowing: 'Day 25 - 30',
      ureaKg: Math.round(vegUrea),
      dapKg: 0,
      mopKg: 0,
      sspKg: 0,
      zincSulphateKg: 0,
      nanoUreaBottles: Math.ceil(nanoUrea / 2),
      applicationMethodEn: 'Band placement 5cm away from plant root zone with good soil moisture.',
      applicationMethodTe: 'మొక్క మొదలుకు 5 సెం.మీ దూరంలో తేమ ఉన్నప్పుడు వేయాలి.',
      status: 'APPLIED',
    },
    {
      stageNameEn: 'Flowering & Bud Initiation (Second Top-Dressing)',
      stageNameTe: 'పూత మరియు మొగ్గ దశ (మూడవ దఫా)',
      daysAfterSowing: 'Day 50 - 60',
      ureaKg: Math.round(flowerUrea),
      dapKg: 0,
      mopKg: Math.round(flowerMOP),
      sspKg: 0,
      zincSulphateKg: 0,
      nanoUreaBottles: Math.ceil(nanoUrea / 2),
      applicationMethodEn: 'Side dress followed by light irrigation. Avoid broadcasting in dry soil.',
      applicationMethodTe: 'చల్లిన వెంటనే తేలికపాటి తడి అందించాలి.',
      status: 'PENDING',
    },
    {
      stageNameEn: 'Grain / Pod Filling (Foliar Nutrition)',
      stageNameTe: 'కాయ / గింజ అభివృద్ధి దశ (ఫోలియార్ స్ప్రే)',
      daysAfterSowing: 'Day 80 - 90',
      ureaKg: 0,
      dapKg: 0,
      mopKg: 0,
      sspKg: 0,
      zincSulphateKg: 0,
      nanoUreaBottles: Math.ceil(nanoUrea / 2),
      applicationMethodEn: 'Foliar spray of 13-0-45 (Potassium Nitrate) @ 5g/L + Nano Urea.',
      applicationMethodTe: '13-0-45 మరియు నానో యూరియా ఆకులపై పిచికారీ చేయాలి.',
      status: 'PENDING',
    },
  ];

  const totalDAPKg = stages.reduce((acc, s) => acc + s.dapKg, 0);
  const totalUreaKg = stages.reduce((acc, s) => acc + s.ureaKg, 0);
  const totalMOPKg = stages.reduce((acc, s) => acc + s.mopKg, 0);
  const totalZincKg = stages.reduce((acc, s) => acc + s.zincSulphateKg, 0);
  const totalBottles = stages.reduce((acc, s) => acc + s.nanoUreaBottles, 0);

  return {
    stages,
    totalBags: {
      urea45kgBags: Math.ceil(totalUreaKg / 45),
      dap50kgBags: Math.ceil(totalDAPKg / 50),
      mop50kgBags: Math.ceil(totalMOPKg / 50),
      zincSulphateKg: totalZincKg,
      nanoUreaBottles: totalBottles,
    },
  };
}

// Calculate comprehensive soil score out of 100
export function evaluateSoilHealth(values: {
  pH: number;
  ec: number;
  organicCarbon: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  zinc: number;
}): {
  score: number;
  status: 'OPTIMAL' | 'MODERATE' | 'DEFICIENT';
  deficienciesEn: string[];
  deficienciesTe: string[];
  remediesEn: string[];
  remediesTe: string[];
} {
  let score = 0;
  const deficienciesEn: string[] = [];
  const deficienciesTe: string[] = [];
  const remediesEn: string[] = [];
  const remediesTe: string[] = [];

  // 1. pH (Ideal 6.5 to 7.8) - 15 points
  if (values.pH >= 6.5 && values.pH <= 7.8) {
    score += 15;
  } else if (values.pH < 6.5) {
    score += 8;
    deficienciesEn.push(`Acidic soil (pH: ${values.pH}). Low phosphorus availability.`);
    deficienciesTe.push(`ఆమ్ల నేల (pH: ${values.pH}). భాస్వరం లభ్యత తగ్గుతుంది.`);
    remediesEn.push('Apply Agricultural Lime or Dolomite @ 250 kg/acre.');
    remediesTe.push('ఎకరానికి 250 కిలోల వ్యవసాయ సున్నం లేదా డోలమైట్ చల్లాలి.');
  } else {
    score += 8;
    deficienciesEn.push(`Alkaline/Calcareous soil (pH: ${values.pH}). Micronutrient fixation.`);
    deficienciesTe.push(`క్షార నేల (pH: ${values.pH}). సూక్ష్మ పోషకాల లభ్యత లోపిస్తుంది.`);
    remediesEn.push('Apply Agricultural Gypsum @ 500 kg/acre and incorporate green manure crops.');
    remediesTe.push('ఎకరానికి 500 కిలోల వ్యవసాయ జిప్సం చల్లి జనుము లేదా జీలుగ పచ్చిరొట్ట ఎరువులు వేయాలి.');
  }

  // 2. EC (Electrical Conductivity) - 10 points
  if (values.ec < 1.0) {
    score += 10;
  } else if (values.ec <= 2.0) {
    score += 6;
  } else {
    score += 2;
    deficienciesEn.push(`High salinity hazard (EC: ${values.ec} dS/m). Stunts root osmosis.`);
    deficienciesTe.push(`అధిక లవణీయత (EC: ${values.ec} dS/m). వేరు వ్యవస్థ పెరుగుదల మందగిస్తుంది.`);
    remediesEn.push('Leach salts with clean irrigation water and provide deep drainage trenches.');
    remediesTe.push('మురుగు నీటి కాలువలు తీసి ఉప్పు నీటిని బయటకు పంపాలి.');
  }

  // 3. Organic Carbon % (Ideal > 0.75%) - 20 points
  if (values.organicCarbon >= 0.75) {
    score += 20;
  } else if (values.organicCarbon >= 0.5) {
    score += 13;
    deficienciesEn.push(`Moderate Organic Carbon (${values.organicCarbon}%). Beneficial microbes need food.`);
    deficienciesTe.push(`సేంద్రియ కర్బనం మోస్తరుగా ఉంది (${values.organicCarbon}%). సూక్ష్మజీవుల సంఖ్య పెరగాలి.`);
    remediesEn.push('Add 3-4 tonnes FYM/vermicompost per acre before next season.');
    remediesTe.push('ఎకరానికి 3-4 టన్నుల పశువుల ఎరువు లేదా వర్మీ కంపోస్ట్ వేయాలి.');
  } else {
    score += 6;
    deficienciesEn.push(`Severely depleted Organic Carbon (${values.organicCarbon}%). Soil compaction risk.`);
    deficienciesTe.push(`సేంద్రియ కర్బనం చాలా తక్కువగా ఉంది (${values.organicCarbon}%). నేల గట్టిపడుతుంది.`);
    remediesEn.push('Cultivate Daincha (జీలుగ) or Sunnhemp and plough into soil at 45 days.');
    remediesTe.push('జీలుగ లేదా జనుము విత్తి 45 రోజుల తర్వాత భూమిలో కలియదున్నాలి.');
  }

  // 4. Nitrogen (Ideal 280-560 kg/ha) - 20 points
  if (values.nitrogen >= 280) {
    score += 20;
  } else if (values.nitrogen >= 200) {
    score += 14;
    deficienciesEn.push(`Medium Nitrogen (${values.nitrogen} kg/ha).`);
    deficienciesTe.push(`నత్రజని మధ్యస్థంగా ఉంది (${values.nitrogen} కిలోలు/హెక్టారు).`);
  } else {
    score += 7;
    deficienciesEn.push(`Low Nitrogen (${values.nitrogen} kg/ha). Plants exhibit pale yellow foliage.`);
    deficienciesTe.push(`నత్రజని లోపం (${values.nitrogen} కిలోలు/హెక్టారు). ఆకులు పాలిపోయి పసుపుగా మారతాయి.`);
    remediesEn.push('Apply Neem-coated Urea in 3 split doses + foliar Nano Urea spray.');
    remediesTe.push('వేపపూత పూసిన యూరియాను 3 దఫాలుగా విభజించి వేయాలి.');
  }

  // 5. Phosphorus (Ideal 25-55 kg/ha) - 15 points
  if (values.phosphorus >= 25) {
    score += 15;
  } else {
    score += 8;
    deficienciesEn.push(`Low Phosphorus (${values.phosphorus} kg/ha). Restricted root elongation.`);
    deficienciesTe.push(`భాస్వరం లోపం (${values.phosphorus} కిలోలు/హెక్టారు). వేర్లు సరిగా లోతుకు సాగవు.`);
    remediesEn.push('Apply Single Super Phosphate (SSP) or DAP as basal dose at root depth.');
    remediesTe.push('విత్తే సమయంలో డీఏపీ (DAP) లేదా సింగిల్ సూపర్ ఫాస్ఫేట్ (SSP) వేయాలి.');
  }

  // 6. Potassium (Ideal > 280 kg/ha) - 10 points
  if (values.potassium >= 280) {
    score += 10;
  } else {
    score += 5;
    deficienciesEn.push(`Low Potash (${values.potassium} kg/ha). Poor disease and pest tolerance.`);
    deficienciesTe.push(`పొటాష్ లోపం (${values.potassium} కిలోలు/హెక్టారు). తెగుళ్లను తట్టుకునే శక్తి తగ్గుతుంది.`);
    remediesEn.push('Apply Muriate of Potash (MOP) @ 30 kg/acre.');
    remediesTe.push('ఎకరానికి 30 కిలోల మ్యూరేట్ ఆఫ్ పొటాష్ (MOP) వేయాలి.');
  }

  // 7. Zinc (Ideal > 0.6 ppm) - 10 points
  if (values.zinc >= 0.6) {
    score += 10;
  } else {
    score += 3;
    deficienciesEn.push(`Critical Zinc Deficiency (${values.zinc} ppm). Leaves show interveinal chlorosis.`);
    deficienciesTe.push(`తీవ్రమైన జింక్ లోపం (${values.zinc} ppm). ఈనెల మధ్య పసుపు మచ్చలు ఏర్పడతాయి.`);
    remediesEn.push('Soil apply 20-25 kg Zinc Sulphate (21%) per acre once every 2 seasons.');
    remediesTe.push('ఎకరానికి 20-25 కిలోల జింక్ సల్ఫేట్ (21%) ఆఖరి దుక్కిలో తప్పనిసరిగా వేయాలి.');
  }

  let status: 'OPTIMAL' | 'MODERATE' | 'DEFICIENT' = 'MODERATE';
  if (score >= 80) status = 'OPTIMAL';
  else if (score < 60) status = 'DEFICIENT';

  return {
    score,
    status,
    deficienciesEn,
    deficienciesTe,
    remediesEn,
    remediesTe,
  };
}

// Calculate smart irrigation requirement
export function calculateIrrigationRequirement(
  cropStage: string,
  acres: number,
  soilType: string,
  recentRainMm: number
): {
  dailyNeedMm: number;
  dripRunHours: number;
  borewellHours: number;
  nextIrrigationInDays: number;
  moisturePercent: number;
} {
  let dailyNeedMm = 4.5;
  if (cropStage === 'FLOWERING') dailyNeedMm = 6.2;
  if (cropStage === 'GRAIN_POD_FILLING') dailyNeedMm = 5.5;
  if (cropStage === 'GERMINATION') dailyNeedMm = 3.0;

  // Drip discharge: typical 4 liters/hour per dripper
  // 1 mm water over 1 acre = 4047 liters
  const totalLitersPerDay = dailyNeedMm * 4047 * acres;
  const dripDischargeLph = 3500 * acres; // total system flow
  const dripRunHours = Number((totalLitersPerDay / dripDischargeLph).toFixed(1));
  const borewellHours = Number((totalLitersPerDay / 8000).toFixed(1)); // 5 HP pump ~ 8000 L/hr

  let nextIrrigationInDays = 2;
  let moisturePercent = 65;

  if (recentRainMm > 25) {
    nextIrrigationInDays = 5;
    moisturePercent = 90;
  } else if (recentRainMm > 10) {
    nextIrrigationInDays = 3;
    moisturePercent = 78;
  }

  return {
    dailyNeedMm,
    dripRunHours: Math.max(1.5, dripRunHours),
    borewellHours: Math.max(2.0, borewellHours),
    nextIrrigationInDays,
    moisturePercent,
  };
}
