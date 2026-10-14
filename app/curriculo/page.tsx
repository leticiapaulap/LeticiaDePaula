import type { Metadata } from "next";
import { PrintActions } from "@/components/print-actions";
import {
  education,
  experiences,
  professional,
  projects,
  skillGroups
} from "@/lib/data";

export const metadata: Metadata = {
  title: "Curriculo Digital",
  description:
    "Curriculo digital de Leticia de Paula com experiencia em desenvolvimento, dados, automacao e tecnologia da informacao."
};

export default function CurriculoPage() {
  return (
    <section className="resume-page" aria-labelledby="curriculo-title">
      <div className="container resume-container">
        <div className="resume-heading">
          <div>
            <p className="eyebrow">Curriculo digital</p>
            <h1 id="curriculo-title">{professional.name}</h1>
            <p>{professional.positioning}</p>
          </div>
          <PrintActions />
        </div>

        <div className="resume-grid">
          <aside className="resume-sidebar" aria-label="Contato e competencias">
            <div>
              <h2>Contato</h2>
              <a href={`mailto:${professional.email}`}>{professional.email}</a>
              <a href={professional.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a href={professional.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <span>{professional.location}</span>
            </div>

            <div>
              <h2>Competencias</h2>
              <ul className="resume-list compact">
                {skillGroups.flatMap((group) =>
                  group.items.slice(0, 4).map((item) => (
                    <li key={`${group.title}-${item}`}>{item}</li>
                  ))
                )}
              </ul>
            </div>
          </aside>

          <div className="resume-main">
            <section aria-labelledby="resume-summary">
              <h2 id="resume-summary">Resumo profissional</h2>
              <p>{professional.summary}</p>
            </section>

            <section aria-labelledby="resume-experience">
              <h2 id="resume-experience">Experiencia profissional</h2>
              <div className="resume-stack">
                {experiences.map((experience) => (
                  <article key={experience.organization}>
                    <p className="resume-kicker">{experience.context}</p>
                    <h3>{experience.organization}</h3>
                    <p>{experience.summary}</p>
                    <ul className="resume-list">
                      {experience.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </section>

            <section aria-labelledby="resume-projects">
              <h2 id="resume-projects">Projetos selecionados</h2>
              <div className="resume-stack">
                {projects.map((project) => (
                  <article key={project.title}>
                    <p className="resume-kicker">{project.status}</p>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <p className="resume-tags">{project.stack.join(" / ")}</p>
                  </article>
                ))}
              </div>
            </section>

            <section aria-labelledby="resume-education">
              <h2 id="resume-education">Formacao</h2>
              <p>
                <strong>{education.course}</strong>
              </p>
              <p>{education.note}</p>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}
