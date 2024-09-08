---
title: CSS BEM 命名规范入门教程
date: 2024-09-08T00:00:00+08:00
slug: css-bem-guide
tags:
  - css
  - web
lastmod: 2024-09-08T23:29:51+08:00
---

BEM（Block, Element, Modifier）是 HTML/CSS 类的命名方法，它可以让 HTML 和 CSS 代码更有条理。

## 概念与用法

一开始看不懂没关系，后面有示例。

- block（块）：可以独立使用的 HTML 元素（比如：`<nav>`），可以不包含 element。
- element（元素）：依附于 block 的 HTML 元素，无法独立存在（比如：`<li>`），前面要加上双下划线 `__`。
- modifier（修饰符）：表示 block 或者 element 的状态和外观，前面要加上双连字符 `--`。
- 用单连字符 `-` 连接单词，比如：`search-form`。
- element 只属于 block，而不是另一个 element。错误写法：`block__element1__element2`，正确写法：`block__element2`。
- 使用 modifier 时，同时保留不含 modifier 的类名，比如：`<a class="menu__link menu__link--active" href="/zh-cn/">主页</a>`。

## HTML 示例

`<nav>` 元素是 block，它包含的 element 有 `<ul>`、`<li>`、`<a>`。`--active` 是修饰符。

```html
<nav class="menu">
  <ul class="menu__list">
    <li class="menu__item">
      <a class="menu__link menu__link--active" href="/zh-cn/">主页</a>
    </li>
    <li class="menu__item">
      <a class="menu__link" href="/zh-cn/posts/">文章</a>
    </li>
    <li class="menu__item">
      <a class="menu__link" href="/zh-cn/about/">关于</a>
    </li>
  </ul>
</nav>
```

## CSS 示例

[在线示例](https://jsbin.com/kijewimudi/2/edit?html,css,output)

```css
/* 横向列表 */
.menu__list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  list-style-type: none;
  padding-inline-start: 0;
}

/* 加粗和当前页面匹配的链接 */
.menu__link--active {
  font-weight: bolder;
}
```

## SCSS 示例

我更推荐用 SCSS，用父选择器 `&` 可以把 block 和 element 的样式都放在一起，这种结构可以清晰地展现它们的层级关系。

```scss
.menu {
  // 横向列表
  &__list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    list-style-type: none;
    padding-inline-start: 0;
  }

  // 加粗和当前页面匹配的链接
  &__link {
    &--active {
      font-weight: bolder;
    }
  }
}
```

如果你还是很讨厌写类名，可以试试 atomic CSS 框架，比如：[Tailwind CSS](https://tailwindcss.com/)、[UnoCSS](https://unocss.dev/)。

## 补充资料

- <https://en.bem.info/>（官方教程）
- <https://getbem.com/>（非官方教程）
- [Naming convention / Methodology / BEM](https://en.bem.info/methodology/naming-convention/)