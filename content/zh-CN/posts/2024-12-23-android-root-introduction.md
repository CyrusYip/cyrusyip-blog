---
title: 了解与使用 Android 的 root 权限
date: 2024-12-23T00:00:00+08:00
slug: android-root-introduction
tags:
  - android
lastmod: 2025-01-04T00:13:12+08:00
---

<!--
代写：英文版、lsposed、xposed
-->

## root 权限

root 是 Android 系统的最高权限。Android 系统就像房子。没有 root 的时候用户就是租客，只有使用权，不能随便改动房子。有 root 权限的时候，用户就是房东，有所有权，可以随便改动房子（修改系统）、丢掉原有的家具（卸载系统应用）。

总之，有了 root 权限之后我们就可以完全掌控 Android 系统了。

## 基本流程

获取 root 的前提条件是解锁引导程序（bootloader），解锁了引导程序才能安装 `init_boot.img` 和 `boot.img`。

`init_boot.img` 和 `boot.img` 是启动系统需要用到的文件，推荐先备份好它们。修补其中一个并安装后就能获取 root 权限。最后使用 root 管理器来管理 root 权限。

## 方案

目前有三个开源的 root 方案：

- Magisk（[使用文档](https://topjohnwu.github.io/Magisk/)、[源代码](https://github.com/topjohnwu/Magisk)）
- KernelSU（[使用文档](https://kernelsu.org/)、[源代码](https://github.com/tiann/KernelSU)）
- APatch（[使用文档](https://apatch.dev/)、[源代码](https://github.com/bmax121/APatch)）

Magisk 是最经典的 root 方案，教程和资源最多。缺点是会被应用检测到，比如：中国农业银行应用检测到 root 会退出。用额外的模块才能隐藏 root。

KernelSU 是内核级 root 方案，不需要刻意隐藏 root，被授权的应用才能感知到 root。App Profile 功能可以授予应用部分权限，比如：只允许应用使用 adb 权限。

APatch 也是内核级 root 方案，KernelSU 是内核级 root 方案，不需要刻意隐藏 root，被授权的应用才能感知到 root。需要设置密码。使用方法是修补 `boot.img`，使用 `fastboot boot boot.img` 可以临时获取 root，重启后 root 消失。

如果你懒得研究隐藏 root，那就使用 KernelSU 或者 APatch。

## 用法

root 有两种使用方法。一是管理器授权给应用，二是在管理器安装 root 模块（module）。比如：授权给 Neo Backup 就可以备份应用。安装 [BCR](https://github.com/chenxiaolong/BCR) 模块之后可以自动录制通话。

root 权限可以很危险，比如用来清除手机数据或者弄坏系统。请勿授权给来源不明的应用，也不要安装来源不明的模块。尽量选择开源、知名的应用和模块。

## 我的用法

我目前使用 [APatch 最新编译版](https://nightly.link/bmax121/APatch/workflows/build/main/APatch)[^ban]。

[^ban]: 本来我是想在[一加 Ace 3 的 PixelOS 14](https://pixelos.net/download/aston) 用 KernelSU 的，但是修复 init_boot.img 后没用，不知道为什么。

用到 root 的应用有：

- Brevent
- [DataBackup](https://github.com/XayahSuSuSu/Android-DataBackup)
- Material Files
- [MMRL](https://github.com/DerGoogler/MMRL)
- Neo Backup
- Shizuku
    - [App Ops](https://appops.rikka.app/)
    - Droid-ify
    - [GKD](https://github.com/gkd-kit/gkd)
    - Hail
    - Obtainium
    - aShell You

模块有：

- BCR

root 的功能远不止这些，推荐你看 [GitHub - fynks/awesome-android-root: A comprehensive and up-to-date list of latest Android root apps that require or utilize root privileges, rooting guides, tips, tricks and tools](https://github.com/fynks/awesome-android-root)。

## 相关项目

- https://github.com/JingMatrix/LSPosed
- https://github.com/Dr-TSNG/ZygiskNext