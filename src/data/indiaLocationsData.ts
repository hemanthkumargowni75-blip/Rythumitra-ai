import { StateUT, District, SubDistrict, Village } from '@/types/location';

export const INDIA_STATES_AND_UTS: StateUT[] = [
  // ---------------------------------------------------------------------------
  // 28 STATES
  // ---------------------------------------------------------------------------
  {
    code: 'IN-AP',
    lgdCode: 28,
    name: 'Andhra Pradesh',
    type: 'STATE',
    subDistrictTerminology: 'MANDAL',
    terminologyLabel: {
      en: 'Mandal',
      te: 'మండలం',
      hi: 'मंडल',
      ta: 'மண்டலம்',
      kn: 'ಮಂಡಲ',
      ml: 'മണ്ഡലം',
      mr: 'मंडळ',
    },
    translations: {
      te: 'ఆంధ్ర ప్రదేశ్',
      hi: 'आंध्र प्रदेश',
      ta: 'ஆந்திரப் பிரதேசம்',
      kn: 'ಆಂಧ್ರ ಪ್ರದೇಶ',
      ml: 'ആന്ധ്രാപ്രദേശ്',
      mr: 'आंध्र प्रदेश',
      en: 'Andhra Pradesh',
    },
    capital: 'Amaravati',
    totalDistricts: 26,
  },
  {
    code: 'IN-TG',
    lgdCode: 36,
    name: 'Telangana',
    type: 'STATE',
    subDistrictTerminology: 'MANDAL',
    terminologyLabel: {
      en: 'Mandal',
      te: 'మండలం',
      hi: 'मंडल',
      ta: 'மண்டலம்',
      kn: 'ಮಂಡಲ',
      ml: 'മണ്ഡലം',
      mr: 'मंडळ',
    },
    translations: {
      te: 'తెలంగాణ',
      hi: 'तेलंगाना',
      ta: 'தெலுங்கானா',
      kn: 'ತೆಲಂಗಾಣ',
      ml: 'തെലങ്കാന',
      mr: 'तेलंगणा',
      en: 'Telangana',
    },
    capital: 'Hyderabad',
    totalDistricts: 33,
  },
  {
    code: 'IN-KA',
    lgdCode: 29,
    name: 'Karnataka',
    type: 'STATE',
    subDistrictTerminology: 'TALUK',
    terminologyLabel: {
      en: 'Taluk',
      kn: 'ತಾಲೂಕು',
      te: 'తాలూకా',
      hi: 'तालुक',
      ta: 'வட்டம் (Taluk)',
      ml: 'താലൂക്ക്',
      mr: 'तालुका',
    },
    translations: {
      kn: 'ಕರ್ನಾಟಕ',
      te: 'కర్ణాటక',
      hi: 'कर्नाटक',
      ta: 'கர்நாடகா',
      ml: 'കർണാടക',
      mr: 'कर्नाटक',
      en: 'Karnataka',
    },
    capital: 'Bengaluru',
    totalDistricts: 31,
  },
  {
    code: 'IN-TN',
    lgdCode: 33,
    name: 'Tamil Nadu',
    type: 'STATE',
    subDistrictTerminology: 'TALUK',
    terminologyLabel: {
      en: 'Taluk',
      ta: 'வட்டம் (Taluk)',
      te: 'తాలూకా',
      hi: 'तालुक',
      kn: 'ತಾಲೂಕು',
      ml: 'താലൂക്ക്',
      mr: 'तालुका',
    },
    translations: {
      ta: 'தமிழ்நாடு',
      te: 'తమిళనాడు',
      hi: 'तमिलनाडु',
      kn: 'ತಮಿಳುನಾಡು',
      ml: 'തമിഴ്നാട്',
      mr: 'तमिळनाडू',
      en: 'Tamil Nadu',
    },
    capital: 'Chennai',
    totalDistricts: 38,
  },
  {
    code: 'IN-KL',
    lgdCode: 32,
    name: 'Kerala',
    type: 'STATE',
    subDistrictTerminology: 'TALUK',
    terminologyLabel: {
      en: 'Taluk',
      ml: 'താലൂക്ക്',
      te: 'తాలూకా',
      hi: 'तालुक',
      ta: 'வட்டம்',
      kn: 'ತಾಲೂಕು',
      mr: 'तालुका',
    },
    translations: {
      ml: 'കേരളം',
      te: 'కేరళ',
      hi: 'केरल',
      ta: 'கேரளா',
      kn: 'ಕೇರಳ',
      mr: 'केरळ',
      en: 'Kerala',
    },
    capital: 'Thiruvananthapuram',
    totalDistricts: 14,
  },
  {
    code: 'IN-MH',
    lgdCode: 27,
    name: 'Maharashtra',
    type: 'STATE',
    subDistrictTerminology: 'TALUKA',
    terminologyLabel: {
      en: 'Taluka',
      mr: 'तालुका',
      hi: 'तालुका',
      te: 'తాలూకా',
      kn: 'ತಾಲೂಕು',
      ta: 'வட்டம்',
      ml: 'താലൂക്ക്',
    },
    translations: {
      mr: 'महाराष्ट्र',
      hi: 'महाराष्ट्र',
      te: 'మహారాష్ట్ర',
      ta: 'மகாராஷ்டிரா',
      kn: 'ಮಹಾರಾಷ್ಟ್ರ',
      ml: 'മഹാരാഷ്ട്ര',
      en: 'Maharashtra',
    },
    capital: 'Mumbai',
    totalDistricts: 36,
  },
  {
    code: 'IN-GJ',
    lgdCode: 24,
    name: 'Gujarat',
    type: 'STATE',
    subDistrictTerminology: 'TALUKA',
    terminologyLabel: {
      en: 'Taluka',
      hi: 'तालुका',
      mr: 'तालुका',
      te: 'తాలూకా',
      kn: 'ತಾಲೂಕು',
      ta: 'வட்டம்',
      ml: 'താലൂക്ക്',
    },
    translations: {
      hi: 'गुजरात',
      te: 'గుజరాత్',
      mr: 'गुजरात',
      ta: 'குஜராத்',
      kn: 'ಗುಜರಾತ್',
      ml: 'ഗുജറാത്ത്',
      en: 'Gujarat',
    },
    capital: 'Gandhinagar',
    totalDistricts: 33,
  },
  {
    code: 'IN-UP',
    lgdCode: 9,
    name: 'Uttar Pradesh',
    type: 'STATE',
    subDistrictTerminology: 'TEHSIL',
    terminologyLabel: {
      en: 'Tehsil',
      hi: 'तहसील',
      te: 'తహసీల్',
      mr: 'तहसील',
      kn: 'ತಹಶೀಲ್',
      ta: 'வட்டம் (தெஹ்சில்)',
      ml: 'തഹസിൽ',
    },
    translations: {
      hi: 'उत्तर प्रदेश',
      te: 'ఉత్తర ప్రదేశ్',
      mr: 'उत्तर प्रदेश',
      ta: 'உத்தரப் பிரதேசம்',
      kn: 'ಉತ್ತರ ಪ್ರದೇಶ',
      ml: 'ഉത്തർപ്രദേശ്',
      en: 'Uttar Pradesh',
    },
    capital: 'Lucknow',
    totalDistricts: 75,
  },
  {
    code: 'IN-MP',
    lgdCode: 23,
    name: 'Madhya Pradesh',
    type: 'STATE',
    subDistrictTerminology: 'TEHSIL',
    terminologyLabel: {
      en: 'Tehsil',
      hi: 'तहसील',
      te: 'తహసీల్',
      mr: 'तहसील',
      kn: 'ತಹಶೀಲ್',
      ta: 'தெஹ்சில்',
      ml: 'തഹസിൽ',
    },
    translations: {
      hi: 'मध्य प्रदेश',
      te: 'మధ్యప్రదేశ్',
      mr: 'मध्य प्रदेश',
      ta: 'மத்திய பிரதேசம்',
      kn: 'ಮಧ್ಯ ಪ್ರದೇಶ',
      ml: 'മധ്യപ്രദേശ്',
      en: 'Madhya Pradesh',
    },
    capital: 'Bhopal',
    totalDistricts: 55,
  },
  {
    code: 'IN-RJ',
    lgdCode: 8,
    name: 'Rajasthan',
    type: 'STATE',
    subDistrictTerminology: 'TEHSIL',
    terminologyLabel: {
      en: 'Tehsil',
      hi: 'तहसील',
      te: 'తహసీల్',
      mr: 'तहसील',
      kn: 'ತಹಶೀಲ್',
      ta: 'தெஹ்சில்',
      ml: 'തഹസിൽ',
    },
    translations: {
      hi: 'राजस्थान',
      te: 'రాజస్థాన్',
      mr: 'राजस्थान',
      ta: 'ராஜஸ்தான்',
      kn: 'ರಾಜಸ್ಥಾನ',
      ml: 'രാജസ്ഥാൻ',
      en: 'Rajasthan',
    },
    capital: 'Jaipur',
    totalDistricts: 50,
  },
  {
    code: 'IN-PB',
    lgdCode: 3,
    name: 'Punjab',
    type: 'STATE',
    subDistrictTerminology: 'TEHSIL',
    terminologyLabel: {
      en: 'Tehsil',
      hi: 'तहसील',
      te: 'తహసీల్',
      mr: 'तहसील',
      kn: 'ತಹಶೀಲ್',
      ta: 'தெஹ்சில்',
      ml: 'തഹസിൽ',
    },
    translations: {
      hi: 'पंजाब',
      te: 'పంజాబ్',
      mr: 'पंजाब',
      ta: 'பஞ்சாப்',
      kn: 'ಪಂಜಾಬ್',
      ml: 'പഞ്ചാബ്',
      en: 'Punjab',
    },
    capital: 'Chandigarh',
    totalDistricts: 23,
  },
  {
    code: 'IN-HR',
    lgdCode: 6,
    name: 'Haryana',
    type: 'STATE',
    subDistrictTerminology: 'TEHSIL',
    terminologyLabel: {
      en: 'Tehsil',
      hi: 'तहसील',
      te: 'తహసీల్',
      mr: 'तहसील',
      kn: 'ತಹಶೀಲ್',
      ta: 'தெஹ்சில்',
      ml: 'തഹസിൽ',
    },
    translations: {
      hi: 'हरियाणा',
      te: 'హర్యానా',
      mr: 'हरियाणा',
      ta: 'ஹரியானா',
      kn: 'ಹರಿಯಾಣ',
      ml: 'ഹരിയാന',
      en: 'Haryana',
    },
    capital: 'Chandigarh',
    totalDistricts: 22,
  },
  {
    code: 'IN-BR',
    lgdCode: 10,
    name: 'Bihar',
    type: 'STATE',
    subDistrictTerminology: 'BLOCK',
    terminologyLabel: {
      en: 'Block',
      hi: 'प्रखंड (ब्लॉक)',
      te: 'బ్లాక్ (ప్రఖండ్)',
      mr: 'ब्लॉक',
      kn: 'ಬ್ಲಾಕ್',
      ta: 'வட்டாரம் (Block)',
      ml: 'ബ്ലോക്ക്',
    },
    translations: {
      hi: 'बिहार',
      te: 'బీహార్',
      mr: 'बिहार',
      ta: 'பீகார்',
      kn: 'ಬಿಹಾರ',
      ml: 'ബീഹാർ',
      en: 'Bihar',
    },
    capital: 'Patna',
    totalDistricts: 38,
  },
  {
    code: 'IN-WB',
    lgdCode: 19,
    name: 'West Bengal',
    type: 'STATE',
    subDistrictTerminology: 'BLOCK',
    terminologyLabel: {
      en: 'CD Block',
      hi: 'सी.डी. ब्लॉक',
      te: 'బ్లాక్',
      mr: 'ब्लॉक',
      kn: 'ಬ್ಲಾಕ್',
      ta: 'வட்டாரம்',
      ml: 'ബ്ലോക്ക്',
    },
    translations: {
      hi: 'पश्चिम बंगाल',
      te: 'పశ్చిమ బెంగాల్',
      mr: 'पश्चिम बंगाल',
      ta: 'மேற்கு வங்காளம்',
      kn: 'ಪಶ್ಚಿಮ ಬಂಗಾಳ',
      ml: 'പശ്ചിമ ബംഗാൾ',
      en: 'West Bengal',
    },
    capital: 'Kolkata',
    totalDistricts: 23,
  },
  {
    code: 'IN-OD',
    lgdCode: 21,
    name: 'Odisha',
    type: 'STATE',
    subDistrictTerminology: 'BLOCK',
    terminologyLabel: {
      en: 'Block',
      hi: 'ब्लॉक',
      te: 'బ్లాక్',
      mr: 'ब्लॉक',
      kn: 'ಬ್ಲಾಕ್',
      ta: 'வட்டாரம்',
      ml: 'ബ്ലോക്ക്',
    },
    translations: {
      hi: 'ओडिशा',
      te: 'ఒడిశా',
      mr: 'ओडिशा',
      ta: 'ஒடிசா',
      kn: 'ಒಡಿಶಾ',
      ml: 'ഒഡീഷ',
      en: 'Odisha',
    },
    capital: 'Bhubaneswar',
    totalDistricts: 30,
  },
  {
    code: 'IN-CT',
    lgdCode: 22,
    name: 'Chhattisgarh',
    type: 'STATE',
    subDistrictTerminology: 'TEHSIL',
    terminologyLabel: {
      en: 'Tehsil',
      hi: 'तहसील',
      te: 'తహసీల్',
      mr: 'तहसील',
      kn: 'ತಹಶೀಲ್',
      ta: 'தெஹ்சில்',
      ml: 'തഹസിൽ',
    },
    translations: {
      hi: 'छत्तीसगढ़',
      te: 'ఛత్తీస్‌గఢ్',
      mr: 'छत्तीसगढ',
      ta: 'சத்தீஸ்கர்',
      kn: 'ಛತ್ತೀಸ್‌ಗಢ',
      ml: 'ഛത്തീസ്‌ഗഢ്',
      en: 'Chhattisgarh',
    },
    capital: 'Raipur',
    totalDistricts: 33,
  },
  {
    code: 'IN-JH',
    lgdCode: 20,
    name: 'Jharkhand',
    type: 'STATE',
    subDistrictTerminology: 'BLOCK',
    terminologyLabel: {
      en: 'Block',
      hi: 'प्रखंड',
      te: 'బ్లాక్',
      mr: 'ब्लॉक',
      kn: 'ಬ್ಲಾಕ್',
      ta: 'வட்டாரம்',
      ml: 'ബ്ലോക്ക്',
    },
    translations: {
      hi: 'झारखंड',
      te: 'జార్ఖండ్',
      mr: 'झारखंड',
      ta: 'ஜார்க்கண்ட்',
      kn: 'ಜಾರ್ಖಂಡ್',
      ml: 'ജാർഖണ്ഡ്',
      en: 'Jharkhand',
    },
    capital: 'Ranchi',
    totalDistricts: 24,
  },
  {
    code: 'IN-AS',
    lgdCode: 18,
    name: 'Assam',
    type: 'STATE',
    subDistrictTerminology: 'SUB_DIVISION',
    terminologyLabel: {
      en: 'Sub-Division / Circle',
      hi: 'उप-मंडल / सर्कल',
      te: 'సబ్-డివిజన్',
      mr: 'उपविभाग',
      kn: 'ಉಪವಿಭಾಗ',
      ta: 'துணைப்பிரிவு',
      ml: 'സബ് ഡിവിഷൻ',
    },
    translations: {
      hi: 'असम',
      te: 'అస్సాం',
      mr: 'आसाम',
      ta: 'அசாம்',
      kn: 'ಅಸ್ಸಾಂ',
      ml: 'അസം',
      en: 'Assam',
    },
    capital: 'Dispur',
    totalDistricts: 35,
  },
  {
    code: 'IN-UT',
    lgdCode: 5,
    name: 'Uttarakhand',
    type: 'STATE',
    subDistrictTerminology: 'TEHSIL',
    terminologyLabel: {
      en: 'Tehsil',
      hi: 'तहसील',
      te: 'తహసీల్',
      mr: 'तहसील',
      kn: 'ತಹಶೀಲ್',
      ta: 'தெஹ்சில்',
      ml: 'തഹസിൽ',
    },
    translations: {
      hi: 'उत्तराखंड',
      te: 'ఉత్తరాఖండ్',
      mr: 'उत्तराखंड',
      ta: 'உத்தரகாண்ட்',
      kn: 'ಉತ್ತರಾಖಂಡ',
      ml: 'ഉത്തരാഖണ്ഡ്',
      en: 'Uttarakhand',
    },
    capital: 'Dehradun',
    totalDistricts: 13,
  },
  {
    code: 'IN-HP',
    lgdCode: 2,
    name: 'Himachal Pradesh',
    type: 'STATE',
    subDistrictTerminology: 'TEHSIL',
    terminologyLabel: {
      en: 'Tehsil',
      hi: 'तहसील',
      te: 'తహసీల్',
      mr: 'तहसील',
      kn: 'ತಹಶೀಲ್',
      ta: 'தெஹ்சில்',
      ml: 'തഹസിൽ',
    },
    translations: {
      hi: 'हिमाचल प्रदेश',
      te: 'హిమాచల్ ప్రదేశ్',
      mr: 'हिमाचल प्रदेश',
      ta: 'இமாச்சலப் பிரதேசம்',
      kn: 'ಹಿಮಾಚಲ ಪ್ರದೇಶ',
      ml: 'ഹിമാചൽ പ്രദേശ്',
      en: 'Himachal Pradesh',
    },
    capital: 'Shimla',
    totalDistricts: 12,
  },
  {
    code: 'IN-GA',
    lgdCode: 30,
    name: 'Goa',
    type: 'STATE',
    subDistrictTerminology: 'TALUKA',
    terminologyLabel: {
      en: 'Taluka',
      hi: 'तालुका',
      mr: 'तालुका',
      te: 'తాలూకా',
      kn: 'ತಾಲೂಕು',
      ta: 'வட்டம்',
      ml: 'താലൂക്ക്',
    },
    translations: {
      hi: 'गोवा',
      te: 'గోవా',
      mr: 'गोवा',
      ta: 'கோவா',
      kn: 'ಗೋವಾ',
      ml: 'ഗോവ',
      en: 'Goa',
    },
    capital: 'Panaji',
    totalDistricts: 2,
  },
  {
    code: 'IN-TR',
    lgdCode: 16,
    name: 'Tripura',
    type: 'STATE',
    subDistrictTerminology: 'SUB_DIVISION',
    terminologyLabel: { en: 'Sub-Division', hi: 'उप-मंडल', te: 'సబ్-డివిజన్', mr: 'उपविभाग', kn: 'ಉಪವಿಭಾಗ', ta: 'துணைப்பிரிவு', ml: 'സബ് ഡിവിഷൻ' },
    translations: { hi: 'त्रिपुरा', te: 'త్రిపుర', mr: 'त्रिपुरा', ta: 'திரிபுரா', kn: 'ತ್ರಿಪುರ', ml: 'ത്രിപുര', en: 'Tripura' },
    capital: 'Agartala',
    totalDistricts: 8,
  },
  {
    code: 'IN-ML',
    lgdCode: 17,
    name: 'Meghalaya',
    type: 'STATE',
    subDistrictTerminology: 'BLOCK',
    terminologyLabel: { en: 'C&RD Block', hi: 'ब्लॉक', te: 'బ్లాక్', mr: 'ब्लॉक', kn: 'ಬ್ಲಾಕ್', ta: 'வட்டாரம்', ml: 'ബ്ലോക്ക്' },
    translations: { hi: 'मेघालय', te: 'మేఘాలయ', mr: 'मेघालय', ta: 'மேகாலயா', kn: 'ಮೇಘಾಲಯ', ml: 'മേഘാലയ', en: 'Meghalaya' },
    capital: 'Shillong',
    totalDistricts: 12,
  },
  {
    code: 'IN-MN',
    lgdCode: 14,
    name: 'Manipur',
    type: 'STATE',
    subDistrictTerminology: 'SUB_DIVISION',
    terminologyLabel: { en: 'Sub-Division', hi: 'उप-मंडल', te: 'సబ్-డివిజన్', mr: 'उपविभाग', kn: 'ಉಪವಿಭಾಗ', ta: 'துணைப்பிரிவு', ml: 'സബ് ഡിവിഷൻ' },
    translations: { hi: 'मणिपुर', te: 'మణిపూర్', mr: 'मणिपूर', ta: 'மணிப்பூர்', kn: 'ಮಣಿಪುರ', ml: 'മണിപ്പൂർ', en: 'Manipur' },
    capital: 'Imphal',
    totalDistricts: 16,
  },
  {
    code: 'IN-NL',
    lgdCode: 13,
    name: 'Nagaland',
    type: 'STATE',
    subDistrictTerminology: 'SUB_DIVISION',
    terminologyLabel: { en: 'Circle / Sub-Division', hi: 'सर्कल', te: 'సర్కిల్', mr: 'सर्कल', kn: 'ವೃತ್ತ', ta: 'வட்டம்', ml: 'സർക്കിൾ' },
    translations: { hi: 'नागालैंड', te: 'నాగాలాండ్', mr: 'नागालँड', ta: 'நாகாலாந்து', kn: 'ನಾಗಾಲ್ಯಾಂಡ್', ml: 'നാഗാലാൻഡ്', en: 'Nagaland' },
    capital: 'Kohima',
    totalDistricts: 16,
  },
  {
    code: 'IN-MZ',
    lgdCode: 15,
    name: 'Mizoram',
    type: 'STATE',
    subDistrictTerminology: 'BLOCK',
    terminologyLabel: { en: 'RD Block', hi: 'ब्लॉक', te: 'బ్లాక్', mr: 'ब्लॉक', kn: 'ಬ್ಲಾಕ್', ta: 'வட்டாரம்', ml: 'ബ്ലോക്ക്' },
    translations: { hi: 'मिजोरम', te: 'మిజోరం', mr: 'मिझोरम', ta: 'மிசோரம்', kn: 'ಮಿಜೋರಾಂ', ml: 'മിസോറാം', en: 'Mizoram' },
    capital: 'Aizawl',
    totalDistricts: 11,
  },
  {
    code: 'IN-SK',
    lgdCode: 11,
    name: 'Sikkim',
    type: 'STATE',
    subDistrictTerminology: 'SUB_DIVISION',
    terminologyLabel: { en: 'Sub-Division', hi: 'उप-मंडल', te: 'సబ్-డివిజన్', mr: 'उपविभाग', kn: 'ಉಪವಿಭಾಗ', ta: 'துணைப்பிரிவு', ml: 'സബ് ഡിവിഷൻ' },
    translations: { hi: 'सिक्किम', te: 'సిక్కిం', mr: 'सिक्कीम', ta: 'சிக்கிம்', kn: 'ಸಿಕ್ಕಿಂ', ml: 'സിക്കിം', en: 'Sikkim' },
    capital: 'Gangtok',
    totalDistricts: 6,
  },
  {
    code: 'IN-AR',
    lgdCode: 12,
    name: 'Arunachal Pradesh',
    type: 'STATE',
    subDistrictTerminology: 'SUB_DIVISION',
    terminologyLabel: { en: 'Circle / Sub-Division', hi: 'सर्कल', te: 'సర్కిల్', mr: 'सर्कल', kn: 'ವೃತ್ತ', ta: 'வட்டம்', ml: 'സർക്കിൾ' },
    translations: { hi: 'अरुणाचल प्रदेश', te: 'అరుణాచల్ ప్రదేశ్', mr: 'अरुणाचल प्रदेश', ta: 'அருணாச்சலப் பிரதேசம்', kn: 'ಅರುಣಾಚಲ ಪ್ರದೇಶ', ml: 'അരുണാചൽ പ്രദേശ്', en: 'Arunachal Pradesh' },
    capital: 'Itanagar',
    totalDistricts: 26,
  },

  // ---------------------------------------------------------------------------
  // 8 UNION TERRITORIES
  // ---------------------------------------------------------------------------
  {
    code: 'IN-DL',
    lgdCode: 7,
    name: 'Delhi (NCT)',
    type: 'UNION_TERRITORY',
    subDistrictTerminology: 'TEHSIL',
    terminologyLabel: { en: 'Tehsil', hi: 'तहसील', te: 'తహసీల్', mr: 'तहसील', kn: 'ತಹಶೀಲ್', ta: 'தெஹ்சில்', ml: 'തഹസിൽ' },
    translations: { hi: 'दिल्ली', te: 'ఢిల్లీ', mr: 'दिल्ली', ta: 'டெல்லி', kn: 'ದೆಹಲಿ', ml: 'ഡൽഹി', en: 'Delhi' },
    capital: 'New Delhi',
    totalDistricts: 11,
  },
  {
    code: 'IN-JK',
    lgdCode: 1,
    name: 'Jammu and Kashmir',
    type: 'UNION_TERRITORY',
    subDistrictTerminology: 'TEHSIL',
    terminologyLabel: { en: 'Tehsil', hi: 'तहसील', te: 'తహసీల్', mr: 'तहसील', kn: 'ತಹಶೀಲ್', ta: 'தெஹ்சில்', ml: 'തഹസിൽ' },
    translations: { hi: 'जम्मू और कश्मीर', te: 'జమ్ము & కాశ్మీర్', mr: 'जम्मू आणि काश्मीर', ta: 'ஜம்மு காஷ்மீர்', kn: 'ಜಮ್ಮು ಮತ್ತು ಕಾಶ್ಮೀರ', ml: 'ജമ്മു കശ്മീർ', en: 'Jammu and Kashmir' },
    capital: 'Srinagar / Jammu',
    totalDistricts: 20,
  },
  {
    code: 'IN-LA',
    lgdCode: 37,
    name: 'Ladakh',
    type: 'UNION_TERRITORY',
    subDistrictTerminology: 'TEHSIL',
    terminologyLabel: { en: 'Tehsil', hi: 'तहसील', te: 'తహసీల్', mr: 'तहसील', kn: 'ತಹಶೀಲ್', ta: 'தெஹ்சில்', ml: 'തഹസിൽ' },
    translations: { hi: 'लद्दाख', te: 'లడఖ్', mr: 'लडाख', ta: 'லடாக்', kn: 'ಲಡಾಖ್', ml: 'ലഡാക്ക്', en: 'Ladakh' },
    capital: 'Leh',
    totalDistricts: 2,
  },
  {
    code: 'IN-PY',
    lgdCode: 34,
    name: 'Puducherry',
    type: 'UNION_TERRITORY',
    subDistrictTerminology: 'TALUK',
    terminologyLabel: { en: 'Taluk', ta: 'வட்டம் (Taluk)', hi: 'तालुक', te: 'తాలూకా', kn: 'ತಾಲೂಕು', ml: 'താലൂക്ക്', mr: 'तालुका' },
    translations: { ta: 'புதுச்சேரி', hi: 'पुदुचेरी', te: 'పుదుచ్చేరి', mr: 'पुद्दुचेरी', kn: 'ಪುದುಚೇರಿ', ml: 'പുതുച്ചേരി', en: 'Puducherry' },
    capital: 'Pondicherry',
    totalDistricts: 4,
  },
  {
    code: 'IN-CH',
    lgdCode: 4,
    name: 'Chandigarh',
    type: 'UNION_TERRITORY',
    subDistrictTerminology: 'TEHSIL',
    terminologyLabel: { en: 'Tehsil', hi: 'तहसील', te: 'తహసీల్', mr: 'तहसील', kn: 'ತಹಶೀಲ್', ta: 'தெஹ்சில்', ml: 'തഹസിൽ' },
    translations: { hi: 'चंडीगढ़', te: 'చండీగఢ్', mr: 'चंदिगढ', ta: 'சண்டிகர்', kn: 'ಚಂಡೀಗಢ', ml: 'ചണ്ഡീഗഡ്', en: 'Chandigarh' },
    capital: 'Chandigarh',
    totalDistricts: 1,
  },
  {
    code: 'IN-DH',
    lgdCode: 38,
    name: 'Dadra and Nagar Haveli and Daman and Diu',
    type: 'UNION_TERRITORY',
    subDistrictTerminology: 'TALUKA',
    terminologyLabel: { en: 'Taluka', hi: 'तालुका', te: 'తాలూకా', mr: 'तालुका', kn: 'ತಾಲೂಕು', ta: 'வட்டம்', ml: 'താലൂക്ക്' },
    translations: { hi: 'दादरा और नगर हवेली और दमन और दीव', te: 'దాద్రా నగర్ హవేలీ డామన్ డయ్యూ', mr: 'दादरा आणि नगर हवेली आणि दमण आणि दीव', ta: 'தாத்ரா நாகர் ஹவேலி டாமன் டையூ', kn: 'ದಾದ್ರಾ ಮತ್ತು ನಗರ ಹವೇಲಿ ಮತ್ತು ದಮನ್ ಮತ್ತು ದಿಯು', ml: 'ദാദ്ര നഗർ ഹവേലി ദാമൻ ദിയു', en: 'Dadra and Nagar Haveli and Daman and Diu' },
    capital: 'Daman',
    totalDistricts: 3,
  },
  {
    code: 'IN-AN',
    lgdCode: 35,
    name: 'Andaman and Nicobar Islands',
    type: 'UNION_TERRITORY',
    subDistrictTerminology: 'TEHSIL',
    terminologyLabel: { en: 'Tehsil', hi: 'तहसील', te: 'తహసీల్', mr: 'तहसील', kn: 'ತಹಶೀಲ್', ta: 'தெஹ்சில்', ml: 'തഹസിൽ' },
    translations: { hi: 'अंडमान और निकोबार द्वीप समूह', te: 'అండమాన్ & నికోబార్ దీవులు', mr: 'अंदमान आणि निकोबार बेटे', ta: 'அந்தமான் நிக்கோபார் தீவுகள்', kn: 'ಅಂಡಮಾನ್ ಮತ್ತು ನಿಕೋಬಾರ್ ದ್ವೀಪಗಳು', ml: 'ആൻഡമാൻ നിക്കോബാർ ദ്വീപുകൾ', en: 'Andaman and Nicobar Islands' },
    capital: 'Port Blair',
    totalDistricts: 3,
  },
  {
    code: 'IN-LD',
    lgdCode: 31,
    name: 'Lakshadweep',
    type: 'UNION_TERRITORY',
    subDistrictTerminology: 'SUB_DIVISION',
    terminologyLabel: { en: 'Sub-Division', ml: 'സബ് ഡിവിഷൻ', hi: 'उप-मंडल', te: 'సబ్-డివిజన్', mr: 'उपविभाग', kn: 'ಉಪವಿಭಾಗ', ta: 'துணைப்பிரிவு' },
    translations: { ml: 'ലക്ഷദ്വീപ്', hi: 'लक्षद्वीप', te: 'లక్షద్వీప్', mr: 'लक्षद्वीप', ta: 'லட்சத்தீவு', kn: 'ಲಕ್ಷದ್ವೀಪ', en: 'Lakshadweep' },
    capital: 'Kavaratti',
    totalDistricts: 1,
  },
];

