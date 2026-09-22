"use client";

import React from "react";

export function ChapterExplore() {
  const steps = [
    { label: "01 / PYTHON", desc: "Scientific computing, async runtimes, foundations." },
    { label: "02 / MACHINE LEARNING", desc: "Embeddings, attention spaces, neural weights." },
    { label: "03 / AI PROJECT", desc: "Autonomous cognitive architecture and execution." },
    { label: "04 / MASTERY", desc: "The realization of long-term personal ambition." },
  ];

  return (
    <section
      id="explore"
      className="relative min-h-[140vh] flex flex-col justify-between py-32 px-8 sm:px-16 overflow-hidden pointer-events-none select-none"
    >
      {/* Chapter Index */}
      <div className="flex items-center justify-between text-[11px] font-mono tracking-[0.25em] text-[#71717A] uppercase pointer-events-auto">
        <span>05 // CARTOGRAPHY</span>
        <span>A SPATIAL JOURNEY</span>
      </div>

      {/* Monumental Editorial Heading */}
      <div className="my-auto max-w-4xl pointer-events-auto">
        <h2 className="text-6xl sm:text-8xl font-black tracking-tighter text-[#F5F5F7] leading-[0.9] uppercase mb-16">
          A Journey <br />
          <span className="font-light italic text-[#A1A1AA]">
            Through Depth.
          </span>
        </h2>

        {/* Cinematic Step Trajectory (Zero Dashboard Widgets) */}
        <div className="space-y-8 max-w-lg border-l border-white/10 pl-6 sm:pl-8">
          {steps.map((s, idx) => (
            <div key={idx} className="group">
              <div className="text-xs font-mono tracking-[0.2em] text-[#D4FF00] uppercase mb-1">
                {s.label}
              </div>
              <p className="text-sm text-slate-400 font-normal leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="text-[11px] font-mono tracking-[0.2em] text-[#71717A] uppercase pointer-events-auto">
        <span>05 / 06 — CONTINUOUS DEPTH</span>
      </div>
    </section>
  );
}
