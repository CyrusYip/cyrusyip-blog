---
title: 给一加 Ace 3 安装 LineageOS 22.2
date: 2025-10-11T00:00:00+08:00
slug: oneplus-ace-3-install-lineageos-22
tags:
  - android
  - lineageos
  - oneplus
  - oneplus-ace-3
lastmod: 2025-10-11T00:00:00+08:00
---

PixelOS 15 三四个月没更新，我发现 LineageOS 22.2 已经支持一加 Ace 3，所以打算安装 LineageOS。我更喜欢 LineageOS，因为它每周更新，还支持大版本更新。

## 备份

- [x] 备份微信 1 到电脑
- [x] 备份微信 2 到电脑
- [x] 截图记录闹钟
- [x] 截图记录 Outlook 账号
- [x] 截图记录谷歌账号
- [x] 截图记录星标联系人
- [x] 截图记录 root 模块
- [x] 用 [DataBackup](https://github.com/XayahSuSuSu/Android-DataBackup) 备份（需要 root 权限）
    - [x] DCIM
    - [x] Download
    - [x] Documents
    - [x] Pictures
    - [x] 应用（显示一个应用出错，不是微信就行）
    - [x] 测试删除应用后是否可以恢复
- [ ] 将备份复制到电脑（显示需要一个半小时，USB 2.0 好慢，复制还会报错）
- [x] 将备份复制到 U 盘（备份 50G，可以放到 64G 的 U 盘）

## 退出谷歌账号

退出谷歌账号，以免手机安装系统后被锁定。

## 安装 LineageOS 22.2

先看完[安装教程](https://wiki.lineageos.org/devices/aston/install)，要求手机使用 Android 15 固件。我的一加 Ace 3 之前用 ColorOS 15.0.0.500 系统，后来又安装了 15.0.0.820 固件，[符合安装要求](https://xdaforums.com/t/rom-official-lineageos-22-weeklies-for-oneplus-12r-ace-3.4669911/post-90320270)。

以下是安装流程记录（你安装的时候应该看教程，不要抄我的步骤）：

```
fastboot flash boot boot.img
fastboot flash dtbo dtbo.img
fastboot flash init_boot init_boot.img
fastboot flash vbmeta vbmeta.img
fastboot flash vendor_boot vendor_boot.img
fastboot flash recovery recovery.img
```

在手机用音量键选择 Recovery mode，按电源键确认。

清除数据：Factory Reset -> Format data / factory reset

安装系统：Apply Update -> Apply from ADB

```
adb -d sideload lineage-22.2-20251010-nightly-aston-signed.zip
```

电脑显示 47% 进度，手机已经安装完系统了，询问是否重启到 recovery，选择 Yes。

安装谷歌套件：Apply Update -> Apply from ADB

```
adb -d sideload MindTheGapps-15.0.0-arm64-20250812_214357.zip
```

手机显示 Signature verification failed（签名认证失败），选择 Yes，继续安装。

选择 Reboot system now，进入系统。

## 获取 root 权限

恢复备份需要 root 权限，试一下我之前没用过的 KernelSU Next。

内核在 <https://github.com/inferno0230/kernel_oneplus_sm8550-CI/releases> 下载。这次我用的是 <https://github.com/inferno0230/kernel_oneplus_sm8550-CI/releases/download/LineageOS_OPSM8550-v5.15.189-20251008/ksu-next.zip>。

管理器在 <https://github.com/KernelSU-Next/KernelSU-Next/releases> 下载，这次我用的是 <https://github.com/KernelSU-Next/KernelSU-Next/releases/download/v1.1.1/KernelSU_Next_v1.1.1-spoofed_12851-release.apk>。

在手机开启开发者模式，开启 USB debugging，连接电脑，同意 USB debugging。

安装管理器：

```
adb install KernelSU_Next_v1.1.1-spoofed_12851-release.apk
```

按住电源下键，重启手机到 fastboot，再进入 recovery。

安装内核：Apply Update -> Apply from ADB 

```
adb -d sideload ksu-next.zip
```

手机显示 Signature verification failed（签名认证失败），选择 Yes，继续安装。

选择 Reboot system now，进入系统。

打开 KernelSU Next，显示 working（运作中）。

安装 [Re-Malwack](https://github.com/ZG089/Re-Malwack) 和 [universal-gms-doze](https://github.com/gloeyisk/universal-gms-doze)。

## 恢复备份

- [x] 复制备份到手机
- [x] 恢复数据
- [x] 恢复应用（高德地图恢复失败，其他没事）

## 删除备份

- [x] 删除 U 盘的应用和数据备份
- [x] 删除电脑的微信聊天记录备份

## 设置

- [x] 登录 Bitwarden
- [x] 登录 Outlook
    - [x] 开启联系人同步
- [x] 登录谷歌账号
- [x] 登录支付宝。居然可以用指纹支付了，惊喜！微信和云闪付还是无法开启指纹支付。
- [x] 锁屏时关闭敏感通知
- [x] 设置星标联系人
- [x] 设置闹钟
- [ ] 安装 [althafvly/ih8sn](https://github.com/althafvly/ih8sn/releases/tag/latest)（用 recovery 安装了 2024-11-16 发布的版本）。安装后无法启动系统，我就卸载掉了。安装[ItsVixano/ih8sn](https://github.com/ItsVixano/ih8sn/releases)，系统能开机，但是不能通过 Play Integrity 和 SafetyNet，所以还是卸载掉了。目前 Play Integrity 检测结果是都不通过。

## LineageOS 22 和 PixelOS 的功能对比

PixelOS 的特色功能：

- 人脸识别解锁
- 通过 Play Integrity 的前两项

LineageOS 的特色功能：

- 通话录音（需要手动按）