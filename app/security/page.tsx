"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, Lock, Smartphone, Key, Fingerprint, 
  UserCheck, AlertTriangle, Sparkles, CheckCircle2, 
  Clock, ShieldAlert, Network, Power, Landmark, FileCheck, FileX,
  Shield, Eye, EyeOff, UserPlus, Trash2, ArrowRight, Settings,
  History, ShieldPlus, ChevronRight, Monitor, Globe, MapPin, Search, Users
} from "lucide-react";
import { AIInsightCard } from "@/components/dashboard/AIInsightCard";
import { FAMILY_REGISTRY } from "@/lib/familyRegistry";
import type { FamilyMember, AccessLevel } from "@/lib/familyRegistry";

// ─── Micro-Components ────────────────────────────────────────────────────────────

function StatusBadge({ label, status }: { label: string; status: string }) {
  const isPending = status === "pending";
  return (
    <div className={`p-3 rounded-xl border ${isPending ? "border-[#C6A969]/30 bg-[#C6A969]/5" : "border-[#E7E5E0] bg-[#FCFBF8]"} text-center flex flex-col items-center justify-center gap-1.5 hover:shadow-sm transition-shadow`}>
      <div className={`w-2 h-2 rounded-full ${isPending ? "bg-[#C6A969] animate-pulse" : "bg-[#4B7F52]"}`} />
      <span className="text-[11px] font-medium text-[#1D1D1D] leading-tight">{label}</span>
    </div>
  );
}