export const AUTHORITATIVE_DISTRICTS: District[] = [
  {
    "id": "dist-in-ap-guntur",
    "lgdCode": 506,
    "stateCode": "IN-AP",
    "name": "Guntur",
    "headquarters": "Guntur",
    "translations": {
      "te": "గుంటూరు",
      "hi": "गुंटूर",
      "en": "Guntur"
    },
    "agroClimaticZone": "Krishna-Godavari Coastal Zone"
  },
  {
    "id": "dist-in-ap-kurnool",
    "lgdCode": 511,
    "stateCode": "IN-AP",
    "name": "Kurnool",
    "headquarters": "Kurnool",
    "translations": {
      "te": "కర్నూలు",
      "hi": "कर्नूल",
      "en": "Kurnool"
    },
    "agroClimaticZone": "Scarce Rainfall Rayalaseema Zone"
  },
  {
    "id": "dist-in-ap-krishna",
    "lgdCode": 510,
    "stateCode": "IN-AP",
    "name": "Krishna",
    "headquarters": "Machilipatnam",
    "translations": {
      "te": "కృష్ణా",
      "hi": "कृष्णा",
      "en": "Krishna"
    },
    "agroClimaticZone": "Krishna Delta Agro Zone"
  },
  {
    "id": "dist-in-ap-prakasam",
    "lgdCode": 517,
    "stateCode": "IN-AP",
    "name": "Prakasam",
    "headquarters": "Ongole",
    "translations": {
      "te": "ప్రకాశం",
      "hi": "प्रकाशम",
      "en": "Prakasam"
    },
    "agroClimaticZone": "Southern Dry Agro Zone"
  },
  {
    "id": "dist-in-ap-anantapur",
    "lgdCode": 502,
    "stateCode": "IN-AP",
    "name": "Ananthapuramu",
    "headquarters": "Anantapur",
    "translations": {
      "te": "అనంతపురం",
      "hi": "अनंतपुर",
      "en": "Ananthapuramu"
    },
    "agroClimaticZone": "Arid Rayalaseema Zone"
  },
  {
    "id": "dist-in-ap-chittoor",
    "lgdCode": 503,
    "stateCode": "IN-AP",
    "name": "Chittoor",
    "headquarters": "Chittoor",
    "translations": {
      "te": "చిత్తూరు",
      "hi": "चित्तूर",
      "en": "Chittoor"
    },
    "agroClimaticZone": "Southern Agro Zone"
  },
  {
    "id": "dist-in-tg-warangal",
    "lgdCode": 542,
    "stateCode": "IN-TG",
    "name": "Warangal",
    "headquarters": "Warangal",
    "translations": {
      "te": "వరంగల్",
      "hi": "वारंगल",
      "en": "Warangal"
    },
    "agroClimaticZone": "Central Telangana Agro Zone"
  },
  {
    "id": "dist-in-tg-khammam",
    "lgdCode": 533,
    "stateCode": "IN-TG",
    "name": "Khammam",
    "headquarters": "Khammam",
    "translations": {
      "te": "ఖమ్మం",
      "hi": "खम्मम",
      "en": "Khammam"
    },
    "agroClimaticZone": "Godavari Basin Telangana Zone"
  },
  {
    "id": "dist-in-tg-nizamabad",
    "lgdCode": 538,
    "stateCode": "IN-TG",
    "name": "Nizamabad",
    "headquarters": "Nizamabad",
    "translations": {
      "te": "నిజామాబాద్",
      "hi": "निज़ामाबाद",
      "en": "Nizamabad"
    },
    "agroClimaticZone": "Northern Black Soil Zone"
  },
  {
    "id": "dist-in-tg-karimnagar",
    "lgdCode": 532,
    "stateCode": "IN-TG",
    "name": "Karimnagar",
    "headquarters": "Karimnagar",
    "translations": {
      "te": "కరీంనగర్",
      "hi": "करीमनगर",
      "en": "Karimnagar"
    },
    "agroClimaticZone": "Northern Telangana Agro Zone"
  },
  {
    "id": "dist-in-ka-haveri",
    "lgdCode": 563,
    "stateCode": "IN-KA",
    "name": "Haveri",
    "headquarters": "Haveri",
    "translations": {
      "kn": "ಹಾವೇರಿ",
      "te": "హావేరి",
      "hi": "हावेरी",
      "en": "Haveri"
    },
    "agroClimaticZone": "Transitional Agro Zone"
  },
  {
    "id": "dist-in-ka-bengaluru-rural",
    "lgdCode": 556,
    "stateCode": "IN-KA",
    "name": "Bengaluru Rural",
    "headquarters": "Bengaluru",
    "translations": {
      "kn": "ಬೆಂಗಳೂರು ಗ್ರಾಮಾಂತರ",
      "te": "బెంగళూరు రూరల్",
      "hi": "बेंगलुरु ग्रामीण",
      "en": "Bengaluru Rural"
    },
    "agroClimaticZone": "Eastern Dry Agro Zone"
  },
  {
    "id": "dist-in-ka-shivamogga",
    "lgdCode": 580,
    "stateCode": "IN-KA",
    "name": "Shivamogga",
    "headquarters": "Shivamogga",
    "translations": {
      "kn": "ಶಿವಮೊಗ್ಗ",
      "te": "శివಮೊగ్గ",
      "hi": "शिवमोग्गा",
      "en": "Shivamogga"
    },
    "agroClimaticZone": "Southern Malnad Zone"
  },
  {
    "id": "dist-in-ka-belagavi",
    "lgdCode": 555,
    "stateCode": "IN-KA",
    "name": "Belagavi",
    "headquarters": "Belagavi",
    "translations": {
      "kn": "ಬೆಳಗಾವಿ",
      "te": "బెలగావి",
      "hi": "बेलगावी",
      "en": "Belagavi"
    },
    "agroClimaticZone": "Northern Dry Zone"
  },
  {
    "id": "dist-in-tn-erode",
    "lgdCode": 608,
    "stateCode": "IN-TN",
    "name": "Erode",
    "headquarters": "Erode",
    "translations": {
      "ta": "ஈரோடு",
      "te": "ఈరోడ్",
      "hi": "ईरोड",
      "en": "Erode"
    },
    "agroClimaticZone": "Western Agro Zone (Turmeric Hub)"
  },
  {
    "id": "dist-in-tn-thanjavur",
    "lgdCode": 620,
    "stateCode": "IN-TN",
    "name": "Thanjavur",
    "headquarters": "Thanjavur",
    "translations": {
      "ta": "தஞ்சாவூர்",
      "te": "తంజావూరు",
      "hi": "तंजावुर",
      "en": "Thanjavur"
    },
    "agroClimaticZone": "Cauvery Delta Rice Bowl"
  },
  {
    "id": "dist-in-tn-madurai",
    "lgdCode": 613,
    "stateCode": "IN-TN",
    "name": "Madurai",
    "headquarters": "Madurai",
    "translations": {
      "ta": "மதுரை",
      "te": "మధురై",
      "hi": "मदुरै",
      "en": "Madurai"
    },
    "agroClimaticZone": "Southern Agro Zone"
  },
  {
    "id": "dist-in-kl-idukki",
    "lgdCode": 590,
    "stateCode": "IN-KL",
    "name": "Idukki",
    "headquarters": "Painavu",
    "translations": {
      "ml": "ഇടുക്കി",
      "te": "ఇడుక్కి",
      "hi": "इडुक्की",
      "en": "Idukki"
    },
    "agroClimaticZone": "High Altitude Cardamom & Pepper Zone"
  },
  {
    "id": "dist-in-kl-palakkad",
    "lgdCode": 594,
    "stateCode": "IN-KL",
    "name": "Palakkad",
    "headquarters": "Palakkad",
    "translations": {
      "ml": "പാലക്കാട്",
      "te": "పాలక్కాడ్",
      "hi": "पालक्काड़",
      "en": "Palakkad"
    },
    "agroClimaticZone": "Palakkad Rice Granary Zone"
  },
  {
    "id": "dist-in-kl-wayanad",
    "lgdCode": 599,
    "stateCode": "IN-KL",
    "name": "Wayanad",
    "headquarters": "Kalpetta",
    "translations": {
      "ml": "വയനാട്",
      "te": "వయనాడ్",
      "hi": "वायनाड",
      "en": "Wayanad"
    },
    "agroClimaticZone": "Highland Coffee & Spices Zone"
  },
  {
    "id": "dist-in-mh-nashik",
    "lgdCode": 516,
    "stateCode": "IN-MH",
    "name": "Nashik",
    "headquarters": "Nashik",
    "translations": {
      "mr": "नाशिक",
      "te": "నాసిక్",
      "hi": "नासिक",
      "en": "Nashik"
    },
    "agroClimaticZone": "Western Ghats Onion & Grape Belt"
  },
  {
    "id": "dist-in-mh-jalgaon",
    "lgdCode": 507,
    "stateCode": "IN-MH",
    "name": "Jalgaon",
    "headquarters": "Jalgaon",
    "translations": {
      "mr": "जळगाव",
      "te": "జల్గావ్",
      "hi": "जलगांव",
      "en": "Jalgaon"
    },
    "agroClimaticZone": "Tapi Basin Banana Belt"
  },
  {
    "id": "dist-in-mh-pune",
    "lgdCode": 521,
    "stateCode": "IN-MH",
    "name": "Pune",
    "headquarters": "Pune",
    "translations": {
      "mr": "पुणे",
      "te": "పూణే",
      "hi": "पुणे",
      "en": "Pune"
    },
    "agroClimaticZone": "Western Maharashtra Sugarcane Zone"
  },
  {
    "id": "dist-in-gj-rajkot",
    "lgdCode": 489,
    "stateCode": "IN-GJ",
    "name": "Rajkot",
    "headquarters": "Rajkot",
    "translations": {
      "hi": "राजकोट",
      "te": "రాజ్కోట్",
      "en": "Rajkot"
    },
    "agroClimaticZone": "Saurashtra Groundnut & Cotton Belt"
  },
  {
    "id": "dist-in-gj-junagadh",
    "lgdCode": 482,
    "stateCode": "IN-GJ",
    "name": "Junagadh",
    "headquarters": "Junagadh",
    "translations": {
      "hi": "जूनागढ़",
      "te": "జునాగఢ్",
      "en": "Junagadh"
    },
    "agroClimaticZone": "Gir Mango & Sesame Zone"
  },
  {
    "id": "dist-in-gj-anand",
    "lgdCode": 471,
    "stateCode": "IN-GJ",
    "name": "Anand",
    "headquarters": "Anand",
    "translations": {
      "hi": "आणंद",
      "te": "ఆనంద్",
      "en": "Anand"
    },
    "agroClimaticZone": "Charotar Tobacco & Dairy Zone"
  },
  {
    "id": "dist-in-up-agra",
    "lgdCode": 124,
    "stateCode": "IN-UP",
    "name": "Agra",
    "headquarters": "Agra",
    "translations": {
      "hi": "आगरा",
      "te": "ఆగ్రా",
      "en": "Agra"
    },
    "agroClimaticZone": "South-Western Semi-Arid Potato Belt"
  },
  {
    "id": "dist-in-up-varanasi",
    "lgdCode": 195,
    "stateCode": "IN-UP",
    "name": "Varanasi",
    "headquarters": "Varanasi",
    "translations": {
      "hi": "वाराणसी",
      "te": "వారణాసి",
      "en": "Varanasi"
    },
    "agroClimaticZone": "Eastern Gangetic Plain Agro Zone"
  },
  {
    "id": "dist-in-up-aligarh",
    "lgdCode": 125,
    "stateCode": "IN-UP",
    "name": "Aligarh",
    "headquarters": "Aligarh",
    "translations": {
      "hi": "अलीगढ़",
      "te": "అలీగఢ్",
      "en": "Aligarh"
    },
    "agroClimaticZone": "Western Plain Mustard & Wheat Zone"
  },
  {
    "id": "dist-in-pb-ludhiana",
    "lgdCode": 41,
    "stateCode": "IN-PB",
    "name": "Ludhiana",
    "headquarters": "Ludhiana",
    "translations": {
      "hi": "लुधियाना",
      "te": "లూధియానా",
      "en": "Ludhiana"
    },
    "agroClimaticZone": "Central Plain Wheat-Paddy Granary"
  },
  {
    "id": "dist-in-pb-amritsar",
    "lgdCode": 31,
    "stateCode": "IN-PB",
    "name": "Amritsar",
    "headquarters": "Amritsar",
    "translations": {
      "hi": "अमृतसर",
      "te": "అమృత్‌సర్",
      "en": "Amritsar"
    },
    "agroClimaticZone": "Majha Plain Agro Zone"
  },
  {
    "id": "dist-in-br-patna",
    "lgdCode": 216,
    "stateCode": "IN-BR",
    "name": "Patna",
    "headquarters": "Patna",
    "translations": {
      "hi": "पटना",
      "te": "పాట్నా",
      "en": "Patna"
    },
    "agroClimaticZone": "South Bihar Alluvial Plain"
  },
  {
    "id": "dist-in-br-muzaffarpur",
    "lgdCode": 212,
    "stateCode": "IN-BR",
    "name": "Muzaffarpur",
    "headquarters": "Muzaffarpur",
    "translations": {
      "hi": "मुजफ्फरपुर",
      "te": "ముజఫర్‌పూర్",
      "en": "Muzaffarpur"
    },
    "agroClimaticZone": "North-West Alluvial Shahi Litchi Zone"
  },
  {
    "id": "dist-in-mp-indore",
    "lgdCode": 418,
    "stateCode": "IN-MP",
    "name": "Indore",
    "headquarters": "Indore",
    "translations": {
      "hi": "इंदौर",
      "te": "ఇండోర్",
      "en": "Indore"
    },
    "agroClimaticZone": "Malwa Plateau Soybean & Wheat Belt"
  },
  {
    "id": "dist-in-mp-ujjain",
    "lgdCode": 435,
    "stateCode": "IN-MP",
    "name": "Ujjain",
    "headquarters": "Ujjain",
    "translations": {
      "hi": "उज्जैन",
      "te": "ఉజ్జయిని",
      "en": "Ujjain"
    },
    "agroClimaticZone": "Malwa Agro Zone"
  },
  {
    "id": "dist-in-rj-jaipur",
    "lgdCode": 103,
    "stateCode": "IN-RJ",
    "name": "Jaipur",
    "headquarters": "Jaipur",
    "translations": {
      "hi": "जयपुर",
      "te": "జైపూర్",
      "en": "Jaipur"
    },
    "agroClimaticZone": "Semi-Arid Eastern Plain Mustard Belt"
  },
  {
    "id": "dist-in-rj-jodhpur",
    "lgdCode": 105,
    "stateCode": "IN-RJ",
    "name": "Jodhpur",
    "headquarters": "Jodhpur",
    "translations": {
      "hi": "जोधपुर",
      "te": "జోధ్‌పూర్",
      "en": "Jodhpur"
    },
    "agroClimaticZone": "Arid Western Agro Zone (Cumin & Guar)"
  },
  {
    "id": "dist-in-hr-karnal",
    "lgdCode": 70,
    "stateCode": "IN-HR",
    "name": "Karnal",
    "headquarters": "Karnal",
    "translations": {
      "hi": "करनाल",
      "te": "కర్నాల్",
      "en": "Karnal"
    },
    "agroClimaticZone": "Eastern Zone Basmati Rice Bowl"
  },
  {
    "id": "dist-in-hr-hisar",
    "lgdCode": 68,
    "stateCode": "IN-HR",
    "name": "Hisar",
    "headquarters": "Hisar",
    "translations": {
      "hi": "हिसार",
      "te": "హిసార్",
      "en": "Hisar"
    },
    "agroClimaticZone": "Western Semi-Arid Cotton & Wheat Zone"
  },
  {
    "id": "dist-in-wb-hooghly",
    "lgdCode": 312,
    "stateCode": "IN-WB",
    "name": "Hooghly",
    "headquarters": "Chinsurah",
    "translations": {
      "hi": "हुगली",
      "te": "హుగ్లీ",
      "en": "Hooghly"
    },
    "agroClimaticZone": "Gangetic Alluvial Potato & Jute Zone"
  },
  {
    "id": "dist-in-wb-bardhaman",
    "lgdCode": 707,
    "stateCode": "IN-WB",
    "name": "Purba Bardhaman",
    "headquarters": "Bardhaman",
    "translations": {
      "hi": "पूर्व बर्धमान",
      "te": "బర్ధమాన్",
      "en": "Purba Bardhaman"
    },
    "agroClimaticZone": "Bengal Rice Bowl"
  },
  {
    "id": "dist-in-od-cuttack",
    "lgdCode": 350,
    "stateCode": "IN-OD",
    "name": "Cuttack",
    "headquarters": "Cuttack",
    "translations": {
      "hi": "कटक",
      "te": "కటక్",
      "en": "Cuttack"
    },
    "agroClimaticZone": "East & South Eastern Coastal Plain"
  },
  {
    "id": "dist-in-od-bargarh",
    "lgdCode": 345,
    "stateCode": "IN-OD",
    "name": "Bargarh",
    "headquarters": "Bargarh",
    "translations": {
      "hi": "बरगढ़",
      "te": "బర్‌గఢ్",
      "en": "Bargarh"
    },
    "agroClimaticZone": "Western Undulating Rice Bowl of Odisha"
  },
  {
    "id": "dist-in-ct-raipur",
    "lgdCode": 382,
    "stateCode": "IN-CT",
    "name": "Raipur",
    "headquarters": "Raipur",
    "translations": {
      "hi": "रायपुर",
      "te": "రాయ్‌పూర్",
      "en": "Raipur"
    },
    "agroClimaticZone": "Chhattisgarh Plains Rice Basin"
  },
  {
    "id": "dist-in-ct-durg",
    "lgdCode": 376,
    "stateCode": "IN-CT",
    "name": "Durg",
    "headquarters": "Durg",
    "translations": {
      "hi": "दुर्ग",
      "te": "దుర్గ్",
      "en": "Durg"
    },
    "agroClimaticZone": "Sheonath River Basin"
  },
  {
    "id": "dist-in-jh-ranchi",
    "lgdCode": 328,
    "stateCode": "IN-JH",
    "name": "Ranchi",
    "headquarters": "Ranchi",
    "translations": {
      "hi": "राँची",
      "te": "రాంచీ",
      "en": "Ranchi"
    },
    "agroClimaticZone": "Central & North Eastern Plateau Zone"
  },
  {
    "id": "dist-in-jh-hazaribagh",
    "lgdCode": 320,
    "stateCode": "IN-JH",
    "name": "Hazaribagh",
    "headquarters": "Hazaribagh",
    "translations": {
      "hi": "हज़ारीबाग",
      "te": "హజారీబాగ్",
      "en": "Hazaribagh"
    },
    "agroClimaticZone": "Damodar Basin Agro Zone"
  },
  {
    "id": "dist-in-as-kamrup",
    "lgdCode": 287,
    "stateCode": "IN-AS",
    "name": "Kamrup",
    "headquarters": "Amingaon",
    "translations": {
      "hi": "कामरूप",
      "te": "కామరూప్",
      "en": "Kamrup"
    },
    "agroClimaticZone": "Lower Brahmaputra Valley Zone"
  },
  {
    "id": "dist-in-as-jorhat",
    "lgdCode": 286,
    "stateCode": "IN-AS",
    "name": "Jorhat",
    "headquarters": "Jorhat",
    "translations": {
      "hi": "जोरहाट",
      "te": "జోర్‌హాట్",
      "en": "Jorhat"
    },
    "agroClimaticZone": "Upper Brahmaputra Tea Valley Zone"
  },
  {
    "id": "dist-in-ut-dehradun",
    "lgdCode": 49,
    "stateCode": "IN-UT",
    "name": "Dehradun",
    "headquarters": "Dehradun",
    "translations": {
      "hi": "देहरादून",
      "te": "డెహ్రాడూన్",
      "en": "Dehradun"
    },
    "agroClimaticZone": "Sub-Himalayan Valley Basmati Zone"
  },
  {
    "id": "dist-in-ut-haridwar",
    "lgdCode": 50,
    "stateCode": "IN-UT",
    "name": "Haridwar",
    "headquarters": "Haridwar",
    "translations": {
      "hi": "हरिद्वार",
      "te": "హరిద్వార్",
      "en": "Haridwar"
    },
    "agroClimaticZone": "Bhabar & Tarai Agro Zone"
  },
  {
    "id": "dist-in-hp-shimla",
    "lgdCode": 21,
    "stateCode": "IN-HP",
    "name": "Shimla",
    "headquarters": "Shimla",
    "translations": {
      "hi": "शिमला",
      "te": "షిమ్లా",
      "en": "Shimla"
    },
    "agroClimaticZone": "High Hill Temperate Apple Zone"
  },
  {
    "id": "dist-in-hp-kangra",
    "lgdCode": 15,
    "stateCode": "IN-HP",
    "name": "Kangra",
    "headquarters": "Dharamshala",
    "translations": {
      "hi": "कांगड़ा",
      "te": "కాంగ్రా",
      "en": "Kangra"
    },
    "agroClimaticZone": "Mid Hill Sub-Humid Tea Zone"
  },
  {
    "id": "dist-in-ga-north-goa",
    "lgdCode": 551,
    "stateCode": "IN-GA",
    "name": "North Goa",
    "headquarters": "Panaji",
    "translations": {
      "hi": "उत्तर गोवा",
      "te": "ఉత్తర గోవా",
      "en": "North Goa"
    },
    "agroClimaticZone": "West Coast Cashew & Coconut Belt"
  },
  {
    "id": "dist-in-ga-south-goa",
    "lgdCode": 552,
    "stateCode": "IN-GA",
    "name": "South Goa",
    "headquarters": "Margao",
    "translations": {
      "hi": "दक्षिण गोवा",
      "te": "దక్షిణ గోవా",
      "en": "South Goa"
    },
    "agroClimaticZone": "Coastal Rice & Spice Zone"
  },
  {
    "id": "dist-in-tr-west-tripura",
    "lgdCode": 273,
    "stateCode": "IN-TR",
    "name": "West Tripura",
    "headquarters": "Agartala",
    "translations": {
      "hi": "पश्चिम त्रिपुरा",
      "te": "పశ్చిమ త్రిపుర",
      "en": "West Tripura"
    },
    "agroClimaticZone": "Humid Sub-Tropical Pineapple & Rubber Zone"
  },
  {
    "id": "dist-in-ml-east-khasi-hills",
    "lgdCode": 276,
    "stateCode": "IN-ML",
    "name": "East Khasi Hills",
    "headquarters": "Shillong",
    "translations": {
      "hi": "पूर्वी खासी हिल्स",
      "te": "తూర్పు ఖాసీ హిల్స్",
      "en": "East Khasi Hills"
    },
    "agroClimaticZone": "Sub-Temperate Ginger & Broomgrass Zone"
  },
  {
    "id": "dist-in-mn-imphal-west",
    "lgdCode": 257,
    "stateCode": "IN-MN",
    "name": "Imphal West",
    "headquarters": "Lamphelpat",
    "translations": {
      "hi": "इंफाल पश्चिम",
      "te": "ఇంఫాల్ వెస్ట్",
      "en": "Imphal West"
    },
    "agroClimaticZone": "Central Valley Aromatic Rice Zone"
  },
  {
    "id": "dist-in-nl-kohima",
    "lgdCode": 247,
    "stateCode": "IN-NL",
    "name": "Kohima",
    "headquarters": "Kohima",
    "translations": {
      "hi": "कोहिमा",
      "te": "కోహిమా",
      "en": "Kohima"
    },
    "agroClimaticZone": "Sub-Humid Terrace Farming Zone (Naga King Chilli)"
  },
  {
    "id": "dist-in-mz-aizawl",
    "lgdCode": 263,
    "stateCode": "IN-MZ",
    "name": "Aizawl",
    "headquarters": "Aizawl",
    "translations": {
      "hi": "आइजोल",
      "te": "ఐజ్వాల్",
      "en": "Aizawl"
    },
    "agroClimaticZone": "Mild Tropical Anthurium & Ginger Zone"
  },
  {
    "id": "dist-in-sk-gangtok",
    "lgdCode": 227,
    "stateCode": "IN-SK",
    "name": "Gangtok",
    "headquarters": "Gangtok",
    "translations": {
      "hi": "गंगटोक",
      "te": "గ్యాంగ్‌టక్",
      "en": "Gangtok"
    },
    "agroClimaticZone": "Certified Organic Large Cardamom Zone"
  },
  {
    "id": "dist-in-ar-papum-pare",
    "lgdCode": 239,
    "stateCode": "IN-AR",
    "name": "Papum Pare",
    "headquarters": "Yupia",
    "translations": {
      "hi": "पपुम पारे",
      "te": "పాపుమ్ పారే",
      "en": "Papum Pare"
    },
    "agroClimaticZone": "Eastern Himalayan Sub-Tropical Fruit Zone (Kiwi)"
  },
  {
    "id": "dist-in-dl-south-west",
    "lgdCode": 89,
    "stateCode": "IN-DL",
    "name": "South West Delhi",
    "headquarters": "Kapashera",
    "translations": {
      "hi": "दक्षिण पश्चिम दिल्ली",
      "te": "సౌత్ వెస్ట్ ఢిల్లీ",
      "en": "South West Delhi"
    },
    "agroClimaticZone": "Najafgarh Peri-Urban Vegetable Belt"
  },
  {
    "id": "dist-in-jk-srinagar",
    "lgdCode": 10,
    "stateCode": "IN-JK",
    "name": "Srinagar",
    "headquarters": "Srinagar",
    "translations": {
      "hi": "श्रीनगर",
      "te": "శ్రీనగర్",
      "en": "Srinagar"
    },
    "agroClimaticZone": "Kashmir Valley Temperate Apple & Saffron Zone"
  },
  {
    "id": "dist-in-jk-jammu",
    "lgdCode": 6,
    "stateCode": "IN-JK",
    "name": "Jammu",
    "headquarters": "Jammu",
    "translations": {
      "hi": "जम्मू",
      "te": "జమ్ము",
      "en": "Jammu"
    },
    "agroClimaticZone": "Sub-Tropical Basmati Belt"
  },
  {
    "id": "dist-in-la-leh",
    "lgdCode": 8,
    "stateCode": "IN-LA",
    "name": "Leh",
    "headquarters": "Leh",
    "translations": {
      "hi": "लेह",
      "te": "లేహ్",
      "en": "Leh"
    },
    "agroClimaticZone": "Cold Arid Apricot & Seabuckthorn Zone"
  },
  {
    "id": "dist-in-py-puducherry",
    "lgdCode": 598,
    "stateCode": "IN-PY",
    "name": "Puducherry",
    "headquarters": "Puducherry",
    "translations": {
      "hi": "पुदुचेरी",
      "te": "పుదుచ్చేరి",
      "en": "Puducherry"
    },
    "agroClimaticZone": "Coromandel Coastal Agricultural Zone"
  },
  {
    "id": "dist-in-ch-chandigarh",
    "lgdCode": 52,
    "stateCode": "IN-CH",
    "name": "Chandigarh",
    "headquarters": "Chandigarh",
    "translations": {
      "hi": "चंडीगढ़",
      "te": "చండీగఢ్",
      "en": "Chandigarh"
    },
    "agroClimaticZone": "Shivalik Foothills Zone"
  },
  {
    "id": "dist-in-dh-dadra",
    "lgdCode": 464,
    "stateCode": "IN-DH",
    "name": "Dadra and Nagar Haveli",
    "headquarters": "Silvassa",
    "translations": {
      "hi": "दादरा एवं नगर हवेली",
      "te": "దాద్రా నగర్ హవేలి",
      "en": "Dadra and Nagar Haveli"
    },
    "agroClimaticZone": "Western Coastal Mango & Rice Zone"
  },
  {
    "id": "dist-in-an-south-andaman",
    "lgdCode": 603,
    "stateCode": "IN-AN",
    "name": "South Andaman",
    "headquarters": "Port Blair",
    "translations": {
      "hi": "दक्षिण अंडमान",
      "te": "సౌత్ అండమాన్",
      "en": "South Andaman"
    },
    "agroClimaticZone": "Island Humid Spices & Coconut Zone"
  },
  {
    "id": "dist-in-ld-lakshadweep",
    "lgdCode": 553,
    "stateCode": "IN-LD",
    "name": "Lakshadweep",
    "headquarters": "Kavaratti",
    "translations": {
      "hi": "लक्षद्वीप",
      "te": "లక్షద్వీప్",
      "en": "Lakshadweep"
    },
    "agroClimaticZone": "Coral Island Organic Coconut Belt"
  }
];

