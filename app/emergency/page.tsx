"use client";

import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, FileText, Phone, ArrowRight, BotMessageSquare, Building2, Landmark } from "lucide-react";

export default function EmergencyModePage() {
  return (
    <div className="space-y-8 pb-10 max-w-5xl mx-auto">
      {/* Emergency Header - Calm but authoritative */}
      <div className="bg-[#B85C5C]/5 border border-[#B85C5C]/20 rounded-3xl p-8 sm:p-10 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-[#B85C5C]" />
        <div className="w-16 h-16 rounded-full bg-[#B85C5C]/10 flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-8 h-8 text-[#B85C5C]" />
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-[#1D1D1D] mb-3">Emergency Recovery Mode</h2>
        <p className="text-[#6B6B6B] text-base max-w-2xl mx-auto leading-relaxed">
          Take a deep breath. Aegis Vault has secured all necessary information. 
          Follow the structured checklist below to notify institutions, access funds, and manage claims smoothly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: AI Guidance & Contacts */}
        <div className="lg:col-span-1 space-y-6">
          {/* AI Guidance */}
          <div className="glass-panel rounded-2xl p-6 border-t-4 border-t-[#2E5E4E]">
            <div className="flex items-center gap-3 mb-4">
              <BotMessageSquare className="w-5 h-5 text-[#2E5E4E]" />
              <h3 className="text-base font-semibold text-[#1D1D1D]">AI Recovery Assistant</h3>
            </div>
            <p className="text-sm text-[#6B6B6B] mb-5 leading-relaxed">
              Based on your family's profile, the most immediate action required is notifying LIC Insurance to initiate the term policy claim. I have prepared the necessary documents for you.
            </p>
            <button className="w-full py-2.5 bg-[#2E5E4E] text-[#FCFBF8] rounded-xl text-sm font-medium hover:bg-[#1f4236] transition-colors">
              Start Guided Claim
            </button>
          </div>

          {/* Important Contacts */}
          <div className="glass-panel rounded-2xl p-6">
            <h3 className="text-base font-semibold text-[#1D1D1D] mb-4">Crucial Contacts</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#FCFBF8] border border-[#E7E5E0]">
                <div>
                  <p className="text-sm font-semibold text-[#1D1D1D]">Rajiv Menon</p>
                  <p className="text-xs text-[#6B6B6B]">Family Attorney</p>
                </div>
                <button className="w-8 h-8 rounded-full bg-[#F5F3EE] flex items-center justify-center hover:bg-[#E7E5E0] transition-colors">
                  <Phone className="w-3.5 h-3.5 text-[#2E5E4E]" />
                </button>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#FCFBF8] border border-[#E7E5E0]">
                <div>
                  <p className="text-sm font-semibold text-[#1D1D1D]">LIC Claims Desk</p>
                  <p className="text-xs text-[#6B6B6B]">Policy #849201</p>
                </div>
                <button className="w-8 h-8 rounded-full bg-[#F5F3EE] flex items-center justify-center hover:bg-[#E7E5E0] transition-colors">
                  <Phone className="w-3.5 h-3.5 text-[#2E5E4E]" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Workflow & Checklist */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel rounded-2xl p-8">
            <h3 className="text-xl font-bold text-[#1D1D1D] mb-6">Immediate Action Checklist</h3>
            
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[1.1rem] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-[#E7E5E0] before:via-[#E7E5E0] before:to-transparent">
              
              {/* Step 1 */}
              <div className="relative flex items-start gap-6">
                <div className="w-9 h-9 rounded-full bg-[#4B7F52] flex items-center justify-center flex-shrink-0 z-10 border-4 border-[#FCFBF8]">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 bg-[#FCFBF8] border border-[#E7E5E0] p-5 rounded-xl opacity-60">
                  <h4 className="text-base font-semibold text-[#1D1D1D] strike">Locate Primary Documents</h4>
                  <p className="text-sm text-[#6B6B6B] mt-1">Death certificate and primary IDs have been uploaded to the vault.</p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative flex items-start gap-6">
                <div className="w-9 h-9 rounded-full bg-[#FCFBF8] border-2 border-[#C6A969] flex items-center justify-center flex-shrink-0 z-10 shadow-sm">
                  <span className="text-[#C6A969] font-bold text-sm">2</span>
                </div>
                <div className="flex-1 bg-[#FCFBF8] border border-[#C6A969]/30 p-5 rounded-xl shadow-sm ring-1 ring-[#C6A969]/10">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-base font-semibold text-[#1D1D1D]">Initiate Insurance Claims</h4>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#C6A969] bg-[#C6A969]/10 px-2 py-0.5 rounded-full">In Progress</span>
                  </div>
                  <p className="text-sm text-[#6B6B6B] mb-4">Contact LIC and HDFC Life to freeze premiums and initiate the payout workflow.</p>
                  <div className="flex gap-3">
                    <button className="flex items-center gap-1.5 text-xs font-medium text-[#2E5E4E] bg-[#2E5E4E]/5 px-3 py-1.5 rounded-lg border border-[#2E5E4E]/10 hover:bg-[#2E5E4E]/10">
                      <FileText className="w-3.5 h-3.5" /> View Policies
                    </button>
                    <button className="flex items-center gap-1.5 text-xs font-medium text-[#6B6B6B] bg-[#F5F3EE] px-3 py-1.5 rounded-lg border border-[#E7E5E0] hover:bg-[#E7E5E0]">
                      <Building2 className="w-3.5 h-3.5" /> Institution Guide
                    </button>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative flex items-start gap-6">
                <div className="w-9 h-9 rounded-full bg-[#F5F3EE] border-2 border-[#E7E5E0] flex items-center justify-center flex-shrink-0 z-10">
                  <span className="text-[#6B6B6B] font-bold text-sm">3</span>
                </div>
                <div className="flex-1 bg-[#FCFBF8] border border-[#E7E5E0] p-5 rounded-xl">
                  <h4 className="text-base font-semibold text-[#1D1D1D]">Bank Account Access</h4>
                  <p className="text-sm text-[#6B6B6B] mt-1 mb-4">Submit nominee forms to HDFC and ICICI banks to transfer primary account balances.</p>
                  <button className="flex items-center gap-1.5 text-xs font-medium text-[#6B6B6B] bg-[#F5F3EE] px-3 py-1.5 rounded-lg border border-[#E7E5E0] hover:bg-[#E7E5E0]">
                    <Landmark className="w-3.5 h-3.5" /> Generate Bank Letters
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
