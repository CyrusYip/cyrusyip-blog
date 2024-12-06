---
title: 一加 Ace 3 刷机前的准备与安装 PixelOS 的过程
date: 2024-12-05T00:00:00+08:00
slug: oneplus-ace-3-install-pixelos
tags:
  - android
  - oneplus
  - oneplus-ace-3
  - pixelos
lastmod: 2024-12-06T09:13:51+08:00
---

## 注意事项

- 本文的操作可能会过时，建议参考文末的文章。
- 拿到手机要马上关闭自动更新，避免更新到不合适刷机的版本。
- 解锁 bootloader 重启后马上关掉自动更新。
- 解锁 bootloader 时会清除数据。如果确定要刷机，建议买到手机马上解锁，后面拿到 root 权限可以用 Neo Backup 备份应用数据。
- PixelOS 安装完第一次后就清除数据并重启，然后在设置里再次安装系统。我在 recovery 安装两次 PixelOS 应该是错误操作。

## 名词解释

- 刷机：安装操作系统
- ROM：操作系统。ROM 本义是可读存储器（read-only memory），在刷机的语境下是（安装于 ROM 的）操作系统的意思。
- bootloader：引导程序，需要先解锁它才能安装其他操作系统
- root：最高权限
- ocdt.img：每台一加手机特有的分区
- persist.img：每台手机特有的分区

## 恢复系统教程

