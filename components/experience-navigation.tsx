"use client";

import { ArrowLeft, ArrowRight, Layers3 } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useExperience } from "@/components/experience-provider";
import { chapters, chapterForPath } from "@/lib/chapters";

const internalControls = "a, button, input, select, textarea, summary, iframe, video, audio, [contenteditable], [role=slider], [role=dialog], [role=tablist], [data-horizontal-navigation], [data-chapter-gestures=off], .nexo-gallery-stage, .nexo-career-navigation, .filter-bar, .filter-group";

function isInternalControl(target: EventTarget | null) {
  return target instanceof Element && Boolean(target.closest(internalControls));
}

function hasOpenDialog() {
  return Boolean(document.querySelector('[role="dialog"][data-state="open"]'));
}

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
  const current = chapterForPath(pathname);
  const currentIndex = current ? chapters.indexOf(current) : -1;
  const previous = chapters[currentIndex - 1];
  const next = chapters[currentIndex + 1] ?? chapters[0];
  const returnsToStart = currentIndex === chapters.length - 1;
  const previousPath = useRef(pathname);

  useEffect(() => {
    if (previousPath.current === pathname) return;
    previousPath.current = pathname;
    const frame = window.requestAnimationFrame(() => {
      const heading = document.querySelector<HTMLElement>("main h1");
      if (!heading) return;
      heading.tabIndex = -1;
      heading.focus({ preventScroll: true });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  useEffect(() => {
    if (!current) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.repeat || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || isInternalControl(event.target) || hasOpenDialog() || !window.getSelection()?.isCollapsed) return;
      if (event.key === "ArrowLeft" && previous) {
        event.preventDefault();
        transitionTo(previous.phase);
        router.push(previous.href, { scroll: true, transitionTypes: ["nav-back"] });
      } else if (event.key === "ArrowRight" && next) {
        event.preventDefault();
        transitionTo(next.phase);
        router.push(next.href, { scroll: true, transitionTypes: [returnsToStart ? "nav-back" : "nav-forward"] });
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [current, next, previous, returnsToStart, router, transitionTo]);

  useEffect(() => {
    if (!current) return;
    const surface = document.querySelector("main");
    if (!surface) return;
    let start: { horizontal: number; vertical: number; timestamp: number } | null = null;
    const onTouchStart = (event: TouchEvent) => {
      start = null;
      if (window.innerWidth > 767 || event.touches.length !== 1 || isInternalControl(event.target) || hasOpenDialog()) return;
      const touch = event.touches[0];
      if (!touch || touch.clientX < 32 || touch.clientX > window.innerWidth - 32) return;
      start = { horizontal: touch.clientX, vertical: touch.clientY, timestamp: performance.now() };
    };
    const cancelTouch = () => { start = null; };
    const onTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (event.touches.length !== 1 || (start && touch && Math.abs(touch.clientY - start.vertical) > 40)) cancelTouch();
    };
    const onTouchEnd = (event: TouchEvent) => {
      const initial = start;
      start = null;
      const touch = event.changedTouches[0];
      if (!initial || !touch || event.touches.length || hasOpenDialog() || performance.now() - initial.timestamp > 800) return;
      const deltaX = touch.clientX - initial.horizontal;
      const deltaY = touch.clientY - initial.vertical;
      if (Math.abs(deltaX) < 80 || Math.abs(deltaY) > 40 || Math.abs(deltaX) < Math.abs(deltaY) * 2) return;
      const destination = deltaX < 0 ? next : previous;
      if (!destination) return;
      transitionTo(destination.phase);
      router.push(destination.href, { scroll: true, transitionTypes: [deltaX < 0 && !returnsToStart ? "nav-forward" : "nav-back"] });
    };
    surface.addEventListener("touchstart", onTouchStart, { passive: true });
    surface.addEventListener("touchmove", onTouchMove, { passive: true });
    surface.addEventListener("touchend", onTouchEnd, { passive: true });
    surface.addEventListener("touchcancel", cancelTouch, { passive: true });
    return () => {
      surface.removeEventListener("touchstart", onTouchStart);
      surface.removeEventListener("touchmove", onTouchMove);
      surface.removeEventListener("touchend", onTouchEnd);
      surface.removeEventListener("touchcancel", cancelTouch);
    };
  }, [current, next, previous, returnsToStart, router, transitionTo]);

  if (!current) return null;

  return (
    <nav className="chapter-navigation" aria-label="Navegação entre capítulos" aria-keyshortcuts="ArrowLeft ArrowRight" data-chapter={current.phase}>
      <progress className="chapter-navigation__progress" max={chapters.length} value={currentIndex + 1} aria-label={`Progresso: capítulo ${currentIndex + 1} de ${chapters.length}`} />
      <div className="chapter-navigation__inner">
      <div className="chapter-navigation__status" aria-live="polite" aria-atomic="true">
        <span>{current.number}</span>
        <span aria-hidden="true">—</span>
        <strong>{current.label}</strong>
        <span className="nexo-visually-hidden">Capítulo {currentIndex + 1} de {chapters.length}</span>
      </div>
      <div className="chapter-navigation__actions">
        {previous ? <Link className="chapter-navigation__arrow chapter-navigation__previous focusable" href={previous.href} transitionTypes={["nav-back"]} onNavigate={() => transitionTo(previous.phase)} aria-label={`Capítulo anterior: ${previous.label}`}>
          <ArrowLeft size={16} aria-hidden="true" /><span>Anterior</span>
        </Link> : null}
        <Link className="chapter-navigation__arrow chapter-navigation__next focusable" href={next.href} transitionTypes={[returnsToStart ? "nav-back" : "nav-forward"]} onNavigate={() => transitionTo(next.phase)} aria-label={returnsToStart ? "Voltar ao início: Apresentação" : `Próximo capítulo: ${next.label}`}>
          <span>{returnsToStart ? "Voltar ao início" : next.label}</span>
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
      </div>
    </nav>
  );
}
