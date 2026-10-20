import { ViewTransition, type ReactNode } from "react";
import type { ExperiencePhase } from "@/lib/experience-state";

export function ChapterTransition({ phase, children }: { phase: ExperiencePhase; children: ReactNode }) {
  return (
    <ViewTransition
      enter={{ "nav-forward": `chapter-forward chapter-${phase}`, "nav-back": `chapter-back chapter-${phase}`, default: "chapter-fade" }}
      exit={{ "nav-forward": "chapter-forward", "nav-back": "chapter-back", default: "chapter-fade" }}
      default="none"
    >
      {children}
    </ViewTransition>
  );
}
