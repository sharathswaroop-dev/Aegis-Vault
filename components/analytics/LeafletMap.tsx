"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import type { LiveOrderRow } from "@/lib/stores/liveDataStore";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default Leaflet marker icons broken by Next.js bundler
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Warehouse hub coordinates (seeded data locations)
const HUB_COORDS: Record<string, [number, number]> = {
  "Bangalore North": [13.0827, 77.5834],
  "Mumbai Cold Hub": [19.0760, 72.8777],
  "Delhi Dry Storage": [28.6139, 77.2090],
  "Hyderabad East": [17.3850, 78.4867],
  "Chennai Freezer 2": [13.0827, 80.2707],
  "Mysore": [12.2958, 76.6394],
};

const greenIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  className: "hue-rotate-[120deg]", // greenish tint
});

const redIcon = new L.Icon({
  ...greenIcon.options,
  className: "hue-rotate-[-30deg] saturate-200",
});

function RecenterMap({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng], map.getZoom());
  }, [lat, lng, map]);
  return null;
}

interface LeafletMapProps {
  centerLat: number;
  centerLng: number;
  lots: LiveOrderRow[];
}

export default function LeafletMap({ centerLat, centerLng, lots }: LeafletMapProps) {
  // Build unique hub pins from lot locations
  const hubEntries = Object.entries(HUB_COORDS);
  const lotsByHub: Record<string, LiveOrderRow[]> = {};
  lots.forEach((lot) => {
    const hub = lot.location || "Unknown";
    if (!lotsByHub[hub]) lotsByHub[hub] = [];
    lotsByHub[hub].push(lot);
  });

  return (
    <MapContainer
      center={[centerLat, centerLng]}
      zoom={5}
      style={{ height: "100%", width: "100%", borderRadius: "8px" }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <RecenterMap lat={centerLat} lng={centerLng} />

      {/* Warehouse hub markers */}
      {hubEntries.map(([name, [lat, lng]]) => {
        const hubLots = lotsByHub[name] || [];
        const hasHighRisk = hubLots.some((l) => l.risk === "High");
        return (
          <Marker key={name} position={[lat, lng]} icon={hasHighRisk ? redIcon : greenIcon}>
            <Popup>
              <div className="text-sm">
                <p className="font-semibold">{name}</p>
                <p className="text-gray-500">{hubLots.length} active lots</p>
                {hasHighRisk && (
                  <p className="text-red-600 font-medium">⚠ High-risk lots present</p>
                )}
                <p className="text-xs text-gray-400 mt-1">{lat.toFixed(4)}, {lng.toFixed(4)}</p>
              </div>
            </Popup>
          </Marker>
        );
      })}

      {/* User location marker */}
      <Marker position={[centerLat, centerLng]}>
        <Popup>
          <p className="text-sm font-semibold">📍 Your Location</p>
          <p className="text-xs text-gray-500">{centerLat.toFixed(4)}, {centerLng.toFixed(4)}</p>
        </Popup>
      </Marker>
    </MapContainer>
  );
}
