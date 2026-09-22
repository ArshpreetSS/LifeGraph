"use client";

import React from "react";
import { Badge } from "@/components/ui/Badge";
import { Sun, ShieldCheck, Box, Sliders, Zap } from "lucide-react";

export function MaterialityAct() {
  const specs = [
    {
      title: "64,800 TRIANGLES",
      subtitle: "GEOMETRY BUDGET",
      detail: "Clean quad-dominant topology optimized for seamless 60fps WebGL execution without mesh popping.",
      icon: Box,
    },
    {
      title: "PHYSICALLY BASED SHADING",
      subtitle: "SURFACE INTEGRITY",
      detail: "Multi-channel maps: Albedo, Roughness, Metalness, and Normal channels reacting accurately to directional light.",
      icon: Sliders,
    },
    {
      title: "STUDIO RIM ILLUMINATION",
      subtitle: "DYNAMIC LIGHT SWEEP",
      detail: "Dual key & rim spotlights in Electric Lime (#D4FF00) and Cyan (#00F0FF) sculpting her contours in real-time.",
      icon: Sun,
    },
  ];

  return (
    <section
      id="act-materiality"
      className="relative min-h-screen flex flex-col justify-between py-24 px-6 sm:px-12 lg:px-20 overflow-hidden pointer-events-none"
    >
      {/* Top Header */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between relative z-10 pointer-events-auto">
        <Badge variant="lime" dot>
          ACT 04 // DIGITAL MATERIALITY • PBR & LIGHTING AUDIT
        </Badge>
        <div className="text-xs font-mono text-slate-500 hidden sm:flex items-center gap-2">
          <Zap className="w-3.5 h-3.5 text-[#D4FF00]" />
          <span>STUDIO SPOTLIGHT SWEEP: ACTIVE</span>
        </div>
      </div>

      {/* Main Grid: Centered open framing for her side profile */}
      <div className="max-w-7xl mx-auto w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
        {/* Left Column: Technical Dossier */}
        <div className="lg:col-span-5 flex flex-col items-start text-left pointer-events-auto">
          <div className="text-xs font-mono tracking-widest text-[#D4FF00] uppercase mb-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4FF00] animate-pulse" />
            04 / VOLUMETRIC RENDERING
          </div>

          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            Surfaces <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-[#D4FF00]">
              in Light.
            </span>
          </h2>

          <p className="mt-6 text-sm text-slate-300 leading-relaxed font-normal max-w-md">
            As you navigate through the dossier, dynamic directional rim lights sweep over her features, illuminating the tactile depth of synthetic skin, braided hair, and cybernetic contours.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4 w-full font-mono text-xs">
            <div className="p-3 rounded-lg bg-[#090C10]/80 border border-white/10">
              <span className="text-slate-500 block text-[10px]">COLOR SPACE</span>
              <span className="text-white font-bold">Linear sRGB (ACES)</span>
            </div>
            <div className="p-3 rounded-lg bg-[#090C10]/80 border border-white/10">
              <span className="text-slate-500 block text-[10px]">DRACO COMPRESSION</span>
              <span className="text-[#D4FF00] font-bold">100% LOSSLESS</span>
            </div>
          </div>
        </div>

        {/* Center Space: Open for Avatar side profile sweep */}
        <div className="lg:col-span-2 h-[200px] pointer-events-none" />

        {/* Right Column: Spec cards */}
        <div className="lg:col-span-5 flex flex-col gap-4 pointer-events-auto">
          {specs.map((spec, i) => {
            const Icon = spec.icon;
            return (
              <div
                key={i}
                className="p-5 rounded-xl bg-[#090C10]/80 backdrop-blur-xl border border-white/[0.08] hover:border-[#D4FF00]/40 transition-all"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-[#D4FF00]/10 border border-[#D4FF00]/25 flex items-center justify-center text-[#D4FF00]">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-mono font-bold text-white tracking-wide">
                      {spec.title}
                    </h3>
                    <span className="text-[10px] font-mono text-[#D4FF00]">
                      {spec.subtitle}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-slate-400 font-mono leading-relaxed mt-2">
                  {spec.detail}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between pt-6 border-t border-white/[0.06] text-xs font-mono text-slate-500 pointer-events-auto">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-[#D4FF00]" />
          <span>REAL-TIME SHADER PASSES VERIFIED // 60 FPS SOLID</span>
        </div>
        <div className="text-[#D4FF00]">
          FINALE: FULL EMBODIMENT ↓
        </div>
      </div>
    </section>
  );
}
