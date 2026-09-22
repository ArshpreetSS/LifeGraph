"use client";

import React from "react";

export function ChapterUnderstanding() {
  return (
    <section
      id="understanding"
      className="relative min-h-[140vh] flex flex-col justify-between py-32 px-8 sm:px-16 overflow-hidden pointer-events-none select-none"
    >
      {/* Chapter Index */}
      <div className="flex items-center justify-between text-[11px] font-mono tracking-[0.25em] text-[#71717A] uppercase pointer-events-auto">
        <span>04 // COGNITION</span>
        <span>SILENT SYNTHESIS</span>
      </div>

      {/* Intimate Editorial Focus */}
      <div className="my-auto max-w-2xl pointer-events-auto">
        <div className="text-xs font-mono tracking-[0.3em] uppercase text-[#D4FF00] mb-6">
          — INTELLIGENCE IN SILENCE
        </div>

        <h2 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter text-[#F5F5F7] leading-[0.9] uppercase">
          Something Just <br />
          <span className="font-light italic text-[#71717A]">
            Understood This.
          </span>
        </h2>

        <p className="mt-8 text-base sm:text-lg text-slate-400 font-normal leading-relaxed max-w-md">
          A document enters the space. It is parsed not as static text, but as living relationships.
          A node illuminates; a new pathway is formed. The system perceives the pattern without being prompted.
        </p>

        <div className="mt-12 text-xs font-mono tracking-[0.25em] text-[#A1A1AA] uppercase flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4FF00]" />
          <span>AUTONOMOUS CONTEXT RECOGNITION</span>
        </div>
      </div>

      <div className="text-[11px] font-mono tracking-[0.2em] text-[#71717A] uppercase pointer-events-auto">
        <span>04 / 06 — CONTINUOUS AWARENESS</span>
      </div>
    </section>
  );
}
