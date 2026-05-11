"use client";

import { useState } from "react";
import { Activity, AlertTriangle, PackageOpen, ThermometerSnowflake, Truck, X } from "lucide-react";
import { anomalyAlerts } from "@/lib/mock-data";
import type { AnomalyAlert, AnomalyType } from "@/lib/types";
import { EmptyState } from "@/components/shared/EmptyState";
import { cn } from "@/lib/utils";

const alertIcon: Record<AnomalyType, typeof Activity> = {
  demand_spike: Activity,
  cold_chain_break: ThermometerSnowflake,
  supplier_delay: Truck,
  overstock: PackageOpen,
};

interface AnomalyAlertsProps {
  alerts?: AnomalyAlert[];
  compact?: boolean;
}

export function AnomalyAlerts({ alerts = anomalyAlerts, compact = false }: AnomalyAlertsProps) {
  const [dismissedIds, setDismissedIds] = useState<string[]>([]);
  const visibleAlerts = alerts.filter((alert) => !dismissedIds.includes(alert.id));

  if (visibleAlerts.length === 0) {
    return compact ? null : (
      <EmptyState
        heading="No active anomaly alerts"
        subtext="Demand, cold chain, supplier, and overstock alerts will appear here."
      />
    );
  }

  return (
    <div className={cn("space-y-3", compact && "space-y-0")}>
      <div className={compact ? "flex gap-3 overflow-x-auto" : "grid gap-3"}>
        {visibleAlerts.map((alert) => {
          const Icon = alertIcon[alert.type] ?? AlertTriangle;

          return (
            <div
              key={alert.id}
              className={cn(
                "flex min-w-0 items-start gap-3 rounded-lg border border-[#E5E7EB] bg-white p-4",
                compact && "min-w-[360px]",
              )}
            >
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#E8F5EE] text-[#0F8F5F]">
                <Icon className="size-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-semibold text-[#111827]">{alert.title}</p>
                  <span className="rounded-full bg-[#F1F3EE] px-2 py-0.5 text-xs font-medium text-[#6B7280]">
                    {alert.timestamp}
                  </span>
                </div>
                <p className="mt-1 text-sm leading-6 text-[#6B7280]">{alert.description}</p>
                <p className="mt-1 text-xs font-semibold text-[#111827]">{alert.affected}</p>
              </div>
              <button
                className="rounded-md p-1 text-[#6B7280] transition hover:bg-[#F1F3EE] hover:text-[#111827]"
                onClick={() => setDismissedIds((current) => [...current, alert.id])}
                aria-label={`Dismiss ${alert.title}`}
              >
                <X className="size-4" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
