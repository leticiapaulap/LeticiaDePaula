import type { Metadata } from "next";
import { ChapterTransition } from "@/components/compartilhados/transicoes/transicao-pagina";
import { EditorialPage } from "@/components/compartilhados/estrutura/pagina-editorial";
import { SkillsSection } from "@/components/competencias/secao-competencias";
import { pageMetadata } from "@/lib/seo/metadados";

export const metadata: Metadata = pageMetadata("Competências", "Tecnologias organizadas por área e ligadas aos projetos que documentam seu uso.", "/competencias/");

export default function SkillsPage() {
  return (
    <ChapterTransition phase="competencies">
    <EditorialPage
      phase="competencies"
      eyebrow="Competências"
      title="Ferramentas com contexto."
      description="Interfaces, APIs, dados e ferramentas que se complementam. Explore as áreas e veja como as tecnologias se conectam aos meus projetos."
    >
      <SkillsSection />
    </EditorialPage>
    </ChapterTransition>
  );
}
