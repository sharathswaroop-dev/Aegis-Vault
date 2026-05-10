"use client";

import { motion } from "framer-motion";
import { UploadCloud } from "lucide-react";

interface UploadAreaProps {
  label?: string;
}

export function UploadArea({ label = "Drag & drop your files here" }: UploadAreaProps) {
  return (
    <motion.div 
      whileHover={{ scale: 1.01 }}
      className="w-full border-2 border-dashed border-[#E7E5E0] bg-[#FCFBF8] rounded-2xl p-10 flex flex-col items-center justify-center cursor-pointer hover:border-[#2E5E4E]/40 hover:bg-[#F5F3EE]/50 transition-colors group"
    >
      <div className="w-14 h-14 rounded-full bg-[#F5F3EE] flex items-center justify-center mb-4 group-hover:bg-[#FCFBF8] transition-colors shadow-sm">
        <UploadCloud className="w-6 h-6 text-[#2E5E4E]" />
      </div>
      <h3 className="text-base font-semibold text-[#1D1D1D] mb-1">{label}</h3>
      <p className="text-sm text-[#6B6B6B]">or click to browse from your computer</p>
      <div className="mt-4 flex gap-4 text-[11px] font-medium text-[#6B6B6B] uppercase tracking-wider">
        <span>PDF</span>
        <span>JPG</span>
        <span>PNG</span>
        <span>DOCX</span>
      </div>
    </motion.div>
  );
}
