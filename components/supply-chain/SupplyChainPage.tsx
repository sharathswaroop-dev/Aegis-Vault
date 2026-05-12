"use client";

import { ReactNode } from "react";
import { WarehouseOverview } from "@/components/supply-chain/WarehouseOverview";
import { InlineAiInsights } from "@/components/forecasting/InlineAiInsights";
import { PageHeader } from "@/components/shared/PageHeader";
import { MetricGrid } from "@/components/shared/MetricGrid";
import { useRoleConfig } from "@/lib/config/roleConfig";
import { useRoleStore } from "@/lib/stores/roleStore";

interface WarehouseSummary {
  name: string;
  capacity: number;
  spoilage: number;
  orders: number;
}

interface SupplyChainPageProps {
  title: string;
  subtitle: string;
  metrics: { label: string; value: string; detail: string; icon?: ReactNode }[];
  panelTitle: string;
  rows: { name: string; detail: string; metric: string; status: string }[];
  warehouses?: WarehouseSummary[];
  hideControlQueue?: boolean;
}

export function SupplyChainPage({ title, subtitle, metrics, panelTitle, rows, warehouses, hideControlQueue = false }: SupplyChainPageProps) {
  const role = useRoleStore((state) => state.currentRole);
  const roleConfig = useRoleConfig();

  return (
    <div className="space-y-6 pb-8">
      <PageHeader title={title} subtitle={subtitle} />
      <InlineAiInsights insights={roleConfig.aiInsights.map((insight) => insight.message)} resetKey={role} />
      <MetricGrid items={metrics} />
      <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        <WarehouseOverview warehouses={warehouses} />
        {hideControlQueue ? null : (
          <section className="surface-card rounded-lg p-5">
          <h3 className="text-base font-semibold text-[#111827]">{panelTitle}</h3>
          <div className="mt-4 divide-y divide-[#E5E7EB]">
            {rows.map((row) => (
              <div key={row.name} className="grid gap-3 py-4 sm:grid-cols-[1fr_auto_auto] sm:items-center">
                <div>
                  <p className="text-sm font-semibold text-[#111827]">{row.name}</p>
                  <p className="mt-1 text-sm text-[#6B7280]">{row.detail}</p>
                </div>
                <p className="text-sm font-semibold text-[#111827]">{row.metric}</p>
                <span className="w-fit rounded-full bg-[#E8F5EE] px-2.5 py-1 text-xs font-semibold text-[#0C7A51]">
                  {row.status}
                </span>
              </div>
            ))}
          </div>
        </section>
        )}
      </div>
    </div>
  );
}
