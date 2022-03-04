import { useEditorStore } from "@/stores/editor";
import { defineComponent, onMounted, ref } from "vue";

// iframe store 无法直接通信
export default defineComponent({
  setup() {
    const editorStore = useEditorStore();

    onMounted(() => {
      window.addEventListener("message", (e) => {
        editorStore.add(e.data.data);
      });
    });

    const isEnter = ref<boolean>(false);

    const ondrop = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      isEnter.value = false;
      // editorStore.add();
      // console.log(e, "drop");
    };

    const ondragover = (e: Event) => {
      // console.log(menuStore.component);
      e.preventDefault();
      e.stopPropagation();
    };

    const ondragenter = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      isEnter.value = true;
    };

    const ondragleave = () => {
      isEnter.value = false;
    };

    return () => {
      console.log(editorStore.container);
      return (
        <main
          onDrop={ondrop}
          onDragenter={ondragenter}
          onDragleave={ondragleave}
          onDragover={ondragover}
          class={`w-screen h-screen border-primary rounded-b-xl ${
            isEnter.value ? "border-2" : "border-0"
          }`}
        >
          {editorStore.container.map((item) => stringToJsx(item))}
        </main>
      );
    };
  },
});

/**
 * 因为 <template innerHtml={}></template>
 * 在jsx中无法使用，不能正常解析
 */
const stringToJsx = (str: string): JSX.Element | null => {
  // <h1 class="xxx" .....> tag 前部分
  const t1 = str.match(/^<.*?>/);
  if (!t1) return null;

  // h1\s
  const t2 = (t1[0] as string).match(/[^<].*?\s/);
  if (!t2) return null;

  // h1
  const tag = (t2[0] as string).replace(/\s/g, "");

  // class="xxxx xxxx"
  const t3 = (t1[0] as string).match(/class=[\"|\'].*?[\"|\']/);
  const className = t3
    ? (t3[0] as string).replace(/class=/, "").replace(/\'|"/g, "")
    : "";

  const innerHtml = str.replace(/^<.*?>/g, "").replace(/<\/.*?>$/, "");

  return <tag class={className} v-html={innerHtml}></tag>;
};
