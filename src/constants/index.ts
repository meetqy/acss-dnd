// 文本节点 只有文本节能修改 innerText属性
export const TextNode = new Set([
  "H1",
  "H2",
  "H3",
  "H4",
  "H5",
  "H6",
  "P",
  "SPAN",
  "A",
  "CODE",
  "I",
  "BLOCKQUOTE",
  "LI",
]);

export const NotSwapNode = new Set(["I", "SPAN", "A"]);

// 不可选中的node
export const NotCheckedNode = new Set(["PATH", "SVG"]);
