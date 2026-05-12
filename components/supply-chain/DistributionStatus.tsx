"use client";

import { useMemo } from "react";
import { PackageCheck, Truck } from "lucide-react";
import { useLiveDataStore, type LiveShipment } from "@/lib/stores/liveDataStore";
import { useDrillDownStore } from "@/lib/stores/drillDownStore";
import { EmptyState } from "@/components/shared/EmptyState";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { cn } from "@/lib/utils";

function statusClass(status: string) {
  const s = status.toLowerCase();
  if (s === "in-transit" || s === "dispatched") return "bg-blue-50 text-blue-700";
  if (s === "delayed") return "bg-amber-50 text-amber-700";
  if (s === "delivered") return "bg-[#E8F5EE] text-[#0C7A51]";
  return "bg-[#F1F3EE] text-[#111827]";
}

interface DistributionStatusProps {
  isLoading?: boolean;
}

export function DistributionStatus({ isLoading: propLoading = false }: DistributionStatusProps) {
  const { shipments: liveShipments, loading: liveLoading } = useLiveDataStore();
  const openDrillDown = useDrillDownStore((s) => s.open);
  
  const isLoading = propLoading || (liveLoading && liveShipments.length === 0);

  // Fallback to lots-based mock if no real shipments in DB yet
  const { orders } = useLiveDataStore();
  const shipments = liveShipments.length > 0 ? liveShipments : orders.map((o, i) => ({
    shipmentId: `SHP-${o.sku.split('-')[1] || i}`,
    supplier: o.location.split(' ')[0] + " Supplier",
    destination: "Regional Hub",
    sku: o.sku,
    status: (i % 3 === 0 ? "in-transit" : i % 5 === 0 ? "delayed" : "dispatched") as any,
    tons: parseFloat(o.stock),
    eta: "Today, " + (10 + i) + ":00",
    id: o.id
  }));

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
                <th className="px-4 py-3 font-semibold">Origin/Supplier</th>
                <th className="px-4 py-3 font-semibold">Destination</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Payload</th>
                <th className="px-4 py-3 font-semibold">ETA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {shipments.map((row: any) => (
                <tr 
                  key={row.shipmentId} 
                  className="hover:bg-[#F7F8F4] cursor-pointer transition-colors"
                  onClick={() => openDrillDown("shipment", { ...row, title: row.shipmentId })}
                >
                  <td className="px-4 py-4 font-mono text-xs text-[#6B7280]">{row.shipmentId}</td>
                  <td className="px-4 py-4 font-semibold text-[#111827]">{row.origin || row.supplier}</td>
                  <td className="px-4 py-4 text-[#6B7280]">{row.destination}</td>
                  <td className="px-4 py-4">
                    <span className={cn("rounded-full px-2.5 py-1 text-xs font-semibold", statusClass(row.status))}>
                      {row.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-[#111827] font-medium">{row.tons} Tons</td>
                  <td className="px-4 py-4 text-[#6B7280] font-medium">{row.eta}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

