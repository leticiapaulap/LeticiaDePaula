import type { Metadata } from "next";
import { CertificationsSection } from "@/components/certifications-section";
import { EducationSection } from "@/components/education-section";
import { EditorialPage } from "@/components/editorial-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata("Formação e cursos", "Formação acadêmica, cursos e nove certificados disponíveis de Letícia de Paula.", "/formacao/");

export default function EducationPage() {
  return (
    <EditorialPage
      eyebrow="Formação e cursos"
      title="Aprendizado em construção."
      description="Formação acadêmica, curso informado em andamento e pesquisa por área ou instituição — sem concluir cursos no lugar de um certificado."
    >
      <EducationSection />
      <CertificationsSection />
    </EditorialPage>
  );
}
