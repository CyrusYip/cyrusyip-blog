---
title: 将一加 Ace 3 从 LineageOS 22.2 升级到 23.0
date: 2025-10-12T00:00:00+08:00
slug: oneplus-ace-3-from-lineageos-22-to-23
tags:
  - android
  - lineageos
  - oneplus
  - oneplus-ace-3
lastmod: 2025-10-12T00:00:00+08:00
---

[昨天才装好 LineageOS 22.2](/zh-cn/posts/2025/10/11/oneplus-ace-3-install-lineageos-22/)，今天就推出 23.0 了。这时 LineageOS 大版本升级保留数据的优势就体现出来了。

虽然大版本升级会保留数据，但还是用 [DataBackup](https://github.com/XayahSuSuSu/Android-DataBackup) 备份数据和应用，以防不测。将备份文件复制到 U 盘。

按照[升级教程](https://wiki.lineageos.org/devices/aston/upgrade/)来升级系统。

```shell
adb -d reboot sideload
adb -d sideload lineage-23.0-20251012-nightly-aston-signed.zip
# 重启至 recovery，安装谷歌套件（之前安装过，升级的时候也要安装新版本）
adb -d sideload MindTheGapps-16.0.0-arm64-20250812_214353.zip
# 安装 KernelSU Next 内核
adb -d sideload ksu-next.zip
```

搞定，重启到系统，一切正常，删除 U 盘的备份。