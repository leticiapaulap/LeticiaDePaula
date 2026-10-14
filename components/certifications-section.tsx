import { CertificationExplorer } from "@/components/certification-explorer";
import { SectionShell } from "@/components/section-shell";

export function CertificationsSection() {
  return (
    <SectionShell
      description="Pesquise por nome ou instituição e filtre por área e situação. Cursos em andamento não são tratados como certificados; o botão só aparece com uma URL real."
      eyebrow="Cursos e certificações"
      id="certificacoes"
      title="Qualificação contínua com validação explícita."
    >
      <CertificationExplorer />
    </SectionShell>
  );
}
