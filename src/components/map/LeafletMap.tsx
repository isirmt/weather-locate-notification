import { useEffect, useRef } from 'react';
import L, { LatLng } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '@/lib/InitLeaflet';
import '@/styles/simpleMap.css';


export default function LeafletMap() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (mapRef.current || !mapContainerRef.current) return;

    // Tokyo Sta.
    const position = new LatLng(35.681236, 139.767125);
    mapRef.current = L.map(mapContainerRef.current).setView(position, 14);

    L.tileLayer(
      'https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png',
      {
        attribution: '© <a href="https://maps.gsi.go.jp/development/ichiran.html">国土地理院</a>',
      }
    ).addTo(mapRef.current);

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return <div ref={mapContainerRef} className="simple-map-container" />;
};
