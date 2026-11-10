import { ViewTransition, type ReactNode } from "react";
import type { ExperiencePhase } from "@/lib/navegacao/estado-navegacao";

export function ChapterTransition({ phase, children }: { phase: ExperiencePhase; children: ReactNode }) {
  return (
    <ViewTransition
      key={phase}
      enter={{ "nav-forward": "editorial-forward", "nav-back": "editorial-back", default: "editorial-enter" }}
      exit="editorial-leave"
      default="none"
    >
      {children}
    </ViewTransition>
  );
}
