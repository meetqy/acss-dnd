<script setup lang="ts">
import { useBaseStore } from "@/stores/base";
import type { CheckedElement } from "@/types";
import { computed, onMounted } from "vue";
import { iframeIo, IframeIoType } from "../iframe.io";
import ClassName from "./class-name/index.vue";
import Text from "./text/index.vue";
import Background from "./background/index.vue";

const baseStore = useBaseStore();
onMounted(() => {
  iframeIo.on(IframeIoType.editorToSide, (data) => {
    baseStore.initCheckedElement(data as CheckedElement);
  });
});

const close = () => {
  baseStore.initCheckedElement(null);
};

const checkedElement = computed(() => baseStore.checkedElement);
</script>

<template>
  <aside
    id="side-bar"
    class="h-screen w-80 bg-base-100 flex-shrink-0 shadow overflow-y-scroll overflow-x-hidden scrollbar"
    :class="{ hidden: !checkedElement }"
  >
    <div
      class="navbar bg-base-100 sticky top-0 z-50 border-b border-base-300 border-opacity-30"
    >
      <div class="flex-1 w-full">
        <a class="btn btn-ghost normal-case text-xl text-primary font-medium">
          {{ checkedElement?.tagName }}
          <span class="lowercase">({{ checkedElement?.tagName }})</span>
        </a>
      </div>
      <div class="flex-none">
        <button class="btn btn-square btn-ghost" @click="close">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
    <ClassName :element="checkedElement" />
    <Text :element="checkedElement" />
    <Background :element="checkedElement" />
  </aside>
</template>
