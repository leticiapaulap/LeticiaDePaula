import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export function EditorialPage({
  eyebrow,
  title,
  description,
  children
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="nexo-route">
      <header className="nexo-route__hero">
        <div className="nexo-route__hero-inner">
          <nav className="nexo-breadcrumb" aria-label="Breadcrumb">
            <Link className="focusable" href="/">
              NEXO
            </Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{eyebrow}</span>
          </nav>

          <p className="nexo-route__eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="nexo-route__description">{description}</p>
          <Link className="nexo-route__back focusable" href="/">
            <ArrowLeft size={15} aria-hidden="true" />
            Início do NEXO
          </Link>
        </div>
      </header>

      <div className="nexo-direct nexo-route__body">{children}</div>
    </div>
  );
}
