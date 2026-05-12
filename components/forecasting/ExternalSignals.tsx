"use client";

import { useMemo } from "react";
import { CalendarDays, CloudRain, Sprout, Thermometer } from "lucide-react";
import { useLiveDataStore } from "@/lib/stores/liveDataStore";
import { EmptyState } from "@/components/shared/EmptyState";

const icons: Record<string, any> = {
  Weather: CloudRain,
  Market: CalendarDays,
  Crop: Sprout,
  Temperature: Thermometer,
};

export function ExternalSignals() {
  const { weather, location, loading } = useLiveDataStore();

  const signals = useMemo(() => {
    if (!weather) return [];
    
    const results = [];
    
    // Signal 1: Weather based
    results.push({
      id: "sig-1",
      type: "Weather",
      impact: weather.temp > 30 ? "High" : "Medium",
      description: weather.temp > 30 
        ? `Heatwave detected in ${location?.city || "your area"}. Accelerate cold chain dispatch for dairy.`
        : `Weather in ${location?.city || "your area"} is stable (${weather.temp}°C). Optimal for harvest movement.`,
      icon: weather.temp > 30 ? "Temperature" : "Weather"
    });

    // Signal 2: Seasonal/Crop based
    results.push({
      id: "sig-2",
      type: "Crop",
      impact: "Medium",
      description: "Regional harvest cycle peaking. Expect increased warehouse inbound volume over next 48h.",
      icon: "Crop"
    });

    // Signal 3: Market based
    results.push({
      id: "sig-3",
      type: "Market",
      impact: "Low",
      description: "Weekend demand spike forecasted for fresh produce based on historical retail patterns.",
      icon: "Market"
    });

    return results;
  }, [weather, location]);

  if (loading && signals.length === 0) {
    return <div className="h-32 flex items-center justify-center text-sm text-[#6B7280]">Loading live signals...</div>;
  }

  if (signals.length === 0) {
    return <EmptyState heading="No external signals" subtext="Weather, local event, and crop signals will appear here." />;
  }

  return (
    <section className="grid gap-3 lg:grid-cols-3">
      {signals.map((signal) => {
        const Icon = icons[signal.icon] ?? Sprout;
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

