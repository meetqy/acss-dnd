// import type { VNode } from "@/stores/editor";

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

interface PostParam {
  type: IframeIoType;
  data: unknown;
}

// 父传子
const parentToChild = (params: PostParam) => {
  return iframeElement.contentWindow?.postMessage(params);
};

const childToParent = (_win: Window, params: PostParam) => {
  return _win.parent.postMessage(params);
};

// 菜单通知
export const iframeIo = {
  component: (data: unknown): void => {
    parentToChild({
      type: IframeIoType.component,
      data,
    });
  },

  editorToSide: (_win: Window, data: unknown): void => {
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
