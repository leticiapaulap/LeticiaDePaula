import { Reveal } from "@/components/reveal";

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
        </Reveal>
        {children}
      </div>
    </section>
  );
}
