<template>
  <div tabindex="0" class="collapse collapse-plus bg-base-100 rounded-box">
    <input type="checkbox" class="peer" />
    <div
      class="collapse-title peer-checked:bg-base peer-checked:text-base-content text-xl font-medium"
    >
      Flex
    </div>
    <div class="collapse-content">
      <div class="form-control">
        <label class="label cursor-pointer">
          <span class="label-text">
            方向 （<span class="text-secondary"> 横向 or 垂直 </span>）
          </span>
          <label class="swap swap-flip">
            <input
              type="checkbox"
              :value="direction"
              :checked="direction === 'flex-col'"
              @input="changeDirection"
            />

            <span class="swap-on fill-current text-warning text-xl">
              <mdi:arrow-up-down-bold />
            </span>
            <span class="swap-off fill-current text-success text-xl">
              <mdi:arrow-left-right-bold />
            </span>
          </label>
        </label>
      </div>

      <div class="form-control w-full max-w-xs border-t border-base-300">
        <label class="label">
          <span class="label-text">
            对齐方式（<span class="text-secondary">row</span>）
          </span>
        </label>
        <div class="btn-group">
          <button
            class="btn btn-outline"
            :class="{ 'btn-active': curJustify === 'justify-start' }"
            @click="changeJustify('justify-start')"
          >
            <span title="justify-start">
              <ic:baseline-align-horizontal-left />
            </span>
          </button>

          <button
            class="btn btn-outline"
            :class="{ 'btn-active': curJustify === 'justify-between' }"
            @click="changeJustify('justify-between')"
          >
            <span title="justify-between">
              <radix-icons:space-between-horizontally />
            </span>
          </button>
          <button
            class="btn btn-outline"
            :class="{ 'btn-active': curJustify === 'justify-around' }"
            @click="changeJustify('justify-around')"
          >
            <span title="justify-around">
              <fluent:align-space-between-horizontal-20-filled />
            </span>
          </button>
          <button
            class="btn btn-outline"
            :class="{ 'btn-active': curJustify === 'justify-center' }"
            @click="changeJustify('justify-center')"
          >
            <span title="justify-center">
              <ic:baseline-align-horizontal-center />
            </span>
          </button>
          <button
            class="btn btn-outline"
            :class="{ 'btn-active': curJustify === 'justify-end' }"
            @click="changeJustify('justify-end')"
          >
            <span title="justify-end">
              <ic:baseline-align-horizontal-right />
            </span>
          </button>
        </div>
      </div>
      <div class="form-control w-full max-w-xs border-t border-base-300 mt-4">
        <label class="label">
          <span class="label-text">
            对齐方式（<span class="text-secondary">col</span>）
          </span>
        </label>
        <div class="btn-group">
          <button
            class="btn btn-outline"
            :class="{ 'btn-active': curItems === 'items-start' }"
            @click="changeItem('items-start')"
          >
            <span title="items-start" class="rotate-90">
              <ic:baseline-align-horizontal-left />
            </span>
          </button>
          <button
            class="btn btn-outline"
            :class="{ 'btn-active': curItems === 'items-center' }"
            @click="changeItem('items-center')"
          >
            <span title="items-center" class="rotate-90">
              <ic:baseline-align-horizontal-center />
            </span>
          </button>
          <button
            class="btn btn-outline"
            :class="{ 'btn-active': curItems === 'items-end' }"
            @click="changeItem('items-end')"
          >
            <span title="items-end" class="rotate-90">
              <ic:baseline-align-horizontal-right />
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useBaseStore } from "@/stores/base";
import type { CheckedElement } from "@/types";
import { useableClasses } from "@/constants/useClasses";

import { computed, ref, watch } from "vue";
import { usageClassFilter } from "@/views/utils";

interface Props {
  element: CheckedElement | null;
}

const props = defineProps<Props>();

type Direction = "flex-col" | "flex-row";

// 当前元素的所有class
const classList = computed(() =>
  props.element?.className ? props.element?.className.split(" ") : []
);

watch(classList, (val) => {
  curJustify.value =
    usageClassFilter(val, "flex-justify")[0] || "justify-start";
  curItems.value = usageClassFilter(val, "flex-items")[0] || "items-start";
});

// 处理 className
const handleClass = (origin: string[], value: string): string[] => {
  const temp = classList.value;
  const index = temp.findIndex((item) => origin.includes(item));
  index > -1 ? temp.splice(index, 1, value) : temp.push(value);

  // 判断是否存在flex
  if (!temp.includes("flex")) temp.push("flex");
  return temp;
};

const direction = ref<Direction>("flex-row");
const changeDirection = (e: Event) => {
  const value = (e.currentTarget as HTMLInputElement).value;
  direction.value = value === "flex-row" ? "flex-col" : "flex-row";

  props.element &&
    baseStore.updateCheckedElement({
      ...props.element,
      className: handleClass(
        useableClasses["flex-direction"],
        direction.value
      ).join(" "),
    });
};

const baseStore = useBaseStore();

const curJustify = ref("justify-start");
const justify = useableClasses["flex-justify"];
const changeJustify = (str: string) => {
  curJustify.value = str;

  props.element &&
    baseStore.updateCheckedElement({
      ...props.element,
      className: handleClass(justify, curJustify.value).join(" "),
    });
};

const items = useableClasses["flex-items"];
const curItems = ref("items-start");
const changeItem = (str: string) => {
  curItems.value = str;

  props.element &&
    baseStore.updateCheckedElement({
      ...props.element,
      className: handleClass(items, curItems.value).join(" "),
    });
};
</script>
