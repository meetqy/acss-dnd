<template>
  <div tabindex="0" class="collapse collapse-arrow bg-base-100 rounded-box">
    <input type="checkbox" class="peer" />
    <div
      class="collapse-title peer-checked:bg-base peer-checked:text-base-content"
    >
      Background
    </div>
    <div
      class="collapse-content peer-checked:bg-base peer-checked:text-base-content"
    >
      <p>tabindex="0" attribute is necessary to make the div focusable</p>
    </div>
  </div>
</template>

<script lang="ts" setup></script>
