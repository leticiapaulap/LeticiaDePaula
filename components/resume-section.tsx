import { FileText, LockKeyhole, Mail } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { SectionShell } from "@/components/section-shell";
import { professional } from "@/lib/data";

export function ResumeSection() {
  return (
    <SectionShell
      alt
      description="Minha trajetória, formação e repertório técnico reunidos para uma leitura objetiva."
      eyebrow="Currículo"
      id="curriculo"
      title="O essencial, em um só lugar."
    >
      <Reveal className="resume-download-panel">
        <div>
          <p className="context-label">Currículo digital</p>
          <h3>Conheça minha trajetória profissional.</h3>
          <p>
            Baixe o currículo em PDF ou consulte a versão digital. Você também pode imprimir a página diretamente pelo navegador.
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
