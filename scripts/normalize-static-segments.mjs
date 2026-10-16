import { log } from "node:console";
import { copyFile, readdir } from "node:fs/promises";
import { join, relative, resolve, sep } from "node:path";
import { fileURLToPath, URL } from "node:url";

const exportRoot = resolve(fileURLToPath(new URL("../out/", import.meta.url)));
let normalizedFiles = 0;

async function normalizeDirectory(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  for (const entry of entries) {
    const source = join(directory, entry.name);
    if (entry.isDirectory()) {
      await normalizeDirectory(source);
      continue;
    }
    if (!entry.isFile() || !entry.name.endsWith(".txt")) continue;
    const segments = relative(exportRoot, source).split(sep);
    const segmentIndex = segments.findIndex((segment) => segment.startsWith("__next."));
    if (segmentIndex < 0 || segmentIndex === segments.length - 1) continue;
    const destination = join(exportRoot, ...segments.slice(0, segmentIndex), segments.slice(segmentIndex).join("."));
    await copyFile(source, destination);
    normalizedFiles += 1;
  }
}

await normalizeDirectory(exportRoot);
log(`NEXO: ${normalizedFiles} static navigation segment paths normalized.`);
