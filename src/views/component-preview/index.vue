<template>
  <div
    ref="element"
    class="w-full h-full absolute transition-opacity"
    :class="menuStore.current ? 'opacity-100' : 'opacity-0'"
  >
    <div class="mask mask-show" id="mask"></div>
    <div
      class="component-preview"
      :class="menuStore.current ? 'left-72' : '-left-72'"
    ></div>
  </div>
</template>

<script lang="ts" setup>
import { useMenuStore } from "@/stores/menu";
import { useEventListener } from "@vueuse/core";
import { ref } from "vue";

const menuStore = useMenuStore();

const element = ref<HTMLElement>();
useEventListener(element, "mousemove", (e: Event) => {
  const id = (e.target as HTMLElement).id;
  if (id === "mask") {
    menuStore.checked("");
  }
});

useEventListener(element, "transitionend", (e) => {
  const target = e.target as HTMLElement;
  menuStore.current
    ? target.classList.remove("hidden")
    : target.classList.add("hidden");
});
</script>

<style scoped>
.mask {
  @apply left-0 absolute top-0 w-full h-full -z-10;
}
.mask-show {
  @apply z-10 bg-black bg-opacity-60;
}

.component-preview {
  width: 520px;
  @apply bg-slate-50 h-full absolute transition-all z-20;
}
</style>
