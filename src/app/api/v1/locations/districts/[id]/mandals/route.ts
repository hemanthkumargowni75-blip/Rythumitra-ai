import { NextRequest, NextResponse } from 'next/server';
import { getLocationProvider } from '@/lib/location/indiaLocationProvider';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const rawId = params.id;
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || undefined;
    const lang = searchParams.get('lang') || 'en';

    const provider = getLocationProvider();
    const mandals = provider.getMandals
      ? await provider.getMandals(rawId, query, lang)
      : await provider.getSubDistricts(rawId, query, lang);

    return NextResponse.json({
      success: true,
      districtId: rawId,
      terminology: 'MANDAL',
      total: mandals.length,
      mandals,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch mandals for district' },
      { status: 500 }
    );
  }
}
