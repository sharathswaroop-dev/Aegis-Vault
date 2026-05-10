"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  WalletCards,
  BotMessageSquare,
  Files,
  BellRing,
  Users,
  Shield,
  Share2,
  Gift,
  AlertTriangle,
  Scale,
  ScrollText,
  Settings,
  Lock,
} from "lucide-react";

interface NavItem {
  name: string;
  href: string;
  icon: ReactNode;
  isEmergency?: boolean;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    label: "MAIN",
    items: [
      { name: "Dashboard", href: "/", icon: <LayoutDashboard size={18} /> },
      { name: "Assets", href: "/assets", icon: <WalletCards size={18} /> },
      { name: "AI Assistant", href: "/ai", icon: <BotMessageSquare size={18} /> },
      { name: "Documents", href: "/documents", icon: <Files size={18} /> },
      { name: "Reminders", href: "/reminders", icon: <BellRing size={18} /> },
    ],
  },
  {
    label: "FAMILY",
    items: [
      { name: "Nominees", href: "/nominees", icon: <Users size={18} /> },
      { name: "Family Vault", href: "/vault", icon: <Shield size={18} /> },
      { name: "Shared Access", href: "/shared", icon: <Share2 size={18} /> },
      { name: "Gifts", href: "/gifts", icon: <Gift size={18} /> },
    ],
  },
  {
    label: "LEGACY",
    items: [
      { name: "Emergency Mode", href: "/emergency", icon: <AlertTriangle size={18} />, isEmergency: true },
      { name: "Trust Distribution", href: "/trust", icon: <Scale size={18} /> },
      { name: "My Will", href: "/will", icon: <ScrollText size={18} /> },
    ],
  },
  {
    label: "ACCOUNT",
    items: [
      { name: "Personal Vault", href: "/personal-vault", icon: <Lock size={18} /> },
      { name: "Settings", href: "/settings", icon: <Settings size={18} /> },
      { name: "Security", href: "/security", icon: <Shield size={18} /> },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-[#FCFBF8] border-r border-[#E7E5E0] z-40 hidden md:flex flex-col">
      {/* Brand */}
      <div className="h-20 flex items-center px-6 border-b border-[#E7E5E0]/50">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#2E5E4E] flex items-center justify-center">
            <Shield className="w-4 h-4 text-[#FCFBF8]" />
          </div>
          <span className="text-lg font-semibold tracking-tight text-[#1D1D1D]">
            Aegis Vault
          </span>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-8 scrollbar-hide">
        {NAV_GROUPS.map((group) => (
          <div key={group.label}>
            <div className="px-3 mb-2">
              <span className="text-[11px] font-semibold tracking-wider text-[#6B6B6B] uppercase">
                {group.label}
              </span>
            </div>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const isActive = pathname === item.href;

                if (item.isEmergency) {
                  return (
                    <Link key={item.name} href={item.href}>
                      <motion.div
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        className={`
                          group relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200
                          border border-[#B85C5C]/20 bg-[#B85C5C]/5 hover:bg-[#B85C5C]/10
                          ${isActive ? "bg-[#B85C5C]/15 border-[#B85C5C]/30" : ""}
                        `}
                      >
                        <div className="text-[#B85C5C] drop-shadow-[0_0_8px_rgba(184,92,92,0.4)]">
                          {item.icon}
                        </div>
                        <span className="text-[14px] font-medium text-[#B85C5C]">
                          {item.name}
                        </span>
                      </motion.div>
                    </Link>
                  );
                }

                return (
                  <Link key={item.name} href={item.href}>
                    <div
                      className={`
                        relative flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200
                        ${isActive 
                          ? "bg-[#2E5E4E] text-white shadow-sm" 
                          : "text-[#6B6B6B] hover:bg-[#E7E5E0]/50 hover:text-[#1D1D1D]"
                        }
                      `}
                    >
                      <div className={isActive ? "text-white" : "text-[#6B6B6B]"}>
                        {item.icon}
                      </div>
                      <span className="text-[14px] font-medium">{item.name}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* User Profile Mini */}
      <div className="p-4 border-t border-[#E7E5E0]">
        <div className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-[#E7E5E0]/50 cursor-pointer transition-colors">
          <div className="w-8 h-8 rounded-full bg-[#E7E5E0] flex items-center justify-center text-[#2E5E4E] font-medium text-sm">
            SW
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-medium text-[#1D1D1D] truncate">Swaroop Family</p>
            <p className="text-xs text-[#6B6B6B] truncate">Pro Plan</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
