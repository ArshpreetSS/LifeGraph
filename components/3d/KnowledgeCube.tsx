"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface KnowledgeCubeProps {
  position?: [number, number, number];
  scale?: number;
}

export function KnowledgeCube({ position = [2.8, -0.4, 0.5], scale = 0.7 }: KnowledgeCubeProps) {
  const outerBoxRef = useRef<THREE.LineSegments>(null);
  const innerCoreRef = useRef<THREE.Mesh>(null);
  const haloRingRef = useRef<THREE.Mesh>(null);

  const edgesGeometry = React.useMemo(() => {
    const boxGeo = new THREE.BoxGeometry(1.4, 1.4, 1.4);
    return new THREE.EdgesGeometry(boxGeo);
  }, []);

  useFrame(({ clock }, delta) => {
    const t = clock.getElapsedTime();

    if (outerBoxRef.current) {
      outerBoxRef.current.rotation.x += delta * 0.4;
      outerBoxRef.current.rotation.y += delta * 0.6;
      outerBoxRef.current.position.y = position[1] + Math.sin(t * 1.8) * 0.08;
    }

    if (innerCoreRef.current) {
      innerCoreRef.current.rotation.x -= delta * 0.7;
      innerCoreRef.current.rotation.z += delta * 0.5;
      const s = 1 + Math.sin(t * 3) * 0.12;
      innerCoreRef.current.scale.set(s, s, s);
    }

    if (haloRingRef.current) {
      haloRingRef.current.rotation.z += delta * 0.5;
    }
  });

  return (
    <group position={position} scale={scale}>
      {/* Outer Wireframe Box */}
      <lineSegments ref={outerBoxRef} geometry={edgesGeometry}>
        <lineBasicMaterial color="#D4FF00" transparent opacity={0.65} linewidth={1.5} />
      </lineSegments>

      {/* Second Inner Diagonal Box */}
      <group rotation={[Math.PI / 4, Math.PI / 4, 0]}>
        <lineSegments geometry={edgesGeometry} scale={0.72}>
          <lineBasicMaterial color="#00F0FF" transparent opacity={0.4} />
        </lineSegments>
      </group>

      {/* Glowing Inner Octahedron Energy Core */}
      <mesh ref={innerCoreRef}>
        <octahedronGeometry args={[0.36, 0]} />
        <meshStandardMaterial
          color="#D4FF00"
          emissive="#D4FF00"
          emissiveIntensity={2.0}
          wireframe
        />
      </mesh>

      {/* Cybernetic Equatorial Halo Ring */}
      <mesh ref={haloRingRef} rotation={[Math.PI / 2.2, 0, 0]}>
        <ringGeometry args={[0.9, 0.95, 32]} />
        <meshBasicMaterial color="#D4FF00" transparent opacity={0.35} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}
