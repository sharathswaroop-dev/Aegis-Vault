"use client";

import { Brain, CalendarClock, Filter, Plus } from "lucide-react";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { DemandForecastChart, RegionalDemandChart } from "@/components/analytics/DemandCharts";
import { InventoryTable } from "@/components/inventory/InventoryTable";
import { WarehouseOverview } from "@/components/supply-chain/WarehouseOverview";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { AnomalyAlerts } from "@/components/shared/AnomalyAlerts";
import { InlineAiInsights } from "@/components/forecasting/InlineAiInsights";
import { kpisByRole, notifications, pageAiInsights } from "@/lib/mock-data";
import { usePlatformStore } from "@/lib/store";

export function DashboardShell() {
  const role = usePlatformStore((state) => state.role);
  const kpis = kpisByRole[role];

  return (
    <div className="space-y-6 pb-8">
      <PageHeader
        title="Inventory Intelligence Dashboard"
        subtitle="Monitor inventory, forecast demand, optimize pricing, and reduce spoilage using AI."
        action={
          <div className="flex gap-2">
            <Button variant="outline" className="bg-white">
              <Filter className="size-4" />
              Filters
            </Button>
            <Button className="bg-[#0F8F5F] hover:bg-[#0C7A51]">
              <Plus className="size-4" />
              New Plan
            </Button>
          </div>
        }
      />

      <AnomalyAlerts compact />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi, index) => (
          <KpiCard key={kpi.label} {...kpi} index={index} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <DemandForecastChart />
        <section className="surface-card rounded-lg p-5">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-[#111827]">AI Recommendations</h3>
              <p className="mt-1 text-sm text-[#6B7280]">Role-aware actions for {role.toLowerCase()} operations.</p>
            </div>
            <Brain className="size-5 text-[#0F8F5F]" />
          </div>
          <InlineAiInsights insights={pageAiInsights.dashboard} />
        </section>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <RegionalDemandChart />
        <WarehouseOverview />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
        <InventoryTable />
        <section className="surface-card rounded-lg p-5">
          <div className="mb-5 flex items-center gap-2">
            <CalendarClock className="size-5 text-[#0F8F5F]" />
            <h3 className="text-base font-semibold text-[#111827]">Notification Center</h3>
          </div>
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div key={notification.title} className="rounded-lg border border-[#E5E7EB] p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-[#111827]">{notification.title}</p>
                  <span className="rounded-full bg-[#F1F3EE] px-2 py-0.5 text-xs font-medium text-[#6B7280]">
                    {notification.priority}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-6 text-[#6B7280]">{notification.body}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
