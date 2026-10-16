import type { Metadata } from "next";
import { siteUrl } from "@/lib/site";

export function pageMetadata(title: string, description: string, path: string): Metadata {
  const shareTitle = `${title} | Letícia de Paula`;
  const images = [{ url: "/og-leticia.png", width: 1200, height: 630, alt: "NEXO — portfólio profissional de Letícia de Paula" }];
  return {
    title,
    description,
    metadataBase: new URL(siteUrl),
    alternates: { canonical: path },
    openGraph: { title: shareTitle, description, url: path, siteName: "NEXO — A Arquitetura das Ideias", locale: "pt_BR", type: "website", images },
    twitter: { card: "summary_large_image", title: shareTitle, description, images }
  };
}
