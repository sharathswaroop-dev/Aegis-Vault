import { SKUSegment } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Info } from "lucide-react";

interface ConfidenceMeterProps {
  segment: SKUSegment;
}

export function ConfidenceMeter({ segment }: ConfidenceMeterProps) {
  const { confidence, historyWeeks, variability } = segment;

  const getConfidenceColor = () => {
    if (confidence === "high") return "bg-[#0F8F5F]";
    if (confidence === "medium") return "bg-amber-500";
    return "bg-red-500";
  };

  const getPosition = () => {
    if (confidence === "high") return "90%";
    if (confidence === "medium") return "50%";
    return "15%";
  };

  return (
    <div className="space-y-4 rounded-lg border border-[#E5E7EB] bg-white p-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-[#111827]">Forecast Confidence</h4>
        <span className={cn(
          "rounded-full px-2 py-0.5 text-xs font-bold uppercase tracking-wider",
          confidence === "high" ? "bg-[#E8F5EE] text-[#0F8F5F]" : 
          confidence === "medium" ? "bg-amber-50 text-amber-700" : "bg-red-50 text-red-700"
        )}>
          {confidence}
        </span>
      </div>

      <div className="relative h-2 w-full overflow-hidden rounded-full bg-[#F1F3EE]">
        <div className="absolute inset-y-0 left-0 w-1/3 bg-red-100/50" />
        <div className="absolute inset-y-0 left-1/3 w-1/3 bg-amber-100/50" />
        <div className="absolute inset-y-0 left-2/3 w-1/3 bg-green-100/50" />
        <div 
          className={cn("absolute inset-y-0 h-full rounded-full transition-all duration-1000", getConfidenceColor())}
          style={{ width: getPosition() }}
        />
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
        <div className="flex items-center justify-between">
          <span className="text-[#6B7280]">Data history:</span>
          <span className="font-medium text-[#111827]">{historyWeeks} weeks</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[#6B7280]">Demand variability:</span>
          <span className="font-medium text-[#111827] capitalize">{variability}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[#6B7280]">Missing data:</span>
          <span className="font-medium text-[#111827]">{variability === "high" ? "12%" : "2%"}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[#6B7280]">CoV Score:</span>
          <span className="font-medium text-[#111827]">{variability === "high" ? "0.84" : "0.12"}</span>
        </div>
      </div>

      {confidence === "low" && (
        <div className="flex gap-2 rounded-md bg-blue-50 p-3 text-xs text-blue-800">
          <Info className="size-4 shrink-0 text-blue-600" />
          <p>
            <strong>Tip:</strong> This SKU has limited history. Start with a simple moving average and upgrade the model after 3 more months of data.
          </p>
        </div>
      )}
    </div>
  );
}
