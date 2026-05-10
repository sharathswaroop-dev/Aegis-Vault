"use client";

import { motion } from "framer-motion";
import { Folder } from "lucide-react";

interface VaultFolderProps {
  name: string;
  itemCount: number;
  color?: string;
}

export function VaultFolder({ name, itemCount, color = "#2E5E4E" }: VaultFolderProps) {
  return (
    <motion.div 
      whileHover={{ y: -2 }}
      className="p-4 rounded-xl border border-[#E7E5E0] bg-[#FCFBF8] flex flex-col gap-3 cursor-pointer hover:shadow-sm transition-all"
    >
      <div className="flex items-center justify-between">
        <div 
          className="w-10 h-10 rounded-lg flex items-center justify-center shadow-sm"
          style={{ backgroundColor: `${color}15`, color: color }}
        >
          <Folder className="w-5 h-5" fill={`${color}20`} />
        </div>
        <span className="text-xs font-medium text-[#6B6B6B] bg-[#F5F3EE] px-2 py-0.5 rounded-full border border-[#E7E5E0]">
          {itemCount} items
        </span>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-[#1D1D1D]">{name}</h3>
      </div>
    </motion.div>
  );
}
