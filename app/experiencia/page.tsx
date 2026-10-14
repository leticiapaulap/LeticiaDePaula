import type { Metadata } from "next";
import { EditorialPage } from "@/components/editorial-page";
import { ExperienceSection } from "@/components/experience-section";

export const metadata: Metadata = {
  title: "Experiência",
  description: "Organizações informadas e validação transparente do histórico profissional de Letícia de Paula.",
  alternates: { canonical: "/experiencia/" }
};

export default function ExperiencePage() {
  return (
    <EditorialPage
      eyebrow="Experiência"
      title="Vínculos, sem datas presumidas."
      description="Os nomes das organizações foram informados. Sem currículo atualizado, apresento o estado de validação — não atribuo cargos, tarefas, tecnologias ou resultados."
    >
      <ExperienceSection />
    </EditorialPage>
  );
}
