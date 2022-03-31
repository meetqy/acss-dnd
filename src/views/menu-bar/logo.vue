<template>
  <div
    class="z-20 bg-base-100 bg-opacity-90 backdrop-blur sticky top-0 items-center gap-2 px-4 pt-2 hidden lg:flex"
  >
    <a
      aria-current="page"
      aria-label="Homepage"
      class="flex-0 btn btn-ghost px-2"
      style="height: auto"
    >
      <div
        class="font-title text-primary inline-flex items-center text-lg transition-all duration-200 md:text-3xl"
      >
        <img
          style="height: 72px"
          src="https://cdn.cuyang.me/acss-dnd/logo.png?acss-dnd"
        />
      </div>
    </a>
    <a
      href="https://github.com/cu-yang/acss-dnd"
      class="link link-hover font-mono text-xs text-opacity-50 relative -top-5"
    >
      <div :data-tip="pkg.version" class="tooltip tooltip-bottom">
        {{ pkg.version }}
      </div>
    </a>
  </div>
</template>

<script lang="ts" setup>
import pkg from "@/constants/pkg";
</script>
