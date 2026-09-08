import { NextRequest, NextResponse } from 'next/server';
import { getLocationProvider } from '@/lib/location/indiaLocationProvider';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || undefined;
    const lang = searchParams.get('lang') || 'en';

    const provider = getLocationProvider();
    const states = await provider.getStates(query, lang);

    return NextResponse.json({
      success: true,
      country: 'India',
      total: states.length,
      states,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch states' },
      { status: 500 }
    );
  }
}
