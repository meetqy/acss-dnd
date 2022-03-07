import { useEditorStore } from "@/stores/editor";
import { defineComponent, onMounted, ref, watch } from "vue";
import { stringToJsx } from "./utils";
import "./index.css";
import { iframeIo, IframeIoType } from "../iframe.io";

// iframe store 无法直接通信
export default defineComponent({
  setup() {
    const editorStore = useEditorStore();
    const element = ref<HTMLElement>();

    // 当前选中的元素
    const checkedElement = ref<HTMLElement | null>(null);

    // 当前鼠标移上的元素
    const overElement = ref<HTMLElement | null>(null);

    watch(checkedElement, (val) =>
      iframeIo.editorToSide(window, {
        className: val?.className,
        tagName: val?.tagName,
        innerText: val?.innerText,
      })
    );

    onMounted(() => {
      iframeIo.on(IframeIoType.component, (data) => {
        editorStore.add(data as string);
      });

      element.value?.addEventListener("mouseover", (e) => {
        const el = e.target as HTMLElement;
        if (el.id === "iframe-main") return;
        overElement.value = el;
      });

      element.value?.addEventListener("mouseleave", (e) => {
        overElement.value = null;
      });

      element.value?.addEventListener("click", (e) => {
        const el = e.target as HTMLElement;
        if (el.id === "iframe-main") return;
        checkedElement.value = el;
        overElement.value = null;
      });
    });

    const isEnter = ref<boolean>(false);

    const ondrop = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      isEnter.value = false;
      // editorStore.add();
      console.log(e, "drop");
    };

    const ondragover = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const ondragenter = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();

      if (!editorStore.container.length) {
        isEnter.value = true;
      }
    };

    const ondragleave = () => {
      isEnter.value = false;
    };

    return () => {
      return (
        <>
          <main
            ref={element}
            onDrop={ondrop}
            onDragenter={ondragenter}
            onDragleave={ondragleave}
            onDragover={ondragover}
            id="iframe-main"
            class={`w-screen h-screen border-primary rounded-b-xl cursor-default relative z-10 ${
              isEnter.value ? "border-2" : "border-0"
            }`}
          >
            {editorStore.container.map((item) => stringToJsx(item))}
          </main>
          {renderOverElementMask(overElement.value)}
          {renderCheckedElementMask(checkedElement.value)}
        </>
      );
    };
  },
});

// 移上元素状态显示
const renderOverElementMask = (el: HTMLElement | null) => {
  return (
    el && (
      <div
        class="over-element"
        style={{
          left: el.offsetLeft + "px",
          width: el.clientWidth + "px",
          top: el.offsetTop + "px",
          height: el.clientHeight + "px",
        }}
      />
    )
  );
};

// 移上元素状态显示
const renderCheckedElementMask = (el: HTMLElement | null) => {
  return (
    el && (
      <div
        class="checked-element"
        style={{
          left: el.offsetLeft + "px",
          width: el.clientWidth + "px",
          top: el.offsetTop + "px",
          height: el.clientHeight + "px",
        }}
      />
    )
  );
};
