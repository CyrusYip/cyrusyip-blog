---
title: 一加 Ace 3 从 LineageOS 回到 ColorOS
date: 2026-05-17T00:00:00+08:00
slug: oneplus-ace-3-from-lineageos-to-coloros
tags:
  - android
  - coloros
  - lineageos
  - oneplus
  - oneplus-ace-3
lastmod: 2026-05-24T17:25:10+08:00
---

我至少从 [2023 年 5 月 19 日](/zh-cn/posts/2022/04/22/flash-miui-eu-on-xiaomi9se/#2023-05-19-更新改用-lineageos)就开始用 LineageOS，用了快 3 年了，一开始觉得不错，但是长期用下来真是感觉问题不少，和原厂系统比就是弊大于利。

用 LineageOS 主要有两类问题，一是解锁 bootloader（引导程序）导致的问题，二是 LineageOS 的问题。每天经历种种不方便，我最后决定装回原厂系统。

## LineageOS 的问题

- 自动亮度功能很差，忽明忽暗（应该和机型相关，但是我用的手机都不正常）
- 耗电（LineageOS 本身不会更耗电，但是根本管不动偷偷耗电的应用。我曾经用 Brevent 管理后台，然后发现应用宝居然 2 分钟内启动 18 次，被 Brevent 关闭了 18 次。用 Ice Box 也不好使，不见得省电，冷启动应用还更慢）
- 没有钱包功能（银行卡 NFC 支付、交通卡、门禁卡，原厂系统才有）
- 相机拍照质量没原厂系统好
- 通话录音不好用（只能录通话，而且还是自己手动按的，不能录应用）
- 农业银行应用经常闪退，不知道怎么回事
- 在微信打开云闪付的活动链接会一片空白，不知道怎么回事
- 没有之前用那么流畅了

## 解锁 bootloader 的问题

解锁 bootloader 会破坏 TEE（trusted execution environment）和 Play Integrity，导致功能异常。

- 指纹支付无法使用（支付宝是例外）
- 部分银行应用无法使用
- 铁路 12306 无法使用
- 交管 12123 无法使用

## 不知道什么原因导致的问题

- 抖音无法使用（不记得什么报错）
- 美团无法使用（提示网络问题）

## 备份

重装系统前先备份资料，参考以下帖子：

- [给一加 Ace 3 安装 LineageOS 22.2 | 叶寻的博客](/zh-cn/posts/2025/10/11/oneplus-ace-3-install-lineageos-22/)
- [小米 9 SE 刷欧版 MIUI 记录 | 叶寻的博客](/zh-cn/posts/2022/04/22/flash-miui-eu-on-xiaomi9se/)

备份的内容：

- [x] 备份微信聊天记录到电脑
- [x] 截图记录，传到电脑
    - [x] 闹钟
    - [x] Outlook 账号
    - [x] 谷歌账号
    - [x] 星标联系人
- [x] 图片与文件（这次清理一下手机，不要图片了）
    - [ ] DCIM
    - [ ] Download
    - [ ] Documents
    - [ ] Pictures
- [x] 应用列表
    - [x] 使用 [App List](https://play.google.com/store/apps/details?id=com.github.keeganwitt.applist) 导出列表为 csv 传到电脑上，用 Office 应用可以看 csv 文件（注意把文件后缀改成 .csv）
- [x] 最后看一遍所有应用，看是否需要额外备份（多数联网应用都不需要备份，登录好就有数据了）

## 下载工具

这台手机之前用了以下系统：

1. ColorOS 15
1. LineageOS 22.2
1. LineageOS 23.0（从 LineageOS 22.2 升级到这个版本）

因为之前用 ColorOS 15，所以还是安装这个大版本。

在[一加OnePlus Ace 3/ColorOS PJE110_15.0.0.870(CN01) C.48 - 一加手机官方ROM - 一加真我OPPO手机官方ROM下载](https://yun.daxiaamu.com/OnePlus_Roms/%E4%B8%80%E5%8A%A0OnePlus%20Ace%203/ColorOS%20PJE110_15.0.0.870(CN01)%20C.48/)复制一个链接，用 aria2 下载。

```shell
aria2c "https://gauss-componentotacostmanual-cn.allawnfs.com/remove-3c8478687554b5ab5861428600b9972c/component-ota/25/10/06/bbd6953c3313468aa9dbe4909ea8ad57.zip"
```

重命名安装包为 `PJE110_15.0.0.870.zip`

```
mv bbd6953c3313468aa9dbe4909ea8ad57.zip PJE110_15.0.0.870.zip
```

下载 [Fastboot Firmware Flasher 1.0.2.1](https://t.me/gt3neo5hub/521/432865)（需要用到 Telegram）。打开 FastbootFirmwareFlasher_1.0.2.1.sfx.exe，选择解压目录（建议自己新建一个空目录），点击下面靠左的按钮解压。

## 安装 ColorOS 15

安装 ColorOS 需要用 Windows 电脑，使用 fastboot 和 fastbootd 安装。

可以先看 [Fastboot Firmware Flasher 1.0.1.1 Update - YouTube](https://www.youtube.com/watch?v=OFQ3BJ60PzM)，了解整个安装流程。

把手机重启到 fastboot（重启手机的瞬间按住音量下键）。

打开桌面的 Fastboot Firmware Flasher，界面语言和系统语言一致。每个汉字我都认识，加起来就看不懂了，不对劲。没找到切换语言的地方，只好将系统语言设置为英文。

打开 Fastboot Firmware Flasher，先检查 fastboot 和 fastbootd：

1. 选择左边的 「Drivers」
1. 点击「Delete Old Drivers」
1. 点击 「Install New Drivers」
1. 点击「Start test」，5 个步骤都走完了，没问题

重启到 fastboot 模式：

1. 点击左边的「Device Control」
1. 点击中间的「Fastboot-Reboot to Bootloader」
1. 点击右边的「Fastboot-Refresh」，显示处于 Bootloader 模式

解压固件：

1. 点击左边的「Firmware Unpacker」
1. 点击「File Picker」，选择「PJE110_15.0.0.870.zip」
1. Select Mode 选择「Full」，点击 「Unpack」，点击「OK」
1. 显示「Unpacking Completed」就完成了

安装固件：

1. 手机重启到系统，打开开发者模式和 ADB
1. 关闭 Fastboot Firmware Flasher，再打开（一开始没检测到解压好的固件，所以重新打开）
1. 点击左边的「Firmware Flasher」
1. 点击中间的「Firmware Flasher - Start」，这里显示了固件信息
1. 点击「Start」
1. 点击「Confirm」
1. 询问是否要 root 权限，选择 No（后续锁定 bootloader，不能有 root 权限）
1. 「reboot option」显示「Reboot from system」，没问题
1. 「Android version」显示「13-16」，没问题
1. 选择「Start Flashing」
1. 「USB Cable Test」通过，点击「Continue」
1. 显示「Stage 1 complete」，点击「Continue」
1. 显示「Flashing Complete」，点击「Delete Data」
1. 安装耗时 07:53，成功重启

## 第二次安装 ColorOS 15

手机打开开发者模式和 USB 调试。现在再次安装 ColorOS 15，确保 a/b 槽位都是原厂系统，避免锁定 bootloader 时出错。

电脑打开 Fastboot Firmware Flasher，点击左边的「Device Control」和右边的「ADB」和「Refresh」，可以看到槽位（Slot）是 `_a`。 再次用这个软件安装系统，详细步骤看前面。安装完系统槽位还是 `_a`，不过应该两个槽位都是原装系统了吧。

这里没有使用手机本地安装，是因为解锁了 bootloader，系统禁止使用本地安装。

## 测试 OnePlus Pay

添加中行和建行的信用卡，都显示银行卡不支持。看样子似乎没上锁的系统用不了。添加云闪付卡可以，但点击卡片显示 NFC 错误，感觉不太行。

## 锁定 bootloader

打开 Fastboot Firmware Flasher，锁定 bootloader：

1. 点击「Device Control」
1. 点击「ADB」
1. 点击「Reboot to Bootloader」
1. 点击「Fastboot」
1. 点击「Lock Bootloader」
1. 手机上用音量键和电源键确认锁定

成功进入系统。将手机重启到 fastboot，可以看到底下写着 locked。

再次测试 OnePlus Pay，四大银行（中国银行、农业银行、建设银行、工商银行）里面工行和中行不支持 NFC 支付，真差劲。更低端的红米 Turbo 3 都比一加 Ace 3 好，至少它四个银行都支持。

## 升级系统

在设置里面升级系统到最新的 ColorOS 16.0.5.701。

## 恢复备份与设置

- [x] 在设置将分辨率设置到最高（一加这省电方式真不体面）
- [x] 在设置关闭自动更新
- [x] 安装 Google Play，登录谷歌账号
- [x] 安装 BitWarden
- [x] 根据应用列表安装应用
- [x] 恢复微信聊天
- [x] 恢复截图记录
    - [x] 设置闹钟
    - [x] 登录 Outlook 账号，同步联系人
    - [x] 登录谷歌账号
    - [x] 设置星标联系人

## 清理

- [x] 删除微信聊天记录
- [x] 删除电脑上的软件和安装包

## ColorOS 的问题

从 LineageOS 转到 ColorOS，也遇到了一些问题。

| 问题                                  | 解决方法                                                     |
| ------------------------------------- | ------------------------------------------------------------ |
| Outlook 和 Google Tasks 无法发送通知  | 在电池设置中允许后台运行                                     |
| 无法单独给某个应用设置语言            | 使用 [Language-Selector](https://github.com/VegaBobo/Language-Selector)，要在开发者选项关闭权限监控，Shizuku 才能正常运行 |
| 用 adb 安装应用，不能静默安装，会弹窗 | 没发现解决方法                                               |

## ColorOS 使用体验

这台一加 Ace 3，一开始是 ColorOS 14，现在升级到 ColorOS 16，依然流畅，比 Lineageos 还流畅。更省电更少发热。虽然有些小毛病，但总体还是优点更多，我感觉很满意。

<!--

以下是安装驱动的步骤，后面发现 Fastboot Firmware Flasher 可以装驱动就删掉了。

在 [How To Guide - Flashing stock firmware on 12r/Ace 3 from fastboot. | XDA Forums](https://xdaforums.com/t/flashing-stock-firmware-on-12r-ace-3-from-fastboot.4719377/) 下载 USB 驱动，解压为 usb_driver。

接下来检查 fastboot 和 fastbootd，将手机插到电脑上，重启至 fastboot。

```shell
# 检查 fastboot 连接，显示设备就成功
fastboot devices
# 重启到 fastbootd
fastboot reboot fastboot
```

现在手机显示 fastbootd，电脑显示 waiting for any device，卡住了，说明电脑检测不到 fastbootd 状态下的手机，要安装驱动。

在电脑打开设备管理器，找到其他设备，里面的 PJE110（也就是一加 Ace 3 的型号）有感叹号，右击。

1. 点击「更新驱动设备」
1. 点击「浏览我的电脑以查找驱动程序」
1. 选择「usb_driver」文件夹
1. 点击「下一步」
1. 点击「安装」
1. 显示成功

现在把手机重启到 fastboot，重新检测 fastboot 和 fastbootd。

```
# 检查 fastboot 连接，显示设备就成功
fastboot devices
# 重启到 fastbootd（这次显示 Finished）
fastboot reboot fastboot
# 检查 fastbootd 连接（显示有设备）
fastboot devices
```

已确认可以检测 fastboot 和 fastbootd。

-->