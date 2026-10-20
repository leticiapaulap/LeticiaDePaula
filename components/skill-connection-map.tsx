"use client";

import Link from "next/link";
import { useId } from "react";
import { ArrowUpRight, RotateCcw } from "lucide-react";
import { useExperienceSelection } from "@/components/experience-provider";
import { projects } from "@/lib/projects";
import { skillGroups } from "@/lib/skills";
import { projectsForSkill, skillConnections, skills, skillsForProject } from "@/lib/skill-relations";

export function SkillConnectionMap() {
  const { selectedSkillName, selectedProjectSlug, selectProject, selectSkill } = useExperienceSelection();
  const panelId = useId();
  const selectedSkill = skills.find((skill) => skill.name === selectedSkillName);
  const selectedProject = projects.find((project) => project.slug === selectedProjectSlug);
  const connectedProjects = selectedSkill ? projectsForSkill(selectedSkill.name) : selectedProject ? [selectedProject] : projects;
  const connectedSkills = selectedSkill ? [selectedSkill] : selectedProject ? skillsForProject(selectedProject.slug) : [];
  const hasSelection = Boolean(selectedSkill || selectedProject);

  return (
    <div className="nexo-connection-map">
      <div className="nexo-connection-map__heading">
        <div><p className="context-label">TECNOLOGIA EM CONTEXTO</p><h3>Do repertório à aplicação.</h3></div>
        {hasSelection ? <button className="secondary-action focusable" type="button" onClick={() => selectSkill(null)}><RotateCcw size={15} aria-hidden="true" />Ver todas as conexões</button> : null}
      </div>
      <p>Escolha um projeto para explorar as tecnologias usadas na sua construção.</p>
      <div className="nexo-connection-map__graph">
        <div className="nexo-map-groups">
          {skillGroups.map((group) => {
            const linked = skillConnections.some((connection) => connection.groupId === group.id);
            const highlighted = !hasSelection ? linked : connectedSkills.some((skill) => skill.groupId === group.id && skill.projectSlugs?.length);
            return <div className="nexo-map-group" key={group.id} data-connected={highlighted}><strong>{group.title}</strong><small>{linked ? "Em projetos" : "Conhecimentos e estudos"}</small></div>;
          })}
        </div>
        <div className="nexo-map-curves" aria-hidden="true">
          <svg viewBox="0 0 100 360" preserveAspectRatio="none">
            {skillGroups.flatMap((group, groupIndex) => projects.map((project, projectIndex) => {
              const exists = skillConnections.some((connection) => connection.groupId === group.id && connection.projectSlug === project.slug);
              if (!exists) return null;
              const highlighted = !hasSelection || connectedSkills.some((skill) => skill.groupId === group.id && skill.projectSlugs?.includes(project.slug));
              const source = (groupIndex + 0.5) * 60;
              const target = (projectIndex + 0.5) * 360 / projects.length;
              return <path key={`${group.id}-${project.slug}`} d={`M0 ${source} C48 ${source},52 ${target},100 ${target}`} data-connected={highlighted} vectorEffect="non-scaling-stroke" />;
            }))}
          </svg>
        </div>
        <div className="nexo-map-projects" role="group" aria-label="Selecionar projeto no mapa">
          {projects.map((project) => {
            const relationCount = skillsForProject(project.slug).length;
            return <button className="nexo-map-project focusable" key={project.slug} type="button" aria-pressed={selectedProjectSlug === project.slug} aria-controls={panelId} data-connected={connectedProjects.some((entry) => entry.slug === project.slug)} onClick={() => selectProject(project.slug, "competencies")}><span>PROJETO</span><strong>{project.shortTitle}</strong><small>{relationCount === 1 ? "1 tecnologia relacionada" : `${relationCount} tecnologias relacionadas`}</small></button>;
          })}
        </div>
      </div>
      <div className="nexo-map-detail" id={panelId} aria-live="polite" aria-atomic="true">
        <p className="context-label">{selectedSkill ? "TECNOLOGIA EM FOCO" : selectedProject ? "PROJETO EM FOCO" : "EXPLORE AS RELAÇÕES"}</p>
        <h4>{selectedSkill?.name ?? selectedProject?.shortTitle ?? "Conhecimento em prática."}</h4>
        <p>{selectedSkill?.context ?? selectedProject?.summary ?? "A lista completa abaixo também permite explorar as conexões por teclado ou toque."}</p>
        {selectedSkill && connectedProjects.length === 0 ? <p className="nexo-map-empty">Nenhum projeto associado a {selectedSkill.name}.</p> : null}
        {selectedProject ? <div className="tag-list" aria-label={`Tecnologias relacionadas a ${selectedProject.shortTitle}`}>{connectedSkills.map((skill) => <button className="filter-chip focusable" type="button" key={skill.name} onClick={() => selectSkill(skill.name)}>{skill.name}</button>)}</div> : null}
        <div className="nexo-map-case-links">{connectedProjects.map((project) => <Link className="text-action focusable" href={`/projetos/${project.slug}/`} key={project.slug} onNavigate={() => selectProject(project.slug)}>{project.shortTitle} / Estudo de caso<ArrowUpRight size={16} aria-hidden="true" /></Link>)}</div>
      </div>
    </div>
  );
}
