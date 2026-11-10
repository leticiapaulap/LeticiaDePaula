import type { ExperiencePhase } from "@/lib/navegacao/estado-navegacao";
import { ribbonPath } from "@/lib/legado/geometria-fitas";
import { chapterForPhase } from "@/lib/navegacao/capitulos";

export function SceneAccent({ phase, className = "" }: { phase: ExperiencePhase; className?: string }) {
  return (
    <div className={`scene-accent ${className}`} data-scene-anchor={phase} aria-hidden="true">
      <span className="scene-accent__orbit" />
      <svg className="scene-accent__svg" viewBox="-170 -150 340 300" fill="none"><path d={ribbonPath(phase)} stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" /></svg>
      <span className="scene-accent__caption">{chapterForPhase(phase).motif}</span>
    </div>
  );
}
