import { CropEntity, CropCategory, Language, Season, SoilType, CropStageItem } from '@/types';
import { additionalCropsList } from '@/data/additionalCrops';
import { moreFruitsAndSpicesList } from '@/data/moreFruitsSpices';

// =================================================================
// RYTHUMITRA AI — COMPREHENSIVE SCALABLE CROP & FRUIT DATABASE
// Over 45 real agricultural crops across 7 categories & 7 languages
// =================================================================

export const initialCropDatabase: CropEntity[] = [
  // -------------------------------------------------------------
  // 1. CEREALS & MILLETS
  // -------------------------------------------------------------
  {
    id: 'paddy',
    category: 'CEREAL',
    scientificName: 'Oryza sativa',
    iconEmoji: '🌾',
    durationDays: 145,
    waterRequirementMm: 1200,
    expectedYieldPerAcre: '28 - 35 Bags (75kg)',
    riskLevel: 'LOW',
    suitableSeasons: ['KHARIF', 'RABI'],
    suitableSoils: ['ALLUVIAL', 'BLACK_COTTON', 'CLAYEY'],
    aliases: ['paddy', 'rice', 'vari', 'bpt 5204', 'samba masuri', 'వరి', 'ధానం', 'धान', 'chawal', 'அரிசி', 'நெல்', 'ಭತ್ತ', 'ಅಕ್ಕಿ', 'നെല്ല്', 'അരി', 'भात', 'तांदूळ'],
    stages: [
      { stageName: 'Nursery & Sowing', stageNameTe: 'నర్సరీ & నాట్లు', daysRange: '1 - 25 Days', description: 'Seed bed preparation and 21-day seedling transplantation.', waterNeed: 'High', keyAction: 'Maintain 2cm standing water.' },
      { stageName: 'Tillering', stageNameTe: 'పిలకల దశ', daysRange: '26 - 55 Days', description: 'Active vegetative branching and tiller formation.', waterNeed: 'High', keyAction: 'Apply first top dressing of Urea + Zinc.' },
      { stageName: 'Panicle Initiation', stageNameTe: 'చిరుపొట్ట దశ', daysRange: '56 - 85 Days', description: 'Flower bud and panicle development inside stem.', waterNeed: 'Critical', keyAction: 'Monitor stem borer and leaf folder; apply Potash.' },
      { stageName: 'Flowering & Grain Filling', stageNameTe: 'పూత & గింజ పాలుపోసుకునే దశ', daysRange: '86 - 120 Days', description: 'Pollination and milky grain maturity.', waterNeed: 'Critical', keyAction: 'Spray Neem oil or Tricyclazole if blast appears.' },
      { stageName: 'Harvesting', stageNameTe: 'కోత దశ', daysRange: '121 - 145 Days', description: 'Golden grain maturity; drain water 10 days before harvest.', waterNeed: 'Low', keyAction: 'Harvest when 85% panicles turn golden yellow.' },
    ],
    translations: {
      en: {
        name: 'Paddy / Rice (వరి / धान)',
        localNames: ['Paddy', 'Rice', 'Dhan', 'Nellu', 'Bhatta'],
        whatIsThis: 'Paddy is India’s foremost staple grain crop, providing sustenance to millions and reliable MSP procurement.',
        growingSeason: 'Kharif (June–Nov) and Rabi (Nov–April). Ideal with canal or assured borewell irrigation.',
        soilRequirements: 'Heavy clayey, alluvial, or clay-loam soils with strong water retention capability.',
        waterRequirements: 'High (1100–1300 mm). Requires saturated soil or 2–5 cm shallow standing water during tillering and panicle emergence.',
        mainStages: ['Nursery (0–25 days)', 'Tillering (25–55 days)', 'Panicle Initiation (55–85 days)', 'Flowering & Grain filling (85–120 days)', 'Harvest (120–145 days)'],
        whatToMonitor: ['Yellow stem borer dead hearts', 'Leaf blast diamond spots', 'BPH brown planthopper hopper burn at stem base', 'Standing water levels'],
        commonPestsAndDiseases: ['Yellow Stem Borer', 'Brown Plant Hopper (BPH)', 'Blast Disease (Magnaporthe oryzae)', 'Bacterial Leaf Blight (BLB)'],
        generalCare: 'Maintain alternate wetting and drying (AWD) to prevent root rot and save 30% water. Balance nitrogen with potash.',
        whenToContactExpert: 'If leaves show water-soaked translucent yellow stripes (BLB) or hoppers exceed 10 per hill, consult an agronomist immediately.',
      },
      te: {
        name: 'వరి (సాంబ మసూరి - BPT 5204)',
        localNames: ['వరి', 'బియ్యం', 'వడ్లు', 'సాంబ మసూరి', 'ధాన్యం'],
        whatIsThis: 'వరి మన ప్రధాన ఆహార పంట. ప్రభుత్వం నుంచి కనీస మద్దతు ధర (MSP) హామీ ఉండే నమ్మకమైన పంట.',
        growingSeason: 'ఖరీఫ్ (జూన్-నవంబర్) మరియు రబీ (నవంబర్-ఏప్రిల్). పుష్కలమైన నీటి వనరులు ఉన్న ప్రాంతాలకు అనుకూలం.',
        soilRequirements: 'ఒండ్రు నేలలు, నల్లరేగడి మరియు బంకమట్టి నేలలు. నీటిని ఎక్కువ కాలం నిలిపి ఉంచే నేలలు శ్రేష్టం.',
        waterRequirements: 'ఎక్కువ (1100-1300 మి.మీ). పిలక దశ మరియు చిరుపొట్ట దశల్లో పొలంలో 2-3 సెం.మీ నీరు తప్పనిసరి.',
        mainStages: ['నర్సరీ (1-25 రోజులు)', 'పిలకల దశ (26-55 రోజులు)', 'చిరుపొట్ట దశ (56-85 రోజులు)', 'పూత & పాలుపోసుకునే దశ (86-120 రోజులు)', 'కోత దశ (121-145 రోజులు)'],
        whatToMonitor: ['మొవ్వు పురుగు (ఎండిన మొవ్వులు)', 'సుడిదోమ ఉధృతి (దుబ్బు మొదళ్లలో)', 'అగ్గితెగులు మచ్చలు', 'నీటి నిల్వ స్థాయి'],
        commonPestsAndDiseases: ['కాండం తొలిచే పురుగు (మొవ్వు పురుగు)', 'సుడిదోమ (BPH)', 'అగ్గితెగులు (బ్లాస్ట్)', 'ఎండాకు తెగులు (BLB)'],
        generalCare: 'ఎల్లప్పుడూ నీరు నిల్వ ఉంచకుండా ఆరి కట్టే పద్ధతి (AWD) పాటించండి. నత్రజనితో పాటు పొటాష్ ఎరువులను తప్పనిసరిగా వేయండి.',
        whenToContactExpert: 'దుబ్బు మొదట్లో సుడిదోమలు ఎక్కువగా ఉండి పైరు వలయాకారంలో ఎండిపోతుంటే వెంటనే వ్యవసాయ అధికారిని సంప్రదించండి.',
      },
      hi: {
        name: 'धान / चावल (Paddy / Rice)',
        localNames: ['धान', 'चावल', 'बासमती', 'पैडी'],
        whatIsThis: 'धान भारत की प्रमुख खाद्यान्न फसल है, जो करोड़ों किसानों को आजीविका और सुरक्षित एमएसपी प्रदान करती है।',
        growingSeason: 'खरीफ और रबी सीजन। पर्याप्त नहरी या नलकूप सिंचाई वाले क्षेत्रों के लिए सबसे उपयुक्त।',
        soilRequirements: 'चिकनी, जलोढ़ और मटियार दोमट मिट्टी जिसमें जल धारण क्षमता अधिक हो।',
        waterRequirements: 'उच्च (1100–1300 मिमी)। कल्ले फूटने और बाली निकलने के समय 2–3 सेमी पानी आवश्यक है।',
        mainStages: ['नर्सरी (1-25 दिन)', 'कल्ले फूटना (26-55 दिन)', 'गाभा अवस्था (56-85 दिन)', 'फूल व दाना भराव (86-120 दिन)', 'कटाई (121-145 दिन)'],
        whatToMonitor: ['तना छेदक कीट', 'भूरा फुदका (BPH)', 'झुलसा रोग', 'खेत में पानी का स्तर'],
        commonPestsAndDiseases: ['तना छेदक (Stem Borer)', 'भूरा माहू (BPH)', 'ब्लास्ट रोग', 'जीवाणु पत्ती झुलसा'],
        generalCare: 'खेत में हमेशा पानी भरने के बजाय बारी-बारी से सुखाकर सिंचाई करें। यूरिया के साथ पोटाश जरूर डालें।',
        whenToContactExpert: 'यदि पौधों के आधार पर भूरे फुदके का गंभीर प्रकोप दिखे, तो तुरंत कृषि वैज्ञानिक से संपर्क करें।',
      },
      ta: {
        name: 'நெல் / அரிசி (Paddy / Rice)',
        localNames: ['நெல்', 'அரிசி', 'சாம்பா', 'குருவை'],
        whatIsThis: 'நெல் இந்தியாவின் முதன்மையான உணவுப் பயிராகும், விவசாயிகளுக்கு உத்தரவாதமான வருவாய் அளிக்கிறது.',
        growingSeason: 'குறுவை மற்றும் சம்பா பருவம். நீர்ப்பாசன வசதி கொண்ட நிலங்களுக்கு மிகவும் உகந்தது.',
        soilRequirements: 'களிமண், வண்டல் மண் மற்றும் தண்ணீர் தேங்கும் திறன் கொண்ட நிலங்கள்.',
        waterRequirements: 'அதிகம் (1100–1300 மி.மீ). தூர் கட்டும் பருவத்திலும் கதிர் வரும் பருவத்திலும் நீர் தேவை அதிகம்.',
        mainStages: ['நாற்றங்கால்', 'தூர் கட்டுதல்', 'கதிர் உருவாவதல்', 'பால் பிடிக்கும் பருவம்', 'அறுவடை'],
        whatToMonitor: ['தண்டு துளைப்பான்', 'புகையான் பூச்சி', 'இலை கருகல் நோய்'],
        commonPestsAndDiseases: ['தண்டு துளைப்பான்', 'புகையான் (BPH)', 'குலை நோய்'],
        generalCare: 'காய்ச்சலும் பாய்ச்சலுமாக நீர் பாய்ச்சவும். தழைச்சத்து மற்றும் சாம்பல் சத்து சமமாக இடவும்.',
        whenToContactExpert: 'புகையான் தாக்குதல் அதிகமாகி பயிர் வட்ட வடிவில் கருகினால் உடனடியாக வேளாண் அலுவலரை அணுகவும்.',
      },
      kn: {
        name: 'ಭತ್ತ / ಅಕ್ಕಿ (Paddy / Rice)',
        localNames: ['ಭತ್ತ', 'ಅಕ್ಕಿ', 'ನೆಲ್ಲು'],
        whatIsThis: 'ಭತ್ತವು ಪ್ರಮುಖ ಆಹಾರ ಧಾನ್ಯ ಬೆಳೆಯಾಗಿದ್ದು, ಬೆಂಬಲ ಬೆಲೆ ಆಧಾರಿತ ಖಚಿತ ಆದಾಯ ನೀಡುತ್ತದೆ.',
        growingSeason: 'ಖಾರೀಫ್ ಮತ್ತು ರಬಿ ಹಂಗಾಮು. ನೀರಾವರಿ ಸೌಲಭ್ಯವಿರುವ ಜಮೀನುಗಳಿಗೆ ಸೂಕ್ತ.',
        soilRequirements: 'ಜೇಡಿ ಮಣ್ಣು, ಗೋಡು ಮಣ್ಣು ಮತ್ತು ನೀರು ಹಿಡಿದಿಟ್ಟುಕೊಳ್ಳುವ ಕಪ್ಪು ಮಣ್ಣು.',
        waterRequirements: 'ಹೆಚ್ಚು (1100–1300 ಮಿ.ಮೀ). ತೆನೆ ಬರುವ ಹಂತದಲ್ಲಿ ಸಾಕಷ್ಟು ತೇವಾಂಶ ಅತ್ಯಗತ್ಯ.',
        mainStages: ['ಸಸಿ ಮಡಿ', 'ಕವಲೊಡೆಯುವ ಹಂತ', 'ತೆನೆ ಮೂಡುವ ಹಂತ', 'ಕಾಳು ತುಂಬುವ ಹಂತ', 'ಕೊಯ್ಲು'],
        whatToMonitor: ['ಕಾಂಡ ಕೊರೆಯುವ ಹುಳು', 'ಕಂದು ಜಿಗಿಹುಳು', 'ಬೆಂಕಿ ರೋಗ'],
        commonPestsAndDiseases: ['ಕಾಂಡ ಕೊರೆಯಕ', 'ಜಿಗಿಹುಳು', 'ಬೆಂಕಿ ರೋಗ (Blast)'],
        generalCare: 'ಸಮತೋಲಿತ ರಸಗೊಬ್ಬರ ಮತ್ತು ಪರ್ಯಾಯ ತೇವ-ಒಣ ಪದ್ಧತಿಯಲ್ಲಿ ನೀರು ನಿರ್ವಹಿಸಿ.',
        whenToContactExpert: 'ಕಂದು ಜಿಗಿಹುಳು ಬಾಧೆ ತೀವ್ರವಾದಾಗ ಹತ್ತಿರದ ಕೃಷಿ ಅಧಿಕಾರಿಯನ್ನು ಸಂಪರ್ಕಿಸಿ.',
      },
      ml: {
        name: 'നെല്ല് / അരി (Paddy / Rice)',
        localNames: ['നെല്ല്', 'അരി'],
        whatIsThis: 'നെല്ല് നമ്മുടെ മുഖ്യ ആഹാരവിളയാണ്. കർഷകർക്ക് മികച്ച താങ്ങുവില ഉറപ്പുനൽകുന്നു.',
        growingSeason: 'വിരിപ്പ്, മുണ്ടകൻ, പുഞ്ച സീസണുകൾ.',
        soilRequirements: 'വെള്ളം കെട്ടിനിൽക്കാൻ ശേഷിയുള്ള എക്കൽ മണ്ണും കളിമണ്ണും.',
        waterRequirements: 'ഉയർന്ന ജല ലഭ്യത (1100-1300 மி.மீ) ആവശ്യമാണ്.',
        mainStages: ['ഞാറ്റടി', 'കൂമ്പ് പൊട്ടൽ', 'കതിര് വരവ്', 'മണികൾ മൂക്കൽ', 'വിളവെടുപ്പ്'],
        whatToMonitor: ['തണ്ടുതുരപ്പൻ പുഴു', 'ഓലചുരുട്ടി', 'പോളരോഗം'],
        commonPestsAndDiseases: ['തണ്ടുതുരപ്പൻ', 'കുഴൽപ്പുഴു', 'ബ്ലാസ്റ്റ് രോഗം'],
        generalCare: 'കീടരോഗ നിരീക്ഷണവും ചിട്ടയായ വളപ്രയോഗവും നടത്തുക.',
        whenToContactExpert: 'പോളരോഗം പടരുകയാണെങ്കിൽ ഉടൻ കൃഷിഭവനുമായി ബന്ധപ്പെടുക.',
      },
      mr: {
        name: 'भात / तांदूळ (Paddy / Rice)',
        localNames: ['भात', 'तांदूळ', 'धान'],
        whatIsThis: 'भात हे देशातील सर्वात महत्त्वाचे अन्नधान्य पीक असून हमीभावासह उत्तम उत्पादन देते.',
        growingSeason: 'खरीप व रब्बी हंगाम. मुबलक पाणी उपलब्ध असलेल्या क्षेत्रासाठी योग्य.',
        soilRequirements: 'काळी कसदार, गाळाची व पाणी धरून ठेवणारी चिकणमाती.',
        waterRequirements: 'जास्त (1100-1300 मिमी). फुटवे फुटताना व लोंब्या भरताना पाणी गरजेचे.',
        mainStages: ['रोपवाटिका', 'फुटवे फुटणे', 'पोटरी अवस्था', 'दाणे भरणे', 'कापणी'],
        whatToMonitor: ['खोडातील कीड', 'मावा/तुडतुडे', 'करपा रोग'],
        commonPestsAndDiseases: ['खोडकिडा', 'तुडतुडे', 'करपा (Blast)'],
        generalCare: 'युरिया व पोटॅशचे योग्य संतुलन ठेवा आणि गरजेनुसार तुषार सिंचन करा.',
        whenToContactExpert: 'तुडतुड्यांचा प्रादुर्भाव वाढल्यास त्वरित कृषी सहाय्यकांशी संपर्क साधा.',
      },
    },
  },
  {
    id: 'wheat',
    category: 'CEREAL',
    scientificName: 'Triticum aestivum',
    iconEmoji: '🌾',
    durationDays: 120,
    waterRequirementMm: 450,
    expectedYieldPerAcre: '18 - 24 Quintals',
    riskLevel: 'LOW',
    suitableSeasons: ['RABI'],
    suitableSoils: ['ALLUVIAL', 'BLACK_COTTON', 'RED_LOAMY'],
    aliases: ['wheat', 'gehu', 'godhuma', 'godhi', 'kothumai', 'gahu', 'గోధుమ', 'गेहूँ', 'गहू', 'கோதுமை', 'ಗೋಧಿ', 'ഗോതമ്പ്'],
    stages: [
      { stageName: 'CRI (Crown Root Initiation)', stageNameTe: 'కిరీట వేర్ల దశ', daysRange: '20 - 25 Days', description: 'Most critical irrigation stage for root anchoring.', waterNeed: 'Critical', keyAction: 'Irrigate immediately at CRI.' },
      { stageName: 'Tillering', stageNameTe: 'పిలకల దశ', daysRange: '40 - 45 Days', description: 'Secondary tillers and stem elongation.', waterNeed: 'Moderate', keyAction: 'Apply Nitrogen top dressing.' },
      { stageName: 'Jointing & Flowering', stageNameTe: 'పూత దశ', daysRange: '60 - 85 Days', description: 'Flag leaf emergence and pollination.', waterNeed: 'Critical', keyAction: 'Protect from yellow rust and aphid clusters.' },
      { stageName: 'Milking & Dough', stageNameTe: 'గింజ పాలుపోసుకునే దశ', daysRange: '90 - 110 Days', description: 'Starch deposition inside grains.', waterNeed: 'Moderate', keyAction: 'Avoid terminal heat stress.' },
      { stageName: 'Maturity & Harvest', stageNameTe: 'కోత దశ', daysRange: '111 - 120 Days', description: 'Grains turn golden brown and hard.', waterNeed: 'Low', keyAction: 'Harvest at 12-14% grain moisture.' },
    ],
    translations: {
      en: {
        name: 'Wheat (గోధుమ / गेहूँ)',
        localNames: ['Wheat', 'Gehu', 'Godhuma', 'Godhi', 'Gahu'],
        whatIsThis: 'Wheat is India’s major winter cereal, vital for nutrition, flour, and steady grain income.',
        growingSeason: 'Rabi (Oct–Nov sowing). Requires cool temperatures during growth and warm dry weather for ripening.',
        soilRequirements: 'Well-drained fertile loamy, alluvial, or clay-loam soils.',
        waterRequirements: 'Moderate (400–500 mm). CRI stage (21 days) irrigation is absolute must.',
        mainStages: ['Crown Root (20–25 d)', 'Tillering (40–45 d)', 'Jointing & Flowering (60–85 d)', 'Grain Filling (90–110 d)', 'Harvest (120 d)'],
        whatToMonitor: ['Yellow rust stripes', 'Aphids on ear heads', 'Moisture stress at CRI stage'],
        commonPestsAndDiseases: ['Yellow Rust', 'Brown Rust', 'Wheat Aphids', 'Loose Smut'],
        generalCare: 'Never miss the first irrigation at 21 days (CRI stage). Use certified treated seeds.',
        whenToContactExpert: 'If leaves show yellow powder pustules in linear rows, alert the local extension officer for rust management.',
      },
      te: {
        name: 'గోధుమ (Wheat)',
        localNames: ['గోధుమ', 'గోధుమలు'],
        whatIsThis: 'శీతాకాలపు ప్రధాన ఆహార ధాన్య పంట. చల్లని వాతావరణం, తక్కువ ఖర్చుతో మంచి దిగుబడి ఇస్తుంది.',
        growingSeason: 'రబీ కాలం (అక్టోబర్ - నవంబర్ విత్తనం).',
        soilRequirements: 'ఒండ్రు నేలలు, నల్లరేగడి నేలలు మరియు నీరు ఇంకే సారవంతమైన నేలలు.',
        waterRequirements: 'మధ్యస్థం (400-500 మి.మీ). విత్తిన 21వ రోజు కిరీట వేర్ల దశలో తడి తప్పనిసరి.',
        mainStages: ['కిరీట వేర్ల దశ (20-25 రోజులు)', 'పిలకల దశ (40-45 రోజులు)', 'పూత దశ (60-85 రోజులు)', 'గింజ పాలుపోసుకునే దశ (90-110 రోజులు)', 'కోత దశ (120 రోజులు)'],
        whatToMonitor: ['కుంకుమ తెగులు (పసుపు రంగు మచ్చలు)', 'పేనుబంక', 'వేరుకుళ్ళు'],
        commonPestsAndDiseases: ['కుంకుమ తెగులు (Rust)', 'పేనుబంక (Aphids)', 'మసి తెగులు'],
        generalCare: 'విత్తిన 21వ రోజు మొదటి తడి ఇవ్వడం ఎట్టి పరిస్థితుల్లోనూ మరువరాదు.',
        whenToContactExpert: 'ఆకులపై పసుపు రంగు చారల వంటి కుంకుమ తెగులు లక్షణాలు కనిపిస్తే శాస్త్రవేత్తలను సంప్రదించండి.',
      },
      hi: {
        name: 'गेहूँ (Wheat)',
        localNames: ['गेहूँ', 'कनक'],
        whatIsThis: 'रबी सीजन की प्रमुख खाद्यान्न फसल जो ठंड में बोई जाती है और अच्छा मुनाफा देती है।',
        growingSeason: 'रबी (नवंबर बुवाई)। ठंडा मौसम वृद्धि के लिए और गर्म मौसम पकने के लिए उत्तम।',
        soilRequirements: 'उचित जल निकासी वाली उपजाऊ दोमट या मटियार मिट्टी।',
        waterRequirements: 'मध्यम (400-450 मिमी)। पहली सिंचाई (CRI) 21 दिन पर बेहद जरूरी।',
        mainStages: ['ताज जड़ अवस्था (21 दिन)', 'कल्ले फूटना (40-45 दिन)', 'फूल आना (60-80 दिन)', 'दाना भराव (90-110 दिन)', 'कटाई (120 दिन)'],
        whatToMonitor: ['पीला रतुआ (Yellow Rust)', 'माहू कीट', 'सिंचाई का समय'],
        commonPestsAndDiseases: ['पीला रतुआ', 'भूरा रतुआ', 'माहू', 'करनाल बंट'],
        generalCare: 'सी.आर.आई. अवस्था पर सिंचाई कभी न छोड़ें। संतुलित एन.पी.के. का प्रयोग करें।',
        whenToContactExpert: 'पत्तियों पर पीले रंग की धारियाँ दिखें तो तुरंत कृषि विभाग से सलाह लें।',
      },
      ta: {
        name: 'கோதுமை (Wheat)',
        localNames: ['கோதுமை'],
        whatIsThis: 'குளிர்கால முக்கிய தானியப் பயிர்.',
        growingSeason: 'ரபி பருவம்.',
        soilRequirements: 'நல்ல வடிகால் வசதியுள்ள வண்டல் மண்.',
        waterRequirements: 'மிதமான நீர் தேவை (450 மி.மீ).',
        mainStages: ['வேர்விடும் பருவம்', 'தூர் கட்டுதல்', 'பூக்கும் பருவம்', 'முதிர்ச்சி'],
        whatToMonitor: ['துரு நோய்', 'அசுவினி'],
        commonPestsAndDiseases: ['துரு நோய்', 'அசுவினி'],
        generalCare: '21 ஆம் நாள் முதல் பாசனம் மிக முக்கியம்.',
        whenToContactExpert: 'இலைகளில் மஞ்சள் புள்ளிகள் தோன்றினால் அலுவலரை அணுகவும்.',
      },
      kn: {
        name: 'ಗೋಧಿ (Wheat)',
        localNames: ['ಗೋಧಿ'],
        whatIsThis: 'ರಬಿ ಹಂಗಾಮಿನ ಪ್ರಮುಖ ಆಹಾರ ಧಾನ್ಯ ಬೆಳೆ.',
        growingSeason: 'ರಬಿ (ಅಕ್ಟೋಬರ್-ನವೆಂಬರ್).',
        soilRequirements: 'ಫಲವತ್ತಾದ ಗೋಡು ಮತ್ತು ಕಪ್ಪು ಮಣ್ಣು.',
        waterRequirements: 'ಮಧ್ಯಮ (450 ಮಿ.ಮೀ). ಬಿತ್ತಿದ 21 ನೇ ದಿನಕ್ಕೆ ಮೊದಲ ನೀರು ಕೊಡುವುದು ಅತ್ಯಗತ್ಯ.',
        mainStages: ['ಬೇರು ಬಿಡುವ ಹಂತ', 'ಕವಲೊಡೆಯುವುದು', 'ಹೂ ಬಿಡುವ ಹಂತ', 'ಕಾಳು ತುಂಬುವುದು', 'ಕೊಯ್ಲು'],
        whatToMonitor: ['ತುಕ್ಕು ರೋಗ', 'ಹೇನು ಕೀಟ'],
        commonPestsAndDiseases: ['ತುಕ್ಕು ರೋಗ (Rust)', 'ಹೇನು'],
        generalCare: '21 ನೇ ದಿನದ ಸಿ.ಆರ್.ಐ ನೀರಾವರಿಯನ್ನು ತಪ್ಪಿಸಬೇಡಿ.',
        whenToContactExpert: 'ಎಲೆಗಳಲ್ಲಿ ಹಳದಿ ರೇಖೆಗಳು ಕಂಡರೆ ತಜ್ಞರನ್ನು ಸಂಪರ್ಕಿಸಿ.',
      },
      ml: {
        name: 'ഗോതമ്പ് (Wheat)',
        localNames: ['ഗോതമ്പ്'],
        whatIsThis: 'പ്രധാന ശീതകാല ധാന്യവിള.',
        growingSeason: 'റബി സീസൺ.',
        soilRequirements: 'നീർവാർച്ചയുള്ള ഫലഭൂയിഷ്ഠമായ മണ്ണ്.',
        waterRequirements: 'മിതമായ വെള്ളം (450 மி.மீ).',
        mainStages: ['വേരുപിടിക്കൽ', 'വളർച്ച', 'പൂവിടൽ', 'വിളവെടുപ്പ്'],
        whatToMonitor: ['തുരുമ്പ് രോഗം', 'കീടങ്ങൾ'],
        commonPestsAndDiseases: ['റസ്റ്റ് രോഗം'],
        generalCare: 'ശരിയായ ജലസേಚനം ഉറപ്പാക്കുക.',
        whenToContactExpert: 'രോഗലക്ഷണങ്ങൾ കണ്ടാൽ കൃഷി വിദഗ്ദ്ധനെ സമീപിക്കുക.',
      },
      mr: {
        name: 'गहू (Wheat)',
        localNames: ['गहू'],
        whatIsThis: 'रब्बी हंगामातील अत्यंत महत्त्वाचे नगदी व अन्नधान्य पीक.',
        growingSeason: 'रब्बी (नोव्हेंबरमध्ये पेरणी).',
        soilRequirements: 'उत्तम निचरा होणारी मध्यम ते भारी काळी जमीन.',
        waterRequirements: 'मध्यम (450-500 मिमी). मुकुटमुळे फुटण्याच्या वेळी पाणी देणे अनिवार्य.',
        mainStages: ['मुकुटमुळे फुटणे (21 दिवस)', 'फुटवे येणे', 'फुलोरा', 'दाणे भरणे', 'कापणी'],
        whatToMonitor: ['तांबेरा रोग', 'मावा कीड'],
        commonPestsAndDiseases: ['तांबेरा (Rust)', 'मावा'],
        generalCare: '21 दिवसांनी पहिली पाणी पाळी द्या. खतांचा समतोल डोस वापरा.',
        whenToContactExpert: 'पानांवर पिवळे पट्टे दिसल्यास तातडीने कृषी तज्ज्ञांचा सल्ला घ्या.',
      },
    },
  },
  {
    id: 'maize',
    category: 'CEREAL',
    scientificName: 'Zea mays',
    iconEmoji: '🌽',
    durationDays: 110,
    waterRequirementMm: 500,
    expectedYieldPerAcre: '25 - 32 Quintals',
    riskLevel: 'LOW',
    suitableSeasons: ['KHARIF', 'RABI', 'ZAID'],
    suitableSoils: ['RED_LOAMY', 'BLACK_COTTON', 'ALLUVIAL', 'SANDY_LOAM'],
    aliases: ['maize', 'corn', 'makka', 'mokkajonna', 'bhutta', 'cholam', 'maka', 'మొక్కజొన్న', 'మక్క', 'मक्का', 'भुट्टा', 'மக்காச்சோளம்', 'ಮೆಕ್ಕೆಜೋಳ', 'ചോളം', 'मका'],
    stages: [
      { stageName: 'Knee High Stage', stageNameTe: 'మోకాలి ఎత్తు దశ', daysRange: '25 - 35 Days', description: 'Rapid stalk growth and leaf development.', waterNeed: 'Moderate', keyAction: 'Apply Fall Armyworm pheromone trap and top-dress Urea.' },
      { stageName: 'Tasseling & Silking', stageNameTe: 'పూత & కంకి దశ', daysRange: '50 - 65 Days', description: 'Male tassel and female silk emergence.', waterNeed: 'Critical', keyAction: 'Do not allow water stress during pollination.' },
      { stageName: 'Grain Filling', stageNameTe: 'గింజ ఊరే దశ', daysRange: '70 - 90 Days', description: 'Kernels fill with starch.', waterNeed: 'High', keyAction: 'Protect cobs from bird and borer damage.' },
      { stageName: 'Maturity', stageNameTe: 'పక్వత దశ', daysRange: '95 - 110 Days', description: 'Black layer formation at kernel base.', waterNeed: 'Low', keyAction: 'Harvest when cob sheaths dry out.' },
    ],
    translations: {
      en: {
        name: 'Hybrid Maize / Corn (మొక్కజొన్న / मक्का)',
        localNames: ['Maize', 'Corn', 'Mokkajonna', 'Makka', 'Bhutta', 'Cholam'],
        whatIsThis: 'High-yielding queen of cereals, in strong demand for poultry feed, starch, and human food.',
        growingSeason: 'Kharif, Rabi, and Spring. Tolerates varied weather and needs less water than paddy.',
        soilRequirements: 'Deep, well-drained loamy soils rich in organic matter. Sensitive to water stagnation.',
        waterRequirements: 'Moderate (500–600 mm). Tasseling and silking (50–65 days) are moisture-critical.',
        mainStages: ['Seedling (0–20 d)', 'Knee-high (25–35 d)', 'Tasseling & Silking (50–65 d)', 'Grain fill (70–90 d)', 'Maturity (105–110 d)'],
        whatToMonitor: ['Fall Armyworm whorl damage', 'Water stagnation in field', 'Cob borer'],
        commonPestsAndDiseases: ['Fall Armyworm (Spodoptera frugiperda)', 'Stem Borer', 'Turcicum Leaf Blight'],
        generalCare: 'Scout whorls weekly for Fall Armyworm. Apply Coragen or Emamectin Benzoate if egg masses are spotted.',
        whenToContactExpert: 'If Fall Armyworm attacks early central whorls, seek pesticide spraying guidance immediately.',
      },
      te: {
        name: 'హైబ్రిడ్ మొక్కజొన్న (Hybrid Maize)',
        localNames: ['మొక్కజొన్న', 'మక్కజొన్న', 'కంకులు', 'మక్కలు'],
        whatIsThis: 'కోళ్ల దాణా, స్టార్చ్ పరిశ్రమలకు అధిక డిమాండ్ ఉన్న తక్కువ ఖర్చుతో కూడిన ధాన్యపు పంట.',
        growingSeason: 'ఖరీఫ్, రబీ మరియు వేసవి కాలాల్లోనూ సాగు చేయవచ్చు.',
        soilRequirements: 'ఎర్ర నేలలు, ఇసుక రేగడి మరియు నల్లరేగడి నేలలు. పొలంలో నీరు నిలవకుండా ఉండాలి.',
        waterRequirements: 'మధ్యస్థం (500-600 మి.మీ). పూత మరియు గింజ కట్టే దశల్లో నీటి ఎద్దడి ఉండకూడదు.',
        mainStages: ['మొలక దశ (0-20 రోజులు)', 'మోకాలి ఎత్తు దశ (25-35 రోజులు)', 'పూత దశ (50-65 రోజులు)', 'కంకి గింజ కట్టే దశ (70-90 రోజులు)', 'కోత దశ (110 రోజులు)'],
        whatToMonitor: ['కత్తెర పురుగు (సుడులలో రంధ్రాలు)', 'మురుగు నీరు నిల్వ', 'ఆకు ఎండు తెగులు'],
        commonPestsAndDiseases: ['కత్తెర పురుగు (Fall Armyworm)', 'కాండం తొలిచే పురుగు', 'తుప్పు తెగులు'],
        generalCare: 'సుడులలో కత్తెర పురుగు నివారణకు ప్రారంభ దశలోనే ఎమామెక్టిన్ బెంజోయేట్ లేదా కోరాజెన్ పిచికారీ చేయండి.',
        whenToContactExpert: 'కత్తెర పురుగు ఉధృతి తీవ్రంగా ఉండి పిచికారీకి లొంగకపోతే వ్యవసాయ శాస్త్రవేత్తను సంప్రదించండి.',
      },
      hi: {
        name: 'संकर मक्का (Hybrid Maize / Corn)',
        localNames: ['मक्का', 'भुट्टा', 'मकई'],
        whatIsThis: 'कम लागत में अधिक पैदावार देने वाली अनाज की फसल, पोल्ट्री व पशु आहार में भारी मांग।',
        growingSeason: 'खरीफ, रबी और जायद। जलभराव के प्रति संवेदनशील।',
        soilRequirements: 'अच्छे निकास वाली दोमट और बलुई दोमट मिट्टी।',
        waterRequirements: 'मध्यम (500 मिमी)। नर व मादा फूल आने के समय पानी की कमी न होने दें।',
        mainStages: ['अंकुरण', 'घुटने की ऊंचाई', 'मंजरी व भुट्टा आना', 'दाना भराव', 'परिपक्वता'],
        whatToMonitor: ['फॉल आर्मीवर्म (सैनिक कीट)', 'खेत में पानी का ठहराव'],
        commonPestsAndDiseases: ['फॉल आर्मीवर्म', 'तना छेदक', 'पत्ती झुलसा'],
        generalCare: 'फॉल आर्मीवर्म की निगरानी करें और प्रारंभिक अवस्था में नीम तेल या अनुशंसित कीटनाशक दें।',
        whenToContactExpert: 'यदि सैनिक कीट का प्रकोप नियंत्रण से बाहर हो तो तुरंत कृषि अधिकारी से संपर्क करें।',
      },
      ta: {
        name: 'மக்காச்சோளம் (Maize / Corn)',
        localNames: ['மக்காச்சோளம்', 'சோளம்'],
        whatIsThis: 'குறைந்த நீரில் அதிக மகசூல் தரும் முக்கிய தீவன மற்றும் தானியப் பயிர்.',
        growingSeason: 'காரிஃப் மற்றும் ரபி பருவம்.',
        soilRequirements: 'வடிகால் வசதியுள்ள செம்மண் மற்றும் வண்டல் மண்.',
        waterRequirements: 'மிதமான நீர் தேவை (500 மி.மீ).',
        mainStages: ['வளர்ச்சி', 'பூத்தல்', 'மணிகள் உருவாதல்', 'அறுவடை'],
        whatToMonitor: ['படைப்புழு தாக்குதல்', 'நீர் தேக்கம்'],
        commonPestsAndDiseases: ['படைப்புழு (Fall Armyworm)', 'தண்டு துளைப்பான்'],
        generalCare: 'படைப்புழு தாக்குதலை ஆரம்பத்திலேயே கண்காணிக்கவும்.',
        whenToContactExpert: 'படைப்புழு தாக்குதல் அதிகமானால் வேளாண் அலுவலரை அணுகவும்.',
      },
      kn: {
        name: 'ಮೆಕ್ಕೆಜೋಳ (Maize / Corn)',
        localNames: ['ಮೆಕ್ಕೆಜೋಳ', 'ಮುಸುಕಿನ ಜೋಳ'],
        whatIsThis: 'ಕೋಳಿ ಆಹಾರ ಮತ್ತು ಕೈಗಾರಿಕೆಗೆ ಹೆಚ್ಚಿನ ಬೇಡಿಕೆಯಿರುವ ಆದಾಯದಾಯಕ ಬೆಳೆ.',
        growingSeason: 'ಖಾರೀಫ್, ರಬಿ ಮತ್ತು ಬೇಸಿಗೆ.',
        soilRequirements: 'ಉತ್ತಮ ನೀರು ಬಸಿದು ಹೋಗುವ ಕೆಂಪು ಮತ್ತು ಗೋಡು ಮಣ್ಣು.',
        waterRequirements: 'ಮಧ್ಯಮ (500 ಮಿ.ಮೀ). ತೆನೆ ಬರುವಾಗ ನೀರಿನ ಕೊರತೆಯಾಗಬಾರದು.',
        mainStages: ['ಮೊಳಕೆ', 'ಮಂಡಿ ಎತ್ತರದ ಹಂತ', 'ಹೂ ಬಿಡುವ ಹಂತ', 'ಕಾಳು ತುಂಬುವುದು', 'ಕೊಯ್ಲು'],
        whatToMonitor: ['ಲದ್ದಿ ಹುಳು (Fall Armyworm)', 'ನೀರು ನಿಲ್ಲುವುದು'],
        commonPestsAndDiseases: ['ಲದ್ದಿ ಹುಳು', 'ಕಾಂಡ ಕೊರೆಯಕ'],
        generalCare: 'ಸುಳಿಯಲ್ಲಿ ಲದ್ದಿ ಹುಳು ಬಾಧೆ ಕಾಣಿಸಿದರೆ ತಕ್ಷಣ ಔಷಧ ಸಿಂಪಡಿಸಿ.',
        whenToContactExpert: 'ಲದ್ದಿ ಹುಳು ಬಾಧೆ ನಿಯಂತ್ರಣಕ್ಕೆ ಬಾರದಿದ್ದಾಗ ಕೃಷಿ ವಿಜ್ಞಾನಿಗಳನ್ನು ಸಂಪರ್ಕಿಸಿ.',
      },
      ml: {
        name: 'ചോളം (Maize / Corn)',
        localNames: ['ചോളം'],
        whatIsThis: 'പ്രധാനപ്പെട്ട തീറ്റപ്പുല്ല്, ധാന്യ വിള.',
        growingSeason: 'എല്ലാ സീസണിലും അനുയോജ്യം.',
        soilRequirements: 'നീർവാർച്ചയുള്ള മണ്ണ്.',
        waterRequirements: 'മിതമായ വെള്ളം ആവശ്യമാണ്.',
        mainStages: ['വളർച്ച', 'പൂവിടൽ', 'വിളവെടുപ്പ്'],
        whatToMonitor: ['സൈനികപ്പുഴു', 'വെള്ളക്കെട്ട്'],
        commonPestsAndDiseases: ['സൈനികപ്പുഴു (Fall Armyworm)'],
        generalCare: 'വെള്ളക്കെട്ട് ഒഴിവാക്കുക.',
        whenToContactExpert: 'സൈനികപ്പുഴുവിനെ കണ്ടാൽ ഉടൻ സഹായം തേടുക.',
      },
      mr: {
        name: 'मका (Maize / Corn)',
        localNames: ['मका', 'कणीस'],
        whatIsThis: 'कमी पाण्यात भरघोस उत्पादन देणारे व कुक्कुटपालनासाठी अत्यंत मागणी असलेले पीक.',
        growingSeason: 'खरीप, रब्बी व उन्हाळी.',
        soilRequirements: 'पाण्याचा चांगला निचरा होणारी मध्यम ते भारी जमीन.',
        waterRequirements: 'मध्यम (500 मिमी). तुरा व कणीस भरताना पाणी अत्यंत आवश्यक.',
        mainStages: ['उगवण', 'वाढ', 'तुरा बाहेर पडणे', 'दाणे भरणे', 'कापणी'],
        whatToMonitor: ['लष्करी अळी (Fall Armyworm)', 'पाणथळपणा'],
        commonPestsAndDiseases: ['लष्करी अळी', 'खोडकिडा'],
        generalCare: 'लष्करी अळीच्या नियंत्रणासाठी वेळेवर कीटकनाशकाची पोंग्यात फवारणी करा.',
        whenToContactExpert: 'लष्करी अळीचा प्रादुर्भाव वाढल्यास त्वरित कृषी केंद्राशी संपर्क साधा.',
      },
    },
  },

  // -------------------------------------------------------------
  // 2. VEGETABLES
  // -------------------------------------------------------------
  {
    id: 'brinjal',
    category: 'VEGETABLE',
    scientificName: 'Solanum melongena',
    iconEmoji: '🍆',
    durationDays: 135,
    waterRequirementMm: 550,
    expectedYieldPerAcre: '15 - 22 Tonnes',
    riskLevel: 'MEDIUM',
    suitableSeasons: ['KHARIF', 'RABI', 'ZAID'],
    suitableSoils: ['RED_LOAMY', 'ALLUVIAL', 'BLACK_COTTON', 'SANDY_LOAM'],
    aliases: ['brinjal', 'bringel', 'eggplant', 'aubergine', 'vankaya', 'baingan', 'kathirikai', 'badanekayi', 'vazhutana', 'vangi', 'వంకాయ', 'వంకాయలు', 'बैंगन', 'கத்தரிக்காய்', 'ಬದನೆಕಾಯಿ', 'വഴുതന', 'वांगी'],
    stages: [
      { stageName: 'Nursery & Transplanting', stageNameTe: 'నర్సరీ & నాట్లు', daysRange: '1 - 30 Days', description: 'Raise healthy seedlings on raised nursery beds and transplant at 4 weeks.', waterNeed: 'Moderate', keyAction: 'Dip roots in Trichoderma solution before planting.' },
      { stageName: 'Vegetative Growth', stageNameTe: 'శాఖీయ దశ', daysRange: '31 - 55 Days', description: 'Branching and root expansion.', waterNeed: 'Moderate', keyAction: 'Erect yellow sticky traps and apply Neem cake.' },
      { stageName: 'Flowering & Fruiting', stageNameTe: 'పూత & పిందె దశ', daysRange: '56 - 90 Days', description: 'Continuous flowering and berry formation.', waterNeed: 'Critical', keyAction: 'Install Pheromone traps for Shoot & Fruit Borer.' },
      { stageName: 'Multiple Pickings', stageNameTe: 'కోతల దశ', daysRange: '91 - 135 Days', description: 'Harvest tender glossy fruits every 4–5 days.', waterNeed: 'Moderate', keyAction: 'Foliar spray of micronutrients and potash.' },
    ],
    translations: {
      en: {
        name: 'Brinjal / Eggplant (వంకాయ / बैंगन)',
        localNames: ['Brinjal', 'Eggplant', 'Aubergine', 'Baingan', 'Vankaya', 'Kathirikai', 'Badane'],
        whatIsThis: 'Brinjal is one of India’s most widely grown daily vegetables, providing continuous harvest and steady cash flow for 4–5 months.',
        growingSeason: 'Grown year-round across Kharif, Rabi, and Summer with good irrigation.',
        soilRequirements: 'Rich, fertile sandy-loam to clay-loam soils with pH 6.0–7.5 and thorough drainage.',
        waterRequirements: 'Moderate (500–600 mm). Needs regular light irrigation every 4–6 days; avoid water-logging.',
        mainStages: ['Nursery (0–30 d)', 'Vegetative (30–55 d)', 'Flowering & Fruit set (55–90 d)', 'Pickings (90–135 d)'],
        whatToMonitor: ['Shoot withering (Shoot borer)', 'Fruit holes and frass', 'Little leaf phytoplasma', 'Whitefly on underside'],
        commonPestsAndDiseases: ['Shoot & Fruit Borer (Leucinodes orbonalis)', 'Epilachna Beetle', 'Little Leaf Disease', 'Bacterial Wilt'],
        generalCare: 'Clip and burn dried withered shoot tips weekly. Install 10 Lucinlure pheromone traps per acre for borer control.',
        whenToContactExpert: 'If plants suddenly wilt green without yellowing (Bacterial Wilt) or show stunted tiny leaves, consult an agronomist.',
      },
      te: {
        name: 'వంకాయ (Brinjal / Eggplant)',
        localNames: ['వంకాయ', 'గుత్తి వంకాయ', 'వంకాయలు'],
        whatIsThis: 'రైతులకు ప్రతివారం నికర ఆదాయం తెచ్చిపెట్టే అత్యంత ప్రజాదరణ పొందిన కూరగాయ పంట.',
        growingSeason: 'ఖరీఫ్, రబీ, మరియు వేసవి అన్ని కాలాల్లోనూ సాగు చేయవచ్చు.',
        soilRequirements: 'సారవంతమైన ఎర్ర నేలలు, ఇసుక రేగడి నేలలు. నీరు ఇంకే సౌకర్యం చాలా అవసరం.',
        waterRequirements: 'మధ్యస్థం (500-600 మి.మీ). వారానికి ఒకసారి లేదా 4-5 రోజులకు ఒక తేలికపాటి తడి.',
        mainStages: ['నర్సరీ & నాట్లు (1-30 రోజులు)', 'కొమ్మల ఎదుగుదల (31-55 రోజులు)', 'పూత & పిందె (56-90 రోజులు)', 'కోతల దశ (91-135 రోజులు)'],
        whatToMonitor: ['కొమ్మ మరియు కాయ తొలిచే పురుగు', 'మొక్క మొవ్వులు వడలిపోవడం', 'చిట్టి ఆకు తెగులు (Little leaf)', 'తెల్లదోమ'],
        commonPestsAndDiseases: ['కొమ్మ మరియు కాయ తొలిచే పురుగు (Shoot & Fruit Borer)', 'చిట్టి ఆకు తెగులు', 'బ్యాక్టీరియా ఎండు తెగులు'],
        generalCare: 'ఎండిన మొవ్వులను వెంటనే తుంచి నాశనం చేయండి. ఎకరానికి 10 లింగాకర్షక బుట్టలను అమర్చండి.',
        whenToContactExpert: 'చెట్లు పచ్చగా ఉండగానే హఠాత్తుగా వడలిపోయి చనిపోతుంటే (ఎండు తెగులు) శాస్త్రవేత్తలను సంప్రదించండి.',
      },
      hi: {
        name: 'बैंगन (Brinjal / Eggplant)',
        localNames: ['बैंगन', 'भंटा'],
        whatIsThis: 'किसानों को लगातार 4-5 महीने तक नियमित आमदनी देने वाली लोकप्रिय सब्जी फसल।',
        growingSeason: 'वर्ष भर (खरीफ, रबी और जायद)।',
        soilRequirements: 'अच्छे निकास वाली उपजाऊ दोमट या बलुई दोमट मिट्टी।',
        waterRequirements: 'मध्यम (500-600 मिमी)। 4-6 दिन के अंतराल पर हल्की सिंचाई दें।',
        mainStages: ['नर्सरी (1-30 दिन)', 'वानस्पतिक वृद्धि (31-55 दिन)', 'फूल व फल (56-90 दिन)', 'तुड़ाई (91-135 दिन)'],
        whatToMonitor: ['तना व फल छेदक सुंडी', 'मुरझाती हुई शाखाएं', 'छोटी पत्ती रोग'],
        commonPestsAndDiseases: ['तना व फल छेदक कीट (Shoot & Fruit Borer)', 'छोटी पत्ती रोग', 'उकठा रोग'],
        generalCare: 'कीटग्रस्त शाखाओं को तोड़कर नष्ट करें। प्रति एकड़ 10 फेरोमोन ट्रैप लगाएं।',
        whenToContactExpert: 'यदि पौधे हरे रहते हुए अचानक मुरझाने लगें (बैक्टीरियल विल्ट), तो तुरंत विशेषज्ञ से संपर्क करें।',
      },
      ta: {
        name: 'கத்தரிக்காய் (Brinjal / Eggplant)',
        localNames: ['கத்தரிக்காய்', 'கத்தரி'],
        whatIsThis: 'ஆண்டு முழுவதும் தொடர்ந்து வருமானம் தரும் முக்கிய காய்கறிப் பயிர்.',
        growingSeason: 'ஆண்டு முழுவதும் பயிரிடலாம்.',
        soilRequirements: 'நல்ல வடிகால் வசதியுள்ள செம்பொறை மண் மற்றும் வண்டல் மண்.',
        waterRequirements: 'மிதமான நீர் தேவை (550 மி.மீ).',
        mainStages: ['நாற்றங்கால்', 'வளர்ச்சி', 'பூக்கும் பருவம்', 'அறுவடை'],
        whatToMonitor: ['தண்டு மற்றும் காய் துளைப்பான்', 'இலை சுருட்டை'],
        commonPestsAndDiseases: ['தண்டு மற்றும் காய் துளைப்பான்', 'வாடல் நோய்'],
        generalCare: 'தாக்கப்பட்ட தண்டுகளை உடனுக்குடன் வெட்டி எரிக்கவும். இனக்கவர்ச்சி பொறி வைக்கவும்.',
        whenToContactExpert: 'செடிகள் திடீரென வாடினால் வேளாண் வல்லுநரை அணுகவும்.',
      },
      kn: {
        name: 'ಬದನೆಕಾಯಿ (Brinjal / Eggplant)',
        localNames: ['ಬದನೆಕಾಯಿ', 'ಬದನೆ'],
        whatIsThis: 'ರೈತರಿಗೆ ವಾರಕ್ಕೊಮ್ಮೆ ನಿಯಮಿತ ನಗದು ಆದಾಯ ತಂದುಕೊಡುವ ಜನಪ್ರಿಯ ತರಕಾರಿ ಬೆಳೆ.',
        growingSeason: 'ವರ್ಷಪೂರ್ತಿ ಬೆಳೆಯಬಹುದು (ಖಾರೀಫ್, ರಬಿ, ಬೇಸಿಗೆ).',
        soilRequirements: 'ಫಲವತ್ತಾದ ಕೆಂಪು ಮತ್ತು ಮರಳುಮಿಶ್ರಿತ ಗೋಡು ಮಣ್ಣು.',
        waterRequirements: 'ಮಧ್ಯಮ (550 ಮಿ.ಮೀ). 5-6 ದಿನಗಳಿಗೊಮ್ಮೆ ಲಘು ನೀರಾವರಿ.',
        mainStages: ['ಸಸಿ ಮಡಿ', 'ಸಸಿ ನಾಟಿ ಮತ್ತು ಬೆಳವಣಿಗೆ', 'ಹೂವು-ಕಾಯಿ ಹಂತ', 'ಕಟಾವು ಹಂತ'],
        whatToMonitor: ['ಕಾಂಡ ಮತ್ತು ಕಾಯಿ ಕೊರೆಯುವ ಹುಳು', 'ಸಣ್ಣ ಎಲೆ ರೋಗ'],
        commonPestsAndDiseases: ['ಕಾಯಿ ಕೊರೆಯುವ ಹುಳು', 'ಬ್ಯಾಕ್ಟೀರಿಯಾ ಸೊರಗು ರೋಗ'],
        generalCare: 'ಬಾಡಿದ ಕುಡಿಗಳನ್ನು ಕತ್ತರಿಸಿ ನಾಶಪಡಿಸಿ. ಎಕರೆಗೆ 10 ಮೋಹಕ ಬಲೆಗಳನ್ನು ಅಳವಡಿಸಿ.',
        whenToContactExpert: 'ಗಿಡಗಳು ಹಠಾತ್ತನೆ ಒಣಗಿ ಸೊರಗಿದರೆ ತಜ್ಞರ ಸಲಹೆ ಪಡೆಯಿರಿ.',
      },
      ml: {
        name: 'വഴുതന (Brinjal / Eggplant)',
        localNames: ['വഴുതന', 'വഴുതനങ്ങ'],
        whatIsThis: 'സ്ഥിര വരുമാനം നൽകുന്ന പ്രധാന പച്ചക്കറി വിള.',
        growingSeason: 'വർഷം മുഴുവൻ കൃഷി ചെയ്യാം.',
        soilRequirements: 'നീർവാർച്ചയുള്ള വളക്കൂറുള്ള മണ്ണ്.',
        waterRequirements: 'മിതമായ നനവ് മതിയാകും.',
        mainStages: ['തവാരണ', 'വളർച്ച', 'പൂവിടൽ', 'വിളവെടുപ്പ്'],
        whatToMonitor: ['കായ്തുരപ്പൻ പുഴു', 'വാട്ടരോഗം'],
        commonPestsAndDiseases: ['കായ്തുരപ്പൻ', 'ബാക്ടീരിയൽ വാട്ടം'],
        generalCare: 'കീടബാധയുള്ള ശാഖകൾ നശിപ്പിക്കുക.',
        whenToContactExpert: 'ചെടികൾ പെട്ടെന്ന് വാടിപ്പോയാൽ ഉടനടി സഹായം തേടുക.',
      },
      mr: {
        name: 'वांगी (Brinjal / Eggplant)',
        localNames: ['वांगी', 'वांगे'],
        whatIsThis: 'शेतकऱ्यांना नियमित उत्पन्न देणारे लोकप्रिय भाजीपाला पीक.',
        growingSeason: 'वर्षभर (खरीप, रब्बी व उन्हाळी).',
        soilRequirements: 'मध्यम ते भारी, पाण्याचा उत्तम निचरा असणारी जमीन.',
        waterRequirements: 'मध्यम (550 मिमी). 5-6 दिवसांच्या अंतराने हलके पाणी द्यावे.',
        mainStages: ['रोपवाटिका', 'शाकीय वाढ', 'फुलोरा व फळधारणा', 'तोडणी'],
        whatToMonitor: ['शेंडा व फळ पोखरणारी अळी', 'लहान पान रोग'],
        commonPestsAndDiseases: ['शेंडा व फळ पोखरणारी अळी', 'मर रोग'],
        generalCare: 'किडलेले शेंडे तोडून नष्ट करा व एकरी 10 कामगंध सापळे लावा.',
        whenToContactExpert: 'झाडे अचानक सुकू लागल्यास त्वरित कृषी तज्ज्ञांचा सल्ला घ्या.',
      },
    },
  },
  {
    id: 'ladyfinger',
    category: 'VEGETABLE',
    scientificName: 'Abelmoschus esculentus',
    iconEmoji: '🥬',
    durationDays: 100,
    waterRequirementMm: 450,
    expectedYieldPerAcre: '45 - 65 Quintals',
    riskLevel: 'LOW',
    suitableSeasons: ['KHARIF', 'ZAID'],
    suitableSoils: ['RED_LOAMY', 'ALLUVIAL', 'SANDY_LOAM'],
    aliases: ['ladyfinger', 'lady finger', 'okra', 'bhindi', 'bendakaya', 'vendaikkai', 'bendekayi', 'vendakka', 'bhendi', 'బెండకాయ', 'బెండ', 'भिंडी', 'வெண்டைக்காய்', 'ಬೆಂಡೆಕಾಯಿ', 'വെണ്ടയ്ക്ക', 'भेंडी'],
    stages: [
      { stageName: 'Germination & Vegetative', stageNameTe: 'మొలక & ఎదుగుదల', daysRange: '1 - 30 Days', description: 'Fast root and foliage development.', waterNeed: 'Moderate', keyAction: 'Weeding and yellow sticky traps for whitefly.' },
      { stageName: 'Flowering & Fruiting', stageNameTe: 'పూత & కాయ దశ', daysRange: '35 - 60 Days', description: 'Yellow hibiscus-like flowers and fast pod formation.', waterNeed: 'Critical', keyAction: 'Maintain soil moisture and monitor YVMV vector.' },
      { stageName: 'Continuous Picking', stageNameTe: 'నిరంతర కోతలు', daysRange: '45 - 100 Days', description: 'Harvest every alternate day for tender pods.', waterNeed: 'Moderate', keyAction: 'Apply 13-0-45 foliar spray after every 3rd picking.' },
    ],
    translations: {
      en: {
        name: 'Ladyfinger / Okra (బెండకాయ / भिंडी)',
        localNames: ['Ladyfinger', 'Okra', 'Bhindi', 'Bendakaya', 'Vendaikkai', 'Bhendi'],
        whatIsThis: 'Fast-growing, short-duration vegetable with pickings starting just 45 days after direct seeding.',
        growingSeason: 'Kharif (June–July) and Summer (Feb–March). Prefers warm humid conditions.',
        soilRequirements: 'Well-drained sandy-loam or clay-loam rich in humus.',
        waterRequirements: 'Moderate (400–500 mm). Alternate day picking requires steady moisture.',
        mainStages: ['Vegetative (1–30 d)', 'Flowering (35–50 d)', 'Harvest Pickings (45–100 d)'],
        whatToMonitor: ['Yellow vein clearing (YVMV virus)', 'Fruit borer holes', 'Whiteflies'],
        commonPestsAndDiseases: ['Yellow Vein Mosaic Virus (YVMV)', 'Shoot & Fruit Borer', 'Whitefly (Bemisia tabaci)'],
        generalCare: 'Always select YVMV-resistant hybrid seeds. Control whiteflies early to stop virus spread.',
        whenToContactExpert: 'If leaves display bright yellow veins netting and stunted yellow pods, seek immediate vector control advice.',
      },
      te: {
        name: 'బెండకాయ (Ladyfinger / Okra)',
        localNames: ['బెండకాయ', 'బెండ'],
        whatIsThis: 'విత్తిన 45 రోజులకే కోతకు వచ్చే స్వల్పకాలిక అత్యంత లాభదాయక కూరగాయ పంట.',
        growingSeason: 'ఖరీఫ్ (జూన్-జూలై) మరియు వేసవి (ఫిబ్రవరి-మార్చి) అనుకూలం.',
        soilRequirements: 'ఎర్ర నేలలు, ఇసుక పొర నేలలు మరియు ఒండ్రు నేలలు.',
        waterRequirements: 'మధ్యస్థం (400-500 మి.మీ). కోతల సమయంలో క్రమం తప్పకుండా తడి ఇవ్వాలి.',
        mainStages: ['మొలక & ఎదుగుదల (1-30 రోజులు)', 'పూత దశ (35-50 రోజులు)', 'కోతల దశ (45-100 రోజులు)'],
        whatToMonitor: ['పల్లాకు తెగులు (Yellow Vein Mosaic)', 'కాయ తొలిచే పురుగు', 'తెల్లదోమ ఉధృతి'],
        commonPestsAndDiseases: ['పల్లాకు తెగులు (వైరస్)', 'కాయ తొలిచే పురుగు', 'తెల్లదోమ'],
        generalCare: 'పల్లాకు తెగులును తట్టుకునే హైబ్రిడ్ రకాలను ఎంచుకోండి. తెల్లదోమ నివారణకు పసుపు జిగురు అట్టలు పెట్టండి.',
        whenToContactExpert: 'ఆకుల ఈనెలు పసుపు రంగులోకి మారి కాయలు గిడసబారితే వ్యవసాయ అధికారిని సంప్రదించండి.',
      },
      hi: {
        name: 'भिंडी (Ladyfinger / Okra)',
        localNames: ['भिंडी', 'ओकरा'],
        whatIsThis: 'बुवाई के 45 दिन बाद ही तुड़ाई शुरू कराने वाली अत्यंत लोकप्रिय व त्वरित आमदनी की सब्जी।',
        growingSeason: 'खरीफ और ग्रीष्मकालीन (जायद)।',
        soilRequirements: 'जीवांश युक्त बलुई दोमट व दोमट मिट्टी।',
        waterRequirements: 'मध्यम (400-500 मिमी)। तुड़ाई के समय नमी बनाए रखें।',
        mainStages: ['वानस्पतिक वृद्धि', 'फूल आना', 'तुड़ाई (45 से 100 दिन)'],
        whatToMonitor: ['पीला शिरा मोजेक वायरस (YVMV)', 'सफेद मक्खी', 'फल छेदक'],
        commonPestsAndDiseases: ['पीत शिरा मोजेक', 'फल छेदक सुंडी', 'सफेद मक्खी'],
        generalCare: 'रोगरोधी किस्मों का चयन करें। सफेद मक्खी को रोकने के लिए पीले चिपचिपे कार्ड लगाएं।',
        whenToContactExpert: 'यदि पत्तियों की नसें पीली पड़ने लगें तो तुरंत वैज्ञानिक से सलाह लें।',
      },
      ta: {
        name: 'வெண்டைக்காய் (Ladyfinger / Okra)',
        localNames: ['வெண்டைக்காய்', 'வெண்டை'],
        whatIsThis: '45 நாட்களில் அறுவடை தரும் குறுகிய கால காய்கறி.',
        growingSeason: 'காரிஃப் மற்றும் கோடைப் பருவம்.',
        soilRequirements: 'வண்டல் மற்றும் செம்மண்.',
        waterRequirements: 'மிதமான நீர் (450 மி.மீ).',
        mainStages: ['வளர்ச்சி', 'பூத்தல்', 'அறுவடை'],
        whatToMonitor: ['மஞ்சள் நரம்பு தேமல் நோய்', 'வெள்ளை ஈ'],
        commonPestsAndDiseases: ['மஞ்சள் நரம்பு தேமல் நோய்', 'காய் துளைப்பான்'],
        generalCare: 'மஞ்சள் நிற ஒட்டும் பொறிகளைப் பயன்படுத்தவும்.',
        whenToContactExpert: 'இலை நரம்புகள் மஞ்சள் நிறமானால் உடனடியாக தொடர்பு கொள்ளவும்.',
      },
      kn: {
        name: 'ಬೆಂಡೆಕಾಯಿ (Ladyfinger / Okra)',
        localNames: ['ಬೆಂಡೆಕಾಯಿ', 'ಬೆಂಡೆ'],
        whatIsThis: '45 ದಿನಗಳಲ್ಲಿ ಕಟಾವಿಗೆ ಬರುವ ಅತಿ ವೇಗದ ಆದಾಯದ ತರಕಾರಿ ಬೆಳೆ.',
        growingSeason: 'ಖಾರೀಫ್ ಮತ್ತು ಬೇಸಿಗೆ ಹಂಗಾಮು.',
        soilRequirements: 'ಮರಳುಮಿಶ್ರಿತ ಫಲವತ್ತಾದ ಗೋಡು ಮಣ್ಣು.',
        waterRequirements: 'ಮಧ್ಯಮ (450 ಮಿ.ಮೀ).',
        mainStages: ['ಬೆಳವಣಿಗೆ', 'ಹೂ ಬಿಡುವ ಹಂತ', 'ಕಟಾವು'],
        whatToMonitor: ['ಹಳದಿ ನರ ರೋಗ', 'ಬಿಳಿ ನೊಣ'],
        commonPestsAndDiseases: ['ಹಳದಿ ನಂಜು ರೋಗ', 'ಕಾಯಿ ಕೊರೆಯಕ'],
        generalCare: 'ರೋಗ ನಿರೋಧಕ ತಳಿಗಳನ್ನು ಆಯ್ಕೆಮಾಡಿ.',
        whenToContactExpert: 'ಎಲೆಗಳ ನರಗಳು ಹಳದಿಯಾಗತೊಡಗಿದರೆ ಕೃಷಿ ಅಧಿಕಾರಿಯನ್ನು ಸಂಪರ್ಕಿಸಿ.',
      },
      ml: {
        name: 'വെണ്ടയ്ക്ക (Ladyfinger / Okra)',
        localNames: ['വെണ്ടയ്ക്ക', 'വെണ്ട'],
        whatIsThis: 'എളുപ്പത്തിൽ വിളവെടുപ്പ് തരുന്ന പച്ചക്കറി.',
        growingSeason: 'എല്ലാ മാസങ്ങളിലും കൃഷി ചെയ്യാം.',
        soilRequirements: 'നീർവാർച്ചയുള്ള പശിമരാശി മണ്ണ്.',
        waterRequirements: 'മിതമായ നനവ്.',
        mainStages: ['വളർച്ച', 'പൂവിടൽ', 'വിളവെടുപ്പ്'],
        whatToMonitor: ['മഞ്ഞളിപ്പ് രോഗം', 'വെള്ളീച്ച'],
        commonPestsAndDiseases: ['മഞ്ഞളിപ്പ് രോഗം'],
        generalCare: 'മഞ്ഞക്കെണികൾ ഉപയോഗിക്കുക.',
        whenToContactExpert: 'രോഗബാധ കണ്ടാൽ കൃഷിഭവനെ അറിയിക്കുക.',
      },
      mr: {
        name: 'भेंडी (Ladyfinger / Okra)',
        localNames: ['भेंडी'],
        whatIsThis: 'पेरणीनंतर अवघ्या 45 दिवसांत तोडणी सुरू होणारे फायदेशीर पीक.',
        growingSeason: 'खरीप व उन्हाळी.',
        soilRequirements: 'सेंद्रिय खतांनी समृद्ध मध्यम ते भारी जमीन.',
        waterRequirements: 'मध्यम (450 मिमी).',
        mainStages: ['वाढ', 'फुलोरा', 'नियमित तोडणी'],
        whatToMonitor: ['पिवळा शिरा रोग (YVMV)', 'पांढरी माशी'],
        commonPestsAndDiseases: ['केवडा रोग', 'फळ पोखरणारी अळी'],
        generalCare: 'पिवळे चिकट सापळे लावा आणि रोगप्रतिकारक वाण वापरा.',
        whenToContactExpert: 'पानांच्या शिरा पिवळ्या पडल्यास तज्ज्ञांचा सल्ला घ्या.',
      },
    },
  },
  {
    id: 'tomato',
    category: 'VEGETABLE',
    scientificName: 'Solanum lycopersicum',
    iconEmoji: '🍅',
    durationDays: 125,
    waterRequirementMm: 500,
    expectedYieldPerAcre: '20 - 28 Tonnes',
    riskLevel: 'HIGH',
    suitableSeasons: ['KHARIF', 'RABI', 'ZAID'],
    suitableSoils: ['RED_LOAMY', 'ALLUVIAL', 'SANDY_LOAM'],
    aliases: ['tomato', 'tamatar', 'tamata', 'thakkali', 'tometo', 'టమాటా', 'టమాట', 'టమోటా', 'टमाटर', 'தக்காளி', 'ಟೊಮೆಟೊ', 'തക്കാളി', 'टोमॅटो'],
    stages: [
      { stageName: 'Transplanting & Staking', stageNameTe: 'నాట్లు & కర్రల మద్దతు', daysRange: '1 - 30 Days', description: 'Transplant 25-day seedlings and erect bamboo/wire stakes.', waterNeed: 'Moderate', keyAction: 'Tie plants to stakes to keep fruits off the ground.' },
      { stageName: 'Flowering & Fruit Cluster', stageNameTe: 'పూత & పిందె కట్టడం', daysRange: '35 - 65 Days', description: 'Clusters of yellow flowers set into green fruit bunches.', waterNeed: 'Critical', keyAction: 'Foliar spray Boron + Calcium to prevent blossom-end rot.' },
      { stageName: 'Ripening & Harvesting', stageNameTe: 'పండ్ల పక్వత & కోతలు', daysRange: '70 - 125 Days', description: 'Breaker stage to firm red ripe tomatoes harvested weekly.', waterNeed: 'High', keyAction: 'Pick at breaker stage for distant market transport.' },
    ],
    translations: {
      en: {
        name: 'Hybrid Tomato (టమాటా / टमाटर)',
        localNames: ['Tomato', 'Tamatar', 'Tamata', 'Thakkali', 'Tometo'],
        whatIsThis: 'High-value commercial vegetable with continuous picking; immense profits during peak market prices.',
        growingSeason: 'Year-round. Best yields obtained in winter (Rabi) and protected semi-arid tracts.',
        soilRequirements: 'Deep, well-drained sandy loam or red loamy soil with pH 6.0–7.0.',
        waterRequirements: 'Moderate (500–600 mm). Consistent moisture prevents blossom end rot and fruit cracking.',
        mainStages: ['Nursery (0–25 d)', 'Vegetative & Staking (25–45 d)', 'Flowering & Fruit set (45–70 d)', 'Pickings (70–125 d)'],
        whatToMonitor: ['Tuta absoluta pinworm mines', 'Early & late blight lesions', 'Blossom end rot (black bottom)', 'Whitefly vectors'],
        commonPestsAndDiseases: ['Tomato Leaf Miner (Tuta absoluta)', 'Early Blight (Alternaria solani)', 'Tomato Leaf Curl Virus (ToLCV)', 'Bacterial Canker'],
        generalCare: 'Stake plants with bamboo poles. Apply Calcium Nitrate and Boron during fruit formation to avoid black rot.',
        whenToContactExpert: 'If leaves curl upwards with extreme stunting (ToLCV) or fruits develop sunken black bottoms, seek agronomic guidance.',
      },
      te: {
        name: 'హైబ్రిడ్ టమాటా (Hybrid Tomato)',
        localNames: ['టమాటా', 'టమాట', 'టమోటా'],
        whatIsThis: 'మంచి మార్కెట్ ధర ఉన్నప్పుడు రైతులకు లక్షల్లో లాభాలు తెచ్చిపెట్టే అత్యంత కీలక కూరగాయ పంట.',
        growingSeason: 'సంవత్సరం పొడవునా సాగు చేయవచ్చు. శీతాకాలంలో దిగుబడి మరియు నాణ్యత ఎక్కువ.',
        soilRequirements: 'నీరు ఇంకే ఎర్ర నేలలు, ఒండ్రు నేలలు. మురుగు నీరు నిలిస్తే పైరు దెబ్బతింటుంది.',
        waterRequirements: 'మధ్యస్థం (500-600 మి.మీ). డ్రిప్ పద్ధతి ద్వారా నీరు అందిస్తే కాయలు పగలకుండా నిగనిగలాడుతాయి.',
        mainStages: ['నర్సరీ & నాట్లు (1-25 రోజులు)', 'కర్రల మద్దతు (26-45 రోజులు)', 'పూత & పిందె (46-70 రోజులు)', 'కోతల దశ (71-125 రోజులు)'],
        whatToMonitor: ['టూటా ఆకు తొలిచే పురుగు', 'కాయల అడుగుభాగం నల్లబడటం (కాల్షియం లోపం)', 'ఆకు ముడత వైరస్', 'మచ్చ తెగులు'],
        commonPestsAndDiseases: ['టూటా అబ్సొల్యూటా (Tuta absoluta)', 'ఆకు మాడు తెగులు (Early Blight)', 'బొబ్బర / ముడత తెగులు (ToLCV)'],
        generalCare: 'చెట్లకు కర్రల మద్దతు (Staking) తప్పనిసరి. కాయలు కుళ్ళకుండా కాల్షియం, బోరాన్ స్ప్రే చేయండి.',
        whenToContactExpert: 'ఆకులు పైకి ముడుచుకుని పసుపు రంగులోకి మారి పెరుగుదల ఆగిపోతే వెంటనే శాస్త్రవేత్తను సంప్రదించండి.',
      },
      hi: {
        name: 'संकर टमाटर (Hybrid Tomato)',
        localNames: ['टमाटर', 'Tamatar'],
        whatIsThis: 'बाजार में अच्छा भाव मिलने पर भारी मुनाफा देने वाली प्रमुख नकदी सब्जी फसल।',
        growingSeason: 'वर्ष भर, रबी (सर्दियों) में सर्वाधिक पैदावार और गुणवत्ता।',
        soilRequirements: 'अच्छे निकास वाली उपजाऊ बलुई दोमट या दोमट मिट्टी।',
        waterRequirements: 'मध्यम (500-600 मिमी)। ड्रिप सिंचाई से फल फटने की समस्या नहीं होती।',
        mainStages: ['नर्सरी व रोपाई', 'सहारा देना (Staking)', 'फूल व फल बनना', 'तुड़ाई'],
        whatToMonitor: ['टुटा कीड़ा', 'पत्ती झुलसा', 'फल का निचला हिस्सा काला होना', 'पत्ती मरोड़ वायरस'],
        commonPestsAndDiseases: ['टुटा अब्सोल्युटा (पिनवर्म)', 'अगेती/पिछेती झुलसा', 'पत्ती मरोड़ (Leaf Curl)'],
        generalCare: 'पौधों को बांस से सहारा दें। फलों को सड़न से बचाने के लिए बोरॉन व कैल्शियम का छिड़काव करें।',
        whenToContactExpert: 'पत्तियां मुड़कर पौधा बौना रह जाए (लीफ कर्ल वायरस) तो तुरंत कृषि विशेषज्ञ से संपर्क करें।',
      },
      ta: {
        name: 'தக்காளி (Tomato)',
        localNames: ['தக்காளி'],
        whatIsThis: 'அதிக லாபம் தரும் முக்கிய காய்கறிப் பயிர்.',
        growingSeason: 'ஆண்டு முழுவதும் சாகுபடி செய்யலாம்.',
        soilRequirements: 'வடிகால் வசதியுள்ள செம்மண்.',
        waterRequirements: 'மிதமான நீர் (550 மி.மீ).',
        mainStages: ['நாற்று நடுதல்', 'செடிகளுக்கு முட்டுக் கொடுத்தல்', 'பூத்தல்', 'அறுவடை'],
        whatToMonitor: ['இலைச் சுருட்டை நோய்', 'பழப்புழு', 'இலைக் கருகல்'],
        commonPestsAndDiseases: ['இலைச்சுருட்டை', 'பழப்புழு', 'துளைப்பான்'],
        generalCare: 'கால்சியம் மற்றும் போரான் தெளிப்பது நல்லது.',
        whenToContactExpert: 'இலைகள் சுருண்டு வளர்ச்சி குன்றினால் வல்லுநரை அணுகவும்.',
      },
      kn: {
        name: 'ಟೊಮೆಟೊ (Tomato)',
        localNames: ['ಟೊಮೆಟೊ', 'ಟೊಮಾಟೊ'],
        whatIsThis: 'ಮಾರುಕಟ್ಟೆಯಲ್ಲಿ ಉತ್ತಮ ಧಾರಣೆ ಇದ್ದಾಗ ಅತ್ಯಧಿಕ ಲಾಭ ನೀಡುವ ತರಕಾರಿ ಬೆಳೆ.',
        growingSeason: 'ವರ್ಷಪೂರ್ತಿ ಬೆಳೆಯಬಹುದು. ಚಳಿಗಾಲದಲ್ಲಿ ಗರಿಷ್ಠ ಇಳುವರಿ.',
        soilRequirements: 'ಫಲವತ್ತಾದ ಕೆಂಪು ಮತ್ತು ಮರಳು ಮಿಶ್ರಿತ ಗೋಡು ಮಣ್ಣು.',
        waterRequirements: 'ಮಧ್ಯಮ (500-600 ಮಿ.ಮೀ). ಹನಿ ನೀರಾವರಿ ಅತ್ಯಂತ ಸೂಕ್ತ.',
        mainStages: ['ನಾಟಿ ಹಂತ', 'ಆಸರೆ ಕಟ್ಟುವುದು', 'ಹೂ ಬಿಡುವುದು', 'ಕಟಾವು'],
        whatToMonitor: ['ಟೂಟಾ ಕೀಟ', 'ಎಲೆ ಮುರುಟು ರೋಗ', 'ಹಣ್ಣು ಕೊಳೆತ'],
        commonPestsAndDiseases: ['ಎಲೆ ಮುರುಟು ವೈರಸ್', 'ಟೂಟಾ ಹುಳು', 'ಚಿಬ್ಬು ರೋಗ'],
        generalCare: 'ಗಿಡಗಳಿಗೆ ಬಿದಿರಿನ ಕೋಲಿನ ಆಸರೆ ನೀಡಿ. ಕ್ಯಾಲ್ಸಿಯಂ ಸಿಂಪಡಿಸಿ.',
        whenToContactExpert: 'ಎಲೆ ಮುರುಟು ರೋಗ ತೀವ್ರವಾದಾಗ ತಜ್ಞರ ಸಲಹೆ ಪಡೆಯಿರಿ.',
      },
      ml: {
        name: 'തക്കാളി (Tomato)',
        localNames: ['തക്കാളി'],
        whatIsThis: 'ഉയർന്ന വിപണിമൂല്യമുള്ള പച്ചക്കറി.',
        growingSeason: 'ശീതകാലത്ത് ഏറ്റവും അനുയോജ്യം.',
        soilRequirements: 'നീർവാർച്ചയുള്ള ഫലഭൂയിഷ്ഠമായ മണ്ണ്.',
        waterRequirements: 'മിതമായ നനവ്.',
        mainStages: ['നടീൽ', 'വളർച്ച', 'പൂവിടൽ', 'വിളവെടുപ്പ്'],
        whatToMonitor: ['ഇലച്ചുരുൾ രോഗം', 'കായ്തുരപ്പൻ'],
        commonPestsAndDiseases: ['ഇലച്ചുരുൾ', 'വാട്ടരോഗം'],
        generalCare: 'താങ്ങ് കൊടുത്ത് വളർത്തുക.',
        whenToContactExpert: 'വൈറസ് ബാധ കണ്ടാൽ ഉടൻ സഹായം തേടുക.',
      },
      mr: {
        name: 'टोमॅटो (Tomato)',
        localNames: ['टोमॅटो'],
        whatIsThis: 'बाजारभाव तेजीत असताना लाखो रुपयांचा नफा देणारे नगदी भाजीपाला पीक.',
        growingSeason: 'वर्षभर, विशेषतः हिवाळ्यात उत्तम प्रत व उत्पादन.',
        soilRequirements: 'उत्तम निचरा होणारी मध्यम काळी व पोयट्याची जमीन.',
        waterRequirements: 'मध्यम (550 मिमी). ठिबक सिंचन अत्यंत उपयुक्त.',
        mainStages: ['पुनर्लागवड', 'बांबूचा आधार देणे', 'फुलोरा', 'तोडणी'],
        whatToMonitor: ['टुटा अळी', 'करपा', 'पान चुरडा-मुरडा (Leaf Curl)'],
        commonPestsAndDiseases: ['टुटा अब्सोल्युटा', 'पान चुरडा-मुरडा', 'अगेती करपा'],
        generalCare: 'झाडांना तारा व बांबूचा आधार द्या. फळे तडकण्यापासून रोखण्यासाठी बोरॉन फवारा.',
        whenToContactExpert: 'पान मुरडा रोगाचा प्रादुर्भाव वाढल्यास त्वरित कृषी तज्ज्ञांशी संपर्क साधा.',
      },
    },
  },

  // -------------------------------------------------------------
  // 3. FRUITS
  // -------------------------------------------------------------
  {
    id: 'banana',
    category: 'FRUIT',
    scientificName: 'Musa acuminata',
    iconEmoji: '🍌',
    durationDays: 330,
    waterRequirementMm: 1600,
    expectedYieldPerAcre: '28 - 38 Tonnes',
    riskLevel: 'MEDIUM',
    suitableSeasons: ['KHARIF', 'RABI'],
    suitableSoils: ['ALLUVIAL', 'BLACK_COTTON', 'RED_LOAMY'],
    aliases: ['banana', 'kela', 'arati', 'vazhai', 'balehannu', 'vazhappazham', 'keli', 'grand naine', 'g9', 'అరటి', 'అరటిపండు', 'కేళా', 'केला', 'வாழை', 'வாழைப்பழம்', 'ಬಾಳೆಹಣ್ಣು', 'ಬಾಳೆ', 'വാഴപ്പഴം', 'വാഴ', 'केळी'],
    stages: [
      { stageName: 'Vegetative & Pseudostem Growth', stageNameTe: 'పిలకల పెరుగుదల', daysRange: '1 - 150 Days', description: 'Intensive leaf and trunk girth development.', waterNeed: 'High', keyAction: 'Desuckering: remove unwanted suckers to direct energy to main stem.' },
      { stageName: 'Shooting & Inflorescence', stageNameTe: 'గెల బయటకు వచ్చే దశ', daysRange: '180 - 240 Days', description: 'Bunch emergence from pseudostem.', waterNeed: 'Critical', keyAction: 'Bunch cover protection and propping with bamboo poles.' },
      { stageName: 'Bunch Filling & Maturity', stageNameTe: 'గెల ఊరే దశ', daysRange: '250 - 330 Days', description: 'Fingers fill with sweet pulp and round off.', waterNeed: 'Critical', keyAction: 'Apply Sulphate of Potash (SOP) via drip.' },
    ],
    translations: {
      en: {
        name: 'Banana (G-9 Grand Naine) (అరటి / केला)',
        localNames: ['Banana', 'Kela', 'Arati', 'Vazhai', 'Balehannu', 'G9'],
        whatIsThis: 'Fast-yielding commercial perennial fruit providing massive yields (30+ tonnes/acre) under drip fertigation.',
        growingSeason: 'Planted in June–July or Sept–Oct. Requires warm tropical climate with abundant water.',
        soilRequirements: 'Deep, rich, well-drained loamy or alluvial soil with high organic matter. Cannot tolerate salinity or stagnant water.',
        waterRequirements: 'Very High (1500–1800 mm). Drip irrigation is essential (15–20 liters/plant/day in peak heat).',
        mainStages: ['Vegetative (0–5 months)', 'Bunch shooting (6–8 months)', 'Bunch development (8–11 months)', 'Harvest (11–12 months)'],
        whatToMonitor: ['Sigatoka leaf streak spots', 'Banana pseudostem weevil holes', 'Bunch snapping (propping needed)', 'Soil drainage'],
        commonPestsAndDiseases: ['Sigatoka Leaf Spot', 'Pseudostem Weevil (Odoiporus longicollis)', 'Panama Wilt (Fusarium)', 'Banana Aphid'],
        generalCare: 'Prop plants with double bamboo poles to prevent lodging during windstorms. Cover bunches with blue skirty bags.',
        whenToContactExpert: 'If outer leaves turn pale yellow, buckle at the base, and trunk splits (Panama wilt), alert the horticulture scientist immediately.',
      },
      te: {
        name: 'అరటి (గ్రాండ్‌నైన్ - G9 Banana)',
        localNames: ['అరటి', 'అరటితోట', 'గెలలు', 'అమృతపాణి'],
        whatIsThis: 'డ్రిప్ పద్ధతిలో సాగు చేస్తే ఎకరానికి 30-35 టన్నుల బ్రహ్మాండమైన దిగుబడి ఇచ్చే అధిక లాభదాయక పండ్ల తోట.',
        growingSeason: 'జూన్-జూలై లేదా సెప్టెంబర్-అక్టోబర్ నాట్లు అనుకూలం.',
        soilRequirements: 'సారవంతమైన ఒండ్రు నేలలు, లోతైన నల్లరేగడి నేలలు. మురుగు నీరు వెంటనే పోయేలా ఉండాలి.',
        waterRequirements: 'అత్యధికం (1500-1800 మి.మీ). మొక్కకు రోజుకు 15-20 లీటర్ల నీరు డ్రిప్ ద్వారా అవసరం.',
        mainStages: ['మొక్క ఎదుగుదల (1-5 నెలలు)', 'గెల వేసే దశ (6-8 నెలలు)', 'కాయ ఊరే దశ (8-11 నెలలు)', 'కోత దశ (11-12 నెలలు)'],
        whatToMonitor: ['సిగటోకా ఆకుమచ్చ తెగులు', 'కాండం తొలిచే పెంకు పురుగు', 'గెలల బరువుకు చెట్టు పడిపోవడం', 'డ్రిప్ తేమ'],
        commonPestsAndDiseases: ['సిగటోకా ఆకుమచ్చ తెగులు', 'కాండం తొలిచే పురుగు (Weevil)', 'పనామా ఎండు తెగులు'],
        generalCare: 'గాలి తాకిడికి చెట్లు విరగకుండా వెదురు కర్రల ఊతం (Propping) తప్పనిసరి. గెలలకు బ్లూ కవర్లు తొడగండి.',
        whenToContactExpert: 'ఆకులు పసుపు రంగులోకి మారి కిందకి వాలిపోతూ కాండం నిలువుగా చీలిపోతుంటే (పనామా తెగులు) శాస్త్రవేత్తను సంప్రదించండి.',
      },
      hi: {
        name: 'केला (G-9 Banana)',
        localNames: ['केला', 'केंदली', 'G9 Kela'],
        whatIsThis: 'ड्रिप सिंचाई में प्रति एकड़ 30-35 टन बंपर पैदावार देने वाली अत्यंत लाभदायक फल फसल।',
        growingSeason: 'जून-जुलाई या सितंबर-अक्टूबर में रोपाई।',
        soilRequirements: 'गहरी, उपजाऊ दोमट या मटियार मिट्टी। पानी का ठहराव बिल्कुल नहीं होना चाहिए।',
        waterRequirements: 'अत्यधिक (1500-1800 मिमी)। गर्मियों में प्रतिदिन 15-20 लीटर प्रति पौधा।',
        mainStages: ['वानस्पतिक बढ़वार', 'घार निकलना (फूल आना)', 'फल भराव', 'कटाई'],
        whatToMonitor: ['सिगाटोका पत्ती धब्बा', 'तना छेदक घुन', 'पौधों का गिरना'],
        commonPestsAndDiseases: ['सिगाटोका लीफ स्पॉट', 'पनामा विल्ट', 'तना छेदक घुन'],
        generalCare: 'घार आने पर पौधों को बांस की बल्लियों का सहारा जरूर दें।',
        whenToContactExpert: 'यदि तना नीचे से फटने लगे और पत्तियां सूखने लगें, तो तुरंत वैज्ञानिक से सलाह लें।',
      },
      ta: {
        name: 'வாழை (Banana G-9)',
        localNames: ['வாழை', 'வாழைப்பழம்'],
        whatIsThis: 'சொட்டுநீர்ப் பாசனத்தில் ஏக்கருக்கு 35 டன் வரை மகசூல் தரும் பணப்பயிர்.',
        growingSeason: 'ஜூன்-ஜூலை மற்றும் செப்டம்பர்-அக்டோபர்.',
        soilRequirements: 'ஆழமான வண்டல் மண் மற்றும் செம்மண்.',
        waterRequirements: 'மிக அதிகம் (1600 மி.மீ).',
        mainStages: ['வளர்ச்சி', 'குலை தள்ளுதல்', 'காய் முதிர்ச்சி', 'அறுவடை'],
        whatToMonitor: ['சிகடோகா இலைப்புள்ளி', 'தண்டு வண்டு', 'காற்றில் மரம் சாய்வது'],
        commonPestsAndDiseases: ['சிகடோகா இலைப்புள்ளி', 'பனாமா வாடல்'],
        generalCare: 'மரங்களுக்கு முட்டுக்கொடுக்க வேண்டும். குலைகளுக்கு உறை போடவும்.',
        whenToContactExpert: 'பனாமா வாடல் நோய் தென்பட்டால் உடனடியாக தோட்டக்கலை அலுவலரை அணுகவும்.',
      },
      kn: {
        name: 'ಬಾಳೆಹಣ್ಣು (Banana G-9)',
        localNames: ['ಬಾಳೆ', 'ಬಾಳೆಹಣ್ಣು'],
        whatIsThis: 'ಹನಿ ನೀರಾವರಿಯಲ್ಲಿ ಎಕರೆಗೆ 30-35 ಟನ್ ಅತ್ಯಧಿಕ ಇಳುವರಿ ನೀಡುವ ಪ್ರಮುಖ ತೋಟಗಾರಿಕಾ ಬೆಳೆ.',
        growingSeason: 'ಜೂನ್-ಜುಲೈ ಅಥವಾ ಸೆಪ್ಟೆಂಬರ್-ಅಕ್ಟೋಬರ್.',
        soilRequirements: 'ಉತ್ತಮ ನೀರು ಬಸಿದುಹೋಗುವ ಫಲವತ್ತಾದ ಕಪ್ಪು ಮತ್ತು ಗೋಡು ಮಣ್ಣು.',
        waterRequirements: 'ಅತ್ಯಧಿಕ (1600 ಮಿ.ಮೀ). ಗಿಡಕ್ಕೆ ದಿನಕ್ಕೆ 15-20 ಲೀಟರ್ ನೀರು ಅಗತ್ಯ.',
        mainStages: ['ಸಸಿ ಬೆಳವಣಿಗೆ', 'ಗೊನೆ ಹೊರಬರುವುದು', 'ಕಾಯಿ ತುಂಬುವುದು', 'ಕಟಾವು'],
        whatToMonitor: ['ಸಿಗಟೋಕ ಎಲೆ ಮಚ್ಚೆ ರೋಗ', 'ಕಾಂಡ ಕೊರೆಯುವ ದುಂಬಿ', 'ಮರ ಉರುಳುವುದು'],
        commonPestsAndDiseases: ['ಸಿಗಟೋಕ ರೋಗ', 'ಪನಾಮ ಸೊರಗು ರೋಗ'],
        generalCare: 'ಗಾಳಿಗೆ ಮರ ಬೀಳದಂತೆ ಬಿದಿರಿನ ಆಸರೆ ಕೊಡಿ.',
        whenToContactExpert: 'ಪನಾಮಾ ರೋಗದ ಲಕ್ಷಣಗಳು ಕಂಡಾಗ ತೋಟಗಾರಿಕೆ ತಜ್ಞರ ಸಲಹೆ ಪಡೆಯಿರಿ.',
      },
      ml: {
        name: 'വാഴ (Banana)',
        localNames: ['വാഴ', 'വാഴപ്പഴം', 'നേന്ത്രൻ'],
        whatIsThis: 'കേരളത്തിലും തെന്നിന്ത്യയിലും ഉയർന്ന വരുമാനം തരുന്ന പ്രധാന വിള.',
        growingSeason: 'വർഷത്തിൽ രണ്ടു സീസൺ.',
        soilRequirements: 'നീർവാർച്ചയുള്ള എക്കൽ മണ്ണ്.',
        waterRequirements: 'ധാരാളം വെള്ളം ആവശ്യമാണ്.',
        mainStages: ['വളർച്ച', 'കുലവരവ്', 'മൂപ്പ്', 'വിളവെടുപ്പ്'],
        whatToMonitor: ['സിഗാട്ടോക്ക ഇലപ്പുള്ളി', 'തണ്ടുതുരപ്പൻ വണ്ട്'],
        commonPestsAndDiseases: ['സിഗാട്ടോക്ക', 'പനാമ വാട്ടം'],
        generalCare: 'കാറ്റിൽ ഒടിയാതിരിക്കാൻ താങ്ങ് കൊടുക്കുക.',
        whenToContactExpert: 'വാട്ടരോഗം കണ്ടാൽ കൃഷിഭവനെ അറിയിക്കുക.',
      },
      mr: {
        name: 'केळी (Banana G-9)',
        localNames: ['केळी', 'केळे'],
        whatIsThis: 'ठिबक सिंचनाखाली एकरी 35 टनांपर्यंत विक्रमी उत्पादन देणारे नगदी फळपीक.',
        growingSeason: 'जून-जुलै किंवा सप्टेंबर-ऑक्टोबर लागवड.',
        soilRequirements: 'सुपीक, उत्तम निचऱ्याची गाळाची किंवा मध्यम काळी जमीन.',
        waterRequirements: 'अतिशय जास्त (1600 मिमी). झाडाला दररोज 15-20 लీટર पाणी हवे.',
        mainStages: ['शाकीय वाढ', 'केळफूल व घड बाहेर पडणे', 'घड भरणे', 'कापणी'],
        whatToMonitor: ['सिगाटोका करपा', 'खोडकिडा', 'झाडे कोलमडणे'],
        commonPestsAndDiseases: ['सिगाटोका रोग', 'पनामा विल्ट'],
        generalCare: 'घडांच्या वजनाने झाडे पडू नयेत म्हणून बांबूचा आधार द्या. घडांना स्कर्टिंग बॅग लावा.',
        whenToContactExpert: 'झाडे पिवळी पडून खोड फाटू लागल्यास तातडीने कृषी तज्ज्ञांचा सल्ला घ्या.',
      },
    },
  },
  {
    id: 'mango',
    category: 'FRUIT',
    scientificName: 'Mangifera indica',
    iconEmoji: '🥭',
    durationDays: 365,
    waterRequirementMm: 800,
    expectedYieldPerAcre: '4 - 7 Tonnes (Bearing Orchard)',
    riskLevel: 'MEDIUM',
    suitableSeasons: ['KHARIF', 'RABI'],
    suitableSoils: ['RED_LOAMY', 'ALLUVIAL'],
    aliases: ['mango', 'aam', 'mamidi', 'mampazham', 'mavu', 'amba', 'banganapalli', 'totapuri', 'alphonso', 'మామిడి', 'మామిడికాయ', 'బంగనపల్లి', 'आम', 'மாம்பழம்', 'மாங்காய்', 'ಮಾವು', 'ಮಾವಿನಹಣ್ಣು', 'ആമ്പഴം', 'മാങ്ങ', 'आंबा'],
    stages: [
      { stageName: 'Post-Harvest Pruning & Flushing', stageNameTe: 'కొమ్మల కత్తిరింపు & చిగురు', daysRange: 'June - Aug', description: 'Canopy thinning and fresh leaf flush.', waterNeed: 'Moderate', keyAction: 'Prune criss-cross dead wood and spray Copper Oxychloride.' },
      { stageName: 'Flower Panicle Emergence', stageNameTe: 'పూత దశ', daysRange: 'Dec - Jan', description: 'Flowering panicle development.', waterNeed: 'Low', keyAction: 'Withhold irrigation to stimulate flowering; spray for mango hopper.' },
      { stageName: 'Fruit Set & Marble Stage', stageNameTe: 'గోలీ కాయ దశ', daysRange: 'Feb - March', description: 'Pea-size to marble-size fruit setting.', waterNeed: 'Moderate', keyAction: 'Spray Planofix or 13-0-45 to arrest fruit drop.' },
      { stageName: 'Harvest Maturity', stageNameTe: 'కాయ పక్వత & కోత', daysRange: 'April - May', description: 'Shoulder elevation and natural ripening.', waterNeed: 'Low', keyAction: 'Harvest with 1cm stalk using mechanical harvesters.' },
    ],
    translations: {
      en: {
        name: 'Mango (Banganapalli / Alphonso) (మామిడి / आम)',
        localNames: ['Mango', 'Aam', 'Mamidi', 'Mampazham', 'Mavu', 'Amba', 'Banganapalli'],
        whatIsThis: 'King of Fruits, India’s premier orchard crop with global export demand and decades of recurring income.',
        growingSeason: 'Perennial orchard. Flowering in Dec–Jan, harvest from April to June.',
        soilRequirements: 'Deep (2 meters+), well-drained red loamy or alluvial soils with pH 5.5–7.5. Avoid hard rocky subsoil.',
        waterRequirements: 'Moderate (600–800 mm). Stress required before flowering; regular water during fruit enlargement.',
        mainStages: ['Pruning (June–July)', 'Flowering (Dec–Jan)', 'Fruit development (Feb–March)', 'Harvest (April–June)'],
        whatToMonitor: ['Mango hopper on flower panicles', 'Powdery mildew white powder', 'Fruit fly maggots in ripe fruit', 'Fruit drop'],
        commonPestsAndDiseases: ['Mango Hopper (Amritodus atkinsoni)', 'Powdery Mildew', 'Anthracnose', 'Oriental Fruit Fly'],
        generalCare: 'Withhold irrigation during October–November to induce heavy flowering. Hang methyl eugenol fruit fly traps.',
        whenToContactExpert: 'If flower panicles turn black or hoppers excrete sticky honey-dew coating trees, consult an expert right away.',
      },
      te: {
        name: 'మామిడి (బంగనపల్లి / తోతాపురి - Mango)',
        localNames: ['మామిడి', 'మామిడికాయ', 'బంగనపల్లి', 'రసాలు', 'తోతాపురి'],
        whatIsThis: 'పండ్లలో రారాజు. ఒకసారి నాటితే దశాబ్దాల పాటు నిరంతర వార్షిక ఆదాయం ఇచ్చే తోట పంట.',
        growingSeason: 'డిసెంబర్-జనవరిలో పూత వచ్చి, ఏప్రిల్-జూన్ నాటికి పంట చేతికి వస్తుంది.',
        soilRequirements: 'లోతైన ఎర్ర నేలలు మరియు ఒండ్రు నేలలు. రాతి నేలలు మరియు మురుగు నీరు నిలిచే నేలలు పనికిరావు.',
        waterRequirements: 'మధ్యస్థం. పూతకు ముందు నీరు కట్టడం ఆపాలి; పిందె కట్టిన తర్వాత క్రమం తప్పకుండా తడులు ఇవ్వాలి.',
        mainStages: ['కొమ్మల కత్తిరింపు (జూన్-ఆగస్టు)', 'పూత దశ (డిసెంబర్-జనవరి)', 'పిందె ఊరే దశ (ఫిబ్రవరి-మార్చి)', 'కోత దశ (ఏప్రిల్-మే)'],
        whatToMonitor: ['తేనె మంచు పురుగు (హాప్పర్)', 'బూడిద తెగులు (తెల్లటి పొడి)', 'పిందె రాలడం', 'పండు ఈగ'],
        commonPestsAndDiseases: ['తేనె మంచు పురుగు (Mango Hopper)', 'బూడిద తెగులు (Powdery Mildew)', 'కాయ కుళ్ళు (Anthracnose)', 'పండు ఈగ'],
        generalCare: 'పూత దశలో తేనె మంచు పురుగు నివారణకు కాన్ఫిడార్ లేదా వేప నూనె పిచికారీ చేయండి. పండు ఈగ ట్రాప్‌లు అమర్చండి.',
        whenToContactExpert: 'పూత విపరీతంగా మాడిపోతున్నా లేదా పిందె నిలబడకుండా రాలిపోతుంటే ఉద్యానవన శాస్త్రవేత్తను సంప్రదించండి.',
      },
      hi: {
        name: 'आम (Mango - Alphonso / Dasheri)',
        localNames: ['आम', 'Aam', 'दशहरी', 'लंगड़ा', 'चौसा'],
        whatIsThis: 'फलों का राजा, भारत का गौरवशाली बागवानी फल जो दशकों तक नियमित आमदनी देता है।',
        growingSeason: 'दिसंबर-जनवरी में बौर (फूल) और अप्रैल-जून में फल तुड़ाई।',
        soilRequirements: 'गहरी, उपजाऊ दोमट या बलुई दोमट मिट्टी जिसमें जल निकास उत्तम हो।',
        waterRequirements: 'मध्यम। बौर आने से पहले सिंचाई रोकें, फल बनने पर नियमित पानी दें।',
        mainStages: ['छंटाई', 'मंजर/बौर आना (दिसंबर-जनवरी)', 'फल वृद्धि', 'तुड़ाई (मई-जून)'],
        whatToMonitor: ['भुनगा (हॉपर)', 'चूर्णिल आसिता (पाउडरी मिल्ड्यू)', 'फल मक्खी', 'फल गिरना'],
        commonPestsAndDiseases: ['आम का भुनगा (Hopper)', 'पाउडरी मिल्ड्यू', 'फल मक्खी', 'काली नोक रोग'],
        generalCare: 'बौर आने पर भुनगे से बचाव के लिए अनुशंसित कीटनाशक का छिड़काव करें। मिथाइल यूजेनॉल ट्रैप लगाएं।',
        whenToContactExpert: 'यदि बौर सूखकर काला पड़ने लगे या अत्यधिक फल झड़ने लगे तो उद्यान विशेषज्ञ से संपर्क करें।',
      },
      ta: {
        name: 'மாம்பழம் (Mango)',
        localNames: ['மாம்பழம்', 'மாங்காய்', 'மா'],
        whatIsThis: 'முக்கனிகளில் முதன்மையான பழங்களின் அரசன்.',
        growingSeason: 'டிசம்பர்-ஜனவரியில் பூத்து, ஏப்ரல்-மே மாதங்களில் அறுவடை.',
        soilRequirements: 'ஆழமான செம்மண் மற்றும் வண்டல் மண்.',
        waterRequirements: 'மிதமான நீர் தேவை.',
        mainStages: ['கவாத்து', 'பூத்தல்', 'பிஞ்சு பிடித்தல்', 'அறுவடை'],
        whatToMonitor: ['தத்துப்பூச்சி', 'சாம்பல் நோய்', 'பழ ஈ'],
        commonPestsAndDiseases: ['தத்துப்பூச்சி', 'சாம்பல் நோய்', 'பழ ஈ'],
        generalCare: 'பூக்கும் முன் நீர்ப்பாசனத்தைக் குறைக்கவும்.',
        whenToContactExpert: 'பூக்கள் கருகி உதிர்ந்தால் உடனடியாக தோட்டக்கலை வல்லுநரை அணுகவும்.',
      },
      kn: {
        name: 'ಮಾವಿನಹಣ್ಣು (Mango)',
        localNames: ['ಮಾವು', 'ಮಾವಿನಹಣ್ಣು', 'ಆಪೂಸ್', 'ಬಾದಾಮಿ'],
        whatIsThis: 'ಹಣ್ಣುಗಳ ರಾಜ. ದೀರ್ಘಕಾಲಿಕ ಲಾಭದಾಯಕ ತೋಟಗಾರಿಕಾ ಬೆಳೆ.',
        growingSeason: 'ಡಿಸೆಂಬರ್-ಜನವರಿಯಲ್ಲಿ ಹೂವು ಬಂದು, ಏಪ್ರಿಲ್-ಜೂನ್‌ನಲ್ಲಿ ಕಟಾವು.',
        soilRequirements: 'ಆಳವಾದ ಫಲವತ್ತಾದ ಕೆಂಪು ಮತ್ತು ಗೋಡು ಮಣ್ಣು.',
        waterRequirements: 'ಮಧ್ಯಮ ನೀರಾವರಿ.',
        mainStages: ['ಸವರುವಿಕೆ', 'ಹೂ ಬಿಡುವುದು', 'ಕಾಯಿ ಕಟ್ಟುವುದು', 'ಕಟಾವು'],
        whatToMonitor: ['ಜಿಗಿಹುಳು (Hopper)', 'ಬೂದಿ ರೋಗ', 'ಹಣ್ಣಿನ ನೊಣ'],
        commonPestsAndDiseases: ['ಜಿಗಿಹುಳು', 'ಬೂದಿ ರೋಗ', 'ಹಣ್ಣಿನ ನೊಣ'],
        generalCare: 'ಹೂ ಬಿಡುವ ಸಮಯದಲ್ಲಿ ಜಿಗಿಹುಳು ನಿಯಂತ್ರಣಕ್ಕೆ ಮುನ್ನೆಚ್ಚರಿಕೆ ವಹಿಸಿ.',
        whenToContactExpert: 'ಹೂವು ಕಪ್ಪಾಗಿ ಉದುರತೊಡಗಿದರೆ ಕೃಷಿ ವಿಜ್ಞಾನಿಗಳನ್ನು ಸಂಪರ್ಕಿಸಿ.',
      },
      ml: {
        name: 'മാങ്ങ / മാമ്പഴം (Mango)',
        localNames: ['മാങ്ങ', 'മാമ്പഴം'],
        whatIsThis: 'പഴങ്ങളുടെ രാജാവ്, ദീർഘകാല തോട്ടവിള.',
        growingSeason: 'ഡിസംബർ-ജനുവരിയിൽ പൂവിടുന്നു.',
        soilRequirements: 'നീർവാർച്ചയുള്ള ആഴമുള്ള മണ്ണ്.',
        waterRequirements: 'മിതമായ വെള്ളം.',
        mainStages: ['പൂവിടൽ', 'കായ് വളർച്ച', 'വിളവെടുപ്പ്'],
        whatToMonitor: ['മാങ്ങാത്തുള്ളൻ', 'ചാരരോഗം'],
        commonPestsAndDiseases: ['മാങ്ങാത്തുള്ളൻ', 'പഴീച്ച'],
        generalCare: 'പഴീച്ചക്കെണികൾ സ്ഥാപിക്കുക.',
        whenToContactExpert: 'പൂക്കൾ കരിഞ്ഞുണങ്ങിയാൽ സഹായം തേടുക.',
      },
      mr: {
        name: 'आंबा (Mango - Hapus / Alphonso)',
        localNames: ['आंबा', 'हापूस', 'पायरी'],
        whatIsThis: 'फळांचा राजा. आंतरराष्ट्रीय मागणी असलेले कोकण व महाराष्ट्रातील अत्यंत मूल्यवान पीक.',
        growingSeason: 'डिसेंबर-जानेवारीत मोहर व मार्च ते जून दरम्यान काढणी.',
        soilRequirements: 'चांगला निचरा होणारी जांभी किंवा गाळाची कसदार जमीन.',
        waterRequirements: 'मध्यम. मोहर येण्यापूर्वी पाणी तोडावे व फळधारणा झाल्यावर नियमित द्यावे.',
        mainStages: ['छाटणी', 'मोहर येणे', 'वाटाणा अवस्था', 'फळ काढणी'],
        whatToMonitor: ['तुडतुडे (हॉपर)', 'भुरी रोग', 'फळमाशी', 'फळगळ'],
        commonPestsAndDiseases: ['तुडतुडे', 'भुरी', 'फळमाशी'],
        generalCare: 'मोहराचे तुडतुड्यांपासून रक्षण करण्यासाठी वेळीच फवारणी करा. फळमाशीचे सापळे लावा.',
        whenToContactExpert: 'मोहर काळा पडून गळत असल्यास तातडीने कृषी तज्ज्ञांचा सल्ला घ्या.',
      },
    },
  },

  // -------------------------------------------------------------
  // 4. OILSEEDS & SPICES
  // -------------------------------------------------------------
  {
    id: 'groundnut',
    category: 'OILSEED',
    scientificName: 'Arachis hypogaea',
    iconEmoji: '🥜',
    durationDays: 105,
    waterRequirementMm: 450,
    expectedYieldPerAcre: '14 - 18 Quintals',
    riskLevel: 'MEDIUM',
    suitableSeasons: ['KHARIF', 'RABI'],
    suitableSoils: ['RED_LOAMY', 'SANDY_LOAM'],
    aliases: ['groundnut', 'ground nut', 'peanut', 'peanuts', 'verusanaga', 'pallilu', 'mungfali', 'nilakkadalai', 'kadalekayi', 'nilakkadala', 'bhuimug', 'వేరుశనగ', 'పల్లీలు', 'శనక్కాయలు', 'मूंगफली', 'நிலக்கடலை', 'வேர்க்கடலை', 'ಕಡಲೆಕಾಯಿ', 'നിലക്കടല', 'भुईमूग'],
    stages: [
      { stageName: 'Vegetative & Branching', stageNameTe: 'ఎదుగుదల దశ', daysRange: '1 - 30 Days', description: 'Early root nodules and lateral canopy spread.', waterNeed: 'Moderate', keyAction: 'Control collar rot with seed treatment and weed early.' },
      { stageName: 'Flowering & Pegging', stageNameTe: 'పూత & ఊడల దశ', daysRange: '35 - 55 Days', description: 'Yellow flowers penetrate soil via pegs to form pods.', waterNeed: 'Critical', keyAction: 'Apply Gypsum @ 200 kg/acre and do not disturb soil after pegging.' },
      { stageName: 'Pod Formation & Filling', stageNameTe: 'కాయ ఊరే దశ', daysRange: '60 - 90 Days', description: 'Subterranean pods swell and develop kernels.', waterNeed: 'Critical', keyAction: 'Maintain soil moisture so pods do not pop.' },
      { stageName: 'Harvest Maturity', stageNameTe: 'పక్వత & తవ్వకం', daysRange: '95 - 105 Days', description: 'Inner shell turns dark brown/black.', waterNeed: 'Low', keyAction: 'Irrigate lightly before harvesting to pull pods without breaking.' },
    ],
    translations: {
      en: {
        name: 'Groundnut / Peanut (వేరుశనగ / मूंगफली)',
        localNames: ['Groundnut', 'Peanut', 'Mungfali', 'Verusanaga', 'Nilakkadalai', 'Kadalekayi', 'Bhuimug'],
        whatIsThis: 'Major oilseed legume that enriches soil fertility via nitrogen fixation and provides high returns in light soils.',
        growingSeason: 'Kharif (rainfed) and Rabi (irrigated). Best suited for Rayalaseema, Telangana, and Gujarat drylands.',
        soilRequirements: 'Light, well-drained sandy loam or red sandy soil with loose texture for easy peg penetration.',
        waterRequirements: 'Moderate (400–450 mm). Moisture at pegging (35–55 d) and pod filling (60–80 d) is critical.',
        mainStages: ['Vegetative (0–30 d)', 'Flowering & Pegging (35–55 d)', 'Pod filling (60–90 d)', 'Maturity (95–105 d)'],
        whatToMonitor: ['Tikka leaf spot brown concentric rings', 'Peg penetration status', 'Spodoptera caterpillar', 'Collar rot'],
        commonPestsAndDiseases: ['Tikka Leaf Spot (Cercospora)', 'Collar Rot', 'Tobacco Caterpillar (Spodoptera)', 'Rust'],
        generalCare: 'Apply 200 kg Gypsum per acre at 45 days. Calcium ensures bold, well-filled pods without empty shells (pops).',
        whenToContactExpert: 'If plants rot at ground level with white fungal threads or leaves shed rapidly from tikka spots, call an agronomist.',
      },
      te: {
        name: 'వేరుశనగ (ధరణి / K-6 Groundnut)',
        localNames: ['వేరుశనగ', 'పల్లీలు', 'శనక్కాయలు', 'వేరుశెనగ'],
        whatIsThis: 'ఎర్ర నేలలు, ఇసుక నేలల్లో అతి తక్కువ సమయంలో అద్భుతమైన ఆదాయం మరియు నూనె ఇచ్చే ప్రధాన నూనెగింజల పంట.',
        growingSeason: 'ఖరీఫ్ మరియు రబీ కాలాలు. రబీలో బోరు బావుల కింద రికార్డు స్థాయి దిగుబడి వస్తుంది.',
        soilRequirements: 'తేలికపాటి ఎర్ర నేలలు, ఇసుక రేగడి నేలలు. నేల గుల్లగా ఉంటే ఊడలు సులభంగా లోపలికి దిగుతాయి.',
        waterRequirements: 'మధ్యస్థం (400-450 మి.మీ). పూత, ఊడ దిగే దశ మరియు కాయ ఊరే దశల్లో తడి తప్పనిసరి.',
        mainStages: ['మొలక & కొమ్మలు (1-30 రోజులు)', 'పూత & ఊడ దిగే దశ (35-55 రోజులు)', 'కాయ కట్టే దశ (60-90 రోజులు)', 'పక్వత & తవ్వకం (95-105 రోజులు)'],
        whatToMonitor: ['తిక్కా ఆకుమచ్చ తెగులు', 'ఊడలు నేలలోకి దిగడం', 'లద్దె పురుగు', 'బోలు కాయలు (కాల్షియం లోపం)'],
        commonPestsAndDiseases: ['తిక్కా ఆకుమచ్చ తెగులు (Tikka Leaf Spot)', 'కాండం కుళ్ళు తెగులు', 'లద్దె పురుగు', 'తుప్పు తెగులు'],
        generalCare: 'విత్తిన 40-45వ రోజు ఎకరానికి 200 కిలోల జిప్సం తప్పనిసరిగా వేయండి. జిప్సం వల్ల కాయలు లావుగా, గింజ బరువుగా వస్తాయి.',
        whenToContactExpert: 'ఆకులపై నల్లటి గుండ్రని మచ్చలు వచ్చి ఆకులు రాలిపోతుంటే (తిక్కా తెగులు) వెంటనే సలహా తీసుకోండి.',
      },
      hi: {
        name: 'मूंगफली (Groundnut / Peanut)',
        localNames: ['मूंगफली', 'Peanut', 'Mungfali'],
        whatIsThis: 'हल्की व बलुई मिट्टी के लिए वरदान साबित होने वाली प्रमुख तिलहनी व दलहनी फसल।',
        growingSeason: 'खरीफ और रबी (जायद)।',
        soilRequirements: 'भुरभुरी, अच्छे निकास वाली बलुई दोमट या लाल मिट्टी।',
        waterRequirements: 'मध्यम (400-450 मिमी)। सूइयां (Pegs) बनते समय पानी की कमी न हो।',
        mainStages: ['वानस्पतिक वृद्धि', 'फूल व सूइयां बनना (35-50 दिन)', 'फलियां भरना', 'खुदाई'],
        whatToMonitor: ['टिक्का रोग', 'तंबाकू इल्ली', 'कालर रोट'],
        commonPestsAndDiseases: ['टिक्का पर्ण चित्ती रोग', 'कालर रोट', 'दीमक'],
        generalCare: 'बुवाई के 40-45 दिन बाद 200 किग्रा जिप्सम प्रति एकड़ डालें ताकि दाने भरे-पूरे बनें।',
        whenToContactExpert: 'पत्तियों पर गोल काले धब्बे बनकर गिरने लगें तो तुरंत फफूंदनाशक छिड़कने की सलाह लें।',
      },
      ta: {
        name: 'நிலக்கடலை (Groundnut / Peanut)',
        localNames: ['நிலக்கடலை', 'வேர்க்கடலை', 'மணிலா'],
        whatIsThis: 'மண்ணின் வளத்தைக் கூட்டி அதிக எண்ணெய் சத்து தரும் முக்கிய எண்ணெய் வித்து.',
        growingSeason: 'காரிஃப் மற்றும் ரபி பருவம்.',
        soilRequirements: 'மணற்பாங்கான செம்மண்.',
        waterRequirements: 'மிதமான நீர் (450 மி.மீ).',
        mainStages: ['வளர்ச்சி', 'விழுது இறங்குதல்', 'காய் பருத்தல்', 'அறுவடை'],
        whatToMonitor: ['திக்கா இலைப்புள்ளி', 'சுருள் பூச்சி'],
        commonPestsAndDiseases: ['திக்கா நோய்', 'சுருள் பூச்சி'],
        generalCare: '45 ஆம் நாளில் ஜிப்சம் ஏக்கருக்கு 200 கிலோ இடவும்.',
        whenToContactExpert: 'திக்கா நோய் தென்பட்டால் வேளாண் அலுவலரை அணுகவும்.',
      },
      kn: {
        name: 'ಕಡಲೆಕಾಯಿ (Groundnut / Peanut)',
        localNames: ['ಕಡಲೆಕಾಯಿ', 'ನೆಲಗಡಲೆ'],
        whatIsThis: 'ಲಘು ಮಣ್ಣಿನಲ್ಲಿ ಅಧಿಕ ಆದಾಯ ನೀಡುವ ಪ್ರಮುಖ ಎಣ್ಣೆಕಾಳು ಬೆಳೆ.',
        growingSeason: 'ಖಾರೀಫ್ ಮತ್ತು ರಬಿ.',
        soilRequirements: 'ಉಸುಕು ಮಿಶ್ರಿತ ಕೆಂಪು ಮಣ್ಣು.',
        waterRequirements: 'ಮಧ್ಯಮ (450 ಮಿ.ಮೀ). ಕಾಯಿಕಟ್ಟುವ ಹಂತದಲ್ಲಿ ತೇವಾಂಶ ಅಗತ್ಯ.',
        mainStages: ['ಬೆಳವಣಿಗೆ', 'ಕಡ್ಡಿ ಇಳಿಯುವ ಹಂತ', 'ಕಾಯಿ ತುಂಬುವುದು', 'ಕಟಾವು'],
        whatToMonitor: ['ತಿಕ್ಕಾ ಎಲೆಮಚ್ಚೆ ರೋಗ', 'ಕಾಂಡ ಕೊಳೆತ'],
        commonPestsAndDiseases: ['ತಿಕ್ಕಾ ರೋಗ', 'ಕಾಂಡ ಕೊಳೆತ'],
        generalCare: '45 ನೇ ದಿನಕ್ಕೆ ಎಕರೆಗೆ 200 ಕೆಜಿ ಜಿಪ್ಸಮ್ ಹಾಕಿ.',
        whenToContactExpert: 'ಎಲೆ ಉದುರುವಿಕೆ ಹೆಚ್ಚಾದರೆ ಕೃಷಿ ವಿಜ್ಞಾನಿಗಳನ್ನು ಸಂಪರ್ಕಿಸಿ.',
      },
      ml: {
        name: 'നിലക്കടല (Groundnut / Peanut)',
        localNames: ['നിലക്കടല', 'കപ്പലണ്ടി'],
        whatIsThis: 'മണ്ണിലെ നൈട്രജൻ വർദ്ധിപ്പിക്കുന്ന പ്രധാന എണ്ണക്കുരു.',
        growingSeason: 'മഴക്കാലത്തും വേനലിലും കൃഷി ചെയ്യാം.',
        soilRequirements: 'മണൽ കലർന്ന പശിമരാശി മണ്ണ്.',
        waterRequirements: 'മിതമായ വെള്ളം.',
        mainStages: ['വളർച്ച', 'കായ്പിടുത്തം', 'വിളവെടുപ്പ്'],
        whatToMonitor: ['ഇലപ്പുള്ളി രോഗം'],
        commonPestsAndDiseases: ['ടിക്ക രോഗം'],
        generalCare: 'ജിപ്സം പ്രയോഗം നടത്തുക.',
        whenToContactExpert: 'രോഗബാധയുണ്ടായാൽ കൃഷിഭവനെ ബന്ധപ്പെടുക.',
      },
      mr: {
        name: 'भुईमूग (Groundnut / Peanut)',
        localNames: ['भुईमूग', 'शेंगदाणा'],
        whatIsThis: 'हलक्या व मध्यम जमिनीत भरघोस उत्पादन व तेल देणारे प्रमुख गळीतधान्य पीक.',
        growingSeason: 'खरीप व उन्हाळी (रब्बी).',
        soilRequirements: 'भुसभुशीत, उत्तम निचरा होणारी वाळूमिश्रित किंवा लाल जमीन.',
        waterRequirements: 'मध्यम (450 मिमी). आऱ्या जमिनीत जाताना पाणी अत्यंत आवश्यक.',
        mainStages: ['वाढ', 'फुलोरा व आऱ्या सुटणे', 'शेंगा भरणे', 'काढणी'],
        whatToMonitor: ['टिक्का रोग', 'तंबाखूची पाने खाणारी अळी', 'पोचट शेंगा'],
        commonPestsAndDiseases: ['टिक्का करपा', 'खोडकुज', 'तांबेरा'],
        generalCare: 'लागवडीनंतर 40-45 दिवसांनी एकरी 200 किलो जिप्सम द्यावे, ज्यामुळे शेंगा टपोऱ्या भरतात.',
        whenToContactExpert: 'पानांवर काळे डाग पडून पाने गळू लागल्यास कृषी तज्ज्ञांचा सल्ला घ्या.',
      },
    },
  },
  {
    id: 'chilli',
    category: 'SPICE',
    scientificName: 'Capsicum annuum',
    iconEmoji: '🌶️',
    durationDays: 180,
    waterRequirementMm: 650,
    expectedYieldPerAcre: '25 - 35 Quintals (Dry)',
    riskLevel: 'HIGH',
    suitableSeasons: ['KHARIF', 'RABI'],
    suitableSoils: ['BLACK_COTTON', 'RED_LOAMY', 'ALLUVIAL'],
    aliases: ['chilli', 'chili', 'mirchi', 'teja chilli', 'green chilli', 'red chilli', 'milagai', 'menasinakayi', 'mulaku', 'mirchi', 'మిరప', 'తేజా మిర్చి', 'పచ్చిమిర్చి', 'మిరపకాయలు', 'मिर्च', 'हरी मिर्च', 'लाल मिर्च', 'மிளகாய்', 'ಹಸಿರು ಮೆಣಸಿನಕಾಯಿ', 'ಮೆಣಸಿನಕಾಯಿ', 'പച്ചമുളക്', 'മുളക്', 'मिरची'],
    stages: [
      { stageName: 'Nursery & Field Planting', stageNameTe: 'నర్సరీ & నాట్లు', daysRange: '1 - 35 Days', description: 'Transplant sturdy 35-day seedlings into ridges and furrows.', waterNeed: 'Moderate', keyAction: 'Apply neem cake and mycorrhiza in basal furrows.' },
      { stageName: 'Vegetative & Branching', stageNameTe: 'శాఖీయ దశ', daysRange: '36 - 65 Days', description: 'Canopy development and early bud initiation.', waterNeed: 'Moderate', keyAction: 'Install 40 blue sticky traps/acre for Black Thrips.' },
      { stageName: 'Flowering & Fruit Set', stageNameTe: 'పూత & కాయ దశ', daysRange: '70 - 120 Days', description: 'Intensive flowering; highly susceptible to flower drop from thrips.', waterNeed: 'Critical', keyAction: 'Spray Spinetoram or Broflanilide early morning for thrips control.' },
      { stageName: 'Multiple Pickings', stageNameTe: 'కోతల దశ', daysRange: '125 - 180 Days', description: 'Pick green chillies or mature red chillies for drying.', waterNeed: 'Moderate', keyAction: 'Solar dry red pods to 10% moisture on polythene sheets.' },
    ],
    translations: {
      en: {
        name: 'Chilli (Teja / Guntur) (మిరప / मिर्च)',
        localNames: ['Chilli', 'Mirchi', 'Teja Chilli', 'Guntur Sannam', 'Milagai', 'Menasina'],
        whatIsThis: 'High-value commercial spice; highest investment and highest profit potential when protected from thrips.',
        growingSeason: 'Kharif (July–Dec) and Rabi (Sept–March). Flourishes in Andhra Pradesh and Telangana black cotton soils.',
        soilRequirements: 'Well-drained black cotton, red loamy, or alluvial soils rich in organic matter. Stagnant water causes quick root wilt.',
        waterRequirements: 'Moderate to High (600–700 mm). Drip irrigation with fertigation gives 30% higher dry pod yield.',
        mainStages: ['Transplanting (0–35 d)', 'Vegetative (35–65 d)', 'Flowering & Fruit set (70–120 d)', 'Pickings (120–180 d)'],
        whatToMonitor: ['Upward boat-like curling (Black Thrips)', 'Downward curling (Mites)', 'Flower drop', 'Dieback fruit rot'],
        commonPestsAndDiseases: ['Black Thrips (Scirtothrips dorsalis)', 'Yellow Mites', 'Anthracnose Fruit Rot', 'Chilli Leaf Curl Virus'],
        generalCare: 'Erect 40 blue sticky traps and 20 yellow sticky traps per acre immediately after planting. Spray strictly in early morning.',
        whenToContactExpert: 'If leaves curl upwards into boat shapes and flower buds drop rapidly, consult an expert for rotation insecticide schedules.',
      },
      te: {
        name: 'మిర్చి (తేజా మిర్చి / గుంటూరు మిరప)',
        localNames: ['మిర్చి', 'తేజా మిర్చి', 'గుంటూరు సన్నం', 'పచ్చిమిర్చి', 'ఎండుమిర్చి'],
        whatIsThis: 'అత్యధిక లాభాలు తెచ్చిపెట్టే వాణిజ్య సుగంధ ద్రవ్య పంట. తామర పురుగులను సమర్థవంతంగా అరికడితే ఎకరానికి లక్షల్లో ఆదాయం.',
        growingSeason: 'ఖరీఫ్ మరియు రబీ కాలాలు. గుంటూరు, ప్రకాశం, ఖమ్మం, వరంగల్ నల్లరేగడి నేలల్లో అద్భుతంగా పండుతుంది.',
        soilRequirements: 'నల్లరేగడి నేలలు, ఎర్ర నేలలు. మురుగు నీరు పోయే సదుపాయం తప్పనిసరి. నీరు నిలిస్తే వేరుకుళ్ళు వస్తుంది.',
        waterRequirements: 'మధ్యస్థం (600-700 మి.మీ). డ్రిప్ విధానం ద్వారా ఎరువులు ఇస్తే అధిక దిగుబడి లభిస్తుంది.',
        mainStages: ['నర్సరీ & నాట్లు (1-35 రోజులు)', 'శాఖీయ దశ (36-65 రోజులు)', 'పూత & పిందె దశ (70-120 రోజులు)', 'కోతల దశ (125-180 రోజులు)'],
        whatToMonitor: ['ఆకులు పైకి ముడుచుకోవడం (నల్ల తామర పురుగులు)', 'ఆకులు కిందకి ముడుచుకోవడం (నల్లి)', 'పూత రాలడం', 'కొమ్మ ఎండు తెగులు'],
        commonPestsAndDiseases: ['నల్ల తామర పురుగు (Black Thrips)', 'ఎర్ర నల్లి (Mites)', 'కొమ్మ ఎండు తెగులు / కాయ కుళ్ళు (Anthracnose)', 'జెమిని వైరస్'],
        generalCare: 'ఎకరానికి 40 నీలి రంగు మరియు 20 పసుపు రంగు జిగురు అట్టలను నాటిన వెంటనే పెట్టండి. పురుగు మందులను ఉదయం 7-10 గంటల మధ్యే పిచికారీ చేయండి.',
        whenToContactExpert: 'నల్ల తామర పురుగుల వల్ల పూత మొత్తం రాలిపోతూ ఉంటే వ్యవసాయ శాస్త్రవేత్తను సంప్రదించి కాంబినేషన్ మందులను పిచికారీ చేయండి.',
      },
      hi: {
        name: 'मिर्च (Teja / Guntur Chilli)',
        localNames: ['मिर्च', 'हरी मिर्च', 'लाल मिर्च', 'तीखी मिर्च'],
        whatIsThis: 'उच्च मूल्य वाली वाणिज्यिक मसाला फसल जो थ्रिप्स नियंत्रण रहने पर रिकॉर्ड तोड़ मुनाफा देती है।',
        growingSeason: 'खरीफ और रबी। काली व दोमट मिट्टी में सबसे बेहतरीन परिणाम।',
        soilRequirements: 'उत्तम जल निकास वाली काली या भारी दोमट मिट्टी। जलभराव से जड़ गलन होती है।',
        waterRequirements: 'मध्यम (650 मिमी)। ड्रिप फर्टिगेशन से 30% अधिक पैदावार होती है।',
        mainStages: ['रोपाई (1-35 दिन)', 'शाखाएं निकलना', 'फूल व फल बनना', 'तुड़ाई (120-180 दिन)'],
        whatToMonitor: ['पत्तियों का नाव की तरह ऊपर मुड़ना (थ्रिप्स)', 'फूलों का गिरना', 'फल सड़न'],
        commonPestsAndDiseases: ['काला थ्रिप्स (Black Thrips)', 'मकड़ी (Mites)', 'फल सड़न (Anthracnose)', 'पत्ती मरोड़ वायरस'],
        generalCare: 'प्रति एकड़ 40 नीले चिपचिपे ट्रैप लगाएं। सुबह के समय ही कीटनाशक का छिड़काव करें।',
        whenToContactExpert: 'यदि थ्रिप्स के कारण फूल भारी संख्या में झड़ने लगें, तो तुरंत कृषि विशेषज्ञ से संपर्क करें।',
      },
      ta: {
        name: 'மிளகாய் (Chilli - Guntur / Teja)',
        localNames: ['மிளகாய்', 'பச்சை மிளகாய்', 'வற்றல்'],
        whatIsThis: 'அதிக லாபம் தரும் முக்கிய பணப்பயிர்.',
        growingSeason: 'காரிஃப் மற்றும் ரபி.',
        soilRequirements: 'வடிகால் வசதியுள்ள கரிசல் மற்றும் செம்மண்.',
        waterRequirements: 'மிதமான நீர் (650 மி.மீ).',
        mainStages: ['நாற்று நடுதல்', 'வளர்ச்சி', 'பூத்தல்', 'அறுவடை'],
        whatToMonitor: ['இலைப்பேன் (Thrips)', 'இலைச் சுருட்டை', 'பூ உதிர்தல்'],
        commonPestsAndDiseases: ['கருப்பு இலைப்பேன்', 'செம்பேன்', 'காய் அழுகல்'],
        generalCare: 'ஏக்கருக்கு 40 நீல நிற ஒட்டும் பொறிகளைப் பயன்படுத்தவும்.',
        whenToContactExpert: 'இலைப்பேன் தாக்குதலால் பூக்கள் உதிர்ந்தால் உடனடியாக வல்லுநரை அணுகவும்.',
      },
      kn: {
        name: 'ಮೆಣಸಿನಕಾಯಿ (Chilli - Byadagi / Guntur)',
        localNames: ['ಮೆಣಸಿನಕಾಯಿ', 'ಹಸಿರು ಮೆಣಸಿನಕಾಯಿ', 'ಬ್ಯಾಡಗಿ ಮೆಣಸಿನಕಾಯಿ'],
        whatIsThis: 'ಅತ್ಯಧಿಕ ಲಾಭ ತಂದುಕೊಡುವ ಪ್ರಮುಖ ವಾಣಿಜ್ಯ ಸಾಂಬಾರ ಬೆಳೆ.',
        growingSeason: 'ಖಾರೀಫ್ ಮತ್ತು ರಬಿ.',
        soilRequirements: 'ಕಪ್ಪು ಹತ್ತಿ ಮಣ್ಣು ಮತ್ತು ಗೋಡು ಮಣ್ಣು.',
        waterRequirements: 'ಮಧ್ಯಮ (650 ಮಿ.ಮೀ).',
        mainStages: ['ನಾಟಿ ಹಂತ', 'ಕವಲೊಡೆಯುವುದು', 'ಹೂ ಬಿಡುವುದು', 'ಕಟಾವು'],
        whatToMonitor: ['ಕಪ್ಪು ನುಸಿ (Black Thrips)', 'ಎಲೆ ಮುರುಟು ರೋಗ', 'ಹೂವು ಉದುರುವುದು'],
        commonPestsAndDiseases: ['ಕಪ್ಪು ನುಸಿ', 'ಹೇನು', 'ಕಾಯಿ ಕೊಳೆತ ರೋಗ'],
        generalCare: 'ಎಕರೆಗೆ 40 ನೀಲಿ ಜಿಗುಟು ಬಲೆಗಳನ್ನು ಅಳವಡಿಸಿ. ಬೆಳಗ್ಗೆ ಮಾತ್ರ ಸಿಂಪಡಣೆ ಮಾಡಿ.',
        whenToContactExpert: 'ಕಪ್ಪು ನುಸಿ ಬಾಧೆಯಿಂದ ಹೂವು ಉದುರಿದರೆ ತಜ್ಞರನ್ನು ಸಂಪರ್ಕಿಸಿ.',
      },
      ml: {
        name: 'മുളക് / പച്ചമുളക് (Chilli)',
        localNames: ['മുളക്', 'പച്ചമുളക്', 'കാന്താരി'],
        whatIsThis: 'വിപണിയിൽ നല്ല വില ലഭിക്കുന്ന സുഗന്ധവ്യഞ്ജന വിള.',
        growingSeason: 'വർഷത്തിൽ രണ്ടു സീസൺ.',
        soilRequirements: 'നീർവാർച്ചയുള്ള മണ്ണ്.',
        waterRequirements: 'മിതമായ വെള്ളം.',
        mainStages: ['നടീൽ', 'വളർച്ച', 'പൂവിടൽ', 'വിളവെടുപ്പ്'],
        whatToMonitor: ['ഇലപ്പേൻ', 'ഇലച്ചുരുൾ', 'പൂ കൊഴിച്ചിൽ'],
        commonPestsAndDiseases: ['ഇലപ്പേൻ (Thrips)', 'കായചീയൽ'],
        generalCare: 'നീലക്കെണികൾ സ്ഥാപിക്കുക.',
        whenToContactExpert: 'ഇലപ്പേൻ ആക്രമണം രൂക്ഷമായാൽ വിദഗ്ദ്ധോപദേശം തേടുക.',
      },
      mr: {
        name: 'मिरची (Chilli - Guntur / Teja)',
        localNames: ['मिरची', 'हिरवी मिरची', 'लाल मिरची'],
        whatIsThis: 'थ्रिप्सचे योग्य व्यवस्थापन केल्यास लाखो रुपयांचा विक्रमी नफा देणारे नगदी पीक.',
        growingSeason: 'खरीप व रब्बी हंगाम.',
        soilRequirements: 'पाण्याचा उत्तम निचरा होणारी काळी कसदार किंवा पोयट्याची जमीन.',
        waterRequirements: 'मध्यम (650 मिमी). ठिबक सिंचनाने अधिक उत्पादन मिळते.',
        mainStages: ['पुनर्लागवड', 'शाकीय वाढ', 'फुलोरा व फळधारणा', 'तोडणी'],
        whatToMonitor: ['काळा थ्रिप्स (पाने वरच्या बाजूला वळणे)', 'लाल कोळी', 'फुलगळ', 'फळसड'],
        commonPestsAndDiseases: ['काळा थ्रिप्स (Black Thrips)', 'लाल कोळी', 'फळसड (Anthracnose)'],
        generalCare: 'एकरी 40 निळे चिकट सापळे लावा. फवारणी नेहमी सकाळी 7 ते 10 दरम्यानच करा.',
        whenToContactExpert: 'थ्रिप्समुळे फुलगळ वाढल्यास तातडीने कृषी तज्ज्ञांचा सल्ला घ्या.',
      },
    },
  },
];

