---
title: Markdown 技巧
date: '2020-12-15'
slug: markdown-tricks
tags:
  - Markdown
---

## 使用 R Markdown

常用的 GitHub Flavored Markdown 功能很少，熟悉之后可以使用更强大的 [R Markdown](https://bookdown.org/yihui/rmarkdown/)。

R Markdown 的优势：

- 多用途

    R Markdown 可以用来写文档，输出格式为 PDF、HTML、Word 等，写书可以用 [bookdown](https://bookdown.org/yihui/bookdown/)。除了写文档，R Markdown 还可以用来写幻灯片（ioslides、Slidy、Beamer、Powerpoint、xaringan 等）和写博客（[blogdown](https://bookdown.org/yihui/blogdown/)）。

- 可运行代码

    R Markdown 中可以插入代码，编译文档后代码结果会在输出文档里面。这样的话，改了代码新的结果也会自动插入到输出文档，就不用自己手动插入图片了。

## 有序列表只有第 1 个数字有作用

下面的有序列表显示效果一样

```
1. 香蕉
2. 葡萄
3. 菠萝
```

```
1. 香蕉
1. 葡萄
1. 菠萝
```

```
1. 香蕉
111. 葡萄
10. 菠萝
```

它们都会显示为

1. 香蕉
2. 葡萄
3. 菠萝

另外，列表数字可以不以 1 为开头。比如

```
2. 香蕉
2. 葡萄
2. 菠萝
```

会显示为

2. 香蕉
3. 葡萄
4. 菠萝

在有序列表中使用同一个数字有两个好处：一是不需要自己手动编号、二是使用 `Git` 管理文件时变动更少。

## 图片 + 超链接

超链接的语法是`[链接文本](链接网址)`，图片的语法是`![图片标题](图片网址)`。把图片当成超链接的文本，放到超链接的语句中就可以生成带有超链接的图片，也就是`[![图片标题](图片网址)](链接网址)`。

这是 GitHub 的吉祥物 Octocat

`![octocat](https://octodex.github.com/images/kimonotocat.png)`

![octocat](https://octodex.github.com/images/kimonotocat.png)

这是 Github 的链接

`[GitHub](https://github.com/)`

把它们拼凑起来就可以制作带有 GitHub 链接的 Octocat

`[![octocat](https://octodex.github.com/images/kimonotocat.png)](https://github.com/)`

[![octocat](https://octodex.github.com/images/kimonotocat.png)](https://github.com/)

因为本站使用了 fancybox，所以点击上面的图片不会跳转到 GitHub。不过你可以把代码复制到 Markdown 编辑器试试看。

## 使用包含 \`\`\` 的代码块

如果代码块里包含 N 个 \`，在需要代码块前后使用 N+1 个 \` 把它包裹起来，不然就会显示错误。下面内容会显示为两个空代码块夹着 `print("Hello, World!")`。

````
```
```
print("Hello, World!")
```
```
````

上面代码的正确写法应该是

`````
````
```
print("Hello, World!")
```
````
`````

它会显示为

````
```
print("Hello, World!")
```
````

## 用空行隔开不同元素

用空行隔开不同元素可以消除歧义，避免错误的显示效果。如果不用空行的话，可能会出现意料之外的显示效果。如果我用下面的写法列举我喜欢吃的食物，猜猜 Markdown 编辑器会如何显示。

```
水果：
1. 椰子
2. 香蕉
3. 菠萝
烧腊：
1. 叉烧
2. 烧鸭
3. 白切鸡
```

[点击这里](https://johnmacfarlane.net/babelmark2/?text=%E6%B0%B4%E6%9E%9C%EF%BC%9A%0A1.+%E6%A4%B0%E5%AD%90%0A2.+%E9%A6%99%E8%95%89%0A3.+%E8%8F%A0%E8%90%9D%0A%E7%83%A7%E8%85%8A%EF%BC%9A%0A1.+%E5%8F%89%E7%83%A7%0A2.+%E7%83%A7%E9%B8%AD%0A3.+%E7%99%BD%E5%88%87%E9%B8%A1)查看不同解析器的结果，有三种显示效果。

![food](https://cdn.jsdelivr.net/gh/CyrusYip/blog-static/images/2020-12-15_food-1.png)

![food](https://cdn.jsdelivr.net/gh/CyrusYip/blog-static/images/2020-12-15_food-2.png)

![food](https://cdn.jsdelivr.net/gh/CyrusYip/blog-static/images/2020-12-15_food-3.png)

现在你应该知道不加空行的严重后果了。我们再来看看那个错误示范。

```
水果：
1. 椰子
2. 香蕉
3. 菠萝
烧腊：
1. 叉烧
2. 烧鸭
3. 白切鸡
```

它应该包含了 4 个元素：依次为段落、有序列表、段落、有序列表。在元素间加上空行显示就没问题了。[点击这里](https://johnmacfarlane.net/babelmark2/?text=%E6%B0%B4%E6%9E%9C%EF%BC%9A%0A%0A1.+%E6%A4%B0%E5%AD%90%0A2.+%E9%A6%99%E8%95%89%0A3.+%E8%8F%A0%E8%90%9D%0A%0A%E7%83%A7%E8%85%8A%EF%BC%9A%0A%0A1.+%E5%8F%89%E7%83%A7%0A2.+%E7%83%A7%E9%B8%AD%0A3.+%E7%99%BD%E5%88%87%E9%B8%A1)查看效果，这次所有解析结果都正常。

```
水果：

1. 椰子
2. 香蕉
3. 菠萝

烧腊：

1. 叉烧
2. 烧鸭
3. 白切鸡
```

## Typora 标题自动标号

![typora auto number headings](https://cdn.jsdelivr.net/gh/CyrusYip/blog-static/images/2020-12-15_typora-auto-number-headings.png)

给 Typora 文章、目录和大纲的标题编号：

- 按下 `Ctrl + ,`打开 Typora 设置

- 点击 `Appearance -> Open Theme Folder`来打开主题文件夹

    Linux 的路径为 `~/.config/Typora/themes`
    
    Windows 的路径为 `%APPDATA%\Typora\themes`

- 新建一个名为 `base.user.css` 的文件，把下面的代码粘贴进去（[出处](https://support.typora.io/Auto-Numbering/)）

    ```css
    /**************************************
     * Header Counters in Article
     **************************************/

    /** initialize css counter */
    #write {
        counter-reset: h1
    }

    h1 {
        counter-reset: h2
    }

    h2 {
        counter-reset: h3
    }

    h3 {
        counter-reset: h4
    }

    h4 {
        counter-reset: h5
    }

    h5 {
        counter-reset: h6
    }

    /** put counter result into headings */
    #write h1:before {
        counter-increment: h1;
        content: counter(h1) ". "
    }

    #write h2:before {
        counter-increment: h2;
        content: counter(h1) "." counter(h2) ". "
    }

    #write h3:before,
    h3.md-focus.md-heading:before /** override the default style for focused headings */ {
        counter-increment: h3;
        content: counter(h1) "." counter(h2) "." counter(h3) ". "
    }

    #write h4:before,
    h4.md-focus.md-heading:before {
        counter-increment: h4;
        content: counter(h1) "." counter(h2) "." counter(h3) "." counter(h4) ". "
    }

    #write h5:before,
    h5.md-focus.md-heading:before {
        counter-increment: h5;
        content: counter(h1) "." counter(h2) "." counter(h3) "." counter(h4) "." counter(h5) ". "
    }

    #write h6:before,
    h6.md-focus.md-heading:before {
        counter-increment: h6;
        content: counter(h1) "." counter(h2) "." counter(h3) "." counter(h4) "." counter(h5) "." counter(h6) ". "
    }

    /** override the default style for focused headings */
    #write>h3.md-focus:before,
    #write>h4.md-focus:before,
    #write>h5.md-focus:before,
    #write>h6.md-focus:before,
    h3.md-focus:before,
    h4.md-focus:before,
    h5.md-focus:before,
    h6.md-focus:before {
        color: inherit;
        border: inherit;
        border-radius: inherit;
        position: inherit;
        left:initial;
        float: none;
        top:initial;
        font-size: inherit;
        padding-left: inherit;
        padding-right: inherit;
        vertical-align: inherit;
        font-weight: inherit;
        line-height: inherit;
    }

    /**************************************
     * Header Counters in TOC
     **************************************/

    /* No link underlines in TOC */
    .md-toc-inner {
        text-decoration: none;
    }

    .md-toc-content {
        counter-reset: h1toc
    }

    .md-toc-h1 {
        margin-left: 0;
        font-size: 1.5rem;
        counter-reset: h2toc
    }

    .md-toc-h2 {
        font-size: 1.1rem;
        margin-left: 2rem;
        counter-reset: h3toc
    }

    .md-toc-h3 {
        margin-left: 3rem;
        font-size: .9rem;
        counter-reset: h4toc
    }

    .md-toc-h4 {
        margin-left: 4rem;
        font-size: .85rem;
        counter-reset: h5toc
    }

    .md-toc-h5 {
        margin-left: 5rem;
        font-size: .8rem;
        counter-reset: h6toc
    }

    .md-toc-h6 {
        margin-left: 6rem;
        font-size: .75rem;
    }

    .md-toc-h1:before {
        color: black;
        counter-increment: h1toc;
        content: counter(h1toc) ". "
    }

    .md-toc-h1 .md-toc-inner {
        margin-left: 0;
    }

    .md-toc-h2:before {
        color: black;
        counter-increment: h2toc;
        content: counter(h1toc) ". " counter(h2toc) ". "
    }

    .md-toc-h2 .md-toc-inner {
        margin-left: 0;
    }

    .md-toc-h3:before {
        color: black;
        counter-increment: h3toc;
        content: counter(h1toc) ". " counter(h2toc) ". " counter(h3toc) ". "
    }

    .md-toc-h3 .md-toc-inner {
        margin-left: 0;
    }

    .md-toc-h4:before {
        color: black;
        counter-increment: h4toc;
        content: counter(h1toc) ". " counter(h2toc) ". " counter(h3toc) ". " counter(h4toc) ". "
    }

    .md-toc-h4 .md-toc-inner {
        margin-left: 0;
    }

    .md-toc-h5:before {
        color: black;
        counter-increment: h5toc;
        content: counter(h1toc) ". " counter(h2toc) ". " counter(h3toc) ". " counter(h4toc) ". " counter(h5toc) ". "
    }

    .md-toc-h5 .md-toc-inner {
        margin-left: 0;
    }

    .md-toc-h6:before {
        color: black;
        counter-increment: h6toc;
        content: counter(h1toc) ". " counter(h2toc) ". " counter(h3toc) ". " counter(h4toc) ". " counter(h5toc) ". " counter(h6toc) ". "
    }

    .md-toc-h6 .md-toc-inner {
        margin-left: 0;
    }

    /**************************************
     * Header Counters in Content
     **************************************/

    /** initialize css counter */
    #write {
        counter-reset: h1
    }

    h1 {
        counter-reset: h2
    }

    h2 {
        counter-reset: h3
    }

    h3 {
        counter-reset: h4
    }

    h4 {
        counter-reset: h5
    }

    h5 {
        counter-reset: h6
    }

    /** put counter result into headings */
    #write h1:before {
        counter-increment: h1;
        content: counter(h1) ". "
    }

    #write h2:before {
        counter-increment: h2;
        content: counter(h1) "." counter(h2) ". "
    }

    #write h3:before, h3.md-focus.md-heading:before { /*override the default style for focused headings */
        counter-increment: h3;
        content: counter(h1) "." counter(h2) "." counter(h3) ". "
    }

    #write h4:before, h4.md-focus.md-heading:before {
        counter-increment: h4;
        content: counter(h1) "." counter(h2) "." counter(h3) "." counter(h4) ". "
    }

    #write h5:before, h5.md-focus.md-heading:before {
        counter-increment: h5;
        content: counter(h1) "." counter(h2) "." counter(h3) "." counter(h4) "." counter(h5) ". "
    }

    #write h6:before, h6.md-focus.md-heading:before {
        counter-increment: h6;
        content: counter(h1) "." counter(h2) "." counter(h3) "." counter(h4) "." counter(h5) "." counter(h6) ". "
    }

    /** override the default style for focused headings */
    #write>h3.md-focus:before, #write>h4.md-focus:before, #write>h5.md-focus:before, #write>h6.md-focus:before, h3.md-focus:before, h4.md-focus:before, h5.md-focus:before, h6.md-focus:before {
        color: inherit;
        border: inherit;
        border-radius: inherit;
        position: inherit;
        left: initial;
        float: none;
        top: initial;
        font-size: inherit;
        padding-left: inherit;
        padding-right: inherit;
        vertical-align: inherit;
        font-weight: inherit;
        line-height: inherit;
    }

    /**************************************
     * Header Counters in Sidebar
     **************************************/

    .sidebar-content {
        counter-reset: h1
    }

    .outline-h1 {
        counter-reset: h2
    }

    .outline-h2 {
        counter-reset: h3
    }

    .outline-h3 {
        counter-reset: h4
    }

    .outline-h4 {
        counter-reset: h5
    }

    .outline-h5 {
        counter-reset: h6
    }

    .outline-h1>.outline-item>.outline-label:before {
        counter-increment: h1;
        content: counter(h1) ". "
    }

    .outline-h2>.outline-item>.outline-label:before {
        counter-increment: h2;
        content: counter(h1) "." counter(h2) ". "
    }

    .outline-h3>.outline-item>.outline-label:before {
        counter-increment: h3;
        content: counter(h1) "." counter(h2) "." counter(h3) ". "
    }

    .outline-h4>.outline-item>.outline-label:before {
        counter-increment: h4;
        content: counter(h1) "." counter(h2) "." counter(h3) "." counter(h4) ". "
    }

    .outline-h5>.outline-item>.outline-label:before {
        counter-increment: h5;
        content: counter(h1) "." counter(h2) "." counter(h3) "." counter(h4) "." counter(h5) ". "
    }

    .outline-h6>.outline-item>.outline-label:before {
        counter-increment: h6;
        content: counter(h1) "." counter(h2) "." counter(h3) "." counter(h4) "." counter(h5) "." counter(h6) ". "
    }
    ```

- 保存文件并重启 Typora

## 为什么 Markdown 的标题叫 ATX 和 Setext

Markdown 有两种标题写法，一种是 ATX 标题（ATX headings）：

```
# foo

