/// <reference types="vitest" />

import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: resolve(__dirname, "dist"),
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        done: resolve(__dirname, "test/fixtures/done.html"),
        progress: resolve(__dirname, "test/fixtures/progress.html"),
        fail: resolve(__dirname, "test/fixtures/fail.html"),
      },
    },
  },
  test: {
    environment: "happy-dom",
  },
});
