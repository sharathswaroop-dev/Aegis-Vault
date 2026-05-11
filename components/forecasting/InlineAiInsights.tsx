"use client";

import { useState } from "react";
import { Bot, X } from "lucide-react";
import { EmptyState } from "@/components/shared/EmptyState";

interface InlineAiInsightsProps {
  insights: string[];
  compact?: boolean;
}

export function InlineAiInsights({ insights, compact = false }: InlineAiInsightsProps) {
  const [dismissed, setDismissed] = useState<string[]>([]);
  const visibleInsights = insights.filter((insight) => !dismissed.includes(insight));

  if (visibleInsights.length === 0) {
    return compact ? null : (
      <EmptyState
        heading="No AI suggestions"
        subtext="FoodFlow AI will surface section-specific suggestions when new signals arrive."
      />
    );
  }

  return (
    <div className={compact ? "flex gap-3 overflow-x-auto" : "grid gap-3 lg:grid-cols-2"}>
      {visibleInsights.map((insight) => (
        <div
          key={insight}
          className="flex min-w-0 items-start gap-3 rounded-lg border border-[#E5E7EB] bg-white p-4"
        >
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#E8F5EE] text-[#0F8F5F]">
            <Bot className="size-4" />
          </div>
          <p className="min-w-0 flex-1 text-sm leading-6 text-[#111827]">{insight}</p>
          <button
            className="rounded-md p-1 text-[#6B7280] transition hover:bg-[#F1F3EE] hover:text-[#111827]"
            onClick={() => setDismissed((current) => [...current, insight])}
            aria-label="Dismiss AI suggestion"
          >
            <X className="size-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
