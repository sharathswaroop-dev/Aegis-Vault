import { KeyRound, LockKeyhole, ShieldCheck, UserCheck } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { MetricGrid } from "@/components/shared/MetricGrid";

export default function SecuritySettingsPage() {
  return (
    <div className="space-y-6 pb-8">
      <PageHeader
        title="Security"
        subtitle="Enterprise access control for teams, integrations, audit logs, and operational approvals."
      />
      <MetricGrid
        items={[
          { label: "SSO Status", value: "Enabled", detail: "SAML connected", icon: <ShieldCheck className="size-5" /> },
          { label: "API Keys", value: "12", detail: "2 expiring", icon: <KeyRound className="size-5" /> },
          { label: "Role Policies", value: "5", detail: "Dynamic dashboard roles", icon: <UserCheck className="size-5" /> },
          { label: "Audit Retention", value: "365 days", detail: "Enterprise plan", icon: <LockKeyhole className="size-5" /> },
        ]}
      />
    </div>
  );
}
