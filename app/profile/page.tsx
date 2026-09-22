"use client";

import React from "react";
import Link from "next/link";
import { AppShell, useAppShell } from "@/components/app/AppShell";
import { KnowledgeGraph } from "@/components/knowledge/KnowledgeGraph";
import {
  MOCK_PROJECTS,
  MOCK_SKILLS,
  MOCK_GOALS,
  MOCK_LEARNING
} from "@/lib/mockData";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  User,
  Sparkles,
  Network,
  Layers,
  Target,
  GraduationCap,
  ArrowRight,
  ArrowUpRight,
  Terminal,
  MapPin,
  Calendar
} from "lucide-react";

export default function ProfilePage() {
  const { openDrawer } = useAppShell();

  const totalNodes = MOCK_PROJECTS.length + MOCK_SKILLS.length + MOCK_GOALS.length;

  return (
    <AppShell>
      <div className="p-6 sm:p-10 space-y-10 max-w-7xl mx-auto w-full">
        
        {/* Personal Identity Header Banner */}
        <div className="p-8 sm:p-10 rounded-3xl border border-white/[0.08] bg-[#0A0D11] space-y-6 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-2xl bg-linear-to-tr from-cyan-500 via-[#D4FF00] to-emerald-400 p-0.5 shadow-[0_0_30px_rgba(212,255,0,0.2)]">
                <div className="w-full h-full rounded-2xl bg-[#070809] flex items-center justify-center font-mono text-2xl font-black text-[#D4FF00]">
                  LG
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white uppercase">
                    Personal Mindspace
                  </h1>
                  <span className="w-2 h-2 rounded-full bg-[#D4FF00] shadow-[0_0_8px_#D4FF00]" />
                </div>
                <p className="text-sm font-mono text-[#A1A1AA]">
                  Autonomous Knowledge System • Graph Node Architecture
                </p>
                <div className="flex items-center gap-4 text-xs font-mono text-[#71717A] pt-1">
                  <span className="flex items-center gap-1">
                    <Terminal className="w-3.5 h-3.5 text-[#D4FF00]" />
                    <span>Mindspace Active</span>
                  </span>
                  <span>•</span>
                  <span>{totalNodes} Interconnected Nodes</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link href="/explore">
                <Button variant="lime" size="sm" className="text-xs">
                  <Network className="w-3.5 h-3.5 mr-1.5" />
                  <span>Explore Identity Graph</span>
                </Button>
              </Link>
            </div>
          </div>

          <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed max-w-3xl border-t border-white/[0.06] pt-6">
            An interconnected personal knowledge operating system unifying active projects, core competencies, documents, and future growth trajectories into a living cognitive graph.
          </p>
        </div>

        {/* Core Domain Statistics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl border border-white/[0.07] bg-white/[0.015] space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#71717A]">
              Graph Node Volume
            </span>
            <div className="text-3xl font-bold font-mono text-white">{totalNodes}</div>
            <span className="text-[11px] font-mono text-[#D4FF00]">{totalNodes > 0 ? `+${totalNodes} mapped` : "Ready to map"}</span>
          </div>

          <div className="p-5 rounded-2xl border border-white/[0.07] bg-white/[0.015] space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#71717A]">
              Relational Density
            </span>
            <div className="text-3xl font-bold font-mono text-white">{totalNodes > 0 ? "2.4x" : "0.0x"}</div>
            <span className="text-[11px] font-mono text-cyan-400">{totalNodes > 0 ? "Interconnected" : "Awaiting nodes"}</span>
          </div>

          <div className="p-5 rounded-2xl border border-white/[0.07] bg-white/[0.015] space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#71717A]">
              Core Domain Focus
            </span>
            <div className="text-xl font-bold font-mono text-white truncate">
              {MOCK_PROJECTS.length > 0 ? MOCK_PROJECTS[0].category : "Unassigned"}
            </div>
            <span className="text-[11px] font-mono text-amber-400">Primary domain</span>
          </div>

          <div className="p-5 rounded-2xl border border-white/[0.07] bg-white/[0.015] space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#71717A]">
              Curriculum Velocity
            </span>
            <div className="text-3xl font-bold font-mono text-white">
              {MOCK_LEARNING.length > 0 ? `${MOCK_LEARNING[0].progress}%` : "0%"}
            </div>
            <span className="text-[11px] font-mono text-emerald-400">Active trajectory</span>
          </div>
        </div>

        {/* Two-Column Grid: Skills & Graph preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Top Skills Constellation */}
            <div className="p-6 rounded-2xl border border-white/[0.08] bg-[#0A0D11] space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono tracking-[0.2em] text-[#71717A] uppercase font-bold">
                  <Sparkles className="w-4 h-4 text-[#D4FF00]" />
                  <span>Primary Competencies</span>
                </div>
                <Link href="/skills" className="text-xs font-mono text-[#D4FF00] hover:underline">
                  All skills →
                </Link>
              </div>

              {MOCK_SKILLS.length === 0 ? (
                <div className="p-6 rounded-xl border border-white/[0.05] bg-white/[0.01] text-center space-y-1">
                  <span className="text-xs font-mono text-[#71717A]">No competencies mapped yet. Add skills to your knowledge base.</span>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {MOCK_SKILLS.slice(0, 6).map((skill) => (
                    <div
                      key={skill.id}
                      onClick={() => openDrawer(skill.id)}
                      className="p-3.5 rounded-xl border border-white/[0.05] bg-white/[0.02] hover:bg-white/[0.05] transition-all cursor-pointer flex items-center justify-between"
                    >
                      <div className="space-y-0.5">
                        <div className="text-sm font-semibold text-white">{skill.name}</div>
                        <div className="text-[10px] font-mono text-[#71717A]">
                          {skill.projects.length} active projects
                        </div>
                      </div>
                      <span className="text-xs font-mono text-cyan-300 font-semibold">
                        {skill.level}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Active Goals Showcase */}
            <div className="p-6 rounded-2xl border border-white/[0.08] bg-[#0A0D11] space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono tracking-[0.2em] text-[#71717A] uppercase font-bold">
                  <Target className="w-4 h-4 text-amber-400" />
                  <span>Current Growth Horizons</span>
                </div>
                <Link href="/goals" className="text-xs font-mono text-amber-400 hover:underline">
                  All goals →
                </Link>
              </div>

              {MOCK_GOALS.length === 0 ? (
                <div className="p-6 rounded-xl border border-white/[0.05] bg-white/[0.01] text-center space-y-1">
                  <span className="text-xs font-mono text-[#71717A]">No active horizons tracked yet. Define goals to trace your progress.</span>
                </div>
              ) : (
                <div className="space-y-3">
                  {MOCK_GOALS.map((goal) => (
                    <div
                      key={goal.id}
                      onClick={() => openDrawer(goal.id)}
                      className="p-4 rounded-xl border border-white/[0.05] bg-white/[0.02] hover:bg-white/[0.05] transition-all cursor-pointer space-y-2"
                    >
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-white font-semibold">{goal.title}</span>
                        <span className="text-amber-400 font-bold">{goal.progress}%</span>
                      </div>
                      <div className="w-full bg-white/[0.06] rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-amber-400 h-1.5 rounded-full"
                          style={{ width: `${goal.progress}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Right Column: Mini Graph Preview & Active Projects */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Identity Mindspace Mini Graph */}
            <div className="p-6 rounded-2xl border border-white/[0.08] bg-[#0A0D11] space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono tracking-[0.2em] text-[#71717A] uppercase font-bold">
                  Personal Mindspace Topology
                </span>
                <Link href="/explore">
                  <span className="text-[10px] font-mono text-[#D4FF00] hover:underline flex items-center gap-1">
                    <span>Full Explore</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </span>
                </Link>
              </div>

              <div className="w-full h-72 rounded-xl overflow-hidden border border-white/[0.06] bg-[#07090C] relative">
                <KnowledgeGraph
                  mini={true}
                  onSelectNode={(id) => openDrawer(id)}
                />
              </div>
            </div>

            {/* Active Systems */}
            <div className="p-6 rounded-2xl border border-white/[0.08] bg-[#0A0D11] space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono tracking-[0.2em] text-[#71717A] uppercase font-bold">
                  Active Systems Portfolio
                </span>
                <Link href="/projects" className="text-xs font-mono text-[#D4FF00] hover:underline">
                  All projects →
                </Link>
              </div>

              {MOCK_PROJECTS.length === 0 ? (
                <div className="p-6 rounded-xl border border-white/[0.05] bg-white/[0.01] text-center space-y-1">
                  <span className="text-xs font-mono text-[#71717A]">No active projects in portfolio.</span>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {MOCK_PROJECTS.slice(0, 3).map((proj) => (
                    <div
                      key={proj.id}
                      onClick={() => openDrawer(proj.id)}
                      className="p-3.5 rounded-xl border border-white/[0.05] bg-white/[0.02] hover:bg-white/[0.05] transition-all cursor-pointer flex items-center justify-between"
                    >
                      <div>
                        <div className="text-sm font-semibold text-white">{proj.name}</div>
                        <div className="text-[11px] font-mono text-[#71717A]">{proj.category}</div>
                      </div>
                      <span className="text-xs font-mono text-[#D4FF00]">
                        {proj.connectionsCount} links
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </AppShell>
  );
}
