---
title: 把域名转移到便宜的域名注册商
date: '2021-05-19'
slug: transfer-domain
---

**总结**：最便宜的域名注册商是 Cloudflare，但它不能注册域名，必须从先从其他域名商购入，再转入 Cloudflare。可以先从便宜的 Porkbun 购入域名，必须等待 60 天后才能转入 Cloudflare。Cloudflare 有些缺点：不能改域名服务器、WHOIS 信息会显示注册人地址的国家与省份/州，不过其余信息会被隐藏。

最近发现了两个域名价格对比网站：[TLD List](https://tld-list.com/)、[domcomp](https://www.domcomp.com/)，在上面搜了一下我的域名 cyrusyip.org，发现续费最便宜的是 Sav（10.15 美元） 和 Porkbun（10.72）。我用的 Namecheap 续费要 15.16，相比之下 namecheap 真的不太 cheap。虽然网上可以搜到 20% 优惠券，用了之后（12.12）还是比较贵。而且每次都要找优惠券，有点麻烦。由于Sav 的评价不太好，我就决定转移到 Porkbun。转移费是 10.72，转移后域名使用期限会加 1 年。所以其实转移是免费的，转移费拿去续费了。

转移步骤：

- 在 Namecheap 找到转让选项（Transfer）
- 解锁（unlock）网站
- 获取认证码（AUTH CODE）
- 注册 Porkbun
- 到 Porkbun 点击 TRANSFER
- 填写域名和验证码
- 付费（可用支付宝，好评！）
- 收到 Namecheap 的通知邮件，打开里面的链接
- 点击确认（Approve）

点击确定之后过一两分钟就好了，也保留了原来的 DNS 记录，所以网站在转移中不会被关闭。以后每年都可以省 28 块人民币了，非常好！要是有优惠券就更省钱啦，不过好像没有续费优惠券。都那么便宜了，我还想用优惠券，实在是太贪心了。Porkbun 的界面很简洁，还用了粉色，我太喜欢了！

又及，我发现最便宜的域名注册商可能是 [Cloudflare
](https://www.cloudflare.com/products/registrar/)。它的收费等于成本价。

> Cloudflare Registrar will only ever charge you what we pay to the registry for your domain.

Cloudflare 的续费价格是 10.11，比 Porkbun 便宜了 0.61。目前 Cloudflare 没提供注册服务，只有转入域名服务。把域名转入到 Cloudflare 比较麻烦，要先域名添加到 Cloudflare（把域名服务器设置为 Cloudflare的）。不过我还是打算试一试，但是失败了。原来注册或转移域名 60 天后才能转移域名，这是 ICANN[^icann]（互联网名称与数字地址分配机构）的规定。最后，请选择 [ICANN 认证注册商（ICANN Accredited Registrars）](https://www.icann.org/en/accredited-registrars)。要是去买三手四手的域名，出了问题 ICANN 大哥都保不了你。

[^icann]: ICANN /ˈaɪkæn/，全称 **I**nternet **C**orporation for **A**ssigned **N**ames and **N**umbers（互联网名称与数字地址分配机构），是负责分配域名和 IP 地址的非营利组织。

**2021-08-28 更新**：今天把域名迁移到 Cloudflare 了。步骤如下：

1. 在 [Cloudflare 主页](https://dash.cloudflare.com/)点击 Add site，根据提示添加域名
1. 在 [Cloudflare 主页](https://dash.cloudflare.com/)点击 Registrar -> Transfer，按提示操作

操作成功后扣了 10.11 美元，转到 Cloudflare 后就不能更改域名服务器了，除非把账户升级为 Business（200 美元/月）。域名转到 Cloudflare 之后域名 WHOIS 信息会显示国家和省份/州。原来低价域名是推广 Cloudflare 的手段。本站目前用 Vercel 部署，Vercel 和 Cloudflare 都提供 [CDN](https://zh.wikipedia.org/wiki/%E5%85%A7%E5%AE%B9%E5%82%B3%E9%81%9E%E7%B6%B2%E8%B7%AF)，这岂不是套了两层 CDN。果然 [Vercel 文档](https://vercel.com/support/articles/using-cloudflare-with-vercel)说 Cloudflare 会稍微降低网站性能：

> We don't recommend that you enable the Cloudflare proxy unless you have specific constraints for your project since **it will introduce a minor performance penalty to your website due to the additional hop**.

按照说明把 Proxy status 改为了 DNS only，然后把 Quick Start Guide 那些功能都关掉，这下应该没问题了。
