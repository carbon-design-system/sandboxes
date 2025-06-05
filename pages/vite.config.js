import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "/sandboxes/", // ← replace "/sandboxes/" with "/<your-repo-name>/" if different
  plugins: [react()],
  build: {
    outDir: "../docs", // ← “docs” folder at the repo root
    emptyOutDir: true,
  },
  css: {
    preprocessorOptions: {
      // suppress mixed-declarations warnings until resolved in
      // https://github.com/carbon-design-system/carbon/issues/16962
      scss: {
        api: "modern",
        silenceDeprecations: ["mixed-decls"],
      },
    },
  },
  optimizeDeps: {
    include: ["@carbon/react"],
  },
});
