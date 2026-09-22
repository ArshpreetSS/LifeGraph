"use client";

import React, { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, Html, Center, Float } from "@react-three/drei";
import * as THREE from "three";

interface RolfHeadControllerProps {
  wireframe?: boolean;
  scale?: number;
  position?: [number, number, number];
  isDragging?: boolean;
}

export function RolfHeadController({
  wireframe = false,
  scale = 1.35,
  position = [0, -0.3, 0],
  isDragging = false,
}: RolfHeadControllerProps) {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  // Load the 3D model
  const { scene } = useGLTF("/models/avatar.glb");

  // Pointer tracking & physics state inspired by Rolf Jensen's Head3D
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const prevMouseRef = useRef({ x: 0.5, y: 0.5 });
  const idleFramesRef = useRef(0);
  const startTimeRef = useRef(performance.now());

  // Rotation angles in degrees for lerping
  const rotRef = useRef({ yaw: 0, pitch: 0, roll: 0 });

  // Handle global mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Update wireframe property across all mesh materials
  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((m) => {
            if ("wireframe" in m) {
              (m as THREE.MeshStandardMaterial).wireframe = wireframe;
            }
          });
        } else if (mesh.material && "wireframe" in mesh.material) {
          (mesh.material as THREE.MeshStandardMaterial).wireframe = wireframe;
        }
      }
    });
  }, [scene, wireframe]);

  // Frame update loop with Rolf Jensen's exact physics & harmonic idle breathing
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // If user is manually orbiting with mouse drag, yield control to orbit
    if (isDragging) {
      idleFramesRef.current = 0;
      return;
    }

    // Normalized mouse [-1, 1]
    const curX = mouseRef.current.x;
    const curY = mouseRef.current.y;
    const c = (curX - 0.5) * 2;
    const te = (curY - 0.5) * 2;

    // Detect idle: check if mouse has barely moved
    const mouseDelta =
      Math.abs(curX - prevMouseRef.current.x) + Math.abs(curY - prevMouseRef.current.y);

    if (mouseDelta < 0.0008) {
      idleFramesRef.current = Math.min(idleFramesRef.current + 1, 120);
    } else {
      idleFramesRef.current = 0;
    }
    prevMouseRef.current = { x: curX, y: curY };

    // Q: Idle blend weight (0 = active mouse tracking, 1 = natural idle breathing)
    const Q = Math.min(idleFramesRef.current / 45, 1);

    // Elapsed seconds for harmonic wave generation
    const t = (performance.now() - startTimeRef.current) / 1000;

    // Multi-frequency harmonic noise from Rolf Jensen's Head3D engine:
    // Natural organic head wandering and micro-glances
    const harmonicYaw =
      Math.sin(t * 0.15) * 10 + Math.sin(t * 0.37 + 1.2) * 6 + Math.sin(t * 0.83 + 3.1) * 2.5;
    const harmonicPitch =
      Math.cos(t * 0.12 + 0.5) * 7 + Math.cos(t * 0.41 + 2.4) * 4 + Math.cos(t * 0.74 + 0.8) * 1.8;
    const harmonicRoll =
      Math.sin(t * 0.18 + 2.0) * 3.5 + Math.cos(t * 0.52 + 1.6) * 2.0;

    // Target angles:
    // Mouse tracking: Yaw ±35 deg, Pitch ±22 deg, Roll ±10 deg
    const targetYaw = c * 35 * (1 - Q) + harmonicYaw * Q;
    const targetPitch = te * 22 * (1 - Q) + harmonicPitch * Q;
    const targetRoll = c * 10 * (1 - Q) + harmonicRoll * Q;

    // Smooth lerp (0.085 damping factor)
    rotRef.current.yaw = THREE.MathUtils.lerp(rotRef.current.yaw, targetYaw, 0.085);
    rotRef.current.pitch = THREE.MathUtils.lerp(rotRef.current.pitch, targetPitch, 0.085);
    rotRef.current.roll = THREE.MathUtils.lerp(rotRef.current.roll, targetRoll, 0.07);

    // Apply rotation in radians
    groupRef.current.rotation.x = THREE.MathUtils.degToRad(rotRef.current.pitch);
    groupRef.current.rotation.y = THREE.MathUtils.degToRad(rotRef.current.yaw);
    groupRef.current.rotation.z = THREE.MathUtils.degToRad(rotRef.current.roll);

    // Gyroscopic rings rotation
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.35;
      ring1Ref.current.rotation.x = Math.sin(t * 0.6) * 0.2;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= delta * 0.3;
      ring2Ref.current.rotation.y += delta * 0.25;
    }
  });

  return (
    <group position={position}>
      <Float speed={1.6} rotationIntensity={0.1} floatIntensity={0.25}>
        <group ref={groupRef}>
          <Center>
            <primitive object={scene} scale={scale} />
          </Center>

          {/* Futuristic Gyroscopic Orbit Ring 1 - Lime (#D4FF00) */}
          <mesh ref={ring1Ref} position={[0, 0, 0]} rotation={[Math.PI / 3.5, 0, 0]}>
            <ringGeometry args={[1.38, 1.41, 72]} />
            <meshBasicMaterial
              color="#D4FF00"
              transparent
              opacity={0.6}
              side={THREE.DoubleSide}
            />
          </mesh>

          {/* Futuristic Gyroscopic Orbit Ring 2 - Cyan (#00F0FF) */}
          <mesh ref={ring2Ref} position={[0, 0.15, 0]} rotation={[-Math.PI / 4, Math.PI / 5, 0]}>
            <ringGeometry args={[1.58, 1.61, 72]} />
            <meshBasicMaterial
              color="#00F0FF"
              transparent
              opacity={0.45}
              side={THREE.DoubleSide}
            />
          </mesh>

          {/* Pinned 3D HTML Hotspot 1: Neural Synapse */}
          <Html position={[0.82, 0.88, 0.2]} distanceFactor={6.2}>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#080B0F]/90 border border-[#D4FF00]/50 backdrop-blur-md text-[10px] font-mono text-[#D4FF00] shadow-[0_0_15px_rgba(212,255,0,0.3)] select-none pointer-events-none whitespace-nowrap transition-transform duration-300 hover:scale-105">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4FF00] animate-pulse" />
              <span>SYNAPSE ACTIVE // 99.4%</span>
            </div>
          </Html>

          {/* Pinned 3D HTML Hotspot 2: Knowledge Vector */}
          <Html position={[-0.85, -0.28, 0.15]} distanceFactor={6.2}>
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#080B0F]/90 border border-[#00F0FF]/40 backdrop-blur-md text-[9px] font-mono text-[#00F0FF] select-none pointer-events-none whitespace-nowrap">
              <span className="w-1 h-1 rounded-full bg-[#00F0FF]" />
              <span>VECTOR EMBEDDING // 142K</span>
            </div>
          </Html>
        </group>
      </Float>
    </group>
  );
}

useGLTF.preload("/models/avatar.glb");
