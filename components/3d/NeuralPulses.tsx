"use client";

import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { GraphEdgeData, GraphNodeData } from "@/lib/data/mockGraphData";

interface NeuralPulsesProps {
  edges: GraphEdgeData[];
  nodes: GraphNodeData[];
  speedMultiplier?: number;
}

export function NeuralPulses({ edges, nodes, speedMultiplier = 1 }: NeuralPulsesProps) {
  const pointsRef = useRef<THREE.Points>(null);

  const nodeMap = useMemo(() => {
    const map = new Map<string, GraphNodeData>();
    nodes.forEach((n) => map.set(n.id, n));
    return map;
  }, [nodes]);

  // Create 2-3 pulses per edge
  const pulseCount = edges.length * 3;

  const [positions, colors, offsets, speeds, edgePairs] = useMemo(() => {
    const pos = new Float32Array(pulseCount * 3);
    const cols = new Float32Array(pulseCount * 3);
    const offs = new Float32Array(pulseCount);
    const spds = new Float32Array(pulseCount);
    const pairs: [THREE.Vector3, THREE.Vector3][] = [];

    const lime = new THREE.Color("#D4FF00");
    const cyan = new THREE.Color("#00F0FF");

    let idx = 0;
    edges.forEach((edge) => {
      const src = nodeMap.get(edge.source);
      const tgt = nodeMap.get(edge.target);
      if (!src || !tgt) return;

      const p1 = new THREE.Vector3(...src.position);
      const p2 = new THREE.Vector3(...tgt.position);

      for (let j = 0; j < 3; j++) {
        pairs.push([p1, p2]);
        offs[idx] = Math.random();
        spds[idx] = 0.25 + Math.random() * 0.45;

        const c = Math.random() > 0.4 ? lime : cyan;
        cols[idx * 3] = c.r;
        cols[idx * 3 + 1] = c.g;
        cols[idx * 3 + 2] = c.b;

        idx++;
      }
    });

    return [pos, cols, offs, spds, pairs];
  }, [edges, nodeMap, pulseCount]);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const posArray = posAttr.array as Float32Array;

    for (let i = 0; i < edgePairs.length; i++) {
      offsets[i] = (offsets[i] + delta * speeds[i] * speedMultiplier) % 1.0;
      const t = offsets[i];
      const [p1, p2] = edgePairs[i];

      // Interpolate position along edge vector
      posArray[i * 3] = p1.x + (p2.x - p1.x) * t;
      posArray[i * 3 + 1] = p1.y + (p2.y - p1.y) * t;
      posArray[i * 3 + 2] = p1.z + (p2.z - p1.z) * t;
    }

    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.075}
        vertexColors
        transparent
        opacity={0.95}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}
