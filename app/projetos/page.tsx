import type { Metadata } from "next";
import { ChapterTransition } from "@/components/compartilhados/transicoes/transicao-pagina";
import { EditorialPage } from "@/components/compartilhados/estrutura/pagina-editorial";
import { ProjectsSection } from "@/components/projetos/secao-projetos";
import { pageMetadata } from "@/lib/seo/metadados";

export const metadata: Metadata = pageMetadata("Projetos", "Aplicações web de Letícia de Paula: objetivos, tecnologias, funcionalidades e estudos de caso com código público.", "/projetos/");

export default function ProjectsPage() {
  return (
    <ChapterTransition phase="projects">
    <EditorialPage
      phase="projects"
      eyebrow="Projetos"
      title="Da ideia à experiência."
      description="Aplicações que aproximam interface, dados e propósito. Veja os projetos em detalhe e conheça as escolhas por trás de cada solução."
    >
      <ProjectsSection compact />
    </EditorialPage>
    </ChapterTransition>
  );
}
