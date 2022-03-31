/**
 * daisyui class
 */

export const backgroundColor: string[] = [
  "bg-primary",
  "bg-primary-focus",
  "bg-primary-content",
  "bg-secondary",
  "bg-secondary-focus",
  "bg-secondary-content",
  "bg-accent",
  "bg-accent-focus",
  "bg-accent-content",
  "bg-neutral",
  "bg-neutral-focus",
  "bg-neutral-content",
  "bg-base-100",
  "bg-base-200",
  "bg-base-300",
  "bg-base-content",
  "bg-info",
  "bg-info-content",
  "bg-success",
  "bg-success-content",
  "bg-warning",
  "bg-warning-content",
  "bg-error",
  "bg-error-content",
];

export const textColor: string[] = [
  "text-primary",
  "text-primary-focus",
  "text-primary-content",
  "text-secondary",
  "text-secondary-focus",
  "text-secondary-content",
  "text-accent",
  "text-accent-focus",
  "text-accent-content",
  "text-neutral",
  "text-neutral-focus",
  "text-neutral-content",
  "text-base-100",
  "text-base-200",
  "text-base-300",
  "text-base-content",
  "text-info",
  "text-info-content",
  "text-success",
  "text-success-content",
  "text-warning",
  "text-warning-content",
  "text-error",
  "text-error-content",
];

const typography: string[] = ["prose"];

interface Daisyui {
  /**
   * Layout & Typography
   * https://daisyui.com/docs/layout-and-typography/
   */
  typography: string[];
  /**
   * 背景色
   */
  backgroundColor: string[];
  /**
   * 文本色
   */
  textColor: string[];
}

const daisyui: Daisyui = {
  backgroundColor,
  textColor,
  typography,
};

export default daisyui;
