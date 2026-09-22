"use client";

import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  MOCK_GRAPH_NODES,
  MOCK_GRAPH_EDGES,
  GraphNodeData,
  NodeCategory,
} from "@/lib/data/mockGraphData";
import { GraphNode } from "./GraphNode";
import { GraphConnections } from "./GraphConnections";
import { NeuralPulses } from "./NeuralPulses";
import { useState } from "react";

interface KnowledgeGraphProps {
  scrollProgress?: number;
  selectedCategory?: NodeCategory | "ALL";
  onSelectNode?: (node: GraphNodeData) => void;
  interactive?: boolean;
  mousePos?: { x: number; y: number };
}

export function KnowledgeGraph({
  scrollProgress = 0,
  selectedCategory = "ALL",
  onSelectNode,
  interactive = true,
  mousePos = { x: 0, y: 0 },
}: KnowledgeGraphProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const currentGraphScale = useRef(0.85);
  const currentOpacity = useRef(0.0);
  const rotationY = useRef(0);

  const filteredNodes = useMemo(() => {
    if (selectedCategory === "ALL") return MOCK_GRAPH_NODES;
    return MOCK_GRAPH_NODES.filter((n) => n.category === selectedCategory);
  }, [selectedCategory]);

  const activeNode = useMemo(() => {
    const activeId = hoveredNodeId || selectedNodeId;
    if (!activeId) return null;
    return MOCK_GRAPH_NODES.find((n) => n.id === activeId) || null;
  }, [hoveredNodeId, selectedNodeId]);

  const neighborIds = useMemo(() => {
    if (!activeNode) return new Set<string>();
    return new Set(activeNode.connections);
  }, [activeNode]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    const p = Math.min(Math.max(scrollProgress, 0), 1);

    // Stage-aware graph opacity and scale
    let targetOpacity = 0.02;
    let targetScale = 0.85;

    if (p < 0.14) {
      targetOpacity = 0.02;
      targetScale = 0.85;
    } else if (p < 0.32) {
      const t = (p - 0.14) / 0.18;
      targetOpacity = THREE.MathUtils.lerp(0.02, 0.55, t);
      targetScale = THREE.MathUtils.lerp(0.85, 1.18, t);
    } else if (p < 0.48) {
      const t = (p - 0.32) / 0.16;
      targetOpacity = THREE.MathUtils.lerp(0.55, 0.95, t);
      targetScale = THREE.MathUtils.lerp(1.18, 1.0, t);
    } else if (p < 0.65) {
      targetOpacity = 1.0;
      targetScale = 1.02;
    } else if (p < 0.82) {
      targetOpacity = 1.0;
      targetScale = 1.05;
    } else if (p < 0.93) {
      const t = (p - 0.82) / 0.11;
      targetOpacity = THREE.MathUtils.lerp(1.0, 0.9, t);
      targetScale = THREE.MathUtils.lerp(1.05, 1.28, t);
    } else {
      const t = (p - 0.93) / 0.07;
      targetOpacity = THREE.MathUtils.lerp(0.9, 0.6, t);
      targetScale = THREE.MathUtils.lerp(1.28, 1.1, t);
    }

    currentOpacity.current = THREE.MathUtils.lerp(currentOpacity.current, targetOpacity, 0.07);
    currentGraphScale.current = THREE.MathUtils.lerp(currentGraphScale.current, targetScale, 0.06);

    groupRef.current.scale.setScalar(currentGraphScale.current);

    // FIX: Set visibility directly on the ref (not as JSX prop that won't re-render)
    groupRef.current.visible = currentOpacity.current > 0.015;

    // Slow contemplative rotation when not interacting — pause on hover
    if (!hoveredNodeId && !selectedNodeId) {
      rotationY.current += delta * 0.03;
      groupRef.current.rotation.y = rotationY.current;
    }

    // Subtle pointer tilt
    const targetRotX = mousePos.y * 0.08;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRotX,
      0.04
    );
  });

  const handleHover = (id: string | null) => {
    if (!interactive) return;
    setHoveredNodeId(id);
  };

  const handleClick = (data: GraphNodeData) => {
    if (!interactive) return;
    setSelectedNodeId(data.id === selectedNodeId ? null : data.id);
    onSelectNode?.(data);
  };

  return (
    <group ref={groupRef}>
      {/* Dynamic Graph Edge Lines */}
      <GraphConnections
        edges={MOCK_GRAPH_EDGES}
        nodes={MOCK_GRAPH_NODES}
        hoveredNodeId={hoveredNodeId}
        selectedNodeId={selectedNodeId}
      />

      {/* Traveling Neural Pulse Packets along connections */}
      <NeuralPulses
        edges={MOCK_GRAPH_EDGES}
        nodes={MOCK_GRAPH_NODES}
        speedMultiplier={hoveredNodeId ? 2.0 : 1.0}
      />

      {/* 3D Nodes positioned around the central avatar */}
      {filteredNodes.map((node) => {
        const isHovered = hoveredNodeId === node.id;
        const isSelected = selectedNodeId === node.id;
        const isNeighbor = neighborIds.has(node.id);
        const hasActiveSelection = Boolean(hoveredNodeId || selectedNodeId);
        const dimmed = hasActiveSelection && !isHovered && !isSelected && !isNeighbor;

        return (
          <GraphNode
            key={node.id}
            data={node}
            isHovered={isHovered}
            isNeighbor={isNeighbor}
            isSelected={isSelected}
            dimmed={dimmed}
            onHover={handleHover}
            onClick={handleClick}
          />
        );
      })}
    </group>
  );
}
