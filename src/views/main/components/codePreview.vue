<template>
  <!-- The button to open modal -->
  <label for="my-modal-4" class="btn modal-button">
    导出Code <i class="fa-solid fa-cloud-arrow-down ml-2"></i>
  </label>

  <!-- Put this part before </body> tag -->
  <input type="checkbox" id="my-modal-4" class="modal-toggle" />
  <label for="my-modal-4" class="modal cursor-pointer">
    <div class="modal-action mt-0 fixed justify-center py-2 z-50 top-10">
      <label
        for="my-modal-5"
        class="btn"
        v-if="!copied"
        @click="copy(wrapElement)"
      >
        复制代码
      </label>
      <label for="my-modal-5" class="btn" v-else> 已复制 </label>
    </div>
    <label class="modal-box w-11/12 max-w-5xl p-0 relative" for="">
      <highlightjs language="xml" :code="wrapElement" />
    </label>
  </label>
</template>

<script lang="ts" setup>
import "highlight.js/styles/atom-one-dark.css";
import "highlight.js/lib/common";
import hljsVuePlugin from "@highlightjs/vue-plugin";
import { onMounted, ref } from "vue";
import { useClipboard } from "@vueuse/core";
// @ts-ignore
import prettier from "https://unpkg.com/prettier@2.6.0/esm/standalone.mjs";
// @ts-ignore
import parserHtml from "https://unpkg.com/prettier@2.6.0/esm/parser-html.mjs";

const highlightjs = hljsVuePlugin.component;
const wrapElement = ref<string>("");

const format = (code: string) => {
  return prettier.format(code, {
    parser: "html",
    plugins: [parserHtml],
    singleAttributePerLine: false,
    arrowParens: "always",
    bracketSameLine: true,
    bracketSpacing: true,
    embeddedLanguageFormatting: "auto",
    htmlWhitespaceSensitivity: "ignore",
    insertPragma: false,
    jsxSingleQuote: false,
    printWidth: 100,
    proseWrap: "preserve",
    quoteProps: "as-needed",
    requirePragma: false,
    semi: true,
    singleQuote: false,
    tabWidth: 2,
    trailingComma: "es5",
    useTabs: false,
    vueIndentScriptAndStyle: false,
  });
};

window.addEventListener("storage", (ev) => {
  wrapElement.value = format(ev.newValue || "");
});

onMounted(() => {
  // 初始化复制代码内容
  const storage = localStorage.getItem("wrapElement");
  if (storage) {
    wrapElement.value = format(storage);
    // console.log(wrapElement.value);
  }
});

const { copy, copied } = useClipboard();
</script>

<style scoped>
.modal-box pre {
  @apply overflow-y-auto h-full;
}
</style>
