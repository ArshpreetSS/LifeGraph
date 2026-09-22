"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AppShell, useAppShell } from "@/components/app/AppShell";
import { MOCK_LEARNING, LearningItem } from "@/lib/mockData";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import {
  GraduationCap,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Clock,
  BookOpen,
  Layers,
  Plus
} from "lucide-react";

export default function LearningPage() {
  const { openDrawer } = useAppShell();
  const { showToast } = useToast();
  const [learningList, setLearningList] = useState<LearningItem[]>(MOCK_LEARNING);

  const inProgress = learningList.filter((l) => l.status === "in_progress");
  const completed = learningList.filter((l) => l.status === "completed");
  const recommended = learningList.filter((l) => l.status === "recommended");

  const handleStartRecommended = (item: LearningItem) => {
    setLearningList((prev) =>
      prev.map((l) =>
        l.id === item.id ? { ...l, status: "in_progress", progress: 5 } : l
      )
    );
    showToast(`Enrolled in "${item.title}". Added to active learning trajectory.`, "lime");
  };

  return (
    <AppShell>
      <div className="p-6 sm:p-10 space-y-10 max-w-7xl mx-auto w-full">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[11px] font-mono tracking-[0.25em] text-[#71717A] uppercase">
              <span>CURRICULUM</span>
              <span>•</span>
              <span className="text-emerald-400">PERSONAL LEARNING SPACE</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase">
              Learning Tracks
            </h1>
            <p className="text-sm sm:text-base text-slate-400 font-light max-w-2xl">
              Deliberate practice, course progressions, and AI-recommended study vectors linked to your active codebase.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-[#71717A] uppercase">
              {inProgress.length} Active • {completed.length} Completed
            </span>
          </div>
        </div>

        {/* Section 1: Currently Learning */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono tracking-[0.2em] text-emerald-400 uppercase font-bold">
            <Clock className="w-4 h-4" />
            <span>Currently Active ({inProgress.length})</span>
          </div>

          {inProgress.length === 0 ? (
            <div className="p-8 rounded-2xl border border-dashed border-white/10 bg-[#0A0D11] text-center space-y-2">
              <BookOpen className="w-6 h-6 text-emerald-400 mx-auto opacity-70" />
              <h4 className="text-sm font-semibold text-white">No active learning tracks</h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Explore recommended tracks below or link courses to your active projects to monitor curriculum velocity.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {inProgress.map((item) => (
                <div
                  key={item.id}
                  onClick={() => openDrawer(item.id)}
                  className="p-6 rounded-2xl border border-white/[0.08] bg-[#0A0D11] hover:border-emerald-500/30 transition-all flex flex-col justify-between space-y-6 shadow-xl cursor-pointer group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-[#71717A] truncate max-w-[180px]">
                        {item.platform}
                      </span>
                      <span className="text-emerald-400 font-bold">
                        {item.progress}%
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                        {item.title}
                      </h3>
                      {item.timelineEstimate && (
                        <span className="text-[11px] font-mono text-[#71717A] block">
                          Estimated: {item.timelineEstimate}
                        </span>
                      )}
                    </div>

                    {/* Progress bar */}
                    <div className="w-full bg-white/[0.06] rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-emerald-400 h-1.5 rounded-full transition-all duration-700"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Key Topics & Connected Projects */}
                  <div className="space-y-3 pt-3 border-t border-white/[0.06] text-xs font-mono">
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase text-[#71717A] tracking-wider block">
                        Direct Project Connections
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {item.connectedProjects.map((p, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.06] text-[11px] text-slate-300">
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1 text-[#71717A] group-hover:text-emerald-300 transition-colors">
                      <span>Inspect curriculum</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Section 2: AI Recommended Next Learning Vectors */}
        <div className="p-7 sm:p-8 rounded-2xl border border-[#D4FF00]/20 bg-[#D4FF00]/[0.02] space-y-6 shadow-[0_0_30px_rgba(212,255,0,0.04)]">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono tracking-[0.2em] uppercase text-[#D4FF00] font-bold">
              <Sparkles className="w-4 h-4" />
              <span>AI Study Recommendations</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Recommended Based on Your Active Codebase
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-light">
              LifeGraph detected knowledge gaps and logical stepping stones from your ongoing projects.
            </p>
          </div>

          {recommended.length === 0 ? (
            <div className="p-6 rounded-xl border border-white/[0.06] bg-[#0A0D11] text-center space-y-2">
              <Sparkles className="w-5 h-5 text-[#D4FF00] mx-auto opacity-70" />
              <h4 className="text-sm font-semibold text-white">No active study recommendations</h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Once projects and skills are added to your graph, the synthesis engine identifies tailored learning tracks.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recommended.map((rec) => (
                <div
                  key={rec.id}
                  className="p-5 rounded-xl border border-white/[0.08] bg-[#0A0D11] hover:border-[#D4FF00]/30 transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-[#71717A]">{rec.timelineEstimate}</span>
                      <span className="px-2 py-0.5 rounded bg-[#D4FF00]/10 text-[#D4FF00] text-[10px] font-mono uppercase">
                        Recommended
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white tracking-tight">
                      {rec.title}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed font-light">
                      {rec.recommendationReason}
                    </p>
                  </div>

                  <div className="pt-2">
                    <Button
                      variant="lime"
                      size="sm"
                      className="w-full justify-between text-xs"
                      onClick={() => handleStartRecommended(rec)}
                    >
                      <span>Start Learning Track</span>
                      <Plus className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Section 3: Completed Archive */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono tracking-[0.2em] text-[#71717A] uppercase font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Mastered & Completed ({completed.length})</span>
          </div>

          {completed.length === 0 ? (
            <div className="p-6 rounded-xl border border-white/[0.06] bg-white/[0.01] text-center space-y-1">
              <span className="text-xs font-mono text-[#71717A]">
                No completed tracks archived yet. Completed curricula will be indexed here.
              </span>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {completed.map((comp) => (
                <div
                  key={comp.id}
                  onClick={() => openDrawer(comp.id)}
                  className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.015] hover:bg-white/[0.03] transition-all cursor-pointer flex items-center justify-between gap-4"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="text-sm font-semibold text-white truncate">
                        {comp.title}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-[#71717A] block">
                      {comp.platform} • Skills: {comp.skillsGained.join(", ")}
                    </span>
                  </div>

                  <Button variant="ghost" size="sm" className="text-xs text-[#71717A] hover:text-white">
                    <span>Review</span>
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </AppShell>
  );
}
