"use client";

import { motion } from "framer-motion";
import { 
  User, Shield, Laptop, Smartphone, Monitor, Tablet, 
  MapPin, Clock, ShieldCheck, Users, Lock, Network, 
  ChevronRight, MoreHorizontal, Bell, ShieldAlert
} from "lucide-react";
import { FAMILY_REGISTRY, computeGovernanceScore } from "@/lib/familyRegistry";

// ─── Micro-Components ────────────────────────────────────────────────────────────

function PortfolioCard({ icon, label, value, color }: any) {
  return (
    <div className="glass-panel p-5 rounded-3xl bg-white space-y-3">
      <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}10`, color }}>
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-bold text-[#6B6B6B] uppercase tracking-widest">{label}</p>
        <p className="text-xl font-bold text-[#1D1D1D] mt-1">{value}</p>
      </div>
    </div>
  );
}

function DeviceCard({ icon, name, status, lastSeen, location, isCurrent }: any) {
  return (
    <div className="glass-panel p-5 rounded-3xl bg-white border border-[#E7E5E0] group hover:border-[#2E5E4E]/40 transition-all">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-2xl bg-[#F5F3EE] text-[#6B6B6B] group-hover:bg-[#2E5E4E]/10 group-hover:text-[#2E5E4E] transition-all`}>
          {icon}
        </div>
        <div className="flex items-center gap-2">
           {!isCurrent && (
             <button className="text-[10px] font-bold text-[#B85C5C] hover:bg-[#B85C5C]/5 px-2 py-1 rounded-lg transition-all uppercase tracking-wider opacity-0 group-hover:opacity-100">
               Remove
             </button>
           )}
           <button className="p-2 text-[#E7E5E0] hover:text-[#6B6B6B] transition-colors">
             <MoreHorizontal size={18} />
           </button>
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-sm font-bold text-[#1D1D1D] flex items-center gap-2">
          {name}
          {isCurrent && (
            <span className="text-[8px] font-bold uppercase tracking-wider bg-[#2E5E4E]/10 text-[#2E5E4E] px-1.5 py-0.5 rounded-full">
              Active
            </span>
          )}
        </p>
        <p className="text-[10px] font-bold uppercase tracking-wide text-[#4B7F52]">{status}</p>
      </div>
      <div className="mt-4 pt-4 border-t border-[#E7E5E0] space-y-2">
        <div className="flex items-center gap-2 text-[10px] text-[#6B6B6B] uppercase tracking-wide font-medium">
          <Clock size={10} /> {lastSeen}
        </div>
        <div className="flex items-center gap-2 text-[10px] text-[#6B6B6B] uppercase tracking-wide font-medium">
          <MapPin size={10} /> {location}
        </div>
      </div>
    </div>
  );
}

