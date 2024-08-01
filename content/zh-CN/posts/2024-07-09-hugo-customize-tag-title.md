---
title: Hugo：自定义标签标题
date: 2024-07-09T00:00:00+08:00
slug: hugo-customize-tag-title
tags:
  - blog
  - hugo
lastmod: 2024-07-10T16:08:15+08:00
---

## 背景

一开始我用 Hugo 做中文网站时打算在文章里用中文标签，但是链接里面的中文会被[转换](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURI)为人类读不懂的字符。比如：`http://localhost:1313/zh-cn/tags/博客/` 会变成 `http://localhost:1313/zh-cn/tags/%E5%8D%9A%E5%AE%A2/`。我不喜欢这样，当时搜索一番也没找到办法，就用英文标签了。现在终于知道怎么改了，最终改为链接里面还是用英文，但是页面就显示中文。

下面是针对 [hugo-theme-jane（ef8a126）主题](https://github.com/xianmin/hugo-theme-jane/tree/ef8a12657b0700f9acd693894597d50746365ed8)的更改方法，方法是通用的，但是不同主题修改的部分可能不同。开始前先厘清两个概念：标签名（tag name）、标签标题（tag title）。在文章前页（front matter）写的是标签名，用于链接；在 `_index.md` 文件定义的是 title 是标签标题，它会显示于页面。

```yaml
---
# /content/zh-cn/post/2021-03-21-dongman.md
title: 动漫这个词不能再用了
tags:
  - anime # 标签名
---
```

```yaml
---
# /content/zh-cn/tags/anime/_index.md
title: 日本动画 # 标签标题
---
```

如果你启用了 GitInfo 而且不想更改 lastmod，请参考 [Hugo：给文章添加 lastmod（上次修改时间）](/zh-cn/post/2024/05/25/hugo-add-lastmod-to-posts/)。

## 修改标签单页标题（`/zh-cn/tags/*/`）

以 anime（日本动画）为例。先自定义一个标签的标题。

```shell
mkdir --parents content/zh-cn/tags/anime/
touch content/zh-cn/tags/anime/_index.md
```

添加内容：

```yaml
---
# /content/zh-cn/tags/anime/_index.md
title: 日本动画
---
```

文章前页（front matter）的 tags 还是保持用 anime。

```yaml
---
# /content/zh-cn/post/2021-03-21-dongman.md
title: 动漫这个词不能再用了
tags:
  - anime
---
```

现在 `/zh-cn/tags/anime/` 会显示「日本动画」。

## 修改文章底下的标签标题（`/zh-cn/post/*`）

在浏览器 inspect 找到 CSS 类，然后去 VS Code 搜索。

本地预览网站。随便打开一篇文章（<http://localhost:1313/zh-cn/post/2022/12/03/ajin-oad/>），滚动到底部的标签，右击 Inspect，可以看到对于的 HTML 代码。

```html
<div class="post-tags">
  <a href="http://localhost:1313/zh-cn/tags/anime/">anime</a>
</div>
```

搜索主题目录。

```shell
rg '<div class="post-tags">' themes/jane
```

可以发现此代码就在 `themes/jane/layouts/post/single.html`，将其复制到 `layouts/post/`（我之前复制过，这次跳过此步骤）。

编辑 `layouts/post/single.html`。

找到下面这段代码：

```html
<div class="post-tags">
  {{ range . }}
  {{- $name := . -}}
  {{- with $.Site.GetPage "taxonomy" (printf "tags/%s" $name) | default ($.Site.GetPage "taxonomy" (printf "tags/%s" ($name | urlize))) -}}
  <a href="{{ .Permalink }}">{{ $name }}</a>
  {{ end -}}
  {{ end }}
</div>
```

将 `<a href="{{ .Permalink }}">{{ $name }}</a>` 里面的 `$name` 改为 `.LinkTitle`。改完是这样的：

```html
<a href="{{ .Permalink }}">{{ .LinkTitle }}</a>
```

现在 `http://localhost:1313/zh-cn/post/2021/03/21/dongman/` 底下会显示标签「日本动画」。

## 修改标签列表页面（`/zh-cn/tags/`）

用前面的方法 Inspect 元素并搜索代码。

```shell
rg '<div class="tag-cloud-tags">' themes/jane
```

可以发现标签列表页面的模板为 `themes/jane/layouts/_default/terms.html`，复制一份到根目录再改。

```shell
mkdir --parents layouts/_default/
cp themes/jane/layouts/_default/terms.html layouts/_default/
git add layouts/_default/terms.html
git commit --message 'chore: copy layouts/_default/terms.html'
```

打开 `layouts/_default/terms.html`，搜索 `tag-cloud-tags`，找到这段代码。

```html
<div class="tag-cloud-tags">
...
  <a href="{{ .Permalink }}"
    style="font-size:{{$currentFontSize}}{{$fontUnit}}">{{ $tagName }}</a>
...
</div>
```

将里面的 `$tagName` 改为 `.LinkTitle`：

```html
<a href="{{ .Permalink }}"
  style="font-size:{{$currentFontSize}}{{$fontUnit}}">{{ .LinkTitle }}</a>
```

提交改动。

```shell
git add layouts/_default/terms.html layouts/post/single.html
git commit --message 'feat: use tag title'
```

## 修改所有标签名，加上标签标题

标签名全部改成全小写，以连字符分割。改动比较多，新建一个分支，提交完再合并到主分支。

```
git switch --create customize-tag-titles
```

使用 VS Code 插件 [Front Matter CMS](https://frontmatter.codes/) 修改标签名。

加标签标题就比较繁琐，要自己创建文件。我让 ChatGPT 给我写了个脚本，好使！

我说的话：

> I am customizing tag titles in a Hugo website. I want you to create a CLI program.
>
> ```
> create-tag-title directory tag-name tag-title
> ```
>
> If I run
>
> ```
> create-tag-title content/en arch-linux 'Arch Linux'
> ```
>
> the program should create ` content/en/tags/arch-linux/_index.md`, the content of `_index.md` should be:
>
> ```
> ---
> title: Arch Linux
> ---
> ```

ChatGPT 给的 Python 脚本（[Shebang](https://zh.wikipedia.org/zh-cn/Shebang) 是我加的[^de]）：

[^de]: 写完文章我才想到可以让 ChatGPT 加 Shebang

```python
#!/usr/bin/env python 
import os
import sys

def create_tag_title(directory, tag_name, tag_title):
    # Construct the path to the tag directory
    tag_dir = os.path.join(directory, 'tags', tag_name)
    
    # Make the directories if they don't exist
    os.makedirs(tag_dir, exist_ok=True)
    
    # Define the path for the _index.md file
    index_file_path = os.path.join(tag_dir, '_index.md')
    
    # Define the content of the _index.md file
    index_content = f"""---
title: {tag_title}
---
"""
    # Write the content to the _index.md file
    with open(index_file_path, 'w') as index_file:
        index_file.write(index_content)

    print(f"Created {index_file_path} with title: {tag_title}")

if __name__ == '__main__':
    # Ensure the correct number of arguments are provided
    if len(sys.argv) != 4:
        print("Usage: create-tag-title directory tag-name tag-title")
        sys.exit(1)

    # Read the arguments from the command line
    directory = sys.argv[1]
    tag_name = sys.argv[2]
    tag_title = sys.argv[3]

    # Call the function to create the tag title file
    create_tag_title(directory, tag_name, tag_title)
```

自己写提交信息还是太繁琐，让 ChatGPT 把这部分也加上。

我说的话：

> Besides creating the `_index.md`, I want to stage `content/` directory and commit. Example:
>
> ```
> git add content/; git commit -m 'tag-title: arch-linux -> Arch Linux'
> ```

ChatGPT 返回的代码（Shellbang 是我加的）：

```python
#!/usr/bin/env python
import os
import sys
import subprocess

def create_tag_title(directory, tag_name, tag_title):
    # Construct the path to the tag directory
    tag_dir = os.path.join(directory, 'tags', tag_name)
    
    # Make the directories if they don't exist
    os.makedirs(tag_dir, exist_ok=True)
    
    # Define the path for the _index.md file
    index_file_path = os.path.join(tag_dir, '_index.md')
    
    # Define the content of the _index.md file
    index_content = f"""---
title: {tag_title}
---
"""
    # Write the content to the _index.md file
    with open(index_file_path, 'w') as index_file:
        index_file.write(index_content)

    print(f"Created {index_file_path} with title: {tag_title}")

    # Stage the content directory
    try:
        subprocess.run(['git', 'add', directory], check=True)
        print(f"Staged {directory}")

        # Commit the changes
        commit_message = f'tag-title: {tag_name} -> {tag_title}'
        subprocess.run(['git', 'commit', '-m', commit_message], check=True)
        print(f"Committed with message: '{commit_message}'")
    except subprocess.CalledProcessError as e:
        print(f"Error during git operation: {e}")

if __name__ == '__main__':
    # Ensure the correct number of arguments are provided
    if len(sys.argv) != 4:
        print("Usage: create-tag-title directory tag-name tag-title")
        sys.exit(1)

    # Read the arguments from the command line
    directory = sys.argv[1]
    tag_name = sys.argv[2]
    tag_title = sys.argv[3]

    # Call the function to create the tag title file
    create_tag_title(directory, tag_name, tag_title)
```

我使用的 Python 版本是 3.12.4。

## 检查链接变化

可以在修改前后构建网站，用于对比。如果链接有变化，需要重定向旧链接。改了一堆东西，我已经没心思检查了，忽略此步骤。

## 参考资料

- [Custom slug encoding rules for tags, titles, taxonomies - support - HUGO](https://discourse.gohugo.io/t/custom-slug-encoding-rules-for-tags-titles-taxonomies/33421)
- <https://github.com/adityatelange/hugo-PaperMod/blob/3f50861a0ced88f9b614a43662edeb4c0bc45da8/layouts/_default/single.html#L49>
