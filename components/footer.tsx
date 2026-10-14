import { navItems, professional, socialLinks } from "@/lib/data";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div>
          <a className="brand focusable" href="/#portal" aria-label="Voltar ao portal do NEXO">
            <span className="brand-mark" aria-hidden="true">
              N
            </span>
            <span className="brand-text">
              <span>NEXO</span>
              <span>A arquitetura das ideias</span>
            </span>
          </a>
          <p>{professional.title}</p>
        </div>

        <nav aria-label="Navegação do rodapé">
          {navItems.slice(1).map((item) => (
            <a className="focusable" href={item.href} key={item.id}>
              {item.label}
            </a>
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
