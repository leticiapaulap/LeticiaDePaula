import type { ExperiencePhase, VectorTuple } from "@/lib/experience-state";

export function ribbonPoint(phase: ExperiencePhase, progress: number): VectorTuple {
  const angle = progress * Math.PI * 2;
  const base: VectorTuple = [1.17 * Math.sin(angle) + 0.16 * Math.sin(angle * 3), 0.83 * Math.sin(angle * 2), 0.24 * Math.cos(angle) + 0.1 * Math.sin(angle * 3)];
  switch (phase) {
    case "nucleus": {
      const radius = 0.76 + 0.36 * Math.cos(angle * 3);
      return [1.15 * radius * Math.cos(angle), radius * Math.sin(angle), 0.2 * Math.sin(angle * 3)];
    }
    case "projects":
      return [1.22 * Math.sign(Math.cos(angle)) * Math.pow(Math.abs(Math.cos(angle)), 0.38), 0.77 * Math.sign(Math.sin(angle)) * Math.pow(Math.abs(Math.sin(angle)), 0.38), 0.13 * Math.sin(angle * 2)];
    case "experience":
      return [0.66 * Math.sin(angle * 1.5), 1.18 - progress * 2.36, 0.18 * Math.cos(angle * 1.5)];
    case "competencies": {
      const radius = 0.9 + 0.18 * Math.cos(angle * 6);
      return [radius * Math.cos(angle), 0.88 * radius * Math.sin(angle), 0.16 * Math.sin(angle * 3)];
    }
    case "education":
      return [0.95 * Math.cos(angle * 3), 0.98 - progress * 1.96 + 0.1 * Math.sin(angle * 3), 0.42 * Math.sin(angle * 3)];
    case "convergence":
      return [base[0], base[1], base[2] + 0.04 * Math.cos(angle * 6)];
    default:
      return base;
  }
}

export function ribbonPath(phase: ExperiencePhase) {
  return Array.from({ length: 121 }, (_, index) => {
    const [horizontal, vertical] = ribbonPoint(phase, index / 120);
    return `${index ? "L" : "M"}${(horizontal * 100).toFixed(2)},${(-vertical * 100).toFixed(2)}`;
  }).join(" ");
}
