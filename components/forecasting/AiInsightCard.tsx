import { Bot, Sparkles } from "lucide-react";

interface AiInsightCardProps {
  insight: string;
  index?: number;
}

export function AiInsightCard({ insight, index = 0 }: AiInsightCardProps) {
  return (
    <div className="rounded-lg border border-[#E5E7EB] bg-white p-4">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex size-8 items-center justify-center rounded-lg bg-[#E8F5EE] text-[#0F8F5F]">
          {index === 0 ? <Sparkles className="size-4" /> : <Bot className="size-4" />}
        </div>
        <div>
          <p className="text-sm font-semibold text-[#111827]">AI Recommendation</p>
          <p className="mt-1 text-sm leading-6 text-[#6B7280]">{insight}</p>
        </div>
      </div>
    </div>
  );
}
