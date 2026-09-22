import React from "react";
import { cn } from "@/lib/utils/cn";
import { EntityType } from "@/lib/mockData";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "lime" | "outline" | "muted" | "entity";
  entityType?: EntityType;
  children: React.ReactNode;
}

export function Badge({
  variant = "default",
  entityType,
  className,
  children,
  ...props
}: BadgeProps) {
  if (entityType) {
    const entityStyles: Record<EntityType, string> = {
      PROJECT: "bg-[#D4FF00]/10 text-[#D4FF00] border-[#D4FF00]/25",
      SKILL: "bg-cyan-500/10 text-cyan-300 border-cyan-500/25",
      GOAL: "bg-amber-500/10 text-amber-300 border-amber-500/25",
      DOCUMENT: "bg-purple-500/10 text-purple-300 border-purple-500/25",
      LEARNING: "bg-emerald-500/10 text-emerald-300 border-emerald-500/25",
      EXPERIENCE: "bg-rose-500/10 text-rose-300 border-rose-500/25"
    };

    return (
      <span
        className={cn(
          "inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono tracking-wider uppercase border font-medium",
          entityStyles[entityType],
          className
        )}
        {...props}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
        {children}
      </span>
    );
  }

  const variants: Record<string, string> = {
    default: "bg-white/[0.05] text-[#E4E4E7] border-white/10",
    lime: "bg-[#D4FF00]/10 text-[#D4FF00] border-[#D4FF00]/30",
    outline: "bg-transparent text-[#A1A1AA] border-white/15",
    muted: "bg-white/[0.03] text-[#71717A] border-transparent",
    entity: "bg-white/[0.05] text-[#E4E4E7] border-white/10"
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono tracking-wider uppercase border",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
