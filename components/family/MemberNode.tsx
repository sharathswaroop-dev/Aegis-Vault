"use client";

import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, Clock, Lock, ShieldCheck } from "lucide-react";
import type { FamilyMember, AccessLevel } from "@/lib/familyRegistry";

const ACCESS_COLORS: Record<AccessLevel, { bg: string; text: string; dot: string }> = {
  "Full Control":        { bg: "#4B7F52/10", text: "#4B7F52", dot: "#4B7F52" },
  "View Only":           { bg: "#2E5E4E/10", text: "#2E5E4E", dot: "#2E5E4E" },
  "Restricted":          { bg: "#C6A969/10", text: "#C6A969", dot: "#C6A969" },
  "Locked":              { bg: "#6B6B6B/15", text: "#6B6B6B", dot: "#6B6B6B" },
  "Emergency Access":    { bg: "#B85C5C/10", text: "#B85C5C", dot: "#B85C5C" },
  "Timed Access":        { bg: "#C6A969/10", text: "#C6A969", dot: "#C6A969" },
  "Pending Verification":{ bg: "#6B6B6B/10", text: "#6B6B6B", dot: "#6B6B6B" },
};

const ACCESS_ICONS: Record<AccessLevel, React.ReactNode> = {
  "Full Control":        <ShieldCheck className="w-3 h-3" />,
  "View Only":           <CheckCircle2 className="w-3 h-3" />,
  "Restricted":          <AlertTriangle className="w-3 h-3" />,
  "Locked":              <Lock className="w-3 h-3" />,
  "Emergency Access":    <AlertTriangle className="w-3 h-3" />,
  "Timed Access":        <Clock className="w-3 h-3" />,
  "Pending Verification":<Clock className="w-3 h-3" />,
};

interface MemberNodeProps {
  member: FamilyMember;
  selected: boolean;
  onSelect: (id: string) => void;
}

export function MemberNode({ member, selected, onSelect }: MemberNodeProps) {
  const access = ACCESS_COLORS[member.accessLevel];
  const hasWarnings = member.warnings.length > 0;

  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => onSelect(member.id)}
      className={`relative flex flex-col items-center gap-3 p-5 rounded-2xl border-2 transition-all duration-200 w-44 text-center cursor-pointer group
        ${selected
          ? "border-[#2E5E4E] shadow-xl shadow-[#2E5E4E]/10 bg-gradient-to-b from-[#F5F3EE] to-[#FCFBF8]"
          : "border-[#E7E5E0] bg-[#FCFBF8] hover:border-[#2E5E4E]/40 hover:shadow-md"
        }`}
    >
      {/* Warning indicator */}
      {hasWarnings && (
        <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#C6A969] border-2 border-white flex items-center justify-center z-10">
          <span className="text-[8px] font-bold text-white">{member.warnings.length}</span>
        </div>
      )}

      {/* Minor badge */}
      {member.isMinor && (
        <div className="absolute -top-2 -left-2 z-10">
          <span className="text-[8px] font-bold uppercase tracking-wider bg-[#B85C5C] text-white px-1.5 py-0.5 rounded-full border border-white">
            Minor
          </span>
        </div>
      )}

      {/* Avatar */}
      <div className="relative">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-md transition-transform duration-200"
          style={{ backgroundColor: member.color }}
        >
          {member.initials}
        </div>
        {/* Verification ring */}
        <div
          className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm"
          style={{ backgroundColor: member.verificationState === "verified" ? "#4B7F52" : member.verificationState === "partial" ? "#C6A969" : "#B85C5C" }}
        >
          {member.verificationState === "verified" 
            ? <CheckCircle2 className="w-2.5 h-2.5 text-white" />
            : <Clock className="w-2.5 h-2.5 text-white" />
          }
        </div>
      </div>

      {/* Name & Role */}
      <div className="space-y-0.5">
        <p className="text-[13px] font-semibold text-[#1D1D1D] leading-tight">{member.name}</p>
        <p className="text-[10px] text-[#6B6B6B] uppercase tracking-wide leading-tight">{member.governanceRole}</p>
        {member.trustAllocation && (
          <p className="text-[11px] font-bold mt-1" style={{ color: member.color === "#1D1D1D" ? "#C6A969" : member.color }}>
            {member.trustAllocation} Trust
          </p>
        )}
      </div>

      {/* Access badge */}
      <div
        className="flex items-center gap-1 px-2 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider"
        style={{ backgroundColor: `${access.dot}18`, color: access.text }}
      >
        {ACCESS_ICONS[member.accessLevel]}
        {member.accessLevel}
      </div>
    </motion.button>
  );
}
