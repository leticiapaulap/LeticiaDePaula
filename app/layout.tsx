import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Manrope } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ExperienceProvider } from "@/components/experience-provider";
import { StructuredData } from "@/components/structured-data";
import { pageMetadata } from "@/lib/metadata";
import { navItems } from "@/lib/navigation";
import "./globals.css";
import "./experience.css";
import "./refinements.css";
import "./chapters.css";
import "./hero.css";
import "./editorial-chapters.css";
import "./editorial-catalogs.css";
import "./editorial-navigation.css";
import "./editorial.css";
import "./navigation-layout.css";
import "./hero-portrait.css";

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
