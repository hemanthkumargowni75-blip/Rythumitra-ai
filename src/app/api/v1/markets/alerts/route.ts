import { NextRequest, NextResponse } from 'next/server';

interface PriceAlert {
  id: string;
  cropId: string;
  targetPrice: number;
  condition: 'ABOVE' | 'BELOW';
  mandiId?: string;
  phone: string;
  channel: 'SMS' | 'WHATSAPP';
  createdAt: string;
  active: boolean;
}

// In-memory alert store for demo/startup sessions
const priceAlertsStore: PriceAlert[] = [
  {
    id: 'alt-default-1',
    cropId: 'chilli',
    targetPrice: 21000,
    condition: 'ABOVE',
    mandiId: 'mkt-chilli-guntur',
    phone: '+91 98765 43210',
    channel: 'WHATSAPP',
    createdAt: new Date().toISOString(),
    active: true,
  },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    total: priceAlertsStore.length,
    alerts: priceAlertsStore,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { cropId, targetPrice, condition = 'ABOVE', mandiId, phone, channel = 'WHATSAPP' } = body;

    if (!cropId || !targetPrice) {
      return NextResponse.json(
        { success: false, error: 'Crop and target price are required' },
        { status: 400 }
      );
    }

    const newAlert: PriceAlert = {
      id: `alt-${Date.now()}`,
      cropId,
      targetPrice: Number(targetPrice),
      condition,
      mandiId,
      phone: phone || '+91 98765 43210',
      channel,
      createdAt: new Date().toISOString(),
      active: true,
    };

    priceAlertsStore.unshift(newAlert);

    return NextResponse.json({
      success: true,
      message: `Price alert activated! You will receive a ${channel} notification when ${cropId} reaches ₹${Number(targetPrice).toLocaleString('en-IN')}/Q.`,
      alert: newAlert,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create price alert' },
      { status: 500 }
    );
  }
}
