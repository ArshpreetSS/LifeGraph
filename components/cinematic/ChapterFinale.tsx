"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

export function ChapterFinale() {
  return (
    <section
      id="finale"
      className="relative min-h-screen flex flex-col justify-between pt-32 pb-16 px-8 sm:px-16 overflow-hidden pointer-events-none select-none text-center sm:text-left"
    >
      {/* Top Quiet Index */}
      <div className="flex items-center justify-between text-[11px] font-mono tracking-[0.25em] text-[#71717A] uppercase pointer-events-auto">
        <span>EPILOGUE</span>
        <span>THE MAP IS LIVING</span>
      </div>

      {/* Monumental Center Typography & Quiet Action */}
      <div className="my-auto max-w-5xl mx-auto w-full pointer-events-auto flex flex-col items-center text-center">
        <h2 className="text-6xl sm:text-8xl md:text-9xl font-black tracking-tighter text-[#F5F5F7] leading-[0.9] uppercase">
          See What <br />
          You Know. <br />
          <span className="font-light italic text-[#A1A1AA]">
            Discover What&apos;s Connected.
          </span>
        </h2>

        {/* Understated Minimal CTA */}
        <div className="mt-14 flex items-center justify-center">
          <a
            href="#hero"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/15 bg-white/[0.03] text-sm font-mono tracking-[0.2em] uppercase text-[#F5F5F7] hover:border-white/40 hover:bg-white/[0.08] transition-all duration-300"
          >
            <span>Explore LifeGraph</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-[#D4FF00]" />
          </a>
        </div>
      </div>

      {/* Quietest Single-Line Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-12 border-t border-white/[0.06] text-[11px] font-mono tracking-[0.2em] text-[#71717A] uppercase pointer-events-auto">
        <div>LIFEGRAPH — AN INTERACTIVE DIGITAL EXPERIENCE ABOUT HUMAN KNOWLEDGE.</div>
        <div>© {new Date().getFullYear()} ALL RIGHTS RESERVED.</div>
      </div>
    </section>
  );
}
