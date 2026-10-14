import { Clock3 } from "lucide-react";
import { SectionShell } from "@/components/section-shell";
import { experiences } from "@/lib/data";

export function ExperienceSection() {
  return (
    <SectionShell
      alt
      description="Os nomes foram informados; ainda não há currículo ou documento de vínculo que confirme cargos, datas ou atividades. Por isso, o conteúdo não presume responsabilidades ou resultados."
      eyebrow="Experiência"
      id="experiencia"
      title="Uma trajetória que aguarda seus registros."
    >
      <ol className="career-timeline nexo-experience-list">
        {experiences.map((experience, index) => (
          <li className="nexo-experience-entry" key={experience.id}>
            <span className="nexo-experience-entry__index" aria-hidden="true">
              0{index + 1}
            </span>

            <div className="nexo-experience-entry__company">
              <p>{experience.area}</p>
              <h3>{experience.organization}</h3>
              <span>{experience.modality}</span>
            </div>

            <dl className="nexo-experience-entry__facts">
              <div>
                <dt>Cargo</dt>
                <dd>{experience.role}</dd>
              </div>
              <div>
                <dt>Período</dt>
                <dd>{experience.period}</dd>
              </div>
              <div>
                <dt>Atividades e resultados</dt>
                <dd>Aguardam validação</dd>
              </div>
            </dl>

            <span className="nexo-evidence-status">
              <Clock3 size={14} aria-hidden="true" />
              {experience.verificationStatus}
            </span>
            <p className="nexo-experience-entry__note">{experience.validationNote}</p>
          </li>
        ))}
      </ol>
    </SectionShell>
  );
}
