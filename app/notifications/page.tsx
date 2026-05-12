"use client";

import { Bell, CheckCircle2, Clock, TriangleAlert } from "lucide-react";
import { InlineAiInsights } from "@/components/forecasting/InlineAiInsights";
import { AnomalyAlerts } from "@/components/shared/AnomalyAlerts";
import { PageHeader } from "@/components/shared/PageHeader";
import { MetricGrid } from "@/components/shared/MetricGrid";
import { useRoleConfig } from "@/lib/config/roleConfig";
import { useRoleStore } from "@/lib/stores/roleStore";

export default function NotificationsPage() {
  const role = useRoleStore((state) => state.currentRole);
  const roleConfig = useRoleConfig();
  const notifications = roleConfig.notifications;

  return (
    <div className="space-y-6 pb-8">
      <PageHeader
        title="Notifications"
        subtitle="Operational alerts for inventory risk, forecast changes, supplier variance, and logistics exceptions."
      />
      <InlineAiInsights insights={roleConfig.aiInsights.map((insight) => insight.message)} resetKey={role} />
      <MetricGrid
        items={[
          { label: "Open Alerts", value: String(notifications.length), detail: "Role-specific queue", icon: <Bell className="size-5" /> },
          { label: "Resolved Today", value: role === "admin" ? "84" : "12", detail: "Within SLA", icon: <CheckCircle2 className="size-5" /> },
          { label: "Avg Response", value: role === "farmer" ? "1.5h" : "12 min", detail: "Team median", icon: <Clock className="size-5" /> },
          { label: "High Priority", value: String(notifications.filter(n => n.type === "anomaly" || n.type === "high").length || (notifications.length > 0 ? 1 : 0)), detail: "Requires owner", icon: <TriangleAlert className="size-5" /> },
        ]}
      />
      <AnomalyAlerts />
      <section className="surface-card rounded-lg p-5">
        <h3 className="text-base font-semibold text-[#111827]">Notification Center</h3>
        <div className="mt-4 grid gap-3">
          {notifications.map((notification) => (
            <div key={`${notification.type}-${notification.title}`} className="rounded-lg border border-[#E5E7EB] bg-white p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm font-semibold text-[#111827]">{notification.title}</p>
                <span className="rounded-full bg-[#E8F5EE] px-2.5 py-1 text-xs font-semibold text-[#0C7A51]">
                  {notification.time}
                </span>
              </div>
              <p className="mt-2 text-sm leading-6 text-[#6B7280]">{notification.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
