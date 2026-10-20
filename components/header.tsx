"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Menu, Pause, Play, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { useExperience } from "@/components/experience-provider";
import { ModeControl } from "@/components/experience-navigation";
import { chapters, chapterForPath, chapterTransitionType } from "@/lib/chapters";
import { ThemeToggle } from "@/components/theme-toggle";
import { professional } from "@/lib/data";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const navigating = useRef(false);
  const current = chapterForPath(pathname);
  const { motionEnabled, prefersReducedMotion, toggleMotion } = useExperience();
  const closeForNavigation = (destination: string) => {
    navigating.current = pathname.replace(/\/$/, "") !== destination.replace(/\/$/, "");
    setOpen(false);
  };

  return (
    <header className="nexo-header">
      <div className="nexo-header__inner">
        <Link className="nexo-brand personal-brand focusable" href="/" transitionTypes={["nav-back"]}>
          <span className="nexo-brand__wordmark">
            <strong>Letícia <em>de Paula</em></strong>
          </span>
        </Link>

        <div className="nexo-header__actions">
          <Link className="nexo-resume-link focusable" href="/curriculo/">Currículo</Link>
          <ThemeToggle />
          <button
            aria-label={
              prefersReducedMotion
                ? "Animações reduzidas pela preferência do dispositivo"
                : motionEnabled
                  ? "Pausar animações"
                  : "Retomar animações"
            }
            aria-pressed={!motionEnabled || prefersReducedMotion}
            className="nexo-icon-button nexo-motion-toggle focusable"
            disabled={prefersReducedMotion}
            onClick={toggleMotion}
            title={prefersReducedMotion ? "Animações reduzidas pela preferência do dispositivo" : undefined}
            type="button"
          >
            {motionEnabled && !prefersReducedMotion ? (
              <Pause size={16} aria-hidden="true" />
            ) : (
              <Play size={16} aria-hidden="true" />
            )}
          </button>
          <ModeControl className="nexo-mode-desktop" />

          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
              <button
                className="nexo-menu-trigger nexo-menu-trigger--all focusable"
                type="button"
                aria-label={open ? "Fechar menu de capítulos" : "Abrir menu de capítulos"}
                aria-expanded={open}
              >
                <Menu size={19} aria-hidden="true" />
                <span>Capítulos</span>
              </button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="nexo-menu-overlay" />
              <Dialog.Content className="nexo-menu-panel" onCloseAutoFocus={(event) => {
                if (navigating.current) {
                  event.preventDefault();
                  navigating.current = false;
                }
              }}>
                <div className="nexo-menu-panel__heading">
                  <Dialog.Title className="nexo-menu-panel__title">Navegar</Dialog.Title>
                  <Dialog.Description className="nexo-visually-hidden">
                    Sete capítulos, no seu ritmo. Escolha por onde começar. Use as setas esquerda e direita fora dos controles para avançar ou voltar.
                  </Dialog.Description>
                  <Dialog.Close asChild>
                    <button className="nexo-menu-close focusable" type="button" aria-label="Fechar menu">
                      <X size={18} aria-hidden="true" />
                    </button>
                  </Dialog.Close>
                </div>

                <nav className="nexo-mobile-nav" aria-label="Navegação compacta">
                  {chapters.map((chapter) => (
                      <Link
                        aria-current={current?.phase === chapter.phase ? "page" : undefined}
                        href={chapter.href}
                        transitionTypes={[chapterTransitionType(pathname, chapter.href)]}
                        key={chapter.phase}
                        onNavigate={() => closeForNavigation(chapter.href)}
                      >
                        <span className="chapter-menu-number" aria-hidden="true">{chapter.number}</span>
                        {chapter.label}
                      </Link>
                    ))}
                  <Link
                    href="/curriculo/"
                    onNavigate={() => closeForNavigation("/curriculo/")}
                  >
                    Currículo digital
                  </Link>
                </nav>

                <ModeControl />
                <button
                  aria-pressed={!motionEnabled || prefersReducedMotion}
                  className="nexo-motion-menu-control focusable"
                  disabled={prefersReducedMotion}
                  onClick={toggleMotion}
                  type="button"
                >
                  {motionEnabled && !prefersReducedMotion ? (
                    <Pause size={16} aria-hidden="true" />
                  ) : (
                    <Play size={16} aria-hidden="true" />
                  )}
                  {prefersReducedMotion
                    ? "Animações reduzidas pelo dispositivo"
                    : motionEnabled
                      ? "Pausar animações"
                      : "Retomar animações"}
                </button>
                <p className="nexo-menu-panel__note">{professional.title}</p>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </header>
  );
}
