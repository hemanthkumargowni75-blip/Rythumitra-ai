'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  MapPin,
  Layers,
  RotateCcw,
  CheckCircle,
  Crosshair,
  Info,
  Maximize2,
} from 'lucide-react';
import { calculatePolygonMetrics } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';
import { useFarm } from '@/context/FarmContext';

export function FarmBoundaryMap() {
  const { language, t } = useLanguage();
  const { farm, updateFarmBoundary } = useFarm();

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<any>(null);
  const polygonLayerRef = useRef<any>(null);
  const markersGroupRef = useRef<any>(null);

  const [mapType, setMapType] = useState<'satellite' | 'street'>('satellite');
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentCoords, setCurrentCoords] = useState<[number, number][]>(
    farm.boundary.coordinates.length > 0 ? farm.boundary.coordinates : []
  );
  const [metrics, setMetrics] = useState({
    areaAcres: farm.boundary.areaAcres,
    areaGuntas: farm.boundary.areaGuntas,
    areaHectares: farm.boundary.areaHectares,
    perimeterMeters: farm.boundary.perimeterMeters,
  });
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [locationStatus, setLocationStatus] = useState<string>('');

  // Initialize Leaflet Map safely on client
  useEffect(() => {
    let isMounted = true;

    async function initMap() {
      if (!mapContainerRef.current) return;
      if (leafletMapRef.current) return; // already initialized

      // Dynamically import Leaflet to avoid SSR window errors
      const L = (await import('leaflet')).default;

      // Center around current farm location
      const initialLat = farm.centerLocation.lat || 16.4245;
      const initialLng = farm.centerLocation.lng || 80.4548;

      const map = L.map(mapContainerRef.current, {
        center: [initialLat, initialLng],
        zoom: 17,
        zoomControl: true,
      });

      // Esri Satellite Imagery Layer
      const satelliteLayer = L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        {
          attribution: 'Esri, Maxar, Earthstar Geographics',
          maxZoom: 19,
        }
      );

      // OpenStreetMap Layer
      const streetLayer = L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
          attribution: '&copy; OpenStreetMap contributors',
          maxZoom: 19,
        }
      );

      satelliteLayer.addTo(map);

      // Feature group for markers & polygon
      const markersGroup = L.featureGroup().addTo(map);
      markersGroupRef.current = markersGroup;

      leafletMapRef.current = {
        map,
        satelliteLayer,
        streetLayer,
        L,
      };

      // Draw initial boundary polygon
      renderPolygonOnMap(L, map, currentCoords);

      // Add map click handler for drawing
      map.on('click', (e: any) => {
        if (!isMounted) return;
        const newCoord: [number, number] = [e.latlng.lat, e.latlng.lng];

        setCurrentCoords((prev) => {
          const updated = [...prev, newCoord];
          const newMetrics = calculatePolygonMetrics(updated);
          setMetrics(newMetrics);
          return updated;
        });
      });
    }

    initMap();

    return () => {
      isMounted = false;
      if (leafletMapRef.current?.map) {
        leafletMapRef.current.map.remove();
        leafletMapRef.current = null;
      }
    };
  }, []);

  // Update map layer when mapType changes
  useEffect(() => {
    if (!leafletMapRef.current) return;
    const { map, satelliteLayer, streetLayer } = leafletMapRef.current;

    if (mapType === 'satellite') {
      map.removeLayer(streetLayer);
      map.addLayer(satelliteLayer);
    } else {
      map.removeLayer(satelliteLayer);
      map.addLayer(streetLayer);
    }
  }, [mapType]);

  // Re-render polygon whenever currentCoords changes
  useEffect(() => {
    if (!leafletMapRef.current) return;
    const { L, map } = leafletMapRef.current;
    renderPolygonOnMap(L, map, currentCoords);
  }, [currentCoords]);

  function renderPolygonOnMap(L: any, map: any, coords: [number, number][]) {
    if (!markersGroupRef.current) return;
    markersGroupRef.current.clearLayers();

    if (!coords || coords.length === 0) return;

    // Draw vertex corner markers
    coords.forEach((coord, idx) => {
      const circle = L.circleMarker(coord, {
        radius: 6,
        fillColor: '#10b981',
        color: '#ffffff',
        weight: 2,
        fillOpacity: 0.9,
      }).bindTooltip(`P${idx + 1}`, { permanent: true, direction: 'top', className: 'text-xs font-bold' });
      circle.addTo(markersGroupRef.current);
    });

    // Draw polyline or polygon
    if (coords.length >= 3) {
      if (polygonLayerRef.current) {
        polygonLayerRef.current.remove();
      }
      const polygon = L.polygon(coords, {
        color: '#10b981',
        weight: 3,
        opacity: 0.9,
        fillColor: '#34d399',
        fillOpacity: 0.35,
        dashArray: isDrawing ? '6, 6' : undefined,
      }).addTo(markersGroupRef.current);

      polygonLayerRef.current = polygon;
      map.fitBounds(polygon.getBounds(), { padding: [40, 40] });
    } else if (coords.length === 2) {
      L.polyline(coords, {
        color: '#3b82f6',
        weight: 3,
        dashArray: '4, 4',
      }).addTo(markersGroupRef.current);
    }
  }

  // Locate user with GPS
  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      alert(language === 'te' ? 'మీ బ్రౌజర్ GPS సపోర్ట్ చేయదు.' : 'Geolocation is not supported by your browser.');
      return;
    }

    setLocationStatus(language === 'te' ? 'GPS లొకేషన్ గుర్తిస్తోంది...' : 'Acquiring GPS location...');

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setLocationStatus('');
        if (leafletMapRef.current?.map) {
          leafletMapRef.current.map.setView([latitude, longitude], 18);
        }
      },
      () => {
        setLocationStatus('');
        // Fallback default
        if (leafletMapRef.current?.map) {
          leafletMapRef.current.map.setView([16.4245, 80.4548], 18);
        }
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleClearBoundary = () => {
    setCurrentCoords([]);
    setMetrics({
      areaAcres: 0,
      areaGuntas: 0,
      areaHectares: 0,
      perimeterMeters: 0,
    });
    if (markersGroupRef.current) {
      markersGroupRef.current.clearLayers();
    }
  };

  const handleUndoLastPoint = () => {
    if (currentCoords.length === 0) return;
    const updated = currentCoords.slice(0, -1);
    setCurrentCoords(updated);
    setMetrics(calculatePolygonMetrics(updated));
  };

  const handleSaveBoundary = () => {
    if (currentCoords.length < 3) {
      alert(language === 'te' ? 'దయచేసి కనీసం 3 బిందువులతో సరిహద్దును గీయండి.' : 'Please mark at least 3 points to complete your field boundary.');
      return;
    }

    updateFarmBoundary(currentCoords, metrics);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3500);
  };

  return (
    <div className="bg-white rounded-2xl border border-farm-200 shadow-lg overflow-hidden">
      {/* Map Header & Toolbar */}
      <div className="p-4 bg-farm-50 border-b border-farm-200 flex flex-wrap gap-3 justify-between items-center">
        <div>
          <h3 className="text-base font-bold text-farm-900 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-farm-600" />
            {t.map.title}
          </h3>
          <p className="text-xs text-farm-700 mt-0.5">{t.map.subtitle}</p>
        </div>

        {/* Toolbar Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Map Layer Switcher */}
          <div className="inline-flex rounded-lg p-1 bg-white border border-farm-200 shadow-xs">
            <button
              type="button"
              onClick={() => setMapType('satellite')}
              className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all ${
                mapType === 'satellite'
                  ? 'bg-farm-700 text-white shadow-xs'
                  : 'text-gray-600 hover:text-farm-800'
              }`}
            >
              {language === 'te' ? 'శాటిలైట్' : 'Satellite'}
            </button>
            <button
              type="button"
              onClick={() => setMapType('street')}
              className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all ${
                mapType === 'street'
                  ? 'bg-farm-700 text-white shadow-xs'
                  : 'text-gray-600 hover:text-farm-800'
              }`}
            >
              {language === 'te' ? 'మ్యాప్' : 'Streets'}
            </button>
          </div>

          {/* GPS Locate Me Button */}
          <button
            type="button"
            onClick={handleLocateMe}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-farm-300 hover:bg-farm-100 text-farm-800 text-xs font-bold shadow-xs transition-colors"
          >
            <Crosshair className="w-4 h-4 text-farm-600" />
            <span>{t.map.locateMe}</span>
          </button>

          {/* Start / Stop Drawing Button */}
          <button
            type="button"
            onClick={() => setIsDrawing(!isDrawing)}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold shadow-xs transition-all ${
              isDrawing
                ? 'bg-amber-600 hover:bg-amber-700 text-white animate-pulse'
                : 'bg-farm-600 hover:bg-farm-700 text-white'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>
              {isDrawing
                ? language === 'te'
                  ? 'మ్యాప్‌పై బిందువులు నొక్కండి'
                  : 'Click on Map to Draw'
                : t.map.startDrawing}
            </span>
          </button>

          {/* Undo Point */}
          {currentCoords.length > 0 && (
            <button
              type="button"
              onClick={handleUndoLastPoint}
              className="p-1.5 rounded-lg bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 shadow-xs text-xs"
              title="Undo last corner"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}

          {/* Clear Boundary */}
          <button
            type="button"
            onClick={handleClearBoundary}
            className="px-2.5 py-1.5 rounded-lg bg-white border border-red-200 hover:bg-red-50 text-red-600 text-xs font-semibold shadow-xs"
          >
            {t.map.clearBoundary}
          </button>
        </div>
      </div>

      {/* Location Status Notice */}
      {locationStatus && (
        <div className="bg-amber-100 px-4 py-1 text-xs text-amber-900 font-medium flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-600 animate-ping"></span>
          <span>{locationStatus}</span>
        </div>
      )}

      {/* Interactive Map Container */}
      <div className="relative w-full h-[450px] bg-slate-900">
        <div ref={mapContainerRef} className="w-full h-full z-10" />

        {/* Floating Acreage & Metrics HUD */}
        <div className="absolute top-3 left-3 z-20 bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-farm-300 shadow-xl max-w-xs">
          <p className="text-[11px] font-bold uppercase tracking-wider text-farm-700">
            {t.map.calculatedArea}
          </p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-black text-farm-900">
              {metrics.areaAcres}
            </span>
            <span className="text-sm font-bold text-farm-700">
              {t.dashboard.acres}
            </span>
            <span className="text-xs text-gray-500 font-medium">
              ({metrics.areaGuntas} {t.dashboard.guntas})
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-gray-100 text-[11px]">
            <div>
              <span className="text-gray-500 block">{t.map.perimeter}:</span>
              <span className="font-bold text-gray-900">
                {metrics.perimeterMeters} {t.map.meters}
              </span>
            </div>
            <div>
              <span className="text-gray-500 block">Hectares:</span>
              <span className="font-bold text-gray-900">
                {metrics.areaHectares} ha
              </span>
            </div>
          </div>

          {currentCoords.length > 0 && (
            <p className="text-[10px] text-gray-500 mt-2">
              {currentCoords.length} {language === 'te' ? 'మూల బిందువులు గుర్తించబడ్డాయి' : 'corners marked'}
            </p>
          )}
        </div>

        {/* Instructions Overlay */}
        <div className="absolute bottom-3 right-3 z-20 bg-black/75 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-[11px] max-w-sm hidden sm:flex items-center gap-2 border border-white/20">
          <Info className="w-4 h-4 text-amber-300 shrink-0" />
          <span>{t.map.instructions}</span>
        </div>
      </div>

      {/* Footer Actions & Save Bar */}
      <div className="p-4 bg-white border-t border-farm-200 flex flex-wrap items-center justify-between gap-3">
        <div className="text-xs text-gray-600">
          <span className="font-semibold text-gray-900">{farm.name}</span> | {t.dashboard.surveyNo}:{' '}
          <span className="font-semibold text-gray-900">{farm.surveyNumber}</span> | {farm.soilType.replace('_', ' ')}
        </div>

        <div className="flex items-center gap-3">
          {saveSuccess && (
            <div className="flex items-center gap-1.5 text-emerald-700 text-xs font-bold animate-bounce">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>{language === 'te' ? 'సరిహద్దు భద్రపరచబడింది!' : 'Farm boundary saved successfully!'}</span>
            </div>
          )}

          <button
            type="button"
            onClick={handleSaveBoundary}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-farm-600 hover:bg-farm-700 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all"
          >
            <CheckCircle className="w-4 h-4" />
            <span>{t.map.saveBoundary}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
