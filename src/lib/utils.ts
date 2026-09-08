import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

// Convert degrees to radians
function toRad(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

// Calculate Haversine distance between two coordinates in meters
export function calculateDistanceMeters(
  coord1: [number, number],
  coord2: [number, number]
): number {
  const R = 6371000; // Earth's radius in meters
  const dLat = toRad(coord2[0] - coord1[0]);
  const dLng = toRad(coord2[1] - coord1[1]);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(coord1[0])) *
      Math.cos(toRad(coord2[0])) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Calculate polygon area in square meters, acres, guntas, and perimeter
export function calculatePolygonMetrics(coords: [number, number][]): {
  areaSqMeters: number;
  areaAcres: number;
  areaGuntas: number;
  areaHectares: number;
  perimeterMeters: number;
} {
  if (!coords || coords.length < 3) {
    return {
      areaSqMeters: 0,
      areaAcres: 0,
      areaGuntas: 0,
      areaHectares: 0,
      perimeterMeters: 0,
    };
  }

  // Ensure closed loop for perimeter
  let perimeter = 0;
  for (let i = 0; i < coords.length; i++) {
    const nextIdx = (i + 1) % coords.length;
    perimeter += calculateDistanceMeters(coords[i], coords[nextIdx]);
  }

  // Spherical polygon area (using planar projection with meter conversions at centroid)
  const centroidLat =
    coords.reduce((sum, c) => sum + c[0], 0) / coords.length;
  const metersPerDegLat = 111320;
  const metersPerDegLng = 111320 * Math.cos(toRad(centroidLat));

  // Convert coords to projected (x, y) in meters
  const projected = coords.map(([lat, lng]) => [
    lng * metersPerDegLng,
    lat * metersPerDegLat,
  ]);

  // Shoelace formula
  let area = 0;
  const n = projected.length;
  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n;
    area += projected[i][0] * projected[j][1];
    area -= projected[j][0] * projected[i][1];
  }
  const areaSqMeters = Math.abs(area) / 2;

  const areaAcres = Number((areaSqMeters / 4046.8564).toFixed(2));
  const areaGuntas = Number((areaAcres * 40).toFixed(1));
  const areaHectares = Number((areaSqMeters / 10000).toFixed(2));
  const perimeterMeters = Math.round(perimeter);

  return {
    areaSqMeters: Math.round(areaSqMeters),
    areaAcres,
    areaGuntas,
    areaHectares,
    perimeterMeters,
  };
}
