"use client";

import { create } from "zustand";

export type Role = "farmer" | "warehouse" | "distributor" | "retailer" | "admin";

const ROLE_PROFILE: Record<Role, { companyName: string; userInitials: string }> = {
  farmer: {
    companyName: "Green Valley Farms / Produce Supplier",
    userInitials: "FA",
  },
  warehouse: {
    companyName: "Northstar Foods / Warehouse Ops",
    userInitials: "WH",
  },
  distributor: {
    companyName: "FastMove Logistics / Distributor",
    userInitials: "DI",
  },
  retailer: {
    companyName: "FreshMart Retail / Store Operations",
    userInitials: "RE",
  },
  admin: {
    companyName: "Northstar Foods / Enterprise Operations",
    userInitials: "NF",
  },
};

interface RoleStore {
  currentRole: Role;
  companyName: string;
  userInitials: string;
  setRole: (role: Role) => void;
}

export const useRoleStore = create<RoleStore>((set) => ({
  currentRole: "admin",
  companyName: ROLE_PROFILE.admin.companyName,
  userInitials: ROLE_PROFILE.admin.userInitials,
  setRole: (role) =>
    set({
      currentRole: role,
      companyName: ROLE_PROFILE[role].companyName,
      userInitials: ROLE_PROFILE[role].userInitials,
    }),
}));
