"use client";

import React from "react";

const FRAGMENTS = [
  { text: "PROJECTS", pos: "top-12 left-[10%] -rotate-6", opacity: "text-white/60" },
  { text: "SKILLS", pos: "top-32 right-[25%] rotate-3", opacity: "text-white/40" },
  { text: "NOTES", pos: "top-1/2 left-[5%] rotate-12", opacity: "text-white/50" },
  { text: "DOCUMENTS", pos: "bottom-40 right-[15%] -rotate-3", opacity: "text-white/40" },
  { text: "GOALS", pos: "bottom-24 left-[20%] rotate-6", opacity: "text-white/70" },
  { text: "LEARNING", pos: "top-20 right-[8%] -rotate-12", opacity: "text-white/30" },
];

export function ChapterProblem() {
  return (
    <section
      id="problem"
      className="relative min-h-[140vh] flex flex-col justify-between py-32 px-8 sm:px-16 overflow-hidden pointer-events-none select-none"
    >
      {/* Chapter Index */}
      <div className="flex items-center justify-between text-[11px] font-mono tracking-[0.25em] text-[#71717A] uppercase pointer-events-auto">
        <span>02 // THE PROBLEM</span>
        <span>DISPERSED ENTROPY</span>
      </div>

      {/* Floating Typographic Fragments in Physical Space (Zero UI Cards) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {FRAGMENTS.map((item, idx) => (
          <span
            key={idx}
            className={`absolute font-mono tracking-[0.35em] text-xs sm:text-sm uppercase transition-all duration-1000 ease-out ${item.pos} ${item.opacity}`}
          >
            {item.text}
          </span>
        ))}
      </div>

      {/* Monumental Editorial Copy with vast negative space */}
      <div className="my-auto max-w-2xl pointer-events-auto relative z-10">
        <h2 className="text-6xl sm:text-8xl font-black tracking-tighter text-[#F5F5F7] leading-[0.9] uppercase">
          Fragments <br />
          <span className="font-light italic text-[#71717A]">
            Without a Center.
          </span>
        </h2>

        <p className="mt-10 text-base sm:text-lg text-slate-400 font-normal leading-relaxed max-w-lg">
          Every day you research, build, write, and think. Yet your mind is splintered across disconnected tools.
          Files can store information. But they cannot understand how your thoughts connect to your ambitions.
        </p>
      </div>

      <div className="text-[11px] font-mono tracking-[0.2em] text-[#71717A] uppercase pointer-events-auto">
        <span>02 / 06 — DRIFTING ELEMENTS</span>
      </div>
    </section>
  );
}
