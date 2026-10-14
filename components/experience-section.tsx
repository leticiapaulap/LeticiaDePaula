import { Reveal } from "@/components/reveal";
import { SectionShell } from "@/components/section-shell";
import { experiences } from "@/lib/data";

export function ExperienceSection() {
  return (
    <SectionShell
      id="experiencia"
      eyebrow="Experiencia"
      title="Atuacao em ambientes tecnicos, operacionais e administrativos."
      description="As experiencias foram descritas com escopo funcional confirmado pelas informacoes disponiveis, sem inventar cargos, periodos ou atribuicoes nao verificadas."
      alt
    >
      <div className="timeline">
        {experiences.map((experience, index) => (
          <Reveal className="experience-card" delay={index * 0.05} key={experience.organization}>
            <div>
              <p className="context-label">{experience.context}</p>
              <h3>{experience.organization}</h3>
            </div>
            <div>
              <p>{experience.summary}</p>
              <ul>
                {experience.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
