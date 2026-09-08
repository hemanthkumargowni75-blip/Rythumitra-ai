"""
LGD Location Dataset Synchronization Job (Python module)
Executes administrative location validation, change detection, and hierarchy audit trail.
"""

import os
import sys
import json
import re
from datetime import datetime

def sync_lgd_locations():
    print("=== RYTHUMITRA AI — LGD LOCATION SYNC JOB (Python) ===")
    print(f"Execution Time: {datetime.utcnow().isoformat()}Z")

    data_file = os.path.join(os.path.dirname(__file__), '..', '..', 'src', 'data', 'indiaLocationsData.ts')
    if not os.path.exists(data_file):
        data_file = os.path.abspath(os.path.join('src', 'data', 'indiaLocationsData.ts'))

    if not os.path.exists(data_file):
        print(f"Error: Could not locate indiaLocationsData.ts at {data_file}")
        sys.exit(1)

    with open(data_file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Extract states
    state_codes = re.findall(r"code:\s*'([A-Z]{2}-[A-Z]{2})'", content)
    
    # Extract terminology
    terminologies = {}
    term_matches = re.findall(r"subDistrictTerminology:\s*'([A-Z_]+)'", content)
    for term in term_matches:
        terminologies[term] = terminologies.get(term, 0) + 1

    # Extract JSON arrays
    dist_start = content.find('export const AUTHORITATIVE_DISTRICTS: District[] = [')
    dist_end = content.find('export const AUTHORITATIVE_SUB_DISTRICTS')
    dist_json = content[dist_start + 51 : dist_end].strip().rstrip(';')
    districts = json.loads(dist_json)

    sub_start = content.find('export const AUTHORITATIVE_SUB_DISTRICTS: SubDistrict[] = [')
    sub_end = content.find('export const AUTHORITATIVE_VILLAGES')
    sub_json = content[sub_start + 57 : sub_end].strip().rstrip(';')
    sub_districts = json.loads(sub_json)

    vil_start = content.find('export const AUTHORITATIVE_VILLAGES: Village[] = [')
    vil_json = content[vil_start + 49 :].strip().rstrip(';')
    villages = json.loads(vil_json)

    state_set = set(state_codes)
    dist_id_set = {d['id'] for d in districts}
    sub_id_set = {s['id'] for s in sub_districts}

    orphan_dists = [d for d in districts if d['stateCode'] not in state_set]
    orphan_subs = [s for s in sub_districts if s['districtId'] not in dist_id_set or s['stateCode'] not in state_set]
    orphan_vils = [v for v in villages if v['subDistrictId'] not in sub_id_set or v['districtId'] not in dist_id_set or v['stateCode'] not in state_set]

    covered_states = {d['stateCode'] for d in districts}
    missing_states = [code for code in state_codes if code not in covered_states]

    is_valid = len(orphan_dists) == 0 and len(orphan_subs) == 0 and len(orphan_vils) == 0 and len(missing_states) == 0

    report = {
        "status": "SUCCESS" if is_valid else "WARNING",
        "totalStates": len(state_codes),
        "totalDistricts": len(districts),
        "totalSubDistricts": len(sub_districts),
        "totalVillages": len(villages),
        "orphanCount": len(orphan_dists) + len(orphan_subs) + len(orphan_vils),
        "missingDistrictStates": missing_states,
        "terminologies": terminologies,
        "timestamp": datetime.utcnow().isoformat() + "Z",
    }

    print(f"Status: {report['status']}")
    print(f"Total States & UTs: {report['totalStates']}")
    print(f"Total Districts: {report['totalDistricts']}")
    print(f"Total Sub-Districts: {report['totalSubDistricts']}")
    print(f"Total Villages: {report['totalVillages']}")
    print(f"Orphan Records: {report['orphanCount']}")
    print(f"Terminologies Breakdown: {json.dumps(terminologies, indent=2)}")
    print("=======================================================")

    return report

if __name__ == '__main__':
    sync_lgd_locations()
