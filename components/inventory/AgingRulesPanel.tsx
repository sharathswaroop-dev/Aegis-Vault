"use client";

import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { categories } from "@/lib/mock-data";
import { usePlatformStore } from "@/lib/store";

export function AgingRulesPanel() {
  const { agingRules, updateAgingRule } = usePlatformStore();
  const [open, setOpen] = useState(true);
  const [category, setCategory] = useState(categories[0]);
  const activeRule = agingRules.find((rule) => rule.category === category) ?? agingRules[0];

  return (
    <section className="surface-card rounded-lg p-5">
      <button
        className="flex w-full items-center justify-between text-left"
        onClick={() => setOpen((value) => !value)}
      >
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="size-5 text-[#0F8F5F]" />
          <div>
            <h3 className="text-base font-semibold text-[#111827]">Aging Rules</h3>
            <p className="mt-1 text-sm text-[#6B7280]">
              Configure shelf-life thresholds by category. Changes are stored in local state.
            </p>
          </div>
        </div>
        <span className="text-sm font-semibold text-[#0C7A51]">{open ? "Collapse" : "Expand"}</span>
      </button>

      {open ? (
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <label className="text-sm font-medium text-[#111827]">
            Category
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="mt-2 h-10 w-full rounded-lg border border-[#E5E7EB] bg-white px-3 text-sm outline-none focus:border-[#0F8F5F]"
            >
              {categories.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label className="text-sm font-medium text-[#111827]">
            Max Age (days)
            <input
              type="number"
              value={activeRule.maxAgeDays}
              min={1}
              onChange={(event) =>
                updateAgingRule(category, {
                  maxAgeDays: Number(event.target.value),
                  warningThresholdDays: activeRule.warningThresholdDays,
                })
              }
              className="mt-2 h-10 w-full rounded-lg border border-[#E5E7EB] bg-white px-3 text-sm outline-none focus:border-[#0F8F5F]"
            />
          </label>
          <label className="text-sm font-medium text-[#111827]">
            Warning threshold (days)
            <input
              type="number"
              value={activeRule.warningThresholdDays}
              min={1}
              onChange={(event) =>
                updateAgingRule(category, {
                  maxAgeDays: activeRule.maxAgeDays,
                  warningThresholdDays: Number(event.target.value),
                })
              }
              className="mt-2 h-10 w-full rounded-lg border border-[#E5E7EB] bg-white px-3 text-sm outline-none focus:border-[#0F8F5F]"
            />
          </label>
        </div>
      ) : null}
    </section>
  );
}
