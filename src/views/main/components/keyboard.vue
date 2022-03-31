<template>
  <!-- The button to open modal -->
  <label for="my-modal-keyboard" class="btn modal-button mr-4">
    快捷键
    <span class="ml-2 text-lg">
      <fa6-regular:keyboard />
    </span>
  </label>

  <!-- Put this part before </body> tag -->
  <input type="checkbox" id="my-modal-keyboard" class="modal-toggle" />
  <label for="my-modal-keyboard" class="modal cursor-pointer">
    <label class="modal-box relative w-11/12 max-w-5xl" for="my-modal-keyboard">
      <table class="table w-full">
        <!-- head -->
        <thead>
          <tr>
            <th>快捷键</th>
            <th>功能</th>
          </tr>
        </thead>
        <tbody>
          <!-- row 1 -->
          <tr v-for="(item, i) in kbds" :key="i" class="hover">
            <td>
              <div
                v-for="(kbd, index) in item.kbd"
                :key="kbd"
                class="inline-block"
              >
                <kbd class="kbd">
                  {{ kbd }}
                </kbd>
                <span v-if="index < item.kbd.length - 1">&nbsp;+&nbsp;</span>
              </div>
            </td>
            <td>{{ item.title }}</td>
          </tr>
        </tbody>
      </table>
    </label>
  </label>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const kbds = ref([
  {
    title: "删除选中元素",
    kbd: ["Shift", "BackSpace"],
  },
  {
    title: "向上移动选中元素",
    kbd: ["Shift", "ArrowUp"],
  },
  {
    title: "向下移动选中元素",
    kbd: ["Shift", "ArrowDown"],
  },
  {
    title: "查找选中元素的父级并选中",
    kbd: ["shift", "p"],
  },
]);
</script>
