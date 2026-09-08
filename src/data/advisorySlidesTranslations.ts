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
    irrigationCta: 'నీటి పారుదల నిర్వహించండి',

    // Slide 4: Soil
    soilTitle: 'మీ నేల ఆరోగ్యం',
    soilSubtitle: 'సాయిల్ హెల్త్ కార్డ్ & పోషకాల స్థాయి',
    soilScore: 'ఆరోగ్య స్కోర్',
    soilPh: 'పీహెచ్ (pH)',
    soilNutrients: 'N-P-K లభ్యత',
    soilAdvice: 'జింక్ లోపం ఉన్నందున జింక్ సల్ఫేట్ 10 కేజీలు ఎకరానికి వేయండి లేదా సూక్ష్మ పోషకాలను పిచికారీ చేయండి.',
    soilCta: 'సాయిల్ కార్డ్ చూడండి',

    // Slide 5: Pest
    pestTitle: 'పురుగు / వ్యాధి జాగ్రత్త',
    pestSubtitle: 'వాతావరణ ప్రమాద హెచ్చరిక & పర్యవేక్షణ',
    pestRisk: 'రిస్క్ స్థాయి',
    pestRiskModerate: 'మధ్యస్థ ప్రమాదం (సాధ్యత ఉంది)',
    pestRiskLow: 'తక్కువ ప్రమాదం',
    pestRiskHigh: 'అధిక ప్రమాదం',
    pestCondition: 'తేమ శాతం ఎక్కువగా ఉండటం వల్ల బూజు తెగులు లేదా రసం పీల్చే పురుగుల ప్రభావం పెరిగే అవకాశం ఉంది.',
    pestAction: 'పొలంలో ఆకుల అడుగు భాగాన్ని పరిశీలించండి. లక్షణాలు కనిపిస్తే AI కెమెరాతో స్కాన్ చేయండి.',
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
  },

  en: {
    sectionTitle: 'Daily Farming Advisories',
    sectionSubtitle: 'Smart farming updates for your field',
    listen: 'Listen',
    stopAudio: 'Stop',
    prevSlide: 'Previous slide',
    nextSlide: 'Next slide',
    slideOf: 'Slide {current} of {total}',
    dataUnavailable: 'Data unavailable',
    updateFarmDetails: 'Update your farm details',

    // Slide 1: Crop
    cropTitle: 'Your Crop Advisory',
    cropSubtitle: 'Growth stage & field actions',
    cropActive: 'Active Crop',
    cropStage: 'Crop Stage',
    cropDays: 'Days from Sowing',
    cropAction: 'Morning hours are favorable for spraying. Check sticky traps for whitefly and thrips presence.',
    cropCta: 'View Crop Advice',

    // Slide 2: Weather
    weatherTitle: "Today's Weather",
    weatherSubtitle: 'Temperature, rain probability & wind',
    weatherTemp: 'Temperature',
    weatherRain: 'Rain Chance',
    weatherHumidity: 'Humidity',
    weatherWind: 'Wind Speed',
    weatherSprayFavorable: 'Favorable for Spraying',
    weatherSprayUnfavorable: 'Postpone Spraying',
    weatherCta: 'View Weather',

    // Slide 3: Irrigation
    irrigationTitle: 'Smart Irrigation',
    irrigationSubtitle: 'Moisture-guided water management',
    irrigationMoisture: 'Soil Moisture',
    irrigationRuntime: 'Drip Runtime',
    irrigationMethod: 'Irrigation Method',
    irrigationRainNotice: 'Rain forecast ahead. Defer irrigation to avoid waterlogging and nutrient loss.',
    irrigationNormalNotice: 'Maintain optimum moisture during flowering. Run drip for 2 hours during morning or evening.',
    irrigationCta: 'Manage Irrigation',

    // Slide 4: Soil
    soilTitle: 'Your Soil Health',
    soilSubtitle: 'Soil Health Card & nutrient balance',
    soilScore: 'Health Score',
    soilPh: 'pH Level',
    soilNutrients: 'N-P-K Status',
    soilAdvice: 'Zinc is low. Apply Zinc Sulphate 10 kg/acre or foliar chelated micronutrient spray.',
    soilCta: 'View Soil Health',

    // Slide 5: Pest
    pestTitle: 'Pest & Disease Watch',
    pestSubtitle: 'Weather-based risk forecast & scouting',
    pestRisk: 'Risk Level',
    pestRiskModerate: 'Moderate Risk (Possible)',
    pestRiskLow: 'Low Risk',
    pestRiskHigh: 'High Risk Alert',
    pestCondition: 'High relative humidity creates favorable conditions for fungal spots and sucking pests.',
    pestAction: 'Inspect underside of young leaves. If unusual spots appear, take a quick photo scan.',
    pestCta: 'Scan Crop',

    // Slide 6: Market
    marketTitle: "Today's Market Prices",
    marketSubtitle: 'Live e-NAM & APMC authorized rates',
    marketModalPrice: 'Modal Price',
    marketRange: 'Price Range',
    marketMandi: 'Market Mandi',
    marketTrend: 'Market Trend',
    marketCta: 'View Market Prices',

    // Slide 7: Tip
    tipTitle: 'Daily Farmer Pro-Tip',
    tipSubtitle: 'Agronomist-approved yield recommendation',
    tipTag: 'Yield Maximization',
    tipContent: 'Apply Planofix 4 ml per 15L spray pump during peak flowering to prevent drop and enhance fruit setting by 15%.',
    tipCta: 'Ask AI Assistant',
  },

  hi: {
    sectionTitle: 'किसान के लिए आज की सलाह',
    sectionSubtitle: 'आपके खेत के लिए स्मार्ट कृषि अपडेट',
    listen: 'सुनें',
    stopAudio: 'रोकें',
    prevSlide: 'पिछली सलाह',
    nextSlide: 'अगली सलाह',
    slideOf: 'सलाह {current} / {total}',
    dataUnavailable: 'डेटा उपलब्ध नहीं है',
    updateFarmDetails: 'खेत का विवरण अपडेट करें',

    cropTitle: 'आपकी फसल के लिए सलाह',
    cropSubtitle: 'वृद्धि अवस्था और आज का कार्य',
    cropActive: 'सक्रिय फसल',
    cropStage: 'फसल अवस्था',
    cropDays: 'बुवाई के दिन',
    cropAction: 'सुबह का समय छिड़काव के लिए अनुकूल है। रस चूसक कीटों के लिए चिपचिपे ट्रैप की जांच करें।',
    cropCta: 'फसल सलाह देखें',

    weatherTitle: 'आज का मौसम',
    weatherSubtitle: 'तापमान, वर्षा संभावना और हवा की गति',
    weatherTemp: 'तापमान',
    weatherRain: 'वर्षा संभावना',
    weatherHumidity: 'हवा में नमी',
    weatherWind: 'हवा की गति',
    weatherSprayFavorable: 'छिड़काव के लिए अनुकूल',
    weatherSprayUnfavorable: 'छिड़काव स्थगित करें',
    weatherCta: 'मौसम विवरण देखें',

    irrigationTitle: 'सिंचाई प्रबंधन',
    irrigationSubtitle: 'नमी आधारित स्मार्ट सिंचाई',
    irrigationMoisture: 'मिट्टी की नमी',
    irrigationRuntime: 'ड्रिप समय',
    irrigationMethod: 'सिंचाई विधि',
    irrigationRainNotice: 'बारिश का पूर्वानुमान है। जलभराव से बचने के लिए सिंचाई टालें।',
    irrigationNormalNotice: 'फूल आने की अवस्था में नमी बनाए रखें। सुबह या शाम 2 घंटे ड्रिप चलाएं।',
    irrigationCta: 'सिंचाई प्रबंधित करें',

    soilTitle: 'मृदा स्वास्थ्य',
    soilSubtitle: 'मृदा स्वास्थ्य कार्ड और पोषक तत्व',
    soilScore: 'स्वास्थ्य स्कोर',
    soilPh: 'पीएच (pH)',
    soilNutrients: 'एन-पी-के स्तर',
    soilAdvice: 'जिंक की कमी है। 10 किग्रा जिंक सल्फेट प्रति एकड़ डालें या पर्णीय छिड़काव करें।',
    soilCta: 'मृदा कार्ड देखें',

    pestTitle: 'कीट और रोग चेतावनी',
    pestSubtitle: 'मौसम आधारित जोखिम निगरानी',
    pestRisk: 'जोखिम स्तर',
    pestRiskModerate: 'मध्यम जोखिम (संभावित)',
    pestRiskLow: 'कम जोखिम',
    pestRiskHigh: 'उच्च जोखिम',
    pestCondition: 'उच्च नमी से फफूंद जनित रोगों और रस चूसक कीटों का खतरा बढ़ सकता है।',
    pestAction: 'पत्तियों के निचले हिस्से की जांच करें। लक्षण दिखने पर फोटो स्कैन करें।',
    pestCta: 'फसल स्कैन करें',

    marketTitle: 'आज का मंडी भाव',
    marketSubtitle: 'लाइव ई-नाम और अधिकृत मंडी दरें',
    marketModalPrice: 'मॉडल भाव',
    marketRange: 'मूल्य सीमा',
    marketMandi: 'मंडी का नाम',
    marketTrend: 'बाजार रुझान',
    marketCta: 'मंडी भाव देखें',

    tipTitle: 'आज की किसान सलाह',
    tipSubtitle: 'कृषि वैज्ञानिक द्वारा प्रमाणित टिप',
    tipTag: 'उपज वृद्धि सलाह',
    tipContent: 'फूल झड़ना रोकने के लिए प्लानोफिक्स 4 मिली 15 लीटर पानी में मिलाकर छिड़कें। इससे उपज में 15% सुधार होगा।',
    tipCta: 'विशेषज्ञ से पूछें',
  },

  ta: {
    sectionTitle: 'விவசாயிக்கான இன்றைய ஆலோசனைகள்',
    sectionSubtitle: 'உங்கள் வயலுக்கான ஸ்மார்ட் விவசாய தகவல்கள்',
    listen: 'கேளுங்கள்',
    stopAudio: 'நிறுத்து',
    prevSlide: 'முந்தைய ஆலோசனை',
    nextSlide: 'அடுத்த ஆலோசனை',
    slideOf: 'ஆலோசனை {current} / {total}',
    dataUnavailable: 'தகவல் இல்லை',
    updateFarmDetails: 'வயல் விவரங்களை புதுப்பிக்கவும்',

    cropTitle: 'உங்கள் பயிருக்கான ஆலோசனை',
    cropSubtitle: 'பயிர் வளர்ச்சி நிலை மற்றும் செயல்பாடு',
    cropActive: 'நடப்பு பயிர்',
    cropStage: 'பயிர் நிலை',
    cropDays: 'விதைத்த நாட்கள்',
    cropAction: 'காலை நேரம் மருந்து தெளிக்க ஏற்றது. பூச்சி தாக்குதலை கண்காணிக்க மஞ்சள் ஒட்டும் பொறிகளை சோதிக்கவும்.',
    cropCta: 'பயிர் ஆலோசனையை பார்க்க',

    weatherTitle: 'இன்றைய வானிலை',
    weatherSubtitle: 'வெப்பநிலை, மழை வாய்ப்பு மற்றும் காற்று',
    weatherTemp: 'வெப்பநிலை',
    weatherRain: 'மழை வாய்ப்பு',
    weatherHumidity: 'ஈரப்பதம்',
    weatherWind: 'காற்றின் வேகம்',
    weatherSprayFavorable: 'தெளிக்க சாதகமானது',
    weatherSprayUnfavorable: 'தெளிப்பதை தள்ளிப்போடவும்',
    weatherCta: 'வானிலை பார்க்க',

    irrigationTitle: 'நீர்ப்பாசன மேலாண்மை',
    irrigationSubtitle: 'ஈரப்பதம் சார்ந்த பாசனம்',
    irrigationMoisture: 'மண் ஈரப்பதம்',
    irrigationRuntime: 'சொட்டுநீர் நேரம்',
    irrigationMethod: 'பாசன முறை',
    irrigationRainNotice: 'மழை வாய்ப்பு உள்ளதால் பாசனத்தை தள்ளிப்போடவும்.',
    irrigationNormalNotice: 'பூக்கும் தருணத்தில் காலை அல்லது மாலையில் 2 மணி நேரம் சொட்டுநீர் பாசனம் செய்யவும்.',
    irrigationCta: 'பாசனத்தை நிர்வகிக்க',

    soilTitle: 'மண் வளம்',
    soilSubtitle: 'மண் வள அட்டை மற்றும் ஊட்டச்சத்துகள்',
    soilScore: 'வள மதிப்பெண்',
    soilPh: 'பி.எச் (pH)',
    soilNutrients: 'என்-பி-கே அளவு',
    soilAdvice: 'துத்தநாக பற்றாக்குறை உள்ளது. ஏக்கருக்கு 10 கிலோ துத்தநாக சல்பேட் இடவும்.',
    soilCta: 'மண் அட்டை பார்க்க',

    pestTitle: 'பூச்சி மற்றும் நோய் எச்சரிக்கை',
    pestSubtitle: 'வானிலை அடிப்படையிலான கண்காணிப்பு',
    pestRisk: 'அபாய நிலை',
    pestRiskModerate: 'மிதமான அபாயம் (சாத்தியம்)',
    pestRiskLow: 'குறைந்த அபாயம்',
    pestRiskHigh: 'அதிக அபாயம்',
    pestCondition: 'அதிக ஈரப்பதம் காரணமாக பூஞ்சான் மற்றும் உறிஞ்சும் பூச்சிகள் வர வாய்ப்புள்ளது.',
    pestAction: 'இலைகளின் அடிப்பகுதியை ஆராயவும். அறிகுறிகள் இருந்தால் புகைப்படம் எடுக்கவும்.',
    pestCta: 'பயிரை ஸ்கேன் செய்ய',

    marketTitle: 'இன்றைய சந்தை விலை',
    marketSubtitle: 'இ-நாம் நேரடி சந்தை விலைகள்',
    marketModalPrice: 'சராசரி விலை',
    marketRange: 'விலை வரம்பு',
    marketMandi: 'சந்தை மையம்',
    marketTrend: 'சந்தை போக்கு',
    marketCta: 'சந்தை விலையை பார்க்க',

    tipTitle: 'இன்றைய விவசாயக் குறிப்பு',
    tipSubtitle: 'விவசாய விஞ்ஞானியின் ஆலோசனை',
    tipTag: 'மகசூல் பெருக்க குறிப்பு',
    tipContent: 'பூ உதிர்வதை தடுக்க பிளனோபிக்ஸ் 4 மிலி மருந்தை 15 லிட்டர் தண்ணீரில் கலந்து தெளிக்கவும்.',
    tipCta: 'கேள்வி கேட்க',
  },

  kn: {
    sectionTitle: 'ರೈತರಿಗಾಗಿ ಇಂದಿನ ಸಲಹೆಗಳು',
    sectionSubtitle: 'ನಿಮ್ಮ ಜಮೀನಿಗಾಗಿ ಸ್ಮಾರ್ಟ್ ಕೃಷಿ ಅಪ್‌ಡೇಟ್‌ಗಳು',
    listen: 'ಕೇಳಿ',
    stopAudio: 'ನಿಲ್ಲಿಸಿ',
    prevSlide: 'ಹಿಂದಿನ ಸಲಹೆ',
    nextSlide: 'ಮುಂದಿನ ಸಲಹೆ',
    slideOf: 'ಸಲಹೆ {current} / {total}',
    dataUnavailable: 'ಮಾಹಿತಿ ಲಭ್ಯವಿಲ್ಲ',
    updateFarmDetails: 'ಜಮೀನಿನ ವಿವರ ನವೀಕರಿಸಿ',

    cropTitle: 'ನಿಮ್ಮ ಬೆಳೆಗೆ ಇಂದಿನ ಸಲಹೆ',
    cropSubtitle: 'ಬೆಳವಣಿಗೆಯ ಹಂತ ಮತ್ತು ಕೃಷಿ ಕಾರ್ಯ',
    cropActive: 'ಹಾಲಿ ಬೆಳೆ',
    cropStage: 'ಬೆಳೆಯ ಹಂತ',
    cropDays: 'ಬಿತ್ತನೆ ದಿನಗಳು',
    cropAction: 'ಬೆಳಗಿನ ಸಮಯ ಸಿಂಪರಣೆಗೆ ಅನುಕೂಲಕರವಾಗಿದೆ. ಕೀಟಗಳ ಉಪಟಳ ತಡೆಯಲು ಅಂಟು ಬಲೆಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.',
    cropCta: 'ಬೆಳೆ ಸಲಹೆ ನೋಡಿ',

    weatherTitle: 'ಇಂದಿನ ಹವಾಮಾನ',
    weatherSubtitle: 'ತಾಪಮಾನ, ಮಳೆ ಸಾಧ್ಯತೆ ಮತ್ತು ಗಾಳಿಯ ವೇಗ',
    weatherTemp: 'ತಾಪಮಾನ',
    weatherRain: 'ಮಳೆ ಸಂಭವನೀಯತೆ',
    weatherHumidity: 'ತೇವಾಂಶ',
    weatherWind: 'ಗಾಳಿಯ ವೇಗ',
    weatherSprayFavorable: 'ಸಿಂಪರಣೆಗೆ ಸೂಕ್ತ',
    weatherSprayUnfavorable: 'ಸಿಂಪರಣೆ ಮುಂದೂಡಿ',
    weatherCta: 'ಹವಾಮಾನ ನೋಡಿ',

    irrigationTitle: 'ನೀರಾವರಿ ನಿರ್ವಹಣೆ',
    irrigationSubtitle: 'ತೇವಾಂಶ ಆಧಾರಿತ ಸ್ಮಾರ್ಟ್ ನೀರಾವರಿ',
    irrigationMoisture: 'ಮಣ್ಣಿನ ತೇವಾಂಶ',
    irrigationRuntime: 'ಹನಿ ನೀರಾವರಿ ಸಮಯ',
    irrigationMethod: 'ನೀರಾವರಿ ವಿಧಾನ',
    irrigationRainNotice: 'ಮಳೆಯ ಮುನ್ಸೂಚನೆ ಇರುವುದರಿಂದ ನೀರಾವರಿಯನ್ನು ಮುಂದೂಡಿ.',
    irrigationNormalNotice: 'ಹೂಬಿಡುವ ಹಂತದಲ್ಲಿ ಬೆಳಗ್ಗೆ ಅಥವಾ ಸಂಜೆ 2 ಗಂಟೆಗಳ ಕಾಲ ಹನಿ ನೀರಾವರಿ ಒದಗಿಸಿ.',
    irrigationCta: 'ನೀರಾವರಿ ನಿರ್ವಹಿಸಿ',

    soilTitle: 'ಮಣ್ಣಿನ ಆರೋಗ್ಯ',
    soilSubtitle: 'ಮಣ್ಣು ಆರೋಗ್ಯ ಕಾರ್ಡ್ ಮತ್ತು ಪೋಷಕಾಂಶ',
    soilScore: 'ಆರೋಗ್ಯ ಸ್ಕೋರ್',
    soilPh: 'ಪಿಎಚ್ (pH)',
    soilNutrients: 'ಎನ್-ಪಿ-ಕೆ ಸ್ಥಿತಿ',
    soilAdvice: 'ಜಿಂಕ್ ಕೊರತೆಯಿದೆ. ಎಕರೆಗೆ 10 ಕೆಜಿ ಜಿಂಕ್ ಸಲ್ಫೇಟ್ ಹಾಕಿ ಅಥವಾ ಸಿಂಪರಣೆ ಮಾಡಿ.',
    soilCta: 'ಮಣ್ಣಿನ ಕಾರ್ಡ್ ನೋಡಿ',

    pestTitle: 'ಕೀಟ ಮತ್ತು ರೋಗ ಮುನ್ನೆಚ್ಚರಿಕೆ',
    pestSubtitle: 'ಹವಾಮಾನ ಆಧಾರಿತ ನಿಗಾ',
    pestRisk: 'ಅಪಾಯ ಮಟ್ಟ',
    pestRiskModerate: 'ಮಧ್ಯಮ ಅಪಾಯ (ಸಾಧ್ಯತೆ ಇದೆ)',
    pestRiskLow: 'ಕಡಿಮೆ ಅಪಾಯ',
    pestRiskHigh: 'ಹೆಚ್ಚಿನ ಅಪಾಯ',
    pestCondition: 'ಹೆಚ್ಚಿನ ತೇವಾಂಶದಿಂದ ಶಿಲೀಂಧ್ರ ರೋಗ ಅಥವಾ ರಸಹೀರುವ ಕೀಟಗಳ ಬಾಧೆ ಕಂಡುಬರಬಹುದು.',
    pestAction: 'ಎಲೆಗಳ ಕೆಳಭಾಗ ಪರಿಶೀಲಿಸಿ. ರೋಗದ ಲಕ್ಷಣವಿದ್ದರೆ ಫೋಟೋ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ.',
    pestCta: 'ಬೆಳೆ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ',

    marketTitle: 'ಇಂದಿನ ಮಾರುಕಟ್ಟೆ ಬೆಲೆ',
    marketSubtitle: 'ಲೈವ್ ಇ-ನ್ಯಾಮ್ ಮತ್ತು ಎಪಿಎಂಸಿ ದರಗಳು',
    marketModalPrice: 'ಮಾದರಿ ಬೆಲೆ',
    marketRange: 'ಬೆಲೆ ವ್ಯಾಪ್ತಿ',
    marketMandi: 'ಮಾರುಕಟ್ಟೆ ಯಾರ್ಡ್',
    marketTrend: 'ಮಾರುಕಟ್ಟೆ ಟ್ರೆಂಡ್',
    marketCta: 'ಮಾರುಕಟ್ಟೆ ಬೆಲೆ ನೋಡಿ',

    tipTitle: 'ಇಂದಿನ ಕೃಷಿ ಟಿಪ್ಸ್',
    tipSubtitle: 'ವಿಜ್ಞಾನಿಗಳ ಶಿಫಾರಸು',
    tipTag: 'ಇಳುವರಿ ಹೆಚ್ಚಳ ಟಿಪ್',
    tipContent: 'ಹೂವು ಉದುರುವುದನ್ನು ತಡೆಯಲು ಪ್ಲಾನೋಫಿಕ್ಸ್ 4 ಮಿಲಿ 15 ಲೀಟರ್ ನೀರಿಗೆ ಬೆರೆಸಿ ಸಿಂಪಡಿಸಿ.',
    tipCta: 'ಪ್ರಶ್ನೆ ಕೇಳಿ',
  },

  ml: {
    sectionTitle: 'കർഷകർക്കുള്ള ഇന്നത്തെ നിർദ്ദേശങ്ങൾ',
    sectionSubtitle: 'നിങ്ങളുടെ കൃഷിയിടത്തിനായുള്ള സ്മാർട്ട് അപ്ഡേറ്റുകൾ',
    listen: 'കേൾക്കുക',
    stopAudio: 'നിർത്തുക',
    prevSlide: 'മുമ്പത്തെ നിർദ്ദേശം',
    nextSlide: 'അടുത്ത നിർദ്ദേശം',
    slideOf: 'നിർദ്ദേശം {current} / {total}',
    dataUnavailable: 'വിവരം ലഭ്യമല്ല',
    updateFarmDetails: 'കൃഷിയിട വിവരങ്ങൾ പുതുക്കുക',

    cropTitle: 'വിള പരിപാലന നിർദ്ദേശം',
    cropSubtitle: 'വളർച്ചാ ഘട്ടവും പ്രവർത്തനങ്ങളും',
    cropActive: 'നിലവിലെ വിള',
    cropStage: 'വിള ഘട്ടം',
    cropDays: 'വിളവിറക്കിയ ദിവസങ്ങൾ',
    cropAction: 'രാവിലെയുള്ള സമയം മരുന്ന് തളിക്കാൻ അനുയോജ്യമാണ്. കീടങ്ങളെ നിരീക്ഷിക്കാൻ കെണികൾ സ്ഥാപിക്കുക.',
    cropCta: 'വിള നിർദ്ദേശങ്ങൾ കാണുക',

    weatherTitle: 'ഇന്നത്തെ കാലാവസ്ഥ',
    weatherSubtitle: 'താപനില, മഴ സാധ്യത, കാറ്റിന്റെ വേഗത',
    weatherTemp: 'താപനില',
    weatherRain: 'മഴ സാധ്യത',
    weatherHumidity: 'ഈർപ്പം',
    weatherWind: 'കാറ്റിന്റെ വേഗത',
    weatherSprayFavorable: 'തളിക്കാൻ അനുയോജ്യം',
    weatherSprayUnfavorable: 'തളിക്കുന്നത് മാറ്റിവെക്കുക',
    weatherCta: 'കാലാവസ്ഥ കാണുക',

    irrigationTitle: 'നനയ്ക്കൽ ക്രമം',
    irrigationSubtitle: 'ഈർപ്പത്തെ അടിസ്ഥാനമാക്കിയുള്ള നന',
    irrigationMoisture: 'മണ്ണിലെ ഈർപ്പം',
    irrigationRuntime: 'ഡ്രിപ്പ് സമയം',
    irrigationMethod: 'നന രീതി',
    irrigationRainNotice: 'മഴ സാധ്യതയുള്ളതിനാൽ നനയ്ക്കുന്നത് മാറ്റിവെക്കുക.',
    irrigationNormalNotice: 'പൂവിടുന്ന ഘട്ടത്തിൽ രാവിലെ അല്ലെങ്കിൽ വൈകുന്നേരം 2 മണിക്കൂർ തുള്ളിനന നൽകുക.',
    irrigationCta: 'നന ക്രമീകരിക്കുക',

    soilTitle: 'മണ്ണിന്റെ ആരോഗ്യം',
    soilSubtitle: 'സോയിൽ ഹെൽത്ത് കാർഡും പോഷകങ്ങളും',
    soilScore: 'ആരോഗ്യ സ്കോർ',
    soilPh: 'പി.എച്ച് (pH)',
    soilNutrients: 'എൻ-പി-കെ നില',
    soilAdvice: 'സിങ്കിന്റെ കുറവുണ്ട്. ഏക്കറിന് 10 കിലോഗ്രാം സിങ്ക് സൾഫേറ്റ് പ്രയോഗിക്കുക.',
    soilCta: 'സോയിൽ കാർഡ് കാണുക',

    pestTitle: 'കീട-രോഗ മുന്നറിയിപ്പ്',
    pestSubtitle: 'കാലാവസ്ഥാധിഷ്ഠിത നിരീക്ഷണം',
    pestRisk: 'സാധ്യത നില',
    pestRiskModerate: 'ഇടത്തരം സാധ്യത',
    pestRiskLow: 'കുറഞ്ഞ സാധ്യത',
    pestRiskHigh: 'ഉയർന്ന സാധ്യത',
    pestCondition: 'കൂടിയ ഈർപ്പം പൂപ്പൽ ബാധയ്ക്കും നീരൂറ്റിക്കുടിക്കുന്ന കീടങ്ങൾക്കും കാരണമായേക്കാം.',
    pestAction: 'ഇലകളുടെ അടിഭാഗം പരിശോധിക്കുക. ലക്ഷണങ്ങളുണ്ടെങ്കിൽ ഫോട്ടോ സ്കാൻ ചെയ്യുക.',
    pestCta: 'വിള സ്കാൻ ചെയ്യുക',

    marketTitle: 'ഇന്നത്തെ വിപണി നിരക്കുകൾ',
    marketSubtitle: 'തത്സമയ ഇ-നാം വിപണി നിരക്കുകൾ',
    marketModalPrice: 'ശരാശരി വില',
    marketRange: 'വില പരിധി',
    marketMandi: 'വിപണി കേന്ദ്രം',
    marketTrend: 'വിപണി പ്രവണത',
    marketCta: 'വിപണി നിരക്കുകൾ കാണുക',

    tipTitle: 'ഇന്നത്തെ കർഷക ടിപ്പ്',
    tipSubtitle: 'വിദഗ്ധരുടെ കൃഷി നിർദ്ദേശം',
    tipTag: 'ഉൽപ്പാദന വർദ്ധനവ്',
    tipContent: 'പൂവ് കൊഴിച്ചിൽ തടയാൻ പ്ലാനോഫിക്സ് 4 മില്ലി 15 ലിറ്റർ വെള്ളത്തിൽ കലക്കി തളിക്കുക.',
    tipCta: 'വിദഗ്ദ്ധനോട് ചോദിക്കുക',
  },

  mr: {
    sectionTitle: 'शेतकऱ्यांसाठी आजचा सल्ला',
    sectionSubtitle: 'तुमच्या शेतासाठी स्मार्ट शेती अपडेट्स',
    listen: 'ऐका',
    stopAudio: 'थांबवा',
    prevSlide: 'मागील सल्ला',
    nextSlide: 'पुढील सल्ला',
    slideOf: 'सल्ला {current} / {total}',
    dataUnavailable: 'माहिती उपलब्ध नाही',
    updateFarmDetails: 'शेताची माहिती अपडेट करा',

    cropTitle: 'पिकासाठी आजचा सल्ला',
    cropSubtitle: 'पिकाची वाढ आणि शेती कामे',
    cropActive: 'सक्रिय पीक',
    cropStage: 'पीक अवस्था',
    cropDays: 'पेरणीनंतरचे दिवस',
    cropAction: 'सकाळची वेळ फवारणीसाठी योग्य आहे. रस शोषणाऱ्या किडींसाठी चिकट सापळे तपासा.',
    cropCta: 'पीक सल्ला पहा',

    weatherTitle: 'आजचे हवामान',
    weatherSubtitle: 'तापमान, पाऊस आणि वाऱ्याचा वेग',
    weatherTemp: 'तापमान',
    weatherRain: 'पावसाची शक्यता',
    weatherHumidity: 'हवेतील आर्द्रता',
    weatherWind: 'वाऱ्याचा वेग',
    weatherSprayFavorable: 'फवारणीसाठी अनुकूल',
    weatherSprayUnfavorable: 'फवारणी पुढे ढकला',
    weatherCta: 'हवामान पहा',

    irrigationTitle: 'पाणी व्यवस्थापन',
    irrigationSubtitle: 'ओलाव्यावर आधारित स्मार्ट सिंचन',
    irrigationMoisture: 'जमिनीतील ओलावा',
    irrigationRuntime: 'ठिबक वेळ',
    irrigationMethod: 'सिंचन पद्धत',
    irrigationRainNotice: 'पावसाचा अंदाज असल्याने पाणी देणे पुढे ढकला.',
    irrigationNormalNotice: 'फुलधारणेच्या वेळी ओलावा टिकवण्यासाठी सकाळी किंवा संध्याकाळी २ तास ठिबक चालवा.',
    irrigationCta: 'सिंचन व्यवस्थापित करा',

    soilTitle: 'मातीचे आरोग्य',
    soilSubtitle: 'सॉइल हेल्थ कार्ड आणि पोषण घटक',
    soilScore: 'आरोग्य स्कोअर',
    soilPh: 'सामू (pH)',
    soilNutrients: 'एन-पी-के पातळी',
    soilAdvice: 'झिंकची कमतरता आहे. एकरी १० किलो झिंक सल्फेट द्या किंवा फवारणी करा.',
    soilCta: 'माती कार्ड पहा',

    pestTitle: 'कीड आणि रोग सतर्कता',
    pestSubtitle: 'हवामानावर आधारित देखरेख',
    pestRisk: 'धोका पातळी',
    pestRiskModerate: 'मध्यम धोका (संभाव्य)',
    pestRiskLow: 'कमी धोका',
    pestRiskHigh: 'उच्च धोका',
    pestCondition: 'हवेतील जास्त आर्द्रतेमुळे बुरशीजन्य रोग किंवा रस शोषणाऱ्या किडींचा प्रादुर्भाव होऊ शकतो.',
    pestAction: 'पानांची खालची बाजू तपासा. लक्षणे आढळल्यास फोटो स्कॅन करा.',
    pestCta: 'पीक स्कॅन करा',

    marketTitle: 'आजचे बाजारभाव',
    marketSubtitle: 'थेट ई-नाम आणि बाजार समिती दर',
    marketModalPrice: 'सरासरी भाव',
    marketRange: 'भाव श्रेणी',
    marketMandi: 'बाजार समिती',
    marketTrend: 'बाजार कल',
    marketCta: 'बाजारभाव पहा',

    tipTitle: 'आजचा शेती सल्ला',
    tipSubtitle: 'कृषी शास्त्रज्ञांचा महत्त्वाचा सल्ला',
    tipTag: 'उत्पादन वाढीचा सल्ला',
    tipContent: 'फुलगळ थांबवण्यासाठी प्लॅनोफिक्स ४ मिली १५ लिटर पाण्यात मिसळून फवारा. यामुळे उत्पादनात १५% वाढ होते.',
    tipCta: 'तज्ञांना विचारा',
  },
};
