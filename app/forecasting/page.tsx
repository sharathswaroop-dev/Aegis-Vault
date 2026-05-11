import { CloudRain, LineChart, Sparkles, TrendingUp } from "lucide-react";
import { DemandForecastChart, RegionalDemandChart } from "@/components/analytics/DemandCharts";
import { AccuracyLog } from "@/components/forecasting/AccuracyLog";
import { ExternalSignals } from "@/components/forecasting/ExternalSignals";
import { ForecastTags } from "@/components/forecasting/ForecastTags";
import { InlineAiInsights } from "@/components/forecasting/InlineAiInsights";
import { PageHeader } from "@/components/shared/PageHeader";
import { MetricGrid } from "@/components/shared/MetricGrid";
import { pageAiInsights } from "@/lib/mock-data";

export default function ForecastingPage() {
  return (
    <div className="space-y-6 pb-8">
      <PageHeader
        title="AI Forecasting Engine"
        subtitle="Demand forecasting, seasonal trends, regional prediction, weather-aware signals, and event-tagged demand analytics."
      />
      <InlineAiInsights insights={pageAiInsights.forecasting} />
      <MetricGrid
        items={[
          { label: "Demand Accuracy", value: "94.8%", detail: "Rolling 30-day model", icon: <LineChart className="size-5" /> },
          { label: "Seasonal Lift", value: "+18%", detail: "Next 21 days", icon: <TrendingUp className="size-5" /> },
          { label: "Weather Impact", value: "12 regions", detail: "Rainfall-adjusted forecast", icon: <CloudRain className="size-5" /> },
          { label: "Event Tags", value: "7 active", detail: "Demand windows detected", icon: <Sparkles className="size-5" /> },
        ]}
      />
      <div className="grid gap-6 xl:grid-cols-2">
        <DemandForecastChart />
        <RegionalDemandChart />
      </div>
      <ExternalSignals />
      <ForecastTags />
      <AccuracyLog />
    </div>
  );
}
