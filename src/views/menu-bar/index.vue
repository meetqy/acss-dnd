<script lang="ts" setup>
interface Props {
  active: string;
}
defineProps<Props>();

const emit = defineEmits<{
  (e: "change", id: string): void;
}>();

const lis = ["文本", "容器"];

const setOpts = (e: Event) => {
  const target = e.target as HTMLElement;
  emit("change", target.id);
};
</script>

<template>
  <aside class="h-screen w-72 bg-white flex-shrink-0 shadow">
    <div class="p-4">
      <h2 class="font-semibold text-lg py-2 text-slate-700">基础</h2>
      <ul @click="setOpts">
        <li
          :class="active === item && 'bg-slate-100'"
          class="nav-item"
          v-for="item in lis"
          :key="item"
          :id="item"
        >
          {{ item }}
        </li>
      </ul>
    </div>
  </aside>
</template>

<style scoped>
.nav-item {
  @apply py-2 px-4 cursor-pointer text-gray-700 hover:bg-slate-100 rounded-lg;
}
</style>
