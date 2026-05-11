import { inventoryRows } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function InventoryTable() {
  return (
    <div className="surface-card overflow-hidden rounded-lg">
      <div className="border-b border-[#E5E7EB] p-5">
        <h3 className="text-base font-semibold text-[#111827]">Inventory Intelligence</h3>
        <p className="mt-1 text-sm text-[#6B7280]">
          Live category, aging, warehouse, and spoilage recommendations.
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[840px] text-left text-sm">
          <thead className="bg-[#F7F8F4] text-xs uppercase tracking-wide text-[#6B7280]">
            <tr>
              <th className="px-5 py-3 font-semibold">SKU</th>
              <th className="px-5 py-3 font-semibold">Item</th>
              <th className="px-5 py-3 font-semibold">Category</th>
              <th className="px-5 py-3 font-semibold">Location</th>
              <th className="px-5 py-3 font-semibold">Stock</th>
              <th className="px-5 py-3 font-semibold">Age</th>
              <th className="px-5 py-3 font-semibold">Risk</th>
              <th className="px-5 py-3 font-semibold">AI Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E7EB] bg-white">
            {inventoryRows.map((row) => (
              <tr key={row.sku} className="transition hover:bg-[#F7F8F4]">
                <td className="px-5 py-4 font-mono text-xs text-[#6B7280]">{row.sku}</td>
                <td className="px-5 py-4 font-semibold text-[#111827]">{row.item}</td>
                <td className="px-5 py-4 text-[#6B7280]">{row.category}</td>
                <td className="px-5 py-4 text-[#6B7280]">{row.location}</td>
                <td className="px-5 py-4 font-medium text-[#111827]">{row.stock}</td>
                <td className="px-5 py-4 text-[#6B7280]">{row.age}</td>
                <td className="px-5 py-4">
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-1 text-xs font-semibold",
                      row.risk === "High" && "bg-red-50 text-red-700",
                      row.risk === "Medium" && "bg-amber-50 text-amber-700",
                      row.risk === "Low" && "bg-[#E8F5EE] text-[#0C7A51]",
                    )}
                  >
                    {row.risk}
                  </span>
                </td>
                <td className="px-5 py-4 font-medium text-[#0C7A51]">{row.action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
