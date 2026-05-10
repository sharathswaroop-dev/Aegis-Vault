"use client";

import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";

interface ReminderCardProps {
  title: string;
  date: string;
  urgency: "high" | "medium" | "low";
}

export function ReminderCard({ title, date, urgency }: ReminderCardProps) {
  const getUrgencyColor = () => {
    switch (urgency) {
      case "high": return "text-[#B85C5C] bg-[#B85C5C]/10";
      case "medium": return "text-[#C6A969] bg-[#C6A969]/10";
      case "low": return "text-[#2E5E4E] bg-[#2E5E4E]/10";
    }
  };

  return (
    <motion.div 
      whileHover={{ y: -2 }}
      className="p-4 rounded-xl border border-[#E7E5E0] bg-[#FCFBF8] flex items-start gap-3 cursor-pointer hover:shadow-sm transition-all"
    >
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${getUrgencyColor()}`}>
        <Calendar className="w-4 h-4" />
      </div>
      <div>
        <p className="text-[14px] font-semibold text-[#1D1D1D] leading-tight">{title}</p>
        <div className="flex items-center gap-1.5 mt-1.5 text-[#6B6B6B]">
          <Clock className="w-3.5 h-3.5" />
          <p className="text-[12px]">{date}</p>
        </div>
      </div>
    </motion.div>
  );
}
