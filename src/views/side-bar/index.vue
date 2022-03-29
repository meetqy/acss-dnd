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
    class="h-screen w-80 bg-base-100 flex-shrink-0 shadow overflow-y-auto overflow-x-hidden"
    :class="{ hidden: !checkedElement }"
  >
    <div
      class="navbar bg-base-100 sticky top-0 z-50 border-b border-base-300 border-opacity-30"
    >
      <div class="flex-1 w-full">
        <a class="btn btn-ghost text-xl text-primary font-medium lowercase">
          {{ checkedElement?.tagName }}
        </a>
      </div>
      <div class="flex-none">
        <button class="btn btn-square btn-ghost" @click="close">
          <fa6-solid:xmark />
        </button>
      </div>
    </div>
    <ClassName :element="checkedElement" />
    <Text :element="checkedElement" />
    <Background :element="checkedElement" />
  </aside>
</template>
