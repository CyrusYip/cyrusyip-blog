---
title: 将一加 Ace 3 从 PixelOS 14 升级到 PixelOS 15
date: 2025-02-13T00:00:00+08:00
slug: oneplus-ace3-from-pixelos14-to-pixelos15
tags:
  - android
  - oneplus
  - oneplus-ace-3
  - pixelos
lastmod: 2025-06-22T23:04:05+08:00
translationKey: oneplus-ace3-from-pixelos14-to-pixelos15
---

现在 PixelOS 15 发布了，我就打算从 PixelOS 14 升级上去，但是事情没那么简单。因为 PixelOS 15 要用到 ColorOS 15 的固件，所以不能直接升级。要安装 ColorOS 14，升级到 ColorOS 15（15.0.0.200 或者以上的版本），在 ColorOS 的更新器再次安装 ColorOS 15 以确保两个系统槽位（slot）都是 ColorOS 15。安装 ColorOS 14 的时候会清空用户数据，所以要先备份应用和文件，最后再恢复。

操作有风险，推荐在有条件去售后中心的时候操作，失败了就去售后直接安装 ColorOS 15 吧。

## 需要用到的文件

- [PJE110domestic_11_14.0.0.317CN01_2024012904340000.zip](https://drive.google.com/drive/folders/1QRd-wHLVtQFrlYuAJNaxD9t7KOru7Oxy)（如果无法下载就先登录谷歌账号）
- [ColorOS PJE110_15.0.0.500(CN01) C.32 全量包](https://yun.daxiaamu.com/OnePlus_Roms/%E4%B8%80%E5%8A%A0OnePlus%20ACE%203/ColorOS%20PJE110_15.0.0.500(CN01)%20C.32/)（里面的链接用浏览器打开失败，可以用 aria2 或者 Aria2App 下载）
- 1.3.zip 和 prog_firehose_ddr.zip（在这里下载：[How To Guide - [12R/Ace 3] EDL DownloadTool to restore your device to OxygenOS/ColorOS | XDA Forums](https://xdaforums.com/t/12r-ace-3-edl-downloadtool-to-restore-your-device-to-oxygenos-coloros.4654245/)）
- ~~[ColorOS PJE110_14.0.0.800(CN01) A.67 全量包](https://yun.daxiaamu.com/OnePlus_Roms/%E4%B8%80%E5%8A%A0OnePlus%20Ace%203/ColorOS%20PJE110_14.0.0.800(CN01)%20A.67/)（里面的链接用浏览器打开失败，可以用 aria2 或者 Aria2App 下载）~~
- ~~[Fastboot Firmware Flasher](https://t.me/gt3neo5hub/521/232181)（需要 Windows 10 / 11）~~

## 备份

我用 [DataBackup](https://github.com/XayahSuSuSu/Android-DataBackup) 来备份应用与它们的数据、文件。

- [x] 应用
- [x] DCIM
- [x] Pictures
- [x] Documents

DataBackup 需要 root 权限，我用[最新构建的 APatch](https://nightly.link/bmax121/APatch/workflows/build/main/APatch)（[使用文档](https://apatch.dev/)，注意最新构建版是个 `.zip` 文件，需要解压之后安装里面的 `.apk`），你也可以用其他 root 方案。

备份完删掉一些应用再恢复，看看能不能行。没问题就把数据复制到电脑。

我对微信没有信心，所以将微信聊天记录额外备份到电脑。

有些东西 DataBackup 无法备份，只能自己截图或者用文字记下来。无法备份的东西有：

- 系统设置（WIFI 密码、星标联系人、闹钟、谷歌账户等）
- APatch 设置和模块（应该也能备份吧，但总感觉不太对劲）

## 清除密码

退出谷歌账号，删除锁屏密码。

## 用 9008/EDL 安装 ColorOS 14

参考 [How To Guide - [12R/Ace 3] EDL DownloadTool to restore your device to OxygenOS/ColorOS | XDA Forums](https://xdaforums.com/t/12r-ace-3-edl-downloadtool-to-restore-your-device-to-oxygenos-coloros.4654245/)，用 9008/EDL 模式安装 ColorOS 14。

在 [Download OnePlus 12R/Ace 3 EDL Unbrick Firmware/ROM - DroidWin](https://droidwin.com/download-oneplus-12r-ace-3-edl-unbrick-firmware-rom/) 下载 EDL 刷机包（`PJE110domestic_11_14.0.0.317CN01_2024012904340000.zip`），登录谷歌账户才行，不然提示下载人数太多。

1. 解压 zip 包。
1. 将 xda 帖子的 `prog_firehose_ddr.elf` 放到 `系统包/IMAGES/`，覆盖掉里面的 `prog_firehose_ddr.elf`。
1. 打开 9008驱动.exe，安装。
1. 打开报错安装我，提示已安装这个产品的另一个版本。
1. 打开刷机工具1.3。
1. 区域选择非欧洲，用户名、密码、验证码都输入 1，登录。
1. 将系统包的文件夹拖拽进去。
1. 保持默认选项，点击ok，点击开始。
1. 手机按住两个音量键和电源键，刷机工具显示连接就松手。
1. 显示 firehose 协议执行失败，好像是因为我前面还没关闭 fastboot firmware flasher，关闭它之后再来用刷机工具1.3就好了。
1. 6 分钟后完成刷机，再等一段时间，ColorOS 14 开机成功。

## 第 1 次安装 ColorOS 15

ColorOS 14 开机成功，进入设置引导界面，增强服务这里关闭「自动下载」和「夜间自动更新」，后面的能跳过就点跳过。

目前版本信息是 `PJE110_14.0.0.317(CN01)`。

1. 将手机插到电脑，复制 ColorOS PJE110_15.0.0.500 刷机包到手机的 Download 文件夹。
1. 开启开发者模式：打开设置-关于本机-版本信息-快速多次点击版本号。
1. 开启飞行模式（关闭数据和 WIFI）。
1. 打开设置-应用-应用管理-右上角的三个点-显示系统应用-搜索软件更新-储存占用-清除数据。
1. 打开设置-关于本机-ColorOS-右上角的三个点-本地安装-选择前面从电脑放进去的 ColorOS 15 刷机包-立即解压-立刻安装。

安装完后重启到 ColorOS 15。

友情提示：升级到 ColorOS 15 之后，原来的免授权 EDL 刷机工具会失效，用 EDL 工具的新方法：[Fix Sahara Communication/Protocol Failed Error in Oppo Flash Tool - DroidWin](https://droidwin.com/fix-sahara-communication-failed-error-in-oppo-flash-tool/)。

## 第 2 次安装 ColorOS 15

现在进入了设置引导界面，关闭「自动下载」和「夜间自动更新」。现在版本信息是 `PJE110_15.0.0.500(CN01)`。

像前面一样，在设置里面使用本地安装，现在是第 2 次安装 ColorOS 15，安装完选立即重启。

## 安装 PixelOS 15

现在准备工作都做好了，按照 [PixelOS 官方教程](https://pixelos.net/download/aston) 做就行了。

手机关机，按住音量下键和电源键开机进入 fastboot，连接电脑。

```
fastboot flash boot boot-aston_20250121_1747.img
fastboot flash init_boot init_boot-aston_20250121_1747.img
fastboot flash vendor_boot vendor_boot-aston_20250121_1747.img
fastboot flash dtbo dtbo-aston_20250121_1747.img
fastboot flash recovery recovery-aston_20250121_1747.img
```

按手机音量下键，直到显示 Recovery mode，按下电源键确认。现在进入 PixelOS 的 recovery 了。

在手机选择 Apply update - Apply from ADB。

```
adb sideload PixelOS_aston-15.0-20250121-1747.zip
```

手机询问「Do you want to reboot to recovery now?」（是否重启到 recovery），选择 No。

选择 Factory reset - Format data/factory reset - Format data。

点左上角的左箭头返回，选择 Reboot system now。

简单设置一下：

- Refresh rate 120 Hz (Adaptive)
- Tap to wake
- Tap to sleep
- Display size and text - Display size（调大 1 档）
- Network traffic indicator

## 恢复

安装 APatch，修补 boot.img，刷入后手机开机后卡死，触屏和按键没反应。头疼！按住音量上键和电源键强制重启，屏幕熄灭时马上松手并按住音量下键，进入 fastboot。刷入 PixelOS 的 boot.img。

```
fastboot flash boot boot-aston_20250121_1747.img
fastboot reboot
```

KernelSU 也试了下，刷入修补的 `init_boot.img` 后并不能获取 root 权限。最后只能用 Magisk 了。

把前面备份的数据从电脑复制到手机（里面有 DataBackup），安装 DataBackup 后恢复应用和数据。

有些应用要重新登录或者设置：

- Bitwarden
- Outlook
- 支付宝
- 欧路词典

不需要重新登录或者设置的应用：

- 微信
- KDE Connect

闪退的应用：

- Hail
- GKD

其他设置自己手动处理。

- [x] 连接 WIFI，登录谷歌账号。
- [x] 同步 outlook 联系人
- [x] 设置星标联系人
- [x] 设置闹钟
- [x] 克隆应用的功能没了，只好装个 Insular
- [x] 安装 root 模块

## Magisk 的问题

Magisk 真的太容易被检测到了，云闪付、支付宝、微信里面都没有人脸支付、指纹支付的选项，云闪付直接提示处于 root 环境。之前用 APatch，支付宝是可以人脸支付的。真是头疼，只能先不用 root 了，支付宝又能用人脸支付了。

## 改用 KernelSU

PixelOS 的维护者 [inferno0230](https://xdaforums.com/m/inferno0230.12118995/) 提供了[支持 KernelSU 的内核](https://github.com/inferno0230/kernel_oneplus_sm8550-CI/releases)。我试了 `OP12R-v5.15.175-20250119-0950.zip`，在 PixelOS Recovery 里选 Apply update - Apply from ADB，在电脑执行 `adb sideload OP12R-v5.15.175-20250119-0950.zip` 就安装成功了。我把 KernelSU 管理器安装到 [private space](https://source.android.com/docs/security/features/private-space)，用支付宝人脸识别正常，云闪付也没有提示 root 环境。

## 更新 PixelOS 时保留 root

推荐方法：

1. 下载最新的 [KernelSU 内核](https://github.com/inferno0230/kernel_oneplus_sm8550-CI/releases)。
1. 在设置更新系统，安装完按住电源下键，重启。
1. 按音量键选择 recovery，按电源键确认，进入 recovery。
1. Apply update - Apply from ADB / Choose from disk[^disk] - Yes - Reboot system now。

[^disk]: 可以把内核放到 U 盘，从 U 盘安装，这样就不需要用电脑。注意：PixelOS recovery 无法读取多分区的 U 盘。

不太推荐的方法（手误跨版本升级 PixelOS 可能会出问题，比如 PixelOS 15 升级到 PixelOS 16）：

1. 下载 [KernelSU 内核](https://github.com/inferno0230/kernel_oneplus_sm8550-CI/releases)和 [PixelOS 系统](https://pixelos.net/download/aston)
1. 重启到 recovery
1. 安装 PixelOS，重启到 recovery，此时系统槽位（slot）变化
1. 安装 KernelSU 内核
1. 重启

## 清理

删除电脑的备份文件、刷机包、刷机工具、微信记录。

---

文章到这里就结束了，下面是安装 ColosOS 14 的失败尝试，不知道是我操作不当还是工具有问题。

**2025-02-20 更新**：今天看到用 fastboot 安装原厂系统的教程（[How To Guide - Flashing stock firmware on 12r/Ace 3 from fastboot. | XDA Forums](https://xdaforums.com/t/flashing-stock-firmware-on-12r-ace-3-from-fastboot.4719377/)），可能我下面失败的原因是没装好驱动，手机在 fastbootd 模式时未被电脑检测到。

> Download the usb drivers, extract them and install "android_winusb.inf" by right clicking on it then click install. **Install them even if your device is detected in fastboot mode because further in the guide the phone will go in fastbootD mode and your computer might not detect the phone in that mode**.

## 用 fastboot 安装 ColorOS 14（失败）

1. 手机关机，按住电源键和音量下键开机，手机震动后松手，进入 fastboot 模式。将手机插到电脑 USB 口。
1. 打开 Fastboot Firmware Flasher。
1. 选择 `[7] FIRMWARE UNPACKER`，解开 ColorOS 14。
1. 返回主菜单，选择 `[3] FLASH ROM`。
1. 电脑显示 Rebooting into fastboot，但是手机进了 fastbootd，电脑显示「waiting for any device」。手机可以选择清除数据、重启、关机，我选了选择关机，结果就反复启动了。