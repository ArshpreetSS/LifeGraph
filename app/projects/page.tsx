"use client";

import React from "react";
import Link from "next/link";
import { AppShell, useAppShell } from "@/components/app/AppShell";
import { MOCK_PROJECTS } from "@/lib/mockData";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Layers,
  ArrowRight,
  Sparkles,
  Network,
  Clock,
  ExternalLink,
  Target
} from "lucide-react";

export default function ProjectsPage() {
  const { openDrawer } = useAppShell();

  return (
    <AppShell>
      <div className="p-6 sm:p-10 space-y-8 max-w-7xl mx-auto w-full">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[11px] font-mono tracking-[0.25em] text-[#71717A] uppercase">
              <span>ACTIVE VENTURES</span>
              <span>•</span>
              <span className="text-[#D4FF00]">PROJECT PORTFOLIO</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase">
              Projects
            </h1>
            <p className="text-sm sm:text-base text-slate-400 font-light max-w-2xl">
              Production systems, experimental architectures, and spatial prototypes connected into your knowledge topology.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[#71717A] uppercase tracking-wider">
              {MOCK_PROJECTS.length} Systems Active
            </span>
          </div>
        </div>

        {/* Projects Grid or Empty State */}
        {MOCK_PROJECTS.length === 0 ? (
          <div className="p-12 sm:p-16 rounded-3xl border border-dashed border-white/10 bg-[#0A0D11]/60 text-center space-y-4 max-w-xl mx-auto my-12">
            <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center mx-auto text-[#D4FF00]">
              <Layers className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-white tracking-tight">
                No active projects yet.
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed">
                Your projects will appear here once you add them. Each project will map its skills, documents, and connected goals into your knowledge topology.
              </p>
            </div>
            <div className="pt-2">
              <Button
                variant="lime"
                size="sm"
                onClick={() => openDrawer("new-project")}
              >
                <span>Add First Project</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MOCK_PROJECTS.map((proj) => (
              <div
                key={proj.id}
                className="p-6 sm:p-7 rounded-2xl border border-white/[0.08] bg-[#0A0D11] hover:border-white/20 transition-all flex flex-col justify-between space-y-6 group shadow-xl relative overflow-hidden"
              >
                {/* Subtle top indicator bar */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-white/[0.04] text-[#A1A1AA] border border-white/10">
                        {proj.category}
                      </span>
                      <span
                        className={`px-2.5 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider border ${
                          proj.status === "Active"
                            ? "bg-[#D4FF00]/10 text-[#D4FF00] border-[#D4FF00]/30"
                            : proj.status === "Completed"
                            ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                            : "bg-cyan-500/10 text-cyan-300 border-cyan-500/30"
                        }`}
                      >
                        {proj.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-mono text-[#D4FF00]">
                      <Network className="w-3.5 h-3.5" />
                      <span>{proj.connectionsCount} links</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold tracking-tight text-white group-hover:text-[#D4FF00] transition-colors">
                      {proj.name}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                      {proj.description}
                    </p>
                  </div>
                </div>

                {/* Connected Skills & Goals */}
                <div className="space-y-4 pt-4 border-t border-white/[0.06]">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#71717A] block">
                      Skills Leveraged
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {proj.skills.map((s, idx) => (
                        <button
                          key={idx}
                          onClick={(e) => {
                            e.stopPropagation();
                            openDrawer(s.toLowerCase().replace(/[^a-z0-9]/g, "-"));
                          }}
                          className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-slate-300 hover:text-white hover:border-[#D4FF00]/40 transition-colors"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#71717A] block">
                      Target Goals
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {proj.goals.map((g, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1.5 text-xs text-amber-300/80 font-mono"
                        >
                          <Target className="w-3 h-3 text-amber-400" />
                          <span className="truncate max-w-[240px]">{g}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer Controls */}
                  <div className="flex items-center justify-between pt-3 border-t border-white/[0.06] text-xs font-mono">
                    <div className="flex items-center gap-1.5 text-[#71717A]">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Updated {proj.lastUpdated}</span>
                    </div>

                    <Link href={`/projects/${proj.id}`}>
                      <Button variant="outline" size="sm" className="text-xs group-hover:border-white/30">
                        <span>Project Details</span>
                        <ArrowRight className="w-3 h-3 text-[#D4FF00] group-hover:translate-x-0.5 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </AppShell>
  );
}
