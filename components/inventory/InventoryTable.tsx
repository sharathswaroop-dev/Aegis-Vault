"use client";

import { useLiveDataStore, type LiveOrderRow } from "@/lib/stores/liveDataStore";
import { cn } from "@/lib/utils";

import { useDrillDownStore } from "@/lib/stores/drillDownStore";
import { DemandPatternBadge } from "./DemandPatternBadge";

function RiskBadge({ risk }: { risk: LiveOrderRow["risk"] }) {
  return (
    <span
      className={cn(
        "rounded-full px-2.5 py-1 text-xs font-semibold",
        risk === "High" && "bg-red-50 text-red-700",
        risk === "Medium" && "bg-amber-50 text-amber-700",
        risk === "Low" && "bg-[#E8F5EE] text-[#0C7A51]",
      )}
    >
      {risk}
    </span>
  );
}

function getAction(row: LiveOrderRow): string {
  if (row.risk === "High") return "Priority dispatch";
  if (row.risk === "Medium") return "Discount 10%";
  return "Hold price";
}

export function InventoryTable() {
  const { orders, loading, lastUpdated } = useLiveDataStore();
  const openDrillDown = useDrillDownStore((s) => s.open);

  return (
    <div className="surface-card overflow-hidden rounded-lg">
      <div className="border-b border-[#E5E7EB] p-5 flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-[#111827]">Inventory Intelligence</h3>
          <p className="mt-1 text-sm text-[#6B7280]">
            Live category, aging, warehouse, and spoilage recommendations.
          </p>
        </div>
        {lastUpdated && (
          <span className="text-xs text-[#9CA3AF]">
            Updated {lastUpdated.toLocaleTimeString("en-IN")}
          </span>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[840px] text-left text-sm">
          <thead className="bg-[#F7F8F4] text-xs uppercase tracking-wide text-[#6B7280]">
            <tr>
              <th className="px-5 py-3 font-semibold">SKU</th>
              <th className="px-5 py-3 font-semibold">Item</th>
              <th className="px-5 py-3 font-semibold">Pattern</th>
              <th className="px-5 py-3 font-semibold">Category</th>
              <th className="px-5 py-3 font-semibold">Location</th>
              <th className="px-5 py-3 font-semibold">Stock</th>
              <th className="px-5 py-3 font-semibold">Age</th>
              <th className="px-5 py-3 font-semibold">Risk</th>
              <th className="px-5 py-3 font-semibold">AI Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E7EB] bg-white">
            {loading && orders.length === 0 ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i}>
                  {Array.from({ length: 9 }).map((__, j) => (
                    <td key={j} className="px-5 py-4">
                      <div className="h-4 bg-[#F1F3EE] rounded animate-pulse" />
                    </td>
                  ))}
                </tr>
              ))
            ) : orders.length === 0 ? (
              <tr>
                <td colSpan={9} className="px-5 py-8 text-center text-sm text-[#6B7280]">
                  No active lots found in database.
                </td>
              </tr>
            ) : (
              orders.map((row) => (
                <tr 
                  key={row.id} 
                  className="transition hover:bg-[#F7F8F4] cursor-pointer"
                  onClick={() => openDrillDown("shipment", { ...row, shipmentId: row.sku, title: row.item })}
                >
                  <td className="px-5 py-4 font-mono text-xs text-[#6B7280]">{row.sku}</td>
                  <td className="px-5 py-4 font-semibold text-[#111827]">{row.item}</td>
                  <td className="px-5 py-4">
                    <DemandPatternBadge pattern={row.demandPattern || "stable"} />
                  </td>
                  <td className="px-5 py-4 text-[#6B7280]">{row.category}</td>
                  <td className="px-5 py-4 text-[#6B7280]">{row.location}</td>
                  <td className="px-5 py-4 font-medium text-[#111827]">{row.stock}</td>
                  <td className="px-5 py-4 text-[#6B7280]">{row.age}</td>
                  <td className="px-5 py-4"><RiskBadge risk={row.risk} /></td>
                  <td className="px-5 py-4 font-medium text-[#0C7A51]">{getAction(row)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

