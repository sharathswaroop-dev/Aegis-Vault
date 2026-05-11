import { Tractor, Truck, UserCog, Warehouse, Store } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";

const roles = [
  { name: "Farmer", icon: Tractor, scope: "Supply commitments, harvest alerts, buyer matches" },
  { name: "Warehouse", icon: Warehouse, scope: "Storage health, dispatch readiness, spoilage action" },
  { name: "Retailer", icon: Store, scope: "Shelf availability, store demand, markdown actions" },
  { name: "Distributor", icon: Truck, scope: "Routes, fleet utilization, delay exceptions" },
  { name: "Admin", icon: UserCog, scope: "Global metrics, platform settings, approval workflows" },
];

export default function RolesPage() {
  return (
    <div className="space-y-6 pb-8">
      <PageHeader
        title="Roles"
        subtitle="FoodFlow keeps the same dashboard layout while changing metrics, charts, AI insights, and operational actions by role."
      />
      <div className="grid gap-4 lg:grid-cols-2">
        {roles.map((role) => {
          const Icon = role.icon;
          return (
            <div key={role.name} className="surface-card rounded-lg p-5">
              <Icon className="size-5 text-[#0F8F5F]" />
              <h3 className="mt-4 text-base font-semibold text-[#111827]">{role.name}</h3>
              <p className="mt-2 text-sm leading-6 text-[#6B7280]">{role.scope}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
