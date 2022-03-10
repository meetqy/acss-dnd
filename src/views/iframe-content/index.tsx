import { useEditorStore } from "@/stores/editor";
import { defineComponent, onMounted, onUnmounted, ref, watch } from "vue";
import "./index.css";
import { iframeIo, IframeIoType } from "../iframe.io";
import type { CheckedElement } from "@/types";

// iframe store 无法直接通信
export default defineComponent({
  setup() {
    const editorStore = useEditorStore();

    // main 容器
    const mainElement = ref<Element>();

    // 当前选中的元素
    const checkedElement = ref<HTMLElement | null>();

    // 当前鼠标移上的元素
    const overElement = ref<HTMLElement>();

    // 拖拽时经过的元素
    const dragEnterElement = ref<HTMLElement>();

    // 当前拖拽的元素，只有在drop触发时，并且在main标签中时，才会显示在画布上
    let _menuToEditorElementStr = "";

    watch(checkedElement, (val) => {
      if (val?.tagName) {
        const el: CheckedElement = {
          className: val?.className || "",
          tagName: val.tagName,
          innerText: val?.innerText || "",
        };

        iframeIo.editorToSide(window, el);
      }
    });

    const isEnter = ref<boolean>(false);

    const ondrop = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();

      isEnter.value = false;

      if (_menuToEditorElementStr) {
        editorStore.addNode(_menuToEditorElementStr, dragEnterElement.value);
      }

      dragEnterElement.value = undefined;

      console.log(e, "drop");
    };

    const ondragover = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const ondragenter = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();

      const el = e.target as HTMLElement;

      if (!editorStore.wrapElement?.children.length) {
        isEnter.value = true;
      }

      dragEnterElement.value = el;
    };

    const ondragleave = () => {
      isEnter.value = false;
    };

    function mainMouseOverFn(e: Event) {
      const el = e.target as HTMLElement;
      if (el.id === "iframe-main") return;
      overElement.value = el;
    }

    function mainMouseLeaveFn(e: Event) {
      overElement.value = undefined;
    }

    function mainClickFn(e: Event) {
      const el = e.target as HTMLElement;
      if (el.id === "iframe-main") return;
      checkedElement.value = el;
      overElement.value = undefined;
    }

    onMounted(() => {
      // 接受iframe传过来的元素
      iframeIo.on(IframeIoType.component, (data) => {
        _menuToEditorElementStr = data as string;
      });

      // 修改属性
      iframeIo.on(IframeIoType.sideToEditor, (data) => {
        if (!data) {
          return (checkedElement.value = null);
        }
        const el = data as CheckedElement;

        const uuid = checkedElement.value?.getAttribute("data-uuid");
        if (uuid) {
          editorStore.updateElement(uuid, el);
        }
      });

      mainElement.value?.addEventListener("mouseover", mainMouseOverFn);
      mainElement.value?.addEventListener("mouseleave", mainMouseLeaveFn);
      mainElement.value?.addEventListener("click", mainClickFn);

      mainElement.value && editorStore.init(mainElement.value);
    });

    onUnmounted(() => {
      mainElement.value?.removeEventListener("mouseover", mainMouseOverFn);
      mainElement.value?.removeEventListener("mouseleave", mainMouseLeaveFn);
      mainElement.value?.removeEventListener("click", mainClickFn);
    });

    watch(editorStore, (val) => {
      const el = val.wrapElement;
      if (mainElement.value) {
        mainElement.value.innerHTML = el?.innerHTML || "";
      }
    });

    return () => (
      <>
        <main
          ref={mainElement}
          onDrop={ondrop}
          onDragenter={ondragenter}
          onDragleave={ondragleave}
          onDragover={ondragover}
          id="iframe-main"
          class={`w-screen h-screen border-primary rounded-b-xl cursor-default relative z-10 ${
            isEnter.value ? "border-2" : "border-0"
          }`}
        ></main>
        {renderOverElementMask(overElement.value)}
        {checkedElement.value
          ? renderCheckedElementMask(checkedElement.value)
          : null}
        {renderDragEnterElement(dragEnterElement.value)}
      </>
    );
  },
});

const renderDragEnterElement = (el: HTMLElement | undefined) => {
  if (!el || el.id === "iframe-main") return null;
  return (
    <div
      class="drag-enter_element"
      style={{
        left: el.offsetLeft + "px",
        width: el.clientWidth + "px",
        top: el.offsetTop + "px",
        height: el.clientHeight + "px",
      }}
    />
  );
};

// 移上元素状态显示
const renderOverElementMask = (el: HTMLElement | undefined) => {
  // console.log(el, "over-element");
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

// 选中元素状态显示
const renderCheckedElementMask = (el: HTMLElement) => {
  console.log(el, "checked-element");
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
