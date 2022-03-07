import { stringToNode } from "@/views/utils";
import { defineStore } from "pinia";

export const useEditorStore = defineStore({
  id: "editor",
  state: (): State => {
    return {
      wrapElement: undefined,
    };
  },
  // "<h1 class=\"text-center text-yellow-500\">这是标题1</h1>"
  actions: {
    changeClassName(uuid: string, className: string) {
      const node = this.wrapElement?.querySelector(`[data-uuid="${uuid}"]`);
      if (node) {
        node.className = className;
      }
    },

    init(wrapElement: Element) {
      this.wrapElement = wrapElement;
    },

    addNode(str: string) {
      this.wrapElement?.append(stringToNode(str));
    },
  },
});

interface State {
  wrapElement: Element | undefined;
}
