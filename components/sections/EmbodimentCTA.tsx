"use client";

import React from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Sparkles, ArrowRight, Shield, Cpu, RefreshCw } from "lucide-react";

interface EmbodimentCTAProps {
  onOpenGraphStudio?: () => void;
}

export function EmbodimentCTA({ onOpenGraphStudio }: EmbodimentCTAProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section
      id="act-embodiment"
      className="relative min-h-screen flex flex-col justify-between py-24 px-6 sm:px-12 lg:px-20 overflow-hidden pointer-events-none"
    >
      {/* Top Header */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between relative z-10 pointer-events-auto">
        <Badge variant="lime" dot>
          ACT 05 // THE EMBODIMENT • COMPLETE CONSCIOUSNESS RUNTIME
        </Badge>
        <div className="text-xs font-mono text-slate-500 hidden sm:flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#D4FF00] animate-ping" />
          <span>SYSTEM READY FOR SYNTHESIS</span>
        </div>
      </div>

      {/* Main Grid: Centered Framing with CTA Overlays */}
      <div className="max-w-5xl mx-auto w-full my-auto flex flex-col items-center text-center relative z-10 pointer-events-auto">
        <div className="text-xs font-mono tracking-widest text-[#D4FF00] uppercase mb-4 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4FF00] animate-pulse" />
          05 / EMBODIED LIFEGRAPH OS
        </div>

        <h2 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-[1.05] max-w-3xl">
          Bring Your Mind to{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4FF00] via-white to-[#00F0FF]">
            Life.
          </span>
        </h2>

        <p className="mt-8 text-base sm:text-lg text-slate-300 max-w-xl font-normal leading-relaxed">
          Step beyond static dashboards. Experience your personal knowledge graph as an interactive, sovereign 3D intelligence that learns and grows with you.
        </p>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Button
            variant="primary"
            size="lg"
            glow
            onClick={onOpenGraphStudio}
            className="w-full sm:w-auto shadow-[0_0_35px_rgba(212,255,0,0.4)]"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Launch 3D Knowledge Studio
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>

          <Button
            variant="secondary"
            size="lg"
            onClick={scrollToTop}
            className="w-full sm:w-auto font-mono text-xs border-white/15 hover:border-[#D4FF00]/50 hover:text-[#D4FF00]"
          >
            <RefreshCw className="w-3.5 h-3.5 mr-2" />
            Replay Scrollytelling
          </Button>
        </div>

        {/* Feature Badges Strip */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl text-left">
          <div className="p-4 rounded-xl bg-[#090C10]/80 backdrop-blur-xl border border-white/[0.08]">
            <div className="flex items-center gap-2 text-xs font-mono text-[#D4FF00] mb-1">
              <Cpu className="w-3.5 h-3.5" />
              <span>ZERO LATENCY</span>
            </div>
            <p className="text-[11px] font-mono text-slate-400">
              60 FPS WebGL rendering with instant kinetic gaze tracking.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#090C10]/80 backdrop-blur-xl border border-white/[0.08]">
            <div className="flex items-center gap-2 text-xs font-mono text-[#00F0FF] mb-1">
              <Shield className="w-3.5 h-3.5" />
              <span>100% PRIVATE</span>
            </div>
            <p className="text-[11px] font-mono text-slate-400">
              Your vectors and personal knowledge never leave your encrypted sandbox.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#090C10]/80 backdrop-blur-xl border border-white/[0.08]">
            <div className="flex items-center gap-2 text-xs font-mono text-white mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>DYNAMIC HALO</span>
            </div>
            <p className="text-[11px] font-mono text-slate-400">
              Autonomous thought clusters crystallizing as new memories emerge.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Footer Line */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between pt-6 border-t border-white/[0.06] text-xs font-mono text-slate-500 pointer-events-auto">
        <div>LIFEGRAPH // DIGITAL EMBODIMENT FOUNDATION</div>
        <div className="text-slate-400">DESIGNED EXCLUSIVELY FOR EMBODIED 3D</div>
      </div>
    </section>
  );
}
