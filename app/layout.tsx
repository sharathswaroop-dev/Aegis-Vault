import type { Metadata } from "next";
import "./globals.css";
import { MainLayout } from "@/components/layout/MainLayout";

export const metadata: Metadata = {
  title: "FoodFlow AI - Inventory Intelligence Platform",
  description:
    "AI-powered inventory forecasting and supply chain intelligence for warehouses, retailers, suppliers, and distributors.",
  keywords: [
    "inventory forecasting",
    "supply chain intelligence",
    "food inventory",
    "spoilage reduction",
    "AI operations",
  ],
  openGraph: {
    title: "FoodFlow AI",
    description:
      "Inventory forecasting, spoilage reduction, and pricing intelligence for food operations.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col overflow-x-hidden bg-[#F7F8F4]">
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
