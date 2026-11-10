import { professional } from "@/data/conteudo";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div>
          <Link className="brand personal-brand focusable" href="/#portal" prefetch={false}>
            <span className="brand-text">
              <span>Letícia <em>de Paula</em></span>
            </span>
          </Link>
          <p>{professional.title} · {professional.location}</p>
        </div>

      </div>
    </footer>
  );
}
