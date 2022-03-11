import Text, { type Template } from "@/template/text";
import type { CheckedElement } from "@/types";
import { iframeIo } from "@/views/iframe.io";
import { defineStore } from "pinia";

export const useBaseStore = defineStore({
  id: "base",
  state: (): State => ({
    current: "",
    component: -1,
    checkedElement: null, // editor中当前选中的元素
    menu: [
      {
        id: "1",
        text: "文本",
        wrapClass: ["prose"],
        components: Text,
      },
    ],
  }),
  getters: {
    curItem: (state): MenuComponent | null => {
      if (state.current) {
        return state.menu.filter((item) => item.id === state.current)[0];
      } else {
        return null;
      }
    },
  },
  actions: {
    setCurrent(id: string | null) {
      this.current = id;
      this.component = -1;
    },

    setComponent(index: number) {
      if (index < 0) return;
      const jsxStr = this.curItem?.components[index].str;
      if (this.component != index && jsxStr) {
        iframeIo.component(jsxStr);
        this.component = index;
      }
    },

    // 初始化选中的元素
    initCheckedElement(el: CheckedElement | null) {
      this.checkedElement = el;
      iframeIo.sideToEditor(el);
    },

    updateCheckedElement(el: CheckedElement) {
      if (this.checkedElement) {
        this.checkedElement.className = el.className;
        this.checkedElement.innerText = el.innerText;
        this.checkedElement.tagName = el.tagName;
        iframeIo.sideToEditor({
          tagName: this.checkedElement.tagName,
          className: this.checkedElement.className,
          innerText: this.checkedElement.innerText,
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
  menu: MenuComponent[];
  checkedElement: CheckedElement | null;
}

export interface MenuComponent {
  id: string;
  text: string;
  // 组件外部携带的className
  // eg: 文本标签 h1 h2 p ... 外面的 prose,可以直接格式化其中的文本
  wrapClass: string[];
  components: Template[];
}
