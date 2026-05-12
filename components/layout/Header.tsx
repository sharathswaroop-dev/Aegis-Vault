"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Bell, Bot, CheckCircle2, Menu, Search, Package, Warehouse, Truck, Factory, Store, ShoppingCart, ExternalLink, CloudSun } from "lucide-react";
import { ROLE_CONFIG, ROLE_SELECT_OPTIONS } from "@/lib/config/roleConfig";
import { useRoleStore, type Role } from "@/lib/stores/roleStore";
import { useLiveDataStore } from "@/lib/stores/liveDataStore";
import { useDrillDownStore } from "@/lib/stores/drillDownStore";
import { Popover, PopoverTrigger, PopoverContentFixed } from "@/components/ui/popover";

import { cn } from "@/lib/utils";
import type { SearchResultItem } from "@/lib/types";

const iconMap: Record<string, typeof Search> = {
  box: Package,
  warehouse: Warehouse,
  truck: Truck,
  factory: Factory,
  store: Store,
  package: Package,
  "shopping-cart": ShoppingCart,
};

function useLiveSearchData() {
  const { orders, prices } = useLiveDataStore();
  
  const inventoryItems: SearchResultItem[] = orders.map(o => ({
    type: "inventory",
    name: o.item,
    subtitle: `${o.sku} · ${o.location}`,
    href: "/inventory",
    icon: "box"
  }));

  const priceItems: SearchResultItem[] = prices.map(p => ({
    type: "order",
    name: p.commodity,
    subtitle: `${p.market} · ₹${p.modalPrice}`,
    href: "/analytics/pricing",
    icon: "shopping-cart"
  }));

  return [...inventoryItems, ...priceItems];
}

function filterSearchData(query: string, data: SearchResultItem[]): SearchResultItem[] {
  if (!query.trim()) return [];
  const lowerQuery = query.toLowerCase();
  return data.filter(
    (item) =>
      item.name.toLowerCase().includes(lowerQuery) ||
      item.subtitle.toLowerCase().includes(lowerQuery)
  );
}

function groupSearchResults(results: SearchResultItem[]): Record<string, SearchResultItem[]> {
  const groups: Record<string, SearchResultItem[]> = {
    Inventory: [], Warehouses: [], Batches: [], Shipments: [], Suppliers: [], Retailers: [], Orders: [],
  };
  results.forEach((item) => {
    switch (item.type) {
      case "inventory": groups["Inventory"].push(item); break;
      case "warehouse": groups["Warehouses"].push(item); break;
      case "batch": groups["Batches"].push(item); break;
      case "shipment": groups["Shipments"].push(item); break;
      case "supplier": groups["Suppliers"].push(item); break;
      case "retailer": groups["Retailers"].push(item); break;
      case "order": groups["Orders"].push(item); break;
    }
  });
  return Object.fromEntries(Object.entries(groups).filter(([_, items]) => items.length > 0));
}

function weatherCodeIcon(code: number): string {
  if (code === 0) return "☀️";
  if (code <= 3) return "⛅";
  if (code <= 48) return "🌫️";
  if (code <= 67) return "🌧️";
  if (code <= 77) return "❄️";
  if (code <= 82) return "🌦️";
  return "⛈️";
}

function getRelativeTime(date: Date | null): string {
  if (!date) return "—";
  const diffSec = Math.floor((Date.now() - date.getTime()) / 1000);
  if (diffSec < 10) return "just now";
  if (diffSec < 60) return `${diffSec}s ago`;
  return `${Math.floor(diffSec / 60)}m ago`;
}

