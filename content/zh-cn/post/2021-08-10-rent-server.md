---
title: 第一次租国外的服务器
date: '2021-08-10'
slug: rent-server
tags:
  - server
  - VPS
---

最近想租个服务器玩玩，因为我讨厌手机号注册和提交身份信息，就不考虑国内厂商了。之前在知乎好几次看到有人推荐 Vultr，那就试试看吧。注册好就用 Paypal 充了 10 美元，结果就倒霉了。Vultr 提示我帐号审核可能要 24 小时。

Vultr 的帐号客服只在周一至周五的白天[^tian]上班，而且 Vultr 采用[美国东部时间](https://zh.wikipedia.org/zh-cn/%E5%8C%97%E7%BE%8E%E4%B8%9C%E9%83%A8%E6%97%B6%E5%8C%BA)，比北京时间慢 12 小时。我这边晚上 9 点的时候，对面的客服才刚上班。没有即时聊天，只能发工单，以下是艰难的验证过程（时间为北京时间）。

[^tian]: 我记得是早上 9 点到下午 6 点，查了一下时间，但没查到，也懒得找了。

## 第1 天 2021-08-09

### 16:03

注册并用 Paypal 充值 10 美元。

### 21:16

收到通知说需要提供身份证和信用卡照片来验证帐号。身份证只需要显示姓名和照片，信用卡只需显示姓名和后四位。

> The following will be required to complete the form for verification sufficiently:
> 
> 1. A photo of your government ID (showing a name and photo only) and
> 
> 2. A partial photo of the credit card linked to the account (showing the last four numbers & name only).

注意，要抹掉信用卡安全码，不然有被盗用的风险。

### 21:40

我问客服审核后会不会销毁照片。

> How do you deal with the photos after verification? Will it be destroyed?

## 第 2 天 2021-08-10

### 01:23

客服说审核后会删除照片。

> This is currently our vetting process but, rest assured, all electronic copies will be deleted after review and you may cover any pertinent information you deem sensitive.

### 01:56

提交身份证和信用卡照片。身份证只有姓名和号码没涂抹。信用卡抹掉安全码和号码前面部分，只留下后 4 位，其他位置未涂抹。

### 02:19

客服说要拍到身份证的照片才行。

### 02:24

补发带照片的身份证。

### 04:39

客服说要手持身份证和脸一块拍照。

> We were unable to validate some of the information provided. To help this process along, please provide the following:
>
> 1. A photo of you holding the recently uploaded ID (next to face)

我吐了，怎么不早说。前面白搞了，又得等了。

### 16:29

上传手持身份证的照片，身份证只有姓名、号码、和照片没涂抹。

## 第 3 天 2021-08-11

### 03:18

认证还没行，客服询问我公司名称和服务器的用途。

> We appreciate the information provided however, we need more information to validate your intended usage.
>
> Please describe in as much detail as possible what you intend to do with your instances and provide the business name and organization URL(s) under which you offer services.

### 11:59

真是无语了，买个服务器也问东问西的，而且我都没有公司。就说买服务器用来学 Linux，也可能搭建个人网站。

> I don't own or belong to any business. I want to use remote servers to learn linux distros. I also want to build personal websites via servers.

### 12:01

认证还没行。客服认为我有多个帐号，说一人应该只用一个帐号，请我解释解释。

> It appears you have multiple accounts with us. The system generally only allows one account per customer, can you please clarify why you need multiple accounts with us?

### 12:10

我又吐了，我第一次注册，哪来的多帐号。

> Oh, no. I have and use only one account.

## 第 4 天 2021-08-12

### 02:30

客服说搞定了。

> Thank you for providing the requested information. I have finalized your account authorization at this time. I appreciate your patience regarding this matter.

## 感想

没想到在 Vultr 买个服务器居然用了 4 天，真的吐血了。隔着 12 个小时联系真困难。第三天（8 月 11 号）都要气死了，把玩服务器的热情都耗尽了[^le]，然后试了 Linode。用 Linode 倒是挺顺利的，注册完用银联信用卡作为支付方式，马上就能用了。早知道之前在 Vultr 申请退款算了。罢了罢了，就当是练英语吧。

[^le]: 我第一次搭建网站的时候以为一定要备案，经历了[曲折的过程](http://disq.us/p/2ev0ji9)后就丧失热情了。看来热情等着等着就会耗尽啊。

我试了以下服务器：Vultr 的东京（Tkoyo），Linode 的东京、新加坡（Singapore）。在本地机器 SSH 连接过去，打字都卡，用科学上网也一样。用 [Mosh 连接就好多了](https://twitter.com/CyrusYip10/status/1425347251560271874)，但是要使用 tmux 才能滚动终端，最后发现用 Visual Studio Code 的[Remote - SSH 插件](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh)连接延迟更低，也能滚动终端，还能处理服务器文件（上传、下载、编辑），十分好用。

## 收费方式

Vultr 和 Linode 都是按小时计费，每月 1 号扣钱。服务器关机占坑也会扣钱，删除才不扣钱。如果 Vultr 帐号有余额，那删除就会马上扣钱。Vultr 只有纽约（New York）有 2.5 美元/月和 3.5 美元/月的服务器，其余地区最便宜是 5 美元/月。Linode 最便宜是 5 美元/月。

Vultr 注册完就叫我充值，还有信用卡充值多少就送多少的优惠。看到这优惠就想充 100 美元，差点就中招了。还好只充了 10 美元。Linode 就比 Vultr 实在多了。Linode 一开始就绑定信用卡，不会叫人充值，用多少就扣多少钱。现在 Vultr 那边充了 10 美元还没怎么用，感觉有点浪费。还是用信用卡好，用多少就扣多少钱。

Vultr 和 Linode 都有注册用余额的活动，在谷歌搜「Vultr coupon」和「Linode coupon」就能找到了，通过 Vultr 和 Linode 用户的邀请链接注册也有优惠。后来我又注册了 DigitalOcean，注册后用优惠券白拿了 15 美元。DigitalOcean 和前面两家厂商也差不多，都是按小时计费，最便宜的服务器也是 5 美元/月。但 DigitalOcean 的帐单不是实时更新，一日更新一次。

如果你想注册 Vultr 或 DigitalOcean，可以试试我的[邀请链接](/zh-cn/donate/)，注册后会有余额奖励。
