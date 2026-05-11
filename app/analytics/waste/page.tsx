import { IndianRupee, Leaf, Recycle, Timer, TriangleAlert } from "lucide-react";
import { AnalyticsPage } from "@/components/analytics/AnalyticsPage";

export default function WasteAnalyticsPage() {
  return (
    <AnalyticsPage
      title="Waste Analytics"
      subtitle="Monitor spoilage, aging, and liquidation opportunities before inventory value decays."
      metrics={[
        { label: "Cost of Waste", value: "₹2,34,500 / month", detail: "Spoilage and markdown loss", icon: <IndianRupee className="size-5" /> },
        { label: "Waste Reduced", value: "18.6%", detail: "Month over month", icon: <Recycle className="size-5" /> },
        { label: "Freshness Window", value: "31 hrs", detail: "Average buffer", icon: <Timer className="size-5" /> },
        { label: "High-Risk Lots", value: "16", detail: "Needs dispatch", icon: <TriangleAlert className="size-5" /> },
        { label: "Carbon Savings", value: "42 tCO2e", detail: "Avoided waste", icon: <Leaf className="size-5" /> },
      ]}
    />
  );
}
