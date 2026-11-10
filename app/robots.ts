import type { MetadataRoute } from "next";
import { professional } from "@/data/conteudo";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/"
    },
    sitemap: `${professional.siteUrl}/sitemap.xml`
  };
}