function Toggle({ active, warning, dark, onChange }: { active: boolean; warning?: boolean; dark?: boolean; onChange?: () => void }) {
  let bgColor = "#E7E5E0";
  if (dark && !active) bgColor = "rgba(255,255,255,0.2)";
  if (active && warning) bgColor = "#B85C5C";
  if (active && !warning) bgColor = "#4B7F52";

  return (
    <button 
      onClick={onChange}
      className={`w-10 h-6 rounded-full flex items-center p-1 transition-colors outline-none`} 
      style={{ backgroundColor: bgColor }}
    >
      <motion.div 
        layout 
        className="w-4 h-4 rounded-full bg-white shadow-sm"
        animate={{ x: active ? 16 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </button>
  );
}

function ApprovalRequirement({ title, desc, fulfilled }: { title: string; desc: string; fulfilled: boolean }) {
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

function AuditItem({ time, user, action, icon, warning, device, location }: { 
  time: string; 
  user: string; 
  action: string; 
  icon: React.ReactNode; 
  warning?: boolean; 
  device?: string; 
  location?: string 
}) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-[#F5F3EE] transition-all group border border-transparent hover:border-[#E7E5E0]">
      <div className={`mt-1 p-2 rounded-xl border
        ${warning ? "bg-[#B85C5C]/10 border-[#B85C5C]/20 text-[#B85C5C]" : "bg-[#2E5E4E]/10 border-[#2E5E4E]/20 text-[#2E5E4E]"}
      `}>
        {icon}
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start mb-1">
          <p className={`text-sm font-bold leading-relaxed ${warning ? "text-[#B85C5C]" : "text-[#1D1D1D]"}`}>
            <span className="opacity-70 font-medium">[{user}]</span> {action}
          </p>
          <span className="text-[10px] text-[#6B6B6B] font-medium whitespace-nowrap">{time}</span>
        </div>
        <div className="flex items-center gap-4 text-[10px] text-[#6B6B6B] uppercase tracking-wide font-medium">
          {device && <span className="flex items-center gap-1"><Monitor size={10} /> {device}</span>}
          {location && <span className="flex items-center gap-1"><MapPin size={10} /> {location}</span>}
        </div>
      </div>
    </div>
  );
}

function IntelligenceCard({ title, value, status, trend }: { title: string; value: string; status: string; trend?: string }) {
  return (
    <div className="glass-panel p-5 rounded-3xl bg-white border border-[#E7E5E0] space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-[10px] font-bold text-[#6B6B6B] uppercase tracking-widest">{title}</span>
        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${status === 'Secure' ? 'bg-[#4B7F52]/10 text-[#4B7F52]' : 'bg-[#C6A969]/10 text-[#C6A969]'}`}>
          {status}
        </span>
      </div>
      <div className="flex items-end gap-2">
        <span className="text-2xl font-bold text-[#1D1D1D]">{value}</span>
        {trend && <span className="text-[10px] font-bold text-[#4B7F52] mb-1">{trend}</span>}
      </div>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function InstitutionalSecurityPage() {
  const [activeTab, setActiveTab] = useState<"governance" | "intelligence">("intelligence");
  const [selectedMemberId, setSelectedMemberId] = useState(FAMILY_REGISTRY[1].id);
  const selectedMember = FAMILY_REGISTRY.find(m => m.id === selectedMemberId) || FAMILY_REGISTRY[1];

  const [governanceState, setGovernanceState] = useState<Record<string, Record<string, string>>>({
    priya: {
      "Master Vault": "Full Access",
      "Trust Allocation": "Full Access",
      "Financial Assets": "Full Access",
      "Legal Documents": "Full Access",
      "Emergency Protocol": "Full Access",
    },
    rahul: {
      "Master Vault": "Locked",
      "Trust Allocation": "Sealed",
      "Financial Assets": "Locked",
      "Legal Documents": "Locked",
      "Emergency Protocol": "Timed",
    }
  });

  const handlePermissionChange = (memberId: string, permission: string, level: string) => {
    setGovernanceState(prev => ({
      ...prev,
      [memberId]: {
        ...(prev[memberId] || {}),
        [permission]: level
      }
    }));
  };

  return (
    <div className="space-y-8 pb-20 max-w-7xl mx-auto">
      
      {/* 1. Institutional Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-[#E7E5E0] pb-8">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight text-[#1D1D1D] flex items-center gap-3">
            Institutional Control Center <ShieldCheck className="w-8 h-8 text-[#2E5E4E]" />
          </h2>
          <p className="text-[#6B6B6B] text-base italic">Private banking governance and real-time surveillance intelligence.</p>
        </div>
        
        <div className="flex gap-1 bg-[#F5F3EE] p-1.5 rounded-2xl border border-[#E7E5E0]">
          <button 
            onClick={() => setActiveTab("intelligence")}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2
              ${activeTab === "intelligence" ? "bg-white text-[#1D1D1D] shadow-sm" : "text-[#6B6B6B] hover:text-[#1D1D1D]"}`}
          >
            <Sparkles size={16} /> Intelligence
          </button>
          <button 
            onClick={() => setActiveTab("governance")}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2
              ${activeTab === "governance" ? "bg-white text-[#1D1D1D] shadow-sm" : "text-[#6B6B6B] hover:text-[#1D1D1D]"}`}
          >
            <Network size={16} /> Governance
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "intelligence" ? (
          <motion.div 
            key="intelligence"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            {/* Top Stats: Intelligence Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <IntelligenceCard title="Active Sessions" value="03" status="Secure" trend="+0 today" />
              <IntelligenceCard title="Verified Identities" value="05" status="Action Required" trend="1 Pending" />
              <IntelligenceCard title="Failed Attempts" value="00" status="Secure" />
              <IntelligenceCard title="Vault Status" value="Locked" status="Secure" />
            </div>

            {/* Main Intelligence Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Left Column: Device Trust & Geo Intelligence */}
              <div className="lg:col-span-1 space-y-8">
                <div className="glass-panel rounded-3xl p-6 bg-white space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-[#1D1D1D] uppercase tracking-wider">Device Trust Timeline</h3>
                    <Settings className="w-4 h-4 text-[#6B6B6B]" />
                  </div>
                  <div className="space-y-4">
                    <DeviceStatus name="MacBook Pro 16”" status="Trusted" last="Bengaluru · Now" icon={<Monitor size={18} />} />
                    <DeviceStatus name="iPhone 16 Pro Max" status="Trusted" last="Bengaluru · 2h ago" icon={<Smartphone size={18} />} />
                    <DeviceStatus name="Windows Desktop" status="Suspicious" last="Dubai · 4h ago" icon={<Monitor size={18} />} warning />
                    <DeviceStatus name="Unknown Device" status="Blocked" last="London · 12h ago" icon={<Globe size={18} />} blocked />
                  </div>
                </div>

                {/* ── Protection Preferences (MOVED FROM SETTINGS) ── */}
                <div className="glass-panel rounded-3xl p-6 bg-white space-y-6 border border-[#2E5E4E]/20">
                   <div className="flex items-center gap-2">
                     <ShieldCheck className="w-5 h-5 text-[#2E5E4E]" />
                     <h3 className="text-sm font-bold text-[#1D1D1D] uppercase tracking-wider">Protection Preferences</h3>
                   </div>
                   <div className="space-y-1">
                      <ToggleItem label="Unknown Device Alerts" active={true} />
                      <ToggleItem label="Auto Session Freeze" active={true} />
                      <ToggleItem label="New Device Approval" active={true} />
                      <ToggleItem label="Session Notifications" active={false} />
                      <ToggleItem label="Emergency Lock Alerts" active={true} />
                   </div>
                   <div className="p-4 rounded-2xl bg-[#F5F3EE] border border-[#E7E5E0]">
                      <p className="text-[10px] text-[#6B6B6B] leading-relaxed">
                        <span className="font-bold text-[#1D1D1D]">Policy:</span> Unrecognized devices trigger temporary module protection until owner verification.
                      </p>
                   </div>
                </div>

                <div className="glass-panel rounded-3xl p-6 bg-[#1D1D1D] text-white overflow-hidden relative">
                   <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                     <Globe className="w-32 h-32" />
                   </div>
                   <h3 className="text-sm font-bold uppercase tracking-wider mb-4">Geo Access Monitor</h3>
                   <div className="space-y-4 relative z-10">
                      <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-bold text-gray-400">Current Anchor</span>
                          <span className="text-[10px] text-[#4B7F52] font-bold">Verified</span>
                        </div>
                        <p className="text-sm font-bold">Bengaluru, India</p>
                      </div>
                      <div className="p-3 rounded-2xl bg-[#B85C5C]/20 border border-[#B85C5C]/30 flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-[#B85C5C] flex-shrink-0" />
                        <div>
                          <p className="text-[11px] font-bold text-white">Impossible Travel Alert</p>
                          <p className="text-[10px] text-gray-400 mt-0.5 leading-relaxed">
                            Access attempt detected 4,200km from last verified login. Institutional freeze recommended.
                          </p>
                        </div>
                      </div>
                   </div>
                </div>
              </div>

              {/* Right Column: Audit Timeline & History */}
              <div className="lg:col-span-2 space-y-8">
                <div className="glass-panel rounded-3xl p-6 md:p-8 bg-white border border-[#E7E5E0]">
                   <div className="flex items-center justify-between mb-8">
                     <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-[#2E5E4E]/10">
                           <History className="w-5 h-5 text-[#2E5E4E]" />
                        </div>
                        <h3 className="text-lg font-bold text-[#1D1D1D]">Access & Session Audit</h3>
                     </div>
                     <div className="flex items-center gap-2">
                        <button className="p-2 bg-[#F5F3EE] rounded-lg text-[#6B6B6B] hover:text-[#1D1D1D] transition-all">
                           <Search size={14} />
                        </button>
                        <button className="px-4 py-2 bg-[#1D1D1D] text-white text-[10px] font-bold uppercase tracking-widest rounded-xl hover:shadow-lg transition-all">
                           Export Immutable Log
                        </button>
                     </div>
                   </div>

                   <div className="space-y-1">
                      <AuditItem 
                        time="10:24 AM" 
                        user="Sharath Swaroop" 
                        action="Opened Institutional Will Execution" 
                        icon={<FileCheck size={16} />}
                        device="MacBook Pro"
                        location="Bengaluru"
                      />
                      <AuditItem 
                        time="09:15 AM" 
                        user="Rajiv Menon" 
                        action="Viewed Legal Vault (Timed Access)" 
                        icon={<Eye size={16} />}
                        device="Windows Desktop"
                        location="Office"
                      />
                      <AuditItem 
                        time="08:42 AM" 
                        user="Priya Swaroop" 
                        action="Approved Emergency Executor Request" 
                        icon={<UserCheck size={16} />}
                        device="iPhone 16"
                        location="Bengaluru"
                      />
                      <AuditItem 
                        time="07:12 AM" 
                        user="Rahul Swaroop" 
                        action="Attempted access to Locked Beneficiary Assets" 
                        icon={<Lock size={16} />}
                        device="iPad Pro"
                        location="Home"
                        warning
                      />
                      <AuditItem 
                        time="Yesterday" 
                        user="System" 
                        action="Automatic Freeze: Unknown Login Attempt" 
                        icon={<ShieldAlert size={16} />}
                        location="London, UK"
                        warning
                      />
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="glass-panel p-6 rounded-3xl bg-gradient-to-br from-[#F5F3EE] to-white border border-[#E7E5E0]">
                      <h3 className="text-sm font-bold uppercase tracking-wider mb-4">Verification Metrics</h3>
                      <div className="space-y-3">
                         <VerificationRow label="Face Verified" count={12} icon={<UserCheck size={12} />} />
                         <VerificationRow label="Passkey Approved" count={8} icon={<Key size={12} />} />
                         <VerificationRow label="Multi-Sig Approved" count={2} icon={<Users size={12} />} />
                      </div>
                   </div>
                   <div className="glass-panel p-6 rounded-3xl bg-gradient-to-br from-white to-[#F5F3EE] border border-[#E7E5E0]">
                      <h3 className="text-sm font-bold uppercase tracking-wider mb-4">Threat Intelligence</h3>
                      <div className="space-y-3">
                         <div className="flex items-center gap-2 p-2 rounded-xl bg-[#B85C5C]/5">
                            <AlertTriangle size={12} className="text-[#B85C5C]" />
                            <span className="text-[10px] font-bold text-[#B85C5C]">Executor mismatch detected in London</span>
                         </div>
                         <div className="flex items-center gap-2 p-2 rounded-xl bg-[#C6A969]/5">
                            <Clock size={12} className="text-[#C6A969]" />
                            <span className="text-[10px] font-bold text-[#C6A969]">Midnight access anomaly detected</span>
                         </div>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="governance"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            {/* Governance Access Matrix */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Member Sidebar */}
              <div className="lg:col-span-1 glass-panel rounded-3xl p-6 flex flex-col gap-4 bg-[#FCFBF8]">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-bold text-[#1D1D1D] uppercase tracking-wider">Identity Registry</h3>
                  <span className="text-[10px] bg-[#E7E5E0] px-2 py-0.5 rounded-full text-[#6B6B6B] font-bold">{FAMILY_REGISTRY.length} Identities</span>
                </div>
                <div className="space-y-2 overflow-y-auto max-h-[500px] scrollbar-hide">
                  {FAMILY_REGISTRY.map((member) => (
                    <button
                      key={member.id}
                      onClick={() => setSelectedMemberId(member.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all border
                        ${selectedMemberId === member.id
                          ? "bg-[#2E5E4E] border-[#2E5E4E] text-white shadow-lg"
                          : "bg-white border-[#E7E5E0] text-[#1D1D1D] hover:border-[#2E5E4E]/40"
                        }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border
                        ${selectedMemberId === member.id ? "bg-white/20 border-white/30" : "bg-[#F5F3EE] border-[#E7E5E0]"}
                      `}>
                        {member.initials}
                      </div>
                      <div className="flex-1 text-left">
                        <p className="text-xs font-bold truncate">{member.name}</p>
                        <p className={`text-[10px] uppercase tracking-wide opacity-70 ${selectedMemberId === member.id ? "text-white" : "text-[#6B6B6B]"}`}>
                          {member.governanceRole}
                        </p>
                      </div>
                      {selectedMemberId === member.id && <ChevronRight className="w-4 h-4" />}
                    </button>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-[#E7E5E0]">
                  <AIInsightCard
                    title="Unverified Identity"
                    description="Anya Swaroop requires identity verification before granting governance roles."
                    type="warning"
                  />
                </div>
              </div>

              {/* Permission Matrix */}
              <div className="lg:col-span-2 glass-panel rounded-3xl p-6 md:p-8 relative overflow-hidden bg-white">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-[#2E5E4E]/10">
                      <Shield className="w-5 h-5 text-[#2E5E4E]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#1D1D1D]">Governance Access Matrix</h3>
                      <p className="text-xs text-[#6B6B6B]">Configuring permissions for <span className="font-bold text-[#1D1D1D]">{selectedMember.name}</span></p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full border
                        ${selectedMember.verificationState === 'verified' ? "bg-[#4B7F52]/10 text-[#4B7F52] border-[#4B7F52]/20" : "bg-[#C6A969]/10 text-[#C6A969] border-[#C6A969]/20"}
                     `}>
                      {selectedMember.verificationState}
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <PermissionRow
                    label="Master Vault Access"
                    icon={<Lock className="w-4 h-4" />}
                    currentLevel={governanceState[selectedMemberId]?.["Master Vault"] || "Locked"}
                    onChange={(l) => handlePermissionChange(selectedMemberId, "Master Vault", l)}
                  />
                  <PermissionRow
                    label="Trust Allocation View"
                    icon={<Eye className="w-4 h-4" />}
                    currentLevel={governanceState[selectedMemberId]?.["Trust Allocation"] || "Sealed"}
                    onChange={(l) => handlePermissionChange(selectedMemberId, "Trust Allocation", l)}
                  />
                  <PermissionRow
                    label="Financial Assets Management"
                    icon={<Landmark className="w-4 h-4" />}
                    currentLevel={governanceState[selectedMemberId]?.["Financial Assets"] || "Locked"}
                    onChange={(l) => handlePermissionChange(selectedMemberId, "Financial Assets", l)}
                  />
                  <PermissionRow
                    label="Legal & Will Execution"
                    icon={<FileCheck className="w-4 h-4" />}
                    currentLevel={governanceState[selectedMemberId]?.["Legal Documents"] || "Locked"}
                    onChange={(l) => handlePermissionChange(selectedMemberId, "Legal Documents", l)}
                  />
                  <PermissionRow
                    label="Emergency Protocol Trigger"
                    icon={<ShieldAlert className="w-4 h-4" />}
                    currentLevel={governanceState[selectedMemberId]?.["Emergency Protocol"] || "Locked"}
                    onChange={(l) => handlePermissionChange(selectedMemberId, "Emergency Protocol", l)}
                  />
                </div>

                <div className="mt-8 pt-6 border-t border-[#E7E5E0] flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-[#6B6B6B]">
                    <History className="w-4 h-4" />
                    Last modified: Today by Owner
                  </div>
                  <button className="bg-[#1D1D1D] text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-black transition-all shadow-md">
                    Apply Governance Policy
                  </button>
                </div>
              </div>
            </div>

            {/* Institutional Freeze Engine & Emergency Controls */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
              {/* Institutional Freeze Engine */}
              <div className="glass-panel rounded-3xl p-6 md:p-8 bg-[#1D1D1D] text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
                  <ShieldPlus className="w-48 h-48" />
                </div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-xl bg-white/10">
                    <Power className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Institutional Freeze Engine</h3>
                </div>
                
                <div className="space-y-4 relative z-10">
                  <div className="p-4 rounded-2xl border border-white/10 bg-white/5 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-bold">View Freeze (Stealth Protection)</p>
                        <p className="text-[10px] text-gray-400">Data appears blurred or sealed without alerting recipients.</p>
                      </div>
                      <Toggle active={true} dark />
                    </div>
                    <div className="h-px bg-white/5 w-full" />
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-bold">Full Freeze (Asset Lockdown)</p>
                        <p className="text-[10px] text-gray-400">Complete suspension of all visibility and execution rights.</p>
                      </div>
                      <Toggle active={false} dark />
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl border border-[#B85C5C]/30 bg-[#B85C5C]/10 flex items-center gap-4">
                    <AlertTriangle className="w-6 h-6 text-[#B85C5C]" />
                    <div className="flex-1">
                      <p className="text-xs font-bold text-white">Emergency Lock Status: ARMED</p>
                      <p className="text-[10px] text-gray-400">System is ready to seal all modules upon suspicious activity detection.</p>
                    </div>
                    <button className="px-3 py-1.5 bg-[#B85C5C] rounded-lg text-[10px] font-bold uppercase tracking-wider">Configure Triggers</button>
                  </div>
                </div>
              </div>

              {/* Multi-Signature Governance & Verification */}
              <div className="glass-panel rounded-3xl p-6 md:p-8 flex flex-col justify-between bg-white border border-[#E7E5E0]">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-xl bg-[#C6A969]/10">
                      <UserCheck className="w-5 h-5 text-[#C6A969]" />
                    </div>
                    <h3 className="text-lg font-semibold text-[#1D1D1D]">Multi-Signature Governance</h3>
                  </div>
                  
                  <p className="text-xs text-[#6B6B6B] mb-6 leading-relaxed">
                    Sensitive governance changes and emergency unlocks require a chain of verification from trusted institutional nodes.
                  </p>

                  <div className="space-y-3">
                    <ApprovalRequirement title="Executive Approval" desc="Priya Swaroop (Spouse)" fulfilled={true} />
                    <ApprovalRequirement title="Legal Verification" desc="Rajiv Menon (Lawyer)" fulfilled={false} />
                    <ApprovalRequirement title="Biometric Confirmation" desc="Hardware Passkey" fulfilled={true} />
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between p-4 rounded-2xl border border-[#E7E5E0] bg-[#F5F3EE]">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-[#6B6B6B]" />
                    <div>
                      <p className="text-xs font-bold text-[#1D1D1D]">Mandatory Cooldown: 48 Hours</p>
                      <p className="text-[10px] text-[#6B6B6B]">Required window before inheritance release.</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#6B6B6B]" />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

// ─── Governance Micro-Components ─────────────────────────────────────────────

function DeviceStatus({ name, status, last, icon, warning, blocked }: { name: string; status: string; last: string; icon: React.ReactNode; warning?: boolean; blocked?: boolean }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-2xl border border-[#E7E5E0] bg-[#F5F3EE]/50 hover:bg-[#F5F3EE] transition-all group">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-xl bg-white border border-[#E7E5E0] ${warning ? 'text-[#C6A969]' : blocked ? 'text-[#B85C5C]' : 'text-[#2E5E4E]'}`}>
          {icon}
        </div>
        <div>
          <p className="text-xs font-bold text-[#1D1D1D]">{name}</p>
          <p className="text-[9px] text-[#6B6B6B] uppercase font-medium">{last}</p>
        </div>
      </div>
      <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full
        ${blocked ? 'bg-[#B85C5C]/10 text-[#B85C5C]' : warning ? 'bg-[#C6A969]/10 text-[#C6A969]' : 'bg-[#4B7F52]/10 text-[#4B7F52]'}
      `}>
        {status}
      </span>
    </div>
  );
}

function VerificationRow({ label, count, icon }: { label: string; count: number; icon: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between text-xs py-1 border-b border-[#E7E5E0]/60 last:border-0">
      <div className="flex items-center gap-2 text-[#6B6B6B]">
        {icon}
        <span>{label}</span>
      </div>
      <span className="font-bold text-[#1D1D1D]">{count}</span>
    </div>
  );
}

function PermissionRow({ label, icon, currentLevel, onChange }: {
  label: string;
  icon: React.ReactNode;
  currentLevel: string;
  onChange?: (level: string) => void;
}) {
  const levels = ["Full Access", "View Only", "Timed", "Locked", "Sealed"];
  return (
    <div className="flex items-center justify-between p-4 rounded-xl bg-[#F5F3EE]/50 border border-[#E7E5E0] group">
      <div className="flex items-center gap-3">
        <div className="text-[#6B6B6B] group-hover:text-[#2E5E4E] transition-colors">{icon}</div>
        <span className="text-sm font-medium text-[#1D1D1D]">{label}</span>
      </div>
      <div className="flex gap-1 bg-white p-1 rounded-lg border border-[#E7E5E0]">
        {levels.map((level) => (
          <button
            key={level}
            onClick={() => onChange?.(level)}
            className={`px-2 py-1 text-[9px] font-bold uppercase tracking-wider rounded transition-all
              ${currentLevel === level 
                ? "bg-[#2E5E4E] text-white shadow-sm" 
                : "text-[#6B6B6B] hover:text-[#1D1D1D]"
              }`}
          >
            {level}
          </button>
        ))}
      </div>
    </div>
  );
}

function ToggleItem({ label, active }: { label: string; active: boolean }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-[#E7E5E0]/60 last:border-0">
      <span className="text-xs font-medium text-[#1D1D1D]">{label}</span>
      <div className={`w-8 h-5 rounded-full flex items-center p-1 transition-colors ${active ? "bg-[#4B7F52]" : "bg-[#E7E5E0]"}`}>
        <motion.div 
          layout 
          className="w-3 h-3 rounded-full bg-white shadow-sm"
          animate={{ x: active ? 12 : 0 }}
        />
      </div>
    </div>
  );
}
