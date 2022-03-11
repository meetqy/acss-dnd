<script setup lang="ts">
import { ref, watch } from "vue";
import { RouterView } from "vue-router";
import { useBaseStore } from "./stores/base";

const isDrawEnd = ref<boolean>(false);
const baseStore = useBaseStore();
watch(baseStore, (store) => {
  isDrawEnd.value = !!store.checkedElement;
});
</script>

<template>
  <!-- <div id="ultraseven" class="w-screen flex relative drawer h-screen">
    <RouterView name="SideBar" />
    <RouterView></RouterView>
    <RouterView name="MenuBar" />
    <RouterView name="ComponentPreview"></RouterView>
  </div> -->

  <div
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

    <div class="drawer-side" :class="{ 'draw-hidden': !isDrawEnd }">
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
