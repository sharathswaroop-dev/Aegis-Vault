import { useState } from "react";
import { AlertTriangle, ChevronDown, CheckCircle2 } from "lucide-react";
import { SKUSegment, DemandPattern } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/toast";

interface ModelIndicatorProps {
  segment: SKUSegment;
}

export function ModelIndicator({ segment }: ModelIndicatorProps) {
  const { addToast } = useToast();
  const [currentModel, setCurrentModel] = useState(segment.model);

  const models = ["Moving Average", "Prophet", "ARIMA", "ML Ensemble"];

  const handleModelChange = (model: string) => {
    setCurrentModel(model);
    addToast({
      title: "Model updated",
      description: `Model updated for ${segment.sku} — forecast will refresh`,
      variant: "success",
    });
  };

  const isLowConfidence = segment.confidence === "low" || segment.confidence === "medium";

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-[#E5E7EB] bg-[#F7F8F4] p-4">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-[#6B7280]">Model:</span>
            <span className="font-semibold text-[#111827]">{currentModel}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#6B7280]">Pattern:</span>
            <span className="font-semibold text-[#111827] capitalize">{segment.pattern}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#6B7280]">Data history:</span>
            <span className="font-semibold text-[#111827]">{segment.historyWeeks} weeks</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#6B7280]">Confidence:</span>
            <div className="flex items-center gap-1.5">
              <span className={cn(
                "font-semibold capitalize",
                segment.confidence === "high" ? "text-[#0F8F5F]" : 
                segment.confidence === "medium" ? "text-amber-600" : "text-red-600"
              )}>
                {segment.confidence}
              </span>
              {segment.confidence === "high" ? (
                <CheckCircle2 className="size-4 text-[#0F8F5F]" />
              ) : (
                <AlertTriangle className="size-4 text-amber-600" />
              )}
            </div>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="bg-white">
              Override Model <ChevronDown className="ml-2 size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {models.map((m) => (
              <DropdownMenuItem key={m} onClick={() => handleModelChange(m)}>
                {m}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {isLowConfidence && (
        <div className="flex items-center gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          <AlertTriangle className="size-5 shrink-0 text-amber-600" />
          <p>
            Limited data history — forecast may be unreliable. Consider manual review.
          </p>
        </div>
      )}
    </div>
  );
}
