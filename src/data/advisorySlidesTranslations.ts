import { Language } from '@/types';

export interface SlideTranslations {
  sectionTitle: string;
  sectionSubtitle: string;
  listen: string;
  stopAudio: string;
  prevSlide: string;
  nextSlide: string;
  slideOf: string;
  dataUnavailable: string;
  updateFarmDetails: string;

  // Slide 1: Crop
  cropTitle: string;
  cropSubtitle: string;
  cropActive: string;
  cropStage: string;
  cropDays: string;
  cropAction: string;
  cropCta: string;

  // Slide 2: Weather
  weatherTitle: string;
  weatherSubtitle: string;
  weatherTemp: string;
  weatherRain: string;
  weatherHumidity: string;
  weatherWind: string;
  weatherSprayFavorable: string;
  weatherSprayUnfavorable: string;
  weatherCta: string;

  // Slide 3: Irrigation
  irrigationTitle: string;
  irrigationSubtitle: string;
  irrigationMoisture: string;
  irrigationRuntime: string;
  irrigationMethod: string;
  irrigationRainNotice: string;
  irrigationNormalNotice: string;
  irrigationCta: string;

  // Slide 4: Soil
  soilTitle: string;
  soilSubtitle: string;
  soilScore: string;
  soilPh: string;
  soilNutrients: string;
  soilAdvice: string;
  soilCta: string;

  // Slide 5: Pest
  pestTitle: string;
  pestSubtitle: string;
  pestRisk: string;
  pestRiskModerate: string;
  pestRiskLow: string;
  pestRiskHigh: string;
  pestCondition: string;
  pestAction: string;
  pestCta: string;

  // Slide 6: Market
  marketTitle: string;
  marketSubtitle: string;
  marketModalPrice: string;
  marketRange: string;
  marketMandi: string;
  marketTrend: string;
  marketCta: string;

  // Slide 7: Tip
  tipTitle: string;
  tipSubtitle: string;
  tipTag: string;
  tipContent: string;
  tipCta: string;

  // Government & Cultivation Action Fields
  govtTitle: string;
  govtSubtitle: string;
  officialBadge: string;
  issuedBy: string;
  viewOfficialNotification: string;
  validUntil: string;
  urgentAlert: string;
  emergencyAlert: string;
  markAcknowledged: string;
  acknowledged: string;
  applicableTo: string;
  todayActionTitle: string;
  todayActionBadge: string;
}

