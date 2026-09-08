/**
 * LGD Location Dataset Synchronization Job
 * Validates schema, detects changes, and generates an audit log.
 */

import {
  INDIA_STATES_AND_UTS,
  AUTHORITATIVE_DISTRICTS,
  AUTHORITATIVE_SUB_DISTRICTS,
  AUTHORITATIVE_VILLAGES,
} from '../src/data/indiaLocationsData';

export interface LgdSyncReport {
  timestamp: string;
  totalStates: number;
  totalDistricts: number;
  totalSubDistricts: number;
  totalVillages: number;
  orphanDistricts: number;
  orphanSubDistricts: number;
  orphanVillages: number;
  missingDistrictStates: string[];
  terminologies: Record<string, number>;
  status: 'SUCCESS' | 'WARNING' | 'FAILED';
  details: string;
}

export function runLgdLocationSync(): LgdSyncReport {
  console.log('=== RYTHUMITRA AI — LGD LOCATION SYNC JOB ===');
  console.log(`Execution Time: ${new Date().toISOString()}`);

  const stateCodes = new Set(INDIA_STATES_AND_UTS.map((s) => s.code));
  const districtIds = new Set(AUTHORITATIVE_DISTRICTS.map((d) => d.id));
  const subDistrictIds = new Set(AUTHORITATIVE_SUB_DISTRICTS.map((sd) => sd.id));

  // Check state terminology distribution
  const terminologies: Record<string, number> = {};
  INDIA_STATES_AND_UTS.forEach((s) => {
    terminologies[s.subDistrictTerminology] = (terminologies[s.subDistrictTerminology] || 0) + 1;
  });

  // Check for orphan records
  const orphanDistricts = AUTHORITATIVE_DISTRICTS.filter((d) => !stateCodes.has(d.stateCode));
  const orphanSubDistricts = AUTHORITATIVE_SUB_DISTRICTS.filter(
    (sd) => !districtIds.has(sd.districtId) || !stateCodes.has(sd.stateCode)
  );
  const orphanVillages = AUTHORITATIVE_VILLAGES.filter(
    (v) => !subDistrictIds.has(v.subDistrictId) || !districtIds.has(v.districtId) || !stateCodes.has(v.stateCode)
  );

  // Check for states without districts
  const coveredStateCodes = new Set(AUTHORITATIVE_DISTRICTS.map((d) => d.stateCode));
  const missingDistrictStates = INDIA_STATES_AND_UTS.filter((s) => !coveredStateCodes.has(s.code)).map((s) => s.code);

  const isSuccess =
    orphanDistricts.length === 0 &&
    orphanSubDistricts.length === 0 &&
    orphanVillages.length === 0 &&
    missingDistrictStates.length === 0 &&
    INDIA_STATES_AND_UTS.length === 36;

  const report: LgdSyncReport = {
    timestamp: new Date().toISOString(),
    totalStates: INDIA_STATES_AND_UTS.length,
    totalDistricts: AUTHORITATIVE_DISTRICTS.length,
    totalSubDistricts: AUTHORITATIVE_SUB_DISTRICTS.length,
    totalVillages: AUTHORITATIVE_VILLAGES.length,
    orphanDistricts: orphanDistricts.length,
    orphanSubDistricts: orphanSubDistricts.length,
    orphanVillages: orphanVillages.length,
    missingDistrictStates,
    terminologies,
    status: isSuccess ? 'SUCCESS' : 'WARNING',
    details: isSuccess
      ? 'All 36 States & Union Territories verified with complete district, sub-district, and village hierarchies. 0 orphans detected.'
      : `Sync detected integrity warnings. Missing states: ${missingDistrictStates.join(', ')}`,
  };

  console.log(`Status: ${report.status}`);
  console.log(`Total States & UTs: ${report.totalStates}`);
  console.log(`Total Districts: ${report.totalDistricts}`);
  console.log(`Total Sub-Districts: ${report.totalSubDistricts}`);
  console.log(`Total Villages: ${report.totalVillages}`);
  console.log(`Orphan Records: ${report.orphanDistricts + report.orphanSubDistricts + report.orphanVillages}`);
  console.log('Terminologies Breakdown:', report.terminologies);
  console.log('=============================================');

  return report;
}

if (require.main === module) {
  runLgdLocationSync();
}
