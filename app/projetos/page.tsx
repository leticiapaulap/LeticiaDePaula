import type { Metadata } from "next";
import { EditorialPage } from "@/components/editorial-page";
import { ProjectsSection } from "@/components/projects-section";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata("Projetos", "Estudos de caso de projetos documentados publicamente e conteúdos profissionais verificados.", "/projetos/");

export default function ProjectsPage() {
  return (
    <EditorialPage
      eyebrow="Projetos"
      title="O que o código consegue demonstrar."
      description="Um estudo de caso público, projetos organizados por categoria e filtros funcionais. Sistemas internos permanecem fora da galeria até que sua publicação seja autorizada."
    >
      <ProjectsSection />
    </EditorialPage>
  );
}
