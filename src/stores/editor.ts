import { defineStore } from "pinia";

export const useEditorStore = defineStore({
  id: "editor",
  state: (): State => {
    return {
      container: [
        `<h1 class="text-center">这是标题1</h1>`,
        `<article class="prose m-auto">
        <h1>Garlic bread with cheese: What the science tells us</h1>
        <p>For years parents have espoused the health benefits of eating garlic bread with cheese to their children, with the food earning such an iconic status in our culture that kids will often dress up as warm, cheesy loaf for Halloween.</p>
        <p>But a recent study shows that the celebrated appetizer may be linked to a series of rabies cases springing up around the country.</p>
        <!-- ... -->
      </article>`,
      ],
    };
  },
  actions: {
    add(jsxStr: string) {
      this.container.push(jsxStr);
    },
  },
});

interface State {
  container: string[];
}
