"use client";

import React from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Network, BrainCircuit, TrendingUp, Search, ArrowUpRight } from "lucide-react";

export function Architecture() {
  const features = [
    {
      index: "01",
      title: "Knowledge Synthesis",
      category: "INFERENCE ENGINE",
      description:
        "Continuously ingest documents, git commits, books, voice memos, and bookmarks into unified, high-dimensional vector embeddings.",
      icon: Network,
      tag: "Auto-Embedding",
      accent: "#D4FF00",
    },
    {
      index: "02",
      title: "Neural Linking",
      category: "ASSOCIATIVE TOPOLOGY",
      description:
        "Autonomous semantic edges discover latent bridges between disparate projects, unexpected skill crossovers, and forgotten notes.",
      icon: BrainCircuit,
      tag: "Self-Organizing",
      accent: "#00F0FF",
    },
    {
      index: "03",
      title: "Growth Governance",
      category: "TRAJECTORY TRACKING",
      description:
        "Quantify learning velocity, goal convergence, and cognitive blind spots with real-time graph centrality and mastery indices.",
      icon: TrendingUp,
      tag: "Telemetry",
      accent: "#10B981",
    },
    {
      index: "04",
      title: "Ambient Retrieval",
      category: "INSTANT RECALL",
      description:
        "Sub-12ms context-aware queries surface exactly what you need at the exact moment of ideation without manual folder sorting.",
      icon: Search,
      tag: "Sub-12ms",
      accent: "#FBBF24",
    },
  ];

  return (
    <section id="architecture" className="py-32 px-6 sm:px-10 lg:px-16 relative z-10 max-w-7xl mx-auto pointer-events-none">
      <div className="text-left max-w-2xl mb-16 pointer-events-auto">
        <Badge variant="lime" dot className="mb-4">
          SYSTEM ARCHITECTURE
        </Badge>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.08]">
          Engineered for{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-[#D4FF00]">
            cognitive leverage.
          </span>
        </h2>
        <p className="mt-4 text-base sm:text-lg text-slate-400 font-normal leading-relaxed">
          Traditional notes are static graveyards. LifeGraph turns your personal knowledge into an active, thinking neural cortex.
        </p>
      </div>

      {/* Asymmetric composition: Model occupies the left; Cards occupy the right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left space reserved for 3D character model */}
        <div className="hidden lg:block lg:col-span-5 h-[480px] pointer-events-none relative" />

        {/* Right side: 4 Modular capability cards */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5 pointer-events-auto">
          {features.map((item) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.index}
                className="group flex flex-col justify-between p-6 sm:p-7 bg-[#0B0E11]/85 backdrop-blur-xl hover:border-[#D4FF00]/40 hover:shadow-[0_0_30px_rgba(212,255,0,0.08)] transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-xs text-slate-500 font-semibold">
                      [{item.index}]
                    </span>
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                      style={{
                        backgroundColor: `${item.accent}12`,
                        border: `1px solid ${item.accent}33`,
                        color: item.accent,
                      }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="text-[10px] font-mono tracking-wider text-slate-400 uppercase mb-2">
                    {item.category}
                  </div>

                  <h3 className="text-xl font-bold tracking-tight text-white mb-3 group-hover:text-[#D4FF00] transition-colors duration-200">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-500 group-hover:text-slate-300 transition-colors">
                  <span>{item.tag}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#D4FF00] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
