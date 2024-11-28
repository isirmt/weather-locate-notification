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
    mapRef.current = L.map(mapContainerRef.current).setView(position, 14);

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

  return <div ref={mapContainerRef} className="simple-map-container" />;
};