// In-memory scalable store for runtime added crops & favorites
let inMemoryCrops: CropEntity[] = [
  ...initialCropDatabase,
  ...additionalCropsList,
  ...moreFruitsAndSpicesList,
];
let inMemoryFavorites: { [farmerId: string]: string[] } = {
  'usr-101': ['chilli', 'paddy', 'tomato'],
};
let inMemoryRecentSearches: { [farmerId: string]: string[] } = {
  'usr-101': ['chilli', 'brinjal', 'fertilizer', 'soil test'],
};

// =================================================================
// REPOSITORIES & SCALABLE CROP SERVICES
// =================================================================

export function getAllCrops(): CropEntity[] {
  return inMemoryCrops;
}

export function getCropById(cropId: string): CropEntity | undefined {
  const normId = cropId.trim().toLowerCase();
  return inMemoryCrops.find((c) => c.id.toLowerCase() === normId);
}

export function getCropsByCategory(category: CropCategory): CropEntity[] {
  return inMemoryCrops.filter((c) => c.category === category);
}

export function addCustomCrop(crop: CropEntity): boolean {
  if (inMemoryCrops.some((c) => c.id.toLowerCase() === crop.id.toLowerCase())) {
    return false; // already exists
  }
  inMemoryCrops.unshift({ ...crop, isCustomAdded: true, createdAt: new Date().toISOString() });
  return true;
}

