"use client";

import React, { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShell, useAppShell } from "@/components/app/AppShell";
import { KnowledgeGraph } from "@/components/knowledge/KnowledgeGraph";
import {
  getProjectById,
  MOCK_PROJECTS,
  MOCK_ACTIVITIES,
  MOCK_DOCUMENTS,
  MOCK_LEARNING
} from "@/lib/mockData";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  ArrowLeft,
  ArrowRight,
  Network,
  Sparkles,
  Target,
  FileText,
  GraduationCap,
  Clock,
  Layers,
  ArrowUpRight
} from "lucide-react";

interface ProjectDetailProps {
  params: Promise<{ id: string }>;
}

export default function ProjectDetailPage({ params }: ProjectDetailProps) {
  const resolvedParams = use(params);
  const project = getProjectById(resolvedParams.id);
  const { openDrawer } = useAppShell();

  if (!project) {
    return (
      <AppShell>
        <div className="p-12 text-center space-y-4 max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-white">Project Not Found</h1>
          <p className="text-sm text-slate-400">
            The project &quot;{resolvedParams.id}&quot; does not exist in your knowledge graph.
          </p>
          <Link href="/projects">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Projects
            </Button>
          </Link>
        </div>
      </AppShell>
    );
  }

  // Related documents
  const relatedDocs = MOCK_DOCUMENTS.filter((d) =>
    d.relatedProjects.includes(project.name) || project.documents.includes(d.title)
  );

  // Related learning
  const relatedLearning = MOCK_LEARNING.filter((l) =>
    l.connectedProjects.includes(project.name) || project.learning.includes(l.title)
  );

  // Project activities
  const projectActivities = MOCK_ACTIVITIES.filter((a) =>
    a.entityId === project.id || a.entityName === project.name
  );

  return (
    <AppShell>
      <div className="p-6 sm:p-10 space-y-10 max-w-7xl mx-auto w-full">
        
        {/* Back navigation & breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs font-mono text-[#A1A1AA] hover:text-white uppercase tracking-wider transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to all projects</span>
          </Link>

          <Link href={`/explore?focus=${project.id}`}>
            <Button variant="secondary" size="sm" className="text-xs">
              <Network className="w-3.5 h-3.5 text-[#D4FF00]" />
              <span>Explore in Spatial Graph</span>
            </Button>
          </Link>
        </div>

        {/* Project Header Banner */}
        <div className="space-y-4 border-b border-white/[0.08] pb-8">
          <div className="flex items-center gap-3 flex-wrap">
            <Badge entityType="PROJECT">PROJECT</Badge>
            <span className="text-xs font-mono text-[#71717A] uppercase tracking-wider">
              {project.category}
            </span>
            <span className="text-[#71717A] text-xs">•</span>
            <span className="text-xs font-mono text-[#D4FF00]">
              {project.status}
            </span>
          </div>

          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white uppercase">
              {project.name}
            </h1>
            <p className="text-base sm:text-lg text-slate-300 font-light max-w-3xl">
              {project.description}
            </p>
          </div>

          <div className="flex items-center gap-6 pt-2 text-xs font-mono text-[#A1A1AA] flex-wrap">
            <div>
              <span className="text-[#71717A] uppercase">Last Updated:</span>{" "}
              <span className="text-white">{project.lastUpdated}</span>
            </div>
            <div>
              <span className="text-[#71717A] uppercase">Graph Connections:</span>{" "}
              <span className="text-[#D4FF00] font-bold">{project.connectionsCount} nodes</span>
            </div>
            <div>
              <span className="text-[#71717A] uppercase">Skills Deployed:</span>{" "}
              <span className="text-white">{project.skills.length}</span>
            </div>
          </div>
        </div>

        {/* Main Grid: Left Details & Right Mini Graph */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (Overview, Skills, Goals, Docs, Learning) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Highlights */}
            {project.highlights && (
              <div className="p-6 rounded-2xl border border-white/[0.08] bg-[#0A0D11] space-y-3">
                <h3 className="text-xs font-mono tracking-[0.2em] text-[#71717A] uppercase font-bold">
                  Key Architectural Highlights
                </h3>
                <div className="space-y-2">
                  {project.highlights.map((h, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <span className="text-[#D4FF00] mt-0.5">•</span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills Used */}
            <div className="p-6 rounded-2xl border border-white/[0.08] bg-[#0A0D11] space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-mono tracking-[0.2em] text-[#71717A] uppercase font-bold">
                  Skills & Technologies Deployed ({project.skills.length})
                </h3>
                <span className="text-[10px] font-mono text-[#71717A]">Click to inspect</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.skills.map((skillName, idx) => (
                  <button
                    key={idx}
                    onClick={() => openDrawer(skillName.toLowerCase().replace(/[^a-z0-9]/g, "-"))}
                    className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/10 hover:border-[#D4FF00]/40 hover:bg-white/[0.06] text-xs font-mono text-slate-200 transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span>{skillName}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Goals Connected */}
            <div className="p-6 rounded-2xl border border-white/[0.08] bg-[#0A0D11] space-y-4">
              <h3 className="text-xs font-mono tracking-[0.2em] text-[#71717A] uppercase font-bold">
                Connected Career Goals
              </h3>
              <div className="space-y-2.5">
                {project.goals.map((g, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border border-white/[0.05] bg-white/[0.02] flex items-center justify-between text-xs font-mono"
                  >
                    <div className="flex items-center gap-2 text-amber-300">
                      <Target className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>{g}</span>
                    </div>
                    <Link
                      href="/goals"
                      className="text-[#71717A] hover:text-white transition-colors"
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Attached Documents */}
            <div className="p-6 rounded-2xl border border-white/[0.08] bg-[#0A0D11] space-y-4">
              <h3 className="text-xs font-mono tracking-[0.2em] text-[#71717A] uppercase font-bold">
                Attached Research & Documentation
              </h3>
              {relatedDocs.length === 0 ? (
                <p className="text-xs text-slate-500 italic">No direct documents indexed for this project.</p>
              ) : (
                <div className="space-y-2">
                  {relatedDocs.map((doc) => (
                    <div
                      key={doc.id}
                      onClick={() => openDrawer(doc.id)}
                      className="p-3.5 rounded-xl border border-white/[0.05] bg-white/[0.02] hover:bg-white/[0.05] transition-all cursor-pointer flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <FileText className="w-4 h-4 text-purple-400 shrink-0" />
                        <span className="text-xs text-white font-medium truncate">{doc.title}</span>
                      </div>
                      <span className="text-[10px] font-mono text-[#71717A] uppercase shrink-0">
                        {doc.fileType}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Connected Learning */}
            <div className="p-6 rounded-2xl border border-white/[0.08] bg-[#0A0D11] space-y-4">
              <h3 className="text-xs font-mono tracking-[0.2em] text-[#71717A] uppercase font-bold">
                Connected Learning Tracks
              </h3>
              {relatedLearning.length === 0 ? (
                <p className="text-xs text-slate-500 italic">No curriculum specifically connected.</p>
              ) : (
                <div className="space-y-2">
                  {relatedLearning.map((l) => (
                    <div
                      key={l.id}
                      onClick={() => openDrawer(l.id)}
                      className="p-3.5 rounded-xl border border-white/[0.05] bg-white/[0.02] hover:bg-white/[0.05] transition-all cursor-pointer flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <GraduationCap className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span className="text-xs text-white font-medium truncate">{l.title}</span>
                      </div>
                      <span className="text-xs font-mono text-emerald-400 font-bold">
                        {l.progress}%
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Right Column (Mini Graph Preview, AI Insight, Activity) */}
          <div className="lg:col-span-5 space-y-8 sticky top-20">
            
            {/* Embedded Mini Knowledge Graph Preview */}
            <div className="p-6 rounded-2xl border border-white/[0.08] bg-[#0A0D11] space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#D4FF00] animate-pulse" />
                  <h3 className="text-xs font-mono tracking-[0.2em] text-white uppercase font-bold">
                    Project Topology Cluster
                  </h3>
                </div>
                <Link href={`/explore?focus=${project.id}`}>
                  <span className="text-[10px] font-mono text-[#D4FF00] hover:underline flex items-center gap-1">
                    <span>Full view</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </span>
                </Link>
              </div>

              <div className="w-full h-72 rounded-xl overflow-hidden border border-white/[0.06] bg-[#07090C] relative">
                <KnowledgeGraph
                  mini={true}
                  focusedNodeId={project.id}
                  onSelectNode={(id) => openDrawer(id)}
                />
              </div>
            </div>

            {/* AI Generated Insight Placeholder */}
            <div className="p-6 rounded-2xl border border-[#D4FF00]/25 bg-[#D4FF00]/[0.03] space-y-3 shadow-[0_0_30px_rgba(212,255,0,0.06)]">
              <div className="flex items-center gap-2 text-xs font-mono tracking-[0.2em] uppercase text-[#D4FF00] font-bold">
                <Sparkles className="w-4 h-4" />
                <span>AI Synergy Analysis</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                {project.aiInsight}
              </p>
              <div className="pt-2">
                <Link
                  href={`/ask?q=How does ${encodeURIComponent(project.name)} synergize with my other active projects?`}
                >
                  <Button variant="secondary" size="sm" className="w-full justify-between text-xs">
                    <span>Query Knowledge Assistant</span>
                    <ArrowRight className="w-3 h-3 text-[#D4FF00]" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Activity for this project */}
            <div className="p-6 rounded-2xl border border-white/[0.08] bg-[#0A0D11] space-y-3">
              <h3 className="text-xs font-mono tracking-[0.2em] text-[#71717A] uppercase font-bold">
                Project Activity Log
              </h3>
              {projectActivities.length === 0 ? (
                <p className="text-xs text-slate-500 italic">No recorded activity this week.</p>
              ) : (
                <div className="space-y-2">
                  {projectActivities.map((act) => (
                    <div
                      key={act.id}
                      className="p-3 rounded-lg border border-white/[0.04] bg-white/[0.015] space-y-1"
                    >
                      <div className="flex items-center justify-between text-[11px] font-mono">
                        <span className="text-white font-medium">{act.title}</span>
                        <span className="text-[#71717A]">{act.timestamp}</span>
                      </div>
                      <p className="text-[11px] text-slate-400">{act.details}</p>
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
