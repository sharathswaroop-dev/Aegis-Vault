import { CalendarDays, CloudRain, Sprout } from "lucide-react";
import { externalSignals } from "@/lib/mock-data";
import { EmptyState } from "@/components/shared/EmptyState";

const icons = [CloudRain, CalendarDays, Sprout];

export function ExternalSignals() {
  if (externalSignals.length === 0) {
    return <EmptyState heading="No external signals" subtext="Weather, local event, and crop signals will appear here." />;
  }

  return (
    <section className="grid gap-3 lg:grid-cols-3">
      {externalSignals.map((signal, index) => {
        const Icon = icons[index] ?? Sprout;
        return (
          <div key={signal.id} className="surface-card hover-lift rounded-lg p-5">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Icon className="size-5 text-[#0F8F5F]" />
                <span className="rounded-full bg-[#E8F5EE] px-2.5 py-1 text-xs font-semibold text-[#0C7A51]">
                  {signal.type}
                </span>
              </div>
              <span className="rounded-full bg-[#F1F3EE] px-2.5 py-1 text-xs font-semibold text-[#111827]">
                Impact: {signal.impact}
              </span>
            </div>
            <p className="mt-4 text-sm leading-6 text-[#111827]">{signal.description}</p>
          </div>
        );
      })}
    </section>
  );
}
