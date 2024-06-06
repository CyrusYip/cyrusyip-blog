---
title: 跳过 Android 应用广告
date: 2024-03-19T00:00:00+08:00
slug: skip-android-app-ads
tags:
  - Android
lastmod: 2024-03-23T18:59:15+08:00 # remove this line if the content is actually changed
---

[GKD](https://github.com/gkd-kit/gkd) 是开源的屏幕点击应用，可以自动跳过应用的开屏广告和应用内广告。实际测试 GKD 可以跳过铁路 12306 和京东的开屏广告。

使用方法：

1. 根据[官方文档](https://gkd.li/guide/)安装并授予权限。
1. 点击「订阅->右下角加号」，添加规则订阅。

[默认规则](https://github.com/gkd-kit/subscription)订阅链接：<https://fastly.jsdelivr.net/npm/@gkd-kit/subscription>。默认规则于 2024 年 2 月 1日 停止更新，如果失效了可以试试[第三方规则](https://github.com/Adpro-Team/GKD_THS_List)或者自己编写规则。GKD 不能跳过所有应用广告，得有对应的规则才行。
