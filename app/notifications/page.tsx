import { Bell, CheckCircle2, Clock, TriangleAlert } from "lucide-react";
import { InlineAiInsights } from "@/components/forecasting/InlineAiInsights";
import { AnomalyAlerts } from "@/components/shared/AnomalyAlerts";
import { PageHeader } from "@/components/shared/PageHeader";
import { MetricGrid } from "@/components/shared/MetricGrid";
import { notifications, pageAiInsights } from "@/lib/mock-data";

export default function NotificationsPage() {
  return (
    <div className="space-y-6 pb-8">
      <PageHeader
        title="Notifications"
        subtitle="Operational alerts for inventory risk, forecast changes, supplier variance, and logistics exceptions."
      />
      <InlineAiInsights insights={pageAiInsights.dashboard} />
      <MetricGrid
        items={[
          { label: "Open Alerts", value: "27", detail: "9 urgent", icon: <Bell className="size-5" /> },
          { label: "Resolved Today", value: "84", detail: "Within SLA", icon: <CheckCircle2 className="size-5" /> },
          { label: "Avg Response", value: "12 min", detail: "Team median", icon: <Clock className="size-5" /> },
          { label: "High Priority", value: "9", detail: "Requires owner", icon: <TriangleAlert className="size-5" /> },
        ]}
      />
      <AnomalyAlerts />
      <section className="surface-card rounded-lg p-5">
        <h3 className="text-base font-semibold text-[#111827]">Notification Center</h3>
        <div className="mt-4 grid gap-3">
          {notifications.map((notification) => (
            <div key={notification.title} className="rounded-lg border border-[#E5E7EB] bg-white p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm font-semibold text-[#111827]">{notification.title}</p>
                <span className="rounded-full bg-[#E8F5EE] px-2.5 py-1 text-xs font-semibold text-[#0C7A51]">
                  {notification.priority}
                </span>
              </div>
              <p className="mt-2 text-sm leading-6 text-[#6B7280]">{notification.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
