import type { MetadataRoute } from "next";
import { professional, projects } from "@/lib/data";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: professional.siteUrl,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1
    },
    ...["sobre", "projetos", "experiencia", "competencias", "formacao", "contato"].map((page) => ({
      url: `${professional.siteUrl}/${page}/`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: page === "projetos" ? 0.9 : 0.75
    })),
    {
      url: `${professional.siteUrl}/curriculo/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8
    },
    ...projects.map((project) => ({
      url: `${professional.siteUrl}/projetos/${project.slug}/`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: project.featured ? 0.85 : 0.7
    }))
  ];
}
