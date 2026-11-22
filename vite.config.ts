// Vercel-ready TanStack Start and Nitro configuration.
import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import viteTsconfigPaths from "vite-tsconfig-paths";
import { nitro } from "nitro/vite";

export default defineConfig(({ command }) => ({
  plugins: [
    tanstackStart(),
    viteReact(),
    tailwindcss(),
    viteTsconfigPaths(),
    nitro({ preset: command === "serve" ? "node-server" : "vercel" }),
  ],
}));
