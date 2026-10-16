"use client";

import { ArrowRight, ExternalLink, GitBranch } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useRef, type KeyboardEvent, type PointerEvent } from "react";
import type { ProjectCategory } from "@/lib/types";
import { ProjectVisual } from "@/components/project-visual";
import { useExperienceSelection } from "@/components/experience-provider";
import { projectCategories, projects } from "@/lib/data";
import { projectsForSkill } from "@/lib/skill-relations";

const projectCounts = (category: ProjectCategory | "Todos") =>
  category === "Todos" ? projects.length : projects.filter((project) => project.category === category).length;

export function ProjectExplorer() {
  const pathname = usePathname();
  const { projectCategory, setProjectCategory, selectedProjectSlug, selectedSkillName, selectProject, rememberGallery } = useExperienceSelection();
  const touchStart = useRef<{ horizontal: number; vertical: number } | null>(null);
  const visibleProjects = useMemo(() => projects.filter((project) => projectCategory === "Todos" || project.category === projectCategory), [projectCategory]);
  const selectedSkillProjects = projectsForSkill(selectedSkillName).map((project) => project.slug);
  const focusedProject = visibleProjects.find((project) => project.slug === selectedProjectSlug)
    ?? visibleProjects.find((project) => selectedSkillProjects.includes(project.slug))
    ?? visibleProjects[0];
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
          <button aria-pressed={projectCategory === category} aria-label={category === "Todos" ? `Todos os projetos, ${projects.length}` : `${category}, ${projectCounts(category)}`} className="filter-chip focusable" key={category} onClick={() => setProjectCategory(category)} type="button">{category}</button>
        ))}
      </div>
      <p className="nexo-results-count" aria-live="polite">{visibleProjects.length === 1 ? "1 projeto" : `${visibleProjects.length} projetos`}</p>
      {focusedProject ? (
        <div className="nexo-gallery-stage project-showcase focusable" role="group" aria-label="Galeria em foco. Use as setas para mudar de projeto." aria-keyshortcuts="ArrowLeft ArrowRight Home End" tabIndex={0} onKeyDown={handleKeyboard} onPointerDown={(event) => {
          if (event.pointerType !== "mouse" && !(event.target as HTMLElement).closest("a, button")) {
            touchStart.current = { horizontal: event.clientX, vertical: event.clientY };
            event.currentTarget.setPointerCapture(event.pointerId);
          }
        }} onPointerUp={handleSwipe} onPointerCancel={() => { touchStart.current = null; }}>
          <article className="project-showcase__feature" key={focusedProject.slug}>
            <div className="project-showcase__media">
              <div className="project-window-bar" aria-hidden="true"><span /><span /><span /><small>{focusedProject.shortTitle}</small></div>
              <ProjectVisual project={focusedProject} />
            </div>
            <div className="nexo-gallery-info project-showcase__info">
              <p className="context-label">{focusedProject.category} / {String(focusedIndex + 1).padStart(2, "0")}</p>
              <h3>{focusedProject.title}</h3>
              <p>{focusedProject.description}</p>
              <ul className="project-showcase__highlights">{focusedProject.features.slice(0, 3).map((feature) => <li key={feature}>{feature}</li>)}</ul>
              <div className="tag-list" aria-label={`Tecnologias de ${focusedProject.shortTitle}`}>{focusedProject.technologies.slice(0, 5).map((technology) => <span className="tag" key={technology}>{technology}</span>)}</div>
              <div className="project-links">
                <Link className="primary-action focusable" href={`/projetos/${focusedProject.slug}/`} onNavigate={() => { rememberGallery(`${pathname}#projetos`); selectProject(focusedProject.slug); }}>Ver detalhes<ArrowRight size={17} aria-hidden="true" /></Link>
                {focusedProject.links.filter((link) => link.type !== "case").map((link) => <a className="text-action focusable" href={link.href} key={link.href} rel="noreferrer" target="_blank">{link.type === "github" ? <GitBranch size={16} aria-hidden="true" /> : <ExternalLink size={16} aria-hidden="true" />}{link.label}</a>)}
              </div>
            </div>
          </article>
          <div className="project-showcase__selection" role="group" aria-label="Selecionar projeto em destaque">
            {visibleProjects.map((project, index) => <button className="project-showcase__tab focusable" type="button" key={project.slug} aria-pressed={focusedProject.slug === project.slug} onClick={() => selectProject(project.slug)}><span className="project-showcase__tab-number">0{index + 1}</span><span><strong>{project.shortTitle}</strong><small>{project.category}</small></span><ArrowRight size={17} aria-hidden="true" /></button>)}
          </div>
        </div>
      ) : <div className="empty-state"><strong>Nenhum projeto público nesta categoria.</strong><span>Explore as outras categorias para conhecer meus projetos.</span></div>}
      <noscript><nav className="project-static-links" aria-label="Todos os estudos de caso">{projects.map((project) => <Link className="secondary-action focusable" href={`/projetos/${project.slug}/`} key={project.slug}>{project.shortTitle}<ArrowRight size={16} aria-hidden="true" /></Link>)}</nav></noscript>
    </div>
  );
}
