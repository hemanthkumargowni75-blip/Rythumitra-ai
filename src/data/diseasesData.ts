import { DiseaseRecord } from '@/types';

export const diseasesCatalog: DiseaseRecord[] = [
  {
    id: 'rice_blast',
    cropName: 'Paddy / Rice',
    diseaseNameEn: 'Rice Blast (Pyricularia oryzae)',
    diseaseNameTe: 'వరి అగ్గి తెగులు (బ్లాస్ట్)',
    pathogenType: 'FUNGAL',
    severity: 'SEVERE',
    symptomsEn: [
      'Spindle or diamond-shaped lesions with brown borders and grey centers on leaves',
      'Blackening and rotting at the neck node of the panicle (Neck Blast)',
      'Partial or completely chaffy empty grain heads'
    ],
    symptomsTe: [
      'ఆకులపై కంటి లేదా నూలు కండె ఆకారపు మచ్చలు, అంచులు గోధుమ రంగులో మధ్య భాగం బూడిద రంగులో ఉండటం',
      'వెన్ను మొదలు వద్ద నల్లటి మచ్చ ఏర్పడి వెన్ను విరిగి వేలాడటం (మెడ విరుపు లేదా నెక్ బ్లాస్ట్)',
      'గింజలు తాలుగా మారిపోవడం'
    ],
    chemicalControlEn: {
      chemicalName: 'Tricyclazole 75% WP',
      commercialBrands: 'Beam, Baan, Sivic',
      dosagePerLiter: '0.6 grams',
      dosagePer16LPump: '10 grams',
      dosagePerAcre: '120 grams in 200 Liters of water',
      phiDays: 30,
    },
    chemicalControlTe: {
      chemicalName: 'ట్రైసైక్లాజోల్ 75% WP',
      commercialBrands: 'బీమ్ (Beam), బాన్, సివిక్',
      dosagePerLiter: '0.6 గ్రాములు',
      dosagePer16LPump: '10 గ్రాములు',
      dosagePerAcre: '120 గ్రాములు 200 లీటర్ల నీటిలో కలిపి',
      phiDays: 30,
    },
    organicControlEn: 'Spray Pseudomonas fluorescens @ 10g/L or 2.5 kg/acre mixed with well-decomposed FYM, or 5% Neem seed kernel extract (NSKE).',
    organicControlTe: 'స్యూడోమోనాస్ ఫ్లోరోసెన్స్ 10 గ్రాములు లీటరు నీటికి లేదా 5% వేప గింజల కషాయం (NSKE) పిచికారీ చేయాలి.',
    culturalPracticesEn: [
      'Avoid excessive split doses of chemical nitrogen (Urea) during humid cloudy weather',
      'Maintain balanced potash levels to strengthen plant epidermal cell walls',
      'Burn severely infected crop stubbles post harvest'
    ],
    culturalPracticesTe: [
      'మబ్బులతో కూడిన తేమ వాతావరణంలో యూరియాను మోతాదుకు మించి చల్లకూడదు',
      'పైరుకు రోగనిరోధక శక్తి కోసం తగినంత పొటాష్ ఎరువును తప్పనిసరిగా వేయాలి',
      'తెగులు సోకిన పైరు వ్యర్థాలను తగులబెట్టాలి'
    ],
    confidence: 94,
  },
  {
    id: 'rice_bph',
    cropName: 'Paddy / Rice',
    diseaseNameEn: 'Brown Planthopper / BPH (Nilaparvata lugens)',
    diseaseNameTe: 'వరి సుడి దోమ (Brown Planthopper)',
    pathogenType: 'PEST_INSECT',
    severity: 'SEVERE',
    symptomsEn: [
      'Hopper Burn: Circular dry patches in the field resembling burned grass',
      'Clusters of brown nymphs and adults sucking sap at the base of the tillers near water level',
      'Premature lodging and drying of mature crop'
    ],
    symptomsTe: [
      'సుడి లేదా వలయాల రూపంలో పైరు ఎండిపోయి కాలిపోయినట్లు కనపడటం (హాపర్ బర్న్)',
      'దుబ్బు మొదళ్లలో నీటి మట్టానికి పైన వందలాది గోధుమ రంగు దోమలు గుంపులుగా రసం పీల్చడం',
      'పైరు కిందపడి చేను పూర్తిగా ఎండిపోవడం'
    ],
    chemicalControlEn: {
      chemicalName: 'Triflumuron + Ethiprole or Pymetrozine 50% WDG',
      commercialBrands: 'Chess, Osheen, Glamore',
      dosagePerLiter: '0.6 grams',
      dosagePer16LPump: '10 grams (or Dinotefuran 20% SG @ 8g/pump)',
      dosagePerAcre: '120 grams in 200 Liters of water',
      phiDays: 21,
    },
    chemicalControlTe: {
      chemicalName: 'పైమెట్రోజిన్ 50% WDG లేదా డైనోటెఫ్యూరాన్ 20% SG',
      commercialBrands: 'చెస్ (Chess), ఓషీన్ (Osheen), గ్లామోర్',
      dosagePerLiter: '0.6 గ్రాములు',
      dosagePer16LPump: '10 గ్రాములు (పైమెట్రోజిన్) లేదా 8 గ్రాములు (ఓషీన్)',
      dosagePerAcre: '120 గ్రాములు 200 లీటర్ల నీటిలో',
      phiDays: 21,
    },
    organicControlEn: 'Drain water completely for 3-4 days to break the insect microclimate. Spray Beauveria bassiana @ 5ml/L targeting tiller base.',
    organicControlTe: 'పొలంలో నిల్వ ఉన్న నీటిని 3-4 రోజులు పూర్తిగా తీసివేసి ఆరబెట్టాలి. బవేరియా బాసియానా జీవ శిలీంధ్రం 5 మి.లీ లీటరు నీటికి దుబ్బు మొదళ్లపై పడేలా పిచికారీ చేయాలి.',
    culturalPracticesEn: [
      'Form alleyways (బాటలు) of 20 cm width every 2 meters to allow sunlight and ventilation',
      'Strictly avoid synthetic pyrethroids which cause pest resurgence',
      'Alternate wetting and drying (AWD) irrigation'
    ],
    culturalPracticesTe: [
      'గాలి, వెలుతురు ప్రసరించేందుకు ప్రతి 2 మీటర్లకు 20 సెం.మీ వెడల్పున బాటలు తీయాలి',
      'సింథటిక్ పైరెథ్రాయిడ్ మందులను వాడరాదు, ఇవి సుడి దోమ ఉధృతిని రెట్టింపు చేస్తాయి',
      'పొలాన్ని ఆరబెడుతూ నీరు పెట్టే పద్ధతిని పాటించాలి'
    ],
    confidence: 96,
  },
  {
    id: 'cotton_pink_bollworm',
    cropName: 'Bt Cotton',
    diseaseNameEn: 'Pink Bollworm (Pectinophora gossypiella)',
    diseaseNameTe: 'పత్తి గులాబీ రంగు కాయ తొలుచు పురుగు',
    pathogenType: 'PEST_INSECT',
    severity: 'SEVERE',
    symptomsEn: [
      'Rosette flowers (గుడ్డి పూలు) tied together by silk threads preventing petal opening',
      'Small entry holes on green developing bolls with brown frass',
      'Stained discolored lint and damaged seeds inside mature bolls'
    ],
    symptomsTe: [
      'పూత విచ్చుకోకుండా రేకులు దారాలతో అతుక్కుని రోసెట్ లేదా గుడ్డి పూలుగా మారడం',
      'పచ్చి కాయలపై పురుగు తొలిచిన చిన్న రంధ్రాలు మరియు విసర్జితాలు',
      'కాయ లోపల దూది రంగు మారి నాణ్యత దెబ్బతినడం, గింజలు నష్టపోవడం'
    ],
    chemicalControlEn: {
      chemicalName: 'Emamectin Benzoate 5% SG or Chlorantraniliprole 18.5% SC',
      commercialBrands: 'Proclaim, Coragen, Ampligo',
      dosagePerLiter: '0.4 grams (Emamectin) or 0.3 ml (Coragen)',
      dosagePer16LPump: '7 grams (Proclaim) or 5 ml (Coragen)',
      dosagePerAcre: '80 grams in 200 Liters of water',
      phiDays: 14,
    },
    chemicalControlTe: {
      chemicalName: 'ఎమామెక్టిన్ బెంజోయేట్ 5% SG లేదా క్లోరాంట్రానిలిప్రోల్ 18.5% SC',
      commercialBrands: 'ప్రొక్లెయిమ్ (Proclaim), కొరాజెన్ (Coragen), ఆంప్లిగో',
      dosagePerLiter: '0.4 గ్రాములు లేదా 0.3 మి.లీ',
      dosagePer16LPump: '7 గ్రాములు (ప్రొక్లెయిమ్) లేదా 5 మి.లీ (కొరాజెన్)',
      dosagePerAcre: '80 గ్రాములు 200 లీటర్ల నీటిలో',
      phiDays: 14,
    },
    organicControlEn: 'Install 8 Pheromone traps (Pecti-Lure) per acre for monitoring. Release Trichogramma egg parasitoids @ 60,000/acre at 45 DAS.',
    organicControlTe: 'ఎకరానికి 8 లింగాకర్షక బుట్టలు (Pheromone Traps) అమర్చాలి. ట్రైకోగ్రామా పరాన్నజీవి గుడ్ల కార్డులను ఎకరానికి 60,000 చొప్పున వదలాలి.',
    culturalPracticesEn: [
      'Handpick and destroy rosette flowers daily in early morning',
      'Do not extend the crop season beyond December/January',
      'Destroy leftover cotton stalks without stacking near field borders'
    ],
    culturalPracticesTe: [
      'చేనులో కనపడిన గుడ్డి పూలను తెంపి వెంటనే నాశనం చేయాలి',
      'పత్తి పంటను డిసెంబరు/జనవరి దాటి పొడిగించరాదు',
      'పంట పూర్తయిన వెంటనే పత్తి కట్టెను పొలంలో లేదా గట్లపై నిల్వ ఉంచకుండా తొలగించాలి'
    ],
    confidence: 92,
  },
  {
    id: 'chilli_thrips_murda',
    cropName: 'Teja Chilli',
    diseaseNameEn: 'Black Thrips & Chilli Leaf Curl / Murda',
    diseaseNameTe: 'మిర్చి నల్ల తామర పురుగులు & బొబ్బర / ముడత తెగులు',
    pathogenType: 'PEST_INSECT',
    severity: 'SEVERE',
    symptomsEn: [
      'Upward and downward curling of tender apical leaves (Boat shaped cupping)',
      'Browning, silvering and crinkling of lower leaf surfaces',
      'Excessive dropping of flowers and small deformed scarred pods'
    ],
    symptomsTe: [
      'చిగురు ఆకులు పైకి లేదా కిందకి ముడుచుకుని దోనె లేదా పడవ ఆకారంలో మారడం (ముడత)',
      'ఆకుల అడుగు భాగం గోధుమ రంగులోకి మారి కాంతివిహీనంగా అవ్వడం',
      'విపరీతమైన పూత రాలడం, చిన్నగా వంకరటింకర కాయలు ఏర్పడటం'
    ],
    chemicalControlEn: {
      chemicalName: 'Spinetoram 11.7% SC or Broflanilide 300 SC',
      commercialBrands: 'Delegate, Expo, Gracia',
      dosagePerLiter: '0.9 ml (Delegate) or 0.25 ml (Gracia)',
      dosagePer16LPump: '15 ml (Delegate) or 4 ml (Gracia)',
      dosagePerAcre: '180 ml in 200 Liters of water',
      phiDays: 7,
    },
    chemicalControlTe: {
      chemicalName: 'స్పైనెటోరం 11.7% SC లేదా బ్రోఫ్లానిలైడ్ 300 SC',
      commercialBrands: 'డెలిగేట్ (Delegate), గ్రాసియా (Gracia), ఎక్స్‌పో',
      dosagePerLiter: '0.9 మి.లీ లేదా 0.25 మి.లీ',
      dosagePer16LPump: '15 మి.లీ (డెలిగేట్) లేదా 4 మి.లీ (గ్రాసియా)',
      dosagePerAcre: '180 మి.లీ 200 లీటర్ల నీటిలో',
      phiDays: 7,
    },
    organicControlEn: 'Install 40-50 Blue sticky traps per acre for black thrips. Spray 10,000 ppm Neem Oil @ 2 ml/L combined with Pongamia oil.',
    organicControlTe: 'ఎకరానికి 40 నుండి 50 నీలి రంగు జిగురు అట్టలు (Blue Sticky Traps) తప్పనిసరిగా అమర్చాలి. 10,000 ppm వేపనూనె 2 మి.లీ లీటరు నీటికి పిచికారీ చేయాలి.',
    culturalPracticesEn: [
      'Plant 3-4 rows of Maize or Jowar as a dense physical border crop',
      'Intercrop with Marigold (బంతి) to trap thrips and nematodes',
      'Ensure adequate micronutrient foliar spray (Zinc + Boron)'
    ],
    culturalPracticesTe: [
      'తోట చుట్టూ 3-4 వరుసలు దట్టంగా జొన్న లేదా మొక్కజొన్నను సరిహద్దు రక్షణ పంటగా వేయాలి',
      'తామర పురుగులను ఆకర్షించేందుకు అంతరపంటగా బంతి మొక్కలను నాటాలి',
      'జింక్, బోరాన్ సూక్ష్మ పోషకాలను పిచికారీ చేసి మొక్క రోగనిరోధక శక్తిని పెంచాలి'
    ],
    confidence: 95,
  },
  {
    id: 'chilli_anthracnose',
    cropName: 'Teja Chilli',
    diseaseNameEn: 'Chilli Anthracnose & Fruit Rot (Colletotrichum capsici)',
    diseaseNameTe: 'మిర్చి కొమ్మ ఎండు & కాయ కుళ్ళు తెగులు',
    pathogenType: 'FUNGAL',
    severity: 'MODERATE',
    symptomsEn: [
      'Die-back: Twigs dry up starting from the tip downwards with straw color appearance',
      'Circular sunken dark spots with concentric rings on ripe fruits',
      'Premature fruit drop and rotting of chillies'
    ],
    symptomsTe: [
      'చివరి కొమ్మలు పైనుండి కిందికి ఎండుకుంటూ వచ్చి గడ్డి రంగులోకి మారడం (కొమ్మ ఎండు)',
      'పండిన లేదా పచ్చి కాయలపై గుండ్రటి లోతైన నల్లటి లేదా బూడిద మచ్చలు ఏర్పడటం',
      'కాయలు కుళ్ళిపోయి రాలిపోవడం'
    ],
    chemicalControlEn: {
      chemicalName: 'Azoxystrobin 18.2% + Difenoconazole 11.4% SC',
      commercialBrands: 'Amistar Top, Custodia, Priaxor',
      dosagePerLiter: '1.0 ml',
      dosagePer16LPump: '15 ml',
      dosagePerAcre: '200 ml in 200 Liters of water',
      phiDays: 10,
    },
    chemicalControlTe: {
      chemicalName: 'అజాక్సిస్ట్రోబిన్ 18.2% + డైఫెనోకోనజోల్ 11.4% SC',
      commercialBrands: 'అమిస్టార్ టాప్ (Amistar Top), కస్టోడియా, ప్రియాక్సర్',
      dosagePerLiter: '1.0 మి.లీ',
      dosagePer16LPump: '15 మి.లీ',
      dosagePerAcre: '200 మి.లీ 200 లీటర్ల నీటిలో',
      phiDays: 10,
    },
    organicControlEn: 'Seed treatment with Trichoderma viride @ 10g/kg seed. Spray copper oxychloride (COC) @ 3g/L or Bordeaux mixture 1%.',
    organicControlTe: 'విత్తన శుద్ధి ట్రైకోడెర్మా విరిడి 10 గ్రాములు కిలో విత్తనానికి చేయాలి. కాపర్ ఆక్సీక్లోరైడ్ (COC) 3 గ్రాములు లీటరు నీటికి పిచికారీ చేయాలి.',
    culturalPracticesEn: [
      'Collect and burn dry diseased twigs during weeding',
      'Avoid overhead sprinkler irrigation that spreads fungal spores',
      'Ensure proper drainage during unseasonal heavy rains'
    ],
    culturalPracticesTe: [
      'ఎండిపోయిన కొమ్మలను ఎప్పటికప్పుడు కత్తిరించి పొలం బయట కాల్చివేయాలి',
      'శిలీంధ్ర బీజాలు వ్యాపించకుండా స్ప్రింక్లర్లతో పైనుంచి నీరు చల్లడం నివారించాలి',
      'అకాల వర్షాల సమయంలో పొలంలో నీరు నిల్వ ఉండకుండా చూడాలి'
    ],
    confidence: 91,
  },
  {
    id: 'maize_fall_armyworm',
    cropName: 'Hybrid Maize',
    diseaseNameEn: 'Fall Armyworm / FAW (Spodoptera frugiperda)',
    diseaseNameTe: 'మొక్కజొన్న కత్తెర పురుగు (Fall Armyworm)',
    pathogenType: 'PEST_INSECT',
    severity: 'SEVERE',
    symptomsEn: [
      'Shot holes and elongated skeletonized patches on leaves in early whorl stage',
      'Copious amounts of sawdust-like fecal matter inside the central leaf whorl',
      'Dead heart and bore holes directly into developing cobs'
    ],
    symptomsTe: [
      'మొక్కజొన్న సుడులలోని లేత ఆకులపై వరుసగా గుళికల వంటి రంధ్రాలు లేదా జల్లెడలా మారడం',
      'సుడి లోపల చెక్క పొట్టు లేదా రంపపు పొట్టు వంటి విసర్జిత పదార్థం ఎక్కువగా ఉండటం',
      'మొగ్గ చనిపోయి కంకులను పురుగు తొలిచి తినడం'
    ],
    chemicalControlEn: {
      chemicalName: 'Chlorantraniliprole 18.5% SC or Spinetoram 11.7% SC',
      commercialBrands: 'Coragen, Delegate',
      dosagePerLiter: '0.4 ml (Coragen) or 0.5 ml (Delegate)',
      dosagePer16LPump: '6 ml (Coragen) directing spray nozzle straight into whorls',
      dosagePerAcre: '80 ml in 200 Liters of water',
      phiDays: 14,
    },
    chemicalControlTe: {
      chemicalName: 'క్లోరాంట్రానిలిప్రోల్ 18.5% SC లేదా స్పైనెటోరం 11.7% SC',
      commercialBrands: 'కొరాజెన్ (Coragen), డెలిగేట్ (Delegate)',
      dosagePerLiter: '0.4 మి.లీ లేదా 0.5 మి.లీ',
      dosagePer16LPump: '6 మి.లీ కొరాజెన్ (స్ప్రే నాజిల్ సుడి లోపలికి వెళ్లేలా పిచికారీ చేయాలి)',
      dosagePerAcre: '80 మి.లీ 200 లీటర్ల నీటిలో',
      phiDays: 14,
    },
    organicControlEn: 'Whorl application of fine dry sand mixed with lime (9:1 ratio) or ash. Spray Metarhizium rileyi @ 5g/L.',
    organicControlTe: 'సుడి లోపల ఎండిన ఇసుక మరియు సున్నం (9:1 నిష్పత్తిలో) లేదా బూడిద వేయాలి. మెటారైజియం రిలేయి 5 గ్రాములు లీటరు నీటికి కలపి పిచికారీ చేయాలి.',
    culturalPracticesEn: [
      'Erect bird perches (T-shaped poles) @ 15 per acre to invite insectivorous birds',
      'Deep summer ploughing to expose pupae to predatory birds and hot sun',
      'Timely synchronized community sowing in the whole village'
    ],
    culturalPracticesTe: [
      'ఎకరానికి 15 టి-ఆకారపు పక్షి స్థావరాలు (Bird Perches) ఏర్పాటు చేయాలి',
      'వేసవిలో లోతు దుక్కులు చేసి కోశస్థ దశలను ఎండకు గురిచేయాలి',
      'గ్రామంలో రైతులందరూ ఒకే సమయంలో విత్తుకోవాలి'
    ],
    confidence: 97,
  },
  {
    id: 'tomato_early_blight',
    cropName: 'Hybrid Tomato',
    diseaseNameEn: 'Early Blight (Alternaria solani)',
    diseaseNameTe: 'టమాటా ముందస్తు ఆకుమచ్చ తెగులు (Early Blight)',
    pathogenType: 'FUNGAL',
    severity: 'MODERATE',
    symptomsEn: [
      'Dark brown to black concentric circular rings (target board spots) on older leaves',
      'Yellow chlorotic halos surrounding leaf lesions',
      'Premature defoliation leaving fruits exposed to sunscald'
    ],
    symptomsTe: [
      'ముదిరిన కింది ఆకులపై టార్గెట్ బోర్డు వంటి ఏకకేంద్రక వలయాల నల్లటి లేదా గోధుమ మచ్చలు',
      'మచ్చల చుట్టూ పసుపు రంగు వలయం ఏర్పడటం',
      'ఆకులు రాలిపోయి ఎండ తీవ్రతకు కాయలు దెబ్బతినడం'
    ],
    chemicalControlEn: {
      chemicalName: 'Mancozeb 75% WP or Chlorothalonil 75% WP',
      commercialBrands: 'Dithane M-45, Kavach, Tilt',
      dosagePerLiter: '2.5 grams',
      dosagePer16LPump: '40 grams',
      dosagePerAcre: '500 grams in 200 Liters of water',
      phiDays: 5,
    },
    chemicalControlTe: {
      chemicalName: 'మాంకోజెబ్ 75% WP లేదా క్లోరోథలోనిల్ 75% WP',
      commercialBrands: 'డైథేన్ M-45, కవచ్ (Kavach), టిల్ట్ (Tilt)',
      dosagePerLiter: '2.5 గ్రాములు',
      dosagePer16LPump: '40 గ్రాములు',
      dosagePerAcre: '500 గ్రాములు 200 లీటర్ల నీటిలో',
      phiDays: 5,
    },
    organicControlEn: 'Spray fermented butter milk (పుల్లటి మజ్జిగ) 50ml/L or Trichoderma harzianum @ 10g/L.',
    organicControlTe: 'పుల్లటి మజ్జిగ 50 మి.లీ లేదా ట్రైకోడెర్మా హార్జియానమ్ 10 గ్రాములు లీటరు నీటికి కలిపి పిచికారీ చేయాలి.',
    culturalPracticesEn: [
      'Mulch soil using paddy straw to prevent rain splash of soil-borne spores onto leaves',
      'Prune lower infected leaves touching the soil line',
      'Maintain staking and trellising to improve airflow'
    ],
    culturalPracticesTe: [
      'వరి గడ్డితో నేలను కప్పి (మల్చింగ్) వర్షపు నీటి చినుకుల ద్వారా తెగులు ఆకులకు చేరకుండా చూడాలి',
      'నేలను తాకే కింది ఆకులను కత్తిరించి తొలగించాలి',
      'కర్రలు కట్టి మొక్కలకు గాలి తగిలేలా నిలబెట్టాలి'
    ],
    confidence: 93,
  }
];