先看这篇恢复系统的教程：[How To Guide - [12R/Ace 3] EDL DownloadTool to restore your device to OxygenOS/ColorOS | XDA Forums](https://xdaforums.com/t/12r-ace-3-edl-downloadtool-to-restore-your-device-to-oxygenos-coloros.4654245/)，最好用不上啦。

## 测试硬件功能

测试硬件功能，参考 [charter/device-support-requirements.md at main · LineageOS/charter](https://github.com/LineageOS/charter/blob/main/device-support-requirements.md)。

确定硬件没问题后，如果刷机后有问题就是 ROM 有问题。

- [x] 扬声器、听筒
- [x] WIFI
- [x] 通话
- [x] USB
- [x] 蓝牙
- [x] 前置摄像头（拍照、录像）
- [x] 后置摄像头（0.6/1/2/5 倍数，拍照、录像）
- [x] 指纹
- [x] NFC
- [x] 红外线（遥控）
- [x] 定位
- [x] 陀螺仪（指南针）
- [x] 距离传感器（通话时会熄屏）
- [x] 光传感器（自动亮度）
- [x] 网络（只测了 5G）

## 记录版本信息

记录版本信息，可能以后有用。打开设置->关于手机->版本信息。

```
版本号
PJE110_14.0.0.813(CN01U140P02)
基带版本
Q_V1_P14,Q_V1_P14
内核版本
5.15.123-android-13-8-00766-gf04dea8b48fa
SOTA 版本号
U140P02(BRB1CN01)
```

## 解锁 bootloader

在电脑安装 adb 和 fastboot，参看 [Using ADB and fastboot | LineageOS Wiki](https://wiki.lineageos.org/adb_fastboot_guide)。

解锁时会清除数据。如果确定要刷机，建议买到手机马上解锁，后面拿到 root 权限可以用 Neo Backup 备份应用数据。

打开设置->关于手机->版本信息，快速多次点击版本号，开启开发者模式。

返回设置，打开系统与更新->开发者选项，开启 OEM 解锁和 USB 调试。

手机通过数据线插到电脑 USB 口。

```shell
adb devices # 手机按允许调试
adb reboot bootloader # 进入 fastboot 模式
fastboot devices # 应该会看到编号
fastboot flashing unlock # 解锁 bootloader，用音量键选择 UNLOCK THE BOOTLOADER，按电源键确认
```

现在手机重置了，开机后跳过可以跳过的设置，进入桌面。打开设置，搜索「更新」，打开「自动更新设置」，关闭自动下载和夜间自动更新。

## 获取 root 权限

Oxygen Updater 不能下载一加 Ace 3 的 ROM，所以从大侠阿木的网站下载当前版本的 ROM，也就是 [PJE110_14.0.0.813](https://yun.daxiaamu.com/OnePlus_Roms/%E4%B8%80%E5%8A%A0OnePlus%20ACE%203/ColorOS%20PJE110_14.0.0.813(CN01)%20A.74/)。

解压文件，获得 `payload.bin`。

安装 [payload-dumper-go](https://github.com/ssut/payload-dumper-go)。

```shell
# Arch Linux 的安装方法
paru -S payload-dumper-go-bin
```

解压 `payload.bin`。

```shell
payload-dumper-go payload.bin
```

进入解压目录，将 `init_boot.img` 传到手机。

```shell
adb push init_boot.img /sdcard/Download/
```

在电脑下载 [Magisk](https://github.com/topjohnwu/Magisk/releases)，通过 adb 安装到手机。

```shell
adb install app-release.apk # 在手机同意安装
```

在手机打开 Magisk，点击「Magisk 安装->选择并修复一个文件」，选择 `init_boot.img`，点击「开始」。在文件管理将修补好的文件重命名为 `magisk_patched.img`。

将 `magisk_patched.img` 复制到电脑。

```shell
adb pull /sdcard/Download/magisk_patched.img
```

获取 root 权限。

```shell
adb reboot bootloader
fastboot flash init_boot magisk_patched.img
fastboot reboot
```

## 备份 ocdt.img 和 persist.img

每台一加手机的 ocdt.img 和 persist.img 都是独一无二的，所以先要备份下来。

```shell
adb shell
su # 在手机授权
dd if=/dev/block/bootdevice/by-name/ocdt of=/sdcard/Download/ocdt.img
dd if=/dev/block/bootdevice/by-name/persist of=/sdcard/Download/persist.img
exit
exit
```

现在 ocdt.img 和 persist.img 都在手机的 `Download` 文件夹，将它们复制到电脑。

```shell
adb pull /sdcard/Download/ocdt.img
adb pull /sdcard/Download/persist.img
```

把前面记录的版本信息保存成文本文件，和这两个 `.img` 文件一起备份到网盘。

## 安装 Pixel OS

参考以下资料安装 Pixel OS。

- [PixelOS - aston](https://pixelos.net/download/aston)
- [Development - [12R/ACE3][ROM][14][OFFICIAL] PixelOS [AOSP][19/10/24] | XDA Forums](https://xdaforums.com/t/12r-ace3-rom-14-official-pixelos-aosp-19-10-24.4662225/)

```shell
adb reboot bootloader
fastboot flash boot boot-aston-20241019.img
fastboot flash vendor_boot vendor_boot-aston-20241019.img
fastboot flash dtbo dtbo-aston-20241019.img
fastboot flash recovery recovery-aston-20241019.img
```

按音量键切换到 Recovery mode，按电源键确认。选择 Apply update -> Apply from ADB。

```
adb sideload PixelOS_aston-14.0-20241018-1605.zip
```

现在屏幕显示 `Active slot: b` 和 `Do you want to reboot to recovery now?`，选择 `Yes`。

现在屏幕显示 `Active slot: a`，选择 Apply update -> Apply from ADB，再次安装 PixelOS（文档写要安装两次，这里是错误操作，应该是进入系统后再次安装）。

```shell
adb sideload PixelOS_aston-14.0-20241018-1605.zip
```

这次报错了，先不管。

选择 Factory reset -> Format data/factory reset -> Format data，返回，选择 Reboot system now。可以开机。

开机连接 WIFI 后等了有两三分钟，显示 Slow connection，选择左边的 Set up offline。字体有点小，在设置里调大 Display size。

<!--
原系统在 https://resolution-viewer.cyrusyip.org/ 看到的缩放值好像是 350%
-->

下拉通知栏，点击「Charging this device via USB」，选择 File Transfer。在电脑把 `PixelOS_aston-14.0-20241018-1605.zip` 复制到 Download 文件夹。

在手机打开 Settings -> System -> System updates -> Local update，选择刚刚的 `.zip`文件，点击 INSTALL，完成后点 Reboot，重启成功。

再重启一次，没事，应该算成功安装 PixelOS 了。

系统自带谷歌服务，用 YASNAC 测试 SafetyNet，Basic integrity 显示 pass。

## 再次测试硬件功能

参考前面的章节。既然在原装系统没事，我这次就懒得测了。

<!--

## 刷入固件

似乎不需要此步骤。

-->

## 参考资料

- [How To Guide - How to root OnePlus 12R, a complete guide | XDA Forums](https://xdaforums.com/t/how-to-root-oneplus-12r-a-complete-guide.4663162/)
- [Installation | Magisk](https://topjohnwu.github.io/Magisk/install.html)
- [How to Backup and Flash ocdt and persist partition on OnePlus - DroidWin](https://droidwin.com/how-to-backup-ocdt-and-persist-partition-on-oneplus-12-12r/)
- [Backup ocdt.img or You Might Lose Fastboot Mode [OnePlus] - YouTube](https://www.youtube.com/watch?v=EL3yTxpDIjk)
- [Development - [12R/ACE3][ROM][14][OFFICIAL] PixelOS [AOSP][19/10/24] | XDA Forums](https://xdaforums.com/t/12r-ace3-rom-14-official-pixelos-aosp-19-10-24.4662225/)
- [PixelOS - aston](https://pixelos.net/download/aston)
- [How To Guide - [12R/Ace 3] EDL DownloadTool to restore your device to OxygenOS/ColorOS | XDA Forums](https://xdaforums.com/t/12r-ace-3-edl-downloadtool-to-restore-your-device-to-oxygenos-coloros.4654245/)