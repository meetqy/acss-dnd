import { useMenuStore } from "@/stores/menu";
import { useEventListener } from "@vueuse/core";
import { computed, defineComponent, ref } from "vue";
import { menuPostMessage } from "../iframe.io";
import "./index.css";

export default defineComponent({
  setup() {
    const menuStore = useMenuStore();

    const isShowComponent = computed(
      () => menuStore.component === -1 && menuStore.current
    );

    const element = ref<HTMLElement>();
    useEventListener(element, "mousemove", (e: Event) => {
      const id = (e.target as HTMLElement).id;
      if (id === "mask") {
        menuStore.setCurrent("");
      }
    });

    useEventListener(element, "transitionend", (e) => {
      const target = e.target as HTMLElement;
      if (menuStore.current && menuStore.component === -1) {
        target.classList.remove("hidden");
      } else {
        target.classList.add("hidden");
      }
    });

    const ondrag = (e: Event) => {
      const dragIndex = +(e.target as HTMLElement).id.split("_")[1];
      if (dragIndex === menuStore.component) return;
      menuStore.setComponent(dragIndex);
    };

    const ondragend = () => {
      const component = menuStore.curItem?.components[menuStore.component];
      menuPostMessage.component(component?.str);
    };

    return () => {
      return (
        <div
          ref={element}
          class={`w-full h-full absolute transition-opacity ${
            isShowComponent.value ? "opacity-100" : "opacity-0 hidden"
          }`}
        >
          <div class="mask mask-show" id="mask"></div>
          <div
            class={`component-preview scrollbar ${
              isShowComponent.value ? "left-72" : "-left-96"
            }`}
          >
            <h2 class="text-2xl font-medium text-gray-900 my-4">
              {menuStore.curItem?.text}
            </h2>
            <ul class={menuStore.curItem?.wrapClass.join(" ")}>
              {menuStore.curItem?.components.map((item, index) => (
                <li
                  key={index}
                  id={`component-${menuStore.curItem?.id}_${index}`}
                  draggable
                  onDrag={ondrag}
                  onDragend={ondragend}
                  class="translate-x-0 translate-y-0 card cursor-pointer p-4 mb-5 bg-base-100 shadow-sm border-2 border-transparent hover:border-primary"
                >
                  {item.jsx}
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    };
  },
});
