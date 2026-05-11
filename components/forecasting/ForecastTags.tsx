import { Tag } from "lucide-react";
import { forecastTags } from "@/lib/mock-data";
import { EmptyState } from "@/components/shared/EmptyState";

export function ForecastTags() {
  return (
    <section className="surface-card rounded-lg p-5">
      <div className="mb-4 flex items-center gap-2">
        <Tag className="size-5 text-[#0F8F5F]" />
        <div>
          <h3 className="text-base font-semibold text-[#111827]">Forecast Date Range Tags</h3>
          <p className="mt-1 text-sm text-[#6B7280]">Attach event, weather, and seasonal tags to planning windows.</p>
        </div>
      </div>
      {forecastTags.length === 0 ? (
        <EmptyState heading="No forecast tags" subtext="Event tags can be attached to forecast date ranges." />
      ) : (
        <div className="flex flex-wrap gap-2">
          {forecastTags.map((tag) => (
            <span key={tag.id} className="rounded-full border border-[#E5E7EB] bg-white px-3 py-1.5 text-sm font-medium text-[#111827]">
              {tag.label} · {tag.type} · {tag.dateRange}
            </span>
          ))}
        </div>
      )}
    </section>
  );
}
