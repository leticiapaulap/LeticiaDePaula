import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { argv } from "node:process";
import { fileURLToPath, URL } from "node:url";

// Repackage the supplied GIF without generating or redrawing any part of the art.
// One shared crop preserves the waving hand and alignment across all nine frames.
const source = argv[2];
if (!source) throw new Error("Informe o caminho do GIF aprovado da Letícia.");
const metadata = await sharp(source, { animated: true }).metadata();
if (metadata.format !== "gif" || metadata.pages !== 9 || metadata.width !== 418 || metadata.pageHeight !== 418) {
  throw new Error("O arquivo não corresponde ao GIF validado: 9 quadros de 418 × 418.");
}
const crop = { left: 32, top: 7, width: 295, height: 403 };
const frames = await Promise.all(Array.from({ length: 9 }, (_, page) =>
  sharp(source, { page }).extract(crop).png().toBuffer()
));
await mkdir(new URL("../public/images/", import.meta.url), { recursive: true });
await sharp({ create: { width: crop.width, height: crop.height * 9, channels: 4, background: "#00000000" } })
  .composite(frames.map((input, index) => ({ input, left: 0, top: crop.height * index })))
  .webp({ quality: 88, alphaQuality: 100 })
  .toFile(fileURLToPath(new URL("../public/images/leticia-mini-sprite.webp", import.meta.url)));