export const AUTHORITATIVE_SUB_DISTRICTS: SubDistrict[] = [
  {
    "id": "sub-in-ap-tadikonda",
    "lgdCode": 4910,
    "districtId": "dist-in-ap-guntur",
    "stateCode": "IN-AP",
    "name": "Tadikonda",
    "terminology": "MANDAL",
    "translations": {
      "te": "తాడికొండ",
      "hi": "ताडिकोंडा",
      "en": "Tadikonda"
    }
  },
  {
    "id": "sub-in-ap-tenali",
    "lgdCode": 4915,
    "districtId": "dist-in-ap-guntur",
    "stateCode": "IN-AP",
    "name": "Tenali",
    "terminology": "MANDAL",
    "translations": {
      "te": "తెనాలి",
      "hi": "तेनाली",
      "en": "Tenali"
    }
  },
  {
    "id": "sub-in-ap-adoni",
    "lgdCode": 4960,
    "districtId": "dist-in-ap-kurnool",
    "stateCode": "IN-AP",
    "name": "Adoni",
    "terminology": "MANDAL",
    "translations": {
      "te": "ఆదోని",
      "hi": "आदोनी",
      "en": "Adoni"
    }
  },
  {
    "id": "sub-in-tg-narsampet",
    "lgdCode": 4721,
    "districtId": "dist-in-tg-warangal",
    "stateCode": "IN-TG",
    "name": "Narsampet",
    "terminology": "MANDAL",
    "translations": {
      "te": "నర్సంపేట",
      "hi": "नरसमपेट",
      "en": "Narsampet"
    }
  },
  {
    "id": "sub-in-tg-kallur",
    "lgdCode": 4680,
    "districtId": "dist-in-tg-khammam",
    "stateCode": "IN-TG",
    "name": "Kallur",
    "terminology": "MANDAL",
    "translations": {
      "te": "కల్లూరు",
      "hi": "कल्लूर",
      "en": "Kallur"
    }
  },
  {
    "id": "sub-in-ka-byadgi",
    "lgdCode": 5310,
    "districtId": "dist-in-ka-haveri",
    "stateCode": "IN-KA",
    "name": "Byadgi",
    "terminology": "TALUK",
    "translations": {
      "kn": "ಬ್ಯಾಡಗಿ",
      "te": "బ్యాడగి",
      "hi": "ब्यादगी",
      "en": "Byadgi"
    }
  },
  {
    "id": "sub-in-ka-devanahalli",
    "lgdCode": 5280,
    "districtId": "dist-in-ka-bengaluru-rural",
    "stateCode": "IN-KA",
    "name": "Devanahalli",
    "terminology": "TALUK",
    "translations": {
      "kn": "ದೇವನಹಳ್ಳಿ",
      "te": "దేవనహళ్లి",
      "hi": "देवनहल्ली",
      "en": "Devanahalli"
    }
  },
  {
    "id": "sub-in-tn-kodumudi",
    "lgdCode": 5740,
    "districtId": "dist-in-tn-erode",
    "stateCode": "IN-TN",
    "name": "Kodumudi",
    "terminology": "TALUK",
    "translations": {
      "ta": "கொடுமுடி",
      "te": "కొడుముడి",
      "hi": "कोडमुडी",
      "en": "Kodumudi"
    }
  },
  {
    "id": "sub-in-tn-kumbakonam",
    "lgdCode": 5800,
    "districtId": "dist-in-tn-thanjavur",
    "stateCode": "IN-TN",
    "name": "Kumbakonam",
    "terminology": "TALUK",
    "translations": {
      "ta": "கும்பகோணம்",
      "te": "కుంభకోణం",
      "hi": "कुंभकोणम",
      "en": "Kumbakonam"
    }
  },
  {
    "id": "sub-in-kl-udumbanchola",
    "lgdCode": 5590,
    "districtId": "dist-in-kl-idukki",
    "stateCode": "IN-KL",
    "name": "Udumbanchola",
    "terminology": "TALUK",
    "translations": {
      "ml": "ഉടുമ്പൻചോല",
      "te": "ఉడుంబంచోల",
      "hi": "उडुम्बनचोला",
      "en": "Udumbanchola"
    }
  },
  {
    "id": "sub-in-kl-alathur",
    "lgdCode": 5610,
    "districtId": "dist-in-kl-palakkad",
    "stateCode": "IN-KL",
    "name": "Alathur",
    "terminology": "TALUK",
    "translations": {
      "ml": "ആലത്തൂർ",
      "te": "ఆలత్తూరు",
      "hi": "आलाथुर",
      "en": "Alathur"
    }
  },
  {
    "id": "sub-in-mh-niphad",
    "lgdCode": 4890,
    "districtId": "dist-in-mh-nashik",
    "stateCode": "IN-MH",
    "name": "Niphad (Lasalgaon)",
    "terminology": "TALUKA",
    "translations": {
      "mr": "निफाड",
      "te": "నిఫాడ్",
      "hi": "निफाड़",
      "en": "Niphad"
    }
  },
  {
    "id": "sub-in-mh-raver",
    "lgdCode": 4840,
    "districtId": "dist-in-mh-jalgaon",
    "stateCode": "IN-MH",
    "name": "Raver",
    "terminology": "TALUKA",
    "translations": {
      "mr": "रावेर",
      "te": "రావేర్",
      "hi": "रावेर",
      "en": "Raver"
    }
  },
  {
    "id": "sub-in-gj-gondal",
    "lgdCode": 3820,
    "districtId": "dist-in-gj-rajkot",
    "stateCode": "IN-GJ",
    "name": "Gondal",
    "terminology": "TALUKA",
    "translations": {
      "hi": "गोंडल",
      "te": "గోండల్",
      "en": "Gondal"
    }
  },
  {
    "id": "sub-in-gj-talala",
    "lgdCode": 3850,
    "districtId": "dist-in-gj-junagadh",
    "stateCode": "IN-GJ",
    "name": "Talala",
    "terminology": "TALUKA",
    "translations": {
      "hi": "तालाला",
      "te": "తలాళా",
      "en": "Talala"
    }
  },
  {
    "id": "sub-in-up-fatehabad",
    "lgdCode": 820,
    "districtId": "dist-in-up-agra",
    "stateCode": "IN-UP",
    "name": "Fatehabad",
    "terminology": "TEHSIL",
    "translations": {
      "hi": "फतेहाबाद",
      "te": "ఫతేహాబాద్",
      "en": "Fatehabad"
    }
  },
  {
    "id": "sub-in-up-pindra",
    "lgdCode": 910,
    "districtId": "dist-in-up-varanasi",
    "stateCode": "IN-UP",
    "name": "Pindra",
    "terminology": "TEHSIL",
    "translations": {
      "hi": "पिंडरा",
      "te": "పిండ్రా",
      "en": "Pindra"
    }
  },
  {
    "id": "sub-in-pb-jagraon",
    "lgdCode": 180,
    "districtId": "dist-in-pb-ludhiana",
    "stateCode": "IN-PB",
    "name": "Jagraon",
    "terminology": "TEHSIL",
    "translations": {
      "hi": "जग्राओं",
      "te": "జగ్రాయోన్",
      "en": "Jagraon"
    }
  },
  {
    "id": "sub-in-pb-ajnala",
    "lgdCode": 150,
    "districtId": "dist-in-pb-amritsar",
    "stateCode": "IN-PB",
    "name": "Ajnala",
    "terminology": "TEHSIL",
    "translations": {
      "hi": "अजनाला",
      "te": "అజ్నాలా",
      "en": "Ajnala"
    }
  },
  {
    "id": "sub-in-br-fatwah",
    "lgdCode": 2150,
    "districtId": "dist-in-br-patna",
    "stateCode": "IN-BR",
    "name": "Fatwah",
    "terminology": "BLOCK",
    "translations": {
      "hi": "फतुहा",
      "te": "ఫతుహా",
      "en": "Fatwah"
    }
  },
  {
    "id": "sub-in-br-mushahari",
    "lgdCode": 2110,
    "districtId": "dist-in-br-muzaffarpur",
    "stateCode": "IN-BR",
    "name": "Mushahari",
    "terminology": "BLOCK",
    "translations": {
      "hi": "मुशहरी",
      "te": "ముషహరి",
      "en": "Mushahari"
    }
  },
  {
    "id": "sub-in-mp-sanwer",
    "lgdCode": 3450,
    "districtId": "dist-in-mp-indore",
    "stateCode": "IN-MP",
    "name": "Sanwer",
    "terminology": "TEHSIL",
    "translations": {
      "hi": "सांवेर",
      "te": "సాన్వేర్",
      "en": "Sanwer"
    }
  },
  {
    "id": "sub-in-mp-ujjain",
    "lgdCode": 3460,
    "districtId": "dist-in-mp-ujjain",
    "stateCode": "IN-MP",
    "name": "Ujjain City",
    "terminology": "TEHSIL",
    "translations": {
      "hi": "उज्जैन ग्रामीण",
      "te": "ఉజ్జయిని",
      "en": "Ujjain"
    }
  },
  {
    "id": "sub-in-rj-sanganer",
    "lgdCode": 601,
    "districtId": "dist-in-rj-jaipur",
    "stateCode": "IN-RJ",
    "name": "Sanganer",
    "terminology": "TEHSIL",
    "translations": {
      "hi": "सांगानेर",
      "te": "సాంగానేర్",
      "en": "Sanganer"
    }
  },
  {
    "id": "sub-in-rj-luni",
    "lgdCode": 620,
    "districtId": "dist-in-rj-jodhpur",
    "stateCode": "IN-RJ",
    "name": "Luni",
    "terminology": "TEHSIL",
    "translations": {
      "hi": "लूणी",
      "te": "లూని",
      "en": "Luni"
    }
  },
  {
    "id": "sub-in-hr-karnal",
    "lgdCode": 340,
    "districtId": "dist-in-hr-karnal",
    "stateCode": "IN-HR",
    "name": "Karnal",
    "terminology": "TEHSIL",
    "translations": {
      "hi": "करनाल",
      "te": "కర్నాల్",
      "en": "Karnal"
    }
  },
  {
    "id": "sub-in-hr-hansi",
    "lgdCode": 345,
    "districtId": "dist-in-hr-hisar",
    "stateCode": "IN-HR",
    "name": "Hansi",
    "terminology": "TEHSIL",
    "translations": {
      "hi": "हांसी",
      "te": "హాన్సి",
      "en": "Hansi"
    }
  },
  {
    "id": "sub-in-wb-singur",
    "lgdCode": 2810,
    "districtId": "dist-in-wb-hooghly",
    "stateCode": "IN-WB",
    "name": "Singur",
    "terminology": "BLOCK",
    "translations": {
      "hi": "सिंगूर",
      "te": "సింగూర్",
      "en": "Singur"
    }
  },
  {
    "id": "sub-in-wb-memari",
    "lgdCode": 2820,
    "districtId": "dist-in-wb-bardhaman",
    "stateCode": "IN-WB",
    "name": "Memari-I",
    "terminology": "BLOCK",
    "translations": {
      "hi": "मेमारी",
      "te": "మేమారి",
      "en": "Memari-I"
    }
  },
  {
    "id": "sub-in-od-salepur",
    "lgdCode": 3201,
    "districtId": "dist-in-od-cuttack",
    "stateCode": "IN-OD",
    "name": "Salepur",
    "terminology": "BLOCK",
    "translations": {
      "hi": "सालेपुर",
      "te": "సలేపూర్",
      "en": "Salepur"
    }
  },
  {
    "id": "sub-in-od-bargarh",
    "lgdCode": 3210,
    "districtId": "dist-in-od-bargarh",
    "stateCode": "IN-OD",
    "name": "Bargarh Block",
    "terminology": "BLOCK",
    "translations": {
      "hi": "बरगढ़ ब्लॉक",
      "te": "బర్‌గఢ్ బ్లాక్",
      "en": "Bargarh Block"
    }
  },
  {
    "id": "sub-in-ct-arang",
    "lgdCode": 3310,
    "districtId": "dist-in-ct-raipur",
    "stateCode": "IN-CT",
    "name": "Arang",
    "terminology": "TEHSIL",
    "translations": {
      "hi": "आरंग",
      "te": "ఆరంగ్",
      "en": "Arang"
    }
  },
  {
    "id": "sub-in-ct-patan",
    "lgdCode": 3315,
    "districtId": "dist-in-ct-durg",
    "stateCode": "IN-CT",
    "name": "Patan",
    "terminology": "TEHSIL",
    "translations": {
      "hi": "पाटन",
      "te": "పాటన్",
      "en": "Patan"
    }
  },
  {
    "id": "sub-in-jh-kanke",
    "lgdCode": 3050,
    "districtId": "dist-in-jh-ranchi",
    "stateCode": "IN-JH",
    "name": "Kanke",
    "terminology": "BLOCK",
    "translations": {
      "hi": "कांके",
      "te": "కాంకే",
      "en": "Kanke"
    }
  },
  {
    "id": "sub-in-jh-barhi",
    "lgdCode": 3055,
    "districtId": "dist-in-jh-hazaribagh",
    "stateCode": "IN-JH",
    "name": "Barhi",
    "terminology": "BLOCK",
    "translations": {
      "hi": "बरही",
      "te": "బర్హి",
      "en": "Barhi"
    }
  },
  {
    "id": "sub-in-as-north-guwahati",
    "lgdCode": 2501,
    "districtId": "dist-in-as-kamrup",
    "stateCode": "IN-AS",
    "name": "North Guwahati",
    "terminology": "SUB_DIVISION",
    "translations": {
      "hi": "उत्तरी गुवाहाटी",
      "te": "నార్త్ గౌహతి",
      "en": "North Guwahati"
    }
  },
  {
    "id": "sub-in-as-titabor",
    "lgdCode": 2510,
    "districtId": "dist-in-as-jorhat",
    "stateCode": "IN-AS",
    "name": "Titabor",
    "terminology": "SUB_DIVISION",
    "translations": {
      "hi": "तिताबोर",
      "te": "తితాబోర్",
      "en": "Titabor"
    }
  },
  {
    "id": "sub-in-ut-rishikesh",
    "lgdCode": 260,
    "districtId": "dist-in-ut-dehradun",
    "stateCode": "IN-UT",
    "name": "Rishikesh",
    "terminology": "TEHSIL",
    "translations": {
      "hi": "ऋषिकेश",
      "te": "రిషికేశ్",
      "en": "Rishikesh"
    }
  },
  {
    "id": "sub-in-ut-roorkee",
    "lgdCode": 270,
    "districtId": "dist-in-ut-haridwar",
    "stateCode": "IN-UT",
    "name": "Roorkee",
    "terminology": "TEHSIL",
    "translations": {
      "hi": "रुड़की",
      "te": "రూర్కీ",
      "en": "Roorkee"
    }
  },
  {
    "id": "sub-in-hp-theog",
    "lgdCode": 120,
    "districtId": "dist-in-hp-shimla",
    "stateCode": "IN-HP",
    "name": "Theog",
    "terminology": "TEHSIL",
    "translations": {
      "hi": "ठियोग",
      "te": "థియోగ్",
      "en": "Theog"
    }
  },
  {
    "id": "sub-in-hp-palampur",
    "lgdCode": 130,
    "districtId": "dist-in-hp-kangra",
    "stateCode": "IN-HP",
    "name": "Palampur",
    "terminology": "TEHSIL",
    "translations": {
      "hi": "पालमपुर",
      "te": "పాలంపూర్",
      "en": "Palampur"
    }
  },
  {
    "id": "sub-in-ga-bardez",
    "lgdCode": 5101,
    "districtId": "dist-in-ga-north-goa",
    "stateCode": "IN-GA",
    "name": "Bardez",
    "terminology": "TALUKA",
    "translations": {
      "hi": "बारदेज़",
      "te": "బార్దేజ్",
      "en": "Bardez"
    }
  },
  {
    "id": "sub-in-ga-salcete",
    "lgdCode": 5102,
    "districtId": "dist-in-ga-south-goa",
    "stateCode": "IN-GA",
    "name": "Salcete",
    "terminology": "TALUKA",
    "translations": {
      "hi": "सालसेटे",
      "te": "సాల్సెట్",
      "en": "Salcete"
    }
  },
  {
    "id": "sub-in-tr-sadar",
    "lgdCode": 2201,
    "districtId": "dist-in-tr-west-tripura",
    "stateCode": "IN-TR",
    "name": "Sadar",
    "terminology": "SUB_DIVISION",
    "translations": {
      "hi": "सदर",
      "te": "సదర్",
      "en": "Sadar"
    }
  },
  {
    "id": "sub-in-ml-mawphlang",
    "lgdCode": 2301,
    "districtId": "dist-in-ml-east-khasi-hills",
    "stateCode": "IN-ML",
    "name": "Mawphlang",
    "terminology": "BLOCK",
    "translations": {
      "hi": "मावफलंग",
      "te": "మావ్‌ఫ్లాంగ్",
      "en": "Mawphlang"
    }
  },
  {
    "id": "sub-in-mn-lamshang",
    "lgdCode": 2101,
    "districtId": "dist-in-mn-imphal-west",
    "stateCode": "IN-MN",
    "name": "Lamshang",
    "terminology": "SUB_DIVISION",
    "translations": {
      "hi": "लामशांग",
      "te": "లామ్‌షాంగ్",
      "en": "Lamshang"
    }
  },
  {
    "id": "sub-in-nl-sechu",
    "lgdCode": 2001,
    "districtId": "dist-in-nl-kohima",
    "stateCode": "IN-NL",
    "name": "Sechu Zubza",
    "terminology": "SUB_DIVISION",
    "translations": {
      "hi": "सेचु जुबजा",
      "te": "సెచు జుబ్జా",
      "en": "Sechu Zubza"
    }
  },
  {
    "id": "sub-in-mz-tlangnuam",
    "lgdCode": 2151,
    "districtId": "dist-in-mz-aizawl",
    "stateCode": "IN-MZ",
    "name": "Tlangnuam",
    "terminology": "BLOCK",
    "translations": {
      "hi": "त्लांगनुआम",
      "te": "త్లాంగ్నుయామ్",
      "en": "Tlangnuam"
    }
  },
  {
    "id": "sub-in-sk-gangtok",
    "lgdCode": 1801,
    "districtId": "dist-in-sk-gangtok",
    "stateCode": "IN-SK",
    "name": "Gangtok Sub-Division",
    "terminology": "SUB_DIVISION",
    "translations": {
      "hi": "गंगटोक उप-मंडल",
      "te": "గ్యాంగ్‌టక్ సబ్-డివిజన్",
      "en": "Gangtok Sub-Division"
    }
  },
  {
    "id": "sub-in-ar-sagalee",
    "lgdCode": 1901,
    "districtId": "dist-in-ar-papum-pare",
    "stateCode": "IN-AR",
    "name": "Sagalee",
    "terminology": "SUB_DIVISION",
    "translations": {
      "hi": "सागाली",
      "te": "సాగలీ",
      "en": "Sagalee"
    }
  },
  {
    "id": "sub-in-dl-najafgarh",
    "lgdCode": 410,
    "districtId": "dist-in-dl-south-west",
    "stateCode": "IN-DL",
    "name": "Najafgarh",
    "terminology": "TEHSIL",
    "translations": {
      "hi": "नजफगढ़",
      "te": "నజఫ్‌గఢ్",
      "en": "Najafgarh"
    }
  },
  {
    "id": "sub-in-jk-srinagar-south",
    "lgdCode": 30,
    "districtId": "dist-in-jk-srinagar",
    "stateCode": "IN-JK",
    "name": "Srinagar South",
    "terminology": "TEHSIL",
    "translations": {
      "hi": "श्रीनगर दक्षिण",
      "te": "శ్రీనగర్ సౌత్",
      "en": "Srinagar South"
    }
  },
  {
    "id": "sub-in-jk-rs-pura",
    "lgdCode": 50,
    "districtId": "dist-in-jk-jammu",
    "stateCode": "IN-JK",
    "name": "R.S. Pura",
    "terminology": "TEHSIL",
    "translations": {
      "hi": "आर.एस. पुरा",
      "te": "ఆర్.ఎస్. పురా",
      "en": "R.S. Pura"
    }
  },
  {
    "id": "sub-in-la-leh",
    "lgdCode": 60,
    "districtId": "dist-in-la-leh",
    "stateCode": "IN-LA",
    "name": "Leh Tehsil",
    "terminology": "TEHSIL",
    "translations": {
      "hi": "लेह तहसील",
      "te": "లేహ్ తహసీల్",
      "en": "Leh Tehsil"
    }
  },
  {
    "id": "sub-in-py-villianur",
    "lgdCode": 5801,
    "districtId": "dist-in-py-puducherry",
    "stateCode": "IN-PY",
    "name": "Villianur",
    "terminology": "TALUK",
    "translations": {
      "hi": "विल्लियनूर",
      "te": "విల్లియనూర్",
      "en": "Villianur"
    }
  },
  {
    "id": "sub-in-ch-chandigarh",
    "lgdCode": 240,
    "districtId": "dist-in-ch-chandigarh",
    "stateCode": "IN-CH",
    "name": "Chandigarh Tehsil",
    "terminology": "TEHSIL",
    "translations": {
      "hi": "चंडीगढ़ तहसील",
      "te": "చండీగఢ్ తహసీల్",
      "en": "Chandigarh Tehsil"
    }
  },
  {
    "id": "sub-in-dh-silvassa",
    "lgdCode": 4401,
    "districtId": "dist-in-dh-dadra",
    "stateCode": "IN-DH",
    "name": "Silvassa",
    "terminology": "TALUKA",
    "translations": {
      "hi": "सिलवासा",
      "te": "సిల్వాస్సా",
      "en": "Silvassa"
    }
  },
  {
    "id": "sub-in-an-ferrargunj",
    "lgdCode": 5901,
    "districtId": "dist-in-an-south-andaman",
    "stateCode": "IN-AN",
    "name": "Ferrargunj",
    "terminology": "TEHSIL",
    "translations": {
      "hi": "फेरारगंज",
      "te": "ఫెరార్‌గంజ్",
      "en": "Ferrargunj"
    }
  },
  {
    "id": "sub-in-ld-kavaratti",
    "lgdCode": 5301,
    "districtId": "dist-in-ld-lakshadweep",
    "stateCode": "IN-LD",
    "name": "Kavaratti Island",
    "terminology": "SUB_DIVISION",
    "translations": {
      "hi": "कवरत्ती द्वीप",
      "te": "కవరత్తి ద్వీపం",
      "en": "Kavaratti Island"
    }
  }
];

