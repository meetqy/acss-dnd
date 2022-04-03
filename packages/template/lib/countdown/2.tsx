import { Template, TemplateType } from "../types";

export const temp: Template = {
  type: TemplateType.component,
  jsx: (
    <span class="countdown font-mono text-2xl">
      <span style="--value:10;"></span>:<span style="--value:24;"></span>:
      <span style="--value:16;"></span>
    </span>
  ),
};
