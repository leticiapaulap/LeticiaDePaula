import type { Metadata } from "next";
import { ContactSection } from "@/components/contact-section";
import { EditorialPage } from "@/components/editorial-page";

export const metadata: Metadata = {
  title: "Contato",
  description: "Contate Letícia de Paula por e-mail ou acesse os perfis profissionais informados.",
  alternates: { canonical: "/contato/" }
};

export default function ContactPage() {
  return (
    <EditorialPage
      eyebrow="Contato"
      title="Uma conversa, sem formulários fictícios."
      description="E-mail clicável e perfis profissionais informados. A demonstração abre o seu cliente de e-mail; não armazena nem envia mensagens pelo site."
    >
      <ContactSection />
    </EditorialPage>
  );
}
