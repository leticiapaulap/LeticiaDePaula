"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useExperienceSelection } from "@/components/experience-provider";
import { SectionShell } from "@/components/section-shell";
import { experiences } from "@/lib/data";

export function ExperienceSection() {
  const { selectedExperienceId, selectExperience } = useExperienceSelection();
  const selectedIndex = Math.max(0, experiences.findIndex((experience) => experience.id === selectedExperienceId));
  const selected = experiences[selectedIndex];
  const selectAt = (index: number) => {
    const experience = experiences[index];
    if (experience) selectExperience(experience.id);
  };

  return (
    <SectionShell
      alt
      description="Experiências em tecnologia, dados e suporte que conectam organização, análise e atenção às pessoas."
      eyebrow="Experiência"
      id="experiencia"
      title="Uma trajetória em movimento."
    >
      <div className="nexo-career-navigation focusable" role="group" aria-label="Percorrer os marcos profissionais" tabIndex={0} onKeyDown={(event) => {
        if (event.target !== event.currentTarget) return;
        if (event.key === "ArrowRight") selectAt(Math.min(experiences.length - 1, selectedIndex + 1));
        else if (event.key === "ArrowLeft") selectAt(Math.max(0, selectedIndex - 1));
        else if (event.key === "Home") selectAt(0);
        else if (event.key === "End") selectAt(experiences.length - 1);
        else return;
        event.preventDefault();
      }}>
        <div className="nexo-career-navigation__current" aria-live="polite"><span>MARCO {String(selectedIndex + 1).padStart(2, "0")} / {String(experiences.length).padStart(2, "0")}</span><strong>{selected.organization}</strong><small>{selected.role} · {selected.period}</small></div>
        <div className="nexo-career-navigation__controls">
          <button className="nexo-project-selection__arrow focusable" type="button" aria-label="Marco anterior" disabled={selectedIndex === 0} onClick={() => selectAt(selectedIndex - 1)}><ArrowLeft size={17} aria-hidden="true" /></button>
          <button className="nexo-project-selection__arrow focusable" type="button" aria-label="Próximo marco" disabled={selectedIndex === experiences.length - 1} onClick={() => selectAt(selectedIndex + 1)}><ArrowRight size={17} aria-hidden="true" /></button>
        </div>
      </div>
      <nav className="nexo-career-stops" aria-label="Ir a um marco profissional">{experiences.map((experience, index) => <a className="focusable" href={`#marco-${experience.id}`} key={experience.id} aria-current={selectedIndex === index ? "step" : undefined} onClick={() => selectExperience(experience.id)}><span aria-hidden="true">0{index + 1}</span>{experience.organization}</a>)}</nav>
      <ol className="career-timeline nexo-experience-list">
        {experiences.map((experience, index) => (
          <li
            className="nexo-experience-entry"
            data-selected={selectedIndex === index}
            id={`marco-${experience.id}`}
            key={experience.id}
          >
            <span className="nexo-experience-entry__index" aria-hidden="true">
              0{index + 1}
            </span>

            <div className="nexo-experience-entry__company">
              <p>{experience.area}</p>
              <h3>{experience.organization}</h3>
              <strong className="career-role">{experience.role}</strong>
              <span className="career-period">{experience.period}</span>
              <button
                aria-pressed={selectedIndex === index}
                className="nexo-experience-select focusable"
                onClick={() => selectExperience(experience.id)}
                type="button"
              >
                {selectedIndex === index ? "Em destaque" : "Destacar experiência"}
              </button>
            </div>

            <dl className="nexo-experience-entry__facts">
              <div>
                <dt className="nexo-visually-hidden">Atividades</dt>
                <dd>
                  <ul className="nexo-experience-responsibilities">
                    {experience.responsibilities.map((responsibility) => (
                      <li key={responsibility}>{responsibility}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>

          </li>
        ))}
      </ol>
    </SectionShell>
  );
}
