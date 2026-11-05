"use client";

import Link from "next/link";
import { useId } from "react";
import { ArrowUpRight, RotateCcw } from "lucide-react";
import { useExperienceSelection } from "@/components/experience-provider";
import { projects } from "@/lib/projects";
import { projectsForSkill, skills, skillsForProject } from "@/lib/skill-relations";

export function SkillConnectionMap() {
  const { selectedSkillName, selectedProjectSlug, selectProject, selectSkill } = useExperienceSelection();
  const panelId = useId();
  const selectedSkill = skills.find((skill) => skill.name === selectedSkillName);
  const selectedProject = projects.find((project) => project.slug === selectedProjectSlug);
  const connectedProjects = selectedSkill ? projectsForSkill(selectedSkill.name) : selectedProject ? [selectedProject] : [];
  const connectedSkills = selectedSkill ? [selectedSkill] : selectedProject ? skillsForProject(selectedProject.slug) : [];

  return (
    <div className="nexo-connection-map editorial-connections">
      <div className="nexo-connection-map__heading"><h3>Tecnologia em contexto</h3>{selectedSkill ? <button className="text-action focusable" type="button" onClick={() => selectSkill(null)}><RotateCcw size={15} aria-hidden="true" />Limpar seleção</button> : null}</div>
      <div className="nexo-map-projects" role="group" aria-label="Selecionar projeto no mapa">
        {projects.map((project) => <button className="nexo-map-project focusable" key={project.slug} type="button" aria-pressed={selectedProjectSlug === project.slug} aria-controls={panelId} onClick={() => selectProject(project.slug, "competencies")}><strong>{project.shortTitle}</strong><small>{skillsForProject(project.slug).length} tecnologias relacionadas</small></button>)}
      </div>
      <div className="nexo-map-detail" id={panelId} aria-live="polite" aria-atomic="true">
        <p className="context-label">{selectedSkill ? "TECNOLOGIA EM FOCO" : selectedProject ? "PROJETO EM FOCO" : "CONHECIMENTO EM PRÁTICA"}</p>
        <h4>{selectedSkill?.name ?? selectedProject?.shortTitle ?? "Escolha um projeto"}</h4>
        <p>{selectedSkill?.context ?? selectedProject?.summary ?? "As relações apresentadas correspondem ao uso documentado em cada projeto."}</p>
        {selectedSkill && !connectedProjects.length ? <p className="nexo-map-empty">Nenhum projeto associado a {selectedSkill.name}.</p> : null}
        {selectedProject && !selectedSkill ? <div className="tag-list" aria-label={`Tecnologias relacionadas a ${selectedProject.shortTitle}`}>{connectedSkills.map((skill) => <button className="filter-chip focusable" type="button" key={skill.name} onClick={() => selectSkill(skill.name)}>{skill.name}</button>)}</div> : null}
        <div className="nexo-map-case-links">{connectedProjects.map((project) => <Link className="text-action focusable" href={`/projetos/${project.slug}/`} key={project.slug} onNavigate={() => selectProject(project.slug)}>{project.shortTitle} / Estudo de caso<ArrowUpRight size={16} aria-hidden="true" /></Link>)}</div>
      </div>
    </div>
  );
}
