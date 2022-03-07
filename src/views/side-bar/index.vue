<script setup lang="ts">
import { onMounted } from "vue";
import { iframeIo, IframeIoType } from "../iframe.io";

onMounted(() => {
  iframeIo.on(IframeIoType.componentToOpt, (data) => {
    console.log(data);
  });
});
</script>

<template>
  <aside class="h-screen w-72 bg-white flex-shrink-0 shadow hidden">
    <p>
      <button>add Node</button>
    </p>
    <div>
      <span>className: </span>
      <input type="text" placeholder="输入className" />
    </div>
  </aside>
</template>
