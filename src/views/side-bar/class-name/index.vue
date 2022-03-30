<script lang="ts" setup>
import { useBaseStore } from "@/stores/base";
import { useClassesStore } from "@/stores/classes";
import type { CheckedElement } from "@/types";
import { ref, watch } from "vue";
import ClassSelect from "../components/class-select/index.vue";

interface Props {
  // 必须要接受 null，不然无法监听选中element
  element: CheckedElement | null;
}

const props = defineProps<Props>();
const baseStore = useBaseStore();
const classesStore = useClassesStore();

const options = classesStore.getClassesOptions();

// 当前元素的所有class
const classList = ref<string[]>([]);

watch(props, (val) => {
  if (val.element) {
    classList.value = val.element.className
      ? [...val.element.className.split(" ")]
      : [];
  }
});

const changeValue = (modelValue: string[]) => {
  classList.value = modelValue;

  if (props.element) {
    baseStore.updateCheckedElement({
      ...props.element,
      className: modelValue.join(" "),
    });
  }
};
</script>

<template>
  <div>
    <ul class="menu bg-base-100 w-full">
      <li>
        <a
          class="hover:bg-transparent active:bg-base-100 active:text-base-content text-xl font-medium"
        >
          ClassName
        </a>
      </li>
    </ul>
    <div class="relative px-4">
      <ClassSelect
        :model-value="classList"
        :options="options"
        @update:model-value="changeValue"
        multiple
      />
    </div>
  </div>
</template>
