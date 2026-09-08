import { NextRequest, NextResponse } from 'next/server';
import {
  verifiedMandiPrices,
  COMMODITY_CATEGORIES,
  MandiPriceRecord,
} from '@/data/marketData';
import { getMarketDataProvider } from '@/lib/market/marketProvider';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const crop = searchParams.get('crop') || 'all';
    const state = searchParams.get('state') || 'all';
    const search = searchParams.get('search')?.toLowerCase().trim() || '';
    const sortBy = searchParams.get('sortBy') || 'price_desc';

    const provider = getMarketDataProvider();
    const fetchResult = await provider.fetchPrices(crop, state);

    if (!fetchResult.success && fetchResult.records.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Market data temporarily unavailable.',
          provider: provider.name,
        },
        { status: 503 }
      );
    }

    let records: MandiPriceRecord[] = [...fetchResult.records];

    // Filter by state
    if (state !== 'all') {
      records = records.filter(
        (r) => r.state.toLowerCase() === state.toLowerCase()
      );
    }

    // Filter by search query (mandi name, district, variety, cropName)
    if (search) {
      records = records.filter(
        (r) =>
          r.marketName.toLowerCase().includes(search) ||
          r.district.toLowerCase().includes(search) ||
          r.variety.toLowerCase().includes(search) ||
          r.cropNameEn.toLowerCase().includes(search) ||
          r.cropNameTe.includes(search)
      );
    }

    // Sort records
    records.sort((a, b) => {
      switch (sortBy) {
        case 'price_desc':
          return b.modalPrice - a.modalPrice;
        case 'price_asc':
          return a.modalPrice - b.modalPrice;
        case 'distance_asc':
          return a.distanceKmFromFarm - b.distanceKmFromFarm;
        case 'arrival_desc':
          return b.arrivalTons - a.arrivalTons;
        default:
          return b.modalPrice - a.modalPrice;
      }
    });

    // Calculate aggregated statistics
    const prices = records.map((r) => r.modalPrice);
    const highestPrice = prices.length ? Math.max(...prices) : 0;
    const lowestPrice = prices.length ? Math.min(...prices) : 0;
    const avgPrice = prices.length
      ? Math.round(prices.reduce((sum, p) => sum + p, 0) / prices.length)
      : 0;
    const totalArrivals = records.reduce((sum, r) => sum + r.arrivalTons, 0);

    const availableStates = Array.from(new Set(verifiedMandiPrices.map((r) => r.state)));

    return NextResponse.json({
      success: true,
      crop,
      state,
      provider: fetchResult.provider,
      isLiveFeed: fetchResult.isLiveFeed,
      totalMarkets: records.length,
      commodities: COMMODITY_CATEGORIES,
      states: availableStates,
      stats: {
        highestPrice,
        lowestPrice,
        avgPrice,
        totalArrivals,
      },
      markets: records,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch market prices' },
      { status: 500 }
    );
  }
}
