"use client";

import { motion } from "framer-motion";

export default function Page() {
  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-semibold tracking-tight text-[#1D1D1D]">Reminders & Renewals</h2>
        <p className="text-[#6B6B6B] text-sm">Never miss an important family deadline.</p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="glass-panel rounded-2xl p-12 flex flex-col items-center justify-center text-center min-h-[400px]"
      >
        <div className="w-16 h-16 rounded-2xl bg-[#F5F3EE] border border-[#E7E5E0] flex items-center justify-center mb-6" />
        <h3 className="text-lg font-semibold text-[#1D1D1D] mb-2">Reminders & Renewals Module</h3>
        <p className="text-[#6B6B6B] max-w-md">
          This section is part of the upcoming rollout. Here, you will be able to manage your reminders & renewals 
          with AI-powered assistance and premium security.
        </p>
      </motion.div>
    </div>
  );
}
