import { copyFileSync, existsSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const src = resolve(__dirname, "..", "dist", "index.html");
const dest = resolve(__dirname, "..", "dist", "404.html");

if (!existsSync(src)) {
  console.error("dist/index.html not found. Run `npm run build` first.");
  process.exit(1);
}

copyFileSync(src, dest);
console.log("Created dist/404.html for SPA fallback on GitHub Pages.");
