"use client";

import React from "react";
import { cn } from "@/lib/utils/cn";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  glow?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", glow = false, children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium tracking-tight rounded-full transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:pointer-events-none select-none cursor-pointer";

    const variants = {
      primary:
        "bg-[#D4FF00] text-black hover:bg-[#E2FF38] font-semibold hover:shadow-[0_0_28px_rgba(212,255,0,0.38)]",
      secondary:
        "bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/10 hover:border-white/25 backdrop-blur-md",
      outline:
        "border border-white/20 text-white hover:border-[#D4FF00] hover:text-[#D4FF00] hover:bg-[#D4FF00]/5",
      ghost:
        "text-white/70 hover:text-white hover:bg-white/5",
    };

    const sizes = {
      sm: "text-xs px-4 py-2 gap-1.5",
      md: "text-sm px-6 py-3 gap-2",
      lg: "text-base px-8 py-3.5 gap-2.5 font-semibold",
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          glow && "shadow-[0_0_20px_rgba(212,255,0,0.3)]",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
