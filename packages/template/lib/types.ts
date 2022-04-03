/// <amd-module name="@acss-dnd/template" />

interface T {
  name: string;
  // component的预览 有些子组件展示需要外部依赖 比如 文本的`prose`
  wrapClass?: string[];
  [key: string]: Template | string | string[];
}

export declare const breadcrumbs: T;
export declare const countdown: T;
export declare const footer: T;
export declare const hero: T;
export declare const text: T;

import "@vue/runtime-dom";
export enum TemplateType {
  element = "element",
  component = "component",
  temp = "temp",
}
export interface Template {
  type: TemplateType;
  jsx: JSX.Element;
}
