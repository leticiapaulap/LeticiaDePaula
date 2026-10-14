import type { Metadata } from "next";
import { PrintActions } from "@/components/print-actions";
import { education, experiences, professional, projects, skillGroups } from "@/lib/data";

export const metadata: Metadata = {
  title: "Currículo Digital",
  description:
    "Currículo digital de Letícia de Paula, com apresentação profissional, projetos documentados e informações de formação.",
  alternates: {
    canonical: "/curriculo/"
  },
  openGraph: {
    title: "Currículo Digital | Letícia de Paula",
    description:
      "Resumo profissional, experiências, competências e projetos públicos de Letícia de Paula.",
    url: "/curriculo/"
  }
};

export default function CurriculoPage() {
  return (
    <section className="resume-page" aria-labelledby="curriculo-title">
      <div className="container resume-container">
        <div className="resume-heading">
          <div>
            <p className="eyebrow">Currículo digital</p>
            <h1 id="curriculo-title">{professional.name}</h1>
            <p>{professional.positioning}</p>
          </div>
          <PrintActions />
        </div>

        <div className="resume-grid">
          <aside className="resume-sidebar" aria-label="Contato e competências">
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
              <h2>Competências</h2>
              <ul className="resume-list compact">
                {skillGroups.flatMap((group) =>
                  group.items.slice(0, 4).map((item) => (
                    <li key={`${group.title}-${item.name}`}>{item.name}</li>
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
              <h2 id="resume-experience">Experiência profissional</h2>
              <div className="resume-stack">
                {experiences.map((experience) => (
                  <article key={experience.organization}>
                    <p className="resume-kicker">{experience.area}</p>
                    <h3>{experience.organization}</h3>
                    <p className="resume-tags">{experience.role}</p>
                    <p>{experience.context}</p>
                    <ul className="resume-list">
                      {experience.responsibilities.map((point) => (
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
                  <article key={project.slug}>
                    <p className="resume-kicker">{project.status}</p>
                    <h3>{project.title}</h3>
                    <p>{project.summary}</p>
                    <p className="resume-tags">{project.technologies.join(" / ")}</p>
                  </article>
                ))}
              </div>
            </section>

            <section aria-labelledby="resume-education">
              <h2 id="resume-education">Formação</h2>
              <p>
                <strong>{education.course}</strong>
              </p>
              <p>{education.institution}</p>
              <p>{education.note}</p>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}
