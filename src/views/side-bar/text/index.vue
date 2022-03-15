<template>
  <div
    tabindex="0"
    class="collapse collapse-plus bg-base-100 rounded-box"
    :class="{ hidden: !isShow }"
  >
    <input type="checkbox" class="peer" ref="collapse" />
    <div class="collapse-title text-xl font-medium">Text</div>
    <div class="collapse-content relative">
      <div class="border-t border-base-300 pt-4">
        <input
          type="text"
          placeholder="输入文本"
          class="input w-full max-w-xs input-primary"
          v-model="innerText"
        />
      </div>

      <div
        class="form-control w-full px-4 max-w-xs h-96 absolute top-16 left-0"
      >
        <label class="label">
          <span class="label-text">
            文本颜色 （<span class="text-secondary">text-color</span>）
          </span>
        </label>
        <ClassSelect
          :options="options.color"
          :model-value="value.color"
          @update:model-value="(e) => changeValue(e, 'color')"
        />
      </div>
      <div class="h-96"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { TextNode } from "@/constants";
import { useBaseStore } from "@/stores/base";
import type { CheckedElement } from "@/types";
import { createOptions, usageClassFilter } from "@/views/utils";
import { computed, reactive, ref, watch } from "vue";
import type { ClassSelectOption } from "../components/class-select";
import ClassSelect from "../components/class-select/index.vue";

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

// 当前元素的所有class
const classList = computed(() =>
  props.element?.className ? props.element.className.split(" ") : []
);

const options = reactive<{
  color: ClassSelectOption[];
}>({
  color: createOptions("text-color"),
});

interface ValueType {
  color: string[];
}

const value = reactive<ValueType>({ color: [] });
watch(classList, (val) => {
  value.color = usageClassFilter(val, "text-color");
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
    console.log(temp, "111");
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
