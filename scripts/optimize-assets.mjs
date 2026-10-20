import sharp from "sharp";
import { log } from "node:console";

await sharp("public/og-leticia.svg").png().toFile("public/og-leticia.png");
await sharp("public/projects/nexo-portal.png").webp({ quality: 82 }).toFile("public/projects/nexo-portal.webp");
await sharp("public/projects/festa-fantasia-home.png").resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 86 }).toFile("public/projects/festa-fantasia-home.webp");
await sharp("public/projects/portfolio-competencias.png").webp({ quality: 86 }).toFile("public/projects/portfolio-competencias.webp");
log("Portfólio: imagem social PNG e capturas WebP atualizadas.");
