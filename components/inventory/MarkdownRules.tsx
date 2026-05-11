"use client";

import { useState } from "react";
import { Percent } from "lucide-react";
import { markdownRules } from "@/lib/mock-data";
import { EmptyState } from "@/components/shared/EmptyState";
import type { MarkdownRule } from "@/lib/types";

export function MarkdownRules() {
  const [rules, setRules] = useState<MarkdownRule[]>(markdownRules);

  const updateRule = (id: string, updates: Partial<Pick<MarkdownRule, "enabled" | "discountPercent">>) => {
    setRules((current) => current.map((rule) => (rule.id === id ? { ...rule, ...updates } : rule)));
  };

  return (
    <section className="surface-card rounded-lg p-5">
      <div className="mb-5 flex items-center gap-2">
        <Percent className="size-5 text-[#0F8F5F]" />
        <div>
          <h3 className="text-base font-semibold text-[#111827]">Markdown Automation</h3>
          <p className="mt-1 text-sm text-[#6B7280]">Editable rules for discounting aging inventory.</p>
        </div>
      </div>

      {rules.length === 0 ? (
        <EmptyState heading="No markdown rules" subtext="Create discount rules to automate spoilage recovery." />
      ) : (
        <div className="space-y-3">
          {rules.map((rule) => (
            <div key={rule.id} className="rounded-lg border border-[#E5E7EB] bg-white p-4">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold text-[#111827]">
                    {rule.title.replace("apply discount", `apply ${rule.discountPercent}% discount`)}
                  </p>
                  <p className="mt-1 text-xs text-[#6B7280]">Last triggered: {rule.lastTriggered}</p>
                </div>
                <div className="flex items-center gap-3">
                  <label className="text-xs font-semibold text-[#6B7280]">
                    Discount %
                    <input
                      type="number"
                      min={0}
                      max={80}
                      value={rule.discountPercent}
                      onChange={(event) => updateRule(rule.id, { discountPercent: Number(event.target.value) })}
                      className="mt-1 h-9 w-24 rounded-lg border border-[#E5E7EB] px-3 text-sm text-[#111827] outline-none focus:border-[#0F8F5F]"
                    />
                  </label>
                  <label className="flex items-center gap-2 text-sm font-medium text-[#111827]">
                    <input
                      type="checkbox"
                      checked={rule.enabled}
                      onChange={(event) => updateRule(rule.id, { enabled: event.target.checked })}
                      className="size-4 accent-[#0F8F5F]"
                    />
                    Enabled
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
