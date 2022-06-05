---
title: 小米 9 SE 刷欧版 MIUI 记录
date: '2022-04-22'
slug: flash-miui-eu-on-xiaomi9se
tags:
  - Android
  - MIUI
  - Xiaomi
---

## 缘起

之前看了 Pockies 写的《[老妈钦点，我买了一部Redmi K30 5G版](https://pockies.github.io/2020/03/27/redmi-k30-5g/)》，感觉[欧版 MIUI](https://xiaomi.eu/community/) 真是太棒了，既没有广告和无用的内置软件，还有 Google Play。我手头这台小米 9 SE 也用了两三年了，越来越卡了，用了[冰箱（Ice Box）](https://play.google.com/store/apps/details?id=com.catchingnow.icebox)冻结应用之后还是卡。骁龙 712 + 6G 内存，好歹也是中高端配置吧，怎么就卡了呢！我需要安装一些外国软件，但这台机器没预装 Google Play，自己装上的用几次就不行了。该死，只有骁龙 800 系列的小米手机才配有 Google Play 吗？

我很早就知道国外版本的 MIUI 有 Google Play，但是要解锁 bootloader 才能装。解锁 bootloader 之后呢就可以随便刷 recovery，我担心手机丢了后别人可以通过 recovery 随便查看我的文件，所以一直没换系统。经过 [Pockies 的一番指点](https://github.com/Pockies/pockies.github.io/issues/48#issuecomment-912548330)，我才知道我的认知已经过时了，但还是不太懂。于是我在联想 ZUK Z2 Pro 刷机测试，发现只要开启了系统的加密功能，别人进 recovery 就要输入解锁密码才能读取文件（`\data` 分区）。MIUI 默认开启加密，所以不用担心这个问题。

## 备份

- 手机里唯一值得备份的文件就是图片了，我的图片在这三个文件夹：

    - `/DCIM`

    - `/Pictures`

    - `/Tencent/MicroMsg/WeiXin/`


- 用 adb 备份软件列表，装完系统再把软件装回来。用 [List My Apps](https://play.google.com/store/apps/details?id=de.onyxbits.listmyapps) 也可备份列表。

    ```
    adb shell pm list packages -3 | cut -f 2 -d ":" > third-party-apps
    adb shell pm list packages -s | cut -f 2 -d ":" > system-apps
    adb shell pm list packages | cut -f 2 -d ":" > all-apps
    ```

- 用电脑微信备份聊天记录。

- 联系人保存在小米帐户和微软邮箱，不需要备份。

- 闹钟得截图记下来

- 这个过程还挺繁琐的，下次换手机就试试小米换机

## 下载系统与工具

- [官方解锁软件](http://www.miui.com/unlock/index.html)
- [SDK Platform Tools（adb 和 fastboot）](https://developer.android.com/studio/releases/platform-tools)（Arch Linux 装 `android-tools` 就行）
- [TWRP](https://twrp.me/xiaomi/xiaomimi9se.html)（第三方 recovery，用于安装系统）
- [欧版 MIUI](https://xiaomi.eu/community/threads/miui-12-0-12-1-12-2-12-5-stable-release.56191/)

## 解锁 bootloader

使用[官方软件](http://www.miui.com/unlock/index.html)解锁即可。进入 fastboot 之后要安装驱动，不然识别不了。我直接解锁成功了，不需要等待。解锁过程超折腾，用了三台电脑两条数据线尝试了超多次才检测到手机。

## 刷入 TWRP

先进入 fastboot。

```
adb reboot bootloader
```

在 Arch Linux 刷入失败。

```
❯ fastboot flash recovery twrp-3.6.1_9-0-grus.img
Sending 'recovery' (65536 KB)                      FAILED (Write to device failed (No such device))
fastboot: error: Command failed
```

在 Windows 用解锁工具里的 fastboot 就行，玄学啊。

```
.\fastboot.exe flash recovery .\twrp-3.6.1_9-0-grus.img
Sending 'recovery' (65536 KB)                      OKAY [  1.413s]
Writing 'recovery'                                 OKAY [  0.316s]
Finished. Total time: 1.746s
.\fastboot boot twrp.img
```

重启时要按住「关机键和音量加键」，不然进 MIUI 后 recovery 会变成原版。

## 刷入系统

- Wipe -> Format Data

- 连接电脑

- 将刷机包拷进手机
- Install -> 选中刷机包 -> Swipe to confirm Flash
- Reboot -> System -> do not install twrp

我安装固件的时候出现 `the package is for grus` 错误，在 TWRP 执行以下命令就可以解决。

```
setprop ro.product.device grus
setprop ro.build.product grus
```

我刷完固件一开始进了系统，后来重启就总是自动进 TWRP，不知道为啥。重新 Format Data 之后又正常了。

## 配置系统

- 登陆谷歌帐号
- 登陆小米帐户
- 登陆邮箱帐户
    - 允许 outlook 自启，取消省电限制，不然会收不到通知
- 还原之前的图片
- 恢复微信聊天记录
- 重新设置闹钟（前面忘记记下来了）
- 安装软件
- 配置 Termux[^termux]（主要用来管理 OpenWrt）
    - 安装常用软件：`fish vim openssh`
    - 生成 ssh 密钥
    - 将公钥加到 OpenWrt

[^termux]: Goople Play 的版本似乎停更了，安装不了软件。得去 [F-droid 下载](https://f-droid.org/en/packages/com.termux/)。

## 治理流氓软件

平时用的国产软件实在太流氓，需要用以下软件治理。下列软件只需要 adb 就能用，不需要 root，但 adb 激活重启会失效。

- shizuku（提升软件权限，激活后面的小黑屋和 App Ops）
- brevent 黑阈（后台管理）
- 小黑屋（冻结软件，把软件按进棺材）
- App Ops（给假权限，专治不给权限就罢工的软件）

以下命令用于激活黑阈和 shizuku。

```
adb -d shell sh /data/data/me.piebridge.brevent/brevent.sh; adb shell sh /sdcard/Android/data/moe.shizuku.privileged.api/start.sh
```

除了用电脑激活，也可以在手机通过无线调试激活（开发者怎么想到的，好厉害！出门在外不需要用电脑激活了）。

## 使用体验

用了一周，系统比原来的流畅多了，Google Play 也正常能使用。欧版 MIUI 是基于中国版 MIUI 修改的，所以功能都差不多，但有些小毛病。

- 自带的天气软件定位到国外了，只好手动添加地点
- 自带的日历没有中国假日
- ~~锁屏界面不能左滑开启相机~~（开启 「Shortcut from lock screen」）
- ~~不能双击电源键开闪光灯~~（设置 「Turn on torch」）
- Google Play 买应用麻烦（不能用支付宝/微信，我没有国际信用卡，不知道淘宝的礼品卡好不好使）

## 欧版 MIUI 12 的特性

本节内容出自[欧版 MIUI 官网](https://xiaomi.eu/community/threads/miui-12-0-12-1-12-2-12-5-stable-release.56191/)，这些特性看起来还是很棒的。

> - Based on China Stable / Weekly builds (except POCOF1, HMNote6Pro, HMNote8T, HMNote9ProMax, HMNote9Pro_HMNote9S, HMNote9ProEU)
> - Enabled search gesture (swipe up) on the desktop
> - 3way reboot menu (in dev settings)
> - MIUI Contacts and Dialer
> - Dark Mode (Night Mode) for all devices (In the dev settings except 9.x/10.x)
> - Removed ads in MIUI system apps
> - Face Unlock for all devices
> - Vertical clock widget on lockscreen
> - Steps counter in Assistant screen
> - More shortcuts on left lockscreen
> - Wake up gestures
> - AI preloading option in MIUI Lab
> - Fullscreen gestures
> - Option to auto-expand first notification
> - Notifications priority settings
> - More edit options in Gallery app
> - Enabled MiDrive in File Explorer
> - Added landscape mode for SMS app
> - Sunrise/Sunset in the weather app
> - Google apps support integrated
> - Removed 5GHz region restrictions
> - Confirm dials from call logs
> - Morning report on alarm at morning
> - More apps supported for AOD notifications
> - More styles for AOD screen
> - Raise to wake gesture
> - AOD notification received animation
> - Default volume control stream toggle
> - Tap fingerprint sensor to wake toggle
> - More Camera features
> - Double tap to lock screen
> - Battery AI scenes
> - Allowed disabling specific system apps
> - Importing theme .mtz from zhuti.xiaomi.com via ThemeManager
> - No useless Chinese bloatware apps
> - More free RAM due to less background processes
> - Unified flat style app icons for both system and 3rd party apps
> - Advanced menu with color icons
> - No any Chinese character under the full system
> - Mi Video, Mi Music, Mi Browser: No any useless Chinese content
> - No possibility to re-lock bootloader accidentally with flash any xiaomi.eu release
> - Added real 27 languages translation made by Official MIUI Fansites and MIUI Fans
> - Added EU T9 dialer support
> - Added charging sound switch
> - Added Screen-OFF animation
> - Optimized GPS settings for EU
> - Optimized Battery consumption
> - Optimized RAM consumption
> - Added 3D Touch to MI5S 3GB RAM version
> - Added GSMalphabet into SMS app options
> - Added more icons grid layout 4x5, 4x6, 4x7, 5x5, 5x6, 5x7 (depends on device)
> - SafetyNet passed (Google Pay)
> - Play Store Certified
> - Deodexed
> - Added automated tasks in Security app
> - Added game speed booster
> - Added erase module (magic elimination) to Gallery photo edit options
> - Fixed low volume sound via headphone
> - Charging screen
> - And more, and more made by our 9 years MIUI mods experience.

## 参考资料

- [国行小米9 SE刷欧版MIUI 12.5踩坑记录 - 小z博客](https://www.xiaoz.me/archives/16032)