export const AUTHORITATIVE_VILLAGES: Village[] = [
  {
    "id": "vil-in-ap-tadikonda-01",
    "lgdCode": 589101,
    "subDistrictId": "sub-in-ap-tadikonda",
    "districtId": "dist-in-ap-guntur",
    "stateCode": "IN-AP",
    "name": "Kantheru",
    "pinCode": "522501",
    "isPanchayatHeadquarter": true,
    "translations": {
      "te": "కాంతేరు",
      "hi": "कांतेरू"
    }
  },
  {
    "id": "vil-in-ap-tadikonda-02",
    "lgdCode": 589102,
    "subDistrictId": "sub-in-ap-tadikonda",
    "districtId": "dist-in-ap-guntur",
    "stateCode": "IN-AP",
    "name": "Ponnekallu",
    "pinCode": "522018",
    "translations": {
      "te": "పొన్నెకల్లు",
      "hi": "पोन्नेकल्लू"
    }
  },
  {
    "id": "vil-in-ap-tenali-01",
    "lgdCode": 589210,
    "subDistrictId": "sub-in-ap-tenali",
    "districtId": "dist-in-ap-guntur",
    "stateCode": "IN-AP",
    "name": "Angalakuduru",
    "pinCode": "522211",
    "isPanchayatHeadquarter": true,
    "translations": {
      "te": "అంగలకుదురు",
      "hi": "अंगलाकुदुरु"
    }
  },
  {
    "id": "vil-in-ap-adoni-01",
    "lgdCode": 591020,
    "subDistrictId": "sub-in-ap-adoni",
    "districtId": "dist-in-ap-kurnool",
    "stateCode": "IN-AP",
    "name": "Basapuram",
    "pinCode": "518301",
    "isPanchayatHeadquarter": true,
    "translations": {
      "te": "బసపురం",
      "hi": "बासापुरम"
    }
  },
  {
    "id": "vil-in-tg-narsampet-01",
    "lgdCode": 574210,
    "subDistrictId": "sub-in-tg-narsampet",
    "districtId": "dist-in-tg-warangal",
    "stateCode": "IN-TG",
    "name": "Maheshwaram",
    "pinCode": "506132",
    "isPanchayatHeadquarter": true,
    "translations": {
      "te": "మహేశ్వరం",
      "hi": "महेश्वरम"
    }
  },
  {
    "id": "vil-in-tg-kallur-01",
    "lgdCode": 574310,
    "subDistrictId": "sub-in-tg-kallur",
    "districtId": "dist-in-tg-khammam",
    "stateCode": "IN-TG",
    "name": "Peruvancha",
    "pinCode": "507209",
    "isPanchayatHeadquarter": true,
    "translations": {
      "te": "పెరువంచ",
      "hi": "पेरुवंचा"
    }
  },
  {
    "id": "vil-in-ka-byadgi-01",
    "lgdCode": 602310,
    "subDistrictId": "sub-in-ka-byadgi",
    "districtId": "dist-in-ka-haveri",
    "stateCode": "IN-KA",
    "name": "Kaginelli",
    "pinCode": "581110",
    "isPanchayatHeadquarter": true,
    "translations": {
      "kn": "ಕಾಗಿನೆಲೆ",
      "te": "కాగినెల్లె",
      "hi": "कागिनेल्ली"
    }
  },
  {
    "id": "vil-in-ka-devanahalli-01",
    "lgdCode": 602410,
    "subDistrictId": "sub-in-ka-devanahalli",
    "districtId": "dist-in-ka-bengaluru-rural",
    "stateCode": "IN-KA",
    "name": "Bidaluru",
    "pinCode": "562110",
    "isPanchayatHeadquarter": true,
    "translations": {
      "kn": "ಬಿದಲೂರು",
      "te": "బిదలూరు",
      "hi": "बिदलूर"
    }
  },
  {
    "id": "vil-in-tn-kodumudi-01",
    "lgdCode": 642010,
    "subDistrictId": "sub-in-tn-kodumudi",
    "districtId": "dist-in-tn-erode",
    "stateCode": "IN-TN",
    "name": "Unjalur",
    "pinCode": "638152",
    "isPanchayatHeadquarter": true,
    "translations": {
      "ta": "ஊஞ்சலூர்",
      "te": "ఊంజలూర్",
      "hi": "ऊंजलूर"
    }
  },
  {
    "id": "vil-in-tn-kumbakonam-01",
    "lgdCode": 642110,
    "subDistrictId": "sub-in-tn-kumbakonam",
    "districtId": "dist-in-tn-thanjavur",
    "stateCode": "IN-TN",
    "name": "Dharasuram",
    "pinCode": "612702",
    "isPanchayatHeadquarter": true,
    "translations": {
      "ta": "தாராசுரம்",
      "te": "ధారాసురం",
      "hi": "धारासुरम"
    }
  },
  {
    "id": "vil-in-kl-udumbanchola-01",
    "lgdCode": 628010,
    "subDistrictId": "sub-in-kl-udumbanchola",
    "districtId": "dist-in-kl-idukki",
    "stateCode": "IN-KL",
    "name": "Nedumkandam",
    "pinCode": "685553",
    "isPanchayatHeadquarter": true,
    "translations": {
      "ml": "നെടുംകണ്ടം",
      "te": "నెడుంకండం",
      "hi": "नेदुमकंडम"
    }
  },
  {
    "id": "vil-in-kl-alathur-01",
    "lgdCode": 628110,
    "subDistrictId": "sub-in-kl-alathur",
    "districtId": "dist-in-kl-palakkad",
    "stateCode": "IN-KL",
    "name": "Kavassery",
    "pinCode": "678543",
    "isPanchayatHeadquarter": true,
    "translations": {
      "ml": "കാവശ്ശേരി",
      "te": "కావస్సేరి",
      "hi": "कावस्सेरी"
    }
  },
  {
    "id": "vil-in-mh-niphad-01",
    "lgdCode": 554101,
    "subDistrictId": "sub-in-mh-niphad",
    "districtId": "dist-in-mh-nashik",
    "stateCode": "IN-MH",
    "name": "Lasalgaon",
    "pinCode": "422306",
    "isPanchayatHeadquarter": true,
    "translations": {
      "mr": "लासलगाव",
      "hi": "लासलगांव",
      "te": "లాసల్గావ్"
    }
  },
  {
    "id": "vil-in-mh-raver-01",
    "lgdCode": 554201,
    "subDistrictId": "sub-in-mh-raver",
    "districtId": "dist-in-mh-jalgaon",
    "stateCode": "IN-MH",
    "name": "Savda",
    "pinCode": "425502",
    "isPanchayatHeadquarter": true,
    "translations": {
      "mr": "सावदा",
      "hi": "सावदा",
      "te": "సావ్దా"
    }
  },
  {
    "id": "vil-in-gj-gondal-01",
    "lgdCode": 512001,
    "subDistrictId": "sub-in-gj-gondal",
    "districtId": "dist-in-gj-rajkot",
    "stateCode": "IN-GJ",
    "name": "Bhojpara",
    "pinCode": "360311",
    "isPanchayatHeadquarter": true,
    "translations": {
      "hi": "भोजपारा",
      "te": "భోజ్‌పారా"
    }
  },
  {
    "id": "vil-in-gj-talala-01",
    "lgdCode": 512101,
    "subDistrictId": "sub-in-gj-talala",
    "districtId": "dist-in-gj-junagadh",
    "stateCode": "IN-GJ",
    "name": "Ankolvadi",
    "pinCode": "362150",
    "isPanchayatHeadquarter": true,
    "translations": {
      "hi": "अंकोलवाड़ी",
      "te": "అంకోల్వాడి"
    }
  },
  {
    "id": "vil-in-up-fatehabad-01",
    "lgdCode": 130101,
    "subDistrictId": "sub-in-up-fatehabad",
    "districtId": "dist-in-up-agra",
    "stateCode": "IN-UP",
    "name": "Dhanauli",
    "pinCode": "283111",
    "isPanchayatHeadquarter": true,
    "translations": {
      "hi": "धनौली",
      "te": "ధనౌలి"
    }
  },
  {
    "id": "vil-in-up-pindra-01",
    "lgdCode": 130201,
    "subDistrictId": "sub-in-up-pindra",
    "districtId": "dist-in-up-varanasi",
    "stateCode": "IN-UP",
    "name": "Babepur",
    "pinCode": "221206",
    "isPanchayatHeadquarter": true,
    "translations": {
      "hi": "बाबेपुर",
      "te": "బాబేపూర్"
    }
  },
  {
    "id": "vil-in-pb-jagraon-01",
    "lgdCode": 38010,
    "subDistrictId": "sub-in-pb-jagraon",
    "districtId": "dist-in-pb-ludhiana",
    "stateCode": "IN-PB",
    "name": "Sohian",
    "pinCode": "142026",
    "isPanchayatHeadquarter": true,
    "translations": {
      "hi": "सोहियां",
      "te": "సోహియాన్"
    }
  },
  {
    "id": "vil-in-br-fatwah-01",
    "lgdCode": 241010,
    "subDistrictId": "sub-in-br-fatwah",
    "districtId": "dist-in-br-patna",
    "stateCode": "IN-BR",
    "name": "Daniwan",
    "pinCode": "803201",
    "isPanchayatHeadquarter": true,
    "translations": {
      "hi": "दानियावां",
      "te": "దానివాన్"
    }
  },
  {
    "id": "vil-in-mp-sanwer-01",
    "lgdCode": 478101,
    "subDistrictId": "sub-in-mp-sanwer",
    "districtId": "dist-in-mp-indore",
    "stateCode": "IN-MP",
    "name": "Kshipra",
    "pinCode": "453771",
    "isPanchayatHeadquarter": true,
    "translations": {
      "hi": "क्षिप्रा",
      "te": "క్షిప్రా"
    }
  },
  {
    "id": "vil-in-mp-ujjain-01",
    "lgdCode": 478102,
    "subDistrictId": "sub-in-mp-ujjain",
    "districtId": "dist-in-mp-ujjain",
    "stateCode": "IN-MP",
    "name": "Narwar",
    "pinCode": "456664",
    "isPanchayatHeadquarter": true,
    "translations": {
      "hi": "नरवर",
      "te": "నర్వార్"
    }
  },
  {
    "id": "vil-in-rj-sanganer-01",
    "lgdCode": 78901,
    "subDistrictId": "sub-in-rj-sanganer",
    "districtId": "dist-in-rj-jaipur",
    "stateCode": "IN-RJ",
    "name": "Muhana",
    "pinCode": "302029",
    "isPanchayatHeadquarter": true,
    "translations": {
      "hi": "मुहाना",
      "te": "ముహానా"
    }
  },
  {
    "id": "vil-in-rj-luni-01",
    "lgdCode": 78902,
    "subDistrictId": "sub-in-rj-luni",
    "districtId": "dist-in-rj-jodhpur",
    "stateCode": "IN-RJ",
    "name": "Shikarpura",
    "pinCode": "342014",
    "isPanchayatHeadquarter": true,
    "translations": {
      "hi": "शिकारपुरा",
      "te": "షికార్‌పురా"
    }
  },
  {
    "id": "vil-in-hr-karnal-01",
    "lgdCode": 5501,
    "subDistrictId": "sub-in-hr-karnal",
    "districtId": "dist-in-hr-karnal",
    "stateCode": "IN-HR",
    "name": "Uchana",
    "pinCode": "132001",
    "isPanchayatHeadquarter": true,
    "translations": {
      "hi": "उचाना",
      "te": "ఉచానా"
    }
  },
  {
    "id": "vil-in-wb-singur-01",
    "lgdCode": 108201,
    "subDistrictId": "sub-in-wb-singur",
    "districtId": "dist-in-wb-hooghly",
    "stateCode": "IN-WB",
    "name": "Gopalnagar",
    "pinCode": "712409",
    "isPanchayatHeadquarter": true,
    "translations": {
      "hi": "गोपालनगर",
      "te": "గోపాల్‌నగర్"
    }
  },
  {
    "id": "vil-in-od-salepur-01",
    "lgdCode": 112001,
    "subDistrictId": "sub-in-od-salepur",
    "districtId": "dist-in-od-cuttack",
    "stateCode": "IN-OD",
    "name": "Bahugram",
    "pinCode": "754200",
    "isPanchayatHeadquarter": true,
    "translations": {
      "hi": "बहुग्राम",
      "te": "బహుగ్రామ్"
    }
  },
  {
    "id": "vil-in-ct-arang-01",
    "lgdCode": 123401,
    "subDistrictId": "sub-in-ct-arang",
    "districtId": "dist-in-ct-raipur",
    "stateCode": "IN-CT",
    "name": "Chandkhuri",
    "pinCode": "492101",
    "isPanchayatHeadquarter": true,
    "translations": {
      "hi": "चंदखुरी",
      "te": "చంద్‌ఖురి"
    }
  },
  {
    "id": "vil-in-jh-kanke-01",
    "lgdCode": 134501,
    "subDistrictId": "sub-in-jh-kanke",
    "districtId": "dist-in-jh-ranchi",
    "stateCode": "IN-JH",
    "name": "Sukurhutu",
    "pinCode": "834006",
    "isPanchayatHeadquarter": true,
    "translations": {
      "hi": "सुकुरहुतु",
      "te": "సుకుర్‌హుతు"
    }
  },
  {
    "id": "vil-in-as-north-guwahati-01",
    "lgdCode": 145601,
    "subDistrictId": "sub-in-as-north-guwahati",
    "districtId": "dist-in-as-kamrup",
    "stateCode": "IN-AS",
    "name": "Sualkuchi",
    "pinCode": "781103",
    "isPanchayatHeadquarter": true,
    "translations": {
      "hi": "सुआलकुची",
      "te": "సువాల్‌కుచి"
    }
  },
  {
    "id": "vil-in-ut-rishikesh-01",
    "lgdCode": 156701,
    "subDistrictId": "sub-in-ut-rishikesh",
    "districtId": "dist-in-ut-dehradun",
    "stateCode": "IN-UT",
    "name": "Raiwala",
    "pinCode": "249205",
    "isPanchayatHeadquarter": true,
    "translations": {
      "hi": "रायवाला",
      "te": "రాయ్‌వాలా"
    }
  },
  {
    "id": "vil-in-hp-theog-01",
    "lgdCode": 167801,
    "subDistrictId": "sub-in-hp-theog",
    "districtId": "dist-in-hp-shimla",
    "stateCode": "IN-HP",
    "name": "Fagu",
    "pinCode": "171209",
    "isPanchayatHeadquarter": true,
    "translations": {
      "hi": "फागू",
      "te": "ఫాగూ"
    }
  },
  {
    "id": "vil-in-ga-bardez-01",
    "lgdCode": 178901,
    "subDistrictId": "sub-in-ga-bardez",
    "districtId": "dist-in-ga-north-goa",
    "stateCode": "IN-GA",
    "name": "Assagao",
    "pinCode": "403507",
    "isPanchayatHeadquarter": true,
    "translations": {
      "hi": "असागाओ",
      "te": "అస్సగావ్"
    }
  },
  {
    "id": "vil-in-tr-sadar-01",
    "lgdCode": 189001,
    "subDistrictId": "sub-in-tr-sadar",
    "districtId": "dist-in-tr-west-tripura",
    "stateCode": "IN-TR",
    "name": "Ranirbazar",
    "pinCode": "799035",
    "isPanchayatHeadquarter": true,
    "translations": {
      "hi": "रानीरबाजार",
      "te": "రాణిర్‌బజార్"
    }
  },
  {
    "id": "vil-in-ml-mawphlang-01",
    "lgdCode": 190101,
    "subDistrictId": "sub-in-ml-mawphlang",
    "districtId": "dist-in-ml-east-khasi-hills",
    "stateCode": "IN-ML",
    "name": "Ladmawphlang",
    "pinCode": "793121",
    "isPanchayatHeadquarter": true,
    "translations": {
      "hi": "लडमावफलांग",
      "te": "లడ్మావ్‌ఫ్లాంగ్"
    }
  },
  {
    "id": "vil-in-mn-lamshang-01",
    "lgdCode": 201201,
    "subDistrictId": "sub-in-mn-lamshang",
    "districtId": "dist-in-mn-imphal-west",
    "stateCode": "IN-MN",
    "name": "Awang Sekmai",
    "pinCode": "795136",
    "isPanchayatHeadquarter": true,
    "translations": {
      "hi": "अवांग सेकमाई",
      "te": "అవాంగ్ సెక్‌మాయ్"
    }
  },
  {
    "id": "vil-in-nl-sechu-01",
    "lgdCode": 212301,
    "subDistrictId": "sub-in-nl-sechu",
    "districtId": "dist-in-nl-kohima",
    "stateCode": "IN-NL",
    "name": "Khonoma",
    "pinCode": "797002",
    "isPanchayatHeadquarter": true,
    "translations": {
      "hi": "खोनोमा",
      "te": "ఖోనోమా"
    }
  },
  {
    "id": "vil-in-mz-tlangnuam-01",
    "lgdCode": 223401,
    "subDistrictId": "sub-in-mz-tlangnuam",
    "districtId": "dist-in-mz-aizawl",
    "stateCode": "IN-MZ",
    "name": "Sairang",
    "pinCode": "796014",
    "isPanchayatHeadquarter": true,
    "translations": {
      "hi": "सैरांग",
      "te": "సైరాంగ్"
    }
  },
  {
    "id": "vil-in-sk-gangtok-01",
    "lgdCode": 234501,
    "subDistrictId": "sub-in-sk-gangtok",
    "districtId": "dist-in-sk-gangtok",
    "stateCode": "IN-SK",
    "name": "Rumtek",
    "pinCode": "737135",
    "isPanchayatHeadquarter": true,
    "translations": {
      "hi": "रुमटेक",
      "te": "రుమ్‌టెక్"
    }
  },
  {
    "id": "vil-in-ar-sagalee-01",
    "lgdCode": 245601,
    "subDistrictId": "sub-in-ar-sagalee",
    "districtId": "dist-in-ar-papum-pare",
    "stateCode": "IN-AR",
    "name": "Doimukh",
    "pinCode": "791112",
    "isPanchayatHeadquarter": true,
    "translations": {
      "hi": "दोईमुख",
      "te": "దోయిముఖ్"
    }
  },
  {
    "id": "vil-in-dl-najafgarh-01",
    "lgdCode": 256701,
    "subDistrictId": "sub-in-dl-najafgarh",
    "districtId": "dist-in-dl-south-west",
    "stateCode": "IN-DL",
    "name": "Dichaon Kalan",
    "pinCode": "110043",
    "isPanchayatHeadquarter": true,
    "translations": {
      "hi": "दिचाऊं कलां",
      "te": "దిచావోన్ కలాన్"
    }
  },
  {
    "id": "vil-in-jk-rs-pura-01",
    "lgdCode": 267801,
    "subDistrictId": "sub-in-jk-rs-pura",
    "districtId": "dist-in-jk-jammu",
    "stateCode": "IN-JK",
    "name": "Suchetgarh",
    "pinCode": "181111",
    "isPanchayatHeadquarter": true,
    "translations": {
      "hi": "सुचेतगढ़",
      "te": "సుచేత్‌గఢ్"
    }
  },
  {
    "id": "vil-in-la-leh-01",
    "lgdCode": 278901,
    "subDistrictId": "sub-in-la-leh",
    "districtId": "dist-in-la-leh",
    "stateCode": "IN-LA",
    "name": "Chushot",
    "pinCode": "194101",
    "isPanchayatHeadquarter": true,
    "translations": {
      "hi": "चुशोट",
      "te": "చుషోట్"
    }
  },
  {
    "id": "vil-in-py-villianur-01",
    "lgdCode": 289001,
    "subDistrictId": "sub-in-py-villianur",
    "districtId": "dist-in-py-puducherry",
    "stateCode": "IN-PY",
    "name": "Koodapakkam",
    "pinCode": "605502",
    "isPanchayatHeadquarter": true,
    "translations": {
      "hi": "कूडापक्कम",
      "te": "కూడపక్కం"
    }
  },
  {
    "id": "vil-in-ch-chandigarh-01",
    "lgdCode": 290101,
    "subDistrictId": "sub-in-ch-chandigarh",
    "districtId": "dist-in-ch-chandigarh",
    "stateCode": "IN-CH",
    "name": "Mani Majra",
    "pinCode": "160101",
    "isPanchayatHeadquarter": true,
    "translations": {
      "hi": "मनी माजरा",
      "te": "మణి మాజ్రా"
    }
  },
  {
    "id": "vil-in-dh-silvassa-01",
    "lgdCode": 301201,
    "subDistrictId": "sub-in-dh-silvassa",
    "districtId": "dist-in-dh-dadra",
    "stateCode": "IN-DH",
    "name": "Naroli",
    "pinCode": "396235",
    "isPanchayatHeadquarter": true,
    "translations": {
      "hi": "नरोली",
      "te": "నరోలి"
    }
  },
  {
    "id": "vil-in-an-ferrargunj-01",
    "lgdCode": 312301,
    "subDistrictId": "sub-in-an-ferrargunj",
    "districtId": "dist-in-an-south-andaman",
    "stateCode": "IN-AN",
    "name": "Wimberlygunj",
    "pinCode": "744206",
    "isPanchayatHeadquarter": true,
    "translations": {
      "hi": "विम्बरलीगंज",
      "te": "వింబర్లీగంజ్"
    }
  },
  {
    "id": "vil-in-ld-kavaratti-01",
    "lgdCode": 323401,
    "subDistrictId": "sub-in-ld-kavaratti",
    "districtId": "dist-in-ld-lakshadweep",
    "stateCode": "IN-LD",
    "name": "Kavaratti Rural",
    "pinCode": "682555",
    "isPanchayatHeadquarter": true,
    "translations": {
      "hi": "कवरत्ती ग्रामीण",
      "te": "కవరత్తి గ్రామీణం"
    }
  }
];
