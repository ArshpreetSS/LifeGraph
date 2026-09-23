"use client";

import React from "react";
import Link from "next/link";
import { Search, Sparkles, Command, Menu } from "lucide-react";
import { Button } from "@/components/ui/Button";

import { GRAPH_NODES } from "@/lib/mockData";

interface TopbarProps {
  onOpenSearch: () => void;
  onOpenMobileMenu?: () => void;
}

export function Topbar({ onOpenSearch, onOpenMobileMenu }: TopbarProps) {
  const nodeCount = GRAPH_NODES.length;

  return (
    <header className="h-14 border-b border-white/[0.08] bg-[#070809]/80 backdrop-blur-md sticky top-0 z-20 px-4 sm:px-8 flex items-center justify-between gap-4">
      {/* Mobile Menu & Logo */}
      <div className="flex items-center gap-3 lg:hidden">
        <button
          onClick={onOpenMobileMenu}
          className="p-1.5 rounded-lg text-[#A1A1AA] hover:text-white hover:bg-white/[0.06] transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
        <Link href="/dashboard" className="text-xs font-mono tracking-[0.25em] text-white uppercase font-bold">
          LIFEGRAPH
        </Link>
      </div>

      {/* Global Search Button */}
      <button
        onClick={onOpenSearch}
        className="flex-1 max-w-md hidden sm:flex items-center justify-between px-3.5 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 hover:border-white/20 text-[#71717A] hover:text-slate-300 transition-all text-xs font-mono group cursor-pointer"
      >
        <div className="flex items-center gap-2.5">
          <Search className="w-3.5 h-3.5 text-[#71717A] group-hover:text-[#D4FF00] transition-colors" />
          <span className="text-slate-400">Search knowledge graph...</span>
        </div>
        <div className="flex items-center gap-1">
          <kbd className="px-1.5 py-0.5 rounded bg-white/[0.06] border border-white/10 text-[9px] text-[#A1A1AA] flex items-center gap-0.5">
            <Command className="w-2.5 h-2.5" /> K
          </kbd>
          <kbd className="px-1.5 py-0.5 rounded bg-white/[0.06] border border-white/10 text-[9px] text-[#A1A1AA]">
            /
          </kbd>
        </div>
      </button>

      {/* Mobile search trigger */}
      <button
        onClick={onOpenSearch}
        className="sm:hidden p-2 rounded-lg text-[#A1A1AA] hover:text-white hover:bg-white/[0.05]"
      >
        <Search className="w-4 h-4" />
      </button>

      {/* Right Utility: Status + AI Assistant shortcut */}
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2 text-[11px] font-mono text-[#71717A] uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-[#D4FF00] animate-pulse shadow-[0_0_8px_#D4FF00]" />
          <span>Graph Live // {nodeCount > 0 ? `${nodeCount} Nodes` : "Awaiting Nodes"}</span>
        </div>

        <Link href="/ask">
          <Button variant="secondary" size="sm" className="hidden sm:inline-flex text-[10px] tracking-wider">
            <Sparkles className="w-3 h-3 text-[#D4FF00]" />
            <span>Ask Knowledge</span>
          </Button>
        </Link>
      </div>
    </header>
  );
}
