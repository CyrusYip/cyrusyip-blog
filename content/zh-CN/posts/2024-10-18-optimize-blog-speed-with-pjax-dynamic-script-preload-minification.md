---
title: 优化 Hugo 博客速度：Pjax、dynamic script、preload、minification
date: 2024-10-18T00:00:00+08:00
slug: optimize-blog-speed-with-pjax-dynamic-script-preload-minification
tags:
  - blog
  - hugo
  - javascript
  - pjax
  - web
lastmod: 2024-11-03T11:55:30+08:00
---

<!--
更新的时候记得更新相关代码的链接
-->

本文介绍了优化博客速度的几个方式：Pjax（免刷新加载页面）、dynamic script（动态插入脚本）、[rel=preload](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel/preload)（预加载）、minification（极简化）。

本博客是 Hugo 生成的静态网站，感觉访问速度还不算慢。有天我看别人的博客（大概是单页应用），发现点击链接居然没刷新网页就加载了新页面，速度非常快。那时我想：要是我的 Hugo 博客也能这么流畅就好了。我感觉把博客改成单页应用要耗费不少时间，遂作罢。

后来我发现可以用 Pjax 技术让静态网站实现免刷新加载页面。Pjax 的意思是 **p**ushState（修改 URL）+ A**jax**（asynchronous JavaScript and XML，发送请求）。通俗来说，Pjax 就是请求网页、替换内容、修改 URL，这个过程比加载整个页面更快。

搜索 Pjax 库，找到两个好几年没更新的库（[MoOx/pjax](https://github.com/MoOx/pjax)、[defunkt/jquery-pjax](https://github.com/defunkt/jquery-pjax)），我不想用不维护的库。我快放弃的时候发现了一个支持 Pjax 的 Hugo 主题：[hugo-theme-luna](https://github.com/Ice-Hazymoon/hugo-theme-luna)，从自述文件可以看出 Pjax 是用 [swup](https://swup.js.org/) 实现的，然后我就用它了。

## Pjax 免刷新加载页面

如果网站没有 JavaScript 代码，那直接加载 swup 就好了。

建议使用这些插件：

- [Head Plugin](https://swup.js.org/plugins/head-plugin/)：刷新 `<head>` 元素的内容和 `<html>` 元素的 `lang` 属性。
- [Preload Plugin](https://swup.js.org/plugins/preload-plugin/)：光标在链接时预加载 URL，用户点击时就会内容会马上替换，还可以配置自动加载出现在可见区域的链接。
- [Progress Bar Plugin](https://swup.js.org/plugins/progress-plugin/)：加载时间较长时显示进度条。

注意要先加载插件再加载 swup。

```html
<script src="https://unpkg.com/@swup/head-plugin@2"></script>
<script src="https://unpkg.com/@swup/preload-plugin@3"></script>
<script src="https://unpkg.com/@swup/progress-plugin@3"></script>
<script src="https://unpkg.com/swup@4"></script>

<script>
  const swup = new Swup({
    containers: ["body"], // 替换 <body> 的内容
    plugins: [
      new SwupHeadPlugin(),
      new SwupPreloadPlugin({ preloadVisibleLinks: true }), // 预加载页面可见的链接
      new SwupProgressPlugin(),
    ],
  });
</script>
```

我的博客用到了 3 个 JavaScript 程序：Google Analytics（流量统计）、Giscus（评论服务）、Disqus（评论服务），用了 swup 之后要考虑是否需要额外处理。

读者点击链接加载新页面后的处理：

- Google Analytics：参考 [Measure single-page applications  |  Google Analytics  |  Google for Developers](https://developers.google.com/analytics/devguides/collection/ga4/single-page-applications?implementation=browser-history)，打开 Enhanced measurement 就可以检测页面变化了。
- Giscus：加载。
- Disqus：重置（reset）或者加载。

## Dynamic Script 动态插入脚本

我写了个动态插入脚本的函数，可以设置等待时间、加载前执行的函数、async、加载后执行的函数、attribute。

```js
function loadScript({
  url,
  delay,
  onloadCallback,
  async,
  preloadCallback,
  attributes = {},
}) {
  function load() {
    if (preloadCallback) preloadCallback();

    const script = document.createElement("script");
    script.src = url;
    script.async = async;

    // Set attributes
    Object.entries(attributes).forEach(([key, value]) => {
      script.setAttribute(key, value);
    });

    if (onloadCallback) script.onload = onloadCallback;

    document.body.appendChild(script);
  }

  if (typeof delay !== "undefined") {
    setTimeout(load, delay);
  } else {
    load();
  }
}
```

我给 Google Analytics、Giscus、Disqus 加了 100ms 等待时间，给 swup 添加了 200ms 等待时间。

## rel=preload 预加载

在 `<link>` 标签使用 `rel="preload"` 可以让浏览器提前下载资源（字体、图片、脚本、样式等），后面动态插入脚本时浏览器就可以马上执行下载好的脚本。

示例：

```html
<head>
  <link rel="preload" as="script" href="https://unpkg.com/@swup/head-plugin@2">
  <link rel="preload" as="script" href="https://unpkg.com/@swup/preload-plugin@3">
  <link rel="preload" as="script" href="https://unpkg.com/swup@4">
</head>
```

preload 应该叫 predownload，因为它并不会提前加载脚本，只是提前下载。

## Minification 极简化

这次优化博客没用到极简化，不过既然讲到优化博客了，就顺便说一下吧。极简化就是移除代码中不必要的内容（比如：空格、空行、缩进），从而减小文件大小，这样浏览器就能更快下载完网页。

Hugo 可以极简化 HTML、CSS 和 JavaScript 文件。本博客的代码用 Hugo 极简化了。举个例子，样式文件大小原本是 13.8 kB，经过极简化后是 7.4 kB（原文件的 53.6%），传输过程中再经过 Brotli 压缩后是 2.1 kB（原文件的 15.2%）。

<!--
对应的提交：dae0bf1 chore: format code in body-end.html
文件大小用 Chrome 看的
-->

## 相关代码

以下是这次优化用到的代码：

- [preload](https://github.com/CyrusYip/cyrusyip-blog/blob/c1cce4360cc73bc2ad48bead3095633e0b6ad179/layouts/partials/head/head-start.html)
- [Pjax、dynamic script](https://github.com/CyrusYip/cyrusyip-blog/blob/c1cce4360cc73bc2ad48bead3095633e0b6ad179/layouts/partials/body/body-end.html)

<!--
最新版文件：
https://github.com/CyrusYip/cyrusyip-blog/blob/main/layouts/partials/head/head-start.html
https://github.com/CyrusYip/cyrusyip-blog/blob/main/layouts/partials/body/body-end.html
-->

## 感想

我已经用 swup 两三天了，非常满意，真没想到静态网站可以变成单页应用。Preload 插件能让浏览器会自动提前加载页面，读者点击链接时页面会瞬间加载，这个感觉太爽啦！

## 参考资料

- [天下武功，唯快不破 —— 我是这样优化博客的 | Sukka's Blog](https://blog.skk.moe/post/how-to-make-a-fast-blog/)
- [rel=preload - HTML: HyperText Markup Language | MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel/preload)
- [swup 文档](https://swup.js.org/)