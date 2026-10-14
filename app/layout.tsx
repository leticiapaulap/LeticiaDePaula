import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Manrope } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { StructuredData } from "@/components/structured-data";
import "./globals.css";

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
  metadataBase: new URL("https://leticia-paula-portfolio.usoiabensafins.chatgpt.site"),
  title: {
    default: "NEXO — A Arquitetura das Ideias | Letícia de Paula",
    template: "%s | Letícia de Paula"
  },
  description:
    "Ideias que ganham forma. Portfólio profissional de Letícia de Paula, com aplicações web e documentação de projetos.",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "NEXO — A Arquitetura das Ideias",
    description:
      "O universo profissional de Letícia de Paula: desenvolvimento web, estudos de caso e conteúdo verificável.",
    type: "website",
    locale: "pt_BR",
    url: "/",
    images: [
      {
        url: "/og-leticia.svg",
        width: 1200,
        height: 630,
        alt: "Letícia de Paula - Portfólio Profissional"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "NEXO — A Arquitetura das Ideias",
    description: "Portfólio profissional de Letícia de Paula: desenvolvimento web, projetos e conteúdo verificável.",
    images: ["/og-leticia.svg"]
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f2f0ea" },
    { media: "(prefers-color-scheme: dark)", color: "#0c1015" }
  ]
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
          <a className="skip-link" href="#conteudo">
            Ir para o conteúdo
          </a>
          <Header />
          <main id="conteudo">{children}</main>
          <Footer />
          <StructuredData />
        </ThemeProvider>
      </body>
    </html>
  );
}
