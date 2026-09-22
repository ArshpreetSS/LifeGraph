"use client";

import React, { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, Float, Center } from "@react-three/drei";
import * as THREE from "three";

interface ArtCharacterProps {
  scrollProgress: number;
}

function smoothStep(t: number): number {
  const clamped = Math.min(Math.max(t, 0), 1);
  return clamped * clamped * (3 - 2 * clamped);
}

export function ArtCharacter({ scrollProgress }: ArtCharacterProps) {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);

  // Load the user's GLB model directly
  const { scene } = useGLTF("/models/avatar.glb");

  // Pointer tracking & harmonic idle breathing state
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const prevMouseRef = useRef({ x: 0.5, y: 0.5 });
  const idleFramesRef = useRef(0);
  const startTimeRef = useRef(performance.now());
  const gazeRef = useRef({ yaw: 0, pitch: 0, roll: 0 });

  // Current interpolated transforms
  const currentPos = useRef(new THREE.Vector3(0.4, -0.28, 0));
  const currentRotY = useRef(-0.2);
  const currentScale = useRef(2.55);

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

  useFrame((_, delta) => {
    if (!groupRef.current || !headRef.current) return;

    const p = Math.min(Math.max(scrollProgress, 0), 1);

    // FILM-STYLE CHOREOGRAPHY ACROSS 6 CONTINUOUS ACTS:
    // Act 1: Hero (0.00 - 0.18) -> Character emerges on right-hand side, partially masked by giant typography
    // Act 2: Problem (0.18 - 0.36) -> Moves slowly to far right edge, looking back at floating text fragments
    // Act 3: Connection (0.36 - 0.54) -> Moves gently toward center-left, camera approaches, constellation weaves around her
    // Act 4: Understanding (0.54 - 0.70) -> Close-up side profile, contemplative gaze as light sweeps her features
    // Act 5: Explore (0.70 - 0.85) -> Glides in depth as camera moves through the knowledge path
    // Act 6: Grow & Finale (0.85 - 1.00) -> Centers into a calm, commanding, monumental portrait

    let targetX = 1.15;
    let targetY = -0.24;
    let targetZ = 0.18;
    let targetRotY = -0.20;
    let targetScale = 2.65;

    if (p < 0.18) {
      // Act 1: Hero (Prominently placed at the right side of the screen)
      const t = smoothStep(p / 0.18);
      targetX = THREE.MathUtils.lerp(1.15, 1.20, t);
      targetY = -0.24;
      targetZ = 0.18;
      targetRotY = THREE.MathUtils.lerp(-0.18, -0.25, t);
      targetScale = 2.65;
    } else if (p < 0.36) {
      // Act 2: Fragmented Problem (Right side, observing empty space & fragments on left)
      const t = smoothStep((p - 0.18) / 0.18);
      targetX = THREE.MathUtils.lerp(1.20, 1.18, t);
      targetY = THREE.MathUtils.lerp(-0.24, -0.24, t);
      targetZ = THREE.MathUtils.lerp(0.18, 0.15, t);
      targetRotY = THREE.MathUtils.lerp(-0.25, -0.32, t);
      targetScale = THREE.MathUtils.lerp(2.65, 2.60, t);
    } else if (p < 0.54) {
      // Act 3: Connection (Right side framing as constellation forms around)
      const t = smoothStep((p - 0.36) / 0.18);
      targetX = THREE.MathUtils.lerp(1.18, 1.05, t);
      targetY = -0.24;
      targetZ = THREE.MathUtils.lerp(0.15, 0.22, t);
      targetRotY = THREE.MathUtils.lerp(-0.32, -0.15, t);
      targetScale = THREE.MathUtils.lerp(2.60, 2.68, t);
    } else if (p < 0.70) {
      // Act 4: AI Understanding (Right side profile close-up, dramatic lighting)
      const t = smoothStep((p - 0.54) / 0.16);
      targetX = THREE.MathUtils.lerp(1.05, 1.00, t);
      targetY = THREE.MathUtils.lerp(-0.24, -0.24, t);
      targetZ = THREE.MathUtils.lerp(0.22, 0.28, t);
      targetRotY = THREE.MathUtils.lerp(-0.15, -0.30, t);
      targetScale = THREE.MathUtils.lerp(2.68, 2.76, t);
    } else if (p < 0.85) {
      // Act 5: Explore (Right side depth perspective)
      const t = smoothStep((p - 0.70) / 0.15);
      targetX = THREE.MathUtils.lerp(1.00, 1.05, t);
      targetY = THREE.MathUtils.lerp(-0.24, -0.23, t);
      targetZ = THREE.MathUtils.lerp(0.28, 0.18, t);
      targetRotY = THREE.MathUtils.lerp(-0.30, -0.18, t);
      targetScale = THREE.MathUtils.lerp(2.76, 2.62, t);
    } else {
      // Act 6: Grow & Finale (Transitions gracefully from right side to centered iconic finale)
      const t = smoothStep((p - 0.85) / 0.15);
      targetX = THREE.MathUtils.lerp(1.05, 0.0, t);
      targetY = THREE.MathUtils.lerp(-0.23, -0.26, t);
      targetZ = THREE.MathUtils.lerp(0.18, 0.08, t);
      targetRotY = THREE.MathUtils.lerp(-0.18, 0.0, t);
      targetScale = THREE.MathUtils.lerp(2.62, 2.65, t);
    }

    // Filmic smooth damping for transforms
    currentPos.current.x = THREE.MathUtils.lerp(currentPos.current.x, targetX, 0.055);
    currentPos.current.y = THREE.MathUtils.lerp(currentPos.current.y, targetY, 0.055);
    currentPos.current.z = THREE.MathUtils.lerp(currentPos.current.z, targetZ, 0.055);
    currentRotY.current = THREE.MathUtils.lerp(currentRotY.current, targetRotY, 0.055);
    currentScale.current = THREE.MathUtils.lerp(currentScale.current, targetScale, 0.055);

    groupRef.current.position.copy(currentPos.current);
    groupRef.current.scale.setScalar(currentScale.current);

    // Natural Gaze Tracking with subtle harmonic idle breathing
    const curX = mouseRef.current.x;
    const curY = mouseRef.current.y;
    const c = (curX - 0.5) * 2;
    const te = (curY - 0.5) * 2;

    const mouseDelta =
      Math.abs(curX - prevMouseRef.current.x) + Math.abs(curY - prevMouseRef.current.y);

    if (mouseDelta < 0.0008) {
      idleFramesRef.current = Math.min(idleFramesRef.current + 1, 120);
    } else {
      idleFramesRef.current = 0;
    }
    prevMouseRef.current = { x: curX, y: curY };

    const Q = Math.min(idleFramesRef.current / 45, 1);
    const t = (performance.now() - startTimeRef.current) / 1000;

    // Harmonic multi-frequency waves (subtle human pulse)
    const harmonicYaw =
      Math.sin(t * 0.12) * 4.5 + Math.sin(t * 0.28 + 1.2) * 2.5;
    const harmonicPitch =
      Math.cos(t * 0.11 + 0.5) * 3.0 + Math.cos(t * 0.32 + 2.0) * 1.5;
    const harmonicRoll =
      Math.sin(t * 0.14 + 2.0) * 1.2;

    const targetGazeYaw = c * 14 * (1 - Q) + harmonicYaw * Q;
    const targetGazePitch = te * 9 * (1 - Q) + harmonicPitch * Q;
    const targetGazeRoll = c * 3.5 * (1 - Q) + harmonicRoll * Q;

    gazeRef.current.yaw = THREE.MathUtils.lerp(gazeRef.current.yaw, targetGazeYaw, 0.065);
    gazeRef.current.pitch = THREE.MathUtils.lerp(gazeRef.current.pitch, targetGazePitch, 0.065);
    gazeRef.current.roll = THREE.MathUtils.lerp(gazeRef.current.roll, targetGazeRoll, 0.055);

    headRef.current.rotation.x = THREE.MathUtils.degToRad(gazeRef.current.pitch);
    headRef.current.rotation.y = currentRotY.current + THREE.MathUtils.degToRad(gazeRef.current.yaw);
    headRef.current.rotation.z = THREE.MathUtils.degToRad(gazeRef.current.roll);
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.1} rotationIntensity={0.03} floatIntensity={0.12}>
        <group ref={headRef}>
          <Center position={[0, -0.1, 0]}>
            <primitive object={scene} scale={0.52} />
          </Center>
        </group>
      </Float>
    </group>
  );
}

useGLTF.preload("/models/avatar.glb");
