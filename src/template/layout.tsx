import { renderToString } from "vue/server-renderer";
import type { Menu, Template } from "./d";

export const basic: Template = {
  jsx: (
    <div class="container flex flex-col">
      <header class="w-full h-20 flex-shrink-0 bg-base-300 flex items-center justify-center">
        <span>Header</span>
      </header>
      <main class="w-full h-36 bg-base-200  flex items-center justify-center">
        <span>Main</span>
      </main>
    </div>
  ),
  str: "",
};

export const footerBasic: Template = {
  jsx: (
    <div class="container flex flex-col">
      <header class="w-full h-20 bg-base-300 flex items-center justify-center">
        <span>Header</span>
      </header>
      <main class="w-full h-36 bg-base-200 flex items-center justify-center">
        <span>Main</span>
      </main>
      <footer class="flex items-center justify-center bg-base-300 h-20">
        Footer
      </footer>
    </div>
  ),
  str: "",
};

export const asideBasic: Template = {
  jsx: (
    <div class="container flex flex-col">
      <header class="h-20 w-full bg-base-300 flex items-center justify-center">
        Header
      </header>
      <div class="container flex h-32">
        <aside class="w-1/4 bg-base-200 flex-shrink-0 flex items-center justify-center">
          aside
        </aside>
        <main class="flex-1 bg-info flex items-center justify-center">
          main
        </main>
      </div>
    </div>
  ),
  str: "",
};

const layout: Template[] = [basic, footerBasic, asideBasic];

export const initLayout = async (): Promise<Menu> => {
  for (let item of layout) {
    item.str = await renderToString(item.jsx);
  }

  return {
    id: "layout",
    text: "Layout 布局容器",
    wrapClass: [],
    components: layout,
  };
};
