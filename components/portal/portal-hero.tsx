"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { HeroPortrait } from "@/components/portal/hero-portrait";
import { useExperience } from "@/components/experience-provider";
import { professional } from "@/lib/profile";

export function PortalHero() {
  const { transitionTo, phase } = useExperience();

  return (
    <section className="nexo-portal editorial-intro personal-opening" id="portal" aria-labelledby="portal-title" data-experience-state={phase}>
      <div className="editorial-intro__edition"><span>Portfólio profissional</span><span>{professional.location}</span></div>
      <div className="nexo-portal__content">
        <div className="nexo-portal__copy">
          <div className="hero-identity">
            <p className="nexo-portal__eyebrow">
              Desenvolvimento web · Dados · Automação
            </p>

            <h1 id="portal-title" className="nexo-portal__title" tabIndex={-1}>
              Letícia
              <br />
              <span>de Paula</span>
            </h1>
          </div>

          <div className="hero-details">
            <p className="personal-opening__positioning">
              Desenvolvo <em>aplicações web e automações</em> para organizar processos, simplificar tarefas e transformar informações em soluções práticas.
            </p>
            <p className="nexo-portal__introduction">
              Minha experiência reúne desenvolvimento de sistemas, análise de dados geoespaciais e suporte a processos digitais.
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
              <Link className="editorial-text-link focusable" href="/sobre/" transitionTypes={["nav-forward"]}>
                Minha trajetória <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>

        <HeroPortrait />
      </div>
      <p className="editorial-intro__colophon">Análise e Desenvolvimento de Sistemas <span aria-hidden="true">/</span> UDF</p>
    </section>
  );
}
