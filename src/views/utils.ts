import { useableClasses } from "@/constants/useClasses";
import { v4 } from "uuid";
import type { ClassSelectOption } from "./side-bar/components/class-select";

// 当前元素转为string， 直接使用outerHtml有时候转不出来
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
  child && handleElement(child);
  return child;
};

// Node 的每一项添加 uuid
export const handleElement = (el: Element) => {
  el.setAttribute("data-uuid", v4());
  const children = [...el.children];

  if (children.length > 0) {
    children.forEach((item) => {
      if (item.tagName === "A") {
        // 处理a标签
        handleA(item as HTMLAnchorElement);
      }
      handleElement(item);
    });
  }
};

// 处理a标签
const handleA = (el: HTMLAnchorElement) => {
  el.href = "javascript:void(0);";
  el.removeAttribute("target");
  return el;
};

// 通过name 创建对应的options
export function createOptions(name: string): ClassSelectOption[] {
  return useableClasses[name].map((item) => {
    return {
      label: item,
      value: item,
    };
  });
}

/**
 * 筛选当前classes中 符合 name 分类的类
 * @param classes
 * @param name
 * @returns
 */
export const usageClassFilter = (classes: string[], name: string) => {
  return classes.filter((item) => useableClasses[name].includes(item));
};
