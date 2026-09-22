"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AppShell, useAppShell } from "@/components/app/AppShell";
import { MOCK_INSIGHTS, InsightItem } from "@/lib/mockData";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import {
  Sparkles,
  Network,
  ArrowRight,
  Check,
  X,
  Lightbulb,
  AlertTriangle,
  Compass,
  Layers,
  ArrowUpRight
} from "lucide-react";

export default function InsightsPage() {
  const { openDrawer } = useAppShell();
  const { showToast } = useToast();
  const [insights, setInsights] = useState<InsightItem[]>(MOCK_INSIGHTS);
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const handleDismiss = (id: string, title: string) => {
    setInsights((prev) => prev.filter((item) => item.id !== id));
    showToast(`Insight dismissed: "${title.slice(0, 32)}..."`, "info");
  };

  const categories = [
    { label: "All", count: insights.length },
    { label: "Discovered Connections", type: "DISCOVERED_CONNECTION" },
    { label: "Knowledge Gaps", type: "KNOWLEDGE_GAP" },
    { label: "Learning Opportunities", type: "LEARNING_OPPORTUNITY" },
    { label: "Project Synergies", type: "PROJECT_SYNERGY" }
  ];

  const filtered = insights.filter((item) => {
    if (activeFilter === "All") return true;
    const cat = categories.find((c) => c.label === activeFilter);
    return cat?.type ? item.type === cat.type : true;
  });

  return (
    <AppShell>
      <div className="p-6 sm:p-10 space-y-8 max-w-7xl mx-auto w-full">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[11px] font-mono tracking-[0.25em] text-[#71717A] uppercase">
              <span>SYNTHESIS ENGINE</span>
              <span>•</span>
              <span className="text-[#D4FF00]">COGNITIVE REASONING</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase">
              AI Insights
            </h1>
            <p className="text-sm sm:text-base text-slate-400 font-light max-w-2xl">
              Algorithmic pattern recognition uncovering dormant cross-domain connections, architectural blindspots, and synergy vectors.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/ask">
              <Button variant="secondary" size="sm" className="text-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#D4FF00]" />
                <span>Query Assistant</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none border-b border-white/[0.06] pt-2">
          {categories.map((cat) => (
            <button
              key={cat.label}
              onClick={() => setActiveFilter(cat.label)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                activeFilter === cat.label
                  ? "bg-[#D4FF00] text-black font-semibold shadow-[0_0_15px_rgba(212,255,0,0.2)]"
                  : "text-[#A1A1AA] hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Insights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.length === 0 ? (
            <div className="col-span-2 py-16 text-center space-y-3">
              <Check className="w-8 h-8 text-[#D4FF00] mx-auto" />
              <h3 className="text-lg font-bold text-white">All insights processed</h3>
              <p className="text-xs font-mono text-[#71717A]">
                LifeGraph will compute new relational suggestions as your knowledge evolves.
              </p>
            </div>
          ) : (
            filtered.map((item) => {
              const badgeColors = {
                DISCOVERED_CONNECTION: "bg-[#D4FF00]/10 text-[#D4FF00] border-[#D4FF00]/30",
                KNOWLEDGE_GAP: "bg-rose-500/10 text-rose-300 border-rose-500/30",
                LEARNING_OPPORTUNITY: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30",
                PROJECT_SYNERGY: "bg-amber-500/10 text-amber-300 border-amber-500/30"
              };

              return (
                <div
                  key={item.id}
                  className="p-6 sm:p-7 rounded-2xl border border-white/[0.08] bg-[#0A0D11] hover:border-white/20 transition-all flex flex-col justify-between space-y-6 shadow-xl relative overflow-hidden group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span
                        className={`px-2.5 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider border font-bold ${
                          badgeColors[item.type]
                        }`}
                      >
                        {item.categoryLabel}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-[#71717A]">
                          {item.timestamp}
                        </span>
                        <button
                          onClick={() => handleDismiss(item.id, item.title)}
                          className="p-1 text-[#71717A] hover:text-white hover:bg-white/[0.06] rounded transition-colors"
                          title="Dismiss Insight"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h2 className="text-xl font-bold tracking-tight text-white group-hover:text-[#D4FF00] transition-colors leading-tight">
                        {item.title}
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Connected Nodes Cluster & Actions */}
                  <div className="space-y-4 pt-4 border-t border-white/[0.06]">
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-mono uppercase text-[#71717A] tracking-wider block">
                        Interconnected Entities
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {item.connectedNodes.map((nodeId, idx) => (
                          <button
                            key={idx}
                            onClick={() => openDrawer(nodeId)}
                            className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.08] hover:border-[#D4FF00]/40 text-xs font-mono text-slate-200 transition-colors"
                          >
                            {nodeId}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-3 pt-1">
                      <Link href={item.actionRoute} className="flex-1">
                        <Button variant="lime" size="sm" className="w-full justify-between text-xs">
                          <span>{item.actionLabel}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Button>
                      </Link>

                      <Link href={`/explore?focus=${item.connectedNodes[0] || ""}`}>
                        <Button variant="outline" size="sm" className="text-xs">
                          <Network className="w-3.5 h-3.5 text-[#D4FF00]" />
                          <span className="hidden sm:inline">Graph</span>
                        </Button>
                      </Link>
                    </div>
                  </div>

                </div>
              );
            })
          )}
        </div>

      </div>
    </AppShell>
  );
}
