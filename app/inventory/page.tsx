import { Boxes, Clock, Thermometer, TriangleAlert } from "lucide-react";
import { InventoryTable } from "@/components/inventory/InventoryTable";
import { AgingRulesPanel } from "@/components/inventory/AgingRulesPanel";
import { MarkdownRules } from "@/components/inventory/MarkdownRules";
import { PerishabilityEngine } from "@/components/inventory/PerishabilityEngine";
import { ReorderQueue } from "@/components/inventory/ReorderQueue";
import { InlineAiInsights } from "@/components/forecasting/InlineAiInsights";
import { PageHeader } from "@/components/shared/PageHeader";
import { MetricGrid } from "@/components/shared/MetricGrid";
import { categories, pageAiInsights } from "@/lib/mock-data";

export default function InventoryPage() {
  return (
    <div className="space-y-6 pb-8">
      <PageHeader
        title="Inventory Intelligence"
        subtitle="Track storage analytics, inventory aging, warehouse movement, and spoilage risk across all food categories."
      />
      <InlineAiInsights insights={pageAiInsights.inventory} />
      <MetricGrid
        items={[
          { label: "Items Monitored", value: "12,840", detail: "Across 7 categories", icon: <Boxes className="size-5" /> },
          { label: "Avg Freshness Age", value: "4.2 days", detail: "1.1 days under threshold", icon: <Clock className="size-5" /> },
          { label: "Cold Chain Health", value: "98.2%", detail: "Stable across warehouses", icon: <Thermometer className="size-5" /> },
          { label: "At-Risk Lots", value: "38", detail: "AI action available", icon: <TriangleAlert className="size-5" /> },
        ]}
      />
      <section className="surface-card rounded-lg p-5">
        <h3 className="text-base font-semibold text-[#111827]">Category Coverage</h3>
        <div className="mt-4 flex flex-wrap gap-2">
          {categories.map((category) => (
            <span key={category} className="rounded-full border border-[#E5E7EB] bg-white px-3 py-1.5 text-sm font-medium text-[#111827]">
              {category}
            </span>
          ))}
        </div>
      </section>
      <AgingRulesPanel />
      <InventoryTable />
      <div className="grid gap-6 xl:grid-cols-2">
        <PerishabilityEngine />
        <MarkdownRules />
      </div>
      <ReorderQueue />
    </div>
  );
}
