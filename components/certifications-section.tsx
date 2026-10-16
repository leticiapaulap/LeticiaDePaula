import { CertificationExplorer } from "@/components/certification-explorer";
import { SectionShell } from "@/components/section-shell";

export function CertificationsSection() {
  return (
    <SectionShell
      description="Uma biblioteca de aprendizados em desenvolvimento, dados e tecnologia. Explore as áreas e conheça cada formação."
      eyebrow="Cursos e certificações"
      id="certificacoes"
      title="Aprender para ir além."
    >
      <CertificationExplorer />
    </SectionShell>
  );
}
