import { Template, TemplateType } from "../types";

export const temp: Template = {
  type: TemplateType.element,
  jsx: (
    <p>
      默认情况下，Tailwind 使用移动优先的断点系统，类似于 Bootstrap
      这些其它框架中的用法。 这意味着未加前缀的功能类 (像 uppercase)
      在所有的屏幕上都有效，而加了前缀的功能类（如
      md:uppercase）仅在指定断点及以上的屏幕上生效。
    </p>
  ),
};
