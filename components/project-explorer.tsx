"use client";

import { ArrowRight, ExternalLink, GitBranch } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { ProjectCategory } from "@/lib/types";
import { ProjectVisual } from "@/components/project-visual";
import { projectCategories, projects, type Project } from "@/lib/data";

type ActiveCategory = (typeof projectCategories)[number];

const projectCounts = (category: ProjectCategory | "Todos") =>
  category === "Todos" ? projects.length : projects.filter((project) => project.category === category).length;

function ProjectLink({ project }: { project: Project }) {
  const caseLink = project.links.find((link) => link.type === "case");

  if (!caseLink) {
    return null;
  }

  return (
    <Link className="primary-action focusable" href={caseLink.href}>
      Ver detalhes
      <ArrowRight size={17} />
    </Link>
  );
}

export function ProjectExplorer() {
  const [activeCategory, setActiveCategory] = useState<ActiveCategory>("Todos");

  const visibleProjects = useMemo(() => {
    if (activeCategory === "Todos") {
      return projects;
    }

    return projects.filter((project) => project.category === activeCategory);
  }, [activeCategory]);

  const featuredProjects = visibleProjects.filter((project) => project.featured);
  const secondaryProjects = visibleProjects.filter((project) => !project.featured);

  return (
    <div className="project-explorer">
      <div className="filter-bar" role="group" aria-label="Filtrar projetos por categoria">
        {projectCategories.map((category) => (
          <button
            aria-pressed={activeCategory === category}
            aria-label={
              category === "Todos"
                ? `Todos os projetos, ${projects.length}`
                : `${category}, ${projectCounts(category)}`
            }
            className="filter-chip focusable"
            key={category}
            onClick={() => setActiveCategory(category)}
            type="button"
          >
            {category}
          </button>
        ))}
      </div>

      <p className="nexo-results-count" aria-live="polite">
        {visibleProjects.length === 1 ? "1 projeto" : `${visibleProjects.length} projetos`}
      </p>

      {visibleProjects.length === 0 ? (
        <div className="empty-state">
          <strong>Nenhum projeto público nesta categoria.</strong>
          <span>Novos projetos entram aqui quando houver documentação validada e permissão de divulgação.</span>
        </div>
      ) : (
        <div className="project-grid">
          {featuredProjects.map((project) => (
            <article className="project-card featured" key={project.slug}>
              <ProjectVisual project={project} />
              <div className="project-body">
                <div className="project-topline">
                  <div>
                    <p className="project-status">{project.status}</p>
                    <h3>{project.title}</h3>
                  </div>
                  <span className="category-badge">{project.category}</span>
                </div>
                <p>{project.summary}</p>
                <ul>
                  {project.highlights.slice(0, 4).map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
                <div className="tag-list" aria-label={`Tecnologias de ${project.shortTitle}`}>
                  {project.technologies.slice(0, 8).map((technology) => (
                    <span className="tag" key={technology}>
                      {technology}
                    </span>
                  ))}
                </div>
                <div className="project-links">
                  <ProjectLink project={project} />
                  {project.links
                    .filter((link) => link.type !== "case")
                    .map((link) => (
                      <a
                        className="secondary-action focusable"
                        href={link.href}
                        key={link.href}
                        rel="noreferrer"
                        target="_blank"
                      >
                        {link.type === "github" ? <GitBranch size={17} /> : <ExternalLink size={17} />}
                        {link.label}
                      </a>
                    ))}
                </div>
              </div>
            </article>
          ))}

          {secondaryProjects.map((project) => (
            <article className="project-card" key={project.slug}>
              <ProjectVisual compact project={project} />
              <div className="project-body">
                <p className="project-status">{project.status}</p>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
                <div className="tag-list" aria-label={`Tecnologias de ${project.shortTitle}`}>
                  {project.technologies.slice(0, 6).map((technology) => (
                    <span className="tag" key={technology}>
                      {technology}
                    </span>
                  ))}
                </div>
                <div className="project-links">
                  <ProjectLink project={project} />
                  {project.links
                    .filter((link) => link.type !== "case")
                    .slice(0, 2)
                    .map((link) => (
                      <a
                        className="text-action focusable"
                        href={link.href}
                        key={link.href}
                        rel="noreferrer"
                        target="_blank"
                      >
                        {link.label}
                        <ExternalLink size={15} />
                      </a>
                    ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      <aside className="pending-projects nexo-unpublished-note" aria-label="Conteúdo não autorizado para publicação">
        <div>
          <p className="context-label">Conteúdo sob validação</p>
          <h3>Informação interna fica fora da galeria.</h3>
          <p>
            Projetos corporativos só serão apresentados após a confirmação de escopo e a autorização para divulgação.
            Nenhum nome, fluxo ou tecnologia interna é publicado aqui.
          </p>
        </div>
      </aside>
    </div>
  );
}
