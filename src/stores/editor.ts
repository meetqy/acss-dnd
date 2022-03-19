import { TextNode } from "@/constants";
import type { CheckedElement } from "@/types";
import { stringToNode } from "@/views/utils";
import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";

const storage = useStorage("wrapElement", "");

export const useEditorStore = defineStore({
  id: "editor",
  state: (): State => {
    return {
      wrapElement: null,
    };
  },
  // "<h1 class=\"text-center text-yellow-500\">这是标题1</h1>"
  actions: {
    updateElement(uuid: string, el: CheckedElement) {
      const node = this.wrapElement?.querySelector(`[data-uuid="${uuid}"]`);
      if (node) {
        node.className = el.className;
        if (TextNode.has(node.tagName)) {
          (node as HTMLElement).innerHTML = el.innerHTML;
        }
      }

      storage.value = this.wrapElement?.innerHTML;

      return node;
    },

    init(wrapElement: Element) {
      // console.log("useEditorStore", wrapElement);
      this.wrapElement = wrapElement;

      storage.value = this.wrapElement?.innerHTML;
    },

    // 添加元素到画布
    // el存在 会放在el后面
    addNode(str: string, el?: HTMLElement | null) {
      const newEl = stringToNode(str);
      if (!newEl) return;

      if (el && el.id != "iframe-main") {
        const parentNode = el.parentNode;
        const referenceNode = this.wrapElement?.querySelector(
          `[data-uuid="${el.getAttribute("data-uuid")}"]`
        );
        if (referenceNode) {
          // parentNode === wrapElement 的情况，如果不是暂未测试
          parentNode?.insertBefore(newEl, referenceNode.nextSibling);
        }
      } else {
        this.wrapElement?.append(newEl);
      }

      storage.value = this.wrapElement?.innerHTML;
    },
  },
});

interface State {
  wrapElement: Element | null;
}
