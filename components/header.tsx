"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { navItems, professional } from "@/lib/data";

const portalLinks = [
  { label: "Portal", href: "/#portal", path: "/" },
  { label: "Exploração", href: "/#exploracao", path: "/" },
  { label: "Sobre", href: "/sobre/", path: "/sobre/" },
  { label: "Projetos", href: "/projetos/", path: "/projetos/" }
] as const;

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isActivePath = (path: string) =>
    pathname === path || (path === "/projetos/" && pathname.startsWith("/projetos/"));

  return (
    <header className="nexo-header">
      <div className="nexo-header__inner">
        <a className="nexo-brand focusable" href="/#portal" aria-label="NEXO, início do portfólio de Letícia de Paula">
          <span className="nexo-brand__symbol" aria-hidden="true">
            <svg viewBox="0 0 34 34" fill="none">
              <path d="M6 26V8l22 18V8" />
              <circle cx="17" cy="17" r="15" />
            </svg>
          </span>
          <span className="nexo-brand__wordmark">
            <strong>NEXO</strong>
            <span>Letícia de Paula</span>
          </span>
        </a>

        <nav className="nexo-desktop-nav" aria-label="Navegação principal">
          {portalLinks.map((link) => (
            <a
              aria-current={isActivePath(link.path) ? "page" : undefined}
              className="nexo-nav-link focusable"
              href={link.href}
              key={link.href}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="nexo-header__actions">
          <ThemeToggle />
          <a className="nexo-direct-link focusable" href="/#portfolio">
            Modo direto
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>

          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
              <button
                className="nexo-menu-trigger focusable"
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
                  <a href="/#portal" onClick={() => setOpen(false)}>
                    Portal
                  </a>
                  <a href="/#exploracao" onClick={() => setOpen(false)}>
                    Exploração
                  </a>
                  {navItems
                    .filter((item) => item.id !== "inicio")
                    .map((item) => (
                      <a
                        aria-current={
                          item.id !== "certificacoes" && isActivePath(item.path) ? "page" : undefined
                        }
                        href={item.href}
                        key={item.id}
                        onClick={() => setOpen(false)}
                      >
                        {item.label}
                      </a>
                    ))}
                  <a href="/curriculo/" onClick={() => setOpen(false)}>
                    Currículo digital
                  </a>
                </nav>

                <p className="nexo-menu-panel__note">{professional.title}</p>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </header>
  );
}
