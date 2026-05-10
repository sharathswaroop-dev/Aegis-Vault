"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface AIInsightCardProps {
  title: string;
  description: string;
  type?: "positive" | "warning" | "neutral";
  delay?: number;
}

export function AIInsightCard({ title, description, type = "neutral", delay = 0 }: AIInsightCardProps) {
  const getIndicatorColor = () => {
    switch (type) {
      case "positive": return "bg-[#4B7F52]";
      case "warning": return "bg-[#C6A969]";
      default: return "bg-[#2E5E4E]";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="p-4 rounded-xl bg-[#FCFBF8] border border-[#E7E5E0] flex gap-3 hover:border-[#C6A969]/50 transition-colors"
    >
      <div className={`w-2 h-2 mt-2 rounded-full ${getIndicatorColor()} flex-shrink-0 shadow-sm`} />
      <div className="flex-1">
        <div className="flex items-center gap-1.5 mb-1">
          <p className="text-[14px] font-semibold text-[#1D1D1D]">{title}</p>
          {type === "neutral" && <Sparkles className="w-3 h-3 text-[#C6A969]" />}
        </div>
        <p className="text-[13px] text-[#6B6B6B] leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}
