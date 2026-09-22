import React from "react";
import { cn } from "@/lib/utils/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "lime";
  size?: "sm" | "md" | "lg" | "icon";
  children?: React.ReactNode;
}

export function Button({
  variant = "secondary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-mono uppercase tracking-[0.16em] text-xs transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:pointer-events-none select-none";

  const sizes = {
    sm: "px-3 py-1.5 text-[11px] rounded-md gap-1.5",
    md: "px-4 py-2 text-xs rounded-lg gap-2",
    lg: "px-6 py-3 text-xs rounded-full gap-2.5",
    icon: "p-2 rounded-lg"
  };

  const variants = {
    primary:
      "bg-white text-black font-semibold hover:bg-[#F5F5F7] shadow-[0_0_20px_rgba(255,255,255,0.15)]",
    lime:
      "bg-[#D4FF00] text-black font-bold hover:bg-[#E2FF38] shadow-[0_0_25px_rgba(212,255,0,0.25)]",
    secondary:
      "bg-white/[0.04] text-[#F5F5F7] border border-white/10 hover:bg-white/[0.08] hover:border-white/20",
    outline:
      "bg-transparent text-[#A1A1AA] border border-white/15 hover:text-white hover:border-white/35",
    ghost:
      "bg-transparent text-[#A1A1AA] hover:text-white hover:bg-white/[0.04]"
  };

  return (
    <button
      className={cn(base, sizes[size], variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}
