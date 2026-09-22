"use client";

import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Html, Center, Float } from "@react-three/drei";
import * as THREE from "three";
import { Maximize2, Cpu, Zap, Activity } from "lucide-react";

interface RolfAvatarProps {
  wireframe?: boolean;
  scale?: number;
  isDragging?: boolean;
}

function RolfAvatarModel({ wireframe = false, scale = 1.35, isDragging = false }: RolfAvatarProps) {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  // Load the 3D model
  const { scene } = useGLTF("/models/avatar.glb");

  // Rolf Jensen Head3D pointer tracking & physics state
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const prevMouseRef = useRef({ x: 0.5, y: 0.5 });
  const idleFramesRef = useRef(0);
  const startTimeRef = useRef(performance.now());
  const rotRef = useRef({ yaw: 0, pitch: 0, roll: 0 });

  // Track global window cursor position
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

    // Q: Idle blend factor (0 = tracking, 1 = natural idle breathing)
    const Q = Math.min(idleFramesRef.current / 45, 1);

    // Elapsed seconds for harmonic wave generation
    const t = (performance.now() - startTimeRef.current) / 1000;

    // Multi-frequency harmonic noise from Rolf Jensen's Head3D engine:
    const harmonicYaw =
      Math.sin(t * 0.15) * 10 + Math.sin(t * 0.37 + 1.2) * 6 + Math.sin(t * 0.83 + 3.1) * 2.5;
    const harmonicPitch =
      Math.cos(t * 0.12 + 0.5) * 7 + Math.cos(t * 0.41 + 2.4) * 4 + Math.cos(t * 0.74 + 0.8) * 1.8;
    const harmonicRoll =
      Math.sin(t * 0.18 + 2.0) * 3.5 + Math.cos(t * 0.52 + 1.6) * 2.0;

    // Target angles: Yaw ±35 deg, Pitch ±22 deg, Roll ±10 deg
    const targetYaw = c * 35 * (1 - Q) + harmonicYaw * Q;
    const targetPitch = te * 22 * (1 - Q) + harmonicPitch * Q;
    const targetRoll = c * 10 * (1 - Q) + harmonicRoll * Q;

    // Smooth cubic lerp damping
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
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.25}>
      <group ref={groupRef}>
        <Center position={[0, -0.2, 0]}>
          <primitive object={scene} scale={scale} />
        </Center>

        {/* Futuristic Gyroscopic Orbit Ring 1 - Lime (#D4FF00) */}
        <mesh ref={ring1Ref} position={[0, 0, 0]} rotation={[Math.PI / 3.5, 0, 0]}>
          <ringGeometry args={[1.38, 1.41, 72]} />
          <meshBasicMaterial
            color="#D4FF00"
            transparent
            opacity={0.65}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Futuristic Gyroscopic Orbit Ring 2 - Cyan (#00F0FF) */}
        <mesh ref={ring2Ref} position={[0, 0.15, 0]} rotation={[-Math.PI / 4, Math.PI / 5, 0]}>
          <ringGeometry args={[1.58, 1.61, 72]} />
          <meshBasicMaterial
            color="#00F0FF"
            transparent
            opacity={0.5}
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
  );
}

useGLTF.preload("/models/avatar.glb");

function DynamicStudioLighting() {
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame(({ pointer }) => {
    if (lightRef.current) {
      // Key spotlight subtly tracks pointer to create dramatic rim highlights
      lightRef.current.position.x = THREE.MathUtils.lerp(
        lightRef.current.position.x,
        pointer.x * 4.5,
        0.08
      );
      lightRef.current.position.y = THREE.MathUtils.lerp(
        lightRef.current.position.y,
        pointer.y * 3.5 + 1.2,
        0.08
      );
    }
  });

  return (
    <>
      <ambientLight intensity={1.4} />
      <directionalLight position={[5, 8, 5]} intensity={2.2} color="#FFFFFF" />
      <pointLight
        ref={lightRef}
        position={[0, 1.5, 4.0]}
        intensity={2.8}
        color="#FFFFFF"
        distance={10}
      />
      <pointLight position={[-4, 2.5, -1]} intensity={2.2} color="#D4FF00" distance={9} />
      <pointLight position={[4, 1.8, -1]} intensity={1.8} color="#00F0FF" distance={9} />
      <directionalLight position={[0, -4, 2]} intensity={0.4} color="#88AAFF" />
    </>
  );
}

interface HeroAvatarStageProps {
  onOpenStudio?: () => void;
}

