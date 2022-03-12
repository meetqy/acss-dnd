<script lang="ts" setup>
import { useBaseStore } from "@/stores/base";
import type { CheckedElement } from "@/types";
import { ref, watch } from "vue";
import InputSearch from "../components/input-search/index.vue";

interface Props {
  // 必须要接受 null，不然无法监听选中element
  element: CheckedElement | null;
}

const props = defineProps<Props>();
const baseStore = useBaseStore();

const classList = ref<string[]>([]);
const changeClassList = (e: string[]) => {
  classList.value = e;
};
const delClassList = (index: number) => {
  const val = classList.value;
  val.splice(index, 1);
  classList.value = [...val];
};

watch(props, (val) => {
  if (val.element) {
    classList.value = val.element.className
      ? val.element.className.split(" ")
      : [];
  }
});

watch(classList, (val) => {
  if (props.element) {
    baseStore.updateCheckedElement({
      ...props.element,
      className: val.join(" "),
    });
  }
});
</script>

<template>
  <div class="px-4">
    <p class="flex justify-between items-center">
      <span class="text-base">ClassName</span>
      <span class="badge badge-outline badge-secondary">{{
        classList?.length
      }}</span>
    </p>
    <div class="mt-4 relative">
      <!-- <input
        type="text"
        placeholder="添加 class，回车确认"
        class="input input-bordered input-primary w-full max-w-xs input-sm mb-2"
        v-model="classValue"
        @keyup.enter="addClass"
      /> -->
      <InputSearch :class-list="classList" @change="changeClassList" />

      <div
        class="badge gap-1 mr-2 mt-2"
        v-for="(item, index) in classList"
        :key="item"
      >
        <svg
          @click="delClassList(index)"
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
