export interface Menu {
  id: string;
  text: string;
  // 组件外部携带的className
  // eg: 文本标签 h1 h2 p ... 外面的 prose,可以直接格式化其中的文本
  wrapClass: string[];
  components: Template[];
}

export interface Template {
  jsx: JSX.Element;
  str: string;
}
