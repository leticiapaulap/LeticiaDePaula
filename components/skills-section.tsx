"use client";

import { BadgeCheck, ChartNoAxesCombined, ClipboardList, Code2, Database, Server, Wrench } from "lucide-react";
import Link from "next/link";
import { SectionShell } from "@/components/section-shell";
import { useExperienceSelection } from "@/components/experience-provider";
import { SkillConnectionMap } from "@/components/skill-connection-map";
import { projects, skillEvidenceLabels, skillGroups } from "@/lib/data";

const icons = [Code2, Server, Database, ChartNoAxesCombined, Wrench, ClipboardList];

export function SkillsSection() {
  const { selectedProjectSlug, selectedSkillName, selectSkill, selectProject } = useExperienceSelection();

  return (
    <SectionShell
      alt
      description="Explore as categorias e selecione uma tecnologia para conhecer suas conexões com os projetos."
      eyebrow="Competências"
      id="competencias"
      title="Repertório que se conecta."
    >
      <SkillConnectionMap />
      <div
        aria-label="Mapa acessível de competências e projetos"
        className="skills-grid nexo-skills-map"
        role="group"
      >
        {skillGroups.map((group, index) => {
          const Icon = icons[index % icons.length] ?? BadgeCheck;

          return (
            <details className="skill-card skill-category" key={group.id} open={index === 0}>
              <summary className="skill-heading focusable">
                <Icon size={24} aria-hidden="true" />
                <div>
                  <h3>{group.title}</h3>
                  <p>{group.description}</p>
                </div>
                <span className="skill-category__count">{group.items.length} tecnologias</span>
              </summary>
              {group.items.length > 0 ? (
                <ul className="skill-list">
                  {group.items.map((item) => (
                    <li
                      data-connected={Boolean(selectedProjectSlug && item.projectSlugs?.includes(selectedProjectSlug))}
                      data-selected={selectedSkillName === item.name}
                      key={item.name}
                    >
                      <button
                        aria-pressed={selectedSkillName === item.name}
                        className="nexo-skill-node focusable"
                        onClick={() => selectSkill(item.name)}
                        type="button"
                      >
                        <strong>{item.name}</strong>
                        <small>{item.context}</small>
                        <em>{skillEvidenceLabels[item.evidence]}</em>
                      </button>
                      <noscript><div className="nexo-skill-static"><strong>{item.name}</strong><small>{item.context}</small><em>{skillEvidenceLabels[item.evidence]}</em></div></noscript>
                      {item.projectSlugs?.length ? (
                        <div className="nexo-skill-projects" aria-label={`Projetos relacionados a ${item.name}`}>
                          {item.projectSlugs.map((slug) => {
                            const project = projects.find((entry) => entry.slug === slug);

                            return project ? (
                              <Link
                                className="nexo-skill-project focusable"
                                data-connected={selectedSkillName === item.name || selectedProjectSlug === project.slug}
                                href={`/projetos/${project.slug}/`}
                                key={slug}
                                onNavigate={() => selectProject(project.slug)}
                              >
                                {project.shortTitle}
                              </Link>
                            ) : null;
                          })}
                        </div>
                      ) : null}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="nexo-skill-empty">Sem ferramenta ou experiência verificável publicada nesta área.</p>
              )}
            </details>
          );
        })}
      </div>
    </SectionShell>
  );
}
