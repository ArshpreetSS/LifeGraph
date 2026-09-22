"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import {
  GRAPH_NODES,
  GRAPH_EDGES,
  GraphNode,
  EntityType
} from "@/lib/mockData";
import { ZoomIn, ZoomOut, RotateCcw, Search, Filter, Maximize2, Network } from "lucide-react";

interface KnowledgeGraphProps {
  onSelectNode?: (nodeId: string) => void;
  focusedNodeId?: string | null;
  mini?: boolean;
  className?: string;
  categoryFilter?: string;
}

interface SimNode extends GraphNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetRadius: number;
}

export function KnowledgeGraph({
  onSelectNode,
  focusedNodeId = null,
  mini = false,
  className = "",
  categoryFilter = "All"
}: KnowledgeGraphProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [activeFilter, setActiveFilter] = useState(categoryFilter);
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  // Transform states (Pan & Zoom)
  const transformRef = useRef({
    x: 0,
    y: 0,
    scale: mini ? 0.75 : 1.0,
    isDragging: false,
    dragStartX: 0,
    dragStartY: 0
  });

  const nodesRef = useRef<SimNode[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const particleTimeRef = useRef<number>(0);

  // Color mapping per entity type matching LifeGraph design
  const typeColors: Record<EntityType, { fill: string; stroke: string; glow: string }> = {
    PROJECT: { fill: "#D4FF00", stroke: "#E2FF38", glow: "rgba(212, 255, 0, 0.4)" },
    SKILL: { fill: "#00F0FF", stroke: "#38F5FF", glow: "rgba(0, 240, 255, 0.35)" },
    GOAL: { fill: "#F59E0B", stroke: "#FBBF24", glow: "rgba(245, 158, 11, 0.35)" },
    DOCUMENT: { fill: "#A855F7", stroke: "#C084FC", glow: "rgba(168, 85, 247, 0.35)" },
    LEARNING: { fill: "#10B981", stroke: "#34D399", glow: "rgba(16, 185, 129, 0.35)" },
    EXPERIENCE: { fill: "#F43F5E", stroke: "#FB7185", glow: "rgba(244, 63, 94, 0.35)" }
  };

  // Initialize simulation positions
  useEffect(() => {
    const width = containerRef.current?.clientWidth || 800;
    const height = containerRef.current?.clientHeight || 600;

    // Center transform
    transformRef.current.x = width / 2;
    transformRef.current.y = height / 2;

    const initialNodes: SimNode[] = GRAPH_NODES.map((n, idx) => {
      // Golden angle spiral distribution
      const angle = idx * 2.39996;
      const radius = 60 + Math.sqrt(idx) * (mini ? 45 : 75);
      return {
        ...n,
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        vx: 0,
        vy: 0,
        targetRadius: n.radius * (mini ? 0.75 : 1)
      };
    });

    nodesRef.current = initialNodes;
  }, [mini]);

  // Filter nodes based on activeFilter & searchQuery
  const isNodeVisible = useCallback(
    (node: SimNode) => {
      if (activeFilter !== "All") {
        const filterMap: Record<string, EntityType> = {
          Projects: "PROJECT",
          Skills: "SKILL",
          Goals: "GOAL",
          Documents: "DOCUMENT",
          Learning: "LEARNING"
        };
        if (filterMap[activeFilter] && node.type !== filterMap[activeFilter]) {
          return false;
        }
      }
      if (searchQuery.trim()) {
        return node.name.toLowerCase().includes(searchQuery.toLowerCase());
      }
      return true;
    },
    [activeFilter, searchQuery]
  );

  // Focus specific node if requested
  useEffect(() => {
    if (focusedNodeId && nodesRef.current.length > 0) {
      const node = nodesRef.current.find((n) => n.id === focusedNodeId);
      if (node && containerRef.current) {
        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;
        transformRef.current.x = width / 2 - node.x * transformRef.current.scale;
        transformRef.current.y = height / 2 - node.y * transformRef.current.scale;
      }
    }
  }, [focusedNodeId]);

  // Main Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let isRunning = true;

    const render = () => {
      if (!isRunning) return;
      particleTimeRef.current += 0.015;

      const container = containerRef.current;
      if (!container) return;

      const dpr = window.devicePixelRatio || 1;
      const width = container.clientWidth;
      const height = container.clientHeight;

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      // Background Subtle Spatial Grid
      ctx.save();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.02)";
      ctx.lineWidth = 1;
      const gridSize = 40 * transformRef.current.scale;
      const offsetX = transformRef.current.x % gridSize;
      const offsetY = transformRef.current.y % gridSize;

      for (let x = offsetX; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = offsetY; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      ctx.restore();

      // Apply Pan & Zoom
      ctx.save();
      ctx.translate(transformRef.current.x, transformRef.current.y);
      ctx.scale(transformRef.current.scale, transformRef.current.scale);

      const nodes = nodesRef.current;
      const activeNode = hoveredNodeId || focusedNodeId;

      // Physics Simulation Step (Gentle Spring Attraction & Repulsion)
      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i];
        // Center gravity
        n1.vx -= n1.x * 0.0006;
        n1.vy -= n1.y * 0.0006;

        // Repulsion between nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dx = n2.x - n1.x;
          const dy = n2.y - n1.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const minDist = n1.radius + n2.radius + (mini ? 35 : 70);

          if (dist < minDist) {
            const force = ((minDist - dist) / dist) * 0.08;
            n1.vx -= dx * force;
            n1.vy -= dy * force;
            n2.vx += dx * force;
            n2.vy += dy * force;
          }
        }
      }

      // Edge Attraction
      GRAPH_EDGES.forEach((edge) => {
        const source = nodes.find((n) => n.id === edge.source);
        const target = nodes.find((n) => n.id === edge.target);
        if (source && target) {
          const dx = target.x - source.x;
          const dy = target.y - source.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const idealDist = (mini ? 65 : 120) * (1 / (edge.strength || 0.8));
          const force = (dist - idealDist) * 0.0018 * edge.strength;

          source.vx += dx * force;
          source.vy += dy * force;
          target.vx -= dx * force;
          target.vy -= dy * force;
        }
      });

      // Position update with damping
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        n.vx *= 0.88;
        n.vy *= 0.88;
      });

      // Determine connected nodes if a node is hovered/focused
      const highlightedIds = new Set<string>();
      if (activeNode) {
        highlightedIds.add(activeNode);
        GRAPH_EDGES.forEach((e) => {
          if (e.source === activeNode) highlightedIds.add(e.target);
          if (e.target === activeNode) highlightedIds.add(e.source);
        });
      }

      // 1. Draw Edges
      GRAPH_EDGES.forEach((edge) => {
        const source = nodes.find((n) => n.id === edge.source);
        const target = nodes.find((n) => n.id === edge.target);
        if (!source || !target) return;

        const isEdgeConnectedToActive =
          activeNode && (edge.source === activeNode || edge.target === activeNode);

        const edgeDimmed = activeNode && !isEdgeConnectedToActive;

        ctx.beginPath();
        ctx.moveTo(source.x, source.y);
        ctx.lineTo(target.x, target.y);

        if (isEdgeConnectedToActive) {
          ctx.strokeStyle = "rgba(212, 255, 0, 0.75)";
          ctx.lineWidth = 2;
          ctx.shadowColor = "rgba(212, 255, 0, 0.5)";
          ctx.shadowBlur = 10;
        } else if (edgeDimmed) {
          ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
          ctx.lineWidth = 1;
          ctx.shadowBlur = 0;
        } else {
          ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
          ctx.lineWidth = 1;
          ctx.shadowBlur = 0;
        }
        ctx.stroke();

        // Draw animated energy pulse on active edges
        if (isEdgeConnectedToActive || !activeNode) {
          const t = (particleTimeRef.current + (source.x % 5)) % 1;
          const px = source.x + (target.x - source.x) * t;
          const py = source.y + (target.y - source.y) * t;

          ctx.beginPath();
          ctx.arc(px, py, isEdgeConnectedToActive ? 2.5 : 1.5, 0, Math.PI * 2);
          ctx.fillStyle = isEdgeConnectedToActive ? "#D4FF00" : "rgba(255, 255, 255, 0.4)";
          ctx.fill();
        }
      });

      // 2. Draw Nodes
      nodes.forEach((node) => {
        const isHovered = node.id === hoveredNodeId;
        const isFocused = node.id === focusedNodeId;
        const isConnected = highlightedIds.has(node.id);
        const isDimmed = activeNode && !isConnected;

        const style = typeColors[node.type] || typeColors.SKILL;
        const radius = isHovered || isFocused ? node.radius * 1.25 : node.radius;

        ctx.save();
        ctx.globalAlpha = isDimmed ? 0.2 : 1.0;

        // Outer Glow
        if (isHovered || isFocused || (isConnected && activeNode)) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, radius + 8, 0, Math.PI * 2);
          ctx.fillStyle = style.glow;
          ctx.shadowColor = style.stroke;
          ctx.shadowBlur = 18;
          ctx.fill();
        }

        // Node Circle Body
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = "#0C0F14";
        ctx.fill();

        ctx.strokeStyle = isHovered || isFocused ? "#D4FF00" : style.stroke;
        ctx.lineWidth = isHovered || isFocused ? 2.5 : 1.5;
        ctx.stroke();

        // Inner core
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius * 0.35, 0, Math.PI * 2);
        ctx.fillStyle = isHovered || isFocused ? "#D4FF00" : style.fill;
        ctx.fill();

        // Node Label
        ctx.font = `${mini ? "10px" : "11px"} monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        if (isHovered || isFocused) {
          ctx.fillStyle = "#FFFFFF";
          ctx.shadowColor = "rgba(0,0,0,0.8)";
          ctx.shadowBlur = 4;
        } else if (isDimmed) {
          ctx.fillStyle = "rgba(161, 161, 170, 0.4)";
        } else {
          ctx.fillStyle = "#E4E4E7";
        }

        ctx.fillText(node.name, node.x, node.y + radius + (mini ? 10 : 14));

        // Entity type indicator badge under name on hover
        if ((isHovered || isFocused) && !mini) {
          ctx.font = "9px monospace";
          ctx.fillStyle = "#D4FF00";
          ctx.fillText(node.type, node.x, node.y + radius + 25);
        }

        ctx.restore();
      });

      ctx.restore();
      animationFrameRef.current = requestAnimationFrame(render);
    };

    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      isRunning = false;
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [hoveredNodeId, focusedNodeId, mini]);

  // Pointer interaction: Hit test, Pan, Drag
  const getNodeAtCoords = useCallback((screenX: number, screenY: number) => {
    const container = containerRef.current;
    if (!container) return null;

    const rect = container.getBoundingClientRect();
    const x = (screenX - rect.left - transformRef.current.x) / transformRef.current.scale;
    const y = (screenY - rect.top - transformRef.current.y) / transformRef.current.scale;

    for (const node of nodesRef.current) {
      const dx = node.x - x;
      const dy = node.y - y;
      if (Math.sqrt(dx * dx + dy * dy) <= node.radius + 6) {
        return node;
      }
    }
    return null;
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const node = getNodeAtCoords(e.clientX, e.clientY);
    if (node) {
      if (onSelectNode) onSelectNode(node.id);
    } else {
      transformRef.current.isDragging = true;
      transformRef.current.dragStartX = e.clientX - transformRef.current.x;
      transformRef.current.dragStartY = e.clientY - transformRef.current.y;
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (transformRef.current.isDragging) {
      transformRef.current.x = e.clientX - transformRef.current.dragStartX;
      transformRef.current.y = e.clientY - transformRef.current.dragStartY;
    } else {
      const node = getNodeAtCoords(e.clientX, e.clientY);
      setHoveredNodeId(node ? node.id : null);
    }
  };

  const handlePointerUp = () => {
    transformRef.current.isDragging = false;
  };

  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 1.08 : 0.92;
    const newScale = Math.min(Math.max(transformRef.current.scale * zoomFactor, 0.35), 2.5);

    // Zoom toward pointer
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    transformRef.current.x = mouseX - (mouseX - transformRef.current.x) * (newScale / transformRef.current.scale);
    transformRef.current.y = mouseY - (mouseY - transformRef.current.y) * (newScale / transformRef.current.scale);
    transformRef.current.scale = newScale;
  };

  const resetCamera = () => {
    if (!containerRef.current) return;
    transformRef.current.x = containerRef.current.clientWidth / 2;
    transformRef.current.y = containerRef.current.clientHeight / 2;
    transformRef.current.scale = mini ? 0.75 : 1.0;
  };

  const filterOptions = ["All", "Projects", "Skills", "Goals", "Documents", "Learning"];

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden select-none bg-[#07080A] ${className}`}
    >
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onWheel={handleWheel}
        className="w-full h-full cursor-grab active:cursor-grabbing block"
      />

      {/* Floating Controls HUD (Full view) */}
      {!mini && (
        <>
          {/* Top Left Filters & Search */}
          <div className="absolute top-5 left-5 z-10 flex flex-col gap-2.5 max-w-sm pointer-events-none">
            {/* Search */}
            <div className="pointer-events-auto flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0C0F14]/80 backdrop-blur-md border border-white/10 shadow-lg text-xs font-mono">
              <Search className="w-3.5 h-3.5 text-[#71717A]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Find node in graph..."
                className="bg-transparent text-white placeholder-[#71717A] focus:outline-hidden w-40 sm:w-48 text-xs"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="pointer-events-auto flex items-center gap-1.5 flex-wrap p-1 rounded-lg bg-[#0C0F14]/70 backdrop-blur-md border border-white/10">
              {filterOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setActiveFilter(opt)}
                  className={`px-2.5 py-1 rounded text-[10px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
                    activeFilter === opt
                      ? "bg-[#D4FF00] text-black font-bold shadow-[0_0_10px_rgba(212,255,0,0.3)]"
                      : "text-[#A1A1AA] hover:text-white hover:bg-white/[0.05]"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Bottom Right Zoom / View Controls */}
          <div className="absolute bottom-5 right-5 z-10 flex items-center gap-1.5 p-1 rounded-lg bg-[#0C0F14]/80 backdrop-blur-md border border-white/10 shadow-lg">
            <button
              onClick={() => {
                transformRef.current.scale = Math.min(transformRef.current.scale * 1.2, 2.5);
              }}
              title="Zoom In"
              className="p-1.5 rounded-md text-[#A1A1AA] hover:text-white hover:bg-white/[0.06] transition-colors"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                transformRef.current.scale = Math.max(transformRef.current.scale * 0.8, 0.35);
              }}
              title="Zoom Out"
              className="p-1.5 rounded-md text-[#A1A1AA] hover:text-white hover:bg-white/[0.06] transition-colors"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={resetCamera}
              title="Reset Camera"
              className="p-1.5 rounded-md text-[#A1A1AA] hover:text-white hover:bg-white/[0.06] transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Bottom Left Legend */}
          <div className="absolute bottom-5 left-5 z-10 hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-lg bg-[#0C0F14]/70 backdrop-blur-md border border-white/10 text-[10px] font-mono uppercase text-[#71717A]">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#D4FF00]" /> Project
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400" /> Skill
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400" /> Goal
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-purple-400" /> Document
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" /> Learning
            </span>
          </div>
        </>
      )}

      {/* Mini Controls */}
      {mini && (
        <div className="absolute top-3 right-3 z-10">
          <button
            onClick={resetCamera}
            className="p-1 rounded bg-[#0C0F14]/80 border border-white/10 text-[#71717A] hover:text-white"
            title="Reset View"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Elegant Empty State Overlay */}
      {nodesRef.current.length === 0 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center pointer-events-none z-10">
          <div className="max-w-md space-y-4 p-8 rounded-2xl bg-[#0A0D11]/90 backdrop-blur-md border border-white/10 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center mx-auto text-[#D4FF00] shadow-[0_0_20px_rgba(212,255,0,0.15)]">
              <Network className="w-6 h-6" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-lg font-bold text-white tracking-tight">
                Your knowledge graph is waiting.
              </h3>
              <p className="text-xs text-slate-400 font-light leading-relaxed">
                Add your first piece of knowledge to start building your map.
              </p>
            </div>
            <div className="pt-2 pointer-events-auto flex items-center justify-center gap-3">
              <a
                href="/documents"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#D4FF00] text-black font-mono text-xs uppercase tracking-wider font-bold hover:bg-[#E2FF38] transition-colors"
              >
                <span>Ingest Document</span>
              </a>
              <a
                href="/projects"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.05] border border-white/10 text-white font-mono text-xs uppercase tracking-wider hover:bg-white/[0.1] transition-colors"
              >
                <span>Add Project</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
