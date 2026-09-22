"use client";

import React from "react";

export function ChapterHero() {
  return (
    <section
      id="hero"
      className="relative h-screen min-h-screen flex flex-col justify-between pt-28 pb-10 px-8 sm:px-16 overflow-hidden pointer-events-none select-none"
    >
      {/* Subtle top indicator */}
      <div className="flex items-center justify-between text-[11px] font-mono tracking-[0.25em] text-[#71717A] uppercase pointer-events-auto">
        <span>01 // PROLOGUE</span>
        <span>THE SHAPE OF THOUGHT</span>
      </div>

      {/* Monumental Editorial Typography Composition with Clean Left Staging */}
      <div className="my-auto max-w-4xl pointer-events-auto relative z-10">
        <h1 className="text-6xl sm:text-7xl md:text-8xl xl:text-[7.5vw] font-black tracking-tighter leading-[0.86] text-[#F5F5F7] uppercase">
          Your <br />
          Knowledge <br />
          <span className="font-light italic text-[#A1A1AA]">
            Has a Shape.
          </span>
        </h1>
      </div>

      {/* Bottom Quiet Narrative Footnote & Scroll Cue */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pt-4 text-xs font-mono text-[#71717A] pointer-events-auto">
        <p className="max-w-xs text-slate-400 font-normal leading-relaxed text-[13px]">
          Instead of disconnected files and notes, LifeGraph understands the living relationships behind everything you know.
        </p>

        <div className="flex items-center gap-2 text-[11px] tracking-[0.2em] text-[#A1A1AA] uppercase">
          <span>Scroll to explore</span>
          <span className="animate-bounce">↓</span>
        </div>
      </div>
    </section>
  );
}