export const ADVISORY_TRANSLATIONS: Record<Language, SlideTranslations> = {
  te: {
    sectionTitle: 'రైతు కోసం నేటి సూచనలు',
    sectionSubtitle: 'మీ పొలం కోసం స్మార్ట్ వ్యవసాయ సమాచారం',
    listen: 'వినండి',
    stopAudio: 'ఆపండి',
    prevSlide: 'మునుపటి సూచన',
    nextSlide: 'తదుపరి సూచన',
    slideOf: 'సూచన {current} / {total}',
    dataUnavailable: 'సమాచారం అందుబాటులో లేదు',
    updateFarmDetails: 'మీ పొలం వివరాలను నవీకరించండి',

    // Slide 1: Crop
    cropTitle: 'మీ పంటకు నేటి సూచన',
    cropSubtitle: 'సాగు దశ & క్షేత్ర పరిశీలన',
    cropActive: 'ప్రస్తుత పంట',
    cropStage: 'పంట దశ',
    cropDays: 'విత్తిన రోజులు',
    cropAction: 'ఉదయం సమయం పిచికారీకి అనుకూలం. తెల్లదోమ & రసం పీల్చు పురుగుల కోసం జిగురు అట్టలు పరిశీలించండి.',
    cropCta: 'పంట సూచనలు చూడండి',

    // Slide 2: Weather
    weatherTitle: 'ఈ రోజు వాతావరణం',
    weatherSubtitle: 'ఉష్ణోగ్రత, వర్ష సూచన & గాలి వేగం',
    weatherTemp: 'ఉష్ణోగ్రత',
    weatherRain: 'వర్ష సంభావ్యత',
    weatherHumidity: 'గాలిలో తేమ',
    weatherWind: 'గాలి వేగం',
    weatherSprayFavorable: 'పిచికారీకి అనుకూలం',
    weatherSprayUnfavorable: 'పిచికారీ వాయిదా వేయండి',
    weatherCta: 'పూర్తి వాతావరణం చూడండి',

    // Slide 3: Irrigation
    irrigationTitle: 'నీటి నిర్వహణ',
    irrigationSubtitle: 'తేమ ఆధారిత స్మార్ట్ నీటి పారుదల',
    irrigationMoisture: 'నేల తేమ',
    irrigationRuntime: 'డ్రిప్ సమయం',
    irrigationMethod: 'పారుదల పద్ధతి',
    irrigationRainNotice: 'రానున్న రోజుల్లో వర్ష సూచన ఉంది. నీటి పారుదల వాయిదా వేయండి.',
    irrigationNormalNotice: 'పూత దశలో తేమ కొరత లేకుండా ఉదయం లేదా సాయంత్రం వేళల్లో డ్రిప్ 2 గంటలు నడపండి.',
    irrigationCta: 'నీటి పారుదల నిర్వహణ',

    // Slide 4: Soil
    soilTitle: 'మీ నేల ఆరోగ్యం',
    soilSubtitle: 'సాయిల్ హెల్త్ కార్డ్ & పోషకాల సమాచారం',
    soilScore: 'భూసార స్కోర్',
    soilPh: 'నేల pH విలువ',
    soilNutrients: 'ప్రధాన పోషకాలు',
    soilAdvice: 'పంటలో జింక్ లోపం కనిపిస్తుంది. ఎకరానికి 10 కేజీల జింక్ సల్ఫేట్ వేయండి లేదా చిలేటెడ్ జింక్ పిచికారీ చేయండి.',
    soilCta: 'భూసార నివేదిక చూడండి',

    // Slide 5: Pest
    pestTitle: 'పురుగు / వ్యాధి జాగ్రత్త',
    pestSubtitle: 'వాతావరణ మార్పుల వల్ల తెగుళ్ల ముప్పు హెచ్చరిక',
    pestRisk: 'ముప్పు తీవ్రత',
    pestRiskModerate: 'మధ్యస్థం (గమనించండి)',
    pestRiskLow: 'తక్కువ (సురక్షితం)',
    pestRiskHigh: 'ఎక్కువ (వెంటనే చర్య తీసుకోండి)',
    pestCondition: 'రాత్రి చల్లదనం & గాలిలో తేమ 80% దాటితే ఆకుమచ్చ తెగులు ఆశించే అవకాశం ఉంది.',
    pestAction: 'పొలంలో తెగులు లక్షణాలు కనిపిస్తే వెంటనే ఫోటో తీసి AI స్కాన్ చేయండి.',
    pestCta: 'పంటను స్కాన్ చేయండి',

    // Slide 6: Market
    marketTitle: 'ఈ రోజు మార్కెట్ సమాచారం',
    marketSubtitle: 'లైవ్ e-NAM & అధికారిక మండి ధరలు',
    marketModalPrice: 'మోడల్ ధర',
    marketRange: 'ధరల శ్రేణి',
    marketMandi: 'మార్కెట్ యార్డ్',
    marketTrend: 'మార్కెట్ ట్రెండ్',
    marketCta: 'మార్కెట్ ధరలు చూడండి',

    // Slide 7: Tip
    tipTitle: 'నేటి రైతు చిట్కా',
    tipSubtitle: 'అనుభవజ్ఞులైన వ్యవసాయ శాస్త్రవేత్తల సలహా',
    tipTag: 'దిగుబడి పెంపు చిట్కా',
    tipContent: 'పూత రాలడం నివారించడానికి ప్లానోఫిక్స్ 4 మి.లీ 15 లీటర్ల నీటిలో కలిపి పిచికారీ చేయండి. దీనివల్ల కాయల నాణ్యత మరియు దిగుబడి 15% పెరుగుతుంది.',
    tipCta: 'సందేహం అడగండి',

    // Government & Cultivation Action Fields
    govtTitle: 'ప్రభుత్వ అధికారిక నోటిఫికేషన్',
    govtSubtitle: 'మీ ప్రాంతం & పంటకు సంబంధించిన ముఖ్య సమాచారం',
    officialBadge: 'అధికారిక ప్రకటన',
    issuedBy: 'జారీ చేసిన సంస్థ',
    viewOfficialNotification: 'అధికారిక నోటిఫికేషన్ చూడండి',
    validUntil: 'చెల్లుబాటు తేదీ',
    urgentAlert: 'ముఖ్యమైన హెచ్చరిక',
    emergencyAlert: 'అత్యవసర సమాచారం',
    markAcknowledged: 'చదివాను',
    acknowledged: 'గుర్తించబడింది',
    applicableTo: 'వర్తించే ప్రాంతం',
    todayActionTitle: 'మీ పంటకు నేటి ముఖ్యమైన పని',
    todayActionBadge: 'నేటి క్షేత్ర చర్య',
  },

  en: {
    sectionTitle: 'Daily Farming Advisories',
    sectionSubtitle: 'Smart farming updates for your field',
    listen: 'Listen',
    stopAudio: 'Stop',
    prevSlide: 'Previous advisory',
    nextSlide: 'Next advisory',
    slideOf: 'Advisory {current} of {total}',
    dataUnavailable: 'Data unavailable',
    updateFarmDetails: 'Update your farm details',

    // Slide 1: Crop
    cropTitle: "Today's Crop Advisory",
    cropSubtitle: 'Growth stage & field inspection',
    cropActive: 'Active Crop',
    cropStage: 'Growth Stage',
    cropDays: 'Days from Sowing',
    cropAction: 'Morning is ideal for foliar spray. Check yellow sticky traps for whiteflies and sucking pests.',
    cropCta: 'View Crop Advice',

    // Slide 2: Weather
    weatherTitle: "Today's Weather",
    weatherSubtitle: 'Temperature, rain probability & wind velocity',
    weatherTemp: 'Temperature',
    weatherRain: 'Rain Probability',
    weatherHumidity: 'Humidity',
    weatherWind: 'Wind Velocity',
    weatherSprayFavorable: 'Favorable for Spraying',
    weatherSprayUnfavorable: 'Defer Spraying Today',
    weatherCta: 'View Full Weather',

    // Slide 3: Irrigation
    irrigationTitle: 'Smart Irrigation',
    irrigationSubtitle: 'Moisture-based precision watering',
    irrigationMoisture: 'Soil Moisture',
    irrigationRuntime: 'Drip Runtime',
    irrigationMethod: 'Irrigation Type',
    irrigationRainNotice: 'Rain forecasted in coming days. Defer scheduled irrigation to save water and avoid root rot.',
    irrigationNormalNotice: 'Run drip for 2 hours in early morning or late evening to prevent flower drop during flowering stage.',
    irrigationCta: 'Manage Irrigation',

    // Slide 4: Soil
    soilTitle: 'Soil Health Card',
    soilSubtitle: 'Nutrient status & soil testing insights',
    soilScore: 'Soil Health Score',
    soilPh: 'Soil pH',
    soilNutrients: 'Primary Nutrients',
    soilAdvice: 'Soil indicates Zinc deficiency. Apply 10 kg Zinc Sulphate per acre or spray Chelated Zinc at 1.5g/L.',
    soilCta: 'View Soil Card',

    // Slide 5: Pest
    pestTitle: 'Pest & Disease Watch',
    pestSubtitle: 'Weather-triggered early crop risk warning',
    pestRisk: 'Risk Level',
    pestRiskModerate: 'Moderate (Monitor field)',
    pestRiskLow: 'Low (Healthy)',
    pestRiskHigh: 'High (Immediate Action)',
    pestCondition: 'Night dew and humidity exceeding 80% may trigger leaf spot and blast symptoms.',
    pestAction: 'If spotted, take a photo immediately and run the AI Crop Diagnostic Scanner.',
    pestCta: 'Scan Crop for Pests',

    // Slide 6: Market
    marketTitle: 'Live Mandi Prices',
    marketSubtitle: 'Official e-NAM & local market rates',
    marketModalPrice: 'Modal Price',
    marketRange: 'Price Range',
    marketMandi: 'Nearest Mandi',
    marketTrend: '24h Trend',
    marketCta: 'View Mandi Rates',

    // Slide 7: Tip
    tipTitle: "Daily Farmer's Tip",
    tipSubtitle: 'Agronomist recommendation for better yield',
    tipTag: 'Yield Booster',
    tipContent: 'Spray Planofix at 4 ml per 15 litres of water during peak flowering to arrest flower drop and boost fruit setting by 15%.',
    tipCta: 'Ask Agri Assistant',

    // Government & Cultivation Action Fields
    govtTitle: 'Official Government Advisory',
    govtSubtitle: 'Verified scheme & advisory for your field',
    officialBadge: 'Official Notice',
    issuedBy: 'Issued By',
    viewOfficialNotification: 'View Official Notification',
    validUntil: 'Valid Until',
    urgentAlert: 'Urgent Alert',
    emergencyAlert: 'Emergency Notice',
    markAcknowledged: 'Acknowledge',
    acknowledged: 'Acknowledged',
    applicableTo: 'Applicable To',
    todayActionTitle: "Today's Action for Your Crop",
    todayActionBadge: 'Field Action',
  },

  hi: {
    sectionTitle: 'दैनिक किसान सलाह',
    sectionSubtitle: 'आपके खेत के लिए सटीक कृषि मार्गदर्शन',
    listen: 'सुनें',
    stopAudio: 'रोकें',
    prevSlide: 'पिछली सलाह',
    nextSlide: 'अगली सलाह',
    slideOf: 'सलाह {current} / {total}',
    dataUnavailable: 'जानकारी उपलब्ध नहीं',
    updateFarmDetails: 'खेत का विवरण अपडेट करें',

    // Slide 1: Crop
    cropTitle: 'आपकी फसल के लिए आज की सलाह',
    cropSubtitle: 'फसल अवस्था एवं खेत का निरीक्षण',
    cropActive: 'वर्तमान फसल',
    cropStage: 'फसल की अवस्था',
    cropDays: 'बुवाई के दिन',
    cropAction: 'सुबह का समय छिड़काव के लिए सर्वोत्तम है। रस चूसक कीटों के लिए चिपचिपे ट्रैप की जांच करें।',
    cropCta: 'फसल सलाह देखें',

    // Slide 2: Weather
    weatherTitle: 'आज का मौसम',
    weatherSubtitle: 'तापमान, वर्षा संभावना एवं हवा की गति',
    weatherTemp: 'तापमान',
    weatherRain: 'वर्षा संभावना',
    weatherHumidity: 'नमी (आर्द्रता)',
    weatherWind: 'हवा की गति',
    weatherSprayFavorable: 'छिड़काव के अनुकूल',
    weatherSprayUnfavorable: 'छिड़काव टालें',
    weatherCta: 'पूरा मौसम देखें',

    // Slide 3: Irrigation
    irrigationTitle: 'स्मार्ट सिंचाई प्रबंधन',
    irrigationSubtitle: 'नमी आधारित सटीक सिंचाई',
    irrigationMoisture: 'मिट्टी की नमी',
    irrigationRuntime: 'ड्रिप का समय',
    irrigationMethod: 'सिंचाई का प्रकार',
    irrigationRainNotice: 'अगले कुछ दिनों में बारिश की संभावना है। सिंचाई स्थगित रखें।',
    irrigationNormalNotice: 'फूल आने की अवस्था में सुबह या शाम के समय 2 घंटे ड्रिप चलाएं।',
    irrigationCta: 'सिंचाई प्रबंधित करें',

    // Slide 4: Soil
    soilTitle: 'मृदा स्वास्थ्य कार्ड',
    soilSubtitle: 'पोषक तत्व स्थिति एवं मिट्टी परीक्षण रिपोर्ट',
    soilScore: 'मृदा स्कोर',
    soilPh: 'मिट्टी का pH',
    soilNutrients: 'प्राथमिक पोषक तत्व',
    soilAdvice: 'मिट्टी में जिंक की कमी है। 10 किग्रा जिंक सल्फेट प्रति एकड़ डालें।',
    soilCta: 'मृदा रिपोर्ट देखें',

    // Slide 5: Pest
    pestTitle: 'कीट एवं रोग चेतावनी',
    pestSubtitle: 'मौसम अनुकूल होने पर रोग फैलने की पूर्व चेतावनी',
    pestRisk: 'जोखिम स्तर',
    pestRiskModerate: 'मध्यम (निगरानी रखें)',
    pestRiskLow: 'कम (सुरक्षित)',
    pestRiskHigh: 'उच्च (तुरंत कार्रवाई करें)',
    pestCondition: 'हवा में 80% से अधिक नमी होने पर पत्ती धब्बा रोग फैल सकता है।',
    pestAction: 'लक्षण दिखने पर तुरंत फोटो खींचकर AI स्कैनर से जांचें।',
    pestCta: 'फसल की जांच करें',

    // Slide 6: Market
    marketTitle: 'आज के मंडी भाव',
    marketSubtitle: 'सत्यापित ई-नाम एवं स्थानीय मंडी दरें',
    marketModalPrice: 'मॉडल भाव',
    marketRange: 'भाव दायरा',
    marketMandi: 'निकटतम मंडी',
    marketTrend: '24 घंटे का रुझान',
    marketCta: 'मंडी भाव देखें',

    // Slide 7: Tip
    tipTitle: 'आज का किसान सुझाव',
    tipSubtitle: 'कृषि वैज्ञानिकों द्वारा अनुशंसित तकनीक',
    tipTag: 'पैदावार बढ़ाने का उपाय',
    tipContent: 'फूल झड़ना रोकने के लिए प्लानोफिक्स 4 मिली 15 लीटर पानी में घोलकर छिड़कें।',
    tipCta: 'कृषि सहायक से पूछें',

    // Government & Cultivation Action Fields
    govtTitle: 'आधिकारिक सरकारी अधिसूचना',
    govtSubtitle: 'आपके क्षेत्र और फसल के लिए सत्यापित योजना',
    officialBadge: 'आधिकारिक सूचना',
    issuedBy: 'जारीकर्ता विभाग',
    viewOfficialNotification: 'आधिकारिक अधिसूचना देखें',
    validUntil: 'वैधता तिथि',
    urgentAlert: 'महत्वपूर्ण चेतावनी',
    emergencyAlert: 'आपातकालीन सूचना',
    markAcknowledged: 'स्वीकार करें',
    acknowledged: 'स्वीकृत',
    applicableTo: 'लागू क्षेत्र',
    todayActionTitle: 'आपकी फसल के लिए आज का कार्य',
    todayActionBadge: 'खेत की कार्रवाई',
  },

  ta: {
    sectionTitle: 'தினசரி விவசாய வழிகாட்டல்',
    sectionSubtitle: 'உங்கள் வயலுக்கான துல்லிய விவசாயத் தகவல்',
    listen: 'கேளுங்கள்',
    stopAudio: 'நிறுத்து',
    prevSlide: 'முந்தைய ஆலோசனை',
    nextSlide: 'அடுத்த ஆலோசனை',
    slideOf: 'ஆலோசனை {current} / {total}',
    dataUnavailable: 'தகவல் இல்லை',
    updateFarmDetails: 'விவரங்களை புதுப்பிக்கவும்',

    // Slide 1: Crop
    cropTitle: 'இன்றைய பயிர் ஆலோசனை',
    cropSubtitle: 'பயிர் வளர்ச்சி நிலை மற்றும் ஆய்வு',
    cropActive: 'தற்போதைய பயிர்',
    cropStage: 'பயிர் நிலை',
    cropDays: 'விதைத்த நாட்கள்',
    cropAction: 'காலை வேளை தெளிப்புக்கு சிறந்தது. சாறு உறிஞ்சும் பூச்சிகளுக்கு ஒட்டும் பொறிகளைப் பயன்படுத்தவும்.',
    cropCta: 'பயிர் வழிகாட்டல் பார்க்க',

    // Slide 2: Weather
    weatherTitle: 'இன்றைய வானிலை',
    weatherSubtitle: 'வெப்பநிலை, மழை வாய்ப்பு மற்றும் காற்று வேகம்',
    weatherTemp: 'வெப்பநிலை',
    weatherRain: 'மழை வாய்ப்பு',
    weatherHumidity: 'காற்றின் ஈரப்பதம்',
    weatherWind: 'காற்றின் வேகம்',
    weatherSprayFavorable: 'தெளிப்புக்கு சாதகமானது',
    weatherSprayUnfavorable: 'தெளிப்பை தள்ளிப்போடவும்',
    weatherCta: 'வானிலை விவரம்',

    // Slide 3: Irrigation
    irrigationTitle: 'துல்லிய பாசன மேலாண்மை',
    irrigationSubtitle: 'மண் ஈரப்பதம் சார்ந்த நீர் பாசனம்',
    irrigationMoisture: 'மண் ஈரப்பதம்',
    irrigationRuntime: 'சொட்டு நீர் நேரம்',
    irrigationMethod: 'பாசன முறை',
    irrigationRainNotice: 'அடுத்த சில நாட்களில் மழை வாய்ப்புள்ளது. பாசனத்தை தள்ளி வைக்கவும்.',
    irrigationNormalNotice: 'பூக்கும் தருணத்தில் அதிகாலை அல்லது மாலையில் 2 மணி நேரம் சொட்டு நீர் பாய்ச்சவும்.',
    irrigationCta: 'பாசனத்தை நிர்வகி',

    // Slide 4: Soil
    soilTitle: 'மண் வள அட்டை',
    soilSubtitle: 'ஊட்டச்சத்து விவரம் மற்றும் மண் பரிசோதனை',
    soilScore: 'மண் வள மதிப்பெண்',
    soilPh: 'மண் pH கார அமிலத்தன்மை',
    soilNutrients: 'முதன்மை சத்துக்கள்',
    soilAdvice: 'மண்ணில் துத்தநாக குறைபாடு உள்ளது. ஏக்கருக்கு 10 கிலோ ஜிங்க் சல்பேட் இடவும்.',
    soilCta: 'மண் அட்டை பார்க்க',

    // Slide 5: Pest
    pestTitle: 'பூச்சி மற்றும் நோய் எச்சரிக்கை',
    pestSubtitle: 'வானிலை மாற்றத்தால் நோய் பரவும் வாய்ப்பு',
    pestRisk: 'அபாய அளவு',
    pestRiskModerate: 'நடுத்தரம் (கண்காணிக்கவும்)',
    pestRiskLow: 'குறைவு (பாதுகாப்பானது)',
    pestRiskHigh: 'அதிகம் (உடனடி நடவடிக்கை)',
    pestCondition: 'காற்றில் 80% மேல் ஈரப்பதம் இருந்தால் இலைக்கருகல் நோய் ஏற்பட வாய்ப்புள்ளது.',
    pestAction: 'அறிகுறிகள் தெரிந்தால் புகைப்படம் எடுத்து AI ஸ்கேனரில் பரிசோதிக்கவும்.',
    pestCta: 'பயிரை ஸ்கேன் செய்',

    // Slide 6: Market
    marketTitle: 'இன்றைய சந்தை விலை',
    marketSubtitle: 'அதிகாரப்பூர்வ இ-நாம் மற்றும் சந்தை நிலவரம்',
    marketModalPrice: 'மாதிரி விலை',
    marketRange: 'விலை வரம்பு',
    marketMandi: 'அருகிலுள்ள சந்தை',
    marketTrend: '24 மணி நேர போக்கு',
    marketCta: 'சந்தை விலை பார்க்க',

    // Slide 7: Tip
    tipTitle: 'இன்றைய விவசாயக் குறிப்பு',
    tipSubtitle: 'வேளாண் விஞ்ஞானிகளின் ஆலோசனை',
    tipTag: 'மகசூல் பெருக்கும் உத்தி',
    tipContent: 'பூ உதிர்வதைத் தடுக்க பிளானோபிக்ஸ் 4 மி.லி 15 லிட்டர் நீரில் கலந்து தெளிக்கவும்.',
    tipCta: 'கேள்வி கேட்க',

    // Government & Cultivation Action Fields
    govtTitle: 'அதிகாரப்பூர்வ அரசு அறிவிப்பு',
    govtSubtitle: 'உங்கள் பகுதி மற்றும் பயிருக்கான அரசு திட்டம்',
    officialBadge: 'அரசு அறிவிப்பு',
    issuedBy: 'வெளியிட்ட துறை',
    viewOfficialNotification: 'அரசு அறிவிப்பைப் பார்க்கவும்',
    validUntil: 'செல்லுபடியாகும் தேதி',
    urgentAlert: 'அவசர எச்சரிக்கை',
    emergencyAlert: 'அவசர கால அறிவிப்பு',
    markAcknowledged: 'ஏற்றுக்கொண்டேன்',
    acknowledged: 'ஏற்கப்பட்டது',
    applicableTo: 'பொருந்தும் பகுதி',
    todayActionTitle: 'உங்கள் பயிருக்கான இன்றைய செயல்பாடு',
    todayActionBadge: 'வயல் செயல்பாடு',
  },

  kn: {
    sectionTitle: 'ದೈನಂದಿನ ಕೃಷಿ ಸಲಹೆಗಳು',
    sectionSubtitle: 'ನಿಮ್ಮ ಜಮೀನಿಗೆ ನಿಖರ ಕೃಷಿ ಮಾರ್ಗದರ್ಶನ',
    listen: 'ಕೇಳಿ',
    stopAudio: 'ನಿಲ್ಲಿಸಿ',
    prevSlide: 'ಹಿಂದಿನ ಸಲಹೆ',
    nextSlide: 'ಮುಂದಿನ ಸಲಹೆ',
    slideOf: 'ಸಲಹೆ {current} / {total}',
    dataUnavailable: 'ಮಾಹಿತಿ ಲಭ್ಯವಿಲ್ಲ',
    updateFarmDetails: 'ಜಮೀನಿನ ವಿವರ ನವೀಕರಿಸಿ',

    // Slide 1: Crop
    cropTitle: 'ನಿಮ್ಮ ಬೆಳೆಗೆ ಇಂದಿನ ಸಲಹೆ',
    cropSubtitle: 'ಬೆಳೆ ಹಂತ ಮತ್ತು ತಪಾಸಣೆ',
    cropActive: 'ಪ್ರಸ್ತುತ ಬೆಳೆ',
    cropStage: 'ಬೆಳೆ ಹಂತ',
    cropDays: 'ಬಿತ್ತನೆ ದಿನಗಳು',
    cropAction: 'ಬೆಳಗಿನ ವೇಳೆ ಸಿಂಪಡಣೆಗೆ ಸೂಕ್ತ. ಕೀಟಗಳ ನಿಯಂತ್ರಣಕ್ಕೆ ಹಳದಿ ಜಿಗುಟು ಬಲೆಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.',
    cropCta: 'ಬೆಳೆ ಸಲಹೆ ನೋಡಿ',

    // Slide 2: Weather
    weatherTitle: 'ಇಂದಿನ ಹವಾಮಾನ',
    weatherSubtitle: 'ತಾಪಮಾನ, ಮಳೆ ಸಂಭವನೀಯತೆ ಮತ್ತು ಗಾಳಿಯ ವೇಗ',
    weatherTemp: 'ತಾಪಮಾನ',
    weatherRain: 'ಮಳೆ ಸಾಧ್ಯತೆ',
    weatherHumidity: 'ತೇವಾಂಶ',
    weatherWind: 'ಗಾಳಿಯ ವೇಗ',
    weatherSprayFavorable: 'ಸಿಂಪರಣೆಗೆ ಸೂಕ್ತ',
    weatherSprayUnfavorable: 'ಸಿಂಪರಣೆ ಮುಂದೂಡಿ',
    weatherCta: 'ಸಂಪೂರ್ಣ ಹವಾಮಾನ',

    // Slide 3: Irrigation
    irrigationTitle: 'ಸ್ಮಾರ್ಟ್ ನೀರಾವರಿ ನಿರ್ವಹಣೆ',
    irrigationSubtitle: 'ತೇವಾಂಶ ಆಧಾರಿತ ನಿಖರ ನೀರಾವರಿ',
    irrigationMoisture: 'ಮಣ್ಣಿನ ತೇವಾಂಶ',
    irrigationRuntime: 'ಹನಿ ನೀರಾವರಿ ಸಮಯ',
    irrigationMethod: 'ನೀರಾವರಿ ವಿಧಾನ',
    irrigationRainNotice: 'ಮುಂದಿನ ದಿನಗಳಲ್ಲಿ ಮಳೆಯ ಮುನ್ಸೂಚನೆ ಇದೆ. ನೀರಾವರಿಯನ್ನು ಮುಂದೂಡಿ.',
    irrigationNormalNotice: 'ಹೂವಾಡುವ ಹಂತದಲ್ಲಿ ಬೆಳಿಗ್ಗೆ ಅಥವಾ ಸಂಜೆ 2 ಗಂಟೆ ಹನಿ ನೀರಾವರಿ ಒದಗಿಸಿ.',
    irrigationCta: 'ನೀರಾವರಿ ನಿರ್ವಹಿಸಿ',

    // Slide 4: Soil
    soilTitle: 'ಮಣ್ಣು ಆರೋಗ್ಯ ಕಾರ್ಡ್',
    soilSubtitle: 'ಪೋಷಕಾಂಶ ವಿವರ ಮತ್ತು ಪರೀಕ್ಷಾ ವರದಿ',
    soilScore: 'ಮಣ್ಣಿನ ಸ್ಕೋರ್',
    soilPh: 'ಮಣ್ಣಿನ pH',
    soilNutrients: 'ಪ್ರಮುಖ ಪೋಷಕಾಂಶಗಳು',
    soilAdvice: 'ಮಣ್ಣಿನಲ್ಲಿ ಜಿಂಕ್ ಕೊರತೆ ಕಂಡುಬಂದಿದೆ. ಎಕರೆಗೆ 10 ಕೆಜಿ ಜಿಂಕ್ ಸಲ್ಫೇಟ್ ಹಾಕಿ.',
    soilCta: 'ಮಣ್ಣಿನ ವರದಿ ನೋಡಿ',

    // Slide 5: Pest
    pestTitle: 'ಕೀಟ ಮತ್ತು ರೋಗ ಎಚ್ಚರಿಕೆ',
    pestSubtitle: 'ಹವಾಮಾನ ಬದಲಾವಣೆಯಿಂದ ರೋಗ ಹರಡುವ ಮುನ್ಸೂಚನೆ',
    pestRisk: 'ಅಪಾಯ ಮಟ್ಟ',
    pestRiskModerate: 'ಮಧ್ಯಮ (ಗಮನಿಸಿ)',
    pestRiskLow: 'ಕಡಿಮೆ (ಸುರಕ್ಷಿತ)',
    pestRiskHigh: 'ಹೆಚ್ಚು (ತಕ್ಷಣ ಕ್ರಮ)',
    pestCondition: 'ಗಾಳಿಯಲ್ಲಿ ತೇವಾಂಶ 80% ಮೀರಿದರೆ ಎಲೆಚುಕ್ಕೆ ರೋಗ ಬರುವ ಸಾಧ್ಯತೆ ಇದೆ.',
    pestAction: 'ರೋಗದ ಲಕ್ಷಣ ಕಂಡರೆ ಫೋಟೋ ತೆಗೆದು AI ಸ್ಕ್ಯಾನರ್ ಮೂಲಕ ಪರೀಕ್ಷಿಸಿ.',
    pestCta: 'ಬೆಳೆ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ',

    // Slide 6: Market
    marketTitle: 'ಇಂದಿನ ಮಾರುಕಟ್ಟೆ ದರ',
    marketSubtitle: 'ಅಧಿಕೃತ ಇ-ನ್ಯಾಮ್ ಮತ್ತು ಮಂಡಿ ಬೆಲೆಗಳು',
    marketModalPrice: 'ಮಾದರಿ ಬೆಲೆ',
    marketRange: 'ಬೆಲೆ ಶ್ರೇಣಿ',
    marketMandi: 'ಹತ್ತಿರದ ಮಾರುಕಟ್ಟೆ',
    marketTrend: '24 ಗಂಟೆಯ ಪ್ರವೃತ್ತಿ',
    marketCta: 'ಮಾರುಕಟ್ಟೆ ದರ ನೋಡಿ',

    // Slide 7: Tip
    tipTitle: 'ಇಂದಿನ ರೈತ ಟಿಪ್ಸ್',
    tipSubtitle: 'ಕೃಷಿ ತಜ್ಞರ ಉಪಯುಕ್ತ ಸಲಹೆ',
    tipTag: 'ಇಳುವರಿ ಹೆಚ್ಚಳ',
    tipContent: 'ಹೂ ಉದುರುವುದನ್ನು ತಡೆಯಲು ಪ್ಲಾನೋಫಿಕ್ಸ್ 4 ಮಿಲಿ 15 ಲೀಟರ್ ನೀರಿಗೆ ಬೆರೆಸಿ ಸಿಂಪಡಿಸಿ.',
    tipCta: 'ಸಲಹೆ ಕೇಳಿ',

    // Government & Cultivation Action Fields
    govtTitle: 'ಅಧಿಕೃತ ಸರ್ಕಾರಿ ಅಧಿಸೂಚನೆ',
    govtSubtitle: 'ನಿಮ್ಮ ಪ್ರದೇಶ ಮತ್ತು ಬೆಳೆಗೆ ಸಂಬಂಧಿಸಿದ ಮಾಹಿತಿ',
    officialBadge: 'ಅಧಿಕೃತ ಪ್ರಕಟಣೆ',
    issuedBy: 'ಜಾರಿಗೊಳಿಸಿದ ಇಲಾಖೆ',
    viewOfficialNotification: 'ಅಧಿಕೃತ ಅಧಿಸೂಚನೆ ನೋಡಿ',
    validUntil: 'ಅಂತಿಮ ದಿನಾಂಕ',
    urgentAlert: 'ತುರ್ತು ಎಚ್ಚರಿಕೆ',
    emergencyAlert: 'ತುರ್ತು ಪ್ರಕಟಣೆ',
    markAcknowledged: 'ಸ್ವೀಕರಿಸಲಾಗಿದೆ',
    acknowledged: 'ಗುರುತಿಸಲಾಗಿದೆ',
    applicableTo: 'ಅನ್ವಯವಾಗುವ ಪ್ರದೇಶ',
    todayActionTitle: 'ನಿಮ್ಮ ಬೆಳೆಗೆ ಇಂದಿನ ಪ್ರಮುಖ ಕ್ರಮ',
    todayActionBadge: 'ಕ್ಷೇತ್ರದ ಕಾರ್ಯ',
  },

  ml: {
    sectionTitle: 'ദൈനംദിന കാർഷിക നിർദ്ദേശങ്ങൾ',
    sectionSubtitle: 'നിങ്ങളുടെ കൃഷിയിടത്തിനുള്ള മാർഗ്ഗനിർദ്ദേശം',
    listen: 'കേൾക്കൂ',
    stopAudio: 'നിർത്തൂ',
    prevSlide: 'മുമ്പത്തെ നിർദ്ദേശം',
    nextSlide: 'അടുത്ത നിർദ്ദേശം',
    slideOf: 'നിർദ്ദേശം {current} / {total}',
    dataUnavailable: 'വിവരം ലഭ്യമല്ല',
    updateFarmDetails: 'വിവരങ്ങൾ പുതുക്കൂ',

    // Slide 1: Crop
    cropTitle: 'നിങ്ങളുടെ വിളയ്ക്കുള്ള ഇന്നത്തെ നിർദ്ദേശം',
    cropSubtitle: 'വളർച്ചാ ഘട്ടവും ഫീൽഡ് പരിശോധനയും',
    cropActive: 'നിലവിലെ വിള',
    cropStage: 'വളർച്ചാ ഘട്ടം',
    cropDays: 'വിളിച്ച ദിവസങ്ങൾ',
    cropAction: 'രാവിലെ സമയം തളിക്കാൻ അനുയോജ്യമാണ്. കീടങ്ങളെ നിയന്ത്രിക്കാൻ കെണികൾ ഉപയോഗിക്കുക.',
    cropCta: 'വിള നിർദ്ദേശം കാണുക',

    // Slide 2: Weather
    weatherTitle: 'ഇന്നത്തെ കാലാവസ്ഥ',
    weatherSubtitle: 'താപനില, മഴ സാധ്യത, കാറ്റിന്റെ വേഗത',
    weatherTemp: 'താപനില',
    weatherRain: 'മഴ സാധ്യത',
    weatherHumidity: 'ഈർപ്പം',
    weatherWind: 'കാറ്റിന്റെ വേഗത',
    weatherSprayFavorable: 'തളിക്കാൻ അനുകൂലം',
    weatherSprayUnfavorable: 'തളിക്കുന്നത് മാറ്റിവെക്കുക',
    weatherCta: 'കാലാവസ്ഥ കാണുക',

    // Slide 3: Irrigation
    irrigationTitle: 'നനയ്ക്കൽ ക്രമീകരണം',
    irrigationSubtitle: 'ഈർപ്പത്തെ അടിസ്ഥാനമാക്കിയുള്ള ജലസേചനം',
    irrigationMoisture: 'മണ്ണിലെ ഈർപ്പം',
    irrigationRuntime: 'ഡ്രിപ്പ് സമയം',
    irrigationMethod: 'ജലസേചന രീതി',
    irrigationRainNotice: 'അടുത്ത ദിവസങ്ങളിൽ മഴയ്ക്ക് സാധ്യതയുണ്ട്. നനയ്ക്കുന്നത് മാറ്റിവെക്കുക.',
    irrigationNormalNotice: 'പൂവിടുന്ന ഘട്ടത്തിൽ രാവിലെ അല്ലെങ്കിൽ വൈകുന്നേരം 2 മണിക്കൂർ ഡ്രിപ്പ് നനയ്ക്കുക.',
    irrigationCta: 'ജലസേചനം ക്രമീകരിക്കുക',

    // Slide 4: Soil
    soilTitle: 'സോയിൽ ഹെൽത്ത് കാർഡ്',
    soilSubtitle: 'പോഷക വിവരങ്ങളും മണ്ണ് പരിശോധനാ റിപ്പോർട്ടും',
    soilScore: 'മണ്ണ് സ്കോർ',
    soilPh: 'മണ്ണിലെ pH',
    soilNutrients: 'പ്രധാന പോഷകങ്ങൾ',
    soilAdvice: 'മണ്ണിൽ സിങ്കിന്റെ കുറവുണ്ട്. ഏക്കറിന് 10 കിലോ സിങ്ക് സൾഫേറ്റ് ചേർക്കുക.',
    soilCta: 'മണ്ണ് കാർഡ് കാണുക',

    // Slide 5: Pest
    pestTitle: 'കീട-രോഗ മുന്നറിയിപ്പ്',
    pestSubtitle: 'കാലാവസ്ഥാ വ്യതിയാനം മൂലമുള്ള രോഗ സാധ്യത',
    pestRisk: 'സാധ്യത നിലവാരം',
    pestRiskModerate: 'ഇടത്തരം (ശ്രദ്ധിക്കുക)',
    pestRiskLow: 'കുറവ് (സുരക്ഷിതം)',
    pestRiskHigh: 'കൂടുതൽ (ഉടൻ നടപടി)',
    pestCondition: 'ഈർപ്പം 80% ൽ കൂടുതലായാൽ കുമിൾ രോഗങ്ങൾ പടരാൻ സാധ്യതയുണ്ട്.',
    pestAction: 'ലക്ഷണങ്ങൾ കണ്ടാൽ ഉടൻ ഫോട്ടോ എടുത്ത് AI സ്കാനർ ഉപയോഗിച്ച് പരിശോധിക്കുക.',
    pestCta: 'വിള സ്കാൻ ചെയ്യുക',

    // Slide 6: Market
    marketTitle: 'ഇന്നത്തെ വിപണി വില',
    marketSubtitle: 'ഔദ്യോഗിക ഇ-നാം, പ്രാദേശിക മാർക്കറ്റ് വിലകൾ',
    marketModalPrice: 'ശരാശരി വില',
    marketRange: 'വില പരിധി',
    marketMandi: 'അടുത്തുള്ള മാർക്കറ്റ്',
    marketTrend: '24 മണിക്കൂർ ട്രെൻഡ്',
    marketCta: 'വിപണി വില കാണുക',

    // Slide 7: Tip
    tipTitle: 'ഇന്നത്തെ കർഷക ടിപ്പ്',
    tipSubtitle: 'കാർഷിക വിദഗ്ധരുടെ ശുപാർശ',
    tipTag: 'ഉത്പാദന വർദ്ധനവ്',
    tipContent: 'പൂക്കൾ കൊഴിയുന്നത് തടയാൻ പ്ലാനോഫിക്സ് 4 മില്ലി 15 ലിറ്റർ വെള്ളത്തിൽ കലക്കി തളിക്കുക.',
    tipCta: 'വിദഗ്ധനോട് ചോദിക്കുക',

    // Government & Cultivation Action Fields
    govtTitle: 'ഔദ്യോഗിക സർക്കാർ അറിയിപ്പ്',
    govtSubtitle: 'നിങ്ങളുടെ കൃഷിഭൂമിക്കുള്ള ആധികാരിക വിവരം',
    officialBadge: 'ഔദ്യോഗിക അറിയിപ്പ്',
    issuedBy: 'പുറപ്പെടുവിച്ച വകുപ്പ്',
    viewOfficialNotification: 'വിജ്ഞാപനം കാണുക',
    validUntil: 'കാലാവധി തീയതി',
    urgentAlert: 'പ്രധാന മുന്നറിയിപ്പ്',
    emergencyAlert: 'അടിയന്തര അറിയിപ്പ്',
    markAcknowledged: 'വായിച്ചു മനസ്സിലാക്കി',
    acknowledged: 'അംഗീകരിച്ചു',
    applicableTo: 'ബാധകമായ പ്രദേശം',
    todayActionTitle: 'ഇന്നത്തെ പ്രധാന കൃഷിപ്പണി',
    todayActionBadge: 'ഫീൽഡ് പ്രവർത്തനം',
  },

  mr: {
    sectionTitle: 'दैनिक शेती सल्ला',
    sectionSubtitle: 'आपल्या शेतासाठी अचूक कृषी मार्गदर्शन',
    listen: 'ऐका',
    stopAudio: 'थांबवा',
    prevSlide: 'मागील सल्ला',
    nextSlide: 'पुढील सल्ला',
    slideOf: 'सल्ला {current} / {total}',
    dataUnavailable: 'माहिती उपलब्ध नाही',
    updateFarmDetails: 'शेतीचे तपशील अपडेट करा',

    // Slide 1: Crop
    cropTitle: 'आपल्या पिकासाठी आजचा सल्ला',
    cropSubtitle: 'वाढीची अवस्था आणि शेतीची पाहणी',
    cropActive: 'सध्याचे पीक',
    cropStage: 'पिकाची अवस्था',
    cropDays: 'पेरणीचे दिवस',
    cropAction: 'सकाळची वेळ फवारणीसाठी योग्य आहे. रस शोषणाऱ्या किडींसाठी पिवळे चिकट ट्रॅप तपासा.',
    cropCta: 'पीक सल्ला पहा',

    // Slide 2: Weather
    weatherTitle: 'आजचे हवामान',
    weatherSubtitle: 'तापमान, पाऊस शक्यता आणि वाऱ्याचा वेग',
    weatherTemp: 'तापमान',
    weatherRain: 'पाऊस शक्यता',
    weatherHumidity: 'हवेतील आर्द्रता',
    weatherWind: 'वाऱ्याचा वेग',
    weatherSprayFavorable: 'फवारणीसाठी अनुकूल',
    weatherSprayUnfavorable: 'फवारणी पुढे ढकला',
    weatherCta: 'पूर्ण हवामान पहा',

    // Slide 3: Irrigation
    irrigationTitle: 'स्मार्ट सिंचन व्यवस्थापन',
    irrigationSubtitle: 'ओलाव्यावर आधारित अचूक सिंचन',
    irrigationMoisture: 'मातीतील ओलावा',
    irrigationRuntime: 'ठिबक वेळ',
    irrigationMethod: 'सिंचन प्रकार',
    irrigationRainNotice: 'पुढील दिवसांत पावसाची शक्यता आहे. पाणी देणे पुढे ढकला.',
    irrigationNormalNotice: 'फुलधारणेच्या काळात सकाळी किंवा संध्याकाळी २ तास ठिबक सिंचन करा.',
    irrigationCta: 'सिंचन व्यवस्थापन',

    // Slide 4: Soil
    soilTitle: 'मृदा आरोग्य पत्रिका',
    soilSubtitle: 'पोषक घटकांची स्थिती आणि माती परीक्षण अहवाल',
    soilScore: 'माती आरोग्य स्कोअर',
    soilPh: 'मातीचा सामू (pH)',
    soilNutrients: 'मुख्य पोषक घटक',
    soilAdvice: 'मातीत झिंकची कमतरता आहे. एकरी १० किलो झिंक सल्फेट वापरा.',
    soilCta: 'माती अहवाल पहा',

    // Slide 5: Pest
    pestTitle: 'कीड आणि रोग दक्षता',
    pestSubtitle: 'हवामान बदलामुळे कीड-रोगांचा पूर्वइशारा',
    pestRisk: 'धोका पातळी',
    pestRiskModerate: 'मध्यम (लक्ष ठेवा)',
    pestRiskLow: 'कमी (सुरक्षित)',
    pestRiskHigh: 'जास्त (तातडीने उपाय करा)',
    pestCondition: 'हवेत ८०% पेक्षा जास्त आर्द्रता राहिल्यास बुरशीजन्य रोगांचा प्रादुर्भाव होऊ शकतो.',
    pestAction: 'लक्षणे आढळल्यास फोटो काढून AI स्कॅनरद्वारे तपासणी करा.',
    pestCta: 'पीक स्कॅन करा',

    // Slide 6: Market
    marketTitle: 'आजचे बाजारभाव',
    marketSubtitle: 'अधिकृत ई-नाम आणि स्थानिक बाजार दर',
    marketModalPrice: 'सरासरी भाव',
    marketRange: 'किंमत श्रेणी',
    marketMandi: 'जवळची बाजार समिती',
    marketTrend: '२४ तासांचा कल',
    marketCta: 'बाजारभाव पहा',

    // Slide 7: Tip
    tipTitle: 'आजचा शेतकरी सल्ला',
    tipSubtitle: 'कृषी शास्त्रज्ञांचा महत्त्वपूर्ण सल्ला',
    tipTag: 'उत्पादन वाढ उपाय',
    tipContent: 'फुलगळ रोखण्यासाठी प्लानोफिक्स ४ मिली १५ लिटर पाण्यात मिसळून फवारा. उत्पादन १५% वाढेल.',
    tipCta: 'मार्गदर्शन विचारा',

    // Government & Cultivation Action Fields
    govtTitle: 'अधिकृत शासकीय सूचना',
    govtSubtitle: 'आपल्या शेतासाठी आणि पिकासाठी महत्त्वाची योजना',
    officialBadge: 'शासकीय सूचना',
    issuedBy: 'जारी करणारा विभाग',
    viewOfficialNotification: 'अधिकृत अधिसूचना पहा',
    validUntil: 'वैधता तारीख',
    urgentAlert: 'तातडीचा इशारा',
    emergencyAlert: 'आपत्कालीन सूचना',
    markAcknowledged: 'वाचले व समजले',
    acknowledged: 'नोंद घेतली',
    applicableTo: 'लागू क्षेत्र',
    todayActionTitle: 'आपल्या पिकासाठी आजची महत्त्वाची कृती',
    todayActionBadge: 'शेत कार्य',
  },
};
