"use client";

import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface KpiCardProps {
  label: string;
  value: string;
  change: string;
  tone: "good" | "warn" | "neutral";
  index?: number;
  onClick?: () => void;
}

export function KpiCard({ label, value, change, tone, index = 0, onClick }: KpiCardProps) {
  const Icon = tone === "good" ? ArrowUpRight : tone === "warn" ? ArrowDownRight : Minus;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.04 }}
      className={cn(
        "surface-card hover-lift rounded-lg p-4",
        onClick && "cursor-pointer"
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-medium text-[#6B7280]">{label}</p>
        <span
          className={cn(
            "flex size-7 items-center justify-center rounded-md",
            tone === "good" && "bg-[#E8F5EE] text-[#0F8F5F]",
            tone === "warn" && "bg-amber-50 text-amber-700",
            tone === "neutral" && "bg-[#F1F3EE] text-[#6B7280]",
          )}
        >
          <Icon className="size-4" />
        </span>
      </div>
      <div className="mt-5 text-2xl font-semibold tracking-tight text-[#111827]">
        {value}
      </div>
      <p className="mt-1 text-xs font-medium text-[#6B7280]">{change}</p>
    </motion.div>
  );
}