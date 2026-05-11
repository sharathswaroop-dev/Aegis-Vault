import { Boxes, Gauge, Thermometer, Warehouse } from "lucide-react";
import { SupplyChainPage } from "@/components/supply-chain/SupplyChainPage";

export default function WarehousesPage() {
  return (
    <SupplyChainPage
      title="Warehouses"
      subtitle="Warehouse dashboards for storage health, capacity, throughput, and spoilage monitoring."
      metrics={[
        { label: "Active Hubs", value: "42", detail: "5 regions", icon: <Warehouse className="size-5" /> },
        { label: "Utilization", value: "81%", detail: "Healthy range", icon: <Gauge className="size-5" /> },
        { label: "Cold Compliance", value: "98.2%", detail: "Temperature stable", icon: <Thermometer className="size-5" /> },
        { label: "Pallet Turns", value: "5.8x", detail: "Weekly velocity", icon: <Boxes className="size-5" /> },
      ]}
      panelTitle="Warehouse Control Queue"
      rows={[
        { name: "Bangalore North", detail: "Fresh produce and dairy hub", metric: "86% capacity", status: "Balanced" },
        { name: "Mumbai Cold Hub", detail: "Cold chain and beverages", metric: "79% capacity", status: "Healthy" },
        { name: "Hyderabad East", detail: "Fruit inbound pressure", metric: "91% capacity", status: "Action ready" },
      ]}
    />
  );
}
