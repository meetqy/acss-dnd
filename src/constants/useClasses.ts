/**
 * 数据来源
 * https://tailwind.build/classes
 * 执行以下代码
 */

import { bgColors, textColors } from "./daisyui";

//  const wrapper = document.querySelectorAll('.w-full.mb-6');
//  let json = {

//  }
//  wrapper.forEach(item => {
//      const name = item.querySelector('h5').innerText.replace(' ', '-').toLocaleLowerCase();
//      json[name] = [...item.querySelectorAll('a')].map(item => item.innerText)
//  })
//  console.log(json);

export const useableClassesTransition = [
  "transition",
  "transition-none",
  "transition-all",
  "transition-colors",
  "transition-opacity",
  "transition-shadow",
  "transition-transform",
];

export const useableClassesEase = [
  "ease-linear",
  "ease-in",
  "ease-out",
  "ease-in-out",
];

// 可以使用的classes
export const useableClasses: { [key: string]: string[] } = {
  // 效果
  background: [
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
  ],

  // 背景颜色
  "background-color": bgColors,
  // 背景透明
  "background-opacity": [
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
  ],

  "text-color": textColors,
};

let _useableClassesArr: string[] = [];

export const getClasses = (): string[] => {
  if (_useableClassesArr.length > 0) return _useableClassesArr;
  for (const key in useableClasses) {
    const value = useableClasses[key];
    _useableClassesArr = _useableClassesArr.concat(value);
  }

  return _useableClassesArr;
};
