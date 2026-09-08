import { Language } from '@/types';

export interface MeeBhoomiTranslation {
  title: string;
  subtitle: string;
  badge: string;
  buttonText: string;
  externalNotice: string;
  features: string[];
  disclaimer: string;
  securityNote: string;
  officialUrl: string;
}

export const meebhoomiTranslations: Record<Language, MeeBhoomiTranslation> = {
  te: {
    title: 'ఏపీ మీభూమి (AP MeeBhoomi)',
    subtitle: 'మీ అధికారిక భూమి రికార్డులను పరిశీలించండి',
    badge: 'ఆంధ్రప్రదేశ్ ప్రభుత్వం • అధికారిక పోర్టల్',
    buttonText: 'మీభూమి ఓపెన్ చేయండి',
    externalNotice: 'ఇది ఆంధ్రప్రదేశ్ ప్రభుత్వ అధికారిక బాహ్య వెబ్‌సైట్',
    features: [
      'గ్రామ అడంగల్ & మీ అడంగల్',
      '1-B (ROR) రికార్డులు',
      'గ్రామ పటం & ఎఫ్.ఎం.బి (FMB)',
      'ఎలక్ట్రానిక్ పట్టాదారు పాస్‌బుక్',
    ],
    disclaimer:
      'గమనిక: రైతుమిత్ర ప్రభుత్వ పాస్‌బుక్ లేదా ఆధార్ వివరాలను సేకరించదు. మీ భూమి ధృవీకరణ మరియు అడంగల్ వివరాలు నేరుగా మీభూమి అధికారిక వెబ్‌సైట్ ద్వారా మాత్రమే సురక్షితంగా నిర్వహించబడతాయి.',
    securityNote: 'సురక్షిత అధికారిక పోర్టల్ • ఆధార్/పాస్‌బుక్ ధ్రువీకరణ ప్రభుత్వం వద్దే జరుగుతుంది',
    officialUrl: 'https://meebhoomi.ap.gov.in/',
  },
  en: {
    title: 'AP MeeBhoomi',
    subtitle: 'View your official land records',
    badge: 'Government of Andhra Pradesh • Official Portal',
    buttonText: 'Open MeeBhoomi',
    externalNotice: 'Opens official Government of Andhra Pradesh website',
    features: [
      'Village Adangal & Your Adangal',
      '1-B (Record of Rights)',
      'Village Map & FMB Sketches',
      'Electronic Pattadar Passbook',
    ],
    disclaimer:
      'Note: RythuMitra never collects or stores government credentials, Aadhaar, or passbook passwords. Official land record verification and authentication occurs strictly on the official meebhoomi.ap.gov.in portal.',
    securityNote: 'Secure Government Gateway • Authentication handled exclusively by Govt. of AP',
    officialUrl: 'https://meebhoomi.ap.gov.in/',
  },
  hi: {
    title: 'एपी मीभूमि (AP MeeBhoomi)',
    subtitle: 'अपने आधिकारिक भूमि अभिलेख देखें',
    badge: 'आंध्र प्रदेश सरकार • आधिकारिक पोर्टल',
    buttonText: 'मीभूमि खोलें',
    externalNotice: 'यह आंध्र प्रदेश सरकार की आधिकारिक वेबसाइट खोलता है',
    features: [
      'ग्राम अडंगल और आपकी अडंगल',
      '1-B (अधिकार अभिलेख - ROR)',
      'ग्राम मानचित्र एवं FMB स्केच',
      'इलेक्ट्रॉनिक पट्टादार पासबुक',
    ],
    disclaimer:
      'नोट: रैतुमित्र कभी भी सरकारी क्रेडेंशियल, आधार या पासबुक पासवर्ड एकत्र नहीं करता। भूमि सत्यापन सीधे meebhoomi.ap.gov.in पर सुरक्षित रूप से होता है।',
    securityNote: 'सुरक्षित सरकारी पोर्टल • सत्यापन केवल आंध्र प्रदेश सरकार द्वारा किया जाता है',
    officialUrl: 'https://meebhoomi.ap.gov.in/',
  },
  ta: {
    title: 'ஏபி மீபூமி (AP MeeBhoomi)',
    subtitle: 'உங்கள் அதிகாரப்பூர்வ நில ஆவணங்களைப் பார்க்கவும்',
    badge: 'ஆந்திரப் பிரதேச அரசு • அதிகாரப்பூர்வ போர்டல்',
    buttonText: 'மீபூமி திறக்கவும்',
    externalNotice: 'ஆந்திரப் பிரதேச அரசின் அதிகாரப்பூர்வ வலைத்தளத்தைத் திறக்கிறது',
    features: [
      'கிராம அடங்கல் & உங்கள் அடங்கல்',
      '1-B (உரிமை ஆவணம் - ROR)',
      'கிராம வரைபடம் & FMB',
      'மின்னணு பட்டாதார் பாஸ்புக்',
    ],
    disclaimer:
      'குறிப்பு: ரைதுமித்ரா அரசு கடவுச்சொற்கள், ஆதார் அல்லது பாஸ்புக் விவரங்களைச் சேகரிப்பதில்லை. சரிபார்ப்பு meebhoomi.ap.gov.in தளத்தில் மட்டுமே பாதுகாப்பாக நடக்கிறது.',
    securityNote: 'பாதுகாப்பான அரசு போர்டல் • சரிபார்ப்பு அரசு இணையதளத்தில் மட்டுமே',
    officialUrl: 'https://meebhoomi.ap.gov.in/',
  },
  kn: {
    title: 'ಎಪಿ ಮೀಭೂಮಿ (AP MeeBhoomi)',
    subtitle: 'ನಿಮ್ಮ ಅಧಿಕೃತ ಜಮೀನು ದಾಖಲೆಗಳನ್ನು ವೀಕ್ಷಿಸಿ',
    badge: 'ಆಂಧ್ರಪ್ರದೇಶ ಸರ್ಕಾರ • ಅಧಿಕೃತ ಪೋರ್ಟಲ್',
    buttonText: 'ಮೀಭೂಮಿ ತೆರೆಯಿರಿ',
    externalNotice: 'ಆಂಧ್ರಪ್ರದೇಶ ಸರ್ಕಾರದ ಅಧಿಕೃತ ವೆಬ್‌ಸೈಟ್ ತೆರೆಯುತ್ತದೆ',
    features: [
      'ಗ್ರಾಮ ಅಡಂಗಲ್ ಮತ್ತು ನಿಮ್ಮ ಅಡಂಗಲ್',
      '1-B (ರೆಕಾರ್ಡ್ ಆಫ್ ರೈಟ್ಸ್ - ROR)',
      'ಗ್ರಾಮ ನಕ್ಷೆ ಮತ್ತು FMB',
      'ಎಲೆಕ್ಟ್ರಾನಿಕ್ ಪಟ್ಟಾದಾರ್ ಪಾಸ್‌ಬುಕ್',
    ],
    disclaimer:
      'ಸೂಚನೆ: ರೈತುಮಿತ್ರ ಸರ್ಕಾರಿ ಪಾಸ್‌ವರ್ಡ್ ಅಥವಾ ಆಧಾರ್ ವಿವರಗಳನ್ನು ಸಂಗ್ರಹಿಸುವುದಿಲ್ಲ. ಅಧಿಕೃತ ಜಮೀನು ಪರಿಶೀಲನೆ meebhoomi.ap.gov.in ನಲ್ಲಿ ಮಾತ್ರ ನಡೆಯುತ್ತದೆ.',
    securityNote: 'ಸುರಕ್ಷಿತ ಸರ್ಕಾರಿ ಪೋರ್ಟಲ್ • ದೃಢೀಕರಣ ಸರ್ಕಾರಿ ವೆಬ್‌ಸೈಟ್‌ನಲ್ಲೇ ನಡೆಯುತ್ತದೆ',
    officialUrl: 'https://meebhoomi.ap.gov.in/',
  },
  ml: {
    title: 'എ.പി മീഭൂമി (AP MeeBhoomi)',
    subtitle: 'നിങ്ങളുടെ ഔദ്യോഗിക ഭൂമി രേഖകൾ കാണുക',
    badge: 'ആന്ധ്രാപ്രദേശ് സർക്കാർ • ഔദ്യോഗിക പോർട്ടൽ',
    buttonText: 'മീഭൂമി തുറക്കുക',
    externalNotice: 'ആന്ധ്രാപ്രദേശിന്റെ ഔദ്യോഗിക വെബ്സൈറ്റ് തുറക്കുന്നു',
    features: [
      'വില്ലേജ് അടങ്കൽ & നിങ്ങളുടെ അടങ്കൽ',
      '1-B (റെക്കോർഡ് ഓഫ് റൈറ്റ്സ്)',
      'വില്ലേജ് മാപ്പും എഫ്.എം.ബിയും',
      'ഇലക്ട്രോണിക് പട്ടാദാർ പാസ്ബുക്ക്',
    ],
    disclaimer:
      'ശ്രദ്ധിക്കുക: റൈതുമിത്ര ഒരിക്കലും സർക്കാർ പാസ്‌വേഡുകളോ ആധാർ വിവരങ്ങളോ ശേഖരിക്കില്ല. ഔദ്യോഗിക പരിശോധന meebhoomi.ap.gov.in ൽ മാത്രം നടക്കുന്നു.',
    securityNote: 'സുരക്ഷിത സർക്കാർ പോർട്ടൽ • ആധികാരികത സർക്കാർ വഴി മാത്രം',
    officialUrl: 'https://meebhoomi.ap.gov.in/',
  },
  mr: {
    title: 'एपी मीभूमी (AP MeeBhoomi)',
    subtitle: 'तुमच्या अधिकृत जमीन नोंदी पहा',
    badge: 'आंध्र प्रदेश शासन • अधिकृत पोर्टल',
    buttonText: 'मीभूमी उघडा',
    externalNotice: 'आंध्र प्रदेश शासनाची अधिकृत वेबसाइट उघडते',
    features: [
      'गाव अडंगल आणि तुमचे अडंगल',
      '1-B (अधिकार अभिलेख - ROR)',
      'गाव नकाशा आणि FMB स्केच',
      'इलेक्ट्रॉनिक पट्टादार पासबुक',
    ],
    disclaimer:
      'टीप: रैतुमित्र कधीही शासकीय क्रेडेन्शियल, आधार किंवा पासबुक पासवर्ड गोळा करत नाही. जमीन पडताळणी थेट meebhoomi.ap.gov.in वर सुरक्षितपणे होते.',
    securityNote: 'सुरक्षित सरकारी पोर्टल • प्रमाणीकरण केवळ आंध्र प्रदेश सरकारद्वारे',
    officialUrl: 'https://meebhoomi.ap.gov.in/',
  },
};

export function getMeeBhoomiTranslation(lang: Language): MeeBhoomiTranslation {
  return meebhoomiTranslations[lang] || meebhoomiTranslations.te || meebhoomiTranslations.en;
}
