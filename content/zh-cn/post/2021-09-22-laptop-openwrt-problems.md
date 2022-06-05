---
title: 解决用笔记本作 OpenWrt 路由器遇到的免密码登陆与屏幕常亮问题
date: '2021-09-22'
slug: laptop-openwrt-problems
tags:
  - OpenWrt
---

用笔记本电脑作 OpenWrt 路由器有两个问题：不需要密码就登陆、屏幕不会自动关闭，解决办法如下。

## 关闭免密码登陆

编辑 `/etc/config/system`，把 `config system` 里的 `option ttylogin '0'` 改为 `option ttylogin '1'`，改完后是这样的：

```
config system
        option hostname 'OpenWrt'
        option ttylogin '1'
```

## 关闭屏幕

```
opkg update
opkg install setterm
# 一分钟不动就关屏幕
setterm --blank 1
```

如果 `--blank` 选项不行就改成 `--powerdown`。

## 缘起

上大学前（2017 年）买了联想 [Miix 510-12IKB](https://www.notebookcheck.net/Lenovo-Miix-510-12IKB-80XE001WHH.205544.0.html)（Miix 5 Plus），后来大三的时候开始学编程。Miix 只有 8G 内存，实在是太小了。于是换了台 16G 内存的 [Magicbook 14](https://item.jd.com/100010816812.html)，从此 Miix 就长期处于闲置状态。最近打开几个月没开机的 Miix，屏幕居然多了两条竖线。也不知道是不是之前寄快递的时候压坏了。去查了保修时间，已经过期了。唉，看来还是不修了吧，修还得花钱。可这屏幕的两条竖线看着真不舒服，拿来刷视频都不行了。真为 Miix 的前途感到担忧，难道它年纪轻轻就要退休了吗？思考再三，我决定以后拿它作[旁路由](https://sspai.com/post/59708)。我现在用[树莓派 4B 作旁路由](/zh-cn/post/2021/08/30/raspberry-pi-4b-openwrt/)，它搭配 500Mbit 宽带使用没问题，和 1000Mb 宽带一起用就性能不足了。日后用上 1000Mb 宽带，Miix 就是树莓派的接班人啦。

接下来就测试一下，我把 OpenWrt 装到 U 盘，用 Miix 启动，确实能用来做旁路由。但有两个问题：不需要密码就登陆、一直开屏幕。免密码登陆不安全，一直开着屏幕费电，而且我担心屏幕一直开着会坏掉。上谷歌用中文和英文搜这两个问题，没有免密码登陆的相关资料。查到了屏幕常亮相关的中文帖子，解决办法居然是把屏幕拆掉或拔掉屏幕排线。嗯……解决不了问题，就解决引起问题的东西，这也不失为一种办法。可这平板电脑看起来就很难拆，拆坏就亏大了，还是别了。最后我去 OpenWrt 论坛问了这两个问题，很快就有热心人士帮忙解决了。原贴：

- [How can I disable auto login on laptop? - Installing and Using OpenWrt - OpenWrt Forum](https://forum.openwrt.org/t/how-can-i-disable-auto-login-on-laptop/107084)
- [How to turn off the screen of a laptop? - Installing and Using OpenWrt - OpenWrt Forum](https://forum.openwrt.org/t/how-to-turn-off-the-screen-of-a-laptop/107116)