import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://leticia-paula-portfolio.usoiabensafins.chatgpt.site"),
  title: {
    default: "Leticia de Paula | Desenvolvimento, Dados e Automacao",
    template: "%s | Leticia de Paula"
  },
  description:
    "Portfolio profissional de Leticia de Paula, com foco em desenvolvimento web, automacao de processos, dados e tecnologia da informacao.",
  openGraph: {
    title: "Leticia de Paula | Portfolio Profissional",
    description:
      "Desenvolvimento web, automacao e dados com foco pratico em rotinas reais de tecnologia.",
    type: "website",
    locale: "pt_BR",
    url: "/"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f7f4" },
    { media: "(prefers-color-scheme: dark)", color: "#101210" }
  ]
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <a className="skip-link" href="#conteudo">
            Ir para o conteudo
          </a>
          <Header />
          <main id="conteudo">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
