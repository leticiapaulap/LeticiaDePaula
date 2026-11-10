import type { Metadata } from "next";
import { ChapterTransition } from "@/components/compartilhados/transicoes/transicao-pagina";
import { ContactSection } from "@/components/contato/secao-contato";
import { EditorialPage } from "@/components/compartilhados/estrutura/pagina-editorial";
import { pageMetadata } from "@/lib/seo/metadados";

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
