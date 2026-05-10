"use client";

import { motion } from "framer-motion";
import { 
  Gift, Heart, GraduationCap, Calendar, PiggyBank, 
  MessageSquare, Sparkles, Clock, ArrowRight, ShieldCheck, 
  PartyPopper, Landmark, Lock
} from "lucide-react";
import { AIInsightCard } from "@/components/dashboard/AIInsightCard";

export default function SmartGiftingPage() {
  return (
    <div className="space-y-8 pb-10 max-w-7xl mx-auto">
      
      {/* 1. Header & Overview */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E7E5E0] pb-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-semibold tracking-tight text-[#1D1D1D] flex items-center gap-2">
            Family Support & Gifting <Gift className="w-5 h-5 text-[#C6A969]" />
          </h2>
          <p className="text-[#6B6B6B] text-sm">AI-powered family financial support and legacy infrastructure.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 border border-[#E7E5E0] bg-[#FCFBF8] text-[#1D1D1D] rounded-xl text-sm font-medium hover:bg-[#F5F3EE] transition-colors">
            Contribution History
          </button>
          <button className="flex items-center gap-2 bg-[#2E5E4E] text-[#FCFBF8] px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#1f4236] transition-colors shadow-sm">
            <PlusIcon /> New Gift Protocol
          </button>
        </div>
      </div>

      {/* Top Row: AI Insights & Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Stats */}
        <div className="lg:col-span-2 grid grid-cols-2 gap-4">
          <div className="glass-panel rounded-3xl p-6 flex flex-col justify-between">
            <div className="w-10 h-10 rounded-full bg-[#4B7F52]/10 flex items-center justify-center mb-4">
              <PiggyBank className="w-5 h-5 text-[#4B7F52]" />
            </div>
            <div>
              <p className="text-sm text-[#6B6B6B] mb-1">Active Support Pools</p>
              <p className="text-2xl font-bold text-[#1D1D1D]">$42,500</p>
            </div>
          </div>
          <div className="glass-panel rounded-3xl p-6 flex flex-col justify-between border border-[#C6A969]/30 bg-[#C6A969]/5">
            <div className="w-10 h-10 rounded-full bg-[#C6A969]/10 flex items-center justify-center mb-4">
              <Calendar className="w-5 h-5 text-[#C6A969]" />
            </div>
            <div>
              <p className="text-sm text-[#C6A969] font-medium mb-1">Upcoming Events</p>
              <p className="text-2xl font-bold text-[#1D1D1D]">2 Milestones</p>
              <p className="text-xs text-[#6B6B6B] mt-1">Next: Rahul's Birthday (12 days)</p>
            </div>
          </div>
        </div>

        {/* AI Guidance Panel */}
        <div className="lg:col-span-1 glass-panel rounded-3xl p-6 bg-gradient-to-br from-[#FCFBF8] to-[#F5F3EE]">
          <div className="flex items-center gap-2 mb-5">
            <Sparkles className="w-5 h-5 text-[#C6A969]" />
            <h3 className="text-base font-semibold text-[#1D1D1D]">Gifting Intelligence</h3>
          </div>
          <div className="space-y-3">
            <AIInsightCard 
              title="Education Reserve Notice" 
              description="Anya's college fund is 12% below the recommended Q3 target."
              type="warning"
            />
            <AIInsightCard 
              title="Parental Support Due" 
              description="Monthly healthcare contribution for parents is scheduled for tomorrow."
              type="neutral"
            />
          </div>
        </div>
      </div>

      {/* Second Row: Family Contribution Pools & Scheduled Gifting */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Family Contribution Pools */}
        <div className="glass-panel rounded-3xl p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[#2E5E4E]/10">
                <Landmark className="w-5 h-5 text-[#2E5E4E]" />
              </div>
              <h3 className="text-lg font-semibold text-[#1D1D1D]">Family Support Pools</h3>
            </div>
          </div>

          <div className="space-y-4">
            <PoolCard 
              title="Parents Healthcare Reserve" 
              target="$50,000" 
              current="$32,400" 
              progress={64} 
              color="#4B7F52" 
              icon={<Heart className="w-4 h-4 text-white" />}
            />
            <PoolCard 
              title="Anya's Stanford Fund" 
              target="$120,000" 
              current="$45,000" 
              progress={37} 
              color="#C6A969" 
              icon={<GraduationCap className="w-4 h-4 text-white" />}
            />
            <PoolCard 
              title="Rahul's Wedding Pool" 
              target="$30,000" 
              current="$12,000" 
              progress={40} 
              color="#2E5E4E" 
              icon={<PartyPopper className="w-4 h-4 text-white" />}
            />
          </div>
        </div>

        {/* Scheduled Gifting Frameworks */}
        <div className="glass-panel rounded-3xl p-6 md:p-8 border border-[#C6A969]/20">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[#C6A969]/10">
                <Clock className="w-5 h-5 text-[#C6A969]" />
              </div>
              <h3 className="text-lg font-semibold text-[#1D1D1D]">Automated Gifting</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <FrameworkCard title="Monthly Support" desc="Recurring transfers" icon={<Calendar className="w-4 h-4" />} />
            <FrameworkCard title="Birthday Protocol" desc="Annual automated gifts" icon={<Gift className="w-4 h-4" />} />
            <FrameworkCard title="Age-Based Release" desc="Trust distribution" icon={<ShieldCheck className="w-4 h-4" />} />
            <FrameworkCard title="Festival Gifting" desc="Diwali & Holidays" icon={<Sparkles className="w-4 h-4" />} />
          </div>
          <button className="w-full mt-4 py-3 border border-dashed border-[#E7E5E0] rounded-xl text-sm font-medium text-[#6B6B6B] hover:bg-[#F5F3EE] transition-colors flex items-center justify-center gap-2">
            <PlusIcon /> Create Automation Rule
          </button>
        </div>
      </div>

      {/* Third Row: Emotional Gift Messages & Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Emotional Gift Messages */}
        <div className="lg:col-span-2 glass-panel rounded-3xl p-6 md:p-8">
          <div className="flex items-center justify-between mb-6 border-b border-[#E7E5E0] pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[#B85C5C]/10">
                <MessageSquare className="w-5 h-5 text-[#B85C5C]" />
              </div>
              <h3 className="text-lg font-semibold text-[#1D1D1D]">Legacy Messages</h3>
            </div>
            <span className="text-xs font-bold uppercase text-[#B85C5C] bg-[#B85C5C]/10 px-2 py-1 rounded-full">Time-Locked</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl border border-[#E7E5E0] bg-[#FCFBF8] relative overflow-hidden group hover:shadow-sm transition-shadow">
              <div className="absolute top-0 right-0 p-3">
                <Lock className="w-4 h-4 text-[#C6A969]" />
              </div>
              <h4 className="text-sm font-semibold text-[#1D1D1D] mb-1">To: Rahul</h4>
              <p className="text-xs text-[#6B6B6B] mb-4">"For your first home downpayment..."</p>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C6A969] bg-[#C6A969]/10 px-2 py-1 rounded-lg">Open when: Age 30</span>
                <span className="text-xs font-medium text-[#2E5E4E]">$50,000 Bond</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl border border-[#E7E5E0] bg-[#FCFBF8] relative overflow-hidden group hover:shadow-sm transition-shadow">
              <div className="absolute top-0 right-0 p-3">
                <Lock className="w-4 h-4 text-[#C6A969]" />
              </div>
              <h4 className="text-sm font-semibold text-[#1D1D1D]">To: Anya</h4>
              <p className="text-xs text-[#6B6B6B] mb-4">"Graduation gift and letter..."</p>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C6A969] bg-[#C6A969]/10 px-2 py-1 rounded-lg">Open when: Graduation</span>
                <span className="text-xs font-medium text-[#2E5E4E]">$10,000 + Video</span>
              </div>
            </div>
          </div>
        </div>

        {/* Gift Timeline */}
        <div className="lg:col-span-1 glass-panel rounded-3xl p-6 md:p-8">
          <h3 className="text-lg font-semibold text-[#1D1D1D] mb-6">Support Timeline</h3>
          <div className="space-y-5 relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-[#E7E5E0] before:via-[#E7E5E0] before:to-transparent">
            
            <div className="relative flex items-start gap-4">
              <div className="w-6 h-6 rounded-full bg-[#FCFBF8] border-2 border-[#C6A969] flex items-center justify-center flex-shrink-0 z-10 shadow-sm mt-0.5">
                <div className="w-2 h-2 rounded-full bg-[#C6A969]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#1D1D1D]">Parents Medical</p>
                <p className="text-[11px] text-[#6B6B6B] mt-0.5">Scheduled • Oct 15</p>
                <p className="text-xs font-medium text-[#2E5E4E] mt-1">$1,200 Transfer</p>
              </div>
            </div>

            <div className="relative flex items-start gap-4">
              <div className="w-6 h-6 rounded-full bg-[#4B7F52] border-2 border-[#FCFBF8] flex items-center justify-center flex-shrink-0 z-10 shadow-sm mt-0.5">
                <CheckIcon />
              </div>
              <div className="opacity-70">
                <p className="text-sm font-semibold text-[#1D1D1D]">Priya's Birthday</p>
                <p className="text-[11px] text-[#6B6B6B] mt-0.5">Completed • Sep 22</p>
                <p className="text-xs font-medium text-[#2E5E4E] mt-1">Digital Gold Gift</p>
              </div>
            </div>
            
            <div className="relative flex items-start gap-4">
              <div className="w-6 h-6 rounded-full bg-[#4B7F52] border-2 border-[#FCFBF8] flex items-center justify-center flex-shrink-0 z-10 shadow-sm mt-0.5">
                <CheckIcon />
              </div>
              <div className="opacity-70">
                <p className="text-sm font-semibold text-[#1D1D1D]">Education Fund</p>
                <p className="text-[11px] text-[#6B6B6B] mt-0.5">Completed • Sep 01</p>
                <p className="text-xs font-medium text-[#2E5E4E] mt-1">$5,000 Deposit</p>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}

// Inline Micro-Components for specific UI needs

function PlusIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
  );
}

function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
  );
}

function PoolCard({ title, target, current, progress, color, icon }: any) {
  return (
    <div className="p-4 rounded-xl border border-[#E7E5E0] bg-[#FCFBF8]">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: color }}>
            {icon}
          </div>
          <span className="text-sm font-semibold text-[#1D1D1D]">{title}</span>
        </div>
        <div className="text-right">
          <span className="text-sm font-bold text-[#1D1D1D]">{current}</span>
          <span className="text-xs text-[#6B6B6B] ml-1">/ {target}</span>
        </div>
      </div>
      <div className="w-full h-1.5 bg-[#E7E5E0] rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  );
}

function FrameworkCard({ title, desc, icon }: any) {
  return (
    <div className="p-3 rounded-xl border border-[#E7E5E0] bg-[#FCFBF8] flex items-start gap-3 hover:shadow-sm cursor-pointer transition-shadow">
      <div className="p-2 rounded-lg bg-[#F5F3EE] text-[#2E5E4E]">
        {icon}
      </div>
      <div>
        <p className="text-sm font-semibold text-[#1D1D1D]">{title}</p>
        <p className="text-[11px] text-[#6B6B6B] mt-0.5">{desc}</p>
      </div>
    </div>
  );
}
