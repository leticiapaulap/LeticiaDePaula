import { ProjectExplorer } from "@/components/project-explorer";
import { SectionShell } from "@/components/section-shell";

export function ProjectsSection() {
  return (
    <SectionShell
      description="O estudo de caso publicado foi conferido no repositório e no README. O NEXO está identificado como portfólio em desenvolvimento. Sistemas internos e dados sensíveis não são divulgados."
      eyebrow="Projetos"
      id="projetos"
      title="Código documentado. Estado declarado."
    >
      <ProjectExplorer />
    </SectionShell>
  );
}
