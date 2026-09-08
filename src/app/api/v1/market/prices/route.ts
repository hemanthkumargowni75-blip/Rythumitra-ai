import { NextRequest, NextResponse } from 'next/server';
import { verifiedMandiPrices, getMandiPricesForCrop } from '@/data/marketData';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const cropId = searchParams.get('crop');

  if (cropId) {
    const filtered = getMandiPricesForCrop(cropId);
    return NextResponse.json({
      cropId,
      totalMarkets: filtered.length,
      markets: filtered,
    });
  }

  return NextResponse.json({
    totalMarkets: verifiedMandiPrices.length,
    markets: verifiedMandiPrices,
  });
}