## foo

### foo

#### foo

##### foo

###### foo
```

另一种是 Setext 标题（Setext Headings）：

```
Title 
=====

Subhead 
-------
```

有很长一段时间，我都没法区分哪种标题是 ATX，哪种是 Setext。我特地用词典查 ATX 和 Setext，根本查不到释义。最近在谷歌和维基百科的帮助下，才发现原来这两个标题写法不是 Markdown 原创的，是出自 [atx(the true structured text format)](http://www.aaronsw.com/2002/atx/intro.html) 和 [Setext (Structure Enhanced Text)](https://en.wikipedia.org/wiki/Setext)。

## 避免使用其他标记语言

Markdown 的格式有限，要使用 Markdown 不支持格式，就只能混用其他标记语言。但是混用标记语言可能会让你陷入追求格式的泥潭。举个例子，Markdown 不支持右对齐，要对文字右对齐只能使用 HTML 代码，比如 `<div style="text-align: right">右对齐的文字</div>`。这么做有两个问题，一是要输入长长的代码，二是转换成 HTML 以外的文档（如 PDF）右对齐代码就失效了。下面这个 Markdown 文件转换成 PDF 的话，右对齐会失效。

```markdown
> 春有百花秋有月，夏有凉风冬有雪。
>
> 若无闲事挂心头，便是人间好时节。
>
> <div style="text-align: right">——无门慧开</div>
```

> 春有百花秋有月，夏有凉风冬有雪。
>
> 若无闲事挂心头，便是人间好时节。
>
> <div style="text-align: right">——无门慧开</div>

其实在 R Markdown 中有让右对齐代码同时对 HTML 与 PDF 生效的方法（参考资料：[9.6 Custom blocks (*) | R Markdown Cookbook](https://bookdown.org/yihui/rmarkdown-cookbook/custom-blocks.html)）。

```markdown
---
output:
  pdf_document: default
  html_document: default
