"use client";

import { createElement } from "react";
import { DistributionStatus } from "@/components/supply-chain/DistributionStatus";
import { InlineAiInsights } from "@/components/forecasting/InlineAiInsights";
import { MetricGrid } from "@/components/shared/MetricGrid";
import { PageHeader } from "@/components/shared/PageHeader";
import { useRoleConfig } from "@/lib/config/roleConfig";
import { useRoleStore } from "@/lib/stores/roleStore";
export default function DistributionPage() {
  const role = useRoleStore((state) => state.currentRole);
  const roleConfig = useRoleConfig();

  return (
    <div className="space-y-6 pb-8">
      <PageHeader
        title={roleConfig.distributionTitle}
        subtitle={roleConfig.distributionSubtitle}
      />
      <InlineAiInsights insights={roleConfig.aiInsights.map((insight) => insight.message)} resetKey={role} />
      <MetricGrid
        items={roleConfig.distributionKpis.map((kpi) => ({
          label: kpi.label,
          value: kpi.value,
          detail: kpi.subtitle,
          icon: createElement(kpi.icon, { className: "size-5" }),
        }))}
      />
      <DistributionStatus />
    </div>
  );
}
