import { CircleDollarSign, Percent, ShoppingCart, TrendingUp } from "lucide-react";
import { AnalyticsPage } from "@/components/analytics/AnalyticsPage";

export default function PricingIntelligencePage() {
  return (
    <AnalyticsPage
      title="Pricing Intelligence"
      subtitle="Tune markdowns, margin expansion, and dynamic price actions using demand and freshness signals."
      metrics={[
        { label: "Margin Upside", value: "$428k", detail: "Next 30 days", icon: <CircleDollarSign className="size-5" /> },
        { label: "Markdown Plans", value: "27", detail: "AI-suggested", icon: <Percent className="size-5" /> },
        { label: "Basket Lift", value: "+6.8%", detail: "Bundle candidates", icon: <ShoppingCart className="size-5" /> },
        { label: "Price Elasticity", value: "0.72", detail: "Produce average", icon: <TrendingUp className="size-5" /> },
      ]}
    />
  );
}
