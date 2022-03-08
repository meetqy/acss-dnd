<script setup lang="ts">
import { useBaseStore, type CheckedElement } from "@/stores/base";
import { computed, onMounted } from "vue";
import { iframeIo, IframeIoType } from "../iframe.io";
import ClassName from "./class-name/index.vue";

const baseStore = useBaseStore();
onMounted(() => {
  iframeIo.on(IframeIoType.editorToSide, (data) => {
    baseStore.setCheckedElement(data as CheckedElement);
  });
});

const classList = computed(() => {
  const className = baseStore.checkedElement?.className;
  if (className) return className.split(" ");
  return [];
});
</script>

<template>
  <aside
    id="side-bar"
    class="h-screen w-72 bg-white flex-shrink-0 shadow"
    :class="{ hidden: !baseStore.checkedElement }"
  >
    <header class="flex justify-between px-4 pt-5">
      <span class="font-semibold">
        {{ baseStore.checkedElement?.tagName }}
        <span class="lowercase">({{ baseStore.checkedElement?.tagName }})</span>
      </span>
      <button
        class="btn btn-xs btn-square btn-outline text-base-300"
        @click="baseStore.setCheckedElement(undefined)"
      >
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
    </header>
    <div class="divider"></div>
    <ClassName :class-list="classList" />
  </aside>
</template>
