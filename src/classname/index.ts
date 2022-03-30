import daisyui from "./daisyui";
import tailwind from "./tailwind";

/**
 * ui 库
 */
export enum UIPackage {
  daisyui = "daisyui",
  tailwind = "tailwind",
}

/**
 * 所有属性
 */
export enum Attribute {
  background = "background",
  backgroundColor = "backgroundColor",
  backgroundOpacity = "backgroundOpacity",
  flexDirection = "flexDirection",
  flexJustify = "flexJustify",
  flexItems = "flexItems",
  textColor = "textColor",
  typography = "typography",
}

export type Classes = {
  [key in Attribute]: {
    [key in UIPackage]: string[];
  };
};

const classes: Classes = {
  background: {
    daisyui: [],
    tailwind: tailwind.background,
  },

  backgroundColor: {
    daisyui: daisyui.backgroundColor,
    tailwind: [],
  },

  backgroundOpacity: {
    daisyui: [],
    tailwind: tailwind.backgroundOpacity,
  },

  flexDirection: {
    daisyui: [],
    tailwind: tailwind.flexDirection,
  },

  flexJustify: {
    daisyui: [],
    tailwind: tailwind.flexJustify,
  },

  flexItems: {
    daisyui: [],
    tailwind: tailwind.flexItems,
  },

  textColor: {
    daisyui: daisyui.textColor,
    tailwind: [],
  },

  typography: {
    daisyui: daisyui.typography,
    tailwind: [],
  },
};

export default classes;
