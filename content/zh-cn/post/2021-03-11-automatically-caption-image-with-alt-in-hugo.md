---
title: 让 Hugo 自动给图片加上说明文字
date: '2021-03-11'
slug: automatically-caption-image-with-alt-in-hugo
tags:
  - Markdown
  - blog
---

开始写博客之后我发现了 Markdown 缺少一个重要功能：给图片加上说明文字。Markdown 插入图片的语法是这样的：

```markdown
![这是一张图片](图片链接)
```

我希望「这是一张图片」可以显示在图片底部。想修改网站样式的时候，我常常告诫自己要[多写文章，少美化网站](http://disq.us/p/2eextk4)。毕竟写作灵感稍纵即逝，样式却随时可以改。可能是今天牙痛比较烦躁，想起这个问题就很想解决掉。在谷歌搜索一番，发现了[一篇文章](https://sebastiandedeyne.com/captioned-images-with-markdown-render-hooks-in-hugo/)（[存档](https://web.archive.org/web/20210311160748/https://sebastiandedeyne.com/captioned-images-with-markdown-render-hooks-in-hugo/)）里有给图片加说明文字的方法。我根据里面的代码略作修改，就搞定这个问题了。步骤如下：

1. 在博客根目录下新建 `layouts/_default/_markup/render-image.html`

    ```bash
    mkdir layouts/_default/_markup/ -p
    touch layouts/_default/_markup/render-image.html
    ```

2. 往 `render-image.html` 填入以下内容

    ```html
    <figure>
    <center>
    <img src="{{ .Destination | safeURL }}" alt="{{ .Text }}">
    <figcaption>{{ .Text }}</figcaption>
    </center>
    </figure>
    ```

现在输入：

```markdown
![维基娘的姊妹们（由左至右）：维基共享资源娘、维基百科娘、维基语录娘](https://upload.wikimedia.org/wikipedia/commons/1/1f/Wiki-sisters.png)
```

它会被显示为：

![](https://cdn.jsdelivr.net/gh/CyrusYip/blog-static/images/2021-03-11_wikisisters-with-caption.png)

另外，我还在 Stack Overflow 发现了一个[怪招](https://stackoverflow.com/a/45191209/14399237)：使用单列双行的表格，第一行放图片，第二行放说明文字。

```markdown
|![](图片链接)|
|:-:|
|说明文字|
```

```markdown
| ![space-1.jpg](http://www.storywarren.com/wp-content/uploads/2016/09/space-1.jpg) | 
|:--:| 
| *Space* |
```

效果如下：

| ![space-1.jpg](https://www.storywarren.com/wp-content/uploads/2016/09/space-1.jpg) | 
|:--:| 
| *Space* |
