"use client";

import { useLiveDataStore } from "@/lib/stores/liveDataStore";
import { type Role } from "@/lib/stores/roleStore";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { ROLE_CONFIG } from "@/lib/config/roleConfig";

interface LiveKpiGridProps {
  role: Role;
  onKpiClick?: (index: number) => void;
}

export function LiveKpiGrid({ role, onKpiClick }: LiveKpiGridProps) {
  const { orders, prices, loading } = useLiveDataStore();
  const baseKpis = ROLE_CONFIG[role].kpis;

  // Derive live values based on role
  const getLiveValue = (label: string, fallback: string) => {
    if (loading && orders.length === 0) return "...";

    switch (label) {
      // Farmer KPIs
      case "Harvest Ready": {
        const total = orders
          .filter((o) => o.status === "harvested")
          .reduce((acc, o) => acc + parseFloat(o.stock), 0);
        return total > 0 ? `${total.toFixed(1)} tons` : "0 tons";
      }
      case "Spoilage Risk": {
        const atRisk = orders.filter((o) => o.risk === "High").length;
        const pct = orders.length > 0 ? (atRisk / orders.length) * 100 : 0;
        return `${pct.toFixed(1)}%`;
      }
      case "Pending Pickups": {
        const pending = orders.filter((o) => o.status === "harvested").length;
        return `${pending} batches`;
      }

      // Warehouse / Admin KPIs
      case "Total Inventory": {
        const total = orders.reduce((acc, o) => acc + parseFloat(o.stock), 0);
        return `${total.toLocaleString()} tons`;
      }
      case "Active Hubs": {
        const hubs = new Set(orders.map((o) => o.location));
        return hubs.size.toString();
      }
      case "Utilization": {
        const avg = orders.length > 0 ? 72 + (orders.length % 15) : 0; // Deterministic mock based on real count
        return `${avg}%`;
      }
      case "Platform Spoilage Cost": {
        const atRisk = orders.filter((o) => o.risk === "High").length;
        const cost = atRisk * 12500; // Estimated cost per high-risk lot
        return `₹${cost.toLocaleString()}`;
      }

      // Price Forecast (shared)
      case "Price Forecast":
      case "Price Trend": {
        if (prices.length > 0) {
          const latest = prices[0].modalPrice;
          const prev = prices[1]?.modalPrice || latest;
          const diff = ((latest - prev) / (prev || 1)) * 100;
          return `${diff >= 0 ? "↑" : "↓"} ${Math.abs(diff).toFixed(1)}%`;
        }
        return fallback;
      }

      default:
        return fallback;
    }
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {baseKpis.map((kpi, index) => (
        <KpiCard
          key={kpi.label}
          label={kpi.label}
          value={getLiveValue(kpi.label, kpi.value)}
          change={kpi.subtitle}
          tone={index === 2 ? "warn" : index === 3 ? "neutral" : "good"}
          index={index}
          onClick={() => onKpiClick?.(index)}
        />
      ))}
    </div>
  );
}
