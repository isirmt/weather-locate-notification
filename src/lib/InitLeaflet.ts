import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

export const DefaultIcon = L.icon({
  iconUrl: String(markerIcon),
  iconRetinaUrl: String(markerIcon2x),
  shadowUrl: String(markerShadow),
  iconAnchor: [12, 41],
  popupAnchor: [0, -32],
});

L.Marker.prototype.options.icon = DefaultIcon;

export default DefaultIcon;
