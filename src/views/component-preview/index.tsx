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
      menuStore.current
        ? target.classList.remove("hidden")
        : target.classList.add("hidden");
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
          class={`component-preview ${
            menuStore.current ? "left-72" : "-left-72"
          }`}
        >
          {menuStore.curItem?.components}
        </div>
      </div>
    );
  },
});
