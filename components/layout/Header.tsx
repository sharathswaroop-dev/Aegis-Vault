"use client";

import { Bell, Bot, CheckCircle2, Menu, Search } from "lucide-react";
import { ROLE_OPTIONS } from "@/lib/constants";
import { usePlatformStore } from "@/lib/store";
import type { FoodFlowRole } from "@/lib/types";

export function Header() {
  const { role, setRole } = usePlatformStore();

  return (
    <header className="sticky top-0 z-30 flex h-20 w-full items-center justify-between border-b border-[#E5E7EB]/80 bg-[#F7F8F4]/90 px-4 backdrop-blur sm:px-6 lg:px-8">
      <div className="flex min-w-0 items-center gap-4">
        <button className="rounded-lg p-2 text-[#6B7280] hover:bg-white hover:text-[#111827] md:hidden">
          <Menu className="size-5" />
        </button>
        <div className="min-w-0">
          <p className="text-sm font-medium text-[#6B7280]">Operations Control</p>
          <h1 className="truncate text-lg font-semibold tracking-tight text-[#111827]">
            FoodFlow AI Platform
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative hidden lg:block">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#6B7280]" />
          <input
            type="search"
            placeholder="Search inventory, routes, suppliers..."
            className="h-10 w-80 rounded-lg border border-[#E5E7EB] bg-white pl-9 pr-3 text-sm outline-none transition focus:border-[#0F8F5F] focus:ring-3 focus:ring-[#0F8F5F]/10"
          />
        </div>

        <div className="hidden items-center gap-2 rounded-lg border border-[#E5E7EB] bg-white px-3 py-2 text-sm font-medium text-[#111827] sm:flex">
          <Bot className="size-4 text-[#0F8F5F]" />
          <span>AI online</span>
          <CheckCircle2 className="size-4 text-[#0F8F5F]" />
        </div>

        <select
          value={role}
          onChange={(event) => setRole(event.target.value as FoodFlowRole)}
          className="hidden h-10 rounded-lg border border-[#E5E7EB] bg-white px-3 text-sm font-medium text-[#111827] outline-none focus:border-[#0F8F5F] sm:block"
          aria-label="Current role"
        >
          {ROLE_OPTIONS.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>

        <button className="relative rounded-lg border border-[#E5E7EB] bg-white p-2 text-[#6B7280] transition hover:text-[#111827]">
          <Bell className="size-5" />
          <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-[#0F8F5F]" />
        </button>

        <div className="flex size-10 items-center justify-center rounded-full bg-[#111827] text-sm font-semibold text-white">
          NF
        </div>
      </div>
    </header>
  );
}
