"use client";

import { useMemo, useSyncExternalStore } from "react";
import { Activity } from "lucide-react";
import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";
import { accuracyLogRows } from "@/lib/mock-data";
import { EmptyState } from "@/components/shared/EmptyState";
import { Skeleton } from "@/components/ui/skeleton";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { cn } from "@/lib/utils";

function useMounted() {
  return useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );
}

interface AccuracyLogProps {
  isLoading?: boolean;
}

export function AccuracyLog({ isLoading = false }: AccuracyLogProps) {
  const mounted = useMounted();
  const averageMape = useMemo(
    () => accuracyLogRows.reduce((total, row) => total + row.mape, 0) / accuracyLogRows.length,
    [],
  );

  return (
    <section className="surface-card rounded-lg p-5">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Activity className="size-5 text-[#0F8F5F]" />
          <div>
            <h3 className="text-base font-semibold text-[#111827]">Forecast Accuracy Audit Log</h3>
            <p className="mt-1 text-sm text-[#6B7280]">Forecast vs actual variance with rolling four-week MAPE.</p>
          </div>
        </div>
        <span className="rounded-full bg-[#E8F5EE] px-3 py-1.5 text-sm font-semibold text-[#0C7A51]">
          Avg MAPE {averageMape.toFixed(1)}%
        </span>
      </div>

      {isLoading ? (
        <TableSkeleton rows={4} columns={7} />
      ) : accuracyLogRows.length === 0 ? (
        <EmptyState heading="No forecast audit records" subtext="Forecast accuracy records will appear after actuals are reconciled." />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[920px] text-left text-sm">
            <thead className="bg-[#F7F8F4] text-xs uppercase tracking-wide text-[#6B7280]">
              <tr>
                <th className="px-4 py-3 font-semibold">SKU</th>
                <th className="px-4 py-3 font-semibold">Region</th>
                <th className="px-4 py-3 font-semibold">Forecast vs Actual</th>
                <th className="px-4 py-3 font-semibold">MAPE %</th>
                <th className="px-4 py-3 font-semibold">Bias</th>
                <th className="px-4 py-3 font-semibold">Week</th>
                <th className="px-4 py-3 font-semibold">4-week trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {accuracyLogRows.map((row) => (
                <tr key={`${row.sku}-${row.week}`}>
                  <td className="px-4 py-4 font-mono text-xs text-[#6B7280]">{row.sku}</td>
                  <td className="px-4 py-4 text-[#6B7280]">{row.region}</td>
                  <td className="px-4 py-4 font-semibold text-[#111827]">{row.forecast} / {row.actual}</td>
                  <td className="px-4 py-4 text-[#111827]">{row.mape.toFixed(1)}%</td>
                  <td className="px-4 py-4">
                    <span className={cn("rounded-full px-2.5 py-1 text-xs font-semibold", row.bias === "over" ? "bg-amber-50 text-amber-700" : "bg-[#E8F5EE] text-[#0C7A51]")}>
                      {row.bias}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-[#6B7280]">{row.week}</td>
                  <td className="px-4 py-4">
                    {mounted ? (
                      <div className="h-10 w-32">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={row.trend}>
                            <Tooltip />
                            <Line type="monotone" dataKey="mape" stroke="#0F8F5F" strokeWidth={2} dot={false} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    ) : (
                      <Skeleton className="h-10 w-32" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
