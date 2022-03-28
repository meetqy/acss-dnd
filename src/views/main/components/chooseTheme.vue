<template>
  <div class="dropdown">
    <label tabindex="0" class="btn btn-primary">
      主题切换
      <i class="i text-lg ml-2 ic:baseline-cameraswitch"></i>
    </label>
    <div
      tabindex="0"
      class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 max-h-96 overflow-y-auto"
    >
      <div class="grid grid-cols-1 gap-3 p-3">
        <div
          v-for="item in allThemes"
          :key="item"
          class="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2 outline"
          data-act-class="outline"
          :data-theme="item"
          @click="changeTheme(item)"
        >
          <div
            class="bg-base-100 text-base-content w-full cursor-pointer font-sans"
            :data-theme="item"
          >
            <div class="grid grid-cols-5 grid-rows-3">
              <div
                class="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4"
              >
                <div class="flex-grow text-sm font-bold">{{ item }}</div>
                <div class="flex flex-shrink-0 flex-wrap gap-1">
                  <div class="bg-primary w-2 rounded"></div>
                  <div class="bg-secondary w-2 rounded"></div>
                  <div class="bg-accent w-2 rounded"></div>
                  <div class="bg-neutral w-2 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  modelValue: string;
}

const allThemes = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
];

defineProps<Props>();

const changeTheme = (item: string) => {
  emit("update:modelValue", item);
};

const emit = defineEmits(["update:modelValue"]);
</script>
