<template>
  <main
    @drop="ondrop"
    @dragenter="ondragenter"
    @dragleave="ondragleave"
    class="w-screen h-screen border-primary rounded-b-xl"
    :class="isEnter ? 'border-2' : 'border-0'"
  ></main>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const isEnter = ref<boolean>(false);
const ondrop = (e: Event) => {
  e.preventDefault();
  e.stopPropagation();
  isEnter.value = false;
  console.log(e, "drop");
};

const ondragenter = (e: Event) => {
  e.preventDefault();
  e.stopPropagation();
  isEnter.value = true;
  console.log(e, "ondragenter");
};

const ondragleave = (e: Event) => {
  e.preventDefault();
  e.stopPropagation();
  isEnter.value = false;
  console.log(e, "ondragleave");
};
</script>
