---
title: 把 Hugo 网站从 Vercel 搬到 Cloudflare Pages
date: 2023-11-05T00:00:00+08:00
slug: hugo-vercel-to-cloudflare-pages
tags:
  - Hugo
  - Vercel
  - cloudflare
lastmod: 2023-12-17T03:35:00+08:00
---

## 起因

本 Hugo 网站原本使用 Vercel 构建，但是它只获取 Git 源代码仓库的前十次提交[^jiao]，多数文章的更新时间会出错，变成最新提交的时间。于是我就改用支持克隆整个仓库的 Cloudflare Pages。本站的 [RSS 订阅文件消耗流量大](/zh-cn/post/2022/11/22/cache-rss-with-cloudflare/)，搬到无限流量的 Cloudflare Pages 也比较合适。本文发布时本站已搬到 Cloudflare Pages 超过一个月，一切正常。

[^jiao]: [Configuring a Build | Vercel Docs](https://vercel.com/docs/deployments/configure-a-build): When you make a [deployment](https://vercel.com/docs/deployments/overview), Vercel builds your project. During this time, Vercel performs a "shallow clone" on your Git repository using the command `git clone --depth=10 (...)` and fetches ten levels of git commit history. This means that only the latest ten commits are pulled and not the entire repository history.

搬迁的主要步骤包括：写重定向配置文件、解决 Cloudflare Pages 导致的问题、创建 Cloudflare Pages 应用、删除 Vercel 项目。

## 重定向配置

Cloudflare Pages 的重定向配置写法和 Vercel 不一样。参考 [Redirects · Cloudflare Pages docs](https://developers.cloudflare.com/pages/platform/redirects/) 写一份。

[Vercel 的重定向配置](https://github.com/CyrusYip/cyrusyip-blog/blob/f1d927a68954eaaf3cec3b3f6fb7c32d2ea2d24f/vercel.json#L10-L31)：

```json
{
  "redirects": [
    {
      "source": "/(index.xml)",
      "destination": "/zh-cn/$1"
    },
    {
      "source": "/(post/index.xml)",
      "destination": "/zh-cn/$1"
    },
    {
      "source": "/(about|subscribe|donate)(/?)",
      "destination": "/zh-cn/$1$2"
    },
    {
      "source": "(/post/[0-9].*)",
      "destination": "/zh-cn$1"
    },
    {
      "source": "/(tags|categories)(/?.*)",
      "destination": "/zh-cn/$1$2"
    }
  ]
}
```

[Cloudflare Pages 的重定向配置](https://github.com/CyrusYip/cyrusyip-blog/blob/f1d927a68954eaaf3cec3b3f6fb7c32d2ea2d24f/static/_redirects)：

```
# This file is used by Cloudflare Pages
# To improve performance, put splats and placeholders to the bottom

###########################
### Old Chinese Website ###
###########################
## RSS
/index.xml         /zh-cn/index.xml          308
/index.xml/        /zh-cn/index.xml          308
/post/index.xml    /zh-cn/post/index.xml     308
/post/index.xml/   /zh-cn/post/index.xml     308
## Menu
/about             /zh-cn/about/             308
/about/            /zh-cn/about/             308
/subscribe         /zh-cn/subscribe/         308
/subscribe/        /zh-cn/subscribe/         308
/donate            /zh-cn/donate/            308
/donate/           /zh-cn/donate/            308
/tags              /zh-cn/tags/              308
/categories        /zh-cn/categories/        308
/tags/*            /zh-cn/tags/:splat        308
/categories/*      /zh-cn/categories/:splat  308
## Post
/post/:year/:month/:day/:slug  /zh-cn/post/:year/:month/:day/:slug/ 308
/post/:year/:month/:day/:slug/ /zh-cn/post/:year/:month/:day/:slug/ 308
# Examples:
# /post/2020/10/02/ubuntu-compile-goldendict
# /post/2020/10/02/ubuntu-compile-goldendict/


#######################
### Current Website ###
#######################
## RSS links shouldn't contain a trailing slash
/en/index.xml/     /en/index.xml             308
/zh-cn/index.xml/  /zh-cn/index.xml          308
```

## 在根目录创建 404 页面

本 Hugo 多语言网站的 `defaultContentLanguageInSubdir = "true"` 配置导致构建网站后根目录没有 404.html 文件，`/en/` 和 `/zh-cn/` 才有。[此时 Cloudflare 认为网站是单页应用](https://community.cloudflare.com/t/redirects-rule-for-all-404-page-to-homepage/449500)，用户访问 `/non-existent-page/` 这样的路径网页就会跳转到 `/` 并且返回 200 状态码。这是错误的行为，所以要让 Hugo 构建后根目录有 404.html。解决方法请看 [Create Top-Level 404 Page for a Multilingual Hugo Site - Cyrus Yip's Blog](/en/post/2023/11/06/hugo-top-level-404/)，我目前使用了[自己写的 404 页面](https://github.com/CyrusYip/cyrusyip-blog/blob/0b6d0b826d25470a471f5e8503d49055b8a7fc95/static/404.html)。

## 去掉缓存规则

之前在 [Cloudflare 设置了缓存 RSS 文件](/zh-cn/post/2022/11/22/cache-rss-with-cloudflare/)，现在不需要这些规则了，删除之。

## 自定义样式使用 SCSS 格式

Cloudflare 会缓存 `custom.css`，改用 [SCSS 格式](https://github.com/CyrusYip/cyrusyip-blog/blob/0b6d0b826d25470a471f5e8503d49055b8a7fc95/assets/sass/_custom/_custom.scss)就不会出问题。

## 创建应用

使用以下配置创建 Cloudflare Pages 应用，然后配置域名。

| Build settings           |                                 |
| ------------------------ | ------------------------------- |
| `Framework preset`       | `None`                          |
| `Build command`          | `git fetch --unshallow && hugo` |
| `Build output directory` | `public`                        |

| Environment variables |          |
| --------------------- | -------- |
| `HUGO_VERSION`        | `0.99.1` |

具体操作请看教程：

- [Get started guide · Cloudflare Pages docs](https://developers.cloudflare.com/pages/get-started/guide/)
- [Custom domains · Cloudflare Pages docs](https://developers.cloudflare.com/pages/platform/custom-domains/)

## Cloudflare Pages 的缺点

- 重定向不支持正则表达式
- 一个仓库只能导入一次
- 不支持配置文件

## 重定向例子

- [ ] https://cyrusyip.org/index.xml
    - [ ] https://cyrusyip.org/zh-cn/index.xml
- [ ] https://cyrusyip.org/zh-cn/post/index.xml
    - [ ] https://cyrusyip.org/zh-cn/post/index.xml
- [ ] https://cyrusyip.org/about
    - [ ] https://cyrusyip.org/zh-cn/about
- [ ] https://cyrusyip.org/subscribe
    - [ ] https://cyrusyip.org/zh-cn/subscribe
- [ ] https://cyrusyip.org/donate
    - [ ] https://cyrusyip.org/donate
- [ ] https://cyrusyip.org/post/2020/10/02/ubuntu-compile-goldendict/
    - [ ] https://cyrusyip.org/zh-cn/post/2020/10/02/ubuntu-compile-goldendict/
- [ ] https://cyrusyip.org/post/2020/11/01/use-fcitx5-in-rstudio-on-kubuntu20.10/
    - [ ] https://cyrusyip.org/zh-cn/post/2020/11/01/use-fcitx5-in-rstudio-on-kubuntu20.10/
- [ ] https://cyrusyip.org/tags
    - [ ] https://cyrusyip.org/zh-cn/tags
- [ ] https://cyrusyip.org/tags/life
    - [ ] https://cyrusyip.org/zh-cn/tags/life
- [ ] https://cyrusyip.org/categories
    - [ ] https://cyrusyip.org/zh-cn/categories
