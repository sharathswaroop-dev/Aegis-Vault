"use client";

import { ReactNode } from "react";
import { DemandForecastChart, RegionalDemandChart } from "@/components/analytics/DemandCharts";
import { InlineAiInsights } from "@/components/forecasting/InlineAiInsights";
import { PageHeader } from "@/components/shared/PageHeader";
import { MetricGrid } from "@/components/shared/MetricGrid";
import { useRoleConfig } from "@/lib/config/roleConfig";
import { useRoleStore } from "@/lib/stores/roleStore";

interface AnalyticsPageProps {
  title: string;
  subtitle: string;
  metrics: { label: string; value: string; detail: string; icon?: ReactNode }[];
}

export function AnalyticsPage({ title, subtitle, metrics }: AnalyticsPageProps) {
  const role = useRoleStore((state) => state.currentRole);
  const roleConfig = useRoleConfig();

  return (
    <div className="space-y-6 pb-8">
      <PageHeader title={title} subtitle={subtitle} />
      <InlineAiInsights insights={roleConfig.aiInsights.map((insight) => insight.message)} resetKey={role} />
      <MetricGrid items={metrics} />
      <div className="grid gap-6 xl:grid-cols-2">
        <RegionalDemandChart />
        <DemandForecastChart />
      </div>
    </div>
  );
}
