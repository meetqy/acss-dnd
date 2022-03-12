<template>
  <main class="flex-1 bg-base-300 bg-opacity-25 px-4 h-screen flex flex-col">
    <div class="w-full flex p-5 flex-shrink-0">
      <Mode v-model="mode" />
    </div>
    <Browser />
  </main>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { initIframeElement } from "../iframe.io";
import Browser from "./components/browser.vue";
import Mode from "./components/mode.vue";

onMounted(() => {
  // 初始化iframe
  const iframe = document.getElementById("iframe-editor") as HTMLIFrameElement;
  initIframeElement(iframe);
});

// false  =>  dark
// true   =>  light
const mode = ref<boolean>(false);
</script>
