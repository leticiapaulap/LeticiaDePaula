"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Menu, Pause, Play, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useExperience } from "@/components/experience-provider";
import { ModeControl } from "@/components/experience-navigation";
import { phaseForSection } from "@/lib/experience-state";
import { ThemeToggle } from "@/components/theme-toggle";
import { navItems, professional } from "@/lib/data";

const portalLinks = [
  { label: "Início", href: "/#portal", path: "/" },
  { label: "Sobre", href: "/sobre/", path: "/sobre/" },
  { label: "Projetos", href: "/projetos/", path: "/projetos/" },
  { label: "Contato", href: "/contato/", path: "/contato/" }
] as const;

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { motionEnabled, prefersReducedMotion, toggleMotion, transitionTo, activeSection } = useExperience();
  const isActivePath = (path: string) =>
    pathname === path || (path === "/projetos/" && pathname.startsWith("/projetos/"));
  const handlePortalNavigation = (href: string) => {
    if (href.includes("#")) transitionTo(href.includes("exploracao") ? "nucleus" : "portal");
  };
  const handleSectionNavigation = (id: string) => {
    transitionTo(phaseForSection(id) ?? (id === "inicio" ? "portal" : "nucleus"));
  };

  return (
    <header className="nexo-header">
      <div className="nexo-header__inner">
        <Link className="nexo-brand personal-brand focusable" href="/#portal" prefetch={false} onClick={() => transitionTo("portal")}>
          <span className="nexo-brand__wordmark">
            <strong>Letícia <em>de Paula</em></strong>
          </span>
        </Link>

        <nav className="nexo-desktop-nav" aria-label="Navegação principal">
          {portalLinks.map((link) => (
            <Link
              aria-current={link.href.includes("#") ? pathname === "/" && activeSection === link.href.split("#")[1] ? "location" : undefined : isActivePath(link.path) ? "page" : undefined}
              className="nexo-nav-link focusable"
              href={link.href}
              key={link.href}
              onClick={() => handlePortalNavigation(link.href)}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="nexo-header__actions">
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
                aria-label={open ? "Fechar menu" : "Abrir menu"}
                aria-expanded={open}
              >
                <Menu size={19} aria-hidden="true" />
              </button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="nexo-menu-overlay" />
              <Dialog.Content className="nexo-menu-panel">
                <div className="nexo-menu-panel__heading">
                  <Dialog.Title className="nexo-menu-panel__title">Navegar</Dialog.Title>
                  <Dialog.Description className="nexo-visually-hidden">
                    Acesse diretamente cada página profissional ou retorne à experiência inicial.
                  </Dialog.Description>
                  <Dialog.Close asChild>
                    <button className="nexo-menu-close focusable" type="button" aria-label="Fechar menu">
                      <X size={18} aria-hidden="true" />
                    </button>
                  </Dialog.Close>
                </div>

                <nav className="nexo-mobile-nav" aria-label="Navegação compacta">
                  <Link
                    href="/#portal"
                    onClick={() => {
                      setOpen(false);
                      handlePortalNavigation("/#portal");
                    }}
                  >
                    Início
                  </Link>
                  {navItems
                    .filter((item) => item.id !== "inicio")
                    .map((item) => (
                      <Link
                        aria-current={
                          item.id !== "certificacoes" && isActivePath(item.path) ? "page" : undefined
                        }
                        href={item.href}
                        key={item.id}
                        onClick={() => {
                          setOpen(false);
                          handleSectionNavigation(item.id);
                        }}
                      >
                        {item.label}
                      </Link>
                    ))}
                  <Link
                    href="/curriculo/"
                    onClick={() => {
                      setOpen(false);
                      transitionTo("convergence");
                    }}
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
