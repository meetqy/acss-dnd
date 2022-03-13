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
        <InputSearch
          :class-list="bgClassList"
          :useable-classes="bgUseableClasses"
          placeholder="bg-*"
          input-class="input-secondary border"
          @change="(e) => (bgClassList = e)"
        />
      </div>

      <div
        class="form-control w-full px-4 max-w-xs h-96 absolute top-24 left-0"
      >
        <label class="label">
          <span class="label-text">background-opacity</span>
        </label>
        <InputSearch
          :class-list="bgOpacityClassList"
          :useable-classes="bgOpacityUseableClasses"
          placeholder="bg-opacity-*"
          input-class="input-secondary border"
          @change="(e) => (bgOpacityClassList = e)"
        />
      </div>
      <div class="h-96"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useableClasses } from "@/constants/useClasses";
import type { CheckedElement } from "@/types";
import { classNameToArray } from "@/views/utils";
import { computed, ref, watch } from "vue";
import InputSearch from "../components/input-search/index.vue";

interface Props {
  element: CheckedElement | null;
}

const props = defineProps<Props>();

const classList = computed(() =>
  classNameToArray(props.element?.className || "")
);

const bgClassList = ref<string[]>([]);
const bgUseableClasses = ref<string[]>(useableClasses["background-color"]);

const bgOpacityClassList = ref<string[]>([]);
const bgOpacityUseableClasses = ref<string[]>(
  useableClasses["background-opacity"]
);

// className中获取 background-color
watch(classList, (val) => {
  const res = val.filter((item) => bgUseableClasses.value.includes(item));

  bgClassList.value = [...res];
});

// className中获取 background-opacity
watch(classList, (val) => {
  const res = val.filter((item) =>
    bgOpacityUseableClasses.value.includes(item)
  );

  bgOpacityClassList.value = [...res];
});
</script>
