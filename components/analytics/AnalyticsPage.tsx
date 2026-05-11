import { ReactNode } from "react";
import { DemandForecastChart, RegionalDemandChart } from "@/components/analytics/DemandCharts";
import { InlineAiInsights } from "@/components/forecasting/InlineAiInsights";
import { PageHeader } from "@/components/shared/PageHeader";
import { MetricGrid } from "@/components/shared/MetricGrid";
import { pageAiInsights } from "@/lib/mock-data";

interface AnalyticsPageProps {
  title: string;
  subtitle: string;
  metrics: { label: string; value: string; detail: string; icon?: ReactNode }[];
}

export function AnalyticsPage({ title, subtitle, metrics }: AnalyticsPageProps) {
  return (
    <div className="space-y-6 pb-8">
      <PageHeader title={title} subtitle={subtitle} />
      <InlineAiInsights insights={pageAiInsights.analytics} />
      <MetricGrid items={metrics} />
      <div className="grid gap-6 xl:grid-cols-2">
        <RegionalDemandChart />
        <DemandForecastChart />
      </div>
    </div>
  );
}
