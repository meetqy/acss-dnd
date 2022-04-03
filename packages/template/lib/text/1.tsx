import { Template, TemplateType } from "../types";

export const temp: Template = {
  type: TemplateType.temp,
  jsx: (
    <article class="prose m-auto mt-4">
      <h1>acss-dnd</h1>
      <p>
        <i class="text-primary">acss-dnd</i> 是一款基于 atomic css 特性，开发的
        web 拖拽式网页编辑器。
      </p>
      <h2>🐶 特点</h2>
      <ul>
        <li>操作简单，只需要拖拽和选择</li>
        <li>组件丰富，基础组件和业务组件</li>
        <li>
          css 类规范，基于 daisyui 的 class 类，不需要 ui
          基础，也能创建出漂亮的页面
        </li>
        <li>多种主题随意切换</li>
        <li>响应式，生成的页面自动适配多端设备</li>
        <li>导出代码的代码易读、符合 html 规范、tree 结构</li>
      </ul>
      <h2>🐰 基础库</h2>
      <ul>
        <li>
          <a href="https://vuejs.org/" target="_blank">
            vue3
          </a>
        </li>
        <li>
          <a href="https://vitejs.dev/" target="_blank">
            vite
          </a>
        </li>
        <li>
          <a href="https://tailwindcss.com/" target="_blank">
            tailwind
          </a>
        </li>
        <li>
          <a href="https://daisyui.com/" target="_blank">
            daisyui
          </a>
        </li>
      </ul>
      <blockquote>
        这段文字的布局方式来源与daiyui布局中的
        <a href="https://daisyui.com/docs/layout-and-typography/">
          Layout and Typography
        </a>
        , 使用方式很简单，在最外层的<code>&lt;article&gt;</code>
        标签中，添加了一个 <code>prose</code> 的 classname
      </blockquote>
    </article>
  ),
};
