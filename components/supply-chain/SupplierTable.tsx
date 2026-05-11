"use client";

import { useMemo, useState } from "react";
import { Store, Truck } from "lucide-react";
import { supplierRows } from "@/lib/mock-data";
import { EmptyState } from "@/components/shared/EmptyState";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { cn } from "@/lib/utils";

function rateClass(value: number) {
  if (value > 90) return "bg-[#E8F5EE] text-[#0C7A51]";
  if (value >= 75) return "bg-amber-50 text-amber-700";
  return "bg-red-50 text-red-700";
}

interface SupplierTableProps {
  isLoading?: boolean;
}

export function SupplierTable({ isLoading = false }: SupplierTableProps) {
  const [filter, setFilter] = useState<"All" | "Retail">("All");
  const rows = useMemo(
    () => supplierRows.filter((row) => filter === "All" || row.type === "Retail"),
    [filter],
  );

  return (
    <section className="surface-card rounded-lg p-5">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Truck className="size-5 text-[#0F8F5F]" />
          <div>
            <h3 className="text-base font-semibold text-[#111827]">Supplier and Retail Performance</h3>
            <p className="mt-1 text-sm text-[#6B7280]">Retail partner data is merged into suppliers as a filter.</p>
          </div>
        </div>
        <div className="rounded-lg border border-[#E5E7EB] bg-white p-1">
          {(["All", "Retail"] as const).map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm font-semibold transition",
                filter === item ? "bg-[#E8F5EE] text-[#0C7A51]" : "text-[#6B7280] hover:text-[#111827]",
              )}
            >
              {item === "Retail" ? <Store className="mr-1 inline size-4" /> : null}
              {item}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <TableSkeleton rows={5} columns={8} />
      ) : rows.length === 0 ? (
        <EmptyState heading="No supplier records" subtext="Supplier and retail performance records will appear here." />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[940px] text-left text-sm">
            <thead className="bg-[#F7F8F4] text-xs uppercase tracking-wide text-[#6B7280]">
              <tr>
                <th className="px-4 py-3 font-semibold">Name</th>
                <th className="px-4 py-3 font-semibold">Type</th>
                <th className="px-4 py-3 font-semibold">Category</th>
                <th className="px-4 py-3 font-semibold">Region</th>
                <th className="px-4 py-3 font-semibold">Reliability</th>
                <th className="px-4 py-3 font-semibold">On-Time Delivery Rate</th>
                <th className="px-4 py-3 font-semibold">Fill Rate</th>
                <th className="px-4 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {rows.map((row) => (
                <tr key={row.name}>
                  <td className="px-4 py-4 font-semibold text-[#111827]">{row.name}</td>
                  <td className="px-4 py-4 text-[#6B7280]">{row.type}</td>
                  <td className="px-4 py-4 text-[#6B7280]">{row.category}</td>
                  <td className="px-4 py-4 text-[#6B7280]">{row.region}</td>
                  <td className="px-4 py-4 text-[#111827]">{row.reliability}%</td>
                  <td className="px-4 py-4">
                    <span className={cn("rounded-full px-2.5 py-1 text-xs font-semibold", rateClass(row.onTimeDeliveryRate))}>
                      {row.onTimeDeliveryRate}%
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={cn("rounded-full px-2.5 py-1 text-xs font-semibold", rateClass(row.fillRate))}>
                      {row.fillRate}%
                    </span>
                  </td>
                  <td className="px-4 py-4 text-[#0C7A51]">{row.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
