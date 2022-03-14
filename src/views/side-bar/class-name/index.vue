<script lang="ts" setup>
import { getClasses } from "@/constants/useClasses";
import { useBaseStore } from "@/stores/base";
import type { CheckedElement } from "@/types";
import { ref, watch } from "vue";
import ClassSelect from "../components/class-select/index.vue";

interface Props {
  // 必须要接受 null，不然无法监听选中element
  element: CheckedElement | null;
}

const props = defineProps<Props>();
const baseStore = useBaseStore();

const useableClasses = getClasses();
const options = useableClasses.map((item) => {
  return {
    label: item,
    value: item,
  };
});

// 当前元素的所有class
const classList = ref<string[]>([]);

watch(props, (val) => {
  if (val.element) {
    classList.value = val.element.className
      ? [...val.element.className.split(" ")]
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
      <ClassSelect v-model="classList" :options="options" multiple />
    </div>
  </div>
</template>
