import { professional, projects, socialLinks } from "@/lib/data";

export function StructuredData() {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: professional.name,
    email: professional.email,
    description: professional.positioning,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Brasília",
      addressRegion: "DF",
      addressCountry: "BR"
    },
    sameAs: socialLinks
      .filter((link) => !link.href.startsWith("mailto:"))
      .map((link) => link.href),
    knowsAbout: [
      "Desenvolvimento de software",
      "Desenvolvimento web",
      "React",
      "TypeScript"
    ],
    subjectOf: projects.map((project) => ({
      "@type": "CreativeWork",
      name: project.title,
      url: `${professional.siteUrl}/projetos/${project.slug}/`
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(person).replace(/</g, "\\u003c")
      }}
    />
  );
}
