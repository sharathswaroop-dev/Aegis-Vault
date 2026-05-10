"use client";

import { motion } from "framer-motion";
import { Landmark, Building2, ShieldCheck, CreditCard, Coins, Landmark as Loan, FileCheck, FileX, AlertCircle, Clock } from "lucide-react";

export interface AssetCardProps {
  name: string;
  type: "bank" | "property" | "insurance" | "investment" | "gold" | "loan";
  value: string;
  nomineeStatus: "complete" | "missing" | "pending";
  documentStatus: "complete" | "missing" | "pending";
  expiryDate?: string;
}

export function AssetCard({ name, type, value, nomineeStatus, documentStatus, expiryDate }: AssetCardProps) {
  const getIcon = () => {
    switch (type) {
      case "bank": return <Landmark className="w-5 h-5 text-[#2E5E4E]" />;
      case "property": return <Building2 className="w-5 h-5 text-[#2E5E4E]" />;
      case "insurance": return <ShieldCheck className="w-5 h-5 text-[#2E5E4E]" />;
      case "investment": return <CreditCard className="w-5 h-5 text-[#2E5E4E]" />;
      case "gold": return <Coins className="w-5 h-5 text-[#2E5E4E]" />;
      case "loan": return <Loan className="w-5 h-5 text-[#2E5E4E]" />;
    }
  };

  const getStatusBadge = (status: string, completeText: string, missingText: string, iconType: "user" | "doc") => {
    if (status === "complete") {
      return (
        <span className="flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#4B7F52]/10 text-[#4B7F52]">
          {iconType === "doc" ? <FileCheck className="w-3 h-3" /> : null} {completeText}
        </span>
      );
    }
    if (status === "missing") {
      return (
        <span className="flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#B85C5C]/10 text-[#B85C5C]">
          {iconType === "doc" ? <FileX className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />} {missingText}
        </span>
      );
    }
    return (
      <span className="flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#C6A969]/10 text-[#C6A969]">
        Action Required
      </span>
    );
  };

  return (
    <motion.div 
      whileHover={{ y: -2 }}
      className="p-4 rounded-xl border border-[#E7E5E0] bg-[#FCFBF8] flex flex-col gap-4 cursor-pointer hover:shadow-sm transition-all"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#F5F3EE] flex items-center justify-center border border-[#E7E5E0]/50">
            {getIcon()}
          </div>
          <div>
            <p className="text-sm font-semibold text-[#1D1D1D]">{name}</p>
            <p className="text-[11px] text-[#6B6B6B] uppercase tracking-wider">{type}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[15px] font-semibold text-[#1D1D1D]">{value}</p>
          {type === "loan" && <p className="text-[10px] text-[#B85C5C] uppercase tracking-wider mt-0.5">Liability</p>}
        </div>
      </div>
      
      <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-[#E7E5E0]/50">
        {getStatusBadge(nomineeStatus, "Nominees Added", "Nominee Missing", "user")}
        {getStatusBadge(documentStatus, "Docs Verified", "Docs Missing", "doc")}
        {expiryDate && (
          <span className="flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#E7E5E0]/50 text-[#6B6B6B]">
            <Clock className="w-3 h-3" /> Exp: {expiryDate}
          </span>
        )}
      </div>
    </motion.div>
  );
}
