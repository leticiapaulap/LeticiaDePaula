"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { Component, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
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
  const pathname = usePathname();
  const { phase, activeSection, mode, preferencesReady, sceneRequested, markSceneReady, markSceneUnavailable } = useExperience();
  const surface = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [supported, setSupported] = useState(false);
  const [failed, setFailed] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [visible, setVisible] = useState(true);
  const [inViewport, setInViewport] = useState(false);
  const [quality, setQuality] = useState<SceneQuality>("mobile");
  const shouldLoad = sceneRequested || (pathname === "/" && (quality !== "mobile" || phase !== "portal"));

  const handleReady = useCallback(() => { setReady(true); markSceneReady(); }, [markSceneReady]);
  const handleError = useCallback(() => { setFailed(true); setReady(false); markSceneUnavailable(); }, [markSceneUnavailable]);

  useEffect(() => {
    if (!preferencesReady || !shouldLoad || mode !== "immersive" || !visible || !inViewport || supported || failed) return;
    const probe = () => {
      const canvas = document.createElement("canvas");
      try {
        const context = canvas.getContext("webgl2", { failIfMajorPerformanceCaveat: true });
        setSupported(Boolean(context));
        if (!context) handleError();
        context?.getExtension("WEBGL_lose_context")?.loseContext();
      } catch { handleError(); }
    };
    if (typeof window.requestIdleCallback === "function") {
      const idle = window.requestIdleCallback(probe, { timeout: 1800 });
      return () => window.cancelIdleCallback(idle);
    }
    const timer = window.setTimeout(probe, 300);
    return () => window.clearTimeout(timer);
  }, [failed, handleError, inViewport, mode, preferencesReady, shouldLoad, supported, visible]);

  useEffect(() => {
    const update = () => setQuality(sceneQualityForWidth(window.innerWidth));
    const visibility = () => setVisible(document.visibilityState === "visible");
    update();
    visibility();
    window.addEventListener("resize", update, { passive: true });
    document.addEventListener("visibilitychange", visibility);
    return () => {
      window.removeEventListener("resize", update);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);

  useEffect(() => {
    const stage = surface.current?.parentElement;
    if (!stage) return;
    const artwork = pathname === "/"
      ? document.getElementById(activeSection)?.querySelector<HTMLElement>("[data-scene-anchor]")
      : document.querySelector<HTMLElement>(".route-hero-scene, .project-case-scene");
    const target = artwork ?? stage;
    const observer = new IntersectionObserver(([entry]) => setInViewport(entry.isIntersecting));
    observer.observe(target);
    let frame = 0;
    const position = () => {
      frame = 0;
      if (!artwork) return;
      const bounds = artwork.getBoundingClientRect();
      stage.style.setProperty("--scene-top", `${bounds.top}px`);
      stage.style.setProperty("--scene-left", `${bounds.left}px`);
      stage.style.setProperty("--scene-width", `${bounds.width}px`);
      stage.style.setProperty("--scene-height", `${bounds.height}px`);
      if (bounds.width > 0 && bounds.height > 0) {
        stage.dataset.anchored = "true";
        artwork.dataset.sceneActive = "true";
      } else {
        delete stage.dataset.anchored;
        delete artwork.dataset.sceneActive;
      }
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(position); };
    const resize = new ResizeObserver(schedule);
    if (artwork) {
      resize.observe(artwork);
      if (artwork.parentElement) resize.observe(artwork.parentElement);
    }
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    return () => {
      delete stage.dataset.anchored;
      if (artwork) delete artwork.dataset.sceneActive;
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      resize.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [pathname, phase, activeSection]);

  useEffect(() => {
    if (mode !== "immersive" || !supported || !visible || !inViewport) return;
    const frame = window.requestAnimationFrame(() => setHasLoaded(true));
    return () => window.cancelAnimationFrame(frame);
  }, [inViewport, mode, supported, visible]);

  return (
    <div ref={surface} className="nexo-scene-surface" data-ready={ready && !failed} data-quality={quality} aria-hidden="true">
      <svg className="nexo-scene-fallback" viewBox="-170 -150 340 300" fill="none">
        <defs><linearGradient id="nexo-scene-metal" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#f0ddbc" /><stop offset=".45" stopColor="#8b7659" /><stop offset=".7" stopColor="#ead4b2" /><stop offset="1" stopColor="#b9a382" /></linearGradient></defs>
        {fallbackPaths.map((entry) => <path key={entry.phase} d={entry.path} stroke="url(#nexo-scene-metal)" strokeWidth={entry.phase === "education" ? 12 : 22} strokeLinecap="round" strokeLinejoin="round" opacity={phase === entry.phase ? 1 : 0} />)}
      </svg>
      {hasLoaded && supported && !failed ? (
        <SceneErrorBoundary onError={handleError}>
          <SculptureScene active={visible && inViewport && mode === "immersive"} quality={quality} onReady={handleReady} onError={handleError} />
        </SceneErrorBoundary>
      ) : null}
    </div>
  );
}
