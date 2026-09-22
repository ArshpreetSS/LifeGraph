"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Menu, X, Sparkles, Box, ArrowRight } from "lucide-react";

interface NavbarProps {
  onOpenGraphStudio: () => void;
}

export function Navbar({ onOpenGraphStudio }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        const p = window.scrollY / maxScroll;
        setScrollProgress(p * 100);

        if (p < 0.15) setActiveSection("hero");
        else if (p < 0.32) setActiveSection("problem");
        else if (p < 0.48) setActiveSection("knowledge");
        else if (p < 0.65) setActiveSection("how-it-works");
        else if (p < 0.82) setActiveSection("explore");
        else if (p < 0.93) setActiveSection("about");
        else setActiveSection("cta");
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "explore-knowledge", section: "explore", label: "Explore" },
    { id: "ai-understanding", section: "how-it-works", label: "How it Works" },
    { id: "connections", section: "knowledge", label: "Knowledge" },
    { id: "personal-growth", section: "about", label: "About" },
  ];

  return (
    <>
      {/* Top Laser Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-[2px] z-50 bg-white/[0.04] pointer-events-none">
        <div
          className="h-full transition-all duration-75 ease-out"
          style={{
            width: `${scrollProgress}%`,
            background: "linear-gradient(to right, #D4FF00, #00F0FF, #D4FF00)",
            boxShadow: "0 0 10px rgba(212,255,0,0.6), 0 0 20px rgba(212,255,0,0.3)",
          }}
        />
      </div>

      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-[#070809]/88 backdrop-blur-xl border-b border-white/[0.07] py-3.5 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-12 flex items-center justify-between">
          {/* Brand Mark */}
          <a href="#hero" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-[#0D1117] border border-[#D4FF00]/40 flex items-center justify-center text-[#D4FF00] shadow-[0_0_14px_rgba(212,255,0,0.18)] group-hover:scale-105 group-hover:shadow-[0_0_22px_rgba(212,255,0,0.4)] transition-all duration-300">
              <Box className="w-4 h-4 transition-transform duration-500 group-hover:rotate-12" />
            </div>
            <span className="font-black tracking-tight text-base text-white uppercase">
              LIFE<span className="text-[#D4FF00]">GRAPH</span>
            </span>
          </a>

          {/* Minimal Editorial Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-mono tracking-wider uppercase">
            {navItems.map((item) => {
              const isActive = activeSection === item.section;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`nav-link-animated transition-colors duration-200 ${
                    isActive ? "text-[#D4FF00] active" : "text-white/55 hover:text-white"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="secondary"
              size="sm"
              onClick={onOpenGraphStudio}
              className="font-mono text-xs border-white/10 hover:border-[#D4FF00]/50 hover:text-[#D4FF00] transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D4FF00]" />
              Studio 3D
            </Button>

            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                const el = document.getElementById("final-cta");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-xs font-semibold"
            >
              Launch Graph
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white/80 hover:text-white transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Flyout */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#070809]/97 backdrop-blur-2xl border-b border-white/10 px-6 py-6 space-y-4 animate-in slide-in-from-top-4 duration-200">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-mono uppercase tracking-wider text-white/80 hover:text-[#D4FF00] transition-colors"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-4 border-t border-white/10 flex flex-col gap-2.5">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => { setMobileMenuOpen(false); onOpenGraphStudio(); }}
                className="w-full justify-center font-mono text-xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#D4FF00]" />
                Studio 3D
              </Button>
              <Button
                variant="primary"
                size="sm"
                className="w-full justify-center"
                onClick={() => {
                  setMobileMenuOpen(false);
                  const el = document.getElementById("final-cta");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Launch Graph
              </Button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
