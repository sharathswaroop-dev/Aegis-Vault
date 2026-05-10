"use client";

import { motion } from "framer-motion";
import { NomineeCard } from "@/components/dashboard/NomineeCard";
import { Plus, ShieldAlert, Settings2 } from "lucide-react";

export default function NomineesPage() {
  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-semibold tracking-tight text-[#1D1D1D]">Nominee Management</h2>
          <p className="text-[#6B6B6B] text-sm">Manage who has access to your family's assets and legacy documents.</p>
        </div>
        <button className="flex items-center gap-2 bg-[#2E5E4E] text-[#FCFBF8] px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#1f4236] transition-colors shadow-sm self-start sm:self-auto">
          <Plus className="w-4 h-4" /> Add Nominee
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: List of Nominees */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6 border-b border-[#E7E5E0] pb-4">
              <h3 className="text-lg font-semibold text-[#1D1D1D]">Active Nominees</h3>
              <div className="flex items-center gap-2 text-[#6B6B6B]">
                <Settings2 className="w-4 h-4" />
                <span className="text-sm">Manage Roles</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <NomineeCard name="Priya Swaroop" relation="Spouse" accessLevel="Full Access" hasEmergencyAccess={true} />
              <NomineeCard name="Rahul Swaroop" relation="Son" accessLevel="View Only" hasEmergencyAccess={false} />
              <NomineeCard name="Anya Swaroop" relation="Daughter" accessLevel="View Only" hasEmergencyAccess={false} />
              <NomineeCard name="Rajiv Menon" relation="Attorney" accessLevel="Documents Only" hasEmergencyAccess={true} />
            </div>
          </div>
        </div>

        {/* Right Column: Permissions & Emergency Config */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-panel rounded-2xl p-6 border border-[#B85C5C]/20">
            <div className="w-10 h-10 rounded-full bg-[#B85C5C]/10 flex items-center justify-center mb-4">
              <ShieldAlert className="w-5 h-5 text-[#B85C5C]" />
            </div>
            <h3 className="text-base font-semibold text-[#1D1D1D] mb-2">Emergency Access Protocol</h3>
            <p className="text-sm text-[#6B6B6B] mb-4 leading-relaxed">
              In the event of an emergency, designated nominees can request an emergency unlock. You have a 48-hour window to deny the request before access is granted.
            </p>
            <button className="w-full py-2 bg-[#FCFBF8] border border-[#E7E5E0] text-[#1D1D1D] rounded-lg text-sm font-medium hover:bg-[#F5F3EE] transition-colors">
              Configure Protocol
            </button>
          </div>
          
          <div className="glass-panel rounded-2xl p-6">
            <h3 className="text-base font-semibold text-[#1D1D1D] mb-4">Permission Levels</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-[#1D1D1D]">Full Access</p>
                <p className="text-[13px] text-[#6B6B6B] mt-0.5">Can view, edit, and manage all family assets and documents.</p>
              </div>
              <div>
                <p className="text-sm font-medium text-[#1D1D1D]">View Only</p>
                <p className="text-[13px] text-[#6B6B6B] mt-0.5">Read-only access to specific assigned assets.</p>
              </div>
              <div>
                <p className="text-sm font-medium text-[#1D1D1D]">Documents Only</p>
                <p className="text-[13px] text-[#6B6B6B] mt-0.5">Restricted to Family Vault legal documents (Wills, Deeds).</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
