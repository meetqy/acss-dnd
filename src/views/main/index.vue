<template>
  <main class="flex-1 bg-base-300 bg-opacity-25 px-4 h-screen flex flex-col">
    <div class="w-full flex p-5 flex-shrink-0 justify-between">
      <ChooseTheme v-model="theme" />
      <CodePreview />
    </div>
    <Browser />
  </main>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import { getIframe, initIframeElement } from "../iframe.io";
import Browser from "./components/browser.vue";
import ChooseTheme from "./components/chooseTheme.vue";
import CodePreview from "./components/codePreview.vue";

const theme = ref<string>("");
watch(theme, (val) => {
  setDataTheme(document, val);
  const doc = getIframe().contentWindow?.document;
  doc && setDataTheme(doc, val);
});

const setDataTheme = (doc: Document | HTMLIFrameElement, theme: string) => {
  doc.querySelector("html")?.setAttribute("data-theme", theme);
};

onMounted(() => {
  // 初始化iframe
  const iframe = document.getElementById("iframe-editor") as HTMLIFrameElement;
  initIframeElement(iframe);

  const res = window.matchMedia("prefers-color-scheme: dark").matches;

  // 监听iframe是否加载完成
  let t = setInterval(() => {
    if (iframe.contentWindow?.document.querySelector("html")) {
      theme.value = res ? "dark" : "light";
      clearInterval(t);
    }
  }, 50);
});
</script>
