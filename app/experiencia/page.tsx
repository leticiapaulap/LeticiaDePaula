import type { Metadata } from "next";
import { ChapterTransition } from "@/components/compartilhados/transicoes/transicao-pagina";
import { EditorialPage } from "@/components/compartilhados/estrutura/pagina-editorial";
import { ExperienceSection } from "@/components/experiencia/experiencia-profissional";
import { pageMetadata } from "@/lib/seo/metadados";

export const metadata: Metadata = pageMetadata("Experiência", "Trajetória profissional de Letícia de Paula em tecnologia, dados geoespaciais e suporte.", "/experiencia/");

export default function ExperiencePage() {
  return (
    <ChapterTransition phase="experience">
    <EditorialPage
      phase="experience"
      eyebrow="Experiência"
      title="Trajetória profissional."
      description="Do suporte às pessoas ao cuidado com os dados e sistemas. Experiências que ampliam minha forma de pensar e trabalhar com tecnologia."
    >
      <ExperienceSection />
    </EditorialPage>
    </ChapterTransition>
  );
}
