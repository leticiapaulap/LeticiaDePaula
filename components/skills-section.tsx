"use client";

import Link from "next/link";
import { useExperienceSelection } from "@/components/experience-provider";
import { SkillConnectionMap } from "@/components/skill-connection-map";
import { projects, skillEvidenceLabels, skillGroups } from "@/lib/data";

const categoryTitles: Record<string, string> = { "front-end": "Desenvolvimento Front-end", "back-end": "Desenvolvimento Back-end", "tools-processes": "Ferramentas" };

export function SkillsSection() {
  const { selectedProjectSlug, selectedSkillName, selectSkill, selectProject } = useExperienceSelection();

  return (
    <section className="section editorial-skills" data-section id="competencias" aria-label="Competências por área">
      <div className="container">
        <p className="editorial-skills__instruction">Selecione uma tecnologia para ver o contexto de uso e os projetos relacionados.</p>
        <div aria-label="Mapa acessível de competências e projetos" className="editorial-skills__grid" role="group">
          {skillGroups.map((group) => {
            const selected = group.items.find((item) => item.name === selectedSkillName);
            const detailId = `skill-detail-${group.id}`;
            return (
              <article className="editorial-skill-group" key={group.id}>
                <h2>{categoryTitles[group.id] ?? group.title}</h2>
                <p>{group.description}</p>
                <ul className="editorial-skill-group__technologies">
                  {group.items.map((item) => (
                    <li data-connected={Boolean(selectedProjectSlug && item.projectSlugs?.includes(selectedProjectSlug))} key={item.name}>
                      <button aria-pressed={selectedSkillName === item.name} aria-controls={detailId} className="nexo-skill-node focusable" title={skillEvidenceLabels[item.evidence]} onClick={() => selectSkill(selectedSkillName === item.name ? null : item.name)} type="button">{item.name}</button>
                    </li>
                  ))}
                </ul>
                <div id={detailId} aria-live="polite" aria-atomic="true">
                  {selected ? <div className="editorial-skill-group__detail">
                    <span className="context-label">{skillEvidenceLabels[selected.evidence]}</span>
                    <h3>{selected.name}</h3><p>{selected.context}</p>
                    {selected.projectSlugs?.length ? <div className="nexo-skill-projects" aria-label={`Projetos relacionados a ${selected.name}`}>{selected.projectSlugs.map((slug) => {
                      const project = projects.find((entry) => entry.slug === slug);
                      return project ? <Link className="nexo-skill-project focusable" href={`/projetos/${project.slug}/`} key={slug} onNavigate={() => selectProject(project.slug)}>{project.shortTitle}</Link> : null;
                    })}</div> : null}
                  </div> : null}
                </div>
                <noscript><ul className="editorial-skill-group__static">{group.items.map((item) => <li key={item.name}><strong>{item.name}</strong><p>{item.context}</p><small>{skillEvidenceLabels[item.evidence]}</small>{item.projectSlugs?.map((slug) => <a href={`/projetos/${slug}/`} key={slug}>{projects.find((project) => project.slug === slug)?.shortTitle}</a>)}</li>)}</ul></noscript>
              </article>
            );
          })}
        </div>
        <details className="editorial-skills__connections"><summary className="focusable">Explorar tecnologias por projeto<span aria-hidden="true">+</span></summary><SkillConnectionMap /></details>
        <noscript><style>{`.editorial-skills__connections{display:none!important}`}</style></noscript>
      </div>
    </section>
  );
}
