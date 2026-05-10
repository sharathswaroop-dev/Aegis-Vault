"use client";

import { motion } from "framer-motion";

interface FilterTabsProps {
  tabs: string[];
  activeTab: string;
  onChange: (tab: string) => void;
}

export function FilterTabs({ tabs, activeTab, onChange }: FilterTabsProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {tabs.map((tab) => {
        const isActive = activeTab === tab;
        return (
          <button
            key={tab}
            onClick={() => onChange(tab)}
            className={`
              relative px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap
              ${isActive ? "text-[#FCFBF8]" : "text-[#6B6B6B] hover:text-[#1D1D1D] hover:bg-[#E7E5E0]/50"}
            `}
          >
            {isActive && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-[#2E5E4E] rounded-full -z-10"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            {tab}
          </button>
        );
      })}
    </div>
  );
}
