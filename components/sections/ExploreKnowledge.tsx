"use client";

import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Compass, Sparkles, ChevronRight, Layers } from "lucide-react";
import { MOCK_GRAPH_NODES, GraphNodeData } from "@/lib/data/mockGraphData";

gsap.registerPlugin(ScrollTrigger);

interface ExploreKnowledgeProps {
  onOpenGraphStudio: (node?: GraphNodeData) => void;
}

export function ExploreKnowledge({ onOpenGraphStudio }: ExploreKnowledgeProps) {
  const targetChainIds = ["s-python", "s-ml", "p-ai-agent", "g-ml-mastery"];
  const [selectedChainIdx, setSelectedChainIdx] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const chainNodes = targetChainIds
    .map((id) => MOCK_GRAPH_NODES.find((n) => n.id === id))
    .filter(Boolean) as GraphNodeData[];

  const currentNode = chainNodes[selectedChainIdx] || chainNodes[0];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(line1Ref.current, { yPercent: 108, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1.0, ease: "expo.out" })
        .fromTo(line2Ref.current, { yPercent: 108, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1.0, ease: "expo.out" }, 0.15)
        .fromTo(subtextRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.9 }, 0.35)
        .fromTo(panelRef.current, { opacity: 0, x: -28, filter: "blur(8px)" }, { opacity: 1, x: 0, filter: "blur(0px)", duration: 1.0, ease: "power3.out" }, 0.5)
        .fromTo(ctaRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7 }, 0.9);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="explore-knowledge"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center py-28 px-6 sm:px-12 lg:px-20 overflow-hidden pointer-events-none"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Chapter Header */}
        <div className="flex items-center justify-between pointer-events-auto mb-6">
          <Badge variant="lime" dot>
            CHAPTER 05 // SPATIAL EXPLORATION • THE LIVING CARTOGRAPHY
          </Badge>
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-500">
            <Compass className="w-3.5 h-3.5 text-[#00F0FF]" />
            <span>CAMERA TRAVERSING GRAPH DEPTH</span>
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
                <span ref={line1Ref} style={{ display: "block", opacity: 0 }}>Explore your mind</span>
              </span>
              <span className="block overflow-hidden">
                <span
                  ref={line2Ref}
                  style={{ display: "block", opacity: 0 }}
                  className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#D4FF00]"
                >
                  as a living map.
                </span>
              </span>
            </h2>

            <p
              ref={subtextRef}
              style={{ opacity: 0 }}
              className="mt-8 text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-md"
            >
              Step inside the graph. Follow the synaptic threads connecting code syntax to
              high-level mastery. Hover any node in 3D to illuminate its pathway.
            </p>

            {/* Interactive Chain Tracker */}
            <div
              ref={panelRef}
              style={{ opacity: 0 }}
              className="mt-8 w-full max-w-lg p-5 rounded-2xl bg-[#090C10]/80 backdrop-blur-xl border border-white/[0.08] shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
            >
              <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-4 flex items-center justify-between">
                <span>CONCRETE PATHWAY // VERIFIED RELATIONSHIP</span>
                <span className="text-[#D4FF00] font-bold">CHAIN 01</span>
              </div>

              {/* Horizontal Breadcrumb */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-2">
                {chainNodes.map((node, idx) => {
                  const isSelected = selectedChainIdx === idx;
                  return (
                    <React.Fragment key={node.id}>
                      <button
                        onClick={() => setSelectedChainIdx(idx)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 whitespace-nowrap border ${
                          isSelected
                            ? "bg-white/[0.1] border-[#D4FF00] text-white shadow-[0_0_15px_rgba(212,255,0,0.25)]"
                            : "bg-white/[0.03] border-white/[0.06] text-slate-400 hover:text-white"
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: node.color }} />
                        {node.label}
                      </button>
                      {idx < chainNodes.length - 1 && (
                        <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                      )}
                    </React.Fragment>
                  );
                })}
              </div>

              {/* Node Deep-Dive */}
              {currentNode && (
                <div className="mt-4 pt-4 border-t border-white/[0.06]">
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: `${currentNode.color}18`,
                        color: currentNode.color,
                        border: `1px solid ${currentNode.color}40`,
                      }}
                    >
                      {currentNode.category}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      STATUS: {currentNode.metrics?.activity || "ACTIVE"}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-white font-mono">{currentNode.label}</h4>
                  <p className="mt-1.5 text-xs text-slate-300 leading-relaxed">{currentNode.description}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {currentNode.metrics?.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-slate-400 border border-white/[0.06]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div ref={ctaRef} style={{ opacity: 0 }} className="mt-8 flex items-center gap-4">
              <Button
                variant="primary"
                size="md"
                onClick={() => onOpenGraphStudio(currentNode)}
                className="font-mono text-xs"
              >
                <Sparkles className="w-4 h-4 mr-1.5 text-black" />
                Inspect in 3D Knowledge Studio
              </Button>
            </div>
          </div>

          {/* Right Column: Camera Immersion Hint */}
          <div className="lg:col-span-6 h-[400px] lg:h-[550px] relative pointer-events-none flex flex-col justify-end items-end">
            <div className="hidden lg:flex flex-col items-end gap-2 p-4 rounded-xl bg-[#090C10]/70 backdrop-blur-2xl border border-white/[0.08]">
              <div className="flex items-center gap-2 text-[11px] font-mono text-[#00F0FF]">
                <Layers className="w-3.5 h-3.5" />
                <span>SPATIAL RAYCASTER // ACTIVE</span>
              </div>
              <div className="text-[10px] font-mono text-slate-400">
                HOVER NODES IN 3D TO REVEAL CONNECTIONS
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
