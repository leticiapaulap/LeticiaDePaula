import type { Metadata } from "next";
import { CertificationsSection } from "@/components/certifications-section";
import { EducationSection } from "@/components/education-section";
import { EditorialPage } from "@/components/editorial-page";

export const metadata: Metadata = {
  title: "Formação e cursos",
  description: "Formação informada, curso em andamento e estado verificável dos documentos.",
  alternates: { canonical: "/formacao/" }
};

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
