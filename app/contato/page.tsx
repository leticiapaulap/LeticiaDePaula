import type { Metadata } from "next";
import { ChapterTransition } from "@/components/chapter-transition";
import { ContactSection } from "@/components/contact-section";
import { EditorialPage } from "@/components/editorial-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata("Contato", "Converse com Letícia de Paula sobre tecnologia, projetos e oportunidades. E-mail, GitHub e LinkedIn.", "/contato/");

export default function ContactPage() {
  return (
    <ChapterTransition phase="convergence">
    <EditorialPage
      phase="convergence"
      eyebrow="Contato"
      title="Vamos conectar ideias."
      description="Uma conversa pode ser o começo de uma boa parceria. Fale comigo sobre projetos, tecnologia e novas oportunidades."
    >
      <ContactSection />
    </EditorialPage>
    </ChapterTransition>
  );
}
