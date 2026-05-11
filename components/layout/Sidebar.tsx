"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Leaf } from "lucide-react";
import { NAV_GROUPS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-72 flex-col border-r border-[#E5E7EB] bg-white md:flex">
      <div className="flex h-20 items-center border-b border-[#E5E7EB] px-6">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-lg bg-[#0F8F5F] text-white">
            <Leaf className="size-5" />
          </div>
          <div>
            <div className="text-base font-semibold tracking-tight text-[#111827]">
              FoodFlow AI
            </div>
            <div className="text-xs font-medium text-[#6B7280]">
              Supply intelligence
            </div>
          </div>
        </Link>
      </div>

      <nav className="flex-1 space-y-7 overflow-y-auto px-4 py-6">
        {NAV_GROUPS.map((group) => (
          <div key={group.label}>
            <div className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6B7280]">
              {group.label}
            </div>
            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const active =
                  pathname === item.href ||
                  (item.href !== "/dashboard" && pathname.startsWith(item.href));

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      active
                        ? "bg-[#E8F5EE] text-[#0C7A51]"
                        : "text-[#6B7280] hover:bg-[#F1F3EE] hover:text-[#111827]",
                    )}
                  >
                    <Icon className="size-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-[#E5E7EB] p-4">
        <div className="rounded-lg border border-[#E5E7EB] bg-[#F7F8F4] p-3">
          <div className="text-sm font-semibold text-[#111827]">Northstar Foods</div>
          <div className="mt-1 text-xs text-[#6B7280]">Enterprise Operations</div>
        </div>
      </div>
    </aside>
  );
}
