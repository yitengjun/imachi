// https://ja.vitejs.dev/guide/build.html#%E3%83%A9%E3%82%A4%E3%83%95%E3%82%99%E3%83%A9%E3%83%AA%E3%83%A2%E3%83%BC%E3%83%88%E3%82%99

import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    outDir: resolve(__dirname, "dist"),
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "Imachi",
      fileName: "imachi",
    },
  },
  plugins: [dts({ rollupTypes: true })],
});
