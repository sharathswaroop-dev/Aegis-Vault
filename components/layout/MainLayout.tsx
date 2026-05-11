"use client";

import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen w-full bg-[#F7F8F4] text-[#111827] font-sans selection:bg-[#0F8F5F] selection:text-white">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col md:pl-72">
        <Header />
        <main className="mx-auto flex w-full max-w-[1500px] flex-1 flex-col px-4 py-5 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
