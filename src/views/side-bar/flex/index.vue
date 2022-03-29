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
            <input type="checkbox" :checked="direction" />

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
            :class="{ 'btn-active': curJustify === 0 }"
            @click="changeJustify(0)"
          >
            <span title="justify-start">
              <ic:baseline-align-horizontal-left />
            </span>
          </button>

          <button
            class="btn btn-outline"
            :class="{ 'btn-active': curJustify === 1 }"
            @click="changeJustify(1)"
          >
            <span title="justify-between">
              <radix-icons:space-between-horizontally />
            </span>
          </button>
          <button
            class="btn btn-outline"
            :class="{ 'btn-active': curJustify === 2 }"
            @click="changeJustify(2)"
          >
            <span title="justify-around">
              <fluent:align-space-between-horizontal-20-filled />
            </span>
          </button>
          <button
            class="btn btn-outline"
            :class="{ 'btn-active': curJustify === 3 }"
            @click="changeJustify(3)"
          >
            <span title="justify-center">
              <ic:baseline-align-horizontal-center />
            </span>
          </button>
          <button
            class="btn btn-outline"
            :class="{ 'btn-active': curJustify === 4 }"
            @click="changeJustify(4)"
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
            :class="{ 'btn-active': curItem === 0 }"
            @click="changeItem(0)"
          >
            <span title="item-start" class="rotate-90">
              <ic:baseline-align-horizontal-left />
            </span>
          </button>
          <button
            class="btn btn-outline"
            :class="{ 'btn-active': curItem === 1 }"
            @click="changeItem(1)"
          >
            <span title="item-center" class="rotate-90">
              <ic:baseline-align-horizontal-center />
            </span>
          </button>
          <button
            class="btn btn-outline"
            :class="{ 'btn-active': curItem === 2 }"
            @click="changeItem(2)"
          >
            <span title="item-end" class="rotate-90">
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

import { computed, ref } from "vue";

interface Props {
  element: CheckedElement | null;
}

// 当前元素的所有class
const classList = computed(() =>
  props.element?.className ? props.element?.className.split(" ") : []
);

const props = defineProps<Props>();

const direction = ref<boolean>(false);

const baseStore = useBaseStore();

const curJustify = ref(0);
const justify = [
  "justify-start",
  "justify-between",
  "justify-around",
  "justify-center",
  "justify-end",
];
const changeJustify = (num: number) => {
  curJustify.value = num;
};

const item = ["item-start", "item-center", "item-end"];
const curItem = ref(0);
const changeItem = (num: number) => {
  curItem.value = num;
  // baseStore.updateCheckedElement({
  //   ...props.element,
  //   className:
  // });
};
</script>
