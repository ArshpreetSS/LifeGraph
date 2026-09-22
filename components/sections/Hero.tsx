"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Sparkles, ArrowDown, Move } from "lucide-react";

interface HeroProps {
  onOpenGraphStudio: () => void;
}

export function Hero({ onOpenGraphStudio }: HeroProps) {
  const [coords, setCoords] = useState({ x: "0.00", y: "0.00" });
  const heroRef = useRef<HTMLElement>(null);
  const kickerRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLSpanElement>(null);
  const telemetryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const normX = ((e.clientX / window.innerWidth) * 2 - 1).toFixed(2);
      const normY = (-(e.clientY / window.innerHeight) * 2 + 1).toFixed(2);
      setCoords({ x: normX, y: normY });
    };
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  // Cinematic entry animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      // 1. Watermark text scales up from opacity 0
      tl.fromTo(
        watermarkRef.current,
        { opacity: 0, scale: 1.08 },
        { opacity: 1, scale: 1, duration: 1.6, ease: "power2.out" },
        0
      );

      // 2. Badge slides in from left
      tl.fromTo(
        badgeRef.current,
        { opacity: 0, x: -28, filter: "blur(4px)" },
        { opacity: 1, x: 0, filter: "blur(0px)", duration: 0.9 },
        0.2
      );

      // 3. Kicker label slides up
      tl.fromTo(
        kickerRef.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.7 },
        0.5
      );

      // 4. Headline line 1 — clip reveal from bottom
      tl.fromTo(
        line1Ref.current,
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.1, ease: "expo.out" },
        0.65
      );

      // 5. Headline line 2 — clip reveal slightly after
      tl.fromTo(
        line2Ref.current,
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.1, ease: "expo.out" },
        0.8
      );

      // 6. Subtext fades up
      tl.fromTo(
        subtextRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.9 },
        1.1
      );

      // 7. CTA buttons stagger in
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.8 },
        1.25
      );

      // 8. Telemetry card slides in from right
      tl.fromTo(
        telemetryRef.current,
        { opacity: 0, x: 24, filter: "blur(6px)" },
        { opacity: 1, x: 0, filter: "blur(0px)", duration: 1.0 },
        1.1
      );

      // 9. Bottom bar fades up
      tl.fromTo(
        bottomRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.7 },
        1.4
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToNext = () => {
    const el = document.getElementById("scattered-knowledge");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-between pt-32 pb-14 px-6 sm:px-12 lg:px-20 overflow-hidden pointer-events-none"
    >
      {/* Massive Background Display Typography — Rolf Jensen depth layer */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden">
        <span
          ref={watermarkRef}
          style={{ opacity: 0 }}
          className="text-[18vw] font-black tracking-tighter text-white/[0.022] uppercase leading-none transform -translate-y-8"
        >
          LIFEGRAPH
        </span>
      </div>

      {/* Top Editorial Status Row */}
      <div ref={badgeRef} style={{ opacity: 0 }} className="max-w-7xl mx-auto w-full flex items-center justify-between relative z-10 pointer-events-auto">
        <Badge variant="lime" dot>
          CHAPTER 01 // INTELLIGENT PRESENCE • PERSONAL KNOWLEDGE GRAPH
        </Badge>

        <div className="hidden sm:flex items-center gap-4 text-xs font-mono text-slate-500">
          <span>PTR: [{coords.x}, {coords.y}]</span>
          <span>•</span>
          <span className="text-[#D4FF00] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4FF00] animate-ping" />
            SYNAPSE ONLINE
          </span>
        </div>
      </div>

      {/* Central Framing: Bold Editorial Hero Typography */}
      <div className="max-w-7xl mx-auto w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        {/* Left Column: Monumental Editorial Text */}
        <div className="lg:col-span-7 flex flex-col items-start text-left pointer-events-auto">
          {/* Kicker */}
          <div
            ref={kickerRef}
            style={{ opacity: 0 }}
            className="text-xs font-mono tracking-widest text-[#D4FF00] uppercase mb-5 flex items-center gap-2"
          >
            <span className="w-8 h-[1px] bg-[#D4FF00]" />
            A LIVING MAP OF EVERYTHING YOU KNOW
          </div>

          {/* Headline — each line wrapped in overflow:hidden for clip reveal */}
          <h1 className="font-black tracking-tighter leading-[0.92] text-white" style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}>
            {/* Line 1 wrapper */}
            <span className="block overflow-hidden">
              <span ref={line1Ref} style={{ display: "block", opacity: 0 }}>
                Your knowledge,
              </span>
            </span>
            {/* Line 2 wrapper */}
            <span className="block overflow-hidden">
              <span ref={line2Ref} style={{ display: "block", opacity: 0 }} className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#D4FF00]">
                connected.
              </span>
            </span>
          </h1>

          <p
            ref={subtextRef}
            style={{ opacity: 0 }}
            className="mt-8 text-base sm:text-lg text-slate-300 max-w-lg font-normal leading-relaxed"
          >
            Instead of keeping your projects, skills, notes, documents, and goals as disconnected
            files — LifeGraph weaves them into an intelligent personal knowledge graph, guided by
            a calm digital presence.
          </p>

          {/* Interactive CTAs */}
          <div ref={ctaRef} style={{ opacity: 0 }} className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Button
              variant="primary"
              size="lg"
              glow
              onClick={scrollToNext}
              className="w-full sm:w-auto shadow-[0_0_30px_rgba(212,255,0,0.35)] btn-magnetic"
            >
              Explore The Experience
              <ArrowDown className="w-4 h-4 ml-1.5" />
            </Button>

            <Button
              variant="secondary"
              size="lg"
              onClick={onOpenGraphStudio}
              className="w-full sm:w-auto font-mono text-xs border-white/15 hover:border-[#D4FF00]/50 hover:text-[#D4FF00] btn-magnetic"
            >
              <Sparkles className="w-4 h-4 text-[#D4FF00]" />
              3D Knowledge Studio
            </Button>
          </div>
        </div>

        {/* Right Column: Open spatial arena for 3D Avatar */}
        <div
          data-cursor="intelligence"
          className="lg:col-span-5 h-[380px] lg:h-[560px] pointer-events-none relative flex flex-col justify-end items-end"
        >
          {/* Subtle Cybernetic Telemetry Card */}
          <div
            ref={telemetryRef}
            style={{ opacity: 0 }}
            className="hidden lg:flex flex-col items-end gap-1.5 p-4 rounded-xl bg-[#090C10]/60 backdrop-blur-2xl border border-white/[0.08] shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
          >
            <div className="flex items-center gap-2 text-[11px] font-mono text-[#00F0FF]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse" />
              <span>COGNITIVE LAYER // ACTIVE</span>
            </div>
            <div className="text-[10px] font-mono text-slate-400">
              GAZE TRACKING + PROCEDURAL KINEMATICS
            </div>
            <div className="text-[10px] font-mono text-slate-500 mt-0.5">
              GLB MESH — 1.06M VERTICES
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Editorial Strip */}
      <div
        ref={bottomRef}
        style={{ opacity: 0 }}
        className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/[0.06] text-xs font-mono text-slate-500 relative z-10 pointer-events-auto"
      >
        <div className="flex items-center gap-2.5">
          <Move className="w-3.5 h-3.5 text-[#D4FF00] animate-pulse" />
          <span>MOVE CURSOR TO INFLUENCE GAZE — SCROLL TO JOURNEY DEEPER</span>
        </div>

        <div className="flex items-center gap-6 text-[11px]">
          <span className="text-slate-400">
            GRAPH: <span className="text-[#00F0FF]">12 NODES • 18 EDGES</span>
          </span>
          <button onClick={scrollToNext} className="text-[#D4FF00] hover:underline flex items-center gap-1">
            BEGIN ↓
          </button>
        </div>
      </div>
    </section>
  );
}
