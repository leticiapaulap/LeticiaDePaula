"use client";

import { ArrowLeft, Compass, Layers3 } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useExperience } from "@/components/experience-provider";
import { experiencePhases, experienceSceneStates, type ExperiencePhase } from "@/lib/experience-state";

export function ModeControl({ className = "" }: { className?: string }) {
  const { mode, setMode, requestScene } = useExperience();
  return (
    <button className={`nexo-mode-control focusable ${className}`} type="button" aria-label={mode === "immersive" ? "Ativar modo direto" : "Ativar modo imersivo"} onClick={() => {
      if (mode === "direct") requestScene();
      setMode(mode === "immersive" ? "direct" : "immersive");
    }}>
      <Layers3 size={16} aria-hidden="true" />
      {mode === "immersive" ? "Modo direto" : "Modo imersivo"}
    </button>
  );
}

export function ModeLabel() {
  const { mode } = useExperience();
  return <p className="nexo-direct__eyebrow">{mode === "direct" ? "PORTFÓLIO / LEITURA DIRETA" : "PORTFÓLIO / EM PERSPECTIVA"}</p>;
}

export function ExperienceNavigation() {
  const { phase, mode, transitionTo } = useExperience();
  const pathname = usePathname();
  const router = useRouter();
  const index = experiencePhases.indexOf(phase);
  const previous = experiencePhases[Math.max(0, index - 1)];
  const destination = (target: ExperiencePhase) => pathname === "/" ? `/#${experienceSceneStates[target].section}` : experienceSceneStates[target].href;

  return (
    <nav className="nexo-experience-nav" aria-label="Explorar a trajetória">
      <Link className="nexo-experience-nav__back focusable" href={destination(previous)} aria-label={`Área anterior: ${experienceSceneStates[previous].label}`} onNavigate={() => transitionTo(previous)}>
        <ArrowLeft size={17} aria-hidden="true" />
      </Link>
      <label className="nexo-area-select">
        <Compass size={16} aria-hidden="true" />
        <span className="nexo-visually-hidden">Ir diretamente a uma área</span>
        <select aria-label="Ir diretamente a uma área" value={phase} onChange={(event) => {
          const target = event.target.value as ExperiencePhase;
          transitionTo(target);
          router.push(destination(target));
        }}>
          {experiencePhases.map((target, targetIndex) => <option key={target} value={target}>{String(targetIndex + 1).padStart(2, "0")} / {experienceSceneStates[target].label}</option>)}
        </select>
      </label>
      <span className="nexo-experience-nav__mode">{mode === "immersive" ? "EXPLORAR" : "LEITURA"}</span>
    </nav>
  );
}
