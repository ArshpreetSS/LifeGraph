"use client";

import React from "react";

export function ChapterConnection() {
  return (
    <section
      id="connection"
      className="relative min-h-[140vh] flex flex-col justify-between py-32 px-8 sm:px-16 overflow-hidden pointer-events-none select-none"
    >
      {/* Chapter Index */}
      <div className="flex items-center justify-between text-[11px] font-mono tracking-[0.25em] text-[#71717A] uppercase pointer-events-auto">
        <span>03 // SYNAPSE</span>
        <span>THE LIVING CONSTELLATION</span>
      </div>

      {/* Monumental Editorial Statement */}
      <div className="my-auto max-w-3xl pointer-events-auto">
        <h2 className="text-6xl sm:text-8xl md:text-9xl font-black tracking-tighter text-[#F5F5F7] leading-[0.88] uppercase">
          Relationships <br />
          <span className="font-light italic text-[#A1A1AA]">
            Reveal Meaning.
          </span>
        </h2>

        <p className="mt-10 text-base sm:text-lg text-slate-400 font-normal leading-relaxed max-w-md">
          LifeGraph builds an organic constellation around your digital presence.
          Ideas are no longer isolated points—they are tied to the projects they enable and the goals they support.
        </p>

        {/* Minimal Typographic Thread Flow */}
        <div className="mt-12 flex flex-wrap items-center gap-4 text-xs font-mono tracking-[0.2em] text-[#A1A1AA] uppercase">
          <span className="text-white">PROJECT</span>
          <span className="text-[#71717A]">──►</span>
          <span className="text-white">SKILL</span>
          <span className="text-[#71717A]">──►</span>
          <span className="text-[#D4FF00]">GOAL</span>
        </div>
      </div>

      <div className="text-[11px] font-mono tracking-[0.2em] text-[#71717A] uppercase pointer-events-auto">
        <span>03 / 06 — LIVING TOPOLOGY</span>
      </div>
    </section>
  );
}
