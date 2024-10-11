---
title: 将 LineageOS 20 升级到 LineageOS 21
date: 2024-10-11T00:00:00+08:00
slug: upgrade-lineageos20-to-21
tags:
  - android
  - lineageos
lastmod: 2024-10-11T00:00:00+08:00
---

我手机用的系统是开源的 LineageOS 20（Android 13），跨版本升级到 LineageOS 21（Android 14）需要用电脑手动操作。因为怕操作失误导致无法开机，所以想着先备份资料，但我懒得备份资料，于是好几个月没升级。今天就来升级了。

## 备份

虽然升级 LineageOS 不会清空储存空间，但为了保险起见，我按照自己的需求备份以下内容：

1. 微信聊天记录
2. 图片
3. 电子邮箱账户截图
4. 闹钟截图
5. 应用列表

## 升级

按照 [Upgrade LineageOS on lisa | LineageOS Wiki](https://wiki.lineageos.org/devices/lisa/upgrade/variant3/) 的步骤，安装 LineageOS 21、重启到 Recovery、安装 Google Apps、重启。

这里碰到一个奇怪的问题：手机通过数据线直接插到笔记本电脑的 USB 口，用 fastboot 可以检测到设备，但安装新系统时会报错。数据线插到 USB 集线器才行。

## 感受

升级过程比我预想的简单。系统正常运作，所以清除了前面的备份。目前遇到两个问题：状态栏的快捷设置在亮色模式下仍然是暗色；Fcitx5 输入法底下的导航栏不见了，将「导航栏背景」设置为「跟随键盘背景色」即可解决。

如果你也要升级 LineageOS，不要照搬我的步骤，要遵循 LineageOS Wiki 的步骤，不同设备的升级步骤可能有差异。