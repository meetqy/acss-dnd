import { renderToString } from "vue/server-renderer";

import type { Menu } from "./../template/d";
import type { CheckedElement } from "@/types";
import { iframeIo } from "@/views/iframe.io";
import { defineStore } from "pinia";

export const useBaseStore = defineStore({
  id: "base",
  state: (): State => ({
    current: "",
    component: -1,
    checkedElement: null, // editor中当前选中的元素
    menu: [],
  }),
  getters: {
    curItem: (state): Menu | null => {
      if (state.current) {
        return state.menu.filter((item) => item.id === state.current)[0];
      } else {
        return null;
      }
    },
  },
  actions: {
    initMenu(menu: Menu[]) {
      this.menu = menu;
    },

    setCurrent(id: string | null) {
      this.current = id;
      this.component = -1;
    },

    async setComponent(index: number) {
      if (index < 0) return;
      const item = this.curItem?.components[index];
      const jsxStr = await renderToString(item.jsx);
      // const jsxStr = this.curItem?.components[index].str;
      if (this.component != index && jsxStr) {
        iframeIo.tempToEditor(jsxStr);
        this.component = index;
      }
    },

    // 初始化选中的元素
    initCheckedElement(el: CheckedElement | null) {
      this.checkedElement = el;
      // iframeIo.sideToEditor(el);
    },

    updateCheckedElement(el: CheckedElement) {
      if (this.checkedElement) {
        this.checkedElement.className = el.className;
        this.checkedElement.innerText = el.innerText;
        this.checkedElement.tagName = el.tagName;
        this.checkedElement.innerHTML = el.innerHTML;
        iframeIo.sideToEditor({
          tagName: this.checkedElement.tagName,
          className: this.checkedElement.className,
          innerText: this.checkedElement.innerText,
          innerHTML: this.checkedElement.innerHTML,
        });
      }
    },
  },
});
interface State {
  // 当前选中菜单
  current: string | null;
  // 当前选中（拖拽）的组件的索引， `$current_$component` 可以锁定一个组件
  component: number;
  menu: Menu[];
  checkedElement: CheckedElement | null;
}
