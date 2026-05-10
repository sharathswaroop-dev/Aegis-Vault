"use client";

import { Bell, Search, Menu } from "lucide-react";

export function Header() {
  return (
    <header className="h-20 w-full flex items-center justify-between px-6 md:px-10 sticky top-0 z-30 bg-[#F5F3EE]/80 backdrop-blur-md border-b border-transparent transition-all">
      <div className="flex items-center gap-4">
        <button className="md:hidden p-2 -ml-2 text-[#6B6B6B] hover:text-[#1D1D1D]">
          <Menu size={20} />
        </button>
        <h1 className="text-xl font-medium tracking-tight text-[#1D1D1D]">
          Welcome back, Sharath
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B6B6B]" />
          <input 
            type="text" 
            placeholder="Search vault, documents..." 
            className="w-64 pl-9 pr-4 py-2 bg-[#FCFBF8] border border-[#E7E5E0] rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#2E5E4E]/20 transition-all placeholder:text-[#6B6B6B]"
          />
        </div>
        
        <button className="relative p-2 rounded-full text-[#6B6B6B] hover:bg-[#E7E5E0] transition-colors">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#B85C5C] ring-2 ring-[#F5F3EE]" />
        </button>
      </div>
    </header>
  );
}
