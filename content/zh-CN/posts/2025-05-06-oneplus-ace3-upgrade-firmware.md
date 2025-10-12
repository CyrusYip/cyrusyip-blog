---
title: 给一加 Ace 3 升级固件
date: 2025-05-06T00:00:00+08:00
slug: oneplus-ace3-upgrade-firmware
tags:
  - android
  - oneplus
  - oneplus-ace-3
  - pixelos
lastmod: 2025-10-12T21:19:03+08:00
translationKey: oneplus-ace3-upgrade-firmware
---

我的一加 Ace 3 用的是 PixelOS 系统，此系统不包含固件，所以要自己升级固件。

固件通过 fastboot 和 fastbootd 安装，所以先测试 fastboot 和 fastbootd：

1. 将手机通过数据线连接到电脑
1. 按住音量下键和电源键开机进入 fastboot
1. 运行 `fastboot devices`，确定手机处于 fastboot
1. 运行 `fastboot reboot fastboot`，进入 fastbootd
1. 运行 `fastboot devices`，确定手机处于 fastbootd

我的手机目前系统版本是 `PixelOS_aston-15.0-20250424`，固件是 `PJE110_15.0.0.500`，固件要升级到 `PJE110_15.0.0.701`。

安装过程：

1. 按住音量下键和电源键开机进入 fastboot
1. 在[这里](https://github.com/inferno0230/op12r-fw-repo/releases)下载固件，这次下载 [`PJE110_15.0.0.701`](https://github.com/inferno0230/op12r-fw-repo/releases/tag/PJE110_15.0.0.701(CN01))，下载固件后解压
1. 电脑是 Linux/macOS 系统就运行固件文件夹里面的 `install_images.sh`，Windows 就运行 `install_images.bat`

---

安装记录（写给自己看的）：

- `PJE110_15.0.0.500` -> `PJE110_15.0.0.701`（系统版本：`PixelOS_aston-15.0-20250424`）
- `PJE110_15.0.0.701` -> `PJE110_15.0.0.801`（系统版本：`PixelOS_aston-15.0-20250506`）
- `PJE110_15.0.0.801` -> `PJE110_15.0.0.820`（系统版本：`PixelOS_aston-15.0-20250621`）
- `PJE110_15.0.0.820` -> `PJE110_15.0.0.840`（系统版本：`LineageOS 23.0-20251012-NIGHTLY-aston`）