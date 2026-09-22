"use client";

import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Network, Sparkles, GitBranch } from "lucide-react";
import { GRAPH_CATEGORIES, NodeCategory } from "@/lib/data/mockGraphData";

gsap.registerPlugin(ScrollTrigger);

interface ConnectionsProps {
  onOpenGraphStudio: () => void;
}

export function Connections({ onOpenGraphStudio }: ConnectionsProps) {
  const [activeCategory, setActiveCategory] = useState<NodeCategory | "ALL">("ALL");
  const sectionRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const relRowsRef = useRef<(HTMLDivElement | null)[]>([]);
  const filtersRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const relationships = [
    {
      source: "Project: AI Agent",
      relation: "uses",
      target: "Skill: Python",
      impact: "Foundational Runtime",
      color: "#10B981",
    },
    {
      source: "Skill: Python",
      relation: "supports",
      target: "Goal: ML Mastery",
      impact: "Core Competency",
      color: "#D4FF00",
    },
    {
      source: "Document: Agent Spec",
      relation: "contains",
      target: "Skill: Spatial WebGL",
      impact: "Technical Spec",
      color: "#00F0FF",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(line1Ref.current, { yPercent: 108, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1.0, ease: "expo.out" })
        .fromTo(line2Ref.current, { yPercent: 108, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1.0, ease: "expo.out" }, 0.15)
        .fromTo(bodyRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.9 }, 0.3)
        .fromTo(filtersRef.current, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.7 }, 0.45)
        .fromTo(
          relRowsRef.current.filter(Boolean),
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.65, stagger: 0.12, ease: "power3.out" },
          0.5
        )
        .fromTo(ctaRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7 }, 0.85);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="connections"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center py-28 px-6 sm:px-12 lg:px-20 overflow-hidden pointer-events-none"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Chapter Header */}
        <div className="flex items-center justify-between pointer-events-auto mb-6">
          <Badge variant="lime" dot>
            CHAPTER 03 // THE TOPOLOGY OF SYNAPSE • GRAPH LAYER
          </Badge>
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-500">
            <Network className="w-3.5 h-3.5 text-[#00F0FF]" />
            <span>12 NODES SURROUNDING THE AVATAR // BIDIRECTIONAL</span>
          </div>
        </div>

        {/* Editorial Text Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 flex flex-col items-start text-left pointer-events-auto">
            <h2
              className="font-black tracking-tight leading-[0.96] text-white"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}
            >
              <span className="block overflow-hidden">
                <span ref={line1Ref} style={{ display: "block", opacity: 0 }}>
                  From isolated points
                </span>
              </span>
              <span className="block overflow-hidden">
                <span
                  ref={line2Ref}
                  style={{ display: "block", opacity: 0 }}
                  className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#00F0FF]"
                >
                  to living intelligence.
                </span>
              </span>
            </h2>

            <div ref={bodyRef} style={{ opacity: 0 }}>
              <p className="mt-8 text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-md">
                Knowledge is not hierarchical; human cognition is associative.
                LifeGraph constructs an organic 3D network around your digital persona,
                transforming raw information into a living mind map.
              </p>
            </div>

            {/* Category Pills Filter */}
            <div ref={filtersRef} style={{ opacity: 0 }} className="mt-8 flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-slate-400 mr-2">NODES:</span>
              {(["GOAL", "SKILL", "PROJECT", "DOCUMENT", "LEARNING"] as NodeCategory[]).map((cat) => {
                const config = GRAPH_CATEGORIES[cat];
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory((prev) => (prev === cat ? "ALL" : cat))}
                    className={`text-xs font-mono px-3 py-1 rounded-full border transition-all flex items-center gap-1.5 ${
                      activeCategory === cat || activeCategory === "ALL"
                        ? "bg-white/[0.05] border-white/20 text-white"
                        : "bg-transparent border-white/[0.05] text-slate-500"
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: config.color }} />
                    {config.label}
                  </button>
                );
              })}
            </div>

            {/* Live Relationship Paths */}
            <div className="mt-8 w-full max-w-md space-y-2.5">
              <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2">
                ACTIVE SYNAPSE RELATIONSHIPS
              </div>
              {relationships.map((rel, idx) => (
                <div
                  key={idx}
                  ref={(el) => { relRowsRef.current[idx] = el; }}
                  style={{ opacity: 0 }}
                  className="p-3 rounded-xl bg-[#090C10]/80 backdrop-blur-xl border border-white/[0.08] flex items-center justify-between text-xs font-mono"
                >
                  <div className="flex items-center gap-2 text-slate-200 flex-wrap">
                    <span className="font-semibold">{rel.source}</span>
                    <span className="text-slate-500 text-[10px]">→ {rel.relation} →</span>
                    <span className="font-semibold" style={{ color: rel.color }}>{rel.target}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 hidden sm:inline">{rel.impact}</span>
                </div>
              ))}
            </div>

            <div ref={ctaRef} style={{ opacity: 0 }} className="mt-10 flex items-center gap-4">
              <Button variant="primary" size="md" onClick={onOpenGraphStudio} className="font-mono text-xs">
                <Sparkles className="w-4 h-4 mr-1.5 text-black" />
                Open 3D Knowledge Studio
              </Button>
            </div>
          </div>

          {/* Right Column: Spatial Frame for 3D Graph */}
          <div className="lg:col-span-6 h-[400px] lg:h-[550px] relative pointer-events-none flex flex-col justify-end items-end">
            <div className="hidden lg:flex flex-col items-end gap-2 p-4 rounded-xl bg-[#090C10]/70 backdrop-blur-2xl border border-white/[0.08]">
              <div className="flex items-center gap-2 text-[11px] font-mono text-[#D4FF00]">
                <GitBranch className="w-3.5 h-3.5" />
                <span>ORBITAL MESH CRYSTALLIZED</span>
              </div>
              <div className="text-[10px] font-mono text-slate-400">
                12 NODES • 18 BIDIRECTIONAL EDGES
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
