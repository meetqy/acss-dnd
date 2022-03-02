<template>
  <main class="flex-1 bg-gray-100 px-4 h-screen flex flex-col">
    <div class="w-full flex p-5 flex-shrink-0">
      <Mode v-model="mode" />
    </div>
    <Browser />
  </main>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import Browser from "./components/browser.vue";
import Mode from "./components/mode.vue";

// false  =>  dark
// true   =>  light
const mode = ref<boolean>(false);
</script>
