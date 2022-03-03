import { h1, h2, h3, h4, h5, h6, p, span } from "@/template/text";
import { defineStore } from "pinia";

export const useMenuStore = defineStore({
  id: "menu",
  state: (): State => ({
    current: "", // 当前选中
    menu: [
      {
        id: "1",
        text: "文本",
        wrapClass: ["prose"],
        components: [h1, h2, h3, h4, h5, h6, p, span],
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
    checked(id: string) {
      this.current = id;
    },
  },
});

interface State {
  current: string;
  menu: MenuComponent[];
}

export interface MenuComponent {
  id: string;
  text: string;
  wrapClass: string[];
  components: JSX.Element[];
}
