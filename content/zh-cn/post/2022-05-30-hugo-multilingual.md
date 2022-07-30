---
title: Hugo 多语言博客折腾记
date: '2022-05-30'
slug: hugo-multilingual
tags:
  - blog
  - Hugo
  - blogdown
---

最近在统计之都看大家[讨论博客](https://d.cosx.org/d/423166-frank-harrell-quarto/)，又激起了我的折腾之心，打算把一个大坑给填了：把中文博客改为双语博客。我先建立了一个新的 Git 分支来折腾，成功后才合并到主分支。以下是详细的折腾过程。

## 改用 jane 主题

我原来用的 [even 主题](https://github.com/olOwOlo/hugo-theme-even) 年久失修，作者超过一年没出来处理 Issue 和 Pull Request 了，这个主题的多语言配置也没有详细的说明和配置，于是我就改用 [jane 主题](https://github.com/xianmin/hugo-theme-jane)，这个主题更新及时，要是出 bug 应该也容易解决。jane 主题有[现成的多语言配置](https://github.com/xianmin/hugo-theme-jane/blob/a5a3522fb08a4d85d34bdb02aa156dcdac2c9ac4/dev-config.toml#L28-L100)可以抄，而且手机页面也有目录。

这次改用 git submodule 添加主题，这样就不用把主题里的一堆文件加进 git 仓库了。

```
git submodule add https://github.com/xianmin/hugo-theme-jane.git themes/jane
```

配置就抄这几个文件：

```
./exampleSite/config.toml
./exampleSite/full-config.toml
./dev-config.toml
```

双语配置是这样的：

```toml
defaultContentLanguageInSubdir = "true" # Render English site under /en
[permalinks]
  post = "/post/:year/:month/:day/:slug/"
# language support # en / zh-cn / other... translations present in i18n/
defaultContentLanguage = "en"           # Default language to use
[langusges]
[languages.en]
  title = "Cyrus Yip's Blog"
  languageName = "English"
  contentDir = 'content/en'
  # languageCode = "en"
  # weight = 2
[languages.zh-cn]
  title = "叶寻的博客"
  languageName = "简体中文"
  contentDir = 'content/zh-cn'
  # languageCode = "zh-cn"
  # weight = 1
[author]                  # essential                     # 必需
  name = "Cyrus Yip 叶寻"

[[languages.en.menu.main]]
  name = "Home"
  weight = 10
  identifier = "home"
  url = "/"

[[languages.en.menu.main]]
  name = "Archives"
  weight = 20
  identifier = "archives"
  url = "/post/"
[[languages.en.menu.main]]
  name = "Tags"
  weight = 30
  identifier = "tags"
  url = "/tags/"
[[languages.en.menu.main]]
  name = "Categories"
  weight = 40
  identifier = "categories"
  url = "/categories/"

[[languages.zh-cn.menu.main]]
  name = "主页"
  weight = 10
  identifier = "home"
  url = "zh-cn/"
[[languages.zh-cn.menu.main]]
  name = "归档"
  weight = 20
  identifier = "archives"
  url = "zh-cn/post/"
[[languages.zh-cn.menu.main]]
  name = "标签"
  weight = 30
  identifier = "tags"
  url = "zh-cn/tags/"
[[languages.zh-cn.menu.main]]
  name = "分类"
  weight = 40
  identifier = "categories"
  url = "zh-cn/categories/"
```

内容目录改成这样：

```
❯ tree content
content
├── en
│   ├── abount.md
│   └── post
│       └── 2022-05-24-hello-world.md
└── zh-cn
    ├── about.md
    └── post
        └── 2020-10-02-ubuntu-compile-goldendict.md
```

## URL 重定向

网站改为双语之后，网站链接和原来的不一样了，需要把旧链接重定向到新链接。中文博客链接现在多了 `zh-cn`，以前是这样的：`https://cyrusyip.org/post/2020/10/02/ubuntu-compile-goldendict/`，现在要改成 `https://cyrusyip.org/zh-cn/post/2020/10/02/ubuntu-compile-goldendict/`。RSS 链接也要改。我用 Vercel 部署网站，所以修改 `vercel.json`，使用正则表达式来重定向链接。改动链接和迁移评论前最好关闭网站，以免造成同一篇文章出现两份评论。

```json
  "redirects": [
    {
      "source": "/post/(index.xml)",
      "destination": "/zh-cn/$1"
    },
    {
      "source": "/(about|subscribe|donate)(/?)",
      "destination": "/zh-cn/$1$2"
    },
    {
      "source": "(/post/[0-9].*)",
      "destination": "/zh-cn$1"
    }
  ]
```

[Vercel 重定向的官方文档](https://vercel.com/docs/project-configuration#project-configuration/redirects) 也没介绍它支持哪种正则表达式，我就参照[益辉的配置](https://github.com/rbind/yihui/blob/master/vercel.json)自己尝试了。如果你像我一样对正则表达式读写困难，可以用 regex visualizer 帮助理解。修改后的完整 `vercel.json` [在这里](https://github.com/CyrusYip/cyrusyip-blog/blob/main/vercel.json)。弄好之后可以用 Google Search Console 再看看有没有错误链接。

## 改动内部链接

网站源文件里面的链接也要更改，例如：`[本站的某文章](/post/2021/01/01/hi/)` 要改为 `[本站的某文章](/zh-cn/post/2021/01/01/hi/)`、`https://cyrusyip.org/post/xxx` 改为 `https://cyrusyip.org/zh-cn/post/xxx`。

用 ripgrep 查找源文件里需要改的链接。

```
rg '\[.*\]\(/.*\)' content --only-matching >> todo/internal-links
rg 'cyrusyip\.org' content >> todo/internal-links
```

修正链接。

```bash
sed --regexp-extended -i "s|(\[.*\]\()(/.*\))|\1/zh-cn\2|g" content/zh-cn/post/*
```

剩下的漏网之鱼就自己手动改了。

## 更新博客列表的 RSS 链接

我的博客收录于下面这两个博客列表。

- [shidenggui/bloghub: 一群自由而有趣的灵魂，终将在此相遇 | 独立个人博客推荐导航](https://github.com/shidenggui/bloghub)
- [timqian/chinese-independent-blogs: 中文独立博客列表](https://github.com/timqian/chinese-independent-blogs/)

于是过去提交了 pull request 改 RSS 链接。其实不改也没事，旧链接会重定向到新链接。

## 迁移评论

本站的评论是和文章链接绑定的，因为文章链接改变了，所以要将评论指向新的链接，不然就看不到已有的评论了。本站的评论系统是 Disqus 和 utterances。

### Disqus

Disqus 评论使用 [URL Mapper](https://help.disqus.com/en/articles/1717129-url-mapper) 修改。URL Mapper 使用 `.csv` 文件迁移评论，我先从 Disqus 那里拿到一个 `.csv` 文件。节选内容如下。

```csv
https://cyrusyip.org/about/
https://cyrusyip.org/donate/
https://cyrusyip.org/subscribe/
https://cyrusyip.org/post/2020/11/15/mute-volume-plasma/
```

将它加上逗号和新链接。

```csv
https://cyrusyip.org/about/,https://cyrusyip.org/zh-cn/about/
https://cyrusyip.org/donate/,https://cyrusyip.org/zh-cn/donate/
https://cyrusyip.org/subscribe/,https://cyrusyip.org/zh-cn/subscribe/
https://cyrusyip.org/post/2020/11/15/mute-volume-plasma/,https://cyrusyip.org/zh-cn/post/2020/11/15/mute-volume-plasma/
```

然后再上传到 Disqus 就可以迁移评论了，Disqus 会合并逗号两边的文章评论，并将评论移动到右边的链接。官方文档说可能需要 24 小时才完成迁移，实际上我迁移了 82 份评论，一瞬间就好了。修改 `.csv` 的每一行都是一样的操作：复制整行内容、加逗号、粘贴、加上 `zh-cn`，所以用 Vim 的 `q` 命令录制一次操作，然后就可以批量更改了。以下是操作视频，速度比较慢，可以调到 2 倍速观看。

<video controls style="width:100%; height:100%">
  <source src="https://cdn.jsdelivr.net/gh/CyrusYip/blog-static/videos/2022-05-30_vim-disqus-csv.mp4"></source>
</video>

视频 32 秒执行录制命令时特别慢，主要原因是 coc.nvim 和 fcitx.vim。用 Vim 默认配置（`vim --clean`）瞬间就完成了，看来录制命令最好在无插件下使用。[我专门定义了命令来用 Vim 默认配置打开文件](https://github.com/CyrusYip/dotfiles/blob/c7189ee3f334a429e0463b5c98a7aa4c14fc45b0/dot_vimrc#L147-L148)。

```
" Cv: clean vim, used for fast macro replaying
command Cv silent! w | wviminfo | !vim -c 'set rnu nuw=1' -c 'file' --clean -i ~/.viminfo %
```

Disqus 还有[其他迁移方式](https://help.disqus.com/en/articles/1717068-migration-tools)，不过我觉得还是 URL Mapper 最稳妥。

### utterances

[utterances](https://github.com/utterance/utterances) 使用 GitHub Issue 保存评论。标题为「post/2021/10/11/build-aur-wps/」的 Issue 对应的文章链接为「<https://cyrusyip.org/post/2021/10/11/build-aur-wps/>」。使用 GitHub CLI 修改 Issue 标题就可以迁移评论。

保存 Issue 标题与号码，并用 Vim 打开。

```bash
mkdir todo
gh issue --repo CyrusYip/blog-comment list > todo/utterances
vim todo/utterances
```

Issue 信息是这样的：

```
3	OPEN	about/		2021-10-05 07:07:15 +0000 UTC
2	OPEN	post/2021/03/15/liangfen-shaoxiancao-guilinggao/		2021-04-30 06:53:25 +0000 UTC
1	OPEN	post/2021/03/08/girls-day-womens-day-and-goddesses-day/		2021-03-17 14:46:31 +0000 UTC
```

这里用 Vim 的 `q` 命令批量处理上面的内容，使其变成：

```
gh issue --repo CyrusYip/blog-comment edit 3 --title 'zh-cn/about/'
gh issue --repo CyrusYip/blog-comment edit 2 --title 'zh-cn/post/2021/03/15/liangfen-shaoxiancao-guilinggao/'
gh issue --repo CyrusYip/blog-comment edit 1 --title 'zh-cn/post/2021/03/08/girls-day-womens-day-and-goddesses-day/'
```

然后在 Vim 执行 `:%!bash`，用 BASH 执行上面的命令。utterances 只能移动评论，不能合并评论。移动前最好关闭网站，以免造成同一篇文章出现两份评论。

## 增加标题级别

之前我写文章都是先用 Markdown 的一级标题，但根据 MDN 和 Bing Webmaster Tools，使用多个 `<h1>` 标题是错误的。

> Use only one `<h1>` per page or view. It should concisely describe the overall purpose of the content.
>
> Using more than one `<h1>` is allowed by the HTML specification, but is not considered a best practice. Using only one `<h1>` is beneficial for screenreader users.
>
> —<https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements#usage_notes>

> These pages have more than one `<h1>` tag. Multiple `<h1>` header tags might confuse search engine bots and website's users. It is recommended to use only one `<h1>` tag per page.
>
> —SEO Reports from Bing Webmaster Tools

这次难得折腾，就彻底整改吧。依然是用正则表达式解决：

```
find content/ -type f -exec perl -0777 -i -pe 's/(?<=\n\n)(#.*)(?=\n\n)/#$1/g' {} +
```

上面的正则表达式查找的是「以 `#` 开头的行，并且它上下都有 1 个空行」，然后在查找到的内容前面增加 `#`，也就是增加了 1 个标题级别。处理完之后用 VS Code 手动检查，没问题就提交 commit。可以用 VS Code 搜索 `^# `，看看有没有遗漏的。

[preservim/vim-markdown](https://github.com/preservim/vim-markdown) 的 `:HeaderIncrease` 和 pandoc 的 `--shift-heading-level-by=1` 选项也可以用来增加标题级别。但是这两个工具都有问题，vim-markdown 会将 Markdown 文件 YAML 内容后两行当成标题，pandoc 会修改 YAML 内容。还是自己老老实实写的正则表达式好。

## 添加 favicon

用 <https://realfavicongenerator.net/> 将我的头像做成 favicon，放到 `/static` 文件夹。

## Jane 主题的问题

从 Even 主题切换到 Jane，还是遇到了一些小问题。

- [ ] 没有文章总数功能，Even 主题是有的（解决办法：在博客目录用 `tree content/` 命令查看文件数）。
- [ ] 不蒜子流量统计在英文博客下仍显示中文。
- [ ] 不能给不同语言设置不同作者名，例如：中文博客作者是「叶寻」，英文博客作者是「Cyrus Yip」（临时解决办法：中英名字都写入作者名，也就是「Cyrus Yip 叶寻」）。
- [ ] 用 Vercel 部署博客时 [`params.gitInfo` 功能会出错](https://github.com/CyrusYip/cyrusyip-blog/commit/1e5c4a04813065a46f71b0183977f90cb363a6a7)，本地部署就没事，不知道咋回事。

修改网站是永无止境的，这些小问题就忍忍吧，太纠结反而没时间写文章了。博客内容最重要，功能够用外观不丑就行。

## 代办事项

这是我想做的一些事。先挖坑，~~看看有没有人帮我埋~~。

- [ ] 自动备份 utterances 评论
- [ ] 自动备份 Disqus 评论

## 资料和工具

- [E Personal Experience | blogdown: Creating Websites with R Markdown](https://bookdown.org/yihui/blogdown/personal-experience.html)（谢益辉的博客写作经验）
- [iggredible/Learn-Vim: Learn Vim (the Smart Way)](https://github.com/iggredible/Learn-Vim)（Vim 教程，学完第九章 Macros 就能在迁移评论时批量处理）
- [ziishaned: Learn regex the easy way](https://github.com/ziishaned/learn-regex)（正则表达式入门教程）
- regex visualizer（正则表达式可视化工具，用于理解正则表达式，上谷歌能搜到很多）
- vimtutor（Vim 的官方教程，先学这个，再学 Learn-Vim）

