import { createRouter, createWebHistory } from "vue-router";
import EditorWrap from "@/views/main/index.vue";
import MenuBar from "@/views/menu-bar/index.vue";
import SideBar from "@/views/side-bar/index.vue";
import ComponentPreview from "@/views/template/index";
import iframeContent from "@/views/editor/index";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      components: {
        default: EditorWrap,
        SideBar: SideBar,
        MenuBar: MenuBar,
        ComponentPreview: ComponentPreview,
      },
    },
    {
      path: "/iframe",
      component: iframeContent,
      name: "iframe",
    },
  ],
});

export default router;
