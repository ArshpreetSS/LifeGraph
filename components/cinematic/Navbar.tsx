"use client";

import React, { useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";

export function CinematicNavbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 px-8 sm:px-16 py-6 transition-all duration-700 flex items-center justify-between text-xs font-mono tracking-widest ${
        scrolled ? "bg-[#070708]/60 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      {/* Quiet Brand Mark */}
      <a
        href="#hero"
        className="text-[#F5F5F7] tracking-[0.25em] uppercase hover:text-white transition-colors"
      >
        LIFEGRAPH
      </a>

      {/* Understated Editorial Navigation */}
      <nav className="hidden md:flex items-center gap-12 text-[#A1A1AA] tracking-[0.2em] uppercase text-[11px]">
        <a href="#problem" className="hover:text-white transition-colors">
          Explore
        </a>
        <a href="#understanding" className="hover:text-white transition-colors">
          How it works
        </a>
        <a href="#connection" className="hover:text-white transition-colors">
          Knowledge
        </a>
      </nav>

      {/* Understated Quiet Action */}
      <a
        href="/dashboard"
        className="group text-[#A1A1AA] hover:text-[#F5F5F7] transition-colors flex items-center gap-1.5 uppercase text-[11px] tracking-[0.18em]"
      >
        <span>Launch Graph</span>
        <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#A1A1AA] group-hover:text-[#D4FF00]" />
      </a>
    </header>
  );
}
