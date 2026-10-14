import * as THREE from "three";

export function createRibbonGeometry() {
  const ribbon = new THREE.BufferGeometry();
  const centerline = new THREE.CatmullRomCurve3(
    Array.from({ length: 180 }, (_, index) => {
      const angle = (index / 180) * Math.PI * 2;

      return new THREE.Vector3(
        1.17 * Math.sin(angle) + 0.16 * Math.sin(angle * 3),
        0.83 * Math.sin(angle * 2),
        0.24 * Math.cos(angle) + 0.1 * Math.sin(angle * 3)
      );
    }),
    true,
    "centripetal"
  );
  const loopCount = 180;
  const widthSegments = 12;
  const positions: number[] = [];
  const indices: number[] = [];
  const referenceAxis = new THREE.Vector3(0, 0, 1);

  for (let loopIndex = 0; loopIndex <= loopCount; loopIndex += 1) {
    const progress = loopIndex / loopCount;
    const point = centerline.getPointAt(progress);
    const tangent = centerline.getTangentAt(progress).normalize();
    let crossAxis = referenceAxis.clone().cross(tangent);

    if (crossAxis.lengthSq() < 0.0001) {
      crossAxis = new THREE.Vector3(1, 0, 0).cross(tangent);
    }

    crossAxis.normalize().applyAxisAngle(tangent, Math.sin(progress * Math.PI * 2) * 0.52);

    for (let widthIndex = 0; widthIndex <= widthSegments; widthIndex += 1) {
      const across = widthIndex / widthSegments - 0.5;
      const vertex = point.clone().addScaledVector(crossAxis, across * 0.52);
      positions.push(vertex.x, vertex.y, vertex.z);

      if (loopIndex < loopCount && widthIndex < widthSegments) {
        const vertexIndex = loopIndex * (widthSegments + 1) + widthIndex;
        indices.push(
          vertexIndex,
          vertexIndex + widthSegments + 1,
          vertexIndex + 1,
          vertexIndex + 1,
          vertexIndex + widthSegments + 1,
          vertexIndex + widthSegments + 2
        );
      }
    }
  }

  ribbon.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  ribbon.setIndex(indices);
  ribbon.computeVertexNormals();

  return ribbon;
}
