<template>
  <div class="badge gap-1 mr-1" :class="props.className">
    {{ props.label }}
    <svg
      v-show="props.showClose"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      class="inline-block w-4 h-4 stroke-current cursor-pointer"
      @click="emit('close', $event)"
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
interface Props {
  label: string;
  className?: string;
  showClose?: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: "close", event: MouseEvent): void;
}>();
</script>
