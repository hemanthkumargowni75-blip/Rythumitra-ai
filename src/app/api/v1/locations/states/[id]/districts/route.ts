import { NextRequest, NextResponse } from 'next/server';
import { getLocationProvider } from '@/lib/location/indiaLocationProvider';
import { INDIA_STATES_AND_UTS } from '@/data/indiaLocationsData';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const rawId = params.id;
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || undefined;
    const lang = searchParams.get('lang') || 'en';

    // Find state by code (e.g. IN-AP) or by LGD code (e.g. 28)
    const state = INDIA_STATES_AND_UTS.find(
      (s) =>
        s.code.toLowerCase() === rawId.toLowerCase() ||
        String(s.lgdCode) === rawId
    );

    if (!state) {
      return NextResponse.json(
        { success: false, error: `State / UT '${rawId}' not found in official directory.` },
        { status: 404 }
      );
    }

    const provider = getLocationProvider();
    const districts = await provider.getDistricts(state.code, query, lang);

    return NextResponse.json({
      success: true,
      stateId: state.code,
      stateCode: state.code,
      stateName: state.name,
      lgdCode: state.lgdCode,
      subDistrictTerminology: state.subDistrictTerminology,
      total: districts.length,
      districts,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch districts for state' },
      { status: 500 }
    );
  }
}
