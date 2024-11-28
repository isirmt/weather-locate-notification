import { useEffect, useRef } from 'react';
import L, { LatLng } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '@/lib/InitLeaflet';
import '@/styles/simpleMap.css';

type LeafletMapProps = {
  onLocationSelect: (lat: number, lng: number) => void;
  initialPos?: {
    latitude: number,
    longitude: number
  }
};

export default function LeafletMap({ onLocationSelect, initialPos = { latitude: 35.681236, longitude: 139.767125 } }: LeafletMapProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (mapRef.current || !mapContainerRef.current) return;

    // Tokyo Sta.
    const position = new LatLng(initialPos.latitude, initialPos.longitude);
    mapRef.current = L.map(mapContainerRef.current, {minZoom: 5}).setView(position, 14);

    L.tileLayer(
      'https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png',
      {
        attribution: '© <a href="https://maps.gsi.go.jp/development/ichiran.html">国土地理院</a>',
      }
    ).addTo(mapRef.current);

    const updateCoordinates = () => {
      if (mapRef.current) {
        const center = mapRef.current.getCenter();
        onLocationSelect(center.lat, center.lng);
      }
    };

    // Update coordinates when map stops moving
    mapRef.current.on('mouseup', updateCoordinates);

    return () => {
      if (mapRef.current) {
        mapRef.current.off('mouseup', updateCoordinates);
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onLocationSelect]);

  return (
    <div className="relative size-full bg-white flex items-center justify-center">
      {/* Map container */}
      <div ref={mapContainerRef} className="simple-map-container" />

      {/* Crosshair */}
      <div className="size-full absolute pointer-events-none flex items-center justify-center z-[99999]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="36"
          height="36"
        >
          <line x1="12" y1="5" x2="12" y2="19" stroke="red" strokeWidth="1.5" />
          <line x1="5" y1="12" x2="19" y2="12" stroke="red" strokeWidth="1.5" />
        </svg>
      </div>
    </div>
  );
};
