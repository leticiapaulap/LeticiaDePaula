import { ChapterTransition } from "@/components/chapter-transition";
import { PortalHero } from "@/components/portal/portal-hero";

export default function Home() {
  return (
    <ChapterTransition phase="portal">
      <PortalHero />
    </ChapterTransition>
  );
}
