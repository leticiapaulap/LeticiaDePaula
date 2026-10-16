import sharp from "sharp";
import { log } from "node:console";

await sharp("public/og-leticia.svg").png().toFile("public/og-leticia.png");
await sharp("public/projects/nexo-portal.png").webp({ quality: 82 }).toFile("public/projects/nexo-portal.webp");
log("NEXO: imagem social PNG e captura WebP atualizadas.");
