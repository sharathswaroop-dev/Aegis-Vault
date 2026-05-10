"use client";

import { motion } from "framer-motion";
import { ShieldCheck, AlertCircle } from "lucide-react";

export function FamilyReadiness() {
  const score = 82;
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="glass-panel rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden"
    >
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#C6A969]/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3" />

      {/* Progress Ring */}
      <div className="relative flex items-center justify-center">
        <svg className="w-32 h-32 transform -rotate-90">
          {/* Background circle */}
          <circle
            cx="64"
            cy="64"
            r="45"
            fill="none"
            stroke="#E7E5E0"
            strokeWidth="8"
          />
          {/* Progress circle */}
          <motion.circle
            cx="64"
            cy="64"
            r="45"
            fill="none"
            stroke="#2E5E4E"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="text-3xl font-bold text-[#1D1D1D]">{score}%</span>
          <span className="text-[10px] uppercase tracking-widest text-[#6B6B6B] font-semibold">Protected</span>
        </div>
      </div>

      {/* Details */}
      <div className="flex-1 space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-[#1D1D1D]">Family Readiness Score</h2>
          <p className="text-sm text-[#6B6B6B] mt-1">Your family's emotional and financial continuity plan is in good shape. Just a few things missing.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
          <div className="flex items-center gap-2.5 bg-[#FCFBF8] border border-[#E7E5E0] px-3 py-2 rounded-lg">
            <ShieldCheck className="w-4 h-4 text-[#4B7F52]" />
            <span className="text-sm font-medium text-[#1D1D1D]">Insurance Protected</span>
          </div>
          <div className="flex items-center gap-2.5 bg-[#FCFBF8] border border-[#E7E5E0] px-3 py-2 rounded-lg">
            <ShieldCheck className="w-4 h-4 text-[#4B7F52]" />
            <span className="text-sm font-medium text-[#1D1D1D]">Nominees Complete</span>
          </div>
          <div className="flex items-center gap-2.5 bg-[#FCFBF8] border border-[#E7E5E0] px-3 py-2 rounded-lg">
            <ShieldCheck className="w-4 h-4 text-[#4B7F52]" />
            <span className="text-sm font-medium text-[#1D1D1D]">Emergency Contacts Added</span>
          </div>
          <div className="flex items-center gap-2.5 bg-[#FCFBF8] border border-[#B85C5C]/20 px-3 py-2 rounded-lg">
            <AlertCircle className="w-4 h-4 text-[#B85C5C]" />
            <span className="text-sm font-medium text-[#1D1D1D]">2 Documents Missing</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
