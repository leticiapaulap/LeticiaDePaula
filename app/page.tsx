import { ChapterTransition } from "@/components/compartilhados/transicoes/transicao-pagina";
import { PortalHero } from "@/components/pagina-inicial/apresentacao-inicial";

export default function Home() {
  return (
    <ChapterTransition phase="portal">
      <PortalHero />
    </ChapterTransition>
  );
}
