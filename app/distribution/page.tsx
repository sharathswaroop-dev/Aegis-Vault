import { PackageCheck, Timer, Truck, Warehouse } from "lucide-react";
import { DistributionStatus } from "@/components/supply-chain/DistributionStatus";
import { InlineAiInsights } from "@/components/forecasting/InlineAiInsights";
import { MetricGrid } from "@/components/shared/MetricGrid";
import { PageHeader } from "@/components/shared/PageHeader";
import { pageAiInsights } from "@/lib/mock-data";

export default function DistributionPage() {
  return (
    <div className="space-y-6 pb-8">
      <PageHeader
        title="Distribution"
        subtitle="Delivery status, supplier fill rates, and active shipment execution across the network."
      />
      <InlineAiInsights insights={pageAiInsights.distribution} />
      <MetricGrid
        items={[
          { label: "Active Shipments", value: "184", detail: "Across 22 hubs", icon: <Truck className="size-5" /> },
          { label: "On-Time Delivery", value: "94.6%", detail: "Supplier weighted", icon: <Timer className="size-5" /> },
          { label: "Avg Fill Rate", value: "89.5%", detail: "Current loads", icon: <PackageCheck className="size-5" /> },
          { label: "Receiving Hubs", value: "42", detail: "Active today", icon: <Warehouse className="size-5" /> },
        ]}
      />
      <DistributionStatus />
    </div>
  );
}
