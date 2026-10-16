import { ProjectExplorer } from "@/components/project-explorer";
import { SectionShell } from "@/components/section-shell";

export function ProjectsSection({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return <section className="section project-list-section" data-section id="projetos" aria-labelledby="projects-list-title"><div className="container"><h2 className="nexo-visually-hidden" id="projects-list-title">Projetos selecionados</h2><ProjectExplorer /></div></section>;
  }

  return (
    <SectionShell
      description="Da experiência de quem usa à estrutura que sustenta cada aplicação. Explore os projetos, suas escolhas e seus resultados."
      eyebrow="Projetos"
      id="projetos"
      title="Ideias em prática."
    >
      <ProjectExplorer />
    </SectionShell>
  );
}
