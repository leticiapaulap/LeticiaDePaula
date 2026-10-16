import { GitBranch, Mail, Network, Send } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { professional } from "@/lib/data";
import { SceneAccent } from "@/components/scene-accent";

export function ContactSection() {
  return (
    <section className="section contact-section" data-section id="contato">
      <div className="container">
        <Reveal className="contact-band">
          <div>
            <p className="eyebrow">Contato</p>
            <h2>Vamos conversar sobre tecnologia, projetos e oportunidades.</h2>
            <p>
              Tem uma oportunidade, um projeto ou uma boa ideia para compartilhar? Vamos conversar. Você também encontra meu trabalho no GitHub e minha trajetória no LinkedIn.
            </p>
            <SceneAccent phase="convergence" className="contact-scene" />
          </div>

          <aside className="contact-panel" aria-label="Informações de contato">
            <a href={`mailto:${professional.email}`}>{professional.email}</a>
            <span>{professional.location}</span>
            <div className="contact-actions">
              <a className="primary-action focusable" href={`mailto:${professional.email}`}>
                <Send size={17} />
                Enviar e-mail
              </a>
            </div>
            <div className="contact-socials">
              <a className="focusable" href={professional.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                <GitBranch size={18} />
              </a>
              <a
                className="focusable"
                href={professional.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <Network size={18} />
              </a>
              <a className="focusable" href={`mailto:${professional.email}`} aria-label="E-mail">
                <Mail size={18} />
              </a>
            </div>
          </aside>
        </Reveal>
      </div>
    </section>
  );
}
