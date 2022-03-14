<template>
  <div tabindex="0" class="collapse bg-base-100 rounded-box collapse-plus">
    <input type="checkbox" class="peer" />
    <div
      class="collapse-title peer-checked:bg-base peer-checked:text-base-content"
    >
      Background
    </div>
    <div
      class="collapse-content peer-checked:bg-base peer-checked:text-base-content px-4 relative"
    >
      <div class="form-control w-full max-w-xs border-t border-base-300 h-96">
        <label class="label">
          <span class="label-text">background-color</span>
        </label>
        <ClassSelect
          :options="options.bg"
          :model-value="bgValue"
          @update:model-value="changeBgValue"
        />
      </div>

      <div
        class="form-control w-full px-4 max-w-xs h-96 absolute top-24 left-0"
      >
        <label class="label">
          <span class="label-text">background-opacity</span>
        </label>
        <ClassSelect
          :options="options.bgOpacity"
          :model-value="bgOpacityValue"
          @update:model-value="changeBgOpacityValue"
        />
      </div>
      <div class="h-96"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useableClasses } from "@/constants/useClasses";
import { useBaseStore } from "@/stores/base";
import type { CheckedElement } from "@/types";
import { computed, reactive, ref, watch } from "vue";
import type { ClassSelectOption } from "../components/class-select";
import ClassSelect from "../components/class-select/index.vue";

interface Props {
  element: CheckedElement | null;
}

const props = defineProps<Props>();
const baseStore = useBaseStore();

const options = reactive<{
  bg: ClassSelectOption[];
  bgOpacity: ClassSelectOption[];
}>({
  bg: createOptions("background-color"),
  bgOpacity: createOptions("background-opacity"),
});

// 当前元素的所有class
const classList = computed(() => props.element?.className.split(" ") || []);

const bgValue = ref<string[]>([]);
const bgOpacityValue = ref<string[]>([]);
watch(classList, (val) => {
  bgValue.value = val.filter((item) =>
    useableClasses["background-color"].includes(item)
  );

  bgOpacityValue.value = val.filter((item) =>
    useableClasses["background-opacity"].includes(item)
  );
});

const changeBgValue = (value: string[]) => changeValue(value, "bg");
const changeBgOpacityValue = (value: string[]) =>
  changeValue(value, "bgOpacity");

const changeValue = (value: string[], name: "bg" | "bgOpacity") => {
  const temp = classList.value;
  const currentValue = name === "bg" ? bgValue.value : bgOpacityValue.value;
  const oldIndex = temp.indexOf(currentValue[0]);

  if (oldIndex > -1) {
    if (value.length === 0) {
      // 删除
      temp.splice(oldIndex, 1);
    } else {
      // 替换
      temp.splice(oldIndex, 1, value[0]);
    }
  } else {
    // 新增
    temp.push(value[0]);
  }

  if (props.element) {
    baseStore.updateCheckedElement({
      ...props.element,
      className: temp.join(" "),
    });
  }

  name === "bg" ? (bgValue.value = value) : (bgOpacityValue.value = value);
};

// 创建对应的options
function createOptions(name: string): ClassSelectOption[] {
  return useableClasses[name].map((item) => {
    return {
      label: item,
      value: item,
    };
  });
}
</script>
