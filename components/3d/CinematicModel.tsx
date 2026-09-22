"use client";

import React, { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, Float, Center } from "@react-three/drei";
import * as THREE from "three";

interface CinematicModelProps {
  scrollProgress: number;
  wireframe?: boolean;
}

function smoothStep(t: number): number {
  const clamped = Math.min(Math.max(t, 0), 1);
  return clamped * clamped * (3 - 2 * clamped);
}

// Generates an orbital ring of thought nodes that crystallize around the avatar
function ThoughtCrown({ scrollProgress }: { scrollProgress: number }) {
  const crownRef = useRef<THREE.Group>(null);
  const currentOpacity = useRef(0);

  const nodeCount = 8;
  const radius = 0.52;

  const nodes = React.useMemo(() => {
    return Array.from({ length: nodeCount }).map((_, i) => {
      const angle = (i / nodeCount) * Math.PI * 2;
      return {
        x: Math.cos(angle) * radius,
        y: 0.22 + Math.sin(angle * 2) * 0.04,
        z: Math.sin(angle) * radius,
        color: i % 2 === 0 ? "#D4FF00" : "#00F0FF",
      };
    });
  }, [nodeCount, radius]);

  useFrame((_, delta) => {
    if (!crownRef.current) return;

    // Thought crown activates from Connection through AI Understanding and Exploration (0.28 - 0.88)
    const p = scrollProgress;
    let target = 0;
    if (p >= 0.28 && p <= 0.88) {
      target = 1.0;
    } else if (p > 0.88) {
      target = 0.4;
    }

    currentOpacity.current = THREE.MathUtils.lerp(currentOpacity.current, target, 0.08);
    crownRef.current.rotation.y += delta * 0.5;
    crownRef.current.visible = currentOpacity.current > 0.02;

    crownRef.current.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        const mat = (obj as THREE.Mesh).material as THREE.MeshBasicMaterial;
        if (mat && mat.userData.baseOpacity !== undefined) {
          mat.opacity = currentOpacity.current * mat.userData.baseOpacity;
        }
      }
    });
  });

  return (
    <group ref={crownRef} position={[0, 0, 0]}>
      {/* Orbital laser connector line */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[radius - 0.006, radius + 0.006, 64]} />
        <meshBasicMaterial
          color="#D4FF00"
          transparent
          opacity={0}
          userData={{ baseOpacity: 0.5 }}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Orbiting Thought Nodes */}
      {nodes.map((n, i) => (
        <group key={i} position={[n.x, n.y, n.z]}>
          <mesh>
            <sphereGeometry args={[0.022, 16, 16]} />
            <meshBasicMaterial
              color={n.color}
              transparent
              opacity={0}
              userData={{ baseOpacity: 0.95 }}
            />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.048, 16, 16]} />
            <meshBasicMaterial
              color={n.color}
              transparent
              opacity={0}
              userData={{ baseOpacity: 0.3 }}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export function CinematicModel({ scrollProgress, wireframe = false }: CinematicModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const emissiveIntensityRef = useRef(0.0);

  // Load the user's GLB model from public/models/avatar.glb
  const { scene } = useGLTF("/models/avatar.glb");

  // Pointer tracking & harmonic idle breathing state
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const prevMouseRef = useRef({ x: 0.5, y: 0.5 });
  const idleFramesRef = useRef(0);
  const startTimeRef = useRef(performance.now());
  const gazeRef = useRef({ yaw: 0, pitch: 0, roll: 0 });

  // Current interpolated transforms
  const currentPos = useRef(new THREE.Vector3(0, -0.25, 0));
  const currentRotY = useRef(0);
  const currentScale = useRef(2.65);

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

  const origMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const wireframeMatRef = useRef<THREE.MeshBasicMaterial | null>(null);

  useEffect(() => {
    wireframeMatRef.current = new THREE.MeshBasicMaterial({
      color: "#D4FF00",
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });
  }, []);

  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (!origMaterialRef.current && mesh.material) {
          origMaterialRef.current = mesh.material as THREE.MeshStandardMaterial;
        }

        if (wireframe && wireframeMatRef.current) {
          mesh.material = wireframeMatRef.current;
        } else if (!wireframe && origMaterialRef.current) {
          mesh.material = origMaterialRef.current;
        }
      }
    });
  }, [scene, wireframe]);

  useFrame((_, delta) => {
    if (!groupRef.current || !headRef.current) return;

    const p = Math.min(Math.max(scrollProgress, 0), 1);

    // Compute target transforms across the 7 narrative acts:
    // 01: Hero (0.00 - 0.15) -> Centered, commanding, upper torso
    // 02: Scattered Knowledge (0.15 - 0.32) -> Moves right, turns subtly toward fragments
    // 03: Connection (0.32 - 0.48) -> Centers, knowledge web forms around her
    // 04: AI Understanding (0.48 - 0.65) -> Profile angle with rim light sweep
    // 05: Explore Your Knowledge (0.65 - 0.82) -> Shifts left, giving focus to interactive chain
    // 06: Personal Growth (0.82 - 0.93) -> Lowered perspective as camera elevates
    // 07: Final CTA (0.93 - 1.00) -> Center iconic portrait

    let targetX = 0;
    let targetY = -0.25;
    let targetZ = 0;
    let targetRotY = 0;
    let targetScale = 2.65;

    if (p < 0.15) {
      // 01: Hero
      const t = smoothStep(p / 0.15);
      targetX = THREE.MathUtils.lerp(0.0, 0.04, t);
      targetY = -0.25;
      targetZ = 0;
      targetRotY = THREE.MathUtils.lerp(0.0, -0.04, t);
      targetScale = 2.65;
    } else if (p < 0.32) {
      // 02: Scattered Knowledge (Placed in right center, observing left text)
      const t = smoothStep((p - 0.15) / 0.17);
      targetX = THREE.MathUtils.lerp(0.04, 0.24, t);
      targetY = THREE.MathUtils.lerp(-0.25, -0.25, t);
      targetZ = THREE.MathUtils.lerp(0, 0.08, t);
      targetRotY = THREE.MathUtils.lerp(-0.04, -0.22, t);
      targetScale = THREE.MathUtils.lerp(2.65, 2.6, t);
    } else if (p < 0.48) {
      // 03: Connection (Moves back toward center, nodes crystallize around her)
      const t = smoothStep((p - 0.32) / 0.16);
      targetX = THREE.MathUtils.lerp(0.24, 0.08, t);
      targetY = THREE.MathUtils.lerp(-0.25, -0.24, t);
      targetZ = THREE.MathUtils.lerp(0.08, 0.16, t);
      targetRotY = THREE.MathUtils.lerp(-0.22, 0.1, t);
      targetScale = THREE.MathUtils.lerp(2.6, 2.72, t);
    } else if (p < 0.65) {
      // 04: AI Understanding (Profile angle, lighting sweeps her features)
      const t = smoothStep((p - 0.48) / 0.17);
      targetX = THREE.MathUtils.lerp(0.08, 0.22, t);
      targetY = THREE.MathUtils.lerp(-0.24, -0.25, t);
      targetZ = THREE.MathUtils.lerp(0.16, 0.2, t);
      targetRotY = THREE.MathUtils.lerp(0.1, -0.32, t);
      targetScale = THREE.MathUtils.lerp(2.72, 2.76, t);
    } else if (p < 0.82) {
      // 05: Explore Your Knowledge (Shifts left, allowing right side for 3D exploration chain)
      const t = smoothStep((p - 0.65) / 0.17);
      targetX = THREE.MathUtils.lerp(0.22, -0.22, t);
      targetY = THREE.MathUtils.lerp(-0.25, -0.23, t);
      targetZ = THREE.MathUtils.lerp(0.2, 0.1, t);
      targetRotY = THREE.MathUtils.lerp(-0.32, 0.25, t);
      targetScale = THREE.MathUtils.lerp(2.76, 2.65, t);
    } else if (p < 0.93) {
      // 06: Personal Growth (Elevated view of expanding graph)
      const t = smoothStep((p - 0.82) / 0.11);
      targetX = THREE.MathUtils.lerp(-0.22, 0.0, t);
      targetY = THREE.MathUtils.lerp(-0.23, -0.3, t);
      targetZ = THREE.MathUtils.lerp(0.1, -0.05, t);
      targetRotY = THREE.MathUtils.lerp(0.25, 0.05, t);
      targetScale = THREE.MathUtils.lerp(2.65, 2.58, t);
    } else {
      // 07: Final CTA (Iconic centered portrait)
      const t = smoothStep((p - 0.93) / 0.07);
      targetX = THREE.MathUtils.lerp(0.0, 0.0, t);
      targetY = THREE.MathUtils.lerp(-0.3, -0.26, t);
      targetZ = THREE.MathUtils.lerp(-0.05, 0.0, t);
      targetRotY = THREE.MathUtils.lerp(0.05, 0.0, t);
      targetScale = THREE.MathUtils.lerp(2.58, 2.65, t);
    }

    // Smooth lerping
    currentPos.current.x = THREE.MathUtils.lerp(currentPos.current.x, targetX, 0.065);
    currentPos.current.y = THREE.MathUtils.lerp(currentPos.current.y, targetY, 0.065);
    currentPos.current.z = THREE.MathUtils.lerp(currentPos.current.z, targetZ, 0.065);
    currentRotY.current = THREE.MathUtils.lerp(currentRotY.current, targetRotY, 0.065);
    currentScale.current = THREE.MathUtils.lerp(currentScale.current, targetScale, 0.065);

    groupRef.current.position.copy(currentPos.current);
    groupRef.current.scale.setScalar(currentScale.current);

    // Natural Gaze Tracking & Harmonic Breathing
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

    // Harmonic multi-frequency waves for subtle life
    const harmonicYaw =
      Math.sin(t * 0.15) * 6 + Math.sin(t * 0.37 + 1.2) * 3 + Math.sin(t * 0.83 + 3.1) * 1.5;
    const harmonicPitch =
      Math.cos(t * 0.12 + 0.5) * 4 + Math.cos(t * 0.41 + 2.4) * 2 + Math.cos(t * 0.74 + 0.8) * 1.0;
    const harmonicRoll =
      Math.sin(t * 0.18 + 2.0) * 1.8 + Math.cos(t * 0.52 + 1.6) * 1.0;

    // Subtle gaze calculation
    const targetGazeYaw = c * 18 * (1 - Q) + harmonicYaw * Q;
    const targetGazePitch = te * 12 * (1 - Q) + harmonicPitch * Q;
    const targetGazeRoll = c * 5 * (1 - Q) + harmonicRoll * Q;

    gazeRef.current.yaw = THREE.MathUtils.lerp(gazeRef.current.yaw, targetGazeYaw, 0.075);
    gazeRef.current.pitch = THREE.MathUtils.lerp(gazeRef.current.pitch, targetGazePitch, 0.075);
    gazeRef.current.roll = THREE.MathUtils.lerp(gazeRef.current.roll, targetGazeRoll, 0.065);

    headRef.current.rotation.x = THREE.MathUtils.degToRad(gazeRef.current.pitch);
    headRef.current.rotation.y = currentRotY.current + THREE.MathUtils.degToRad(gazeRef.current.yaw);
    headRef.current.rotation.z = THREE.MathUtils.degToRad(gazeRef.current.roll);

    // Orbital Gyro Rings
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.32;
      ring1Ref.current.rotation.x = Math.sin(t * 0.5) * 0.14;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= delta * 0.26;
      ring2Ref.current.rotation.y += delta * 0.2;
    }

    // AI Understanding emissive pulse (ch. 04, p=0.48-0.65)
    // Subtle lime-tinted shimmer on the model material
    if (!wireframe && origMaterialRef.current) {
      const mat = origMaterialRef.current as THREE.MeshStandardMaterial;
      if (mat.emissive !== undefined) {
        const isAIChapter = p > 0.46 && p < 0.67;
        const targetEmissive = isAIChapter
          ? 0.06 + Math.sin(t * 3.2) * 0.03
          : 0.0;
        emissiveIntensityRef.current = THREE.MathUtils.lerp(
          emissiveIntensityRef.current,
          targetEmissive,
          0.04
        );
        mat.emissive.setRGB(
          emissiveIntensityRef.current * 0.83,
          emissiveIntensityRef.current,
          0.0
        );
        mat.emissiveIntensity = 1.0;
      }
    }
  });


  return (
    <group ref={groupRef}>
      <Float speed={1.3} rotationIntensity={0.05} floatIntensity={0.16}>
        <group ref={headRef}>
          <Center position={[0, -0.1, 0]}>
            <primitive object={scene} scale={0.52} />
          </Center>

          {/* Living Thought Crown that activates in middle chapters */}
          <ThoughtCrown scrollProgress={scrollProgress} />

          {/* Gyroscopic Orbit Ring 1 - Lime (#D4FF00) */}
          <mesh ref={ring1Ref} position={[0, 0, 0]} rotation={[Math.PI / 3.2, 0, 0]}>
            <ringGeometry args={[0.72, 0.735, 64]} />
            <meshBasicMaterial
              color="#D4FF00"
              transparent
              opacity={0.55}
              side={THREE.DoubleSide}
            />
          </mesh>

          {/* Gyroscopic Orbit Ring 2 - Cyan (#00F0FF) */}
          <mesh ref={ring2Ref} position={[0, 0.08, 0]} rotation={[-Math.PI / 3.8, Math.PI / 5, 0]}>
            <ringGeometry args={[0.84, 0.855, 64]} />
            <meshBasicMaterial
              color="#00F0FF"
              transparent
              opacity={0.4}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
      </Float>
    </group>
  );
}

useGLTF.preload("/models/avatar.glb");
