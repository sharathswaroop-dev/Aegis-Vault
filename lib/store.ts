"use client";

import { create } from "zustand";
import { shelfLifeRules } from "@/lib/mock-data";
import type { FoodFlowRole, ShelfLifeRule } from "@/lib/types";

interface PlatformState {
  role: FoodFlowRole;
  agingRules: ShelfLifeRule[];
  setRole: (role: FoodFlowRole) => void;
  updateAgingRule: (category: string, rule: Omit<ShelfLifeRule, "category">) => void;
}

export const usePlatformStore = create<PlatformState>((set) => ({
  role: "Admin",
  agingRules: shelfLifeRules,
  setRole: (role) => set({ role }),
  updateAgingRule: (category, rule) =>
    set((state) => ({
      agingRules: state.agingRules.map((item) =>
        item.category === category ? { category, ...rule } : item,
      ),
    })),
}));
