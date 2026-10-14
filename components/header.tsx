"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { FileText, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navItems, professional } from "@/lib/data";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
  const [activeSection, setActiveSection] = useState<string>("inicio");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveSection(visible.target.id);
        }
      },
      {
        rootMargin: "-28% 0px -58% 0px",
        threshold: [0.15, 0.3, 0.6]
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setOpen(false);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a className="brand focusable" href="/#inicio" aria-label="Inicio">
          <span className="brand-mark" aria-hidden="true">
            {professional.monogram}
          </span>
          <span className="brand-text">
            <span>{professional.name}</span>
            <span>Portfolio profissional</span>
          </span>
        </a>

        <nav className="desktop-nav" aria-label="Navegacao principal">
          {navItems.map((item) => (
            <a
              className="nav-link focusable"
              data-active={activeSection === item.id}
              href={item.href}
              key={item.id}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <ThemeToggle />
          <a className="primary-action focusable" href="/curriculo/">
            <FileText size={17} />
            Curriculo
          </a>

          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
              <button className="menu-trigger focusable" type="button" aria-label="Abrir menu">
                <Menu size={20} />
              </button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="mobile-overlay" />
              <Dialog.Content className="mobile-content" aria-describedby={undefined}>
                <div className="mobile-header">
                  <Dialog.Title className="brand">
                    <span className="brand-mark" aria-hidden="true">
                      {professional.monogram}
                    </span>
                    <span className="brand-text">
                      <span>{professional.name}</span>
                      <span>Portfolio profissional</span>
                    </span>
                  </Dialog.Title>
                  <Dialog.Close asChild>
                    <button className="dialog-close focusable" type="button" aria-label="Fechar menu">
                      <X size={19} />
                    </button>
                  </Dialog.Close>
                </div>

                <nav className="mobile-nav" aria-label="Navegacao mobile">
                  {navItems.map((item) => (
                    <a href={item.href} key={item.id} onClick={closeMenu}>
                      {item.label}
                    </a>
                  ))}
                  <a href="/curriculo/" onClick={closeMenu}>
                    Curriculo digital
                  </a>
                </nav>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </header>
  );
}
