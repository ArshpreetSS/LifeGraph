"use client";

import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils/cn";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  enableTilt?: boolean;
  glowOnHover?: boolean;
  highlightBorder?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      children,
      enableTilt = true,
      glowOnHover = true,
      highlightBorder = false,
      onMouseMove,
      onMouseLeave,
      ...props
    },
    forwardedRef
  ) => {
    const internalRef = useRef<HTMLDivElement>(null);
    const cardRef = (forwardedRef as React.RefObject<HTMLDivElement>) || internalRef;

    const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (enableTilt && cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -4;
        const rotateY = ((x - centerX) / centerX) * 4;

        setTilt({ rotateX, rotateY });
      }
      onMouseMove?.(e);
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
      setIsHovered(false);
      setTilt({ rotateX: 0, rotateY: 0 });
      onMouseLeave?.(e);
    };

    return (
      <div
        ref={cardRef}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: enableTilt
            ? `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(${
                isHovered ? 1.015 : 1
              })`
            : undefined,
          transition: isHovered
            ? "transform 0.12s ease-out, border-color 0.3s ease, box-shadow 0.3s ease"
            : "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease, box-shadow 0.3s ease",
        }}
        className={cn(
          "relative rounded-2xl bg-[#0C0F12]/85 backdrop-blur-xl border border-white/[0.08] p-6 transition-all duration-300",
          glowOnHover &&
            isHovered &&
            "border-[#D4FF00]/40 shadow-[0_0_30px_rgba(212,255,0,0.08)]",
          highlightBorder && "border-[#D4FF00]/60 shadow-[0_0_35px_rgba(212,255,0,0.12)]",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";
