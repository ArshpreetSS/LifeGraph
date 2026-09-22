"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AppShell, useAppShell } from "@/components/app/AppShell";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Sparkles,
  ArrowRight,
  Network,
  CornerDownLeft,
  Search,
  MessageSquareCode,
  Layers,
  Cpu,
  Compass,
  ArrowUpRight
} from "lucide-react";

interface AIAnswer {
  question: string;
  explanation: string;
  pathNodes: string[];
  relatedProjects: string[];
  relatedSkills: string[];
  suggestedFocusId: string;
}

function AskInterface() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const { openDrawer } = useAppShell();

  const [inputQuery, setInputQuery] = useState(initialQuery);
  const [activeAnswer, setActiveAnswer] = useState<AIAnswer | null>(null);
  const [isSynthesizing, setIsSynthesizing] = useState(false);

  const suggestedQuestions = [
    "What connects my current projects to my AI goals?",
    "What skills am I using most?",
    "What should I learn next?",
    "Which projects are connected to computer vision?",
    "What knowledge gaps do I have?",
    "How are my projects connected?"
  ];

  const handleAsk = (queryToAsk: string) => {
    if (!queryToAsk.trim()) return;
    setInputQuery(queryToAsk);
    setIsSynthesizing(true);
    setActiveAnswer(null);

    // Realistic synthesis timeout simulation
    setTimeout(() => {
      const q = queryToAsk.toLowerCase();

      let answer: AIAnswer;

      if (q.includes("computer vision") || q.includes("drone") || q.includes("vision")) {
        answer = {
          question: queryToAsk,
          explanation:
            "Your computer vision cluster is anchored in aerial photogrammetry and real-time edge processing. Drone 3D leverages Structure-from-Motion (SfM) for 3D coordinate estimation, while Smart ANPR leverages custom YOLOv11 for sub-50ms plate localization.",
          pathNodes: ["Python", "Computer Vision", "PyTorch", "Drone 3D", "Smart ANPR"],
          relatedProjects: ["Drone 3D Reconstruction", "Smart Number Plate & Boom Barrier"],
          relatedSkills: ["Computer Vision", "PyTorch", "Python"],
          suggestedFocusId: "computer-vision"
        };
      } else if (q.includes("learn next") || q.includes("recommend") || q.includes("study")) {
        answer = {
          question: queryToAsk,
          explanation:
            "Based on your active development in LifeGraph and Drone 3D, the two highest-yield study tracks are React Three Fiber (R3F) and Vector Embeddings. R3F will streamline your declarative 3D canvas architectures, and Embeddings will unlock local semantic retrieval in Jarvis.",
          pathNodes: ["React", "Three.js", "React Three Fiber", "Vector Embeddings", "RAG Mastery"],
          relatedProjects: ["LifeGraph", "Jarvis Autonomous Assistant"],
          relatedSkills: ["Three.js", "React", "RAG & Embeddings"],
          suggestedFocusId: "learn-embeddings"
        };
      } else if (q.includes("most") || q.includes("skills")) {
        answer = {
          question: queryToAsk,
          explanation:
            "Python and Three.js form your highest-density core. Python connects 4 active systems across machine learning and systems automation, while Three.js powers your spatial UI in LifeGraph and 3D gameplay simulations.",
          pathNodes: ["Python (15 edges)", "Three.js (11 edges)", "Machine Learning (14 edges)"],
          relatedProjects: ["LifeGraph", "Drone 3D Reconstruction", "Smart Number Plate", "Jarvis"],
          relatedSkills: ["Python", "Three.js", "Machine Learning"],
          suggestedFocusId: "python"
        };
      } else if (q.includes("gap") || q.includes("missing")) {
        answer = {
          question: queryToAsk,
          explanation:
            "Your architecture graph reveals strong algorithmic depth in PyTorch and Three.js, but minimal documented artifacts around production model deployment (e.g. TensorRT, ONNX runtime benchmarks, or containerized vector index hosting).",
          pathNodes: ["PyTorch", "Machine Learning", "Deployment Blindspot", "Benchmarking Notes"],
          relatedProjects: ["Smart Number Plate & Boom Barrier", "Jarvis Autonomous Assistant"],
          relatedSkills: ["PyTorch", "Git & DevOps"],
          suggestedFocusId: "ins-3"
        };
      } else {
        // Default rich answer
        answer = {
          question: queryToAsk,
          explanation:
            "Your personal knowledge topology currently converges through a central Python and Machine Learning axis. This axis simultaneously branches into spatial graphics (Three.js & WebGL) and autonomous intelligence loops.",
          pathNodes: ["Python", "Machine Learning", "Computer Vision", "Drone 3D", "LifeGraph"],
          relatedProjects: ["LifeGraph", "Drone 3D Reconstruction"],
          relatedSkills: ["Python", "Machine Learning", "Three.js"],
          suggestedFocusId: "lifegraph"
        };
      }

      setActiveAnswer(answer);
      setIsSynthesizing(false);
    }, 450);
  };

  useEffect(() => {
    if (initialQuery) {
      handleAsk(initialQuery);
    }
  }, [initialQuery]);

  return (
    <div className="p-6 sm:p-10 space-y-10 max-w-5xl mx-auto w-full">
      
      {/* Editorial Header */}
      <div className="space-y-2 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 text-[11px] font-mono tracking-[0.25em] text-[#D4FF00] uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          <span>COGNITIVE DIALOGUE</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white uppercase">
          Ask Your Knowledge.
        </h1>
        <p className="text-sm sm:text-base text-slate-400 font-light">
          Query relationships, trajectories, and dormant connections across everything you&apos;ve built, learned, and documented.
        </p>
      </div>

      {/* Query Bar */}
      <div className="relative max-w-3xl mx-auto">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAsk(inputQuery);
          }}
          className="relative flex items-center rounded-2xl bg-[#0A0D12] border border-white/15 p-2 sm:p-2.5 shadow-2xl focus-within:border-[#D4FF00]/50 transition-all group"
        >
          <div className="p-2 sm:p-3 text-[#71717A] group-focus-within:text-[#D4FF00] transition-colors">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Ask about your skills, project connections, or knowledge gaps..."
            className="w-full bg-transparent text-sm sm:text-base text-white placeholder-[#71717A] focus:outline-hidden px-2"
          />
          <Button
            type="submit"
            variant="lime"
            size="sm"
            disabled={!inputQuery.trim() || isSynthesizing}
            className="shrink-0"
          >
            <span>Ask</span>
            <CornerDownLeft className="w-3.5 h-3.5" />
          </Button>
        </form>

        {/* Suggested Queries */}
        <div className="pt-4 flex items-center justify-center flex-wrap gap-2">
          <span className="text-[10px] font-mono uppercase text-[#71717A] mr-1">
            Try asking:
          </span>
          {suggestedQuestions.map((sq, idx) => (
            <button
              key={idx}
              onClick={() => handleAsk(sq)}
              className="px-2.5 py-1 rounded-full bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.06] hover:border-white/20 text-[11px] font-mono text-slate-300 transition-all cursor-pointer"
            >
              {sq}
            </button>
          ))}
        </div>
      </div>

      {/* Synthesizing Loading State */}
      {isSynthesizing && (
        <div className="max-w-3xl mx-auto p-12 text-center space-y-3 animate-pulse">
          <div className="w-6 h-6 rounded-full bg-[#D4FF00] mx-auto animate-ping opacity-75" />
          <div className="text-xs font-mono tracking-widest text-[#D4FF00] uppercase">
            Traversing knowledge topology...
          </div>
        </div>
      )}

      {/* Synthesized Answer Display */}
      {activeAnswer && !isSynthesizing && (
        <div className="max-w-3xl mx-auto rounded-2xl border border-white/[0.1] bg-[#0A0D11] p-6 sm:p-8 space-y-6 shadow-2xl animate-in fade-in slide-in-from-bottom-3 duration-300">
          
          <div className="space-y-2 border-b border-white/[0.08] pb-4">
            <span className="text-[10px] font-mono tracking-wider uppercase text-[#71717A]">
              Synthesized Query
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              &quot;{activeAnswer.question}&quot;
            </h2>
          </div>

          {/* Explanation */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#D4FF00] block">
              Knowledge Synthesis
            </span>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-light">
              {activeAnswer.explanation}
            </p>
          </div>

          {/* Step-by-Step Relational Path */}
          <div className="space-y-2.5 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#71717A] block">
              Relational Knowledge Flow
            </span>
            <div className="flex items-center gap-2 flex-wrap text-xs font-mono text-white">
              {activeAnswer.pathNodes.map((step, idx) => (
                <React.Fragment key={idx}>
                  <span className="px-2.5 py-1 rounded bg-[#D4FF00]/10 border border-[#D4FF00]/25 text-[#D4FF00]">
                    {step}
                  </span>
                  {idx < activeAnswer.pathNodes.length - 1 && (
                    <span className="text-[#71717A]">→</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Connected Entities Array */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1 text-xs font-mono">
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] space-y-1.5">
              <span className="text-[10px] uppercase text-[#71717A] block">
                Related Projects
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeAnswer.relatedProjects.map((p, idx) => (
                  <span key={idx} className="text-slate-200">
                    {p}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] space-y-1.5">
              <span className="text-[10px] uppercase text-[#71717A] block">
                Related Skills
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeAnswer.relatedSkills.map((s, idx) => (
                  <span key={idx} className="text-cyan-300">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              href={`/explore?focus=${activeAnswer.suggestedFocusId}`}
              className="w-full sm:w-auto"
            >
              <Button variant="lime" size="sm" className="w-full sm:w-auto justify-between text-xs">
                <span className="flex items-center gap-2">
                  <Network className="w-3.5 h-3.5" />
                  <span>Explore this connection in graph</span>
                </span>
                <ArrowRight className="w-3.5 h-3.5 ml-2" />
              </Button>
            </Link>

            <Button
              variant="outline"
              size="sm"
              className="w-full sm:w-auto text-xs"
              onClick={() => openDrawer(activeAnswer.suggestedFocusId)}
            >
              <span>Inspect Focus Node</span>
            </Button>
          </div>

        </div>
      )}

    </div>
  );
}

export default function AskPage() {
  return (
    <AppShell>
      <Suspense fallback={<div className="p-10 text-xs font-mono text-[#71717A]">Initializing assistant...</div>}>
        <AskInterface />
      </Suspense>
    </AppShell>
  );
}
