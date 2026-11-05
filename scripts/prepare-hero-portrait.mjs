import sharp from "sharp";
import { fileURLToPath, URL } from "node:url";
import { stat } from "node:fs/promises";
import { stdout } from "node:process";

const source = fileURLToPath(new URL("../public/images/leticia-de-paula.jpg", import.meta.url));

// Delivery variants only: no crop, retouch, recoloring or generative processing.
// Keep the original photograph as the fallback and the source of truth.
for (const width of [720, 960, 1200]) {
  const destination = fileURLToPath(new URL(`../public/images/leticia-de-paula-${width}.webp`, import.meta.url));
  await sharp(source).resize({ width, withoutEnlargement: true }).webp({ quality: 86 }).toFile(destination);
  stdout.write(`Retrato ${width}px: ${(await stat(destination)).size} bytes\n`);
}
