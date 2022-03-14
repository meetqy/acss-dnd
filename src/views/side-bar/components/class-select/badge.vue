<template>
  <div class="badge gap-1 mr-1" :class="props.className" :id="uuid">
    {{ props.label }}
    <svg
      v-show="props.showClose"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      class="inline-block w-4 h-4 stroke-current cursor-pointer"
      @click.stop="emit('close', $event)"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M6 18L18 6M6 6l12 12"
      ></path>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { v4 } from "uuid";
import { watch } from "vue";

interface Props {
  label: string;
  className?: string;
  showClose?: boolean;
}

const props = defineProps<Props>();

const uuid = v4();

watch(props, () => {
  setTimeout(() => {
    const el = document.getElementById(uuid);
    el && emit("elChange", el);
  });
});

const emit = defineEmits<{
  (e: "close", event: MouseEvent): void;
  (e: "elChange", element: HTMLElement): void;
}>();
</script>
