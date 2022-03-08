import Text, { type Template } from "@/template/text";
import { iframeIo } from "@/views/iframe.io";
// import { iframeIo } from "@/views/iframe.io";
import { defineStore } from "pinia";

export const useBaseStore = defineStore({
  id: "base",
  state: (): State => ({
    current: "", // 当前选中菜单
    component: -1, // 当前选中（拖拽）的组件的索引， `$current_$component` 可以锁定一个组件
    checkedElement: undefined,
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
    setCurrent(id: string) {
      this.current = id;
      this.component = -1;
    },

    setComponent(index: number) {
      if (this.component != index) {
        iframeIo.component(this.curItem?.components[index].str);
        this.component = index;
      }
    },

    setCheckedElement(el: CheckedElement | undefined) {
      this.checkedElement = el;
    },

    changeCheckElementClass(className: string) {
      if (this.checkedElement) {
        this.checkedElement.className = className;
        iframeIo.sideToEditor(this.checkedElement?.className);
      }
    },
  },
});
interface State {
  current: string;
  component: number;
  menu: MenuComponent[];
  checkedElement: CheckedElement | undefined;
}

export interface MenuComponent {
  id: string;
  text: string;
  // 组件外部携带的className
  // eg: 文本标签 h1 h2 p ... 外面的 prose,可以直接格式化其中的文本
  wrapClass: string[];
  components: Template[];
}

export interface CheckedElement {
  tagName: string | undefined;
  className: string | undefined;
  innerText: string | undefined;
}
