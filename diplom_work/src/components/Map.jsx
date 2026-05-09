// Imports
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

// Component
function Map({ location, productName }) {
  const position = location ? [location.lat, location.lng] : [55.6761, 12.5683];

  return (
    <div
      style={{
        height: "300px",
        width: "100%",
        borderRadius: "12px",
        overflow: "hidden",
        border: "1px solid #333",
      }}
    >
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={position}>
          <Popup>{productName || "Post Location"}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default Map;
