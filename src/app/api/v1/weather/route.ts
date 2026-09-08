import { NextRequest, NextResponse } from 'next/server';
import { fetchLiveAgroWeather } from '@/lib/weather/weatherProvider';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const latParam = searchParams.get('lat');
    const lonParam = searchParams.get('lon') || searchParams.get('lng');
    const farmName = searchParams.get('farmName') || 'Sri Lakshmi Chenu';

    const lat = latParam ? parseFloat(latParam) : 16.4245;
    const lon = lonParam ? parseFloat(lonParam) : 80.4548;

    const weatherData = await fetchLiveAgroWeather(lat, lon, farmName);

    return NextResponse.json({
      success: true,
      ...weatherData,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to retrieve agro-weather' },
      { status: 500 }
    );
  }
}
