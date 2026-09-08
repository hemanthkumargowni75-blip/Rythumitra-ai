import { NextRequest, NextResponse } from 'next/server';
import {
  getFarmerRecentSearches,
  addFarmerRecentSearch,
  clearFarmerRecentSearches,
} from '@/data/cropDatabase';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const farmerId = searchParams.get('farmerId') || 'usr-101';

  const searches = getFarmerRecentSearches(farmerId);
  return NextResponse.json({ farmerId, recentSearches: searches });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query, farmerId = 'usr-101' } = body;

    if (!query) {
      return NextResponse.json({ error: 'Query is required.' }, { status: 400 });
    }

    addFarmerRecentSearch(query, farmerId);
    const updated = getFarmerRecentSearches(farmerId);

    return NextResponse.json({ success: true, recentSearches: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Failed to save recent search.' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const farmerId = searchParams.get('farmerId') || 'usr-101';

  clearFarmerRecentSearches(farmerId);
  return NextResponse.json({ success: true, message: 'Recent searches cleared.' });
}
