import Link from "next/link";
import { EditorialPage } from "@/components/editorial-page";

export const metadata = { title: "Página não encontrada", robots: { index: false, follow: true } };

export default function NotFound() {
  return (
    <EditorialPage eyebrow="404" title="Esta conexão ainda não existe." description="O endereço pode ter mudado ou a página não estar disponível. Continue pelos projetos ou consulte o currículo digital.">
      <div className="container nexo-not-found-actions">
        <Link className="primary-action focusable" href="/projetos/">Explorar projetos</Link>
        <Link className="secondary-action focusable" href="/curriculo/">Ler currículo</Link>
      </div>
    </EditorialPage>
  );
}
