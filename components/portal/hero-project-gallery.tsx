"use client";

import { ArrowUpRight, RotateCcw } from "lucide-react";
import Link from "next/link";
import { useRef, type KeyboardEvent, type PointerEvent } from "react";
import { useExperience } from "@/components/experience-provider";
import { heroProjects } from "@/lib/hero-gallery";

export function HeroProjectGallery() {
  const { heroProjectSlug, focusHeroProject, heroGalleryReady, sceneStatus, mode, prefersReducedMotion, motionEnabled } = useExperience();
  const surface = useRef<HTMLDivElement>(null);
  const selection = useRef<HTMLDivElement>(null);
  const current = heroProjects.find((project) => project.slug === heroProjectSlug) ?? heroProjects[0];
  const renderer = heroGalleryReady && sceneStatus === "ready" && mode === "immersive" && !prefersReducedMotion ? "webgl" : "fallback";
  const selectProject = (slug: string) => focusHeroProject(heroProjectSlug === slug ? null : slug);
  const resetGallery = () => {
    const button = selection.current?.querySelector<HTMLButtonElement>('[aria-pressed="true"]');
    focusHeroProject(null);
    button?.focus({ preventScroll: true });
  };
  const handleKeyboard = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape" && heroProjectSlug) {
      event.preventDefault();
      resetGallery();
      return;
    }
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    const buttons = Array.from(event.currentTarget.querySelectorAll("button"));
    const index = buttons.indexOf(event.target as HTMLButtonElement);
    if (index < 0) return;
    const destination = Math.max(0, Math.min(heroProjects.length - 1, index + (event.key === "ArrowRight" ? 1 : -1)));
    event.preventDefault();
    focusHeroProject(heroProjects[destination].slug);
    buttons[destination]?.focus({ preventScroll: true });
  };
  const movePerspective = (event: PointerEvent<HTMLDivElement>) => {
    if (!motionEnabled || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--gallery-look-x", `${((event.clientY - bounds.top) / bounds.height - 0.5) * -3}deg`);
    event.currentTarget.style.setProperty("--gallery-look-y", `${((event.clientX - bounds.left) / bounds.width - 0.5) * 4}deg`);
  };
  const resetPerspective = () => {
    surface.current?.style.setProperty("--gallery-look-x", "0deg");
    surface.current?.style.setProperty("--gallery-look-y", "0deg");
  };

  if (!current) return null;

  return (
    <aside className="hero-gallery" aria-label="Galeria de projetos reais" data-renderer={renderer} data-gallery-focus={heroProjectSlug ?? "overview"} data-horizontal-navigation>
      <div className="hero-gallery__heading">
        <p>Projetos em perspectiva</p>
        <span>{String(heroProjects.length).padStart(2, "0")} trabalhos reais</span>
      </div>
      <div ref={surface} className="hero-gallery__viewport nexo-portal__artwork" data-scene-anchor="portal" onPointerMove={movePerspective} onPointerLeave={resetPerspective} aria-hidden="true">
        <div className="hero-gallery__fallback">
          {heroProjects.map((project, index) => {
            const preview = project.screenshots[0];
            return (
              <div className={`hero-gallery__screen hero-gallery__screen--${index + 1}`} key={project.slug} onClick={() => selectProject(project.slug)} data-selected={heroProjectSlug === project.slug}>
                <span className="hero-gallery__screen-edge" />
                <img src={preview.src} alt="" width={preview.width ?? 1440} height={preview.height ?? 960} loading={index === 0 ? "eager" : "lazy"} fetchPriority={index === 0 ? "high" : "auto"} />
                <span className="hero-gallery__glass" />
              </div>
            );
          })}
        </div>
        <div className="hero-gallery__floor" />
      </div>
      <div ref={selection} className="hero-gallery__selection" role="group" aria-label="Selecionar projeto na abertura" aria-keyshortcuts="ArrowLeft ArrowRight Escape" onKeyDown={handleKeyboard}>
        {heroProjects.map((project) => (
          <button className="hero-gallery__project focusable" type="button" key={project.slug} aria-label={`Selecionar projeto: ${project.shortTitle}`} aria-pressed={heroProjectSlug === project.slug} onClick={() => selectProject(project.slug)}>
            <strong>{project.shortTitle}</strong>
          </button>
        ))}
      </div>
      <div className="hero-gallery__details" aria-live="polite" aria-atomic="true">
        <div>
          <p className="hero-gallery__project-name">{current.shortTitle}</p>
          <p className="hero-gallery__technologies">{current.technologies.slice(0, 4).join(" · ")}</p>
        </div>
        <Link className="hero-gallery__case focusable" href={`/projetos/${current.slug}/`} transitionTypes={["nav-forward"]}>
          Ver estudo de caso <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
      </div>
      <div className="hero-gallery__reset">
        {heroProjectSlug ? <button className="focusable" type="button" onClick={resetGallery}><RotateCcw size={14} aria-hidden="true" />Ver composição completa</button> : <p>Selecione uma tela para aproximar o projeto.</p>}
      </div>
      <noscript><nav aria-label="Estudos de caso da abertura">{heroProjects.map((project) => <a href={`/projetos/${project.slug}/`} key={project.slug}>{project.shortTitle}</a>)}</nav></noscript>
    </aside>
  );
}
