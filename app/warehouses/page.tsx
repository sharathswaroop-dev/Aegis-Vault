"use client";

import { createElement } from "react";
import { WAREHOUSE_ROLE_VIEW } from "@/lib/config/roleConfig";
import { useRoleStore } from "@/lib/stores/roleStore";
import { SupplyChainPage } from "@/components/supply-chain/SupplyChainPage";

export default function WarehousesPage() {
  const role = useRoleStore((state) => state.currentRole);
  const view = WAREHOUSE_ROLE_VIEW[role];

  return (
    <SupplyChainPage
      title={view.title}
      subtitle={view.subtitle}
      metrics={view.metrics.map((kpi) => ({
        label: kpi.label,
        value: kpi.value,
        detail: kpi.subtitle,
        icon: createElement(kpi.icon, { className: "size-5" }),
      }))}
      panelTitle="Warehouse Control Queue"
      rows={view.controlRows}
      warehouses={view.warehouses}
      hideControlQueue={view.hideControlQueue}
    />
  );
}
