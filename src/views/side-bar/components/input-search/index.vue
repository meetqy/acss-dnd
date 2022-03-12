<template>
  <div class="dropdown w-full max-h-96 h-full">
    <label tabindex="0" class="w-full">
      <input
        type="text"
        :placeholder="props.placeholder"
        class="input w-full max-w-xs mb-2"
        :class="props.inputClass"
        @input="search"
        @focus="search"
      />
    </label>
    <ul
      tabindex="0"
      class="dropdown-content menu menu-compact p-2 shadow bg-base-100 rounded-box w-full max-h-80 overflow-y-scroll scrollbar"
    >
      <li v-for="item in showClasses" :key="item">
        <a
          @click="addClass(item)"
          :class="{ active: classList.includes(item) }"
        >
          {{ item }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { onClickOutside } from "@vueuse/core";
import { ref } from "vue";

interface Props {
  classList: string[];
  useableClasses: string[];
  placeholder?: string;
  inputClass?: string;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: "",
  inputClass: "input-bordered input-primary",
});

const showClasses = ref<string[]>([]);

const target = ref();
onClickOutside(target, () => (showClasses.value = []));

const emit = defineEmits(["change"]);

const addClass = (className: string) => {
  if (props.classList.includes(className)) return;
  emit("change", [...props.classList, className]);
};

const search = (e: Event) => {
  const value = (e.target as HTMLInputElement).value;
  if (!value) return (showClasses.value = props.useableClasses);
  showClasses.value = props.useableClasses.filter(
    (item) => item.indexOf(value) > -1
  );
};
</script>
