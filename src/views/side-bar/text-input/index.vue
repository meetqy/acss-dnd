<template>
  <div
    class="px-4"
    :class="TextNode.has(props.element?.tagName || '') ? 'block' : 'hidden'"
  >
    <p class="flex justify-between items-center">
      <span class="text-base"> Text - {{}} </span>
    </p>
    <div class="mt-4">
      <input
        type="text"
        placeholder="输入文本"
        class="input input-bordered input-primary w-full max-w-xs input-sm mb-2"
        v-model="innerText"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { TextNode } from "@/constants";
import { useBaseStore } from "@/stores/base";
import type { CheckedElement } from "@/types";
import { ref, watch } from "vue";

interface Props {
  element: CheckedElement;
}

const baseStore = useBaseStore();

const props = defineProps<Props>();
const innerText = ref<string>();

watch(props, (val) => {
  innerText.value = val.element?.innerText;
});

watch(innerText, (val) => {
  if (props.element && props.element?.innerText != val) {
    baseStore.updateCheckedElement({
      ...props.element,
      innerText: val || "",
    });
  }
});
</script>
