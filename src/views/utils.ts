import { v4 } from "uuid";

// 当前元素转为string outerHtml 有时候转不出来
export const elementToString = (el: Element): string => {
  const div = document.createElement("div");
  div.appendChild(el);
  return div.innerHTML;
};

// 把 string 转为 node 节点
export const stringToNode = (str: string): Node | null => {
  const div = document.createElement("div");
  div.innerHTML = str.trim();
  const child = div.querySelector("*");
  // 浅拷贝 可以直接修改到child
  child && nodeAddUuid(child);
  return child;
};

// Node 的每一项添加 uuid
export const nodeAddUuid = (el: Element) => {
  el.setAttribute("data-uuid", v4());
  const children = [...el.children];

  if (children.length > 0) {
    children.forEach((item) => {
      nodeAddUuid(item);
    });
  }
};
