"use client";

import { useExperience } from "@/components/experience-provider";
import { SceneAccent } from "@/components/scene-accent";

const chapters: Record<string, { label: string; detail: string; index: string }> = {
  sobre: { label: "Contexto", detail: "O olhar que orienta cada solução.", index: "01" },
  projetos: { label: "Construção", detail: "Ideias que encontram uma aplicação real.", index: "02" },
  experiencia: { label: "Trajetória", detail: "Diferentes contextos, um repertório conectado.", index: "03" },
  competencias: { label: "Conexões", detail: "Tecnologias que se encontram na prática.", index: "04" },
  formacao: { label: "Aprendizado", detail: "Uma base que continua em movimento.", index: "05" },
  certificacoes: { label: "Repertório", detail: "Conhecimento construído, curso a curso.", index: "06" },
  curriculo: { label: "Síntese", detail: "A trajetória reunida em uma leitura.", index: "07" },
  contato: { label: "Encontro", detail: "O próximo projeto começa com uma conversa.", index: "08" }
};

export function JourneyCompanion() {
  const { activeSection, phase, mode, sceneStatus } = useExperience();
  const chapter = chapters[activeSection] ?? chapters.sobre;

  return (
    <aside className="journey-companion" aria-label="Perspectiva da trajetória" data-active-chapter={activeSection}>
      <p className="journey-companion__eyebrow">{chapter.index} / EM PERSPECTIVA</p>
      <SceneAccent phase={phase} className="journey-companion__art" />
      <div className="journey-companion__caption">
        <strong>{chapter.label}</strong>
        <p>{chapter.detail}</p>
      </div>
      <p className="journey-companion__hint">{mode === "direct" ? "Leitura direta" : sceneStatus === "unavailable" ? "Perspectivas em ilustração vetorial" : "A forma acompanha sua leitura"}</p>
    </aside>
  );
}
