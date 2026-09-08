export interface DistrictInfo {
  id: string;
  nameEn: string;
  nameTe: string;
  state: 'Andhra Pradesh' | 'Telangana';
  zoneEn: string;
  zoneTe: string;
  mandals: string[];
}

export const districtsList: DistrictInfo[] = [
  // Andhra Pradesh
  {
    id: 'guntur',
    nameEn: 'Guntur',
    nameTe: 'గుంటూరు',
    state: 'Andhra Pradesh',
    zoneEn: 'Krishna-Godavari Agro Zone',
    zoneTe: 'కృష్ణా-గోదావరి వ్యవసాయ మండలం',
    mandals: ['Tadikonda', 'Mangalagiri', 'Tenali', 'Ponnur', 'Bapatla', 'Chebrolu', 'Medikonduru', 'Pedakakani', 'Prathipadu'],
  },
  {
    id: 'prakasam',
    nameEn: 'Prakasam',
    nameTe: 'ప్రకాశం',
    state: 'Andhra Pradesh',
    zoneEn: 'Southern Dry Agro Zone',
    zoneTe: 'దక్షిణ ప్రాంత మెట్ట వ్యవసాయ మండలం',
    mandals: ['Ongole', 'Chimakurthy', 'Kandukur', 'Markapur', 'Giddalur', 'Podili', 'Kanigiri', 'Santhanuthalapadu'],
  },
  {
    id: 'krishna',
    nameEn: 'Krishna',
    nameTe: 'కృష్ణా',
    state: 'Andhra Pradesh',
    zoneEn: 'Krishna Delta Agro Zone',
    zoneTe: 'కృష్ణా డెల్టా వ్యవసాయ మండలం',
    mandals: ['Machilipatnam', 'Gudivada', 'Nuzvid', 'Vuyyuru', 'Kankipadu', 'Gannavaram', 'Avanigadda', 'Pamarru'],
  },
  {
    id: 'kurnool',
    nameEn: 'Kurnool',
    nameTe: 'కర్నూలు',
    state: 'Andhra Pradesh',
    zoneEn: 'Scarce Rainfall Rayalaseema Zone',
    zoneTe: 'వర్షాభావ రాయలసీమ వ్యవసాయ మండలం',
    mandals: ['Kurnool', 'Nandyal', 'Adoni', 'Yemmiganur', 'Dhone', 'Allagadda', 'Pattikonda', 'Koilkuntla'],
  },
  {
    id: 'west_godavari',
    nameEn: 'West Godavari',
    nameTe: 'పశ్చిమ గోదావరి',
    state: 'Andhra Pradesh',
    zoneEn: 'Godavari Alluvial Delta Zone',
    zoneTe: 'గోదావరి ఒండ్రు నేలల మండలం',
    mandals: ['Bhimavaram', 'Eluru', 'Tadepalligudem', 'Tanuku', 'Palakollu', 'Narasapuram', 'Jangareddygudem'],
  },
  {
    id: 'anantapur',
    nameEn: 'Ananthapuramu',
    nameTe: 'అనంతపురం',
    state: 'Andhra Pradesh',
    zoneEn: 'Arid Rayalaseema Groundnut Zone',
    zoneTe: 'రాయలసీమ వేరుశనగ ప్రాంత మండలం',
    mandals: ['Anantapur', 'Dharmavaram', 'Kadiri', 'Guntakal', 'Tadipatri', 'Hindupur', 'Kalyandurg', 'Rayadurg'],
  },

  // Telangana
  {
    id: 'warangal',
    nameEn: 'Warangal',
    nameTe: 'వరంగల్',
    state: 'Telangana',
    zoneEn: 'Central Telangana Agro Zone',
    zoneTe: 'మధ్య తెలంగాణ వ్యవసాయ మండలం',
    mandals: ['Hanamkonda', 'Wardhannapet', 'Geesugonda', 'Parkal', 'Narsampet', 'Rayaparthy', 'Duggondi'],
  },
  {
    id: 'karimnagar',
    nameEn: 'Karimnagar',
    nameTe: 'కరీంనగర్',
    state: 'Telangana',
    zoneEn: 'Northern Telangana Agro Zone',
    zoneTe: 'ఉత్తర తెలంగాణ వ్యవసాయ మండలం',
    mandals: ['Karimnagar', 'Manakondur', 'Huzurabad', 'Choppadandi', 'Jammikunta', 'Gangadhara', 'Timmapur'],
  },
  {
    id: 'nalgonda',
    nameEn: 'Nalgonda',
    nameTe: 'నల్గొండ',
    state: 'Telangana',
    zoneEn: 'Southern Telangana Dry Zone',
    zoneTe: 'దక్షిణ తెలంగాణ మెట్ట వ్యవసాయ మండలం',
    mandals: ['Nalgonda', 'Miryalaguda', 'Devarakonda', 'Nakrekal', 'Halia', 'Munugode', 'Narketpally'],
  },
  {
    id: 'khammam',
    nameEn: 'Khammam',
    nameTe: 'ఖమ్మం',
    state: 'Telangana',
    zoneEn: 'Godavari Basin Telangana Zone',
    zoneTe: 'గోదావరి పరీవాహక ప్రాంత మండలం',
    mandals: ['Khammam Urban', 'Madhira', 'Sathupalli', 'Wyra', 'Kallur', 'Kusumanchi', 'Thirumalayapalem'],
  },
  {
    id: 'nizamabad',
    nameEn: 'Nizamabad',
    nameTe: 'నిజామాబాద్',
    state: 'Telangana',
    zoneEn: 'Northern Black Soil Zone',
    zoneTe: 'ఉత్తర నల్లరేగడి వ్యవసాయ మండలం',
    mandals: ['Nizamabad', 'Bodhan', 'Armoor', 'Banswada', 'Dichpally', 'Jakranpally', 'Kotgiri'],
  },
];