export function Header() {
  const router = useRouter();
  const { currentRole, setRole, userInitials } = useRoleStore();
  const { weather, alerts, lastUpdated } = useLiveDataStore();
  const openDrillDown = useDrillDownStore((s) => s.open);


  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResultItem[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [aiPopoverOpen, setAiPopoverOpen] = useState(false);
  const [now, setNow] = useState(new Date());

  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const liveSearchData = useLiveSearchData();
  const searchData = liveSearchData;

  // Live clock tick
  useEffect(() => {
    const tick = setInterval(() => setNow(new Date()), 10_000);
    return () => clearInterval(tick);
  }, []);

  const debouncedSearch = useCallback(
    (() => {
      let timeoutId: NodeJS.Timeout;
      return (query: string) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          const filtered = filterSearchData(query, searchData);
          setSearchResults(filtered);
        }, 300);
      };
    })(),
    [searchData]
  );

  useEffect(() => { debouncedSearch(searchQuery); }, [searchQuery, debouncedSearch]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setIsSearchOpen(false); setAiPopoverOpen(false); }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleResultClick = (href: string) => {
    router.push(href);
    setIsSearchOpen(false);
    setSearchQuery("");
  };

  const groupedResults = groupSearchResults(searchResults);
  const liveNotifications = alerts.length > 0 ? alerts : ROLE_CONFIG[currentRole].notifications;

  // Real next-refresh countdown
  const nextRefreshSec = lastUpdated
    ? Math.max(0, 60 - Math.floor((now.getTime() - lastUpdated.getTime()) / 1000))
    : 60;

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
        {weather && (
          <div 
            className="hidden items-center gap-1.5 rounded-lg border border-[#E5E7EB] bg-white px-3 py-1.5 text-sm text-[#6B7280] lg:flex cursor-pointer hover:border-[#0F8F5F] transition-colors"
            onClick={() => openDrillDown("metric", { label: "Local Weather", value: `${weather.temperature}°C`, subtitle: `${weather.city}, ${weather.country}`, title: "Weather Analytics" })}
          >
            <span>{weatherCodeIcon(weather.weathercode)}</span>
            <span className="font-semibold text-[#111827]">{weather.temperature}°C</span>
            <span className="text-xs">{weather.city}</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">

        <div className="relative hidden lg:block" ref={searchContainerRef}>
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#6B7280]" />
          <input
            ref={searchInputRef}
            type="search"
            placeholder="Search inventory, routes, suppliers..."
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setIsSearchOpen(true); }}
            onFocus={() => setIsSearchOpen(true)}
            className="h-10 w-80 rounded-lg border border-[#E5E7EB] bg-white pl-9 pr-3 text-sm outline-none transition focus:border-[#0F8F5F] focus:ring-3 focus:ring-[#0F8F5F]/10"
          />
          {isSearchOpen && searchQuery.trim() && (
            <div className="absolute top-full mt-2 w-96 rounded-lg border border-[#E5E7EB] bg-white shadow-lg">
              {searchResults.length > 0 ? (
                <div className="max-h-80 overflow-y-auto p-2">
                  {Object.entries(groupedResults).map(([group, items]) => (
                    <div key={group} className="mb-3 last:mb-0">
                      <p className="px-3 py-1.5 text-xs font-semibold text-[#6B7280]">{group}</p>
                      {items.map((item, idx) => {
                        const Icon = iconMap[item.icon] || Package;
                        return (
                          <button
                            key={`${item.type}-${item.name}-${idx}`}
                            onClick={() => handleResultClick(item.href)}
                            className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left transition hover:bg-[#F7F8F4]"
                          >
                            <div className="flex size-8 items-center justify-center rounded-md bg-[#F7F8F4]">
                              <Icon className="size-4 text-[#6B7280]" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-[#111827] truncate">{item.name}</p>
                              <p className="text-xs text-[#6B7280] truncate">{item.subtitle}</p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center">
                  <p className="text-sm text-[#6B7280]">No results for "{searchQuery}"</p>
                  <p className="text-xs text-[#9CA3AF] mt-1">Try searching for SKU, warehouse, or batch ID</p>
                </div>
              )}
            </div>
          )}
        </div>

        <Popover open={aiPopoverOpen} onOpenChange={setAiPopoverOpen}>
          <PopoverTrigger asChild>
            <button className="hidden items-center gap-2 rounded-lg border border-[#E5E7EB] bg-white px-3 py-2 text-sm font-medium text-[#111827] transition hover:bg-[#F7F8F4] sm:flex cursor-pointer">
              <Bot className="size-4 text-[#0F8F5F]" />
              <span>AI online</span>
              <CheckCircle2 className="size-4 text-[#0F8F5F]" />
            </button>
          </PopoverTrigger>
          <PopoverContentFixed className="w-72" align="end">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="flex size-3 rounded-full bg-[#0F8F5F]" />
                <span className="text-sm font-semibold text-[#111827]">AI Engine Online</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#6B7280]">Model</span>
                  <span className="font-medium text-[#111827]">FoodFlow Forecast v2.1</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B7280]">Last updated</span>
                  <span className="font-medium text-[#111827]">{getRelativeTime(lastUpdated)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B7280]">Next refresh</span>
                  <span className="font-medium text-[#111827]">in {nextRefreshSec}s</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B7280]">Location</span>
                  <span className="font-medium text-[#111827]">{weather?.city || "Detecting..."}</span>
                </div>
              </div>
              <button
                onClick={() => { router.push("/analytics"); setAiPopoverOpen(false); }}
                className="flex items-center gap-2 text-sm font-medium text-[#0F8F5F] hover:underline"
              >
                <ExternalLink className="size-4" />
                View AI logs
              </button>
            </div>
          </PopoverContentFixed>
        </Popover>

        <select
          value={currentRole}
          onChange={(event) => setRole(event.target.value as Role)}
          className="hidden h-10 rounded-lg border border-[#E5E7EB] bg-white px-3 text-sm font-medium text-[#111827] outline-none focus:border-[#0F8F5F] sm:block"
          aria-label="Current role"
        >
          {ROLE_SELECT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>

        <div className="relative">
          <button
            className="relative rounded-lg border border-[#E5E7EB] bg-white p-2 text-[#6B7280] transition hover:text-[#111827]"
            onClick={() => setNotificationsOpen((open) => !open)}
            aria-label="Open notifications"
          >
            <Bell className="size-5" />
            <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-[#0F8F5F] text-[10px] font-semibold text-white">
              {liveNotifications.length}
            </span>
          </button>
          {notificationsOpen ? (
            <div className="absolute right-0 mt-2 w-80 rounded-lg border border-[#E5E7EB] bg-white p-3 shadow-lg z-50">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-semibold text-[#111827]">Notifications</span>
                <span className="text-xs text-[#9CA3AF]">{now.toLocaleTimeString("en-IN")}</span>
              </div>
              <div className="space-y-2">
                {(alerts.length > 0 ? alerts : ROLE_CONFIG[currentRole].notifications).map((n: any, i: number) => (
                  <div 
                    key={i} 
                    className="rounded-lg bg-[#F7F8F4] p-3 cursor-pointer hover:bg-[#F1F3EE] transition-colors border border-transparent hover:border-[#0F8F5F]/20"
                    onClick={() => {
                      openDrillDown("metric", { ...n, title: n.title || "Notification Detail" });
                      setNotificationsOpen(false);
                    }}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold text-[#111827]">{n.title}</p>
                      <span className="text-xs text-[#6B7280]">{n.timestamp || n.time || "Live"}</span>
                    </div>
                    <p className="mt-1 text-xs leading-5 text-[#6B7280]">{n.description}</p>
                  </div>
                ))}
              </div>

            </div>
          ) : null}
        </div>

        <div className="flex size-10 items-center justify-center rounded-full bg-[#111827] text-sm font-semibold text-white">
          {userInitials}
        </div>
      </div>
    </header>
  );
}