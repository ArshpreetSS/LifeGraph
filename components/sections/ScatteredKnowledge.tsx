"use client";

import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Badge } from "@/components/ui/Badge";
import { FileText, Code2, Target, BookOpen, Lightbulb, Shuffle, Link2, LucideIcon } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface FloatingFragment {
  id: string;
  category: string;
  title: string;
  origin: string;
  icon: LucideIcon;
  color: string;
  borderColor: string;
  positionClass: string;
  delay: string;
  rotate: string;
}

const FRAGMENTS: FloatingFragment[] = [
  {
    id: "f-note",
    category: "NOTE",
    title: "Async runtime loop benchmarks",
    origin: "Notion / Scratchpad",
    icon: Lightbulb,
    color: "text-[#A78BFA]",
    borderColor: "border-[#A78BFA]/30",
    positionClass: "top-4 left-4 sm:left-12",
    delay: "0s",
    rotate: "-4deg",
  },
  {
    id: "f-proj",
    category: "PROJECT",
    title: "Autonomous Agent Architecture",
    origin: "GitHub / repo-v3",
    icon: Code2,
    color: "text-[#00F0FF]",
    borderColor: "border-[#00F0FF]/30",
    positionClass: "top-36 left-8 sm:left-24",
    delay: "0.6s",
    rotate: "2deg",
  },
  {
    id: "f-doc",
    category: "DOCUMENT",
    title: "Vector Clustering RFC Whitepaper",
    origin: "Google Drive / PDF",
    icon: FileText,
    color: "text-slate-200",
    borderColor: "border-slate-400/30",
    positionClass: "top-72 left-2 sm:left-16",
    delay: "1.2s",
    rotate: "-2deg",
  },
  {
    id: "f-skill",
    category: "SKILL",
    title: "Python & Neural Embeddings",
    origin: "Experience / Verified",
    icon: Code2,
    color: "text-[#10B981]",
    borderColor: "border-[#10B981]/30",
    positionClass: "top-20 right-4 sm:right-28 lg:right-48",
    delay: "0.3s",
    rotate: "3deg",
  },
  {
    id: "f-goal",
    category: "GOAL",
    title: "Machine Learning Mastery",
    origin: "Personal Vision 2026",
    icon: Target,
    color: "text-[#D4FF00]",
    borderColor: "border-[#D4FF00]/40",
    positionClass: "top-60 right-8 sm:right-32 lg:right-64",
    delay: "0.9s",
    rotate: "-3deg",
  },
  {
    id: "f-learn",
    category: "LEARNING",
    title: "Markov Decision Processes",
    origin: "ArXiv / Reading list",
    icon: BookOpen,
    color: "text-[#FBBF24]",
    borderColor: "border-[#FBBF24]/30",
    positionClass: "top-96 right-2 sm:right-20 lg:right-40",
    delay: "1.5s",
    rotate: "2deg",
  },
];

