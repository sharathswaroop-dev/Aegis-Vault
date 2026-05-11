import { Building2, Globe2, PlugZap, Workflow } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { MetricGrid } from "@/components/shared/MetricGrid";

export default function OrganizationPage() {
  return (
    <div className="space-y-6 pb-8">
      <PageHeader
        title="Organization"
        subtitle="Manage enterprise workspace details, markets, integrations, and operating workflow defaults."
      />
      <MetricGrid
        items={[
          { label: "Workspace", value: "Northstar", detail: "Enterprise tenant", icon: <Building2 className="size-5" /> },
          { label: "Markets", value: "12", detail: "India and GCC", icon: <Globe2 className="size-5" /> },
          { label: "Data Pipelines", value: "18", detail: "Live integrations", icon: <PlugZap className="size-5" /> },
          { label: "Workflows", value: "31", detail: "Automated rules", icon: <Workflow className="size-5" /> },
        ]}
      />
    </div>
  );
}
