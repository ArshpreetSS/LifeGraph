"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AppShell, useAppShell } from "@/components/app/AppShell";
import {
  MOCK_PROJECTS,
  MOCK_SKILLS,
  MOCK_GOALS,
  MOCK_DOCUMENTS,
  MOCK_LEARNING,
  EntityType
} from "@/lib/mockData";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  ArrowRight,
  Sparkles,
  Network,
  LayoutGrid,
  List
} from "lucide-react";

interface KnowledgeRowItem {
  id: string;
  name: string;
  type: EntityType;
  category: string;
  description: string;
  connectionsCount: number;
  stats: string;
  tags: string[];
}

export default function KnowledgePage() {
  const { openDrawer } = useAppShell();
  const [activeTab, setActiveTab] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"connections" | "name" | "recent">("connections");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  // Aggregate all entities
  const allItems: KnowledgeRowItem[] = [
    ...MOCK_PROJECTS.map((p) => ({
      id: p.id,
      name: p.name,
      type: "PROJECT" as EntityType,
      category: p.category,
      description: p.description,
      connectionsCount: p.connectionsCount,
      stats: `${p.skills.length} skills • ${p.goals.length} goals`,
      tags: p.skills
    })),
    ...MOCK_SKILLS.map((s) => ({
      id: s.id,
      name: s.name,
      type: "SKILL" as EntityType,
      category: s.category,
      description: s.description,
      connectionsCount: s.connectionsCount,
      stats: `${s.projects.length} projects • ${s.goals.length} goals`,
      tags: s.projects
    })),
    ...MOCK_GOALS.map((g) => ({
      id: g.id,
      name: g.title,
      type: "GOAL" as EntityType,
      category: `Target: ${g.targetQuarter}`,
      description: g.description,
      connectionsCount: g.connectedProjects.length + g.requiredSkills.length,
      stats: `${g.progress}% progress • ${g.connectedProjects.length} projects`,
      tags: g.requiredSkills
    })),
    ...MOCK_DOCUMENTS.map((d) => ({
      id: d.id,
      name: d.title,
      type: "DOCUMENT" as EntityType,
      category: `${d.fileType} (${d.fileSize})`,
      description: d.summary,
      connectionsCount: d.relatedProjects.length + d.relatedSkills.length,
      stats: `${d.extractedConcepts.length} concepts extracted`,
      tags: d.extractedConcepts
    })),
    ...MOCK_LEARNING.map((l) => ({
      id: l.id,
      name: l.title,
      type: "LEARNING" as EntityType,
      category: l.platform,
      description: l.recommendationReason || `Learning track (${l.progress}% completed)`,
      connectionsCount: l.connectedProjects.length + l.skillsGained.length,
      stats: `${l.skillsGained.length} skills gained`,
      tags: l.skillsGained
    }))
  ];

  // Filtering
  const filtered = allItems.filter((item) => {
    if (activeTab !== "All") {
      const typeMap: Record<string, EntityType> = {
        Projects: "PROJECT",
        Skills: "SKILL",
        Goals: "GOAL",
        Documents: "DOCUMENT",
        Learning: "LEARNING"
      };
      if (typeMap[activeTab] && item.type !== typeMap[activeTab]) {
        return false;
      }
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        item.name.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return true;
  });

  // Sorting
  filtered.sort((a, b) => {
    if (sortBy === "connections") return b.connectionsCount - a.connectionsCount;
    if (sortBy === "name") return a.name.localeCompare(b.name);
    return 0;
  });

  const tabs = ["All", "Projects", "Skills", "Goals", "Documents", "Learning"];

  return (
    <AppShell>
      <div className="p-6 sm:p-10 space-y-8 max-w-7xl mx-auto w-full">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[11px] font-mono tracking-[0.25em] text-[#71717A] uppercase">
              <span>INDEX</span>
              <span>•</span>
              <span className="text-[#D4FF00]">KNOWLEDGE LIBRARY</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase">
              Knowledge Repository
            </h1>
            <p className="text-sm sm:text-base text-slate-400 font-light">
              Complete index of your interconnected cognitive entities, skills, artifacts, and growth vectors.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/explore">
              <Button variant="secondary" size="sm" className="text-xs">
                <Network className="w-3.5 h-3.5 text-[#D4FF00]" />
                <span>Spatial View</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Filter and Control Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2 border-t border-white/[0.06]">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === tab
                    ? "bg-[#D4FF00] text-black font-semibold shadow-[0_0_15px_rgba(212,255,0,0.2)]"
                    : "text-[#A1A1AA] hover:text-white hover:bg-white/[0.04] border border-white/[0.05]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search, Sort, View Toggle */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/10 text-xs font-mono flex-1 sm:w-64">
              <Search className="w-3.5 h-3.5 text-[#71717A]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter library..."
                className="bg-transparent text-white placeholder-[#71717A] focus:outline-hidden w-full text-xs"
              />
            </div>

            {/* Sort select */}
            <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/[0.03] border border-white/10 text-xs font-mono text-[#A1A1AA]">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#71717A]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-xs text-white focus:outline-hidden cursor-pointer"
              >
                <option value="connections" className="bg-[#0A0D10]">Most Connected</option>
                <option value="name" className="bg-[#0A0D10]">Alphabetical</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="hidden sm:flex items-center p-1 rounded-lg bg-white/[0.03] border border-white/10 text-[#71717A]">
              <button
                onClick={() => setViewMode("list")}
                className={`p-1 rounded ${viewMode === "list" ? "bg-white/[0.08] text-white" : "hover:text-white"}`}
                title="List View"
              >
                <List className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1 rounded ${viewMode === "grid" ? "bg-white/[0.08] text-white" : "hover:text-white"}`}
                title="Grid View"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Knowledge Library Content */}
        {filtered.length === 0 ? (
          <div className="p-12 rounded-2xl border border-dashed border-white/10 bg-[#0A0D11] text-center space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#D4FF00]/10 border border-[#D4FF00]/20 flex items-center justify-center mx-auto text-[#D4FF00]">
              <Sparkles className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-semibold text-white">Your knowledge repository is empty</h3>
              <p className="text-sm text-slate-400 max-w-sm mx-auto">
                {searchQuery
                  ? `No knowledge entities found matching "${searchQuery}".`
                  : "Begin mapping projects, recording technical competencies, or uploading papers to build your repository."}
              </p>
            </div>
            <Link href="/projects">
              <Button variant="lime" size="sm">
                <span>Create First Project</span>
              </Button>
            </Link>
          </div>
        ) : viewMode === "list" ? (
          /* List View */
          <div className="space-y-2">
            {filtered.map((item) => (
              <div
                key={`${item.type}-${item.id}`}
                onClick={() => openDrawer(item.id)}
                className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.015] hover:bg-white/[0.04] hover:border-white/15 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
              >
                <div className="space-y-1.5 min-w-0 flex-1">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="text-base font-bold text-white group-hover:text-[#D4FF00] transition-colors tracking-tight">
                      {item.name}
                    </span>
                    <Badge entityType={item.type}>{item.type}</Badge>
                    <span className="text-xs font-mono text-[#71717A]">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-1">
                    {item.description}
                  </p>
                  <div className="flex items-center gap-2 pt-0.5 flex-wrap">
                    <span className="text-[10px] font-mono text-[#71717A] uppercase">
                      Connected to: {item.stats}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0 justify-between sm:justify-end border-t sm:border-t-0 border-white/[0.05] pt-2 sm:pt-0">
                  <div className="text-right">
                    <div className="text-xs font-mono font-bold text-[#D4FF00]">
                      {item.connectionsCount} links
                    </div>
                    <div className="text-[10px] font-mono text-[#71717A] uppercase">
                      Density
                    </div>
                  </div>

                  <Button variant="outline" size="sm" className="text-[10px] group-hover:border-white/30">
                    <span>Inspect</span>
                    <ArrowRight className="w-3 h-3 text-[#D4FF00] group-hover:translate-x-0.5 transition-transform" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Grid View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((item) => (
              <div
                key={`${item.type}-${item.id}`}
                onClick={() => openDrawer(item.id)}
                className="p-5 rounded-2xl border border-white/[0.07] bg-white/[0.015] hover:bg-white/[0.04] hover:border-white/20 transition-all cursor-pointer flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge entityType={item.type}>{item.type}</Badge>
                    <span className="text-xs font-mono font-bold text-[#D4FF00]">
                      {item.connectionsCount} links
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-[#D4FF00] transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/[0.06] space-y-2">
                  <div className="text-[11px] font-mono text-[#71717A]">
                    {item.stats}
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono text-[#D4FF00]">
                    <span>Explore connection</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
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
