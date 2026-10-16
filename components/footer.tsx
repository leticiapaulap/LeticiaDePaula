import { navItems, professional, socialLinks } from "@/lib/data";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div>
          <Link className="brand focusable" href="/#portal" prefetch={false}>
            <span className="brand-mark" aria-hidden="true">
              N
            </span>
            <span className="brand-text">
              <span>NEXO</span>
              <span>A arquitetura das ideias</span>
            </span>
          </Link>
          <p>{professional.title}</p>
        </div>

        <nav aria-label="Navegação do rodapé">
          {navItems.slice(1).map((item) => (
            <Link className="focusable" href={item.href} key={item.id}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="footer-socials" aria-label="Links de contato">
          {socialLinks.map((link) => (
            <a
              className="focusable"
              href={link.href}
              key={link.label}
              rel={link.href.startsWith("mailto:") ? undefined : "noreferrer"}
              target={link.href.startsWith("mailto:") ? undefined : "_blank"}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
