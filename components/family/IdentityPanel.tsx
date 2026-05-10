"use client";

import { motion } from "framer-motion";
import { 
  X, ShieldCheck, AlertTriangle, CheckCircle2, Clock, 
  Lock, Phone, Mail, ArrowRight, Landmark, FileCheck, TrendingUp, Building2
} from "lucide-react";
import type { FamilyMember } from "@/lib/familyRegistry";

const ASSET_ICONS: Record<string, React.ReactNode> = {
  property: <Building2 className="w-3.5 h-3.5" />,
  insurance: <ShieldCheck className="w-3.5 h-3.5" />,
  investment: <TrendingUp className="w-3.5 h-3.5" />,
  bank: <Landmark className="w-3.5 h-3.5" />,
  gold: <FileCheck className="w-3.5 h-3.5" />,
  trust: <Lock className="w-3.5 h-3.5" />,
};

const CONDITION_COLORS = {
  locked: { bg: "#E7E5E0", text: "#6B6B6B", dot: "#6B6B6B" },
  active: { bg: "#4B7F52", text: "#FCFBF8", dot: "#4B7F52" },
  released: { bg: "#2E5E4E", text: "#FCFBF8", dot: "#2E5E4E" },
};

interface IdentityPanelProps {
  member: FamilyMember;
  onClose: () => void;
}

