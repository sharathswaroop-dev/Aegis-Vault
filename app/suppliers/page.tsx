import { Clock, Handshake, ShieldCheck, Store } from "lucide-react";
import { InlineAiInsights } from "@/components/forecasting/InlineAiInsights";
import { MetricGrid } from "@/components/shared/MetricGrid";
import { PageHeader } from "@/components/shared/PageHeader";
import { SupplierTable } from "@/components/supply-chain/SupplierTable";
import { pageAiInsights } from "@/lib/mock-data";

export default function SuppliersPage() {
  return (
    <div className="space-y-6 pb-8">
      <PageHeader
        title="Suppliers"
        subtitle="Supplier and retail analytics for delivery reliability, fill rate, quality variance, and supply-demand balancing."
      />
      <InlineAiInsights insights={pageAiInsights.suppliers} />
      <MetricGrid
        items={[
          { label: "Active Suppliers", value: "286", detail: "Including retail partners", icon: <Handshake className="size-5" /> },
          { label: "OTIF", value: "94.1%", detail: "On-time in-full", icon: <ShieldCheck className="size-5" /> },
          { label: "Avg Lead Time", value: "2.8 days", detail: "Down 0.4 days", icon: <Clock className="size-5" /> },
          { label: "Retail Accounts", value: "128", detail: "Merged as filter", icon: <Store className="size-5" /> },
        ]}
      />
      <SupplierTable />
    </div>
  );
}
