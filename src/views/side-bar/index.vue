<script setup lang="ts">
import { useBaseStore, type CheckedElement } from "@/stores/base";
import { computed, onMounted, ref } from "vue";
import { iframeIo, IframeIoType } from "../iframe.io";

const classValue = ref<string>();
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

const addClass = () => {
  const newClassName = [...classList.value, classValue.value].join(" ");
  baseStore.changeCheckElementClass(newClassName);
  classValue.value = undefined;
};
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
    <div class="divider">OR</div>
    <div class="px-4">
      <p class="flex justify-between items-center">
        <span class="text-base">className</span>
        <span class="badge badge-outline badge-secondary">{{
          classList?.length
        }}</span>
      </p>
      <div class="mt-4">
        <input
          type="text"
          placeholder="添加className"
          class="input input-bordered input-primary w-full max-w-xs input-sm mb-2"
          v-model="classValue"
          @keyup.enter="addClass"
        />
        <div
          class="badge gap-1 mr-2 mt-2"
          v-for="item in classList"
          :key="item"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="inline-block w-4 h-4 stroke-current cursor-pointer"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
          {{ item }}
        </div>
      </div>
    </div>
  </aside>
</template>
