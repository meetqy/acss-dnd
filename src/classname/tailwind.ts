/**
 * tailwind 基础class
 */

const background = [
  "bg-auto",
  "bg-cover",
  "bg-contain",
  "bg-bottom",
  "bg-top",
  "bg-center",
  "bg-left",
  "bg-left-bottom",
  "bg-left-top",
  "bg-right",
  "bg-right-bottom",
  "bg-right-top",
  "bg-fixed",
  "bg-local",
  "bg-scroll",
  "bg-no-repeat",
  "bg-repeat",
  "bg-repeat-x",
  "bg-repeat-y",
  "bg-repeat-round",
  "bg-repeat-space",
  "bg-none",
];

const backgroundOpacity = [
  "bg-opacity-0",
  "bg-opacity-5",
  "bg-opacity-10",
  "bg-opacity-20",
  "bg-opacity-25",
  "bg-opacity-30",
  "bg-opacity-40",
  "bg-opacity-50",
  "bg-opacity-60",
  "bg-opacity-70",
  "bg-opacity-75",
  "bg-opacity-80",
  "bg-opacity-90",
  "bg-opacity-95",
  "bg-opacity-100",
];

const flexDirection = ["flex-col", "flex-row"];

const flexJustify = [
  "justify-start",
  "justify-between",
  "justify-around",
  "justify-center",
  "justify-end",
];

const flexItems = ["items-start", "items-center", "items-end"];

export interface Tailwind {
  /**
   * background 效果
   */
  background: string[];
  /**
   * background 透明度
   */
  backgroundOpacity: string[];
  /**
   * flex 方向
   */
  flexDirection: string[];
  /**
   * flex 横向对齐方式
   */
  flexJustify: string[];
  /**
   * flex 纵向对齐方式
   */
  flexItems: string[];
}

const tailwind: Tailwind = {
  background,
  backgroundOpacity,
  flexDirection,
  flexJustify,
  flexItems,
};

export default tailwind;
