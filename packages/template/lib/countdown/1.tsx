import { Template, TemplateType } from "../types";

export const temp: Template = {
  type: TemplateType.component,
  jsx: (
    <span class="countdown font-mono text-2xl">
      <span style="--value:10;"></span>h<span style="--value:24;"></span>m
      <span style="--value:41;"></span>s
    </span>
  ),
};
