"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from "react";
import { usePathname } from "next/navigation";
import { createExperienceState, experienceReducer, phaseForRoute, phaseForSection, transitionDuration, type ExperienceMode, type ExperiencePhase } from "@/lib/experience-state";

type ExperienceContextValue = ReturnType<typeof useExperienceController>;
const ExperienceContext = createContext<ExperienceContextValue | null>(null);
type SelectionContextValue = Pick<ExperienceContextValue, "selectedProjectSlug" | "selectedSkillName" | "selectedExperienceId" | "projectCategory" | "galleryReturnHref" | "selectProject" | "selectSkill" | "selectExperience" | "setProjectCategory" | "rememberGallery">;
const SelectionContext = createContext<SelectionContextValue | null>(null);

function readPreference(key: string) {
  try { return window.localStorage.getItem(key); } catch { return null; }
}

function savePreference(key: string, value: string) {
  try { window.localStorage.setItem(key, value); } catch { return; }
}

function useExperienceController() {
  const pathname = usePathname();
  const [state, dispatch] = useReducer(experienceReducer, pathname, createExperienceState);
  const [mode, updateMode] = useState<ExperienceMode>("immersive");
  const [preferencesReady, setPreferencesReady] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(true);
  const [motionPreference, setMotionPreference] = useState(true);
  const [sceneStatus, setSceneStatus] = useState<"loading" | "ready" | "unavailable">("loading");
  const [sceneRequested, setSceneRequested] = useState(false);
  const [completedRevision, setCompletedRevision] = useState(0);
  const [announcement, setAnnouncement] = useState("");
  const [galleryReturnHref, rememberGallery] = useState("/projetos/#projetos");
  const motionEnabled = motionPreference && !prefersReducedMotion;
  const isTransitioning = mode === "immersive" && motionEnabled && state.revision > completedRevision;

  const transitionTo = useCallback((phase: ExperiencePhase, section?: string) => dispatch({ type: "navigate", phase, section }), []);
  const selectProject = useCallback((slug: string, origin: "projects" | "competencies" = "projects") => dispatch({ type: "project", slug, origin }), []);
  const selectSkill = useCallback((name: string | null) => dispatch({ type: "skill", name }), []);
  const selectExperience = useCallback((id: string) => dispatch({ type: "experience", id }), []);
  const setProjectCategory = useCallback((category: string) => dispatch({ type: "category", category }), []);
  const markSceneReady = useCallback(() => setSceneStatus("ready"), []);
  const markSceneUnavailable = useCallback(() => setSceneStatus("unavailable"), []);
  const requestScene = useCallback(() => setSceneRequested(true), []);
  const setMode = useCallback((next: ExperienceMode) => {
    updateMode(next);
    setAnnouncement(next === "direct" ? "Modo direto ativado. Todas as informações continuam disponíveis." : "Modo imersivo ativado.");
    savePreference("nexo-mode", next);
  }, []);
  const toggleMotion = useCallback(() => {
    setMotionPreference((enabled) => {
      savePreference("nexo-motion", String(!enabled));
      return !enabled;
    });
  }, []);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReducedMotion(preference.matches);
    const frame = window.requestAnimationFrame(() => {
      update();
      if (readPreference("nexo-mode") === "direct") updateMode("direct");
      if (readPreference("nexo-motion") === "false") setMotionPreference(false);
      setPreferencesReady(true);
    });
    preference.addEventListener("change", update);
    return () => { window.cancelAnimationFrame(frame); preference.removeEventListener("change", update); };
  }, []);

  useEffect(() => {
    if (!isTransitioning) return;
    const revision = state.revision;
    const timer = window.setTimeout(() => setCompletedRevision(revision), transitionDuration);
    return () => window.clearTimeout(timer);
  }, [isTransitioning, state.revision]);

  useEffect(() => {
    transitionTo(phaseForRoute(pathname));
    const slug = pathname.match(/^\/projetos\/([^/]+)/)?.[1];
    if (slug) selectProject(slug);
  }, [pathname, selectProject, transitionTo]);

  useEffect(() => {
    if (pathname !== "/") return;
    const sections = Array.from(document.querySelectorAll<HTMLElement>("#portal, #exploracao, [data-section]"));
    let frame = 0;
    const update = () => {
      frame = 0;
      const readingLine = Math.min(360, window.innerHeight * 0.42);
      const section = [...sections].reverse().find((entry) => entry.getBoundingClientRect().top <= readingLine) ?? sections[0];
      const phase = section && phaseForSection(section.id);
      if (phase) transitionTo(phase, section.id);
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    window.addEventListener("hashchange", schedule);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("hashchange", schedule);
    };
  }, [pathname, transitionTo]);

  return useMemo(() => ({ ...state, mode, preferencesReady, motionEnabled, prefersReducedMotion, sceneStatus, sceneRequested, requestScene, isTransitioning, announcement, galleryReturnHref, rememberGallery, transitionId: state.revision, transitionTo, selectProject, selectSkill, selectExperience, setProjectCategory, setMode, toggleMotion, markSceneReady, markSceneUnavailable }), [state, mode, preferencesReady, motionEnabled, prefersReducedMotion, sceneStatus, sceneRequested, requestScene, isTransitioning, announcement, galleryReturnHref, transitionTo, selectProject, selectSkill, selectExperience, setProjectCategory, setMode, toggleMotion, markSceneReady, markSceneUnavailable]);
}

export function ExperienceProvider({ children }: { children: React.ReactNode }) {
  const value = useExperienceController();
  const { selectedProjectSlug, selectedSkillName, selectedExperienceId, projectCategory, galleryReturnHref, selectProject, selectSkill, selectExperience, setProjectCategory, rememberGallery } = value;
  const selection = useMemo(() => ({ selectedProjectSlug, selectedSkillName, selectedExperienceId, projectCategory, galleryReturnHref, selectProject, selectSkill, selectExperience, setProjectCategory, rememberGallery }), [selectedProjectSlug, selectedSkillName, selectedExperienceId, projectCategory, galleryReturnHref, selectProject, selectSkill, selectExperience, setProjectCategory, rememberGallery]);
  return (
    <ExperienceContext.Provider value={value}>
      <SelectionContext.Provider value={selection}>
      <div className="nexo-experience-root" data-experience-state={value.phase} data-mode={value.mode} data-transitioning={value.isTransitioning} data-motion-enabled={value.motionEnabled} data-scene-ready={value.sceneStatus === "ready"}>
        {children}
        <p className="nexo-visually-hidden" role="status">{value.announcement}</p>
      </div>
      </SelectionContext.Provider>
    </ExperienceContext.Provider>
  );
}

export function useExperience() {
  const context = useContext(ExperienceContext);
  if (!context) throw new Error("useExperience must be used inside ExperienceProvider");
  return context;
}

export function useExperienceSelection() {
  const context = useContext(SelectionContext);
  if (!context) throw new Error("useExperienceSelection must be used inside ExperienceProvider");
  return context;
}
