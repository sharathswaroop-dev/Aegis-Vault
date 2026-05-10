"use client";

import { motion } from "framer-motion";
import { User, ShieldAlert } from "lucide-react";

interface NomineeCardProps {
  name: string;
  relation: string;
  accessLevel: string;
  hasEmergencyAccess: boolean;
}

export function NomineeCard({ name, relation, accessLevel, hasEmergencyAccess }: NomineeCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -2 }}
      className="p-4 rounded-xl border border-[#E7E5E0] bg-[#FCFBF8] flex items-center justify-between cursor-pointer hover:shadow-sm transition-all"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#F5F3EE] flex items-center justify-center text-[#2E5E4E] border border-[#E7E5E0]">
          <User className="w-5 h-5" />
        </div>
        <div>
          <p className="text-sm font-semibold text-[#1D1D1D]">{name}</p>
          <p className="text-xs text-[#6B6B6B]">{relation}</p>
        </div>
      </div>
      <div className="flex flex-col items-end gap-1.5">
        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#2E5E4E]/5 text-[#2E5E4E] border border-[#2E5E4E]/10">
          {accessLevel}
        </span>
        {hasEmergencyAccess && (
          <div className="flex items-center gap-1 text-[#B85C5C]">
            <ShieldAlert className="w-3 h-3" />
            <span className="text-[10px] font-medium">Emergency Access</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
