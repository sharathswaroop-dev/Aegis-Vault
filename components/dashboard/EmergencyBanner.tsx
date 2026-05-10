"use client";

import { motion } from "framer-motion";
import { AlertTriangle, ChevronRight } from "lucide-react";

export function EmergencyBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-[#C68A2D]/10 border border-[#C68A2D]/30 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative overflow-hidden"
    >
      {/* Subtle pulse effect */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#C68A2D]" />
      
      <div className="flex items-start sm:items-center gap-3 pl-2">
        <div className="w-8 h-8 rounded-full bg-[#C68A2D]/20 flex items-center justify-center flex-shrink-0 mt-1 sm:mt-0">
          <AlertTriangle className="w-4 h-4 text-[#C68A2D]" />
        </div>
        <div>
          <h4 className="text-[15px] font-semibold text-[#1D1D1D]">Your family protection needs attention.</h4>
          <p className="text-sm text-[#6B6B6B]">Term Life Insurance for Sharath is expiring in 14 days.</p>
        </div>
      </div>

      <button className="flex items-center gap-1.5 text-sm font-medium text-[#C68A2D] hover:text-[#a87424] transition-colors ml-11 sm:ml-0 px-3 py-1.5 bg-white rounded-lg border border-[#C68A2D]/20 hover:bg-[#F5F3EE]">
        Review Policy <ChevronRight className="w-4 h-4" />
      </button>
    </motion.div>
  );
}
