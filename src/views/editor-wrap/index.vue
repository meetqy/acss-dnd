<template>
  <main class="flex-1 bg-base-300 bg-opacity-25 px-4 h-screen flex flex-col">
    <div class="w-full flex p-5 flex-shrink-0">
      <Mode v-model="mode" />
    </div>
    <Browser />
  </main>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import { initIframeElement } from "../iframe.io";
import Browser from "./components/browser.vue";
import Mode from "./components/mode.vue";

// false  =>  dark
// true   =>  light
const mode = ref<boolean>(false);
watch(mode, (val) => {
  setDataTheme(document, val);
  // const doc = getIframe().contentWindow?.document;
  // doc && setDataTheme(doc, val);
});

const setDataTheme = (doc: Document | HTMLIFrameElement, mode: boolean) => {
  doc
    .querySelector("html")
    ?.setAttribute("data-theme", mode ? "light" : "dark");
};

onMounted(() => {
  // 初始化iframe
  const iframe = document.getElementById("iframe-editor") as HTMLIFrameElement;
  initIframeElement(iframe);

  // const res = window.matchMedia("prefers-color-scheme: dark").matches;
  // mode.value = !res;
  // const doc = iframe.contentWindow?.document;
  // doc && setDataTheme(doc, mode.value);
});
</script>
