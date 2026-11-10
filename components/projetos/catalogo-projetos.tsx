"use client";

import { ArrowUpRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, type KeyboardEvent } from "react";
import type { ProjectCategory } from "@/data/tipos";
import { ProjectVisual } from "@/components/projetos/visual-projeto";
import { useExperienceSelection } from "@/components/compartilhados/estado/provedor-navegacao";
import { projectCategories, projects } from "@/data/conteudo";
import { projectsForSkill } from "@/lib/competencias/relacoes-projetos";

const featuredFirstProjects = [...projects].sort((first, second) => {
  const featuredOrder = Number(second.featured) - Number(first.featured);
  if (featuredOrder !== 0) return featuredOrder;
  if (first.slug === "agenda-executiva") return -1;
  if (second.slug === "agenda-executiva") return 1;
  return 0;
});

const projectCounts = (category: ProjectCategory | "Todos") =>
  category === "Todos" ? projects.length : projects.filter((project) => project.category === category).length;

export function ProjectExplorer() {
  const pathname = usePathname();
  const { projectCategory, setProjectCategory, selectedProjectSlug, selectedSkillName, selectProject, rememberGallery } = useExperienceSelection();
  const visibleProjects = useMemo(
    () => featuredFirstProjects.filter((project) => projectCategory === "Todos" || project.category === projectCategory),
    [projectCategory]
  );
  const selectedSkillProjects = projectsForSkill(selectedSkillName).map((project) => project.slug);
  const focusedProject = visibleProjects.find((project) => project.slug === selectedProjectSlug)
    ?? visibleProjects.find((project) => selectedSkillProjects.includes(project.slug))
    ?? visibleProjects[0];
  const focusedIndex = visibleProjects.findIndex((project) => project.slug === focusedProject?.slug);

  const handleKeyboard = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return;
    let index = focusedIndex;
    if (event.key === "ArrowLeft") index = Math.max(0, index - 1);
    else if (event.key === "ArrowRight") index = Math.min(visibleProjects.length - 1, index + 1);
    else if (event.key === "Home") index = 0;
    else if (event.key === "End") index = visibleProjects.length - 1;
    else return;
    event.preventDefault();
    const project = visibleProjects[index];
    if (project) selectProject(project.slug);
  };

  return (
    <div className="project-explorer editorial-projects">
      <div className="editorial-catalog-toolbar">
        <div className="filter-bar" role="group" aria-label="Filtrar projetos por categoria">
          {projectCategories.map((category) => (
            <button aria-pressed={projectCategory === category} aria-label={category === "Todos" ? `Todos os projetos, ${projects.length}` : `${category}, ${projectCounts(category)}`} className="filter-chip focusable" key={category} onClick={() => setProjectCategory(category)} type="button">{category}</button>
          ))}
        </div>
        <p className="nexo-results-count" aria-live="polite">{visibleProjects.length === 1 ? "1 projeto" : `${visibleProjects.length} projetos`}</p>
      </div>

      {focusedProject ? (
        <div className="editorial-project-gallery focusable" role="group" aria-label="Galeria de projetos. Use as setas para destacar um projeto." aria-keyshortcuts="ArrowLeft ArrowRight Home End" tabIndex={0} onKeyDown={handleKeyboard}>
          <div className="editorial-project-grid">
            {visibleProjects.map((project, index) => {
              const selected = project.slug === focusedProject.slug;
              const systemLink = project.slug === "senappen-recebimentos" || project.slug === "agenda-executiva"
                ? project.links.find((link) => link.type === "demo")
                : undefined;
              return (
                <article className={`editorial-project-card${project.featured ? " editorial-project-card--featured" : ""}`} data-project-category={project.category} data-selected={selected} key={project.slug}>
                  <div className="editorial-project-card__media"><ProjectVisual project={project} compact /></div>
                  <div className="editorial-project-card__content">
                    <div className="editorial-project-card__meta"><span className="context-label">{project.featured ? `Projeto em destaque · ${project.category}` : `${String(index + 1).padStart(2, "0")} / ${project.category}`}</span><span className="editorial-publication">{project.publicationStatus}</span></div>
                    <h3>{project.title}</h3>
                    <p className="editorial-project-card__description">{project.summary}</p>
                    <p className="editorial-project-technologies" aria-label={`Tecnologias de ${project.shortTitle}`}>{project.technologies.slice(0, 4).join(" · ")}</p>
                    <Link className="editorial-project-link focusable" href={`/projetos/${project.slug}/`} onNavigate={() => { rememberGallery(`${pathname}#projetos`); selectProject(project.slug); }}>{project.slug === "senappen-recebimentos" || project.slug === "agenda-executiva" ? "Conhecer projeto" : "Explorar projeto"} <ArrowUpRight size={17} aria-hidden="true" /></Link>
                    {project.slug === "agenda-executiva" ? <span className="editorial-publication">Funcionalidades internas exigem uma conta autorizada.</span> : null}
                    {systemLink ? <a className="secondary-action focusable" href={systemLink.href} target="_blank" rel="noopener noreferrer">{systemLink.label}<ExternalLink size={16} aria-hidden="true" /></a> : null}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      ) : <div className="empty-state"><strong>Nenhum projeto nesta categoria.</strong><span>Explore as outras categorias para conhecer meus projetos.</span></div>}
      <noscript><nav className="project-static-links" aria-label="Todos os estudos de caso">{featuredFirstProjects.map((project) => <Link className="text-action focusable" href={`/projetos/${project.slug}/`} key={project.slug}>{project.shortTitle}<ArrowUpRight size={16} aria-hidden="true" /></Link>)}</nav></noscript>
    </div>
  );
}
