<template>
  <div tabindex="0" class="collapse bg-base-100 rounded-box collapse-plus">
    <input type="checkbox" class="peer" />
    <div
      class="collapse-title peer-checked:bg-base peer-checked:text-base-content text-xl font-medium"
    >
      Background
    </div>
    <div
      class="collapse-content peer-checked:bg-base peer-checked:text-base-content px-4 relative"
    >
      <div class="form-control w-full max-w-xs border-t border-base-300">
        <label class="label">
          <span class="label-text">
            颜色（<span class="text-secondary">background-color</span>）
          </span>
        </label>
        <ClassSelect
          :options="options.color"
          :model-value="value.color"
          @update:model-value="(e) => changeValue(e, 'color')"
        >
          <template #lead="{ item }">
            <div class="badge badge-lg mr-2" :class="item.value" />
          </template>
        </ClassSelect>
      </div>

      <div class="form-control w-full max-w-xs">
        <label class="label">
          <span class="label-text">
            透明度 （<span class="text-secondary">background-opacity</span>）
          </span>
        </label>
        <ClassSelect
          :options="options.opacity"
          :model-value="value.opacity"
          @update:model-value="(e) => changeValue(e, 'opacity')"
        ></ClassSelect>
      </div>

      <div class="form-control w-full max-w-xs">
        <label class="label">
          <span class="label-text">
            效果（<span class="text-secondary">background</span>）
          </span>
        </label>
        <ClassSelect
          :options="options.effect"
          :model-value="value.effect"
          @update:model-value="(e) => changeValue(e, 'effect')"
        ></ClassSelect>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { daisyuiFilter, getDaisyui } from "@/constants/daisyui";
import { useBaseStore } from "@/stores/base";
import type { CheckedElement } from "@/types";
import { createOptions, usageClassFilter } from "@/views/utils";
import { computed, reactive, watch } from "vue";
import type { ClassSelectOption } from "../components/class-select";
import ClassSelect from "../components/class-select/index.vue";

interface Props {
  element: CheckedElement | null;
}

const props = defineProps<Props>();
const baseStore = useBaseStore();

// 当前元素的所有class
const classList = computed(() =>
  props.element?.className ? props.element?.className.split(" ") : []
);

// 所有options
const options = reactive<{
  color: ClassSelectOption[];
  opacity: ClassSelectOption[];
  effect: ClassSelectOption[];
}>({
  color: getDaisyui("bg"),
  opacity: createOptions("background-opacity"),
  effect: createOptions("background"),
});

interface ValueType {
  color: string[];
  opacity: string[];
  effect: string[];
}

// 所有value
const value = reactive<ValueType>({
  color: [],
  opacity: [],
  effect: [],
});

watch(classList, (val) => {
  value.color = daisyuiFilter(val, "bg");
  value.opacity = usageClassFilter(val, "background-opacity");
  value.effect = usageClassFilter(val, "background");
});

const changeValue = (modelValue: string[], name: keyof ValueType) => {
  const temp = classList.value;
  let currentValue = value[name];
  const oldIndex = temp.indexOf(currentValue[0]);

  if (oldIndex > -1) {
    if (modelValue.length === 0) {
      // 删除
      temp.splice(oldIndex, 1);
    } else {
      // 替换
      temp.splice(oldIndex, 1, modelValue[0]);
    }
  } else {
    // 新增
    temp.push(modelValue[0]);
  }

  if (props.element) {
    baseStore.updateCheckedElement({
      ...props.element,
      className: temp.join(" "),
    });
  }

  value[name] = modelValue;
};
</script>
