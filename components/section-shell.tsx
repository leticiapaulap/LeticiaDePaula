import { Reveal } from "@/components/reveal";
import { SceneAccent } from "@/components/scene-accent";
import { phaseForSection } from "@/lib/experience-state";

export function SectionShell({
  id,
  eyebrow,
  title,
  description,
  children,
  alt = false
}: {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
  alt?: boolean;
}) {
  return (
    <section className={alt ? "section alt" : "section"} data-section id={id}>
      <div className="container">
        <Reveal className="section-heading">
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h2>{title}</h2>
          </div>
          <p>{description}</p>
          <SceneAccent phase={phaseForSection(id) ?? "nucleus"} className="section-scene" />
        </Reveal>
        {children}
      </div>
    </section>
  );
}
