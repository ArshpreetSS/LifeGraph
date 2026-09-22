"use client";

import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Billboard, Text } from "@react-three/drei";
import * as THREE from "three";

interface ConstellationGraphProps {
  scrollProgress: number;
}

interface ConstellationNode {
  id: string;
  label: string;
  category: string;
  position: [number, number, number];
  color: string;
}

const CONSTELLATION_NODES: ConstellationNode[] = [
  { id: "python", label: "Python", category: "SKILL", position: [-1.1, 0.35, 0.4], color: "#F5F5F7" },
  { id: "ml", label: "Machine Learning", category: "UNDERSTANDING", position: [-0.4, 0.65, 0.6], color: "#D4FF00" },
  { id: "agent", label: "AI Agent Project", category: "PROJECT", position: [0.85, 0.45, 0.5], color: "#F5F5F7" },
  { id: "mastery", label: "Autonomous Mastery", category: "GOAL", position: [0.1, 0.95, 0.3], color: "#D4FF00" },
];

const EDGES: [number, number][] = [
  [0, 1], // Python -> ML
  [1, 2], // ML -> Agent
  [2, 3], // Agent -> Mastery
  [1, 3], // ML -> Mastery
];

export function ConstellationGraph({ scrollProgress }: ConstellationGraphProps) {
  const groupRef = useRef<THREE.Group>(null);
  const currentOpacity = useRef(0);

  // Line positions buffer
  const linePoints = useMemo(() => {
    const points: THREE.Vector3[] = [];
    EDGES.forEach(([srcIdx, tgtIdx]) => {
      points.push(new THREE.Vector3(...CONSTELLATION_NODES[srcIdx].position));
      points.push(new THREE.Vector3(...CONSTELLATION_NODES[tgtIdx].position));
    });
    return points;
  }, []);

  const lineGeometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(linePoints);
  }, [linePoints]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    const p = Math.min(Math.max(scrollProgress, 0), 1);

    // Emerge in Chapter 3 (Connection 0.36 - 0.54) and fade out before Chapter 6 (Grow 0.85+)
    let targetOpacity = 0.0;
    if (p >= 0.34 && p <= 0.80) {
      if (p < 0.40) {
        targetOpacity = (p - 0.34) / 0.06;
      } else if (p > 0.74) {
        targetOpacity = (0.80 - p) / 0.06;
      } else {
        targetOpacity = 0.9;
      }
    }

    currentOpacity.current = THREE.MathUtils.lerp(currentOpacity.current, targetOpacity, 0.07);
    groupRef.current.visible = currentOpacity.current > 0.02;

    // Slow organic breathing rotation
    groupRef.current.rotation.y += delta * 0.03;

    // Apply fading to materials
    groupRef.current.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh || (obj as THREE.LineSegments).isLineSegments) {
        const mat = (obj as THREE.Mesh).material as THREE.Material;
        if (mat && "opacity" in mat) {
          (mat as THREE.MeshBasicMaterial).opacity = currentOpacity.current * ((mat as any).userData?.baseOpacity || 1.0);
        }
      }
    });
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Thin ethereal hairline connection threads */}
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial
          color="#F5F5F7"
          transparent
          opacity={0}
          userData={{ baseOpacity: 0.25 }}
        />
      </lineSegments>

      {/* 4 Ethereal Luminous Pearl Nodes */}
      {CONSTELLATION_NODES.map((node) => (
        <group key={node.id} position={node.position}>
          {/* Subtle luminous core */}
          <mesh>
            <sphereGeometry args={[0.045, 24, 24]} />
            <meshBasicMaterial
              color={node.color}
              transparent
              opacity={0}
              userData={{ baseOpacity: 0.95 }}
            />
          </mesh>

          {/* Soft outer glow */}
          <mesh>
            <sphereGeometry args={[0.09, 16, 16]} />
            <meshBasicMaterial
              color={node.color}
              transparent
              opacity={0}
              userData={{ baseOpacity: 0.18 }}
            />
          </mesh>

          {/* Editorial Minimal Typography Billboard */}
          <Billboard position={[0, 0.12, 0]}>
            <Text
              fontSize={0.065}
              color="#F5F5F7"
              anchorX="center"
              anchorY="bottom"
              fillOpacity={0.85}
              letterSpacing={0.05}
            >
              {node.label}
            </Text>
            <Text
              position={[0, -0.045, 0]}
              fontSize={0.035}
              color="#71717A"
              anchorX="center"
              anchorY="top"
              fillOpacity={0.6}
              letterSpacing={0.1}
            >
              {node.category}
            </Text>
          </Billboard>
        </group>
      ))}
    </group>
  );
}
