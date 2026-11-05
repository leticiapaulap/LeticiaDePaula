"use client";

import { Canvas } from "@react-three/fiber";
import type { ReactNode } from "react";

type HeroCharacterCanvasProps = { children: ReactNode };

export function HeroCharacterCanvas({ children }: HeroCharacterCanvasProps) {
  return (
    <Canvas
      aria-hidden="true"
      orthographic
      camera={{ left: -1.11, right: 1.11, top: 1.33, bottom: -1.33, near: 0.1, far: 20, position: [0, 0, 8] }}
      dpr={1}
      frameloop="demand"
      gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
    >
      {children}
    </Canvas>
  );
}
