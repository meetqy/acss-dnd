import { createRouter, createWebHistory } from "vue-router";
import EditorWrap from "../views/EditorWrap/index.vue";
import MenuBar from "../views/MenuBar/index.vue";
import SideBar from "../views/SideBar/index.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      components: {
        default: EditorWrap,
        SideBar: MenuBar,
        MenuBar: SideBar,
      },
    },
  ],
});

export default router;
