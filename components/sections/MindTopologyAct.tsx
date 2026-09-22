"use client";

import React from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Network, Sparkles, Compass, Orbit, ArrowUpRight } from "lucide-react";

interface MindTopologyActProps {
  onOpenGraphStudio?: () => void;
}

export function MindTopologyAct({ onOpenGraphStudio }: MindTopologyActProps) {
  const thoughtClusters = [
    { label: "COGNITIVE SYNAPSE", tag: "NODE // 01", desc: "Real-time concept distillation from high-volume audio & text.", color: "lime" },
    { label: "VECTOR LATENT CORE", tag: "NODE // 02", desc: "768-dim geometric embedding space indexed in real-time.", color: "cyan" },
    { label: "AUTONOMOUS REFLECTION", tag: "NODE // 03", desc: "Recursive graph reasoning without human prompt intervention.", color: "lime" },
    { label: "IDENTITY RECURSION", tag: "NODE // 04", desc: "Continuous behavioral alignment with human creator nuances.", color: "cyan" },
  ];

  return (
    <section
      id="act-mind-topology"
      className="relative min-h-screen flex flex-col justify-between py-24 px-6 sm:px-12 lg:px-20 overflow-hidden pointer-events-none"
    >
      {/* Top Header */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between relative z-10 pointer-events-auto">
        <Badge variant="lime" dot>
          ACT 03 // THE MIND CROWN • ORBITAL KNOWLEDGE HALO
        </Badge>
        <div className="text-xs font-mono text-slate-500 hidden sm:flex items-center gap-2">
          <Orbit className="w-3.5 h-3.5 text-[#D4FF00] animate-spin" />
          <span>7 ACTIVE SYNAPTIC SATELLITES</span>
        </div>
      </div>

      {/* Main Grid: Asymmetrical layout giving stage to the elevated head and orbiting nodes */}
      <div className="max-w-7xl mx-auto w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
        {/* Left Column: Narrative */}
        <div className="lg:col-span-5 flex flex-col items-start text-left pointer-events-auto">
          <div className="text-xs font-mono tracking-widest text-[#D4FF00] uppercase mb-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4FF00] animate-pulse" />
            03 / NEURAL HALO ARCHITECTURE
          </div>

          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            Constellation <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-[#D4FF00]">
              of Memory.
            </span>
          </h2>

          <p className="mt-6 text-sm text-slate-300 leading-relaxed font-normal max-w-md">
            Your intelligence isn&apos;t locked in a flat text box. In LifeGraph, memories and competencies crystallize into an orbital crown of interconnected nodes surrounding your digital persona.
          </p>

          <div className="mt-8 flex items-center gap-4">
            <Button
              variant="primary"
              size="md"
              glow
              onClick={onOpenGraphStudio}
              className="font-mono text-xs shadow-[0_0_25px_rgba(212,255,0,0.3)]"
            >
              <Network className="w-4 h-4 mr-2" />
              Open 3D Knowledge Studio
              <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </div>
        </div>

        {/* Center Space: Unobstructed for the 3D Character Crown */}
        <div className="lg:col-span-2 h-[200px] pointer-events-none" />

        {/* Right Column: Node Cluster Dossier */}
        <div className="lg:col-span-5 flex flex-col gap-3 pointer-events-auto">
          {thoughtClusters.map((cluster, i) => (
            <div
              key={i}
              className="p-4 rounded-xl bg-[#090C10]/75 backdrop-blur-xl border border-white/[0.08] hover:border-white/25 transition-all group"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-mono font-bold text-white group-hover:text-[#D4FF00] transition-colors">
                  {cluster.label}
                </span>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                    cluster.color === "lime"
                      ? "text-[#D4FF00] bg-[#D4FF00]/10 border border-[#D4FF00]/30"
                      : "text-[#00F0FF] bg-[#00F0FF]/10 border border-[#00F0FF]/30"
                  }`}
                >
                  {cluster.tag}
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-mono">
                {cluster.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between pt-6 border-t border-white/[0.06] text-xs font-mono text-slate-500 pointer-events-auto">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#D4FF00]" />
          <span>REAL-TIME GRAPH-SYNAPSE DISCOVERY ENABLED</span>
        </div>
        <div className="text-slate-400">
          SCROLL TO INSPECT DIGITAL MATERIALITY ↓
        </div>
      </div>
    </section>
  );
}
