"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface CameraRigProps {
  scrollProgress: number;
  mousePos: { x: number; y: number };
}

function smoothStep(t: number): number {
  const clamped = Math.min(Math.max(t, 0), 1);
  return clamped * clamped * (3 - 2 * clamped);
}

export function CinematicCameraRig({ scrollProgress, mousePos }: CameraRigProps) {
  const currentPos = useRef(new THREE.Vector3(0, 0.12, 3.8));
  const currentLookAt = useRef(new THREE.Vector3(0, 0.05, 0));

  useFrame(({ camera }) => {
    // 7 Continuous Chapters strictly coordinated with the LifeGraph story:
    // 01: Hero (0.00 - 0.15) -> Commanding eye level
    // 02: Scattered Knowledge (0.15 - 0.32) -> Frame text & fragments on left, character on right
    // 03: Connection (0.32 - 0.48) -> Closer, elevated, orbital nodes forming
    // 04: AI Understanding (0.48 - 0.65) -> Profile synthesis angle with light sweep
    // 05: Explore Your Knowledge (0.65 - 0.82) -> Deep in-graph immersion
    // 06: Personal Growth (0.82 - 0.93) -> Elevated panoramic view of network
    // 07: Final CTA (0.93 - 1.00) -> Center iconic portrait pull back

    let targetCamX = 0;
    let targetCamY = 0.12;
    let targetCamZ = 3.8;
    let lookX = 0;
    let lookY = 0.05;
    let lookZ = 0;

    const p = Math.min(Math.max(scrollProgress, 0), 1);

    if (p < 0.15) {
      // 01: Hero
      const t = smoothStep(p / 0.15);
      targetCamX = THREE.MathUtils.lerp(0, 0.02, t);
      targetCamY = THREE.MathUtils.lerp(0.12, 0.1, t);
      targetCamZ = THREE.MathUtils.lerp(3.8, 3.7, t);
      lookX = THREE.MathUtils.lerp(0, 0.02, t);
      lookY = 0.05;
    } else if (p < 0.32) {
      // 02: Scattered Knowledge
      const t = smoothStep((p - 0.15) / 0.17);
      targetCamX = THREE.MathUtils.lerp(0.02, -0.12, t);
      targetCamY = THREE.MathUtils.lerp(0.1, 0.08, t);
      targetCamZ = THREE.MathUtils.lerp(3.7, 3.6, t);
      lookX = THREE.MathUtils.lerp(0.02, 0.1, t);
      lookY = THREE.MathUtils.lerp(0.05, 0.04, t);
    } else if (p < 0.48) {
      // 03: Connection
      const t = smoothStep((p - 0.32) / 0.16);
      targetCamX = THREE.MathUtils.lerp(-0.12, 0.05, t);
      targetCamY = THREE.MathUtils.lerp(0.08, 0.16, t);
      targetCamZ = THREE.MathUtils.lerp(3.6, 3.35, t);
      lookX = THREE.MathUtils.lerp(0.1, 0.02, t);
      lookY = THREE.MathUtils.lerp(0.04, 0.06, t);
    } else if (p < 0.65) {
      // 04: AI Understanding
      const t = smoothStep((p - 0.48) / 0.17);
      targetCamX = THREE.MathUtils.lerp(0.05, -0.18, t);
      targetCamY = THREE.MathUtils.lerp(0.16, 0.1, t);
      targetCamZ = THREE.MathUtils.lerp(3.35, 3.0, t);
      lookX = THREE.MathUtils.lerp(0.02, 0.12, t);
      lookY = THREE.MathUtils.lerp(0.06, 0.06, t);
    } else if (p < 0.82) {
      // 05: Explore Your Knowledge
      const t = smoothStep((p - 0.65) / 0.17);
      targetCamX = THREE.MathUtils.lerp(-0.18, 0.18, t);
      targetCamY = THREE.MathUtils.lerp(0.1, 0.05, t);
      targetCamZ = THREE.MathUtils.lerp(3.0, 2.75, t);
      lookX = THREE.MathUtils.lerp(0.12, -0.08, t);
      lookY = THREE.MathUtils.lerp(0.06, 0.08, t);
      lookZ = THREE.MathUtils.lerp(0, 0.2, t);
    } else if (p < 0.93) {
      // 06: Personal Growth
      const t = smoothStep((p - 0.82) / 0.11);
      targetCamX = THREE.MathUtils.lerp(0.18, 0, t);
      targetCamY = THREE.MathUtils.lerp(0.05, 0.32, t);
      targetCamZ = THREE.MathUtils.lerp(2.75, 3.65, t);
      lookX = THREE.MathUtils.lerp(-0.08, 0, t);
      lookY = THREE.MathUtils.lerp(0.08, -0.02, t);
      lookZ = THREE.MathUtils.lerp(0.2, 0, t);
    } else {
      // 07: Final CTA
      const t = smoothStep((p - 0.93) / 0.07);
      targetCamX = THREE.MathUtils.lerp(0, 0, t);
      targetCamY = THREE.MathUtils.lerp(0.32, 0.12, t);
      targetCamZ = THREE.MathUtils.lerp(3.65, 3.8, t);
      lookX = 0;
      lookY = THREE.MathUtils.lerp(-0.02, 0.04, t);
      lookZ = 0;
    }

    // Subtle pointer parallax offset (restrained and elegant)
    const parallaxX = mousePos.x * 0.18;
    const parallaxY = -mousePos.y * 0.12;

    // Smooth lerp damping
    currentPos.current.x = THREE.MathUtils.lerp(
      currentPos.current.x,
      targetCamX + parallaxX,
      0.06
    );
    currentPos.current.y = THREE.MathUtils.lerp(
      currentPos.current.y,
      targetCamY + parallaxY,
      0.06
    );
    currentPos.current.z = THREE.MathUtils.lerp(
      currentPos.current.z,
      targetCamZ,
      0.06
    );

    currentLookAt.current.x = THREE.MathUtils.lerp(
      currentLookAt.current.x,
      lookX + parallaxX * 0.2,
      0.065
    );
    currentLookAt.current.y = THREE.MathUtils.lerp(
      currentLookAt.current.y,
      lookY + parallaxY * 0.2,
      0.065
    );
    currentLookAt.current.z = THREE.MathUtils.lerp(
      currentLookAt.current.z,
      lookZ,
      0.065
    );

    camera.position.copy(currentPos.current);
    camera.lookAt(currentLookAt.current);
  });

  return null;
}
