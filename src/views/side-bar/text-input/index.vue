<template>
  <div
    class=""
    :class="TextNode.has(props.element?.tagName || '') ? 'block' : 'hidden'"
  >
    <ul class="menu bg-base-100 w-full">
      <li>
        <a
          class="hover:bg-transparent active:bg-base-100 active:text-base-content"
        >
          Text 文本
        </a>
      </li>
    </ul>
    <div class="relative px-4">
      <input
        type="text"
        placeholder="输入文本"
        class="input w-full max-w-xs mb-2 input-primary"
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
