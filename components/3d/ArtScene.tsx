"use client";

import React, { useEffect, useState, Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { ArtCharacter } from "./ArtCharacter";
import { ConstellationGraph } from "./ConstellationGraph";

function smoothStep(t: number): number {
  const clamped = Math.min(Math.max(t, 0), 1);
  return clamped * clamped * (3 - 2 * clamped);
}

function CinematicCamera({ scrollProgress, mousePos }: { scrollProgress: number; mousePos: { x: number; y: number } }) {
  const currentPos = useRef(new THREE.Vector3(0, 0.05, 3.8));
  const currentLookAt = useRef(new THREE.Vector3(0.15, 0.0, 0));

  useFrame(({ camera }) => {
    const p = Math.min(Math.max(scrollProgress, 0), 1);

    // FILM-DIRECTED CAMERA PATH ACROSS 6 CONTINUOUS CHAPTERS:
    let targetCamX = 0.0;
    let targetCamY = 0.05;
    let targetCamZ = 3.8;
    let lookX = 0.15;
    let lookY = 0.0;
    let lookZ = 0.0;

    if (p < 0.18) {
      // Act 1: Hero (Framing character on the right, ample space on left)
      const t = smoothStep(p / 0.18);
      targetCamX = THREE.MathUtils.lerp(0.0, -0.05, t);
      targetCamY = 0.05;
      targetCamZ = THREE.MathUtils.lerp(3.8, 3.7, t);
      lookX = THREE.MathUtils.lerp(0.15, 0.18, t);
      lookY = 0.0;
    } else if (p < 0.36) {
      // Act 2: The Problem (Camera pulls slightly wide, framing the vast negative space on left)
      const t = smoothStep((p - 0.18) / 0.18);
      targetCamX = THREE.MathUtils.lerp(-0.05, -0.15, t);
      targetCamY = THREE.MathUtils.lerp(0.05, 0.08, t);
      targetCamZ = THREE.MathUtils.lerp(3.7, 3.75, t);
      lookX = THREE.MathUtils.lerp(0.18, 0.22, t);
      lookY = 0.02;
    } else if (p < 0.54) {
      // Act 3: Connection (Camera glides closer, character centers slightly, constellation forms)
      const t = smoothStep((p - 0.36) / 0.18);
      targetCamX = THREE.MathUtils.lerp(-0.15, 0.08, t);
      targetCamY = THREE.MathUtils.lerp(0.08, 0.14, t);
      targetCamZ = THREE.MathUtils.lerp(3.75, 3.3, t);
      lookX = THREE.MathUtils.lerp(0.22, 0.05, t);
      lookY = 0.05;
    } else if (p < 0.70) {
      // Act 4: Understanding (Intimate, cinematic camera crop)
      const t = smoothStep((p - 0.54) / 0.16);
      targetCamX = THREE.MathUtils.lerp(0.08, -0.18, t);
      targetCamY = THREE.MathUtils.lerp(0.14, 0.06, t);
      targetCamZ = THREE.MathUtils.lerp(3.3, 2.85, t);
      lookX = THREE.MathUtils.lerp(0.05, 0.16, t);
      lookY = 0.04;
    } else if (p < 0.85) {
      // Act 5: Explore (Smooth spatial glide into depth)
      const t = smoothStep((p - 0.70) / 0.15);
      targetCamX = THREE.MathUtils.lerp(-0.18, 0.2, t);
      targetCamY = THREE.MathUtils.lerp(0.06, 0.02, t);
      targetCamZ = THREE.MathUtils.lerp(2.85, 2.65, t);
      lookX = THREE.MathUtils.lerp(0.16, -0.1, t);
      lookY = 0.06;
      lookZ = THREE.MathUtils.lerp(0.0, 0.25, t);
    } else {
      // Act 6: Grow & Finale (Slow, monumental pull back to iconic center)
      const t = smoothStep((p - 0.85) / 0.15);
      targetCamX = THREE.MathUtils.lerp(0.2, 0.0, t);
      targetCamY = THREE.MathUtils.lerp(0.02, 0.08, t);
      targetCamZ = THREE.MathUtils.lerp(2.65, 3.85, t);
      lookX = THREE.MathUtils.lerp(-0.1, 0.0, t);
      lookY = 0.02;
      lookZ = 0.0;
    }

    // Subtle, restrained mouse parallax
    const parallaxX = mousePos.x * 0.12;
    const parallaxY = -mousePos.y * 0.08;

    currentPos.current.x = THREE.MathUtils.lerp(currentPos.current.x, targetCamX + parallaxX, 0.05);
    currentPos.current.y = THREE.MathUtils.lerp(currentPos.current.y, targetCamY + parallaxY, 0.05);
    currentPos.current.z = THREE.MathUtils.lerp(currentPos.current.z, targetCamZ, 0.05);

    currentLookAt.current.x = THREE.MathUtils.lerp(currentLookAt.current.x, lookX + parallaxX * 0.2, 0.055);
    currentLookAt.current.y = THREE.MathUtils.lerp(currentLookAt.current.y, lookY + parallaxY * 0.2, 0.055);
    currentLookAt.current.z = THREE.MathUtils.lerp(currentLookAt.current.z, lookZ, 0.055);

    camera.position.copy(currentPos.current);
    camera.lookAt(currentLookAt.current);
  });

  return null;
}

function StudioLighting({ scrollProgress }: { scrollProgress: number }) {
  const rimLightRef = useRef<THREE.DirectionalLight>(null);

  useFrame(() => {
    if (!rimLightRef.current) return;
    const p = scrollProgress;
    // In Chapter 4 (Understanding), sweep subtle rim light across profile
    if (p > 0.52 && p < 0.72) {
      rimLightRef.current.intensity = 2.4;
    } else {
      rimLightRef.current.intensity = 1.2;
    }
  });

  return (
    <>
      <ambientLight intensity={1.2} color="#18181B" />
      {/* Key Studio Light */}
      <directionalLight position={[4, 6, 4]} intensity={2.0} color="#FFFFFF" />
      {/* Soft Fill Light */}
      <directionalLight position={[-4, 2, 2]} intensity={0.6} color="#A1A1AA" />
      {/* Dramatic Rim / Silhouette Light */}
      <directionalLight ref={rimLightRef} position={[0, 3, -3]} intensity={1.2} color="#F4F4F5" />
    </>
  );
}

export function ArtScene() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePos({ x, y });
    };

    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        setScrollProgress(Math.min(1, Math.max(0, window.scrollY / maxScroll)));
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-[#070708]">
      <Canvas
        className="pointer-events-none"
        camera={{ position: [0, 0.05, 3.8], fov: 38, near: 0.1, far: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      >
        <color attach="background" args={["#070708"]} />

        <StudioLighting scrollProgress={scrollProgress} />
        <CinematicCamera scrollProgress={scrollProgress} mousePos={mousePos} />

        <Suspense fallback={null}>
          <ArtCharacter scrollProgress={scrollProgress} />
          <ConstellationGraph scrollProgress={scrollProgress} />
        </Suspense>
      </Canvas>
    </div>
  );
}
