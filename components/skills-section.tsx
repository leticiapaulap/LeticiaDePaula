import { BadgeCheck, ChartNoAxesCombined, ClipboardList, Code2, Database, Server, Wrench } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { SectionShell } from "@/components/section-shell";
import { projects, skillEvidenceLabels, skillGroups } from "@/lib/data";

const icons = [Code2, Server, Database, ChartNoAxesCombined, Wrench, ClipboardList];

export function SkillsSection() {
  return (
    <SectionShell
      alt
      description="Cada tecnologia listada aponta para código ou documentação dos projetos. Conhecimentos profissionais sem evidência pública não são presumidos."
      eyebrow="Competências"
      id="competencias"
      title="Repertório técnico organizado por contexto de uso."
    >
      <div className="skills-grid">
        {skillGroups.map((group, index) => {
          const Icon = icons[index % icons.length] ?? BadgeCheck;

          return (
            <Reveal className="skill-card" delay={index * 0.04} key={group.id}>
              <div className="skill-heading">
                <Icon size={24} aria-hidden="true" />
                <div>
                  <h3>{group.title}</h3>
                  <p>{group.description}</p>
                </div>
              </div>
              {group.items.length > 0 ? (
                <ul className="skill-list">
                  {group.items.map((item) => (
                    <li key={item.name}>
                      <span>
                        <strong>{item.name}</strong>
                        <small>{item.context}</small>
                        {item.projectSlugs?.length ? (
                          <span className="nexo-skill-projects" aria-label="Projetos com evidência para a tecnologia">
                            {item.projectSlugs.map((slug) => {
                              const project = projects.find((entry) => entry.slug === slug);

                              return project ? (
                                <Link
                                  className="nexo-skill-project focusable"
                                  href={`/projetos/${project.slug}/`}
                                  key={slug}
                                >
                                  {project.shortTitle}
                                </Link>
                              ) : null;
                            })}
                          </span>
                        ) : null}
                      </span>
                      <em>{skillEvidenceLabels[item.evidence]}</em>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="nexo-skill-empty">Sem ferramenta ou experiência verificável publicada nesta área.</p>
              )}
            </Reveal>
          );
        })}
      </div>
    </SectionShell>
  );
}
