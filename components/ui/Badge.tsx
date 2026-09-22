import React from "react";
import { cn } from "@/lib/utils/cn";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "lime" | "cyan" | "emerald" | "subtle" | "outline";
  dot?: boolean;
}

export function Badge({
  className,
  variant = "lime",
  dot = true,
  children,
  ...props
}: BadgeProps) {
  const variants = {
    lime: "bg-[#D4FF00]/10 text-[#D4FF00] border-[#D4FF00]/30",
    cyan: "bg-[#00F0FF]/10 text-[#00F0FF] border-[#00F0FF]/30",
    emerald: "bg-[#10B981]/10 text-[#10B981] border-[#10B981]/30",
    subtle: "bg-white/5 text-white/70 border-white/10",
    outline: "bg-white/[0.03] text-slate-300 border-white/15",
  };

  const dotColors = {
    lime: "bg-[#D4FF00] shadow-[0_0_8px_#D4FF00]",
    cyan: "bg-[#00F0FF] shadow-[0_0_8px_#00F0FF]",
    emerald: "bg-[#10B981] shadow-[0_0_8px_#10B981]",
    subtle: "bg-white/60",
    outline: "bg-[#D4FF00]",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono tracking-wide uppercase border backdrop-blur-md",
        variants[variant],
        className
      )}
      {...props}
    >
      {dot && <span className={cn("w-1.5 h-1.5 rounded-full animate-pulse", dotColors[variant])} />}
      {children}
    </span>
  );
}
