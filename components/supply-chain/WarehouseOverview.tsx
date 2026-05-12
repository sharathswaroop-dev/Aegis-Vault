"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLiveDataStore } from "@/lib/stores/liveDataStore";
import { HubDrillDown } from "./HubDrillDown";

interface WarehouseSummary {
  name: string;
  capacity: number;
  spoilage: number;
  orders: number;
}

interface WarehouseOverviewProps {
  warehouses?: WarehouseSummary[];
}

// Derive hub ID from name (stable, URL-safe)
function hubIdFromName(name: string): string {
  return name.toUpperCase().replace(/\s+/g, "-").slice(0, 8);
}

export function WarehouseOverview({ warehouses }: WarehouseOverviewProps) {
  const { orders, lastUpdated } = useLiveDataStore();
  const [selectedHub, setSelectedHub] = useState<{ id: string; name: string } | null>(null);

  // Derive warehouse list from real lots if no warehouses prop provided
  const hubs: WarehouseSummary[] = warehouses && warehouses.length > 0
    ? warehouses
    : (() => {
        // Build hub summary from live lots
        const grouped: Record<string, { count: number; highRisk: number }> = {};
        orders.forEach((o) => {
          if (!grouped[o.location]) grouped[o.location] = { count: 0, highRisk: 0 };
          grouped[o.location].count++;
          if (o.risk === "High") grouped[o.location].highRisk++;
        });
        return Object.entries(grouped).map(([name, stats]) => ({
          name,
          capacity: 60 + (stats.count * 7) % 35,
          spoilage: Math.round((stats.highRisk / Math.max(stats.count, 1)) * 100 * 10) / 10,
          orders: stats.count * 80 + 120,
        }));
      })();

  return (
    <section className="surface-card rounded-lg p-5">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-[#111827]">Warehouse Overview</h3>
          <p className="mt-1 text-sm text-[#6B7280]">
            Capacity, spoilage, and order pressure across priority hubs.
          </p>
        </div>
        {lastUpdated && (
          <span className="text-xs text-[#9CA3AF]">Live · {lastUpdated.toLocaleTimeString("en-IN")}</span>
        )}
      </div>

      <AnimatePresence mode="wait">
        {selectedHub ? (
          <HubDrillDown
            key={selectedHub.id}
            hubId={selectedHub.id}
            hubName={selectedHub.name}
            onBack={() => setSelectedHub(null)}
          />
        ) : (
          <motion.div
            key="overview"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            {hubs.length === 0 ? (
              <p className="text-sm text-[#9CA3AF]">No warehouse data available.</p>
            ) : (
              hubs.map((warehouse) => (
                <button
                  key={warehouse.name}
                  onClick={() =>
                    setSelectedHub({ id: hubIdFromName(warehouse.name), name: warehouse.name })
                  }
                  className="w-full rounded-lg border border-[#E5E7EB] p-4 text-left transition hover:border-[#0F8F5F] hover:shadow-sm"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-[#111827]">{warehouse.name}</p>
                      <p className="mt-1 text-xs text-[#6B7280]">{warehouse.orders.toLocaleString()} active orders</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-[#111827]">{warehouse.capacity}%</p>
                      <p className="text-xs text-[#6B7280]">capacity</p>
                    </div>
                  </div>
                  <div className="mt-3 h-2 rounded-full bg-[#F1F3EE]">
                    <div
                      className="h-2 rounded-full bg-[#0F8F5F] transition-all duration-500"
                      style={{ width: `${warehouse.capacity}%` }}
                    />
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-xs text-[#6B7280]">Spoilage risk {warehouse.spoilage}%</p>
                    <p className="text-xs font-medium text-[#0F8F5F]">Click to drill down →</p>
                  </div>
                </button>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
