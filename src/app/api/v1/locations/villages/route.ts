import { NextRequest, NextResponse } from 'next/server';
import { getLocationProvider } from '@/lib/location/indiaLocationProvider';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const subDistrictId = searchParams.get('subDistrict');
    const query = searchParams.get('q') || undefined;
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '20', 10);
    const lang = searchParams.get('lang') || 'en';

    if (!subDistrictId) {
      return NextResponse.json(
        { success: false, error: 'Sub-district ID parameter is required' },
        { status: 400 }
      );
    }

    const provider = getLocationProvider();
    const result = await provider.getVillages(subDistrictId, query, page, limit, lang);

    return NextResponse.json({
      success: true,
      subDistrictId,
      ...result,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch villages' },
      { status: 500 }
    );
  }
}
