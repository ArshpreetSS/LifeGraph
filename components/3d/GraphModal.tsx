"use client";

import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import {
  X,
  Search,
  Layers,
  ArrowRight,
} from "lucide-react";
import {
  MOCK_GRAPH_NODES,
  GraphNodeData,
  NodeCategory,
} from "@/lib/data/mockGraphData";
import { KnowledgeGraph } from "./KnowledgeGraph";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

interface GraphModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSelectedNode?: GraphNodeData | null;
}

export function GraphModal({ isOpen, onClose, initialSelectedNode = null }: GraphModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<NodeCategory | "ALL">("ALL");
  const [selectedNode, setSelectedNode] = useState<GraphNodeData | null>(initialSelectedNode || MOCK_GRAPH_NODES[0]);
  const [searchQuery, setSearchQuery] = useState("");

  if (!isOpen) return null;

  const categories: (NodeCategory | "ALL")[] = [
    "ALL",
    "GOAL",
    "SKILL",
    "PROJECT",
    "DOCUMENT",
    "LEARNING",
  ];

  const handleSelectNode = (node: GraphNodeData) => {
    setSelectedNode(node);
  };

  const connectedNodes = selectedNode
    ? MOCK_GRAPH_NODES.filter((n) => selectedNode.connections.includes(n.id))
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="absolute top-0 left-0 right-0 h-16 border-b border-white/10 bg-[#070809]/90 backdrop-blur-md px-6 flex items-center justify-between z-20">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-[#D4FF00]/10 border border-[#D4FF00]/30 flex items-center justify-center text-[#D4FF00]">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold tracking-tight text-white flex items-center gap-2">
              LIFEGRAPH STUDIO <span className="text-[#D4FF00] font-mono text-xs">[v2.4]</span>
            </h3>
            <p className="text-xs text-white/50 font-mono">Interactive Knowledge Topology Canvas</p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-1.5 bg-white/5 p-1 rounded-full border border-white/10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 text-xs font-mono rounded-full transition-all ${
                selectedCategory === cat
                  ? "bg-[#D4FF00] text-black font-semibold shadow-[0_0_12px_rgba(212,255,0,0.3)]"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="relative hidden sm:block">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              placeholder="Filter nodes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-full pl-9 pr-4 py-1.5 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-[#D4FF00]/50 w-44"
            />
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="w-full h-full pt-16 pb-0 flex relative">
        <div className="flex-1 h-full relative">
          <Canvas
            camera={{ position: [0, 0, 7.5], fov: 45 }}
            dpr={[1, 2]}
            gl={{ antialias: true, alpha: true }}
          >
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1.5} color="#FFFFFF" />
            <pointLight position={[-10, -10, -5]} intensity={0.9} color="#D4FF00" />
            <OrbitControls
              enableDamping
              dampingFactor={0.05}
              rotateSpeed={0.8}
              zoomSpeed={0.8}
              maxDistance={15}
              minDistance={2.5}
            />
            <KnowledgeGraph
              selectedCategory={selectedCategory}
              onSelectNode={handleSelectNode}
              interactive={true}
            />
          </Canvas>

          <div className="absolute bottom-6 left-6 pointer-events-none flex flex-col gap-2 font-mono text-[11px] text-white/50 bg-[#070809]/80 backdrop-blur-md p-3 rounded-xl border border-white/10">
            <div className="flex items-center gap-2 text-[#D4FF00]">
              <span className="w-2 h-2 rounded-full bg-[#D4FF00] animate-pulse" />
              CANVAS: ORBIT & DRAG ENABLED
            </div>
            <div>Left Click + Drag : Rotate 3D Space</div>
            <div>Scroll Wheel : Optical Zoom</div>
            <div>Node Hover : Neural Edge Illumination</div>
          </div>
        </div>

        {selectedNode && (
          <aside className="w-80 md:w-96 border-l border-white/10 bg-[#0C0F12]/95 backdrop-blur-2xl p-6 flex flex-col justify-between overflow-y-auto z-20 animate-in slide-in-from-right duration-300">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <Badge
                  variant={
                    selectedNode.category === "GOAL"
                      ? "lime"
                      : selectedNode.category === "PROJECT"
                      ? "cyan"
                      : "emerald"
                  }
                >
                  {selectedNode.category}
                </Badge>
                <button
                  onClick={() => setSelectedNode(null)}
                  className="text-white/40 hover:text-white text-xs font-mono"
                >
                  [Dismiss]
                </button>
              </div>

              <div>
                <h2 className="text-xl font-bold tracking-tight text-white">
                  {selectedNode.label}
                </h2>
                <p className="text-xs text-white/60 mt-1 font-mono">
                  ID: #{selectedNode.id} • Latency: 4.2ms
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 text-sm text-white/80 leading-relaxed">
                {selectedNode.description}
              </div>

              {selectedNode.metrics && (
                <div className="space-y-3 pt-2">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-white/50">SYNTHESIS PROGRESS</span>
                    <span className="text-[#D4FF00] font-bold">
                      {selectedNode.metrics.progress}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#D4FF00] rounded-full transition-all duration-500 shadow-[0_0_8px_#D4FF00]"
                      style={{ width: `${selectedNode.metrics.progress}%` }}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
                      <div className="text-[10px] font-mono text-white/40">ACTIVITY</div>
                      <div className="text-xs font-semibold text-white mt-0.5">
                        {selectedNode.metrics.activity}
                      </div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
                      <div className="text-[10px] font-mono text-white/40">SYNCED</div>
                      <div className="text-xs font-semibold text-white mt-0.5">
                        {selectedNode.metrics.lastUpdated}
                      </div>
                    </div>
                  </div>

                  {selectedNode.metrics.tags && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {selectedNode.metrics.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-white/70 border border-white/10"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div className="pt-3 border-t border-white/10 space-y-2">
                <div className="text-xs font-mono text-white/50 flex items-center justify-between">
                  <span>SEMANTIC CONNECTIONS ({connectedNodes.length})</span>
                </div>
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {connectedNodes.map((neighbor) => (
                    <button
                      key={neighbor.id}
                      onClick={() => setSelectedNode(neighbor)}
                      className="w-full text-left p-2.5 rounded-lg bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 hover:border-[#D4FF00]/30 transition-all flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: neighbor.color }}
                        />
                        <span className="text-xs text-white group-hover:text-[#D4FF00] transition-colors">
                          {neighbor.label}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-white/40 group-hover:text-white/70">
                        [{neighbor.category}]
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10">
              <Button
                variant="primary"
                size="sm"
                className="w-full justify-center"
                onClick={() => alert(`Navigating to node workspace for: ${selectedNode.label}`)}
              >
                Focus in Workspace <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
