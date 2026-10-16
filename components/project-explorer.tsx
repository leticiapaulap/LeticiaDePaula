"use client";

import { ArrowLeft, ArrowRight, ExternalLink, GitBranch } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useRef, type KeyboardEvent, type PointerEvent } from "react";
import type { ProjectCategory } from "@/lib/types";
import { ProjectVisual } from "@/components/project-visual";
import { useExperienceSelection } from "@/components/experience-provider";
import { projectCategories, projects, type Project } from "@/lib/data";
import { projectsForSkill } from "@/lib/skill-relations";

type ActiveCategory = (typeof projectCategories)[number];

const projectCounts = (category: ProjectCategory | "Todos") =>
  category === "Todos" ? projects.length : projects.filter((project) => project.category === category).length;

function ProjectLink({ project, onSelect }: { project: Project; onSelect: (slug: string) => void }) {
  const pathname = usePathname();
  const { rememberGallery } = useExperienceSelection();
  const caseLink = project.links.find((link) => link.type === "case");

  if (!caseLink) {
    return null;
  }

  return (
    <Link className="primary-action focusable" href={caseLink.href} onNavigate={() => { rememberGallery(`${pathname}#projetos`); onSelect(project.slug); }}>
      Ver detalhes
      <ArrowRight size={17} />
    </Link>
  );
}

