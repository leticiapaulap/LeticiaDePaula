import { ArrowUpRight, GitBranch, Mail, MapPin, Network } from "lucide-react";
import Link from "next/link";
import { professional } from "@/lib/data";

export function ContactSection() {
  return (
    <section className="section contact-section editorial-contact" data-section id="contato" aria-label="Canais de contato">
      <div className="container">
        <div className="contact-band">
          <div className="editorial-contact__invitation">
            <h2>Tecnologia, projetos<br />e novas possibilidades.</h2>
            <p>Tem uma oportunidade ou uma ideia para compartilhar? Escreva para mim. Vamos conversar sobre o que podemos construir.</p>
            <span className="editorial-contact__location"><MapPin size={16} aria-hidden="true" />{professional.location}</span>
          </div>
          <div className="contact-panel">
            <a className="editorial-contact__email focusable" href={`mailto:${professional.email}`}>
              <span><Mail size={17} aria-hidden="true" />Enviar e-mail</span>
              <strong>{professional.email}</strong>
              <ArrowUpRight size={22} aria-hidden="true" />
            </a>
            <div className="contact-socials" aria-label="Perfis profissionais">
              <a className="focusable" href={professional.github} target="_blank" rel="noreferrer"><GitBranch size={18} aria-hidden="true" /><span>GitHub</span><ArrowUpRight size={16} aria-hidden="true" /></a>
              <a className="focusable" href={professional.linkedin} target="_blank" rel="noreferrer"><Network size={18} aria-hidden="true" /><span>LinkedIn</span><ArrowUpRight size={16} aria-hidden="true" /></a>
            </div>
            <div className="contact-actions">
              <Link className="text-action focusable" href="/curriculo/">Currículo digital<ArrowUpRight size={16} aria-hidden="true" /></Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
