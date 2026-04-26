import fs from "node:fs/promises";
import path from "node:path";

const distDir = path.resolve(process.cwd(), "dist");
const indexPath = path.join(distDir, "index.html");
const notFoundPath = path.join(distDir, "404.html");

await fs.copyFile(indexPath, notFoundPath);
