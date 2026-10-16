"use client";

import { ArrowLeft, ArrowRight, Compass, Layers3 } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useExperience } from "@/components/experience-provider";
import { phaseForRoute, type ExperiencePhase } from "@/lib/experience-state";

const chapters: { phase: ExperiencePhase; number: string; label: string; href: string }[] = [
  { phase: "portal", number: "01", label: "Apresentação", href: "/" },
  { phase: "nucleus", number: "02", label: "Sobre mim", href: "/sobre/" },
  { phase: "projects", number: "03", label: "Projetos", href: "/projetos/" },
  { phase: "experience", number: "04", label: "Experiências profissionais", href: "/experiencia/" },
  { phase: "competencies", number: "05", label: "Competências", href: "/competencias/" },
  { phase: "education", number: "06", label: "Formação e certificações", href: "/formacao/" },
  { phase: "convergence", number: "07", label: "Contato", href: "/contato/" }
];

export function ModeControl({ className = "" }: { className?: string }) {
  const { mode, setMode, requestScene } = useExperience();
  return (
    <button className={`nexo-mode-control focusable ${className}`} type="button" title={mode === "immersive" ? "Ler sem o renderizador 3D" : "Acompanhar a trajetória com perspectivas e transições 3D"} aria-label={mode === "immersive" ? "Ativar modo direto" : "Ativar modo imersivo"} onClick={() => {
      if (mode === "direct") requestScene();
      setMode(mode === "immersive" ? "direct" : "immersive");
    }}>
      <Layers3 size={16} aria-hidden="true" />
      {mode === "immersive" ? "Modo direto" : "Modo imersivo"}
    </button>
  );
}

export function ModeLabel() {
  const { mode } = useExperience();
  return <p className="nexo-direct__eyebrow">{mode === "direct" ? "PORTFÓLIO / LEITURA DIRETA" : "PORTFÓLIO / EM PERSPECTIVA"}</p>;
}

export function ChapterNavigation() {
  const pathname = usePathname();
  const router = useRouter();
  const { transitionTo } = useExperience();
  const currentPhase = phaseForRoute(pathname);
  const index = chapters.findIndex((chapter) => chapter.phase === currentPhase);
  const currentIndex = Math.max(0, index);
  const current = chapters[currentIndex]!;
  const previous = chapters[currentIndex - 1];
  const next = chapters[currentIndex + 1];
  const previousPath = useRef(pathname);

  useEffect(() => {
    if (previousPath.current === pathname) return;
    previousPath.current = pathname;
    document.querySelector<HTMLElement>("#chapter-title")?.focus({ preventScroll: true });
  }, [pathname]);

  useEffect(() => {
    const isInteractive = (target: EventTarget | null) => target instanceof HTMLElement && (
      target.isContentEditable ||
      Boolean(target.closest("a, button, input, select, textarea, summary, [role=slider], [role=dialog], [data-horizontal-navigation], .nexo-gallery-stage, .nexo-career-navigation, .filter-bar, .filter-group"))
    );
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || isInteractive(event.target)) return;
      if (event.key === "ArrowLeft" && previous) {
        event.preventDefault();
        transitionTo(previous.phase);
        router.push(previous.href, { scroll: true, transitionTypes: ["nav-back"] });
      } else if (event.key === "ArrowRight" && next) {
        event.preventDefault();
        transitionTo(next.phase);
        router.push(next.href, { scroll: true, transitionTypes: ["nav-forward"] });
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [next, previous, router, transitionTo]);

  useEffect(() => {
    let start: { x: number; y: number; target: EventTarget | null } | null = null;
    const onTouchStart = (event: TouchEvent) => {
      if (window.innerWidth > 767 || event.touches.length !== 1) return;
      const touch = event.touches[0];
      if (!touch || touch.clientX < 24 || touch.clientX > window.innerWidth - 24) return;
      start = { x: touch.clientX, y: touch.clientY, target: event.target };
    };
    const onTouchEnd = (event: TouchEvent) => {
      const initial = start;
      start = null;
      const touch = event.changedTouches[0];
      if (!initial || !touch || isInteractive(initial.target)) return;
      const deltaX = touch.clientX - initial.x;
      const deltaY = touch.clientY - initial.y;
      if (Math.abs(deltaX) < 80 || Math.abs(deltaY) > 60) return;
      const destination = deltaX < 0 ? next : previous;
      if (!destination) return;
      transitionTo(destination.phase);
      router.push(destination.href, { scroll: true, transitionTypes: [deltaX < 0 ? "nav-forward" : "nav-back"] });
    };
    const isInteractive = (target: EventTarget | null) => target instanceof HTMLElement && (
      target.isContentEditable ||
      Boolean(target.closest("a, button, input, select, textarea, summary, [role=slider], [role=dialog], [data-horizontal-navigation], .nexo-gallery-stage, .nexo-career-navigation, .filter-bar, .filter-group"))
    );
    document.addEventListener("touchstart", onTouchStart, { passive: true });
    document.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      document.removeEventListener("touchstart", onTouchStart);
      document.removeEventListener("touchend", onTouchEnd);
    };
  }, [next, previous, router, transitionTo]);

  return (
    <nav className="chapter-navigation" aria-label="Navegação entre capítulos" data-chapter={current.phase}>
      <progress className="chapter-navigation__progress" max={chapters.length} value={currentIndex + 1} aria-label={`Progresso: capítulo ${currentIndex + 1} de ${chapters.length}`} />
      {previous ? (
        <Link className="chapter-navigation__arrow focusable" href={previous.href} transitionTypes={["nav-back"]} onNavigate={() => transitionTo(previous.phase)} aria-label={`Capítulo anterior: ${previous.label}`}>
          <ArrowLeft size={18} aria-hidden="true" />
        </Link>
      ) : <span className="chapter-navigation__arrow chapter-navigation__arrow--disabled" aria-hidden="true"><ArrowLeft size={18} /></span>}
      <div className="chapter-navigation__status" aria-live="polite" aria-atomic="true">
        <span>{current.number} / 07</span>
        <strong>{current.label}</strong>
      </div>
      <label className="chapter-navigation__menu">
        <Compass size={16} aria-hidden="true" />
        <span className="nexo-visually-hidden">Ir diretamente a um capítulo</span>
        <select aria-label="Ir diretamente a um capítulo" value={current.phase} onChange={(event) => {
          const destination = chapters.find((chapter) => chapter.phase === event.target.value);
          if (!destination) return;
          transitionTo(destination.phase);
          router.push(destination.href, { transitionTypes: [chapters.indexOf(destination) > currentIndex ? "nav-forward" : "nav-back"] });
        }}>
          {chapters.map((chapter) => <option key={chapter.phase} value={chapter.phase}>{chapter.number} / {chapter.label}</option>)}
        </select>
      </label>
      {next ? (
        <Link className="chapter-navigation__arrow focusable" href={next.href} transitionTypes={["nav-forward"]} onNavigate={() => transitionTo(next.phase)} aria-label={`Próximo capítulo: ${next.label}`}>
          <ArrowRight size={18} aria-hidden="true" />
        </Link>
      ) : <span className="chapter-navigation__arrow chapter-navigation__arrow--disabled" aria-hidden="true"><ArrowRight size={18} /></span>}
    </nav>
  );
}
