"use client";

import { useState, createElement } from "react";
import { Boxes, Clock, Thermometer, TriangleAlert, TrendingUp, TrendingDown, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { InventoryTable } from "@/components/inventory/InventoryTable";
import { AgingRulesPanel } from "@/components/inventory/AgingRulesPanel";
import { MarkdownRules } from "@/components/inventory/MarkdownRules";
import { PerishabilityEngine } from "@/components/inventory/PerishabilityEngine";
import { ReorderQueue } from "@/components/inventory/ReorderQueue";
import { InlineAiInsights } from "@/components/forecasting/InlineAiInsights";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { useRoleConfig } from "@/lib/config/roleConfig";
import { useRoleStore } from "@/lib/stores/roleStore";
import { useToast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";
import { DemandPatternBadge } from "@/components/inventory/DemandPatternBadge";
import { DemandPattern } from "@/lib/types";

interface MetricCardProps {
  label: string;
  value: string;
  detail: string;
  icon: React.ReactNode;
  onClick?: () => void;
  isActive?: boolean;
}

function MetricCard({ label, value, detail, icon, onClick, isActive }: MetricCardProps) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "surface-card rounded-lg p-4 cursor-pointer transition-all",
        isActive && "ring-2 ring-[#0F8F5F]"
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex size-10 items-center justify-center rounded-lg bg-[#F7F8F4] text-[#0F8F5F]">
          {icon}
        </div>
        <TrendingUp className="size-4 text-[#0F8F5F]" />
      </div>
      <div className="mt-4 text-2xl font-semibold text-[#111827]">{value}</div>
      <div className="mt-1 text-sm text-[#6B7280]">{label}</div>
      <div className="mt-1 text-xs text-[#9CA3AF]">{detail}</div>
    </motion.div>
  );
}

interface InventoryLot {
  id: string;
  product: string;
  category: string;
  quantity: number;
  unit: string;
  ageDays: number;
  maxAgeDays: number;
  warehouse: string;
  distributor: string;
  distributorContact: string;
  distributorLoad: number;
  etaToRetailer: string;
}

interface WarehouseColdChain {
  id: string;
  name: string;
  location: string;
  temperature: number;
  humidity: number;
  lastCheck: string;
  healthScore: number;
}

interface AtRiskLot {
  id: string;
  product: string;
  category: string;
  quantity: number;
  unit: string;
  daysRemaining: number;
  riskReason: string;
  warehouse: string;
  recommendedAction: string;
}

// Mock data
const categoryBreakdown = [
  { category: "Vegetables", count: 4280, trend: "up", lastUpdated: "12 May 2026, 10:30" },
  { category: "Fruits", count: 3150, trend: "up", lastUpdated: "12 May 2026, 10:28" },
  { category: "Dairy", count: 2140, trend: "down", lastUpdated: "12 May 2026, 10:25" },
  { category: "Grains", count: 1820, trend: "stable", lastUpdated: "12 May 2026, 10:20" },
  { category: "Frozen", count: 890, trend: "up", lastUpdated: "12 May 2026, 10:15" },
  { category: "Beverages", count: 420, trend: "down", lastUpdated: "12 May 2026, 10:10" },
  { category: "Packaged Foods", count: 140, trend: "stable", lastUpdated: "12 May 2026, 10:05" },
];

const freshnessLots: InventoryLot[] = [
  { id: "LOT-001", product: "Tomatoes", category: "Vegetables", quantity: 3.2, unit: "tons", ageDays: 2, maxAgeDays: 6, warehouse: "Bangalore North WH", distributor: "FreshRoute Logistics", distributorContact: "+91 98765 43210", distributorLoad: 72, etaToRetailer: "2 hours" },
  { id: "LOT-002", product: "Mangoes", category: "Fruits", quantity: 2.8, unit: "tons", ageDays: 4, maxAgeDays: 7, warehouse: "Mysore Central WH", distributor: "SouthConnect Distributors", distributorContact: "+91 98765 43211", distributorLoad: 85, etaToRetailer: "4 hours" },
  { id: "LOT-003", product: "Whole Milk", category: "Dairy", quantity: 500, unit: "liters", ageDays: 1, maxAgeDays: 5, warehouse: "Bangalore North WH", distributor: "SwiftCold Transport", distributorContact: "+91 98765 43212", distributorLoad: 45, etaToRetailer: "1 hour" },
  { id: "LOT-004", product: "Onions", category: "Vegetables", quantity: 5.0, unit: "tons", ageDays: 3, maxAgeDays: 14, warehouse: "Hubli Depot", distributor: "FreshRoute Logistics", distributorContact: "+91 98765 43210", distributorLoad: 68, etaToRetailer: "6 hours" },
  { id: "LOT-005", product: "Bananas", category: "Fruits", quantity: 1.5, unit: "tons", ageDays: 3, maxAgeDays: 7, warehouse: "Mangalore Hub", distributor: "SouthConnect Distributors", distributorContact: "+91 98765 43211", distributorLoad: 90, etaToRetailer: "3 hours" },
  { id: "LOT-006", product: "Potatoes", category: "Vegetables", quantity: 4.2, unit: "tons", ageDays: 5, maxAgeDays: 21, warehouse: "Bangalore North WH", distributor: "FreshRoute Logistics", distributorContact: "+91 98765 43210", distributorLoad: 52, etaToRetailer: "2 hours" },
  { id: "LOT-007", product: "Coriander", category: "Vegetables", quantity: 0.3, unit: "tons", ageDays: 2, maxAgeDays: 4, warehouse: "Mysore Central WH", distributor: "SouthConnect Distributors", distributorContact: "+91 98765 43211", distributorLoad: 78, etaToRetailer: "5 hours" },
  { id: "LOT-008", product: "Capsicum", category: "Vegetables", quantity: 0.8, unit: "tons", ageDays: 4, maxAgeDays: 7, warehouse: "Bangalore North WH", distributor: "SwiftCold Transport", distributorContact: "+91 98765 43212", distributorLoad: 65, etaToRetailer: "1.5 hours" },
];

const warehouseColdChains: WarehouseColdChain[] = [
  { id: "WH-001", name: "Bangalore North WH", location: "Yelahanka, Bangalore", temperature: 4.2, humidity: 65, lastCheck: "12 May 2026, 10:30", healthScore: 98 },
  { id: "WH-002", name: "Mysore Central WH", location: "Mysore City", temperature: 5.1, humidity: 62, lastCheck: "12 May 2026, 10:25", healthScore: 96 },
  { id: "WH-003", name: "Hubli Depot", location: "Hubli, Dharwad", temperature: 6.8, humidity: 58, lastCheck: "12 May 2026, 10:20", healthScore: 94 },
  { id: "WH-004", name: "Mangalore Hub", location: "Mangalore", temperature: 4.5, humidity: 70, lastCheck: "12 May 2026, 10:15", healthScore: 97 },
];

const atRiskLots: AtRiskLot[] = [
  { id: "LOT-002", product: "Mangoes", category: "Fruits", quantity: 2.8, unit: "tons", daysRemaining: 2, riskReason: "Approaching expiry window", warehouse: "Mysore Central WH", recommendedAction: "Urgent pickup" },
  { id: "LOT-005", product: "Bananas", category: "Fruits", quantity: 1.5, unit: "tons", daysRemaining: 3, riskReason: "Rapid ripening detected", warehouse: "Mangalore Hub", recommendedAction: "Markdown 15%" },
  { id: "LOT-008", product: "Capsicum", category: "Vegetables", quantity: 0.8, unit: "tons", daysRemaining: 2, riskReason: "Temperature fluctuation", warehouse: "Bangalore North WH", recommendedAction: "Urgent pickup" },
  { id: "LOT-010", product: "Grapes", category: "Fruits", quantity: 0.5, unit: "tons", daysRemaining: 1, riskReason: "High spoilage probability", warehouse: "Bangalore North WH", recommendedAction: "Discard" },
  { id: "LOT-012", product: "Green Peas", category: "Vegetables", quantity: 0.4, unit: "tons", daysRemaining: 2, riskReason: "Quality degradation", warehouse: "Hubli Depot", recommendedAction: "Markdown 20%" },
  { id: "LOT-015", product: "Paneer", category: "Dairy", quantity: 0.2, unit: "tons", daysRemaining: 1, riskReason: "Near expiration", warehouse: "Mysore Central WH", recommendedAction: "Urgent pickup" },
];

const categories = ["Vegetables", "Fruits", "Dairy", "Grains", "Frozen", "Beverages", "Packaged Foods"];

export default function InventoryPage() {
  const role = useRoleStore((state) => state.currentRole);
  const roleConfig = useRoleConfig();
  const { addToast } = useToast();

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPattern, setSelectedPattern] = useState<DemandPattern | null>(null);
  const [activeDrawer, setActiveDrawer] = useState<string | null>(null);
  const [actionedLots, setActionedLots] = useState<string[]>([]);

  const insights = roleConfig.aiInsights.map((insight) => insight.message);

  const handleActionLot = (lotId: string, action: string) => {
    setActionedLots([...actionedLots, lotId]);
    addToast({ title: `Action applied to ${lotId}`, description: action, variant: "success" });
  };

  const getFreshnessColor = (ageDays: number, maxAgeDays: number) => {
    const percentage = ((maxAgeDays - ageDays) / maxAgeDays) * 100;
    if (percentage > 60) return "text-[#0F8F5F]";
    if (percentage > 30) return "text-amber-600";
    return "text-red-600";
  };

  const getUtilizationColor = (load: number) => {
    if (load < 70) return "bg-[#0F8F5F]";
    if (load < 85) return "bg-amber-500";
    return "bg-red-500";
  };

  return (
    <div className="space-y-6 pb-8">
      <PageHeader
        title={roleConfig.inventoryTitle}
        subtitle={roleConfig.inventorySubtitle}
      />
      <InlineAiInsights insights={insights} resetKey={role} />

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {roleConfig.inventoryKpis.map((kpi, idx) => (
          <MetricCard
            key={kpi.label}
            label={kpi.label}
            value={kpi.value}
            detail={kpi.subtitle}
            icon={createElement(kpi.icon, { className: "size-5" })}
            onClick={() => {
              if (idx === 0) setActiveDrawer("items");
              if (idx === 1 && role === "farmer") setActiveDrawer("freshness");
              if (idx === 2) setActiveDrawer("coldchain");
              if (idx === 3) setActiveDrawer("atrisk");
            }}
            isActive={
              (idx === 0 && activeDrawer === "items") ||
              (idx === 1 && activeDrawer === "freshness") ||
              (idx === 2 && activeDrawer === "coldchain") ||
              (idx === 3 && activeDrawer === "atrisk")
            }
          />
        ))}
      </div>

      {/* Demand Pattern Breakdown */}

      {/* Demand Pattern Breakdown */}
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2 rounded-full bg-green-50 px-3 py-1.5 border border-green-200">
          <span className="size-2 rounded-full bg-green-500" />
          <span className="text-sm font-medium text-green-700">3 Stable</span>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1.5 border border-amber-200">
          <span className="size-2 rounded-full bg-amber-500" />
          <span className="text-sm font-medium text-amber-700">2 Seasonal</span>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-orange-50 px-3 py-1.5 border border-orange-200">
          <span className="size-2 rounded-full bg-orange-500" />
          <span className="text-sm font-medium text-orange-700">1 Intermittent</span>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-red-50 px-3 py-1.5 border border-red-200">
          <span className="size-2 rounded-full bg-red-500" />
          <span className="text-sm font-medium text-red-700">1 Long Tail</span>
        </div>
      </div>

      {/* Category & Pattern Filters */}
      <section className="surface-card rounded-lg p-5">
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-[#6B7280] uppercase tracking-wider">Category Coverage</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                  className={cn(
                    "rounded-full px-3 py-1.5 text-sm font-medium transition",
                    selectedCategory === category
                      ? "bg-[#0F8F5F] text-white"
                      : "border border-[#E5E7EB] bg-white text-[#111827] hover:bg-[#F7F8F4]"
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[#6B7280] uppercase tracking-wider">Demand Pattern</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {["stable", "seasonal", "intermittent", "long-tail"].map((pattern) => (
                <button
                  key={pattern}
                  onClick={() => setSelectedPattern(selectedPattern === pattern ? null : (pattern as DemandPattern))}
                  className={cn(
                    "rounded-full px-1 py-1 transition",
                    selectedPattern === pattern ? "ring-2 ring-[#0F8F5F] ring-offset-2" : ""
                  )}
                >
                  <DemandPatternBadge pattern={pattern as DemandPattern} className="cursor-pointer" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {(selectedCategory || selectedPattern) && (
          <div className="mt-4 flex items-center justify-between border-t border-[#E5E7EB] pt-4">
            <p className="text-sm text-[#6B7280]">
              Filtering by: {[selectedCategory, selectedPattern].filter(Boolean).join(", ")}
            </p>
            <button
              onClick={() => {
                setSelectedCategory(null);
                setSelectedPattern(null);
              }}
              className="text-sm font-medium text-[#0F8F5F] hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </section>

      <AgingRulesPanel />
      <InventoryTable />
      <div className="grid gap-6 xl:grid-cols-2">
        <PerishabilityEngine />
        <MarkdownRules />
      </div>
      <ReorderQueue />

      {/* Drawers */}
      <AnimatePresence>
        {activeDrawer === "items" && (
          <Sheet open onOpenChange={() => setActiveDrawer(null)}>
            <SheetContent className="w-full sm:max-w-2xl">
              <SheetHeader>
                <SheetTitle>Items Monitored — 12,840</SheetTitle>
                <SheetDescription>Breakdown by category with trends</SheetDescription>
              </SheetHeader>
              <div className="mt-4 space-y-3">
                {categoryBreakdown.map((item) => (
                  <div key={item.category} className="flex items-center justify-between rounded-lg border border-[#E5E7EB] p-4">
                    <div>
                      <p className="font-medium text-[#111827]">{item.category}</p>
                      <p className="text-xs text-[#6B7280]">Last updated: {item.lastUpdated}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-[#111827]">{item.count.toLocaleString()}</p>
                      <div className="flex items-center gap-1">
                        {item.trend === "up" && <TrendingUp className="size-3 text-[#0F8F5F]" />}
                        {item.trend === "down" && <TrendingDown className="size-3 text-red-500" />}
                        <span className={cn("text-xs", item.trend === "up" ? "text-[#0F8F5F]" : item.trend === "down" ? "text-red-500" : "text-[#6B7280]")}>
                          {item.trend}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        )}

        {activeDrawer === "freshness" && (
          <Sheet open onOpenChange={() => setActiveDrawer(null)}>
            <SheetContent className="w-full sm:max-w-3xl">
              <SheetHeader>
                <SheetTitle>Freshness Breakdown by Lot</SheetTitle>
                <SheetDescription>Age analysis per inventory lot</SheetDescription>
              </SheetHeader>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#E5E7EB]">
                      <th className="text-left py-2 font-medium text-[#6B7280]">Lot ID</th>
                      <th className="text-left py-2 font-medium text-[#6B7280]">Product</th>
                      <th className="text-left py-2 font-medium text-[#6B7280]">Qty</th>
                      <th className="text-left py-2 font-medium text-[#6B7280]">Age</th>
                      <th className="text-left py-2 font-medium text-[#6B7280]">Max Age</th>
                      <th className="text-left py-2 font-medium text-[#6B7280]">Freshness</th>
                      <th className="text-left py-2 font-medium text-[#6B7280]">Warehouse</th>
                      <th className="text-left py-2 font-medium text-[#6B7280]">Distributor</th>
                      <th className="text-left py-2 font-medium text-[#6B7280]">ETA</th>
                    </tr>
                  </thead>
                  <tbody>
                    {freshnessLots.map((lot) => {
                      const freshnessPercent = Math.round(((lot.maxAgeDays - lot.ageDays) / lot.maxAgeDays) * 100);
                      return (
                        <tr key={lot.id} className="border-b border-[#E5E7EB]">
                          <td className="py-2 font-medium text-[#111827]">{lot.id}</td>
                          <td className="py-2 text-[#6B7280]">{lot.product}</td>
                          <td className="py-2 text-[#6B7280]">{lot.quantity} {lot.unit}</td>
                          <td className="py-2 text-[#6B7280]">{lot.ageDays} days</td>
                          <td className="py-2 text-[#6B7280]">{lot.maxAgeDays} days</td>
                          <td className={cn("py-2 font-medium", getFreshnessColor(lot.ageDays, lot.maxAgeDays))}>
                            {freshnessPercent}%
                          </td>
                          <td className="py-2 text-[#6B7280]">{lot.warehouse}</td>
                          <td className="py-2">
                            <div>
                              <p className="text-[#111827] font-medium">{lot.distributor}</p>
                              <p className="text-xs text-[#6B7280]">{lot.distributorContact}</p>
                              <div className="mt-1 flex items-center gap-2">
                                <div className="h-1.5 w-16 rounded-full bg-[#E5E7EB]">
                                  <div className={cn("h-1.5 rounded-full", getUtilizationColor(lot.distributorLoad))} style={{ width: `${lot.distributorLoad}%` }} />
                                </div>
                                <span className="text-xs text-[#6B7280]">{lot.distributorLoad}%</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-2 text-[#6B7280]">{lot.etaToRetailer}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </SheetContent>
          </Sheet>
        )}

        {activeDrawer === "coldchain" && (
          <Sheet open onOpenChange={() => setActiveDrawer(null)}>
            <SheetContent className="w-full sm:max-w-2xl">
              <SheetHeader>
                <SheetTitle>Cold Chain Health</SheetTitle>
                <SheetDescription>Temperature and humidity status per warehouse</SheetDescription>
              </SheetHeader>
              <div className="mt-4 space-y-3">
                {warehouseColdChains.map((wh) => (
                  <div key={wh.id} className="rounded-lg border border-[#E5E7EB] p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-[#111827]">{wh.name}</p>
                        <p className="text-sm text-[#6B7280]">{wh.location}</p>
                      </div>
                      <div className={cn(
                        "rounded-full px-3 py-1 text-sm font-semibold",
                        wh.healthScore >= 95 ? "bg-[#E8F5EE] text-[#0F8F5F]" : "bg-amber-50 text-amber-700"
                      )}>
                        {wh.healthScore}%
                      </div>
                    </div>
                    <div className="mt-3 grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-[#6B7280]">Temperature</p>
                        <p className="font-medium text-[#111827]">{wh.temperature}°C</p>
                      </div>
                      <div>
                        <p className="text-[#6B7280]">Humidity</p>
                        <p className="font-medium text-[#111827]">{wh.humidity}%</p>
                      </div>
                      <div>
                        <p className="text-[#6B7280]">Last Check</p>
                        <p className="font-medium text-[#111827]">{wh.lastCheck}</p>
                      </div>
                      <div>
                        <p className="text-[#6B7280]">Status</p>
                        <p className="font-medium text-[#0F8F5F]">Healthy</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        )}

        {activeDrawer === "atrisk" && (
          <Sheet open onOpenChange={() => setActiveDrawer(null)}>
            <SheetContent className="w-full sm:max-w-3xl">
              <SheetHeader>
                <SheetTitle>At-Risk Lots — {atRiskLots.length}</SheetTitle>
                <SheetDescription>Lots requiring immediate action</SheetDescription>
              </SheetHeader>
              <div className="mt-4 space-y-3">
                {atRiskLots.map((lot) => (
                  <div key={lot.id} className={cn(
                    "rounded-lg border p-4",
                    actionedLots.includes(lot.id) ? "border-[#E5E7EB] bg-[#F7F8F4] opacity-60" : "border-red-200 bg-red-50"
                  )}>
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-[#111827]">{lot.product}</p>
                          <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">
                            {lot.daysRemaining} days left
                          </span>
                        </div>
                        <p className="text-sm text-[#6B7280]">{lot.id} • {lot.category} • {lot.quantity} {lot.unit}</p>
                        <p className="mt-1 text-sm text-red-600">{lot.riskReason}</p>
                        <p className="mt-1 text-sm text-[#6B7280]">Warehouse: {lot.warehouse}</p>
                      </div>
                      {!actionedLots.includes(lot.id) && (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleActionLot(lot.id, "Mark as actioned")}
                          >
                            Mark Actioned
                          </Button>
                          <Button
                            size="sm"
                            className="bg-[#0F8F5F] hover:bg-[#0C7A51]"
                            onClick={() => handleActionLot(lot.id, lot.recommendedAction)}
                          >
                            {lot.recommendedAction}
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        )}
      </AnimatePresence>
    </div>
  );
}