export function IdentityPanel({ member, onClose }: IdentityPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 32 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 32 }}
      transition={{ type: "spring", stiffness: 400, damping: 35 }}
      className="w-full h-full flex flex-col overflow-y-auto bg-[#FCFBF8] border-l border-[#E7E5E0] scrollbar-hide"
    >
      {/* Panel Header */}
      <div className="sticky top-0 z-10 bg-[#FCFBF8]/95 backdrop-blur-md border-b border-[#E7E5E0] p-5 flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-md flex-shrink-0"
            style={{ backgroundColor: member.color }}
          >
            {member.initials}
          </div>
          <div>
            <p className="text-base font-bold text-[#1D1D1D]">{member.name}</p>
            <p className="text-xs text-[#6B6B6B]">{member.relationshipLabel}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-xl hover:bg-[#E7E5E0] transition-colors text-[#6B6B6B] hover:text-[#1D1D1D]"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="p-5 space-y-6 flex-1">

        {/* Warnings */}
        {member.warnings.length > 0 && (
          <div className="space-y-2">
            {member.warnings.map((w, i) => (
              <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-[#C6A969]/10 border border-[#C6A969]/20">
                <AlertTriangle className="w-3.5 h-3.5 text-[#C6A969] mt-0.5 flex-shrink-0" />
                <p className="text-[11px] text-[#C6A969] leading-snug">{w}</p>
              </div>
            ))}
          </div>
        )}

        {/* Identity Summary */}
        <Section title="Identity">
          <InfoRow label="Governance Role" value={member.governanceRole} />
          <InfoRow 
            label="Verification" 
            value={member.verificationState}
            valueStyle={
              member.verificationState === "verified" ? "text-[#4B7F52] font-semibold capitalize" 
              : member.verificationState === "unverified" ? "text-[#B85C5C] font-semibold capitalize"
              : "text-[#C6A969] font-semibold capitalize"
            }
          />
          <InfoRow label="Access Level" value={member.accessLevel} />
          {member.isMinor && (
            <InfoRow label="Status" value="Protected Minor" valueStyle="text-[#B85C5C] font-semibold" />
          )}
        </Section>

        {/* Trust & Inheritance */}
        {(member.trustAllocation || member.trustRole) && (
          <Section title="Trust & Inheritance">
            {member.trustAllocation && (
              <InfoRow label="Allocation" value={member.trustAllocation} valueStyle="text-[#2E5E4E] font-bold text-base" />
            )}
            {member.trustRole && (
              <InfoRow label="Trust Role" value={member.trustRole} />
            )}
            {member.inheritanceConditions.map((c, i) => (
              <div key={i} className="flex items-start gap-3 mt-3 p-3 rounded-xl border border-[#E7E5E0] bg-[#F5F3EE]">
                <div
                  className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                  style={{ backgroundColor: CONDITION_COLORS[c.status].dot }}
                />
                <div className="flex-1">
                  <p className="text-[11px] text-[#1D1D1D] leading-snug">{c.description}</p>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <span
                      className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded"
                      style={{
                        backgroundColor: `${CONDITION_COLORS[c.status].dot}20`,
                        color: CONDITION_COLORS[c.status].dot === "#6B6B6B" ? "#6B6B6B" : CONDITION_COLORS[c.status].dot,
                      }}
                    >
                      {c.status}
                    </span>
                    <ArrowRight className="w-2.5 h-2.5 text-[#6B6B6B]" />
                    <span className="text-[9px] text-[#6B6B6B] font-medium">{c.triggerValue}</span>
                  </div>
                </div>
              </div>
            ))}
          </Section>
        )}

        {/* System Roles */}
        {member.systemRoles.length > 0 && (
          <Section title="System Roles">
            <div className="flex flex-wrap gap-2">
              {member.systemRoles.map((r) => (
                <span
                  key={r}
                  className="text-[10px] font-bold uppercase tracking-wider bg-[#2E5E4E]/10 text-[#2E5E4E] px-2 py-1 rounded-lg border border-[#2E5E4E]/10"
                >
                  {r}
                </span>
              ))}
            </div>
          </Section>
        )}

        {/* Linked Assets */}
        {member.linkedAssets.length > 0 && (
          <Section title="Linked Assets">
            <div className="space-y-2">
              {member.linkedAssets.map((asset, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-[#E7E5E0] bg-[#F5F3EE]">
                  <div className="flex items-center gap-2.5">
                    <div className="text-[#2E5E4E]">{ASSET_ICONS[asset.type]}</div>
                    <span className="text-xs font-medium text-[#1D1D1D]">{asset.name}</span>
                  </div>
                  <span className="text-xs font-bold text-[#2E5E4E]">{asset.value}</span>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Contact */}
        {(member.phone || member.email) && (
          <Section title="Contact">
            {member.phone && (
              <div className="flex items-center gap-2.5 text-sm text-[#6B6B6B]">
                <Phone className="w-3.5 h-3.5" /> {member.phone}
              </div>
            )}
            {member.email && (
              <div className="flex items-center gap-2.5 text-sm text-[#6B6B6B] mt-2">
                <Mail className="w-3.5 h-3.5" /> {member.email}
              </div>
            )}
          </Section>
        )}

      </div>

      {/* Panel Footer */}
      <div className="sticky bottom-0 p-5 border-t border-[#E7E5E0] bg-[#FCFBF8]/95 backdrop-blur-md flex gap-3">
        <button className="flex-1 py-2.5 border border-[#E7E5E0] text-[#1D1D1D] rounded-xl text-sm font-medium hover:bg-[#F5F3EE] transition-colors">
          Edit Identity
        </button>
        <button className="flex-1 py-2.5 bg-[#2E5E4E] text-white rounded-xl text-sm font-medium hover:bg-[#1f4236] transition-colors shadow-sm">
          Configure Access
        </button>
      </div>
    </motion.div>
  );
}

// ─── Small helpers ────────────────────────────────────────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-wider text-[#6B6B6B] mb-3">{title}</p>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

function InfoRow({ label, value, valueStyle }: { label: string; value: string; valueStyle?: string }) {
  return (
    <div className="flex items-center justify-between py-1.5 border-b border-[#E7E5E0]/60 last:border-0">
      <span className="text-xs text-[#6B6B6B]">{label}</span>
      <span className={`text-xs text-[#1D1D1D] font-medium ${valueStyle ?? ""}`}>{value}</span>
    </div>
  );
}
