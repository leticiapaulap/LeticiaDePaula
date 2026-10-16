import type { Metadata } from "next";
import { ContactSection } from "@/components/contact-section";
import { EditorialPage } from "@/components/editorial-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata("Contato", "Contate Letícia de Paula por e-mail ou acesse os perfis profissionais informados.", "/contato/");

export default function ContactPage() {
  return (
    <EditorialPage
      eyebrow="Contato"
      title="Vamos conectar ideias."
      description="Entre em contato por e-mail ou conheça meu trabalho nos perfis profissionais. O link de e-mail abre seu aplicativo de mensagens."
    >
      <ContactSection />
    </EditorialPage>
  );
}
