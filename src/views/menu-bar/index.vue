<script lang="ts" setup>
import { useMenuStore } from "@/stores/menu";
import { useEventListener } from "@vueuse/core";
import { ref } from "vue";
const menuStore = useMenuStore();

const element = ref<HTMLDivElement>();
useEventListener(element, "mousemove", (e: Event) => {
  const id = (e.target as HTMLElement).id;
  if (id) {
    menuStore.setCurrent(id);
  }
});
</script>

<template>
  <aside
    ref="element"
    class="h-screen w-72 bg-white flex-shrink-0 shadow relative z-20"
  >
    <div class="p-4">
      <h2 class="font-semibold text-lg py-2 text-slate-700">基础</h2>
      <ul>
        <li
          class="nav-item"
          :class="menuStore.current === item.id && 'bg-slate-100'"
          v-for="item in menuStore.menu"
          :key="item.id"
          :id="item.id"
        >
          {{ item.text }}
        </li>
      </ul>
    </div>
  </aside>
</template>

<style scoped>
.nav-item {
  @apply py-2 px-4 cursor-pointer text-gray-700 rounded-lg;
}
</style>
