"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Badge } from "@/components/ui/Badge";
import { Cpu, ArrowRight, Zap, FileText, Binary, Network, Sparkles, LucideIcon } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface PipelineStep {
  id: string;
  step: string;
  title: string;
  description: string;
  badge: string;
  icon: LucideIcon;
  accent: string;
  accentColor: string;
}

const STEPS: PipelineStep[] = [
  {
    id: "step-1",
    step: "01",
    title: "DOCUMENT",
    description: "Raw notes, GitHub commits, PDF whitepapers, and unstructured thoughts enter the sensory ingest layer.",
    badge: "INGESTION",
    icon: FileText,
    accent: "text-slate-300 border-slate-500/30",
    accentColor: "#94a3b8",
  },
  {
    id: "step-2",
    step: "02",
    title: "EXTRACT",
    description: "Deep semantic entity parsing isolates competencies, tools, dependencies, and implied concepts.",
    badge: "PARSING",
    icon: Binary,
    accent: "text-[#00F0FF] border-[#00F0FF]/30",
    accentColor: "#00F0FF",
  },
  {
    id: "step-3",
    step: "03",
    title: "KNOWLEDGE",
    description: "Extracted entities crystallize into persistent, multidimensional 3D graph nodes.",
    badge: "CRYSTALLIZE",
    icon: Cpu,
    accent: "text-[#10B981] border-[#10B981]/30",
    accentColor: "#10B981",
  },
  {
    id: "step-4",
    step: "04",
    title: "CONNECT",
    description: "Synaptic weights bind project dependencies to active learning pathways and high-level aspirations.",
    badge: "SYNAPSE",
    icon: Network,
    accent: "text-[#D4FF00] border-[#D4FF00]/40",
    accentColor: "#D4FF00",
  },
  {
    id: "step-5",
    step: "05",
    title: "INSIGHT",
    description: "Proactive synthesis: LifeGraph uncovers blind spots, compound growth vectors, and unexpected breakthroughs.",
    badge: "COGNITION",
    icon: Sparkles,
    accent: "text-[#FBBF24] border-[#FBBF24]/40",
    accentColor: "#FBBF24",
  },
];

export function AIUnderstanding() {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const pipelineBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % STEPS.length);
    }, 3600);
    return () => clearInterval(timer);
  }, []);

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
          cardsRef.current.filter(Boolean),
          { opacity: 0, y: 32, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.1, ease: "back.out(1.3)" },
          0.5
        )
        .fromTo(pipelineBarRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 }, 1.1);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="ai-understanding"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center py-28 px-6 sm:px-12 lg:px-20 overflow-hidden pointer-events-none"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Chapter Header */}
        <div className="flex items-center justify-between pointer-events-auto mb-6">
          <Badge variant="lime" dot>
            CHAPTER 04 // THE COGNITIVE PIPELINE • AI UNDERSTANDING
          </Badge>
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-500">
            <Zap className="w-3.5 h-3.5 text-[#D4FF00]" />
            <span>PIPELINE VELOCITY // 1.2M SYNAPSES/SEC</span>
          </div>
        </div>

        {/* Editorial Heading */}
        <div className="max-w-3xl pointer-events-auto mb-14">
          <h2
            className="font-black tracking-tight leading-[0.96] text-white"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}
          >
            <span className="block overflow-hidden">
              <span ref={line1Ref} style={{ display: "block", opacity: 0 }}>
                From raw fragments
              </span>
            </span>
            <span className="block overflow-hidden">
              <span
                ref={line2Ref}
                style={{ display: "block", opacity: 0 }}
                className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#D4FF00] to-[#00F0FF]"
              >
                to continuous understanding.
              </span>
            </span>
          </h2>
          <p
            ref={subtextRef}
            style={{ opacity: 0 }}
            className="mt-6 text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-xl"
          >
            This is not a generic chatbot. The AI is an ambient cognitive layer — observing,
            synthesizing, and lighting up connections across your entire life work.
          </p>
        </div>

        {/* 5-Step Visual Pipeline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pointer-events-auto">
          {STEPS.map((s, idx) => {
            const Icon = s.icon;
            const isCurrent = activeStep === idx;
            return (
              <div
                key={s.id}
                ref={(el) => { cardsRef.current[idx] = el; }}
                style={{ opacity: 0 }}
                onClick={() => setActiveStep(idx)}
                className={`p-5 rounded-2xl transition-all duration-400 cursor-pointer flex flex-col justify-between min-h-[220px] backdrop-blur-xl border ${
                  isCurrent
                    ? "bg-[#090C10]/90 border-[#D4FF00] shadow-[0_0_30px_rgba(212,255,0,0.18)] scale-[1.03]"
                    : "bg-[#090C10]/60 border-white/[0.08] hover:border-white/20 hover:bg-white/[0.04]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-slate-400">{s.step}</span>
                    <span className={`text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full border ${s.accent}`}>
                      {s.badge}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <Icon className={`w-4 h-4 ${isCurrent ? "text-[#D4FF00]" : "text-slate-400"}`} />
                    <h3 className={`text-base font-bold font-mono ${isCurrent ? "text-white" : "text-slate-200"}`}>
                      {s.title}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed font-normal">{s.description}</p>
                </div>

                {isCurrent && (
                  <div className="mt-4 pt-2 border-t border-[#D4FF00]/20 flex items-center justify-between text-[10px] font-mono text-[#D4FF00]">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4FF00] animate-ping" />
                      SYNTHESIZING
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Narrative Pipeline Arrow */}
        <div
          ref={pipelineBarRef}
          style={{ opacity: 0 }}
          className="mt-10 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-400 pointer-events-auto"
        >
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[#D4FF00] font-bold">SEQUENCE:</span>
            {["DOCUMENT", "EXTRACT", "KNOWLEDGE", "CONNECT", "INSIGHT"].map((label, i, arr) => (
              <React.Fragment key={label}>
                <span style={{ color: STEPS[i].accentColor }}>{label}</span>
                {i < arr.length - 1 && <span className="text-slate-600">→</span>}
              </React.Fragment>
            ))}
          </div>
          <div className="text-[11px] text-slate-500">
            NEURAL PULSES VISIBLE IN 3D STAGE
          </div>
        </div>
      </div>
    </section>
  );
}
