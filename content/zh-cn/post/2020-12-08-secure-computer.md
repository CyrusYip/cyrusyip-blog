---
title: 增强计算机安全性的技巧
date: '2020-12-08'
slug: secure-computer
tags:
  - BIOS
  - UEFI
  - security
---

## 关闭 BIOS 的 USB Boot 和 PXE Boot 选项

开启了 USB 启动后，用户可以绕过电脑里的操作系统，直接启动 U 盘里面的系统。PXE Boot 则是通过网络接口启动计算机。这样不需要知道原系统密码也可以读取硬盘里的文件了。我觉得这两个功能还挺危险的，平时我都会关闭它们，装系统的时候才用 USB Boot，用完就关闭。除此之外，还要**设置 BIOS 密码**，不然别人拿到你的电脑一样可以开启这两个选项。

## 开启 BIOS 的 Power on Password 选项

这个技巧是针对 Linux 的。GRUB 的 recovery mode 可以让用户不需要密码的情况下使用 root 账户。这个功能实在是太强力了，输入几条命令就可以修改用户密码。解决这个问题的办法就是：先设置 BIOS 密码，再设置启动电脑时询问 BIOS 密码。

## 使用全盘加密

设置了 BIOS 并不意味着可以高枕无忧。别人拿到你的电脑虽然不能直接在里面启动系统，但是可以把硬盘拆下来放到另一台电脑中读取文件。但是也不要担心，办法还是有的。使用 BitLocker 这样的全盘加密技术，别人拆下你的硬盘也无法读取你的文件。

## 保持良好习惯

除了前面几个技巧，保持良好习惯也很重要。比如：到官网下载软件、不要访问证书错误的网站。

## 延伸阅读

- [基本输入输出系统（Basic Input/Output System，BIOS）](https://zh.wikipedia.org/wiki/BIOS)
- [统一可扩展固件接口（Unified Extensible Firmware Interface，UEFI）](https://zh.wikipedia.org/zh-cn/%E7%B5%B1%E4%B8%80%E5%8F%AF%E5%BB%B6%E4%BC%B8%E9%9F%8C%E9%AB%94%E4%BB%8B%E9%9D%A2)
- [网络引导（Network booting）](https://zh.wikipedia.org/wiki/%E7%BD%91%E7%BB%9C%E5%BC%95%E5%AF%BC)
- [预启动执行环境（Preboot eXecution Environment，PXE）](https://zh.wikipedia.org/wiki/%E9%A2%84%E5%90%AF%E5%8A%A8%E6%89%A7%E8%A1%8C%E7%8E%AF%E5%A2%83)