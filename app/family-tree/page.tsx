"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Network, Sparkles, Users, CheckCircle2, AlertTriangle } from "lucide-react";
import { 
  FAMILY_REGISTRY, 
  computeGovernanceScore, 
  getRegistryAlerts 
} from "@/lib/familyRegistry";
import { MemberNode } from "@/components/family/MemberNode";
import { IdentityPanel } from "@/components/family/IdentityPanel";

export default function FamilyTreePage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = FAMILY_REGISTRY.find((m) => m.id === selectedId) ?? null;

  const owner   = FAMILY_REGISTRY.find((m) => m.tier === 0)!;
  const tier1   = FAMILY_REGISTRY.filter((m) => m.tier === 1);
  const tier2   = FAMILY_REGISTRY.filter((m) => m.tier === 2);
  const score   = computeGovernanceScore(FAMILY_REGISTRY);
  const alerts  = getRegistryAlerts(FAMILY_REGISTRY);

  const handleSelect = (id: string) =>
    setSelectedId((prev) => (prev === id ? null : id));

  return (
    <div className="flex gap-0 h-[calc(100vh-120px)] overflow-hidden -mx-6 -my-4 sm:-mx-8">

      {/* ── Main Canvas ── */}
      <div className={`flex-1 overflow-y-auto transition-all duration-300 ${selected ? "pr-0" : ""} p-6 sm:p-8 space-y-8`}>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E7E5E0] pb-6">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-[#1D1D1D] flex items-center gap-2">
              Family Identity Registry <Network className="w-5 h-5 text-[#2E5E4E]" />
            </h2>
            <p className="text-[#6B6B6B] text-sm mt-1">
              The master relationship and governance layer for all Aegis Vault modules.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 glass-panel px-4 py-2 rounded-xl">
              <div className={`w-2 h-2 rounded-full ${score >= 80 ? "bg-[#4B7F52]" : "bg-[#C6A969] animate-pulse"}`} />
              <span className="text-sm font-bold text-[#1D1D1D]">{score}%</span>
              <span className="text-xs text-[#6B6B6B]">Governance Score</span>
            </div>
            <button className="flex items-center gap-2 bg-[#2E5E4E] text-[#FCFBF8] px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#1f4236] transition-colors shadow-sm">
              <Users className="w-4 h-4" /> Add Member
            </button>
          </div>
        </div>

        {/* Governance Alerts */}
        {alerts.length > 0 && (
          <div className="glass-panel rounded-2xl p-5 border border-[#C6A969]/30 bg-[#C6A969]/5">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-[#C6A969]" />
              <span className="text-sm font-semibold text-[#1D1D1D]">Governance Intelligence</span>
              <span className="ml-auto text-[10px] font-bold uppercase tracking-wider text-[#C6A969] bg-[#C6A969]/20 px-2 py-0.5 rounded-full">
                {alerts.length} Alert{alerts.length > 1 ? "s" : ""}
              </span>
            </div>
            <div className="space-y-2">
              {alerts.map((alert, i) => (
                <div key={i} className="flex items-start gap-2">
                  <AlertTriangle className="w-3.5 h-3.5 text-[#C6A969] mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-[#6B6B6B] leading-relaxed">{alert}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Family Graph ── */}
        <div className="glass-panel rounded-3xl p-6 md:p-8 relative overflow-hidden">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 rounded-xl bg-[#2E5E4E]/10">
              <Network className="w-5 h-5 text-[#2E5E4E]" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#1D1D1D]">Relationship Map</h3>
              <p className="text-xs text-[#6B6B6B] mt-0.5">Click any node to inspect identity, roles, and linked assets.</p>
            </div>
            {selectedId && (
              <button onClick={() => setSelectedId(null)} className="ml-auto text-xs text-[#6B6B6B] hover:text-[#1D1D1D] underline">
                Clear
              </button>
            )}
          </div>

          <div className="flex flex-col items-center gap-0 select-none">
            
            {/* Tier 0 — Owner */}
            <div className="flex justify-center">
              <MemberNode member={owner} selected={selectedId === owner.id} onSelect={handleSelect} />
            </div>

            {/* Connector ↓ */}
            <GraphLine />

            {/* Tier 1 row */}
            <div className="relative flex justify-center gap-6 flex-wrap">
              {/* Horizontal bar connecting nodes (desktop) */}
              <div className="hidden lg:block absolute top-[-1px] left-[calc(50%-theme(spacing.56))] right-[calc(50%-theme(spacing.56))] h-px bg-[#E7E5E0]" />
              {tier1.map((m) => (
                <div key={m.id} className="flex flex-col items-center">
                  <GraphLine short />
                  <MemberNode member={m} selected={selectedId === m.id} onSelect={handleSelect} />
                </div>
              ))}
            </div>

            {/* Children section */}
            {tier2.length > 0 && (
              <>
                <div className="flex flex-col items-center gap-0 mt-6">
                  <GraphLine />
                  <div className="flex items-center gap-3 py-2">
                    <div className="h-px w-16 bg-[#E7E5E0]" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#6B6B6B] bg-[#F5F3EE] px-3 py-1 rounded-full border border-[#E7E5E0]">
                      Next Generation
                    </span>
                    <div className="h-px w-16 bg-[#E7E5E0]" />
                  </div>
                  <GraphLine />
                </div>

                <div className="flex justify-center gap-6 flex-wrap">
                  {tier2.map((m) => (
                    <div key={m.id} className="flex flex-col items-center">
                      <GraphLine short />
                      <MemberNode member={m} selected={selectedId === m.id} onSelect={handleSelect} />
                    </div>
                  ))}
                </div>
              </>
            )}

          </div>
        </div>

        {/* ── Registry Table ── */}
        <div className="glass-panel rounded-3xl overflow-hidden">
          <div className="px-6 py-5 border-b border-[#E7E5E0] flex items-center justify-between">
            <h3 className="text-base font-semibold text-[#1D1D1D]">Full Identity Registry</h3>
            <span className="text-xs text-[#6B6B6B]">{FAMILY_REGISTRY.length} members</span>
          </div>
          <div className="divide-y divide-[#E7E5E0]">
            {FAMILY_REGISTRY.map((m) => (
              <motion.button
                key={m.id}
                onClick={() => handleSelect(m.id)}
                whileHover={{ backgroundColor: "#F5F3EE" }}
                className={`w-full flex items-center gap-4 px-6 py-4 text-left transition-colors ${selectedId === m.id ? "bg-[#F5F3EE]" : "bg-transparent"}`}
              >
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0 shadow-sm"
                  style={{ backgroundColor: m.color }}
                >
                  {m.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#1D1D1D] flex items-center gap-2">
                    {m.name}
                    {m.isMinor && (
                      <span className="text-[8px] font-bold uppercase tracking-wider bg-[#B85C5C]/10 text-[#B85C5C] px-1.5 py-0.5 rounded">Minor</span>
                    )}
                  </p>
                  <p className="text-xs text-[#6B6B6B] truncate mt-0.5">{m.relationshipLabel}</p>
                </div>
                <div className="hidden sm:flex items-center gap-3">
                  <span className="text-xs font-medium text-[#2E5E4E] bg-[#2E5E4E]/10 px-2 py-1 rounded-lg">
                    {m.accessLevel}
                  </span>
                  {m.trustAllocation && (
                    <span className="text-xs font-bold text-[#C6A969]">{m.trustAllocation}</span>
                  )}
                  {m.warnings.length > 0 ? (
                    <AlertTriangle className="w-4 h-4 text-[#C6A969]" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4 text-[#4B7F52]" />
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </div>

      </div>

      {/* ── Identity Panel (Slide-in) ── */}
      <AnimatePresence>
        {selected && (
          <div className="w-80 xl:w-96 flex-shrink-0 h-full border-l border-[#E7E5E0] bg-[#FCFBF8] overflow-hidden">
            <IdentityPanel
              member={selected}
              onClose={() => setSelectedId(null)}
            />
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

// ─── Micro-component: connector line ─────────────────────────────────────────

function GraphLine({ short }: { short?: boolean }) {
  return (
    <div className={`w-px ${short ? "h-6" : "h-10"} bg-gradient-to-b from-[#E7E5E0] to-[#E7E5E0]`} />
  );
}
