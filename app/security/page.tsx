"use client";

import { motion } from "framer-motion";
import { 
  ShieldCheck, Lock, Smartphone, Key, Fingerprint, 
  UserCheck, AlertTriangle, Sparkles, CheckCircle2, 
  Clock, ShieldAlert, Network, Power, Landmark, FileCheck, FileX
} from "lucide-react";
import { AIInsightCard } from "@/components/dashboard/AIInsightCard";

export default function AdvancedSecurityPage() {
  return (
    <div className="space-y-8 pb-10 max-w-7xl mx-auto">
      
      {/* 1. Header & Panic Lockdown Mode */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E7E5E0] pb-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-semibold tracking-tight text-[#1D1D1D] flex items-center gap-2">
            Family Protection System <ShieldCheck className="w-5 h-5 text-[#2E5E4E]" />
          </h2>
          <p className="text-[#6B6B6B] text-sm">Institutional-grade security and asset protection infrastructure.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 border border-[#E7E5E0] bg-[#FCFBF8] text-[#1D1D1D] rounded-xl text-sm font-medium hover:bg-[#F5F3EE] transition-colors">
            Audit Matrix
          </button>
          <button className="flex items-center gap-2 bg-[#B85C5C] text-[#FCFBF8] px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#a34f4f] transition-colors shadow-sm">
            <ShieldAlert className="w-4 h-4" /> Panic Lock
          </button>
        </div>
      </div>

      {/* Top Row: System Status & AI Threat Intelligence */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Visual Protection Status */}
        <div className="lg:col-span-2 glass-panel rounded-3xl p-6 md:p-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-[#4B7F52]" />
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-xl font-bold text-[#1D1D1D]">System Status</h3>
                <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#4B7F52]/10 text-[#4B7F52] border border-[#4B7F52]/20">
                  <CheckCircle2 className="w-3 h-3" /> Fully Protected
                </span>
              </div>
              <p className="text-sm text-[#6B6B6B]">All institutional assets and vaults are under military-grade surveillance.</p>
            </div>
            <div className="text-right flex flex-col items-end">
              <span className="text-4xl font-bold text-[#2E5E4E]">99%</span>
              <span className="text-xs text-[#6B6B6B] uppercase tracking-wider font-medium">Confidence Score</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <StatusBadge label="Vault Protected" status="active" color="#4B7F52" />
            <StatusBadge label="Assets Liquid" status="active" color="#4B7F52" />
            <StatusBadge label="Executor Review" status="pending" color="#C6A969" />
          </div>
        </div>

        {/* AI Threat Intelligence */}
        <div className="lg:col-span-1 glass-panel rounded-3xl p-6 bg-gradient-to-br from-[#FCFBF8] to-[#F5F3EE]">
          <div className="flex items-center gap-2 mb-5">
            <Sparkles className="w-5 h-5 text-[#C6A969]" />
            <h3 className="text-base font-semibold text-[#1D1D1D]">Threat Intelligence</h3>
          </div>
          <div className="space-y-3">
            <AIInsightCard 
              title="Unknown Device Blocked" 
              description="An unrecognized Windows device attempted secure vault access. Access denied."
              type="warning"
            />
            <AIInsightCard 
              title="Emergency Freeze Ready" 
              description="Suspicious activity protocols are fully armed. No current threats."
              type="positive"
            />
          </div>
        </div>
      </div>

      {/* Second Row: Asset Freeze Controls & Dead Man Switch */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Asset Freeze Controls */}
        <div className="glass-panel rounded-3xl p-6 md:p-8 border border-[#B85C5C]/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
            <Lock className="w-32 h-32" />
          </div>
          <div className="flex items-center gap-3 mb-6 relative z-10">
            <div className="p-2 rounded-xl bg-[#B85C5C]/10">
              <Lock className="w-5 h-5 text-[#B85C5C]" />
            </div>
            <h3 className="text-lg font-semibold text-[#1D1D1D]">Asset Freeze Architecture</h3>
          </div>
          <p className="text-sm text-[#6B6B6B] mb-6 leading-relaxed relative z-10">
            When frozen, specific asset classes cannot be transferred, sold, or modified. Institutional ownership changes are cryptographically locked.
          </p>

          <div className="space-y-3 relative z-10">
            <FreezeToggle title="Bank Accounts & Liquid Assets" icon={<Landmark className="w-4 h-4" />} active={false} />
            <FreezeToggle title="Property & Real Estate Records" icon={<FileCheck className="w-4 h-4" />} active={false} />
            <FreezeToggle title="Trust & Nominee Distributions" icon={<UserCheck className="w-4 h-4" />} active={true} frozenLabel="Frozen" />
            <FreezeToggle title="Digital Vault Files & Downloads" icon={<FileX className="w-4 h-4" />} active={false} />
          </div>
        </div>

        {/* Dead Man Switch & Emergency Triggers */}
        <div className="glass-panel rounded-3xl p-6 md:p-8 bg-[#1D1D1D] text-white">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-xl bg-white/10">
              <Power className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white">Inactivity Protcol (Dead Man Switch)</h3>
          </div>
          <p className="text-xs text-gray-400 mb-6 leading-relaxed">
            If you do not log in or verify your presence within the configured threshold, the vault automatically enters Protection Mode. Nominees will be notified and the executor workflow is initiated.
          </p>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/5">
              <div>
                <span className="text-sm font-semibold text-white">Inactivity Threshold</span>
                <p className="text-[11px] text-gray-500 mt-1">Days without login or heartbeat</p>
              </div>
              <select className="bg-black text-white text-sm border border-white/20 rounded-lg px-3 py-1.5 focus:outline-none">
                <option>30 Days</option>
                <option selected>90 Days</option>
                <option>180 Days</option>
              </select>
            </div>
            
            <div className="flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/5">
              <div className="flex items-center gap-3">
                <ShieldAlert className="w-5 h-5 text-[#B85C5C]" />
                <div>
                  <span className="text-sm font-semibold text-white">Action: Initiate Emergency Freeze</span>
                  <p className="text-[11px] text-gray-500 mt-1">Locks assets and begins executor verification</p>
                </div>
              </div>
              <Toggle active={true} dark />
            </div>
          </div>
        </div>
      </div>

      {/* Third Row: Multi-Person Approval Unlock & Workflow */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Multi-Person Approval */}
        <div className="lg:col-span-1 glass-panel rounded-3xl p-6 md:p-8 border border-[#E7E5E0]">
          <h3 className="text-base font-semibold text-[#1D1D1D] mb-4">Multi-Signature Unlock</h3>
          <p className="text-xs text-[#6B6B6B] mb-6 leading-relaxed">
            Unlocking sensitive vaults or lifting an emergency freeze requires cryptographic signatures from multiple verified parties.
          </p>
          <div className="space-y-3">
            <ApprovalRequirement title="Spouse Approval" desc="Priya Swaroop" fulfilled={true} />
            <ApprovalRequirement title="Executor Approval" desc="Rajiv Menon (Lawyer)" fulfilled={false} />
            <ApprovalRequirement title="Biometric Confirmation" desc="Hardware Passkey" fulfilled={false} />
          </div>
        </div>

        {/* Emergency Verification Protocol */}
        <div className="lg:col-span-2 glass-panel rounded-3xl p-6 md:p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[#C6A969]/10">
                <AlertTriangle className="w-5 h-5 text-[#C6A969]" />
              </div>
              <h3 className="text-lg font-semibold text-[#1D1D1D]">Emergency Recovery Workflow</h3>
            </div>
            <span className="text-xs font-medium text-[#6B6B6B] bg-[#F5F3EE] px-3 py-1.5 rounded-lg border border-[#E7E5E0]">
              Strict Execution Path
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <WorkflowStep number={1} title="Identity Check" desc="Facial Verification" active={true} />
            <WorkflowStep number={2} title="Death Cert" desc="Gov ID Upload" active={false} />
            <WorkflowStep number={3} title="Multi-Sig" desc="Executor Approval" active={false} />
            <WorkflowStep number={4} title="Cooldown" desc="Mandatory 48h Wait" active={false} />
            <WorkflowStep number={5} title="Vault Unlock" desc="Assets Released" active={false} isLast />
          </div>
        </div>
      </div>

      {/* Fourth Row: RBAC Access Topology */}
      <div className="glass-panel rounded-3xl p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#2E5E4E]/10">
              <Network className="w-5 h-5 text-[#2E5E4E]" />
            </div>
            <h3 className="text-lg font-semibold text-[#1D1D1D]">Zero-Trust Topology</h3>
          </div>
          <span className="text-xs font-bold uppercase text-[#4B7F52] bg-[#4B7F52]/10 px-2 py-1 rounded-full">RBAC Active</span>
        </div>

        {/* Visual Graph Layout */}
        <div className="relative p-6 border border-[#E7E5E0] bg-[#FCFBF8] rounded-2xl overflow-hidden min-h-[300px] flex flex-col justify-center gap-8">
          
          <div className="flex justify-center">
            <div className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 rounded-full bg-[#1D1D1D] text-[#C6A969] flex items-center justify-center border-4 border-[#F5F3EE] shadow-md z-10 relative">
                <Lock className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#1D1D1D]">Master Vault</span>
            </div>
          </div>

          {/* Connecting Lines */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-24 border-t-2 border-l-2 border-r-2 border-[#E7E5E0] border-dashed -z-10 mt-4 rounded-t-3xl" />

          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-[#4B7F52]/10 text-[#4B7F52] flex items-center justify-center border border-[#4B7F52]/30 shadow-sm bg-white">
                <UserCheck className="w-5 h-5" />
              </div>
              <div className="text-center">
                <span className="block text-xs font-bold text-[#1D1D1D]">Priya Swaroop</span>
                <span className="block text-[10px] text-[#6B6B6B] uppercase">Spouse • Co-Owner</span>
                <span className="block text-[10px] bg-[#4B7F52]/10 text-[#4B7F52] px-1 rounded mt-1">Full Control</span>
              </div>
            </div>
            
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-[#C6A969]/10 text-[#C6A969] flex items-center justify-center border border-[#C6A969]/30 shadow-sm bg-white">
                <UserCheck className="w-5 h-5" />
              </div>
              <div className="text-center">
                <span className="block text-xs font-bold text-[#1D1D1D]">Rajiv Menon</span>
                <span className="block text-[10px] text-[#6B6B6B] uppercase">Lawyer</span>
                <span className="block text-[10px] bg-[#C6A969]/10 text-[#C6A969] px-1 rounded mt-1">View Only (30 Days)</span>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-[#2E5E4E]/10 text-[#2E5E4E] flex items-center justify-center border border-[#2E5E4E]/30 shadow-sm bg-white">
                <UserCheck className="w-5 h-5" />
              </div>
              <div className="text-center">
                <span className="block text-xs font-bold text-[#1D1D1D]">Rahul Swaroop</span>
                <span className="block text-[10px] text-[#6B6B6B] uppercase">Child</span>
                <span className="block text-[10px] bg-[#2E5E4E]/10 text-[#2E5E4E] px-1 rounded mt-1">Locked (Age 25)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

// Micro-Components

function StatusBadge({ label, status, color }: any) {
  const isPending = status === "pending";
  return (
    <div className={`p-3 rounded-xl border ${isPending ? "border-[#C6A969]/30 bg-[#C6A969]/5" : "border-[#E7E5E0] bg-[#FCFBF8]"} text-center flex flex-col items-center justify-center gap-1.5 hover:shadow-sm transition-shadow`}>
      <div className={`w-2 h-2 rounded-full ${isPending ? "bg-[#C6A969] animate-pulse" : "bg-[#4B7F52]"}`} />
      <span className="text-[11px] font-medium text-[#1D1D1D] leading-tight">{label}</span>
    </div>
  );
}

function FreezeToggle({ title, icon, active, frozenLabel = "Liquid" }: any) {
  return (
    <div className={`flex items-center justify-between p-4 rounded-xl border ${active ? "border-[#B85C5C]/30 bg-[#B85C5C]/5" : "border-[#E7E5E0] bg-[#FCFBF8]"}`}>
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${active ? "bg-[#B85C5C]/10 text-[#B85C5C]" : "bg-[#F5F3EE] text-[#6B6B6B]"}`}>
          {icon}
        </div>
        <div>
          <span className={`text-sm font-semibold ${active ? "text-[#B85C5C]" : "text-[#1D1D1D]"}`}>{title}</span>
          <span className={`block text-[10px] font-bold uppercase tracking-wider mt-0.5 ${active ? "text-[#B85C5C]" : "text-[#4B7F52]"}`}>
            {active ? frozenLabel : "Active"}
          </span>
        </div>
      </div>
      <Toggle active={active} warning />
    </div>
  );
}

function Toggle({ active, warning, dark }: any) {
  let bgColor = "#E7E5E0";
  if (dark && !active) bgColor = "rgba(255,255,255,0.2)";
  if (active && warning) bgColor = "#B85C5C";
  if (active && !warning) bgColor = "#4B7F52";

  return (
    <div className={`w-10 h-6 rounded-full flex items-center p-1 transition-colors`} style={{ backgroundColor: bgColor }}>
      <motion.div 
        layout 
        className="w-4 h-4 rounded-full bg-white shadow-sm"
        animate={{ x: active ? 16 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </div>
  );
}

function ApprovalRequirement({ title, desc, fulfilled }: any) {
  return (
    <div className="flex items-center justify-between p-3 rounded-xl border border-[#E7E5E0] bg-[#FCFBF8]">
      <div className="flex items-center gap-3">
        <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 border-2 ${fulfilled ? "bg-[#4B7F52] border-[#4B7F52]" : "border-[#E7E5E0] bg-transparent"}`}>
          {fulfilled && <CheckCircle2 className="w-3 h-3 text-white" />}
        </div>
        <div>
          <p className="text-sm font-semibold text-[#1D1D1D]">{title}</p>
          <p className="text-[10px] text-[#6B6B6B]">{desc}</p>
        </div>
      </div>
      <span className={`text-[10px] font-bold uppercase tracking-wider ${fulfilled ? "text-[#4B7F52]" : "text-[#6B6B6B]"}`}>
        {fulfilled ? "Signed" : "Pending"}
      </span>
    </div>
  );
}

function WorkflowStep({ number, title, desc, active, isLast }: any) {
  return (
    <div className="relative flex flex-col items-center text-center">
      {!isLast && (
        <div className="hidden md:block absolute top-6 left-1/2 w-full h-0.5 bg-[#E7E5E0] -z-10" />
      )}
      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold border-4 border-[#FCFBF8] mb-3 z-10 shadow-sm
        ${active ? "bg-[#4B7F52] text-white" : "bg-[#F5F3EE] text-[#6B6B6B]"}`}
      >
        {active ? <CheckCircle2 className="w-5 h-5" /> : number}
      </div>
      <h4 className="text-sm font-semibold text-[#1D1D1D]">{title}</h4>
      <p className="text-[11px] text-[#6B6B6B] mt-1 px-2 leading-tight">{desc}</p>
    </div>
  );
}
