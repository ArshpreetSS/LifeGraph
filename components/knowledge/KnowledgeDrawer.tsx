"use client";

import React from "react";
import Link from "next/link";
import { X, ArrowUpRight, Sparkles, Network, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  GRAPH_NODES,
  GRAPH_EDGES,
  getProjectById,
  getSkillById,
  getGoalById,
  getDocumentById,
  getLearningById,
  EntityType
} from "@/lib/mockData";

interface KnowledgeDrawerProps {
  nodeId: string | null;
  onClose: () => void;
  onSelectNode?: (nodeId: string) => void;
}

export function KnowledgeDrawer({ nodeId, onClose, onSelectNode }: KnowledgeDrawerProps) {
  if (!nodeId) return null;

  // Find general graph node
  const graphNode = GRAPH_NODES.find((n) => n.id === nodeId);
  
  // Find specific entity if available
  const project = getProjectById(nodeId);
  const skill = getSkillById(nodeId);
  const goal = getGoalById(nodeId);
  const document = getDocumentById(nodeId);
  const learning = getLearningById(nodeId);

  const effectiveId = project?.id || skill?.id || goal?.id || document?.id || learning?.id || graphNode?.id || nodeId;

  // Compute connected nodes from edges
  const connectedNodeIds = new Set<string>();
  GRAPH_EDGES.forEach((edge) => {
    if (edge.source === nodeId || edge.source === effectiveId) connectedNodeIds.add(edge.target);
    if (edge.target === nodeId || edge.target === effectiveId) connectedNodeIds.add(edge.source);
  });
  const connectedNodes = GRAPH_NODES.filter((n) => connectedNodeIds.has(n.id) && n.id !== effectiveId);

  // Determine entity metadata
  const entityType: EntityType =
    (graphNode?.type as EntityType) ||
    (project ? "PROJECT" : skill ? "SKILL" : goal ? "GOAL" : document ? "DOCUMENT" : learning ? "LEARNING" : "SKILL");

  const title =
    project?.name ||
    skill?.name ||
    goal?.title ||
    document?.title ||
    learning?.title ||
    graphNode?.name ||
    nodeId;

  const subtitle =
    project?.category ||
    skill?.category ||
    (goal ? `Target: ${goal.targetQuarter}` : null) ||
    (document ? `${document.fileType} • ${document.fileSize}` : null) ||
    learning?.platform ||
    graphNode?.group;

  const description =
    project?.description ||
    skill?.description ||
    goal?.description ||
    document?.summary ||
    (learning?.status === "recommended" ? learning.recommendationReason : `Curriculum tracking ${learning?.progress || 0}% completed`) ||
    "Connected knowledge element in your active cognitive graph.";

  return (
    <div className="fixed inset-0 z-50 overflow-hidden pointer-events-auto">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0A0D10] border-l border-white/10 shadow-2xl flex flex-col justify-between text-[#F5F5F7] animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-6 border-b border-white/[0.08] flex items-start justify-between gap-4 bg-[#0D1014]/60">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge entityType={entityType}>{entityType}</Badge>
                {subtitle && (
                  <span className="text-[11px] font-mono text-[#71717A] tracking-wider uppercase">
                    {subtitle}
                  </span>
                )}
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-tight">
                {title}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#71717A] hover:text-white hover:bg-white/[0.06] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* Description */}
            <div className="space-y-2">
              <h3 className="text-[11px] font-mono tracking-[0.2em] text-[#71717A] uppercase">
                Overview
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-normal">
                {description}
              </p>
            </div>

            {/* Entity Specific Highlights */}
            {project && (
              <div className="space-y-3 bg-white/[0.02] border border-white/[0.06] p-4 rounded-xl">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#71717A] uppercase">Status</span>
                  <span className="text-[#D4FF00] font-semibold">{project.status}</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#71717A] uppercase">Last Updated</span>
                  <span className="text-slate-300">{project.lastUpdated}</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#71717A] uppercase">Connections</span>
                  <span className="text-[#D4FF00]">{project.connectionsCount} nodes</span>
                </div>

                {project.highlights && project.highlights.length > 0 && (
                  <div className="pt-2 border-t border-white/[0.06] space-y-1.5">
                    <span className="text-[10px] font-mono tracking-wider text-[#71717A] uppercase">Key Highlights</span>
                    {project.highlights.map((h, i) => (
                      <div key={i} className="text-xs text-slate-400 flex items-start gap-1.5">
                        <span className="text-[#D4FF00] mt-0.5">•</span>
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {skill && (
              <div className="space-y-3 bg-white/[0.02] border border-white/[0.06] p-4 rounded-xl">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#71717A] uppercase">Proficiency</span>
                  <span className="text-cyan-400 font-semibold">{skill.level}</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#71717A] uppercase">Experience</span>
                  <span className="text-slate-300">{skill.yearsExp}</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#71717A] uppercase">Projects Using</span>
                  <span className="text-white">{skill.projects.length} active</span>
                </div>
              </div>
            )}

            {goal && (
              <div className="space-y-3 bg-white/[0.02] border border-white/[0.06] p-4 rounded-xl">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#71717A] uppercase">Quarter Target</span>
                  <span className="text-amber-400 font-semibold">{goal.targetQuarter}</span>
                </div>
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#71717A]">Progress</span>
                    <span className="text-white font-bold">{goal.progress}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-amber-400 h-1.5 rounded-full transition-all duration-500"
                      style={{ width: `${goal.progress}%` }}
                    />
                  </div>
                </div>
                <div className="text-xs text-slate-400 pt-1">
                  <span className="text-[#71717A] font-mono uppercase text-[10px] block">Recent Milestone:</span>
                  {goal.recentMilestone}
                </div>
              </div>
            )}

            {document && (
              <div className="space-y-3 bg-white/[0.02] border border-white/[0.06] p-4 rounded-xl">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#71717A] uppercase">File Format</span>
                  <span className="text-purple-300">{document.fileType}</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#71717A] uppercase">Upload Date</span>
                  <span className="text-slate-300">{document.date}</span>
                </div>
                {document.extractedConcepts && (
                  <div className="pt-2 border-t border-white/[0.06]">
                    <span className="text-[10px] font-mono tracking-wider text-[#71717A] uppercase block mb-1.5">
                      Extracted Concepts
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {document.extractedConcepts.map((c, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[10px] font-mono">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {learning && (
              <div className="space-y-3 bg-white/[0.02] border border-white/[0.06] p-4 rounded-xl">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#71717A] uppercase">Platform</span>
                  <span className="text-slate-300">{learning.platform}</span>
                </div>
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#71717A]">Completion</span>
                    <span className="text-emerald-400 font-bold">{learning.progress}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-emerald-400 h-1.5 rounded-full transition-all duration-500"
                      style={{ width: `${learning.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Connected Knowledge Nodes */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-[11px] font-mono tracking-[0.2em] text-[#71717A] uppercase">
                  Connected Nodes ({connectedNodes.length})
                </h3>
                <span className="text-[10px] font-mono text-[#D4FF00]">Interactive</span>
              </div>

              {connectedNodes.length === 0 ? (
                <p className="text-xs text-slate-500 italic">No direct connections mapped.</p>
              ) : (
                <div className="grid grid-cols-1 gap-2">
                  {connectedNodes.map((cn) => (
                    <button
                      key={cn.id}
                      onClick={() => onSelectNode ? onSelectNode(cn.id) : null}
                      className="w-full flex items-center justify-between p-2.5 rounded-lg border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/20 transition-all text-left group"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D4FF00] opacity-80" />
                        <span className="text-xs text-slate-200 group-hover:text-white font-medium truncate">
                          {cn.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge entityType={cn.type} className="text-[9px] py-0 px-1.5">
                          {cn.type}
                        </Badge>
                        <ArrowRight className="w-3.5 h-3.5 text-[#71717A] group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* AI Context Snippet */}
            <div className="p-3.5 rounded-xl border border-[#D4FF00]/20 bg-[#D4FF00]/[0.03] space-y-1.5">
              <div className="flex items-center gap-1.5 text-[10px] font-mono tracking-wider uppercase text-[#D4FF00]">
                <Sparkles className="w-3 h-3" />
                <span>LifeGraph Synthesis</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {project?.aiInsight ||
                  `This ${entityType.toLowerCase()} holds ${connectedNodes.length} direct relational edges. Strengthening this node reinforces your knowledge topology across active domains.`}
              </p>
            </div>

          </div>

          {/* Footer Actions */}
          <div className="p-6 border-t border-white/[0.08] bg-[#0D1014]/80 flex flex-col gap-2.5">
            {project && (
              <Link href={`/projects/${project.id}`} onClick={onClose}>
                <Button variant="lime" className="w-full justify-between">
                  <span>View Project Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            )}

            <Link href={`/explore?focus=${nodeId}`} onClick={onClose}>
              <Button variant="secondary" className="w-full justify-between">
                <span className="flex items-center gap-2">
                  <Network className="w-3.5 h-3.5 text-[#D4FF00]" />
                  <span>Explore in Knowledge Graph</span>
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#71717A]" />
              </Button>
            </Link>

            <Link
              href={`/ask?q=What connects ${encodeURIComponent(title)} to my other projects and goals?`}
              onClick={onClose}
            >
              <Button variant="outline" className="w-full justify-between">
                <span className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Ask AI About This Node</span>
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-[#71717A]" />
              </Button>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
