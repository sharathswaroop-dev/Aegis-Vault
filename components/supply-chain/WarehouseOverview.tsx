import { warehouseOverview } from "@/lib/mock-data";

export function WarehouseOverview() {
  return (
    <section className="surface-card rounded-lg p-5">
      <div className="mb-5">
        <h3 className="text-base font-semibold text-[#111827]">Warehouse Overview</h3>
        <p className="mt-1 text-sm text-[#6B7280]">
          Capacity, spoilage, and order pressure across priority hubs.
        </p>
      </div>
      <div className="space-y-4">
        {warehouseOverview.map((warehouse) => (
          <div key={warehouse.name} className="rounded-lg border border-[#E5E7EB] p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-[#111827]">{warehouse.name}</p>
                <p className="mt-1 text-xs text-[#6B7280]">{warehouse.orders.toLocaleString()} active orders</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-[#111827]">{warehouse.capacity}%</p>
                <p className="text-xs text-[#6B7280]">capacity</p>
              </div>
            </div>
            <div className="mt-3 h-2 rounded-full bg-[#F1F3EE]">
              <div
                className="h-2 rounded-full bg-[#0F8F5F]"
                style={{ width: `${warehouse.capacity}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-[#6B7280]">
              Spoilage risk {warehouse.spoilage}%
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
