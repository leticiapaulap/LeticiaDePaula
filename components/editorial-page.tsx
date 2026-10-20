import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { SceneAccent } from "@/components/scene-accent";
import { chapterForPhase } from "@/lib/chapters";
import type { ExperiencePhase } from "@/lib/experience-state";

export function EditorialPage({
  eyebrow,
  phase,
  title,
  description,
  children
}: {
  eyebrow: string;
  phase?: ExperiencePhase;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  const chapter = phase ? chapterForPhase(phase) : undefined;
  return (
    <div className={`nexo-route${phase ? ` chapter chapter--${phase}` : ""}`} data-chapter-page={phase}>
      <header className="nexo-route__hero">
        <div className="nexo-route__hero-inner">
          <div className="route-hero-copy chapter-reveal">
          <nav className="nexo-breadcrumb" aria-label="Breadcrumb">
            <Link className="focusable" href="/" transitionTypes={["nav-back"]}>
              Letícia de Paula
            </Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{eyebrow}</span>
          </nav>

          <p className="nexo-route__eyebrow">{chapter ? `Capítulo ${chapter.number} / 07 — ${chapter.label}` : eyebrow}</p>
          <h1 id="chapter-title" tabIndex={-1}>{title}</h1>
          <p className="nexo-route__description">{description}</p>
          {chapter ? <p className="chapter-motif">{chapter.motif}</p> : <Link className="nexo-route__back focusable" href="/" transitionTypes={["nav-back"]}>
            <ArrowLeft size={15} aria-hidden="true" />Voltar ao início
          </Link>}
          </div>
          <div className="chapter-artwork">
            {chapter ? <span className="chapter-artwork__number" aria-hidden="true">{chapter.number}</span> : null}
            <SceneAccent className="route-hero-scene" phase={phase ?? "portal"} />
          </div>
        </div>
      </header>

      <div className="nexo-direct nexo-route__body chapter-reveal chapter-reveal--body">{children}</div>
    </div>
  );
}
