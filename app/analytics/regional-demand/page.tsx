import { Map, TrendingUp, Warehouse, Zap } from "lucide-react";
import { RegionalDemandChart } from "@/components/analytics/DemandCharts";
import { IndiaDemandMap } from "@/components/analytics/IndiaDemandMap";
import { InlineAiInsights } from "@/components/forecasting/InlineAiInsights";
import { MetricGrid } from "@/components/shared/MetricGrid";
import { PageHeader } from "@/components/shared/PageHeader";
import { pageAiInsights } from "@/lib/mock-data";

export default function RegionalDemandPage() {
  return (
    <div className="space-y-6 pb-8">
      <PageHeader
        title="Regional Demand"
        subtitle="Compare food demand signals by market, warehouse, category, and state-level demand index."
      />
      <InlineAiInsights insights={pageAiInsights.analytics} />
      <MetricGrid
        items={[
          { label: "Hot Regions", value: "9", detail: "Demand above baseline", icon: <Map className="size-5" /> },
          { label: "Demand Lift", value: "+14.2%", detail: "Bangalore produce", icon: <TrendingUp className="size-5" /> },
          { label: "Warehouse Pressure", value: "76%", detail: "Average utilization", icon: <Warehouse className="size-5" /> },
          { label: "Actionable Signals", value: "42", detail: "AI-ranked", icon: <Zap className="size-5" /> },
        ]}
      />
      <IndiaDemandMap />
      <RegionalDemandChart />
    </div>
  );
}
