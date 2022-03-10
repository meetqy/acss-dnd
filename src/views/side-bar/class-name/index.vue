<script lang="ts" setup>
import { useBaseStore } from "@/stores/base";
import type { CheckedElement } from "@/types";
import { computed, ref } from "vue";

interface Props {
  element: CheckedElement;
}

const classList = computed(() => {
  const className = props.element?.className;
  if (className) return className.split(" ");
  return [];
});

const props = defineProps<Props>();
const baseStore = useBaseStore();

const classValue = ref<string>();
const addClass = () => {
  if (!classValue.value) return;
  const newClassName = [...classList.value, classValue.value].join(" ");
  props.element &&
    baseStore.updateCheckedElement({
      ...props.element,
      className: newClassName,
    });
  classValue.value = undefined;
};

const delClass = (index: number) => {
  classList.value.splice(index, 1);

  props.element &&
    baseStore.updateCheckedElement({
      ...props.element,
      className: classList.value.join(" "),
    });
};
</script>

<template>
  <div class="px-4">
    <p class="flex justify-between items-center">
      <span class="text-base">ClassName</span>
      <span class="badge badge-outline badge-secondary">{{
        classList?.length
      }}</span>
    </p>
    <div class="mt-4">
      <input
        type="text"
        placeholder="添加 class，回车确认"
        class="input input-bordered input-primary w-full max-w-xs input-sm mb-2"
        v-model="classValue"
        @keyup.enter="addClass"
      />
      <div
        class="badge gap-1 mr-2 mt-2"
        v-for="(item, index) in classList"
        :key="item"
      >
        <svg
          @click="delClass(index)"
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
</template>
