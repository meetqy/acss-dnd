import { fileURLToPath, URL } from "url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import Components from "unplugin-vue-components/vite";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/acss-dnd/",
  plugins: [
    vue(),
    Components({
      resolvers: [
        IconsResolver({
          enabledCollections: ["fa6-solid"],
          prefix: "",
        }),
      ],
    }),
    Icons({
      compiler: "vue3",
      autoInstall: true,
    }),
    vueJsx(),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
