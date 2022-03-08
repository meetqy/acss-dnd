// import type { VNode } from "@/stores/editor";

import type { CheckedElement } from "@/types";

let iframeElement: HTMLIFrameElement;

// 初始化 iframe
export const initIframeElement = (el: HTMLIFrameElement) => {
  iframeElement = el;
};

export enum IframeIoType {
  menu,
  component,
  editorToSide,
  sideToEditor,
}

interface PostParam<T> {
  type: IframeIoType;
  data: T;
}

// 父传子
function parentToChild<T>(params: PostParam<T>) {
  return iframeElement.contentWindow?.postMessage(params);
}

function childToParent<T>(_win: Window, params: PostParam<T>) {
  return _win.parent.postMessage(params);
}

// 菜单通知
export const iframeIo = {
  component: (data: string): void => {
    parentToChild({
      type: IframeIoType.component,
      data,
    });
  },

  editorToSide: (_win: Window, data: CheckedElement): void => {
    childToParent(_win, {
      type: IframeIoType.editorToSide,
      data,
    });
  },

  sideToEditor: (data: unknown): void => {
    parentToChild({ type: IframeIoType.sideToEditor, data });
  },

  on: (type: IframeIoType, callback: (data: unknown) => void) => {
    window.addEventListener("message", (e) => {
      if (e.data.type === type) {
        callback(e.data.data);
      }
    });
  },
};
