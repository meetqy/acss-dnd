import { useEditorStore } from "@/stores/editor";
import { defineComponent, onMounted, onUnmounted, ref, watch } from "vue";
import "./index.css";
import { iframeIo, IframeIoType } from "../iframe.io";
import type { CheckedElement } from "@/types";
import { useMagicKeys, useWindowScroll, whenever } from "@vueuse/core";
import { NotSwapNode } from "@/constants";

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

    // dragenter 可释放的元素
    const dragEnterElement = ref<HTMLElement>();

    // 当前拖拽的元素，只有在drop触发时，并且在main标签中时，才会显示在画布上
    let _menuToEditorElementStr = "";

    watch(checkedElement, (val) => {
      if (val?.tagName) {
        const el: CheckedElement = {
          // className 替换为正常的 删除多余的 空格，以及末尾的空格
          className:
            val?.className
              .replace(/\s+/g, " ")
              .replace(/^\s+/, "")
              .replace(/\s+$/, "") || "",
          tagName: val.tagName,
          innerText: val?.innerText || "",
          innerHTML: val?.innerHTML || "",
        };
        // console.log(el);

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

    const { x, y } = useWindowScroll();

    // 删除选中元素
    const keys = useMagicKeys();
    whenever(keys.shift_backspace, (val) => {
      const uuid = checkedElement.value?.getAttribute("data-uuid");
      if (checkedElement.value && uuid) {
        editorStore.deleteNode(uuid);
        checkedElement.value = null;
      }
    });

    onMounted(() => {
      // 接受iframe传过来的元素
      iframeIo.on(IframeIoType.tempToEditor, (data) => {
        _menuToEditorElementStr = data as string;
      });

      iframeIo.on(IframeIoType.mainToEditor, (data) => {
        if (data === "notice") {
          const node = checkedElement.value;
          checkedElement.value = null;
          checkedElement.value = node;
        }
      });

      // 修改属性
      iframeIo.on(IframeIoType.sideToEditor, (data) => {
        // console.log(data, checkedElement.value);
        if (!data) {
          return (checkedElement.value = null);
        }
        const el = data as CheckedElement;

        const uuid = checkedElement.value?.getAttribute("data-uuid");
        if (uuid) {
          const newNode = editorStore.updateElement(uuid, el) as HTMLElement;
          checkedElement.value = null; // 触发视图更新
          checkedElement.value = newNode;
        }
      });

      // 对main进行监听
      mainElement.value?.addEventListener("mouseover", mainMouseOverFn);
      mainElement.value?.addEventListener("mouseleave", mainMouseLeaveFn);
      mainElement.value?.addEventListener("click", mainClickFn);

      // 初始化editor，回显storage中的dom
      if (mainElement.value) {
        mainElement.value.innerHTML = localStorage.getItem("wrapElement") || "";
        editorStore.init(mainElement.value);
      }
    });

    onUnmounted(() => {
      mainElement.value?.removeEventListener("mouseover", mainMouseOverFn);
      mainElement.value?.removeEventListener("mouseleave", mainMouseLeaveFn);
      mainElement.value?.removeEventListener("click", mainClickFn);
    });

    // 将页面渲染到画布
    watch(editorStore, (val) => {
      const el = val.wrapElement;

      if (mainElement.value) {
        mainElement.value.innerHTML = el?.innerHTML || "";
      }
    });

    // 选中元素状态显示
    // 选中的元素可以上下移动，行内元素禁止移动
    const renderCheckedElementMask = (el: HTMLElement, scrollY: number) => {
      const rect = el.getBoundingClientRect();

      const upFn = () => {
        editorStore.swapNode(
          el.getAttribute("data-uuid") || "",
          "up",
          (newEl) => {
            checkedElement.value = null;
            checkedElement.value = newEl;
          }
        );
      };

      const downFn = () =>
        editorStore.swapNode(
          el.getAttribute("data-uuid") || "",
          "down",
          (newEl) => {
            checkedElement.value = null;
            checkedElement.value = newEl;
          }
        );

      const disable = NotSwapNode.has(el.tagName);

      return (
        el && (
          <div
            class="checked-element"
            style={{
              left: rect.left + "px",
              width: rect.width + "px",
              top: rect.top + scrollY + "px",
              height: rect.height + "px",
            }}
          >
            {disable ? null : (
              <div class="absolute right-0 top-0 pointer-events-auto flex items-center justify-end h-full pr-2">
                <div class="btn-group">
                  <button class={"btn btn-xs btn-primary"} onClick={upFn}>
                    <i class="fa-solid fa-angle-up"></i>
                  </button>
                  <button class={"btn btn-xs btn-primary"} onClick={downFn}>
                    <i class="fa-solid fa-angle-down"></i>
                  </button>
                </div>
              </div>
            )}
          </div>
        )
      );
    };

    return () => (
      <>
        <main
          ref={mainElement}
          onDrop={ondrop}
          onDragenter={ondragenter}
          onDragleave={ondragleave}
          onDragover={ondragover}
          id="iframe-main"
          class={`border-primary max-w-screen min-h-screen rounded-b-xl cursor-default relative z-10 ${
            isEnter.value ? "border-2" : "border-0"
          }`}
        ></main>
        {renderOverElementMask(overElement.value, y.value)}
        {checkedElement.value
          ? renderCheckedElementMask(checkedElement.value, y.value)
          : null}
        {renderDragEnterElement(dragEnterElement.value, y.value)}
      </>
    );
  },
});

const renderDragEnterElement = (
  el: HTMLElement | undefined,
  scrollY: number
) => {
  if (!el || el.id === "iframe-main") return null;
  const rect = el.getBoundingClientRect();
  return (
    <div
      class="drag-enter_element"
      style={{
        left: rect.left + "px",
        width: rect.width + "px",
        top: rect.top + scrollY + "px",
        height: rect.height + "px",
      }}
    />
  );
};

// 移上元素状态显示
const renderOverElementMask = (
  el: HTMLElement | undefined,
  scrollY: number
) => {
  const rect = el?.getBoundingClientRect();
  return (
    rect && (
      <div
        class="over-element"
        style={{
          left: rect.left + "px",
          width: rect.width + "px",
          top: rect.top + scrollY + "px",
          height: rect.height + "px",
        }}
      />
    )
  );
};
