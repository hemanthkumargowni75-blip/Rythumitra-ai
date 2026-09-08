import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from .schemas import (
    HealthCheckResponse,
    GeofenceVerificationRequest,
    GeofenceVerificationResponse,
    MandiRealizationRequest,
    MandiRealizationResponse,
    GeoCoordinate,
)
from .geospatial import (
    is_point_in_polygon,
    haversine_distance_meters,
    calculate_centroid,
)

app = FastAPI(
    title="RythuMitra AI Backend Microservice",
    description="High-performance geospatial geofencing, real-time mandi realization engine, and agronomic AI microservices.",
    version="1.0.0",
)

# Configure CORS using FRONTEND_ORIGIN
allowed_origins_env = os.getenv("FRONTEND_ORIGIN", "http://localhost:3000")
allowed_origins = [origin.strip() for origin in allowed_origins_env.split(",") if origin.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins if allowed_origins else ["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health", response_model=HealthCheckResponse)
def health_check():
    """Liveness probe: verifies service process is running and responsive."""
    return HealthCheckResponse(
        status="ok",
        version="1.0.0",
        service="RythuMitra AI Geospatial Microservice",
        geospatial_engine="PostGIS / Shapely / Haversine Active",
    )

@app.get("/readiness")
def readiness_check():
    """Readiness probe: verifies computational engine and external database connectivity (if configured)."""
    db_url = os.getenv("DATABASE_URL")
    db_status = "NOT_CONFIGURED"
    is_ready = True

    if db_url:
        try:
            import psycopg2
            # Connect with a strict 3-second timeout; never log or return connection string
            conn = psycopg2.connect(db_url, connect_timeout=3)
            conn.close()
            db_status = "CONNECTED"
        except Exception:
            # Report failure without leaking credentials, user, host, or password
            db_status = "CONNECTION_FAILED"
            is_ready = False

    payload = {
        "status": "READY" if is_ready else "NOT_READY",
        "service": "RythuMitra AI Geospatial Microservice",
        "database": db_status,
        "geospatial_engine": "READY",
        "timestamp": os.getenv("RENDER_GIT_COMMIT", "local-build"),
    }

    if not is_ready:
        raise HTTPException(status_code=503, detail=payload)

    return payload

@app.post("/api/v1/geo/geofence", response_model=GeofenceVerificationResponse)
def verify_geofence(req: GeofenceVerificationRequest):
    """Verifies whether farmer's live GPS coordinates reside within the registered farm plot geofence."""
    if len(req.farm_boundary) < 3:
        raise HTTPException(status_code=400, detail="Farm boundary must have at least 3 GPS vertices")

    inside = is_point_in_polygon(req.current_location, req.farm_boundary)
    centroid = calculate_centroid(req.farm_boundary)

    # Find closest boundary vertex distance
    min_dist = float("inf")
    nearest_idx = 0
    for idx, vertex in enumerate(req.farm_boundary):
        dist = haversine_distance_meters(
            req.current_location.lat,
            req.current_location.lng,
            vertex.lat,
            vertex.lng,
        )
        if dist < min_dist:
            min_dist = dist
            nearest_idx = idx

    status_str = "ON_FIELD_ACTIVE" if inside else "OUTSIDE_BOUNDARY"

    return GeofenceVerificationResponse(
        inside_geofence=inside,
        distance_to_boundary_meters=round(min_dist, 2),
        nearest_vertex_index=nearest_idx,
        haversine_centroid=centroid,
        status=status_str,
    )

@app.post("/api/v1/market/realization", response_model=MandiRealizationResponse)
def calculate_net_realization(req: MandiRealizationRequest):
    """Computes exact pocket returns taking into account road transport freight tariffs."""
    gross_val = req.modal_price_per_quintal * req.quantity_quintals
    transport_per_q = req.distance_km * req.freight_rate_per_km_quintal
    total_freight = transport_per_q * req.quantity_quintals
    net_val = gross_val - total_freight
    net_per_q = req.modal_price_per_quintal - transport_per_q
    roi_score = round((net_val / (gross_val if gross_val > 0 else 1)) * 100, 2)

    return MandiRealizationResponse(
        crop_id=req.crop_id,
        quantity_quintals=req.quantity_quintals,
        gross_market_value=round(gross_val, 2),
        total_transport_freight=round(total_freight, 2),
        net_realization=round(net_val, 2),
        net_realization_per_quintal=round(net_per_q, 2),
        roi_score=roi_score,
    )
