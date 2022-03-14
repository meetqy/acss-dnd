<template>
  <div class="px-4">
    <ClassSelect :options="options" v-model="value" multiple />
  </div>
</template>

<script lang="ts" setup>
import { getClasses } from "@/constants/useClasses";
import { ref, watch } from "vue";
import ClassSelect from "../components/class-select/index.vue";

const options = ref<{ label: string; value: string }[]>(
  getClasses().map((item) => {
    return {
      label: item,
      value: item,
    };
  })
);

const value = ref<string[]>(["bg-yellow-500", "text-red-500"]);
watch(value, (e) => {
  console.log(e);
});
</script>
