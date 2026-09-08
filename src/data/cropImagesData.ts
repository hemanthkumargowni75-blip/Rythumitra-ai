export interface CropImageRecord {
  id: string;
  userId: string;
  cropId: string;
  cropNameEn: string;
  cropNameTe: string;
  variety: string;
  fieldPlot: string;
  captureDate: string; // ISO
  displayDate: string;
  imageUrl: string;
  source: 'CAMERA' | 'UPLOAD' | 'DRONE_SCAN';
  healthStatus: 'HEALTHY' | 'INFECTED' | 'WARNING' | 'RECOVERING';
  diagnosis: {
    diseaseId?: string;
    diseaseNameEn: string;
    diseaseNameTe: string;
    pathogenType: 'FUNGAL' | 'PEST_INSECT' | 'VIRAL' | 'BACTERIAL' | 'NUTRIENT_DEFICIENCY' | 'NONE';
    severity: 'LOW' | 'MODERATE' | 'SEVERE' | 'HEALTHY';
    confidence: number; // e.g. 92%
    symptomsEn: string[];
    symptomsTe: string[];
    treatmentSummaryEn: string;
    treatmentSummaryTe: string;
    sprayRecommendation?: string;
  };
  comparisonGroup?: string; // e.g. "chilli-thrips-timeline"
  timelineStage?: 'BEFORE_TREATMENT' | 'AFTER_TREATMENT' | 'ROUTINE';
  notes?: string;
}

