import { FileText, LockKeyhole, Mail } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionShell } from "@/components/section-shell";
import { professional } from "@/lib/data";

export function ResumeSection() {
  return (
    <SectionShell
      alt
      description="O currículo digital pode ser lido ou impresso. O PDF só será disponibilizado quando o arquivo atualizado estiver no projeto."
      eyebrow="Currículo"
      id="curriculo"
      title="Documento e versão digital sem botão fictício."
    >
      <Reveal className="resume-download-panel">
        <div>
          <p className="context-label">Currículo digital</p>
          <h3>Informações legíveis; arquivos sem simulação.</h3>
          <p>
            A versão digital já está disponível para leitura e impressão. Nenhum PDF atualizado foi encontrado no
            projeto; o download será habilitado quando um arquivo real for adicionado.
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
          <a className="secondary-action focusable" href="/curriculo/">
            <FileText size={17} />
            Ler currículo digital
          </a>
          <a className="text-action focusable" href={`mailto:${professional.email}`}>
            <Mail size={16} />
            Solicitar por e-mail
          </a>
        </div>
      </Reveal>
    </SectionShell>
  );
}
