"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AppShell, useAppShell } from "@/components/app/AppShell";
import { MOCK_SKILLS, MOCK_PROJECTS } from "@/lib/mockData";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Sparkles,
  Network,
  ArrowRight,
  Layers,
  Target,
  GraduationCap,
  Search,
  Cpu
} from "lucide-react";

export default function SkillsPage() {
  const { openDrawer } = useAppShell();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", "Languages", "Frameworks", "AI / ML", "Graphics & 3D", "Systems & Tools"];

  const filteredSkills = MOCK_SKILLS.filter((skill) => {
    if (selectedCategory !== "All" && skill.category !== selectedCategory) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        skill.name.toLowerCase().includes(q) ||
        skill.description.toLowerCase().includes(q) ||
        skill.projects.some((p) => p.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <AppShell>
      <div className="p-6 sm:p-10 space-y-8 max-w-7xl mx-auto w-full">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[11px] font-mono tracking-[0.25em] text-[#71717A] uppercase">
              <span>COMPETENCIES</span>
              <span>•</span>
              <span className="text-cyan-400">RELATIONAL SKILL MATRIX</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase">
              Skills & Mastery
            </h1>
            <p className="text-sm sm:text-base text-slate-400 font-light max-w-2xl">
              Skills mapped by real deployment density across active systems, rather than arbitrary percentage bars.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/explore">
              <Button variant="secondary" size="sm" className="text-xs">
                <Network className="w-3.5 h-3.5 text-[#D4FF00]" />
                <span>Cluster View</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2 border-t border-white/[0.06]">
          {/* Categories */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat
                    ? "bg-[#00F0FF] text-black font-semibold shadow-[0_0_15px_rgba(0,240,255,0.25)]"
                    : "text-[#A1A1AA] hover:text-white hover:bg-white/[0.04] border border-white/[0.05]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/10 text-xs font-mono w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-[#71717A]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search skills..."
              className="bg-transparent text-white placeholder-[#71717A] focus:outline-hidden w-full text-xs"
            />
          </div>
        </div>

        {/* Skills Cards Grid or Empty State */}
        {filteredSkills.length === 0 ? (
          <div className="p-12 sm:p-16 rounded-3xl border border-dashed border-white/10 bg-[#0A0D11]/60 text-center space-y-4 max-w-xl mx-auto my-12">
            <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center mx-auto text-cyan-400">
              <Sparkles className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-white tracking-tight">
                No skills mapped yet.
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed">
                Connect skills as you build projects, ingest technical papers, and define learning vectors. Relationships will automatically populate in your knowledge matrix.
              </p>
            </div>
            <div className="pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => openDrawer("new-skill")}
              >
                <span>Add First Skill</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSkills.map((skill) => (
              <div
                key={skill.id}
                onClick={() => openDrawer(skill.id)}
                className="p-6 rounded-2xl border border-white/[0.08] bg-[#0A0D11] hover:border-cyan-500/30 transition-all flex flex-col justify-between space-y-6 group shadow-xl cursor-pointer relative overflow-hidden"
              >
                {/* Header */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-white/[0.04] text-[#A1A1AA] border border-white/10">
                      {skill.category}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs font-mono text-[#D4FF00]">
                      <Network className="w-3 h-3" />
                      <span>{skill.connectionsCount} nodes</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                        {skill.name}
                      </h2>
                      <span className="text-xs font-mono text-cyan-300 font-semibold">
                        {skill.level}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 font-normal leading-relaxed line-clamp-2">
                      {skill.description}
                    </p>
                  </div>
                </div>

                {/* Real Relationships: Projects, Goals, Learning */}
                <div className="space-y-3.5 pt-4 border-t border-white/[0.06] text-xs font-mono">
                  {/* Deployed in Projects */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] uppercase text-[#71717A] tracking-wider block">
                      Deployed In ({skill.projects.length} Projects)
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {skill.projects.map((projName, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.08] text-[11px] text-slate-200"
                        >
                          {projName}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Related Goals */}
                  {skill.goals.length > 0 && (
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase text-[#71717A] tracking-wider block">
                        Powers Goals
                      </span>
                      <div className="space-y-1">
                        {skill.goals.map((g, idx) => (
                          <div key={idx} className="flex items-center gap-1.5 text-[11px] text-amber-300/80 truncate">
                            <Target className="w-3 h-3 text-amber-400 shrink-0" />
                            <span className="truncate">{g}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Footer */}
                <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-[#71717A] group-hover:text-cyan-300 transition-colors">
                  <span>Explore skill relations</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </AppShell>
  );
}
