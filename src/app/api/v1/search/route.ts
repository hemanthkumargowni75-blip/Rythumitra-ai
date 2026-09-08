import { NextRequest, NextResponse } from 'next/server';
import { executeSearch } from '@/lib/searchEngine';
import { Language } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const rawLang = searchParams.get('language') || 'te';
    const lang = (rawLang.split('-')[0] || 'te') as Language;

    const response = executeSearch(query, lang);

    return NextResponse.json(response, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Search service failed',
        results: [],
        total: 0,
      },
      { status: 500 }
    );
  }
}
