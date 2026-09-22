"use client";

import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Badge } from "@/components/ui/Badge";
import { Heart } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface Milestone {
  year: string;
  stage: string;
  headline: string;
  detail: string;
  skillsAcquired: string[];
}

const MILESTONES: Milestone[] = [
  {
    year: "LEARN",
    stage: "STAGE 01",
    headline: "Foundational Inputs",
    detail: "Absorb papers, languages, and mathematical principles without immediate pressure to connect.",
    skillsAcquired: ["Python Syntax", "Vector Mathematics", "Information Architecture"],
  },
  {
    year: "BUILD",
    stage: "STAGE 02",
    headline: "Tactile Creation",
    detail: "Assemble real systems, test edge cases, and push theoretical knowledge into running software.",
    skillsAcquired: ["Autonomous Agent Core", "WebGL Spatial Shaders", "RAG Pipelines"],
  },
  {
    year: "CONNECT",
    stage: "STAGE 03",
    headline: "Associative Synthesis",
    detail: "LifeGraph bridges isolated projects to your long-term ambitions, revealing unexpected synergies.",
    skillsAcquired: ["Neural Graph Topologies", "Bidirectional Linking", "Context Compression"],
  },
  {
    year: "UNDERSTAND",
    stage: "STAGE 04",
    headline: "Cognitive Clarity",
    detail: "You no longer wonder what you know — your personal knowledge graph reflects your exact state.",
    skillsAcquired: ["Compound Competencies", "Mental Model Audits", "Blind Spot Discovery"],
  },
  {
    year: "GROW",
    stage: "STAGE 05",
    headline: "Continuous Mastery",
    detail: "LifeGraph suggests the next breakthrough skill that unlocks multiple dormant goals.",
    skillsAcquired: ["High-Impact Mastery", "Polymathic Synthesis", "Autonomous Operating System"],
  },
];

export function PersonalGrowth() {
  const [activeIdx, setActiveIdx] = useState(2);
  const sectionRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const milestonesRef = useRef<(HTMLDivElement | null)[]>([]);
  const quoteRef = useRef<HTMLDivElement>(null);

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
        .fromTo(
          milestonesRef.current.filter(Boolean),
          { opacity: 0, y: 28, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.65,
            stagger: 0.1,
            ease: "power3.out",
          },
          0.55
        )
        .fromTo(quoteRef.current, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.8 }, 1.0);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="personal-growth"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center py-28 px-6 sm:px-12 lg:px-20 overflow-hidden pointer-events-none"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Chapter Header */}
        <div className="flex items-center justify-between pointer-events-auto mb-6">
          <Badge variant="lime" dot>
            CHAPTER 06 // HUMAN DEVELOPMENT • THE ARC OF GROWTH
          </Badge>
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-500">
            <Heart className="w-3.5 h-3.5 text-[#D4FF00]" />
            <span>HUMAN-CENTERED EVOLUTIONARY METRICS</span>
          </div>
        </div>

        {/* Editorial Heading */}
        <div className="max-w-3xl pointer-events-auto mb-12">
          <h2
            className="font-black tracking-tight leading-[0.96] text-white"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}
          >
            <span className="block overflow-hidden">
              <span ref={line1Ref} style={{ display: "block", opacity: 0 }}>Not just storage.</span>
            </span>
            <span className="block overflow-hidden">
              <span
                ref={line2Ref}
                style={{ display: "block", opacity: 0 }}
                className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#D4FF00]"
              >
                Human evolution.
              </span>
            </span>
          </h2>
          <p
            ref={subtextRef}
            style={{ opacity: 0 }}
            className="mt-6 text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-xl"
          >
            You are not a static folder of files. You are an evolving network of ideas, experiences,
            and ambitions. LifeGraph illuminates your developmental arc across time.
          </p>
        </div>

        {/* Growth Horizontal Arc */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 pointer-events-auto mb-10">
          {MILESTONES.map((m, idx) => {
            const isSelected = activeIdx === idx;
            return (
              <div
                key={m.year}
                ref={(el) => { milestonesRef.current[idx] = el; }}
                style={{ opacity: 0 }}
                onClick={() => setActiveIdx(idx)}
                className={`p-5 rounded-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between backdrop-blur-xl border ${
                  isSelected
                    ? "bg-[#090C10]/90 border-[#D4FF00] shadow-[0_0_28px_rgba(212,255,0,0.18)] scale-[1.03]"
                    : "bg-[#090C10]/50 border-white/[0.08] hover:border-white/20 hover:bg-white/[0.03]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold text-slate-400">{m.stage}</span>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-[#D4FF00] animate-ping" />
                    )}
                  </div>

                  <div className="text-lg font-black font-mono tracking-tight text-white mb-2">{m.year}</div>
                  <h4 className="text-xs font-semibold text-slate-300 font-mono mb-2">{m.headline}</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{m.detail}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/[0.06] flex flex-wrap gap-1">
                  {m.skillsAcquired.map((skill) => (
                    <span
                      key={skill}
                      className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/[0.04] text-slate-400"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Reflective Pull Quote */}
        <div
          ref={quoteRef}
          style={{ opacity: 0 }}
          className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-md max-w-2xl pointer-events-auto"
        >
          <p className="text-sm sm:text-base italic text-slate-300 leading-relaxed">
            &ldquo;When your knowledge is connected, learning is no longer an endless struggle against forgetting.
            It becomes compound interest on your own mind.&rdquo;
          </p>
          <div className="mt-3 flex items-center justify-between text-xs font-mono text-slate-500">
            <span>LIFEGRAPH REFLECTION OS</span>
            <span className="text-[#D4FF00]">05 CONTINUOUS STAGES</span>
          </div>
        </div>
      </div>
    </section>
  );
}
