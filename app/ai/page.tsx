"use client";

import { useState } from "react";
import { ChatMessage } from "@/components/ai/ChatMessage";
import { Search, Plus, SendHorizontal, MessageSquare, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function AIAssistantPage() {
  const [inputText, setInputText] = useState("");

  const suggestions = [
    "Which policies expire next month?",
    "Show missing documents.",
    "Who has nominee access?",
    "How much did we spend on healthcare?"
  ];

  return (
    <div className="h-[calc(100vh-120px)] flex gap-6 pb-6">
      
      {/* Left Sidebar: Chat History */}
      <div className="hidden lg:flex flex-col w-72 bg-[#FCFBF8] border border-[#E7E5E0] rounded-2xl overflow-hidden h-full">
        <div className="p-4 border-b border-[#E7E5E0]">
          <button className="w-full flex items-center justify-center gap-2 bg-[#F5F3EE] hover:bg-[#E7E5E0] text-[#1D1D1D] px-4 py-2.5 rounded-xl text-sm font-medium transition-colors border border-[#E7E5E0]/50">
            <Plus className="w-4 h-4" /> New Conversation
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-3 space-y-1 scrollbar-hide">
          <p className="text-xs font-semibold text-[#6B6B6B] uppercase tracking-wider px-3 py-2">Today</p>
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg bg-[#E7E5E0]/30 text-[#1D1D1D] text-left">
            <MessageSquare className="w-4 h-4 text-[#6B6B6B] flex-shrink-0" />
            <span className="text-sm truncate">Term Life Insurance Expiry</span>
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#F5F3EE] text-[#6B6B6B] text-left transition-colors">
            <MessageSquare className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm truncate">Nominee allocation for HDFC</span>
          </button>
          
          <p className="text-xs font-semibold text-[#6B6B6B] uppercase tracking-wider px-3 py-2 mt-4">Previous 7 Days</p>
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#F5F3EE] text-[#6B6B6B] text-left transition-colors">
            <MessageSquare className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm truncate">Tax document verification</span>
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#F5F3EE] text-[#6B6B6B] text-left transition-colors">
            <MessageSquare className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm truncate">Healthcare expenditure 2025</span>
          </button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-[#FCFBF8] border border-[#E7E5E0] rounded-2xl overflow-hidden h-full relative">
        
        {/* Chat Header */}
        <div className="h-16 border-b border-[#E7E5E0] flex items-center px-6 bg-[#FCFBF8]/80 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#C6A969]" />
            <h2 className="text-base font-semibold text-[#1D1D1D]">Aegis Intelligence</h2>
          </div>
        </div>

        {/* Chat Feed */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 scrollbar-hide">
          <ChatMessage 
            role="ai" 
            content="Hello Sharath. I've analyzed your family vault. You have 2 action items requiring attention this week, and your LIC Term Life policy is expiring in 14 days. How can I assist you today?"
            timestamp="10:42 AM"
          />
          <ChatMessage 
            role="user" 
            content="Which policies expire next month?"
            timestamp="10:43 AM"
          />
          <ChatMessage 
            role="ai" 
            content="You have one policy expiring next month:
            
LIC Term Life Insurance (Policy #849201)
• Expiry: Oct 12, 2026
• Coverage: $500,000
• Primary Nominee: Priya Swaroop

Would you like me to prepare the renewal documents or contact your agent?"
            timestamp="10:43 AM"
          />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-gradient-to-t from-[#FCFBF8] via-[#FCFBF8] to-transparent">
          {/* Suggestions */}
          <div className="flex flex-wrap gap-2 mb-4 px-2">
            {suggestions.map((s, i) => (
              <button 
                key={i}
                className="text-[12px] font-medium text-[#2E5E4E] bg-[#2E5E4E]/5 border border-[#2E5E4E]/10 px-3 py-1.5 rounded-full hover:bg-[#2E5E4E]/10 transition-colors"
              >
                {s}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#C6A969]/20 flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-[#C6A969]" />
            </div>
            <input 
              type="text" 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask Aegis about your family's finances and documents..." 
              className="w-full pl-12 pr-14 py-4 bg-white border border-[#E7E5E0] rounded-2xl text-[15px] focus:outline-none focus:ring-2 focus:ring-[#2E5E4E]/20 transition-all shadow-sm placeholder:text-[#6B6B6B]"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-[#2E5E4E] text-white rounded-xl hover:bg-[#1f4236] transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed">
              <SendHorizontal className="w-4 h-4" />
            </button>
          </div>
          <p className="text-center text-[11px] text-[#6B6B6B] mt-3">
            Aegis AI uses zero-knowledge encryption. Your queries are never used for training.
          </p>
        </div>
      </div>

    </div>
  );
}
