import { NextRequest, NextResponse } from 'next/server';
import { getLocationProvider } from '@/lib/location/indiaLocationProvider';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const lat = body.lat !== undefined ? body.lat : body.latitude;
    const lng = body.lng !== undefined ? body.lng : body.longitude;

    if (lat === undefined || lng === undefined) {
      return NextResponse.json(
        { success: false, error: 'Latitude and longitude coordinates are required' },
        { status: 400 }
      );
    }

    const numLat = parseFloat(lat);
    const numLng = parseFloat(lng);

    if (isNaN(numLat) || isNaN(numLng) || numLat < 6 || numLat > 38 || numLng < 68 || numLng > 98) {
      return NextResponse.json(
        { success: false, error: 'Coordinates are outside the geographic boundaries of India' },
        { status: 400 }
      );
    }

    const provider = getLocationProvider();
    const location = await provider.reverseGeocode(numLat, numLng);

    if (!location) {
      return NextResponse.json({
        success: true,
        detected: false,
        message: 'Current coordinates detected, but authoritative administrative address is unavailable for this exact point. Please select manually.',
        coordinates: {
          lat: Math.round(numLat * 10000) / 10000,
          lng: Math.round(numLng * 10000) / 10000,
        },
      });
    }

    return NextResponse.json({
      success: true,
      detected: true,
      location,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Reverse geocoding failed' },
      { status: 500 }
    );
  }
}
