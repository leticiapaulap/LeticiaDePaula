import type { ExperiencePhase } from "@/lib/experience-state";

export type Chapter = {
  phase: ExperiencePhase;
  number: string;
  label: string;
  href: string;
  motif: string;
};

export const chapters: readonly Chapter[] = [
  { phase: "portal", number: "01", label: "Apresentação", href: "/", motif: "Conexão / Forma / Movimento" },
  { phase: "nucleus", number: "02", label: "Sobre mim", href: "/sobre/", motif: "Pessoas / Contexto / Olhar" },
  { phase: "projects", number: "03", label: "Projetos", href: "/projetos/", motif: "Ideia / Processo / Experiência" },
  { phase: "experience", number: "04", label: "Experiências profissionais", href: "/experiencia/", motif: "Percurso / Prática / Evolução" },
  { phase: "competencies", number: "05", label: "Competências", href: "/competencias/", motif: "Repertório / Relações / Aplicação" },
  { phase: "education", number: "06", label: "Formação e certificações", href: "/formacao/", motif: "Aprendizado / Camadas / Descobertas" },
  { phase: "convergence", number: "07", label: "Contato", href: "/contato/", motif: "Encontro / Conversa / Possibilidades" }
];

export function chapterForPath(pathname: string) {
  const normalized = pathname === "/" ? "/" : `${pathname.replace(/\/$/, "")}/`;
  return chapters.find((chapter) => chapter.href === normalized);
}

export function chapterForPhase(phase: ExperiencePhase) {
  return chapters.find((chapter) => chapter.phase === phase)!;
}

export function chapterTransitionType(from: string, to: string) {
  const current = chapterForPath(from);
  const destination = chapterForPath(to);
  return current && destination && Number(destination.number) < Number(current.number) ? "nav-back" : "nav-forward";
}
