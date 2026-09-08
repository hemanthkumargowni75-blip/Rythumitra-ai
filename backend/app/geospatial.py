import math
from typing import List, Tuple
from .schemas import GeoCoordinate

def haversine_distance_meters(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    """Calculates great-circle distance between two points on the Earth in meters."""
    R = 6371000.0  # Earth radius in meters
    phi1 = math.radians(lat1)
    phi2 = math.radians(lat2)
    delta_phi = math.radians(lat2 - lat1)
    delta_lambda = math.radians(lon2 - lon1)

    a = (math.sin(delta_phi / 2.0) ** 2 +
         math.cos(phi1) * math.cos(phi2) * math.sin(delta_lambda / 2.0) ** 2)
    c = 2.0 * math.atan2(math.sqrt(a), math.sqrt(1.0 - a))

    return R * c

def is_point_in_polygon(point: GeoCoordinate, polygon: List[GeoCoordinate]) -> bool:
    """Ray casting algorithm for spatial point-in-polygon verification."""
    x = point.lng
    y = point.lat
    inside = False
    n = len(polygon)

    p1x = polygon[0].lng
    p1y = polygon[0].lat

    for i in range(n + 1):
        p2x = polygon[i % n].lng
        p2y = polygon[i % n].lat
        if y > min(p1y, p2y):
            if y <= max(p1y, p2y):
                if x <= max(p1x, p2x):
                    if p1y != p2y:
                        xinters = (y - p1y) * (p2x - p1x) / (p2y - p1y) + p1x
                    if p1x == p2x or x <= xinters:
                        inside = not inside
        p1x, p1y = p2x, p2y

    return inside

def calculate_centroid(polygon: List[GeoCoordinate]) -> GeoCoordinate:
    """Computes geometric centroid of polygon coordinates."""
    avg_lat = sum(p.lat for p in polygon) / len(polygon)
    avg_lng = sum(p.lng for p in polygon) / len(polygon)
    return GeoCoordinate(lat=round(avg_lat, 6), lng=round(avg_lng, 6))
