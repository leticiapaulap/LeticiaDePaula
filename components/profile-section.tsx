import { Reveal } from "@/components/reveal";
import { SectionShell } from "@/components/section-shell";
import { professional } from "@/lib/data";

export function ProfileSection() {
  return (
    <SectionShell
      description="Uma apresentação objetiva para recrutadores: trajetória, repertório técnico e forma de resolver problemas sem exagerar títulos ou criar promessas que não possam ser comprovadas."
      eyebrow="Sobre"
      id="sobre"
      title="Tecnologia com leitura prática do negócio."
    >
      <div className="profile-grid">
        <Reveal className="editorial-copy">
          {professional.about.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Reveal>

        <Reveal className="workflow-list" delay={0.08}>
          {professional.principles.map((item) => (
            <article className="workflow-item" key={item.title}>
              <strong>{item.title}</strong>
              <span>{item.description}</span>
            </article>
          ))}
        </Reveal>
      </div>
    </SectionShell>
  );
}
