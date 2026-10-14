import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

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
    <section className={cn("section", alt && "alt")} data-section id={id}>
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
