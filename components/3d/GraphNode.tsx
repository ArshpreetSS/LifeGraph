"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Billboard, Text } from "@react-three/drei";
import * as THREE from "three";
import { GraphNodeData } from "@/lib/data/mockGraphData";

interface GraphNodeProps {
  data: GraphNodeData;
  isHovered: boolean;
  isNeighbor: boolean;
  isSelected: boolean;
  dimmed: boolean;
  onHover: (id: string | null) => void;
  onClick: (data: GraphNodeData) => void;
}

export function GraphNode({
  data,
  isHovered,
  isNeighbor,
  isSelected,
  dimmed,
  onHover,
  onClick,
}: GraphNodeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  const active = isHovered || isSelected;
  const highlighted = active || isNeighbor;

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime() + (data.position[0] * 2 + data.position[1]);

    const floatOffset = Math.sin(t * 1.5) * 0.025;
    meshRef.current.position.y = data.position[1] + floatOffset;

    if (ringRef.current) {
      ringRef.current.rotation.z += 0.015;
      const ringScale = 1 + Math.sin(t * 2) * 0.1;
      ringRef.current.scale.set(ringScale, ringScale, 1);
    }
  });

  const baseColor = new THREE.Color(data.color);
  const targetScale = active ? 1.5 : highlighted ? 1.25 : dimmed ? 0.75 : 1.0;
  const targetOpacity = dimmed ? 0.2 : 0.95;

  return (
    <group position={data.position}>
      <mesh
        ref={meshRef}
        scale={targetScale}
        onPointerOver={(e) => {
          e.stopPropagation();
          onHover(data.id);
        }}
        onPointerOut={() => onHover(null)}
        onClick={(e) => {
          e.stopPropagation();
          onClick(data);
        }}
      >
        {/* Delicate luminous jewel-like orb */}
        <sphereGeometry args={[data.size * 0.12, 24, 24]} />
        <meshStandardMaterial
          color={baseColor}
          emissive={baseColor}
          emissiveIntensity={highlighted ? 1.6 : 0.6}
          roughness={0.15}
          metalness={0.85}
          transparent
          opacity={targetOpacity}
        />

        {/* Orbiting Ring */}
        {(highlighted || data.category === "GOAL") && (
          <mesh ref={ringRef} rotation={[Math.PI / 2.5, 0, 0]}>
            <ringGeometry args={[data.size * 0.18, data.size * 0.21, 32]} />
            <meshBasicMaterial
              color={data.color}
              transparent
              opacity={highlighted ? 0.8 : 0.35}
              side={THREE.DoubleSide}
            />
          </mesh>
        )}

        {/* Micro-Editorial Billboard Text (Restrained, elegant, non-intrusive) */}
        <Billboard position={[0, data.size * 0.18 + 0.08, 0]}>
          <Text
            fontSize={highlighted ? 0.075 : 0.055}
            color={highlighted ? "#FFFFFF" : "#E2E8F0"}
            anchorX="center"
            anchorY="middle"
            fillOpacity={highlighted ? 1.0 : dimmed ? 0.1 : 0.7}
          >
            {data.label}
          </Text>
          <Text
            position={[0, -0.055, 0]}
            fontSize={0.038}
            color={data.color}
            anchorX="center"
            anchorY="middle"
            fillOpacity={highlighted ? 0.95 : dimmed ? 0.08 : 0.5}
          >
            {`[${data.category}]`}
          </Text>
        </Billboard>
      </mesh>
    </group>
  );
}
