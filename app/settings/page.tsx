import { Database, KeyRound, Settings, Users } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { MetricGrid } from "@/components/shared/MetricGrid";

export default function SettingsPage() {
  return (
    <div className="space-y-6 pb-8">
      <PageHeader
        title="Settings"
        subtitle="Configure organization preferences, roles, integrations, forecasting thresholds, and alert routing."
      />
      <MetricGrid
        items={[
          { label: "Active Roles", value: "5", detail: "Farmer to admin", icon: <Users className="size-5" /> },
          { label: "Integrations", value: "18", detail: "ERP, WMS, POS", icon: <Database className="size-5" /> },
          { label: "Access Policies", value: "24", detail: "Team scoped", icon: <KeyRound className="size-5" /> },
          { label: "Forecast Rules", value: "46", detail: "AI tuned", icon: <Settings className="size-5" /> },
        ]}
      />
      <section className="surface-card rounded-lg p-5">
        <h3 className="text-base font-semibold text-[#111827]">Platform Configuration</h3>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {["Forecast thresholds", "Spoilage alert routing", "Pricing approval workflow", "Supplier scorecards"].map((item) => (
            <div key={item} className="rounded-lg border border-[#E5E7EB] bg-white p-4">
              <p className="text-sm font-semibold text-[#111827]">{item}</p>
              <p className="mt-1 text-sm text-[#6B7280]">Configured for enterprise operating controls.</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
