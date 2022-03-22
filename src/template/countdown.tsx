import { renderToString } from "vue/server-renderer";
import type { Template, Menu } from "./d";

const text: Template[] = [
  {
    jsx: (
      <span class="countdown font-mono text-2xl">
        <span style="--value:10;"></span>h<span style="--value:24;"></span>m
        <span style="--value:41;"></span>s
      </span>
    ),
    str: "",
  },
  {
    jsx: (
      <span class="countdown font-mono text-2xl">
        <span style="--value:10;"></span>:<span style="--value:24;"></span>:
        <span style="--value:16;"></span>
      </span>
    ),
    str: "",
  },
  {
    jsx: (
      <div class="flex gap-5">
        <div>
          <span class="countdown font-mono text-4xl">
            <span style="--value:15;"></span>
          </span>
          days
        </div>
        <div>
          <span class="countdown font-mono text-4xl">
            <span style="--value:10;"></span>
          </span>
          hours
        </div>
        <div>
          <span class="countdown font-mono text-4xl">
            <span style="--value:24;"></span>
          </span>
          min
        </div>
        <div>
          <span class="countdown font-mono text-4xl">
            <span style="--value:7;"></span>
          </span>
          sec
        </div>
      </div>
    ),
    str: "",
  },
  {
    jsx: (
      <div class="grid grid-flow-col gap-5 text-center auto-cols-max">
        <div class="flex flex-col">
          <span class="countdown font-mono text-5xl">
            <span style="--value:15;"></span>
          </span>
          days
        </div>
        <div class="flex flex-col">
          <span class="countdown font-mono text-5xl">
            <span style="--value:10;"></span>
          </span>
          hours
        </div>
        <div class="flex flex-col">
          <span class="countdown font-mono text-5xl">
            <span style="--value:24;"></span>
          </span>
          min
        </div>
        <div class="flex flex-col">
          <span class="countdown font-mono text-5xl">
            <span style="--value:41;"></span>
          </span>
          sec
        </div>
      </div>
    ),
    str: "",
  },
  {
    jsx: (
      <div class="grid grid-flow-col gap-5 text-center auto-cols-max">
        <div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
          <span class="countdown font-mono text-5xl">
            <span style="--value:15;"></span>
          </span>
          days
        </div>
        <div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
          <span class="countdown font-mono text-5xl">
            <span style="--value:10;"></span>
          </span>
          hours
        </div>
        <div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
          <span class="countdown font-mono text-5xl">
            <span style="--value:24;"></span>
          </span>
          min
        </div>
        <div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
          <span class="countdown font-mono text-5xl">
            <span style="--value:48;"></span>
          </span>
          sec
        </div>
      </div>
    ),
    str: "",
  },
];

export const initCountdown = async (): Promise<Menu> => {
  for (let item of text) {
    item.str = await renderToString(item.jsx);
  }

  return {
    id: "countdown",
    text: "countdown 倒计时",
    wrapClass: [],
    components: text,
  };
};
