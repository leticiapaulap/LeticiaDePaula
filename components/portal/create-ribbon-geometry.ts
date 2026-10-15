import * as THREE from "three";
import type { ExperiencePhase } from "@/lib/experience-state";
import { ribbonPoint } from "@/lib/ribbon-shapes";

export function createRibbonGeometry(phase: ExperiencePhase = "portal", loopCount = 144, widthSegments = 8) {
  const ribbon = new THREE.BufferGeometry();
  const positions = new Float32Array((loopCount + 1) * (widthSegments + 1) * 3);
  const indices: number[] = [];
  const tangent = new THREE.Vector3();
  const crossAxis = new THREE.Vector3();
  const referenceAxis = new THREE.Vector3(0, 0, 1);
  const point = new THREE.Vector3();
  const vertex = new THREE.Vector3();

  for (let loopIndex = 0; loopIndex <= loopCount; loopIndex += 1) {
    const progress = loopIndex / loopCount;
    const before = ribbonPoint(phase, Math.max(0, progress - 0.0001));
    const after = ribbonPoint(phase, Math.min(1, progress + 0.0001));
    point.set(...ribbonPoint(phase, progress));
    tangent.set(after[0] - before[0], after[1] - before[1], after[2] - before[2]).normalize();
    crossAxis.crossVectors(referenceAxis, tangent);
    if (crossAxis.lengthSq() < 0.0001) crossAxis.set(1, 0, 0).cross(tangent);
    crossAxis.normalize().applyAxisAngle(tangent, Math.sin(progress * Math.PI * 2) * 0.52);
    const width = phase === "education" ? 0.24 : phase === "competencies" ? 0.25 : 0.43;

    for (let widthIndex = 0; widthIndex <= widthSegments; widthIndex += 1) {
      vertex.copy(point).addScaledVector(crossAxis, (widthIndex / widthSegments - 0.5) * width);
      const vertexIndex = loopIndex * (widthSegments + 1) + widthIndex;
      vertex.toArray(positions, vertexIndex * 3);
      if (loopIndex < loopCount && widthIndex < widthSegments) {
        indices.push(vertexIndex, vertexIndex + widthSegments + 1, vertexIndex + 1, vertexIndex + 1, vertexIndex + widthSegments + 1, vertexIndex + widthSegments + 2);
      }
    }
  }
  ribbon.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  ribbon.setIndex(indices);
  ribbon.computeVertexNormals();
  return ribbon;
}
