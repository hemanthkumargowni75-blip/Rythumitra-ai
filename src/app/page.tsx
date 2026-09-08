'use client';

import React from 'react';
import Link from 'next/link';
import {
  Sprout,
  MapPin,
  CloudSun,
  ShieldAlert,
  Droplet,
  Calculator,
  MessageSquare,
  CalendarCheck,
  BookOpenCheck,
  CheckCircle2,
  FileText,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Activity,
  Layers,
  Sparkles,
  Building2,
  Camera,
  ShieldCheck,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useFarm } from '@/context/FarmContext';
import { useAuth } from '@/context/AuthContext';
import { VoiceAssistant } from '@/components/VoiceAssistant';
import { DashboardSearch } from '@/components/DashboardSearch';
import { OfflineIndicator } from '@/components/OfflineIndicator';
import { MeeBhoomiCard } from '@/components/MeeBhoomiCard';
import { GpsLocationCard } from '@/components/GpsLocationCard';
import { MarketPriceCard } from '@/components/MarketPriceCard';
import { FarmerAdvisoryCarousel } from '@/components/FarmerAdvisoryCarousel';
import { getCropTranslations } from '@/data/cropTranslations';
import { getAllCrops } from '@/data/cropDatabase';
import { formatINR } from '@/lib/utils';