export function getFarmerFavoriteCropIds(farmerId: string = 'usr-101'): string[] {
  return inMemoryFavorites[farmerId] || [];
}

export function toggleFarmerFavorite(cropId: string, farmerId: string = 'usr-101'): boolean {
  if (!inMemoryFavorites[farmerId]) {
    inMemoryFavorites[farmerId] = [];
  }
  const index = inMemoryFavorites[farmerId].indexOf(cropId);
  if (index > -1) {
    inMemoryFavorites[farmerId].splice(index, 1);
    return false; // un-favorited
  } else {
    inMemoryFavorites[farmerId].push(cropId);
    return true; // favorited
  }
}

export function getFarmerRecentSearches(farmerId: string = 'usr-101'): string[] {
  return inMemoryRecentSearches[farmerId] || [];
}

export function addFarmerRecentSearch(query: string, farmerId: string = 'usr-101'): void {
  if (!query || query.trim().length < 2) return;
  const cleanQ = query.trim();
  if (!inMemoryRecentSearches[farmerId]) {
    inMemoryRecentSearches[farmerId] = [];
  }
  // remove if already in list to put at top
  inMemoryRecentSearches[farmerId] = inMemoryRecentSearches[farmerId].filter(
    (q) => q.toLowerCase() !== cleanQ.toLowerCase()
  );
  inMemoryRecentSearches[farmerId].unshift(cleanQ);
  // limit to 8 recent searches
  if (inMemoryRecentSearches[farmerId].length > 8) {
    inMemoryRecentSearches[farmerId].pop();
  }
}

