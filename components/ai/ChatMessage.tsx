"use client";

import { motion } from "framer-motion";
import { User, Sparkles } from "lucide-react";

interface ChatMessageProps {
  role: "user" | "ai";
  content: string;
  timestamp?: string;
  isTyping?: boolean;
}

export function ChatMessage({ role, content, timestamp, isTyping }: ChatMessageProps) {
  const isUser = role === "user";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex w-full gap-4 ${isUser ? "flex-row-reverse" : "flex-row"} mb-6`}
    >
      <div 
        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1
          ${isUser ? "bg-[#2E5E4E] text-[#FCFBF8]" : "bg-[#F5F3EE] border border-[#E7E5E0] text-[#C6A969]"}
        `}
      >
        {isUser ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
      </div>
      
      <div className={`flex flex-col ${isUser ? "items-end" : "items-start"} max-w-[80%]`}>
        <div 
          className={`px-5 py-3.5 rounded-2xl text-[15px] leading-relaxed shadow-sm
            ${isUser 
              ? "bg-[#2E5E4E] text-[#FCFBF8] rounded-tr-sm" 
              : "bg-[#FCFBF8] border border-[#E7E5E0] text-[#1D1D1D] rounded-tl-sm"
            }
          `}
        >
          {isTyping ? (
            <div className="flex gap-1.5 items-center h-5">
              <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1.5 h-1.5 rounded-full bg-[#6B6B6B]" />
              <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-[#6B6B6B]" />
              <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-[#6B6B6B]" />
            </div>
          ) : (
            content
          )}
        </div>
        {timestamp && (
          <span className="text-[11px] text-[#6B6B6B] mt-1.5 px-1">{timestamp}</span>
        )}
      </div>
    </motion.div>
  );
}
