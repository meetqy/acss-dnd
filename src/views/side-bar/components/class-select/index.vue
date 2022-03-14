<template>
  <div>
    <div class="dropdown w-full max-h-96 h-full relative">
      <label tabindex="0" class="w-full">
        <input
          id="class-select-input"
          ref="inputRef"
          type="text"
          class="input w-full max-w-xs mb-2 input-bordered input-primary"
          :placeholder="props.placeholder"
          v-model="inputValue"
          :style="{ paddingLeft: inputPaddingLeft + 'px' }"
        />
      </label>

      <div
        class="max-w-xs w-full mb-2 h-12 rounded-md absolute top-0 left-0 flex items-center pl-4 cursor-text"
        @click="dropdownOpen"
        v-show="!props.multiple && value.length > 0"
      >
        <Badge
          :label="value[0] || ''"
          show-close
          class-name="badge-accent"
          @close="delValueByIndex(0)"
          @el-change="badgeElChange"
        />
      </div>

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
      v-show="props.multiple && value.length > 0"
    >
      <input type="checkbox" />
      <div class="collapse-title flex justify-between items-center">
        <div>
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
          @close="delValueByIndex(index)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import type { ClassSelectOption } from ".";
import Badge from "./badge.vue";

interface Props {
  modelValue: string[];
  options: ClassSelectOption[];
  placeholder?: string;
  multiple?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: "选择class",
  multiple: false,
});

const emit = defineEmits<{
  (e: "update:modelValue", value: string[]): void;
}>();

const inputPaddingLeft = ref<number>();
const badgeElChange = (element: HTMLElement) => {
  inputPaddingLeft.value = element.clientWidth + 16 + 16;
};

const inputRef = ref<HTMLElement>();
const dropdownOpen = () => {
  inputRef.value?.focus();
};

const value = ref<string[]>([]);
// 不能使用watch value，然后 emit方式
// 这里要监听props改变给value赋值，如果在watch value 会死循环
watch(props, (p) => (value.value = p.modelValue));
const change = (opt: ClassSelectOption) => {
  // 单选
  if (!props.multiple) {
    value.value = [opt.value];
    return emit("update:modelValue", value.value);
  }
  const index = value.value.indexOf(opt.value);
  if (index === -1) {
    value.value.push(opt.value);
  } else {
    value.value.splice(index, 1);
  }

  value.value = [...value.value];
  emit("update:modelValue", value.value);
};
const delValueByIndex = (index: number) => {
  value.value.splice(index, 1);
  value.value = [...value.value];
  emit("update:modelValue", value.value);
};

// 当前搜索返回的class
const searchResult = ref<ClassSelectOption[]>();
onMounted(() => {
  searchResult.value = props.options || [];
});

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
