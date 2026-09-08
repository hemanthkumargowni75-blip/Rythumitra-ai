import { NextRequest, NextResponse } from 'next/server';
import {
  getAllGovernmentServices,
  getGovernmentServicesByCategory,
  addGovernmentService,
  GovServiceCategory,
  GovernmentServiceItem,
} from '@/data/governmentServicesData';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = (searchParams.get('category') || 'ALL') as GovServiceCategory;
  const query = (searchParams.get('q') || '').trim().toLowerCase();

  let services = category === 'ALL'
    ? getAllGovernmentServices()
    : getGovernmentServicesByCategory(category);

  if (query) {
    services = services.filter(
      (s) =>
        s.nameEn.toLowerCase().includes(query) ||
        s.nameTe.toLowerCase().includes(query) ||
        s.shortDescEn.toLowerCase().includes(query) ||
        s.shortDescTe.toLowerCase().includes(query)
    );
  }

  return NextResponse.json({
    total: services.length,
    category,
    query,
    services,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nameEn, nameTe, officialUrl, category, departmentEn, departmentTe } = body;

    if (!nameEn || !officialUrl || !category) {
      return NextResponse.json(
        { error: 'nameEn, officialUrl, and category are required fields.' },
        { status: 400 }
      );
    }

    // Security check: must be https
    if (!officialUrl.startsWith('https://')) {
      return NextResponse.json(
        { error: 'Official URL must be secure HTTPS.' },
        { status: 400 }
      );
    }

    const newService: GovernmentServiceItem = {
      id: `gov-custom-${Date.now()}`,
      nameEn,
      nameTe: nameTe || nameEn,
      shortDescEn: body.shortDescEn || 'Official Government Agricultural Service',
      shortDescTe: body.shortDescTe || 'అధికారిక ప్రభుత్వ వ్యవసాయ సేవ',
      category,
      officialUrl,
      departmentEn: departmentEn || 'Government Department',
      departmentTe: departmentTe || 'ప్రభుత్వ శాఖ',
      safetyBadgeEn: 'Verified Official Govt Portal',
      safetyBadgeTe: 'ధ్రువీకరించబడిన ప్రభుత్వ పోర్టల్',
      iconEmoji: body.iconEmoji || '🏛️',
      featuresEn: body.featuresEn || ['Official government application and tracking'],
      featuresTe: body.featuresTe || ['అధికారిక ప్రభుత్వ దరఖాస్తు మరియు పరిశీలన'],
      lastVerifiedDate: new Date().toISOString().split('T')[0],
      isStateSpecific: Boolean(body.isStateSpecific),
      state: body.state,
    };

    addGovernmentService(newService);

    return NextResponse.json({
      success: true,
      service: newService,
      message: 'Government service registered successfully.',
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || 'Error processing request' },
      { status: 500 }
    );
  }
}
