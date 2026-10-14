import { GitBranch, Mail, Network, Send } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { professional } from "@/lib/data";

export function ContactSection() {
  return (
    <section className="section contact-section" data-section id="contato">
      <div className="container">
        <Reveal className="contact-band">
          <div>
            <p className="eyebrow">Contato</p>
            <h2>Vamos conversar sobre tecnologia, projetos e oportunidades.</h2>
            <p>
              Para uma conversa profissional, o e-mail é o contato mais direto. GitHub e LinkedIn são os perfis informados
              por Letícia; os links não enviam dados pelo portfólio.
            </p>
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
