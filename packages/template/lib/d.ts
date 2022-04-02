import "vue";

export enum TemplateType {
  // 元素
  element = "element",
  // 组件
  component = "component",
  // 模板
  temp = "temp",
}

export interface Template {
  type: TemplateType;
  jsx: JSX.Element;
  str: string;
}
