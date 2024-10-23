---
title: jQuery 使用笔记
date: 2024-10-23T00:00:00+08:00
slug: jquery-notes
tags:
  - html
  - javascript
  - jquery
  - web
lastmod: 2024-10-23T00:00:00+08:00
---

[jQuery](https://github.com/jquery/jquery) 是一个经典的 JavaScript 库，其功能为修改 HTML 元素、处理事件、制作动画、发送请求（Ajax）。jQuery 首次发布于 2006 年 8 月 26 日，现在（2024 年）已经 18 岁了。截止于 2024 年 10 月 23 日，有 75.8% 的网站使用了 jQuery[^jquery]。

虽然 jQuery 的使用率高，但新项目没必要用 jQuery，原生 JavaScript 已经可以实现 jQuery 的操作，参看 [You Might Not Need jQuery](https://youmightnotneedjquery.com/) 和 [You-Dont-Need-jQuery](https://github.com/camsong/You-Dont-Need-jQuery)。维护老项目时可能会用到 jQuery。

[^jquery]: 数据出自 [Usage Statistics and Market Share of JavaScript Libraries for Websites](https://w3techs.com/technologies/overview/javascript_library)（[存档](https://archive.is/rF9VQ)）

jQuery 的[引入方法](https://jquery.com/download/)很多，我在本文采用 CDN 引入。

```html
<script src="https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
```

下面介绍一些常见用法。

## 获取元素

jQuery 使用 CSS 选择器获取元素。

```js
$(document)  // 获取整个文档
$("#id1")    // 获取 id 为 id1 的元素
$(".class1") // 获取 class 为 class1 的元素
```

## 插入元素

```html
<!-- HTML 示例 -->
<div id="container"><p>Container</p></div>
```

```js
$("#container").append("<p>inside-end</p>");    // 在 #container 末尾插入子元素
$("#container").prepend("<p>inside-start</p>"); // 在 #container 开头插入子元素
$("#container").after("<p>outside-end</p>")     // 在 #container 后面插入兄弟元素
$("#container").before("<p>outside-start</p>")  // 在 #container 前面插入兄弟元素
```

现在页面上的元素是这样的：

```html
<p>outside-start</p>
<div id="container">
  <p>inside-start</p>
  <p>Container</p>
  <p>inside-end</p>
</div>
<p>outside-end</p>
```

## 取值与赋值

jQuery 使用同一个函数来取值和赋值，根据参数数量进行不同操作。

```html
<!-- HTML 示例 -->
<h1 id="title">Title</h1>
```

```js
$("#title").html()                // 获取 #title 的值
$("#title").html("Another title") // 修改 #title 的值
$("#title").width()               // 获取 #title 的宽度
$("#title").width(1)              // 修改 #title 的宽度
```

## 链式调用

jQuery 的每个操作都会返回 jQuery 对象，所以可以进行连续操作。

```html
<!-- HTML 示例 -->
<div id="container">
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</div>
```

```js
$("div")         // 选择 div 元素
  .find("p")     // 查找 div 里的 p 元素
  .eq(1)         // 选择第 2 个元素
  .html("end")   // 把第 2 个元素内容修改为 end
  .end()         // 退回到上一个选中的元素，也就是 .find("p")
  .eq(0)         // 选择第 1 个元素
  .html("start") // 将第 1 个元素内容修改为 start
```

现在页面是 start 在上面，end 在下面。

## 资料

- [jQuery API Documentation](https://api.jquery.com/)
- [You Might Not Need jQuery](https://youmightnotneedjquery.com/)
- [You-Dont-Need-jQuery](https://github.com/camsong/You-Dont-Need-jQuery)
- [jQuery - Wikipedia](https://en.wikipedia.org/wiki/JQuery)