export function HeroAvatarStage({ onOpenStudio }: HeroAvatarStageProps) {
  const [wireframe, setWireframe] = useState(false);
  const [orbitMode, setOrbitMode] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [coords, setCoords] = useState({ x: "0.00", y: "0.00" });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const normX = ((e.clientX / window.innerWidth) * 2 - 1).toFixed(2);
      const normY = (-(e.clientY / window.innerHeight) * 2 + 1).toFixed(2);
      setCoords({ x: normX, y: normY });
    };
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto mt-10 rounded-2xl bg-[#080B0F]/90 border border-white/[0.08] backdrop-blur-2xl shadow-[0_25px_70px_rgba(0,0,0,0.85)] overflow-hidden relative group">
      {/* Top Editorial HUD Bar inspired by Rolf Jensen Studio */}
      <div className="px-5 py-3 border-b border-white/[0.08] flex items-center justify-between bg-black/50 text-xs font-mono">
        <div className="flex items-center gap-3">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4FF00] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4FF00]" />
          </span>
          <span className="text-white font-semibold tracking-wider">
            NEURAL EMBODIMENT // ROLF JENSEN 3D ENGINE
          </span>
          <span className="text-slate-500 hidden md:inline">
            • PTR: [{coords.x}, {coords.y}]
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Wireframe Toggle */}
          <button
            onClick={() => setWireframe(!wireframe)}
            className={`px-3 py-1 rounded-md text-[11px] font-mono transition-all ${
              wireframe
                ? "bg-[#D4FF00] text-black font-semibold shadow-[0_0_12px_rgba(212,255,0,0.4)]"
                : "bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10"
            }`}
          >
            {wireframe ? "Solid Mesh" : "Wireframe"}
          </button>

          {/* Orbit Controls Toggle */}
          <button
            onClick={() => setOrbitMode(!orbitMode)}
            className={`px-3 py-1 rounded-md text-[11px] font-mono transition-all ${
              orbitMode
                ? "bg-white/15 text-[#00F0FF] border border-[#00F0FF]/40 shadow-[0_0_10px_rgba(0,240,255,0.2)]"
                : "bg-white/5 hover:bg-white/10 text-slate-400 border border-white/10"
            }`}
          >
            {orbitMode ? "Orbit Active" : "Cursor Tracking"}
          </button>

          {onOpenStudio && (
            <button
              onClick={onOpenStudio}
              className="p-1.5 rounded-md bg-white/5 hover:bg-[#D4FF00]/20 hover:text-[#D4FF00] text-slate-400 border border-white/10 transition-colors ml-1"
              title="Expand into 3D Studio Mode"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Main 3D Canvas Viewport */}
      <div
        className="h-[400px] sm:h-[460px] md:h-[520px] w-full relative bg-gradient-to-b from-[#090C12] via-[#06080B] to-[#030507]"
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onTouchStart={() => setIsDragging(true)}
        onTouchEnd={() => setIsDragging(false)}
      >
        {/* Atmospheric Radial Studio Illumination */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[360px] h-[360px] rounded-full bg-[#D4FF00]/[0.05] blur-[110px]" />
          <div className="w-[300px] h-[300px] rounded-full bg-[#00F0FF]/[0.04] blur-[90px]" />
        </div>

        <Canvas
          camera={{ position: [0, 0.35, 3.8], fov: 42 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
        >
          <DynamicStudioLighting />

          <Suspense
            fallback={
              <Html center>
                <div className="flex flex-col items-center gap-3 px-6 py-4 rounded-xl bg-[#090C10]/95 border border-white/15 backdrop-blur-2xl shadow-2xl text-center">
                  <div className="w-6 h-6 rounded-full border-2 border-[#D4FF00] border-t-transparent animate-spin" />
                  <span className="text-xs font-mono text-white tracking-widest">
                    INITIALIZING NEURAL CORE MESH...
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    60MB PBR GLTF Container
                  </span>
                </div>
              </Html>
            }
          >
            <RolfAvatarModel
              wireframe={wireframe}
              scale={1.28}
              isDragging={orbitMode && isDragging}
            />
          </Suspense>

          {orbitMode && (
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate={false}
              minPolarAngle={Math.PI / 3}
              maxPolarAngle={Math.PI / 1.7}
            />
          )}
        </Canvas>

        {/* Minimalist Studio Corner Overlays */}
        <div className="absolute bottom-4 left-4 flex flex-col gap-1.5 pointer-events-none">
          <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-mono text-slate-300">
            <Cpu className="w-3.5 h-3.5 text-[#D4FF00]" />
            <span>KINETIC TRACKING:</span>
            <span className="text-white font-semibold">
              {orbitMode ? "ORBIT CONTROLS" : "HEAD3D PHYSICS (ACTIVE)"}
            </span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-mono text-slate-400">
            <Zap className="w-3.5 h-3.5 text-[#00F0FF]" />
            <span>MOVE CURSOR ACROSS SCREEN TO ROTATE HEAD</span>
          </div>
        </div>

        <div className="absolute bottom-4 right-4 hidden sm:flex flex-col items-end gap-1.5 pointer-events-none">
          <div className="px-3 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-mono text-slate-300">
            SOURCE: <span className="text-[#D4FF00]">girl ia 4.glb</span>
          </div>
          <div className="px-3 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono text-slate-400">
            POLYGONS: <span className="text-white">64,800</span> • PBR TEXTURED
          </div>
        </div>
      </div>
    </div>
  );
}
