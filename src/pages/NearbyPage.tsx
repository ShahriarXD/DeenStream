import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigation, X, Loader2 } from 'lucide-react';
import PageWrapper from '@/components/PageWrapper';

interface Place {
  id: number;
  name: string;
  lat: number;
  lon: number;
  distance?: number;
  address?: string;
}

const SEARCH_RADIUS_KM = 50;
const SEARCH_RADIUS_M = SEARCH_RADIUS_KM * 1000;
const REQUEST_TIMEOUT_MS = 22000;

function haversine(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function getBoundingBox(lat: number, lon: number, radiusKm: number) {
  const latDelta = radiusKm / 111;
  const safeCos = Math.max(Math.cos((lat * Math.PI) / 180), 0.01);
  const lonDelta = radiusKm / (111 * safeCos);
  return { minLat: lat - latDelta, maxLat: lat + latDelta, minLon: lon - lonDelta, maxLon: lon + lonDelta };
}

async function fetchJsonWithTimeout(url: string, timeoutMs: number): Promise<any> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { signal: controller.signal, headers: { Accept: 'application/json' } });
    if (!response.ok) throw new Error(`Request failed (${response.status})`);
    return response.json();
  } finally {
    clearTimeout(timeoutId);
  }
}

function dedupePlaces(places: Place[]): Place[] {
  const seen = new Set<string>();
  return places.filter((place) => {
    const key = `${place.name.toLowerCase()}-${place.lat.toFixed(4)}-${place.lon.toFixed(4)}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export default function NearbyPage() {
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchNote, setSearchNote] = useState('');
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => setLocation({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
      () => setLocation({ lat: 21.4225, lon: 39.8262 }),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  }, []);

  useEffect(() => {
    if (!location) return;
    let cancelled = false;

    const mapElements = (elements: any[]): Place[] =>
      elements
        .map((el: any, index: number) => {
          const lat = Number(el.lat ?? el.center?.lat);
          const lon = Number(el.lon ?? el.center?.lon);
          if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null;
          const rawAddress = el.tags?.['addr:full'] || [el.tags?.['addr:housenumber'], el.tags?.['addr:street']].filter(Boolean).join(' ') || el.tags?.address || '';
          return {
            id: 1_000_000_000 + Number(el.id || index),
            name: el.tags?.name || 'Mosque',
            lat, lon,
            distance: haversine(location.lat, location.lon, lat, lon),
            address: rawAddress,
          } as Place;
        })
        .filter(Boolean) as Place[];

    const fetchOverpass = async () => {
      const loc = `${location.lat},${location.lon}`;
      const query = `[out:json][timeout:25];(node["amenity"="place_of_worship"]["religion"="muslim"](around:${SEARCH_RADIUS_M},${loc});way["amenity"="place_of_worship"]["religion"="muslim"](around:${SEARCH_RADIUS_M},${loc});relation["amenity"="place_of_worship"]["religion"="muslim"](around:${SEARCH_RADIUS_M},${loc}););out center 80;`;
      const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;
      const data = await fetchJsonWithTimeout(url, REQUEST_TIMEOUT_MS);
      return mapElements(data.elements ?? []);
    };

    const fetchFallback = async () => {
      const box = getBoundingBox(location.lat, location.lon, SEARCH_RADIUS_KM);
      const viewbox = `${box.minLon},${box.maxLat},${box.maxLon},${box.minLat}`;
      const res = await fetchJsonWithTimeout(
        `https://nominatim.openstreetmap.org/search?format=jsonv2&bounded=1&limit=40&viewbox=${encodeURIComponent(viewbox)}&q=${encodeURIComponent('mosque')}`,
        REQUEST_TIMEOUT_MS
      );
      return (res ?? []).map((item: any, index: number) => {
        const lat = Number(item.lat), lon = Number(item.lon);
        if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null;
        return {
          id: 3_000_000_000 + Number(item.place_id || index),
          name: item.name || item.display_name?.split(',')?.[0] || 'Mosque',
          lat, lon,
          distance: haversine(location.lat, location.lon, lat, lon),
          address: item.display_name || '',
        } as Place;
      }).filter(Boolean) as Place[];
    };

    (async () => {
      setLoading(true);
      setSearchNote('');
      try {
        let results = dedupePlaces(await fetchOverpass());
        if (!results.length) {
          results = dedupePlaces(await fetchFallback());
          if (!cancelled) setSearchNote('Using backup search');
        }
        if (cancelled) return;
        setPlaces(results.sort((a, b) => (a.distance || 0) - (b.distance || 0)).slice(0, 120));
      } catch (e) {
        console.error('Fetch failed:', e);
        if (!cancelled) { setPlaces([]); setSearchNote('Search temporarily unavailable. Please try again.'); }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => { cancelled = true; };
  }, [location]);

  useEffect(() => {
    if (!mapRef.current || !location || leafletMapRef.current) return;
    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link');
      link.id = 'leaflet-css';
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }
    import('leaflet').then((L) => {
      if (leafletMapRef.current || !mapRef.current) return;
      const map = L.map(mapRef.current, { zoomControl: false, attributionControl: false }).setView([location.lat, location.lon], 14);
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png').addTo(map);
      L.circleMarker([location.lat, location.lon], { radius: 8, color: 'hsl(205, 85%, 55%)', fillColor: 'hsl(205, 85%, 55%)', fillOpacity: 0.9 }).addTo(map);
      leafletMapRef.current = map;
      setTimeout(() => map.invalidateSize(), 500);
    });
    return () => { if (leafletMapRef.current) { leafletMapRef.current.remove(); leafletMapRef.current = null; } };
  }, [location]);

  useEffect(() => {
    const map = leafletMapRef.current;
    if (!map) return;
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];
    import('leaflet').then((L) => {
      places.forEach((place) => {
        const color = 'hsl(160, 70%, 28%)';
        const marker = L.circleMarker([place.lat, place.lon], { radius: 7, color, fillColor: color, fillOpacity: 0.85, weight: 2 })
          .on('click', () => setSelectedPlace(place))
          .addTo(map);
        markersRef.current.push(marker);
      });
    });
  }, [places]);

  return (
    <PageWrapper className="!px-0 !pt-0 !pb-0">
      <div className="h-screen flex flex-col">
        <div className="flex-1 relative bg-secondary/20">
          {location ? (
            <div ref={mapRef} className="h-full w-full" style={{ zIndex: 0 }} />
          ) : (
            <div className="h-full flex items-center justify-center">
              <Loader2 size={24} className="animate-spin text-muted-foreground" />
            </div>
          )}
          <div className="absolute top-12 left-0 right-0 z-[1000] flex justify-center px-5">
            <div className="px-5 py-2.5 rounded-full bg-card/70 backdrop-blur-xl border border-border/20">
              <span className="text-[12px] font-medium text-foreground">🕌 Mosques within {SEARCH_RADIUS_KM} km</span>
            </div>
          </div>
        </div>

        <div className="bg-background border-t border-border/20 max-h-[35vh] overflow-y-auto">
          <div className="px-5 pt-4 pb-2">
            <p className="text-[11px] text-muted-foreground font-medium">
              {loading ? `Searching within ${SEARCH_RADIUS_KM} km...` : places.length > 0 ? `${places.length} mosques found${searchNote ? ` · ${searchNote}` : ''}` : searchNote || `No mosques found within ${SEARCH_RADIUS_KM} km`}
            </p>
          </div>
          {!loading && places.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-8">{searchNote || `No mosques found within ${SEARCH_RADIUS_KM} km`}</p>
          )}
          <div className="px-5 pb-24 space-y-2">
            {places.slice(0, 20).map((place) => (
              <button key={place.id} onClick={() => setSelectedPlace(place)} className="w-full card-elevated p-4 text-left tap-scale flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-primary/30">
                  <span className="text-lg">🕌</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{place.name}</p>
                  {place.address && <p className="text-[11px] text-muted-foreground truncate">{place.address}</p>}
                </div>
                <span className="text-[11px] text-muted-foreground font-mono tabular-nums flex-shrink-0">
                  {place.distance ? `${place.distance.toFixed(1)} km` : ''}
                </span>
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {selectedPlace && (
            <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }} transition={{ duration: 0.3 }} className="fixed bottom-20 left-4 right-4 z-[1001] max-w-lg mx-auto">
              <div className="card-elevated p-5 backdrop-blur-xl">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-[15px] font-semibold text-foreground">{selectedPlace.name}</p>
                    <p className="text-[12px] text-muted-foreground mt-1">Mosque</p>
                  </div>
                  <button onClick={() => setSelectedPlace(null)} className="w-8 h-8 rounded-xl glass flex items-center justify-center tap-scale">
                    <X size={14} className="text-muted-foreground" />
                  </button>
                </div>
                {selectedPlace.address && <p className="text-[12px] text-muted-foreground mb-3">{selectedPlace.address}</p>}
                <div className="flex items-center gap-3">
                  <span className="text-[12px] text-gold font-mono">{selectedPlace.distance?.toFixed(1)} km away</span>
                  <a href={`https://www.google.com/maps/dir/?api=1&destination=${selectedPlace.lat},${selectedPlace.lon}`} target="_blank" rel="noopener noreferrer" className="ml-auto flex items-center gap-2 px-4 py-2 rounded-xl gradient-gold text-[12px] font-medium text-accent-foreground tap-scale">
                    <Navigation size={12} /> Directions
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageWrapper>
  );
}
