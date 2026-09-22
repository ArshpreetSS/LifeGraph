"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AppShell, useAppShell } from "@/components/app/AppShell";
import { MOCK_DOCUMENTS, DocumentItem } from "@/lib/mockData";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import {
  FileText,
  ArrowRight,
  Sparkles,
  Network,
  Upload,
  CheckCircle2,
  X,
  Eye,
  FileCode,
  FileCheck,
  Layers
} from "lucide-react";

export default function DocumentsPage() {
  const { openDrawer } = useAppShell();
  const { showToast } = useToast();
  const [activePreviewDoc, setActivePreviewDoc] = useState<DocumentItem | null>(null);
  const [docsList, setDocsList] = useState<DocumentItem[]>(MOCK_DOCUMENTS);

  const handleAddToGraph = (docId: string) => {
    setDocsList((prev) =>
      prev.map((d) => (d.id === docId ? { ...d, addedToGraph: true } : d))
    );
    showToast("Document connected into knowledge graph with 5 extracted entities", "lime");
    if (activePreviewDoc && activePreviewDoc.id === docId) {
      setActivePreviewDoc((prev) => (prev ? { ...prev, addedToGraph: true } : null));
    }
  };

  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newType, setNewType] = useState<"PDF" | "Markdown" | "Notes" | "Guide">("PDF");
  const [newProject, setNewProject] = useState("LifeGraph");
  const [newConcepts, setNewConcepts] = useState("Vector Databases, Embeddings");
  const [newSummary, setNewSummary] = useState("");

  const handleCreateDocument = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newDoc: DocumentItem = {
      id: `doc-${Date.now()}`,
      title: newTitle,
      filename: `${newTitle.toLowerCase().replace(/[^a-z0-9]/g, "_")}.${newType === "PDF" ? "pdf" : newType === "Markdown" ? "md" : "notes"}`,
      fileType: newType,
      fileSize: "1.8 MB",
      date: "Just now",
      relatedProjects: [newProject],
      relatedSkills: ["Machine Learning", "Python"],
      relatedGoals: ["Become stronger in AI engineering"],
      extractedConcepts: newConcepts.split(",").map((c) => c.trim()).filter(Boolean),
      summary: newSummary || `Uploaded technical document covering ${newConcepts}. Integrated into cognitive memory.`,
      addedToGraph: true
    };

    setDocsList((prev) => [newDoc, ...prev]);
    setIsUploadOpen(false);
    setNewTitle("");
    setNewSummary("");
    showToast(`Document "${newDoc.title}" ingested & added to knowledge graph!`, "lime");
  };

  return (
    <AppShell>
      <div className="p-6 sm:p-10 space-y-8 max-w-7xl mx-auto w-full">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[11px] font-mono tracking-[0.25em] text-[#71717A] uppercase">
              <span>INGESTION</span>
              <span>•</span>
              <span className="text-purple-400">RESEARCH & PAPERS</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase">
              Documents & Papers
            </h1>
            <p className="text-sm sm:text-base text-slate-400 font-light max-w-2xl">
              Research notes, architectural specifications, and whitepapers mapped to active entities in your cognitive graph.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="secondary"
              size="sm"
              className="text-xs"
              onClick={() => setIsUploadOpen(true)}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload Document</span>
            </Button>
          </div>
        </div>

        {/* Documents Grid */}
        {docsList.length === 0 ? (
          <div className="p-12 rounded-2xl border border-dashed border-white/10 bg-[#0A0D11] text-center space-y-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mx-auto text-purple-400">
              <FileText className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-semibold text-white">No documents ingested yet</h3>
              <p className="text-sm text-slate-400 max-w-sm mx-auto">
                Upload technical papers, architecture notes, or specifications to extract concepts and enrich your knowledge graph.
              </p>
            </div>
            <Button variant="secondary" size="sm" onClick={() => setIsUploadOpen(true)}>
              <Upload className="w-3.5 h-3.5 mr-2" />
              <span>Upload First Document</span>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {docsList.map((doc) => (
              <div
                key={doc.id}
                className="p-6 rounded-2xl border border-white/[0.08] bg-[#0A0D11] hover:border-purple-500/30 transition-all flex flex-col justify-between space-y-6 shadow-xl relative overflow-hidden group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-purple-500/10 text-purple-300 border border-purple-500/20 font-bold">
                        {doc.fileType}
                      </span>
                      <span className="text-[10px] font-mono text-[#71717A]">
                        {doc.fileSize}
                      </span>
                    </div>

                    {doc.addedToGraph ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono text-[#D4FF00]">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>In Graph</span>
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-[#71717A]">
                        Unmapped
                      </span>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <h2 className="text-lg font-bold tracking-tight text-white group-hover:text-purple-300 transition-colors line-clamp-2">
                      {doc.title}
                    </h2>
                    <p className="text-xs font-mono text-[#71717A] truncate">
                      {doc.filename}
                    </p>
                    <p className="text-xs text-slate-400 font-normal leading-relaxed line-clamp-2 pt-1">
                      {doc.summary}
                    </p>
                  </div>
                </div>

                {/* Connected Concepts & Projects */}
                <div className="space-y-3.5 pt-4 border-t border-white/[0.06] text-xs font-mono">
                  <div className="space-y-1.5">
                    <span className="text-[10px] uppercase text-[#71717A] tracking-wider block">
                      Extracted Concepts
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {doc.extractedConcepts.slice(0, 3).map((concept, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.07] text-[10px] text-purple-300"
                        >
                          {concept}
                        </span>
                      ))}
                      {doc.extractedConcepts.length > 3 && (
                        <span className="text-[10px] text-[#71717A]">
                          +{doc.extractedConcepts.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] uppercase text-[#71717A] tracking-wider block">
                      Connected Projects
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {doc.relatedProjects.map((p, idx) => (
                        <span key={idx} className="text-slate-300 text-[11px]">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="pt-2 flex items-center justify-between gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 justify-center text-xs"
                      onClick={() => setActivePreviewDoc(doc)}
                    >
                      <Eye className="w-3.5 h-3.5 mr-1" />
                      <span>Open Preview</span>
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openDrawer(doc.id)}
                      title="Inspect Node Details"
                    >
                      <ArrowRight className="w-4 h-4 text-[#71717A] hover:text-white" />
                    </Button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* Document Preview & Extraction Modal */}
        {activePreviewDoc && (
          <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-12 flex justify-center items-center pointer-events-auto">
            <div
              className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
              onClick={() => setActivePreviewDoc(null)}
            />

            <div className="relative w-full max-w-3xl bg-[#0B0E12] border border-white/15 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6 z-10 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-start justify-between gap-4 border-b border-white/[0.08] pb-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Badge entityType="DOCUMENT">DOCUMENT</Badge>
                    <span className="text-xs font-mono text-[#71717A]">
                      {activePreviewDoc.fileType} • {activePreviewDoc.fileSize} • {activePreviewDoc.date}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {activePreviewDoc.title}
                  </h2>
                  <span className="text-xs font-mono text-[#71717A] block">
                    {activePreviewDoc.filename}
                  </span>
                </div>
                <button
                  onClick={() => setActivePreviewDoc(null)}
                  className="p-1 rounded-lg text-[#71717A] hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Document Mock Viewer Container */}
              <div className="p-5 rounded-xl border border-white/[0.08] bg-[#07090C] space-y-3">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#71717A] block">
                  Document Content Abstract
                </span>
                <p className="text-sm text-slate-300 leading-relaxed font-light">
                  {activePreviewDoc.summary}
                </p>
                <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.05] text-xs font-mono text-[#71717A]">
                  Full text indexed by vector semantic parser. 14 semantic chunks extracted.
                </div>
              </div>

              {/* Extracted Knowledge Nodes */}
              <div className="space-y-2">
                <span className="text-xs font-mono tracking-[0.2em] uppercase text-[#71717A] block font-bold">
                  Extracted Concepts ({activePreviewDoc.extractedConcepts.length})
                </span>
                <div className="flex flex-wrap gap-2">
                  {activePreviewDoc.extractedConcepts.map((c, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-purple-500/10 border border-purple-500/25 text-xs font-mono text-purple-300"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              {/* Relations Map */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs font-mono">
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] space-y-1">
                  <span className="text-[#71717A] uppercase text-[10px] block">Related Projects</span>
                  <div className="text-white font-medium">
                    {activePreviewDoc.relatedProjects.join(", ")}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] space-y-1">
                  <span className="text-[#71717A] uppercase text-[10px] block">Related Skills</span>
                  <div className="text-white font-medium">
                    {activePreviewDoc.relatedSkills.join(", ")}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] space-y-1">
                  <span className="text-[#71717A] uppercase text-[10px] block">Related Goals</span>
                  <div className="text-white font-medium">
                    {activePreviewDoc.relatedGoals.join(", ")}
                  </div>
                </div>
              </div>

              {/* Modal Footer Controls */}
              <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between gap-4">
                <Link
                  href={`/explore?focus=${activePreviewDoc.id}`}
                  onClick={() => setActivePreviewDoc(null)}
                >
                  <Button variant="outline" size="sm" className="text-xs">
                    <Network className="w-3.5 h-3.5 text-[#D4FF00]" />
                    <span>View in Spatial Graph</span>
                  </Button>
                </Link>

                <div className="flex items-center gap-3">
                  {!activePreviewDoc.addedToGraph ? (
                    <Button
                      variant="lime"
                      size="sm"
                      onClick={() => handleAddToGraph(activePreviewDoc.id)}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Add to Knowledge Graph</span>
                    </Button>
                  ) : (
                    <div className="flex items-center gap-2 text-xs font-mono text-[#D4FF00]">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Mapped to Graph</span>
                    </div>
                  )}
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setActivePreviewDoc(null)}
                  >
                    Close
                  </Button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Upload Document Modal */}
        {isUploadOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-12 flex justify-center items-center pointer-events-auto">
            <div
              className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
              onClick={() => setIsUploadOpen(false)}
            />

            <div className="relative w-full max-w-lg bg-[#0B0E12] border border-white/15 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6 z-10 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-start justify-between gap-4 border-b border-white/[0.08] pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-purple-400">
                    <FileText className="w-4 h-4" />
                    <span>Ingest Technical Document</span>
                  </div>
                  <h2 className="text-xl font-bold text-white tracking-tight">
                    Upload & Extract Concepts
                  </h2>
                </div>
                <button
                  onClick={() => setIsUploadOpen(false)}
                  className="p-1 rounded-lg text-[#71717A] hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateDocument} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase text-[#71717A] block">
                    Document Title
                  </label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Vision-Language Transformers Survey"
                    className="w-full bg-[#07090C] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-hidden focus:border-purple-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase text-[#71717A] block">
                      File Type
                    </label>
                    <select
                      value={newType}
                      onChange={(e) => setNewType(e.target.value as any)}
                      className="w-full bg-[#07090C] border border-white/10 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-hidden"
                    >
                      <option value="PDF">PDF Research Paper</option>
                      <option value="Markdown">Markdown Spec</option>
                      <option value="Notes">Lab Notes</option>
                      <option value="Guide">Engineering Guide</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase text-[#71717A] block">
                      Target Project
                    </label>
                    <select
                      value={newProject}
                      onChange={(e) => setNewProject(e.target.value)}
                      className="w-full bg-[#07090C] border border-white/10 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-hidden"
                    >
                      <option value="LifeGraph">LifeGraph</option>
                      <option value="Drone 3D Reconstruction">Drone 3D Reconstruction</option>
                      <option value="Smart Number Plate & Boom Barrier">Smart Number Plate</option>
                      <option value="Jarvis Autonomous Assistant">Jarvis Assistant</option>
                      <option value="Throne of Ash (3D Action RPG)">Throne of Ash</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase text-[#71717A] block">
                    Extracted Concepts (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={newConcepts}
                    onChange={(e) => setNewConcepts(e.target.value)}
                    placeholder="e.g. Attention, Multi-Head Latency, Reranking"
                    className="w-full bg-[#07090C] border border-white/10 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-hidden focus:border-purple-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase text-[#71717A] block">
                    Abstract / Summary
                  </label>
                  <textarea
                    rows={3}
                    value={newSummary}
                    onChange={(e) => setNewSummary(e.target.value)}
                    placeholder="Brief technical summary of this document..."
                    className="w-full bg-[#07090C] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-hidden focus:border-purple-400 font-sans"
                  />
                </div>

                <div className="pt-3 border-t border-white/[0.08] flex items-center justify-end gap-3">
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => setIsUploadOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" variant="lime" size="sm">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Ingest Document</span>
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </AppShell>
  );
}
