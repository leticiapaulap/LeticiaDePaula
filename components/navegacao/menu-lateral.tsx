"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { FileText, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "@/components/compartilhados/tema/alternar-tema";
import { chapterTransitionType } from "@/lib/navegacao/capitulos";
import { navItems } from "@/data/navegacao/itens-menu";
import { socialLinks } from "@/data/contato/redes-sociais";

function isCurrentPath(pathname: string, href: string) {
  const normalizedPath = pathname === "/" ? "/" : `${pathname.replace(/\/$/, "")}/`;
  return normalizedPath === href || (href !== "/" && normalizedPath.startsWith(href));
}

function SocialLinks() {
  return (
    <nav className="portfolio-sidebar__socials" aria-label="Perfis profissionais">
      {socialLinks.filter((link) => link.label !== "E-mail").map((link) => (
        <a
          href={link.href}
          key={link.label}
          rel="noreferrer"
          target="_blank"
        >
          {link.label}
        </a>
      ))}
    </nav>
  );
}

function SectionLinks({ pathname, onNavigate }: { pathname: string; onNavigate?: (href: string) => void }) {
  return (
    <nav aria-label="Navegação principal" className="portfolio-sidebar__nav">
      {navItems.map((item) => (
        <Link
          aria-current={isCurrentPath(pathname, item.href) ? "page" : undefined}
          href={item.href}
          key={item.id}
          onNavigate={() => onNavigate?.(item.href)}
          transitionTypes={[chapterTransitionType(pathname, item.href)]}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

function SidebarUtilities({ pathname }: { pathname: string }) {
  return (
    <div className="portfolio-sidebar__utilities">
      <a className="portfolio-sidebar__resume" href="/curriculo-leticia-de-paula.pdf" target="_blank" rel="noreferrer">
        <FileText size={16} aria-hidden="true" />
        Currículo PDF
      </a>
      <ThemeToggle />
      {pathname.replace(/\/$/, "") !== "/contato" ? <SocialLinks /> : null}
    </div>
  );
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const previousPath = useRef(pathname);
  const navigatingFromMenu = useRef(false);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1100px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

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

  return (
    <>
      <aside className="portfolio-sidebar" aria-label="Navegação do portfólio">
        <Link className="portfolio-sidebar__brand" href="/" aria-label="Letícia de Paula — início">
          Letícia <em>de Paula</em>
        </Link>
        <div className="portfolio-sidebar__divider" />
        <SectionLinks pathname={pathname} />
        <SidebarUtilities pathname={pathname} />
      </aside>

      <Dialog.Root open={open} onOpenChange={(nextOpen) => {
        navigatingFromMenu.current = false;
        setOpen(nextOpen);
      }}>
        <header className="portfolio-mobile-header">
          <Link className="portfolio-mobile-header__brand" href="/">
            Letícia <em>de Paula</em>
          </Link>
          <Dialog.Trigger asChild>
            <button className="portfolio-menu-trigger" type="button" aria-expanded={open}>
              <Menu size={17} aria-hidden="true" />
              Menu
            </button>
          </Dialog.Trigger>
        </header>
        <Dialog.Portal>
          <Dialog.Overlay className="portfolio-menu-overlay" />
          <Dialog.Content
            className="portfolio-mobile-menu"
            onCloseAutoFocus={(event) => {
              // Page navigation moves focus to its heading instead of the trigger.
              if (navigatingFromMenu.current) {
                event.preventDefault();
                navigatingFromMenu.current = false;
              } else if (window.matchMedia("(min-width: 1100px)").matches) {
                event.preventDefault();
                const currentLink = document.querySelector<HTMLElement>(".portfolio-sidebar [aria-current='page']");
                const brand = document.querySelector<HTMLElement>(".portfolio-sidebar__brand");
                (currentLink ?? brand)?.focus();
              }
            }}
          >
            <div className="portfolio-mobile-menu__heading">
              <Dialog.Title>Menu</Dialog.Title>
              <Dialog.Close asChild>
                <button className="portfolio-mobile-menu__close" type="button" aria-label="Fechar menu">
                  <X size={19} aria-hidden="true" />
                </button>
              </Dialog.Close>
            </div>
            <Dialog.Description className="nexo-visually-hidden">
              Escolha uma seção do portfólio ou acesse as opções ao final do menu.
            </Dialog.Description>
            <SectionLinks pathname={pathname} onNavigate={(href) => {
              navigatingFromMenu.current = pathname.replace(/\/$/, "") !== href.replace(/\/$/, "");
              setOpen(false);
            }} />
            <SidebarUtilities pathname={pathname} />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
