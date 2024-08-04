---
title: 2024-08-03 本站改动：使用 Yue 主题和 giscus 评论，post 目录改为 posts
date: 2024-08-03T00:00:00+08:00
slug: 20240803-current-website-changes
tags:
  - blog
  - hugo
lastmod: 2024-08-04T19:13:44+08:00
---

本文列举了本站于2024年7月28日至2024年08月03日的改动。

- 清理无用文件
- 使用我写的 [Yue 主题](https://github.com/CyrusYip/hugo-theme-yue)（感觉自己从几乎不折腾博客一下走到折腾博客的尽头了，用自己的主题太爽了，哈哈）
- 讲 utterances 评论服务改为 giscus（终于可以回复评论了，不需要引用文字或者 `@`）
- 将 `post` 文件夹改为 `posts`

改动很多，最好在 Git 仓库建一个分支搭配子域名（如 `test.cyrusyip.org`）测试，没问题再合并代码至主分支。修改网站要注意功能和链接（URL）变动，改了链接要修改文章内部链接、重定向、迁移评论。

## 清理无用文件

不再使用以下软件/服务：

- blogdown
- Netlify
- Vercel
- ……

删除相关文件，修订自述文件和 `package.json`。

## 将主题换为 Yue

先构建一次，保存起来

```shell
cd cyrusyip-blog
mkdir ~/Desktop/blog-builds
rm -r public; npx hugo # hugo 前面多了 npx 是因为我用 npm 安装 hugo
mv public ~/Desktop/blog-builds/jane
```

删除 Jane 主题和相关文件，重命名配置和中文内容文件夹。

```shell
# 删除相关文件
rm -r assets layouts resources
git add --all
git commit --message 'chore: remove custom files related to jane theme'
# 删除主题
git submodule deinit themes/jane # 修改 .git/config
git rm themes/jane # 修改 .gitmodules
rm -rf .git/modules/themes/jane # 删除本地文件
git commit --message 'feat!: remove jane theme'
# 重命名
mv config.toml _config.toml
mv content/zh-cn content/zh-CN
git add --all
git commit --message 'refactor: rename to content/zh-CN and _config.toml'
```

安装主题。

```shell
git submodule add --depth=1 https://github.com/CyrusYip/hugo-theme-yue themes/hugo-theme-yue
git commit --message 'feat: add hugo-theme-yue'
```

写新配置，对照原来的配置（`_config.toml`）。删掉了 keywords、description、Google Analytics、Disqus、utterances，后面再加回来。

```shell
cp themes/hugo-theme-yue/exampleSite/hugo.yaml .
# 写好新配置后删除旧配置
rm _config.toml
```

构建，对比目录名和文件名变化，如果没变化表示 URL（链接）没变化。用 tree 命令列举两次构建的文件，复制到剪切板，使用 [Diffchecker](https://www.diffchecker.com/) 对比。

```shell
rm -r public; npx hugo
# 旧主题
tree ~/Desktop/blog-builds/jane | wl-copy
# 新主题
tree ~/Desktop/blog-builds/yue | wl-copy
```

新主题编译的网站少了一些没用到的页码，这里无需处理。新网站还多了一篇 `2021-01-29-python-calculate-utility-bills.Rmarkdown`，这是 Rmarkdown 文件，不应该出现于此，在配置文件忽略它。

```yaml
# hugo.yaml
ignoreFiles: ["\\.Rmd$", "\\.Rmarkdown$", "_cache$", "\\.knit\\.md$", "\\.utf8\\.md$"]
```

构建网站后再对比，没这个 `.Rmarkdown` 文件了。

对比：

- 原主题编译的网站有 607 个目录，480 个文件，构建时间 750ms。
- 新主题编译的网站有 398 个目录，354 个文件，构建时间 450ms。新网站关闭了 `enableGitInfo`，还没添加统计和评论功能（只是加脚本应该不太会影响构建时间）。

用肉眼对比新旧网站，看看有没有问题。看样式、文章数量、日期等。

## 添加本站原有的功能

- [x] Google Analytics
- [x] utterances
- [x] Disqus
    - [x] 只在 cyrusyip.org 上面显示
    - [x] 这次加上了多语言功能
- [x] 图片说明文字
- [x] 页脚
    - [x] 社交媒体、~~Github、Stack overflow、Twitter~~
    - [x] CC BY-NC-SA 4.0 协议
- [x] meta description
- [ ] ~~keywords~~（meta keywords 已过时，参看 [Meta Keywords：是什么、为什么不 | Sukka's Blog](https://blog.skk.moe/post/say-no-to-meta-keywords/)）

## 将 utterances 评论改为 giscus

另建一个站点测试会比较稳妥，但这次为了节约时间就直接改了。

[giscus](https://giscus.app/) 由 [GitHub Discussions](https://docs.github.com/en/discussions) 驱动，功能比 utterances 强，支持多语言和回复评论。

转换步骤：

1. 删除网站的 utterances
2. 给相关 issue 打标签「Comments」，issue 不多我就直接在网页操作了，一次可以改一页，多的话用 `gh issue edit` 命令
3. 开启 Discussion，新建类别「Comments」
4. 测试 giscus 是否能新建讨论，标题是否正确
5. 转换 issue（Comments  标签）为 discussion（ Comments 类别），参看 [Managing discussions - GitHub Docs#converting-issues-based-on-labels](https://docs.github.com/en/discussions/managing-discussions-for-your-community/managing-discussions#converting-issues-based-on-labels)。页面显示「Open issues with label 'Comments' are being converted to discussions」，但是过了一两个小时都没反应，最后手动转换了。
6. 创建 `giscus.json` 配置文件，限制域名，参看 [giscus/ADVANCED-USAGE.md#origins](https://github.com/giscus/giscus/blob/main/ADVANCED-USAGE.md#origins)
7. 在 GitHub 卸载 utterances
8. 把仓库名 `blog-comment` 改为 `blog-comments`，去 giscus 官网重新获取脚本（非必须步骤，这里存了超过一则评论，所以用复数 comments）

## post 文件夹改为 posts

之前用的 [Even 主题](https://github.com/olOwOlo/hugo-theme-even) 和 [Jane 主题](https://github.com/xianmin/hugo-theme-jane/) 要求内容放在 `content/post` 文件夹，但是标签（`/tags/`）和类别（`/categories/`）用的是复数，我觉得这非常不协调。这次换主题终于可以改成复数 `posts` 了。

改了之后网站链接（URL）会变化，需要重定向旧链接、修改文章内链接、迁移评论，参考我之前写的文章（真是帮了大忙）：

- [Hugo 多语言博客折腾记](/zh-cn/posts/2022/05/30/hugo-multilingual/)
- [把 Hugo 网站从 Vercel 搬到 Cloudflare Pages](/zh-cn/posts/2023/11/05/hugo-vercel-to-cloudflare-pages/)

### 重命名文件夹

构建未修改的网站并保存。

```shell
cd cyrusyip-blog
rm -r public; npx hugo
mv public ~/Desktop/blog-builds/before
```

重命名文件夹。

```shell
mv content/en/post content/en/posts
mv content/zh-CN/post content/zh-CN/posts
```

预览并修改配置。

```
rm -r public; npx hugo server --navigateToChanged --bind 0.0.0.0
```

```diff
--- a/hugo.yaml
+++ b/hugo.yaml

-    post: /post/:year/:month/:day/:slug/
+    posts: /posts/:year/:month/:day/:slug/

-          pageRef: /post
+          pageRef: /posts
```

```diff
--- a/frontmatter.json
+++ b/frontmatter.json

-      "path": "[[workspace]]/content/en/post",
+      "path": "[[workspace]]/content/en/posts",

-      "path": "[[workspace]]/content/zh-CN/post",
+      "path": "[[workspace]]/content/zh-CN/posts",
```

```
git add --all
git commit --message "refactor: content/*/post -> content/*/posts"
```

关掉 Hugo 服务器，构建修改后的网站并保存。

```shell
rm -r public; npx hugo
mv public ~/Desktop/blog-builds/after
```

复制两个网站目录的结构到剪切板，用 [Diffchecker](https://www.diffchecker.com/) 对比。

```shell
# 旧网站，Original text
tree ~/Desktop/blog-builds/before | wl-copy
# 新网站，Changed text
tree ~/Desktop/blog-builds/after | wl-copy
```

就只是 `post` 目录变成了 `posts`。

```diff
- /en/post
+ /en/posts

- /zh-cn/post
+ /zh-cn/posts
```

### 修改文章内部链接

要将 `[本站的某文章](/zh-cn/post/2021/01/01/hi/)` 这样的链接改成 `[本站的某文章](/zh-cn/posts/2021/01/01/hi/)`。
获取包含链接的文件，并删掉不需要改的链接。

```shell
mkdir todo
rg '\[.*\]\(/.*\)' content --only-matching >> todo/internal-links
rg 'cyrusyip\.org' content >> todo/internal-links
```

链接记录节选：

```
content/zh-CN/posts/2021-06-19-ac2100-openwrt.md:[红米 AC2100 刷 breed 后刷回官方固件](/zh-cn/post/2022/10/16/ac2100-stock-firmware/)
content/zh-CN/posts/2021-08-30-raspberry-pi-4b-openwrt.md:[在 OpenWrt 控制树莓派 Argon Mini Fan](/zh-cn/post/2021/09/15/openwrt-argon-mini-fan/)
content/zh-CN/posts/2021-08-30-raspberry-pi-4b-openwrt.md:[树莓派 4B 超频教程](/zh-cn/post/2021/09/20/raspberry-pi4-overclock/)
```

自己手动改链接，改一条就删去一条记录。使用 `hugo server --navigateToChanged` 命令预览网站可以很方便地查看变化。

我一开始让 ChatGPT 写 Node.js 脚本帮我改，多番交流后它生成了一些不存在的链接，看来这个工作还是太难为它。

### 重定向

现在本站使用 Cloudflare Pages 构建，参考 [Redirects · Cloudflare Pages docs](https://developers.cloudflare.com/pages/configuration/redirects/) 设置重定向。我有点搞不懂我之前写的一些重定向规则，所以要写好注释，未来的我会感谢现在写注释的我。

```
# static/_redirect
######################################################################
# Rename "content/{en,zh-CN}/post" to "content/{en,zh-CN}/posts"
# URL changes: /en/post/ -> /en/posts/ , /zh-cn/post/ -> /zh-cn/posts/
######################################################################
/en/post/*      /en/posts/:splat      308
/zh-cn/post/*   /zh-cn/posts/:splat   308
```

测试链接：

- [x] <https://cyrusyip.org/zh-cn/post/>
- [x] <https://cyrusyip.org/zh-cn/post/2024/04/05/i-hate-obscure-words/>
- [x] <https://cyrusyip.org/en/post/>
- [x] <https://cyrusyip.org/en/post/2023/12/20/run-different-hugo-versions/>
- [x] 测试部分[旧中文网站的链接](/zh-cn/posts/2023/11/05/hugo-vercel-to-cloudflare-pages/#%e9%87%8d%e5%ae%9a%e5%90%91%e4%be%8b%e5%ad%90)
    - [x] <https://cyrusyip.org/about/>

### 关闭评论

关闭 Disqus 和 giscus 评论，以免迁移时有读者留言。

### 迁移 Disqus 评论

参考教程：[How to download, edit, and upload a URL Map CSV | Disqus](https://help.disqus.com/en/articles/1717127-how-to-download-edit-and-upload-a-url-map-csv)

打开[迁移工具](https://disqus.com/admin/discussions/migrate/)，点击「Start URL mapper」->「you can download a CSV here」，去邮箱拿到下载链接，下载并解压。这个 CSV 里面的链接非常乱，有无评论的、带查询参数的（`/?utterances=xxx`）、失效链接。建一个 Git 仓库，把 CSV 文件放进去并提交，后面方便看改动。

修改 CSV，留下以 `https://cyrusyip.org/zh-cn/post` 和 `https://cyrusyip.org/en/post` 开头的。

文件节选：

```
https://cyrusyip.org/zh-cn/post/2021/03/08/girls-day-womens-day-and-goddesses-day/
https://cyrusyip.org/zh-cn/post/2021/01/10/remove-odor/
```

在 Vim 执行 `:%s/.*/&,&`，现在每行都有两个一样的链接，提交改动。

```csv
https://cyrusyip.org/zh-cn/post/2021/03/08/girls-day-womens-day-and-goddesses-day/,https://cyrusyip.org/zh-cn/post/2021/03/08/girls-day-womens-day-and-goddesses-day/
https://cyrusyip.org/zh-cn/post/2021/01/10/remove-odor/,https://cyrusyip.org/zh-cn/post/2021/01/10/remove-odor/
```

执行 `:%s/\v(.*)(post)/\1posts`，现在把每行第二个链接的 `post` 改成 `posts`，提交改动。

```csv
https://cyrusyip.org/zh-cn/post/2021/03/08/girls-day-womens-day-and-goddesses-day/,https://cyrusyip.org/zh-cn/posts/2021/03/08/girls-day-womens-day-and-goddesses-day/
https://cyrusyip.org/zh-cn/post/2021/01/10/remove-odor/,https://cyrusyip.org/zh-cn/posts/2021/01/10/remove-odor/
```

把修改后的 CSV 文件上传到 Disqus 的 URL mapper。


### 迁移 giscus 评论

将标题的 `post` 改为 `posts`。

示例：

```diff
- zh-cn/post/2024/04/05/i-hate-obscure-words/
+ zh-cn/posts/2024/04/05/i-hate-obscure-words/
```

[GitHub CLI](https://cli.github.com/) 不支持修改 Discussion，又得手动改了。

### 查看评论

这几篇文章有 Disqus 评论，打开看看是否有评论。

- [x] <https://cyrusyip.org/zh-cn/post/2022/05/30/hugo-multilingual/>
- [x] <https://cyrusyip.org/zh-cn/post/2023/11/05/hugo-vercel-to-cloudflare-pages/>
- [x] <https://cyrusyip.org/en/post/2023/01/31/install-microcode-on-proxmox/>

在 [Discussions](https://github.com/CyrusYip/blog-comments/discussions) 里找几篇文章，打开看看是否有评论。

- [x] <https://cyrusyip.org/zh-cn/posts/2024/04/05/i-hate-obscure-words/>
- [x] <https://cyrusyip.org/en/post/2023/11/30/proxmox-network-config/>

### 开启评论

可以看到评论，重新打开 Disqus 和 giscus。