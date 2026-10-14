import { SectionShell } from "@/components/section-shell";
import { Reveal } from "@/components/reveal";
import { professional, workflow } from "@/lib/data";

export function ProfileSection() {
  return (
    <SectionShell
      id="perfil"
      eyebrow="Perfil"
      title="Tecnologia com leitura pratica do negocio."
      description="Um portfolio pensado para mostrar maturidade de execucao: entender a rotina, organizar a informacao e entregar solucoes que realmente ajudam pessoas e processos."
    >
      <div className="profile-grid">
        <Reveal className="editorial-copy">
          <p>{professional.summary}</p>
          <p>
            O posicionamento combina desenvolvimento web e full stack, automacao, analise de dados e suporte tecnico.
            Essa combinacao e valiosa para ambientes que precisam de alguem capaz de dialogar com usuarios, entender
            restricoes operacionais e transformar demandas em solucoes digitais bem organizadas.
          </p>
          <p>
            A comunicacao do site evita superlativos sem evidencia e prioriza aquilo que pode ser sustentado por
            experiencias informadas, projetos publicos e repositorios disponiveis.
          </p>
        </Reveal>

        <Reveal className="workflow-list" delay={0.08}>
          {workflow.map((item) => (
            <article className="workflow-item" key={item.title}>
              <strong>{item.title}</strong>
              <span>{item.description}</span>
            </article>
          ))}
        </Reveal>
      </div>
    </SectionShell>
  );
}
