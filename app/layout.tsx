import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MainLayout } from "@/components/layout/MainLayout";
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aegis Vault — AI-Powered Financial Intelligence",
  description:
    "The world's most intelligent financial vault. Protect, organize, and grow your wealth with AI-powered document intelligence, expense tracking, and family continuity planning.",
  keywords: ["AI fintech", "financial planning", "wealth management", "document intelligence", "family vault"],
  openGraph: {
    title: "Aegis Vault — AI-Powered Financial Intelligence",
    description: "The world's most intelligent financial vault.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden bg-[#F5F3EE]">
        <MainLayout>
          {children}
        </MainLayout>
      </body>
    </html>
  );
}
