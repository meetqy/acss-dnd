import Text, { type Template } from "@/template/text";
import { defineStore } from "pinia";

export const useMenuStore = defineStore({
  id: "menu",
  state: (): State => ({
    current: "", // 当前选中菜单
    component: -1, // 当前选中（拖拽）的组件的索引， `$current_$component` 可以锁定一个组件
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
      this.component = index;
    },
  },
});

interface State {
  current: string;
  component: number;
  menu: MenuComponent[];
}

export interface MenuComponent {
  id: string;
  text: string;
  wrapClass: string[];
  components: Template[];
}
