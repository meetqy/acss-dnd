<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <div id="ultraseven" class="w-screen flex relative">
    <RouterView name="SideBar" />
    <RouterView></RouterView>
    <RouterView name="MenuBar" />
  </div>
</template>
