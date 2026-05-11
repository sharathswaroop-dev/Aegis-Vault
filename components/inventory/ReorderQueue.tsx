"use client";

import { useMemo, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { reorderQueue } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/shared/EmptyState";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { cn } from "@/lib/utils";

interface ReorderQueueProps {
  isLoading?: boolean;
}

export function ReorderQueue({ isLoading = false }: ReorderQueueProps) {
  const [toast, setToast] = useState<string | null>(null);
  const sortedQueue = useMemo(
    () => [...reorderQueue].sort((a, b) => Number(b.currentStock < b.reorderPoint) - Number(a.currentStock < a.reorderPoint)),
    [],
  );

  const createPo = (sku: string) => {
    setToast(`PO created for ${sku}`);
    window.setTimeout(() => setToast(null), 2500);
  };

  return (
    <section className="surface-card rounded-lg p-5">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <ShoppingCart className="size-5 text-[#0F8F5F]" />
          <div>
            <h3 className="text-base font-semibold text-[#111827]">Reorder Suggestion Queue</h3>
            <p className="mt-1 text-sm text-[#6B7280]">Below-point SKUs are sorted first for purchasing action.</p>
          </div>
        </div>
        {toast ? (
          <span className="rounded-lg bg-[#E8F5EE] px-3 py-2 text-sm font-semibold text-[#0C7A51]">{toast}</span>
        ) : null}
      </div>

      {isLoading ? (
        <TableSkeleton rows={4} columns={7} />
      ) : sortedQueue.length === 0 ? (
        <EmptyState heading="No reorder suggestions" subtext="Reorder recommendations will appear when inventory drops below thresholds." />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] text-left text-sm">
            <thead className="bg-[#F7F8F4] text-xs uppercase tracking-wide text-[#6B7280]">
              <tr>
                <th className="px-4 py-3 font-semibold">SKU</th>
                <th className="px-4 py-3 font-semibold">Current Stock</th>
                <th className="px-4 py-3 font-semibold">Reorder Point</th>
                <th className="px-4 py-3 font-semibold">Suggested Qty</th>
                <th className="px-4 py-3 font-semibold">Supplier</th>
                <th className="px-4 py-3 font-semibold">Lead Time</th>
                <th className="px-4 py-3 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {sortedQueue.map((item) => {
                const urgent = item.currentStock < item.reorderPoint;
                return (
                  <tr key={item.sku} className={cn(urgent && "bg-amber-50/60")}>
                    <td className="px-4 py-4 font-mono text-xs text-[#6B7280]">{item.sku}</td>
                    <td className="px-4 py-4 font-semibold text-[#111827]">{item.currentStock}</td>
                    <td className="px-4 py-4 text-[#6B7280]">{item.reorderPoint}</td>
                    <td className="px-4 py-4 font-semibold text-[#111827]">{item.suggestedQty}</td>
                    <td className="px-4 py-4 text-[#6B7280]">{item.supplier}</td>
                    <td className="px-4 py-4 text-[#6B7280]">{item.leadTimeDays} days</td>
                    <td className="px-4 py-4">
                      <Button className="bg-[#0F8F5F] hover:bg-[#0C7A51]" onClick={() => createPo(item.sku)}>
                        Generate PO
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
