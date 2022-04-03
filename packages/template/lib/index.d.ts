declare module "@acss-dnd/template" {
  export const footer: { [key: string]: Template };

  import "@vue/runtime-dom";

  export enum TemplateType {
    element = "element",
    component = "component",
    temp = "temp",
  }
  export interface Template {
    type: TemplateType;
    jsx: JSX.Element;
    str: string;
  }
}
