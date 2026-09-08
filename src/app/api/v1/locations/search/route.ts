import { NextRequest, NextResponse } from 'next/server';
import { getLocationProvider } from '@/lib/location/indiaLocationProvider';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const lang = searchParams.get('lang') || 'en';
    const limit = parseInt(searchParams.get('limit') || '10', 10);

    if (!query.trim()) {
      return NextResponse.json({
        success: true,
        query: '',
        total: 0,
        results: [],
      });
    }

    const provider = getLocationProvider();
    const results = await provider.searchLocations(query, lang, limit);

    return NextResponse.json({
      success: true,
      query,
      total: results.length,
      results,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Location search failed' },
      { status: 500 }
    );
  }
}
