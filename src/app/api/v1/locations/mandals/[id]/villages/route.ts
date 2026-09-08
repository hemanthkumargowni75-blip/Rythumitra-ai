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
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '50', 10);
    const lang = searchParams.get('lang') || 'en';

    const provider = getLocationProvider();
    const result = await provider.getVillages(rawId, query, page, limit, lang);

    return NextResponse.json({
      success: true,
      mandalId: rawId,
      total: result.total,
      page: result.page,
      limit: result.limit,
      villages: result.villages,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch villages for mandal' },
      { status: 500 }
    );
  }
}
