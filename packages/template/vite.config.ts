import { defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

import copy from "rollup-plugin-copy";

export default defineConfig({
  build: {
    target: "esnext",
    lib: {
      entry: resolve(__dirname, "lib/index.ts"),
      name: "lib",
      fileName: "index",
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
  plugins: [
    vue(),
    vueJsx(),
    copy({
      hook: "writeBundle",
      targets: [
        {
          src: "./lib/index.d.ts",
          dest: "./dist",
        },
      ],
    }),
  ],
});
