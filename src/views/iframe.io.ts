// import type { VNode } from "@/stores/editor";

let iframeElement: HTMLIFrameElement;

// 初始化 iframe
export const initIframeElement = (el: HTMLIFrameElement) => {
  iframeElement = el;
};

enum IframeIoType {
  menu,
  component,
}

interface PostParam {
  type: IframeIoType;
  data: unknown;
}

const post = (params: PostParam) => {
  return iframeElement.contentWindow?.postMessage(params);
};

// 菜单通知
export const menuPostMessage = {
  component: (data: unknown): void => {
    post({
      type: IframeIoType.component,
      data,
    });
  },
};
