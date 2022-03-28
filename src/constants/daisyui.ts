export const bgColors: string[] = [
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

export const textColors: string[] = [
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

interface Daisyui {
  typography: string[];
  bg: string[];
  text: string[];
}

const daisyui: Daisyui = {
  bg: bgColors,
  text: textColors,
  typography: ["prose"],
};

export default daisyui;

export const getDaisyui = (name: keyof Daisyui) => {
  return daisyui[name].map((item) => {
    return {
      label: item,
      value: item,
    };
  });
};

export const daisyuiFilter = (classes: string[], name: keyof Daisyui) => {
  return classes.filter((item) => daisyui[name].includes(item));
};
