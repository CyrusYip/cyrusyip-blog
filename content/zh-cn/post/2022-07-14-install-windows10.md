---
title: Windows 10 简易安装教程
date: '2022-07-14'
slug: install-windows10
tags:
  - Windows
---

安装系统有三个基本步骤：刻录系统映像、分区、安装。如果你要安装其他系统，也可以参考本文的步骤。

## 下载系统映像

在谷歌或必应搜「windows 10 下载」，可以找到微软官方的[下载地址](https://www.microsoft.com/zh-cn/software-download/windows10ISO)，选择合适的版本。如果你不知道选啥，那就下载「Windows 10 (multi-edition ISO)」。

你也可以在 <https://msdn.itellyou.cn/> 下载系统，但这不是官方网站。

## 刻录映像

将下载好的系统映像刻录到 U 盘就可以用来装系统了。你可以用 [balenaEtcher](https://www.balena.io/etcher/) 这种传统的刻录工具。我更推荐用 [Ventoy](https://www.ventoy.net/cn/index.html)，将它装到 U 盘之后，它就能启动 U 盘里的任意系统映像。这就免除了刻录的过程，升级 Ventoy 也无需格式化 U 盘。

## BIOS/UEFI 设置

开机时按特定按键[^jian]（如 F2）进入 BIOS/UEFI，将启动方式改为 UEFI，现在的系统似乎都用这个启动方式，我也不知道用 BIOS 启动行不行。然后再启用 USB 启动。

[^jian]: 不同品牌的电脑按键不一样，你得上网搜索你的电脑怎么进 BIOS/UEFI。

## 硬盘分区

分区工具可以用 DiskGenius 或者 GParted。第三方 Windows PE 一般都有 DiskGenius，例如：[优启通](https://www.upe.net/)、[微PE工具箱](https://www.wepe.com.cn/)。有些无良 Win PE 有病毒和广告软件，所以要选择口碑良好，没出过问题的 Win PE，比如我刚刚提到那两个。~~选 Win PE 那么麻烦，大家赶紧用 Linux 发行版映像吧~~！一般的桌面 Linux 发行版映像都有分区工具，例如：Ubuntu。手动分区不是必要步骤，Windows 10 安装映像里有简单的分区工具。

## 安装系统

开机时按特定按键（例如 F12）进入启动菜单，选择 U 盘启动。接下来按照指引点点鼠标就可以安装了。如果你不知道选那个版本，就用家庭版，一般电脑都预装这个版本。以后换版本不需要重装，用对应的激活码就行了。

## 激活系统

- 正版方法：[微软官方商场](https://www.microsoftstore.com.cn/windows/windows-10-home)（现在似乎只卖 Windows 11 了）
- 盗版方法：淘宝卖的激活码，十块左右就行了

以上两种激活方法都是安全的。千万不要用激活软件，小心病毒。
