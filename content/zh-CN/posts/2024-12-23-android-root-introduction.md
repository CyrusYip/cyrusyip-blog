---
title: 了解与使用 Android 的 root 权限
date: 2024-12-23T00:00:00+08:00
slug: android-root-introduction
tags:
  - android
lastmod: 2025-03-10T14:35:21+08:00
---

<!--
代写：英文版
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

Magisk 是最经典的 root 方案，教程和资源最多。缺点是容易被应用检测到，比如：中国农业银行应用检测到 root 会退出。用额外的模块才能隐藏 root。

KernelSU 是内核级 root 方案，不需要刻意隐藏 root，被授权的应用才能感知到 root。App Profile 功能可以授予应用部分权限，比如：只允许应用使用 adb 权限。

APatch 也是内核级 root 方案，KernelSU 是内核级 root 方案，不需要刻意隐藏 root，被授权的应用才能感知到 root。需要设置密码。

我的推荐：KernelSU > APatch > Magisk（> 表示优于）。KernelSU 排第一是因为它不易被检测，而且可以授予应用部分权限。Magisk 排最后是因为容易被检测。

## 用法

root 有两种使用方法。一是管理器授权给应用，二是在管理器安装 root 模块（module）。比如：授权给 Neo Backup 就可以备份应用。安装 [BCR](https://github.com/chenxiaolong/BCR) 模块之后可以自动录制通话。

root 权限可以很危险，比如用来清除手机数据或者弄坏系统。请勿授权给来源不明的应用，也不要安装来源不明的模块。尽量选择开源、知名的应用和模块。

## 模块、Zygisk、Xposed

模块是使用 root 管理器安装的应用。

Zygisk 是修改系统和应用行为的模块，供其他模块使用。Magisk 内置 Zygisk。KernelSU 和 APatch 没有内置 Zygisk，但是可以安装独立版 Zygisk。

以下是独立版 Zygisk：

- [ReZygisk](https://github.com/PerformanC/ReZygisk)（开源）
- [ZygiskNext](https://github.com/Dr-TSNG/ZygiskNext)（最新版本闭源）

Xposed 是修改系统和应用行为的模块，供其他模块使用。[Xposed](https://github.com/rovo89/Xposed) 已经停止更新，其继任者 [LSPosed](https://github.com/LSPosed/LSPosed) 也停止更新。目前还在更新的 LSPosed 修改版为 [JingMatrix/LSPosed](https://github.com/JingMatrix/LSPosed)。注意 LSPosed 依赖于 Zygisk，要先安装 Zygisk 才能用 LSPosed。

安装 Zygisk 和 LSPosed 后，root 特征更明显，root 更容易被检测到。

## 隐藏 root

银行应用和游戏检测到 root 后可能会拒绝运行，此时要隐藏 root。

隐藏 root 的模块：

- [Zygisk-Assistant](https://github.com/snake-4/Zygisk-Assistant)（开源）
- [Shamiko](https://github.com/LSPosed/LSPosed.github.io/releases)（闭源。APatch 不支持 Shamiko。）
- Cherish Peekaboo（闭源，APatch 专用，在[这个帖子的 Attachments 可以下载](https://xdaforums.com/t/dev-apatch-an-alternative-root-solution-to-kernelsu-and-magisk.4655727/)。）

Android 系统允许应用获取所有应用的名字。有些应用发现系统有 root 管理器或者使用 root 的应用，就认为系统有 root 权限而拒绝运行。我们可以使用 [Hide My Applist](https://github.com/Dr-TSNG/Hide-My-Applist) 或者 [HMAL](https://github.com/pumPCin/HMAL) 来隐藏应用名称，从而躲过检测。

隐藏完 root 后可以使用[root 检测应用](https://github.com/rushiranpise/detection)查看效果。如果你用的应用没检测出 root，就不要纠结 root 检测应用的结果。

## 银行应用与 Play Integrity

一些银行应用会检测 Play Integrity（设备完整性，等级包适 BASIC、DEVICE、STRONG），手机解锁引导程序后 Play Integrity 等级下降，导致银行应用拒绝运行或者隐藏部分功能（比如指纹支付）。可以使用 [Play Integrity Fix](https://github.com/chiteroman/PlayIntegrityFix) 和 [TrickyStore](https://github.com/5ec1cff/TrickyStore) 来修复 Play Integrity。

## 我的用法

我一般用 KernelSU 或者 APatch。

用到 root 的应用有：

- [App Manager](https://github.com/MuntashirAkon/AppManager)
- [DataBackup](https://github.com/XayahSuSuSu/Android-DataBackup)
- Material Files
- [MMRL](https://github.com/DerGoogler/MMRL)
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