export function clearFarmerRecentSearches(farmerId: string = 'usr-101'): void {
  inMemoryRecentSearches[farmerId] = [];
}

// =================================================================
// INTELLIGENT ALIAS & SPELLING NORMALIZER
// =================================================================

export function normalizeCropQuery(query: string): string {
  return query
    .trim()
    .toLowerCase()
    .replace(/[?,.!]/g, '')
    .replace(/\s+/g, ' ');
}

export function searchCropDatabase(query: string, language: Language = 'te'): {
  matches: Array<CropEntity & { matchedAlias?: string }>;
  isQuestion: boolean;
} {
  const normalized = normalizeCropQuery(query);
  if (!normalized) {
    return { matches: inMemoryCrops, isQuestion: false };
  }

  // Question intent detector
  const isQuestion =
    query.includes('?') ||
    ['why', 'how', 'when', 'what', 'should', 'tell me', 'ఎందుకు', 'ఎప్పుడు', 'ఎలా', 'ఏమి', 'గురించి', 'చెప్పండి', 'क्यों', 'कब', 'कैसे', 'बताओ', 'என்ன', 'எப்படி', 'ಯಾವಾಗ', 'ಹೇಗೆ'].some((w) => normalized.includes(w));

  const matchedCrops: Array<CropEntity & { matchedAlias?: string }> = [];

  for (const crop of inMemoryCrops) {
    let matched = false;
    let matchedAlias: string | undefined = undefined;

    // 1. Direct ID match
    if (crop.id.toLowerCase().includes(normalized)) {
      matched = true;
    }

    // 2. Scientific name match
    if (crop.scientificName.toLowerCase().includes(normalized)) {
      matched = true;
    }

    // 3. Category match
    if (crop.category.toLowerCase() === normalized) {
      matched = true;
    }

    // 4. Aliases and synonyms check
    for (const alias of crop.aliases) {
      const normAlias = alias.toLowerCase();
      if (normAlias.includes(normalized) || normalized.includes(normAlias)) {
        matched = true;
        matchedAlias = alias;
        break;
      }
    }

    // 5. Localized name check
    const trans = crop.translations[language] || crop.translations.en;
    if (trans.name.toLowerCase().includes(normalized)) {
      matched = true;
    }
    for (const localName of trans.localNames) {
      if (localName.toLowerCase().includes(normalized)) {
        matched = true;
        matchedAlias = localName;
        break;
      }
    }

    if (matched) {
      matchedCrops.push({ ...crop, matchedAlias });
    }
  }

  return { matches: matchedCrops, isQuestion };
}
