"use client";

import React, { useMemo } from "react";
import * as THREE from "three";
import { GraphEdgeData, GraphNodeData } from "@/lib/data/mockGraphData";

interface GraphConnectionsProps {
  edges: GraphEdgeData[];
  nodes: GraphNodeData[];
  hoveredNodeId: string | null;
  selectedNodeId: string | null;
}

export function GraphConnections({
  edges,
  nodes,
  hoveredNodeId,
  selectedNodeId,
}: GraphConnectionsProps) {
  const nodeMap = useMemo(() => {
    const map = new Map<string, GraphNodeData>();
    nodes.forEach((n) => map.set(n.id, n));
    return map;
  }, [nodes]);

  return (
    <group>
      {edges.map((edge) => {
        const sourceNode = nodeMap.get(edge.source);
        const targetNode = nodeMap.get(edge.target);
        if (!sourceNode || !targetNode) return null;

        const isConnected =
          hoveredNodeId === edge.source ||
          hoveredNodeId === edge.target ||
          selectedNodeId === edge.source ||
          selectedNodeId === edge.target;

        const isDimmed = (hoveredNodeId || selectedNodeId) && !isConnected;

        const p1 = new THREE.Vector3(...sourceNode.position);
        const p2 = new THREE.Vector3(...targetNode.position);
        const points = [p1, p2];
        const lineGeo = new THREE.BufferGeometry().setFromPoints(points);

        const color = isConnected ? "#D4FF00" : "#475569";
        const opacity = isConnected ? 0.85 : isDimmed ? 0.08 : 0.28;

        return (
          <primitive
            key={edge.id}
            object={
              new THREE.Line(
                lineGeo,
                new THREE.LineBasicMaterial({
                  color: new THREE.Color(color),
                  transparent: true,
                  opacity: opacity,
                })
              )
            }
          />
        );
      })}
    </group>
  );
}
