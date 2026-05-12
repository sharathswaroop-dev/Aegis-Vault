import { Badge } from "@/components/ui/badge";
import { DemandPattern } from "@/lib/types";
import { cn } from "@/lib/utils";

interface DemandPatternBadgeProps {
  pattern: DemandPattern;
  className?: string;
}

const patternConfig: Record<DemandPattern, { label: string; className: string }> = {
  stable: {
    label: "Stable",
    className: "bg-green-50 text-green-700 border-green-200",
  },
  seasonal: {
    label: "Seasonal",
    className: "bg-amber-50 text-amber-700 border-amber-200",
  },
  intermittent: {
    label: "Intermittent",
    className: "bg-orange-50 text-orange-700 border-orange-200",
  },
  "long-tail": {
    label: "Long Tail",
    className: "bg-red-50 text-red-700 border-red-200",
  },
};

export function DemandPatternBadge({ pattern, className }: DemandPatternBadgeProps) {
  const config = patternConfig[pattern];
  
  return (
    <Badge 
      variant="outline" 
      className={cn("font-medium", config.className, className)}
    >
      {config.label}
    </Badge>
  );
}
