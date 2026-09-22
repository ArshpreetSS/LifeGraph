"use client";

import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Sparkles, ArrowRight, Check, Terminal } from "lucide-react";
import confetti from "canvas-confetti";

gsap.registerPlugin(ScrollTrigger);

interface FinalCTAProps {
  onOpenGraphStudio: () => void;
}

export function FinalCTA({ onOpenGraphStudio }: FinalCTAProps) {
  const [copied, setCopied] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const watermarkRef = useRef<HTMLSpanElement>(null);
  const badgeRowRef = useRef<HTMLDivElement>(null);
  const kickerRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaGroupRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      // Watermark floats in
      tl.fromTo(
        watermarkRef.current,
        { opacity: 0, scale: 1.05 },
        { opacity: 1, scale: 1, duration: 1.4, ease: "power2.out" },
        0
      )
        .fromTo(badgeRowRef.current, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.7 }, 0.2)
        .fromTo(kickerRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6 }, 0.4)
        // Dramatic headline: scale + clip reveal
        .fromTo(
          line1Ref.current,
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1.1, ease: "expo.out" },
          0.55
        )
        .fromTo(
          line2Ref.current,
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1.1, ease: "expo.out" },
          0.72
        )
        .fromTo(subtextRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.9 }, 0.95)
        // CTA buttons bounce in with elastic
        .fromTo(
          ctaGroupRef.current,
          { opacity: 0, y: 22, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 1.0, ease: "back.out(1.6)" },
          1.1
        )
        .fromTo(terminalRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.7 }, 1.35)
        .fromTo(bottomRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 }, 1.55);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleLaunch = () => {
    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.65 },
      colors: ["#D4FF00", "#00F0FF", "#10B981", "#ffffff"],
    });
    onOpenGraphStudio();
  };

  const handleCopyInstall = () => {
    navigator.clipboard?.writeText("npx lifegraph@latest init");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="final-cta"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-between pt-28 pb-16 px-6 sm:px-12 lg:px-20 overflow-hidden pointer-events-none"
    >
      {/* Background Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden">
        <span
          ref={watermarkRef}
          style={{ opacity: 0 }}
          className="text-[16vw] font-black tracking-tighter text-white/[0.018] uppercase leading-none transform translate-y-14"
        >
          SYNAPSE
        </span>
      </div>

      {/* Top Badge Row */}
      <div
        ref={badgeRowRef}
        style={{ opacity: 0 }}
        className="max-w-7xl mx-auto w-full flex items-center justify-between relative z-10 pointer-events-auto"
      >
        <Badge variant="lime" dot>
          CHAPTER 07 // THE EMBODIMENT • INITIALIZE MAP
        </Badge>
        <span className="text-xs font-mono text-slate-500 hidden sm:inline">
          STATUS: READY FOR CONSCIOUS INGESTION
        </span>
      </div>

      {/* Center Monumental Typography */}
      <div className="max-w-4xl mx-auto w-full text-center relative z-10 my-auto pointer-events-auto flex flex-col items-center">
        <div
          ref={kickerRef}
          style={{ opacity: 0 }}
          className="text-xs font-mono tracking-widest text-[#D4FF00] uppercase mb-5 flex items-center gap-2"
        >
          <span className="w-8 h-[1px] bg-[#D4FF00]" />
          YOUR LIVING PERSONAL KNOWLEDGE SYSTEM
          <span className="w-8 h-[1px] bg-[#D4FF00]" />
        </div>

        <h2
          className="font-black tracking-tight leading-[0.93] text-white"
          style={{ fontSize: "clamp(2.8rem, 7.5vw, 6.5rem)" }}
        >
          <span className="block overflow-hidden">
            <span ref={line1Ref} style={{ display: "block", opacity: 0 }}>
              See what you know.
            </span>
          </span>
          <span className="block overflow-hidden">
            <span
              ref={line2Ref}
              style={{ display: "block", opacity: 0 }}
              className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#D4FF00]"
            >
              Discover what&apos;s connected.
            </span>
          </span>
        </h2>

        <p
          ref={subtextRef}
          style={{ opacity: 0 }}
          className="mt-8 text-base sm:text-xl text-slate-300 font-normal max-w-xl mx-auto leading-relaxed"
        >
          Build your map of knowledge. Connect your projects, skills, documents, and goals
          into a calm, living 3D intelligence.
        </p>

        {/* Primary CTAs */}
        <div
          ref={ctaGroupRef}
          style={{ opacity: 0 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          <Button
            variant="primary"
            size="lg"
            glow
            onClick={handleLaunch}
            className="w-full sm:w-auto text-sm font-semibold shadow-[0_0_40px_rgba(212,255,0,0.45)] btn-magnetic"
          >
            <Sparkles className="w-4 h-4 mr-2 text-black" />
            Explore LifeGraph
            <ArrowRight className="w-4 h-4 ml-2 text-black" />
          </Button>

          <Button
            variant="secondary"
            size="lg"
            onClick={onOpenGraphStudio}
            className="w-full sm:w-auto font-mono text-xs border-white/15 hover:border-[#D4FF00]/50 hover:text-[#D4FF00] btn-magnetic"
          >
            Launch 3D Knowledge Studio
          </Button>
        </div>

        {/* Terminal snippet */}
        <div
          ref={terminalRef}
          style={{ opacity: 0 }}
          className="mt-8 flex items-center gap-3 px-4 py-2.5 rounded-xl bg-black/60 border border-white/[0.08] backdrop-blur-xl text-xs font-mono text-slate-400 max-w-md w-full justify-between"
        >
          <div className="flex items-center gap-2 truncate">
            <Terminal className="w-3.5 h-3.5 text-[#D4FF00] shrink-0" />
            <span className="text-slate-200">npx lifegraph@latest init</span>
          </div>
          <button
            onClick={handleCopyInstall}
            className="text-[11px] text-[#D4FF00] hover:underline flex items-center gap-1 shrink-0 ml-2"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                <span className="text-emerald-400">COPIED</span>
              </>
            ) : (
              <span>COPY</span>
            )}
          </button>
        </div>
      </div>

      {/* Bottom Technical Spec Bar */}
      <div
        ref={bottomRef}
        style={{ opacity: 0 }}
        className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/[0.06] text-xs font-mono text-slate-500 relative z-10 pointer-events-auto"
      >
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#10B981]" />
          <span>GRAPH ENGINE: CLIENT-SIDE THREE.JS / WEBGL</span>
        </div>
        <div className="flex items-center gap-6 text-[11px]">
          <span>LATENCY: &lt;16MS</span>
          <span>DPR: [1, 2]</span>
          <span className="text-[#D4FF00]">FRONTEND READY</span>
        </div>
      </div>
    </section>
  );
}
