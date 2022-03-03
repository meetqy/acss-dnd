import { defineStore } from "pinia";

export const useMenuStore = defineStore({
  id: "menu",
  state: () => ({
    current: "", // 当前选中
    menu: ["文本", "容器"],
  }),
  actions: {
    checked(id: string) {
      this.current = id;
    },
  },
});
