// Imports
import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import { useEffect } from "react";

// Extra routing component
function RoutingMachine({ userPos, warehousePos }) {
  const map = useMap();

  useEffect(() => {
    if (!map || !userPos || !warehousePos) return;

    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(userPos[0], userPos[1]),
        L.latLng(warehousePos[0], warehousePos[1]),
      ],
      lineOptions: {
        styles: [{ color: "#4caf50", weight: 5 }],
      },
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      show: false,
    }).addTo(map);

    return () => map.removeControl(routingControl);
  }, [map, userPos, warehousePos]);

  return null;
}

// MapComponent
function MapComponent({ location, productName }) {
  const [userLocation, setUserLocation] = useState(null);
  const [showRoute, setShowRoute] = useState(false);

  const warehousePos = [location?.lat || 55.6761, location?.lng || 12.5683];

  const findMyLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation([latitude, longitude]);
        setShowRoute(true);
      },
      () => {
        alert("Unable to retrieve your location. Check permissions.");
      },
    );
  };

  return (
    <div style={{ position: "relative", height: "400px", width: "100%" }}>
      <button onClick={findMyLocation} style={mapButtonStyle}>
        {showRoute ? "Showing Route" : "Route to Warehouse"}
      </button>

      <MapContainer
        center={warehousePos}
        zoom={13}
        style={{ height: "100%", width: "100%", borderRadius: "12px" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <Marker position={warehousePos}>
          <Popup>Warehouse: {productName}</Popup>
        </Marker>

        {userLocation && (
          <Marker position={userLocation}>
            <Popup>You are here</Popup>
          </Marker>
        )}

        {showRoute && userLocation && (
          <RoutingMachine userPos={userLocation} warehousePos={warehousePos} />
        )}
      </MapContainer>
    </div>
  );
}

// Button styles
const mapButtonStyle = {
  position: "absolute",
  top: "10px",
  right: "10px",
  zIndex: 1000,
  backgroundColor: "#4caf50",
  color: "white",
  border: "none",
  padding: "10px 15px",
  borderRadius: "8px",
  fontWeight: "bold",
  cursor: "pointer",
  boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
};

export default MapComponent;
