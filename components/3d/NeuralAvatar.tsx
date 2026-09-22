"use client";

import React, { useRef, useState, Suspense } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, Html, Center, Float } from "@react-three/drei";
import * as THREE from "three";

interface NeuralAvatarProps {
  position?: [number, number, number];
  scale?: number;
}

function AvatarMesh({ scale = 1.0 }: { scale?: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef1 = useRef<THREE.Mesh>(null);
  const ringRef2 = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Load the glb from public/models/avatar.glb
  const { scene } = useGLTF("/models/avatar.glb");

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Gentle breathing / idle rotation
      groupRef.current.rotation.y += delta * 0.2;
    }
    if (ringRef1.current) {
      ringRef1.current.rotation.z += delta * 0.4;
      ringRef1.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
    if (ringRef2.current) {
      ringRef2.current.rotation.z -= delta * 0.3;
      ringRef2.current.rotation.y += delta * 0.25;
    }
  });

  return (
    <group
      ref={groupRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <Center>
        <primitive object={scene} scale={scale} />
      </Center>

      {/* Cybernetic Orbital Ring 1 - Lime */}
      <mesh ref={ringRef1} position={[0, 0, 0]} rotation={[Math.PI / 3, 0, 0]}>
        <ringGeometry args={[1.3, 1.34, 64]} />
        <meshBasicMaterial
          color="#D4FF00"
          transparent
          opacity={hovered ? 0.85 : 0.45}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Cybernetic Orbital Ring 2 - Cyan */}
      <mesh ref={ringRef2} position={[0, 0.2, 0]} rotation={[-Math.PI / 4, Math.PI / 6, 0]}>
        <ringGeometry args={[1.6, 1.63, 64]} />
        <meshBasicMaterial
          color="#00F0FF"
          transparent
          opacity={hovered ? 0.75 : 0.35}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Floating 3D Telemetry Hotspot Pinned to Model */}
      <Html position={[0.8, 0.9, 0.3]} distanceFactor={8}>
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#07090C]/90 border border-[#D4FF00]/40 backdrop-blur-md text-[10px] font-mono text-[#D4FF00] shadow-[0_0_15px_rgba(212,255,0,0.25)] select-none pointer-events-none whitespace-nowrap">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4FF00] animate-ping" />
          NEURAL SYNC: 99.4%
        </div>
      </Html>

      <Html position={[-0.85, -0.4, 0.2]} distanceFactor={8}>
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#07090C]/85 border border-[#00F0FF]/30 backdrop-blur-md text-[9px] font-mono text-[#00F0FF] select-none pointer-events-none whitespace-nowrap">
          <span className="w-1 h-1 rounded-full bg-[#00F0FF]" />
          COGNITIVE ENGINE v2.4
        </div>
      </Html>
    </group>
  );
}

export function NeuralAvatar({ position = [0, 0, 0], scale = 1.0 }: NeuralAvatarProps) {
  return (
    <group position={position}>
      <Float speed={1.8} rotationIntensity={0.2} floatIntensity={0.4}>
        <Suspense
          fallback={
            <Html center>
              <div className="flex flex-col items-center gap-2 px-4 py-2 rounded-xl bg-[#090C10]/95 border border-white/10 backdrop-blur-xl text-center shadow-2xl">
                <div className="w-5 h-5 rounded-full border-2 border-[#D4FF00] border-t-transparent animate-spin" />
                <span className="text-[11px] font-mono text-slate-400">
                  Synthesizing Neural Mesh...
                </span>
              </div>
            </Html>
          }
        >
          <AvatarMesh scale={scale} />
        </Suspense>
      </Float>
    </group>
  );
}

useGLTF.preload("/models/avatar.glb");
