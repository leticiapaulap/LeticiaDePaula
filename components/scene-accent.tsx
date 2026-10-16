import type { ExperiencePhase } from "@/lib/experience-state";
import { ribbonPath } from "@/lib/ribbon-shapes";

export function SceneAccent({ phase, className = "" }: { phase: ExperiencePhase; className?: string }) {
  return (
    <div className={`scene-accent ${className}`} data-scene-anchor={phase} aria-hidden="true">
      <span className="scene-accent__orbit" />
      <svg className="scene-accent__svg" viewBox="-170 -150 340 300" fill="none"><path d={ribbonPath(phase)} stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" /></svg>
      <span className="scene-accent__caption">FORMA / PERSPECTIVA</span>
    </div>
  );
}
