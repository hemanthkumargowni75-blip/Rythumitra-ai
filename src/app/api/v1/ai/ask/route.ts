import { NextRequest, NextResponse } from 'next/server';
import { Language, AiAdviceResponse } from '@/types';

// Multilingual localized response knowledge base
const ADVICE_TEMPLATES: Record<string, Record<Language, any>> = {
  thrips_curling: {
    en: {
      whatIsHappening: 'Your chilli leaves are curling upward into a boat-like shape, and flower buds are dropping prematurely.',
      why: 'This is caused by Black Thrips (Scirtothrips dorsalis) infesting tender apical leaves and sucking cell sap during hot, dry weather.',
      whatShouldIDoNow: [
        'Install 40 Blue Sticky Traps per acre immediately to capture adult thrips.',
        'Spray Spinetoram 11.7% SC (Delegate) @ 15 ml per 16L pump strictly in early morning (7–10 AM).',
        'Foliar spray 13-0-45 (Potassium Nitrate) @ 5g/L water to prevent flower drop.',
      ],
      whenToContactExpert: 'If leaves continue to brown and curl after 4 days of spraying, contact Dr. K. Venkata Rao or your local RBK officer.',
    },
    te: {
      whatIsHappening: 'మీ మిర్చి తోటలో చిగురు ఆకులు పైకి ముడుచుకుని పడవ ఆకారంలో మారుతున్నాయి, అలాగే పూత రాలిపోతోంది.',
      why: 'ఇది నల్ల తామర పురుగుల (Black Thrips) తీవ్ర దాడి వలన జరుగుతోంది. ఇవి లేత ఆకుల అడుగుభాగం నుండి రసం పీల్చడం వల్ల ఆకులు ముడుచుకుంటాయి.',
      whatShouldIDoNow: [
        'తోటలో ఎకరానికి 40 నీలి రంగు జిగురు అట్టలను (Blue Sticky Traps) వెంటనే కర్రలకు కట్టండి.',
        'స్పైనెటోరం 11.7% SC (డెలిగేట్) 15 మి.లీ 16 లీటర్ల పంపుకు కలిపి ఉదయం 7-10 గంటల మధ్య పిచికారీ చేయండి.',
        'పూత నిలబడేందుకు 13-0-45 పొటాషియం నైట్రేట్ 5 గ్రాములు లీటరు నీటికి కలిపి పిచికారీ చేయండి.',
      ],
      whenToContactExpert: 'మందు పిచికారీ చేసిన 4 రోజుల తర్వాత కూడా తామర పురుగుల ఉధృతి తగ్గకపోతే వ్యవసాయ శాస్త్రవేత్తను సంప్రదించండి.',
    },
    hi: {
      whatIsHappening: 'आपकी मिर्च की फसल में नई पत्तियां ऊपर की ओर मुड़कर नाव के आकार की हो रही हैं और फूल झड़ रहे हैं।',
      why: 'यह काले थ्रिप्स (Black Thrips) के प्रकोप के कारण है जो पत्तियों के नीचे से रस चूसते हैं।',
      whatShouldIDoNow: [
        'खेत में प्रति एकड़ 40 नीले चिपचिपे ट्रैप (Blue Sticky Traps) तुरंत लगाएं।',
        'स्पाइनेटोरम 11.7% SC (डेलिगेट) 15 मिली प्रति 16 लीटर स्प्रे पंप में मिलाकर सुबह 7-10 बजे के बीच छिड़कें।',
        'फूलों को झड़ने से रोकने के लिए 13-0-45 (5 ग्राम प्रति लीटर) का छिड़काव करें।',
      ],
      whenToContactExpert: 'यदि छिड़काव के 4 दिन बाद भी पत्तियां सीधी न हों, तो नजदीकी कृषि विशेषज्ञ से परामर्श लें।',
    },
    ta: {
      whatIsHappening: 'உங்கள் மிளகாய் பயிரில் இலைகள் மேல்நோக்கி படகு போல சுருண்டு, பூக்கள் உதிர்ந்து வருகின்றன.',
      why: 'இது கருப்பு இலைப்பேன் (Black Thrips) சாற்றை உறிஞ்சுவதால் ஏற்படுகிறது.',
      whatShouldIDoNow: [
        'ஏக்கருக்கு 40 நீல நிற ஒட்டும் பொறிகளை உடனடியாக வயலில் வைக்கவும்.',
        'ஸ்பைனெட்டோரம் 11.7% SC (டெலிகேட்) 15 மிலி மருந்தை 16 லிட்டர் பம்பில் கலந்து காலை 7-10 மணிக்குள் தெளிக்கவும்.',
        'பூ உதிர்வதைத் தடுக்க 13-0-45 பொட்டாசியம் நைட்ரேட் (5 கிராம்/லிட்டர்) தெளிக்கவும்.',
      ],
      whenToContactExpert: 'மருந்து தெளித்து 4 நாட்களுக்குப் பிறகும் பூச்சி கட்டுப்படாவிட்டால் வேளாண் விஞ்ஞானியை அணுகவும்.',
    },
    ml: {
      whatIsHappening: 'മുളകിന്റെ തളിരിലകൾ മുകളിലേക്ക് ചുരുളുകയും പൂക്കൾ കൊഴിയുകയും ചെയ്യുന്നു.',
      why: 'ഇലപ്പേനുകൾ (Black Thrips) ഇലകളിൽ നിന്ന് നീരൂറ്റിക്കുടിക്കുന്നതാണ് ഇതിന് കാരണം.',
      whatShouldIDoNow: [
        'ഏക്കറിന് 40 നീല ഒട്ടുന്ന കെണികൾ ഉടൻ തന്നെ സ്ഥാപിക്കുക.',
        'സ്പൈനെറ്റോറം 11.7% SC (ഡെലിഗേറ്റ്) 15 മില്ലി 16 ലിറ്റർ പമ്പിൽ ചേർത്ത് രാവിലെ 7-10 നകം തളിക്കുക.',
        'പൂക്കൾ കൊഴിയാതിരിക്കാൻ 13-0-45 (5 ഗ്രാം/ലിറ്റർ) തളിക്കുക.',
      ],
      whenToContactExpert: 'തളിച്ചു 4 ദിവസത്തിനുശേഷവും മാറ്റമില്ലെങ്കിൽ കൃഷി ഓഫീസറെ ബന്ധപ്പെടുക.',
    },
    kn: {
      whatIsHappening: 'ನಿಮ್ಮ ಮೆಣಸಿನಕಾಯಿ ಗಿಡಗಳ ಎಲೆಗಳು ಮೇಲ್ಮುಖವಾಗಿ ಸುರುಟಿಕೊಳ್ಳುತ್ತಿವೆ ಮತ್ತು ಹೂಗಳು ಉದುರುತ್ತಿವೆ.',
      why: 'ಇದು ಕಪ್ಪು ನುಸಿ ಅಥವಾ ಥ್ರಿಪ್ಸ್ (Black Thrips) ರಸ ಹೀರುವುದರಿಂದ ಉಂಟಾಗುತ್ತಿದೆ.',
      whatShouldIDoNow: [
        'ಎಕರೆಗೆ 40 ನೀಲಿ ಜಿಗುಟು ಬಲೆಗಳನ್ನು ತಕ್ಷಣವೇ ಹೊಲದಲ್ಲಿ ಅಳವಡಿಸಿ.',
        'ಸ್ಪೈನೆಟೋರಮ್ 11.7% SC (ಡೆಲಿಗೇಟ್) 15 ಮಿಲಿ 16 ಲೀಟರ್ ಪಂಪ್‌ಗೆ ಬೆರೆಸಿ ಬೆಳಿಗ್ಗೆ 7-10 ಗಂಟೆಯೊಳಗೆ ಸಿಂಪಡಿಸಿ.',
        'ಹೂವು ಉದುರುವುದನ್ನು ತಡೆಯಲು 13-0-45 (5 ಗ್ರಾಂ/ಲೀಟರ್) ಸಿಂಪಡಿಸಿ.',
      ],
      whenToContactExpert: 'ಸಿಂಪಡಿಸಿದ 4 ದಿನಗಳ ನಂತರವೂ ರೋಗ ಕಡಿಮೆಯಾಗದಿದ್ದರೆ ಕೃಷಿ ತಜ್ಞರನ್ನು ಸಂಪರ್ಕಿಸಿ.',
    },
    mr: {
      whatIsHappening: 'मिरचीच्या पिकात कोवळी पाने वरच्या दिशेने चुरडत आहेत आणि फुले गळत आहेत.',
      why: 'हे काळ्या थ्रिप्स (Black Thrips) रस शोषून घेत असल्यामुळे घडत आहे.',
      whatShouldIDoNow: [
        'प्रति एकर 40 निळे चिकट सापळे (Blue Sticky Traps) ताबडतोब लावा.',
        'स्पायनेटोरम 11.7% SC (डेलिगेट) 15 मिली 16 लिटर पंपासाठी मिसळून सकाळी 7 ते 10 दरम्यान फवारणी करा.',
        'फूलगळ रोखण्यासाठी 13-0-45 (5 ग्रॅम/लिटर) फवारा.',
      ],
      whenToContactExpert: 'फवारणीनंतर 4 दिवसांनीही सुधारणा न झाल्यास कृषी शास्त्रज्ञांचा सल्ला घ्या.',
    },
  },

  irrigation_schedule: {
    en: {
      whatIsHappening: 'Your field soil moisture is at 65%, and crop is at peak flowering stage with high water transpiration.',
      why: 'Flowering plants require steady moisture to support pollination without water stress or saturation.',
      whatShouldIDoNow: [
        'Run your drip irrigation system for 2.5 hours tomorrow late afternoon.',
        'Note: Rain is expected on Wednesday (38 mm); do NOT over-irrigate today.',
        'Maintain clear drainage channels to evacuate excess runoff during Wednesday storm.',
      ],
      whenToContactExpert: 'If waterlogging occurs post-rain and plants show wilting symptoms within 48 hours.',
    },
    te: {
      whatIsHappening: 'మీ పొలంలో తేమ 65% ఉంది, మరియు తేజా మిర్చి పూత దశలో ఉంది కాబట్టి నీటి అవసరం ఎక్కువగా ఉంటుంది.',
      why: 'పూత రాలకుండా ఉండేందుకు మరియు ఫలదీకరణం సజావుగా సాగేందుకు మూలాల వద్ద నిలకడైన తేమ అవసరం.',
      whatShouldIDoNow: [
        'రేపు సాయంత్రం మీ 3.75 ఎకరాల తోటలోని డ్రిప్ మోటారును 2.5 గంటల పాటు నడపండి.',
        'బుధవారం 38 మిల్లీమీటర్ల భారీ వర్ష సూచన ఉంది కాబట్టి ఎక్కువ నీరు పెట్టవద్దు.',
        'వర్షపు నీరు చేనులో నిల్వ ఉండకుండా మురుగు నీటి బోదెలను సిద్ధం చేయండి.',
      ],
      whenToContactExpert: 'భారీ వర్షం తర్వాత చేనులో నీరు నిల్వ ఉండి మొక్కలు వడలిపోతే వెంటనే RBK అధికారిని పిలవండి.',
    },
    hi: {
      whatIsHappening: 'आपके खेत में मिट्टी की नमी 65% है और फसल फूल आने की अवस्था में है।',
      why: 'फूलों के विकास और परागण के लिए जड़ों के पास निरंतर संतुलित नमी आवश्यक है।',
      whatShouldIDoNow: [
        'कल शाम ड्रिप सिंचाई मोटर को 2.5 घंटे तक चलाएं।',
        'बुधवार को भारी बारिश की संभावना है, इसलिए आज आवश्यकता से अधिक पानी न दें।',
        'खेत से अतिरिक्त पानी की निकासी के लिए नालियां साफ रखें।',
      ],
      whenToContactExpert: 'यदि बारिश के बाद जलभराव हो और पौधे मुरझाने लगें, तो तुरंत विशेषज्ञ से संपर्क करें।',
    },
    ta: {
      whatIsHappening: 'உங்கள் நிலத்தில் மண் ஈரப்பதம் 65% ஆக உள்ளது, பயிர் பூக்கும் நிலையில் உள்ளது.',
      why: 'பூக்கள் உதிராமல் இருக்க வேர்ப்பகுதியில் சீரான ஈரப்பதம் மிகவும் அவசியம்.',
      whatShouldIDoNow: [
        'நாளை மாலை சொட்டு நீர் பாசனத்தை 2.5 மணி நேரம் இயக்கவும்.',
        'புதன்கிழமை மழை வாய்ப்பு உள்ளதால் அதிக தண்ணீர் பாய்ச்ச வேண்டாம்.',
        'வடிகால் வாய்க்கால்களைச் சுத்தமாக வைத்திருக்கவும்.',
      ],
      whenToContactExpert: 'மழைக்குப் பின் வயலில் தண்ணீர் தேங்கி பயிர் வாடினால் அதிகாரியை அணுகவும்.',
    },
    ml: {
      whatIsHappening: 'മണ്ണിലെ ഈർപ്പം 65% ആണ്, വിള പൂവിടുന്ന ഘട്ടത്തിലാണ്.',
      why: 'പൂക്കൾ കൊഴിയാതിരിക്കാൻ കൃത്യമായ ഈർപ്പം ആവശ്യമാണ്.',
      whatShouldIDoNow: [
        'നാളെ വൈകുന്നേരം ഡ്രിപ്പ് സിസ്റ്റം 2.5 മണിക്കൂർ പ്രവർത്തിപ്പിക്കുക.',
        'ബുധനാഴ്ച കനത്ത മഴ സാധ്യതയുള്ളതിനാൽ ഇന്ന് കൂടുതൽ നനയ്ക്കരുത്.',
        'വെള്ളം ഒഴുകിപ്പോകാനുള്ള ചാലുകൾ വൃത്തിയാക്കുക.',
      ],
      whenToContactExpert: 'മഴയ്ക്ക് ശേഷം വെള്ളക്കെട്ട് ഉണ്ടായാൽ ഉദ്യോഗസ്ഥനെ സമീപിക്കുക.',
    },
    kn: {
      whatIsHappening: 'ಜಮೀನಿನಲ್ಲಿ ತೇವಾಂಶ 65% ಇದೆ ಮತ್ತು ಬೆಳೆಯು ಹೂವಾಡುವ ಹಂತದಲ್ಲಿದೆ.',
      why: 'ಹೂವುಗಳು ಉದುರದಿರಲು ಬೇರಿನ ಬಳಿ ಸಮತೋಲಿತ ತೇವಾಂಶದ ಅಗತ್ಯವಿದೆ.',
      whatShouldIDoNow: [
        'ನಾಳೆ ಸಂಜೆ ಹನಿ ನೀರಾವರಿ ಮೋಟಾರನ್ನು 2.5 ಗಂಟೆಗಳ ಕಾಲ ಚಲಾಯಿಸಿ.',
        'ಬುಧವಾರ ಭಾರಿ ಮಳೆ ನಿರೀಕ್ಷೆಯಿರುವುದರಿಂದ ಅತಿಯಾಗಿ ನೀರು ಹಾಯಿಸಬೇಡಿ.',
        'ಹೆಚ್ಚುವರಿ ನೀರು ಹರಿದುಹೋಗಲು ಬಸಿಗಾಲುವೆಗಳನ್ನು ಸಿದ್ಧಪಡಿಸಿ.',
      ],
      whenToContactExpert: 'ಮಳೆಯ ನಂತರ ನೀರು ನಿಂತು ಗಿಡಗಳು ಬಾಡಿದರೆ ತಕ್ಷಣ ತಜ್ಞರನ್ನು ಸಂಪರ್ಕಿಸಿ.',
    },
    mr: {
      whatIsHappening: 'मातीतील ओलावा 65% आहे आणि पीक फुलोऱ्याच्या अवस्थेत आहे.',
      why: 'फूलगळ रोखण्यासाठी झाडांच्या मुळांशी नियमित ओलावा असणे गरजेचे आहे.',
      whatShouldIDoNow: [
        'उद्या संध्याकाळी ठिबक सिंचन 2.5 तास चालवा.',
        'बुधवारी पावसाचा इशारा असल्याने आज अतिरिक्त पाणी देऊ नका.',
        'पाण्याचा निचरा होण्यासाठी शेतातील चर स्वच्छ ठेवा.',
      ],
      whenToContactExpert: 'पावसानंतर पाणी साचून झाडे सुकल्यास कृषी अधिकाऱ्यांशी संपर्क साधा.',
    },
  },
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { question = '', language = 'te' } = body;
    const cleanLang = (language.split('-')[0] || 'te') as Language;
    const qLower = question.toLowerCase();

    // Select template
    let templateKey = 'thrips_curling';
    if (
      qLower.includes('water') ||
      qLower.includes('irrigate') ||
      qLower.includes('నీరు') ||
      qLower.includes('తడి') ||
      qLower.includes('पानी') ||
      qLower.includes('तन्णीर्') ||
      qLower.includes('നനയ്ക്കണം')
    ) {
      templateKey = 'irrigation_schedule';
    }

    const template = ADVICE_TEMPLATES[templateKey][cleanLang] || ADVICE_TEMPLATES[templateKey]['en'];

    const response: AiAdviceResponse = {
      question,
      language: cleanLang,
      detectedIntent: templateKey,
      cropContext: 'Teja Chilli (3.75 Acres, Flowering Stage, Tadikonda, Guntur)',
      whatIsHappening: template.whatIsHappening,
      why: template.why,
      whatShouldIDoNow: template.whatShouldIDoNow,
      whenToContactExpert: template.whenToContactExpert,
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { error: 'AI Assistant failed to generate response' },
      { status: 500 }
    );
  }
}
