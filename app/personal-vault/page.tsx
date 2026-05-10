"use client";

import { useState } from "react";
import { UploadArea } from "@/components/ui/UploadArea";
import { DocumentCard } from "@/components/vault/DocumentCard";
import { Lock, Search } from "lucide-react";
import { motion } from "framer-motion";

export default function PersonalVaultPage() {
  const [isUnlocked, setIsUnlocked] = useState(false);

  if (!isUnlocked) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="w-16 h-16 rounded-full bg-[#1D1D1D] flex items-center justify-center mb-6 shadow-xl">
          <Lock className="w-6 h-6 text-[#C6A969]" />
        </div>
        <h2 className="text-2xl font-bold text-[#1D1D1D] mb-2">Personal Vault</h2>
        <p className="text-[#6B6B6B] max-w-sm mb-8">
          This area is highly encrypted and private. Enter your master password or biometric authentication to proceed.
        </p>
        <button 
          onClick={() => setIsUnlocked(true)}
          className="bg-[#1D1D1D] text-[#C6A969] px-8 py-3 rounded-xl font-medium hover:bg-black transition-colors shadow-lg shadow-black/10"
        >
          Unlock Vault
        </button>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 pb-10"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E7E5E0] pb-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-semibold tracking-tight text-[#1D1D1D] flex items-center gap-2">
            Personal Vault <Lock className="w-4 h-4 text-[#C6A969]" />
          </h2>
          <p className="text-[#6B6B6B] text-sm">Owner-only secure storage for private notes and recovery phrases.</p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B6B6B]" />
          <input 
            type="text" 
            placeholder="Search private items..." 
            className="w-full pl-9 pr-4 py-2 bg-[#FCFBF8] border border-[#E7E5E0] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1D1D1D]/20 transition-all placeholder:text-[#6B6B6B]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <UploadArea label="Drop private files here to heavily encrypt" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <DocumentCard name="Ledger_Recovery_Phrase.txt" dateAdded="Just now" size="2 KB" isEncrypted={false} />
            <DocumentCard name="Personal_Journal_2025.docx" dateAdded="Last week" size="45 KB" isEncrypted={false} />
            <DocumentCard name="Private_Passwords.pdf" dateAdded="Last month" size="1.2 MB" isEncrypted={false} />
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <div className="bg-[#1D1D1D] rounded-2xl p-6 text-white shadow-xl">
            <h3 className="text-sm font-semibold text-[#C6A969] mb-2 uppercase tracking-widest">Security Status</h3>
            <p className="text-2xl font-bold mb-4">AES-256 Locked</p>
            <p className="text-sm text-gray-400 leading-relaxed">
              Items in this vault are encrypted with a zero-knowledge architecture. Not even Aegis Vault administrators can read these files.
            </p>
            <button 
              onClick={() => setIsUnlocked(false)}
              className="mt-6 w-full py-2 rounded-lg border border-gray-600 text-sm hover:bg-gray-800 transition-colors"
            >
              Lock Vault Now
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
