export const experiencePhases = ["portal", "nucleus", "projects", "experience", "competencies", "education", "convergence"] as const;

export type ExperiencePhase = (typeof experiencePhases)[number];
export type ExperienceMode = "immersive" | "direct";
export type SceneQuality = "mobile" | "tablet" | "desktop";
export type VectorTuple = [number, number, number];

export const transitionDuration = 900;

export type ExperienceSceneState = {
  label: string;
  section: string;
  href: string;
  cameraPosition: VectorTuple;
  cameraTarget: VectorTuple;
  rotation: VectorTuple;
  ribbonScale: VectorTuple;
  ribbonColor: string;
  lightIntensity: number;
  roughness: number;
};

export const experienceSceneStates: Record<ExperiencePhase, ExperienceSceneState> = {
  portal: { label: "Portal", section: "portal", href: "/#portal", cameraPosition: [0, 0, 4.8], cameraTarget: [0, 0, 0], rotation: [0.12, -0.22, -0.12], ribbonScale: [1, 1, 1], ribbonColor: "#c8ad83", lightIntensity: 1, roughness: 0.27 },
  nucleus: { label: "Núcleo", section: "exploracao", href: "/#exploracao", cameraPosition: [0.12, 0.1, 4.9], cameraTarget: [0, 0, 0], rotation: [0.04, -0.08, 0.05], ribbonScale: [1, 1, 1], ribbonColor: "#d6bd93", lightIntensity: 1.12, roughness: 0.3 },
  projects: { label: "Projetos", section: "projetos", href: "/projetos/", cameraPosition: [-0.18, 0.02, 4.8], cameraTarget: [0, 0, 0], rotation: [0.18, -0.24, -0.08], ribbonScale: [1.05, 0.94, 1], ribbonColor: "#c3a77e", lightIntensity: 1.04, roughness: 0.23 },
  experience: { label: "Experiência", section: "experiencia", href: "/experiencia/", cameraPosition: [0.12, 0.14, 4.9], cameraTarget: [0, 0, 0], rotation: [-0.08, -0.12, 0.06], ribbonScale: [1, 1, 1], ribbonColor: "#cfb388", lightIntensity: 1.08, roughness: 0.32 },
  competencies: { label: "Competências", section: "competencias", href: "/competencias/", cameraPosition: [0, 0.06, 4.8], cameraTarget: [0, 0, 0], rotation: [0.08, -0.16, 0.04], ribbonScale: [1, 1, 1], ribbonColor: "#d8c29d", lightIntensity: 1.16, roughness: 0.25 },
  education: { label: "Formação", section: "formacao", href: "/formacao/", cameraPosition: [0, 0.06, 5], cameraTarget: [0, 0, 0], rotation: [0.16, -0.16, -0.06], ribbonScale: [1, 1, 1], ribbonColor: "#bba782", lightIntensity: 0.98, roughness: 0.36 },
  convergence: { label: "Contato", section: "contato", href: "/contato/", cameraPosition: [0, 0, 4.8], cameraTarget: [0, 0, 0], rotation: [0.12, -0.22, -0.12], ribbonScale: [1, 1, 1], ribbonColor: "#dfc8a5", lightIntensity: 1.18, roughness: 0.24 }
};

export type ExperienceState = {
  phase: ExperiencePhase;
  activeSection: string;
  revision: number;
  visited: ExperiencePhase[];
  selectedProjectSlug: string | null;
  selectedSkillName: string | null;
  selectedExperienceId: string | null;
  projectCategory: string;
};

export type ExperienceAction =
  | { type: "navigate"; phase: ExperiencePhase; section?: string }
  | { type: "project"; slug: string; origin: "projects" | "competencies" }
  | { type: "skill"; name: string | null }
  | { type: "experience"; id: string }
  | { type: "category"; category: string };

export function createExperienceState(pathname: string): ExperienceState {
  const phase = phaseForRoute(pathname);
  return { phase, activeSection: experienceSceneStates[phase].section, revision: 0, visited: [phase], selectedProjectSlug: null, selectedSkillName: null, selectedExperienceId: null, projectCategory: "Todos" };
}

export function experienceReducer(state: ExperienceState, action: ExperienceAction): ExperienceState {
  if (action.type === "category") return { ...state, projectCategory: action.category };
  const phase = action.type === "navigate" ? action.phase : action.type === "project" ? action.origin : action.type === "skill" ? "competencies" : "experience";
  const selection = action.type === "project" ? { selectedProjectSlug: action.slug, selectedSkillName: null } : action.type === "skill" ? { selectedSkillName: action.name, selectedProjectSlug: null } : action.type === "experience" ? { selectedExperienceId: action.id } : {};
  const activeSection = action.type === "navigate" && action.section ? action.section : experienceSceneStates[phase].section;
  if (action.type === "navigate" && state.phase === phase && state.activeSection === activeSection) return state;
  return { ...state, ...selection, phase, activeSection, revision: state.revision + 1, visited: state.visited.includes(phase) ? state.visited : [...state.visited, phase] };
}

export function phaseForRoute(pathname: string): ExperiencePhase {
  if (pathname.startsWith("/projetos")) return "projects";
  if (pathname.startsWith("/experiencia")) return "experience";
  if (pathname.startsWith("/competencias")) return "competencies";
  if (pathname.startsWith("/formacao")) return "education";
  if (pathname.startsWith("/contato") || pathname.startsWith("/curriculo")) return "convergence";
  if (pathname.startsWith("/sobre")) return "nucleus";
  return "portal";
}

export function phaseForSection(sectionId: string): ExperiencePhase | null {
  if (sectionId === "portal") return "portal";
  if (["exploracao", "sobre", "portfolio"].includes(sectionId)) return "nucleus";
  if (sectionId === "projetos") return "projects";
  if (sectionId === "experiencia") return "experience";
  if (sectionId === "competencias") return "competencies";
  if (["formacao", "certificacoes"].includes(sectionId)) return "education";
  if (["contato", "curriculo"].includes(sectionId)) return "convergence";
  return null;
}

export function sceneQualityForWidth(width: number): SceneQuality {
  return width < 768 ? "mobile" : width < 1100 ? "tablet" : "desktop";
}

export function transitionProgress(elapsed: number, duration = transitionDuration) {
  const progress = Math.min(1, Math.max(0, elapsed / duration));
  return progress * progress * (3 - 2 * progress);
}