function ToggleItem({ label, active }: { label: string; active: boolean }) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-[#E7E5E0]/60 last:border-0">
      <span className="text-sm font-medium text-[#1D1D1D]">{label}</span>
      <div className={`w-10 h-6 rounded-full flex items-center p-1 transition-colors ${active ? "bg-[#4B7F52]" : "bg-[#E7E5E0]"}`}>
        <motion.div 
          layout 
          className="w-4 h-4 rounded-full bg-white shadow-sm"
          animate={{ x: active ? 16 : 0 }}
        />
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ExecutiveSettingsPage() {
  const owner = FAMILY_REGISTRY[0];
  const score = computeGovernanceScore(FAMILY_REGISTRY);

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-24">
      
      {/* 1. Header & Owner Profile */}
      <div className="glass-panel p-8 md:p-10 rounded-[40px] bg-gradient-to-br from-[#F5F3EE] via-white to-white flex flex-col md:flex-row items-center md:items-end justify-between gap-8 border border-[#E7E5E0]">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-[#1D1D1D] flex items-center justify-center text-3xl font-bold text-white shadow-2xl">
              {owner.initials}
            </div>
            <div className="absolute -bottom-1 -right-1 p-1.5 bg-white rounded-full shadow-lg border border-[#E7E5E0]">
               <ShieldCheck className="w-5 h-5 text-[#2E5E4E]" />
            </div>
          </div>
          <div className="text-center md:text-left space-y-1">
            <h2 className="text-3xl font-bold text-[#1D1D1D] tracking-tight">{owner.name}</h2>
            <p className="text-sm font-bold text-[#2E5E4E] uppercase tracking-widest">Primary Vault Owner</p>
            <p className="text-xs text-[#6B6B6B] font-medium italic">Aegis Legacy Tier · Verified Registry Identity</p>
          </div>
        </div>
        <div className="flex gap-4">
           <div className="text-right">
              <p className="text-[10px] font-bold text-[#6B6B6B] uppercase tracking-widest mb-1">Governance Score</p>
              <p className="text-3xl font-bold text-[#1D1D1D]">{score}%</p>
           </div>
        </div>
      </div>

      {/* 2. Portfolio Identity */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        <PortfolioCard icon={<Users size={18}/>} label="Family Members" value="06" color="#2E5E4E" />
        <PortfolioCard icon={<Shield size={18}/>} label="Beneficiaries" value="04" color="#4B7F52" />
        <PortfolioCard icon={<Lock size={18}/>} label="Active Vaults" value="03" color="#1D1D1D" />
        <PortfolioCard icon={<Network size={18}/>} label="Connected Trusts" value="02" color="#C6A969" />
        <PortfolioCard icon={<ShieldCheck size={18}/>} label="Family Readiness" value="84%" color="#2E5E4E" />
        <PortfolioCard icon={<ShieldCheck size={18}/>} label="Protection" value="Active" color="#4B7F52" />
      </div>

      {/* 3. Connected Devices */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-sm font-bold text-[#1D1D1D] uppercase tracking-widest">Connected Devices</h3>
          <button className="text-xs font-bold text-[#2E5E4E] hover:underline">Manage All</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <DeviceCard icon={<Monitor size={24}/>} name="MacBook Pro 16”" status="Trusted Device" lastSeen="Now" location="Bengaluru" isCurrent />
          <DeviceCard icon={<Smartphone size={24}/>} name="iPhone 16 Pro Max" status="Trusted Device" lastSeen="2h ago" location="Bengaluru" />
          <DeviceCard icon={<Monitor size={24}/>} name="Windows Desktop" status="Unrecognized" lastSeen="4h ago" location="Dubai" />
          <DeviceCard icon={<Tablet size={24}/>} name="iPad Air" status="Trusted Device" lastSeen="1d ago" location="Home" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* 4. Session Overview */}
        <div className="lg:col-span-3 space-y-6">
           <h3 className="text-sm font-bold text-[#1D1D1D] uppercase tracking-widest px-2">Session Overview</h3>
           <div className="glass-panel rounded-[32px] bg-white border border-[#E7E5E0] overflow-hidden">
              <div className="divide-y divide-[#E7E5E0]">
                 <SessionItem time="Active Now" label="Secure Dashboard Access" location="Bengaluru · MacBook Pro" active />
                 <SessionItem time="2 hours ago" label="Mobile Vault Inspection" location="Bengaluru · iPhone 16" />
                 <SessionItem time="4 hours ago" label="Attempted Login (Unknown)" location="Dubai · Windows Desktop" suspicious />
                 <SessionItem time="Yesterday" label="Trust Allocation Review" location="Bengaluru · MacBook Pro" />
                 <SessionItem time="Oct 24" label="Global Security Audit" location="London · System Revoked" revoked />
              </div>
           </div>
        </div>

      </div>

    </div>
  );
}

function SessionItem({ time, label, location, active, suspicious, revoked }: any) {
  return (
    <div className="flex items-center justify-between p-5 hover:bg-[#F5F3EE] transition-all group">
      <div className="flex items-center gap-4">
        <div className={`w-2 h-2 rounded-full ${active ? "bg-[#4B7F52]" : suspicious ? "bg-[#C6A969]" : revoked ? "bg-[#B85C5C]" : "bg-[#E7E5E0]"}`} />
        <div>
          <p className={`text-sm font-bold ${suspicious ? "text-[#C6A969]" : revoked ? "text-[#B85C5C]" : "text-[#1D1D1D]"}`}>{label}</p>
          <p className="text-[10px] text-[#6B6B6B] uppercase tracking-wide mt-0.5">{location}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-[10px] font-bold text-[#6B6B6B] uppercase tracking-widest">{time}</p>
      </div>
    </div>
  );
}
