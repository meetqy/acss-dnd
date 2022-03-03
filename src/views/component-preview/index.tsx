import { useMenuStore } from "@/stores/menu";
import { useEventListener } from "@vueuse/core";
import { computed, defineComponent, ref } from "vue";
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
      menuStore.setComponent(dragIndex);
      const component = menuStore.curItem?.components[dragIndex];
    };

    const ondragend = (e: Event) => {
      console.log(e.target as HTMLElement, "dragend");
    };

    return () => {
      return (
        <div
          ref={element}
          class={`w-full h-full absolute transition-opacity ${
            isShowComponent.value ? "opacity-100" : "opacity-0"
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
                  class="translate-x-0 translate-y-0 card cursor-pointer p-4 mb-5 bg-base-100 shadow-sm border-4 border-transparent hover:border-primary"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    };
  },
});
