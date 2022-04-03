/// <amd-module name="@acss-dnd/template" />

interface T {
  name: string;
  [key: string]: Template | string;
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
