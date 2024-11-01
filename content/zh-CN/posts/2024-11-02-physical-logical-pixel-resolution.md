---
title: 概念解析：物理像素、逻辑像素、CSS 像素、物理分辨率、逻辑分辨率
date: 2024-11-02T00:00:00+08:00
slug: physical-logical-pixel-resolution
tags:
  - css
  - web
lastmod: 2024-11-02T00:00:00+08:00
---

物理（physical）表示实际的值，逻辑（logical）表示经过缩放的值。

## 物理像素

像素（pixel）是显示器的基本单位，一个像素显示一种颜色。为了和逻辑像素（logical pixel）区分，像素（pixel）又称物理像素（physical pixel）。

## 逻辑像素 / CSS 像素

逻辑像素（logical pixel），亦称 CSS 像素（CSS pixel），是经过操作系统缩放的像素。CSS 的 `px` 就是 CSS 像素。

## 物理分辨率

物理分辨率（physical resolution）表示像素的数量。1920×1080 分辨率就表示显示器水平方向有 1920 个像素，垂直方向有 1080 个像素，共 2073600 个像素。尺寸相同时，显示器分辨率越高，显示效果就越精细。

## 逻辑分辨率

逻辑分辨率（logical resolution）是经过系统缩放的分辨率。

我用 1920×1080 分辨率，27 英寸的显示器，文字看得清楚。假如我换成同尺寸 3840×2160 的显示器，此时显示器像素数是前者的 4 倍，可以容纳更多的文字，文字会变得小得看不清。在浏览器按几下 `Ctrl -` 调节缩放也可以看到过小的文字。

在系统设置 200% 缩放后，分辨率就变成了 (3840/2)×(2160/2)，也就是 1920×1080，此时文字大小又正常了。3840×2160 是物理分辨率，1920×1080是逻辑分辨率。

## 相关的 Web API

以 2560×1440 物理分辨率，200% 缩放的显示器为例，展示相关 Web API 的用法。

<!--
显示器尺寸为 15.6 英寸
-->

```js
// 逻辑宽度
console.log(window.screen.width) // 1280
// 逻辑高度
console.log(window.screen.height) // 720
// 缩放（物理高度/逻辑高度）
console.log(window.devicePixelRatio) // 2
// 物理宽度，需要借助 devicePixelRatio 来计算
console.log(window.screen.width*window.devicePixelRatio) // 2560
// 物理高度，需要借助 devicePixelRatio 来计算
console.log(window.screen.height*window.devicePixelRatio) // 1440
```

## 在线查看分辨率

我写了个查看物理分辨率、逻辑分辨率和视口大小的网站，欢迎使用。

网站链接：<https://resolution-viewer.cyrusyip.org/>

源代码：<https://github.com/CyrusYip/resolution-viewer>