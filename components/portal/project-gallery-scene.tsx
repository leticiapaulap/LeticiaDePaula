"use client";

import { useFrame, useLoader, useThree, type ThreeEvent } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useExperience } from "@/components/experience-provider";
import { heroProjects } from "@/lib/hero-gallery";
import type { SceneQuality } from "@/lib/experience-state";

function ProjectScreen({ index, texture, active }: { index: number; texture: THREE.Texture; active: boolean }) {
  const { heroProjectSlug, focusHeroProject, motionEnabled } = useExperience();
  const { invalidate } = useThree();
  const canvas = useThree((state) => state.gl.domElement);
  const group = useRef<THREE.Group>(null);
  const panel = useRef<THREE.MeshBasicMaterial>(null);
  const [hovered, setHovered] = useState(false);
  const project = heroProjects[index];
  const preview = project.screenshots[0];
  const selected = heroProjectSlug === project.slug;
  const dimmed = heroProjectSlug !== null && !selected;
  const width = index === 0 ? 3.65 : 3;
  const height = width / ((preview.width ?? 1440) / (preview.height ?? 960));
  const position = selected ? [0, 0.02, 1] : index === 0 ? [-0.48, -0.42, dimmed ? -1.2 : 0.5] : [0.62, 0.68, dimmed ? -1.7 : -0.8];
  const rotation = selected ? [-0.025, -0.08, 0] : index === 0 ? [0.035, 0.16, -0.035] : [-0.055, -0.28, 0.045];
  const scale = selected ? 1.04 : dimmed ? 0.84 : hovered && motionEnabled ? 1.025 : 1;

  useEffect(() => { invalidate(); }, [heroProjectSlug, hovered, invalidate, motionEnabled]);
  useEffect(() => () => { canvas.style.setProperty("cursor", "auto"); }, [canvas]);

  useFrame(({ pointer }, delta) => {
    if (!active || !group.current) return;
    const amount = motionEnabled ? 1 - Math.exp(-Math.min(delta, 0.05) * 8) : 1;
    const targetHorizontal = position[0] + (motionEnabled ? pointer.x * 0.045 : 0);
    const targetVertical = position[1] + (motionEnabled ? pointer.y * 0.035 : 0);
    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, targetHorizontal, amount);
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, targetVertical, amount);
    group.current.position.z = THREE.MathUtils.lerp(group.current.position.z, position[2], amount);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, rotation[0], amount);
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, rotation[1] + (motionEnabled ? pointer.x * 0.025 : 0), amount);
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, rotation[2], amount);
    group.current.scale.setScalar(THREE.MathUtils.lerp(group.current.scale.x, scale, amount));
    if (panel.current) panel.current.color.lerp(new THREE.Color(dimmed ? "#a7a3a0" : "#ffffff"), amount);
    if (Math.abs(group.current.position.z - position[2]) > 0.001 || Math.abs(group.current.scale.x - scale) > 0.001 || Math.abs(group.current.position.x - targetHorizontal) > 0.001) invalidate();
  });

  const select = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    focusHeroProject(selected ? null : project.slug);
  };

  return (
    <group ref={group} name={`project-screen-${project.slug}`} position={index === 0 ? [-0.48, -0.42, 0.5] : [0.62, 0.68, -0.8]} rotation={index === 0 ? [0.035, 0.16, -0.035] : [-0.055, -0.28, 0.045]} onClick={select} onPointerOver={(event) => { event.stopPropagation(); setHovered(true); canvas.style.setProperty("cursor", "pointer"); }} onPointerOut={() => { setHovered(false); canvas.style.setProperty("cursor", "auto"); }} onPointerMove={() => invalidate()}>
      <mesh>
        <boxGeometry args={[width + 0.09, height + 0.09, 0.075]} />
        <meshStandardMaterial color={selected || hovered ? "#c5b08d" : "#8d806a"} metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0, -0.047]}>
        <boxGeometry args={[width + 0.035, height + 0.035, 0.035]} />
        <meshStandardMaterial color="#161c23" metalness={0.4} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0, 0.039]}>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial ref={panel} map={texture} map-colorSpace={THREE.SRGBColorSpace} map-anisotropy={2} toneMapped={false} />
      </mesh>
      <mesh position={[0, height * 0.29, 0.041]} rotation={[0, 0, -0.025]} raycast={() => {}}>
        <planeGeometry args={[width * 0.98, height * 0.22]} />
        <meshBasicMaterial color="#f7eddd" transparent opacity={hovered ? 0.035 : 0.012} depthWrite={false} />
      </mesh>
    </group>
  );
}

export function ProjectGalleryScene({ active, quality }: { active: boolean; quality: SceneQuality }) {
  const textures = useLoader(THREE.TextureLoader, heroProjects.map((project) => project.screenshots[0].src));
  const { motionEnabled, markHeroGalleryReady } = useExperience();
  const { invalidate } = useThree();
  const ready = useRef(false);

  useEffect(() => {
    invalidate();
    if (!active || !motionEnabled || quality !== "desktop") return;
    const timer = window.setInterval(invalidate, 1000 / 24);
    return () => window.clearInterval(timer);
  }, [active, invalidate, motionEnabled, quality]);

  useFrame(({ camera, size }, delta) => {
    if (!active) return;
    const amount = motionEnabled ? 1 - Math.exp(-Math.min(delta, 0.05) * 8) : 1;
    const depth = Math.max(6.2, 4.3 / Math.max(size.width / size.height, 0.6));
    camera.position.lerp(new THREE.Vector3(0, 0.05, depth), amount);
    camera.lookAt(0, 0.05, 0);
    if (camera instanceof THREE.PerspectiveCamera && camera.fov !== 42) { camera.fov = 42; camera.updateProjectionMatrix(); }
    if (Math.abs(camera.position.z - depth) > 0.001) invalidate();
    if (!ready.current) { ready.current = true; markHeroGalleryReady(); }
  });

  return (
    <>
      <ambientLight intensity={0.9} />
      <hemisphereLight args={["#f4e8d3", "#111721", 1.4]} />
      <directionalLight color="#f4e6cc" intensity={3} position={[-3, 5, 4]} />
      <pointLight color="#d4bf9e" intensity={9} position={[3, 1, 3]} />
      {textures.map((texture, index) => <ProjectScreen key={heroProjects[index].slug} index={index} texture={texture} active={active} />)}
      <mesh position={[0, -1.68, -0.4]} rotation={[0, -0.04, 0]} raycast={() => {}}>
        <boxGeometry args={[5.15, 0.055, 1.4]} />
        <meshStandardMaterial color="#1b222b" metalness={0.38} roughness={0.45} />
      </mesh>
    </>
  );
}
