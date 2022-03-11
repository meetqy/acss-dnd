<script lang="ts" setup>
import { useBaseStore } from "@/stores/base";
import { useEventListener } from "@vueuse/core";
import { ref } from "vue";
import Logo from "./logo.vue";
const baseStore = useBaseStore();

const element = ref<HTMLDivElement>();
useEventListener(element, "mousemove", (e: Event) => {
  const id = (e.target as HTMLElement).id;
  if (id === baseStore.current) return;
  if (id) {
    baseStore.setCurrent(id);
  }
});
</script>

<template>
  <aside
    class="h-screen w-80 bg-base-200 z-50"
    :class="{ hidden: baseStore.checkedElement }"
  >
    <Logo />
    <div class="h-4"></div>
    <ul class="menu menu-compact flex flex-col p-0 px-4" ref="element">
      <li></li>
      <li class="menu-title"><span>基础</span></li>
      <li v-for="item in baseStore.menu" :key="item.id">
        <span :id="item.id">
          {{ item.text }}
        </span>
      </li>
    </ul>
    <!-- <div class="p-4">
      <h2 class="py-2">基础</h2>
      <ul>
        <li
          class="nav-item"
          :class="baseStore.current === item.id && 'bg-primary'"
          v-for="item in baseStore.menu"
          :key="item.id"
          :id="item.id"
        >
          {{ item.text }}
        </li>
      </ul>
    </div> -->
  </aside>
</template>

<style scoped>
.nav-item {
  @apply py-2 px-4 cursor-pointer rounded-lg list-none;
}
</style>
