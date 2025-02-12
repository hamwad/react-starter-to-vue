import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import vue from "@vitejs/plugin-vue";
import { watch } from "vite-plugin-watch";
import vueDevTools from "vite-plugin-vue-devtools";
import { fileURLToPath } from "node:url";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    vue(),
    vueDevTools(),
    watch({
      // Watch the API directory and run the "gen" script when changes are detected
      pattern: "./api/**/*",
      command: "npm run gen",
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
