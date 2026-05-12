"use client";

import { createElement } from "react";
import { InlineAiInsights } from "@/components/forecasting/InlineAiInsights";
import { MetricGrid } from "@/components/shared/MetricGrid";
import { PageHeader } from "@/components/shared/PageHeader";
import { SupplierTable } from "@/components/supply-chain/SupplierTable";
import { useRoleConfig } from "@/lib/config/roleConfig";
import { useRoleStore } from "@/lib/stores/roleStore";

export default function SuppliersPage() {
  const role = useRoleStore((state) => state.currentRole);
  const roleConfig = useRoleConfig();

  return (
    <div className="space-y-6 pb-8">
      <PageHeader
        title={roleConfig.suppliersTitle}
        subtitle={roleConfig.suppliersSubtitle}
      />
      <InlineAiInsights insights={roleConfig.aiInsights.map((insight) => insight.message)} resetKey={role} />
      <MetricGrid
        items={roleConfig.suppliersKpis.map((kpi) => ({
          label: kpi.label,
          value: kpi.value,
          detail: kpi.subtitle,
          icon: createElement(kpi.icon, { className: "size-5" }),
        }))}
      />
      <SupplierTable />
    </div>
  );
}
