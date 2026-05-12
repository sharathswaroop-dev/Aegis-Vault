"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Activity, AlertTriangle, PackageOpen, ThermometerSnowflake, Truck, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLiveDataStore } from "@/lib/stores/liveDataStore";
import type { AnomalyAlert, AnomalyType } from "@/lib/types";
import { EmptyState } from "@/components/shared/EmptyState";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const alertIcon: Record<AnomalyType, typeof Activity> = {
  demand_spike: Activity,
  cold_chain_break: ThermometerSnowflake,
  supplier_delay: Truck,
  overstock: PackageOpen,
};

const alertDetailLink: Record<AnomalyType, string> = {
  demand_spike: "/forecasting",
  cold_chain_break: "/warehouses",
  supplier_delay: "/suppliers",
  overstock: "/inventory",
};

interface AnomalyAlertsProps {
  alerts?: AnomalyAlert[];
  compact?: boolean;
}

export function AnomalyAlerts({ alerts: propAlerts, compact = false }: AnomalyAlertsProps) {
  const router = useRouter();
  const { alerts: liveAlerts } = useLiveDataStore();

  // Map live backend alerts to AnomalyAlert shape, or use prop if provided
  const rawAlerts: AnomalyAlert[] = propAlerts ?? liveAlerts.map((a) => ({
    id: String(a.id),
    type: (["demand_spike", "cold_chain_break", "supplier_delay", "overstock"].includes(a.type)
      ? a.type
      : "demand_spike") as AnomalyType,
    title: a.title,
    description: a.description,
    affected: a.affected,
    timestamp: a.timestamp,
  }));

  const [dismissedIds, setDismissedIds] = useState<string[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [acknowledgedIds, setAcknowledgedIds] = useState<string[]>([]);

  const visibleAlerts = rawAlerts.filter((alert) => !dismissedIds.includes(alert.id));

  if (visibleAlerts.length === 0) {
    return compact ? null : (
      <EmptyState
        heading="No active anomaly alerts"
        subtext="Demand, cold chain, supplier, and overstock alerts will appear here."
      />
    );
  }

  const handleAcknowledge = (id: string) => {
    setAcknowledgedIds((prev) => [...prev, id]);
  };

  const handleViewDetails = (type: AnomalyType) => {
    router.push(alertDetailLink[type]);
  };

  return (
    <div className={cn("space-y-3", compact && "space-y-0")}>
      <div className={compact ? "flex gap-3 overflow-x-auto" : "grid gap-3"}>
        {visibleAlerts.map((alert) => {
          const Icon = alertIcon[alert.type] ?? AlertTriangle;
          const isExpanded = expandedId === alert.id;
          const isAcknowledged = acknowledgedIds.includes(alert.id);
          const details = null; // Details come from the alert description itself

          return (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ 
                opacity: isAcknowledged ? 0.6 : 1,
                height: "auto"
              }}
              className={cn(
                "flex min-w-0 items-start gap-3 rounded-lg border bg-white p-4 transition",
                isAcknowledged ? "border-[#E5E7EB] opacity-60" : "border-[#E5E7EB]",
                compact && "min-w-[360px]",
                isExpanded && "flex-col"
              )}
              onClick={() => !isAcknowledged && setExpandedId(isExpanded ? null : alert.id)}
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

                <AnimatePresence>
                  {isExpanded && details && !isAcknowledged && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 space-y-3 border-t border-[#E5E7EB] pt-4"
                    >
                      <p className="text-sm text-[#6B7280]">{details.fullDescription}</p>
                      
                      <div>
                        <p className="text-xs font-semibold text-[#111827] mb-1">Affected items:</p>
                        <ul className="list-disc list-inside text-xs text-[#6B7280]">
                          {details.affectedItems.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <p className="text-xs font-semibold text-[#111827] mb-1">Recommended actions:</p>
                        <ul className="list-disc list-inside text-xs text-[#6B7280]">
                          {details.recommendedActions.map((action, idx) => (
                            <li key={idx}>{action}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAcknowledge(alert.id);
                          }}
                        >
                          Acknowledge
                        </Button>
                        <Button
                          size="sm"
                          className="bg-[#0F8F5F] hover:bg-[#0C7A51]"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewDetails(alert.type);
                          }}
                        >
                          View Details
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {!isExpanded && !isAcknowledged && (
                  <button
                    className="mt-2 flex items-center gap-1 text-xs text-[#0F8F5F]"
                    onClick={(e) => {
                      e.stopPropagation();
                      setExpandedId(isExpanded ? null : alert.id);
                    }}
                  >
                    <ChevronDown className={cn("size-3 transition", isExpanded && "rotate-180")} />
                    {isExpanded ? "Show less" : "Show more"}
                  </button>
                )}
              </div>

              <button
                className="rounded-md p-1 text-[#6B7280] transition hover:bg-[#F1F3EE] hover:text-[#111827]"
                onClick={() => setDismissedIds((current) => [...current, alert.id])}
                aria-label={`Dismiss ${alert.title}`}
              >
                <X className="size-4" />
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}