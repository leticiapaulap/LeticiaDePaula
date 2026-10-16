import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { SceneAccent } from "@/components/scene-accent";
import type { ExperiencePhase } from "@/lib/experience-state";

const sectionPhases: Record<string, ExperiencePhase> = { Sobre: "nucleus", Projetos: "projects", Experiência: "experience", Competências: "competencies", "Formação e cursos": "education", Contato: "convergence" };

export function EditorialPage({
  eyebrow,
  title,
  description,
  children
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="nexo-route">
      <header className="nexo-route__hero">
        <div className="nexo-route__hero-inner">
          <div className="route-hero-copy">
          <nav className="nexo-breadcrumb" aria-label="Breadcrumb">
            <Link className="focusable" href="/">
              Letícia de Paula
            </Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{eyebrow}</span>
          </nav>

          <p className="nexo-route__eyebrow">{eyebrow}</p>
          <h1 id="chapter-title" tabIndex={-1}>{title}</h1>
          <p className="nexo-route__description">{description}</p>
          <Link className="nexo-route__back focusable" href="/">
            <ArrowLeft size={15} aria-hidden="true" />
            Voltar ao início
          </Link>
          </div>
          <SceneAccent className="route-hero-scene" phase={sectionPhases[eyebrow] ?? "portal"} />
        </div>
      </header>

      <div className="nexo-direct nexo-route__body">{children}</div>
    </div>
  );
}
