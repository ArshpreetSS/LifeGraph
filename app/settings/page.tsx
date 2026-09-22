"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/app/AppShell";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import {
  Settings as SettingsIcon,
  Moon,
  Bell,
  Network,
  Sparkles,
  Database,
  User,
  CheckCircle2,
  Download,
  Trash2
} from "lucide-react";

import {
  GRAPH_NODES,
  GRAPH_EDGES,
  MOCK_PROJECTS,
  MOCK_SKILLS,
  MOCK_GOALS,
  MOCK_DOCUMENTS,
  MOCK_LEARNING
} from "@/lib/mockData";

export default function SettingsPage() {
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<string>("appearance");
  const [themeMode, setThemeMode] = useState<string>("dark-cinematic");
  const [enablePhysics, setEnablePhysics] = useState(true);
  const [pulseEffects, setPulseEffects] = useState(true);
  const [aiAutoSynthesis, setAiAutoSynthesis] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleSave = () => {
    showToast("Preferences saved to local state.", "lime");
  };

  const handleExportData = () => {
    const exportPayload = {
      schemaVersion: "1.0.0",
      exportedAt: new Date().toISOString(),
      user: {
        name: "Arshpreet Singh",
        workspace: "Director Mindspace"
      },
      stats: {
        totalNodes: GRAPH_NODES.length,
        totalEdges: GRAPH_EDGES.length,
        projectsCount: MOCK_PROJECTS.length,
        skillsCount: MOCK_SKILLS.length,
        goalsCount: MOCK_GOALS.length,
        documentsCount: MOCK_DOCUMENTS.length,
        learningCount: MOCK_LEARNING.length
      },
      nodes: GRAPH_NODES,
      edges: GRAPH_EDGES,
      projects: MOCK_PROJECTS,
      skills: MOCK_SKILLS,
      goals: MOCK_GOALS,
      documents: MOCK_DOCUMENTS,
      learning: MOCK_LEARNING
    };

    const blob = new Blob([JSON.stringify(exportPayload, null, 2)], {
      type: "application/json"
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `lifegraph-topology-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showToast("Downloaded complete LifeGraph topology JSON file.", "lime");
  };

  return (
    <AppShell>
      <div className="p-6 sm:p-10 space-y-8 max-w-5xl mx-auto w-full">
        
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[11px] font-mono tracking-[0.25em] text-[#71717A] uppercase">
            <span>PREFERENCES</span>
            <span>•</span>
            <span className="text-[#D4FF00]">CONFIGURATION</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase">
            System Settings
          </h1>
          <p className="text-sm sm:text-base text-slate-400 font-light">
            Adjust visual density, graph physics, AI inference parameters, and personal export schemas.
          </p>
        </div>

        {/* Settings Navigation Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pt-2">
          
          {/* Settings Tab Sidebar */}
          <div className="md:col-span-4 space-y-1">
            {[
              { id: "appearance", label: "Appearance & Theme", icon: Moon },
              { id: "graph", label: "Graph Physics", icon: Network },
              { id: "ai", label: "AI Synthesis", icon: Sparkles },
              { id: "notifications", label: "Notifications", icon: Bell },
              { id: "data", label: "Data & Export", icon: Database },
              { id: "account", label: "Account Profile", icon: User }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? "bg-white/[0.08] text-white font-semibold shadow-inner"
                      : "text-[#A1A1AA] hover:text-white hover:bg-white/[0.03]"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${activeTab === tab.id ? "text-[#D4FF00]" : "text-[#71717A]"}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Settings Form Body */}
          <div className="md:col-span-8 p-6 sm:p-8 rounded-2xl border border-white/[0.08] bg-[#0A0D11] space-y-6">
            
            {/* Appearance */}
            {activeTab === "appearance" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-white tracking-tight">Appearance & Theme</h2>
                  <p className="text-xs text-slate-400">Configure your digital workspace color system.</p>
                </div>

                <div className="space-y-3">
                  <span className="text-xs font-mono text-[#71717A] uppercase">Active Palette</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div
                      onClick={() => setThemeMode("dark-cinematic")}
                      className={`p-4 rounded-xl border cursor-pointer space-y-1.5 transition-all ${
                        themeMode === "dark-cinematic"
                          ? "bg-[#D4FF00]/[0.04] border-[#D4FF00]/40"
                          : "bg-white/[0.02] border-white/10"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-white font-semibold">Cinematic Midnight</span>
                        {themeMode === "dark-cinematic" && (
                          <span className="w-2 h-2 rounded-full bg-[#D4FF00]" />
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400">
                        Obsidian black with subtle LifeGraph lime glow accents.
                      </p>
                    </div>

                    <div
                      onClick={() => setThemeMode("deep-graphite")}
                      className={`p-4 rounded-xl border cursor-pointer space-y-1.5 transition-all ${
                        themeMode === "deep-graphite"
                          ? "bg-cyan-500/[0.04] border-cyan-500/40"
                          : "bg-white/[0.02] border-white/10"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-white font-semibold">Deep Graphite</span>
                        {themeMode === "deep-graphite" && (
                          <span className="w-2 h-2 rounded-full bg-cyan-400" />
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400">
                        Charcoal surfaces with cyan electric accents.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Graph Physics */}
            {activeTab === "graph" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-white tracking-tight">Graph Preferences</h2>
                  <p className="text-xs text-slate-400">Adjust knowledge simulation and rendering behavior.</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                    <div>
                      <div className="text-xs font-mono text-white font-semibold">Active Spring Physics</div>
                      <p className="text-[11px] text-slate-400">Nodes dynamically float and adjust based on relational gravity.</p>
                    </div>
                    <button
                      onClick={() => setEnablePhysics(!enablePhysics)}
                      className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                        enablePhysics ? "bg-[#D4FF00]" : "bg-white/20"
                      }`}
                    >
                      <span
                        className={`block w-4 h-4 rounded-full bg-black transition-transform absolute top-1 ${
                          enablePhysics ? "left-6" : "left-1"
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                    <div>
                      <div className="text-xs font-mono text-white font-semibold">Particle Edge Energy Flows</div>
                      <p className="text-[11px] text-slate-400">Animate small pulses along high-strength knowledge connections.</p>
                    </div>
                    <button
                      onClick={() => setPulseEffects(!pulseEffects)}
                      className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                        pulseEffects ? "bg-[#D4FF00]" : "bg-white/20"
                      }`}
                    >
                      <span
                        className={`block w-4 h-4 rounded-full bg-black transition-transform absolute top-1 ${
                          pulseEffects ? "left-6" : "left-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* AI Preferences */}
            {activeTab === "ai" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-white tracking-tight">AI & Synthesis Preferences</h2>
                  <p className="text-xs text-slate-400">Control automated knowledge graph pattern discovery.</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                    <div>
                      <div className="text-xs font-mono text-white font-semibold">Autonomous Synergy Detection</div>
                      <p className="text-[11px] text-slate-400">Suggest cross-domain bridges between projects and skills.</p>
                    </div>
                    <button
                      onClick={() => setAiAutoSynthesis(!aiAutoSynthesis)}
                      className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                        aiAutoSynthesis ? "bg-[#D4FF00]" : "bg-white/20"
                      }`}
                    >
                      <span
                        className={`block w-4 h-4 rounded-full bg-black transition-transform absolute top-1 ${
                          aiAutoSynthesis ? "left-6" : "left-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications */}
            {activeTab === "notifications" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-white tracking-tight">Notifications</h2>
                  <p className="text-xs text-slate-400">Manage toast and milestone alerts.</p>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <div>
                    <div className="text-xs font-mono text-white font-semibold">Knowledge Evolution Toasts</div>
                    <p className="text-[11px] text-slate-400">Display subtle notifications when new items or connections are mapped.</p>
                  </div>
                  <button
                    onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                    className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                      notificationsEnabled ? "bg-[#D4FF00]" : "bg-white/20"
                    }`}
                  >
                    <span
                      className={`block w-4 h-4 rounded-full bg-black transition-transform absolute top-1 ${
                        notificationsEnabled ? "left-6" : "left-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            )}

            {/* Data & Export */}
            {activeTab === "data" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-white tracking-tight">Data Management</h2>
                  <p className="text-xs text-slate-400">Export or backup your personal knowledge graph.</p>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="text-xs font-mono text-white font-semibold">Export JSON Graph Topology</div>
                    <p className="text-[11px] text-slate-400">42 nodes and 26 relational edges ready for backup or migration.</p>
                  </div>
                  <Button variant="secondary" size="sm" onClick={handleExportData}>
                    <Download className="w-3.5 h-3.5 mr-1.5" />
                    <span>Export</span>
                  </Button>
                </div>
              </div>
            )}

            {/* Account */}
            {activeTab === "account" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-white tracking-tight">Account Identity</h2>
                  <p className="text-xs text-slate-400">Personal operating workspace details.</p>
                </div>

                <div className="space-y-3 text-xs font-mono">
                  <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.06] flex items-center justify-between">
                    <span className="text-[#71717A]">Name</span>
                    <span className="text-white">Arshpreet Singh</span>
                  </div>
                  <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.06] flex items-center justify-between">
                    <span className="text-[#71717A]">Workspace</span>
                    <span className="text-white">Director Mindspace</span>
                  </div>
                </div>
              </div>
            )}

            {/* Save Buttons */}
            <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
              <span className="text-[10px] font-mono text-[#71717A]">
                Settings sync automatically with your local workspace.
              </span>
              <Button variant="lime" size="sm" onClick={handleSave}>
                <span>Save Preferences</span>
              </Button>
            </div>

          </div>

        </div>

      </div>
    </AppShell>
  );
}
