import type { Metadata } from "next";
import { ViewTransition } from "react";
import { EditorialPage } from "@/components/editorial-page";
import { ExperienceSection } from "@/components/experience-section";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata("Experiência", "Trajetória profissional de Letícia de Paula em tecnologia, dados geoespaciais e suporte.", "/experiencia/");

export default function ExperiencePage() {
  return (
    <ViewTransition enter={{ "nav-forward": "chapter-forward", "nav-back": "chapter-back", default: "none" }} exit={{ "nav-forward": "chapter-forward", "nav-back": "chapter-back", default: "none" }} default="none">
    <EditorialPage
      eyebrow="Experiência"
      title="Uma trajetória que conecta contextos."
      description="Do suporte às pessoas ao cuidado com os dados e sistemas. Experiências que ampliam minha forma de pensar e trabalhar com tecnologia."
    >
      <ExperienceSection />
    </EditorialPage>
    </ViewTransition>
  );
}