export default function DashboardPage() {
  const { language, t } = useLanguage();
  const { farmer, farm, activeCrop, soilTest, weatherForecast, ledgerEntries } = useFarm();
  const { user } = useAuth();

  const displayName = user?.first_name && user?.last_name
    ? `${user.first_name} ${user.last_name}`
    : user?.name || (language === 'te' ? farmer.nameTelugu : farmer.name);
  const displayLocation =
    user?.village && user?.district
      ? `${user.village}, ${user.mandal ? `${user.mandal} ${language === 'te' ? 'మండలం' : 'Mandal'}, ` : ''}${user.district}`
      : `${farmer.village}, ${farmer.mandal} ${language === 'te' ? 'మండలం' : 'Mandal'}, ${farmer.district}`;

  const cropTrans = getCropTranslations(language);
  const allCrops = getAllCrops();
  const popularCropIds = ['paddy', 'chilli', 'brinjal', 'groundnut', 'banana', 'mango', 'tomato', 'cotton', 'turmeric'];
  const popularCrops = popularCropIds
    .map((id) => allCrops.find((c) => c.id === id))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  const todayWeather = weatherForecast[0];
  const upcomingRainyDay = weatherForecast.find((d) => d.rainProbability >= 70);

  // Financial summary calculations
  const totalExpenses = ledgerEntries
    .filter((e) => e.type === 'EXPENSE')
    .reduce((acc, e) => acc + e.amount, 0);

  const totalIncome = ledgerEntries
    .filter((e) => e.type === 'INCOME')
    .reduce((acc, e) => acc + e.amount, 0);

  const advisorySpeechText =
    language === 'te'
      ? `నమస్కారం ${displayName} గారు. మీ ${farm.boundary.areaAcres} ఎకరాల తోటలో తేజా మిర్చి పూత దశలో ఉంది. ఈరోజు ఉదయం గాలి వేగం సాధారణంగా ఉంది, మందుల పిచికారీకి అనుకూలం. బుధవారం 80 శాతం భారీ వర్ష సూచన ఉంది కాబట్టి రేపటిలోగా పురుగు మందు పిచికారీ మరియు జిగురు అట్టలు అమర్చడం పూర్తి చేయండి.`
      : `Namaste ${displayName}. In your ${farm.boundary.areaAcres} acre field, Teja Chilli is in the flowering stage. Spraying window is favorable today. Note that heavy rain is predicted on Wednesday, so complete pesticide sprays and sticky trap placement before tomorrow.`;

  const quickActionCards = [
    {
      href: '/markets',
      title: language === 'te' ? 'అఖిల భారత మార్కెట్ ధరలు' : 'All-India Mandi Prices',
      desc: language === 'te' ? 'లైవ్ e-NAM ధరలు & రవాణా లాభం లెక్కింపు' : 'Live e-NAM rates & net freight tariff calculator',
      icon: TrendingUp,
      badge: 'e-NAM Live',
      color: 'bg-emerald-600',
      lightColor: 'bg-emerald-50 border-emerald-300 text-emerald-900',
    },
    {
      href: '/government-services',
      title: language === 'te' ? 'ప్రభుత్వ సేవలు & మీభూమి' : 'Government Services Hub',
      desc: language === 'te' ? 'AP మీభూమి, సబ్సిడీలు & పంట బీమా పోర్టల్స్' : 'AP MeeBhoomi, PM-KISAN, PMFBY & Subsidies',
      icon: Building2,
      badge: 'Official',
      color: 'bg-indigo-600',
      lightColor: 'bg-indigo-50 border-indigo-200 text-indigo-900',
    },
    {
      href: '/settings/security',
      title: language === 'te' ? 'భద్రత & పాస్‌వర్డ్ మార్పు' : 'Security & Password',
      desc: language === 'te' ? '2Factor SMS రక్షణ & పాస్‌వర్డ్ నిర్వహణ' : '2Factor SMS settings & password change',
      icon: ShieldCheck,
      badge: '2FA Active',
      color: 'bg-emerald-700',
      lightColor: 'bg-emerald-50 border-emerald-300 text-emerald-900',
    },
    {
      href: '/crop-images',
      title: language === 'te' ? 'నా పంట ఫోటోలు' : 'My Crop Images Gallery',
      desc: language === 'te' ? 'గత స్కాన్‌లు & రికవరీ పురోగతి చరిత్ర' : 'Past field scans & before/after recovery',
      icon: Camera,
      badge: 'AI Vision',
      color: 'bg-blue-600',
      lightColor: 'bg-blue-50 border-blue-200 text-blue-900',
    },
    {
      href: '/map',
      title: t.nav.map,
      desc: language === 'te' ? 'శాటిలైట్ మ్యాప్‌పై సరిహద్దు & ఎకరాలు' : 'Satellite boundary & exact acreage',
      icon: MapPin,
      badge: `${farm.boundary.areaAcres} ${t.dashboard.acres}`,
      color: 'bg-emerald-500',
      lightColor: 'bg-emerald-50 border-emerald-200 text-emerald-900',
    },
    {
      href: '/diagnostics',
      title: t.nav.diagnostics,
      desc: language === 'te' ? 'ఆకు ఫోటోతో తెగులు గుర్తింపు & మందులు' : 'Leaf photo scan & prescription',
      icon: ShieldAlert,
      badge: language === 'te' ? 'AI డాక్టర్' : 'AI Doctor',
      color: 'bg-rose-500',
      lightColor: 'bg-rose-50 border-rose-200 text-rose-900',
    },
    {
      href: '/fertilizer',
      title: t.nav.fertilizer,
      desc: language === 'te' ? 'ఎకరాలకు సరిపడా బస్తాల మోతాదు' : 'Exact bags needed for your acres',
      icon: Calculator,
      badge: language === 'te' ? 'లెక్కింపు' : 'Ferti-Calc',
      color: 'bg-amber-500',
      lightColor: 'bg-amber-50 border-amber-200 text-amber-900',
    },
    {
      href: '/soil',
      title: t.nav.soil,
      desc: language === 'te' ? 'N-P-K లోపాలు & దిద్దుబాటు ఎరువులు' : 'NPK card & organic remedies',
      icon: FileText,
      badge: `${soilTest.overallScore}/100`,
      color: 'bg-yellow-600',
      lightColor: 'bg-yellow-50 border-yellow-200 text-yellow-900',
    },
    {
      href: '/weather',
      title: t.nav.weather,
      desc: language === 'te' ? '7 రోజుల వర్ష సూచన & పిచికారీ సలహా' : '7-day rain forecast & spray rules',
      icon: CloudSun,
      badge: `${todayWeather.tempMax}°C`,
      color: 'bg-sky-500',
      lightColor: 'bg-sky-50 border-sky-200 text-sky-900',
    },
    {
      href: '/crops',
      title: t.nav.crops,
      desc: language === 'te' ? 'సీజన్ ప్రకారం లాభదాయక పంటలు' : 'Season crop planning & returns',
      icon: Sprout,
      badge: activeCrop.cropNameTe,
      color: 'bg-green-600',
      lightColor: 'bg-green-50 border-green-200 text-green-900',
    },
    {
      href: '/irrigation',
      title: t.nav.irrigation,
      desc: language === 'te' ? 'డ్రిప్ / బోరు మోటార్ సమయాలు' : 'Drip run hours & moisture balance',
      icon: Droplet,
      badge: language === 'te' ? 'రేపు తడి' : 'Irrigate Soon',
      color: 'bg-blue-600',
      lightColor: 'bg-blue-50 border-blue-200 text-blue-900',
    },
    {
      href: '/consult',
      title: t.nav.consult,
      desc: language === 'te' ? 'వ్యవసాయ శాస్త్రవేత్తలతో ప్రత్యక్ష చర్చ' : 'Chat & calls with agronomists',
      icon: MessageSquare,
      badge: language === 'te' ? 'అందుబాటులో' : 'Active',
      color: 'bg-purple-600',
      lightColor: 'bg-purple-50 border-purple-200 text-purple-900',
    },
    {
      href: '/scouting',
      title: t.nav.scouting,
      desc: language === 'te' ? 'అధికారి ప్రత్యక్ష పొలం తనిఖీ' : 'Book GPS verified ground inspection',
      icon: CalendarCheck,
      badge: language === 'te' ? 'బుక్ చేయండి' : 'Book Visit',
      color: 'bg-teal-600',
      lightColor: 'bg-teal-50 border-teal-200 text-teal-900',
    },
    {
      href: '/passbook',
      title: t.nav.passbook,
      desc: language === 'te' ? 'సాగు పెట్టుబడులు & లాభాల లెడ్జర్' : 'Official ledger & KCC passbook',
      icon: BookOpenCheck,
      badge: formatINR(totalIncome - totalExpenses),
      color: 'bg-earth-600',
      lightColor: 'bg-earth-50 border-earth-200 text-earth-900',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Offline low-connectivity warning banner */}
      <OfflineIndicator />

      {/* Welcome & Farm Header Card */}
      <div className="bg-gradient-to-r from-farm-900 via-farm-800 to-farm-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        {/* Background decorative pattern */}
        <div className="absolute right-0 top-0 bottom-0 opacity-10 pointer-events-none flex items-center pr-8">
          <Sprout className="w-80 h-80 text-white" />
        </div>

        <div className="relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-farm-700/80 text-emerald-300 text-xs font-semibold mb-2 border border-farm-600">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>
                  {language === 'te'
                    ? 'రైతుమిత్ర కృత్రిమ మేధస్సు (AI) తో అనుసంధానించబడింది'
                    : 'Powered by RythuMitra Agronomic Intelligence'}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
                {t.dashboard.welcome},{' '}
                <span className="text-amber-300">
                  {displayName}
                </span>{' '}
                {language === 'te' ? 'గారు!' : '!'}
              </h1>
              <p className="text-farm-200 text-sm mt-1 max-w-2xl">
                {farm.name} | {displayLocation}
              </p>
            </div>

            {/* Audio Voice Assistant Button */}
            <div className="flex items-center gap-3">
              <VoiceAssistant
                textToSpeak={advisorySpeechText}
                label={language === 'te' ? 'ఈరోజు సలహా వినండి' : 'Listen to Daily Advisory'}
                className="bg-amber-400 hover:bg-amber-300 text-farm-950 font-bold px-4 py-2 text-sm shadow-lg border-0"
              />
            </div>
          </div>

          {/* Quick Farm Metadata Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-farm-700/60 text-xs">
            <div className="bg-farm-800/80 backdrop-blur-sm p-3 rounded-xl border border-farm-700">
              <span className="text-farm-300 block">{t.map.calculatedArea}</span>
              <span className="text-lg font-black text-white">
                {farm.boundary.areaAcres} {t.dashboard.acres}
              </span>
              <span className="text-[11px] text-farm-400 block mt-0.5">
                ({farm.boundary.areaGuntas} {t.dashboard.guntas})
              </span>
            </div>

            <div className="bg-farm-800/80 backdrop-blur-sm p-3 rounded-xl border border-farm-700">
              <span className="text-farm-300 block">{t.dashboard.activeCrop}</span>
              <span className="text-lg font-black text-amber-300">
                {activeCrop.cropNameTe}
              </span>
              <span className="text-[11px] text-farm-400 block mt-0.5">
                {activeCrop.stageDays} {t.dashboard.daysAfterSowing} ({activeCrop.currentStage})
              </span>
            </div>

            <div className="bg-farm-800/80 backdrop-blur-sm p-3 rounded-xl border border-farm-700">
              <span className="text-farm-300 block">{t.dashboard.healthScore}</span>
              <div className="flex items-baseline gap-1">
                <span className="text-lg font-black text-white">
                  {soilTest.overallScore}
                </span>
                <span className="text-xs text-farm-300">/100</span>
              </div>
              <span className="text-[11px] text-amber-400 font-semibold block mt-0.5">
                {language === 'te' ? 'మధ్యస్థం (జింక్ లోపం)' : 'Moderate (Zinc Low)'}
              </span>
            </div>

            <div className="bg-farm-800/80 backdrop-blur-sm p-3 rounded-xl border border-farm-700">
              <span className="text-farm-300 block">{t.dashboard.surveyNo}</span>
              <span className="text-lg font-black text-white">
                {farm.surveyNumber}
              </span>
              <span className="text-[11px] text-farm-400 block mt-0.5">
                {farm.soilType.replace('_', ' ')} • {farm.irrigationType}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Farmer Advisory Slides Carousel Section */}
      <FarmerAdvisoryCarousel />

      {/* Live GPS Geolocation & Farm Distance Status */}
      <GpsLocationCard />

      {/* Global Dashboard Search & AI Voice Bar */}
      <DashboardSearch />

      {/* Popular Crops Quick Access Row */}
      <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm font-bold text-gray-900 flex items-center gap-1.5">
              🔥 {cropTrans.popularCrops}
            </span>
            <span className="text-[11px] text-gray-500 hidden sm:inline">
              ({language === 'te' ? 'రైతులు ఎక్కువగా శోధించేవి' : 'Frequently searched by farmers'})
            </span>
          </div>
          <Link
            href="/crops"
            className="text-xs font-semibold text-farm-700 hover:text-farm-900 flex items-center gap-1 hover:underline"
          >
            <span>{cropTrans.categories.all}</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {popularCrops.map((crop) => {
            const localized = crop.translations[language] || crop.translations.te || crop.translations.en;
            const displayName = localized?.name?.split('(')[0]?.trim() || crop.id;
            return (
              <Link
                key={crop.id}
                href={`/crops/${crop.id}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-farm-50 hover:bg-farm-100 text-farm-900 border border-farm-200/80 font-medium text-xs whitespace-nowrap transition-all hover:scale-105 shadow-sm shrink-0"
              >
                <span className="text-base">{crop.iconEmoji}</span>
                <span>{displayName}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Urgent Advisory & Weather Alert Banner */}
      <div className="bg-amber-50 border-l-4 border-amber-500 rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2.5 bg-amber-100 rounded-xl text-amber-700 shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded">
                {t.dashboard.weatherAlert}
              </span>
              <span className="text-xs text-amber-700 font-medium">
                {todayWeather.tempMax}°C | {todayWeather.humidity}% {t.weather.humidity}
              </span>
            </div>
            <p className="text-sm font-bold text-amber-950 mt-1">
              {todayWeather.sprayAdvisory.canSpray
                ? t.dashboard.spraySafetyGood
                : t.dashboard.spraySafetyBad}
            </p>
            {upcomingRainyDay && (
              <p className="text-xs text-amber-800 mt-0.5 font-medium">
                {language === 'te'
                  ? `బుధవారం (${upcomingRainyDay.date}) 80% భారీ వర్షం (${upcomingRainyDay.rainfallMm} మి.మీ) ఉంది. ఎరువులు చల్లడం వాయిదా వేయండి.`
                  : `Heavy rain alert on Wednesday (${upcomingRainyDay.date}) with 80% chance (${upcomingRainyDay.rainfallMm} mm). Complete foliar tasks today.`}
              </p>
            )}
          </div>
        </div>

        <Link
          href="/weather"
          className="flex items-center gap-1.5 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors shrink-0"
        >
          <span>{t.dashboard.viewAll}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* AP MeeBhoomi Official Land Records Integration Card */}
      <MeeBhoomiCard />

      {/* Crop Doctor / Diagnostics Action Spotlight */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Spotlight 1: Crop Diagnostics Alert */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-farm-200 shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-rose-100 text-rose-600">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900">
                  {language === 'te' ? 'పంట డాక్టర్: తామర పురుగుల దాడి హెచ్చరిక' : 'Crop Doctor: Thrips & Leaf Curl Alert'}
                </h3>
                <p className="text-xs text-gray-500">
                  {language === 'te' ? 'తేజా మిర్చి — పూత దశలో నివారణ చర్యలు' : 'Teja Chilli — Critical Flowering Protection'}
                </p>
              </div>
            </div>

            <Link
              href="/diagnostics"
              className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1"
            >
              <span>{language === 'te' ? 'ఫోటో స్కాన్ చేయండి' : 'Scan Leaf'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="mt-4 p-4 rounded-2xl bg-rose-50/60 border border-rose-100 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <div>
              <p className="text-xs font-bold text-rose-950">
                {language === 'te'
                  ? 'సిఫార్సు: స్పైనెటోరం (డెలిగేట్) 15 మి.లీ 16L పంపుకు పిచికారీ చేయండి + 40 నీలి అట్టలు'
                  : 'Action: Spray Spinetoram (Delegate) @ 15 ml / 16L pump + 40 Blue Sticky Traps / Acre'}
              </p>
              <p className="text-xs text-rose-700 mt-1">
                {language === 'te'
                  ? 'ఈరోజు ఉదయం 7-10 గంటల మధ్య పిచికారీ చేయడం వల్ల 95% పురుగులు నివారించబడతాయి.'
                  : 'Spraying between 7 AM to 10 AM provides 95% efficacy before rains.'}
              </p>
            </div>

            <Link
              href="/fertilizer"
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-xs shrink-0 transition-colors"
            >
              {language === 'te' ? 'మోతాదు లెక్కింపు' : 'Calculate Dose'}
            </Link>
          </div>

          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
              <span className="text-gray-500 block">{t.dashboard.expectedYield}</span>
              <span className="font-bold text-gray-900 mt-0.5 block">25 - 32 Q/Acre</span>
            </div>
            <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
              <span className="text-gray-500 block">{language === 'te' ? 'మార్కెట్ ధర' : 'Market Price'}</span>
              <span className="font-bold text-emerald-700 mt-0.5 block">₹19,500 / Quintal</span>
            </div>
            <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 col-span-2 sm:col-span-1">
              <span className="text-gray-500 block">{t.dashboard.netProfitProjected}</span>
              <span className="font-bold text-emerald-700 mt-0.5 block">~₹4,20,000</span>
            </div>
          </div>
        </div>

        {/* Spotlight 2: Expert Tele-Consultation Box */}
        <div className="bg-gradient-to-br from-purple-900 to-indigo-950 text-white rounded-3xl p-6 shadow-md flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-800 text-purple-200 text-xs font-semibold mb-3">
              <MessageSquare className="w-3.5 h-3.5 text-purple-300" />
              <span>{language === 'te' ? 'శాస్త్రవేత్త సలహా' : 'Expert Support'}</span>
            </div>

            <h3 className="text-lg font-black tracking-tight">
              {language === 'te' ? 'డా. కె. వెంకటరావు గారితో చర్చ' : 'Consult Dr. K. Venkata Rao'}
            </h3>
            <p className="text-xs text-purple-200 mt-1">
              {language === 'te'
                ? 'సీనియర్ ప్రధాన శాస్త్రవేత్త, లాం ఫాం పరిశోధనా కేంద్రం, గుంటూరు'
                : 'Principal Scientist, ANGRAU Regional Station, Guntur'}
            </p>

            <div className="mt-4 p-3 rounded-xl bg-purple-800/60 border border-purple-700 text-xs text-purple-100">
              <p className="italic">
                &ldquo;{language === 'te'
                  ? `${user?.name ? `${user.name} గారు` : 'రైతు సోదరా'}, బుధవారం భారీ వర్షం ఉంది కాబట్టి రేపటిలోగా స్ప్రే పూర్తి చేయండి...`
                  : `${user?.name || 'Farmer'}, complete the Delegate spray before Wednesday rain...`}&rdquo;
              </p>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between gap-2">
            <Link
              href="/consult"
              className="flex-1 py-2.5 rounded-xl bg-white hover:bg-purple-50 text-purple-900 text-xs font-bold text-center shadow-md transition-colors"
            >
              {language === 'te' ? 'చర్చ కొనసాగించండి' : 'Reply to Expert'}
            </Link>
            <Link
              href="/scouting"
              className="px-3.5 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-600 text-white text-xs font-bold transition-colors"
              title="Book On-site Scouting"
            >
              <CalendarCheck className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* All-India Mandi Market Intelligence & Price Comparison */}
      <MarketPriceCard />

      {/* Quick Action Navigation Grid (10 Core Modules) */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-black text-farm-950 flex items-center gap-2">
              <Layers className="w-5 h-5 text-farm-600" />
              {t.dashboard.quickActions}
            </h2>
            <p className="text-xs text-gray-500">
              {language === 'te'
                ? 'రైతుకు అవసరమైన 14 దశల సమగ్ర వ్యవసాయ సేవలు'
                : 'Complete 14-stage agricultural lifecycle intelligence'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {quickActionCards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.href}
                href={card.href}
                className="group p-4 rounded-2xl bg-white hover:bg-farm-50/50 border border-farm-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2.5 rounded-xl text-white ${card.color} shadow-sm group-hover:scale-105 transition-transform`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${card.lightColor}`}>
                      {card.badge}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-gray-900 group-hover:text-farm-700 transition-colors">
                    {card.title}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    {card.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-farm-700 group-hover:translate-x-0.5 transition-transform">
                  <span>{language === 'te' ? 'ఓపెన్ చేయండి' : 'Open'}</span>
                  <ArrowRight className="w-4 h-4 text-farm-500" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
