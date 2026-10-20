import type { Metadata } from "next";
import { ChapterTransition } from "@/components/chapter-transition";
import { EditorialPage } from "@/components/editorial-page";
import { ExperienceSection } from "@/components/experience-section";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata("Experiência", "Trajetória profissional de Letícia de Paula em tecnologia, dados geoespaciais e suporte.", "/experiencia/");

export default function ExperiencePage() {
  return (
    <ChapterTransition phase="experience">
    <EditorialPage
      phase="experience"
      eyebrow="Experiência"
      title="Uma trajetória que conecta contextos."
      description="Do suporte às pessoas ao cuidado com os dados e sistemas. Experiências que ampliam minha forma de pensar e trabalhar com tecnologia."
    >
      <ExperienceSection />
    </EditorialPage>
    </ChapterTransition>
  );
}
