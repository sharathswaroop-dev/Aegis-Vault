"use client";

import { useSyncExternalStore } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { demandForecast, regionalDemand } from "@/lib/mock-data";
import { ChartCard } from "@/components/shared/ChartCard";
import { Skeleton } from "@/components/ui/skeleton";

function useMounted() {
  return useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );
}

function ChartSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-72 w-full bg-[#F1F3EE]" />
      <div className="flex gap-2">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-3 w-20" />
      </div>
    </div>
  );
}

export function DemandForecastChart() {
  const mounted = useMounted();

  return (
    <ChartCard
      title="AI Demand Forecast"
      subtitle="Actual movement compared with projected demand across the next planning window."
    >
      {mounted ? (
      <div className="h-72 min-h-72 min-w-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={demandForecast}>
            <CartesianGrid stroke="#E5E7EB" vertical={false} />
            <XAxis dataKey="week" tickLine={false} axisLine={false} stroke="#6B7280" />
            <YAxis tickLine={false} axisLine={false} stroke="#6B7280" />
            <Tooltip />
            <Line type="monotone" dataKey="p10" name="P10" stroke="#6B7280" strokeDasharray="5 5" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="p50" name="Median" stroke="#0F8F5F" strokeWidth={3} dot={false} />
            <Line type="monotone" dataKey="p90" name="P90" stroke="#6B7280" strokeDasharray="5 5" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      ) : (
        <ChartSkeleton />
      )}
      <div className="mt-3 text-xs font-semibold text-[#6B7280]">P10 / Median / P90</div>
    </ChartCard>
  );
}

export function RegionalDemandChart() {
  const mounted = useMounted();

  return (
    <ChartCard
      title="Regional Demand Mix"
      subtitle="Demand indices by category and operating region."
    >
      {mounted ? (
      <div className="h-72 min-h-72 min-w-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={regionalDemand}>
            <CartesianGrid stroke="#E5E7EB" vertical={false} />
            <XAxis dataKey="region" tickLine={false} axisLine={false} stroke="#6B7280" />
            <YAxis tickLine={false} axisLine={false} stroke="#6B7280" />
            <Tooltip />
            <Bar dataKey="vegetables" fill="#0F8F5F" radius={[4, 4, 0, 0]} />
            <Bar dataKey="dairy" fill="#64748B" radius={[4, 4, 0, 0]} />
            <Bar dataKey="grains" fill="#D97706" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      ) : (
        <ChartSkeleton />
      )}
    </ChartCard>
  );
}
