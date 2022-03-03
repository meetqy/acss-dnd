import { useMenuStore } from "@/stores/menu";
import { useEventListener } from "@vueuse/core";
import { defineComponent, ref } from "vue";
import "./index.css";

export default defineComponent({
  setup() {
    const menuStore = useMenuStore();

    const element = ref<HTMLElement>();
    useEventListener(element, "mousemove", (e: Event) => {
      const id = (e.target as HTMLElement).id;
      if (id === "mask") {
        menuStore.checked("");
      }
    });

    useEventListener(element, "transitionend", (e) => {
      const target = e.target as HTMLElement;
      if (menuStore.current) {
        target.classList.remove("hidden");
      } else {
        target.classList.add("hidden");
      }
    });

    return () => (
      <div
        ref={element}
        class={`w-full h-full absolute transition-opacity ${
          menuStore.current ? "opacity-100" : "opacity-0"
        }`}
      >
        <div class="mask mask-show" id="mask"></div>
        <div
          class={`component-preview scrollbar ${
            menuStore.current ? "left-72" : "-left-96"
          }`}
        >
          <h2 class="text-2xl font-medium text-gray-900 my-4">
            {menuStore.curItem?.text}
          </h2>
          <ul class={menuStore.curItem?.wrapClass.join(" ")}>
            {menuStore.curItem?.components.map((item) => (
              <li
                class={`card cursor-pointer p-4 mb-5 bg-base-100 shadow-sm hover:shadow hover:shadow-primary`}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  },
});
