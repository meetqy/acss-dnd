<script lang="ts" setup>
import { getClasses } from "@/constants/useClasses";
import { useBaseStore } from "@/stores/base";
import type { CheckedElement } from "@/types";
import { onMounted, ref, watch } from "vue";
import InputSearch from "../components/input-search/index.vue";

interface Props {
  // 必须要接受 null，不然无法监听选中element
  element: CheckedElement | null;
}

const props = defineProps<Props>();
const baseStore = useBaseStore();

const useableClasses = ref<string[]>([]);

onMounted(() => {
  useableClasses.value = getClasses();
});

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
  <div>
    <ul
      class="menu bg-base-100 w-full border-t border-base-300 border-opacity-30"
    >
      <li>
        <a
          class="hover:bg-transparent active:bg-base-100 active:text-base-content"
        >
          ClassName
        </a>
      </li>
    </ul>
    <div class="relative px-4">
      <InputSearch
        :useableClasses="useableClasses"
        :class-list="classList"
        placeholder="添加class"
        @change="changeClassList"
      />

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
