import { createRouter, createWebHistory } from "vue-router";
import EditorWrap from "@/views/editor-wrap/index.vue";
import MenuBar from "@/views/menu-bar/index.vue";
import SideBar from "@/views/side-bar/index.vue";
import ComponentPreview from "@/views/component-preview/index.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      components: {
        default: EditorWrap,
        SideBar: MenuBar,
        MenuBar: SideBar,
        ComponentPreview: ComponentPreview,
      },
    },
  ],
});

export default router;
