"use client";

import { ReactNode } from "react";
import { useDrillDownStore } from "@/lib/stores/drillDownStore";

interface MetricGridProps {
  items: { label: string; value: string; detail: string; icon?: ReactNode }[];
}

export function MetricGrid({ items }: MetricGridProps) {
  const openDrillDown = useDrillDownStore((s) => s.open);

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <div 
          key={item.label} 
          className="surface-card rounded-lg p-5 cursor-pointer hover-lift"
          onClick={() => openDrillDown("metric", { ...item, title: item.label })}
        >
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-medium text-[#6B7280]">{item.label}</p>
            {item.icon ? <div className="text-[#0F8F5F]">{item.icon}</div> : null}
          </div>
          <p className="mt-4 text-2xl font-semibold tracking-tight text-[#111827]">{item.value}</p>
          <p className="mt-1 text-sm text-[#6B7280]">{item.detail}</p>
        </div>
      ))}
    </div>
  );
}

