"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Scale, ShieldAlert, Lock, CheckCircle2, UserCheck, 
  Smartphone, Fingerprint, Clock, FileKey2, Info 
} from "lucide-react";

export default function TrustDistributionPage() {
  // Demo states: "none" | "view" | "full"
  const [freezeMode, setFreezeMode] = useState<"none" | "view" | "full">("full");

  const isFullFreeze = freezeMode === "full";
  const isViewFreeze = freezeMode === "view";

  return (
    <div className="space-y-8 pb-10 max-w-7xl mx-auto relative">
      
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E7E5E0] pb-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-semibold tracking-tight text-[#1D1D1D] flex items-center gap-2">
            Trust & Estate Allocation <Scale className="w-5 h-5 text-[#C6A969]" />
          </h2>
          <p className="text-[#6B6B6B] text-sm">Automated inheritance allocation and execution logic.</p>
        </div>
        <div className="flex items-center gap-3">
          {isViewFreeze && (
            <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider bg-[#B85C5C]/10 text-[#B85C5C] px-3 py-2 rounded-xl">
              <Lock className="w-3.5 h-3.5" /> Protected Under Security Policy
            </span>
          )}
          <button disabled={isViewFreeze || isFullFreeze} className="flex items-center gap-2 bg-[#2E5E4E] text-[#FCFBF8] px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#1f4236] transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed">
            Update Protocol
          </button>
        </div>
      </div>

      {/* Main Content Area (Blurred during Full Freeze) */}
      <div className="relative">
        
        {/* Full Freeze Overlay */}
        {isFullFreeze && (
          <div className="absolute inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-[#FCFBF8]/60 backdrop-blur-md rounded-3xl" />
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative z-10 w-full max-w-2xl glass-panel rounded-3xl p-8 md:p-10 border-2 border-[#B85C5C]/20 shadow-2xl bg-white/90"
            >
              <div className="flex flex-col items-center text-center mb-8">
                <div className="w-16 h-16 rounded-full bg-[#B85C5C]/10 flex items-center justify-center mb-4 border-4 border-[#B85C5C]/20">
                  <ShieldAlert className="w-8 h-8 text-[#B85C5C]" />
                </div>
                <h3 className="text-2xl font-bold text-[#1D1D1D] mb-2">Institutional Protection Active</h3>
                <p className="text-sm text-[#6B6B6B] max-w-md leading-relaxed">
                  Access Restricted by Emergency Protocol. Trust Distribution data has been cryptographically sealed.
                </p>
              </div>

              <div className="bg-[#FCFBF8] border border-[#E7E5E0] rounded-2xl p-6 mb-8">
                <h4 className="text-sm font-semibold text-[#1D1D1D] mb-4 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-[#C6A969]" /> Multi-Signature Unlock Required
                </h4>
                <div className="space-y-4 relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px before:h-full before:w-0.5 before:bg-[#E7E5E0]">
                  
                  <div className="relative flex items-center gap-4">
                    <div className="w-6 h-6 rounded-full bg-[#4B7F52] border-2 border-white flex items-center justify-center z-10">
                      <CheckCircle2 className="w-3 h-3 text-white" />
                    </div>
                    <div className="flex-1 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Smartphone className="w-4 h-4 text-[#6B6B6B]" />
                        <span className="text-sm text-[#1D1D1D]">Trusted Device Verified</span>
                      </div>
                      <span className="text-[10px] text-[#4B7F52] font-bold uppercase">Verified</span>
                    </div>
                  </div>

                  <div className="relative flex items-center gap-4">
                    <div className="w-6 h-6 rounded-full bg-[#4B7F52] border-2 border-white flex items-center justify-center z-10">
                      <CheckCircle2 className="w-3 h-3 text-white" />
                    </div>
                    <div className="flex-1 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Fingerprint className="w-4 h-4 text-[#6B6B6B]" />
                        <span className="text-sm text-[#1D1D1D]">Biometric Authentication</span>
                      </div>
                      <span className="text-[10px] text-[#4B7F52] font-bold uppercase">Verified</span>
                    </div>
                  </div>

                  <div className="relative flex items-center gap-4">
                    <div className="w-6 h-6 rounded-full bg-[#F5F3EE] border-2 border-[#C6A969] flex items-center justify-center z-10">
                      <span className="w-2 h-2 rounded-full bg-[#C6A969]" />
                    </div>
                    <div className="flex-1 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <UserCheck className="w-4 h-4 text-[#1D1D1D]" />
                        <span className="text-sm font-semibold text-[#1D1D1D]">Executor Approval</span>
                      </div>
                      <span className="text-[10px] text-[#C6A969] font-bold uppercase">Pending</span>
                    </div>
                  </div>

                  <div className="relative flex items-center gap-4 opacity-50">
                    <div className="w-6 h-6 rounded-full bg-[#F5F3EE] border-2 border-[#E7E5E0] flex items-center justify-center z-10">
                      <span className="w-2 h-2 rounded-full bg-[#6B6B6B]" />
                    </div>
                    <div className="flex-1 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-[#6B6B6B]" />
                        <span className="text-sm text-[#6B6B6B]">48h Cooldown Timer</span>
                      </div>
                      <span className="text-[10px] text-[#6B6B6B] font-bold uppercase">Locked</span>
                    </div>
                  </div>

                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 py-3 bg-[#FCFBF8] border border-[#E7E5E0] text-[#1D1D1D] rounded-xl text-sm font-medium hover:bg-[#F5F3EE] transition-colors">
                  Contact Support
                </button>
                <button className="flex-1 py-3 bg-[#B85C5C] text-white rounded-xl text-sm font-medium hover:bg-[#a34f4f] transition-colors flex items-center justify-center gap-2">
                  <FileKey2 className="w-4 h-4" /> Request Unlock
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Content Wrapper (gets blurred if Full Freeze) */}
        <div className={`space-y-6 transition-all duration-500 ${isFullFreeze ? "opacity-30 blur-sm pointer-events-none select-none" : ""}`}>
          
          {/* Top Row: Overall Allocation */}
          <div className="glass-panel rounded-3xl p-6 md:p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-semibold text-[#1D1D1D]">Global Distribution Model</h3>
              <span className="text-2xl font-bold text-[#2E5E4E]">100%</span>
            </div>

            {/* Visual Bar */}
            <div className="w-full h-8 flex rounded-full overflow-hidden shadow-inner bg-[#E7E5E0] mb-6">
              <div className="h-full bg-[#2E5E4E] transition-all" style={{ width: "40%" }} title="Spouse" />
              <div className="h-full border-l-2 border-white/20 bg-[#C6A969] transition-all" style={{ width: "30%" }} title="Son" />
              <div className="h-full border-l-2 border-white/20 bg-[#4B7F52] transition-all" style={{ width: "20%" }} title="Parents" />
              <div className="h-full border-l-2 border-white/20 bg-[#B85C5C] transition-all" style={{ width: "10%" }} title="Charity" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl border border-[#E7E5E0] bg-[#FCFBF8]">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-[#2E5E4E]" />
                  <span className="text-sm font-semibold text-[#1D1D1D]">Priya Swaroop</span>
                </div>
                <p className="text-[11px] text-[#6B6B6B] uppercase mb-1">Spouse</p>
                <p className="text-xl font-bold text-[#1D1D1D]">40%</p>
              </div>
              <div className="p-4 rounded-xl border border-[#E7E5E0] bg-[#FCFBF8]">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-[#C6A969]" />
                  <span className="text-sm font-semibold text-[#1D1D1D]">Rahul Swaroop</span>
                </div>
                <p className="text-[11px] text-[#6B6B6B] uppercase mb-1">Son</p>
                <p className="text-xl font-bold text-[#1D1D1D]">30%</p>
              </div>
              <div className="p-4 rounded-xl border border-[#E7E5E0] bg-[#FCFBF8]">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-[#4B7F52]" />
                  <span className="text-sm font-semibold text-[#1D1D1D]">Parents</span>
                </div>
                <p className="text-[11px] text-[#6B6B6B] uppercase mb-1">Joint Support</p>
                <p className="text-xl font-bold text-[#1D1D1D]">20%</p>
              </div>
              <div className="p-4 rounded-xl border border-[#E7E5E0] bg-[#FCFBF8]">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-[#B85C5C]" />
                  <span className="text-sm font-semibold text-[#1D1D1D]">Akshaya Patra</span>
                </div>
                <p className="text-[11px] text-[#6B6B6B] uppercase mb-1">Charitable Trust</p>
                <p className="text-xl font-bold text-[#1D1D1D]">10%</p>
              </div>
            </div>
          </div>

          {/* Second Row: Specific Rules & Conditions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            <div className="glass-panel rounded-3xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-xl bg-[#2E5E4E]/10">
                  <Clock className="w-5 h-5 text-[#2E5E4E]" />
                </div>
                <h3 className="text-lg font-semibold text-[#1D1D1D]">Timed Releases</h3>
              </div>
              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-[#E7E5E0] bg-[#FCFBF8]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-[#1D1D1D]">Rahul's Inheritance</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#C6A969] bg-[#C6A969]/10 px-2 py-0.5 rounded-full">Locked</span>
                  </div>
                  <p className="text-xs text-[#6B6B6B] leading-relaxed">
                    15% released at age 25. Remaining 15% released at age 30.
                  </p>
                </div>
                <div className="p-4 rounded-xl border border-[#E7E5E0] bg-[#FCFBF8]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-[#1D1D1D]">Charitable Trust</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#4B7F52] bg-[#4B7F52]/10 px-2 py-0.5 rounded-full">Annual</span>
                  </div>
                  <p className="text-xs text-[#6B6B6B] leading-relaxed">
                    Disbursed annually over a 5-year period post-activation.
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-panel rounded-3xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-xl bg-[#B85C5C]/10">
                  <ShieldAlert className="w-5 h-5 text-[#B85C5C]" />
                </div>
                <h3 className="text-lg font-semibold text-[#1D1D1D]">Conditional Access</h3>
              </div>
              <div className="p-4 rounded-xl border border-[#E7E5E0] bg-[#FCFBF8] mb-4">
                <div className="flex items-start gap-3">
                  <Info className="w-4 h-4 text-[#6B6B6B] mt-0.5" />
                  <div>
                    <span className="text-sm font-semibold text-[#1D1D1D] block mb-1">Education Requirement</span>
                    <p className="text-xs text-[#6B6B6B] leading-relaxed">
                      First tier of Rahul's inheritance requires confirmation of undergraduate degree completion by Executor.
                    </p>
                  </div>
                </div>
              </div>
              <button disabled={isViewFreeze || isFullFreeze} className="w-full py-3 border border-dashed border-[#E7E5E0] rounded-xl text-sm font-medium text-[#6B6B6B] hover:bg-[#F5F3EE] transition-colors disabled:opacity-50">
                + Add Condition
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
