"use client";

import { useExperience } from "@/components/compartilhados/estado/provedor-navegacao";

export function ModeLabel() {
  const { mode } = useExperience();
  return <p className="nexo-direct__eyebrow">{mode === "direct" ? "PORTFÓLIO / LEITURA DIRETA" : "PORTFÓLIO / EM PERSPECTIVA"}</p>;
}
