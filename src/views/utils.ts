// 当前元素转为string outerHtml 有时候转不出来
export const elementToString = (el: Element): string => {
  const div = document.createElement("div");
  div.appendChild(el);
  return div.innerHTML;
};

export const stringToNode = (str: string): Node | string => {
  const div = document.createElement("div");
  div.innerHTML = str.trim();
  const child = div.querySelector("*");
  child?.setAttribute("data-uuid", Date.now().toString());
  return child || "";
};
