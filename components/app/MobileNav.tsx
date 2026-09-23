"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Network,
  Database,
  Layers,
  Sparkles,
  Target,
  FileText,
  GraduationCap,
  Lightbulb,
  MessageSquareCode,
  History,
  X,
  User,
  Settings
} from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const pathname = usePathname();

  const links = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Explore Graph", href: "/explore", icon: Network },
    { label: "Knowledge", href: "/knowledge", icon: Database },
    { label: "Projects", href: "/projects", icon: Layers },
    { label: "Skills", href: "/skills", icon: Sparkles },
    { label: "Goals", href: "/goals", icon: Target },
    { label: "Documents", href: "/documents", icon: FileText },
    { label: "Learning", href: "/learning", icon: GraduationCap },
    { label: "AI Insights", href: "/insights", icon: Lightbulb },
    { label: "Ask AI", href: "/ask", icon: MessageSquareCode },
    { label: "Activity", href: "/activity", icon: History },
    { label: "Profile", href: "/profile", icon: User },
    { label: "Settings", href: "/settings", icon: Settings }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden pointer-events-auto">
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />
      <div className="fixed inset-y-0 left-0 w-72 max-w-[85vw] bg-[#0A0D10] border-r border-white/10 p-6 pb-[calc(env(safe-area-inset-bottom,0px)+1.5rem)] flex flex-col justify-between overflow-y-auto animate-in slide-in-from-left duration-200">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono tracking-[0.25em] text-white uppercase font-bold">
              LIFEGRAPH
            </span>
            <button
              onClick={onClose}
              className="p-1 rounded-md text-[#71717A] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="space-y-1">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href || (link.href !== "/dashboard" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-colors",
                    isActive
                      ? "bg-white/[0.08] text-white font-semibold"
                      : "text-[#A1A1AA] hover:text-white hover:bg-white/[0.03]"
                  )}
                >
                  <Icon
                    className={cn(
                      "w-4 h-4",
                      isActive ? "text-[#D4FF00]" : "text-[#71717A]"
                    )}
                  />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pt-6 border-t border-white/[0.08] text-[10px] font-mono text-[#71717A] uppercase">
          LifeGraph Personal OS
        </div>
      </div>
    </div>
  );
}
