"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { GitBranch, FileText, BookOpen, MessageSquare, Layers, Sliders } from "lucide-react";

export function Integrations() {
  const [activeToggles, setActiveToggles] = useState<Record<string, boolean>>({
    github: true,
    notion: true,
    obsidian: true,
    readwise: true,
    slack: false,
    linear: true,
  });

  const toggleIntegration = (key: string) => {
    setActiveToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const integrations = [
    {
      id: "github",
      name: "GitHub",
      category: "CODE & VCS",
      description: "Repositories, pull requests, commit messages, and readmes automatically linked to project nodes.",
      icon: GitBranch,
      nodesCount: "3,410 Nodes",
    },
    {
      id: "notion",
      name: "Notion",
      category: "WORKSPACE",
      description: "Bidirectional sync of docs, project roadmaps, and nested knowledge wikis into topological clusters.",
      icon: FileText,
      nodesCount: "8,920 Nodes",
    },
    {
      id: "obsidian",
      name: "Obsidian",
      category: "LOCAL VAULT",
      description: "Local-first markdown files, frontmatter tags, and wikilinks mapped into high-speed vector space.",
      icon: Layers,
      nodesCount: "14,180 Nodes",
    },
    {
      id: "readwise",
      name: "Readwise",
      category: "LITERATURE",
      description: "Kindle highlights, research papers, tweets, and articles extracted into searchable thought nodes.",
      icon: BookOpen,
      nodesCount: "6,230 Nodes",
    },
    {
      id: "slack",
      name: "Slack & Discord",
      category: "COMMUNICATION",
      description: "Capture critical engineering decisions, discussions, and architectural breakthroughs on the fly.",
      icon: MessageSquare,
      nodesCount: "1,840 Nodes",
    },
    {
      id: "linear",
      name: "Linear",
      category: "PROJECT TRACKING",
      description: "Sprint velocity, issue states, and project milestones tied straight into your Growth Governance dashboard.",
      icon: Sliders,
      nodesCount: "4,100 Nodes",
    },
  ];

  return (
    <section id="integrations" className="py-28 px-6 relative z-10 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-20">
        <Badge variant="cyan" dot className="mb-4">
          ECOSYSTEM SYNC
        </Badge>
        <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white">
          Integrate your{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-[#00F0FF]">
            knowledge.
          </span>
        </h2>
        <p className="mt-4 text-base text-slate-400 font-normal leading-relaxed">
          Connect the tools you already create and research in. LifeGraph federates them into one living, queryable reality.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrations.map((item) => {
          const Icon = item.icon;
          const isActive = activeToggles[item.id];

          return (
            <Card
              key={item.id}
              className={`p-6 transition-all duration-300 ${
                isActive
                  ? "bg-[#0C0F13]/90 border-white/[0.12]"
                  : "bg-[#080A0D]/60 border-white/[0.04] opacity-65"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white tracking-tight">{item.name}</h3>
                    <span className="text-[10px] font-mono text-slate-500 uppercase">{item.category}</span>
                  </div>
                </div>

                <button
                  onClick={() => toggleIntegration(item.id)}
                  className={`px-3 py-1 rounded-full text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? "bg-[#D4FF00]/15 text-[#D4FF00] border border-[#D4FF00]/40 shadow-[0_0_12px_rgba(212,255,0,0.15)]"
                      : "bg-white/5 text-slate-500 border border-white/10 hover:text-white"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isActive ? "bg-[#D4FF00] animate-pulse" : "bg-slate-600"
                    }`}
                  />
                  {isActive ? "SYNCED" : "CONNECT"}
                </button>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed font-normal mb-4">
                {item.description}
              </p>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono">
                <span className="text-slate-500">ACTIVE FOOTPRINT</span>
                <span className={isActive ? "text-[#D4FF00]" : "text-slate-600"}>
                  {isActive ? item.nodesCount : "0 Nodes"}
                </span>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
