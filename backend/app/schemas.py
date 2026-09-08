from pydantic import BaseModel, Field
from typing import List, Optional

class GeoCoordinate(BaseModel):
    lat: float = Field(..., ge=-90, le=90, description="Latitude in decimal degrees")
    lng: float = Field(..., ge=-180, le=180, description="Longitude in decimal degrees")

class GeofenceVerificationRequest(BaseModel):
    current_location: GeoCoordinate
    farm_boundary: List[GeoCoordinate] = Field(..., min_length=3, description="List of polygon vertices")
    tolerance_meters: float = Field(default=15.0, ge=0)

class GeofenceVerificationResponse(BaseModel):
    inside_geofence: bool
    distance_to_boundary_meters: float
    nearest_vertex_index: int
    haversine_centroid: GeoCoordinate
    status: str

class MandiRealizationRequest(BaseModel):
    crop_id: str
    quantity_quintals: float = Field(default=50.0, gt=0)
    modal_price_per_quintal: float = Field(..., gt=0)
    distance_km: float = Field(..., ge=0)
    freight_rate_per_km_quintal: float = Field(default=1.65, gt=0)

class MandiRealizationResponse(BaseModel):
    crop_id: str
    quantity_quintals: float
    gross_market_value: float
    total_transport_freight: float
    net_realization: float
    net_realization_per_quintal: float
    roi_score: float

class HealthCheckResponse(BaseModel):
    status: str
    version: str
    service: str
    geospatial_engine: str
