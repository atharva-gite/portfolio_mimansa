import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command }) => ({
  // For GitHub Pages project sites: https://<user>.github.io/<repo>/
  base: command === "build" ? "/portfolio_mimansa/" : "/",
  plugins: [react()],
}));
