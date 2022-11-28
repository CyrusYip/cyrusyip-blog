---
title: 用 Cloudflare 缓存本站的订阅文件
date: '2022-11-22'
slug: cache-rss-with-cloudflare
tags:
  - blog
---

本站目前使用 Vercel 部署。最近看了下 Vercel 的使用量，10 月份中文订阅文件（`/zh-cn/index.xml`）用了 17 GB 流量（平均每日 561 MB），占据了大部分流量，消耗流量第二多的文件只占 79 MB。本站 10 月就 959 次访问，没想到有那么多人订阅。Vercel 免费账户每月 100 GB 流量，真担心有一天流量超标了。

本站的订阅文件包含所有文章全文，大小是 1 MB。减少文章或者文章内容改为摘要都可以减少文件大小。只要流量不超标，我还是希望文件保持完整，给读者选择看网页或者使用 RSS 阅读器的自由。

之前听闻 Cloudflare 提供免费无限流量的 [CDN](https://www.cloudflare.com/learning/cdn/what-is-a-cdn/) 服务，那让本站使用 Cloudflare 提供的 CDN 不就能减少 Vercel 的流量吗？Vercel 官方就有相关教程：[How do I use a Cloudflare domain with Vercel? – Vercel Docs](https://vercel.com/guides/using-cloudflare-with-vercel#with-proxy)。使用 CDN 之后 Vercel 流量并没有明显变化。11 月 10 号使用 Cache Rules 缓存中文和英文订阅文件，之后中文订阅文件流量降低到 100 MB 左右，效果挺好。11 月 14 日将缓存时间（Edge TTL）改为 2 小时，之后中文订阅文件流量从 55 MB 逐步变成 2.2 MB，效果极佳。11 月 22 日晚上 10 点 55 分 Cloudflare 后台显示 24 小时内缓存了 97.81% 流量。

2 小时的缓存时间虽然很省流量，但是可能导致发新文章后过 2 小时订阅文件才更新。11 月 22 日晚上 11 点 07 分我把缓存时间改为了保持原样（Respect origin），接下来三天订阅文件的流量都低于 6 MB。

以下是缓存规则的设置方法（你也可以按照自己需求来，不用和我一样）：

1. 点击域名 -> Caching -> Cache Rules
1. 点击 Create cache rule
1. Rule name 填写规则名称
1. 点击 Edit expression 并填入 `(http.request.uri.path eq "/zh-cn/index.xml") or (http.request.uri.path eq "/en/index.xml")`
1. 上一步对应的手动操作：
    1. Field 选择 URI Path
    1. Operator 选择 equals
    1. Value 填 `/zh-cn/index.xml`
    1. 点击 Or
    1. Field 选择 URI Path
    1. Operator 选择 equals
    1. Value 填 `/en/index.xml`
1. Cache status 选择 Eligible for cache
1. Edge TTL 表示多久缓存一次文件，可以不设置。如果要设置就点 Add -> Override origin，选择一个合适的时间。
1. 点击最后的 Deploy

设置完后可以用 `curl --head` 检查文件缓存状态（cf-cache-status），状态含义请参看：[Default Cache Behavior · Cloudflare Cache docs](https://developers.cloudflare.com/cache/about/default-cache-behavior/#cloudflare-cache-responses)。

```
❯ curl --head https://cyrusyip.org/zh-cn/index.xml | grep cf-cache-status
cf-cache-status: REVALIDATED
```

折腾完之后我又在想：要是订阅文件以外的路径也很多流量怎么办（焦虑发作……）？我还是发现了一劳永逸的方法：改用无限流量的 Cloudflare Pages。Cloudflare Pages 没有超越 Vercel，两者的免费帐号各有优缺点。

|          | Vercel    | Cloudflare Pages |
|----------|-----------|------------------|
| 使用量   | 6000 分钟 | 500 次           |
| 流量     | 无限      | 100 GB           |
| 配置文件 | 支持      | 不支持           |

Cloudflare Pages 除了流量无限，其他都比 Vercel 差。CDN 套壳算是集两家所长，但是 Vercel 文档并不推荐这样做，参看：[Can I use a proxy on top of my Vercel Deployment? – Vercel Docs](https://vercel.com/guides/can-i-use-a-proxy-on-top-of-my-vercel-deployment)。目前就这样吧，慢慢观察这个方案有没有问题。
