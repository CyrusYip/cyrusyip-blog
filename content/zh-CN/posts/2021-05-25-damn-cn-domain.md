---
title: 不推荐使用 cn 域名
date: 2021-05-25T00:00:00+08:00
slug: damn-cn-domain
tags:
  - blog
  - domain-name
lastmod: 2025-03-31T20:44:07+08:00
---

**2025-03-31 更新**：cn 域名已经支持隐私保护了（[例子](https://github.com/CyrusYip/blog-comments/discussions/57#discussioncomment-12673922)）。

---

去年想学习搭建网站，当时啥也不懂，以为建站一定要有服务器、域名和备案。于是在腾讯云租了一年服务器，付费的时候看到 cn 域名才 17 块，就顺便买了一个。备案过程[十分曲折](https://github.com/yihui/yihui.org/discussions/558#discussioncomment-4424763)，要填很多个人信息。备案后那段时间没空学建站，然后因为一周[^zhou]内没有解析网站，备案就自动注销了。真的是气死，辛辛苦苦备案完，还给我注销了。最近又看了些 cn 域名的资料，发现有挺多坑人的地方。

[^zhou]: 其实我不记得具体时间是不是一周，大概是这样吧。

**cn 域名没有隐私保护（whois protection）**。国内域名注册商说的隐私保护根本是自欺欺人，在它们隐私保护就是在自己的查询服务隐藏注册人信息。但在别的地方是能查到的，在[中国互联网络信息中心](https://whois.cnnic.cn/)[^xin]可以查到每个 cn 域名注册人的姓名和邮箱。

[^xin]: [Godaddy](https://www.godaddy.com/whois) 、[Whois.com](https://www.whois.com/whois/) 和命令行程序 `whois` 也可以查询。

**注册 cn 域名必须使用真实身份信息**。要是你想用假信息注册来保护隐私，那就太天真了。审核的时候不会通过的。真的不想用自己的信息注册的话，要么以公司名义注册，但公司的法定代表人还是能查到的。要么叫别人注册域名之后给你用，可谁愿意冒这种风险呢。

**cn 域名无法删除**。如果你觉得 cn 域名暴露了你的隐私，那对不起，这是不能注销的[^de]。你只能修改邮箱地址，然后等到它过期。或者转让给别人，不过感觉把别人推到火坑里不太好啊。

[^de]: 您好，域名属于即时产品。**域名注册成功后不能删除，也是无法进行注销的**。若您不需要此域名，您可以等到域名到期不续费即可。——腾讯云

**cn 域名有被停用的风险**。2008 年，有人以跳水奥运冠军吴敏霞拼音注册了 wuminxia.cn，[结果被中国互联网络信息中心（CNNIC）回收了域名](https://www.cnbeta.com/articles/tech/62209.htm)，并转交给国家体育总局。此域名在 2021 年 2 月 28 日被优视科技[注册](https://whois.cnnic.cn/WhoisServlet?queryType=Domain&domain=wuminxia.cn)，呵呵。2009 年，牛博网被域名注册商万网停止解析。

其他 CNNIC 的争议就不讲了，感兴趣就去看[维基百科](https://zh.wikipedia.org/zh-cn/%E4%B8%AD%E5%9C%8B%E4%BA%92%E8%81%AF%E7%B6%B2%E7%B5%A1%E4%BF%A1%E6%81%AF%E4%B8%AD%E5%BF%83)吧。
