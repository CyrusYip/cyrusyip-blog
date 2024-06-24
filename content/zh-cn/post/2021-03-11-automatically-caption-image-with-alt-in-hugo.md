---
title: 让 Hugo 自动给图片加上说明文字
date: 2021-03-11T00:00:00+08:00
slug: automatically-caption-image-with-alt-in-hugo
tags:
  - Markdown
  - blog
  - hugo
lastmod: 2024-05-09T01:43:46+08:00
---

本文测试于 [Hugo extended 0.125.6](https://github.com/gohugoio/hugo/releases/tag/v0.125.6)，完整的网站代码[在此](https://github.com/CyrusYip/cyrusyip-blog/tree/544754a84a3e80358880e8f5729c0a674d64bd1e)。

## 将图片标题用作说明文字（推荐）

Markdown 插入图片的代码是这样的：

```markdown
![描述](链接 "标题")
```

对于的 HTML 代码：

```html
<img src="链接" alt="描述" title="标题" />
```

用户的光标放在图片时，会有提示框，其内容为标题。提示框不好用，因为用户不一定会把光标移动到图片上，而且用户可能不用鼠标。

既然提示框不好用，那我们可以将标题转换为图片底下的说明文字，这样用户一定会看到。对应的 HTML 代码为：

```html
<figure>
  <img src="链接" alt="描述">
  <figcaption>标题</figcaption>
</figure>
```

配置流程：

1. 在博客根目录下新建 `layouts/_default/_markup/render-image.html`

    ```bash
    mkdir layouts/_default/_markup/ -p
    touch layouts/_default/_markup/render-image.html
    ```

2. 往 `render-image.html` 填入以下内容（如果不需要修改样式，可以去除 `class="..."`）：

    ```html
    {{ if .Title }}
      <figure class="figure">
        <img class="img" src="{{ .Destination | safeURL }}"
          {{- with .Text }} alt="{{ . }}"{{ end -}} >
        <figcaption>{{ .Title }}</figcaption>
      </figure>
    {{ else }}
      <img class="img" src="{{ .Destination | safeURL }}"
        {{- with .Text }} alt="{{ . }}"{{ end -}} >
    {{ end }}
    ```

`![](https://upload.wikimedia.org/wikipedia/commons/1/1f/Wiki-sisters.png "维基娘的姊妹们（由左至右）：维基共享资源娘、维基百科娘、维基语录娘")` 会[显示成这样](https://cdn.jsdelivr.net/gh/CyrusYip/blog-static@main/images/2021-03-11_wikisisters-with-caption_2.png)。

<!-- ![](https://upload.wikimedia.org/wikipedia/commons/1/1f/Wiki-sisters.png "维基娘的姊妹们（由左至右）：维基共享资源娘、维基百科娘、维基语录娘") -->

如果不需要说明文字，就写 `![维基娘的姊妹们（由左至右）：维基共享资源娘、维基百科娘、维基语录娘](https://upload.wikimedia.org/wikipedia/commons/1/1f/Wiki-sisters.png)`。

<!-- ![维基娘的姊妹们（由左至右）：维基共享资源娘、维基百科娘、维基语录娘](https://upload.wikimedia.org/wikipedia/commons/1/1f/Wiki-sisters.png) -->

## 将图片描述用作说明文字（不推荐）

不推荐此方法的原因是 [`<img>` 元素的 `alt` 属性（描述）](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/alt) 和 [`<figcaption> 元素`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figcaption)意义不同，将前者转换成后者是错的。

如果你的 Markdown 图片链接是只有描述没有标题，也可以把描述变成说明文字。`render-image.html` 需要改为：

```html
<figure class="figure">
  <img class="img" src="{{ .Destination | safeURL }}" alt="{{ .Text }}">
  <figcaption>{{ .Text }}</figcaption>
</figure>
```

`![维基娘的姊妹们（由左至右）：维基共享资源娘、维基百科娘、维基语录娘](https://upload.wikimedia.org/wikipedia/commons/1/1f/Wiki-sisters.png)` 会[显示成这样](https://cdn.jsdelivr.net/gh/CyrusYip/blog-static@main/images/2021-03-11_wikisisters-with-caption_2.png)。

<!-- ![维基娘的姊妹们（由左至右）：维基共享资源娘、维基百科娘、维基语录娘](https://upload.wikimedia.org/wikipedia/commons/1/1f/Wiki-sisters.png) -->

## 样式

我给本站加了一些额外的样式，你可以根据你的需求调整你的网站。`!important` 必要时才用。

```scss
/* remove figure margin */
figure {
  margin: 0 !important;
}
figure > figcaption {
  color: gray;
}
/* image is not clickable because photoswipe is disabled */
p > img {
  cursor: auto !important;
}
/* center img */
// :has only works for browsers after December 2023, see https://caniuse.com/css-has
p:has(.img), .figure{
  text-align: center;
}
```

## 用表格添加说明文字

我还在 Stack Overflow 发现了一个[怪招](https://stackoverflow.com/a/45191209/14399237)：使用单列双行的表格，第一行放图片，第二行放说明文字。

```markdown
|![](图片链接)|
|:-:|
|说明文字|
```

```markdown
| ![](https://www.storywarren.com/wp-content/uploads/2016/09/space-1.jpg) |
|:--:|
| Space |
```

## 参考资料

- [Caption images with markdown render hooks in Hugo | Sebastian De Deyne](https://sebastiandedeyne.com/captioned-images-with-markdown-render-hooks-in-hugo/)
- [Image render hooks | Hugo](https://gohugo.io/render-hooks/images/)
- [html - Accessibility - Difference between `<img alt>` and `<figcaption>` - Stack Overflow](https://stackoverflow.com/questions/58447538/accessibility-difference-between-img-alt-and-figcaption/58468470#58468470)
- [Alt vs Figcaption](https://thoughtbot.com/blog/alt-vs-figcaption)
- [`<img>`: The Image Embed element - HTML: HyperText Markup Language | MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img)
- [`<figure>`: The Figure with Optional Caption element - HTML: HyperText Markup Language | MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figure)
