import { useBaseStore } from "@/stores/base";
import { useEventListener } from "@vueuse/core";
import { computed, defineComponent, ref } from "vue";
import "./index.css";

export default defineComponent({
  setup() {
    const baseStore = useBaseStore();

    const isShowComponent = computed(
      () => baseStore.component === -1 && baseStore.current
    );

    const element = ref<HTMLElement>();
    useEventListener(element, "mousemove", (e: Event) => {
      const id = (e.target as HTMLElement).id;
      if (id === "mask") {
        baseStore.setCurrent("");
      }
    });

    useEventListener(element, "transitionend", (e) => {
      const target = e.target as HTMLElement;
      if (baseStore.current && baseStore.component === -1) {
        target.classList.remove("hidden");
      } else {
        target.classList.add("hidden");
      }
    });

    const ondrag = (e: Event) => {
      const dragIndex = +(e.target as HTMLElement).id.split("_")[1];
      if (dragIndex === baseStore.component) return;
      baseStore.setComponent(dragIndex);
    };

    const ondragend = () => {
      baseStore.setComponent(-1);
      baseStore.setCurrent(null);
    };

    return () => {
      return (
        <div
          ref={element}
          class={`w-80 h-full absolute transition-opacity left-80 top-0 ${
            isShowComponent.value ? "opacity-100" : "opacity-0 hidden"
          }`}
        >
          <div
            class="fixed w-screen h-screen bg-neutral bg-opacity-40"
            onClick={ondragend}
          />
          <div class={`component-preview overscroll-y-contain`}>
            <h2 class="text-2xl font-medium text-gray-900 my-4">
              {baseStore.curItem?.text}
            </h2>
            <ul class={baseStore.curItem?.wrapClass.join(" ")}>
              {baseStore.curItem?.components.map((item, index) => (
                <li
                  key={index}
                  id={`component-${baseStore.curItem?.id}_${index}`}
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
