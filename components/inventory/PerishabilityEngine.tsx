import { CalendarClock } from "lucide-react";
import { batchExpiries, shelfLifeRules } from "@/lib/mock-data";
import { EmptyState } from "@/components/shared/EmptyState";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import type { BatchExpiry } from "@/lib/types";
import { cn } from "@/lib/utils";

function urgency(daysRemaining: number) {
  if (daysRemaining < 3) return { label: "Red", className: "bg-red-50 text-red-700" };
  if (daysRemaining <= 7) return { label: "Amber", className: "bg-amber-50 text-amber-700" };
  return { label: "Green", className: "bg-[#E8F5EE] text-[#0C7A51]" };
}

interface PerishabilityEngineProps {
  batches?: BatchExpiry[];
  isLoading?: boolean;
}

export function PerishabilityEngine({ batches = batchExpiries, isLoading = false }: PerishabilityEngineProps) {
  return (
    <section className="surface-card rounded-lg p-5">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold text-[#111827]">Perishability Engine</h3>
          <p className="mt-1 text-sm text-[#6B7280]">
            Per-SKU expiry monitoring with shelf-life rules by category.
          </p>
        </div>
        <CalendarClock className="size-5 text-[#0F8F5F]" />
      </div>

      {shelfLifeRules.length ? (
        <div className="mb-5 flex flex-wrap gap-2">
          {shelfLifeRules.map((rule) => (
            <span key={rule.category} className="rounded-full bg-[#F1F3EE] px-3 py-1 text-xs font-semibold text-[#111827]">
              {rule.category}: {rule.maxAgeDays}d
            </span>
          ))}
        </div>
      ) : null}

      {isLoading ? (
        <TableSkeleton rows={5} columns={5} />
      ) : batches.length === 0 ? (
        <EmptyState heading="No expiring batches" subtext="Batch expiry records will appear when inventory is loaded." />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-[#F7F8F4] text-xs uppercase tracking-wide text-[#6B7280]">
              <tr>
                <th className="px-4 py-3 font-semibold">SKU</th>
                <th className="px-4 py-3 font-semibold">Batch ID</th>
                <th className="px-4 py-3 font-semibold">Quantity</th>
                <th className="px-4 py-3 font-semibold">Expiry Date</th>
                <th className="px-4 py-3 font-semibold">Urgency Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {batches.map((batch) => {
                const score = urgency(batch.daysRemaining);
                return (
                  <tr key={`${batch.sku}-${batch.batchId}`}>
                    <td className="px-4 py-4 font-mono text-xs text-[#6B7280]">{batch.sku}</td>
                    <td className="px-4 py-4 font-semibold text-[#111827]">{batch.batchId}</td>
                    <td className="px-4 py-4 text-[#6B7280]">{batch.quantity}</td>
                    <td className="px-4 py-4 text-[#6B7280]">{batch.expiryDate}</td>
                    <td className="px-4 py-4">
                      <span className={cn("rounded-full px-2.5 py-1 text-xs font-semibold", score.className)}>
                        {score.label} - {batch.daysRemaining}d
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
