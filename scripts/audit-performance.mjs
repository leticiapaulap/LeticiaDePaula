import lighthouse from "lighthouse";
import desktopConfig from "lighthouse/core/config/desktop-config.js";
import { launch } from "chrome-launcher";
import { mkdir, writeFile } from "node:fs/promises";
import { env } from "node:process";
import { log } from "node:console";

const target = env.NEXO_AUDIT_URL ?? "http://127.0.0.1:4173/";
const directory = env.NEXO_AUDIT_OUTPUT ?? ".qa/performance";
await mkdir(directory, { recursive: true });
const browser = await launch({ chromePath: env.CHROME_PATH, chromeFlags: ["--headless=new", "--no-sandbox"] });
try {
  for (const mode of ["mobile", "desktop"]) {
    const results = [];
    for (let run = 1; run <= 3; run += 1) {
      const result = await lighthouse(target, { port: browser.port, output: ["json", "html"], onlyCategories: ["performance", "accessibility", "seo"] }, mode === "desktop" ? desktopConfig : undefined);
      if (!result || result.lhr.runtimeError) throw new Error(JSON.stringify(result?.lhr.runtimeError ?? "Lighthouse não retornou resultado."));
      await writeFile(`${directory}/${mode}-${run}.json`, result.report[0]);
      await writeFile(`${directory}/${mode}-${run}.html`, result.report[1]);
      results.push({ run, performance: result.lhr.categories.performance.score, lcp: result.lhr.audits["largest-contentful-paint"].numericValue, cls: result.lhr.audits["cumulative-layout-shift"].numericValue, tbt: result.lhr.audits["total-blocking-time"].numericValue });
      log(mode, JSON.stringify(results.at(-1)));
    }
    await writeFile(`${directory}/${mode}-summary.json`, JSON.stringify(results, null, 2));
  }
} finally {
  await browser.kill();
}
