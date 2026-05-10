"use client";

import { useState } from "react";
import { FilterTabs } from "@/components/ui/FilterTabs";
import { UploadArea } from "@/components/ui/UploadArea";
import { VaultFolder } from "@/components/vault/VaultFolder";
import { DocumentCard } from "@/components/vault/DocumentCard";
import { Search, Shield } from "lucide-react";
import { motion } from "framer-motion";

const TABS = ["All Documents", "Insurance", "Wills", "Tax Docs", "IDs", "Property", "Medical"];

export default function FamilyVaultPage() {
  const [activeTab, setActiveTab] = useState("All Documents");

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-semibold tracking-tight text-[#1D1D1D] flex items-center gap-2">
            Family Vault <Shield className="w-5 h-5 text-[#2E5E4E]" />
          </h2>
          <p className="text-[#6B6B6B] text-sm">Centralized secure storage for family records and legacy documents.</p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B6B6B]" />
          <input 
            type="text" 
            placeholder="Search vault..." 
            className="w-full pl-9 pr-4 py-2 bg-[#FCFBF8] border border-[#E7E5E0] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2E5E4E]/20 transition-all placeholder:text-[#6B6B6B]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column: Folders & Storage */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-panel rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-[#1D1D1D] mb-4">Categories</h3>
            <div className="flex flex-col gap-3">
              <VaultFolder name="Insurance Policies" itemCount={4} color="#4B7F52" />
              <VaultFolder name="Legal & Wills" itemCount={2} color="#C68A2D" />
              <VaultFolder name="Tax Returns" itemCount={12} color="#2E5E4E" />
              <VaultFolder name="Property Deeds" itemCount={3} color="#2E5E4E" />
              <VaultFolder name="Medical Records" itemCount={8} color="#B85C5C" />
              <VaultFolder name="Identity (IDs)" itemCount={6} color="#2E5E4E" />
            </div>
          </div>
          
          <div className="glass-panel rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-[#1D1D1D] mb-3">Storage Used</h3>
            <div className="w-full h-2 bg-[#E7E5E0] rounded-full overflow-hidden mb-2">
              <div className="h-full bg-[#2E5E4E] rounded-full" style={{ width: "24%" }} />
            </div>
            <div className="flex justify-between text-xs text-[#6B6B6B]">
              <span>1.2 GB used</span>
              <span>5 GB total</span>
            </div>
          </div>
        </div>

        {/* Right Column: Upload & Documents */}
        <div className="lg:col-span-3 space-y-6">
          <UploadArea label="Drop family documents here to encrypt and store" />

          <div>
            <div className="mb-4">
              <FilterTabs tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />
            </div>
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <DocumentCard name="LIC_Term_Policy_2024.pdf" dateAdded="Oct 12, 2025" size="2.4 MB" isEncrypted={true} />
              <DocumentCard name="Downtown_Apartment_Deed.pdf" dateAdded="Sep 04, 2025" size="8.1 MB" isEncrypted={true} />
              <DocumentCard name="Sharath_Passport_Scan.jpg" dateAdded="Aug 21, 2025" size="1.1 MB" isEncrypted={true} />
              <DocumentCard name="Family_Trust_Agreement.docx" dateAdded="Jan 15, 2025" size="4.5 MB" isEncrypted={true} />
              <DocumentCard name="Tax_Return_2024.pdf" dateAdded="Apr 10, 2025" size="3.2 MB" isEncrypted={true} />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
