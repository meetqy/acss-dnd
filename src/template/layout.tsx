import { renderToString } from "vue/server-renderer";
import type { Menu, Template } from "./d";

export const basic: Template = {
  jsx: (
    <div class="container flex flex-col h-96 px-4">
      <header class="w-full h-20 flex-shrink-0 bg-base-300">
        <span>Header</span>
      </header>
      <main class="w-full flex-1 bg-base-200">
        <span>Main</span>
      </main>
    </div>
  ),
  str: "",
};

const layout: Template[] = [basic];

export const initLayout = async (): Promise<Menu> => {
  for (let item of layout) {
    item.str = await renderToString(item.jsx);
  }

  return {
    id: "2",
    text: "Layout 布局容器",
    wrapClass: [],
    components: layout,
  };
};
