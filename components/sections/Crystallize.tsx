"use client";

import React from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Radio, Cpu, Sparkles, CheckCircle2 } from "lucide-react";

export function Crystallize() {
  const steps = [
    {
      step: "01",
      title: "Capture & Ingest",
      subtitle: "Zero friction ingestion",
      description:
        "Stream unorganized markdown notes, repository commits, PDF annotations, and meeting transcripts into LifeGraph. Zero manual filing needed.",
      icon: Radio,
      details: ["Markdown & Obsidian Sync", "GitHub Pull Request Ingestion", "Local PDF & Browser Clips"],
    },
    {
      step: "02",
      title: "Semantic Synthesis",
      subtitle: "Autonomous link generation",
      description:
        "Vector engines continuously scan your personal corpus, discovering associative bridges across disparate projects and clustering core competencies.",
      icon: Cpu,
      details: ["High-Dimensional Vector Projections", "Autonomous Semantic Edges", "Cross-Domain Affinity Matrix"],
    },
    {
      step: "03",
      title: "Act & Evolve",
      subtitle: "Governed cognitive expansion",
      description:
        "Traverse your living 3D knowledge landscape. Spot gaps in execution, govern active goals, and navigate directly into actionable code or writings.",
      icon: Sparkles,
      details: ["Interactive 3D Force Graph", "Skill Velocity & Mastery Index", "Contextual Query Recall"],
    },
  ];

  return (
    <section id="crystallize" className="py-32 px-6 sm:px-10 lg:px-16 relative z-10 max-w-7xl mx-auto pointer-events-none">
      <div className="text-left max-w-2xl mb-16 pointer-events-auto">
        <Badge variant="lime" dot className="mb-4">
          EVOLUTION PROCESS
        </Badge>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.08]">
          How your universe{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#D4FF00]">
            crystallizes.
          </span>
        </h2>
        <p className="mt-4 text-base sm:text-lg text-slate-400 font-normal leading-relaxed">
          From messy chaotic inputs to an enlightened, navigable 3D mental topology.
        </p>
      </div>

      {/* Asymmetric composition: 3 Evolutionary steps on left; 3D Model on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Column: 3 Evolution Cards */}
        <div className="lg:col-span-7 flex flex-col gap-6 pointer-events-auto">
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.step}
                className="group relative bg-[#0B0E11]/85 backdrop-blur-xl p-7 border border-white/[0.08] hover:border-[#D4FF00]/40 transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#D4FF00]/10 border border-[#D4FF00]/30 text-[#D4FF00] flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-wider text-[#D4FF00]">
                        {item.subtitle}
                      </div>
                      <h3 className="text-xl font-bold tracking-tight text-white">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                  <span className="text-2xl font-black font-mono text-white/20 group-hover:text-[#D4FF00]/60 transition-colors">
                    {item.step}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal mb-5">
                  {item.description}
                </p>

                <div className="pt-4 border-t border-white/5 flex flex-wrap gap-4">
                  {item.details.map((detail) => (
                    <div
                      key={detail}
                      className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400 group-hover:text-slate-300 transition-colors"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D4FF00] shrink-0" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Right Column: Space reserved for 3D model */}
        <div className="hidden lg:block lg:col-span-5 h-[520px] pointer-events-none relative" />
      </div>
    </section>
  );
}
