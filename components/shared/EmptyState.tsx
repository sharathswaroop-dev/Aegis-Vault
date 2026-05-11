import { Inbox } from "lucide-react";

interface EmptyStateProps {
  heading: string;
  subtext: string;
}

export function EmptyState({ heading, subtext }: EmptyStateProps) {
  return (
    <div className="flex min-h-40 flex-col items-center justify-center rounded-lg border border-dashed border-[#E5E7EB] bg-[#F7F8F4] p-6 text-center">
      <Inbox className="size-8 text-[#6B7280]" />
      <h4 className="mt-3 text-sm font-semibold text-[#111827]">{heading}</h4>
      <p className="mt-1 max-w-sm text-sm text-[#6B7280]">{subtext}</p>
    </div>
  );
}
