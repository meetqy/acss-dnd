<template>
  <div class="relative">
    <input
      type="text"
      placeholder="添加 class，回车确认"
      class="input input-bordered input-primary w-full max-w-xs input-sm mb-2"
      @input="search"
    />
    <ul
      class="w-full max-h-96 border rounded-md overflow-y-auto scrollbar cursor-pointer text-neutral bg-primary-content"
      :class="showClasses.length > 0 ? 'block' : 'hidden'"
      ref="target"
    >
      <li
        v-for="item in showClasses"
        :key="item"
        @click="addClass(item)"
        class="px-4 py-1"
        :class="
          classList.includes(item)
            ? 'bg-primary'
            : 'bg-transparent hover:bg-primary'
        "
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { getClasses } from "@/useClasses";
import { onClickOutside } from "@vueuse/core";
import { onMounted, ref } from "vue";
const useableClasses = ref<string[]>([]);

interface Props {
  classList: string[];
}

const props = withDefaults(defineProps<Props>(), {
  classList: () => [],
});

onMounted(() => {
  useableClasses.value = getClasses();
});

const target = ref();
onClickOutside(target, () => (showClasses.value = []));

const emit = defineEmits(["change"]);

const addClass = (className: string) => {
  if (props.classList.includes(className)) return;
  emit("change", [...props.classList, className]);
};

const showClasses = ref<string[]>([]);

const search = (e: Event) => {
  const value = (e.target as HTMLInputElement).value;
  if (!value) return;
  showClasses.value = useableClasses.value.filter(
    (item) => item.indexOf(value) > -1
  );
};
</script>
