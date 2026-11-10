export const heroCharacterModelPath = "/models/leticia-mini.glb";

export type HeroCharacterAnimation = "idle" | "peek" | "wave" | "hide";

export function resolveHeroCharacterClip(
  clipNames: readonly string[],
  animation: HeroCharacterAnimation
): string | undefined {
  return clipNames.find((name) =>
    name.split(/[|:/]/).at(-1)?.trim().toLocaleLowerCase() === animation
  );
}
