"use client";

import { motion } from "framer-motion";
import { 
  ScrollText, ShieldCheck, AlertCircle, Sparkles, Scale, 
  UserPlus, FileCheck, Lock, Heart, Play, History, Clock, FileKey2 
} from "lucide-react";
import { AIInsightCard } from "@/components/dashboard/AIInsightCard";

export default function MyWillPage() {
  return (
    <div className="space-y-8 pb-10 max-w-7xl mx-auto">
      
      {/* 1. Header & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E7E5E0] pb-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-semibold tracking-tight text-[#1D1D1D] flex items-center gap-2">
            My Will & Legacy <ScrollText className="w-5 h-5 text-[#C6A969]" />
          </h2>
          <p className="text-[#6B6B6B] text-sm">A secure digital legacy and inheritance operating system.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 border border-[#E7E5E0] bg-[#FCFBF8] text-[#1D1D1D] rounded-xl text-sm font-medium hover:bg-[#F5F3EE] transition-colors">
            Preview Will
          </button>
          <button className="flex items-center gap-2 bg-[#1D1D1D] text-[#C6A969] px-4 py-2 rounded-xl text-sm font-medium hover:bg-black transition-colors shadow-lg shadow-black/5">
            <Lock className="w-4 h-4" /> Seal & Sign
          </button>
        </div>
      </div>

      {/* Top Row: Status & AI Guidance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Will Status Card */}
        <div className="lg:col-span-2 glass-panel rounded-3xl p-6 md:p-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-[#4B7F52]" />
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-xl font-bold text-[#1D1D1D]">Status: Draft</h3>
                <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#4B7F52]/10 text-[#4B7F52] border border-[#4B7F52]/20">
                  <ShieldCheck className="w-3 h-3" /> Legally Valid Structure
                </span>
              </div>
              <p className="text-sm text-[#6B6B6B]">Last updated: October 12, 2025</p>
            </div>
            <div className="text-right flex flex-col items-end">
              <span className="text-3xl font-bold text-[#2E5E4E]">85%</span>
              <span className="text-xs text-[#6B6B6B] uppercase tracking-wider font-medium">Completion Score</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-medium text-[#1D1D1D]">
              <span>Progress</span>
              <span>15% Remaining</span>
            </div>
            <div className="w-full h-2.5 bg-[#E7E5E0] rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "85%" }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-[#2E5E4E] rounded-full"
              />
            </div>
          </div>
        </div>

        {/* AI Guidance Panel */}
        <div className="lg:col-span-1 glass-panel rounded-3xl p-6 bg-gradient-to-br from-[#FCFBF8] to-[#F5F3EE]">
          <div className="flex items-center gap-2 mb-5">
            <Sparkles className="w-5 h-5 text-[#C6A969]" />
            <h3 className="text-base font-semibold text-[#1D1D1D]">Aegis Intelligence</h3>
          </div>
          <div className="space-y-3">
            <AIInsightCard 
              title="Assign a Backup Executor" 
              description="Your primary executor is set, but adding a backup prevents legal gridlock."
              type="warning"
            />
            <AIInsightCard 
              title="2 Nominees Missing" 
              description="Your Vanguard and LIC policies need beneficiaries attached to this Will."
              type="warning"
            />
          </div>
        </div>
      </div>

      {/* Second Row: Beneficiaries & Asset Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Beneficiaries Section */}
        <div className="glass-panel rounded-3xl p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[#2E5E4E]/10">
                <Heart className="w-5 h-5 text-[#2E5E4E]" />
              </div>
              <h3 className="text-lg font-semibold text-[#1D1D1D]">Beneficiaries</h3>
            </div>
            <button className="text-sm font-medium text-[#2E5E4E] hover:underline">Edit Allocation</button>
          </div>

          <div className="space-y-4">
            {/* Visual Bar */}
            <div className="w-full h-6 flex rounded-full overflow-hidden shadow-inner bg-[#E7E5E0]">
              <div className="h-full bg-[#2E5E4E]" style={{ width: "40%" }} title="Spouse" />
              <div className="h-full border-l border-white/20 bg-[#C6A969]" style={{ width: "30%" }} title="Son" />
              <div className="h-full border-l border-white/20 bg-[#4B7F52]" style={{ width: "20%" }} title="Parents" />
              <div className="h-full border-l border-white/20 bg-[#B85C5C]" style={{ width: "10%" }} title="Charity" />
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#2E5E4E]" />
                <span className="text-sm text-[#1D1D1D]">Spouse (40%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#C6A969]" />
                <span className="text-sm text-[#1D1D1D]">Children (30%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#4B7F52]" />
                <span className="text-sm text-[#1D1D1D]">Parents (20%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#B85C5C]" />
                <span className="text-sm text-[#1D1D1D]">Charities (10%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Asset Distribution Overview */}
        <div className="glass-panel rounded-3xl p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[#C6A969]/10">
                <Scale className="w-5 h-5 text-[#C6A969]" />
              </div>
              <h3 className="text-lg font-semibold text-[#1D1D1D]">Asset Inclusion</h3>
            </div>
            <span className="text-xs font-bold uppercase text-[#4B7F52] bg-[#4B7F52]/10 px-2 py-1 rounded-full">Fully Mapped</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {["Property (2)", "Insurance (1)", "Investments (4)", "Bank Accounts (3)", "Physical Gold", "Vault Items (12)"].map((asset, i) => (
              <div key={i} className="p-3 rounded-xl border border-[#E7E5E0] bg-[#FCFBF8] text-center flex flex-col items-center justify-center gap-2">
                <FileCheck className="w-4 h-4 text-[#2E5E4E]" />
                <span className="text-xs font-medium text-[#1D1D1D]">{asset}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Third Row: Executor Assignment & Emergency Rules */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Executor Assignment */}
        <div className="glass-panel rounded-3xl p-6 md:p-8">
          <h3 className="text-lg font-semibold text-[#1D1D1D] mb-5">Executor & Legal Contacts</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-xl border border-[#E7E5E0] bg-[#FCFBF8]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#2E5E4E]/10 flex items-center justify-center text-[#2E5E4E]">
                  <FileKey2 className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1D1D1D]">Priya Swaroop</p>
                  <p className="text-[11px] text-[#6B6B6B] uppercase tracking-wider">Primary Executor</p>
                </div>
              </div>
              <span className="text-xs text-[#4B7F52] font-medium px-2 py-1 bg-[#4B7F52]/10 rounded-lg">Verified</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl border border-[#B85C5C]/20 bg-[#FCFBF8] border-dashed">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#F5F3EE] flex items-center justify-center text-[#B85C5C]">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#B85C5C]">Assign Backup Executor</p>
                  <p className="text-[11px] text-[#6B6B6B] uppercase tracking-wider">Required for safety</p>
                </div>
              </div>
              <button className="text-xs font-medium text-[#FCFBF8] bg-[#B85C5C] px-3 py-1.5 rounded-lg hover:bg-[#a34f4f] transition-colors">Add</button>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl border border-[#E7E5E0] bg-[#FCFBF8]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#C6A969]/10 flex items-center justify-center text-[#C6A969]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1D1D1D]">Rajiv Menon (Lawyer)</p>
                  <p className="text-[11px] text-[#6B6B6B] uppercase tracking-wider">Legal Counsel</p>
                </div>
              </div>
              <span className="text-xs text-[#4B7F52] font-medium px-2 py-1 bg-[#4B7F52]/10 rounded-lg">Verified</span>
            </div>
          </div>
        </div>

        {/* Emergency Activation Rules */}
        <div className="glass-panel rounded-3xl p-6 md:p-8">
          <h3 className="text-lg font-semibold text-[#1D1D1D] mb-5">Emergency Activation Rules</h3>
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-[#F5F3EE] border border-[#E7E5E0]">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#2E5E4E] mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-[#1D1D1D]">Time-Delayed Release</h4>
                  <p className="text-xs text-[#6B6B6B] mt-1 leading-relaxed">
                    If an emergency unlock is requested, there is a mandatory 48-hour delay. You will be notified via SMS, Email, and Push to deny if it is a false alarm.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-[#F5F3EE] border border-[#E7E5E0]">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#2E5E4E] mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-[#1D1D1D]">Dual-Verification Requirement</h4>
                  <p className="text-xs text-[#6B6B6B] mt-1 leading-relaxed">
                    Will activation requires cryptographic signatures from both the Primary Executor and the Legal Counsel.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fourth Row: Future Messages & Secure Storage */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Future Messages / Legacy Notes */}
        <div className="glass-panel rounded-3xl p-6 md:p-8 border border-[#C6A969]/30">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-semibold text-[#1D1D1D]">Future Messages & Legacy</h3>
            <button className="text-xs font-medium bg-[#C6A969]/10 text-[#C6A969] px-3 py-1 rounded-full border border-[#C6A969]/20 hover:bg-[#C6A969]/20 transition-colors">
              + New Message
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-xl border border-[#E7E5E0] bg-[#FCFBF8] hover:shadow-sm cursor-pointer transition-shadow">
              <div className="flex items-center gap-2 mb-2">
                <Play className="w-4 h-4 text-[#B85C5C]" />
                <span className="text-sm font-semibold text-[#1D1D1D]">For Rahul</span>
              </div>
              <p className="text-xs text-[#6B6B6B]">Video Message • 4 mins</p>
              <p className="text-[10px] uppercase font-bold text-[#C6A969] mt-3">Open when: Turning 25</p>
            </div>
            <div className="p-4 rounded-xl border border-[#E7E5E0] bg-[#FCFBF8] hover:shadow-sm cursor-pointer transition-shadow">
              <div className="flex items-center gap-2 mb-2">
                <ScrollText className="w-4 h-4 text-[#2E5E4E]" />
                <span className="text-sm font-semibold text-[#1D1D1D]">Letter to Priya</span>
              </div>
              <p className="text-xs text-[#6B6B6B]">Written Note</p>
              <p className="text-[10px] uppercase font-bold text-[#C6A969] mt-3">Open when: Immediate</p>
            </div>
          </div>
        </div>

        {/* Secure Storage Section */}
        <div className="glass-panel rounded-3xl p-6 md:p-8 bg-[#1D1D1D] text-white">
          <h3 className="text-lg font-semibold text-[#C6A969] mb-5">Cryptographic Storage</h3>
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Encryption Status</span>
              <span className="flex items-center gap-1 text-sm font-bold text-[#4B7F52]"><Lock className="w-4 h-4" /> AES-256 Active</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Off-site Cold Backup</span>
              <span className="flex items-center gap-1 text-sm font-bold text-[#4B7F52]"><ShieldCheck className="w-4 h-4" /> Secured</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Integrity Hash</span>
              <span className="text-xs font-mono text-gray-500 bg-black/50 px-2 py-1 rounded">0x8F2A...9B1C</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-6 leading-relaxed">
            Your will is heavily encrypted. Aegis Vault administrators cannot read or modify its contents.
          </p>
        </div>
      </div>

      {/* Bottom: Timeline Activity */}
      <div className="glass-panel rounded-3xl p-6 md:p-8">
        <div className="flex items-center gap-2 mb-6">
          <History className="w-5 h-5 text-[#6B6B6B]" />
          <h3 className="text-lg font-semibold text-[#1D1D1D]">Audit Timeline</h3>
        </div>
        <div className="space-y-5 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-[#E7E5E0] before:via-[#E7E5E0] before:to-transparent">
          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className="flex items-center justify-center w-5 h-5 rounded-full bg-[#4B7F52] border-4 border-[#F5F3EE] text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10" />
            <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.5rem)] bg-[#FCFBF8] p-4 rounded-xl border border-[#E7E5E0]">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-semibold text-[#1D1D1D]">Asset Allocation Updated</span>
                <span className="text-[11px] text-[#6B6B6B]">Today, 10:45 AM</span>
              </div>
              <p className="text-xs text-[#6B6B6B]">You modified the percentage distribution for 'Children'.</p>
            </div>
          </div>
          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className="flex items-center justify-center w-5 h-5 rounded-full bg-[#E7E5E0] border-4 border-[#F5F3EE] shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10" />
            <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.5rem)] bg-[#FCFBF8] p-4 rounded-xl border border-[#E7E5E0]">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-semibold text-[#1D1D1D]">Legal Counsel Assigned</span>
                <span className="text-[11px] text-[#6B6B6B]">Oct 10, 2025</span>
              </div>
              <p className="text-xs text-[#6B6B6B]">Rajiv Menon was verified as Legal Counsel.</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
