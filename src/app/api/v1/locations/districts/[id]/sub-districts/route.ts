import { NextRequest, NextResponse } from 'next/server';
import { getLocationProvider } from '@/lib/location/indiaLocationProvider';
import { AUTHORITATIVE_DISTRICTS, INDIA_STATES_AND_UTS } from '@/data/indiaLocationsData';
import { ALL_DISTRICTS } from '@/data/generated/locationsData';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const rawId = params.id;
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || undefined;
    const lang = searchParams.get('lang') || 'en';

    const district =
      ALL_DISTRICTS.find(
        (d) =>
          d.id.toLowerCase() === rawId.toLowerCase() ||
          String(d.lgdCode) === rawId
      ) ||
      AUTHORITATIVE_DISTRICTS.find(
        (d) =>
          d.id.toLowerCase() === rawId.toLowerCase() ||
          String(d.lgdCode) === rawId
      );

    if (!district) {
      return NextResponse.json(
        { success: false, error: `District '${rawId}' not found in official directory.` },
        { status: 404 }
      );
    }

    const stateCode = district.stateCode || district.stateId;
    const state = INDIA_STATES_AND_UTS.find((s) => s.code === stateCode);
    const terminologyLabel = (stateCode === 'IN-AP' || stateCode === 'IN-TG')
      ? (lang === 'te' ? 'మండలం' : 'Mandal')
      : (state?.terminologyLabel[lang] || state?.terminologyLabel.en || 'Sub-District');

    const provider = getLocationProvider();
    const subDistricts = await provider.getSubDistricts(district.id, query, lang);

    return NextResponse.json({
      success: true,
      districtId: district.id,
      districtName: district.name,
      stateCode: district.stateCode,
      terminology: state?.subDistrictTerminology,
      terminologyLabel,
      total: subDistricts.length,
      subDistricts,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch sub-districts for district' },
      { status: 500 }
    );
  }
}
