"use client";

import { ArrowUpRight, CornerDownLeft } from "lucide-react";
import Link from "next/link";
import { useExperience } from "@/components/experience-provider";
import { portalRooms } from "@/lib/portal";
import { phaseForSection } from "@/lib/experience-state";
import { SceneAccent } from "@/components/scene-accent";

export function ExplorationRoom() {
  const { transitionTo, setMode } = useExperience();

  return (
    <section className="nexo-exploration" id="exploracao" aria-labelledby="exploration-title">
      <div className="nexo-exploration__frame">
        <p className="nexo-exploration__eyebrow">
          <span>02</span> / TRAJETÓRIA
        </p>
        <div className="nexo-exploration__heading">
          <h2 id="exploration-title">
            Cada conexão
            <br />
            <em>abre um caminho.</em>
          </h2>
          <p>
            Projetos, experiências e aprendizados se encontram aqui. Escolha por onde começar.
          </p>
        </div>

        <nav className="nexo-rooms" aria-label="Áreas de exploração do portfólio">
          {portalRooms.map((room) => (
            <a
              className="nexo-room focusable"
              href={room.href}
              key={room.number}
              onClick={() => transitionTo(phaseForSection(room.href.slice(1)) ?? "nucleus")}
            >
              <span className="nexo-room__number">{room.number}</span>
              <span className="nexo-room__body">
                <span className="nexo-room__label">{room.section} / ÁREA</span>
                <strong>{room.name}</strong>
                <span className="nexo-room__description">{room.description}</span>
              </span>
              <ArrowUpRight className="nexo-room__arrow" size={19} aria-hidden="true" />
            </a>
          ))}
        </nav>

        <div className="exploration-scene-row"><SceneAccent phase="nucleus" /></div>
        <div className="nexo-exploration__footer">
          <a className="nexo-return-link focusable" href="#portal" onClick={() => transitionTo("portal")}>
            <CornerDownLeft size={15} aria-hidden="true" />
            Voltar ao portal
          </a>
          <a
            className="nexo-exploration__direct focusable"
            href="#portfolio"
            onClick={() => { setMode("direct"); transitionTo("nucleus"); }}
          >
            Ler portfólio completo <ArrowUpRight size={15} aria-hidden="true" />
          </a>
          <Link
            className="nexo-exploration__direct focusable"
            href="/contato/"
            onClick={() => transitionTo("convergence")}
          >
            Vamos conversar <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
