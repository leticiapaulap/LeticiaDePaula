import { BadgeCheck, ChartNoAxesCombined, Code2, Database, Headphones, Rocket } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionShell } from "@/components/section-shell";
import { skillGroups } from "@/lib/data";

const icons = [Code2, Database, ChartNoAxesCombined, Headphones, BadgeCheck, Rocket];

export function SkillsSection() {
  return (
    <SectionShell
      id="competencias"
      eyebrow="Competencias"
      title="Um repertorio tecnico equilibrado para criar, apoiar e evoluir."
      description="A combinacao de frontend, dados, automacao e suporte cria uma base versatil para times que precisam de execucao tecnica e boa leitura de contexto."
      alt
    >
      <div className="skills-grid">
        {skillGroups.map((group, index) => {
          const Icon = icons[index] ?? BadgeCheck;

          return (
            <Reveal className="skill-card" delay={index * 0.04} key={group.title}>
              <Icon size={24} aria-hidden="true" />
              <h3>{group.title}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Reveal>
          );
        })}
      </div>
    </SectionShell>
  );
}
