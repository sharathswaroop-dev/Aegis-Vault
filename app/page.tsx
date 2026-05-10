"use client";

import { motion } from "framer-motion";
import { WalletCards, Users, Bell, SearchCheck } from "lucide-react";
import { FamilyReadiness } from "@/components/dashboard/FamilyReadiness";
import { EmergencyBanner } from "@/components/dashboard/EmergencyBanner";
import { StatCard } from "@/components/dashboard/StatCard";
import { AIInsightCard } from "@/components/dashboard/AIInsightCard";
import { AssetCard } from "@/components/dashboard/AssetCard";
import { NomineeCard } from "@/components/dashboard/NomineeCard";
import { ReminderCard } from "@/components/dashboard/ReminderCard";

export default function Dashboard() {
  return (
    <div className="space-y-8 pb-10">
      
      {/* 1. Greeting Header */}
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-semibold tracking-tight text-[#1D1D1D]">Family Dashboard</h2>
        <p className="text-[#6B6B6B] text-sm">An overview of your family's financial continuity and preparedness.</p>
      </div>

      {/* 4. Emergency Banner */}
      <EmergencyBanner />

      {/* 2. Family Readiness Score */}
      <FamilyReadiness />

      {/* 3. Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Family Assets"
          value="$2.4M"
          icon={<WalletCards size={20} />}
          trend={{ value: "+2.1%", isPositive: true, text: "vs last month" }}
          delay={0.1}
        />
        <StatCard
          title="Active Nominees"
          value="4"
          icon={<Users size={20} />}
          trend={{ value: "1 missing", isPositive: false, text: "for HDFC Account" }}
          delay={0.2}
        />
        <StatCard
          title="Actions Needed"
          value="3"
          icon={<Bell size={20} />}
          trend={{ value: "Priority", isPositive: false, text: "document renewals" }}
          delay={0.3}
        />
        <StatCard
          title="AI Protection Scans"
          value="24"
          icon={<SearchCheck size={20} />}
          trend={{ value: "All clear", isPositive: true, text: "in last 30 days" }}
          delay={0.4}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (Span 2): Assets & Nominees */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* 5. Assets Overview */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="glass-panel rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-[#1D1D1D]">Family Assets</h3>
              <button className="text-sm font-medium text-[#2E5E4E] hover:underline">View All</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <AssetCard name="HDFC Primary Checking" type="bank" value="$42,500" nomineeStatus="missing" documentStatus="complete" />
              <AssetCard name="LIC Term Life" type="insurance" value="$500,000" nomineeStatus="complete" documentStatus="missing" />
              <AssetCard name="Downtown Apartment" type="property" value="$1.2M" nomineeStatus="pending" documentStatus="pending" />
              <AssetCard name="Vanguard Index Fund" type="investment" value="$650,000" nomineeStatus="complete" documentStatus="complete" />
            </div>
          </motion.div>

          {/* 6. Nominee Overview */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="glass-panel rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-[#1D1D1D]">Active Nominees</h3>
              <button className="text-sm font-medium text-[#2E5E4E] hover:underline">Manage</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <NomineeCard name="Priya Swaroop" relation="Spouse" accessLevel="Full Access" hasEmergencyAccess={true} />
              <NomineeCard name="Rahul Swaroop" relation="Son" accessLevel="View Only" hasEmergencyAccess={false} />
            </div>
          </motion.div>

        </div>

        {/* Right Column: AI Insights & Reminders */}
        <div className="space-y-6">
          
          {/* 7. AI Insights */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="glass-panel rounded-2xl p-6"
          >
            <h3 className="text-lg font-semibold text-[#1D1D1D] mb-4">Aegis AI Insights</h3>
            <div className="space-y-3">
              <AIInsightCard 
                title="Asset allocation is stable" 
                description="Your family's liquidity ratio has improved, providing a better safety net for emergency reserves."
                type="positive"
              />
              <AIInsightCard 
                title="Map a secondary nominee" 
                description="You have 2 accounts where only one primary nominee is listed. Adding a secondary nominee ensures smoother inheritance."
                type="warning"
              />
            </div>
          </motion.div>

          {/* 8. Upcoming Reminders */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="glass-panel rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-[#1D1D1D]">Upcoming Actions</h3>
            </div>
            <div className="space-y-3">
              <ReminderCard title="Renew Term Life Insurance" date="In 14 days" urgency="high" />
              <ReminderCard title="Add nominee to HDFC Account" date="Action required" urgency="medium" />
              <ReminderCard title="Update Property Tax Records" date="In 2 months" urgency="low" />
            </div>
          </motion.div>

        </div>
      </div>

    </div>
  );
}
