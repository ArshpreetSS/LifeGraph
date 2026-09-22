"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { AppShell, useAppShell } from "@/components/app/AppShell";
import { KnowledgeGraph } from "@/components/knowledge/KnowledgeGraph";
import { Network, Sparkles, Filter, Info } from "lucide-react";

function ExploreContent() {
  const searchParams = useSearchParams();
  const focusNodeId = searchParams.get("focus");
  const { openDrawer } = useAppShell();

  return (
    <div className="relative w-full h-[calc(100vh-3.5rem)] flex flex-col bg-[#070809] overflow-hidden">
      {/* Editorial Top Bar Ribbon */}
      <div className="px-6 py-2.5 border-b border-white/[0.06] bg-[#0A0D10]/70 backdrop-blur-md flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Network className="w-4 h-4 text-[#D4FF00]" />
            <span className="text-xs font-mono tracking-[0.25em] text-white uppercase font-bold">
              LifeGraph Dynamic Topology
            </span>
          </div>
          <span className="hidden sm:inline-block text-[#71717A] text-xs">•</span>
          <span className="hidden sm:inline-block text-[11px] font-mono text-[#A1A1AA]">
            Drag canvas to pan • Scroll to zoom • Click node to open drawer
          </span>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-mono text-[#D4FF00]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4FF00] animate-pulse" />
          <span>Live Physics Simulation</span>
        </div>
      </div>

      {/* Main Full-Size Graph Canvas Area */}
      <div className="flex-1 relative w-full h-full">
        <KnowledgeGraph
          focusedNodeId={focusNodeId}
          onSelectNode={(id) => openDrawer(id)}
        />
      </div>
    </div>
  );
}

export default function ExplorePage() {
  return (
    <AppShell>
      <Suspense fallback={<div className="p-10 text-xs font-mono text-[#71717A]">Loading knowledge graph...</div>}>
        <ExploreContent />
      </Suspense>
    </AppShell>
  );
}
