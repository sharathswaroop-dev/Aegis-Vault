"use client";

import dynamic from "next/dynamic";
import { Map } from "lucide-react";
import { useLiveDataStore } from "@/lib/stores/liveDataStore";

// Leaflet must be loaded client-side only (no SSR)
const LeafletMap = dynamic(() => import("./LeafletMap"), { ssr: false });

export function IndiaDemandMap() {
  const { location, orders } = useLiveDataStore();

  const centerLat = location?.latitude ?? 20.5937;
  const centerLng = location?.longitude ?? 78.9629;

  return (
    <section className="surface-card rounded-lg p-5">
      <div className="mb-5 flex items-center gap-2">
        <Map className="size-5 text-[#0F8F5F]" />
        <div>
          <h3 className="text-base font-semibold text-[#111827]">Live Supply Chain Map</h3>
          <p className="mt-1 text-sm text-[#6B7280]">
            {location
              ? `Centered on ${location.city}, ${location.country} · ${orders.length} active lots`
              : "Detecting your location…"}
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg" style={{ height: 360 }}>
        <LeafletMap
          centerLat={centerLat}
          centerLng={centerLng}
          lots={orders}
        />
      </div>

      {location && (
        <div className="mt-3 flex flex-wrap gap-4 text-xs text-[#6B7280]">
          <span>📍 {location.city}, {location.region}, {location.country}</span>
          <span>🌐 {location.ip}</span>
          <span>🏢 {location.isp}</span>
        </div>
      )}
    </section>
  );
}
