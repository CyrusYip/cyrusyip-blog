---
title: 中文没有斜体
date: '2020-11-26'
slug: no-italic-chinese
tags:
  - font
---

在西文中，[意大利体（italic type）](https://zh.wikipedia.org/zh-cn/%E6%84%8F%E5%A4%A7%E5%88%A9%E4%BD%93)是手写风格的字体，常用作强调内容。西文中还有另一种倾斜的字体是[伪斜体（oblique type）](https://zh.wikipedia.org/wiki/%E4%BC%AA%E6%96%9C%E4%BD%93)，它的形状和常规字体一样，只是向右倾斜了。伪斜体和意大利体一样用作强调。下图为常规字体、意大利体与伪斜体（Garamond Roman）：

![Garamond Roman Italic](https://upload.wikimedia.org/wikipedia/commons/f/f2/Garamond_Roman_Italic.svg)

![Garamond Roman Oblique](https://upload.wikimedia.org/wikipedia/commons/c/ca/Oblique_type_example.svg)

中文里没有「斜体」（意大利体、伪斜体）的概念，所以千万不要照搬西文的习惯，用斜体来强调中文内容。*斜体中文既错误又丑陋*。可以用**粗体**或楷体来强调中文内容，正文内容用宋体或黑体。楷体看起来比较温和，粗体更为突出。

LaTeX 的 ctex 宏包对强调中文的处理挺不错的，用了 ctex 文档类或宏包之后，正文是宋体，`\emph{中文}` 是楷体，`\textbf{中文}` 是黑体。

```latex
\documentclass[fontset=windows]{ctexart}
\begin{document}
你好 \emph{你好} \textbf{你好} \textbf{\emph{你好}}

Hi \emph{Hi} \textbf{Hi} \textbf{\emph{Hi}}
\end{document}
```

![ctex](https://cdn.jsdelivr.net/gh/CyrusYip/blog-static/images/2020-11-26_ctex.png)
