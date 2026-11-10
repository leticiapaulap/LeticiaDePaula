import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Manrope } from "next/font/google";
import { ThemeProvider } from "@/components/compartilhados/tema/provedor-tema";
import { Footer } from "@/components/rodape/rodape";
import { Header } from "@/components/navegacao/menu-lateral";
import { ExperienceProvider } from "@/components/compartilhados/estado/provedor-navegacao";
import { StructuredData } from "@/components/compartilhados/seo/dados-estruturados";
import { pageMetadata } from "@/lib/seo/metadados";
import { navItems } from "@/data/navegacao/itens-menu";
import "../styles/compartilhados/base.css";
import "../styles/compartilhados/interacoes-e-acessibilidade.css";
import "../styles/compartilhados/composicoes-de-secoes.css";
import "../styles/compartilhados/paginas-e-transicoes.css";
import "../styles/pagina-inicial/galeria-e-base-da-abertura.css";
import "../styles/compartilhados/secoes-editoriais.css";
import "../styles/compartilhados/catalogos-de-projetos-e-formacao.css";
import "../styles/navegacao/transicoes-de-pagina.css";
import "../styles/compartilhados/tema-e-tipografia.css";
import "../styles/navegacao/menu-lateral-e-layout.css";
import "../styles/pagina-inicial/apresentacao-fotografia-e-mini-leticia.css";

const interfaceFont = Manrope({
  subsets: ["latin"],
  variable: "--font-nexo-sans",
  display: "swap"
});

const editorialFont = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-nexo-editorial",
  display: "swap"
});

export const metadata: Metadata = {
  ...pageMetadata("Letícia de Paula", "Desenvolvimento web, dados e soluções com propósito. Conheça os projetos, a trajetória e a formação de Letícia de Paula.", "/"),
  applicationName: "Letícia de Paula",
  title: {
    default: "Letícia de Paula",
    template: "%s | Letícia de Paula"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light dark",
  themeColor: "#f7f4ee"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${interfaceFont.variable} ${editorialFont.variable}`} lang="pt-BR" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <ExperienceProvider>
            <a className="skip-link" href="#conteudo">
              Ir para o conteúdo
            </a>
            <noscript>
              <nav className="nexo-noscript-nav" aria-label="Navegação sem JavaScript">
                {navItems.map((item) => <a href={item.href} key={item.id}>{item.label}</a>)}
                <a href="/curriculo-leticia-de-paula.pdf">Currículo PDF</a>
              </nav>
              <style>{`button,input,select,.portfolio-mobile-header,.filter-bar,.filter-group,.nexo-certification-search,.nexo-project-selection,.nexo-gallery-tabs,.nexo-career-navigation,.nexo-certificate-dialog{display:none!important}.nexo-experience-root{padding-bottom:0}`}</style>
            </noscript>
            <div className="portfolio-shell">
              <Header />
              <div className="portfolio-content">
                <main id="conteudo" tabIndex={-1}>
                  {children}
                </main>
                <Footer />
              </div>
            </div>
            <StructuredData />
          </ExperienceProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
