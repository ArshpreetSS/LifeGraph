"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Eye, Layers, Activity, Cpu, Sparkles } from "lucide-react";

export function ModelInspection() {
  const [isWireframe, setIsWireframe] = useState(false);

  React.useEffect(() => {
    const handler = (e: Event) => {
      const custom = e as CustomEvent<boolean>;
      if (custom.detail !== undefined) setIsWireframe(custom.detail);
    };
    window.addEventListener("lifegraph-toggle-wireframe", handler);
    return () => window.removeEventListener("lifegraph-toggle-wireframe", handler);
  }, []);

  const toggleWireframe = () => {
    const nextState = !isWireframe;
    setIsWireframe(nextState);
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("lifegraph-toggle-wireframe", { detail: nextState })
      );
    }
  };

  return (
    <section
      id="act-inspection"
      className="relative min-h-screen flex flex-col justify-between py-24 px-6 sm:px-12 lg:px-20 overflow-hidden pointer-events-none"
    >
      {/* Top Section Header */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between relative z-10 pointer-events-auto">
        <Badge variant="cyan" dot>
          ACT 02 // NEURAL INSPECTION • HIGH DENSITY FACIAL MESH
        </Badge>
        <div className="text-xs font-mono text-slate-500 hidden sm:block">
          ZOOM RATIO: <span className="text-[#00F0FF]">1.75X</span> // FOCAL DIST: 2.15M
        </div>
      </div>

      {/* Main Grid: Framing the close-up of the avatar's face in the center */}
      <div className="max-w-7xl mx-auto w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        {/* Left Column: Inspection Dossier */}
        <div className="lg:col-span-4 flex flex-col items-start text-left pointer-events-auto">
          <div className="text-xs font-mono tracking-widest text-[#00F0FF] uppercase mb-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse" />
            02 / SUB-MILLIMETER FIDELITY
          </div>

          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            Anatomical <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-[#00F0FF]">
              Precision.
            </span>
          </h2>

          <p className="mt-6 text-sm text-slate-300 leading-relaxed font-normal">
            Every contour is sculpted to reflect cognitive vitality. Built with 64,800 polygon subdivisions and real-time micro-surface displacement.
          </p>

          {/* Wireframe vs PBR Mesh Toggle */}
          <div className="mt-8 p-4 rounded-xl bg-[#090C10]/80 backdrop-blur-xl border border-white/10 w-full">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-slate-400">SHADER MODE</span>
              <span className="text-xs font-mono text-[#D4FF00]">
                {isWireframe ? "TOPOLOGICAL WIREFRAME" : "PBR LIT TEXTURES"}
              </span>
            </div>
            <button
              onClick={toggleWireframe}
              className={`w-full py-2.5 px-4 rounded-lg font-mono text-xs tracking-wider transition-all flex items-center justify-center gap-2 border ${
                isWireframe
                  ? "bg-[#D4FF00] text-black border-[#D4FF00] shadow-[0_0_20px_rgba(212,255,0,0.4)]"
                  : "bg-white/5 text-white border-white/15 hover:border-[#00F0FF]/60 hover:text-[#00F0FF]"
              }`}
            >
              <Layers className="w-4 h-4" />
              {isWireframe ? "REVERT TO PBR SURFACE" : "INSPECT WIREFRAME MESH"}
            </button>
          </div>
        </div>

        {/* Center Space: Open for Avatar Face Close-up */}
        <div className="lg:col-span-4 h-[350px] lg:h-[500px] pointer-events-none relative flex items-center justify-center">
          {/* Subtle targeting reticle */}
          <div className="w-48 h-48 rounded-full border border-white/[0.08] flex items-center justify-center pointer-events-none animate-pulse">
            <div className="w-2 h-2 rounded-full bg-[#00F0FF]/60" />
          </div>
        </div>

        {/* Right Column: Floating Telemetry Annotation Points */}
        <div className="lg:col-span-4 flex flex-col gap-4 pointer-events-auto">
          {/* Telemetry Point 1 */}
          <div className="p-4 rounded-xl bg-[#090C10]/70 backdrop-blur-xl border border-white/[0.08] hover:border-[#00F0FF]/40 transition-all">
            <div className="flex items-center gap-2 text-xs font-mono text-[#00F0FF] mb-1">
              <Eye className="w-3.5 h-3.5" />
              <span>GAZE COORDINATE MATRIX</span>
            </div>
            <p className="text-xs text-slate-400 font-mono">
              Bidirectional yaw & pitch tracking with 0.08 damping coefficient. Zero jerkiness.
            </p>
          </div>

          {/* Telemetry Point 2 */}
          <div className="p-4 rounded-xl bg-[#090C10]/70 backdrop-blur-xl border border-white/[0.08] hover:border-[#D4FF00]/40 transition-all">
            <div className="flex items-center gap-2 text-xs font-mono text-[#D4FF00] mb-1">
              <Activity className="w-3.5 h-3.5" />
              <span>HARMONIC BREATHING WAVE</span>
            </div>
            <p className="text-xs text-slate-400 font-mono">
              Compound sine engine (0.15Hz, 0.37Hz, 0.83Hz) activates during idle resting states.
            </p>
          </div>

          {/* Telemetry Point 3 */}
          <div className="p-4 rounded-xl bg-[#090C10]/70 backdrop-blur-xl border border-white/[0.08] hover:border-white/30 transition-all">
            <div className="flex items-center gap-2 text-xs font-mono text-white mb-1">
              <Cpu className="w-3.5 h-3.5" />
              <span>LATENT COGNITIVE STATE</span>
            </div>
            <p className="text-xs text-slate-400 font-mono">
              Visual manifestation of memory embeddings dynamically mapped to the physical persona.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Footer Line */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between pt-6 border-t border-white/[0.06] text-xs font-mono text-slate-500 pointer-events-auto">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00F0FF]" />
          <span>MICRO-EXPRESSION DYNAMICS READY</span>
        </div>
        <div className="text-[#00F0FF]">
          CONTINUE SCROLL FOR COGNITIVE TOPOLOGY ↓
        </div>
      </div>
    </section>
  );
}
