import { Template, TemplateType } from "../types";

export const temp: Template = {
  type: TemplateType.component,
  jsx: (
    <div class="max-w-xs text-sm breadcrumbs">
      <ul>
        <li>Long text 1</li>
        <li>Long text 2</li>
        <li>Long text 3</li>
        <li>Long text 4</li>
        <li>Long text 5</li>
      </ul>
    </div>
  ),
};
