import type { Metadata } from "next";
import { ViewTransition } from "react";
import { EditorialPage } from "@/components/editorial-page";
import { SkillsSection } from "@/components/skills-section";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata("Competências", "Tecnologias organizadas por área e ligadas aos projetos que documentam seu uso.", "/competencias/");

export default function SkillsPage() {
  return (
    <ViewTransition enter={{ "nav-forward": "chapter-forward", "nav-back": "chapter-back", default: "none" }} exit={{ "nav-forward": "chapter-forward", "nav-back": "chapter-back", default: "none" }} default="none">
    <EditorialPage
      eyebrow="Competências"
      title="Ferramentas com contexto."
      description="Interfaces, APIs, dados e ferramentas que se complementam. Explore as áreas e veja como as tecnologias se conectam aos meus projetos."
    >
      <SkillsSection />
    </EditorialPage>
    </ViewTransition>
  );
}
