const https = require('https');
const fs = require('fs');
const path = require('path');

function tokenify(number) {
  var tokenbuf = [];
  var charmap = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ*$";
  var remainder = number;
  while (remainder > 0) {
    tokenbuf.push(charmap.charAt(remainder & 0x3F));
    remainder = Math.floor(remainder / 64);
  }
  return tokenbuf.join('');
}

function getSessionAndCookies() {
  return new Promise((resolve, reject) => {
    https.get('https://lgdirectory.gov.in/downloadDirectory.do', {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    }, res => {
      let cookies = res.headers['set-cookie'] || [];
      let body = '';
      res.on('data', c => body += c);
      res.on('end', () => {
        let cookieHeader = cookies.map(c => c.split(';')[0]).join('; ');
        resolve({ cookies: cookieHeader, body });
      });
    }).on('error', reject);
  });
}

async function callDwr(cookies, scriptName, methodName, params = []) {
  const pageId = tokenify(new Date().getTime()) + "-" + tokenify(Math.random() * 1E16);
  const scriptSessionId = `${pageId}`;

  const postLines = [
    'callCount=1',
    'page=' + encodeURIComponent('/downloadDirectory.do'),
    'httpSessionId=',
    `scriptSessionId=${scriptSessionId}`,
    `c0-scriptName=${scriptName}`,
    `c0-methodName=${methodName}`,
    'c0-id=0'
  ];

  params.forEach((p, idx) => {
    if (typeof p === 'number') {
      postLines.push(`c0-param${idx}=number:${p}`);
    } else {
      postLines.push(`c0-param${idx}=string:${encodeURIComponent(p)}`);
    }
  });

  postLines.push('batchId=0');
  postLines.push('instanceId=0');
  const postData = postLines.join('\n') + '\n';

  return new Promise((resolve, reject) => {
    const req = https.request('https://lgdirectory.gov.in/dwr/call/plaincall/' + scriptName + '.' + methodName + '.dwr', {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
        'Content-Length': Buffer.byteLength(postData),
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'Referer': 'https://lgdirectory.gov.in/downloadDirectory.do',
        'Cookie': cookies
      }
    }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data }));
    });
    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

function parseDwr(raw) {
  let result = null;
  const window = {
    dwr: {
      _: [
        {
          engine: {
            remote: {
              handleCallback: (b, c, data) => {
                result = data;
              }
            }
          }
        }
      ]
    }
  };
  const code = raw.replace("throw 'allowScriptTagRemoting is false.';", "");
  try {
    eval(code);
  } catch (e) {
    console.error('Parse error:', e.message);
  }
  return result;
}

const AP_REQUIRED_DISTRICTS = [
  "Alluri Sitharama Raju", "Anakapalli", "Ananthapuramu", "Annamayya", "Bapatla",
  "Chittoor", "East Godavari", "Eluru", "Guntur", "Kakinada", "Konaseema", "Krishna",
  "Kurnool", "Manyam", "Nandyal", "NTR", "Palnadu", "Prakasam", "SPSR Nellore",
  "Sri Sathya Sai", "Srikakulam", "Tirupati", "Visakhapatnam", "Vizianagaram",
  "West Godavari", "YSR Kadapa"
];

const TS_REQUIRED_DISTRICTS = [
  "Adilabad", "Bhadradri Kothagudem", "Hanumakonda", "Hyderabad", "Jagtial",
  "Jangaon", "Jayashankar Bhupalpally", "Jogulamba Gadwal", "Kamareddy", "Karimnagar",
  "Khammam", "Kumuram Bheem Asifabad", "Mahabubabad", "Mahabubnagar", "Mancherial",
  "Medak", "Medchal-Malkajgiri", "Mulugu", "Nagarkurnool", "Nalgonda", "Narayanpet",
  "Nirmal", "Nizamabad", "Peddapalli", "Rajanna Sircilla", "Rangareddy", "Sangareddy",
  "Siddipet", "Suryapet", "Vikarabad", "Wanaparthy", "Warangal", "Yadadri Bhuvanagiri"
];

