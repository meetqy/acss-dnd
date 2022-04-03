import { Template, TemplateType } from "../types";

export const temp: Template = {
  type: TemplateType.component,
  jsx: (
    <div class="text-sm breadcrumbs">
      <ul>
        <li>
          <a>Home</a>
        </li>
        <li>
          <a>Documents</a>
        </li>
        <li>Add Document</li>
      </ul>
    </div>
  ),
};
