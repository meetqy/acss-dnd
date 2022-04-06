<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { RouterView, useRoute } from "vue-router";
import { useBaseStore } from "./stores/base";
import initTemp from "./template";
import "@acss-dnd/template/dist/style.css";

const baseStore = useBaseStore();

onMounted(async () => {
  // 初始化模板
  const menu = initTemp();
  baseStore.initMenu(menu);
});

const isDrawEnd = ref<boolean>(false);

watch(baseStore, (store) => {
  isDrawEnd.value = !!store.checkedElement;
});

const route = useRoute();

const routeName = computed(() => route.name);
</script>

<template>
  <template v-if="routeName === 'iframe'">
    <RouterView></RouterView>
  </template>
  <div
    v-else
    class="drawer h-screen w-full drawer-mobile"
    :class="{ 'drawer-end': isDrawEnd }"
  >
    <input id="drawer-left" type="checkbox" class="drawer-toggle" />
    <input id="drawer-right" type="checkbox" class="drawer-toggle" />

    <div class="drawer-content flex justify-center">
      <RouterView></RouterView>
    </div>

    <div class="drawer-side" :class="{ 'draw-hidden': isDrawEnd }">
      <label for="drawer-left" class="drawer-overlay"></label>
      <RouterView name="MenuBar" />
      <RouterView name="ComponentPreview" />
    </div>

    <div
      class="drawer-side"
      style="overflow: hidden"
      :class="{ 'draw-hidden': !isDrawEnd }"
    >
      <label for="drawer-right" class="drawer-overlay"></label>
      <RouterView name="SideBar" />
    </div>
  </div>
</template>
<style scoped>
.draw-hidden {
  display: none !important;
}
</style>
