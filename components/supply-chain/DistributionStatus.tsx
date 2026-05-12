"use client";

import { useMemo } from "react";
import { PackageCheck, Truck } from "lucide-react";
import { useLiveDataStore } from "@/lib/stores/liveDataStore";
import { EmptyState } from "@/components/shared/EmptyState";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { cn } from "@/lib/utils";

function statusClass(status: string) {
  if (status === "In Transit") return "bg-blue-50 text-blue-700";
  if (status === "Delayed") return "bg-amber-50 text-amber-700";
  if (status === "Delivered") return "bg-[#E8F5EE] text-[#0C7A51]";
  return "bg-[#F1F3EE] text-[#111827]";
}

interface DistributionStatusProps {
  isLoading?: boolean;
}

export function DistributionStatus({ isLoading: propLoading = false }: DistributionStatusProps) {
  const { orders, loading: liveLoading } = useLiveDataStore();
  
  const isLoading = propLoading || (liveLoading && orders.length === 0);

  const shipments = useMemo(() => {
    return orders.map((o, i) => ({
      shipmentId: `SHP-${o.sku.split('-')[1] || i}`,
      supplier: o.location.split(' ')[0] + " Supplier",
      destination: "Regional Hub",
      sku: o.sku,
      status: i % 3 === 0 ? "In Transit" : i % 5 === 0 ? "Delayed" : "In Transit",
      fillRate: 90 + (i % 10),
      eta: "Today, " + (10 + i) + ":00"
    }));
  }, [orders]);

  return (
    <section className="surface-card rounded-lg p-5">
      <div className="mb-5 flex items-center gap-2">
        <Truck className="size-5 text-[#0F8F5F]" />
        <div>
          <h3 className="text-base font-semibold text-[#111827]">Active Shipments</h3>
          <p className="mt-1 text-sm text-[#6B7280]">Delivery status and supplier fill rates for current shipments.</p>
        </div>
      </div>

      <div className="mb-5 rounded-lg border border-[#E5E7EB] bg-[#F7F8F4] p-4">
        <div className="flex items-center gap-2">
          <PackageCheck className="size-5 text-[#0F8F5F]" />
          <p className="text-sm font-semibold text-[#111827]">Live Tracking Enabled</p>
        </div>
        <p className="mt-1 text-sm text-[#6B7280]">
          Tracking {shipments.length} active loads across the distribution network.
        </p>
      </div>

      {isLoading ? (
        <TableSkeleton rows={4} columns={7} />
      ) : shipments.length === 0 ? (
        <EmptyState heading="No active shipments" subtext="Shipments will appear when supplier loads are scheduled." />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] text-left text-sm">
            <thead className="bg-[#F7F8F4] text-xs uppercase tracking-wide text-[#6B7280]">
              <tr>
                <th className="px-4 py-3 font-semibold">Shipment</th>
                <th className="px-4 py-3 font-semibold">Supplier</th>
                <th className="px-4 py-3 font-semibold">Destination</th>
                <th className="px-4 py-3 font-semibold">SKU</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Fill Rate</th>
                <th className="px-4 py-3 font-semibold">ETA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {shipments.map((row) => (
                <tr key={row.shipmentId}>
                  <td className="px-4 py-4 font-mono text-xs text-[#6B7280]">{row.shipmentId}</td>
                  <td className="px-4 py-4 font-semibold text-[#111827]">{row.supplier}</td>
                  <td className="px-4 py-4 text-[#6B7280]">{row.destination}</td>
                  <td className="px-4 py-4 text-[#6B7280]">{row.sku}</td>
                  <td className="px-4 py-4">
                    <span className={cn("rounded-full px-2.5 py-1 text-xs font-semibold", statusClass(row.status))}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-[#111827]">{row.fillRate}%</td>
                  <td className="px-4 py-4 text-[#6B7280]">{row.eta}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

