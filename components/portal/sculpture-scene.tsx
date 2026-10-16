"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { usePathname } from "next/navigation";
import * as THREE from "three";
import { useExperience } from "@/components/experience-provider";
import { createRibbonGeometry } from "@/components/portal/create-ribbon-geometry";
import { experiencePhases, experienceSceneStates, transitionProgress, type SceneQuality } from "@/lib/experience-state";
import { projects } from "@/lib/projects";
import { experiences } from "@/lib/experiences";
import { skillConnections, skills } from "@/lib/skill-relations";

const resolutions: Record<SceneQuality, [number, number]> = { desktop: [144, 8], tablet: [100, 6], mobile: [64, 4] };

function SceneRig({ active, quality }: { active: boolean; quality: SceneQuality }) {
  const pathname = usePathname();
  const { phase, motionEnabled, transitionId, selectedProjectSlug, selectedSkillName, selectedExperienceId, visited } = useExperience();
  const { camera, invalidate } = useThree();
  const mesh = useRef<THREE.Mesh>(null);
  const group = useRef<THREE.Group>(null);
  const material = useRef<THREE.MeshPhysicalMaterial>(null);
  const light = useRef<THREE.DirectionalLight>(null);
  const graphMaterial = useRef<THREE.LineBasicMaterial>(null);
  const branchMaterial = useRef<THREE.LineBasicMaterial>(null);
  const nodeMaterial = useRef<THREE.PointsMaterial>(null);
  const graph = useRef<THREE.LineSegments>(null);
  const branchLines = useRef<THREE.LineSegments>(null);
  const visitedNodes = useRef<THREE.Points>(null);
  const lookTarget = useRef(new THREE.Vector3());
  const progress = useRef(1);
  const elapsed = useRef(0);
  const idleTime = useRef(0);
  const snapshot = useRef({
    weights: experiencePhases.map(() => 0),
    camera: new THREE.Vector3(),
    target: new THREE.Vector3(),
    rotation: new THREE.Vector3(),
    scale: new THREE.Vector3(1, 1, 1),
    color: new THREE.Color(),
    light: 2.1,
    roughness: 0.27,
    graph: 0,
    branches: 0,
    nodes: 0
  });
  const geometry = useMemo(() => {
    const resolution = resolutions[quality];
    const base = createRibbonGeometry("portal", ...resolution);
    base.morphAttributes.position = [];
    base.morphAttributes.normal = [];
    for (const shape of experiencePhases) {
      const target = createRibbonGeometry(shape, ...resolution);
      base.morphAttributes.position.push(target.getAttribute("position"));
      base.morphAttributes.normal.push(target.getAttribute("normal"));
      target.dispose();
    }
    return base;
  }, [quality]);

  const connections = useMemo(() => {
    const linkedSkills = skills.filter((skill) => skill.projectSlugs?.length);
    const coordinates = new Map(linkedSkills.map((skill, index) => {
      const angle = (index / linkedSkills.length) * Math.PI * 2;
      return [skill.name, [Math.cos(angle) * 0.85, Math.sin(angle) * 0.74, 0.08] as const];
    }));
    const positions = new Float32Array(skillConnections.length * 6);
    const colors = new Float32Array(skillConnections.length * 6);
    skillConnections.forEach((connection, index) => {
      const source = coordinates.get(connection.skillName)!;
      const projectIndex = projects.findIndex((project) => project.slug === connection.projectSlug);
      positions.set([...source, (projectIndex - 0.5) * 0.6, 0, 0.16], index * 6);
      const color = new THREE.Color("#dfc8a5");
      color.toArray(colors, index * 6);
      color.toArray(colors, index * 6 + 3);
    });
    const graph = new THREE.BufferGeometry();
    graph.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    graph.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return graph;
  }, []);

  useEffect(() => {
    const attribute = connections.getAttribute("color");
    const colors = attribute.array as Float32Array;
    const color = new THREE.Color();
    skillConnections.forEach((connection, index) => {
      const selected = selectedSkillName ? connection.skillName === selectedSkillName : selectedProjectSlug ? connection.projectSlug === selectedProjectSlug : true;
      color.set(selected ? "#dfc8a5" : "#403e3b");
      color.toArray(colors, index * 6);
      color.toArray(colors, index * 6 + 3);
    });
    attribute.needsUpdate = true;
    invalidate();
  }, [connections, invalidate, selectedProjectSlug, selectedSkillName]);

  const branches = useMemo(() => {
    const positions: number[] = [];
    for (let index = 1; index < experiencePhases.length; index += 1) {
      const angle = ((index - 1) / 6) * Math.PI * 2;
      positions.push(0, 0, 0, Math.cos(angle) * 1.3, Math.sin(angle) * 1.1, 0.1);
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    return geometry;
  }, []);

  const nodes = useMemo(() => {
    const positions: number[] = [];
    for (let index = 1; index < experiencePhases.length; index += 1) {
      if (!visited.includes(experiencePhases[index])) continue;
      const angle = ((index - 1) / 6) * Math.PI * 2;
      positions.push(Math.cos(angle) * 1.3, Math.sin(angle) * 1.1, 0.1);
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    return geometry;
  }, [visited]);

  useEffect(() => () => geometry.dispose(), [geometry]);
  useEffect(() => () => connections.dispose(), [connections]);
  useEffect(() => () => branches.dispose(), [branches]);
  useEffect(() => () => nodes.dispose(), [nodes]);

  useEffect(() => {
    const materials = [material.current, graphMaterial.current, branchMaterial.current, nodeMaterial.current];
    return () => materials.forEach((entry) => entry?.dispose());
  }, []);

  useEffect(() => {
    if (!mesh.current || !group.current || !material.current) return;
    const current = snapshot.current;
    current.weights = [...(mesh.current.morphTargetInfluences ?? experiencePhases.map(() => 0))];
    current.camera.copy(camera.position);
    current.target.copy(lookTarget.current);
    current.rotation.set(group.current.rotation.x, group.current.rotation.y, group.current.rotation.z);
    current.scale.copy(group.current.scale);
    current.color.copy(material.current.color);
    current.light = light.current?.intensity ?? 2.1;
    current.roughness = material.current.roughness;
    current.graph = graphMaterial.current?.opacity ?? 0;
    current.branches = branchMaterial.current?.opacity ?? 0;
    current.nodes = nodeMaterial.current?.opacity ?? 0;
    elapsed.current = 0;
    progress.current = 0;
    invalidate();
  }, [active, camera, geometry, invalidate, motionEnabled, quality, transitionId]);

  useEffect(() => {
    if (!active || pathname !== "/" || !motionEnabled || quality !== "desktop" || !["portal", "nucleus"].includes(phase)) return;
    const timer = window.setInterval(() => invalidate(), 1000 / 30);
    return () => window.clearInterval(timer);
  }, [active, invalidate, motionEnabled, pathname, phase, quality]);

  const goals = useMemo(() => {
    const state = experienceSceneStates[phase];
    const projectIndex = projects.findIndex((project) => project.slug === selectedProjectSlug);
    const careerIndex = experiences.findIndex((experience) => experience.id === selectedExperienceId);
    const selectedSkill = skills.find((skill) => skill.name === selectedSkillName);
    const focus = phase === "projects" && projectIndex >= 0 ? (projectIndex - 0.5) * 0.12 : phase === "competencies" && selectedSkill ? 0.08 : 0;
    const reduced = quality === "mobile" ? 0.3 : 1;
    return {
      camera: new THREE.Vector3(state.cameraPosition[0] * reduced + focus, state.cameraPosition[1] * reduced, state.cameraPosition[2]),
      target: new THREE.Vector3(state.cameraTarget[0] + focus * 0.4, phase === "experience" && careerIndex >= 0 ? (1 - careerIndex) * 0.12 * reduced : 0, 0),
      rotation: new THREE.Vector3(...state.rotation).multiplyScalar(reduced).add(new THREE.Vector3(0, focus, 0)),
      scale: new THREE.Vector3(...state.ribbonScale),
      color: new THREE.Color(state.ribbonColor),
      light: 2.1 * state.lightIntensity,
      roughness: state.roughness
    };
  }, [phase, quality, selectedProjectSlug, selectedSkillName, selectedExperienceId]);

  useFrame(({ camera: frameCamera, size }, delta) => {
    if (!active || !mesh.current || !group.current || !material.current) return;
    if (frameCamera instanceof THREE.PerspectiveCamera) {
      const aspect = size.width / Math.max(1, size.height);
      const fov = Math.min(68, THREE.MathUtils.radToDeg(2 * Math.atan(Math.tan(THREE.MathUtils.degToRad(42 / 2)) / Math.min(1, aspect))));
      if (frameCamera.fov !== fov) { frameCamera.fov = fov; frameCamera.updateProjectionMatrix(); }
    }
    const current = snapshot.current;
    elapsed.current += Math.min(delta, 0.05) * 1000;
    progress.current = motionEnabled ? transitionProgress(elapsed.current, quality === "mobile" ? 450 : undefined) : 1;
    const amount = progress.current;
    const weights = mesh.current.morphTargetInfluences;
    if (weights) {
      experiencePhases.forEach((shape, index) => { weights[index] = THREE.MathUtils.lerp(current.weights[index] ?? 0, shape === phase ? 1 : 0, amount); });
    }
    frameCamera.position.lerpVectors(current.camera, goals.camera, amount);
    lookTarget.current.lerpVectors(current.target, goals.target, amount);
    frameCamera.lookAt(lookTarget.current);
    group.current.rotation.set(
      THREE.MathUtils.lerp(current.rotation.x, goals.rotation.x, amount),
      THREE.MathUtils.lerp(current.rotation.y, goals.rotation.y, amount),
      THREE.MathUtils.lerp(current.rotation.z, goals.rotation.z, amount)
    );
    group.current.scale.lerpVectors(current.scale, goals.scale, amount);
    material.current.color.lerpColors(current.color, goals.color, amount);
    material.current.roughness = THREE.MathUtils.lerp(current.roughness, goals.roughness, amount);
    if (light.current) light.current.intensity = THREE.MathUtils.lerp(current.light, goals.light, amount);
    if (graphMaterial.current) graphMaterial.current.opacity = THREE.MathUtils.lerp(current.graph, phase === "competencies" ? 0.7 : 0, amount);
    if (branchMaterial.current) branchMaterial.current.opacity = THREE.MathUtils.lerp(current.branches, phase === "nucleus" ? 0.4 : 0, amount);
    if (nodeMaterial.current) nodeMaterial.current.opacity = THREE.MathUtils.lerp(current.nodes, phase === "convergence" || phase === "nucleus" ? 0.8 : 0, amount);
    if (graph.current) graph.current.visible = (graphMaterial.current?.opacity ?? 0) > 0.005;
    if (branchLines.current) branchLines.current.visible = (branchMaterial.current?.opacity ?? 0) > 0.005;
    if (visitedNodes.current) visitedNodes.current.visible = (nodeMaterial.current?.opacity ?? 0) > 0.005;
    if (motionEnabled && pathname === "/" && quality === "desktop" && ["portal", "nucleus"].includes(phase) && amount === 1) {
      idleTime.current += Math.min(delta, 0.05);
      group.current.rotation.y += Math.sin(idleTime.current * 0.3) * 0.025;
    }
    if (active && amount < 1) invalidate();
  });

  return (
    <>
      <ambientLight intensity={quality === "mobile" ? 0.95 : 0.7} />
      <hemisphereLight args={["#edf2f0", "#202329", 1.1]} />
      <directionalLight ref={light} color="#f2e4c7" intensity={2.1} position={[3, 4, 4]} />
      <pointLight color="#dfbc83" intensity={7} position={[-3, 0.2, 2.8]} />
      {quality !== "mobile" ? <pointLight color="#aabfcb" intensity={4} position={[1.7, -2, -2]} /> : null}
      <group ref={group}>
        <mesh ref={mesh} args={[geometry]} dispose={null} frustumCulled={false}>
          <meshPhysicalMaterial ref={material} color="#c8ad83" metalness={quality === "mobile" ? 0.58 : 0.74} roughness={0.27} clearcoat={quality === "desktop" ? 0.5 : 0} side={THREE.DoubleSide} />
        </mesh>
        <lineSegments ref={graph} geometry={connections} dispose={null}>
          <lineBasicMaterial ref={graphMaterial} vertexColors transparent opacity={0} depthWrite={false} />
        </lineSegments>
        <lineSegments ref={branchLines} geometry={branches} dispose={null}>
          <lineBasicMaterial ref={branchMaterial} color="#d6bd93" transparent opacity={0} depthWrite={false} />
        </lineSegments>
        <points ref={visitedNodes} geometry={nodes} dispose={null}>
          <pointsMaterial ref={nodeMaterial} color="#dfc8a5" size={0.055} transparent opacity={0} depthWrite={false} />
        </points>
      </group>
    </>
  );
}

function ContextEvents({ onError }: { onError: () => void }) {
  const canvas = useThree((state) => state.gl.domElement);
  useEffect(() => {
    const lost = (event: Event) => { event.preventDefault(); onError(); };
    canvas.addEventListener("webglcontextlost", lost);
    return () => canvas.removeEventListener("webglcontextlost", lost);
  }, [canvas, onError]);
  return null;
}

function SceneRenderGuard({ active, onReady, onError }: { active: boolean; onReady: () => void; onError: () => void }) {
  const ready = useRef(false);
  const failed = useRef(false);
  useFrame(({ gl, scene, camera }) => {
    if (!active || failed.current) return;
    try {
      gl.render(scene, camera);
      if (!ready.current) { ready.current = true; onReady(); }
    } catch {
      failed.current = true;
      onError();
    }
  }, 1);
  return null;
}

export default function SculptureScene({ onReady, onError, active, quality }: { onReady: () => void; onError: () => void; active: boolean; quality: SceneQuality }) {
  return (
    <Canvas aria-hidden="true" camera={{ position: [0, 0, 4.8], fov: 42 }} dpr={quality === "mobile" ? 1 : quality === "tablet" ? 1.15 : 1.35} frameloop="demand" gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}>
      <ContextEvents onError={onError} />
      <SceneRig active={active} quality={quality} />
      <SceneRenderGuard active={active} onReady={onReady} onError={onError} />
    </Canvas>
  );
}
