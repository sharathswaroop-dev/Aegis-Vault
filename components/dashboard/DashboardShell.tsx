"use client";

import { useState, useMemo } from "react";
import { Brain, CalendarClock, Filter, Plus } from "lucide-react";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { DemandForecastChart, RegionalDemandChart } from "@/components/analytics/DemandCharts";
import { InventoryTable } from "@/components/inventory/InventoryTable";
import { WarehouseOverview } from "@/components/supply-chain/WarehouseOverview";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { AnomalyAlerts } from "@/components/shared/AnomalyAlerts";
import { InlineAiInsights } from "@/components/forecasting/InlineAiInsights";
import { FilterPanel } from "@/components/dashboard/FilterPanel";
import { NewPlanModal } from "@/components/dashboard/NewPlanModal";
import { HarvestReadyDrawer, SpoilageRiskDrawer, PendingPickupsDrawer, PriceForecastDrawer } from "@/components/dashboard/KpiDrawers";
import { useRoleConfig } from "@/lib/config/roleConfig";
import { useRoleStore } from "@/lib/stores/roleStore";
import { cn } from "@/lib/utils";
import { LiveKpiGrid } from "@/components/dashboard/LiveKpiGrid";
import { useDrillDownStore, DrillDownType } from "@/lib/stores/drillDownStore";

export function DashboardShell() {
  const role = useRoleStore((state) => state.currentRole);
  const roleConfig = useRoleConfig();
  const { alerts: liveAlerts, weather, orders } = useLiveDataStore();
  const openDrillDown = useDrillDownStore((s) => s.open);
  
  const insights = useMemo(() => {
    const res = [];
    if (weather && weather.temp > 30) {
      res.push(`Heatwave detected (${weather.temp}°C). Accelerate cold chain movement for perishable dairy lots.`);
    }
    const lowStock = orders.filter(o => parseFloat(o.stock) < 15);
    if (lowStock.length > 0) {
      res.push(`${lowStock[0].item} stock is critically low (${lowStock[0].stock} tons). Reorder recommended.`);
    }
    if (res.length === 0) {
      res.push(...roleConfig.aiInsights.map(i => i.message));
    }
    return res;
  }, [weather, orders, roleConfig]);

  const [filtersOpen, setFiltersOpen] = useState(false);
  const [newPlanOpen, setNewPlanOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState(0);

  const [harvestDrawerOpen, setHarvestDrawerOpen] = useState(false);
  const [spoilageDrawerOpen, setSpoilageDrawerOpen] = useState(false);
  const [pickupsDrawerOpen, setPickupsDrawerOpen] = useState(false);
  const [priceDrawerOpen, setPriceDrawerOpen] = useState(false);

  const handleKpiClick = (label: string, value: string, subtitle: string) => {
    let type: DrillDownType = "metric";
    const lowerLabel = label.toLowerCase();
    
    if (lowerLabel.includes("deliver")) type = "deliveries";
    else if (lowerLabel.includes("otif")) type = "otif";
    else if (lowerLabel.includes("eta")) type = "eta";
    else if (lowerLabel.includes("return")) type = "returns";
    else if (lowerLabel.includes("hub") || lowerLabel.includes("warehouse")) type = "hub";
    else if (lowerLabel.includes("shipment")) type = "shipment";

    openDrillDown(type, { label, value, subtitle, title: label });
  };



  return (
    <div className="space-y-6 pb-8">
      <PageHeader
        title={roleConfig.dashboardTitle}
        subtitle={roleConfig.dashboardSubtitle}
        action={
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="bg-white"
              onClick={() => setFiltersOpen(true)}
            >
              <Filter className="size-4" />
              Filters
              {activeFilters > 0 && (
                <span className="ml-1 rounded-full bg-[#0F8F5F] px-1.5 py-0.5 text-xs text-white">
                  {activeFilters}
                </span>
              )}
            </Button>
            <Button 
              className="bg-[#0F8F5F] hover:bg-[#0C7A51]"
              onClick={() => setNewPlanOpen(true)}
            >
              <Plus className="size-4" />
              New Plan
            </Button>
          </div>
        }
      />

      <AnomalyAlerts 
        alerts={roleConfig.anomalyAlerts.map(a => ({
          id: a.id,
          type: a.title.toLowerCase().includes("demand") ? "demand_spike" : 
                a.title.toLowerCase().includes("cold") ? "cold_chain_break" :
                a.title.toLowerCase().includes("stock") ? "overstock" : "supplier_delay",
          title: a.title,
          description: a.description,
          affected: "System recommended action",
          timestamp: a.timestamp
        }))} 
        compact 
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {roleConfig.kpis.map((kpi, index) => (
          <KpiCard
            key={kpi.label}
            label={kpi.label}
            value={kpi.value}
            change={kpi.subtitle}
            tone={index === 2 ? "warn" : index === 3 ? "neutral" : "good"}
            index={index}
            onClick={() => handleKpiClick(kpi.label, kpi.value, kpi.subtitle)}
          />
        ))}
      </div>


      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <DemandForecastChart 
          data={roleConfig.forecastChartData}
          title={roleConfig.forecastChartTitle}
          subtitle={roleConfig.forecastChartSubtitle}
        />
        <section className="surface-card rounded-lg p-5">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-[#111827]">AI Recommendations</h3>
              <p className="mt-1 text-sm text-[#6B7280]">Role-aware actions for {role} operations.</p>
            </div>
            <Brain className="size-5 text-[#0F8F5F]" />
          </div>
          <div className="space-y-4">
            {roleConfig.aiRecommendations.map(rec => (
              <div key={rec.id} className="rounded-lg border border-[#E5E7EB] bg-white p-4">
                <p className="text-sm font-semibold text-[#111827]">{rec.title}</p>
                <p className="mt-1 text-xs text-[#6B7280]">{rec.description}</p>
                <Button size="sm" className="mt-3 w-full bg-[#F7F8F4] text-[#111827] hover:bg-[#F1F3EE]">
                  {rec.action}
                </Button>
              </div>
            ))}
          </div>
          <div className="mt-6 border-t border-[#E5E7EB] pt-6">
            <InlineAiInsights insights={insights} resetKey={role} />
          </div>
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
            {(liveAlerts.length > 0 ? liveAlerts : roleConfig.notifications).map((notification: any, i) => (
              <div key={i} className="rounded-lg border border-[#E5E7EB] p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-[#111827]">{notification.title}</p>
                  <span className="rounded-full bg-[#F1F3EE] px-2 py-0.5 text-xs font-medium text-[#6B7280]">
                    {notification.timestamp || notification.time}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-6 text-[#6B7280]">{notification.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <FilterPanel
        isOpen={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        onApply={(filters) => {
          const count = Object.values(filters).filter(v => v !== "All").length;
          setActiveFilters(count);
        }}
        activeFiltersCount={activeFilters}
      />

      <NewPlanModal 
        open={newPlanOpen} 
        onClose={() => setNewPlanOpen(false)} 
      />

      {role === "farmer" && (
        <>
          <HarvestReadyDrawer 
            open={harvestDrawerOpen} 
            onClose={() => setHarvestDrawerOpen(false)} 
          />
          <SpoilageRiskDrawer 
            open={spoilageDrawerOpen} 
            onClose={() => setSpoilageDrawerOpen(false)} 
          />
          <PendingPickupsDrawer 
            open={pickupsDrawerOpen} 
            onClose={() => setPickupsDrawerOpen(false)} 
          />
          <PriceForecastDrawer 
            open={priceDrawerOpen} 
            onClose={() => setPriceDrawerOpen(false)} 
          />
        </>
      )}
    </div>
  );
}