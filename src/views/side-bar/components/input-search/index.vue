<template>
  <div class="relative">
    <input
      type="text"
      placeholder="添加 class，回车确认"
      class="input input-bordered input-primary w-full max-w-xs mb-2"
      @input="search"
    />
    <div
      class="w-full max-h-96 overflow-y-scroll absolute z-20 scrollbar pr-2 bg-base-100"
    >
      <ul
        class="w-full menu menu-compact p-2 relative z-20 bg-base-200"
        :class="showClasses.length > 0 ? 'block' : 'hidden'"
        ref="target"
      >
        <li v-for="item in showClasses" :key="item">
          <a
            @click="addClass(item)"
            :class="{ active: classList.includes(item) }"
          >
            {{ item }}
          </a>
        </li>
      </ul>
    </div>
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
