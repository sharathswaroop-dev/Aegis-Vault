"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FilterTabs } from "@/components/ui/FilterTabs";
import { AssetCard } from "@/components/dashboard/AssetCard";
import { Plus } from "lucide-react";

const TABS = ["All Assets", "Bank Accounts", "Insurance", "Properties", "Investments", "Gold", "Liabilities"];

export default function AssetsPage() {
  const [activeTab, setActiveTab] = useState("All Assets");

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-semibold tracking-tight text-[#1D1D1D]">Family Assets</h2>
          <p className="text-[#6B6B6B] text-sm">Track and organize your family's entire financial footprint.</p>
        </div>
        <button className="flex items-center gap-2 bg-[#2E5E4E] text-[#FCFBF8] px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#1f4236] transition-colors shadow-sm self-start sm:self-auto">
          <Plus className="w-4 h-4" /> Add Asset
        </button>
      </div>

      {/* Analytics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-panel p-5 rounded-2xl">
          <p className="text-sm text-[#6B6B6B] mb-1">Total Net Worth</p>
          <p className="text-2xl font-bold text-[#1D1D1D]">$2,450,000</p>
        </div>
        <div className="glass-panel p-5 rounded-2xl">
          <p className="text-sm text-[#6B6B6B] mb-1">Protection Gap</p>
          <p className="text-2xl font-bold text-[#1D1D1D]">$150,000</p>
        </div>
        <div className="glass-panel p-5 rounded-2xl border border-[#C6A969]/30 bg-[#C6A969]/5">
          <p className="text-sm text-[#C6A969] mb-1 font-medium">Attention Needed</p>
          <p className="text-2xl font-bold text-[#1D1D1D]">2 Assets</p>
          <p className="text-xs text-[#6B6B6B] mt-1">Missing nominees</p>
        </div>
      </div>

      {/* Tabs */}
      <FilterTabs tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />

      {/* Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 lg:grid-cols-2 gap-4"
      >
        <AssetCard 
          name="HDFC Primary Checking" 
          type="bank" 
          value="$42,500" 
          nomineeStatus="missing" 
          documentStatus="complete"
        />
        <AssetCard 
          name="LIC Term Life Insurance" 
          type="insurance" 
          value="$500,000" 
          nomineeStatus="complete" 
          documentStatus="complete"
          expiryDate="Oct 2026"
        />
        <AssetCard 
          name="Downtown Apartment" 
          type="property" 
          value="$1.2M" 
          nomineeStatus="pending" 
          documentStatus="pending"
        />
        <AssetCard 
          name="Vanguard S&P 500 ETF" 
          type="investment" 
          value="$650,000" 
          nomineeStatus="complete" 
          documentStatus="complete"
        />
        <AssetCard 
          name="Digital Gold Reserve" 
          type="gold" 
          value="$12,500" 
          nomineeStatus="complete" 
          documentStatus="complete"
        />
        <AssetCard 
          name="Home Mortgage" 
          type="loan" 
          value="-$450,000" 
          nomineeStatus="complete" 
          documentStatus="complete"
        />
      </motion.div>
    </div>
  );
}
