import type { Metadata } from "next";
import { ChapterTransition } from "@/components/compartilhados/transicoes/transicao-pagina";
import { CertificationsSection } from "@/components/formacao/secao-certificacoes";
import { EducationSection } from "@/components/formacao/formacao-academica";
import { EditorialPage } from "@/components/compartilhados/estrutura/pagina-editorial";
import { pageMetadata } from "@/lib/seo/metadados";

export const metadata: Metadata = pageMetadata("Formação e cursos", "Formação acadêmica, cursos e nove certificados disponíveis de Letícia de Paula.", "/formacao/");

export default function EducationPage() {
  return (
    <ChapterTransition phase="education">
    <EditorialPage
      phase="education"
      eyebrow="Formação e cursos"
      title="Aprendizado que abre caminhos."
      description="Formação acadêmica e cursos que ampliam meu repertório em desenvolvimento, dados e tecnologia."
    >
      <EducationSection />
      <CertificationsSection />
    </EditorialPage>
    </ChapterTransition>
  );
}
