"use client";

import { ArrowRight, GitBranch, Mail, Network } from "lucide-react";
import Link from "next/link";
import { useExperience } from "@/components/experience-provider";
import { HeroProjectGallery } from "@/components/portal/hero-project-gallery";
import { professional } from "@/lib/profile";

export function PortalHero() {
  const { transitionTo, phase } = useExperience();

  return (
    <section className="nexo-portal" id="portal" aria-labelledby="portal-title" data-experience-state={phase}>
      <div className="nexo-portal__content">
        <div className="nexo-portal__copy">
          <p className="nexo-portal__eyebrow">
            <span className="nexo-status-dot" aria-hidden="true" />
            Desenvolvimento web · Dados · Automação
          </p>

          <h1 id="portal-title" className="nexo-portal__title" tabIndex={-1}>
            Letícia
            <br />
            <span>de Paula</span>
          </h1>

          <p className="nexo-portal__statement">
            Tecnologia com propósito.<br />Experiências com cuidado.
          </p>
          <p className="nexo-portal__introduction">
            Crio interfaces e aplicações que conectam pessoas, dados e ideias. Conheça meus projetos e os caminhos que fazem parte da minha trajetória.
          </p>

          <div className="nexo-portal__actions">
            <Link
              className="nexo-button nexo-button--primary focusable"
              href="/projetos/"
              transitionTypes={["nav-forward"]}
              onNavigate={() => transitionTo("projects")}
            >
              Conhecer projetos
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <Link
              className="nexo-button nexo-button--quiet focusable"
              href="/sobre/"
              transitionTypes={["nav-forward"]}
              onNavigate={() => transitionTo("nucleus")}
            >
              Explorar trajetória <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>

          <nav className="nexo-socials" aria-label="Perfis e contato">
            <a href={professional.github} aria-label="GitHub de Letícia" target="_blank" rel="noreferrer">
              <GitBranch size={18} aria-hidden="true" />
            </a>
            <a href={professional.linkedin} aria-label="LinkedIn de Letícia" target="_blank" rel="noreferrer">
              <Network size={18} aria-hidden="true" />
            </a>
            <a href={`mailto:${professional.email}`} aria-label={`Enviar e-mail para ${professional.name}`}>
              <Mail size={18} aria-hidden="true" />
            </a>
            <span>{professional.title}</span>
          </nav>
        </div>

        <HeroProjectGallery />
      </div>

    </section>
  );
}
