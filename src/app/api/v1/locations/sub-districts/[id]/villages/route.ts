import { NextRequest, NextResponse } from 'next/server';
import { getLocationProvider } from '@/lib/location/indiaLocationProvider';
import { AUTHORITATIVE_SUB_DISTRICTS } from '@/data/indiaLocationsData';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const rawId = params.id;
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || undefined;
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '20', 10);
    const lang = searchParams.get('lang') || 'en';

    const subDistrict = AUTHORITATIVE_SUB_DISTRICTS.find(
      (sd) =>
        sd.id.toLowerCase() === rawId.toLowerCase() ||
        String(sd.lgdCode) === rawId
    );

    if (!subDistrict) {
      return NextResponse.json(
        { success: false, error: `Sub-district '${rawId}' not found in official directory.` },
        { status: 404 }
      );
    }

    const provider = getLocationProvider();
    const result = await provider.getVillages(subDistrict.id, query, page, limit, lang);

    return NextResponse.json({
      success: true,
      subDistrictId: subDistrict.id,
      subDistrictName: subDistrict.name,
      districtId: subDistrict.districtId,
      stateCode: subDistrict.stateCode,
      total: result.total,
      page: result.page,
      limit: result.limit,
      villages: result.villages,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch villages for sub-district' },
      { status: 500 }
    );
  }
}
