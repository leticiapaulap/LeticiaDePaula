import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { argv } from "node:process";
import { fileURLToPath, URL } from "node:url";

// Optimize the supplied transparent illustration without changing its artwork.
const source = argv[2];
if (!source) throw new Error("Informe o caminho da ilustração aprovada da Letícia.");
const metadata = await sharp(source).metadata();
if (metadata.format !== "png" || !metadata.hasAlpha) {
  throw new Error("A ilustração precisa ser um PNG com transparência.");
}
await mkdir(new URL("../public/images/", import.meta.url), { recursive: true });
await sharp(source)
  .resize({ height: 768, withoutEnlargement: true })
  .webp({ quality: 90, alphaQuality: 100, effort: 6 })
  .toFile(fileURLToPath(new URL("../public/images/leticia-mini-avatar.webp", import.meta.url)));
