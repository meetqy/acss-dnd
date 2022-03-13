<template>
  <div>
    <div class="dropdown w-full max-h-96 h-full">
      <label tabindex="0" class="w-full relative">
        <input
          type="text"
          class="input w-full max-w-xs mb-2 input-bordered input-primary"
          :placeholder="props.placeholder"
          v-model="inputValue"
        />
      </label>
      <ul
        tabindex="0"
        class="dropdown-content menu menu-compact p-2 shadow bg-base-100 rounded-box w-full max-h-80 overflow-y-scroll scrollbar"
      >
        <li v-for="item in searchResult" :key="item.value">
          <a class="flex justify-between" @click="change(item)">
            {{ item.label }}
            <svg
              v-show="props.modelValue.includes(item.value)"
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-success"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </a>
        </li>
      </ul>
    </div>
    <div
      tabindex="0"
      class="collapse border border-base-300 bg-base-100 rounded-box"
    >
      <input type="checkbox" />
      <div class="collapse-title flex justify-between items-center">
        <div v-if="value.length > 0">
          <Badge
            class-name="badge-primary"
            v-for="item in value.slice(0, 1)"
            :key="item"
            :label="item"
          />
        </div>

        <button class="btn btn-xs btn-ghost">···</button>
      </div>
      <div class="collapse-content">
        <Badge
          class-name="badge-accent"
          v-for="(item, index) in value"
          :key="item"
          :label="item"
          show-close
          @close="() => value.splice(index, 1)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import Badge from "./badge.vue";

interface Props {
  modelValue: string[];
  options: Option[];
  placeholder?: string;
  multiple?: boolean;
}

type Option = {
  label: string;
  value: string;
};

const props = withDefaults(defineProps<Props>(), {
  placeholder: "选择class",
  multiple: false,
});

const emit = defineEmits<{
  (e: "update:modelValue", value: string[]): void;
}>();

const value = ref<string[]>(props.modelValue);
watch(value, (val) => emit("update:modelValue", val));
const change = (opt: Option) => {
  // 单选
  if (!props.multiple) value.value = [...opt.value];
  const index = value.value.indexOf(opt.value);
  if (index === -1) {
    value.value.push(opt.value);
  } else {
    value.value.splice(index, 1);
  }
};

// 当前搜索返回的class
const searchResult = ref<Option[]>(props.options);

const inputValue = ref();
watch(inputValue, (e) => {
  if (!e) searchResult.value = props.options;
  searchResult.value = props.options.filter(
    (item) => item.label.indexOf(e) > -1
  );
});
</script>

<style scoped>
.collapse-title,
.collapse > input[type="checkbox"] {
  @apply min-h-0 pr-4;
}
</style>
