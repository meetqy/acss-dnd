/// <amd-module name="@acss-dnd/template" />

type t = { [key: string]: Template };

export const footer: t = {};
export const hero: t = {};

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
