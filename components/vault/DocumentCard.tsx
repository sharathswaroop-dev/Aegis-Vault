"use client";

import { motion } from "framer-motion";
import { FileText, MoreVertical, ShieldCheck, Lock } from "lucide-react";

interface DocumentCardProps {
  name: string;
  dateAdded: string;
  size: string;
  isEncrypted?: boolean;
}

export function DocumentCard({ name, dateAdded, size, isEncrypted = true }: DocumentCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -2 }}
      className="p-4 rounded-xl border border-[#E7E5E0] bg-[#FCFBF8] flex items-center justify-between group cursor-pointer hover:shadow-sm transition-all"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-[#F5F3EE] flex items-center justify-center border border-[#E7E5E0]/50 group-hover:border-[#C6A969]/30 transition-colors">
          <FileText className="w-5 h-5 text-[#2E5E4E]" />
        </div>
        <div>
          <p className="text-sm font-semibold text-[#1D1D1D] truncate max-w-[180px] sm:max-w-[250px]">{name}</p>
          <div className="flex items-center gap-2 mt-0.5 text-[11px] text-[#6B6B6B]">
            <span>{dateAdded}</span>
            <span className="w-1 h-1 rounded-full bg-[#E7E5E0]" />
            <span>{size}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        {isEncrypted ? (
          <div className="hidden sm:flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#4B7F52]/10 text-[#4B7F52]">
            <ShieldCheck className="w-3 h-3" /> Encrypted
          </div>
        ) : (
          <div className="hidden sm:flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#C6A969]/10 text-[#C6A969]">
            <Lock className="w-3 h-3" /> Private
          </div>
        )}
        <button className="p-1.5 rounded-md text-[#6B6B6B] hover:bg-[#E7E5E0] hover:text-[#1D1D1D] transition-colors">
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}
