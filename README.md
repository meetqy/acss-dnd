# acss-dnd

acss-dnd(atomic css drag and drop) 是一款基于 atomic css 特性，开发的 web 拖拽式网页编辑器。

## 🐶 特点

- 操作简单，只需要拖拽和选择
- 组件丰富，基础组件和业务组件
- css 类规范，基于 daisyui 的 class 类，不需要 ui 基础，也能创建出漂亮的页面
- 多种主题随意切换
- 响应式，生成的页面自动适配多端设备
- 导出代码的代码易读、符合 html 规范、tree 结构

## 🐱 在线体验

- [Github](https://meetqy.github.io/acss-dnd/)
- [Gitee](https://meetqy.gitee.io/acss-dnd)

## 🐭 安装

```sh
git clone https://github.com/meetqy/acss-dnd.git
yarn
yarn dev
```

## 🐹 项目结构

```
- template   # 存放模板配置
- views      # 模块
    - main                  # 编辑器外部的样式
    - editor                # 画布
    - template              # 模板预览 选中菜单，弹出对应的template
    - menu-bar              # 菜单
    - side-bar              # 属性操作
        - file-a            # 一个文件夹相当于一个分类
        - file-b
        ...
```

## 🐰 基础库

- [vue3](https://vuejs.org/)
- [vite](https://vitejs.dev/)
- [tailwind](https://tailwindcss.com/)
- [daisy ui](https://daisyui.com/)

## 🦊 近期计划

**Github Project**: [https://github.com/meetqy/acss-dnd/projects/1](https://github.com/meetqy/acss-dnd/projects/1)
