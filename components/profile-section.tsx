import { Reveal } from "@/components/reveal";
import { SectionShell } from "@/components/section-shell";
import { professional } from "@/lib/data";
import { ProfessionalPortrait } from "@/components/professional-portrait";
import { portrait } from "@/lib/portrait";

export function ProfileSection() {
  return (
    <SectionShell
      description="Desenvolvimento, dados e aprendizado contínuo. Um pouco de quem sou e de como penso as soluções que construo."
      eyebrow="Sobre"
      id="sobre"
      title="Tecnologia com leitura prática do negócio."
    >
      <div className={`profile-grid${portrait ? " profile-grid--portrait" : ""}`}>
        {portrait ? <ProfessionalPortrait portrait={portrait} /> : null}
        <Reveal className="editorial-copy">
          {professional.about.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Reveal>

        <Reveal className="workflow-list">
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
