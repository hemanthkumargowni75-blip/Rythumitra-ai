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

    const provider = getLocationProvider();
    const postalMappings = provider.getPostalMappings
      ? await provider.getPostalMappings(rawId, undefined, query)
      : [];

    return NextResponse.json({
      success: true,
      villageId: rawId,
      total: postalMappings.length,
      postal: postalMappings,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch postal mappings for village' },
      { status: 500 }
    );
  }
}
