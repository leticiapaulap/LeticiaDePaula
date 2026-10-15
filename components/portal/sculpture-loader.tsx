"use client";

import dynamic from "next/dynamic";
import { Component, useCallback, useEffect, useState, type ReactNode } from "react";
import { useExperience } from "@/components/experience-provider";
import { experiencePhases, sceneQualityForWidth, type SceneQuality } from "@/lib/experience-state";
import { ribbonPath } from "@/lib/ribbon-shapes";

const SculptureScene = dynamic(() => import("@/components/portal/sculpture-scene"), { ssr: false, loading: () => null });
const fallbackPaths = experiencePhases.map((phase) => ({ phase, path: ribbonPath(phase) }));

class SceneErrorBoundary extends Component<{ children: ReactNode; onError: () => void }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch() { this.props.onError(); }
  render() { return this.state.hasError ? null : this.props.children; }
}

export function SculptureLoader() {
  const { phase, mode, markSceneReady, markSceneUnavailable } = useExperience();
  const [ready, setReady] = useState(false);
  const [supported, setSupported] = useState(false);
  const [failed, setFailed] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [visible, setVisible] = useState(true);
  const [quality, setQuality] = useState<SceneQuality>("mobile");

  const handleReady = useCallback(() => { setReady(true); markSceneReady(); }, [markSceneReady]);
  const handleError = useCallback(() => { setFailed(true); setReady(false); markSceneUnavailable(); }, [markSceneUnavailable]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const canvas = document.createElement("canvas");
      try {
        const context = canvas.getContext("webgl2", { failIfMajorPerformanceCaveat: true });
        setSupported(Boolean(context));
        if (!context) markSceneUnavailable();
        context?.getExtension("WEBGL_lose_context")?.loseContext();
      } catch { markSceneUnavailable(); }
    });
    const update = () => setQuality(sceneQualityForWidth(window.innerWidth));
    const visibility = () => setVisible(document.visibilityState === "visible");
    update();
    visibility();
    window.addEventListener("resize", update, { passive: true });
    document.addEventListener("visibilitychange", visibility);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", update);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, [markSceneUnavailable]);

  useEffect(() => {
    if (mode !== "immersive" || !supported) return;
    const frame = window.requestAnimationFrame(() => setHasLoaded(true));
    return () => window.cancelAnimationFrame(frame);
  }, [mode, supported]);

  return (
    <div className="nexo-scene-surface" data-ready={ready && !failed} data-quality={quality} aria-hidden="true">
      <svg className="nexo-scene-fallback" viewBox="-170 -150 340 300" fill="none">
        <defs><linearGradient id="nexo-scene-metal" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#f0ddbc" /><stop offset=".45" stopColor="#8b7659" /><stop offset=".7" stopColor="#ead4b2" /><stop offset="1" stopColor="#b9a382" /></linearGradient></defs>
        {fallbackPaths.map((entry) => <path key={entry.phase} d={entry.path} stroke="url(#nexo-scene-metal)" strokeWidth={entry.phase === "education" ? 12 : 22} strokeLinecap="round" strokeLinejoin="round" opacity={phase === entry.phase ? 1 : 0} />)}
      </svg>
      {hasLoaded && supported && !failed ? (
        <SceneErrorBoundary onError={handleError}>
          <SculptureScene active={visible && mode === "immersive"} quality={quality} onReady={handleReady} onError={handleError} />
        </SceneErrorBoundary>
      ) : null}
    </div>
  );
}
