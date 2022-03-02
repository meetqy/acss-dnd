<template>
  <main class="flex-1 bg-gray-100 px-4 h-screen flex flex-col">
    <div class="w-full flex p-5 flex-shrink-0">
      <BtnGroup />
    </div>
    <Browser />
  </main>
</template>

<script lang="ts" setup>
import Browser from "./components/browser.vue";
import BtnGroup from "./components/btn-group.vue";
</script>
