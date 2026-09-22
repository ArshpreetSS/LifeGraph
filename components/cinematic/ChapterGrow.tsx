"use client";

import React from "react";

const WORDS = ["LEARN.", "BUILD.", "CONNECT.", "UNDERSTAND.", "GROW."];

export function ChapterGrow() {
  return (
    <section
      id="grow"
      className="relative min-h-[150vh] flex flex-col justify-between py-32 px-8 sm:px-16 overflow-hidden pointer-events-none select-none"
    >
      {/* Chapter Index */}
      <div className="flex items-center justify-between text-[11px] font-mono tracking-[0.25em] text-[#71717A] uppercase pointer-events-auto">
        <span>06 // EVOLUTION</span>
        <span>THE ARC OF TIME</span>
      </div>

      {/* Monumental Single-Word Rhythmic Stacking */}
      <div className="my-auto max-w-5xl pointer-events-auto space-y-1 sm:space-y-2">
        {WORDS.map((word, idx) => {
          const isHighlight = word === "GROW.";
          return (
            <div
              key={word}
              className={`text-6xl sm:text-8xl md:text-9xl font-black tracking-tighter leading-[0.88] uppercase transition-colors duration-500 ${
                isHighlight ? "text-[#F5F5F7]" : "text-white/30 hover:text-white/80"
              }`}
            >
              {word}
            </div>
          );
        })}

        <p className="pt-12 text-sm sm:text-base text-slate-400 font-normal leading-relaxed max-w-md">
          You are not an archive of files. You are an evolving network of decisions, skills, and ambitions.
          LifeGraph reveals the trajectory of your growth.
        </p>
      </div>

      <div className="text-[11px] font-mono tracking-[0.2em] text-[#71717A] uppercase pointer-events-auto">
        <span>06 / 06 — THE ARC COMPLETE</span>
      </div>
    </section>
  );
}