---

<style>
.flushright {
  text-align: right;
}
</style>

> If your mind isn’t clouded by unnecessary things,
>
> This is the best season of your life.
>
> ::: {.flushright data-latex=""}
> --- Wu-Men
> :::
```

## 在 R Markdown 中加载 LaTeX 宏包


### extra_dependencies

```
---
output: 
  pdf_document:
    extra_dependencies: ["bbm", "threeparttable"]
---
```

```
---
output: 
  pdf_document:
    extra_dependencies:
      caption: ["labelfont={bf}"]
      hyperref: ["unicode=true", "breaklinks=true"]
      lmodern: null
---
```

### header-includes

```
---
header-includes:
   - \usepackage{bbm}
output:
    pdf_document
---
```

### in-header

```
---
output:
    pdf_document:
        includes:
            in_header: mystyles.sty
---
```

```
% mystyles.sty
\usepackage{bbm}
\usepackage{threeparttable}
\usepackage{booktabs}
\usepackage{expex}
```

### 参考资料

- [6.4 Include additional LaTeX packages | R Markdown Cookbook](https://bookdown.org/yihui/rmarkdown-cookbook/latex-extra.html)
- [knitr - How to include LaTeX package in R Markdown? - TeX - LaTeX Stack Exchange](https://tex.stackexchange.com/questions/171711/how-to-include-latex-package-in-r-markdown)
