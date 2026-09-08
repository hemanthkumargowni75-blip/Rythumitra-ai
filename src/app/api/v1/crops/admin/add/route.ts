import { NextRequest, NextResponse } from 'next/server';
import { addCustomCrop } from '@/data/cropDatabase';
import { CropEntity, CropCategory } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      id,
      category,
      scientificName,
      iconEmoji,
      durationDays,
      waterRequirementMm,
      expectedYieldPerAcre,
      riskLevel,
      aliases,
      translations,
    } = body;

    if (!id || !category || !scientificName) {
      return NextResponse.json(
        { error: 'Missing required fields: id, category, and scientificName are mandatory.' },
        { status: 400 }
      );
    }

    const newCrop: CropEntity = {
      id: id.trim().toLowerCase().replace(/\s+/g, '-'),
      category: (category as CropCategory) || 'OTHER',
      scientificName: scientificName.trim(),
      iconEmoji: iconEmoji || '🌱',
      durationDays: Number(durationDays) || 120,
      waterRequirementMm: Number(waterRequirementMm) || 500,
      expectedYieldPerAcre: expectedYieldPerAcre || '15 - 20 Quintals',
      riskLevel: riskLevel || 'MEDIUM',
      suitableSeasons: ['KHARIF', 'RABI'],
      suitableSoils: ['RED_LOAMY', 'BLACK_COTTON'],
      aliases: Array.isArray(aliases)
        ? aliases
        : typeof aliases === 'string'
        ? aliases.split(',').map((s: string) => s.trim()).filter(Boolean)
        : [],
      stages: [
        { stageName: 'Vegetative', stageNameTe: 'శాఖీయ దశ', daysRange: '1 - 35 Days', description: 'Early growth and branching.', waterNeed: 'Moderate', keyAction: 'Weeding and basal fertilizer.' },
        { stageName: 'Flowering', stageNameTe: 'పూత దశ', daysRange: '40 - 75 Days', description: 'Blooming and fruit set.', waterNeed: 'Critical', keyAction: 'Protect from pests and supply moisture.' },
        { stageName: 'Maturity', stageNameTe: 'కోత దశ', daysRange: '80 - 120 Days', description: 'Harvest readiness.', waterNeed: 'Low', keyAction: 'Harvest at optimum maturity.' },
      ],
      translations: translations || {
        en: {
          name: id,
          localNames: [id],
          whatIsThis: `${id} is a cultivated agricultural crop registered in RythuMitra database.`,
          growingSeason: 'Grown during suitable Kharif or Rabi seasons.',
          soilRequirements: 'Well-drained fertile soils.',
          waterRequirements: `${waterRequirementMm || 500} mm throughout season.`,
          mainStages: ['Vegetative', 'Flowering', 'Maturity'],
          whatToMonitor: ['Leaf health', 'Moisture level', 'Pest symptoms'],
          commonPestsAndDiseases: ['Seasonal insect pests', 'Fungal leaf spots'],
          generalCare: 'Follow standard agronomic package of practices.',
          whenToContactExpert: 'Contact an agronomist if severe pest infestation occurs.',
        },
        te: {
          name: id,
          localNames: [id],
          whatIsThis: `${id} రైతుమిత్ర డేటాబేస్‌లో చేర్చబడిన ఒక వ్యవసాయ పంట.`,
          growingSeason: 'ఖరీఫ్ లేదా రబీ సీజన్లలో అనుకూలం.',
          soilRequirements: 'సారవంతమైన ఎర్ర లేదా నల్లరేగడి నేలలు.',
          waterRequirements: 'మధ్యస్థ నీటి అవసరం.',
          mainStages: ['ఎదుగుదల', 'పూత', 'కోత'],
          whatToMonitor: ['ఆకు ఆరోగ్యం', 'తేమ స్థాయి'],
          commonPestsAndDiseases: ['సాధారణ తెగుళ్లు'],
          generalCare: 'సమగ్ర సస్యరక్షణ పాటించండి.',
          whenToContactExpert: 'తెగులు ఉధృతి పెరిగితే శాస్త్రవేత్తను సంప్రదించండి.',
        },
        hi: {
          name: id,
          localNames: [id],
          whatIsThis: `${id} डेटाबेस में जोड़ी गई फसल है।`,
          growingSeason: 'खरीफ या रबी।',
          soilRequirements: 'उपजाऊ दोमट मिट्टी।',
          waterRequirements: 'मध्यम पानी।',
          mainStages: ['वृद्धि', 'फूल', 'कटाई'],
          whatToMonitor: ['पत्तियों का स्वास्थ्य'],
          commonPestsAndDiseases: ['कीट व रोग'],
          generalCare: 'उचित देखभाल करें।',
          whenToContactExpert: 'कीट बढ़ने पर संपर्क करें।',
        },
        ta: { name: id, localNames: [id], whatIsThis: `${id} பயிர் தகவல்.`, growingSeason: 'பருவம்.', soilRequirements: 'மண்.', waterRequirements: 'நீர்.', mainStages: ['வளர்ச்சி', 'அறுவடை'], whatToMonitor: ['ஆரோக்கியம்'], commonPestsAndDiseases: ['பூச்சிகள்'], generalCare: 'பராமரிப்பு.', whenToContactExpert: 'அணுகவும்.' },
        kn: { name: id, localNames: [id], whatIsThis: `${id} ಬೆಳೆಯ ಮಾಹಿತಿ.`, growingSeason: 'ಹಂಗಾಮು.', soilRequirements: 'ಮಣ್ಣು.', waterRequirements: 'ನೀರು.', mainStages: ['ಬೆಳವಣಿಗೆ', 'ಕೊಯ್ಲು'], whatToMonitor: ['ಆರೋಗ್ಯ'], commonPestsAndDiseases: ['ಕೀಟಗಳು'], generalCare: 'ಪಾಲನೆ.', whenToContactExpert: 'ಸಂಪರ್ಕಿಸಿ.' },
        ml: { name: id, localNames: [id], whatIsThis: `${id} വിള വിവരങ്ങൾ.`, growingSeason: 'സീസൺ.', soilRequirements: 'മണ്ണ്.', waterRequirements: 'വെള്ളം.', mainStages: ['വളർച്ച', 'വിളവെടുപ്പ്'], whatToMonitor: ['ആരോഗ്യം'], commonPestsAndDiseases: ['കീടങ്ങൾ'], generalCare: 'പരിചരണം.', whenToContactExpert: 'സഹായം തേടുക.' },
        mr: { name: id, localNames: [id], whatIsThis: `${id} पिकाची नोंद.`, growingSeason: 'हंगाम.', soilRequirements: 'जमीन.', waterRequirements: 'पाणी.', mainStages: ['वाढ', 'कापणी'], whatToMonitor: ['आरोग्य'], commonPestsAndDiseases: ['कीड'], generalCare: 'काळजी.', whenToContactExpert: 'सल्ला घ्या.' },
      },
    };

    const success = addCustomCrop(newCrop);
    if (!success) {
      return NextResponse.json(
        { error: `Crop with id '${newCrop.id}' already exists in database.` },
        { status: 409 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Crop '${newCrop.id}' registered successfully.`,
      crop: newCrop,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || 'Failed to process request.' },
      { status: 500 }
    );
  }
}
