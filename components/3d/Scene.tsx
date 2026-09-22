"use client";

import React, { useEffect, useState, Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { CinematicCameraRig } from "./CinematicCameraRig";
import { CinematicModel } from "./CinematicModel";
import { KnowledgeGraph } from "./KnowledgeGraph";
import { Particles } from "./Particles";
import { GraphNodeData } from "@/lib/data/mockGraphData";

function DynamicStudioLighting({ scrollProgress }: { scrollProgress: number }) {
  const keyLightRef = useRef<THREE.PointLight>(null);
  const rimLimeRef = useRef<THREE.PointLight>(null);
  const rimCyanRef = useRef<THREE.PointLight>(null);
  const fillLightRef = useRef<THREE.DirectionalLight>(null);

  useFrame(({ pointer }) => {
    // Key light smoothly tracks pointer with cinematic presence
    if (keyLightRef.current) {
      keyLightRef.current.position.x = THREE.MathUtils.lerp(
        keyLightRef.current.position.x,
        pointer.x * 3.8,
        0.06
      );
      keyLightRef.current.position.y = THREE.MathUtils.lerp(
        keyLightRef.current.position.y,
        pointer.y * 2.8 + 1.2,
        0.06
      );
    }

    const p = scrollProgress;

    // AI Understanding chapter (0.48 - 0.65): intensify electric lime rim
    if (rimLimeRef.current) {
      const targetIntensity = p > 0.45 && p < 0.68 ? 4.2 : 2.2;
      rimLimeRef.current.intensity = THREE.MathUtils.lerp(
        rimLimeRef.current.intensity,
        targetIntensity,
        0.04
      );
    }

    // Final CTA (0.93+): soften everything for a clean portrait
    if (rimCyanRef.current) {
      const targetCyanIntensity = p > 0.93 ? 1.2 : 2.0;
      rimCyanRef.current.intensity = THREE.MathUtils.lerp(
        rimCyanRef.current.intensity,
        targetCyanIntensity,
        0.04
      );
    }
  });

  return (
    <>
      <ambientLight intensity={1.3} />
      <directionalLight position={[5, 8, 5]} intensity={2.0} color="#FFFFFF" castShadow={false} />
      {/* Key light — pointer tracking */}
      <pointLight
        ref={keyLightRef}
        position={[0, 1.5, 4.0]}
        intensity={2.4}
        color="#FFFFFF"
        distance={14}
      />
      {/* Signature Electric Lime rim — left */}
      <pointLight
        ref={rimLimeRef}
        position={[-4.2, 2.2, -1.2]}
        intensity={2.2}
        color="#D4FF00"
        distance={12}
      />
      {/* Topological Cyan rim — right */}
      <pointLight
        ref={rimCyanRef}
        position={[4.2, 1.8, -1.2]}
        intensity={2.0}
        color="#00F0FF"
        distance={12}
      />
      {/* Soft floor bounce fill */}
      <directionalLight
        ref={fillLightRef}
        position={[0, -4, 2]}
        intensity={0.35}
        color="#88AAFF"
      />
    </>
  );
}

interface SceneProps {
  onSelectNode?: (node: GraphNodeData) => void;
}

export function Scene({ onSelectNode }: SceneProps = {}) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [wireframe, setWireframe] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePos({ x, y });
    };

    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        const progress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
        setScrollProgress(progress);
      }
    };

    const handleWireframeToggle = (e: Event) => {
      const custom = e as CustomEvent<boolean>;
      setWireframe((prev) => (custom.detail !== undefined ? custom.detail : !prev));
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("lifegraph-toggle-wireframe", handleWireframeToggle);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("lifegraph-toggle-wireframe", handleWireframeToggle);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      {/* Atmospheric glow orbs — background layer */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "15%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "800px",
          height: "640px",
          background: "radial-gradient(ellipse, rgba(212,255,0,0.04) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          top: "65%",
          right: "20%",
          width: "680px",
          height: "680px",
          background: "radial-gradient(ellipse, rgba(0,240,255,0.035) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "10%",
          left: "15%",
          width: "500px",
          height: "500px",
          background: "radial-gradient(ellipse, rgba(16,185,129,0.025) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* R3F Canvas with pointer events enabled for 3D interactions */}
      <Canvas
        className="pointer-events-auto"
        camera={{ position: [0, 0.12, 3.8], fov: 40, near: 0.1, far: 100 }}
        dpr={[1, Math.min(2, typeof window !== "undefined" ? window.devicePixelRatio : 2)]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <DynamicStudioLighting scrollProgress={scrollProgress} />

        <CinematicCameraRig scrollProgress={scrollProgress} mousePos={mousePos} />

        <Suspense fallback={null}>
          {/* Main 3D Avatar (Digital Intelligence Representation) */}
          <CinematicModel scrollProgress={scrollProgress} wireframe={wireframe} />

          {/* Living 3D Knowledge Graph that surrounds her & evolves with scroll */}
          <KnowledgeGraph
            scrollProgress={scrollProgress}
            onSelectNode={onSelectNode}
            interactive={true}
            mousePos={mousePos}
          />
        </Suspense>

        {/* Ambient Stardust particles creating spatial depth */}
        <Particles count={280} />
      </Canvas>
    </div>
  );
}
