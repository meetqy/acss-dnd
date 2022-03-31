<div align="center">

<img style="width: 300px" src='https://cdn.cuyang.me/acss-dnd/logo.png?acss-dnd'>

**An web dnd editor on atomic css features**  
**一款基于原子类 css 特性的 web 拖拽式编辑器**

<p align='center'>
  🤖
  <a href='https://meetqy.gitee.io/acss-dnd'>在线体验 Gitee</a> · <span>🎡</span> <a href='https://cuyang.me/acss-dnd'>在线体验 Github</a>
</p>

</div>

## 🐶 特点

- 操作简单，只需要拖拽和选择
- 组件丰富，基础组件和业务组件
- css 类规范，基于 daisyui 的 class 类，不需要 ui 基础，也能创建出漂亮的页面
- 多种主题随意切换
- 响应式，生成的页面自动适配多端设备
- 导出代码的代码易读、符合 html 规范、tree 结构

## 🐭 安装

```sh
git clone https://github.com/cu-yang/acss-dnd.git
yarn
yarn dev
```

## 🐹 项目结构

```
- classname  # ui库css原子类
- template   # 存放模板配置
- contants   # 除了ui库原子类的常量
- store
    - base                  # menu、template、sidebar状态管理，编辑器以外的状态
    - editor                # 编辑器中内容的状态
    - classes               # classname操作的工具类方法
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

## 🐻‍❄️ 快捷键

![](https://cdn.cuyang.me/acss-dnd/keyboard.gif)

| 快捷键                | 作用                     |
| --------------------- | ------------------------ |
| `Shift` + `BackSpace` | 删除选中元素             |
| `Shift` + `ArrowUp`   | 向上移动选中元素         |
| `Shift` + `ArrowDown` | 向下移动选中元素         |
| `Shift` + `p`         | 查找选中元素的父级并选中 |

## 🐰 基础库

- [vue3](https://vuejs.org/)
- [vite](https://vitejs.dev/)
- [tailwind](https://tailwindcss.com/)
- [daisy ui](https://daisyui.com/)

## 🐼 提 Bug 或建议

- 打开链接 👉🏻 https://github.com/cu-yang/acss-dnd/issues/new/choose
- 选择对应模板

![](https://cdn.cuyang.me/acss-dnd/issues.png)

## 🦊 近期计划

**Github Project**: [https://github.com/cu-yang/acss-dnd/projects/1](https://github.com/cu-yang/acss-dnd/projects/1)

## 🐻 预览图

<img src='https://cdn.cuyang.me/acss-dnd/editor.png' />
<img src='https://cdn.cuyang.me/acss-dnd/side-bar.png'/>
