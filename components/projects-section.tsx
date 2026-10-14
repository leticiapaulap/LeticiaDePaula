import { ExternalLink, GitBranch } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionShell } from "@/components/section-shell";
import { projects } from "@/lib/data";

const [featuredProject, ...secondaryProjects] = projects;

export function ProjectsSection() {
  return (
    <SectionShell
      id="projetos"
      eyebrow="Projetos"
      title="Projetos reais, documentados e com contexto tecnico."
      description="O destaque principal usa informacoes publicas do repositorio Festa_Fantasia, incluindo arquitetura, tecnologias, fluxo funcional e cuidados de deploy."
    >
      <div className="projects-layout">
        <Reveal className="project-card featured">
          <div className="project-topline">
            <div>
              <p className="project-status">{featuredProject.status}</p>
              <h3>{featuredProject.title}</h3>
            </div>
          </div>
          <p>{featuredProject.description}</p>
          <ul>
            {featuredProject.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
          <div className="tag-list" aria-label="Tecnologias do projeto">
            {featuredProject.stack.map((item) => (
              <span className="tag" key={item}>
                {item}
              </span>
            ))}
          </div>
          <div className="project-links">
            <a className="secondary-action focusable" href={featuredProject.repository} target="_blank" rel="noreferrer">
              <GitBranch size={17} />
              Repositorio
            </a>
            {featuredProject.live ? (
              <a className="primary-action focusable" href={featuredProject.live} target="_blank" rel="noreferrer">
                <ExternalLink size={17} />
                Ver online
              </a>
            ) : null}
          </div>

          <div className="interface-preview" aria-hidden="true">
            <div className="preview-topbar">
              <span />
              <span />
              <span />
            </div>
            <div className="preview-screen">
              <div className="preview-panel" />
              <div className="preview-lines">
                <span />
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>
        </Reveal>

        <div className="project-stack">
          {secondaryProjects.map((project, index) => (
            <Reveal className="project-card" delay={index * 0.06} key={project.title}>
              <p className="project-status">{project.status}</p>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="tag-list" aria-label="Tecnologias do projeto">
                {project.stack.map((item) => (
                  <span className="tag" key={item}>
                    {item}
                  </span>
                ))}
              </div>
              <div className="project-links">
                <a className="secondary-action focusable" href={project.repository} target="_blank" rel="noreferrer">
                  <GitBranch size={17} />
                  Repositorio
                </a>
                {project.live ? (
                  <a className="text-action focusable" href={project.live} target="_blank" rel="noreferrer">
                    Ver online
                    <ExternalLink size={15} />
                  </a>
                ) : null}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
