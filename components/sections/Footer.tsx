"use client";

import React from "react";
import { Box, ShieldCheck, Globe, Code, ArrowUp } from "lucide-react";

interface FooterProps {
  onOpenGraphStudio: () => void;
}

export function Footer({ onOpenGraphStudio }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative z-10 border-t border-white/[0.08] bg-[#050608] pt-20 pb-14 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[200px] bg-[#D4FF00]/[0.03] blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-16 border-b border-white/5 text-sm">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <a href="#hero" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#0D1117] border border-[#D4FF00]/40 flex items-center justify-center text-[#D4FF00]">
                <Box className="w-4 h-4" />
              </div>
              <span className="font-bold tracking-tight text-lg text-white font-sans">
                LIFE<span className="text-[#D4FF00]">GRAPH</span>
              </span>
            </a>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm font-normal">
              An AI-powered personal knowledge system connecting projects, skills, goals, documents, and experiences into an intelligent personal knowledge graph.
            </p>
            <div className="pt-2 flex items-center gap-3 text-slate-500">
              <span className="text-[11px] font-mono text-[#D4FF00]">A LIVING MAP OF EVERYTHING YOU KNOW</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-semibold mb-4">
              Story Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400 font-mono">
              <li><a href="#hero" className="hover:text-white transition-colors">01 // The Persona</a></li>
              <li><a href="#scattered-knowledge" className="hover:text-white transition-colors">02 // Scattered Problem</a></li>
              <li><a href="#connections" className="hover:text-white transition-colors">03 // Connection Layer</a></li>
              <li><a href="#ai-understanding" className="hover:text-white transition-colors">04 // AI Understanding</a></li>
              <li><a href="#explore-knowledge" className="hover:text-white transition-colors">05 // Spatial Exploration</a></li>
              <li><a href="#personal-growth" className="hover:text-white transition-colors">06 // Personal Growth</a></li>
              <li><a href="#final-cta" className="hover:text-white transition-colors">07 // The Embodiment</a></li>
            </ul>
          </div>

          {/* System & Interactive Links */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-semibold mb-4">
              Interactive 3D Engine
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400 font-mono">
              <li>
                <button onClick={onOpenGraphStudio} className="text-[#D4FF00] hover:underline flex items-center gap-1.5">
                  <span>→ Launch 3D Knowledge Studio</span>
                </button>
              </li>
              <li><span className="text-slate-500">Model: PBR Avatar Mesh</span></li>
              <li><span className="text-slate-500">Rendering: Three.js + React Three Fiber</span></li>
              <li><span className="text-slate-500">Kinematics: Cursor Gaze + Harmonic Idle</span></li>
              <li><span className="text-slate-500">Motion: Lenis + GSAP ScrollTrigger</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>© {new Date().getFullYear()} LifeGraph. Built with Three.js & Next.js.</div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
              <span>COGNITIVE RUNTIME: <span className="text-[#10B981]">ONLINE</span></span>
            </div>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-slate-400 hover:text-[#D4FF00] transition-colors"
            >
              <span>TOP</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
