"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { createRibbonGeometry } from "@/components/portal/create-ribbon-geometry";

function FloatingRibbon({ reduceMotion }: { reduceMotion: boolean }) {
  const group = useRef<THREE.Group>(null);
  const geometry = useMemo(() => createRibbonGeometry(), []);

  useFrame(({ clock, pointer, invalidate }, delta) => {
    if (!group.current || reduceMotion) {
      return;
    }

    const time = clock.elapsedTime;
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, pointer.y * -0.1, 0.9, delta);
    group.current.rotation.y = THREE.MathUtils.damp(
      group.current.rotation.y,
      pointer.x * 0.14 + Math.sin(time * 0.24) * 0.1,
      0.9,
      delta
    );
    group.current.rotation.z = THREE.MathUtils.damp(group.current.rotation.z, pointer.x * 0.055, 0.9, delta);
    group.current.position.y = 0.035 * Math.sin(time * 0.48);
    invalidate();
  });

  return (
    <group ref={group} rotation={[0.12, -0.22, -0.12]}>
      <mesh geometry={geometry} castShadow receiveShadow>
        <meshPhysicalMaterial
          color="#b9a382"
          metalness={0.74}
          roughness={0.27}
          clearcoat={0.62}
          clearcoatRoughness={0.24}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

export default function SculptureScene({ onReady }: { onReady: () => void }) {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <Canvas
      aria-hidden="true"
      camera={{ position: [0, 0, 4.5], fov: 42 }}
      dpr={[0.8, 1.25]}
      frameloop="demand"
      gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
      onCreated={onReady}
      fallback={<span className="nexo-webgl-fallback">A ilustração 2D permanece disponível.</span>}
    >
      <hemisphereLight args={["#edf2f0", "#202329", 1.1]} />
      <ambientLight intensity={0.52} />
      <directionalLight color="#f2e4c7" intensity={2.1} position={[3, 4, 4]} />
      <pointLight color="#dfbc83" intensity={8} position={[-3, 0.2, 2.8]} />
      <pointLight color="#aabfcb" intensity={4} position={[1.7, -2, -2]} />
      <FloatingRibbon reduceMotion={reduceMotion} />
    </Canvas>
  );
}
