import { NextRequest, NextResponse } from 'next/server';
import { getLocationProvider } from '@/lib/location/indiaLocationProvider';
import { LocationSyncLog } from '@/types/location';

// In-memory sync audit log store
const syncLogs: LocationSyncLog[] = [
  {
    id: 'sync-init-001',
    provider: 'LocalDatabaseProvider',
    timestamp: '2026-09-07T10:00:00.000Z',
    recordsSynced: 28 + 8 + 26 + 15 + 10,
    status: 'SUCCESS',
    details: 'Initial authoritative LGD database seed verified. 28 States and 8 Union Territories active.',
  },
];

export async function GET() {
  try {
    const isGovEnabled = process.env.LOCATION_API_ENABLED === 'true';
    const isExternalConfigured = isGovEnabled && !!process.env.LOCATION_API_KEY;
    const currentProvider = isExternalConfigured
      ? 'GovernmentLocationProvider'
      : 'Authoritative location master data cached locally';
    const providerNotice = isExternalConfigured
      ? 'Connected to official Ministry of Panchayati Raj (LGD).'
      : 'External location API is not configured. Current functionality is limited to the available local dataset.';

    return NextResponse.json({
      success: true,
      activeProvider: currentProvider,
      isExternalApiConfigured: isExternalConfigured,
      providerNotice,
      lastSync: syncLogs[0] || null,
      history: syncLogs,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch sync status' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const provider = getLocationProvider();
    const log = await provider.syncDataset();

    syncLogs.unshift(log);

    return NextResponse.json({
      success: true,
      message: 'Administrative location synchronization completed successfully.',
      syncLog: log,
    });
  } catch (error: any) {
    const errorLog: LocationSyncLog = {
      id: `sync-err-${Date.now()}`,
      provider: 'LocalDatabaseProvider',
      timestamp: new Date().toISOString(),
      recordsSynced: 0,
      status: 'FAILED',
      details: 'Sync aborted due to provider error.',
      error: error.message || 'Unknown provider error',
    };
    syncLogs.unshift(errorLog);

    return NextResponse.json(
      { success: false, error: error.message || 'Sync failed', syncLog: errorLog },
      { status: 500 }
    );
  }
}
