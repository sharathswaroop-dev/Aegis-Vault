"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface StatCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  trend?: {
    value: string;
    isPositive: boolean;
    text: string;
  };
  delay?: number;
}

export function StatCard({ title, value, icon, trend, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className="glass-panel rounded-2xl p-6 flex flex-col justify-between hover-lift"
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-[#6B6B6B]">{title}</span>
        <div className="w-10 h-10 rounded-full bg-[#F5F3EE] flex items-center justify-center text-[#2E5E4E]">
          {icon}
        </div>
      </div>
      
      <div>
        <h3 className="text-3xl font-semibold text-[#1D1D1D] tracking-tight">{value}</h3>
        {trend && (
          <div className="flex items-center gap-2 mt-2">
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
              trend.isPositive ? "bg-[#4B7F52]/10 text-[#4B7F52]" : "bg-[#B85C5C]/10 text-[#B85C5C]"
            }`}>
              {trend.value}
            </span>
            <span className="text-xs text-[#6B6B6B]">{trend.text}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
