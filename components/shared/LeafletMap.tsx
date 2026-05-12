"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface LeafletMapProps {
  center: [number, number];
  zoom?: number;
  markers?: Array<{
    position: [number, number];
    label: string;
  }>;
  route?: Array<[number, number]>;
  className?: string;
}

export default function LeafletMap({
  center,
  zoom = 13,
  markers = [],
  route = [],
  className = "h-full w-full rounded-lg",
}: LeafletMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    if (!mapInstance.current) {
      mapInstance.current = L.map(mapRef.current).setView(center, zoom);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapInstance.current);
    } else {
      mapInstance.current.setView(center, zoom);
    }

    // Clear existing markers/routes
    mapInstance.current.eachLayer((layer) => {
      if (layer instanceof L.Marker || layer instanceof L.Polyline) {
        mapInstance.current?.removeLayer(layer);
      }
    });

    // Add markers
    markers.forEach((m) => {
      L.marker(m.position)
        .addTo(mapInstance.current!)
        .bindPopup(m.label);
    });

    // Add route
    if (route.length > 0) {
      L.polyline(route, { color: "#0F8F5F", weight: 4 }).addTo(mapInstance.current);
      mapInstance.current.fitBounds(L.polyline(route).getBounds());
    }

    return () => {
      // Don't destroy map on every re-render to avoid flashing, 
      // but markers/routes are handled above.
    };
  }, [center, zoom, markers, route]);

  return <div ref={mapRef} className={className} style={{ minHeight: "200px" }} />;
}
