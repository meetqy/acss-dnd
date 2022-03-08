<script lang="ts" setup>
import { useBaseStore } from "@/stores/base";
import { ref } from "vue";

interface Props {
  classList: string[];
}

const props = defineProps<Props>();
const baseStore = useBaseStore();

const classValue = ref<string>();
const addClass = () => {
  const newClassName = [...props.classList, classValue.value].join(" ");
  baseStore.changeCheckElementClass(newClassName);
  classValue.value = undefined;
};

const delClass = (index: number) => {
  const classList = props.classList;
  classList.splice(index, 1);
  baseStore.changeCheckElementClass(classList.join(" "));
};
</script>

<template>
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
