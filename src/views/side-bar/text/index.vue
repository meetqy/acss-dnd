<template>
  <div
    tabindex="0"
    class="collapse collapse-plus bg-base-100 rounded-box"
    :class="{ hidden: !isShow }"
  >
    <input type="checkbox" class="peer" ref="collapse" />
    <div class="collapse-title text-xl font-medium">Text</div>
    <div class="collapse-content">
      <div class="border-t border-base-300 pt-4">
        <input
          type="text"
          placeholder="输入文本"
          class="input w-full max-w-xs input-primary"
          v-model="innerText"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { TextNode } from "@/constants";
import { useBaseStore } from "@/stores/base";
import type { CheckedElement } from "@/types";
import { computed, ref, watch } from "vue";

interface Props {
  element: CheckedElement;
}

const baseStore = useBaseStore();

const collapse = ref<HTMLInputElement>();
const isShow = computed(() => TextNode.has(props.element?.tagName || ""));
watch(isShow, (val) => {
  if (val && collapse.value) {
    collapse.value.checked = true;
  }
});

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
