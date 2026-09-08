import { NextRequest, NextResponse } from 'next/server';
import { getLocationProvider } from '@/lib/location/indiaLocationProvider';
import { INDIA_STATES_AND_UTS, AUTHORITATIVE_DISTRICTS } from '@/data/indiaLocationsData';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const districtId = searchParams.get('district');
    const query = searchParams.get('q') || undefined;
    const lang = searchParams.get('lang') || 'en';

    if (!districtId) {
      return NextResponse.json(
        { success: false, error: 'District ID parameter is required' },
        { status: 400 }
      );
    }

    const provider = getLocationProvider();
    const subDistricts = await provider.getSubDistricts(districtId, query, lang);

    // Look up state terminology metadata
    const districtObj = AUTHORITATIVE_DISTRICTS.find((d) => d.id.toLowerCase() === districtId.toLowerCase());
    const stateCode = districtObj?.stateCode || subDistricts[0]?.stateCode;
    const state = stateCode ? INDIA_STATES_AND_UTS.find((s) => s.code === stateCode) : null;
    const terminology = state?.subDistrictTerminology || 'SUB_DISTRICT';
    const terminologyLabel = state?.terminologyLabel[lang] || state?.terminologyLabel.en || 'Sub-District';

    return NextResponse.json({
      success: true,
      districtId,
      terminology,
      terminologyLabel,
      subDistrictTerminology: terminology,
      total: subDistricts.length,
      subDistricts,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch sub-districts' },
      { status: 500 }
    );
  }
}
