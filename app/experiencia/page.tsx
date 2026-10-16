import type { Metadata } from "next";
import { EditorialPage } from "@/components/editorial-page";
import { ExperienceSection } from "@/components/experience-section";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata("Experiência", "Trajetória de Letícia de Paula em tecnologia, dados e suporte, conforme o currículo fornecido.", "/experiencia/");

export default function ExperiencePage() {
  return (
    <EditorialPage
      eyebrow="Experiência"
      title="Uma trajetória que conecta contextos."
      description="Experiências em tecnologia, dados geoespaciais e suporte. Cargos, períodos e atividades apresentados conforme o currículo fornecido."
    >
      <ExperienceSection />
    </EditorialPage>
  );
}
