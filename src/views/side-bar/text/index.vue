<template>
  <div tabindex="0" class="collapse collapse-plus bg-base-100 rounded-box">
    <input type="checkbox" class="peer" ref="collapse" />
    <div class="collapse-title text-xl font-medium">Text</div>
    <div class="collapse-content relative">
      <div v-if="isShow">
        <div
          class="form-control w-full max-w-xs mb-2"
          v-for="(item, index) in childNodes"
          :key="index"
        >
          <label class="label">
            <span class="label-text">
              <i class="text-primary font-medium">nodeName</i>:
              {{ item.nodeName }}
            </span>
          </label>
          <input
            type="text"
            placeholder="输入文本"
            class="input w-full max-w-xs input-primary"
            v-model="item.textContent"
            @input="changeNodes"
          />
        </div>
      </div>

      <div class="form-control w-full max-w-xs">
        <label class="label">
          <span class="label-text">
            文本颜色 （<span class="text-secondary">text-color</span>）
          </span>
        </label>
        <ClassSelect
          :options="options.color"
          :model-value="value.color"
          @update:model-value="(e) => changeValue(e, 'color')"
        >
          <template #lead="{ item }">
            <button
              class="btn btn-circle btn-xs mr-2 glass"
              :class="item.value"
            >
              A
            </button>
          </template>
        </ClassSelect>
      </div>
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
  element: CheckedElement | null;
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
// 1.获取当前选中的元素
// 2.根据元素组装一个innerHTML
// 3.获取里面所有的childNodes
// 4.渲染到页面
// 5.双向绑定
// 6.组装改变之后的元素
// watch不能监听到childNodes,所以通过@input触发去代替
const childNodes = ref<Node[]>();

watch(props, (val) => {
  const el = val.element;
  if (el) {
    const div = document.createElement("div");
    div.innerHTML = `<${el.tagName} class="${el.className}">${el.innerHTML}</${el.tagName}>`;
    const original = div.querySelector("*");
    if (original) {
      childNodes.value = [...original.childNodes];
    }
  }
});

const changeNodes = () => {
  const el = props.element;
  if (el) {
    const newEl = document.createElement(el.tagName);
    newEl.className = el.className;
    childNodes.value?.forEach((item) => {
      newEl.appendChild(item);
    });

    baseStore.updateCheckedElement({
      ...props.element,
      innerHTML: newEl.innerHTML,
    });
  }
};

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
<style scoped>
.collapse-content > div:first-child {
  @apply border-t border-base-300 pt-4 mb-1;
}
</style>
