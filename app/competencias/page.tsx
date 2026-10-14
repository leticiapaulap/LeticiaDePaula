import type { Metadata } from "next";
import { EditorialPage } from "@/components/editorial-page";
import { SkillsSection } from "@/components/skills-section";

export const metadata: Metadata = {
  title: "Competências",
  description: "Tecnologias organizadas por área e ligadas aos projetos que documentam seu uso.",
  alternates: { canonical: "/competencias/" }
};

export default function SkillsPage() {
  return (
    <EditorialPage
      eyebrow="Competências"
      title="Ferramentas com contexto."
      description="As tecnologias abaixo têm referência em projetos públicos ou no código deste portfólio. Categorias sem evidência permanecem explicitamente vazias."
    >
      <SkillsSection />
    </EditorialPage>
  );
}
