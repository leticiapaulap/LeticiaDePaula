import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, resolve, sep, join } from "node:path";
import { fileURLToPath, URL } from "node:url";
import { gzipSync } from "node:zlib";
import { env } from "node:process";
import { log } from "node:console";

const root = fileURLToPath(new URL("../out/", import.meta.url));
const port = Number(env.PORT ?? 4173);
const types = { ".html": "text/html; charset=utf-8", ".js": "application/javascript; charset=utf-8", ".css": "text/css; charset=utf-8", ".txt": "text/plain; charset=utf-8", ".xml": "application/xml; charset=utf-8", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".webp": "image/webp", ".pdf": "application/pdf", ".woff2": "font/woff2", ".ico": "image/x-icon" };
const hosting = JSON.parse(await readFile(new URL("../vercel.json", import.meta.url), "utf8"));
const securityHeaders = Object.fromEntries(hosting.headers.find((rule) => rule.source === "/(.*)").headers.map(({ key, value }) => [key, value]));

createServer(async (request, response) => {
  if (!["GET", "HEAD"].includes(request.method)) {
    response.writeHead(405, { Allow: "GET, HEAD" }).end();
    return;
  }
  let file;
  try {
    const pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
    file = resolve(root, `.${pathname}`);
    if (file !== resolve(root) && !file.startsWith(resolve(root) + sep)) {
      response.writeHead(403).end();
      return;
    }
  } catch {
    response.writeHead(400).end();
    return;
  }
  let status = 200;
  let body;
  try {
    if ((await stat(file)).isDirectory()) file = join(file, "index.html");
    body = await readFile(file);
  } catch {
    status = 404;
    file = join(root, "404.html");
    try { body = await readFile(file); }
    catch { response.writeHead(503).end("Execute npm run build primeiro."); return; }
  }
  const contentType = types[extname(file)] ?? "application/octet-stream";
  const compress = /text|javascript|json|xml|svg/.test(contentType) && /\bgzip\b/.test(request.headers["accept-encoding"] ?? "");
  const payload = compress ? gzipSync(body) : body;
  response.writeHead(status, {
    ...securityHeaders,
    "Content-Type": contentType,
    "Content-Length": payload.length,
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Cache-Control": status === 200 && file.includes(`${sep}_next${sep}static${sep}`) ? "public, max-age=31536000, immutable" : "no-cache",
    Vary: "Accept-Encoding",
    ...(compress ? { "Content-Encoding": "gzip" } : {})
  });
  response.end(request.method === "HEAD" ? undefined : payload);
}).listen(port, "127.0.0.1", () => log(`Portfólio preview: http://127.0.0.1:${port}`));
