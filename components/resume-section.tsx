import { FileText, LockKeyhole, Mail } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { SectionShell } from "@/components/section-shell";
import { professional } from "@/lib/data";

export function ResumeSection() {
  return (
    <SectionShell
      alt
      description="Baixe a versão de divulgação do currículo ou leia a versão digital. O telefone pessoal foi removido do PDF."
      eyebrow="Currículo"
      id="curriculo"
      title="Currículo disponível para download e leitura."
    >
      <Reveal className="resume-download-panel">
        <div>
          <p className="context-label">Currículo digital</p>
          <h3>Versão de leitura e arquivo para download.</h3>
          <p>
            O PDF de divulgação remove o telefone pessoal e usa o endereço profissional informado. A versão digital
            também pode ser lida e impressa diretamente no navegador.
          </p>
        </div>

        <div className="resume-actions">
          {professional.resumePdfPath ? (
            <a className="primary-action focusable" href={professional.resumePdfPath} download>
              <FileText size={17} />
              Baixar currículo
            </a>
          ) : (
            <span className="disabled-action" aria-disabled="true">
              <LockKeyhole size={17} />
              PDF ainda não disponível
            </span>
          )}
          <Link className="secondary-action focusable" href="/curriculo/">
            <FileText size={17} />
            Ler currículo digital
          </Link>
          <a className="text-action focusable" href={`mailto:${professional.email}`}>
            <Mail size={16} />
            Solicitar por e-mail
          </a>
        </div>
      </Reveal>
    </SectionShell>
  );
}