export function ScatteredKnowledge() {
  const [isOrdered, setIsOrdered] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const fragmentsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading line clip reveals on scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          end: "top 30%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        line1Ref.current,
        { yPercent: 105, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.0, ease: "expo.out" }
      )
        .fromTo(
          line2Ref.current,
          { yPercent: 105, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1.0, ease: "expo.out" },
          0.15
        )
        .fromTo(
          bodyRef.current,
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
          0.35
        );

      // Fragment cards stagger in
      gsap.fromTo(
        fragmentsRef.current.filter(Boolean),
        { opacity: 0, scale: 0.9, filter: "blur(6px)" },
        {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.8,
          stagger: 0.12,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="scattered-knowledge"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center py-28 px-6 sm:px-12 lg:px-20 overflow-hidden pointer-events-none"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Chapter Header */}
        <div className="flex items-center justify-between pointer-events-auto mb-6">
          <Badge variant="outline">
            CHAPTER 02 // THE ENTROPY OF KNOWLEDGE
          </Badge>

          {/* Interactive Mode Toggle */}
          <button
            onClick={() => setIsOrdered((prev) => !prev)}
            className="flex items-center gap-2 text-xs font-mono px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] hover:border-[#D4FF00]/50 hover:bg-[#D4FF00]/[0.05] transition-all text-slate-300 hover:text-white"
          >
            {isOrdered ? (
              <>
                <Link2 className="w-3.5 h-3.5 text-[#D4FF00]" />
                <span>STATE: <span className="text-[#D4FF00]">CONNECTED IN LIFEGRAPH</span></span>
              </>
            ) : (
              <>
                <Shuffle className="w-3.5 h-3.5 text-slate-400" />
                <span>STATE: <span className="text-rose-400">DISCONNECTED ENTROPY</span></span>
              </>
            )}
          </button>
        </div>

        {/* Editorial Text Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 flex flex-col items-start text-left pointer-events-auto">
            <h2
              ref={headingRef}
              className="font-black tracking-tight leading-[0.96] text-white"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}
            >
              <span className="block overflow-hidden">
                <span ref={line1Ref} style={{ display: "block", opacity: 0 }}>
                  Fragments
                </span>
              </span>
              <span className="block overflow-hidden">
                <span ref={line2Ref} style={{ display: "block", opacity: 0 }} className="text-slate-500 font-light">
                  without a center.
                </span>
              </span>
            </h2>

            <div ref={bodyRef} style={{ opacity: 0 }}>
              <p className="mt-8 text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-md">
                Every day you learn, build, note, and research. Yet your mind is splintered across
                disconnected tools: notes in Notion, code in GitHub, PDFs on disk, goals in thought.
              </p>

              <div className="mt-8 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-md max-w-md">
                <div className="text-xs font-mono uppercase tracking-wider text-[#D4FF00] mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4FF00]" />
                  THE KNOWLEDGE SILO PARADOX
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Files can store data. But disconnected files cannot understand how your Python
                  experiments support your machine learning goals.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Floating Disconnected Fragments */}
          <div className="lg:col-span-6 h-[480px] lg:h-[580px] relative pointer-events-auto">
            {FRAGMENTS.map((frag, idx) => {
              const Icon = frag.icon;
              return (
                <div
                  key={frag.id}
                  ref={(el) => { fragmentsRef.current[idx] = el; }}
                  style={{
                    opacity: 0,
                    position: "absolute",
                    animation: `float 7s ease-in-out infinite`,
                    animationDelay: frag.delay,
                    ["--card-rotate" as string]: frag.rotate,
                    rotate: frag.rotate,
                  }}
                  className={`transition-all duration-700 ease-out p-4 rounded-2xl bg-[#090C10]/80 backdrop-blur-xl border ${frag.borderColor} shadow-[0_15px_35px_rgba(0,0,0,0.5)] max-w-[260px] sm:max-w-[280px] hover:scale-105 hover:border-white/40 cursor-pointer ${frag.positionClass} ${isOrdered ? "!rotate-0 shadow-[0_0_25px_rgba(212,255,0,0.15)]" : ""}`}
                >
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <span className={`text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full bg-white/[0.06] ${frag.color}`}>
                      {frag.category}
                    </span>
                    <span className="text-[9px] font-mono text-slate-500 truncate max-w-[120px]">
                      {frag.origin}
                    </span>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <div className="p-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] shrink-0">
                      <Icon className={`w-4 h-4 ${frag.color}`} />
                    </div>
                    <p className="text-xs font-medium text-slate-200 leading-snug">
                      {frag.title}
                    </p>
                  </div>

                  {isOrdered && (
                    <div className="mt-2.5 pt-2 border-t border-white/[0.06] flex items-center justify-between text-[9px] font-mono text-[#D4FF00]">
                      <span>RELATIONSHIP DETECTED</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4FF00] animate-ping" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
