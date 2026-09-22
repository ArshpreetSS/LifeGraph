"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AppShell, useAppShell } from "@/components/app/AppShell";
import { MOCK_GOALS, GoalItem } from "@/lib/mockData";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Target,
  ArrowRight,
  Sparkles,
  Layers,
  GraduationCap,
  Network,
  CheckCircle2,
  X,
  Compass
} from "lucide-react";

export default function GoalsPage() {
  const { openDrawer } = useAppShell();
  const [activePathGoal, setActivePathGoal] = useState<GoalItem | null>(null);

  return (
    <AppShell>
      <div className="p-6 sm:p-10 space-y-8 max-w-7xl mx-auto w-full">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[11px] font-mono tracking-[0.25em] text-[#71717A] uppercase">
              <span>TRAJECTORY</span>
              <span>•</span>
              <span className="text-amber-400">PERSONAL OBJECTIVES</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase">
              Growth Goals
            </h1>
            <p className="text-sm sm:text-base text-slate-400 font-light max-w-2xl">
              Strategic career outcomes grounded in your active projects, required skills, and structured knowledge paths.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[#71717A] uppercase">
              {MOCK_GOALS.length} Strategic Goals Active
            </span>
          </div>
        </div>

        {/* Goals Cards Grid or Empty State */}
        {MOCK_GOALS.length === 0 ? (
          <div className="p-12 sm:p-16 rounded-3xl border border-dashed border-white/10 bg-[#0A0D11]/60 text-center space-y-4 max-w-xl mx-auto my-12">
            <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center mx-auto text-amber-400">
              <Target className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-white tracking-tight">
                No goals tracked yet.
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed">
                Define strategic milestones and target outcomes. LifeGraph will calculate step-by-step knowledge paths connecting your skills and projects to each goal.
              </p>
            </div>
            <div className="pt-2">
              <Button
                variant="lime"
                size="sm"
                onClick={() => openDrawer("new-goal")}
              >
                <span>Create First Goal</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MOCK_GOALS.map((goal) => (
              <div
                key={goal.id}
                className="p-6 sm:p-7 rounded-2xl border border-white/[0.08] bg-[#0A0D11] hover:border-amber-500/30 transition-all flex flex-col justify-between space-y-6 shadow-xl relative overflow-hidden group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                      {goal.targetQuarter}
                    </span>
                    <span className="text-xs font-mono text-[#D4FF00] font-bold">
                      {goal.progress}% Completed
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold tracking-tight text-white group-hover:text-amber-300 transition-colors">
                      {goal.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                      {goal.description}
                    </p>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-white/[0.06] rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-linear-to-r from-amber-500 to-[#D4FF00] h-1.5 rounded-full transition-all duration-700"
                      style={{ width: `${goal.progress}%` }}
                    />
                  </div>
                </div>

                {/* Connected details */}
                <div className="space-y-4 pt-4 border-t border-white/[0.06] text-xs font-mono">
                  {/* Connected Projects */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] uppercase text-[#71717A] tracking-wider block">
                      Connected Projects ({goal.connectedProjects.length})
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {goal.connectedProjects.map((p, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.08] text-[11px] text-slate-200"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Required Skills */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] uppercase text-[#71717A] tracking-wider block">
                      Required Skills ({goal.requiredSkills.length})
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {goal.requiredSkills.map((s, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 text-[11px] text-cyan-300"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Recent Milestone */}
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] space-y-1">
                    <span className="text-[9px] uppercase tracking-wider text-[#71717A] block">
                      Recent Velocity Milestone
                    </span>
                    <div className="flex items-center gap-2 text-slate-300 text-xs">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{goal.recentMilestone}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 flex items-center justify-between gap-3">
                    <Button
                      variant="lime"
                      size="sm"
                      className="flex-1 justify-between text-xs"
                      onClick={() => setActivePathGoal(goal)}
                    >
                      <span className="flex items-center gap-1.5">
                        <Compass className="w-3.5 h-3.5" />
                        <span>View Knowledge Path</span>
                      </span>
                      <ArrowRight className="w-3 h-3" />
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      onClick={() => openDrawer(goal.id)}
                    >
                      <span>Inspect</span>
                    </Button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* Knowledge Path Modal */}
        {activePathGoal && (
          <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-12 flex justify-center items-center pointer-events-auto">
            <div
              className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
              onClick={() => setActivePathGoal(null)}
            />

            <div className="relative w-full max-w-2xl bg-[#0B0E12] border border-white/15 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6 z-10 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-start justify-between gap-4 border-b border-white/[0.08] pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-amber-400">
                    <Compass className="w-4 h-4" />
                    <span>Knowledge Progression Path</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {activePathGoal.title}
                  </h2>
                </div>
                <button
                  onClick={() => setActivePathGoal(null)}
                  className="p-1 rounded-lg text-[#71717A] hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
                LifeGraph calculates this knowledge trajectory connecting your foundational skills to practical deployments and end-goal mastery.
              </p>

              {/* Step Progression Timeline */}
              <div className="space-y-3 relative pl-4 sm:pl-6 before:absolute before:left-2 sm:before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-linear-to-b before:from-cyan-400 before:via-[#D4FF00] before:to-amber-400">
                {activePathGoal.knowledgePath.map((step, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setActivePathGoal(null);
                      openDrawer(step.id);
                    }}
                    className="p-3.5 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] transition-all cursor-pointer flex items-center justify-between gap-4 group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-[#71717A] font-bold">
                        0{idx + 1}
                      </span>
                      <span className="text-sm font-semibold text-white group-hover:text-[#D4FF00] transition-colors">
                        {step.step}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge entityType={step.type}>{step.type}</Badge>
                      <ArrowRight className="w-3.5 h-3.5 text-[#71717A] group-hover:text-white group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-white/[0.08]">
                <Link
                  href={`/explore?focus=${activePathGoal.id}`}
                  onClick={() => setActivePathGoal(null)}
                >
                  <Button variant="outline" size="sm" className="text-xs">
                    <Network className="w-3.5 h-3.5 text-[#D4FF00]" />
                    <span>View in Spatial Graph</span>
                  </Button>
                </Link>

                <Button variant="secondary" size="sm" onClick={() => setActivePathGoal(null)}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}

      </div>
    </AppShell>
  );
}
