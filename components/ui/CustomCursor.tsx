"use client";

import React, { useEffect, useState } from "react";

export type CursorMode = "default" | "pointer" | "intelligence" | "explore" | "drag";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [cursorMode, setCursorMode] = useState<CursorMode>("default");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Disable on mobile/touch devices
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return;

    let targetX = -100;
    let targetY = -100;
    let trailX = -100;
    let trailY = -100;
    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setPosition({ x: targetX, y: targetY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) {
        setCursorMode("default");
        return;
      }

      const cursorType = target.closest("[data-cursor]")?.getAttribute("data-cursor") as CursorMode;
      if (cursorType) {
        setCursorMode(cursorType);
      } else if (target.closest("button") || target.closest("a") || target.closest(".interactive-btn")) {
        setCursorMode("pointer");
      } else if (target.closest(".graph-node-card") || target.closest(".explore-target")) {
        setCursorMode("explore");
      } else {
        setCursorMode("default");
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const loop = () => {
      trailX += (targetX - trailX) * 0.2;
      trailY += (targetY - trailY) * 0.2;
      setTrailingPos({ x: trailX, y: trailY });
      animId = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    animId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  const isSpecial = cursorMode === "intelligence" || cursorMode === "explore";
  const isPointer = cursorMode === "pointer";

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden hidden md:block select-none">
      {/* Central crisp focal point */}
      <div
        className={`fixed rounded-full -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ${
          cursorMode === "intelligence"
            ? "w-2.5 h-2.5 bg-[#00F0FF] shadow-[0_0_12px_#00F0FF]"
            : cursorMode === "explore"
            ? "w-2.5 h-2.5 bg-[#D4FF00] shadow-[0_0_12px_#D4FF00]"
            : "w-2 h-2 bg-[#D4FF00] shadow-[0_0_8px_#D4FF00]"
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${isSpecial ? 1.4 : isPointer ? 1.3 : 1})`,
        }}
      />

      {/* Trailing Aura Ring with dynamic label badge */}
      <div
        className={`fixed rounded-full -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ease-out flex items-center justify-center ${
          cursorMode === "intelligence"
            ? "w-20 h-20 bg-[#00F0FF]/[0.08] border border-[#00F0FF]/60 shadow-[0_0_24px_rgba(0,240,255,0.25)]"
            : cursorMode === "explore"
            ? "w-20 h-20 bg-[#D4FF00]/[0.08] border border-[#D4FF00]/70 shadow-[0_0_24px_rgba(212,255,0,0.25)]"
            : isPointer
            ? "w-12 h-12 bg-[#D4FF00]/[0.06] border border-[#D4FF00]/60 shadow-[0_0_16px_rgba(212,255,0,0.2)]"
            : "w-8 h-8 bg-transparent border border-white/20"
        }`}
        style={{
          left: `${trailingPos.x}px`,
          top: `${trailingPos.y}px`,
        }}
      >
        {cursorMode === "intelligence" && (
          <span className="text-[9px] font-mono tracking-wider text-[#00F0FF] uppercase mt-12 bg-black/80 px-2 py-0.5 rounded border border-[#00F0FF]/30">
            AWARENESS
          </span>
        )}
        {cursorMode === "explore" && (
          <span className="text-[9px] font-mono tracking-wider text-[#D4FF00] uppercase mt-12 bg-black/80 px-2 py-0.5 rounded border border-[#D4FF00]/30">
            EXPLORE
          </span>
        )}
      </div>
    </div>
  );
}
