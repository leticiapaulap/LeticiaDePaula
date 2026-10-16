import { ViewTransition } from "react";
import { PortalHero } from "@/components/portal/portal-hero";

export default function Home() {
  return (
    <ViewTransition enter={{ "nav-forward": "chapter-forward", "nav-back": "chapter-back", default: "none" }} exit={{ "nav-forward": "chapter-forward", "nav-back": "chapter-back", default: "none" }} default="none">
      <PortalHero />
    </ViewTransition>
  );
}