export function ProjectExplorer() {
  const { projectCategory, setProjectCategory, selectedProjectSlug, selectedSkillName, selectProject } = useExperienceSelection();
  const activeCategory = projectCategory as ActiveCategory;
  const touchStart = useRef<{ horizontal: number; vertical: number } | null>(null);

  const visibleProjects = useMemo(() => {
    if (activeCategory === "Todos") {
      return projects;
    }

    return projects.filter((project) => project.category === activeCategory);
  }, [activeCategory]);

  const featuredProjects = visibleProjects.filter((project) => project.featured);
  const secondaryProjects = visibleProjects.filter((project) => !project.featured);
  const selectedSkillProjects = projectsForSkill(selectedSkillName).map((project) => project.slug);
  const focusedProject =
    visibleProjects.find((project) => project.slug === selectedProjectSlug) ??
    visibleProjects.find((project) => selectedSkillProjects.includes(project.slug)) ??
    visibleProjects[0];
  const focusedIndex = visibleProjects.findIndex((project) => project.slug === focusedProject?.slug);
  const selectAt = (index: number) => {
    const project = visibleProjects[index];
    if (project) selectProject(project.slug);
  };
  const handleKeyboard = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return;
    if (event.key === "ArrowLeft") selectAt(Math.max(0, focusedIndex - 1));
    else if (event.key === "ArrowRight") selectAt(Math.min(visibleProjects.length - 1, focusedIndex + 1));
    else if (event.key === "Home") selectAt(0);
    else if (event.key === "End") selectAt(visibleProjects.length - 1);
    else return;
    event.preventDefault();
  };
  const handleSwipe = (event: PointerEvent<HTMLDivElement>) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) return;
    const horizontal = event.clientX - start.horizontal;
    const vertical = event.clientY - start.vertical;
    if (Math.abs(horizontal) > 55 && Math.abs(horizontal) > Math.abs(vertical) * 1.5) selectAt(focusedIndex + (horizontal < 0 ? 1 : -1));
  };

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
            onClick={() => setProjectCategory(category)}
            type="button"
          >
            {category}
          </button>
        ))}
      </div>

      <p className="nexo-results-count" aria-live="polite">
        {visibleProjects.length === 1 ? "1 projeto" : `${visibleProjects.length} projetos`}
      </p>

      {focusedProject ? (
        <div className="nexo-gallery-stage focusable" role="group" aria-label="Galeria em foco. Use as setas para mudar de projeto." aria-keyshortcuts="ArrowLeft ArrowRight Home End" tabIndex={0} onKeyDown={handleKeyboard} onPointerDown={(event) => {
          if (event.pointerType !== "mouse" && !(event.target as HTMLElement).closest("a, button")) {
            touchStart.current = { horizontal: event.clientX, vertical: event.clientY };
            event.currentTarget.setPointerCapture(event.pointerId);
          }
        }} onPointerUp={handleSwipe} onPointerCancel={() => { touchStart.current = null; }}>
          <div className="nexo-gallery-focus" key={focusedProject.slug}>
            <ProjectVisual project={focusedProject} />
            <div className="nexo-gallery-info">
              <p className="context-label">EM FOCO / {String(focusedIndex + 1).padStart(2, "0")} DE {String(visibleProjects.length).padStart(2, "0")}</p>
              <h3>{focusedProject.title}</h3>
              <p>{focusedProject.description}</p>
              <div className="tag-list">{focusedProject.technologies.slice(0, 5).map((technology) => <span className="tag" key={technology}>{technology}</span>)}</div>
              <ProjectLink project={focusedProject} onSelect={selectProject} />
              <small>Setas do teclado, botões abaixo ou deslize horizontal.</small>
            </div>
          </div>
          <div className="nexo-gallery-tabs" role="group" aria-label="Selecionar projeto em destaque">
            {visibleProjects.map((project) => <button className="focusable" type="button" key={project.slug} aria-pressed={focusedProject.slug === project.slug} onClick={() => selectProject(project.slug)}>{project.shortTitle}</button>)}
          </div>
        </div>
      ) : null}

      {visibleProjects.length === 0 ? (
        <div className="empty-state">
          <strong>Nenhum projeto público nesta categoria.</strong>
          <span>Novos projetos entram aqui quando houver documentação validada e permissão de divulgação.</span>
        </div>
      ) : (
        <div className="project-grid">
          {featuredProjects.map((project) => (
            <article
              aria-current={project.slug === focusedProject?.slug ? "true" : undefined}
              className="project-card featured"
              data-selected={project.slug === focusedProject?.slug}
              key={project.slug}
            >
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
                  <button
                    aria-pressed={project.slug === focusedProject?.slug}
                    className="nexo-project-focus focusable"
                    onClick={() => selectProject(project.slug)}
                    type="button"
                  >
                    {project.slug === focusedProject?.slug ? "Em foco" : "Destacar"}
                  </button>
                  <ProjectLink onSelect={selectProject} project={project} />
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
            <article
              aria-current={project.slug === focusedProject?.slug ? "true" : undefined}
              className="project-card"
              data-selected={project.slug === focusedProject?.slug}
              key={project.slug}
            >
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
                  <button
                    aria-pressed={project.slug === focusedProject?.slug}
                    className="nexo-project-focus focusable"
                    onClick={() => selectProject(project.slug)}
                    type="button"
                  >
                    {project.slug === focusedProject?.slug ? "Em foco" : "Destacar"}
                  </button>
                  <ProjectLink onSelect={selectProject} project={project} />
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

      {focusedProject ? (
        <div className="nexo-project-selection" aria-label="Navegação entre projetos">
          <button
            aria-label="Projeto anterior"
            className="nexo-project-selection__arrow focusable"
            disabled={focusedIndex <= 0}
            onClick={() => {
              const previous = visibleProjects[focusedIndex - 1];
              if (previous) selectProject(previous.slug);
            }}
            type="button"
          >
            <ArrowLeft aria-hidden="true" size={17} />
          </button>
          <p aria-live="polite" className="nexo-project-selection__current">
            <span>EM FOCO {String(focusedIndex + 1).padStart(2, "0")} / {String(visibleProjects.length).padStart(2, "0")}</span>
            <strong>{focusedProject.title}</strong>
          </p>
          <button
            aria-label="Próximo projeto"
            className="nexo-project-selection__arrow focusable"
            disabled={focusedIndex >= visibleProjects.length - 1}
            onClick={() => {
              const next = visibleProjects[focusedIndex + 1];
              if (next) selectProject(next.slug);
            }}
            type="button"
          >
            <ArrowRight aria-hidden="true" size={17} />
          </button>
        </div>
      ) : null}

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
