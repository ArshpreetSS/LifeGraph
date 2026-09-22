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
  User,
  Settings,
  ArrowUpRight
} from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  highlight?: boolean;
  badge?: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

export function Sidebar() {
  const pathname = usePathname();

  const navSections: NavSection[] = [
    {
      title: "Workspace",
      items: [
        { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        { label: "Explore", href: "/explore", icon: Network, highlight: true },
        { label: "Knowledge", href: "/knowledge", icon: Database }
      ]
    },
    {
      title: "Entities",
      items: [
        { label: "Projects", href: "/projects", icon: Layers },
        { label: "Skills", href: "/skills", icon: Sparkles },
        { label: "Goals", href: "/goals", icon: Target },
        { label: "Documents", href: "/documents", icon: FileText },
        { label: "Learning", href: "/learning", icon: GraduationCap }
      ]
    },
    {
      title: "Intelligence",
      items: [
        { label: "AI Insights", href: "/insights", icon: Lightbulb },
        { label: "Ask AI", href: "/ask", icon: MessageSquareCode, badge: "AI" },
        { label: "Activity", href: "/activity", icon: History }
      ]
    }
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 border-r border-white/[0.08] bg-[#07080A] h-screen sticky top-0 shrink-0 select-none z-30">
      {/* Brand Header */}
      <div className="p-6 pb-4 flex items-center justify-between border-b border-white/[0.06]">
        <Link href="/dashboard" className="flex items-center gap-2.5 group">
          <div className="w-6 h-6 rounded-md bg-[#D4FF00] flex items-center justify-center shadow-[0_0_15px_rgba(212,255,0,0.3)]">
            <span className="w-2 h-2 rounded-full bg-black" />
          </div>
          <span className="text-sm font-mono tracking-[0.25em] text-[#F5F5F7] uppercase group-hover:text-white transition-colors font-bold">
            LIFEGRAPH
          </span>
        </Link>
        <Link
          href="/"
          className="text-[#71717A] hover:text-[#D4FF00] transition-colors p-1"
          title="Return to cinematic experience"
        >
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 scrollbar-none">
        {navSections.map((section, sIdx) => (
          <div key={sIdx} className="space-y-1">
            <span className="px-3 text-[10px] font-mono tracking-[0.22em] uppercase text-[#71717A] font-medium block mb-2">
              {section.title}
            </span>
            {section.items.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group flex items-center justify-between px-3 py-2 rounded-lg text-xs font-mono tracking-wider uppercase transition-all duration-200 relative",
                    isActive
                      ? "bg-white/[0.08] text-white font-semibold shadow-inner"
                      : "text-[#A1A1AA] hover:text-white hover:bg-white/[0.03]"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={cn(
                        "w-4 h-4 transition-colors",
                        isActive
                          ? "text-[#D4FF00]"
                          : "text-[#71717A] group-hover:text-[#A1A1AA]"
                      )}
                    />
                    <span className="truncate">{item.label}</span>
                  </div>

                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4FF00] shadow-[0_0_8px_#D4FF00]" />
                  )}

                  {item.badge && !isActive && (
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-[#D4FF00]/10 text-[#D4FF00] border border-[#D4FF00]/20">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </div>

      {/* Footer / Identity */}
      <div className="p-3 border-t border-white/[0.08] space-y-1 bg-[#0A0D10]/50">
        <Link
          href="/profile"
          className={cn(
            "flex items-center justify-between px-3 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-colors",
            pathname === "/profile"
              ? "bg-white/[0.08] text-white"
              : "text-[#A1A1AA] hover:text-white hover:bg-white/[0.03]"
          )}
        >
          <div className="flex items-center gap-2.5">
            <div className="w-5 h-5 rounded-full bg-linear-to-tr from-cyan-500 to-[#D4FF00] flex items-center justify-center text-[10px] text-black font-bold">
              LG
            </div>
            <span className="truncate">Mindspace</span>
          </div>
          <User className="w-3.5 h-3.5 text-[#71717A]" />
        </Link>

        <Link
          href="/settings"
          className={cn(
            "flex items-center justify-between px-3 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-colors",
            pathname === "/settings"
              ? "bg-white/[0.08] text-white"
              : "text-[#A1A1AA] hover:text-white hover:bg-white/[0.03]"
          )}
        >
          <div className="flex items-center gap-2.5">
            <Settings className="w-4 h-4 text-[#71717A]" />
            <span>Settings</span>
          </div>
          <span className="text-[10px] text-[#71717A] font-mono">v0.9</span>
        </Link>
      </div>
    </aside>
  );
}
