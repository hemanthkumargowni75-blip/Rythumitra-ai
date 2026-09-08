import { NextRequest, NextResponse } from 'next/server';
import { getLocationProvider } from '@/lib/location/indiaLocationProvider';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const stateCode = searchParams.get('state');
    const query = searchParams.get('q') || undefined;
    const lang = searchParams.get('lang') || 'en';

    if (!stateCode) {
      return NextResponse.json(
        { success: false, error: 'State code parameter (e.g. IN-AP, IN-KA) is required' },
        { status: 400 }
      );
    }

    const provider = getLocationProvider();
    const districts = await provider.getDistricts(stateCode, query, lang);

    return NextResponse.json({
      success: true,
      stateCode,
      total: districts.length,
      districts,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch districts' },
      { status: 500 }
    );
  }
}
