import type { Metadata } from "next";
import { EditorialPage } from "@/components/editorial-page";
import { SkillsSection } from "@/components/skills-section";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata("Competências", "Tecnologias organizadas por área e ligadas aos projetos que documentam seu uso.", "/competencias/");

export default function SkillsPage() {
  return (
    <EditorialPage
      eyebrow="Competências"
      title="Ferramentas com contexto."
      description="Conhecimentos organizados por área, com referências a projetos, experiências informadas e cursos. Selecione uma tecnologia para consultar suas conexões."
    >
      <SkillsSection />
    </EditorialPage>
  );
}