// Inline SVGs for consistent offline rendering without broken image links
const createCropSvg = (color: string, label: string, badge: string, badgeBg: string) => {
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="450" viewBox="0 0 600 450">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${encodeURIComponent(color)}" stop-opacity="0.9"/>
        <stop offset="100%" stop-color="#0f172a"/>
      </linearGradient>
    </defs>
    <rect width="600" height="450" fill="url(#bg)"/>
    <circle cx="300" cy="180" r="85" fill="none" stroke="white" stroke-width="3" stroke-dasharray="6,6" opacity="0.6"/>
    <circle cx="300" cy="180" r="6" fill="#22c55e"/>
    <line x1="280" y1="180" x2="320" y2="180" stroke="white" stroke-width="2" opacity="0.7"/>
    <line x1="300" y1="160" x2="300" y2="200" stroke="white" stroke-width="2" opacity="0.7"/>
    <text x="300" y="320" fill="white" font-family="system-ui, sans-serif" font-size="22" font-weight="bold" text-anchor="middle">${encodeURIComponent(label)}</text>
    <rect x="210" y="345" width="180" height="34" rx="17" fill="${encodeURIComponent(badgeBg)}"/>
    <text x="300" y="368" fill="white" font-family="system-ui, sans-serif" font-size="14" font-weight="bold" text-anchor="middle">${encodeURIComponent(badge)}</text>
  </svg>`;
};

export const verifiedCropImages: CropImageRecord[] = [
  // 1. Chilli Thrips - Day 1 Scan
  {
    id: 'img-chilli-thrips-day1',
    userId: 'farmer-001',
    cropId: 'chilli',
    cropNameEn: 'Chilli (Teja)',
    cropNameTe: 'తేజా మిర్చి',
    variety: 'Teja Export Grade (Guntur)',
    fieldPlot: 'Plot #1 - North Geofence (1.5 Ac)',
    captureDate: '2026-09-01T09:45:00Z',
    displayDate: '01 Sep 2026, 09:45 AM',
    imageUrl: createCropSvg('#b91c1c', 'Chilli Upward Leaf Curl', 'Thrips: 92% Confidence', '#dc2626'),
    source: 'CAMERA',
    healthStatus: 'INFECTED',
    diagnosis: {
      diseaseId: 'chilli_thrips',
      diseaseNameEn: 'Chilli Black Thrips (Scirtothrips dorsalis)',
      diseaseNameTe: 'మిర్చి నల్ల తామర పురుగు (Thrips)',
      pathogenType: 'PEST_INSECT',
      severity: 'SEVERE',
      confidence: 92,
      symptomsEn: [
        'Upward curling of leaves (boat-shaped inversion)',
        'Silvery patches and bronze scarring on leaf undersides',
        'Stunted apical shoots and flower bud drop',
      ],
      symptomsTe: [
        'పై ముడుత లేదా ఆకులు పైకి దోనెలాగా ముడుచుకుపోవడం',
        'ఆకుల అడుగు భాగంలో గోధుమ లేదా వెండి రంగు చారలు',
        'మొగ్గలు రాలిపోవడం మరియు పిందెలు కట్టకపోవడం',
      ],
      treatmentSummaryEn: 'Apply Fipronil 5% SC @ 2.0 ml/L or Spinetoram 11.7% SC @ 1.0 ml/L. Install 20 blue sticky traps per acre.',
      treatmentSummaryTe: 'ఫిప్రోనిల్ 5% SC 2.0 మి.లీ లేదా స్పినెటోరమ్ 11.7% SC 1.0 మి.లీ లీటరు నీటికి కలిపి పిచికారీ చేయాలి. ఎకరాకు 20 నీలిరంగు జిగురు అట్టలు పెట్టాలి.',
      sprayRecommendation: 'Spinetoram 11.7% SC @ 180 ml/acre',
    },
    comparisonGroup: 'chilli-plot1-timeline',
    timelineStage: 'BEFORE_TREATMENT',
    notes: 'Severe thrips infestation noticed in the northeast corner of Plot 1.',
  },

  // 2. Chilli Thrips - Day 14 Recovery Scan (Side-by-side progression)
  {
    id: 'img-chilli-thrips-day14',
    userId: 'farmer-001',
    cropId: 'chilli',
    cropNameEn: 'Chilli (Teja)',
    cropNameTe: 'తేజా మిర్చి',
    variety: 'Teja Export Grade (Guntur)',
    fieldPlot: 'Plot #1 - North Geofence (1.5 Ac)',
    captureDate: '2026-09-07T08:15:00Z',
    displayDate: '07 Sep 2026, 08:15 AM (Today)',
    imageUrl: createCropSvg('#15803d', 'New Green Flush Emerged', 'Recovery: 96% Healthy', '#16a34a'),
    source: 'CAMERA',
    healthStatus: 'RECOVERING',
    diagnosis: {
      diseaseId: 'chilli_thrips',
      diseaseNameEn: 'Vegetative Flush Recovery',
      diseaseNameTe: 'కోలుకున్న కొత్త చిగుళ్ళు (రికవరీ)',
      pathogenType: 'NONE',
      severity: 'HEALTHY',
      confidence: 96,
      symptomsEn: [
        'Fresh apical shoot emergence without distortion',
        'Active flowering renewed across canopy',
        'Thrips population reduced below economic injury level',
      ],
      symptomsTe: [
        'ముడుత లేని ఆరోగ్యకరమైన కొత్త ఆకులు వచ్చాయి',
        'పూత మరియు పిందె నిలకడగా ఉంది',
        'తామర పురుగుల ఉధృతి పూర్తిగా తగ్గింది',
      ],
      treatmentSummaryEn: 'Maintain blue sticky traps. Apply balanced 19:19:19 foliar micronutrients @ 5g/L to support fruit set.',
      treatmentSummaryTe: 'నీలి అట్టలను కొనసాగించండి. పిందెలు బాగా ఎదగడానికి 19:19:19 నీటిలో కరిగే ఎరువు 5 గ్రా/లీటర్ పిచికారీ చేయండి.',
      sprayRecommendation: 'NPK 19-19-19 + Formula 4 Micronutrient Mix',
    },
    comparisonGroup: 'chilli-plot1-timeline',
    timelineStage: 'AFTER_TREATMENT',
    notes: 'Follow-up inspection after Spinetoram spray. Significant recovery observed.',
  },

  // 3. Paddy Rice Blast
  {
    id: 'img-paddy-blast',
    userId: 'farmer-001',
    cropId: 'paddy',
    cropNameEn: 'Paddy / Rice',
    cropNameTe: 'వరి (సాంబ మసూరి)',
    variety: 'BPT 5204 (Tenali Farm)',
    fieldPlot: 'Plot #2 - Canal Lowland (2.0 Ac)',
    captureDate: '2026-09-05T14:30:00Z',
    displayDate: '05 Sep 2026, 02:30 PM',
    imageUrl: createCropSvg('#c2410c', 'Paddy Spindle Leaf Spot', 'Blast Detected: 89%', '#ea580c'),
    source: 'UPLOAD',
    healthStatus: 'INFECTED',
    diagnosis: {
      diseaseId: 'rice_blast',
      diseaseNameEn: 'Rice Blast (Pyricularia oryzae)',
      diseaseNameTe: 'వరి అగ్గి తెగులు (బ్లాస్ట్)',
      pathogenType: 'FUNGAL',
      severity: 'SEVERE',
      confidence: 89,
      symptomsEn: [
        'Spindle or diamond-shaped lesions with grey center and dark brown border',
        'Risk of neck blast at panicle initiation stage',
      ],
      symptomsTe: [
        'ఆకులపై కంటి ఆకారపు బూడిద రంగు మచ్చలు, గోధుమ రంగు అంచులు',
        'వెన్ను మొదలు వద్ద మెడ విరుపు తెగులు వచ్చే ప్రమాదం',
      ],
      treatmentSummaryEn: 'Spray Tricyclazole 75% WP @ 0.6 g/L (Beam/Baan). Avoid excessive nitrogen/urea application in humid weather.',
      treatmentSummaryTe: 'ట్రైసైక్లాజోల్ 75% WP (బీమ్) 0.6 గ్రాములు లీటరు నీటికి కలిపి పిచికారీ చేయాలి. తేమ వాతావరణంలో యూరియా వాడకాన్ని తగ్గించండి.',
      sprayRecommendation: 'Tricyclazole 75% WP @ 120 g/acre',
    },
    comparisonGroup: 'paddy-plot2-timeline',
    timelineStage: 'BEFORE_TREATMENT',
    notes: 'Early detection during routine field scout. Recommended for agronomist consultation.',
  },

  // 4. Cotton Pink Bollworm / Leaf Reddening
  {
    id: 'img-cotton-health',
    userId: 'farmer-001',
    cropId: 'cotton',
    cropNameEn: 'Cotton',
    cropNameTe: 'ప్రత్తి',
    variety: 'Bunny Long Staple',
    fieldPlot: 'Plot #3 - Dryland Block (1.0 Ac)',
    captureDate: '2026-09-04T11:20:00Z',
    displayDate: '04 Sep 2026, 11:20 AM',
    imageUrl: createCropSvg('#ca8a04', 'Magnesium Deficiency Warning', 'Deficiency: 84%', '#eab308'),
    source: 'CAMERA',
    healthStatus: 'WARNING',
    diagnosis: {
      diseaseId: 'cotton_reddening',
      diseaseNameEn: 'Foliar Reddening / Magnesium Deficiency',
      diseaseNameTe: 'ప్రత్తిలో ఆకులు ఎర్రబడటం (మెగ్నీషియం లోపం)',
      pathogenType: 'NUTRIENT_DEFICIENCY',
      severity: 'MODERATE',
      confidence: 84,
      symptomsEn: [
        'Purplish-red discoloration between veins on older mature leaves',
        'Reduced photosynthesis and premature boll drop',
      ],
      symptomsTe: [
        'ఈనెల మధ్య భాగంలో ఆకులు ఊదా-ఎరుపు రంగులోకి మారడం',
        'చెట్టు ఎదుగుదల లోపించి కాయలు రాలిపోవడం',
      ],
      treatmentSummaryEn: 'Foliar spray of Magnesium Sulphate (MgSO4) @ 10 g/L combined with Urea 10 g/L during cool morning hours.',
      treatmentSummaryTe: 'మెగ్నీషియం సల్ఫేట్ 10 గ్రాములు మరియు యూరియా 10 గ్రాములు లీటరు నీటికి కలిపి ఉదయం పూట పిచికారీ చేయాలి.',
      sprayRecommendation: 'Magnesium Sulphate (MgSO4) 1% foliar spray',
    },
    notes: 'Diagnosed as nutrient stress rather than fungal blight.',
  },

  // 5. Tomato Early Blight
  {
    id: 'img-tomato-blight',
    userId: 'farmer-001',
    cropId: 'tomato',
    cropNameEn: 'Tomato',
    cropNameTe: 'టమోటా',
    variety: 'Ananya Hybrid',
    fieldPlot: 'Kitchen & Nursery Bed',
    captureDate: '2026-09-03T16:00:00Z',
    displayDate: '03 Sep 2026, 04:00 PM',
    imageUrl: createCropSvg('#0369a1', 'Early Blight Target Rings', 'Early Blight: 88%', '#0284c7'),
    source: 'CAMERA',
    healthStatus: 'INFECTED',
    diagnosis: {
      diseaseId: 'tomato_early_blight',
      diseaseNameEn: 'Tomato Early Blight (Alternaria solani)',
      diseaseNameTe: 'టమోటా ఆకు మచ్చ తెగులు (ఆల్టర్నేరియా)',
      pathogenType: 'FUNGAL',
      severity: 'MODERATE',
      confidence: 88,
      symptomsEn: [
        'Concentric dark rings (bullseye appearance) on lower canopy leaves',
        'Yellow halo around necrotic lesions',
      ],
      symptomsTe: [
        'దిగువ ఆకులపై లక్ష్యపు వలయాలు (రింగులు) లాంటి నల్లటి మచ్చలు',
        'మచ్చల చుట్టూ పసుపు రంగు వలయం ఏర్పడటం',
      ],
      treatmentSummaryEn: 'Spray Mancozeb 75% WP @ 2.5 g/L or Azoxystrobin + Difenoconazole @ 1.0 ml/L.',
      treatmentSummaryTe: 'మాంకోజెబ్ 75% WP 2.5 గ్రా/లీ లేదా అజాక్సిస్ట్రోబిన్ + డైఫెనోకోనజోల్ 1.0 మి.లీ/లీటర్ పిచికారీ చేయాలి.',
      sprayRecommendation: 'Azoxystrobin 18.2% + Difenoconazole 11.4% SC',
    },
    notes: 'Lower leaves pruned and preventative spray administered.',
  },

  // 6. Healthy Turmeric Leaf Canopy
  {
    id: 'img-turmeric-healthy',
    userId: 'farmer-001',
    cropId: 'turmeric',
    cropNameEn: 'Turmeric',
    cropNameTe: 'పసుపు కొమ్ములు',
    variety: 'Duggirala Desi High Curcumin',
    fieldPlot: 'Plot #4 - Ridge Bed (0.8 Ac)',
    captureDate: '2026-09-02T10:10:00Z',
    displayDate: '02 Sep 2026, 10:10 AM',
    imageUrl: createCropSvg('#166534', 'Optimal Vigorous Foliage', '100% Healthy Canopy', '#15803d'),
    source: 'CAMERA',
    healthStatus: 'HEALTHY',
    diagnosis: {
      diseaseNameEn: 'No Disease Detected — Vigorous Growth',
      diseaseNameTe: 'ఎటువంటి తెగుళ్లు లేవు — ఆరోగ్యకరమైన పైరు',
      pathogenType: 'NONE',
      severity: 'HEALTHY',
      confidence: 98,
      symptomsEn: ['Broad, dark green foliage without spots or rhizome rot symptoms'],
      symptomsTe: ['ఎలాంటి మచ్చలు లేని దృఢమైన ఆకుపచ్చని ఆకులు, దుంప కుళ్ళు లక్షణాలు లేవు'],
      treatmentSummaryEn: 'Continue regular drip fertigation and maintain adequate organic mulch over root zone.',
      treatmentSummaryTe: 'డ్రిప్ ద్వారా ఎరువులు క్రమం తప్పకుండా అందిస్తూ, దుంపల వద్ద ఆకుల మల్చింగ్ కొనసాగించండి.',
    },
    notes: 'Routine health assessment. High rhizome bulking potential.',
  },
];

export function getUserCropImages(userId: string = 'farmer-001'): CropImageRecord[] {
  return verifiedCropImages;
}

export function getCropImageById(id: string): CropImageRecord | undefined {
  return verifiedCropImages.find((img) => img.id === id);
}

export function getComparisonPair(groupName: string): CropImageRecord[] {
  return verifiedCropImages
    .filter((img) => img.comparisonGroup === groupName)
    .sort((a, b) => new Date(a.captureDate).getTime() - new Date(b.captureDate).getTime());
}
