"use client";

import React from "react";
import Link from "next/link";
import { AppShell, useAppShell } from "@/components/app/AppShell";
import { KnowledgeGraph } from "@/components/knowledge/KnowledgeGraph";
import {
  MOCK_PROJECTS,
  MOCK_SKILLS,
  MOCK_GOALS,
  MOCK_DOCUMENTS,
  MOCK_LEARNING,
  MOCK_ACTIVITIES,
  MOCK_INSIGHTS
} from "@/lib/mockData";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  ArrowRight,
  Sparkles,
  Network,
  Layers,
  Target,
  FileText,
  GraduationCap,
  ArrowUpRight,
  TrendingUp,
  Activity
} from "lucide-react";

export default function DashboardPage() {
  const { openDrawer } = useAppShell();

  const totalItems =
    MOCK_PROJECTS.length +
    MOCK_SKILLS.length +
    MOCK_GOALS.length +
    MOCK_DOCUMENTS.length +
    MOCK_LEARNING.length;

  const metrics = [
    { label: "Total Nodes", value: totalItems, change: totalItems === 0 ? "0 mapped" : "+4 this week", icon: Network },
    { label: "Active Projects", value: MOCK_PROJECTS.length, change: MOCK_PROJECTS.length === 0 ? "0 in flight" : "2 in flight", icon: Layers, href: "/projects" },
    { label: "Core Skills", value: MOCK_SKILLS.length, change: MOCK_SKILLS.length === 0 ? "0 mapped" : "15 connections avg", icon: Sparkles, href: "/skills" },
    { label: "Target Goals", value: MOCK_GOALS.length, change: MOCK_GOALS.length === 0 ? "0 tracked" : "78% on track", icon: Target, href: "/goals" },
    { label: "Documents", value: MOCK_DOCUMENTS.length, change: MOCK_DOCUMENTS.length === 0 ? "0 indexed" : "100% indexed", icon: FileText, href: "/documents" },
    { label: "Learning Paths", value: MOCK_LEARNING.filter(l => l.status === "in_progress").length, change: MOCK_LEARNING.length === 0 ? "0 active" : "3 active", icon: GraduationCap, href: "/learning" }
  ];

  return (
    <AppShell>
      <div className="p-6 sm:p-10 space-y-10 max-w-7xl mx-auto w-full">
        
        {/* Editorial Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-[11px] font-mono tracking-[0.25em] text-[#71717A] uppercase">
            <span>OVERVIEW</span>
            <span>•</span>
            <span className="text-[#D4FF00]">COGNITIVE TOPOLOGY</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#F5F5F7] leading-none uppercase">
            Good morning.
          </h1>
          <p className="text-base sm:text-lg text-[#A1A1AA] font-light max-w-2xl">
            {totalItems === 0
              ? "Here's what's happening in your personal knowledge graph. Your mindspace is waiting for its first connection."
              : "Here's what's happening in your personal knowledge graph. Your mindspace has grown by 4 connections today."}
          </p>
        </div>

        {/* Minimalist Metrics Array */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {metrics.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div
                key={idx}
                className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.07] hover:border-white/20 transition-all space-y-2 group"
              >
                <div className="flex items-center justify-between text-[#71717A]">
                  <Icon className="w-4 h-4 group-hover:text-[#D4FF00] transition-colors" />
                  <span className="text-[10px] font-mono tracking-wider">{m.change}</span>
                </div>
                <div className="space-y-0.5">
                  <div className="text-2xl sm:text-3xl font-bold font-mono text-white tracking-tight">
                    {m.value}
                  </div>
                  <div className="text-[11px] font-mono text-[#A1A1AA] uppercase tracking-wider truncate">
                    {m.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Centerpiece: Mini Interactive Knowledge Graph & AI Synthesis */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left: Mini Knowledge Graph Visualizer */}
          <div className="lg:col-span-7 rounded-2xl border border-white/[0.08] bg-[#0A0D11] p-5 flex flex-col justify-between relative overflow-hidden shadow-2xl group">
            <div className="flex items-center justify-between mb-4 z-10">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#D4FF00] animate-pulse" />
                  <h2 className="text-xs font-mono tracking-[0.2em] text-[#F5F5F7] uppercase font-bold">
                    Active Knowledge Cluster
                  </h2>
                </div>
                <p className="text-xs text-[#71717A]">
                  {totalItems === 0
                    ? "Mindspace topology ready • Awaiting entities"
                    : "Python → Machine Learning → Drone 3D → AI Goal"}
                </p>
              </div>

              <Link href="/explore">
                <Button variant="secondary" size="sm" className="text-[10px] tracking-wider">
                  <span>Full Graph</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#D4FF00]" />
                </Button>
              </Link>
            </div>

            {/* Canvas Preview Container */}
            <div className="w-full h-80 rounded-xl overflow-hidden border border-white/[0.06] bg-[#07090C] relative">
              <KnowledgeGraph
                mini={true}
                onSelectNode={(id) => openDrawer(id)}
              />
              <div className="absolute bottom-3 left-3 pointer-events-none bg-[#070809]/80 px-2.5 py-1 rounded text-[10px] font-mono text-[#71717A] border border-white/5">
                {totalItems === 0 ? "Topology grid active" : "Click any node to inspect relationships"}
              </div>
            </div>
          </div>

          {/* Right: Curated AI Knowledge Insights */}
          <div className="lg:col-span-5 rounded-2xl border border-white/[0.08] bg-[#0A0D11] p-6 flex flex-col justify-between space-y-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-[11px] font-mono tracking-[0.2em] text-[#D4FF00] uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Knowledge Synthesis</span>
              </div>
              <h2 className="text-lg font-bold text-white tracking-tight">
                Discovered Opportunities
              </h2>
            </div>

            <div className="space-y-3.5 flex-1">
              {MOCK_INSIGHTS.length === 0 ? (
                <div className="py-10 text-center space-y-2 border border-dashed border-white/10 rounded-xl p-6">
                  <Sparkles className="w-5 h-5 text-[#71717A] mx-auto opacity-50" />
                  <h3 className="text-xs font-mono text-slate-300 font-semibold uppercase tracking-wider">
                    No insights yet
                  </h3>
                  <p className="text-[11px] text-slate-500 font-light leading-relaxed">
                    LifeGraph will synthesize cross-domain connections once you begin mapping your projects and skills.
                  </p>
                </div>
              ) : (
                MOCK_INSIGHTS.slice(0, 2).map((ins) => (
                  <div
                    key={ins.id}
                    className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-all space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#D4FF00] bg-[#D4FF00]/10 px-2 py-0.5 rounded border border-[#D4FF00]/20">
                        {ins.categoryLabel}
                      </span>
                      <span className="text-[10px] font-mono text-[#71717A]">{ins.timestamp}</span>
                    </div>
                    <h3 className="text-sm font-semibold text-white tracking-tight">
                      {ins.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed font-normal">
                      {ins.description}
                    </p>
                    <div className="pt-1">
                      <Link
                        href={ins.actionRoute}
                        className="inline-flex items-center gap-1.5 text-xs font-mono text-[#D4FF00] hover:underline"
                      >
                        <span>{ins.actionLabel}</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>

            <Link href="/insights">
              <Button variant="outline" className="w-full justify-between text-[11px]">
                <span>View all synthesized insights</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#D4FF00]" />
              </Button>
            </Link>
          </div>

        </div>

        {/* Bottom Split: Recent Activity & Quick Knowledge Paths */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Recent Knowledge Activity */}
          <div className="lg:col-span-7 rounded-2xl border border-white/[0.08] bg-[#0A0D11] p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono tracking-[0.2em] text-[#71717A] uppercase font-bold">
                <Activity className="w-4 h-4 text-[#D4FF00]" />
                <span>Recent Knowledge Activity</span>
              </div>
              <Link
                href="/activity"
                className="text-xs font-mono text-[#A1A1AA] hover:text-[#D4FF00] uppercase tracking-wider transition-colors"
              >
                View full timeline →
              </Link>
            </div>

            <div className="space-y-2.5">
              {MOCK_ACTIVITIES.length === 0 ? (
                <div className="py-10 text-center space-y-2 border border-dashed border-white/10 rounded-xl p-6">
                  <p className="text-xs font-mono text-slate-300 uppercase tracking-wider">
                    No activity recorded yet
                  </p>
                  <p className="text-[11px] text-slate-500 font-light">
                    Your actions will appear chronologically as your knowledge evolves.
                  </p>
                </div>
              ) : (
                MOCK_ACTIVITIES.slice(0, 4).map((act) => (
                  <div
                    key={act.id}
                    onClick={() => openDrawer(act.entityId)}
                    className="p-3 rounded-xl border border-white/[0.05] bg-white/[0.015] hover:bg-white/[0.04] transition-all flex items-center justify-between gap-4 cursor-pointer group"
                  >
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <Badge entityType={act.entityType}>{act.entityType}</Badge>
                        <span className="text-xs font-medium text-slate-200 group-hover:text-white truncate">
                          {act.title}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-1">
                        {act.details}
                      </p>
                    </div>
                    <span className="text-[10px] font-mono text-[#71717A] shrink-0">
                      {act.timestamp}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Quick Active Projects Preview */}
          <div className="lg:col-span-5 rounded-2xl border border-white/[0.08] bg-[#0A0D11] p-6 flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono tracking-[0.2em] text-[#71717A] uppercase font-bold">
                Active Projects Focus
              </span>
              <Link
                href="/projects"
                className="text-xs font-mono text-[#A1A1AA] hover:text-[#D4FF00] uppercase tracking-wider transition-colors"
              >
                All projects →
              </Link>
            </div>

            <div className="space-y-3">
              {MOCK_PROJECTS.length === 0 ? (
                <div className="py-10 text-center space-y-2 border border-dashed border-white/10 rounded-xl p-6">
                  <p className="text-xs font-mono text-slate-300 uppercase tracking-wider">
                    No active projects yet
                  </p>
                  <p className="text-[11px] text-slate-500 font-light">
                    Your projects will appear here once you add them.
                  </p>
                </div>
              ) : (
                MOCK_PROJECTS.slice(0, 3).map((proj) => (
                  <div
                    key={proj.id}
                    onClick={() => openDrawer(proj.id)}
                    className="p-3.5 rounded-xl border border-white/[0.05] bg-white/[0.015] hover:bg-white/[0.04] transition-all cursor-pointer space-y-1.5 group"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-white group-hover:text-[#D4FF00] transition-colors">
                        {proj.name}
                      </h3>
                      <span className="text-[10px] font-mono text-[#D4FF00]">
                        {proj.connectionsCount} connections
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-1">
                      {proj.tagline}
                    </p>
                    <div className="flex items-center gap-1.5 pt-1">
                      {proj.skills.slice(0, 3).map((s, idx) => (
                        <span
                          key={idx}
                          className="px-1.5 py-0.5 rounded bg-white/[0.04] text-[10px] font-mono text-slate-300"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>

            <Link href="/ask">
              <div className="p-3 rounded-xl border border-[#D4FF00]/20 bg-[#D4FF00]/[0.03] flex items-center justify-between text-xs font-mono text-[#D4FF00] hover:bg-[#D4FF00]/[0.06] transition-colors cursor-pointer">
                <span className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Ask AI about your next connection</span>
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          </div>
        </div>

      </div>
    </AppShell>
  );
}
