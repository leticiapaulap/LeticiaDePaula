"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

const SculptureScene = dynamic(() => import("@/components/portal/sculpture-scene"), {
  ssr: false,
  loading: () => null
});

export function SculptureLoader() {
  const [ready, setReady] = useState(false);

  return (
    <div className="nexo-scene-surface" data-ready={ready ? "true" : "false"} aria-hidden="true">
      <SculptureScene onReady={() => setReady(true)} />
    </div>
  );
}
