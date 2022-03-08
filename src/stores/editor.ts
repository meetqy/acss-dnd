import { TextNode } from "@/constants";
import { stringToNode } from "@/views/utils";
import { defineStore } from "pinia";
import type { CheckedElement } from "./base";

export const useEditorStore = defineStore({
  id: "editor",
  state: (): State => {
    return {
      wrapElement: null,
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

    changeElement(uuid: string, el: CheckedElement) {
      const node = this.wrapElement?.querySelector(`[data-uuid="${uuid}"]`);
      if (node) {
        node.className = el.className;
        if (TextNode.has(node.tagName)) {
          (node as HTMLElement).innerText = el.innerText;
        }
      }
    },

    init(wrapElement: Element) {
      this.wrapElement = wrapElement;
    },

    // 添加元素到画布
    // el存在 会放在el后面
    addNode(str: string, el?: HTMLElement | null) {
      const newEl = stringToNode(str);
      if (el && el.id != "iframe-main") {
        const parentNode = el.parentNode;
        const referenceNode = this.wrapElement?.querySelector(
          `[data-uuid="${el.getAttribute("data-uuid")}"]`
        );
        if (typeof newEl != "string" && referenceNode) {
          // parentNode === wrapElement 的情况，如果不是暂未测试
          parentNode?.insertBefore(newEl, referenceNode.nextSibling);
        }
      } else {
        this.wrapElement?.append(newEl);
      }
    },
  },
});

interface State {
  wrapElement: Element | null;
}