function normalizeName(name) {
  return name.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function matchDistrictName(reqName, lgdDistricts) {
  const normReq = normalizeName(reqName);
  if (normReq === 'konaseema') {
    return lgdDistricts.find(d => normalizeName(d.districtNameEnglish).includes('konaseema'));
  }
  if (normReq === 'manyam') {
    return lgdDistricts.find(d => normalizeName(d.districtNameEnglish).includes('manyam'));
  }
  if (normReq === 'spsrnellore') {
    return lgdDistricts.find(d => normalizeName(d.districtNameEnglish).includes('nellore'));
  }
  if (normReq === 'ysrkadapa') {
    return lgdDistricts.find(d => normalizeName(d.districtNameEnglish).includes('kadapa'));
  }
  if (normReq === 'ntr') {
    return lgdDistricts.find(d => normalizeName(d.districtNameEnglish) === 'ntr');
  }
  if (normReq === 'jagtial') {
    return lgdDistricts.find(d => normalizeName(d.districtNameEnglish) === 'jagitial');
  }
  if (normReq === 'jangaon') {
    return lgdDistricts.find(d => normalizeName(d.districtNameEnglish) === 'jangoan');
  }
  if (normReq === 'jayashankarbhupalpally') {
    return lgdDistricts.find(d => normalizeName(d.districtNameEnglish).includes('jayashankar'));
  }

  let m = lgdDistricts.find(d => normalizeName(d.districtNameEnglish) === normReq);
  if (m) return m;

  m = lgdDistricts.find(d => normalizeName(d.districtNameEnglish).includes(normReq) || normReq.includes(normalizeName(d.districtNameEnglish)));
  return m;
}

async function run() {
  console.log('=== STARTING LGD AUTHORITATIVE IMPORT ===');
  const rawDir = path.join(__dirname, '../data/raw/lgd');
  if (!fs.existsSync(rawDir)) fs.mkdirSync(rawDir, { recursive: true });

  const { cookies } = await getSessionAndCookies();
  console.log('Session established with LGD.');

  // 1. Ingest AP Districts
  const apRaw = await callDwr(cookies, 'lgdDwrDistrictService', 'getDistrictList', [28]);
  fs.writeFileSync(path.join(rawDir, 'ap_districts_raw.json'), JSON.stringify({
    source: 'https://lgdirectory.gov.in/',
    service: 'lgdDwrDistrictService.getDistrictList',
    stateCode: 28,
    fetchedAt: new Date().toISOString(),
    raw: apRaw.data
  }, null, 2));
  const apLgdDistricts = parseDwr(apRaw.data) || [];

  // 2. Ingest TS Districts
  const tsRaw = await callDwr(cookies, 'lgdDwrDistrictService', 'getDistrictList', [36]);
  fs.writeFileSync(path.join(rawDir, 'ts_districts_raw.json'), JSON.stringify({
    source: 'https://lgdirectory.gov.in/',
    service: 'lgdDwrDistrictService.getDistrictList',
    stateCode: 36,
    fetchedAt: new Date().toISOString(),
    raw: tsRaw.data
  }, null, 2));
  const tsLgdDistricts = parseDwr(tsRaw.data) || [];

  // 3. Match 26 AP districts
  const apReconciled = [];
  for (const name of AP_REQUIRED_DISTRICTS) {
    const lgd = matchDistrictName(name, apLgdDistricts);
    if (!lgd) {
      console.error(`ERROR: Could not match AP district "${name}" to LGD!`);
      continue;
    }
    apReconciled.push({
      canonicalName: name,
      lgdName: lgd.districtNameEnglish,
      localName: lgd.districtNameLocal?.trim() || '',
      districtCode: lgd.districtCode,
      stateId: 'IN-AP'
    });
  }

  // 4. Match 33 TS districts
  const tsReconciled = [];
  for (const name of TS_REQUIRED_DISTRICTS) {
    const lgd = matchDistrictName(name, tsLgdDistricts);
    if (!lgd) {
      console.error(`ERROR: Could not match TS district "${name}" to LGD!`);
      continue;
    }
    tsReconciled.push({
      canonicalName: name,
      lgdName: lgd.districtNameEnglish,
      localName: lgd.districtNameLocal?.trim() || '',
      districtCode: lgd.districtCode,
      stateId: 'IN-TG'
    });
  }

  console.log(`Reconciled AP: ${apReconciled.length}/26, TS: ${tsReconciled.length}/33`);

  // 5. Ingest mandals for AP
  const apMandalsRaw = {};
  const allApMandals = [];
  for (const dist of apReconciled) {
    const subRes = await callDwr(cookies, 'lgdDwrSubDistrictService', 'getSubDistrictList', [dist.districtCode]);
    apMandalsRaw[dist.districtCode] = subRes.data;
    const mandals = parseDwr(subRes.data) || [];
    for (const m of mandals) {
      allApMandals.push({
        id: `mandal-${m.subdistrictCode}`,
        lgdCode: m.subdistrictCode,
        districtId: `dist-${dist.districtCode}`,
        stateId: 'IN-AP',
        name: m.subdistrictNameEnglish.trim(),
        localName: m.subdistrictNameLocal?.trim() || '',
        terminology: 'MANDAL'
      });
    }
  }
  fs.writeFileSync(path.join(rawDir, 'ap_mandals_raw.json'), JSON.stringify(apMandalsRaw, null, 2));

  // 6. Ingest mandals for TS
  const tsMandalsRaw = {};
  const allTsMandals = [];
  for (const dist of tsReconciled) {
    const subRes = await callDwr(cookies, 'lgdDwrSubDistrictService', 'getSubDistrictList', [dist.districtCode]);
    tsMandalsRaw[dist.districtCode] = subRes.data;
    const mandals = parseDwr(subRes.data) || [];
    for (const m of mandals) {
      allTsMandals.push({
        id: `mandal-${m.subdistrictCode}`,
        lgdCode: m.subdistrictCode,
        districtId: `dist-${dist.districtCode}`,
        stateId: 'IN-TG',
        name: m.subdistrictNameEnglish.trim(),
        localName: m.subdistrictNameLocal?.trim() || '',
        terminology: 'MANDAL'
      });
    }
  }
  fs.writeFileSync(path.join(rawDir, 'ts_mandals_raw.json'), JSON.stringify(tsMandalsRaw, null, 2));

  // Save metadata
  fs.writeFileSync(path.join(rawDir, 'metadata.json'), JSON.stringify({
    source: 'Government of India Local Government Directory (LGD)',
    sourceUrl: 'https://lgdirectory.gov.in/',
    ingestionTimestamp: new Date().toISOString(),
    apDistrictCount: apReconciled.length,
    apMandalCount: allApMandals.length,
    tsDistrictCount: tsReconciled.length,
    tsMandalCount: allTsMandals.length
  }, null, 2));

  console.log('\n=== INGESTION COMPLETE ===');
  console.log(`Andhra Pradesh: ${apReconciled.length}/26 Districts, ${allApMandals.length} Mandals`);
  console.log(`Telangana: ${tsReconciled.length}/33 Districts, ${allTsMandals.length} Mandals`);
  console.log(`Total Authoritative Mandals: ${allApMandals.length + allTsMandals.length}`);
}

run().catch(console.error);
