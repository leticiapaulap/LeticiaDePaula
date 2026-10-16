import { BookOpen, GraduationCap } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionShell } from "@/components/section-shell";
import { education } from "@/lib/data";

export function EducationSection() {
  return (
    <SectionShell
      alt
      description="A base que conecta raciocínio, desenvolvimento de software e aplicação prática."
      eyebrow="Formação"
      id="formacao"
      title="Base acadêmica em análise e desenvolvimento."
    >
      <Reveal className="education-panel">
        <div className="education-icon" aria-hidden="true">
          <GraduationCap size={28} />
        </div>
        <div>
          <p className="context-label">Formação acadêmica</p>
          <h3>{education.course}</h3>
          <dl className="education-meta">
            <div>
              <dt>Instituição</dt>
              <dd>{education.institution}</dd>
            </div>
            <div>
              <dt>Situação</dt>
              <dd>{education.status}</dd>
            </div>
            <div>
              <dt>Período</dt>
              <dd>{education.period}</dd>
            </div>
          </dl>
          <p>{education.note}</p>
          {education.areas.length ? (
            <details className="nexo-archive-details" open>
            <summary className="focusable">Áreas de estudo</summary>
            <div className="study-areas" aria-label="Áreas documentadas de estudo">
              {education.areas.map((area) => (
                <span className="tag" key={area}>
                  <BookOpen size={14} />
                  {area}
                </span>
              ))}
            </div>
            </details>
          ) : null}
        </div>
      </Reveal>
    </SectionShell>
  );
}
