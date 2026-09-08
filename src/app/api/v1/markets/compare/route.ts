import { NextRequest, NextResponse } from 'next/server';
import { compareMandiRealization } from '@/data/marketData';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const crop = searchParams.get('crop') || 'chilli';
    const quantityStr = searchParams.get('quantity') || '50';
    const quantity = Math.max(1, parseFloat(quantityStr) || 50);

    const comparison = compareMandiRealization(crop, quantity);

    const bestOption = comparison.find((c) => c.badge === 'HIGHEST_NET_GAIN') || comparison[0];
    const localOption = comparison.find((c) => c.badge === 'NEAREST_LOCAL') || comparison[comparison.length - 1];

    const maxAdditionalProfit = bestOption && localOption
      ? Math.max(0, bestOption.netRealization - localOption.netRealization)
      : 0;

    return NextResponse.json({
      success: true,
      cropId: crop,
      quantityQuintals: quantity,
      totalMarketsCompared: comparison.length,
      recommendation: {
        bestMandiId: bestOption?.mandi.id,
        bestMandiName: bestOption?.mandi.marketName,
        maxAdditionalProfit,
        advice:
          maxAdditionalProfit > 0
            ? `Selling at ${bestOption?.mandi.marketName} yields ₹${maxAdditionalProfit.toLocaleString('en-IN')} MORE net profit after freight costs!`
            : `Nearest mandi offers the best net returns after considering transport costs.`,
      },
      comparison,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to calculate market comparison' },
      { status: 500 }
    );
  }
}
